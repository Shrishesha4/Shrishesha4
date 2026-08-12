import "server-only"
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import type { AISuggestion } from "@/lib/types/ai-suggestion"

// Deliberately does NOT store the raw prompt or model response — only
// metadata needed to audit usage/cost, per plan.md's AI safety rules.
export async function logAiRequest(
  uid: string,
  entry: {
    kind: AISuggestion["kind"]
    model: string
    promptTokens?: number
    completionTokens?: number
    success: boolean
    error?: string
  }
): Promise<void> {
  await adminDb
    .collection("users")
    .doc(uid)
    .collection("aiRequestLog")
    .add({ ...entry, createdAt: FieldValue.serverTimestamp() })
}
