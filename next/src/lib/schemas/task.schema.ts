import { z } from "zod"

export const taskStatusSchema = z.enum([
  "inbox",
  "planned",
  "in_progress",
  "blocked",
  "done",
  "archived",
])
export const taskPrioritySchema = z.enum(["low", "medium", "high", "urgent"])
export const energyLevelSchema = z.enum(["low", "medium", "high"])

export const taskFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(5000).optional(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  energyLevel: energyLevelSchema.optional(),
  projectId: z.string().nullable().optional(),
  parentTaskId: z.string().nullable().optional(),
  tagIds: z.array(z.string()),
  scheduledFor: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
  estimatedMinutes: z.number().int().positive().nullable().optional(),
})

export type TaskFormInput = z.infer<typeof taskFormSchema>
