"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { toast } from "sonner"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/reui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/lib/auth/auth-context"
import { useTasks } from "@/hooks/use-tasks"
import {
  archiveTask,
  completeTask,
  reopenTask,
  snoozeTask,
} from "@/lib/firebase/task-mutations"
import { TaskFormDialog } from "./task-form-dialog"

const priorityVariant = {
  low: "outline",
  medium: "secondary",
  high: "warning-light",
  urgent: "destructive-light",
} as const

export function TaskDetailSheet({
  taskId,
  onOpenChange,
}: {
  taskId: string | null
  onOpenChange: (open: boolean) => void
}) {
  const { user } = useAuth()
  const { tasks } = useTasks()
  const [editOpen, setEditOpen] = React.useState(false)
  const task = tasks.find((t) => t.id === taskId) ?? null

  async function handleComplete() {
    if (!user || !task) return
    await completeTask(user.uid, task.id, task.title)
    toast.success("Task completed")
  }

  async function handleReopen() {
    if (!user || !task) return
    await reopenTask(user.uid, task.id)
  }

  async function handleSnooze() {
    if (!user || !task) return
    const tomorrow = addDays(new Date(), 1).toISOString().slice(0, 10)
    await snoozeTask(user.uid, task.id, tomorrow)
    toast.success("Snoozed until tomorrow")
  }

  async function handleArchive() {
    if (!user || !task) return
    await archiveTask(user.uid, task.id, task.title)
    onOpenChange(false)
  }

  return (
    <>
      <Sheet open={!!task} onOpenChange={onOpenChange}>
        <SheetContent>
          {task && (
            <>
              <SheetHeader>
                <SheetTitle>{task.title}</SheetTitle>
                <SheetDescription>
                  {task.description || "No description"}
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-wrap gap-2 px-4">
                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                <Badge variant="outline">{task.status.replace("_", " ")}</Badge>
                {task.scheduledFor && (
                  <Badge variant="outline">Scheduled {task.scheduledFor}</Badge>
                )}
              </div>

              <SheetFooter className="flex-row flex-wrap gap-2">
                {task.status === "done" ? (
                  <Button variant="outline" onClick={handleReopen}>
                    Reopen
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>Complete</Button>
                )}
                <Button variant="outline" onClick={handleSnooze}>
                  Snooze
                </Button>
                <Button variant="outline" onClick={() => setEditOpen(true)}>
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="destructive" />}>
                    Archive
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Archive this task?</AlertDialogTitle>
                      <AlertDialogDescription>
                        It will be hidden from your task views. This can be undone
                        later from Firestore, but not from the UI yet.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel render={<Button variant="outline" />}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        render={<Button variant="destructive" onClick={handleArchive} />}
                      >
                        Archive
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
      <TaskFormDialog open={editOpen} onOpenChange={setEditOpen} task={task} />
    </>
  )
}
