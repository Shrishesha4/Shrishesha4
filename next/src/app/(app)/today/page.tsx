"use client"

import * as React from "react"
import { useQueryState } from "nuqs"
import { SparklesIcon, CalendarCheckIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useAuth } from "@/lib/auth/auth-context"
import { useTasks } from "@/hooks/use-tasks"
import { useProjects } from "@/hooks/use-projects"
import { saveDailyPlan } from "@/lib/firebase/daily-plan-mutations"
import {
  getSuggestedNextTask,
  rankTasksByScore,
  type ScoringContext,
} from "@/lib/scoring/recommend"
import { TaskRow } from "./task-row"
import { TaskDetailSheet } from "../tasks/task-detail-sheet"

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10)
}

export default function TodayPage() {
  const { user } = useAuth()
  const { tasks, loading: tasksLoading } = useTasks()
  const { projects, loading: projectsLoading } = useProjects()
  const [taskId, setTaskId] = useQueryState("task")

  const now = new Date()
  const today = todayISODate()

  const ctx: ScoringContext = {
    now,
    projectLastActivity: Object.fromEntries(
      projects.map((project) => [
        project.id,
        project.lastActivityAt ? project.lastActivityAt.toDate() : null,
      ])
    ),
  }

  const activeTasks = tasks.filter((task) => task.status !== "done" && task.status !== "archived")
  const overdue = activeTasks.filter(
    (task) => task.dueAt && task.dueAt.toMillis() < now.getTime()
  )
  const focusList = rankTasksByScore(
    activeTasks.filter((task) => task.scheduledFor === today),
    ctx
  )
  const suggested = getSuggestedNextTask(tasks, ctx)

  const focusIdsKey = focusList.map((task) => task.id).join(",")

  React.useEffect(() => {
    if (!user || tasksLoading || projectsLoading) return
    saveDailyPlan(user.uid, today, {
      taskIds: focusIdsKey ? focusIdsKey.split(",") : [],
      suggestedTaskId: suggested?.id ?? null,
    }).catch(() => {})
  }, [user, today, focusIdsKey, suggested?.id, tasksLoading, projectsLoading])

  if (tasksLoading || projectsLoading) return <PageLoadingSkeleton />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold">Today</h1>
        <p className="text-muted-foreground text-sm">{today}</p>
      </div>

      {suggested && (
        <Card>
          <CardContent className="flex items-center gap-3">
            <SparklesIcon className="text-primary size-5 shrink-0" />
            <div>
              <p className="text-muted-foreground text-xs">Suggested next</p>
              <button className="text-sm font-medium" onClick={() => setTaskId(suggested.id)}>
                {suggested.title}
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {overdue.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-destructive text-sm font-medium">Overdue ({overdue.length})</h2>
          {overdue.map((task) => (
            <TaskRow key={task.id} task={task} onSelect={setTaskId} />
          ))}
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">Focus list</h2>
        {focusList.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-12 text-center">
            <CalendarCheckIcon className="text-muted-foreground size-6" />
            <p className="text-muted-foreground text-sm">
              Nothing scheduled for today. Schedule a task from the Tasks page.
            </p>
          </div>
        ) : (
          focusList.map((task) => <TaskRow key={task.id} task={task} onSelect={setTaskId} />)
        )}
      </section>

      <TaskDetailSheet taskId={taskId} onOpenChange={(open) => !open && setTaskId(null)} />
    </div>
  )
}
