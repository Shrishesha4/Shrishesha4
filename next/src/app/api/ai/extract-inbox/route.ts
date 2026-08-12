import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { checkAiRateLimit } from "@/lib/ai/rate-limit"
import { isOpenRouterConfigured } from "@/lib/ai/openrouter"
import { runAiCapability } from "@/lib/ai/run-capability"
import { INBOX_EXTRACTION_SYSTEM } from "@/lib/ai/prompts"
import { inboxExtractionSchema } from "@/lib/schemas/ai.schema"

const requestSchema = z.object({ content: z.string().trim().min(1).max(2000) })

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

  const result = await runAiCapability({
    uid: auth.uid,
    kind: "task_extraction",
    system: INBOX_EXTRACTION_SYSTEM,
    user: parsedRequest.data.content,
    schema: inboxExtractionSchema,
    inputSummary: parsedRequest.data.content,
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }
  return NextResponse.json({ suggestionId: result.suggestionId, output: result.output })
}
