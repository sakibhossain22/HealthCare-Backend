import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import AppError from "../../ErrorHelpers/AppError";

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
const changePassword = catchAsync(
    async (req: Request, res: Response) => {
        const sessionToken = req.cookies["better-auth.session_token"]
        const payload = req.body
        const result = await authServices.changePassword(payload, sessionToken)
        const { accessToken, refreshToken, token } = result

        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthAccessTokenCookie(res, token as string)
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Password Changed Successfully",
            data: result

        })
    }
)
const getNewToken = catchAsync(
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken
        const sessionToken = req.cookies["better-auth.session_token"]
        if (!refreshToken) {
            throw new AppError(status.UNAUTHORIZED, "Refresh Token is missing");
        }
        const result = await authServices.getNewToken(refreshToken, sessionToken)

        const { newAccessToken, newRefreshToken, newsessionToken } = result

        tokenUtils.setAccessTokenCookie(res, newAccessToken)
        tokenUtils.setRefreshTokenCookie(res, newRefreshToken)
        tokenUtils.setBetterAuthAccessTokenCookie(res, newsessionToken)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "New Token Generated Successfully",
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                sessionToken: newsessionToken
            }

        })
    }
)

export const authController = {
    register,
    login,
    getMe,
    getNewToken,
    changePassword
}