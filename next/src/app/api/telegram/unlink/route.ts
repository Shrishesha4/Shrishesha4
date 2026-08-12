import { NextRequest, NextResponse } from "next/server"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { unlinkTelegramChat } from "@/lib/telegram/integration-admin"

export async function POST(request: NextRequest) {
  const auth = await verifyRequestAuth(request)
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await unlinkTelegramChat(auth.uid)
  return NextResponse.json({ ok: true })
}
