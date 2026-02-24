import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (zodSchema: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data)
        }
        const validate = zodSchema.safeParse(req.body)

        if (!validate.success) {
            next(validate.error)
        } else {
            req.body = validate.data
            next()
        }
    }
}