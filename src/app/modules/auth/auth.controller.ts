import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const register = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authServices.register(req.body)
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "User Registered Successfull",
            data: result

        })
    }
)
const login = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authServices.login(req.body)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "User Logged In Successfull",
            data: result

        })
    }
)

export const authController = {
    register,
    login
}