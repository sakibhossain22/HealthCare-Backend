import status from "http-status"
import { TErroResponse, TErrorSources } from "../interfaces/error.interface"
import z from "zod"

export const handleZodError = (error: z.ZodError): TErroResponse => {
    const errorSources: TErrorSources[] = []
    const statusCode: number = status.INTERNAL_SERVER_ERROR
    const message: string = "Zod Validation Error"


    error.issues.forEach((issue) => {
        errorSources.push({
            path: issue.path.join("=>"),
            message: issue.message,
        })
    })
    return {
        success: false,
        message,
        errorSources,
        statusCode
    }
}