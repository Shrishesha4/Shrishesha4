import "server-only";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultProfile, type Profile } from "@/lib/types";

export async function getProfile(): Promise<Profile> {
  try {
    const profilesSnapshot = await getDocs(collection(db, "profiles"));
    if (profilesSnapshot.empty) return defaultProfile;

    const firstDoc = profilesSnapshot.docs[0];
    const docSnapshot = await getDoc(doc(db, "profiles", firstDoc.id));
    if (!docSnapshot.exists()) return defaultProfile;

    return docSnapshot.data() as Profile;
  } catch (error) {
    console.error("Error loading profile:", error);
    return defaultProfile;
  }
}
