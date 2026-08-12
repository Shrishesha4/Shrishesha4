import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { checkAiRateLimit } from "@/lib/ai/rate-limit"
import { isOpenRouterConfigured } from "@/lib/ai/openrouter"
import { runAiCapability } from "@/lib/ai/run-capability"
import { TASK_BREAKDOWN_SYSTEM } from "@/lib/ai/prompts"
import { taskBreakdownSchema } from "@/lib/schemas/ai.schema"

const requestSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
})

export async function POST(request: NextRequest) {
  const auth = await verifyRequestAuth(request)
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!isOpenRouterConfigured()) {
    return NextResponse.json({ error: "AI is not configured on the server" }, { status: 503 })
  }

  const rateLimit = await checkAiRateLimit(auth.uid)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded, try again later" }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsedRequest = requestSchema.safeParse(body)
  if (!parsedRequest.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const userPrompt = JSON.stringify({
    title: parsedRequest.data.title,
    description: parsedRequest.data.description ?? "",
  })

  const result = await runAiCapability({
    uid: auth.uid,
    kind: "task_breakdown",
    system: TASK_BREAKDOWN_SYSTEM,
    user: userPrompt,
    schema: taskBreakdownSchema,
    inputSummary: parsedRequest.data.title,
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }
  return NextResponse.json({ suggestionId: result.suggestionId, output: result.output })
}
