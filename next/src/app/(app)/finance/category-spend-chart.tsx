"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { minorToRupees } from "@/lib/finance/money"
import type { Transaction, FinanceCategory } from "@/lib/types/finance"

const chartConfig = {
  amount: { label: "Spend", color: "var(--chart-1)" },
} satisfies ChartConfig

export function CategorySpendChart({
  transactions,
  categories,
  month,
}: {
  transactions: Transaction[]
  categories: FinanceCategory[]
  month: string
}) {
  const data = React.useMemo(() => {
    const totals = new Map<string, number>()
    for (const t of transactions) {
      if (t.type !== "expense") continue
      if (t.occurredAt.toDate().toISOString().slice(0, 7) !== month) continue
      const key = t.categoryId ?? "uncategorized"
      totals.set(key, (totals.get(key) ?? 0) + t.amountMinor)
    }
    return Array.from(totals.entries())
      .map(([categoryId, amountMinor]) => ({
        category:
          categoryId === "uncategorized"
            ? "Uncategorized"
            : (categories.find((c) => c.id === categoryId)?.name ?? "Unknown"),
        amount: minorToRupees(amountMinor),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8)
  }, [transactions, categories, month])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by category</CardTitle>
        <CardDescription>{month}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm">No expenses recorded this month.</p>
        ) : (
          <ChartContainer config={chartConfig} className="max-h-[280px] w-full">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
