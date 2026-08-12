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
import { createFinancialGoal, updateFinancialGoal } from "@/lib/firebase/financial-goal-mutations"
import {
  financialGoalFormSchema,
  type FinancialGoalFormInput,
} from "@/lib/schemas/finance.schema"
import { minorToRupees, rupeesToMinor } from "@/lib/finance/money"
import type { FinancialGoal } from "@/lib/types/finance"

export function GoalFormDialog({
  open,
  onOpenChange,
  goal,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal?: FinancialGoal | null
}) {
  const { user } = useAuth()
  const { accounts } = useFinanceAccounts()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinancialGoalFormInput>({
    resolver: zodResolver(financialGoalFormSchema),
    defaultValues: {
      name: "",
      targetAmountMinor: 0,
      currentAmountMinor: 0,
      targetDate: null,
      accountId: null,
    },
  })

  React.useEffect(() => {
    if (open) {
      reset({
        name: goal?.name ?? "",
        targetAmountMinor: goal?.targetAmountMinor ?? 0,
        currentAmountMinor: goal?.currentAmountMinor ?? 0,
        targetDate: goal?.targetDate ? goal.targetDate.toDate().toISOString().slice(0, 10) : null,
        accountId: goal?.accountId ?? null,
      })
    }
  }, [open, goal, reset])

  async function onSubmit(values: FinancialGoalFormInput) {
    if (!user) return
    try {
      if (goal) {
        await updateFinancialGoal(user.uid, goal.id, values)
        toast.success("Goal updated")
      } else {
        await createFinancialGoal(user.uid, values)
        toast.success("Goal created")
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save goal", error)
      const message = error instanceof Error ? error.message : "Couldn't save the goal"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{goal ? "Edit goal" : "New goal"}</DialogTitle>
          <DialogDescription>
            {goal ? "Update this savings goal." : "Set a savings target to track progress toward."}
          </DialogDescription>
        </DialogHeader>

        <form id="goal-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" autoFocus {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.targetAmountMinor}>
                <FieldLabel htmlFor="target">Target (₹)</FieldLabel>
                <Controller
                  control={control}
                  name="targetAmountMinor"
                  render={({ field }) => (
                    <Input
                      id="target"
                      type="number"
                      step="0.01"
                      value={field.value ? minorToRupees(field.value) : ""}
                      onChange={(event) =>
                        field.onChange(rupeesToMinor(Number(event.target.value) || 0))
                      }
                    />
                  )}
                />
                <FieldError errors={[errors.targetAmountMinor]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="current">Saved so far (₹)</FieldLabel>
                <Controller
                  control={control}
                  name="currentAmountMinor"
                  render={({ field }) => (
                    <Input
                      id="current"
                      type="number"
                      step="0.01"
                      value={field.value ? minorToRupees(field.value) : ""}
                      onChange={(event) =>
                        field.onChange(rupeesToMinor(Number(event.target.value) || 0))
                      }
                    />
                  )}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="targetDate">Target date</FieldLabel>
                <Controller
                  control={control}
                  name="targetDate"
                  render={({ field }) => (
                    <Input
                      id="targetDate"
                      type="date"
                      value={field.value ?? ""}
                      onChange={(event) => field.onChange(event.target.value || null)}
                    />
                  )}
                />
              </Field>

              <Field>
                <FieldLabel>Linked account</FieldLabel>
                <Controller
                  control={control}
                  name="accountId"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "none"}
                      onValueChange={(value) => field.onChange(value === "none" ? null : value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {(value: string) =>
                            accounts.find((a) => a.id === value)?.name ?? "No account"
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No account</SelectItem>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="submit" form="goal-form" disabled={isSubmitting}>
            {goal ? "Save changes" : "Create goal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
