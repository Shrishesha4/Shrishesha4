"use client"

import * as React from "react"
import { SearchIcon, PlusIcon } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { CommandPalette } from "@/components/app/command-palette"
import { QuickCaptureDialog } from "@/components/app/quick-capture-dialog"
import { SyncStatusIndicator } from "@/components/app/sync-status-indicator"
import { NotificationCenter } from "@/components/app/notification-center"
import { UserMenu } from "@/components/app/user-menu"
import { useCommandPalette } from "@/hooks/use-command-palette"

export function AppTopbar() {
  const { open, setOpen } = useCommandPalette()
  const [quickCaptureOpen, setQuickCaptureOpen] = React.useState(false)

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />

      <Button
        variant="outline"
        size="sm"
        className="text-muted-foreground w-full max-w-64 justify-start gap-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-3.5" />
        <span className="flex-1 text-left">Search...</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" onClick={() => setQuickCaptureOpen(true)}>
          <PlusIcon />
          <span className="sr-only">Quick capture</span>
        </Button>
        <SyncStatusIndicator />
        <NotificationCenter />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <UserMenu />
      </div>

      <CommandPalette open={open} onOpenChange={setOpen} />
      <QuickCaptureDialog open={quickCaptureOpen} onOpenChange={setQuickCaptureOpen} />
    </header>
  )
}
