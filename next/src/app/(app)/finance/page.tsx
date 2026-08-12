"use client"

import { TrendingUpIcon, TrendingDownIcon, WalletIcon, BellIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/reui/badge"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useFinanceAccounts } from "@/hooks/use-finance-accounts"
import { useTransactions } from "@/hooks/use-transactions"
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import { useRecurringRules } from "@/hooks/use-recurring-rules"
import { formatMinor } from "@/lib/finance/money"
import { CategorySpendChart } from "./category-spend-chart"

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7)
}

export default function FinanceOverviewPage() {
  const { accounts, loading: accountsLoading } = useFinanceAccounts()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const { categories, loading: categoriesLoading } = useFinanceCategories()
  const { rules, loading: rulesLoading } = useRecurringRules()

  if (accountsLoading || transactionsLoading || categoriesLoading || rulesLoading) {
    return <PageLoadingSkeleton />
  }

  const thisMonth = currentMonth()
  const monthTransactions = transactions.filter(
    (t) => t.occurredAt.toDate().toISOString().slice(0, 7) === thisMonth
  )
  const income = monthTransactions
    .filter((t) => t.type === "income" || t.type === "refund")
    .reduce((sum, t) => sum + t.amountMinor, 0)
  const expense = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amountMinor, 0)
  const net = income - expense

  const totalBalance = accounts
    .filter((a) => !a.archived)
    .reduce((sum, account) => {
      let balance = account.openingBalanceMinor
      for (const t of transactions) {
        if (t.accountId === account.id) {
          if (t.type === "income" || t.type === "refund") balance += t.amountMinor
          else if (t.type === "expense" || t.type === "transfer") balance -= t.amountMinor
        }
        if (t.type === "transfer" && t.destinationAccountId === account.id) {
          balance += t.amountMinor
        }
      }
      return sum + balance
    }, 0)

  const now = new Date()
  const upcomingBills = rules
    .filter((r) => r.active && r.type === "expense")
    .filter((r) => {
      const daysUntil = (r.nextExpectedAt.toMillis() - now.getTime()) / 86_400_000
      return daysUntil >= 0 && daysUntil <= 14
    })
    .sort((a, b) => a.nextExpectedAt.toMillis() - b.nextExpectedAt.toMillis())

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Overview</h1>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <WalletIcon className="size-3.5" />
              Total balance
            </CardDescription>
            <CardTitle className="text-2xl">{formatMinor(totalBalance)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <TrendingUpIcon className="size-3.5" />
              Income this month
            </CardDescription>
            <CardTitle className="text-2xl">{formatMinor(income)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <TrendingDownIcon className="size-3.5" />
              Expense this month
            </CardDescription>
            <CardTitle className="text-2xl">{formatMinor(expense)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardDescription>Net cash flow this month</CardDescription>
          <CardTitle className={net >= 0 ? "text-success text-2xl" : "text-destructive text-2xl"}>
            {net >= 0 ? "+" : ""}
            {formatMinor(net)}
          </CardTitle>
        </CardHeader>
      </Card>

      <CategorySpendChart transactions={transactions} categories={categories} month={thisMonth} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            <BellIcon className="size-4" />
            Upcoming bills (next 14 days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingBills.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nothing due soon.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {upcomingBills.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between gap-2 text-sm">
                  <span>{rule.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {rule.nextExpectedAt.toDate().toLocaleDateString("en-IN")}
                    </Badge>
                    <span className="font-medium">{formatMinor(rule.expectedAmountMinor)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
