"use client"

import { useRouter } from "next/navigation"
import { terminate, clearIndexedDbPersistence } from "firebase/firestore"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ThemeToggle } from "@/components/app/theme-toggle"
import { useAuth } from "@/lib/auth/auth-context"
import { db } from "@/lib/firebase/client"
import {
  getTrustedDeviceChoice,
  setTrustedDeviceChoice,
  clearTrustedDeviceChoice,
} from "@/lib/offline/trusted-device"

export default function SettingsPage() {
  const router = useRouter()
  const { user, signOutUser } = useAuth()
  const trusted = getTrustedDeviceChoice() === "trusted"

  async function handleSignOut() {
    await signOutUser()
    router.replace("/login")
  }

  async function handleClearOfflineData() {
    await terminate(db)
    await clearIndexedDbPersistence(db)
    clearTrustedDeviceChoice()
    window.location.reload()
  }

  function handleReenableOfflineAccess() {
    setTrustedDeviceChoice("trusted")
    window.location.reload()
  }

  async function handleSignOutAndClear() {
    await terminate(db)
    await clearIndexedDbPersistence(db)
    clearTrustedDeviceChoice()
    await signOutUser()
    router.replace("/login")
  }

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose light, dark, or match your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Offline data</CardTitle>
          <CardDescription>
            {trusted
              ? "This device is trusted and caches your workspace offline."
              : "Offline caching is off for this device."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {!trusted && (
            <Button variant="outline" onClick={handleReenableOfflineAccess}>
              Re-enable offline access
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              Clear offline data from this device
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear offline data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This removes the cached copy of your workspace and financial data
                  from this browser. Nothing in Firestore is deleted. The app will
                  reload.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel render={<Button variant="outline" />}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  render={<Button variant="destructive" onClick={handleClearOfflineData} />}
                >
                  Clear data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Sign out of this device.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
          <Button variant="destructive" onClick={handleSignOutAndClear}>
            Sign out and clear local data
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
