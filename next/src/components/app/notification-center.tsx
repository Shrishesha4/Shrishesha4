"use client"

import { BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/reui/badge"
import { useNotifications } from "@/hooks/use-notifications"
import type { NotificationDeliveryStatus } from "@/lib/types/notification"

const statusVariant: Record<NotificationDeliveryStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  sent: "success-light",
  failed: "destructive-light",
  skipped: "outline",
}

export function NotificationCenter() {
  const { notifications } = useNotifications(10)

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="ghost" size="icon-sm" />}
      >
        <BellIcon />
        <span className="sr-only">Notifications</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-xs">No notifications yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((n) => (
              <div key={n.id} className="flex flex-col gap-0.5 border-b border-border pb-2 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium">{n.title}</span>
                  <Badge variant={statusVariant[n.status]}>{n.status}</Badge>
                </div>
                <p className="text-muted-foreground text-xs">{n.body}</p>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
