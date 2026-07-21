"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { projectConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { Project } from "@/lib/types/project"

export function useProjects() {
  const { user } = useAuth()
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "projects").withConverter(projectConverter),
      where("deletedAt", "==", null),
      orderBy("lastActivityAt", "desc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setProjects(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { projects: [], loading: false, error: null }
  return { projects, loading, error }
}
