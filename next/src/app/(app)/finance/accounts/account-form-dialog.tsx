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
import { createFinanceAccount, updateFinanceAccount } from "@/lib/firebase/finance-account-mutations"
import { financeAccountFormSchema, type FinanceAccountFormInput } from "@/lib/schemas/finance.schema"
import { accountTypeLabel } from "@/lib/labels"
import { minorToRupees, rupeesToMinor } from "@/lib/finance/money"
import type { FinanceAccount, AccountType } from "@/lib/types/finance"

export function AccountFormDialog({
  open,
  onOpenChange,
  account,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  account?: FinanceAccount | null
}) {
  const { user } = useAuth()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinanceAccountFormInput>({
    resolver: zodResolver(financeAccountFormSchema),
    defaultValues: { name: "", type: "bank", openingBalanceMinor: 0, archived: false },
  })

  React.useEffect(() => {
    if (open) {
      reset({
        name: account?.name ?? "",
        type: account?.type ?? "bank",
        openingBalanceMinor: account?.openingBalanceMinor ?? 0,
        archived: account?.archived ?? false,
      })
    }
  }, [open, account, reset])

  async function onSubmit(values: FinanceAccountFormInput) {
    if (!user) return
    try {
      if (account) {
        await updateFinanceAccount(user.uid, account.id, values)
        toast.success("Account updated")
      } else {
        await createFinanceAccount(user.uid, values)
        toast.success("Account created")
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save account", error)
      const message = error instanceof Error ? error.message : "Couldn't save the account"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{account ? "Edit account" : "New account"}</DialogTitle>
          <DialogDescription>
            {account ? "Update this account's details." : "Add a cash, bank, or other account."}
          </DialogDescription>
        </DialogHeader>

        <form id="account-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" autoFocus {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field>
              <FieldLabel>Type</FieldLabel>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {(value: AccountType) => accountTypeLabel[value]}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(accountTypeLabel).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field data-invalid={!!errors.openingBalanceMinor}>
              <FieldLabel htmlFor="openingBalance">Opening balance (₹)</FieldLabel>
              <Controller
                control={control}
                name="openingBalanceMinor"
                render={({ field }) => (
                  <Input
                    id="openingBalance"
                    type="number"
                    step="0.01"
                    value={minorToRupees(field.value)}
                    onChange={(event) =>
                      field.onChange(rupeesToMinor(Number(event.target.value) || 0))
                    }
                  />
                )}
              />
              <FieldError errors={[errors.openingBalanceMinor]} />
            </Field>

            <Field orientation="horizontal">
              <Controller
                control={control}
                name="archived"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                )}
              />
              <FieldLabel>Archived</FieldLabel>
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="submit" form="account-form" disabled={isSubmitting}>
            {account ? "Save changes" : "Create account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
