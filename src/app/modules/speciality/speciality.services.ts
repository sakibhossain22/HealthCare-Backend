import { Speciality } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createSpeciality = async (payload: Speciality): Promise<Speciality> => {
    const data = await prisma.speciality.create({
        data: payload
    })
    return data
}
const getAllSpeciality = async (): Promise<Speciality[]> => {
    const data = await prisma.speciality.findMany()
    return data
}
const deleteSpeciality = async (id: string): Promise<Speciality> => {
    const data = await prisma.speciality.delete({
        where: { id }
    })
    return data
}






export const specialityServices = {
    createSpeciality,
    deleteSpeciality,
    getAllSpeciality
}