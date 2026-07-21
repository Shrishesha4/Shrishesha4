"use client"

import * as React from "react"
import Link from "next/link"
import { PlusIcon, FolderKanbanIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/reui/badge"
import { PagePlaceholder } from "@/components/app/page-placeholder"
import { PageLoadingSkeleton } from "@/components/app/page-loading-skeleton"
import { useProjects } from "@/hooks/use-projects"
import { ProjectFormDialog } from "./project-form-dialog"
import type { ProjectStatus } from "@/lib/types/project"

const statusVariant: Record<ProjectStatus, React.ComponentProps<typeof Badge>["variant"]> = {
  idea: "outline",
  active: "success-light",
  paused: "warning-light",
  completed: "secondary",
  archived: "outline",
}

export default function ProjectsPage() {
  const { projects, loading } = useProjects()
  const [createOpen, setCreateOpen] = React.useState(false)

  if (loading) return <PageLoadingSkeleton />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Projects</h1>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          New project
        </Button>
      </div>

      {projects.length === 0 ? (
        <PagePlaceholder
          icon={FolderKanbanIcon}
          title="No projects yet"
          description="Group related tasks under an outcome to track progress."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{project.name}</CardTitle>
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </div>
                  <CardDescription>{project.outcome || project.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <ProjectFormDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
