import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";

const register = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authServices.register(req.body)
        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "User Registered Successfull",
            data: result

        })
    }
)

export const authController = {
    register
}