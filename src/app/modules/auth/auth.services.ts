import status from "http-status"
import { UserStatus } from "../../../generated/prisma/enums"
import AppError from "../../ErrorHelpers/AppError"
import { auth } from "../../lib/auth"
import { prisma } from "../../lib/prisma"
import { tokenUtils } from "../../utils/token"
import { IRequestUser } from "../../interfaces/requestUser.interface"

interface RegisterData {
    name: string,
    email: string,
    password: string
}

interface ILogin {
    email: string,
    password: string
}
const register = async (data: RegisterData) => {
    const { name, email, password } = data
    const result = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })

    if (!result.user) {
        throw new AppError(status.BAD_REQUEST, "Registration failed. Please try again.")
    }

    try {
        const patient = await prisma.$transaction(async (tx) => {
            const patientTx = await tx.patient.create({
                data: {
                    userId: result.user.id,
                    name,
                    email,
                }
            })
            return patientTx
        })
        const accessToken = tokenUtils.getAccessToken({
            userId: result.user.id,
            role: result.user.role,
            name: result.user.name,
            email: result.user.email,
            status: result.user.status,
            isDeleted: result.user.isDeleted,
            emailVerified: result.user.emailVerified
        })
        const refreshToken = tokenUtils.getRefreshToken({
            userId: result.user.id,
            role: result.user.role,
            name: result.user.name,
            email: result.user.email,
            status: result.user.status,
            isDeleted: result.user.isDeleted,
            emailVerified: result.user.emailVerified
        })

        return { ...result, patient, accessToken, refreshToken }
    } catch (error) {
        console.log("Transaction error ", error);
        await prisma.user.delete({
            where: {
                id: result.user.id
            }
        })
        throw error
    }
}
const login = async (payload: ILogin) => {
    const { email, password } = payload
    const result = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })


    if (result.user.status === UserStatus.BLOCKED) {
        throw new AppError(status.FORBIDDEN, "Your account is blocked. Please contact support.")
    }
    if (result.user.status === UserStatus.DELETED) {
        throw new AppError(status.NOT_FOUND, "Your account is deleted. Please contact support.")
    }
    const accessToken = tokenUtils.getAccessToken({
        userId: result.user.id,
        role: result.user.role,
        name: result.user.name,
        email: result.user.email,
        status: result.user.status,
        isDeleted: result.user.isDeleted,
        emailVerified: result.user.emailVerified
    })
    const refreshToken = tokenUtils.getRefreshToken({
        userId: result.user.id,
        role: result.user.role,
        name: result.user.name,
        email: result.user.email,
        status: result.user.status,
        isDeleted: result.user.isDeleted,
        emailVerified: result.user.emailVerified
    })
    return { ...result, accessToken, refreshToken }
}
const getMe = async (user: IRequestUser) => {
    const isUserExists = await prisma.user.findUnique({
        where: {
            id: user.userId
        },
        include: {
            patient: {
                include: {
                    appointments: true,
                    reviews: true,
                    patientHealthData: true,
                    prescriptions: true,
                    medicalReports: true,
                }
            },
            doctor: {
                include: {
                    specialties: true,
                    appointments: true,
                    reviews: true,
                    prescriptions: true,
                },
            },
            admin: true,
        }
    })
    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, "user not found")
    }

    return isUserExists
}
export const authServices = {
    register,
    login,
    getMe
}