import type { Task, EnergyLevel } from "@/lib/types/task"

export type ScoringContext = {
  now: Date
  projectLastActivity: Record<string, Date | null>
  userEnergyLevel?: EnergyLevel
}

// Weights are an invented, documented starting point — plan.md names five
// scoring factors (due urgency, priority, scheduled date, project inactivity,
// effort fit) but specifies no formula or relative weighting. Tune freely.
export function scoreTask(task: Task, ctx: ScoringContext): number {
  let score = 0

  // 1. Due date urgency
  if (task.dueAt) {
    const hoursUntilDue = (task.dueAt.toMillis() - ctx.now.getTime()) / 3_600_000
    if (hoursUntilDue < 0) score += 100
    else if (hoursUntilDue < 24) score += 60
    else if (hoursUntilDue < 72) score += 30
    else score += 10
  }

  // 2. Priority
  const priorityWeight: Record<Task["priority"], number> = {
    urgent: 40,
    high: 25,
    medium: 10,
    low: 0,
  }
  score += priorityWeight[task.priority]

  // 3. Scheduled date (today or overdue-scheduled gets a boost)
  if (task.scheduledFor) {
    const todayISO = ctx.now.toISOString().slice(0, 10)
    if (task.scheduledFor <= todayISO) score += 20
  }

  // 4. Project inactivity (stalled projects get a nudge to resurface their tasks)
  if (task.projectId) {
    const lastActivity = ctx.projectLastActivity[task.projectId]
    if (lastActivity) {
      const daysInactive = (ctx.now.getTime() - lastActivity.getTime()) / 86_400_000
      if (daysInactive > 14) score += 15
      else if (daysInactive > 7) score += 8
    }
  }

  // 5. Effort fit (prefer tasks matching the user's current energy budget)
  const energy = ctx.userEnergyLevel ?? "medium"
  if (task.energyLevel && task.energyLevel === energy) score += 10

  return score
}

export function getSuggestedNextTask(tasks: Task[], ctx: ScoringContext): Task | null {
  const eligible = tasks.filter(
    (task) => task.status === "planned" || task.status === "in_progress"
  )
  if (eligible.length === 0) return null
  return eligible.reduce((best, task) =>
    scoreTask(task, ctx) > scoreTask(best, ctx) ? task : best
  )
}

export function rankTasksByScore(tasks: Task[], ctx: ScoringContext): Task[] {
  return [...tasks].sort((a, b) => scoreTask(b, ctx) - scoreTask(a, ctx))
}
