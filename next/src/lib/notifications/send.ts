import "server-only"
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import { sendTelegramMessage, isTelegramConfigured } from "@/lib/telegram/client"
import { publishNtfy, isNtfyConfigured } from "@/lib/ntfy/client"
import { isWithinQuietHours } from "@/lib/notifications/quiet-hours"
import type { NotificationPreferences } from "@/lib/types/notification"
import type { NotificationSeverity, NotificationChannel } from "@/lib/types/notification"

async function writeHistory(
  uid: string,
  entry: {
    severity: NotificationSeverity
    channel: NotificationChannel
    title: string
    body: string
    status: "sent" | "failed" | "skipped"
    error?: string
  }
) {
  await adminDb
    .collection("users")
    .doc(uid)
    .collection("notifications")
    .add({ ...entry, createdAt: FieldValue.serverTimestamp() })
}

async function getPreferences(uid: string): Promise<NotificationPreferences> {
  const snap = await adminDb
    .collection("users")
    .doc(uid)
    .collection("notificationPreferences")
    .doc("settings")
    .get()
  const data = snap.data()
  return {
    id: "settings",
    telegramEnabled: data?.telegramEnabled ?? false,
    ntfyEnabled: data?.ntfyEnabled ?? false,
    quietHoursStart: data?.quietHoursStart ?? null,
    quietHoursEnd: data?.quietHoursEnd ?? null,
  }
}

async function getTelegramChatId(uid: string): Promise<number | null> {
  const snap = await adminDb
    .collection("users")
    .doc(uid)
    .collection("integrations")
    .doc("telegram")
    .get()
  return snap.exists ? ((snap.data()?.chatId as number) ?? null) : null
}

// Core sender, routes per plan.md's Notification Policy (§Phase 4):
// critical -> immediate Telegram + ntfy, bypasses quiet hours
// action_required -> Telegram + ntfy (batching queue is Phase 7/cron scope, sent immediately here), respects quiet hours
// informational -> in-app history only, no outbound send
// digest -> requires a scheduled job (Phase 7), recorded as skipped for now
export async function sendNotification(
  uid: string,
  input: { severity: NotificationSeverity; title: string; body: string }
): Promise<void> {
  if (input.severity === "informational") {
    await writeHistory(uid, { ...input, channel: "in_app", status: "sent" })
    return
  }

  if (input.severity === "digest") {
    await writeHistory(uid, {
      ...input,
      channel: "in_app",
      status: "skipped",
      error: "Digest delivery requires a scheduled job (Phase 7) — not sent live.",
    })
    return
  }

  const preferences = await getPreferences(uid)
  const suppressedByQuietHours =
    input.severity !== "critical" &&
    isWithinQuietHours(preferences.quietHoursStart, preferences.quietHoursEnd)

  if (preferences.telegramEnabled) {
    if (suppressedByQuietHours) {
      await writeHistory(uid, {
        ...input,
        channel: "telegram",
        status: "skipped",
        error: "Suppressed by quiet hours",
      })
    } else if (!isTelegramConfigured()) {
      await writeHistory(uid, {
        ...input,
        channel: "telegram",
        status: "skipped",
        error: "Telegram is not configured on the server",
      })
    } else {
      const chatId = await getTelegramChatId(uid)
      if (!chatId) {
        await writeHistory(uid, {
          ...input,
          channel: "telegram",
          status: "skipped",
          error: "No Telegram chat linked",
        })
      } else {
        const ok = await sendTelegramMessage(chatId, `<b>${input.title}</b>\n${input.body}`)
        await writeHistory(uid, {
          ...input,
          channel: "telegram",
          status: ok ? "sent" : "failed",
        })
      }
    }
  }

  if (preferences.ntfyEnabled) {
    if (suppressedByQuietHours) {
      await writeHistory(uid, {
        ...input,
        channel: "ntfy",
        status: "skipped",
        error: "Suppressed by quiet hours",
      })
    } else if (!isNtfyConfigured()) {
      await writeHistory(uid, {
        ...input,
        channel: "ntfy",
        status: "skipped",
        error: "ntfy is not configured on the server",
      })
    } else {
      const ok = await publishNtfy({
        title: input.title,
        message: input.body,
        priority: input.severity === "critical" ? 5 : 3,
      })
      await writeHistory(uid, { ...input, channel: "ntfy", status: ok ? "sent" : "failed" })
    }
  }

  if (!preferences.telegramEnabled && !preferences.ntfyEnabled) {
    await writeHistory(uid, { ...input, channel: "in_app", status: "sent" })
  }
}
