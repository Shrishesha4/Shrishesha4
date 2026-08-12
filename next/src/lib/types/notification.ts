import type { Timestamp } from "firebase/firestore"

export type NotificationSeverity = "critical" | "action_required" | "informational" | "digest"
export type NotificationChannel = "telegram" | "ntfy" | "in_app"
export type NotificationDeliveryStatus = "sent" | "failed" | "skipped"

// Not modeled in plan.md §7 — minimal shapes for the
// users/{uid}/notificationPreferences/{preferenceId} and
// users/{uid}/notifications/{notificationId} paths referenced in §3.3.
export type NotificationPreferences = {
  id: "settings"
  telegramEnabled: boolean
  ntfyEnabled: boolean
  quietHoursStart: string | null // "HH:mm", Asia/Kolkata
  quietHoursEnd: string | null // "HH:mm", Asia/Kolkata
}

export type NotificationHistoryEntry = {
  id: string
  severity: NotificationSeverity
  channel: NotificationChannel
  title: string
  body: string
  status: NotificationDeliveryStatus
  error?: string
  createdAt: Timestamp
}
