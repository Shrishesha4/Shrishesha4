import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { inboxItemConverter } from "@/lib/firebase/converters"

export async function createInboxItem(
  uid: string,
  content: string,
  source: "manual" | "telegram" | "gmail" | "system" | "ai" = "manual"
) {
  const ref = doc(
    collection(db, "users", uid, "inboxItems").withConverter(inboxItemConverter)
  )
  await setDoc(ref, {
    source,
    title: content.slice(0, 120),
    content,
    metadata: {},
    receivedAt: serverTimestamp(),
    status: "unprocessed",
    snoozedUntil: null,
    suggestedAction: null,
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  return ref.id
}

export async function markInboxItemProcessed(uid: string, itemId: string) {
  const ref = doc(db, "users", uid, "inboxItems", itemId)
  await updateDoc(ref, { status: "processed", updatedAt: serverTimestamp() })
}

export async function dismissInboxItem(uid: string, itemId: string) {
  const ref = doc(db, "users", uid, "inboxItems", itemId)
  await updateDoc(ref, { status: "dismissed", updatedAt: serverTimestamp() })
}

export async function snoozeInboxItem(uid: string, itemId: string, until: Date) {
  const ref = doc(db, "users", uid, "inboxItems", itemId)
  await updateDoc(ref, {
    status: "snoozed",
    snoozedUntil: Timestamp.fromDate(until),
    updatedAt: serverTimestamp(),
  })
}
