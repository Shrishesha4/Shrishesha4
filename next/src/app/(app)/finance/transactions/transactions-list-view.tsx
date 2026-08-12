"use client"

import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { DataGrid, DataGridContainer } from "@/components/reui/data-grid/data-grid"
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table"
import {
  Filters,
  type Filter,
  type FilterFieldConfig,
} from "@/components/reui/filters"
import { Badge } from "@/components/reui/badge"
import { Button } from "@/components/ui/button"
import { CheckIcon, SparklesIcon } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth/auth-context"
import { useFinanceAccounts } from "@/hooks/use-finance-accounts"
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import { confirmTransaction } from "@/lib/firebase/transaction-mutations"
import { CategorizeSuggestionPopover } from "./categorize-suggestion-popover"
import { formatMinor } from "@/lib/finance/money"
import { transactionTypeLabel } from "@/lib/labels"
import type { Transaction, TransactionType } from "@/lib/types/finance"

const typeVariant: Record<TransactionType, React.ComponentProps<typeof Badge>["variant"]> = {
  income: "success-light",
  expense: "destructive-light",
  transfer: "secondary",
  refund: "info-light",
}

const filterFields: FilterFieldConfig[] = [
  {
    key: "type",
    label: "Type",
    type: "multiselect",
    options: [
      { value: "income", label: "Income" },
      { value: "expense", label: "Expense" },
      { value: "transfer", label: "Transfer" },
      { value: "refund", label: "Refund" },
    ],
  },
  {
    key: "reviewStatus",
    label: "Review",
    type: "multiselect",
    options: [
      { value: "confirmed", label: "Confirmed" },
      { value: "needs_review", label: "Needs review" },
    ],
  },
]

function applyFilters(transactions: Transaction[], filters: Filter[]): Transaction[] {
  return transactions.filter((t) =>
    filters.every((filter) => {
      if (filter.values.length === 0) return true
      if (filter.field === "type") return filter.values.includes(t.type)
      if (filter.field === "reviewStatus") return filter.values.includes(t.reviewStatus)
      return true
    })
  )
}

export function TransactionsListView({
  transactions,
  onSelect,
}: {
  transactions: Transaction[]
  onSelect: (transaction: Transaction) => void
}) {
  const { user } = useAuth()
  const { accounts } = useFinanceAccounts()
  const { categories } = useFinanceCategories()
  const [filters, setFilters] = React.useState<Filter[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const handleConfirm = React.useCallback(
    async (transactionId: string) => {
      if (!user) return
      try {
        await confirmTransaction(user.uid, transactionId)
      } catch (error) {
        console.error("Failed to confirm transaction", error)
        toast.error("Couldn't confirm the transaction")
      }
    },
    [user]
  )

  const accountName = React.useCallback(
    (accountId: string) => accounts.find((a) => a.id === accountId)?.name ?? "—",
    [accounts]
  )
  const categoryName = React.useCallback(
    (categoryId?: string | null) => categories.find((c) => c.id === categoryId)?.name ?? "—",
    [categories]
  )

  const filteredTransactions = React.useMemo(
    () => applyFilters(transactions, filters),
    [transactions, filters]
  )

  const columns = React.useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        id: "occurredAt",
        header: "Date",
        cell: ({ row }) => row.original.occurredAt.toDate().toLocaleDateString("en-IN"),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant={typeVariant[row.original.type]}>
            {transactionTypeLabel[row.original.type]}
          </Badge>
        ),
      },
      {
        id: "merchant",
        header: "Merchant",
        cell: ({ row }) => row.original.merchant || row.original.description || "—",
      },
      {
        id: "account",
        header: "Account",
        cell: ({ row }) => accountName(row.original.accountId),
      },
      {
        id: "category",
        header: "Category",
        cell: ({ row }) => categoryName(row.original.categoryId),
      },
      {
        accessorKey: "amountMinor",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-medium">{formatMinor(row.original.amountMinor)}</span>
        ),
      },
      {
        accessorKey: "reviewStatus",
        header: "Review",
        cell: ({ row }) =>
          row.original.reviewStatus === "needs_review" ? (
            <div className="flex items-center gap-1.5" onClick={(event) => event.stopPropagation()}>
              <Badge variant="warning-light">Needs review</Badge>
              <CategorizeSuggestionPopover transaction={row.original}>
                <Button size="icon-xs" variant="ghost">
                  <SparklesIcon />
                  <span className="sr-only">AI categorize</span>
                </Button>
              </CategorizeSuggestionPopover>
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => handleConfirm(row.original.id)}
              >
                <CheckIcon />
                <span className="sr-only">Confirm</span>
              </Button>
            </div>
          ) : (
            <Badge variant="outline">Confirmed</Badge>
          ),
      },
    ],
    [accountName, categoryName, handleConfirm]
  )

  // TanStack Table's API returns functions that can't be memoized safely —
  // inherent to the library, not a real issue here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredTransactions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  })

  return (
    <div className="flex flex-col gap-3">
      <Filters filters={filters} fields={filterFields} onChange={setFilters} />
      <DataGrid
        table={table}
        recordCount={filteredTransactions.length}
        emptyMessage="No transactions match these filters."
        onRowClick={(row) => onSelect(row)}
      >
        <DataGridContainer>
          <DataGridTable />
        </DataGridContainer>
      </DataGrid>
    </div>
  )
}
