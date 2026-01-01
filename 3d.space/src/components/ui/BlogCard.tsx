"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Blog } from "@/hooks/usePortfolioData";
import NeonButton from "./NeonButton";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-panel-bg border border-white/10 rounded-lg overflow-hidden hover:border-neon-pink/50 transition-colors duration-300 flex flex-col h-full"
    >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-black/50">
            {blog.image ? (
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neon-blue/10 to-transparent">
                    <span className="font-mono text-white/20 text-xl">NO_IMG_DATA</span>
                </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60" />
            
            {/* Date Badge */}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-neon-cyan border border-neon-cyan/30">
                {new Date(blog.date).toLocaleDateString()}
            </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-orbitron font-bold mb-3 text-white group-hover:text-neon-pink transition-colors line-clamp-2">
                {blog.title}
            </h3>
            
            <p className="text-gray-400 font-rajdhani text-sm mb-4 line-clamp-3 flex-1">
                {blog.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                        {tag}
                    </span>
                ))}
            </div>
            
            <a href={`/blogs/${blog.slug}`} className="mt-auto block">
                <NeonButton variant="secondary" className="w-full text-xs py-2">
                    Read Transmission
                </NeonButton>
            </a>
        </div>
    </motion.div>
  );
}
