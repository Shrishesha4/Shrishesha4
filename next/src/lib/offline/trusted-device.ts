const KEY = "pcc:trusted-device"

export type TrustedDeviceChoice = "trusted" | "declined" | null

export function getTrustedDeviceChoice(): TrustedDeviceChoice {
  if (typeof window === "undefined") return null
  const value = window.localStorage.getItem(KEY)
  return value === "trusted" || value === "declined" ? value : null
}

export function setTrustedDeviceChoice(choice: "trusted" | "declined"): void {
  window.localStorage.setItem(KEY, choice)
}

export function clearTrustedDeviceChoice(): void {
  window.localStorage.removeItem(KEY)
}
