"use client"

import * as React from "react"
import { toast } from "sonner"
import { SparklesIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth/auth-context"
import { acceptDailyPlan, rejectSuggestion } from "@/lib/firebase/ai-suggestion-mutations"
import type { Task } from "@/lib/types/task"
import type { DailyPlanAiResult } from "@/lib/schemas/ai.schema"

export function AiDailyPlanCard({ tasks }: { tasks: Task[] }) {
  const { user } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [suggestionId, setSuggestionId] = React.useState<string | null>(null)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [reasoning, setReasoning] = React.useState("")

  async function handleGenerate() {
    if (!user) return
    setLoading(true)
    try {
      const idToken = await user.getIdToken()
      const response = await fetch("/api/ai/daily-plan", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      })
      const data = await response.json()
      if (!response.ok) {
        toast.error(data.error ?? "Couldn't suggest a plan")
        return
      }
      const output = data.output as DailyPlanAiResult
      setSuggestionId(data.suggestionId)
      setSelectedIds(output.selectedTaskIds)
      setReasoning(output.reasoning)
    } catch {
      toast.error("AI request failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleAccept() {
    if (!user || !suggestionId) return
    await acceptDailyPlan(user.uid, suggestionId, selectedIds)
    toast.success("Daily plan updated")
    reset()
  }

  async function handleReject() {
    if (!user || !suggestionId) return
    await rejectSuggestion(user.uid, suggestionId)
    reset()
  }

  function reset() {
    setSuggestionId(null)
    setSelectedIds([])
    setReasoning("")
  }

  if (!suggestionId) {
    return (
      <Button variant="outline" size="sm" onClick={handleGenerate} disabled={loading} className="w-fit">
        <SparklesIcon />
        {loading ? "Thinking…" : "AI: suggest today's plan"}
      </Button>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <SparklesIcon className="size-4" />
          AI-suggested plan
        </CardTitle>
        <CardDescription>{reasoning}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        {selectedIds.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tasks selected.</p>
        ) : (
          selectedIds.map((id) => {
            const task = tasks.find((t) => t.id === id)
            if (!task) return null
            return (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedIds.includes(id)}
                  onCheckedChange={(checked) =>
                    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)))
                  }
                />
                <span className="text-sm">{task.title}</span>
              </div>
            )
          })
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" onClick={handleAccept} disabled={selectedIds.length === 0}>
          Apply to today
        </Button>
        <Button size="sm" variant="outline" onClick={handleReject}>
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  )
}
