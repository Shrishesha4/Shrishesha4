import "server-only";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Blog } from "@/lib/types";

export async function getBlogs(): Promise<Blog[]> {
  try {
    const blogsSnapshot = await getDocs(collection(db, "blogs"));
    if (blogsSnapshot.empty) return [];

    const firstDoc = blogsSnapshot.docs[0];
    const docSnapshot = await getDoc(doc(db, "blogs", firstDoc.id));
    if (!docSnapshot.exists()) return [];

    return (docSnapshot.data().blogs as Blog[]) ?? [];
  } catch (error) {
    console.error("Error loading blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.slug === slug) ?? null;
}
