/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response, urlencoded } from "express";
import { indexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";
import cors from "cors";
import { envConfig } from "./config/env";
import qs from "qs";
import { PaymentController } from "./app/modules/payment/payment.controller";
import { AppointmentService } from "./app/modules/appoinment/appointment.service";
import cron from "node-cron";

const app: Application = express()
app.set("query parser", (str: string) => qs.parse(str, { allowDots: true }))
app.use(express.urlencoded({ extended: true }));

cron.schedule("*/25 * * * *", async () => {
    try {
        console.log("Running cron job to cancel unpaid appointments...");
        await AppointmentService.cancelUnpaidAppointments();
    } catch (error: any) {
        console.error("Error occurred while canceling unpaid appointments:", error.message);
    }
})


app.set("view engine", "ejs")
app.set("views", path.resolve(process.cwd(), `src/app/template`))

// Stripe webhook route

app.post("/webhook", express.raw({ type: "application/json" }), PaymentController.handleStripeWebhookEvent)

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
app.get('/', async (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: 'API is working',
    })
});

app.use(globalErrorHandler)
app.use(notFound)

export default app