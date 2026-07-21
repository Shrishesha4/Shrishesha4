"use client"

import * as React from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { useAuth } from "@/lib/auth/auth-context"
import type { SyncStatus } from "@/lib/offline/sync-status"

export function useSyncStatus(): SyncStatus {
  const { user } = useAuth()
  const [status, setStatus] = React.useState<SyncStatus>("all_saved")
  const [isOnline, setIsOnline] = React.useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  )

  React.useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  React.useEffect(() => {
    if (!user) return

    const ref = doc(db, "users", user.uid)
    const unsubscribe = onSnapshot(
      ref,
      { includeMetadataChanges: true },
      (snapshot) => {
        if (snapshot.metadata.hasPendingWrites) {
          setStatus("saving")
        } else if (snapshot.metadata.fromCache) {
          setStatus("cached")
        } else {
          setStatus("all_saved")
        }
      },
      () => setStatus("error")
    )
    return unsubscribe
  }, [user])

  if (!isOnline) return "offline"
  return status
}
