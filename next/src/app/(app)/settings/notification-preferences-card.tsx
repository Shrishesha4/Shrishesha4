"use client"

import * as React from "react"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { useAuth } from "@/lib/auth/auth-context"
import { useNotificationPreferences } from "@/hooks/use-notification-preferences"
import { updateNotificationPreferences } from "@/lib/firebase/notification-preferences-mutations"

export function NotificationPreferencesCard() {
  const { user } = useAuth()
  const { preferences, loading } = useNotificationPreferences()
  const [testing, setTesting] = React.useState(false)

  async function handleTest() {
    if (!user) return
    setTesting(true)
    try {
      const idToken = await user.getIdToken()
      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      })
      if (response.ok) {
        toast.success("Test notification sent — check history below")
      } else {
        toast.error("Couldn't send test notification")
      }
    } finally {
      setTesting(false)
    }
  }

  if (loading || !user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose channels and quiet hours.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox
              checked={preferences.telegramEnabled}
              onCheckedChange={(checked) =>
                updateNotificationPreferences(user.uid, { telegramEnabled: checked })
              }
            />
            <FieldLabel>Telegram</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              checked={preferences.ntfyEnabled}
              onCheckedChange={(checked) =>
                updateNotificationPreferences(user.uid, { ntfyEnabled: checked })
              }
            />
            <FieldLabel>ntfy</FieldLabel>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="quietStart">Quiet hours start</FieldLabel>
              <Input
                id="quietStart"
                type="time"
                value={preferences.quietHoursStart ?? ""}
                onChange={(event) =>
                  updateNotificationPreferences(user.uid, {
                    quietHoursStart: event.target.value || null,
                  })
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="quietEnd">Quiet hours end</FieldLabel>
              <Input
                id="quietEnd"
                type="time"
                value={preferences.quietHoursEnd ?? ""}
                onChange={(event) =>
                  updateNotificationPreferences(user.uid, {
                    quietHoursEnd: event.target.value || null,
                  })
                }
              />
            </Field>
          </div>
        </FieldGroup>

        <Button variant="outline" onClick={handleTest} disabled={testing} className="w-fit">
          Send test notification
        </Button>
      </CardContent>
    </Card>
  )
}
