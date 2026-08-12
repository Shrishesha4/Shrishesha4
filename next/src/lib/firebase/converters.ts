import type { QueryDocumentSnapshot, FirestoreDataConverter } from "firebase/firestore"
import type { Task } from "@/lib/types/task"
import type { Project } from "@/lib/types/project"
import type { InboxItem } from "@/lib/types/inbox-item"
import type { Tag } from "@/lib/types/tag"
import type { DailyPlan } from "@/lib/types/daily-plan"
import type { ActivityEntry } from "@/lib/types/activity"
import type {
  FinanceAccount,
  Transaction,
  Budget,
  RecurringRule,
  FinanceCategory,
  FinancialGoal,
} from "@/lib/types/finance"
import type { AISuggestion } from "@/lib/types/ai-suggestion"

function makeConverter<T extends { id: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = data as T & Record<string, unknown>
      return rest
    },
    fromFirestore(snapshot: QueryDocumentSnapshot) {
      // "estimate" (not the SDK's default "none") so a serverTimestamp()
      // field on a locally-pending write (offline, or not yet server-acked)
      // reads back as an estimated client-side Timestamp instead of null —
      // callers throughout the app call .toDate()/.toMillis() unconditionally
      // on these fields and would otherwise crash on the very write they just made.
      const data = snapshot.data({ serverTimestamps: "estimate" })
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
export const financeAccountConverter = makeConverter<FinanceAccount>()
export const transactionConverter = makeConverter<Transaction>()
export const budgetConverter = makeConverter<Budget>()
export const recurringRuleConverter = makeConverter<RecurringRule>()
export const financeCategoryConverter = makeConverter<FinanceCategory>()
export const financialGoalConverter = makeConverter<FinancialGoal>()
export const aiSuggestionConverter = makeConverter<AISuggestion>()
