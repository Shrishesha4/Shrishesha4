import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import type { ActivityEntry } from "@/lib/types/activity"

export async function writeActivityEntry(
  uid: string,
  entry: Pick<ActivityEntry, "entityType" | "entityId" | "action" | "summary"> & {
    metadata?: Record<string, unknown>
  }
) {
  const ref = doc(collection(db, "users", uid, "activity"))
  await setDoc(ref, {
    ...entry,
    createdAt: serverTimestamp(),
    createdBy: uid,
  })
}
