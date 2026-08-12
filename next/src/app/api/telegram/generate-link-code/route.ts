import { NextRequest, NextResponse } from "next/server"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { createTelegramLinkCode } from "@/lib/telegram/link-codes"
import { isTelegramConfigured } from "@/lib/telegram/client"

export async function POST(request: NextRequest) {
  const auth = await verifyRequestAuth(request)
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isTelegramConfigured()) {
    return NextResponse.json({ error: "Telegram is not configured on the server" }, { status: 503 })
  }

  const code = await createTelegramLinkCode(auth.uid)
  return NextResponse.json({ code })
}
