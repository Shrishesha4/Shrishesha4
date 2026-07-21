import type {
  QueryDocumentSnapshot,
  SnapshotOptions,
  FirestoreDataConverter,
} from "firebase/firestore"
import type { Task } from "@/lib/types/task"
import type { Project } from "@/lib/types/project"
import type { InboxItem } from "@/lib/types/inbox-item"
import type { Tag } from "@/lib/types/tag"
import type { DailyPlan } from "@/lib/types/daily-plan"
import type { ActivityEntry } from "@/lib/types/activity"

function makeConverter<T extends { id: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = data as T & Record<string, unknown>
      return rest
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
      const data = snapshot.data(options)
      return { id: snapshot.id, ...data } as T
    },
  }
}

export const taskConverter = makeConverter<Task>()
export const projectConverter = makeConverter<Project>()
export const inboxItemConverter = makeConverter<InboxItem>()
export const tagConverter = makeConverter<Tag>()
export const dailyPlanConverter = makeConverter<DailyPlan>()
export const activityConverter = makeConverter<ActivityEntry>()
