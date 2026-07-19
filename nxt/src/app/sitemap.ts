import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/data/blogs";
import { getProjects } from "@/lib/data/projects";
import { slugify } from "@/lib/slugify";

const SITE_URL = "https://shrishesha.space";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/aboutme`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/stargaze`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${slugify(project.title)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
