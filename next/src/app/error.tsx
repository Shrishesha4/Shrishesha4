"use client"

import { useEffect } from "react"
import { AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RootError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
      <AlertTriangleIcon className="text-destructive size-8" />
      <p className="font-medium">Something went wrong</p>
      <p className="text-muted-foreground max-w-sm text-sm">{error.message}</p>
      <Button onClick={() => unstable_retry()}>Try again</Button>
    </div>
  )
}
