import type { Timestamp } from "firebase/firestore"
import type { BaseDocument } from "@/lib/types/base"

export type TaskStatus =
  | "inbox"
  | "planned"
  | "in_progress"
  | "blocked"
  | "done"
  | "archived"

export type TaskPriority = "low" | "medium" | "high" | "urgent"
export type EnergyLevel = "low" | "medium" | "high"

export type Task = BaseDocument & {
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  energyLevel?: EnergyLevel
  projectId?: string | null
  parentTaskId?: string | null
  tagIds: string[]
  dueAt?: Timestamp | null
  scheduledFor?: string | null // YYYY-MM-DD
  estimatedMinutes?: number | null
  actualMinutes?: number | null
  completedAt?: Timestamp | null
  sortOrder: number
  source: "manual" | "telegram" | "gmail" | "ai" | "import"
}
