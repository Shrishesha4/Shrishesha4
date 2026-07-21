"use client"

import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth/auth-context"

export function UserMenu() {
  const router = useRouter()
  const { user, signOutUser } = useAuth()

  if (!user) return null

  const initials =
    user.displayName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "?"

  async function handleSignOut() {
    await signOutUser()
    router.replace("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<button className="rounded-full outline-none" />}
      >
        <Avatar size="sm">
          <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user.displayName ?? user.email}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
