import type { Timestamp } from "firebase/firestore"

// Not modeled in plan.md §7 — minimal shape for the users/{uid}/dailyPlans/{date}
// path referenced in §3.3 and the Phase 2 "basic daily plan document" task.
export type DailyPlan = {
  id: string // YYYY-MM-DD, same as the document id
  date: string // YYYY-MM-DD
  taskIds: string[]
  suggestedTaskId?: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}
