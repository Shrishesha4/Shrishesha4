import "server-only"
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"

const TELEGRAM_DOC_ID = "telegram"

export async function linkTelegramChat(
  uid: string,
  chatId: number,
  username: string | null
): Promise<void> {
  await adminDb
    .collection("users")
    .doc(uid)
    .collection("integrations")
    .doc(TELEGRAM_DOC_ID)
    .set({
      chatId,
      username,
      linkedAt: FieldValue.serverTimestamp(),
      active: true,
    })
}

export async function unlinkTelegramChat(uid: string): Promise<void> {
  await adminDb
    .collection("users")
    .doc(uid)
    .collection("integrations")
    .doc(TELEGRAM_DOC_ID)
    .delete()
}

// Collection-group lookup: given an inbound webhook chatId, find which user
// it belongs to. Requires a COLLECTION_GROUP index on `chatId` (see
// firestore.indexes.json) — collection-group queries are not covered by a
// collection's automatic single-field indexes.
export async function findUidByTelegramChatId(chatId: number): Promise<string | null> {
  const snap = await adminDb
    .collectionGroup("integrations")
    .where("chatId", "==", chatId)
    .limit(1)
    .get()
  if (snap.empty) return null
  const doc = snap.docs[0]
  return doc.ref.parent.parent?.id ?? null
}
