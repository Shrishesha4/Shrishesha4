"use client"

import * as React from "react"
import { PlusIcon, ZapIcon, UploadIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { QuickExpenseDialog } from "@/components/app/quick-expense-dialog"
import { useTransactions } from "@/hooks/use-transactions"
import { useFinanceAccounts } from "@/hooks/use-finance-accounts"
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import { exportTransactionsToCsv, downloadCsv } from "@/lib/finance/csv"
import { TransactionsListView } from "./transactions-list-view"
import { TransactionFormDialog } from "./transaction-form-dialog"
import { ImportCsvDialog } from "./import-csv-dialog"
import type { Transaction } from "@/lib/types/finance"

export default function TransactionsPage() {
  const { transactions, loading } = useTransactions()
  const { accounts } = useFinanceAccounts()
  const { categories } = useFinanceCategories()
  const [createOpen, setCreateOpen] = React.useState(false)
  const [quickExpenseOpen, setQuickExpenseOpen] = React.useState(false)
  const [importOpen, setImportOpen] = React.useState(false)
  const [editTransaction, setEditTransaction] = React.useState<Transaction | null>(null)

  if (loading) return <PageLoadingSkeleton />

  function handleExport() {
    const csv = exportTransactionsToCsv(transactions, accounts, categories)
    downloadCsv(`transactions-${new Date().toISOString().slice(0, 10)}.csv`, csv)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">Transactions</h1>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleExport}>
            <DownloadIcon />
            Export
          </Button>
          <Button size="sm" variant="outline" onClick={() => setImportOpen(true)}>
            <UploadIcon />
            Import
          </Button>
          <Button size="sm" variant="outline" onClick={() => setQuickExpenseOpen(true)}>
            <ZapIcon />
            Log expense
          </Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <PlusIcon />
            New transaction
          </Button>
        </div>
      </div>

      <TransactionsListView transactions={transactions} onSelect={setEditTransaction} />

      <QuickExpenseDialog open={quickExpenseOpen} onOpenChange={setQuickExpenseOpen} />
      <ImportCsvDialog open={importOpen} onOpenChange={setImportOpen} />
      <TransactionFormDialog open={createOpen} onOpenChange={setCreateOpen} />
      <TransactionFormDialog
        open={!!editTransaction}
        onOpenChange={(open) => !open && setEditTransaction(null)}
        transaction={editTransaction}
      />
    </div>
  )
}
