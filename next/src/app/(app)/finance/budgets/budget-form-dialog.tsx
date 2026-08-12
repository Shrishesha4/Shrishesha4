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
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import { createBudget, updateBudget } from "@/lib/firebase/budget-mutations"
import { budgetFormSchema, type BudgetFormInput } from "@/lib/schemas/finance.schema"
import { minorToRupees, rupeesToMinor } from "@/lib/finance/money"
import type { Budget } from "@/lib/types/finance"

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7)
}

export function BudgetFormDialog({
  open,
  onOpenChange,
  budget,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  budget?: Budget | null
}) {
  const { user } = useAuth()
  const { categories } = useFinanceCategories()
  const expenseCategories = categories.filter((c) => c.kind === "expense")

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormInput>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      categoryId: "",
      month: currentMonth(),
      limitMinor: 0,
      alertThresholdPercent: 80,
    },
  })

  React.useEffect(() => {
    if (open) {
      reset({
        categoryId: budget?.categoryId ?? expenseCategories[0]?.id ?? "",
        month: budget?.month ?? currentMonth(),
        limitMinor: budget?.limitMinor ?? 0,
        alertThresholdPercent: budget?.alertThresholdPercent ?? 80,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, budget, reset])

  async function onSubmit(values: BudgetFormInput) {
    if (!user) return
    try {
      if (budget) {
        await updateBudget(user.uid, budget.id, values)
        toast.success("Budget updated")
      } else {
        await createBudget(user.uid, values)
        toast.success("Budget created")
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save budget", error)
      const message = error instanceof Error ? error.message : "Couldn't save the budget"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{budget ? "Edit budget" : "New budget"}</DialogTitle>
          <DialogDescription>
            {budget ? "Update this budget's limit." : "Set a monthly spending limit for a category."}
          </DialogDescription>
        </DialogHeader>

        <form id="budget-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FieldGroup>
            <Field data-invalid={!!errors.categoryId}>
              <FieldLabel>Category</FieldLabel>
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {(value: string) =>
                          expenseCategories.find((c) => c.id === value)?.name ?? "Select category"
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.categoryId]} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="month">Month</FieldLabel>
                <Input id="month" type="month" {...register("month")} />
              </Field>

              <Field data-invalid={!!errors.limitMinor}>
                <FieldLabel htmlFor="limit">Limit (₹)</FieldLabel>
                <Controller
                  control={control}
                  name="limitMinor"
                  render={({ field }) => (
                    <Input
                      id="limit"
                      type="number"
                      step="0.01"
                      value={field.value ? minorToRupees(field.value) : ""}
                      onChange={(event) =>
                        field.onChange(rupeesToMinor(Number(event.target.value) || 0))
                      }
                    />
                  )}
                />
                <FieldError errors={[errors.limitMinor]} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="threshold">Alert at (% of limit)</FieldLabel>
              <Controller
                control={control}
                name="alertThresholdPercent"
                render={({ field }) => (
                  <Input
                    id="threshold"
                    type="number"
                    min={1}
                    max={100}
                    value={field.value}
                    onChange={(event) => field.onChange(Number(event.target.value) || 0)}
                  />
                )}
              />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="submit" form="budget-form" disabled={isSubmitting}>
            {budget ? "Save changes" : "Create budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
