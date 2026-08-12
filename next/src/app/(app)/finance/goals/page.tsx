"use client"

import * as React from "react"
import { PlusIcon, TargetIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/reui/badge"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useFinancialGoals } from "@/hooks/use-financial-goals"
import { formatMinor } from "@/lib/finance/money"
import { GoalFormDialog } from "./goal-form-dialog"
import type { FinancialGoal } from "@/lib/types/finance"

export default function GoalsPage() {
  const { goals, loading } = useFinancialGoals()
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editGoal, setEditGoal] = React.useState<FinancialGoal | null>(null)

  if (loading) return <PageLoadingSkeleton />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Goals</h1>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          New goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <PagePlaceholder
          icon={TargetIcon}
          title="No savings goals yet"
          description="Set a target to save toward and track your progress."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => {
            const percent =
              goal.targetAmountMinor > 0
                ? (goal.currentAmountMinor / goal.targetAmountMinor) * 100
                : 0
            return (
              <Card
                key={goal.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => setEditGoal(goal)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{goal.name}</CardTitle>
                    {goal.achieved && <Badge variant="success-light">Achieved</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Progress value={Math.min(percent, 100)} />
                  <p className="text-muted-foreground text-sm">
                    {formatMinor(goal.currentAmountMinor)} of {formatMinor(goal.targetAmountMinor)}
                  </p>
                  {goal.targetDate && (
                    <p className="text-muted-foreground text-xs">
                      Target: {goal.targetDate.toDate().toLocaleDateString("en-IN")}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <GoalFormDialog open={createOpen} onOpenChange={setCreateOpen} />
      <GoalFormDialog
        open={!!editGoal}
        onOpenChange={(open) => !open && setEditGoal(null)}
        goal={editGoal}
      />
    </div>
  )
}
