// Pure command parser — no Firestore/network imports, so it's trivially
// unit-testable and reusable from the webhook handler without side effects.

export type ParsedTelegramCommand =
  | { type: "start"; code: string | null }
  | { type: "quick"; text: string }
  | { type: "task"; text: string }
  | { type: "spent"; amount: number; description: string }
  | { type: "today" }
  | { type: "next" }
  | { type: "help" }
  | { type: "plain_text"; text: string }
  | { type: "empty" }

export function parseTelegramMessage(rawText: string): ParsedTelegramCommand {
  const text = rawText.trim()
  if (!text) return { type: "empty" }

  if (text.startsWith("/start")) {
    const code = text.slice("/start".length).trim()
    return { type: "start", code: code || null }
  }
  if (text.startsWith("/quick")) {
    return { type: "quick", text: text.slice("/quick".length).trim() }
  }
  if (text.startsWith("/task")) {
    return { type: "task", text: text.slice("/task".length).trim() }
  }
  if (text.startsWith("/spent")) {
    const rest = text.slice("/spent".length).trim()
    const match = rest.match(/^(\d+(?:\.\d{1,2})?)\s*(.*)$/)
    if (!match) return { type: "plain_text", text: rawText }
    return { type: "spent", amount: Number(match[1]), description: match[2].trim() }
  }
  if (text.startsWith("/today")) return { type: "today" }
  if (text.startsWith("/next")) return { type: "next" }
  if (text.startsWith("/help")) return { type: "help" }

  return { type: "plain_text", text: rawText }
}

export const HELP_TEXT = `Commands:
/quick &lt;text&gt; — capture a thought to your inbox
/task &lt;text&gt; — create a task directly
/spent &lt;amount&gt; &lt;description&gt; — log an expense
/today — see today's focus list
/next — see your suggested next task
/help — show this message

Any other message is captured as a draft inbox item.`
