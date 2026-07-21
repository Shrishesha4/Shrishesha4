"use client"

import * as React from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { dailyPlanConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { DailyPlan } from "@/lib/types/daily-plan"

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function useDailyPlan(date: string = todayISODate()) {
  const { user } = useAuth()
  const [dailyPlan, setDailyPlan] = React.useState<DailyPlan | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const ref = doc(db, "users", user.uid, "dailyPlans", date).withConverter(
      dailyPlanConverter
    )
    const unsubscribe = onSnapshot(
      ref,
      { includeMetadataChanges: true },
      (snapshot) => {
        setDailyPlan(snapshot.exists() ? snapshot.data() : null)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user, date])

  if (!user) return { dailyPlan: null, loading: false, error: null }
  return { dailyPlan, loading, error }
}
