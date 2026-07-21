"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { toast } from "sonner"
import { InboxIcon, CheckIcon, XIcon, ClockIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/reui/badge"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { useAuth } from "@/lib/auth/auth-context"
import { useInboxItems } from "@/hooks/use-inbox-items"
import {
  dismissInboxItem,
  markInboxItemProcessed,
  snoozeInboxItem,
} from "@/lib/firebase/inbox-mutations"
import { createTask } from "@/lib/firebase/task-mutations"
import type { InboxItem } from "@/lib/types/inbox-item"

const sourceLabel: Record<InboxItem["source"], string> = {
  manual: "Manual",
  telegram: "Telegram",
  gmail: "Gmail",
  system: "System",
  ai: "AI",
}

export function InboxList() {
  const { user } = useAuth()
  const { items, loading } = useInboxItems()
  const unprocessed = items.filter((item) => item.status === "unprocessed")

  async function handleCreateTask(item: InboxItem) {
    if (!user) return
    try {
      await createTask(user.uid, {
        title: item.title,
        description: item.content ?? "",
        status: "planned",
        priority: "medium",
        tagIds: [],
      })
      await markInboxItemProcessed(user.uid, item.id)
      toast.success("Task created")
    } catch {
      toast.error("Couldn't create the task")
    }
  }

  async function handleDismiss(item: InboxItem) {
    if (!user) return
    await dismissInboxItem(user.uid, item.id)
  }

  async function handleSnooze(item: InboxItem) {
    if (!user) return
    await snoozeInboxItem(user.uid, item.id, addDays(new Date(), 1))
    toast.success("Snoozed until tomorrow")
  }

  if (loading) return null

  if (unprocessed.length === 0) {
    return (
      <PagePlaceholder
        icon={InboxIcon}
        title="Inbox zero"
        description="Nothing to process. Use quick capture to add a thought, task, or idea."
      />
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {unprocessed.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Badge variant="outline" className="w-fit">
                {sourceLabel[item.source]}
              </Badge>
              <p className="text-sm">{item.content ?? item.title}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button size="icon-sm" variant="ghost" onClick={() => handleCreateTask(item)}>
                <CheckIcon />
                <span className="sr-only">Create task</span>
              </Button>
              <Button size="icon-sm" variant="ghost" onClick={() => handleSnooze(item)}>
                <ClockIcon />
                <span className="sr-only">Snooze</span>
              </Button>
              <Button size="icon-sm" variant="ghost" onClick={() => handleDismiss(item)}>
                <XIcon />
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
