import type { TaskStatus, TaskPriority } from "@/lib/types/task"
import type { ProjectStatus } from "@/lib/types/project"
import type {
  AccountType,
  TransactionType,
  RecurringCadence,
} from "@/lib/types/finance"
import type { AISuggestionKind, AISuggestionStatus } from "@/lib/types/ai-suggestion"

export const taskStatusLabel: Record<TaskStatus, string> = {
  inbox: "Inbox",
  planned: "Planned",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
  archived: "Archived",
}

export const taskPriorityLabel: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  idea: "Idea",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  archived: "Archived",
}

export const accountTypeLabel: Record<AccountType, string> = {
  cash: "Cash",
  bank: "Bank",
  upi_wallet: "UPI wallet",
  credit_card: "Credit card",
  savings: "Savings",
  investment: "Investment",
  loan: "Loan",
  other: "Other",
}

export const transactionTypeLabel: Record<TransactionType, string> = {
  income: "Income",
  expense: "Expense",
  transfer: "Transfer",
  refund: "Refund",
}

export const recurringCadenceLabel: Record<RecurringCadence, string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
}

export const aiSuggestionKindLabel: Record<AISuggestionKind, string> = {
  task_extraction: "Inbox extraction",
  task_breakdown: "Task breakdown",
  daily_plan: "Daily plan",
  weekly_review: "Weekly review",
  finance_category: "Finance categorization",
  finance_insight: "Finance insight",
}

export const aiSuggestionStatusLabel: Record<AISuggestionStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  expired: "Expired",
}
