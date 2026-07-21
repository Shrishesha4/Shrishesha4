import type { Timestamp } from "firebase/firestore"

// Not modeled in plan.md §7 — minimal audit-log shape for the
// users/{uid}/activity/{activityId} path in §3.3. Entries are immutable
// (create-only, enforced in firestore.rules), so there is no updatedAt.
export type ActivityEntry = {
  id: string
  entityType: "task" | "project" | "inboxItem" | "tag"
  entityId: string
  action: "created" | "updated" | "completed" | "archived" | "deleted"
  summary: string
  metadata?: Record<string, unknown>
  createdAt: Timestamp
  createdBy: string
}
