"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
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
import { createTransaction, updateTransaction } from "@/lib/firebase/transaction-mutations"
import {
  transactionFormSchema,
  type TransactionFormInput,
} from "@/lib/schemas/finance.schema"
import { transactionTypeLabel } from "@/lib/labels"
import { minorToRupees, rupeesToMinor } from "@/lib/finance/money"
import type { Transaction, TransactionType } from "@/lib/types/finance"

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function TransactionFormDialog({
  open,
  onOpenChange,
  transaction,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: Transaction | null
}) {
  const { user } = useAuth()
  const { accounts } = useFinanceAccounts()
  const { categories } = useFinanceCategories()

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      accountId: "",
      destinationAccountId: null,
      type: "expense",
      amountMinor: 0,
      occurredAt: todayISODate(),
      categoryId: null,
      merchant: "",
      description: "",
      tags: [],
      reviewStatus: "confirmed",
    },
  })

  // react-hook-form's watch() returns functions that can't be memoized safely —
  // inherent to the library, not a real issue here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const type = watch("type")
  const relevantCategories = categories.filter((c) =>
    type === "income" ? c.kind === "income" : c.kind === "expense"
  )

  React.useEffect(() => {
    if (open) {
      reset({
        accountId: transaction?.accountId ?? accounts[0]?.id ?? "",
        destinationAccountId: transaction?.destinationAccountId ?? null,
        type: transaction?.type ?? "expense",
        amountMinor: transaction?.amountMinor ?? 0,
        occurredAt: transaction
          ? transaction.occurredAt.toDate().toISOString().slice(0, 10)
          : todayISODate(),
        categoryId: transaction?.categoryId ?? null,
        merchant: transaction?.merchant ?? "",
        description: transaction?.description ?? "",
        tags: transaction?.tags ?? [],
        reviewStatus: transaction?.reviewStatus ?? "confirmed",
      })
    }
  }, [open, transaction, accounts, reset])

  async function onSubmit(values: TransactionFormInput) {
    if (!user) return
    try {
      if (transaction) {
        await updateTransaction(user.uid, transaction.id, values)
        toast.success("Transaction updated")
      } else {
        await createTransaction(user.uid, values)
        toast.success("Transaction logged")
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save transaction", error)
      const message = error instanceof Error ? error.message : "Couldn't save the transaction"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transaction ? "Edit transaction" : "New transaction"}</DialogTitle>
          <DialogDescription>
            {transaction ? "Update this transaction's details." : "Log an expense, income, refund, or transfer."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="transaction-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Type</FieldLabel>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {(value: TransactionType) => transactionTypeLabel[value]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(transactionTypeLabel).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field data-invalid={!!errors.amountMinor}>
                <FieldLabel htmlFor="amount">Amount (₹)</FieldLabel>
                <Controller
                  control={control}
                  name="amountMinor"
                  render={({ field }) => (
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={field.value ? minorToRupees(field.value) : ""}
                      onChange={(event) =>
                        field.onChange(rupeesToMinor(Number(event.target.value) || 0))
                      }
                    />
                  )}
                />
                <FieldError errors={[errors.amountMinor]} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.accountId}>
                <FieldLabel>{type === "transfer" ? "From account" : "Account"}</FieldLabel>
                <Controller
                  control={control}
                  name="accountId"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
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
                  )}
                />
                <FieldError errors={[errors.accountId]} />
              </Field>

              {type === "transfer" ? (
                <Field data-invalid={!!errors.destinationAccountId}>
                  <FieldLabel>To account</FieldLabel>
                  <Controller
                    control={control}
                    name="destinationAccountId"
                    render={({ field }) => (
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
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
                    )}
                  />
                  <FieldError errors={[errors.destinationAccountId]} />
                </Field>
              ) : (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? "none"}
                        onValueChange={(value) => field.onChange(value === "none" ? null : value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue>
                            {(value: string) =>
                              relevantCategories.find((c) => c.id === value)?.name ??
                              "No category"
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No category</SelectItem>
                          {relevantCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="occurredAt">Date</FieldLabel>
                <Input id="occurredAt" type="date" {...register("occurredAt")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="merchant">Merchant</FieldLabel>
                <Input id="merchant" {...register("merchant")} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea id="description" {...register("description")} />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="submit" form="transaction-form" disabled={isSubmitting}>
            {transaction ? "Save changes" : "Log transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
