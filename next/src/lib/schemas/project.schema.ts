import { z } from "zod"

export const projectStatusSchema = z.enum([
  "idea",
  "active",
  "paused",
  "completed",
  "archived",
])

export const projectFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  description: z.string().trim().max(5000).optional(),
  status: projectStatusSchema,
  outcome: z.string().trim().max(2000).optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  tagIds: z.array(z.string()),
})

export type ProjectFormInput = z.infer<typeof projectFormSchema>
