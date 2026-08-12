"use client"

import * as React from "react"
import { toast } from "sonner"
import { SparklesIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/reui/badge"
import { useAuth } from "@/lib/auth/auth-context"
import { useFinanceCategories } from "@/hooks/use-finance-categories"
import {
  acceptFinanceCategorization,
  rejectSuggestion,
} from "@/lib/firebase/ai-suggestion-mutations"
import type { FinanceCategorizationResult } from "@/lib/schemas/ai.schema"
import type { Transaction } from "@/lib/types/finance"

export function CategorizeSuggestionPopover({
  transaction,
  children,
}: {
  transaction: Transaction
  children: React.ReactElement
}) {
  const { user } = useAuth()
  const { categories } = useFinanceCategories()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [suggestionId, setSuggestionId] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<FinanceCategorizationResult | null>(null)

  async function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (nextOpen && !result && !loading && user) {
      setLoading(true)
      try {
        const idToken = await user.getIdToken()
        const response = await fetch("/api/ai/categorize-transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
          body: JSON.stringify({ transactionId: transaction.id }),
        })
        const data = await response.json()
        if (!response.ok) {
          toast.error(data.error ?? "Couldn't suggest a category")
          setOpen(false)
          return
        }
        setSuggestionId(data.suggestionId)
        setResult(data.output as FinanceCategorizationResult)
      } catch {
        toast.error("AI request failed")
        setOpen(false)
      } finally {
        setLoading(false)
      }
    }
  }

  async function handleAccept() {
    if (!user || !suggestionId || !result) return
    await acceptFinanceCategorization(
      user.uid,
      suggestionId,
      transaction.id,
      result.categoryName,
      result.normalizedMerchant,
      result.confidence,
      categories
    )
    toast.success("Category applied")
    setOpen(false)
    reset()
  }

  async function handleReject() {
    if (!user || !suggestionId) return
    await rejectSuggestion(user.uid, suggestionId)
    setOpen(false)
    reset()
  }

  function reset() {
    setSuggestionId(null)
    setResult(null)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger render={children} />
      <PopoverContent align="end" className="w-64">
        {loading ? (
          <p className="text-muted-foreground text-xs">Thinking…</p>
        ) : result ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <SparklesIcon className="size-3.5" />
              Suggestion
            </div>
            <p className="text-sm">
              Category: <span className="font-medium">{result.categoryName ?? "None"}</span>
            </p>
            {result.normalizedMerchant && (
              <p className="text-sm">
                Merchant: <span className="font-medium">{result.normalizedMerchant}</span>
              </p>
            )}
            <div className="flex items-center gap-1.5">
              <Badge variant={result.confidence >= 0.7 ? "success-light" : "warning-light"}>
                {Math.round(result.confidence * 100)}% confidence
              </Badge>
              {result.isRecurring && <Badge variant="outline">Recurring</Badge>}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAccept}>
                Apply
              </Button>
              <Button size="sm" variant="outline" onClick={handleReject}>
                Dismiss
              </Button>
            </div>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}
