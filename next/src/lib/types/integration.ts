import type { Timestamp } from "firebase/firestore"

// Not modeled in plan.md §7 — minimal shape for the users/{uid}/integrations/{integrationId}
// path referenced in §3.3. Fixed doc id "telegram" per user (single bot, single chat linked).
export type TelegramIntegration = {
  id: "telegram"
  chatId: number
  username?: string | null
  linkedAt: Timestamp
  active: boolean
}
