"use client";

import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";
import NeonButton from "../ui/NeonButton";
import Hero3D from "../3d/Hero3D";
import { ArrowDown } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function Hero() {
  const { profile, loading } = usePortfolioData();

  const name = profile?.name || "CYBER_DEV";
  const tagline = profile?.bio || "Architecting immersive digital experiences in the neural net.";
  const role = profile?.title || "SYSTEM.INIT(USER)";

  if (loading) return null; // Or a skeleton loader

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Layer */}
      <Hero3D />

      {/* Content Layer */}
      <div className="relative z-10 text-center space-y-8 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-neon-cyan font-mono text-lg mb-4 tracking-widest uppercase">
            {role}
          </p>
          <GlitchText text={name.replace(" ", "_").toUpperCase()} size="xl" className="font-bold mb-2" />
          <h2 className="text-2xl md:text-3xl text-gray-300 font-rajdhani mt-4 max-w-2xl mx-auto">
            {tagline}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <NeonButton variant="primary">View Projects</NeonButton>
          <NeonButton variant="secondary">Contact Me</NeonButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neon-blue"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
