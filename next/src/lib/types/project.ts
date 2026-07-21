import type { Timestamp } from "firebase/firestore"
import type { BaseDocument } from "@/lib/types/base"

export type ProjectStatus = "idea" | "active" | "paused" | "completed" | "archived"

export type Project = BaseDocument & {
  name: string
  description?: string
  status: ProjectStatus
  outcome?: string
  color?: string
  icon?: string
  targetDate?: Timestamp | null
  lastActivityAt?: Timestamp | null
  tagIds: string[]
}
