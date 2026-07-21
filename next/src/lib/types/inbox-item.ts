import type { Timestamp } from "firebase/firestore"
import type { BaseDocument } from "@/lib/types/base"

export type InboxSource = "manual" | "telegram" | "gmail" | "system" | "ai"

export type InboxItem = BaseDocument & {
  source: InboxSource
  externalId?: string
  title: string
  content?: string
  metadata?: Record<string, unknown>
  receivedAt: Timestamp
  status: "unprocessed" | "processed" | "dismissed" | "snoozed"
  snoozedUntil?: Timestamp | null
  suggestedAction?: {
    type: "create_task" | "create_note" | "create_transaction" | "reply" | "ignore"
    confidence: number
    payload: Record<string, unknown>
  } | null
}
