import type { Timestamp } from "firebase/firestore"

export type AISuggestionKind =
  | "task_extraction"
  | "task_breakdown"
  | "daily_plan"
  | "weekly_review"
  | "finance_category"
  | "finance_insight"

export type AISuggestionStatus = "pending" | "accepted" | "rejected" | "expired"

export type AISuggestion = {
  id: string
  kind: AISuggestionKind
  status: AISuggestionStatus
  inputSummary: string
  output: Record<string, unknown>
  relatedEntityIds: string[]
  model: string
  createdAt: Timestamp
  createdBy: string
  resolvedAt?: Timestamp | null
}
