import type { Timestamp } from "firebase/firestore"

export type BaseDocument = {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
  deletedAt?: Timestamp | null
}
