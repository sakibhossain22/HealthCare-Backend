import { NextFunction, Request, Response } from "express";
import { envConfig } from "../../config/env";
import status from "http-status";
import z from "zod";
import { TErroResponse, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../ErrorHelpers/handleZodError";
import AppError from "../ErrorHelpers/AppError";



// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (envConfig.NODE_ENV === "development") {
        console.error("Error: ", error);
    }
    let errorSources: TErrorSources[] = []
    let statusCode: number = status.INTERNAL_SERVER_ERROR
    let message: string = "Internal Server Error"
    let stack: string | undefined = undefined

    if (error instanceof z.ZodError) {
        const simpliedError = handleZodError(error)
        statusCode = simpliedError.statusCode || status.BAD_REQUEST
        message = simpliedError.message
        errorSources = [...simpliedError.errorSources || []]
        stack = error.stack

    } else if (error instanceof AppError) {
        statusCode = error.statusCode || status.INTERNAL_SERVER_ERROR
        message = error.message || message
        stack = error.stack
        errorSources = [
            {
                path: "",
                message: ""
            }
        ]
    }
    else if (error instanceof Error) {
        statusCode = status.INTERNAL_SERVER_ERROR
        message = error.message || message
        stack = error.stack
    }


    const errorResponse: TErroResponse = {
        statusCode,
        success: false,
        message,
        errorSources,
        stack: envConfig.NODE_ENV === "development" ? stack : undefined,
        error: envConfig.NODE_ENV === "developement" ? error : undefined,
    }
    res.status(statusCode).json(errorResponse)
}