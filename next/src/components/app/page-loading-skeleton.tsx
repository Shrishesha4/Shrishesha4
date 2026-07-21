import { Skeleton } from "@/components/ui/skeleton"

export function PageLoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}
