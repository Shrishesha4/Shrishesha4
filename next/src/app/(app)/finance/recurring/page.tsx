"use client"

import * as React from "react"
import { PlusIcon, RepeatIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/reui/badge"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useRecurringRules } from "@/hooks/use-recurring-rules"
import { useFinanceAccounts } from "@/hooks/use-finance-accounts"
import { formatMinor } from "@/lib/finance/money"
import { recurringCadenceLabel } from "@/lib/labels"
import { RecurringRuleFormDialog } from "./recurring-rule-form-dialog"
import type { RecurringRule } from "@/lib/types/finance"

export default function RecurringPage() {
  const { rules, loading: rulesLoading } = useRecurringRules()
  const { accounts, loading: accountsLoading } = useFinanceAccounts()
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editRule, setEditRule] = React.useState<RecurringRule | null>(null)

  if (rulesLoading || accountsLoading) return <PageLoadingSkeleton />

  function accountName(accountId: string) {
    return accounts.find((a) => a.id === accountId)?.name ?? "—"
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Recurring</h1>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          New rule
        </Button>
      </div>

      {rules.length === 0 ? (
        <PagePlaceholder
          icon={RepeatIcon}
          title="No recurring bills or income"
          description="Track subscriptions, rent, salary, or other recurring amounts."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {rules.map((rule) => (
            <Card
              key={rule.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => setEditRule(rule)}
            >
              <CardContent className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{rule.name}</span>
                    {!rule.active && <Badge variant="outline">Inactive</Badge>}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {accountName(rule.accountId)} · {recurringCadenceLabel[rule.cadence]} · Next{" "}
                    {rule.nextExpectedAt.toDate().toLocaleDateString("en-IN")}
                  </p>
                </div>
                <span
                  className={
                    rule.type === "income" ? "text-success font-medium" : "font-medium"
                  }
                >
                  {rule.type === "income" ? "+" : "-"}
                  {formatMinor(rule.expectedAmountMinor)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <RecurringRuleFormDialog open={createOpen} onOpenChange={setCreateOpen} />
      <RecurringRuleFormDialog
        open={!!editRule}
        onOpenChange={(open) => !open && setEditRule(null)}
        rule={editRule}
      />
    </div>
  )
}
