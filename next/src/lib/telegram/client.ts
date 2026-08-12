import "server-only"
import { serverEnv } from "@/lib/env/server"

export function isTelegramConfigured(): boolean {
  return !!serverEnv.TELEGRAM_BOT_TOKEN
}

export async function sendTelegramMessage(chatId: number | string, text: string): Promise<boolean> {
  if (!serverEnv.TELEGRAM_BOT_TOKEN) return false

  const response = await fetch(
    `https://api.telegram.org/bot${serverEnv.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    }
  )
  return response.ok
}
