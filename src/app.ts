import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { indexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser"
const app: Application = express()

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser())

app.use("/api/v1", indexRoutes)



// Basic route
app.get('/', async (req: Request, res: Response) => {
    const insrt = await prisma.specialty.create({
        data: {
            title: "MBBSSS",
            description: "",
            icon: " "
        }
    })
    res.status(200).json({
        success: true,
        data: insrt
    })
});
app.use(globalErrorHandler)
app.use(notFound)

export default app