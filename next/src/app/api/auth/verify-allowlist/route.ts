import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase/admin"
import { allowedEmailsList } from "@/lib/env/server"

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const idToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null

  if (!idToken) {
    return NextResponse.json({ allowed: false, error: "Missing bearer token" }, { status: 401 })
  }

  let email: string | undefined
  try {
    const decoded = await adminAuth.verifyIdToken(idToken)
    email = decoded.email
  } catch {
    return NextResponse.json({ allowed: false, error: "Invalid token" }, { status: 401 })
  }

  const allowed = !!email && allowedEmailsList().includes(email.toLowerCase())

  return NextResponse.json({ allowed })
}
