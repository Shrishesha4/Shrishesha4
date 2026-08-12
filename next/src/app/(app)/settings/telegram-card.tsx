"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { useAuth } from "@/lib/auth/auth-context"
import { useTelegramLink } from "@/hooks/use-telegram-link"

export function TelegramCard() {
  const { user } = useAuth()
  const { integration, loading } = useTelegramLink()
  const [linkCode, setLinkCode] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)

  async function handleGenerateCode() {
    if (!user) return
    setBusy(true)
    try {
      const idToken = await user.getIdToken()
      const response = await fetch("/api/telegram/generate-link-code", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        toast.error(data.error ?? "Couldn't generate a link code")
        return
      }
      const { code } = await response.json()
      setLinkCode(code)
    } finally {
      setBusy(false)
    }
  }

  async function handleUnlink() {
    if (!user) return
    setBusy(true)
    try {
      const idToken = await user.getIdToken()
      await fetch("/api/telegram/unlink", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      })
      setLinkCode(null)
      toast.success("Telegram unlinked")
    } finally {
      setBusy(false)
    }
  }

  if (loading) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram</CardTitle>
        <CardDescription>
          {integration
            ? `Connected${integration.username ? ` as @${integration.username}` : ""}`
            : "Capture tasks and expenses remotely via Telegram."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {integration ? (
          <Button variant="outline" onClick={handleUnlink} disabled={busy} className="w-fit">
            Unlink Telegram
          </Button>
        ) : linkCode ? (
          <div className="flex flex-col gap-2 text-sm">
            <p>
              Message <Kbd>/start {linkCode}</Kbd> to your bot on Telegram to finish linking.
            </p>
            <p className="text-muted-foreground text-xs">This code expires in 10 minutes.</p>
          </div>
        ) : (
          <Button variant="outline" onClick={handleGenerateCode} disabled={busy} className="w-fit">
            Link Telegram
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
