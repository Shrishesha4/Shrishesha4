import { Skeleton } from "@/components/ui/skeleton"

export function Pattern() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[140px]" />
      </div>
    </div>
  )
}