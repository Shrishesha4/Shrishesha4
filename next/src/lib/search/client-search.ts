import type { Task } from "@/lib/types/task"
import type { Project } from "@/lib/types/project"
import type { InboxItem } from "@/lib/types/inbox-item"

export type SearchResult =
  | { type: "task"; id: string; title: string }
  | { type: "project"; id: string; title: string }
  | { type: "inboxItem"; id: string; title: string }

function matches(haystack: string, query: string): boolean {
  return haystack.toLowerCase().includes(query.toLowerCase())
}

export function searchWorkspace(
  query: string,
  data: { tasks: Task[]; projects: Project[]; inboxItems: InboxItem[] },
  limit = 8
): SearchResult[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  const results: SearchResult[] = []

  for (const task of data.tasks) {
    if (matches(task.title, trimmed) || (task.description && matches(task.description, trimmed))) {
      results.push({ type: "task", id: task.id, title: task.title })
    }
  }
  for (const project of data.projects) {
    if (matches(project.name, trimmed)) {
      results.push({ type: "project", id: project.id, title: project.name })
    }
  }
  for (const item of data.inboxItems) {
    if (matches(item.title, trimmed) || (item.content && matches(item.content, trimmed))) {
      results.push({ type: "inboxItem", id: item.id, title: item.title })
    }
  }

  return results.slice(0, limit)
}
