import status from "http-status";
import { Speciality, UserRole } from "../../../generated/prisma/client";
import AppError from "../../ErrorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {

    const specialties: Speciality[] = []

    for (const specialityId of payload.specialities || []) {
        const speciality = await prisma.speciality.findUnique({
            where: {
                id: specialityId
            }
        })
        if (!speciality) {
            throw new AppError(status.NOT_FOUND, `Speciality with title "${specialityId}" not found`)
        }
        specialties.push(speciality)
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.doctor?.email
        }
    })
    if (userExists) {
        throw new AppError(status.CONFLICT, `User with email "${payload.doctor?.email}" already exists`)
    }
    if (!payload.doctor) {
        throw new AppError(status.BAD_REQUEST, "Doctor information is required")
    }

    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.doctor.email,
            password: payload.password,
            role: UserRole.DOCTOR,
            name: payload.doctor.name,
            needPasswordChange: true
        }
    })
    try {
        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor,

                }
            })
            const doctorSpecialityData = specialties.map(speciality => {
                return {
                    doctorId: doctorData.id,
                    specialityId: speciality.id
                }
            })
            await tx.doctorSpeciality.createMany({
                data: doctorSpecialityData
            })
            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },

                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    designation: true,
                    qualification: true,
                    currentWorkPlace: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                            image: true,
                            status: true,
                            emailVerified: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    specialities: {
                        select: {
                            speciality: {
                                select: {
                                    title: true,
                                    description: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })
            return doctor
        })
        return result
    } catch (error) {

        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw error
    }
}


export const userService = {
    createDoctor
}