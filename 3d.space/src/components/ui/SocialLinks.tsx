"use client";

import { Github, Linkedin, Twitter, Mail, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/shrishesha4",
    icon: Github,
    color: "hover:text-neon-pink",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/shrishesha",
    icon: Linkedin,
    color: "hover:text-neon-blue",
  },
  {
    name: "Twitter",
    url: "https://x.com/Shrishesha4",
    icon: Twitter,
    color: "hover:text-neon-cyan",
  },
  {
    name: "Email",
    url: "mailto:shrisheshanarmatesshvara@gmail.com",
    icon: Mail,
    color: "hover:text-acid-green",
  },
  {
    name: "Buy Me a Coffee",
    url: "https://www.buymeacoffee.com/shrishesha4",
    icon: Coffee,
    color: "hover:text-yellow-400",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-6 justify-center items-center mt-8">
      {socialLinks.map((link, i) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-white/70 transition-colors duration-300 ${link.color}`}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <link.icon size={28} strokeWidth={1.5} />
          <span className="sr-only">{link.name}</span>
        </motion.a>
      ))}
    </div>
  );
}
