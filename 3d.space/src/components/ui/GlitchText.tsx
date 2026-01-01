"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function GlitchText({ text, className, size = "md" }: GlitchTextProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  };

  return (
    <div className={cn("relative inline-block group", sizeClasses[size], className)}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-neon-pink opacity-0 group-hover:opacity-100 group-hover:animate-glitch group-hover:translate-x-[2px] transition-opacity duration-100"
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-neon-blue opacity-0 group-hover:opacity-100 group-hover:animate-glitch group-hover:-translate-x-[2px] transition-opacity duration-100 delay-75"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
}
