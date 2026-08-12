import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { budgetConverter } from "@/lib/firebase/converters"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { BudgetFormInput } from "@/lib/schemas/finance.schema"

export async function createBudget(uid: string, input: BudgetFormInput) {
  const ref = doc(collection(db, "users", uid, "budgets").withConverter(budgetConverter))
  await setDoc(ref, {
    ...omitUndefined(input),
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  return ref.id
}

export async function updateBudget(uid: string, budgetId: string, patch: Partial<BudgetFormInput>) {
  const ref = doc(db, "users", uid, "budgets", budgetId)
  await updateDoc(ref, { ...omitUndefined(patch), updatedAt: serverTimestamp() })
}

export async function deleteBudget(uid: string, budgetId: string) {
  const ref = doc(db, "users", uid, "budgets", budgetId)
  await updateDoc(ref, { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() })
}
