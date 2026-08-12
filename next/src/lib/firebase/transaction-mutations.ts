import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { transactionConverter } from "@/lib/firebase/converters"
import { writeActivityEntry } from "@/lib/activity/log"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import { formatMinor } from "@/lib/finance/money"
import type {
  TransactionFormInput,
  QuickExpenseInput,
} from "@/lib/schemas/finance.schema"
import type { ParsedImportRow } from "@/lib/finance/csv"

function dateOnlyToTimestamp(dateStr: string): Timestamp {
  return Timestamp.fromDate(new Date(`${dateStr}T00:00:00`))
}

export async function createTransaction(
  uid: string,
  input: TransactionFormInput,
  source: "manual" | "telegram" | "csv_import" | "bank_sync" = "manual"
) {
  const ref = doc(
    collection(db, "users", uid, "transactions").withConverter(transactionConverter)
  )
  await setDoc(ref, {
    ...omitUndefined(input),
    destinationAccountId: input.destinationAccountId ?? null,
    categoryId: input.categoryId ?? null,
    currency: "INR",
    occurredAt: dateOnlyToTimestamp(input.occurredAt),
    tags: input.tags,
    source,
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  await writeActivityEntry(uid, {
    entityType: "transaction",
    entityId: ref.id,
    action: "created",
    summary: `Logged ${input.type} of ${formatMinor(input.amountMinor)}`,
  })
  return ref.id
}

export async function createQuickExpense(uid: string, input: QuickExpenseInput) {
  const ref = doc(
    collection(db, "users", uid, "transactions").withConverter(transactionConverter)
  )
  await setDoc(ref, {
    accountId: input.accountId,
    destinationAccountId: null,
    type: "expense",
    amountMinor: input.amountMinor,
    currency: "INR",
    occurredAt: serverTimestamp(),
    categoryId: input.categoryId ?? null,
    merchant: input.merchant ?? "",
    description: "",
    tags: [],
    source: "manual",
    reviewStatus: "confirmed",
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  await writeActivityEntry(uid, {
    entityType: "transaction",
    entityId: ref.id,
    action: "created",
    summary: `Logged expense of ${formatMinor(input.amountMinor)}`,
  })
  return ref.id
}

export async function updateTransaction(
  uid: string,
  transactionId: string,
  patch: Partial<TransactionFormInput>
) {
  const ref = doc(db, "users", uid, "transactions", transactionId)
  const { occurredAt, ...rest } = patch
  await updateDoc(ref, {
    ...omitUndefined(rest),
    ...(occurredAt ? { occurredAt: dateOnlyToTimestamp(occurredAt) } : {}),
    updatedAt: serverTimestamp(),
  })
}

export async function confirmTransaction(uid: string, transactionId: string) {
  const ref = doc(db, "users", uid, "transactions", transactionId)
  await updateDoc(ref, { reviewStatus: "confirmed", updatedAt: serverTimestamp() })
}

// Firestore caps a single batch at 500 writes — chunk defensively for large imports.
const BATCH_CHUNK_SIZE = 400

export async function importTransactions(uid: string, rows: ParsedImportRow[]) {
  const importable = rows.filter(
    (row) => row.errors.length === 0 && row.accountId && row.amountMinor !== null && row.date
  )

  for (let i = 0; i < importable.length; i += BATCH_CHUNK_SIZE) {
    const chunk = importable.slice(i, i + BATCH_CHUNK_SIZE)
    const batch = writeBatch(db)
    for (const row of chunk) {
      const ref = doc(collection(db, "users", uid, "transactions"))
      batch.set(ref, {
        accountId: row.accountId,
        destinationAccountId: null,
        type: row.type,
        amountMinor: row.amountMinor,
        currency: "INR",
        occurredAt: dateOnlyToTimestamp(row.date as string),
        categoryId: row.categoryId,
        merchant: row.merchant,
        description: row.description,
        tags: [],
        source: "csv_import",
        reviewStatus: "needs_review",
        id: ref.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: uid,
        deletedAt: null,
      })
    }
    await batch.commit()
  }

  await writeActivityEntry(uid, {
    entityType: "transaction",
    entityId: "csv_import",
    action: "created",
    summary: `Imported ${importable.length} transaction${importable.length === 1 ? "" : "s"} from CSV`,
  })

  return importable.length
}

export async function deleteTransaction(uid: string, transactionId: string) {
  const ref = doc(db, "users", uid, "transactions", transactionId)
  await updateDoc(ref, { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() })
  await writeActivityEntry(uid, {
    entityType: "transaction",
    entityId: transactionId,
    action: "deleted",
    summary: "Deleted a transaction",
  })
}
