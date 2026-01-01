"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "../ui/ProjectCard";
import GlitchText from "../ui/GlitchText";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const COLORS = ["#FF006E", "#3A86FF", "#06FFA5", "#8338EC", "#FB5607", "#00F5FF"];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const { projects, loading } = usePortfolioData();

  return (
    <section id="projects" ref={container} className="relative mt-[20vh] mb-[20vh] min-h-[50vh]">
      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
             <p className="font-mono text-neon-blue animate-pulse">INITIALIZING_PROJECT_DATA...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh]">
             <p className="text-white/50 font-mono">NO_PROJECT_DATA_FOUND</p>
        </div>
      ) : (
        <>
            <div className="sticky top-10 mb-20 text-center z-10 pointer-events-none">
                <GlitchText text="DEPLOYED_UNITS" size="lg" className="font-bold" />
            </div>

            {projects.map((project, i) => {
                const targetScale = 1 - ((projects.length - i) * 0.05);
                return (
                <ProjectCard 
                    key={project.id || i} 
                    index={i} 
                    project={{...project, color: COLORS[i % COLORS.length]}} 
                    progress={scrollYProgress}
                    range={[i * (1 / projects.length), 1]}
                    targetScale={targetScale}
                />
                );
            })}
        </>
      )}
    </section>
  );
}
