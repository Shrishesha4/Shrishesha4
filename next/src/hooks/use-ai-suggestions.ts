"use client"

import * as React from "react"
import { collection, onSnapshot, query, orderBy, limit as fsLimit } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { aiSuggestionConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { AISuggestion } from "@/lib/types/ai-suggestion"

export function useAiSuggestions(pageLimit = 50) {
  const { user } = useAuth()
  const [suggestions, setSuggestions] = React.useState<AISuggestion[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "aiSuggestions").withConverter(aiSuggestionConverter),
      orderBy("createdAt", "desc"),
      fsLimit(pageLimit)
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSuggestions(snapshot.docs.map((d) => d.data()))
      setLoading(false)
    })
    return unsubscribe
  }, [user, pageLimit])

  if (!user) return { suggestions: [], loading: false }
  return { suggestions, loading }
}
