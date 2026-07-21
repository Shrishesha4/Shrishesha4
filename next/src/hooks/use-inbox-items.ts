"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { inboxItemConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { InboxItem } from "@/lib/types/inbox-item"

export function useInboxItems() {
  const { user } = useAuth()
  const [items, setItems] = React.useState<InboxItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "inboxItems").withConverter(inboxItemConverter),
      where("deletedAt", "==", null),
      orderBy("receivedAt", "desc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setItems(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { items: [], loading: false, error: null }
  return { items, loading, error }
}
