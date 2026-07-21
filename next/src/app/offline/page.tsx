"use client"

import { CloudOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
      <CloudOffIcon className="text-muted-foreground size-8" />
      <p className="font-medium">You&apos;re offline</p>
      <p className="text-muted-foreground max-w-sm text-sm">
        This page isn&apos;t available without a connection yet. Previously visited
        pages and your cached data will still work.
      </p>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
  )
}
