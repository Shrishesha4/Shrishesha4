"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, BookOpen, Mail } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  // { name: "About", path: "/#about", icon: User }, // Use anchors if on same page
  { name: "Projects", path: "/#projects", icon: Code }, // Anchor for now
  { name: "Blog", path: "/blogs", icon: BookOpen },
  { name: "Contact", path: "/#contact", icon: Mail }, // Anchor for now
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-lg shadow-neon-blue/10">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-2 text-sm font-rajdhani transition-colors ${
                    isActive ? "text-neon-cyan" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="relative flex items-center gap-2 px-2 py-1">
                    <item.icon size={18} />
                    <span className="hidden sm:block">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute inset-0 bg-neon-cyan/20 blur-md rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
