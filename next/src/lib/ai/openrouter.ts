import "server-only"
import { serverEnv } from "@/lib/env/server"

export function isOpenRouterConfigured(): boolean {
  return !!serverEnv.OPENROUTER_API_KEY
}

export class OpenRouterError extends Error {}

export type OpenRouterResult = {
  content: string
  model: string
  promptTokens?: number
  completionTokens?: number
}

// Server-only OpenRouter call. Never invoked from the browser — every AI
// capability goes through a Route Handler that calls this, per plan.md's
// Client -> POST /api/ai/* -> OpenRouter -> validated response architecture.
export async function callOpenRouter(input: {
  system: string
  user: string
}): Promise<OpenRouterResult> {
  if (!serverEnv.OPENROUTER_API_KEY) {
    throw new OpenRouterError("OpenRouter is not configured on the server")
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serverEnv.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": serverEnv.NEXT_PUBLIC_APP_URL,
      "X-Title": "Personal Command Center",
    },
    body: JSON.stringify({
      model: serverEnv.OPENROUTER_MODEL,
      messages: [
        { role: "system", content: input.system },
        { role: "user", content: input.user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new OpenRouterError(`OpenRouter request failed (${response.status}): ${text.slice(0, 300)}`)
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== "string") {
    throw new OpenRouterError("OpenRouter returned no content")
  }

  return {
    content,
    model: data?.model ?? serverEnv.OPENROUTER_MODEL,
    promptTokens: data?.usage?.prompt_tokens,
    completionTokens: data?.usage?.completion_tokens,
  }
}
