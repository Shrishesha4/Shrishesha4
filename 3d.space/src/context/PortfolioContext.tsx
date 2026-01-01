"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, ADMIN_UID } from "@/lib/firebase";
import { Profile, Project, Blog } from "@/lib/types";

interface PortfolioContextType {
  profile: Profile | null;
  projects: Project[];
  blogs: Blog[];
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType>({
  profile: null,
  projects: [],
  blogs: [],
  loading: true,
});

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    async function fetchData() {
      if (!ADMIN_UID) {
          if (isMounted) setLoading(false);
          return;
      }

      try {
        // Fetch Profile
        const profileRef = doc(db, "profiles", ADMIN_UID);
        const profileSnap = await getDoc(profileRef);
        
        if (!isMounted || abortController.signal.aborted) return;
        if (profileSnap.exists()) {
          setProfile(profileSnap.data() as Profile);
        }

        // Fetch Projects
        const projectsRef = doc(db, "projects", ADMIN_UID);
        const projectsSnap = await getDoc(projectsRef);
        
        if (!isMounted || abortController.signal.aborted) return;
        if (projectsSnap.exists()) {
            const data = projectsSnap.data();
            if (data.projects && Array.isArray(data.projects)) {
                setProjects(data.projects);
            }
        }

        // Fetch Blogs
        const blogsRef = doc(db, "blogs", ADMIN_UID);
        const blogsSnap = await getDoc(blogsRef);
        
        if (!isMounted || abortController.signal.aborted) return;
        
        let blogsData: Blog[] = [];
        if (blogsSnap.exists()) {
             const data = blogsSnap.data();
             if (data.blogs && Array.isArray(data.blogs)) {
                 blogsData = data.blogs.map((b: any) => ({
                    id: b.id || Math.random().toString(36).substr(2, 9),
                    title: b.title || "Untitled Transmission",
                    description: b.description || "",
                    date: b.date || new Date().toISOString(),
                    tags: b.tags || [],
                    image: b.image || "",
                    slug: b.slug || b.id || "no-slug",
                    content: b.content || ""
                 }));
             }
        }
        
        blogsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        if (!isMounted || abortController.signal.aborted) return;
        setBlogs(blogsData);

      } catch (error: any) {
        // Silently ignore AbortError - this is normal during hot reloads
        if (error?.name === 'AbortError' || error?.message?.includes('aborted') || abortController.signal.aborted) {
             return;
        }
        // Only log non-abort errors
        if (isMounted) {
          console.error("Error fetching portfolio data:", error);
        }
      } finally {
        if (isMounted && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
        isMounted = false;
        abortController.abort();
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ profile, projects, blogs, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
