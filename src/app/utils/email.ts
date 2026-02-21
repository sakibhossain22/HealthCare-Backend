import nodemailer from "nodemailer"
import { envConfig } from "../../config/env"
import AppError from "../ErrorHelpers/AppError"
import status from "http-status"
import path from "path"
import ejs from "ejs";
const transporter = nodemailer.createTransport({
    host: envConfig.EMAIL_SENDER_SMTP_HOST,
    secure: true,
    auth: {
        user: envConfig.EMAIL_SENDER_SMTP_USER,
        pass: envConfig.EMAIL_SENDER_SMTP_PASS
    },
    port: parseInt(envConfig.EMAIL_SENDER_SMTP_PORT)
})
interface SendEmailOptions {
    to: string,
    subject: string,
    templateName: string,
    templateData: Record<string, string | number | boolean | object>,
    attachments?: {
        fileName: string,
        content: Buffer | string,
        contentType: string
    }[];
}
export const sendEmail = async ({ to, subject, templateName, templateData, attachments, }: SendEmailOptions) => {

    try {
        const templatePath = path.resolve(process.cwd(), `src/app/template/${templateName}.ejs`)
        const html = await ejs.renderFile(templatePath, templateData)
        const info = await transporter.sendMail({
            from: envConfig.EMAIL_SENDER_SMTP_USER,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map((attachment) => ({
                filename: attachment.fileName,
                content: attachment.content,
                contentType: attachment.contentType
            }))
        })
        console.log(`Email Send To ${info.messageId}`);
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            console.log("Email Sending Error ", error.message)
            throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to send email")
        }
    }
}