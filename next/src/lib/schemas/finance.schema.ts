import { z } from "zod"

export const accountTypeSchema = z.enum([
  "cash",
  "bank",
  "upi_wallet",
  "credit_card",
  "savings",
  "investment",
  "loan",
  "other",
])

export const financeAccountFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  type: accountTypeSchema,
  openingBalanceMinor: z.number().int(),
  archived: z.boolean(),
})

export type FinanceAccountFormInput = z.infer<typeof financeAccountFormSchema>

export const transactionTypeSchema = z.enum(["income", "expense", "transfer", "refund"])
export const reviewStatusSchema = z.enum(["confirmed", "needs_review"])

export const transactionFormSchema = z
  .object({
    accountId: z.string().min(1, "Account is required"),
    destinationAccountId: z.string().nullable().optional(),
    type: transactionTypeSchema,
    amountMinor: z.number().int().positive("Amount must be greater than zero"),
    occurredAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
    categoryId: z.string().nullable().optional(),
    merchant: z.string().trim().max(200).optional(),
    description: z.string().trim().max(2000).optional(),
    tags: z.array(z.string()),
    reviewStatus: reviewStatusSchema,
  })
  .refine(
    (data) => data.type !== "transfer" || !!data.destinationAccountId,
    { message: "Destination account is required for transfers", path: ["destinationAccountId"] }
  )

export type TransactionFormInput = z.infer<typeof transactionFormSchema>

export const quickExpenseSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  amountMinor: z.number().int().positive("Amount must be greater than zero"),
  merchant: z.string().trim().max(200).optional(),
  categoryId: z.string().nullable().optional(),
})

export type QuickExpenseInput = z.infer<typeof quickExpenseSchema>

export const budgetFormSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Invalid month"),
  limitMinor: z.number().int().positive("Limit must be greater than zero"),
  alertThresholdPercent: z.number().int().min(1).max(100),
})

export type BudgetFormInput = z.infer<typeof budgetFormSchema>

export const recurringCadenceSchema = z.enum(["weekly", "monthly", "quarterly", "yearly"])

export const recurringRuleFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  type: z.enum(["income", "expense"]),
  expectedAmountMinor: z.number().int().positive("Amount must be greater than zero"),
  categoryId: z.string().nullable().optional(),
  accountId: z.string().min(1, "Account is required"),
  cadence: recurringCadenceSchema,
  nextExpectedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  active: z.boolean(),
})

export type RecurringRuleFormInput = z.infer<typeof recurringRuleFormSchema>

export const financeCategoryFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  kind: z.enum(["income", "expense"]),
  color: z.string().optional(),
  icon: z.string().optional(),
})

export type FinanceCategoryFormInput = z.infer<typeof financeCategoryFormSchema>

export const financialGoalFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  targetAmountMinor: z.number().int().positive("Target must be greater than zero"),
  currentAmountMinor: z.number().int().min(0),
  targetDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
  accountId: z.string().nullable().optional(),
})

export type FinancialGoalFormInput = z.infer<typeof financialGoalFormSchema>
