import { z } from "zod"

// Every AI response is validated against one of these before it's allowed to
// reach Firestore — an invalid/malformed model response is rejected outright
// rather than trusted, per plan.md's "Invalid AI JSON never reaches Firestore
// entities" acceptance criterion.

export const inboxExtractionSchema = z.object({
  items: z.array(
    z.object({
      type: z.enum(["task", "note", "transaction"]),
      title: z.string().min(1).max(200),
      priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
      suggestedProject: z.string().optional(),
      confidence: z.number().min(0).max(1),
    })
  ),
  needsClarification: z.boolean(),
})
export type InboxExtractionResult = z.infer<typeof inboxExtractionSchema>

export const taskBreakdownSchema = z.object({
  milestones: z.array(
    z.object({
      title: z.string().min(1).max(200),
      subtasks: z.array(
        z.object({
          title: z.string().min(1).max(200),
          estimatedMinutes: z.number().int().positive().optional(),
        })
      ),
    })
  ),
})
export type TaskBreakdownResult = z.infer<typeof taskBreakdownSchema>

export const dailyPlanAiSchema = z.object({
  selectedTaskIds: z.array(z.string()).min(0).max(5),
  reasoning: z.string().max(1000),
})
export type DailyPlanAiResult = z.infer<typeof dailyPlanAiSchema>

export const weeklyReviewSchema = z.object({
  completedCount: z.number().int().min(0),
  overdueCount: z.number().int().min(0),
  stalledProjects: z.array(z.string()),
  repeatedlyPostponed: z.array(z.string()),
  upcomingBills: z.array(z.string()),
  budgetRisks: z.array(z.string()),
  suggestedActions: z.array(z.string()),
})
export type WeeklyReviewResult = z.infer<typeof weeklyReviewSchema>

export const financeCategorizationSchema = z.object({
  categoryName: z.string().nullable(),
  normalizedMerchant: z.string().nullable(),
  isRecurring: z.boolean(),
  confidence: z.number().min(0).max(1),
})
export type FinanceCategorizationResult = z.infer<typeof financeCategorizationSchema>
