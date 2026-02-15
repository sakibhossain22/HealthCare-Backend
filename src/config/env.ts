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
    BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN?: string
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
    'BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN'
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
        BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_ACCESS_TOKEN_EXPIRES_IN
    }
}

export const envConfig = loadEnvConfig()