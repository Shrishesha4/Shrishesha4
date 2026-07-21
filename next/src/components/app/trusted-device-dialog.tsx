"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-context"
import { getTrustedDeviceChoice, setTrustedDeviceChoice } from "@/lib/offline/trusted-device"

export function TrustedDeviceDialog() {
  const { user } = useAuth()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (user && getTrustedDeviceChoice() === null) {
      // localStorage read must happen post-mount; open state can't be derived at render time.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true)
    }
  }, [user])

  function choose(choice: "trusted" | "declined") {
    setTrustedDeviceChoice(choice)
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Is this a trusted personal device?</DialogTitle>
          <DialogDescription>
            Offline mode stores a cached copy of your workspace and financial data
            in this browser, so the app keeps working without a connection. Only
            enable this on a device you trust — it stays on the device between
            sessions until you clear it from Settings.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => choose("declined")}>
            No, use temporary session
          </Button>
          <Button onClick={() => choose("trusted")}>Yes, trust this device</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
