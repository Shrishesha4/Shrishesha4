"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-context"
import { createInboxItem } from "@/lib/firebase/inbox-mutations"
import { quickCaptureSchema } from "@/lib/schemas/inbox-item.schema"

export function QuickCaptureDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user } = useAuth()
  const [value, setValue] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  async function handleCapture() {
    if (!user) return
    const parsed = quickCaptureSchema.safeParse({ content: value })
    if (!parsed.success) return

    setSubmitting(true)
    try {
      await createInboxItem(user.uid, parsed.data.content)
      setValue("")
      onOpenChange(false)
      toast.success("Captured to Inbox")
    } catch {
      toast.error("Couldn't save that. It'll retry automatically once online.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick capture</DialogTitle>
          <DialogDescription>
            Jot down a thought, task, or idea. Process it later from the Inbox.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          autoFocus
          placeholder="What's on your mind?"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              handleCapture()
            }
          }}
        />
        <DialogFooter>
          <Button disabled={!value.trim() || submitting} onClick={handleCapture}>
            Capture
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
