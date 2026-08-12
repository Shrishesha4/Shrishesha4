import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { financeAccountConverter } from "@/lib/firebase/converters"
import { writeActivityEntry } from "@/lib/activity/log"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { FinanceAccountFormInput } from "@/lib/schemas/finance.schema"

export async function createFinanceAccount(uid: string, input: FinanceAccountFormInput) {
  const ref = doc(
    collection(db, "users", uid, "financeAccounts").withConverter(financeAccountConverter)
  )
  await setDoc(ref, {
    ...omitUndefined(input),
    currency: "INR",
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  await writeActivityEntry(uid, {
    entityType: "financeAccount",
    entityId: ref.id,
    action: "created",
    summary: `Created account "${input.name}"`,
  })
  return ref.id
}

export async function updateFinanceAccount(
  uid: string,
  accountId: string,
  patch: Partial<FinanceAccountFormInput>
) {
  const ref = doc(db, "users", uid, "financeAccounts", accountId)
  await updateDoc(ref, { ...omitUndefined(patch), updatedAt: serverTimestamp() })
}

export async function archiveFinanceAccount(uid: string, accountId: string, name?: string) {
  const ref = doc(db, "users", uid, "financeAccounts", accountId)
  await updateDoc(ref, { archived: true, updatedAt: serverTimestamp() })
  await writeActivityEntry(uid, {
    entityType: "financeAccount",
    entityId: accountId,
    action: "archived",
    summary: name ? `Archived account "${name}"` : "Archived an account",
  })
}
