"use client"

import * as React from "react"
import { toast } from "sonner"
import { UploadIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/reui/badge"
import { useAuth } from "@/lib/auth/auth-context"
import { useFinanceAccounts } from "@/hooks/use-finance-accounts"
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import { useTransactions } from "@/hooks/use-transactions"
import { parseTransactionImportCsv, type ParsedImportRow } from "@/lib/finance/csv"
import { importTransactions } from "@/lib/firebase/transaction-mutations"
import { minorToRupees } from "@/lib/finance/money"

export function ImportCsvDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user } = useAuth()
  const { accounts } = useFinanceAccounts()
  const { categories } = useFinanceCategories()
  const { transactions } = useTransactions()

  const [rows, setRows] = React.useState<ParsedImportRow[]>([])
  const [headerError, setHeaderError] = React.useState<string | null>(null)
  const [importing, setImporting] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!open) {
      // Reset parsed rows on close — genuine effect use, not derivable at
      // render time since `open` toggles externally.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRows([])
      setHeaderError(null)
    }
  }, [open])

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result ?? "")
      const result = parseTransactionImportCsv(text, accounts, categories, transactions)
      setRows(result.rows)
      setHeaderError(result.headerError)
    }
    reader.readAsText(file)
  }

  const importableCount = rows.filter((r) => r.errors.length === 0 && !r.isDuplicate).length
  const duplicateCount = rows.filter((r) => r.isDuplicate).length
  const errorCount = rows.filter((r) => r.errors.length > 0).length

  async function handleImport() {
    if (!user) return
    const toImport = rows.filter((r) => r.errors.length === 0 && !r.isDuplicate)
    if (toImport.length === 0) return

    setImporting(true)
    try {
      const count = await importTransactions(user.uid, toImport)
      toast.success(`Imported ${count} transaction${count === 1 ? "" : "s"} for review`)
      onOpenChange(false)
    } catch (error) {
      console.error("CSV import failed", error)
      toast.error("Import failed")
    } finally {
      setImporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import transactions from CSV</DialogTitle>
          <DialogDescription>
            Expected columns: date (YYYY-MM-DD), type (income/expense), amount, merchant,
            category, account, description. Account and category names must match existing
            ones exactly.
          </DialogDescription>
        </DialogHeader>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-10">
            <UploadIcon className="text-muted-foreground size-6" />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Choose CSV file
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) handleFile(file)
              }}
            />
            {headerError && <p className="text-destructive text-sm">{headerError}</p>}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 text-sm">
              <Badge variant="success-light">{importableCount} ready</Badge>
              {duplicateCount > 0 && (
                <Badge variant="warning-light">{duplicateCount} duplicate — skipped</Badge>
              )}
              {errorCount > 0 && <Badge variant="destructive-light">{errorCount} error — skipped</Badge>}
            </div>

            <div className="max-h-80 overflow-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.rowIndex}>
                      <TableCell>{row.date ?? row.raw["date"]}</TableCell>
                      <TableCell>{row.type ?? "—"}</TableCell>
                      <TableCell>
                        {row.amountMinor !== null ? minorToRupees(row.amountMinor).toFixed(2) : "—"}
                      </TableCell>
                      <TableCell>{row.merchant}</TableCell>
                      <TableCell>{row.accountName}</TableCell>
                      <TableCell>
                        {row.errors.length > 0 ? (
                          <Badge variant="destructive-light">{row.errors[0]}</Badge>
                        ) : row.isDuplicate ? (
                          <Badge variant="warning-light">Duplicate</Badge>
                        ) : (
                          <Badge variant="success-light">Ready</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <DialogFooter>
          {rows.length > 0 && (
            <Button variant="outline" onClick={() => setRows([])}>
              Choose different file
            </Button>
          )}
          <Button onClick={handleImport} disabled={importableCount === 0 || importing}>
            Import {importableCount > 0 ? importableCount : ""} transaction
            {importableCount === 1 ? "" : "s"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
