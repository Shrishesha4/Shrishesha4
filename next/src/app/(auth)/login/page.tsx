"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { user, loading, signInWithGoogle } = useAuth()
  const [signingIn, setSigningIn] = React.useState(false)

  React.useEffect(() => {
    if (!loading && user) {
      router.replace("/today")
    }
  }, [loading, user, router])

  async function handleSignIn() {
    setSigningIn(true)
    try {
      await signInWithGoogle()
    } catch {
      toast.error("Sign-in failed. Please try again.")
    } finally {
      setSigningIn(false)
    }
  }

  if (loading || user) {
    return <Spinner className="size-6" />
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Personal Command Center</CardTitle>
        <CardDescription>
          A private, single-user workspace. Access is limited to approved accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" size="lg" onClick={handleSignIn} disabled={signingIn}>
          {signingIn ? <Spinner /> : null}
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-xs">
          Not an approved account? Access will be denied after sign-in.
        </p>
      </CardFooter>
    </Card>
  )
}
