"use client"

import { CheckIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/reui/badge"
import { useAuth } from "@/lib/auth/auth-context"
import { completeTask } from "@/lib/firebase/task-mutations"
import type { Task, TaskPriority } from "@/lib/types/task"

const priorityVariant: Record<TaskPriority, React.ComponentProps<typeof Badge>["variant"]> = {
  low: "outline",
  medium: "secondary",
  high: "warning-light",
  urgent: "destructive-light",
}

export function TaskRow({ task, onSelect }: { task: Task; onSelect: (id: string) => void }) {
  const { user } = useAuth()

  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-2">
        <button
          className="flex flex-1 items-center gap-2 text-left"
          onClick={() => onSelect(task.id)}
        >
          <span className="text-sm">{task.title}</span>
        </button>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => user && completeTask(user.uid, task.id, task.title)}
          >
            <CheckIcon />
            <span className="sr-only">Complete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
