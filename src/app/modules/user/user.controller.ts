import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { ICreateDoctorPayload } from "./user.interface";
import { userService } from "./user.services";
import status from "http-status";


const createDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const data = await userService.createDoctor(payload as ICreateDoctorPayload)
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Doctor Created Successfully",
            data
        })
    }
)
export const userController = {
    createDoctor
}