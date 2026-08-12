import { NextRequest, NextResponse } from "next/server"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { sendNotification } from "@/lib/notifications/send"

export async function POST(request: NextRequest) {
  const auth = await verifyRequestAuth(request)
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await sendNotification(auth.uid, {
    severity: "action_required",
    title: "Test notification",
    body: "This is a test notification from your Personal Command Center.",
  })

  return NextResponse.json({ ok: true })
}
