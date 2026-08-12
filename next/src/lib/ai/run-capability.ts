import "server-only"
import type { z } from "zod"
import { callOpenRouter, OpenRouterError } from "@/lib/ai/openrouter"
import { logAiRequest } from "@/lib/ai/request-log"
import { createAiSuggestion } from "@/lib/ai/create-suggestion"
import type { AISuggestionKind } from "@/lib/types/ai-suggestion"

type CapabilityResult<T> =
  | { ok: true; suggestionId: string; output: T }
  | { ok: false; status: number; error: string }

// Shared plumbing for every AI capability: call OpenRouter, parse + Zod-validate
// the JSON response, log the request (no raw content), and persist the
// resulting suggestion — used by every /api/ai/* route so each one only needs
// its own system prompt, schema, and Firestore context-gathering.
export async function runAiCapability<T>(input: {
  uid: string
  kind: AISuggestionKind
  system: string
  user: string
  schema: z.ZodType<T>
  inputSummary: string
  relatedEntityIds?: string[]
}): Promise<CapabilityResult<T>> {
  try {
    const result = await callOpenRouter({ system: input.system, user: input.user })

    let parsedJson: unknown
    try {
      parsedJson = JSON.parse(result.content)
    } catch {
      await logAiRequest(input.uid, {
        kind: input.kind,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        success: false,
        error: "Model response was not valid JSON",
      })
      return { ok: false, status: 502, error: "AI returned an unparseable response" }
    }

    const validated = input.schema.safeParse(parsedJson)
    if (!validated.success) {
      await logAiRequest(input.uid, {
        kind: input.kind,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        success: false,
        error: "Model response failed schema validation",
      })
      return { ok: false, status: 502, error: "AI response did not match the expected shape" }
    }

    const suggestionId = await createAiSuggestion(input.uid, {
      kind: input.kind,
      inputSummary: input.inputSummary,
      output: validated.data as Record<string, unknown>,
      relatedEntityIds: input.relatedEntityIds,
      model: result.model,
    })

    await logAiRequest(input.uid, {
      kind: input.kind,
      model: result.model,
      promptTokens: result.promptTokens,
      completionTokens: result.completionTokens,
      success: true,
    })

    return { ok: true, suggestionId, output: validated.data }
  } catch (error) {
    const message = error instanceof OpenRouterError ? error.message : "AI request failed"
    return { ok: false, status: 502, error: message }
  }
}
