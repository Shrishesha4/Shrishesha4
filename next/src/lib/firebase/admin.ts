import "server-only"
import { initializeApp, getApps, cert, type App } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { serverEnv } from "@/lib/env/server"

function getAdminApp(): App {
  const existing = getApps()
  if (existing.length) return existing[0]
  return initializeApp({
    credential: cert({
      projectId: serverEnv.FIREBASE_PROJECT_ID,
      clientEmail: serverEnv.FIREBASE_CLIENT_EMAIL,
      // .env files store the PEM key with literal \n sequences — un-escape before use.
      privateKey: serverEnv.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  })
}

const adminApp = getAdminApp()
export const adminAuth = getAuth(adminApp)
export const adminDb = getFirestore(adminApp)
