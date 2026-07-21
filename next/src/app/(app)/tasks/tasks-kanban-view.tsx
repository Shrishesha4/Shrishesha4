"use client"

import * as React from "react"
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/reui/kanban"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/reui/badge"
import { useAuth } from "@/lib/auth/auth-context"
import { setTaskStatus } from "@/lib/firebase/task-mutations"
import { taskStatusLabel } from "@/lib/labels"
import type { Task, TaskPriority, TaskStatus } from "@/lib/types/task"

const columnOrder: TaskStatus[] = ["inbox", "planned", "in_progress", "blocked", "done"]

const priorityVariant: Record<TaskPriority, React.ComponentProps<typeof Badge>["variant"]> = {
  low: "outline",
  medium: "secondary",
  high: "warning-light",
  urgent: "destructive-light",
}

function toBoard(tasks: Task[]): Record<string, Task[]> {
  const board: Record<string, Task[]> = Object.fromEntries(columnOrder.map((s) => [s, []]))
  for (const task of tasks) {
    if (board[task.status]) board[task.status].push(task)
  }
  return board
}

export function TasksKanbanView({
  tasks,
  onSelect,
}: {
  tasks: Task[]
  onSelect: (taskId: string) => void
}) {
  const { user } = useAuth()
  const [board, setBoard] = React.useState<Record<string, Task[]>>(() => toBoard(tasks))

  React.useEffect(() => {
    // Resync local board from Firestore-derived tasks; board also has local-only
    // state during an in-progress drag (Kanban's onValueChange), so this can't
    // be a plain useMemo without reverting the live drag preview mid-gesture.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBoard(toBoard(tasks))
  }, [tasks])

  async function handleCommit(next: Record<string, Task[]>) {
    if (!user) return
    for (const status of columnOrder) {
      for (const task of next[status] ?? []) {
        if (task.status !== status) {
          await setTaskStatus(user.uid, task.id, status)
        }
      }
    }
  }

  return (
    <Kanban
      value={board}
      onValueChange={setBoard}
      onValueCommit={handleCommit}
      getItemValue={(task) => task.id}
    >
      <KanbanBoard className="grid-flow-col grid-cols-none sm:grid-cols-none auto-cols-[16rem] overflow-x-auto">
        {columnOrder.map((status) => (
          <KanbanColumn key={status} value={status}>
            <KanbanColumnHandle>
              <h3 className="text-sm font-medium">
                {taskStatusLabel[status]}{" "}
                <span className="text-muted-foreground">({board[status]?.length ?? 0})</span>
              </h3>
            </KanbanColumnHandle>
            <KanbanColumnContent value={status} className="flex flex-col gap-2">
              {(board[status] ?? []).map((task) => (
                <KanbanItem key={task.id} value={task.id}>
                  <KanbanItemHandle>
                    <Card
                      className="cursor-pointer"
                      onClick={() => onSelect(task.id)}
                    >
                      <CardContent className="flex flex-col gap-2">
                        <p className="text-sm font-medium">{task.title}</p>
                        <Badge variant={priorityVariant[task.priority]} className="w-fit">
                          {task.priority}
                        </Badge>
                      </CardContent>
                    </Card>
                  </KanbanItemHandle>
                </KanbanItem>
              ))}
            </KanbanColumnContent>
          </KanbanColumn>
        ))}
      </KanbanBoard>
      <KanbanOverlay>
        <div className="bg-muted size-full rounded-md" />
      </KanbanOverlay>
    </Kanban>
  )
}
