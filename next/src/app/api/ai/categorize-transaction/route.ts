import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyRequestAuth } from "@/lib/firebase/verify-request-auth"
import { checkAiRateLimit } from "@/lib/ai/rate-limit"
import { isOpenRouterConfigured } from "@/lib/ai/openrouter"
import { runAiCapability } from "@/lib/ai/run-capability"
import { FINANCE_CATEGORIZATION_SYSTEM } from "@/lib/ai/prompts"
import { financeCategorizationSchema } from "@/lib/schemas/ai.schema"
import { adminDb } from "@/lib/firebase/admin"
import { minorToRupees } from "@/lib/finance/money"

const requestSchema = z.object({ transactionId: z.string().min(1) })

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

  const userRef = adminDb.collection("users").doc(auth.uid)
  const txnSnap = await userRef.collection("transactions").doc(parsedRequest.data.transactionId).get()
  if (!txnSnap.exists) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
  }
  const txn = txnSnap.data()!

  const categoriesSnap = await userRef
    .collection("financeCategories")
    .where("deletedAt", "==", null)
    .where("kind", "==", txn.type === "income" ? "income" : "expense")
    .get()
  const categoryNames = categoriesSnap.docs.map((d) => d.data().name as string)

  const userPrompt = JSON.stringify({
    merchant: txn.merchant ?? "",
    description: txn.description ?? "",
    amountRupees: minorToRupees(txn.amountMinor as number),
    existingCategories: categoryNames,
  })

  const result = await runAiCapability({
    uid: auth.uid,
    kind: "finance_category",
    system: FINANCE_CATEGORIZATION_SYSTEM,
    user: userPrompt,
    schema: financeCategorizationSchema,
    inputSummary: `Categorize transaction ${parsedRequest.data.transactionId}`,
    relatedEntityIds: [parsedRequest.data.transactionId],
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }
  return NextResponse.json({ suggestionId: result.suggestionId, output: result.output })
}
