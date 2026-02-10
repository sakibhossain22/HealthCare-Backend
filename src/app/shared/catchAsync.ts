import { NextFunction, RequestHandler, Response, Request } from "express"

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "speciality Fetched Failed",
                error: err || "Speciality Fetched Failed"
            })
        }
    }
}