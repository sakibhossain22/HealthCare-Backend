import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { indexRoutes } from "./app/routes";

const app: Application = express()

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use("/api/v1", indexRoutes)



// Basic route
app.get('/', async (req: Request, res: Response) => {
    const insrt = await prisma.speciality.create({
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


export default app