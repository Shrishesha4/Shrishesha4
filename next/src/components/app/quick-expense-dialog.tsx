"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useAuth } from "@/lib/auth/auth-context"
import { useFinanceAccounts } from "@/hooks/use-finance-accounts"
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import { createQuickExpense } from "@/lib/firebase/transaction-mutations"
import { quickExpenseSchema } from "@/lib/schemas/finance.schema"
import { rupeesToMinor } from "@/lib/finance/money"

export function QuickExpenseDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user } = useAuth()
  const { accounts } = useFinanceAccounts()
  const { categories } = useFinanceCategories()
  const expenseCategories = categories.filter((c) => c.kind === "expense")

  const [amount, setAmount] = React.useState("")
  const [merchant, setMerchant] = React.useState("")
  const [accountId, setAccountId] = React.useState("")
  const [categoryId, setCategoryId] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      // Reset form fields each time the dialog opens — genuine effect use,
      // not derivable at render time since `open` toggles externally.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAmount("")
      setMerchant("")
      setAccountId(accounts[0]?.id ?? "")
      setCategoryId(null)
    }
  }, [open, accounts])

  async function handleSubmit() {
    if (!user) return
    const parsed = quickExpenseSchema.safeParse({
      accountId,
      amountMinor: rupeesToMinor(Number(amount) || 0),
      merchant,
      categoryId,
    })
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid expense")
      return
    }

    setSubmitting(true)
    try {
      await createQuickExpense(user.uid, parsed.data)
      onOpenChange(false)
      toast.success("Expense logged")
    } catch (error) {
      console.error("Failed to log expense", error)
      toast.error("Couldn't log the expense")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log expense</DialogTitle>
          <DialogDescription>Quickly record a spend.</DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="quick-amount">Amount</FieldLabel>
            <InputGroup>
              <InputGroupAddon>₹</InputGroupAddon>
              <InputGroupInput
                id="quick-amount"
                autoFocus
                type="number"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="quick-merchant">Merchant</FieldLabel>
            <Input
              id="quick-merchant"
              value={merchant}
              onChange={(event) => setMerchant(event.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Account</FieldLabel>
              <Select value={accountId} onValueChange={(value) => setAccountId(value ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: string) =>
                      accounts.find((a) => a.id === value)?.name ?? "Select account"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select
                value={categoryId ?? "none"}
                onValueChange={(value) => setCategoryId(value === "none" ? null : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: string) =>
                      expenseCategories.find((c) => c.id === value)?.name ?? "No category"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No category</SelectItem>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </FieldGroup>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={submitting || !accountId || !amount}
          >
            Log expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
