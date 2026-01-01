"use client";

import SkillsCloud from "../3d/SkillsCloud";
import GlitchText from "../ui/GlitchText";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { getTechIconUrl } from "@/lib/techMap";

export default function Skills() {
  const { profile, loading } = usePortfolioData();
  const techData = profile?.techStack || [];
  
  // Filter skills to only include those that have a mapped icon
  const techStack = techData.filter(skill => getTechIconUrl(skill) !== null);

  if (loading) {
      return (
        <section className="relative py-20 min-h-[80vh] flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-center mb-10">
                <GlitchText text="TECH_STACK" size="lg" className="font-bold" />
            </div>
            <div className="h-[600px] flex items-center justify-center">
                <p className="text-neon-blue font-mono animate-pulse">INITIALIZING_SYSTEM...</p>
            </div>
        </section>
      );
  }

  return (
    <section className="relative py-20 min-h-[80vh] flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="text-center mb-10">
        <GlitchText text="TECH_STACK" size="lg" className="font-bold" />
      </div>
      
      <div className="w-full max-w-4xl mx-auto">
        {/* Only show cloud if we have valid tech stack items */}
        {techStack.length > 0 ? (
            <SkillsCloud skills={techStack} />
        ) : (
            <div className="h-[600px] flex items-center justify-center">
                <p className="text-white/50 font-mono">NO_TECH_STACK_DATA_FOUND</p>
            </div>
        )}
      </div>
      
      {techStack.length > 0 && (
        <p className="text-center text-white/50 font-mono text-sm mt-8">
            [DRAG_TO_ROTATE]
        </p>
      )}
    </section>
  );
}
