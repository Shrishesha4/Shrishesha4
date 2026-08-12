"use client"

import * as React from "react"
import { toast } from "sonner"
import { SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/reui/badge"
import { useAuth } from "@/lib/auth/auth-context"
import { acknowledgeWeeklyReview } from "@/lib/firebase/ai-suggestion-mutations"
import type { WeeklyReviewResult } from "@/lib/schemas/ai.schema"

export function WeeklyReviewPanel() {
  const { user } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [suggestionId, setSuggestionId] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<WeeklyReviewResult | null>(null)

  async function handleGenerate() {
    if (!user) return
    setLoading(true)
    try {
      const idToken = await user.getIdToken()
      const response = await fetch("/api/ai/weekly-review", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      })
      const data = await response.json()
      if (!response.ok) {
        toast.error(data.error ?? "Couldn't generate the weekly review")
        return
      }
      setSuggestionId(data.suggestionId)
      setResult(data.output as WeeklyReviewResult)
    } catch {
      toast.error("AI request failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleAcknowledge() {
    if (!user || !suggestionId) return
    await acknowledgeWeeklyReview(user.uid, suggestionId)
    setSuggestionId(null)
    setResult(null)
    toast.success("Marked as reviewed")
  }

  return (
    <div className="flex flex-col gap-3">
      {!result ? (
        <Button onClick={handleGenerate} disabled={loading} className="w-fit">
          <SparklesIcon />
          {loading ? "Generating…" : "Generate weekly review"}
        </Button>
      ) : (
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-2">
            <Badge variant="success-light">{result.completedCount} completed</Badge>
            <Badge variant="warning-light">{result.overdueCount} overdue</Badge>
          </div>

          {result.stalledProjects.length > 0 && (
            <div>
              <p className="font-medium">Stalled projects</p>
              <ul className="text-muted-foreground list-inside list-disc">
                {result.stalledProjects.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {result.repeatedlyPostponed.length > 0 && (
            <div>
              <p className="font-medium">Repeatedly postponed</p>
              <ul className="text-muted-foreground list-inside list-disc">
                {result.repeatedlyPostponed.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {result.upcomingBills.length > 0 && (
            <div>
              <p className="font-medium">Upcoming bills</p>
              <ul className="text-muted-foreground list-inside list-disc">
                {result.upcomingBills.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {result.budgetRisks.length > 0 && (
            <div>
              <p className="font-medium">Budget risks</p>
              <ul className="text-muted-foreground list-inside list-disc">
                {result.budgetRisks.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {result.suggestedActions.length > 0 && (
            <div>
              <p className="font-medium">Suggested actions</p>
              <ul className="text-muted-foreground list-inside list-disc">
                {result.suggestedActions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          <Button variant="outline" onClick={handleAcknowledge} className="w-fit">
            Mark as reviewed
          </Button>
        </div>
      )}
    </div>
  )
}
