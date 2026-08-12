import { NextRequest, NextResponse } from "next/server"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { checkAiRateLimit } from "@/lib/ai/rate-limit"
import { isOpenRouterConfigured } from "@/lib/ai/openrouter"
import { runAiCapability } from "@/lib/ai/run-capability"
import { DAILY_PLAN_SYSTEM } from "@/lib/ai/prompts"
import { dailyPlanAiSchema } from "@/lib/schemas/ai.schema"
import { adminDb } from "@/lib/firebase/admin"

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

  const snap = await adminDb
    .collection("users")
    .doc(auth.uid)
    .collection("tasks")
    .where("deletedAt", "==", null)
    .get()

  const candidates = snap.docs
    .map((d) => {
      const data = d.data()
      return {
        id: d.id,
        title: data.title as string,
        priority: data.priority as string,
        dueAt: data.dueAt?.toDate?.()?.toISOString() ?? null,
        scheduledFor: data.scheduledFor ?? null,
        energyLevel: data.energyLevel ?? null,
        status: data.status as string,
      }
    })
    .filter((t) => t.status === "planned" || t.status === "in_progress")

  if (candidates.length === 0) {
    return NextResponse.json({ error: "No eligible tasks to plan from" }, { status: 400 })
  }

  const result = await runAiCapability({
    uid: auth.uid,
    kind: "daily_plan",
    system: DAILY_PLAN_SYSTEM,
    user: JSON.stringify(candidates),
    schema: dailyPlanAiSchema,
    inputSummary: `${candidates.length} candidate tasks`,
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  // Never trust AI-invented ids — filter to the candidate set server-side,
  // and correct the persisted suggestion so a later read-back can't re-expose
  // a hallucinated id either.
  const candidateIds = new Set(candidates.map((c) => c.id))
  const safeSelectedIds = result.output.selectedTaskIds.filter((id) => candidateIds.has(id))
  const safeOutput = { ...result.output, selectedTaskIds: safeSelectedIds }

  if (safeSelectedIds.length !== result.output.selectedTaskIds.length) {
    await adminDb
      .collection("users")
      .doc(auth.uid)
      .collection("aiSuggestions")
      .doc(result.suggestionId)
      .update({ output: safeOutput })
  }

  return NextResponse.json({ suggestionId: result.suggestionId, output: safeOutput })
}
