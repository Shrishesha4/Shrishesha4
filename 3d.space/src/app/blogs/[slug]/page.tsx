"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { Blog } from "@/lib/types";
import GlitchText from "@/components/ui/GlitchText";
import NeonButton from "@/components/ui/NeonButton";
import { ArrowLeft, BookOpen, Volume2, StopCircle, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { blogs, loading } = usePortfolio();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [readerMode, setReaderMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!loading && slug) {
      const slugString = Array.isArray(slug) ? slug[0] : slug;
      // Find blog by slug or id (since slug might be id in some cases)
      const foundBlog = blogs.find(b => b.slug === slugString || b.id === slugString);
      if (foundBlog) {
        setBlog(foundBlog);
      }
    }
  }, [slug, blogs, loading]);

  // Speech Synthesis Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!synthRef.current || !blog) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    } else {
      // Strip HTML tags for speech
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = blog.content || "";
      const textToSpeak = tempDiv.textContent || tempDiv.innerText || "";

      utteranceRef.current = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current.onend = () => setIsSpeaking(false);
      
      // Select a futuristic voice if available (Google US English or similar)
      const voices = synthRef.current.getVoices();
      const futuristicVoice = voices.find(v => v.name.includes("Google US English")) || voices[0];
      if (futuristicVoice) utteranceRef.current.voice = futuristicVoice;

      synthRef.current.speak(utteranceRef.current);
      setIsSpeaking(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-neon-blue animate-pulse">DECRYPTING_ARCHIVE...</p>
      </div>
    );
  }

  if (!blog && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-neon-pink text-xl">ERROR_404: ARCHIVE_CORRUPTED</p>
        <Link href="/blogs">
          <NeonButton variant="secondary">RETURN_TO_BASE</NeonButton>
        </Link>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <article className={`min-h-screen pt-32 pb-20 px-4 transition-all duration-500 ${readerMode ? 'max-w-3xl mx-auto' : 'max-w-5xl mx-auto'}`}>
      
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-8 sticky top-24 z-40 bg-dark-bg/80 backdrop-blur-md p-4 rounded-lg border border-white/10">
        <Link href="/blogs" className="flex items-center gap-2 text-neon-blue hover:text-white transition-colors font-mono text-sm">
          <ArrowLeft size={16} />
          BACK_TO_LOGS
        </Link>

        <div className="flex gap-4">
          <button 
            onClick={toggleSpeech}
            className={`p-2 rounded hover:bg-white/10 transition-colors ${isSpeaking ? 'text-neon-pink animate-pulse' : 'text-white/70'}`}
            title={isSpeaking ? "Stop Speech" : "Read Aloud"}
          >
            {isSpeaking ? <StopCircle size={20} /> : <Volume2 size={20} />}
          </button>
          
          <button 
            onClick={() => setReaderMode(!readerMode)}
            className={`p-2 rounded hover:bg-white/10 transition-colors ${readerMode ? 'text-neon-cyan' : 'text-white/70'}`}
            title="Toggle Reader Mode"
          >
            <BookOpen size={20} />
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-white/50">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(blog.date).toLocaleDateString()}
          </span>
          <span className="text-neon-pink">|</span>
          <span className="flex items-center gap-1">
            <Tag size={14} />
            {blog.tags?.join(", ")}
          </span>
        </div>

        <h1 className={`font-orbitron font-bold text-white leading-tight ${readerMode ? 'text-4xl' : 'text-4xl md:text-6xl'}`}>
          {blog.title}
        </h1>
      </header>

      {/* Hero Image */}
      {blog.image && !readerMode && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden border border-white/10 group"
        >
          <Image 
            src={blog.image} 
            alt={blog.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
        </motion.div>
      )}

      {/* Content */}
      <div 
        className={`prose prose-invert prose-lg max-w-none 
          prose-headings:font-orbitron prose-headings:text-neon-cyan
          prose-p:font-rajdhani prose-p:text-gray-300
          prose-a:text-neon-pink prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-code:text-acid-green prose-code:font-mono
          ${readerMode ? 'prose-xl leading-relaxed' : ''}
        `}
      >
        <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
      </div>

      {/* Footer */}
      <div className="mt-20 pt-10 border-t border-white/10 flex justify-center">
        <Link href="/blogs">
             <NeonButton variant="primary">END_TRANSMISSION</NeonButton>
        </Link>
      </div>

    </article>
  );
}
