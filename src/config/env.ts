import dotenv from 'dotenv';

dotenv.config()

interface EnvConfig {
    BETTER_AUTH_URL: string,
    BETTER_AUTH_SECRET: string,
    PORT: number,
    NODE_ENV: string,
    DATABASE_URL : string
}

const requiredEnvVars = [
    'BETTER_AUTH_URL',
    'BETTER_AUTH_SECRET',
    'PORT', 
    'NODE_ENV',
    'DATABASE_URL'
]

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`)
    }
})

const loadEnvConfig = (): EnvConfig => {
    return {
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
        NODE_ENV: process.env.NODE_ENV as string,
        DATABASE_URL: process.env.DATABASE_URL as string
    }
}

export const envConfig = loadEnvConfig()