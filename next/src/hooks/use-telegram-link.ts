"use client"

import * as React from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { useAuth } from "@/lib/auth/auth-context"
import type { TelegramIntegration } from "@/lib/types/integration"

export function useTelegramLink() {
  const { user } = useAuth()
  const [integration, setIntegration] = React.useState<TelegramIntegration | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const ref = doc(db, "users", user.uid, "integrations", "telegram")
    const unsubscribe = onSnapshot(ref, (snap) => {
      setIntegration(snap.exists() ? ({ id: "telegram", ...snap.data() } as TelegramIntegration) : null)
      setLoading(false)
    })
    return unsubscribe
  }, [user])

  if (!user) return { integration: null, loading: false }
  return { integration, loading }
}
