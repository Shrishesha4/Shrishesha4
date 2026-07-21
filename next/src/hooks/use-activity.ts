"use client"

import * as React from "react"
import { collection, onSnapshot, query, orderBy, limit as fsLimit } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { activityConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { ActivityEntry } from "@/lib/types/activity"

export function useActivity(pageLimit = 50) {
  const { user } = useAuth()
  const [entries, setEntries] = React.useState<ActivityEntry[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "activity").withConverter(activityConverter),
      orderBy("createdAt", "desc"),
      fsLimit(pageLimit)
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map((d) => d.data()))
      setLoading(false)
    })
    return unsubscribe
  }, [user, pageLimit])

  if (!user) return { entries: [], loading: false }
  return { entries, loading }
}
