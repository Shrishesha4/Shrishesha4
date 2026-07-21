import { Spinner } from "@/components/ui/spinner"

export default function RootLoading() {
  return (
    <div className="flex min-h-svh flex-1 items-center justify-center">
      <Spinner className="size-6" />
    </div>
  )
}
