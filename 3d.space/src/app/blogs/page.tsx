"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import BlogCard from "@/components/ui/BlogCard";
import GlitchText from "@/components/ui/GlitchText";
import { Search } from "lucide-react";

export default function BlogsPage() {
  const { blogs, loading } = usePortfolioData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(blog => blog.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
        const title = blog.title || "";
        const description = blog.description || "";
        
        const matchesSearch = 
            title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag ? blog.tags?.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
            <GlitchText text="NEURAL_ARCHIVES" size="lg" className="font-bold mb-2" />
            <p className="text-neon-blue font-mono text-sm">// KNOWLEDGE_BASE_ACCESS</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between bg-panel-bg border border-white/10 p-6 rounded-lg backdrop-blur-md">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search logs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-darker-bg border border-white/10 rounded px-10 py-2 text-white focus:border-neon-pink focus:outline-none focus:box-glow transition-all font-mono"
                />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
                <button 
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded text-xs font-mono border transition-all ${!selectedTag ? 'bg-neon-blue/20 border-neon-blue text-white box-glow' : 'bg-transparent border-white/20 text-white/60 hover:border-white/50'}`}
                >
                    ALL
                </button>
                {allTags.map(tag => (
                    <button 
                        key={tag} 
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`px-3 py-1 rounded text-xs font-mono border transition-all ${selectedTag === tag ? 'bg-neon-pink/20 border-neon-pink text-white box-glow' : 'bg-transparent border-white/20 text-white/60 hover:border-white/50'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        {loading ? (
             <div className="flex items-center justify-center h-64">
                <p className="font-mono text-neon-blue animate-pulse">DECRYPTING_DATA_STREAMS...</p>
            </div>
        ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, i) => (
                    <BlogCard key={blog.id || i} blog={blog} index={i} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
                <p className="text-white/50 font-mono">NO_RECORDS_FOUND</p>
            </div>
        )}
    </div>
  );
}
