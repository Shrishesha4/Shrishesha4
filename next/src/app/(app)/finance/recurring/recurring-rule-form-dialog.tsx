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
import { Checkbox } from "@/components/ui/checkbox"
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
import { createRecurringRule, updateRecurringRule } from "@/lib/firebase/recurring-rule-mutations"
import {
  recurringRuleFormSchema,
  type RecurringRuleFormInput,
} from "@/lib/schemas/finance.schema"
import { recurringCadenceLabel } from "@/lib/labels"
import { minorToRupees, rupeesToMinor } from "@/lib/finance/money"
import type { RecurringRule, RecurringCadence } from "@/lib/types/finance"

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function RecurringRuleFormDialog({
  open,
  onOpenChange,
  rule,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  rule?: RecurringRule | null
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
  } = useForm<RecurringRuleFormInput>({
    resolver: zodResolver(recurringRuleFormSchema),
    defaultValues: {
      name: "",
      type: "expense",
      expectedAmountMinor: 0,
      categoryId: null,
      accountId: "",
      cadence: "monthly",
      nextExpectedAt: todayISODate(),
      active: true,
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
        name: rule?.name ?? "",
        type: rule?.type ?? "expense",
        expectedAmountMinor: rule?.expectedAmountMinor ?? 0,
        categoryId: rule?.categoryId ?? null,
        accountId: rule?.accountId ?? accounts[0]?.id ?? "",
        cadence: rule?.cadence ?? "monthly",
        nextExpectedAt: rule
          ? rule.nextExpectedAt.toDate().toISOString().slice(0, 10)
          : todayISODate(),
        active: rule?.active ?? true,
      })
    }
  }, [open, rule, accounts, reset])

  async function onSubmit(values: RecurringRuleFormInput) {
    if (!user) return
    try {
      if (rule) {
        await updateRecurringRule(user.uid, rule.id, values)
        toast.success("Recurring rule updated")
      } else {
        await createRecurringRule(user.uid, values)
        toast.success("Recurring rule created")
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save recurring rule", error)
      const message = error instanceof Error ? error.message : "Couldn't save the recurring rule"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{rule ? "Edit recurring rule" : "New recurring rule"}</DialogTitle>
          <DialogDescription>
            {rule ? "Update this recurring bill or income." : "Track a recurring bill or income."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="recurring-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" autoFocus {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>

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
                          {(value: "income" | "expense") =>
                            value === "income" ? "Income" : "Expense"
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field data-invalid={!!errors.expectedAmountMinor}>
                <FieldLabel htmlFor="amount">Amount (₹)</FieldLabel>
                <Controller
                  control={control}
                  name="expectedAmountMinor"
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
                <FieldError errors={[errors.expectedAmountMinor]} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.accountId}>
                <FieldLabel>Account</FieldLabel>
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
                            relevantCategories.find((c) => c.id === value)?.name ?? "No category"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Cadence</FieldLabel>
                <Controller
                  control={control}
                  name="cadence"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {(value: RecurringCadence) => recurringCadenceLabel[value]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(recurringCadenceLabel).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="nextExpectedAt">Next due</FieldLabel>
                <Input id="nextExpectedAt" type="date" {...register("nextExpectedAt")} />
              </Field>
            </div>

            <Field orientation="horizontal">
              <Controller
                control={control}
                name="active"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                )}
              />
              <FieldLabel>Active</FieldLabel>
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="submit" form="recurring-form" disabled={isSubmitting}>
            {rule ? "Save changes" : "Create rule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
