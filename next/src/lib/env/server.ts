import "server-only"
import { z } from "zod"

// `KEY=` with nothing after the `=` in a .env file yields an empty string,
// not undefined — plain `.optional()` doesn't treat "" as absent, so an
// unset-but-present optional var would fail its `.min(1)` check. Coerce ""
// to undefined first so leaving a key blank behaves the same as omitting it.
function optionalNonEmpty(schema: z.ZodString) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema.optional())
}

const serverEnvSchema = z.object({
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().email(),
  FIREBASE_PRIVATE_KEY: z.string().min(1),
  ALLOWED_EMAILS: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  // Telegram/ntfy are optional integrations — the app must run fully without
  // them configured (plan.md Phase 4 is opt-in), so these are left unset-able
  // rather than required. Route handlers check presence at call time and
  // return a clear "not configured" response instead of crashing at boot.
  TELEGRAM_BOT_TOKEN: optionalNonEmpty(z.string().min(1)),
  TELEGRAM_WEBHOOK_SECRET: optionalNonEmpty(z.string().min(1)),
  NTFY_BASE_URL: optionalNonEmpty(z.string().url()),
  NTFY_TOPIC: optionalNonEmpty(z.string().min(1)),
  NTFY_ACCESS_TOKEN: optionalNonEmpty(z.string().min(1)),
  // AI is likewise opt-in — the app must run fully without it configured.
  OPENROUTER_API_KEY: optionalNonEmpty(z.string().min(1)),
  OPENROUTER_MODEL: z.string().min(1).default("openai/gpt-4o-mini"),
})

export const serverEnv = serverEnvSchema.parse({
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  ALLOWED_EMAILS: process.env.ALLOWED_EMAILS,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
  NTFY_BASE_URL: process.env.NTFY_BASE_URL,
  NTFY_TOPIC: process.env.NTFY_TOPIC,
  NTFY_ACCESS_TOKEN: process.env.NTFY_ACCESS_TOKEN,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL,
})

export const allowedEmailsList = (): string[] =>
  serverEnv.ALLOWED_EMAILS.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
