"use client"

import * as React from "react"
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth"
import { toast } from "sonner"
import { auth, googleProvider } from "@/lib/firebase/client"
import { ensureUserProfile } from "@/lib/firebase/ensure-user-profile"

type AuthContextValue = {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signInWithGoogle = React.useCallback(async () => {
    const credential = await signInWithPopup(auth, googleProvider)
    const idToken = await credential.user.getIdToken()

    const response = await fetch("/api/auth/verify-allowlist", {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
    })
    const { allowed } = (await response.json()) as { allowed: boolean }

    if (!allowed) {
      await firebaseSignOut(auth)
      toast.error("This email is not authorized for this workspace.")
      return
    }

    await ensureUserProfile(credential.user)
  }, [])

  const signOutUser = React.useCallback(async () => {
    await firebaseSignOut(auth)
  }, [])

  const value = React.useMemo(
    () => ({ user, loading, signInWithGoogle, signOutUser }),
    [user, loading, signInWithGoogle, signOutUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
