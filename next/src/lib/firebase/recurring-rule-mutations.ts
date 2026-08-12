import { collection, doc, serverTimestamp, setDoc, updateDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { recurringRuleConverter } from "@/lib/firebase/converters"
import { writeActivityEntry } from "@/lib/activity/log"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { RecurringRuleFormInput } from "@/lib/schemas/finance.schema"

function dateOnlyToTimestamp(dateStr: string): Timestamp {
  return Timestamp.fromDate(new Date(`${dateStr}T00:00:00`))
}

export async function createRecurringRule(uid: string, input: RecurringRuleFormInput) {
  const ref = doc(
    collection(db, "users", uid, "recurringRules").withConverter(recurringRuleConverter)
  )
  await setDoc(ref, {
    ...omitUndefined(input),
    categoryId: input.categoryId ?? null,
    nextExpectedAt: dateOnlyToTimestamp(input.nextExpectedAt),
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  await writeActivityEntry(uid, {
    entityType: "recurringRule",
    entityId: ref.id,
    action: "created",
    summary: `Added recurring ${input.type} "${input.name}"`,
  })
  return ref.id
}

export async function updateRecurringRule(
  uid: string,
  ruleId: string,
  patch: Partial<RecurringRuleFormInput>
) {
  const ref = doc(db, "users", uid, "recurringRules", ruleId)
  const { nextExpectedAt, ...rest } = patch
  await updateDoc(ref, {
    ...omitUndefined(rest),
    ...(nextExpectedAt ? { nextExpectedAt: dateOnlyToTimestamp(nextExpectedAt) } : {}),
    updatedAt: serverTimestamp(),
  })
}

export async function deleteRecurringRule(uid: string, ruleId: string) {
  const ref = doc(db, "users", uid, "recurringRules", ruleId)
  await updateDoc(ref, { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() })
}
