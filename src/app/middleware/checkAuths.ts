import { NextFunction, Request, Response } from "express";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import { cookieUtils } from "../utils/cookie";
import AppError from "../ErrorHelpers/AppError";
import status from "http-status";
import { prisma } from "../lib/prisma";
import { jwtUtils } from "../utils/jwt";
import { envConfig } from "../../config/env";

export const checkAuth = (...authRole: UserRole[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = cookieUtils.getCookie(req, "better-auth.session_token")
        if (!sessionToken) {
            throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, Invalid token")
        }
        if (sessionToken) {
            const sessionExists = await prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date()
                    }
                },
                include: {
                    user: true
                }
            })
            if (sessionExists && sessionExists.user) {
                const user = sessionExists.user
                const now = new Date()

                const expiredAt = new Date(sessionExists.expiresAt)
                const createdAt = new Date(sessionExists.createdAt)

                const sessionLifeTime = expiredAt.getTime() - createdAt.getTime()
                const timeRemaining = expiredAt.getTime() - now.getTime()

                const parcentanceRemaining = (timeRemaining / sessionLifeTime) * 100
                if (parcentanceRemaining < 20) {
                    res.setHeader('X-Session-Refresh', "true")
                    res.setHeader('X-Session-Expires-At', expiredAt.toISOString())
                    res.setHeader('X-Time-Remaining', timeRemaining.toString())
                    console.log("sesion expiring soon......");
                }
                if (user.status === UserStatus.BLOCKED || UserStatus.DELETED) {
                    throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, user is not active")
                }
                if (user.isDeleted) {
                    throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, user is deleted")
                }
                if (authRole.length > 0 && !authRole.includes(user.role)) {
                    throw new AppError(status.FORBIDDEN, "Forbidden Access, You don't have permission to access this resource")
                }

            }
        }
        const accessToken = cookieUtils.getCookie(req, "accessToken")
        if (!accessToken) {
            throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, No access token was provided")
        }
        const verifyToken = jwtUtils.verifyToken(accessToken, envConfig.ACCESS_TOKEN_SECRET)
        if (!verifyToken.success) {
            throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, Invalid token")
        }
        if (authRole.length > 0 && !authRole.includes(verifyToken.data!.role as UserRole)) {
            throw new AppError(status.UNAUTHORIZED, "Unauthroized Access, you do not have permission to access this resource")
        }
        next()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error)
    }
}