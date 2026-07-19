import "server-only";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ContactConfig, SocialLink, SocialLinksConfig } from "@/lib/types";

const defaultContactConfig: ContactConfig = {
  spreadsheetUrl: "",
  email: "",
  phone: "",
  location: "",
};

export async function getContactConfig(): Promise<ContactConfig> {
  try {
    const docSnapshot = await getDoc(doc(db, "config", "contact"));
    if (!docSnapshot.exists()) return defaultContactConfig;
    return docSnapshot.data() as ContactConfig;
  } catch (error) {
    console.error("Error loading contact config:", error);
    return defaultContactConfig;
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const docSnapshot = await getDoc(doc(db, "config", "socialLinks"));
    if (!docSnapshot.exists()) return [];
    const data = docSnapshot.data() as SocialLinksConfig;
    return [...(data.links ?? [])].filter((link) => link.enabled).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error loading social links:", error);
    return [];
  }
}
