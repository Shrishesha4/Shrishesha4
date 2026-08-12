import "server-only"
import type { NextRequest } from "next/server"
import { adminAuth } from "@/lib/firebase/admin"

// Shared bearer-token verification for authenticated Route Handlers — the
// client attaches the Firebase ID token as `Authorization: Bearer <token>`.
export async function verifyRequestAuth(
  request: NextRequest
): Promise<{ uid: string; email: string | undefined } | null> {
  const authHeader = request.headers.get("authorization")
  const idToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null
  if (!idToken) return null

  try {
    const decoded = await adminAuth.verifyIdToken(idToken)
    return { uid: decoded.uid, email: decoded.email }
  } catch {
    return null
  }
}
