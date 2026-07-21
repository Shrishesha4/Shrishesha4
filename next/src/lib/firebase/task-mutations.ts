import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { taskConverter } from "@/lib/firebase/converters"
import { writeActivityEntry } from "@/lib/activity/log"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { TaskFormInput } from "@/lib/schemas/task.schema"

export async function createTask(uid: string, input: TaskFormInput) {
  const ref = doc(collection(db, "users", uid, "tasks").withConverter(taskConverter))
  await setDoc(ref, {
    ...omitUndefined(input),
    description: input.description ?? "",
    projectId: input.projectId ?? null,
    parentTaskId: input.parentTaskId ?? null,
    tagIds: input.tagIds,
    energyLevel: input.energyLevel ?? null,
    dueAt: null,
    scheduledFor: input.scheduledFor ?? null,
    estimatedMinutes: input.estimatedMinutes ?? null,
    actualMinutes: null,
    completedAt: null,
    sortOrder: Date.now(),
    source: "manual",
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  await writeActivityEntry(uid, {
    entityType: "task",
    entityId: ref.id,
    action: "created",
    summary: `Created task "${input.title}"`,
  })
  return ref.id
}

export async function updateTask(
  uid: string,
  taskId: string,
  patch: Partial<TaskFormInput>
) {
  const ref = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(ref, { ...omitUndefined(patch), updatedAt: serverTimestamp() })
}

export async function completeTask(uid: string, taskId: string, title?: string) {
  const ref = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(ref, {
    status: "done",
    completedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  await writeActivityEntry(uid, {
    entityType: "task",
    entityId: taskId,
    action: "completed",
    summary: title ? `Completed task "${title}"` : "Completed a task",
  })
}

export async function reopenTask(uid: string, taskId: string) {
  const ref = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(ref, {
    status: "planned",
    completedAt: null,
    updatedAt: serverTimestamp(),
  })
}

export async function snoozeTask(uid: string, taskId: string, scheduledFor: string) {
  const ref = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(ref, { scheduledFor, updatedAt: serverTimestamp() })
}

export async function setTaskStatus(
  uid: string,
  taskId: string,
  status: TaskFormInput["status"]
) {
  const ref = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(ref, { status, updatedAt: serverTimestamp() })
}

export async function archiveTask(uid: string, taskId: string, title?: string) {
  const ref = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(ref, {
    status: "archived",
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  await writeActivityEntry(uid, {
    entityType: "task",
    entityId: taskId,
    action: "archived",
    summary: title ? `Archived task "${title}"` : "Archived a task",
  })
}
