"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { financeAccountConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { FinanceAccount } from "@/lib/types/finance"

export function useFinanceAccounts() {
  const { user } = useAuth()
  const [accounts, setAccounts] = React.useState<FinanceAccount[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "financeAccounts").withConverter(financeAccountConverter),
      where("deletedAt", "==", null),
      orderBy("name", "asc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setAccounts(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { accounts: [], loading: false, error: null }
  return { accounts, loading, error }
}
