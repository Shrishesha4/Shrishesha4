"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { tagConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { Tag } from "@/lib/types/tag"

export function useTags() {
  const { user } = useAuth()
  const [tags, setTags] = React.useState<Tag[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "tags").withConverter(tagConverter),
      where("deletedAt", "==", null),
      orderBy("name", "asc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setTags(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { tags: [], loading: false, error: null }
  return { tags, loading, error }
}
