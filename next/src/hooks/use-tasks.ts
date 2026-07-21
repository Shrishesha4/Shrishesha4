"use client"

import * as React from "react"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { taskConverter } from "@/lib/firebase/converters"
import { useAuth } from "@/lib/auth/auth-context"
import type { Task } from "@/lib/types/task"

export function useTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "users", user.uid, "tasks").withConverter(taskConverter),
      where("deletedAt", "==", null),
      orderBy("sortOrder", "asc")
    )
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        setTasks(snapshot.docs.map((d) => d.data()))
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  if (!user) return { tasks: [], loading: false, error: null }
  return { tasks, loading, error }
}
