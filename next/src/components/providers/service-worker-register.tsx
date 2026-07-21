"use client"

import * as React from "react"

export function ServiceWorkerRegister() {
  React.useEffect(() => {
    if (!("serviceWorker" in navigator)) return

    if (process.env.NODE_ENV !== "production") {
      // Dev-server chunk hashes change on every restart, which a previously
      // installed service worker (e.g. from an earlier `next build` test)
      // can't know about — actively clean up any stale registration instead
      // of registering a new one.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) registration.unregister()
      })
      return
    }

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((error) => console.error("Service worker registration failed", error))
  }, [])

  return null
}
