"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { financialGoalConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { FinancialGoal } from "@/lib/types/finance"

export function useFinancialGoals() {
  const { user } = useAuth()
  const [goals, setGoals] = React.useState<FinancialGoal[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "financialGoals").withConverter(financialGoalConverter),
      where("deletedAt", "==", null),
      orderBy("createdAt", "desc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setGoals(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { goals: [], loading: false, error: null }
  return { goals, loading, error }
}
