"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function NeonButton({ children, className, variant = "primary", ...props }: NeonButtonProps) {
  const baseStyles = "px-8 py-3 font-orbitron font-bold uppercase tracking-wider clip-path-slant transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-neon-blue/10 border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-bg hover:box-glow",
    secondary: "bg-neon-pink/10 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-dark-bg hover:box-glow",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </motion.button>
  );
}
