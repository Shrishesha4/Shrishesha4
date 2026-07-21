import type { TaskStatus, TaskPriority } from "@/lib/types/task"
import type { ProjectStatus } from "@/lib/types/project"

export const taskStatusLabel: Record<TaskStatus, string> = {
  inbox: "Inbox",
  planned: "Planned",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
  archived: "Archived",
}

export const taskPriorityLabel: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  idea: "Idea",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  archived: "Archived",
}
