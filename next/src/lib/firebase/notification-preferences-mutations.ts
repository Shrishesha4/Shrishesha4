import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { omitUndefined } from "@/lib/firebase/omit-undefined"

export async function updateNotificationPreferences(
  uid: string,
  patch: Partial<{
    telegramEnabled: boolean
    ntfyEnabled: boolean
    quietHoursStart: string | null
    quietHoursEnd: string | null
  }>
) {
  const ref = doc(db, "users", uid, "notificationPreferences", "settings")
  await setDoc(
    ref,
    { ...omitUndefined(patch), updatedAt: serverTimestamp() },
    { merge: true }
  )
}
