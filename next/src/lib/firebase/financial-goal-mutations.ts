import { collection, doc, serverTimestamp, setDoc, updateDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { financialGoalConverter } from "@/lib/firebase/converters"
import { writeActivityEntry } from "@/lib/activity/log"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { FinancialGoalFormInput } from "@/lib/schemas/finance.schema"

function dateOnlyToTimestamp(dateStr: string): Timestamp {
  return Timestamp.fromDate(new Date(`${dateStr}T00:00:00`))
}

export async function createFinancialGoal(uid: string, input: FinancialGoalFormInput) {
  const ref = doc(
    collection(db, "users", uid, "financialGoals").withConverter(financialGoalConverter)
  )
  await setDoc(ref, {
    ...omitUndefined(input),
    accountId: input.accountId ?? null,
    targetDate: input.targetDate ? dateOnlyToTimestamp(input.targetDate) : null,
    achieved: input.currentAmountMinor >= input.targetAmountMinor,
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  await writeActivityEntry(uid, {
    entityType: "financialGoal",
    entityId: ref.id,
    action: "created",
    summary: `Created goal "${input.name}"`,
  })
  return ref.id
}

export async function updateFinancialGoal(
  uid: string,
  goalId: string,
  patch: Partial<FinancialGoalFormInput>
) {
  const ref = doc(db, "users", uid, "financialGoals", goalId)
  const { targetDate, ...rest } = patch
  await updateDoc(ref, {
    ...omitUndefined(rest),
    ...(targetDate !== undefined
      ? { targetDate: targetDate ? dateOnlyToTimestamp(targetDate) : null }
      : {}),
    ...(rest.currentAmountMinor !== undefined && rest.targetAmountMinor !== undefined
      ? { achieved: rest.currentAmountMinor >= rest.targetAmountMinor }
      : {}),
    updatedAt: serverTimestamp(),
  })
}

export async function deleteFinancialGoal(uid: string, goalId: string) {
  const ref = doc(db, "users", uid, "financialGoals", goalId)
  await updateDoc(ref, { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() })
}
