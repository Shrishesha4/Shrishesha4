"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeftIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/reui/badge"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { FolderKanbanIcon } from "lucide-react"
import { useProjects } from "@/hooks/use-projects"
import { useTasks } from "@/hooks/use-tasks"
import { ProjectFormDialog } from "../project-form-dialog"
import { TaskFormDialog } from "../../tasks/task-form-dialog"
import type { ProjectStatus } from "@/lib/types/project"
import type { TaskPriority } from "@/lib/types/task"

const statusVariant: Record<ProjectStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  idea: "outline",
  active: "success-light",
  paused: "warning-light",
  completed: "secondary",
  archived: "outline",
}

const priorityVariant: Record<TaskPriority, React.ComponentProps<typeof Badge>["variant"]> = {
  low: "outline",
  medium: "secondary",
  high: "warning-light",
  urgent: "destructive-light",
}

export default function ProjectDetailPage() {
  const params = useParams<{ projectId: string }>()
  const router = useRouter()
  const { projects, loading: projectsLoading } = useProjects()
  const { tasks, loading: tasksLoading } = useTasks()
  const [editOpen, setEditOpen] = React.useState(false)
  const [taskOpen, setTaskOpen] = React.useState(false)

  const project = projects.find((p) => p.id === params.projectId)
  const projectTasks = tasks.filter((task) => task.projectId === params.projectId)
  const doneCount = projectTasks.filter((task) => task.status === "done").length

  if (projectsLoading || tasksLoading) return <PageLoadingSkeleton />

  if (!project) {
    return (
      <PagePlaceholder
        icon={FolderKanbanIcon}
        title="Project not found"
        description="It may have been archived or removed."
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="w-fit" onClick={() => router.push("/projects")}>
        <ArrowLeftIcon />
        Projects
      </Button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">{project.name}</h1>
            <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
          </div>
          {project.outcome && <p className="text-muted-foreground text-sm">{project.outcome}</p>}
        </div>
        <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
          Edit
        </Button>
      </div>

      {project.description && <p className="text-sm">{project.description}</p>}

      <p className="text-muted-foreground text-sm">
        {doneCount} of {projectTasks.length} tasks done
      </p>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Tasks</h2>
        <Button size="sm" variant="outline" onClick={() => setTaskOpen(true)}>
          <PlusIcon />
          Add task
        </Button>
      </div>

      {projectTasks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No tasks linked to this project yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {projectTasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="flex items-center justify-between gap-2">
                <span className="text-sm">{task.title}</span>
                <div className="flex gap-2">
                  <Badge variant="outline">{task.status.replace("_", " ")}</Badge>
                  <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ProjectFormDialog open={editOpen} onOpenChange={setEditOpen} project={project} />
      <TaskFormDialog
        open={taskOpen}
        onOpenChange={setTaskOpen}
        task={null}
        defaultProjectId={project.id}
      />
    </div>
  )
}
