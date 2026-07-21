import { z } from "zod"

export const tagFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  color: z.string().optional(),
})

export type TagFormInput = z.infer<typeof tagFormSchema>
