"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app/app-sidebar"
import { AppTopbar } from "@/components/app/app-topbar"
import { TrustedDeviceDialog } from "@/components/app/trusted-device-dialog"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth/auth-context"

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-svh flex-1 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppTopbar />
        <div className="flex flex-1 flex-col overflow-auto p-4">{children}</div>
      </SidebarInset>
      <TrustedDeviceDialog />
    </SidebarProvider>
  )
}
