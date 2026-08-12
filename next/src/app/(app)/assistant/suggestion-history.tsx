"use client"

import { Badge } from "@/components/reui/badge"
import { useAiSuggestions } from "@/hooks/use-ai-suggestions"
import { aiSuggestionKindLabel, aiSuggestionStatusLabel } from "@/lib/labels"
import type { AISuggestionStatus } from "@/lib/types/ai-suggestion"

const statusVariant: Record<AISuggestionStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  pending: "warning-light",
  accepted: "success-light",
  rejected: "outline",
  expired: "outline",
}

export function SuggestionHistory() {
  const { suggestions, loading } = useAiSuggestions(20)

  if (loading) return null
  if (suggestions.length === 0) {
    return <p className="text-muted-foreground text-sm">No AI suggestions yet.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {suggestions.map((s) => (
        <div key={s.id} className="flex items-center justify-between gap-2 rounded-md border border-border p-2 text-sm">
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{aiSuggestionKindLabel[s.kind]}</span>
            <span className="text-muted-foreground text-xs">{s.inputSummary}</span>
          </div>
          <Badge variant={statusVariant[s.status]}>{aiSuggestionStatusLabel[s.status]}</Badge>
        </div>
      ))}
    </div>
  )
}
