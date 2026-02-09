import { Request, Response } from "express";
import { specialityServices } from "./speciality.services";

const createSpeciality = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const data = await specialityServices.createSpeciality(payload)
        res.status(200).json({
            success: true,
            message: "speciality created Successfully",
            data
        })
    } catch (err) {
        res.status(401).json({
            success: true,
            message: "speciality created Successfully",
            error: err || "Speciality Insert Failed"
        })
    }
}
const getAllSpeciality = async (req: Request, res: Response) => {
    try {
        const data = await specialityServices.getAllSpeciality()
        res.status(200).json({
            success: true,
            message: "speciality Fetched Successfully",
            data
        })
    } catch (err) {
        res.status(401).json({
            success: true,
            message: "speciality Fetched Successfully",
            error: err || "Speciality Fetched Failed"
        })
    }
}
const deleteSpeciality = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await specialityServices.deleteSpeciality(id as string)
        res.status(200).json({
            success: true,
            message: "speciality Deleted Successfully",
            data
        })
    } catch (err) {
        res.status(401).json({
            success: true,
            message: "speciality Deleted Failed",
            error: err || "Speciality Insert Failed"
        })
    }
}

export const specialityController = {
    createSpeciality,
    deleteSpeciality,
    getAllSpeciality
}