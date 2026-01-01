"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring for the trailing element (outer brackets)
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleLinkHoverStart = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea')) {
            setIsHoveringLink(true);
        }
    };
    const handleLinkHoverEnd = () => setIsHoveringLink(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleLinkHoverStart);
    window.addEventListener("mouseout", handleLinkHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleLinkHoverStart);
      window.removeEventListener("mouseout", handleLinkHoverEnd);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Main Cursor: Instant Follow Diamond */}
      <motion.div
        className="absolute w-3 h-3 bg-neon-cyan transform rotate-45 shadow-[0_0_10px_#00F5FF]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 0.8 : 1,
        }}
      />
      
      {/* Trailing Brackets: Slight Delay for effect */}
      <motion.div
        className="absolute w-10 h-10 border border-white/30"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHoveringLink ? 1.5 : 1,
          rotate: isClicking ? 90 : 45,
          opacity: isHoveringLink ? 1 : 0.5,
        }}
      >
        {/* Cutout effect to create brackets from a border */}
        <div className="absolute inset-0 bg-transparent" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)' }} />
        {/* Actual Brackets Visuals via borders on a pseudo-element logic or simpler svg */}
      </motion.div>

      {/* Cyberpunk Crosshair Lines (Only on Hover) */}
      {isHoveringLink && (
        <>
            <motion.div 
                className="absolute w-[40px] h-[1px] bg-neon-pink/50"
                style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} 
            />
            <motion.div 
                className="absolute w-[1px] h-[40px] bg-neon-pink/50"
                style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} 
            />
        </>
      )}
    </div>
  );
}
