import type { Timestamp } from "firebase/firestore"
import type { BaseDocument } from "@/lib/types/base"

export type AccountType =
  | "cash"
  | "bank"
  | "upi_wallet"
  | "credit_card"
  | "savings"
  | "investment"
  | "loan"
  | "other"

export type TransactionType = "income" | "expense" | "transfer" | "refund"
export type TransactionSource = "manual" | "telegram" | "csv_import" | "bank_sync"
export type TransactionReviewStatus = "confirmed" | "needs_review"

export type FinanceAccount = BaseDocument & {
  name: string
  type: AccountType
  currency: "INR"
  openingBalanceMinor: number
  archived: boolean
}

export type Transaction = BaseDocument & {
  accountId: string
  destinationAccountId?: string | null
  type: TransactionType
  amountMinor: number
  currency: "INR"
  occurredAt: Timestamp
  categoryId?: string | null
  merchant?: string
  description?: string
  tags: string[]
  source: TransactionSource
  reviewStatus: TransactionReviewStatus
}

export type Budget = BaseDocument & {
  categoryId: string
  month: string // YYYY-MM
  limitMinor: number
  alertThresholdPercent: number
}

export type RecurringCadence = "weekly" | "monthly" | "quarterly" | "yearly"

export type RecurringRule = BaseDocument & {
  name: string
  type: "income" | "expense"
  expectedAmountMinor: number
  categoryId?: string | null
  accountId: string
  cadence: RecurringCadence
  nextExpectedAt: Timestamp
  active: boolean
}

// Not modeled in plan.md §7.5 — minimal shape for the users/{uid}/financeCategories/{categoryId}
// path referenced in §3.3 and the Phase 3 "create default finance categories" task.
export type FinanceCategory = BaseDocument & {
  name: string
  kind: "income" | "expense"
  color?: string
  icon?: string
  isDefault: boolean
}

// Not modeled in plan.md §7.5 — minimal shape for the users/{uid}/financialGoals/{goalId}
// path referenced in §3.3 and the Phase 3 "build savings/financial goals" task.
export type FinancialGoal = BaseDocument & {
  name: string
  targetAmountMinor: number
  currentAmountMinor: number
  targetDate?: Timestamp | null
  accountId?: string | null
  achieved: boolean
}
