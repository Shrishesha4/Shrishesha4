"use client"

import * as React from "react"
import { toast } from "sonner"
import { SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/reui/badge"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useAuth } from "@/lib/auth/auth-context"
import { acceptInboxExtraction, rejectSuggestion } from "@/lib/firebase/ai-suggestion-mutations"
import { taskPriorityLabel } from "@/lib/labels"
import type { InboxExtractionResult } from "@/lib/schemas/ai.schema"
import type { TaskPriority } from "@/lib/types/task"

type ReviewItem = InboxExtractionResult["items"][number] & { include: boolean }

export function InboxExtractionPanel() {
  const { user } = useAuth()
  const [content, setContent] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [suggestionId, setSuggestionId] = React.useState<string | null>(null)
  const [items, setItems] = React.useState<ReviewItem[]>([])
  const [needsClarification, setNeedsClarification] = React.useState(false)

  async function handleExtract() {
    if (!user || !content.trim()) return
    setLoading(true)
    try {
      const idToken = await user.getIdToken()
      const response = await fetch("/api/ai/extract-inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ content }),
      })
      const data = await response.json()
      if (!response.ok) {
        toast.error(data.error ?? "Couldn't extract actions")
        return
      }
      const output = data.output as InboxExtractionResult
      setSuggestionId(data.suggestionId)
      setItems(output.items.map((item) => ({ ...item, include: true })))
      setNeedsClarification(output.needsClarification)
    } catch {
      toast.error("AI request failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleAcceptSelected() {
    if (!user || !suggestionId) return
    try {
      await acceptInboxExtraction(user.uid, suggestionId, items)
      toast.success("Actions created")
      reset()
    } catch {
      toast.error("Couldn't create actions")
    }
  }

  async function handleRejectAll() {
    if (!user || !suggestionId) return
    await rejectSuggestion(user.uid, suggestionId)
    reset()
  }

  function reset() {
    setContent("")
    setSuggestionId(null)
    setItems([])
    setNeedsClarification(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {!suggestionId ? (
        <>
          <Textarea
            placeholder="Describe what's on your mind — e.g. &quot;Finish MIAS auth, check AWS bill, renew domain Friday&quot;"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={3}
          />
          <Button onClick={handleExtract} disabled={loading || !content.trim()} className="w-fit">
            <SparklesIcon />
            {loading ? "Thinking…" : "Extract actions"}
          </Button>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          {needsClarification && (
            <Badge variant="warning-light" className="w-fit">
              This note was vague — review carefully
            </Badge>
          )}
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">No actions extracted.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 rounded-md border border-border p-2">
                  <Checkbox
                    checked={item.include}
                    onCheckedChange={(checked) =>
                      setItems((prev) =>
                        prev.map((it, i) => (i === index ? { ...it, include: checked } : it))
                      )
                    }
                  />
                  <Input
                    value={item.title}
                    onChange={(event) =>
                      setItems((prev) =>
                        prev.map((it, i) =>
                          i === index ? { ...it, title: event.target.value } : it
                        )
                      )
                    }
                    className="flex-1"
                  />
                  {item.type === "task" && (
                    <Select
                      value={item.priority ?? "medium"}
                      onValueChange={(value) =>
                        setItems((prev) =>
                          prev.map((it, i) =>
                            i === index ? { ...it, priority: value as TaskPriority } : it
                          )
                        )
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue>
                          {(value: TaskPriority) => taskPriorityLabel[value]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(taskPriorityLabel).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={handleAcceptSelected} disabled={!items.some((i) => i.include)}>
              Accept selected
            </Button>
            <Button variant="outline" onClick={handleRejectAll}>
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
