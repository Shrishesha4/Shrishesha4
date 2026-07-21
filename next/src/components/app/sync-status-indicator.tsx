"use client"

import { CloudIcon, CloudOffIcon, RefreshCwIcon, AlertCircleIcon, LoaderIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSyncStatus } from "@/hooks/use-sync-status"
import type { SyncStatus } from "@/lib/offline/sync-status"

const statusConfig: Record<
  SyncStatus,
  { label: string; icon: typeof CloudIcon; className: string }
> = {
  all_saved: { label: "All changes saved", icon: CloudIcon, className: "text-muted-foreground" },
  saving: { label: "Saving changes…", icon: LoaderIcon, className: "text-muted-foreground animate-pulse" },
  offline: { label: "Offline — changes will sync automatically", icon: CloudOffIcon, className: "text-warning" },
  cached: { label: "Using cached data", icon: RefreshCwIcon, className: "text-muted-foreground" },
  error: { label: "Sync error — retry needed", icon: AlertCircleIcon, className: "text-destructive" },
}

export function SyncStatusIndicator() {
  const status = useSyncStatus()
  const { label, icon: Icon, className } = statusConfig[status]

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className={cn("inline-flex size-7 items-center justify-center", className)} />
        }
      >
        <Icon className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
