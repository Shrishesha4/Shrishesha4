const CACHE_NAME = "pcc-shell-v2"
const OFFLINE_URL = "/offline"
const PRECACHE_URLS = ["/offline"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  const url = new URL(request.url)

  // Immutable Next.js build assets: cache-first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request)
        if (cached) return cached
        try {
          const response = await fetch(request)
          if (response.ok) cache.put(request, response.clone())
          return response
        } catch {
          // Network hiccup or a dev-server chunk hash that no longer exists
          // after a restart — fail this one request normally instead of
          // rejecting respondWith and breaking the whole page load.
          return new Response(null, { status: 504, statusText: "Gateway Timeout" })
        }
      })
    )
    return
  }

  // Navigations (HTML documents): network-first, cache fallback, offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return response
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME)
          const cached = await cache.match(request)
          return cached ?? (await cache.match(OFFLINE_URL))
        })
    )
  }
})
