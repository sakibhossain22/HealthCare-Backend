import { NextFunction, Request, Response } from "express";
import { cookieUtils } from "../utils/cookie";
import AppError from "../ErrorHelpers/AppError";
import status from "http-status";
import { jwtUtils } from "../utils/jwt";
import { envConfig } from "../../config/env";
import { UserRole } from "../../generated/prisma/enums";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = cookieUtils.getCookie(req, "accessToken")
        if (!accessToken) {
            throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, No access token was provided")
        }
        const verifyToken = jwtUtils.verifyToken(accessToken, envConfig.ACCESS_TOKEN_SECRET)
        if (!verifyToken.success) {
            throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, Invalid token")
        }
        if (verifyToken.data!.role !== UserRole.ADMIN) {
            throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, you do not have permission to access this resource")
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error)
    }
}

