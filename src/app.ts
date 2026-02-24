import express, { Application, urlencoded } from "express";
import { indexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";
import cors from "cors";
import { envConfig } from "./config/env";

const app: Application = express()

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.set("views", path.resolve(process.cwd(), `src/app/template`))
app.use(cors({
    origin: [envConfig.FRONTEND_URL || "http://localhost:3000", envConfig.BETTER_AUTH_URL || "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use("/api/auth/", toNodeHandler(auth))

app.use(express.json());
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
app.use("/api/v1", indexRoutes)



// Basic route
// app.get('/', async (req: Request, res: Response) => {
//     const insrt = await prisma.specialty.create({
//         data: {
//             title: "MBBSSS",
//             description: "",
//             icon: " "
//         }
//     })
//     res.status(200).json({
//         success: true,
//         data: insrt
//     })
// });
app.use(globalErrorHandler)
app.use(notFound)

export default app