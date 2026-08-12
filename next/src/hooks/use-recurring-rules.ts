"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { recurringRuleConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { RecurringRule } from "@/lib/types/finance"

export function useRecurringRules() {
  const { user } = useAuth()
  const [rules, setRules] = React.useState<RecurringRule[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "recurringRules").withConverter(recurringRuleConverter),
      where("deletedAt", "==", null),
      orderBy("nextExpectedAt", "asc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setRules(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { rules: [], loading: false, error: null }
  return { rules, loading, error }
}
