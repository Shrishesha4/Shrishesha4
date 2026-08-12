"use client"

import * as React from "react"
import { PlusIcon, PiggyBankIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/reui/badge"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useBudgets } from "@/hooks/use-budgets"
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import { useTransactions } from "@/hooks/use-transactions"
import { formatMinor } from "@/lib/finance/money"
import { BudgetFormDialog } from "./budget-form-dialog"
import type { Budget } from "@/lib/types/finance"

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7)
}

export default function BudgetsPage() {
  const { budgets, loading: budgetsLoading } = useBudgets()
  const { categories, loading: categoriesLoading } = useFinanceCategories()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editBudget, setEditBudget] = React.useState<Budget | null>(null)

  const thisMonth = currentMonth()
  const monthBudgets = budgets.filter((b) => b.month === thisMonth)

  if (budgetsLoading || categoriesLoading || transactionsLoading) return <PageLoadingSkeleton />

  function categoryName(categoryId: string) {
    return categories.find((c) => c.id === categoryId)?.name ?? "—"
  }

  function spentForCategory(categoryId: string): number {
    return transactions
      .filter(
        (t) =>
          t.categoryId === categoryId &&
          t.type === "expense" &&
          t.occurredAt.toDate().toISOString().slice(0, 7) === thisMonth
      )
      .reduce((sum, t) => sum + t.amountMinor, 0)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Budgets — {thisMonth}</h1>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          New budget
        </Button>
      </div>

      {monthBudgets.length === 0 ? (
        <PagePlaceholder
          icon={PiggyBankIcon}
          title="No budgets for this month"
          description="Set a spending limit per category to track against."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {monthBudgets.map((budget) => {
            const spent = spentForCategory(budget.categoryId)
            const percent = budget.limitMinor > 0 ? (spent / budget.limitMinor) * 100 : 0
            const overThreshold = percent >= budget.alertThresholdPercent

            return (
              <Card
                key={budget.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => setEditBudget(budget)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{categoryName(budget.categoryId)}</CardTitle>
                    {overThreshold && <Badge variant="warning-light">Near limit</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Progress value={Math.min(percent, 100)} />
                  <p className="text-muted-foreground text-sm">
                    {formatMinor(spent)} of {formatMinor(budget.limitMinor)}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <BudgetFormDialog open={createOpen} onOpenChange={setCreateOpen} />
      <BudgetFormDialog
        open={!!editBudget}
        onOpenChange={(open) => !open && setEditBudget(null)}
        budget={editBudget}
      />
    </div>
  )
}
