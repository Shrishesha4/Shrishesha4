import "server-only";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/lib/types";
import { slugify } from "@/lib/slugify";

export async function getProjects(): Promise<Project[]> {
  try {
    const projectsSnapshot = await getDocs(collection(db, "projects"));
    if (projectsSnapshot.empty) return [];

    const firstDoc = projectsSnapshot.docs[0];
    const docSnapshot = await getDoc(doc(db, "projects", firstDoc.id));
    if (!docSnapshot.exists()) return [];

    return (docSnapshot.data().projects as Project[]) ?? [];
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => slugify(p.title) === slug) ?? null;
}
