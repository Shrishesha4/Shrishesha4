import "server-only"
import { serverEnv } from "@/lib/env/server"

export function isNtfyConfigured(): boolean {
  return !!serverEnv.NTFY_BASE_URL && !!serverEnv.NTFY_TOPIC
}

export async function publishNtfy(input: {
  title: string
  message: string
  priority?: 1 | 2 | 3 | 4 | 5 // 1 min, 3 default, 5 max
  tags?: string[]
}): Promise<boolean> {
  if (!serverEnv.NTFY_BASE_URL || !serverEnv.NTFY_TOPIC) return false

  const url = `${serverEnv.NTFY_BASE_URL.replace(/\/$/, "")}/${serverEnv.NTFY_TOPIC}`
  const headers: Record<string, string> = {
    Title: input.title,
    Priority: String(input.priority ?? 3),
  }
  if (input.tags?.length) headers.Tags = input.tags.join(",")
  if (serverEnv.NTFY_ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${serverEnv.NTFY_ACCESS_TOKEN}`
  }

  const response = await fetch(url, { method: "POST", headers, body: input.message })
  return response.ok
}
