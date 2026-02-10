import { UserStatus } from "../../../generated/prisma/enums"
import { auth } from "../../lib/auth"
import { prisma } from "../../lib/prisma"

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
        throw new Error("Registration failed. Please try again.")
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

        return { ...result, patient }
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
        throw new Error("Your account is blocked. Please contact support.")
    }
    if (result.user.status === UserStatus.DELETED) {
        throw new Error("Your account is deleted. Please contact support.")
    }
    return result
}
export const authServices = {
    register,
    login
}