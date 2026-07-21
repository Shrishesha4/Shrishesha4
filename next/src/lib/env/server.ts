import "server-only"
import { z } from "zod"

const serverEnvSchema = z.object({
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().email(),
  FIREBASE_PRIVATE_KEY: z.string().min(1),
  ALLOWED_EMAILS: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
})

export const serverEnv = serverEnvSchema.parse({
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  ALLOWED_EMAILS: process.env.ALLOWED_EMAILS,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

export const allowedEmailsList = (): string[] =>
  serverEnv.ALLOWED_EMAILS.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
