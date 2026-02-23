import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import AppError from "../../ErrorHelpers/AppError";
import { cookieFunc } from "../../utils/cookie";

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
const verifyEmail = catchAsync(
    async (req: Request, res: Response) => {
        const { email, otp } = req.body
        await authServices.verifyEmail(email, otp)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Email Verification Successfull",

        })
    }
)
const logoutUser = catchAsync(
    async (req: Request, res: Response) => {
        const sessionToken = req.cookies["better-auth.session_token"]
        const result = await authServices.logoutUser(sessionToken)
        cookieFunc.clearCookie(res, "accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        cookieFunc.clearCookie(res, "refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        cookieFunc.clearCookie(res, "better-auth.session_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "User Logged Out Successfully",
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
const forgetPassword = catchAsync(
    async (req: Request, res: Response) => {
        const { email } = req.body
        await authServices.forgetPassword(email)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Password reset otp send to email Successfull",

        })
    }
)
const resetPassword = catchAsync(
    async (req: Request, res: Response) => {
        const { email, otp, newPassword } = req.body
        await authServices.resetPassword(email, otp, newPassword)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Password Reset Successfull",

        })
    }
)
const googleLogin = catchAsync(
    async (req: Request, res: Response) => {

    }
)
const googleLoginSuccess = catchAsync(
    async (req: Request, res: Response) => {

    }
)
const handleOauthError = catchAsync(
    async (req: Request, res: Response) => {

    }
)
export const authController = {
    register,
    logoutUser,
    login,
    getMe,
    getNewToken,
    changePassword,
    verifyEmail,
    resetPassword,
    forgetPassword,
    handleOauthError,
    googleLoginSuccess,
    googleLogin
}