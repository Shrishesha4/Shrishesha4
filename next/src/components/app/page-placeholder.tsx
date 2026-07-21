import type { LucideIcon } from "lucide-react"

export function PagePlaceholder({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-24 text-center">
      <Icon className="text-muted-foreground size-8" />
      <p className="font-medium">{title}</p>
      <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
    </div>
  )
}
