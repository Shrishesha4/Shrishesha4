import "server-only"
import { adminDb } from "@/lib/firebase/admin"
import { Timestamp, FieldValue } from "firebase-admin/firestore"

const LINK_CODE_TTL_MS = 10 * 60 * 1000 // 10 minutes
const LINK_CODES_COLLECTION = "telegramLinkCodes"

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code
}

// Top-level collection, managed exclusively via the Admin SDK (server-only) —
// never exposed to the client SDK, so no firestore.rules entry is needed;
// the default-deny catch-all already blocks any client read/write attempt.
export async function createTelegramLinkCode(uid: string): Promise<string> {
  const code = generateCode()
  await adminDb
    .collection(LINK_CODES_COLLECTION)
    .doc(code)
    .set({
      uid,
      createdAt: FieldValue.serverTimestamp(),
      expiresAt: Timestamp.fromMillis(Date.now() + LINK_CODE_TTL_MS),
    })
  return code
}

export async function consumeTelegramLinkCode(code: string): Promise<string | null> {
  const ref = adminDb.collection(LINK_CODES_COLLECTION).doc(code)
  const snap = await ref.get()
  if (!snap.exists) return null

  const data = snap.data()
  const expiresAt = data?.expiresAt as Timestamp | undefined
  await ref.delete()

  if (!expiresAt || expiresAt.toMillis() < Date.now()) return null
  return (data?.uid as string) ?? null
}
