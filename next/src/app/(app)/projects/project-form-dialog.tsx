"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { TagPicker } from "@/components/app/tag-picker"
import { useAuth } from "@/lib/auth/auth-context"
import { createProject, updateProject } from "@/lib/firebase/project-mutations"
import { projectFormSchema, type ProjectFormInput } from "@/lib/schemas/project.schema"
import { projectStatusLabel } from "@/lib/labels"
import type { Project } from "@/lib/types/project"

export function ProjectFormDialog({
  open,
  onOpenChange,
  project,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project | null
}) {
  const { user } = useAuth()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { name: "", description: "", status: "active", outcome: "", tagIds: [] },
  })

  React.useEffect(() => {
    if (open) {
      reset({
        name: project?.name ?? "",
        description: project?.description ?? "",
        status: project?.status ?? "active",
        outcome: project?.outcome ?? "",
        tagIds: project?.tagIds ?? [],
      })
    }
  }, [open, project, reset])

  async function onSubmit(values: ProjectFormInput) {
    if (!user) return
    try {
      if (project) {
        await updateProject(user.uid, project.id, values)
        toast.success("Project updated")
      } else {
        await createProject(user.uid, values)
        toast.success("Project created")
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save project", error)
      const message = error instanceof Error ? error.message : "Couldn't save the project"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Edit project" : "New project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update this project's details." : "Group related tasks under an outcome."}
          </DialogDescription>
        </DialogHeader>

        <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" autoFocus {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="outcome">Outcome</FieldLabel>
              <Input id="outcome" placeholder="What does done look like?" {...register("outcome")} />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea id="description" {...register("description")} />
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {(value: ProjectFormInput["status"]) => projectStatusLabel[value]}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel>Tags</FieldLabel>
              <Controller
                control={control}
                name="tagIds"
                render={({ field }) => (
                  <TagPicker value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="submit" form="project-form" disabled={isSubmitting}>
            {project ? "Save changes" : "Create project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
