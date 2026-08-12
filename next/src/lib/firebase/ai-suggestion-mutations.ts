import { doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { createTask } from "@/lib/firebase/task-mutations"
import { createInboxItem } from "@/lib/firebase/inbox-mutations"
import { saveDailyPlan } from "@/lib/firebase/daily-plan-mutations"
import { updateTransaction, confirmTransaction } from "@/lib/firebase/transaction-mutations"
import type { InboxExtractionResult } from "@/lib/schemas/ai.schema"
import type { FinanceCategory } from "@/lib/types/finance"

function suggestionRef(uid: string, suggestionId: string) {
  return doc(db, "users", uid, "aiSuggestions", suggestionId)
}

export async function rejectSuggestion(uid: string, suggestionId: string): Promise<void> {
  await updateDoc(suggestionRef(uid, suggestionId), {
    status: "rejected",
    resolvedAt: serverTimestamp(),
  })
}

// Inbox extraction: each item the user kept ("include: true", after any inline
// edits) becomes a real task, or an inbox draft for types we don't auto-create
// (notes have no data model yet; transactions need an account/amount AI can't
// reliably infer from free text, so they land as a draft to convert manually).
export async function acceptInboxExtraction(
  uid: string,
  suggestionId: string,
  items: Array<InboxExtractionResult["items"][number] & { include: boolean }>
): Promise<void> {
  const createdIds: string[] = []

  for (const item of items) {
    if (!item.include) continue
    if (item.type === "task") {
      const id = await createTask(uid, {
        title: item.title,
        description: "",
        status: "planned",
        priority: item.priority ?? "medium",
        tagIds: [],
        projectId: null,
        scheduledFor: null,
      })
      createdIds.push(id)
    } else {
      const id = await createInboxItem(uid, item.title, "ai")
      createdIds.push(id)
    }
  }

  await updateDoc(suggestionRef(uid, suggestionId), {
    status: "accepted",
    resolvedAt: serverTimestamp(),
    relatedEntityIds: createdIds,
  })
}

export async function acceptTaskBreakdown(
  uid: string,
  suggestionId: string,
  subtaskTitles: string[],
  projectId: string | null
): Promise<void> {
  const createdIds: string[] = []
  for (const title of subtaskTitles) {
    const id = await createTask(uid, {
      title,
      description: "",
      status: "planned",
      priority: "medium",
      tagIds: [],
      projectId,
      scheduledFor: null,
    })
    createdIds.push(id)
  }

  await updateDoc(suggestionRef(uid, suggestionId), {
    status: "accepted",
    resolvedAt: serverTimestamp(),
    relatedEntityIds: createdIds,
  })
}

export async function acceptDailyPlan(
  uid: string,
  suggestionId: string,
  selectedTaskIds: string[]
): Promise<void> {
  const today = new Date().toISOString().slice(0, 10)
  await saveDailyPlan(uid, today, {
    taskIds: selectedTaskIds,
    suggestedTaskId: selectedTaskIds[0] ?? null,
  })
  await updateDoc(suggestionRef(uid, suggestionId), {
    status: "accepted",
    resolvedAt: serverTimestamp(),
    relatedEntityIds: selectedTaskIds,
  })
}

// Weekly review is read-only — accepting just acknowledges it, no entities created.
export async function acknowledgeWeeklyReview(uid: string, suggestionId: string): Promise<void> {
  await updateDoc(suggestionRef(uid, suggestionId), {
    status: "accepted",
    resolvedAt: serverTimestamp(),
  })
}

const HIGH_CONFIDENCE_THRESHOLD = 0.7

export async function acceptFinanceCategorization(
  uid: string,
  suggestionId: string,
  transactionId: string,
  categoryName: string | null,
  normalizedMerchant: string | null,
  confidence: number,
  categories: FinanceCategory[]
): Promise<void> {
  const category = categoryName
    ? categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase())
    : undefined

  await updateTransaction(uid, transactionId, {
    categoryId: category?.id ?? null,
    merchant: normalizedMerchant ?? undefined,
  })

  // Per plan.md: require explicit user confirmation when confidence is low —
  // only auto-confirm the transaction (flip out of the review queue) when the
  // model was confident.
  if (confidence >= HIGH_CONFIDENCE_THRESHOLD) {
    await confirmTransaction(uid, transactionId)
  }

  await updateDoc(suggestionRef(uid, suggestionId), {
    status: "accepted",
    resolvedAt: serverTimestamp(),
    relatedEntityIds: [transactionId],
  })
}
