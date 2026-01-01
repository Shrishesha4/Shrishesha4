"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import NeonButton from "./NeonButton";
import { Project } from "@/hooks/usePortfolioData";

interface ProjectCardProps {
  project: Project & { color: string }; // Extend with color for UI
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export default function ProjectCard({ project, index, progress, range, targetScale }: ProjectCardProps) {
  const container = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} 
        className="relative flex flex-col w-[1000px] h-[500px] rounded-3xl p-12 border border-white/10 bg-panel-bg backdrop-blur-md origin-top transform-gpu shadow-2xl overflow-hidden group"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 font-mono text-xs text-white/50">
           PRJ_0{index + 1} // {project.color}
        </div>
        
        <div className="flex h-full gap-12 z-10">
            <div className="w-[40%] flex flex-col justify-between">
                <div>
                    <h3 className="text-4xl font-orbitron font-bold mb-4" style={{ color: project.color }}>{project.title}</h3>
                    <p className="text-lg text-gray-300 font-rajdhani mb-6 line-clamp-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies?.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs border border-white/20 rounded-full font-mono text-white/70">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <a href={project.demo || project.link || project.github || "#"} target="_blank" rel="noopener noreferrer">
                    <NeonButton variant="primary" className="w-fit text-sm py-2 px-6">View Project</NeonButton>
                </a>
            </div>
            
            <div className="w-[60%] relative rounded-2xl overflow-hidden bg-black/50 border border-white/5 group-hover:border-white/20 transition-colors">
                 {project.image ? (
                    <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    />
                 ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                        <span className="font-mono text-white/20 text-4xl">NO_SIGNAL</span>
                    </div>
                 )}
            </div>
        </div>
      </motion.div>
    </div>
  );
}
