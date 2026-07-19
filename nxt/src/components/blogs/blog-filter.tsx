"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@/lib/types";

export function BlogFilter({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    blogs.forEach((b) => b.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [blogs]);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchesQuery =
        !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase());
      const matchesTag = tag === "all" || b.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [blogs, query, tag]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={tag === "all" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setTag("all")}
          >
            All
          </Badge>
          {tags.map(([name, count]) => (
            <Badge
              key={name}
              variant={tag === name ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setTag(name)}
            >
              {name} <span className="ml-1 opacity-60">{count}</span>
            </Badge>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border">
        {filtered.map((blog, i) => (
          <motion.div key={blog.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
            <Link href={`/blogs/${blog.slug}`} className="group flex items-baseline gap-6 py-6">
              <span className="hidden shrink-0 font-mono text-sm text-muted-foreground sm:block">
                {new Date(blog.date).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
                  {blog.title}
                </h2>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{blog.description}</p>
              </div>
              <div className="hidden shrink-0 gap-2 md:flex">
                {blog.tags.slice(0, 2).map((t) => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No posts found.</p>
        )}
      </div>
    </div>
  );
}
