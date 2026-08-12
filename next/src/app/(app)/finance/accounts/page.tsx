"use client"

import * as React from "react"
import { PlusIcon, WalletIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/reui/badge"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useFinanceAccounts } from "@/hooks/use-finance-accounts"
import { useTransactions } from "@/hooks/use-transactions"
import { formatMinor } from "@/lib/finance/money"
import { accountTypeLabel } from "@/lib/labels"
import { AccountFormDialog } from "./account-form-dialog"
import type { FinanceAccount } from "@/lib/types/finance"

function computeBalance(account: FinanceAccount, transactions: ReturnType<typeof useTransactions>["transactions"]) {
  let balance = account.openingBalanceMinor
  for (const t of transactions) {
    if (t.accountId === account.id) {
      if (t.type === "income" || t.type === "refund") balance += t.amountMinor
      else if (t.type === "expense") balance -= t.amountMinor
      else if (t.type === "transfer") balance -= t.amountMinor
    }
    if (t.type === "transfer" && t.destinationAccountId === account.id) {
      balance += t.amountMinor
    }
  }
  return balance
}

export default function AccountsPage() {
  const { accounts, loading } = useFinanceAccounts()
  const { transactions } = useTransactions()
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editAccount, setEditAccount] = React.useState<FinanceAccount | null>(null)

  if (loading) return <PageLoadingSkeleton />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Accounts</h1>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          New account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <PagePlaceholder
          icon={WalletIcon}
          title="No accounts yet"
          description="Add a cash, bank, or card account to start tracking spending."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => setEditAccount(account)}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{account.name}</CardTitle>
                  {account.archived && <Badge variant="outline">Archived</Badge>}
                </div>
                <CardDescription>{accountTypeLabel[account.type]}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {formatMinor(computeBalance(account, transactions))}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AccountFormDialog open={createOpen} onOpenChange={setCreateOpen} />
      <AccountFormDialog
        open={!!editAccount}
        onOpenChange={(open) => !open && setEditAccount(null)}
        account={editAccount}
      />
    </div>
  )
}
