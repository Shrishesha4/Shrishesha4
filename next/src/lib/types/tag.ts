import type { BaseDocument } from "@/lib/types/base"

// Not modeled in plan.md §7 — minimal shape inferred from tagIds: string[]
// usage on Task/Project and the users/{uid}/tags/{tagId} path in §3.3.
export type Tag = BaseDocument & {
  name: string
  color?: string
}
