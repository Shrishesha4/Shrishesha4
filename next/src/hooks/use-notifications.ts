"use client"

import * as React from "react"
import { collection, onSnapshot, query, orderBy, limit as fsLimit } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { useAuth } from "@/lib/auth/auth-context"
import type { NotificationHistoryEntry } from "@/lib/types/notification"

export function useNotifications(pageLimit = 20) {
  const { user } = useAuth()
  const [notifications, setNotifications] = React.useState<NotificationHistoryEntry[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "notifications"),
      orderBy("createdAt", "desc"),
      fsLimit(pageLimit)
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as NotificationHistoryEntry)
      )
      setLoading(false)
    })
    return unsubscribe
  }, [user, pageLimit])

  if (!user) return { notifications: [], loading: false }
  return { notifications, loading }
}
