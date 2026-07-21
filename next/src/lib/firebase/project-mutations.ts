import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { projectConverter } from "@/lib/firebase/converters"
import { writeActivityEntry } from "@/lib/activity/log"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { ProjectFormInput } from "@/lib/schemas/project.schema"

export async function createProject(uid: string, input: ProjectFormInput) {
  const ref = doc(
    collection(db, "users", uid, "projects").withConverter(projectConverter)
  )
  await setDoc(ref, {
    ...omitUndefined(input),
    description: input.description ?? "",
    outcome: input.outcome ?? "",
    color: input.color ?? "",
    icon: input.icon ?? "",
    tagIds: input.tagIds,
    targetDate: null,
    lastActivityAt: serverTimestamp(),
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  await writeActivityEntry(uid, {
    entityType: "project",
    entityId: ref.id,
    action: "created",
    summary: `Created project "${input.name}"`,
  })
  return ref.id
}

export async function updateProject(
  uid: string,
  projectId: string,
  patch: Partial<ProjectFormInput>
) {
  const ref = doc(db, "users", uid, "projects", projectId)
  await updateDoc(ref, {
    ...omitUndefined(patch),
    updatedAt: serverTimestamp(),
    lastActivityAt: serverTimestamp(),
  })
}

export async function archiveProject(uid: string, projectId: string, name?: string) {
  const ref = doc(db, "users", uid, "projects", projectId)
  await updateDoc(ref, {
    status: "archived",
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  await writeActivityEntry(uid, {
    entityType: "project",
    entityId: projectId,
    action: "archived",
    summary: name ? `Archived project "${name}"` : "Archived a project",
  })
}
