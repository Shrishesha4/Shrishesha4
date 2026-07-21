import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import type { User } from "firebase/auth"
import { db } from "@/lib/firebase/client"

export async function ensureUserProfile(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  const settingsRef = doc(db, "users", user.uid, "profile", "settings")
  const settingsSnap = await getDoc(settingsRef)

  if (!settingsSnap.exists()) {
    await setDoc(settingsRef, {
      theme: "system",
      trustedDevice: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }
}
