import "server-only"
import { adminDb } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"
import type { AISuggestionKind } from "@/lib/types/ai-suggestion"

export async function createAiSuggestion(
  uid: string,
  input: {
    kind: AISuggestionKind
    inputSummary: string
    output: Record<string, unknown>
    relatedEntityIds?: string[]
    model: string
  }
): Promise<string> {
  const ref = adminDb.collection("users").doc(uid).collection("aiSuggestions").doc()
  await ref.set({
    kind: input.kind,
    status: "pending",
    inputSummary: input.inputSummary.slice(0, 500),
    output: input.output,
    relatedEntityIds: input.relatedEntityIds ?? [],
    model: input.model,
    createdAt: FieldValue.serverTimestamp(),
    createdBy: uid,
    resolvedAt: null,
  })
  return ref.id
}
