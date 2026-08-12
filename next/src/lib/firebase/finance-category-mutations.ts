import { collection, doc, serverTimestamp, setDoc, updateDoc, writeBatch } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { financeCategoryConverter } from "@/lib/firebase/converters"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { FinanceCategoryFormInput } from "@/lib/schemas/finance.schema"

export const DEFAULT_EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Groceries",
  "Transport",
  "Utilities",
  "Rent",
  "Shopping",
  "Entertainment",
  "Health",
  "Subscriptions",
  "Other",
]

export const DEFAULT_INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Other Income"]

// Deterministic doc id (kind + slugified name) rather than an auto-id — the
// seeding effect in use-finance-categories.ts can legitimately run from
// several components mounting concurrently (accounts/budgets/transactions
// pages, quick-expense dialog, etc. all call the hook), and each one's
// "is the collection empty?" check races the others. With a fixed id,
// re-seeding just overwrites the same 14 docs instead of creating
// duplicates — idempotent no matter how many times or how concurrently it runs.
function defaultCategoryDocId(kind: "income" | "expense", name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
  return `default-${kind}-${slug}`
}

export async function seedDefaultFinanceCategories(uid: string) {
  const batch = writeBatch(db)
  const collRef = collection(db, "users", uid, "financeCategories")

  for (const name of DEFAULT_EXPENSE_CATEGORIES) {
    const ref = doc(collRef, defaultCategoryDocId("expense", name))
    batch.set(ref, {
      name,
      kind: "expense",
      color: "",
      icon: "",
      isDefault: true,
      id: ref.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: uid,
      deletedAt: null,
    })
  }
  for (const name of DEFAULT_INCOME_CATEGORIES) {
    const ref = doc(collRef, defaultCategoryDocId("income", name))
    batch.set(ref, {
      name,
      kind: "income",
      color: "",
      icon: "",
      isDefault: true,
      id: ref.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: uid,
      deletedAt: null,
    })
  }

  await batch.commit()
}

export async function createFinanceCategory(uid: string, input: FinanceCategoryFormInput) {
  const ref = doc(
    collection(db, "users", uid, "financeCategories").withConverter(financeCategoryConverter)
  )
  await setDoc(ref, {
    ...omitUndefined(input),
    isDefault: false,
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  return ref.id
}

export async function deleteFinanceCategory(uid: string, categoryId: string) {
  const ref = doc(db, "users", uid, "financeCategories", categoryId)
  await updateDoc(ref, { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() })
}
