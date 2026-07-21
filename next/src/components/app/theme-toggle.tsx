"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

const options = [
  { value: "light", icon: SunIcon, label: "Light" },
  { value: "dark", icon: MoonIcon, label: "Dark" },
  { value: "system", icon: MonitorIcon, label: "System" },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // SSR/client theme mismatch guard — no non-effect way to detect post-hydration client render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), [])

  return (
    <ButtonGroup>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={mounted && theme === option.value ? "secondary" : "outline"}
          size="sm"
          onClick={() => setTheme(option.value)}
        >
          <option.icon />
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  )
}
