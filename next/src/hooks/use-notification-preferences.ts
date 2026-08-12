"use client"

import * as React from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { useAuth } from "@/lib/auth/auth-context"
import type { NotificationPreferences } from "@/lib/types/notification"

const DEFAULTS: NotificationPreferences = {
  id: "settings",
  telegramEnabled: false,
  ntfyEnabled: false,
  quietHoursStart: null,
  quietHoursEnd: null,
}

export function useNotificationPreferences() {
  const { user } = useAuth()
  const [preferences, setPreferences] = React.useState<NotificationPreferences>(DEFAULTS)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const ref = doc(db, "users", user.uid, "notificationPreferences", "settings")
    const unsubscribe = onSnapshot(ref, (snap) => {
      setPreferences(snap.exists() ? ({ id: "settings", ...snap.data() } as NotificationPreferences) : DEFAULTS)
      setLoading(false)
    })
    return unsubscribe
  }, [user])

  if (!user) return { preferences: DEFAULTS, loading: false }
  return { preferences, loading }
}
