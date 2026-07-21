"use client"

import * as React from "react"
import { useQueryState } from "nuqs"
import { PlusIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useTasks } from "@/hooks/use-tasks"
import { TasksListView } from "./tasks-list-view"
import { TasksKanbanView } from "./tasks-kanban-view"
import { TasksCalendarView } from "./tasks-calendar-view"
import { TaskDetailSheet } from "./task-detail-sheet"
import { TaskFormDialog } from "./task-form-dialog"

export default function TasksPage() {
  const { tasks, loading } = useTasks()
  const [view, setView] = useQueryState("view", { defaultValue: "list" })
  const [taskId, setTaskId] = useQueryState("task")
  const [createOpen, setCreateOpen] = React.useState(false)

  if (loading) return <PageLoadingSkeleton />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Tabs value={view ?? "list"} onValueChange={(value) => setView(value as string)}>
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          New task
        </Button>
      </div>

      {view === "kanban" ? (
        <TasksKanbanView tasks={tasks} onSelect={setTaskId} />
      ) : view === "calendar" ? (
        <TasksCalendarView tasks={tasks} onSelect={setTaskId} />
      ) : (
        <TasksListView tasks={tasks} onSelect={setTaskId} />
      )}

      <TaskDetailSheet taskId={taskId} onOpenChange={(open) => !open && setTaskId(null)} />
      <TaskFormDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
