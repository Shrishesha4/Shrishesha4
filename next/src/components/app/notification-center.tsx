"use client"

import { BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Empty-state shell — real notifications land in Phase 4 (Telegram/ntfy).
export function NotificationCenter() {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="ghost" size="icon-sm" />}
      >
        <BellIcon />
        <span className="sr-only">Notifications</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <p className="text-muted-foreground text-xs">No notifications yet.</p>
      </PopoverContent>
    </Popover>
  )
}
