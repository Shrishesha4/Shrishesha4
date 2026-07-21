import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function Pattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button>
        <Spinner data-icon="inline-start" /> Processing…
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" /> Loading…
      </Button>
      <Button variant="outline" size="icon" disabled aria-label="Loading">
        <Spinner />
      </Button>
    </div>
  )
}