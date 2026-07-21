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
import { useProjects } from "@/hooks/use-projects"
import { createTask, updateTask } from "@/lib/firebase/task-mutations"
import { taskFormSchema, type TaskFormInput } from "@/lib/schemas/task.schema"
import { taskStatusLabel, taskPriorityLabel } from "@/lib/labels"
import type { Task } from "@/lib/types/task"

export function TaskFormDialog({
  open,
  onOpenChange,
  task,
  defaultProjectId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task | null
  defaultProjectId?: string | null
}) {
  const { user } = useAuth()
  const { projects } = useProjects()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormInput>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "planned",
      priority: "medium",
      tagIds: [],
      projectId: null,
      scheduledFor: null,
    },
  })

  React.useEffect(() => {
    if (open) {
      reset({
        title: task?.title ?? "",
        description: task?.description ?? "",
        status: task?.status ?? "planned",
        priority: task?.priority ?? "medium",
        energyLevel: task?.energyLevel,
        tagIds: task?.tagIds ?? [],
        projectId: task?.projectId ?? defaultProjectId ?? null,
        scheduledFor: task?.scheduledFor ?? null,
      })
    }
  }, [open, task, defaultProjectId, reset])

  async function onSubmit(values: TaskFormInput) {
    if (!user) return
    try {
      if (task) {
        await updateTask(user.uid, task.id, values)
        toast.success("Task updated")
      } else {
        await createTask(user.uid, values)
        toast.success("Task created")
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save task", error)
      const message = error instanceof Error ? error.message : "Couldn't save the task"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "New task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update the details for this task." : "Add a task to your list."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="task-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <Field data-invalid={!!errors.title}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" autoFocus {...register("title")} />
              <FieldError errors={[errors.title]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea id="description" {...register("description")} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Status</FieldLabel>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {(value: TaskFormInput["status"]) => taskStatusLabel[value]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inbox">Inbox</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in_progress">In progress</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel>Priority</FieldLabel>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {(value: TaskFormInput["priority"]) => taskPriorityLabel[value]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Project</FieldLabel>
                <Controller
                  control={control}
                  name="projectId"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "none"}
                      onValueChange={(value) =>
                        field.onChange(value === "none" ? null : value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {(value: string) =>
                            projects.find((project) => project.id === value)?.name ??
                            "No project"
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No project</SelectItem>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="scheduledFor">Scheduled for</FieldLabel>
                <Controller
                  control={control}
                  name="scheduledFor"
                  render={({ field }) => (
                    <Input
                      id="scheduledFor"
                      type="date"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(event.target.value || null)
                      }
                    />
                  )}
                />
              </Field>
            </div>

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
          <Button type="submit" form="task-form" disabled={isSubmitting}>
            {task ? "Save changes" : "Create task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
