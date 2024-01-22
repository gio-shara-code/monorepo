import { config as dotenvConfig } from 'dotenv'
dotenvConfig()
import { parseEnv } from 'znv'
import { z } from 'zod'

export const config = parseEnv(process.env, {
    RSA_PRIVATE_KEY: z.string(),
    RSA_PUBLIC_KEY: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
})
