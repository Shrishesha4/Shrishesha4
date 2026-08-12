import { NextRequest, NextResponse } from "next/server"
import { serverEnv } from "@/lib/env/server"
import { sendTelegramMessage } from "@/lib/telegram/client"
import { parseTelegramMessage, HELP_TEXT } from "@/lib/telegram/commands"
import { consumeTelegramLinkCode } from "@/lib/telegram/link-codes"
import { linkTelegramChat, findUidByTelegramChatId } from "@/lib/telegram/integration-admin"
import {
  createInboxItemFromTelegram,
  createTaskFromTelegram,
  createTransactionFromTelegram,
  getDefaultAccountId,
  getTodaySummaryText,
  getNextSuggestionText,
} from "@/lib/telegram/actions"
import { rupeesToMinor, formatMinor } from "@/lib/finance/money"

type TelegramUpdate = {
  message?: {
    chat: { id: number }
    from?: { username?: string }
    text?: string
  }
}

export async function POST(request: NextRequest) {
  // Telegram sets this header exactly as configured via setWebhook's secret_token —
  // constant-time-insensitive comparison isn't critical here (not a crypto signature,
  // just a shared secret Telegram echoes back), but a strict equality check is correct.
  const secretHeader = request.headers.get("x-telegram-bot-api-secret-token")
  if (!serverEnv.TELEGRAM_WEBHOOK_SECRET || secretHeader !== serverEnv.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const update = (await request.json()) as TelegramUpdate
  const message = update.message
  if (!message?.text) {
    return NextResponse.json({ ok: true })
  }

  const chatId = message.chat.id
  const username = message.from?.username ?? null
  const parsed = parseTelegramMessage(message.text)

  if (parsed.type === "start") {
    if (!parsed.code) {
      await sendTelegramMessage(
        chatId,
        "Open Settings in the app and tap \"Link Telegram\" to get a code, then send /start &lt;code&gt; here."
      )
      return NextResponse.json({ ok: true })
    }
    const uid = await consumeTelegramLinkCode(parsed.code)
    if (!uid) {
      await sendTelegramMessage(chatId, "That code is invalid or expired. Generate a new one in Settings.")
      return NextResponse.json({ ok: true })
    }
    await linkTelegramChat(uid, chatId, username)
    await sendTelegramMessage(chatId, "Linked! You can now use /quick, /task, /spent, /today, /next, and /help.")
    return NextResponse.json({ ok: true })
  }

  // All other commands require a linked, known chat — unlinked senders get
  // no reply at all (don't engage with untrusted/unattributed messages).
  const uid = await findUidByTelegramChatId(chatId)
  if (!uid) {
    return NextResponse.json({ ok: true })
  }

  switch (parsed.type) {
    case "help": {
      await sendTelegramMessage(chatId, HELP_TEXT)
      break
    }
    case "quick": {
      if (!parsed.text) {
        await sendTelegramMessage(chatId, "Usage: /quick &lt;text&gt;")
        break
      }
      await createInboxItemFromTelegram(uid, parsed.text)
      await sendTelegramMessage(chatId, "Captured to your inbox.")
      break
    }
    case "task": {
      if (!parsed.text) {
        await sendTelegramMessage(chatId, "Usage: /task &lt;text&gt;")
        break
      }
      await createTaskFromTelegram(uid, parsed.text)
      await sendTelegramMessage(chatId, `Task created: ${parsed.text}`)
      break
    }
    case "spent": {
      const accountId = await getDefaultAccountId(uid)
      if (!accountId) {
        await sendTelegramMessage(chatId, "Set up a finance account in the app first.")
        break
      }
      const amountMinor = rupeesToMinor(parsed.amount)
      await createTransactionFromTelegram(uid, {
        accountId,
        amountMinor,
        description: parsed.description,
      })
      await sendTelegramMessage(
        chatId,
        `Logged expense of ${formatMinor(amountMinor)} — marked for review in the app.`
      )
      break
    }
    case "today": {
      const summary = await getTodaySummaryText(uid)
      await sendTelegramMessage(chatId, summary)
      break
    }
    case "next": {
      const suggestion = await getNextSuggestionText(uid)
      await sendTelegramMessage(chatId, suggestion)
      break
    }
    case "plain_text": {
      await createInboxItemFromTelegram(uid, parsed.text)
      await sendTelegramMessage(chatId, "Saved as a draft in your inbox.")
      break
    }
    case "empty":
      break
  }

  return NextResponse.json({ ok: true })
}
