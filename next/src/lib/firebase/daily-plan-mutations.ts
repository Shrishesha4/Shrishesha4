import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

export async function saveDailyPlan(
  uid: string,
  date: string,
  input: { taskIds: string[]; suggestedTaskId: string | null }
) {
  const ref = doc(db, "users", uid, "dailyPlans", date)
  const existing = await getDoc(ref)

  await setDoc(
    ref,
    {
      date,
      taskIds: input.taskIds,
      suggestedTaskId: input.suggestedTaskId,
      updatedAt: serverTimestamp(),
      createdBy: uid,
      ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  )
}
