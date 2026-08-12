"use client"

import * as React from "react"
import { toast } from "sonner"
import { SparklesIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth/auth-context"
import { acceptTaskBreakdown, rejectSuggestion } from "@/lib/firebase/ai-suggestion-mutations"
import type { TaskBreakdownResult } from "@/lib/schemas/ai.schema"

type SubtaskReview = { title: string; include: boolean }

export function TaskBreakdownDialog({
  open,
  onOpenChange,
  title,
  description,
  projectId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  projectId?: string | null
}) {
  const { user } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [suggestionId, setSuggestionId] = React.useState<string | null>(null)
  const [subtasks, setSubtasks] = React.useState<SubtaskReview[]>([])

  React.useEffect(() => {
    if (!open) {
      // Reset review state on close — genuine effect use, not derivable at
      // render time since `open` toggles externally.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestionId(null)
      setSubtasks([])
    }
  }, [open])

  async function handleGenerate() {
    if (!user) return
    setLoading(true)
    try {
      const idToken = await user.getIdToken()
      const response = await fetch("/api/ai/breakdown-task", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ title, description }),
      })
      const data = await response.json()
      if (!response.ok) {
        toast.error(data.error ?? "Couldn't break down this task")
        return
      }
      const output = data.output as TaskBreakdownResult
      setSuggestionId(data.suggestionId)
      setSubtasks(
        output.milestones.flatMap((m) =>
          m.subtasks.map((s) => ({ title: `${m.title}: ${s.title}`, include: true }))
        )
      )
    } catch {
      toast.error("AI request failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleAccept() {
    if (!user || !suggestionId) return
    const included = subtasks.filter((s) => s.include).map((s) => s.title)
    try {
      await acceptTaskBreakdown(user.uid, suggestionId, included, projectId ?? null)
      toast.success(`Created ${included.length} subtask${included.length === 1 ? "" : "s"}`)
      onOpenChange(false)
    } catch {
      toast.error("Couldn't create subtasks")
    }
  }

  async function handleReject() {
    if (!user || !suggestionId) return
    await rejectSuggestion(user.uid, suggestionId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Break down: {title}</DialogTitle>
          <DialogDescription>AI-suggested subtasks — review before creating.</DialogDescription>
        </DialogHeader>

        {!suggestionId ? (
          <Button onClick={handleGenerate} disabled={loading} className="w-fit">
            <SparklesIcon />
            {loading ? "Thinking…" : "Generate breakdown"}
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            {subtasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">No subtasks suggested.</p>
            ) : (
              subtasks.map((s, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    checked={s.include}
                    onCheckedChange={(checked) =>
                      setSubtasks((prev) =>
                        prev.map((it, i) => (i === index ? { ...it, include: checked } : it))
                      )
                    }
                  />
                  <span className="text-sm">{s.title}</span>
                </div>
              ))
            )}
          </div>
        )}

        {suggestionId && (
          <DialogFooter>
            <Button variant="outline" onClick={handleReject}>
              Dismiss
            </Button>
            <Button onClick={handleAccept} disabled={!subtasks.some((s) => s.include)}>
              Create subtasks
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
