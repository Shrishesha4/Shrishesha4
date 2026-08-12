"use client"

import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { InboxExtractionPanel } from "@/components/app/inbox-extraction-panel"

export function AssistantSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Assistant</SheetTitle>
          <SheetDescription>
            Turn a quick note into reviewable tasks. AI-generated content is always reviewed
            before anything is created.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <InboxExtractionPanel />
        </div>
        <SheetFooter>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/assistant" />}
            onClick={() => onOpenChange(false)}
          >
            Open full Assistant
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
