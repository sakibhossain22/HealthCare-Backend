import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import { IRequestUser } from "../../interfaces/requestUser.interface";

const register = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authServices.register(req.body)
        const { accessToken, refreshToken, token, ...rest } = result

        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthAccessTokenCookie(res, token as string)
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "User Registered Successfull",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }

        })
    }
)
const login = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authServices.login(req.body)

        const { accessToken, refreshToken, token, ...rest } = result

        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthAccessTokenCookie(res, token)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "User Logged In Successfull",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }

        })
    }
)
const getMe = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authServices.getMe(req.user as IRequestUser)
        
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
    login,
    getMe
}