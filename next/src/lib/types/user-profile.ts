import type { Timestamp } from "firebase/firestore"

export type UserProfile = {
  id: string // uid, same as the document id
  email: string | null
  displayName: string | null
  photoURL: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type UserProfileSettings = {
  theme: "light" | "dark" | "system"
  trustedDevice: boolean | null
  createdAt: Timestamp
  updatedAt: Timestamp
}
