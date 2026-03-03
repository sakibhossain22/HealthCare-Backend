import dotenv from 'dotenv';
import AppError from '../app/ErrorHelpers/AppError';
import status from 'http-status';

dotenv.config()

interface EnvConfig {
    BETTER_AUTH_URL: string,
    BETTER_AUTH_SECRET: string,
    PORT: number,
    NODE_ENV: string,
    DATABASE_URL: string,
    REFRESH_TOKEN_EXPIRES_IN: string,
    ACCESS_TOKEN_EXPIRES_IN: string,
    ACCESS_TOKEN_SECRET: string,
    REFRESH_TOKEN_SECRET: string,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE?: string,
    BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN?: string,
    EMAIL_SENDER_SMTP_USER: string,
    EMAIL_SENDER_SMTP_PASS: string,
    EMAIL_SENDER_SMTP_HOST: string,
    EMAIL_SENDER_SMTP_PORT: string,
    GOOGLE_CALLBACK_URL: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    FRONTEND_URL: string,
    CLOUDINARY_API_SECRET?: string,
    CLOUDINARY_API_KEY?: string,
    CLOUDINARY_CLOUD_NAME?: string,
    STRIPE_WEBHOOK_SECRET: string,
    STRIPE_SECRET_KEY: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string
}

const requiredEnvVars = [
    'BETTER_AUTH_URL',
    'BETTER_AUTH_SECRET',
    'PORT',
    'NODE_ENV',
    'DATABASE_URL',
    'REFRESH_TOKEN_EXPIRES_IN',
    'ACCESS_TOKEN_EXPIRES_IN',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE',
    'BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN',
    'EMAIL_SENDER_SMTP_PORT',
    'EMAIL_SENDER_SMTP_USER',
    'EMAIL_SENDER_SMTP_PASS',
    'EMAIL_SENDER_SMTP_HOST',
    'GOOGLE_CALLBACK_URL',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CLIENT_ID',
    'FRONTEND_URL',
    'CLOUDINARY_API_SECRET',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_CLOUD_NAME',
    "STRIPE_WEBHOOK_SECRET",
    "STRIPE_SECRET_KEY",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD"
]

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new AppError(status.INTERNAL_SERVER_ERROR, `Missing environment variable: ${varName}`)
    }
})

const loadEnvConfig = (): EnvConfig => {
    return {
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
        NODE_ENV: process.env.NODE_ENV as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
        BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
        BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN,
        EMAIL_SENDER_SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT as string,
        EMAIL_SENDER_SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER as string,
        EMAIL_SENDER_SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS as string,
        EMAIL_SENDER_SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET as string,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    }
}

export const envConfig = loadEnvConfig()