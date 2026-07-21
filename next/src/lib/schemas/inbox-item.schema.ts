import { z } from "zod"

export const quickCaptureSchema = z.object({
  content: z.string().trim().min(1, "Can't capture an empty note").max(5000),
})

export type QuickCaptureInput = z.infer<typeof quickCaptureSchema>
