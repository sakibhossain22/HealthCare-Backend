import { NextFunction, Request, Response } from "express";
import { envConfig } from "../../config/env";
import status from "http-status";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (envConfig.NODE_ENV === "development") {
        console.error("Error: ", error);
    }
    const statusCode: number = status.INTERNAL_SERVER_ERROR
    const message: string = "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        message: message,
        error: error.message || "An unexpected error occurred"
    })
}