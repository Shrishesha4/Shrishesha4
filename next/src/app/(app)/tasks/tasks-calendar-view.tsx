"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/reui/badge"
import type { Task, TaskPriority } from "@/lib/types/task"

const priorityVariant: Record<TaskPriority, React.ComponentProps<typeof Badge>["variant"]> = {
  low: "outline",
  medium: "secondary",
  high: "warning-light",
  urgent: "destructive-light",
}

export function TasksCalendarView({
  tasks,
  onSelect,
}: {
  tasks: Task[]
  onSelect: (taskId: string) => void
}) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const selectedISO = selectedDate.toISOString().slice(0, 10)

  const scheduledDates = React.useMemo(
    () =>
      tasks
        .filter((task) => task.scheduledFor)
        .map((task) => new Date(`${task.scheduledFor}T00:00:00`)),
    [tasks]
  )

  const tasksForDay = React.useMemo(
    () => tasks.filter((task) => task.scheduledFor === selectedISO),
    [tasks, selectedISO]
  )

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        modifiers={{ scheduled: scheduledDates }}
        modifiersClassNames={{ scheduled: "font-semibold underline" }}
      />
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-muted-foreground text-sm">{selectedISO}</p>
        {tasksForDay.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nothing scheduled.</p>
        ) : (
          tasksForDay.map((task) => (
            <Card key={task.id} className="cursor-pointer" onClick={() => onSelect(task.id)}>
              <CardContent className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{task.title}</span>
                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
