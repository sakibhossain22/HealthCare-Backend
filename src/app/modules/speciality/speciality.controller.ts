import { Request, Response } from "express";
import { specialityServices } from "./speciality.services";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpeciality = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const data = await specialityServices.createSpeciality(payload)
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "speciality Inserted Successfully",
            data
        })
    }
)

const getAllSpeciality = catchAsync(
    async (req: Request, res: Response) => {
        const data = await specialityServices.getAllSpeciality()
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "speciality Fetched Successfully",
            data
        })
    }
)




const deleteSpeciality = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const data = await specialityServices.deleteSpeciality(id as string)
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "speciality Deleted Successfully",
            data
        })
    }
)

export const specialityController = {
    createSpeciality,
    deleteSpeciality,
    getAllSpeciality
}