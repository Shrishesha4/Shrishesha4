import "server-only"
import { adminDb } from "@/lib/firebase/admin"
import { Timestamp } from "firebase-admin/firestore"

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS_PER_WINDOW = 30

// In-memory rate limiting doesn't survive across stateless serverless
// invocations — this uses a Firestore counter doc instead, consistent with
// how the rest of the app persists state.
export async function checkAiRateLimit(uid: string): Promise<{ allowed: boolean; remaining: number }> {
  const ref = adminDb.collection("users").doc(uid).collection("_internal").doc("aiRateLimit")

  return adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const now = Date.now()
    const data = snap.data()
    const windowStart = (data?.windowStart as Timestamp | undefined)?.toMillis() ?? 0
    const count = (data?.count as number | undefined) ?? 0

    if (now - windowStart > WINDOW_MS) {
      tx.set(ref, { windowStart: Timestamp.fromMillis(now), count: 1 })
      return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 }
    }

    if (count >= MAX_REQUESTS_PER_WINDOW) {
      return { allowed: false, remaining: 0 }
    }

    tx.set(ref, { windowStart: Timestamp.fromMillis(windowStart), count: count + 1 })
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - count - 1 }
  })
}
