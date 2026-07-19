"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/types";
import { categorizeProject } from "@/lib/categorize";
import { slugify } from "@/lib/slugify";
import { optimizeImage } from "@/lib/image-optimizer";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categorized = useMemo(
    () => projects.map((p) => ({ project: p, categories: categorizeProject(p.title, p.description, p.technologies) })),
    [projects]
  );

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    categorized.forEach(({ categories }) => categories.forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [categorized]);

  const filtered = useMemo(() => {
    return categorized.filter(({ project, categories }) => {
      const matchesQuery = !query || project.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || categories.includes(category);
      return matchesQuery && matchesCategory;
    });
  }, [categorized, query, category]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={category === "all" ? "default" : "secondary"} className="cursor-pointer" onClick={() => setCategory("all")}>
            All
          </Badge>
          {categories.map(([name, count]) => (
            <Badge key={name} variant={category === name ? "default" : "secondary"} className="cursor-pointer" onClick={() => setCategory(name)}>
              {name} <span className="ml-1 opacity-60">{count}</span>
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ project }, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            whileHover={{ y: -6 }}
          >
            <Link href={`/projects/${slugify(project.title)}`}>
              <Card className="overflow-hidden p-0">
                {project.image && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image src={optimizeImage(project.image, { width: 600 })} alt={project.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="400px" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="mb-2 font-semibold">{project.title}</h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-muted-foreground">No projects found.</p>
        )}
      </div>
    </div>
  );
}
