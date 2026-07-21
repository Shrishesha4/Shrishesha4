import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { tagConverter } from "@/lib/firebase/converters"
import { omitUndefined } from "@/lib/firebase/omit-undefined"
import type { TagFormInput } from "@/lib/schemas/tag.schema"

export async function createTag(uid: string, input: TagFormInput) {
  const ref = doc(collection(db, "users", uid, "tags").withConverter(tagConverter))
  await setDoc(ref, {
    ...omitUndefined(input),
    color: input.color ?? "",
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    deletedAt: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
  return ref.id
}

export async function updateTag(uid: string, tagId: string, patch: Partial<TagFormInput>) {
  const ref = doc(db, "users", uid, "tags", tagId)
  await updateDoc(ref, { ...omitUndefined(patch), updatedAt: serverTimestamp() })
}

export async function deleteTag(uid: string, tagId: string) {
  const ref = doc(db, "users", uid, "tags", tagId)
  await updateDoc(ref, { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() })
}
