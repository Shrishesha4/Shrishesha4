"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy, getDocs, limit } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { financeCategoryConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import { seedDefaultFinanceCategories } from "@/lib/firebase/finance-category-mutations"
import type { FinanceCategory } from "@/lib/types/finance"

export function useFinanceCategories() {
  const { user } = useAuth()
  const [categories, setCategories] = React.useState<FinanceCategory[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const collRef = collection(db, "users", user.uid, "financeCategories")

    // Seed default categories on first-ever visit, before subscribing —
    // a one-doc existence check avoids reseeding on every mount.
    getDocs(query(collRef, limit(1))).then((snap) => {
      if (snap.empty) seedDefaultFinanceCategories(user.uid)
    })

    const q = query(
      collRef.withConverter(financeCategoryConverter),
      where("deletedAt", "==", null),
      orderBy("name", "asc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setCategories(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { categories: [], loading: false, error: null }
  return { categories, loading, error }
}
