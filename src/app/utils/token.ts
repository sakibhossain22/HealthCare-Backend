import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { envConfig } from "../../config/env";
import { Response } from "express";
import { cookieUtils } from "./cookie";

const getAccessToken = (payload: JwtPayload) => {
    const accessToken = jwtUtils.createToken(payload, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN } as SignOptions);
    return accessToken

}
const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(payload, envConfig.REFRESH_TOKEN_SECRET, { expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN } as SignOptions);
    return refreshToken
}

const setAccessTokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, "accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        // 1 day
        maxAge: 60 * 60 * 60 * 24
    })
}
const setRefreshTokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, "refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 60 * 24 * 7
    })
}
const setBetterAuthAccessTokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, "better-auth.session_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 60 * 24,
        path: "/"
    })
}
export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthAccessTokenCookie
}