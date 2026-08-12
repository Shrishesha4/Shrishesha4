import { rupeesToMinor, minorToRupees } from "@/lib/finance/money"
import type { Transaction, FinanceAccount, FinanceCategory } from "@/lib/types/finance"

// Minimal RFC 4180 CSV line splitter — handles quoted fields containing
// commas, but not embedded newlines inside quotes (out of scope for a
// personal-finance CSV import of bank/UPI exports).
function splitCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        current += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ",") {
      fields.push(current)
      current = ""
    } else {
      current += char
    }
  }
  fields.push(current)
  return fields.map((f) => f.trim())
}

export type ParsedImportRow = {
  rowIndex: number
  raw: Record<string, string>
  date: string | null // YYYY-MM-DD
  type: "income" | "expense" | null
  amountMinor: number | null
  merchant: string
  description: string
  accountId: string | null
  accountName: string
  categoryId: string | null
  categoryName: string
  errors: string[]
  isDuplicate: boolean
}

const REQUIRED_HEADERS = ["date", "amount", "account"]

export function parseTransactionImportCsv(
  text: string,
  accounts: FinanceAccount[],
  categories: FinanceCategory[],
  existingTransactions: Transaction[]
): { rows: ParsedImportRow[]; headerError: string | null } {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0)
  if (lines.length === 0) return { rows: [], headerError: "The file is empty." }

  const headers = splitCsvLine(lines[0]).map((h) => h.toLowerCase())
  const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h))
  if (missing.length > 0) {
    return {
      rows: [],
      headerError: `Missing required column${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}. Expected headers: date, type, amount, merchant, category, account, description.`,
    }
  }

  const existingKeys = new Set(
    existingTransactions.map((t) =>
      [
        t.accountId,
        t.amountMinor,
        t.occurredAt.toDate().toISOString().slice(0, 10),
        (t.merchant ?? "").trim().toLowerCase(),
      ].join("|")
    )
  )
  const seenInFile = new Set<string>()

  const rows: ParsedImportRow[] = lines.slice(1).map((line, index) => {
    const fields = splitCsvLine(line)
    const raw: Record<string, string> = {}
    headers.forEach((header, i) => {
      raw[header] = fields[i] ?? ""
    })

    const errors: string[] = []

    const dateRaw = raw["date"]
    const date = /^\d{4}-\d{2}-\d{2}$/.test(dateRaw) ? dateRaw : null
    if (!date) errors.push("Invalid date (expected YYYY-MM-DD)")

    const typeRaw = raw["type"]?.toLowerCase()
    const type: "income" | "expense" | null =
      typeRaw === "income" ? "income" : typeRaw === "expense" || !typeRaw ? "expense" : null
    if (!type) errors.push('Type must be "income" or "expense"')

    const amountRaw = raw["amount"]?.replace(/,/g, "")
    const amountNum = Number(amountRaw)
    const amountMinor =
      amountRaw && !Number.isNaN(amountNum) ? rupeesToMinor(Math.abs(amountNum)) : null
    if (amountMinor === null) errors.push("Invalid amount")

    const accountName = raw["account"] ?? ""
    const account = accounts.find(
      (a) => a.name.toLowerCase() === accountName.trim().toLowerCase()
    )
    if (!account) errors.push(`Unknown account "${accountName}"`)

    const categoryName = raw["category"] ?? ""
    const category = categories.find(
      (c) => c.name.toLowerCase() === categoryName.trim().toLowerCase()
    )

    const merchant = raw["merchant"] ?? ""

    let isDuplicate = false
    if (account && amountMinor !== null && date) {
      const key = [account.id, amountMinor, date, merchant.trim().toLowerCase()].join("|")
      isDuplicate = existingKeys.has(key) || seenInFile.has(key)
      seenInFile.add(key)
    }

    return {
      rowIndex: index,
      raw,
      date,
      type,
      amountMinor,
      merchant,
      description: raw["description"] ?? "",
      accountId: account?.id ?? null,
      accountName,
      categoryId: category?.id ?? null,
      categoryName,
      errors,
      isDuplicate,
    }
  })

  return { rows, headerError: null }
}

export function exportTransactionsToCsv(
  transactions: Transaction[],
  accounts: FinanceAccount[],
  categories: FinanceCategory[]
): string {
  const header = [
    "date",
    "type",
    "amount",
    "merchant",
    "category",
    "account",
    "description",
    "reviewStatus",
  ]
  const rows = transactions.map((t) => {
    const account = accounts.find((a) => a.id === t.accountId)?.name ?? ""
    const category = categories.find((c) => c.id === t.categoryId)?.name ?? ""
    return [
      t.occurredAt.toDate().toISOString().slice(0, 10),
      t.type,
      minorToRupees(t.amountMinor).toFixed(2),
      t.merchant ?? "",
      category,
      account,
      t.description ?? "",
      t.reviewStatus,
    ]
      .map(escapeCsvField)
      .join(",")
  })
  return [header.join(","), ...rows].join("\n")
}

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
