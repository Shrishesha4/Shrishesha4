import { NextRequest, NextResponse } from "next/server"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { checkAiRateLimit } from "@/lib/ai/rate-limit"
import { isOpenRouterConfigured } from "@/lib/ai/openrouter"
import { runAiCapability } from "@/lib/ai/run-capability"
import { WEEKLY_REVIEW_SYSTEM } from "@/lib/ai/prompts"
import { weeklyReviewSchema } from "@/lib/schemas/ai.schema"
import { adminDb } from "@/lib/firebase/admin"
import type { Project } from "@/lib/types/project"

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

  const userRef = adminDb.collection("users").doc(auth.uid)
  const oneWeekAgo = new Date(Date.now() - 7 * 86_400_000)

  const [tasksSnap, projectsSnap, budgetsSnap, recurringSnap] = await Promise.all([
    userRef.collection("tasks").where("deletedAt", "==", null).get(),
    userRef.collection("projects").where("deletedAt", "==", null).get(),
    userRef.collection("budgets").where("deletedAt", "==", null).get(),
    userRef.collection("recurringRules").where("deletedAt", "==", null).where("active", "==", true).get(),
  ])

  const now = new Date()
  const tasks = tasksSnap.docs.map((d) => d.data())
  const completedThisWeek = tasks.filter(
    (t) => t.status === "done" && t.completedAt?.toDate?.() >= oneWeekAgo
  )
  const overdue = tasks.filter(
    (t) => t.status !== "done" && t.status !== "archived" && t.dueAt?.toDate?.() < now
  )
  const projects = projectsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as Project)
  const stalledProjects = projects.filter((p) => {
    const lastActivity = p.lastActivityAt?.toDate?.()
    return p.status === "active" && lastActivity && now.getTime() - lastActivity.getTime() > 14 * 86_400_000
  })
  const upcomingBills = recurringSnap.docs
    .map((d) => d.data())
    .filter((r) => r.type === "expense" && r.nextExpectedAt?.toDate?.() <= new Date(now.getTime() + 14 * 86_400_000))

  const context = {
    completedThisWeekCount: completedThisWeek.length,
    overdueTasks: overdue.map((t) => t.title),
    stalledProjectNames: stalledProjects.map((p) => p.name),
    upcomingBillNames: upcomingBills.map((r) => r.name),
    budgetCount: budgetsSnap.size,
  }

  const result = await runAiCapability({
    uid: auth.uid,
    kind: "weekly_review",
    system: WEEKLY_REVIEW_SYSTEM,
    user: JSON.stringify(context),
    schema: weeklyReviewSchema,
    inputSummary: `Weekly review as of ${now.toISOString().slice(0, 10)}`,
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }
  return NextResponse.json({ suggestionId: result.suggestionId, output: result.output })
}
