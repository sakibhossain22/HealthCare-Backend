import { Specialty } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createSpeciality = async (payload: Specialty): Promise<Specialty> => {
    const data = await prisma.specialty.create({
        data: payload
    })
    return data
}
const getAllSpeciality = async (): Promise<Specialty[]> => {
    const data = await prisma.specialty.findMany()
    return data
}
const deleteSpeciality = async (id: string): Promise<Specialty> => {
    const data = await prisma.specialty.delete({
        where: { id }
    })
    return data
}






export const specialityServices = {
    createSpeciality,
    deleteSpeciality,
    getAllSpeciality
}