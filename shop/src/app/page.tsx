'use client';
import { useState, useEffect, useMemo } from 'react';

export default function Home() {
  const phrases = useMemo(() => [
    "we&apos;re launching soon",
    "exciting things await",
    "something special coming",
    "stay tuned for more",
    "we&apos;re getting there",
    "we&apos;re just a few steps away",
    "we&apos;re getting closer",
    "we&apos;re just a few more steps",
    "almost ready to launch",
    "the countdown begins",
    "preparing something amazing",
    "crafting the experience",
    "fine-tuning the details",
    "putting on finishing touches",
    "magic in the making",
    "building something unique",
    "innovation in progress",
    "excellence takes time",
    "worth the wait",
    "transformation underway"
  ], []);
  
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentPhrase(prev => {
          const currentIndex = phrases.indexOf(prev);
          return phrases[(currentIndex + 1) % phrases.length];
        });
        setIsAnimating(true);
      }, 100);
    }, 2000);

    return () => clearInterval(timer);
  }, [phrases]); // Added phrases to dependency array

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 text-center relative overflow-hidden">
      <div className="gradient-bg absolute inset-0 -z-10 blur-3xl" />
      <div className="absolute inset-0 bg-background/50 -z-10" />
      
      <main className="w-full max-w-2xl mx-auto relative z-10 flex flex-col items-center pt-20">
        <h1 className="text-5xl sm:text-7xl font-bold mb-12 font-[family-name:var(--font-geist-sans)] tracking-wider">
          Coming Soon
        </h1>
        <p className="text-lg sm:text-xl mb-12 text-foreground/80 font-[family-name:var(--font-geist-sans)]">
          We&apos;re working on something exciting! Our shop will be launching soon.
        </p>
        
        <p className={`text-sm mt-8 text-foreground/60 font-[family-name:var(--font-geist-mono)] transition-all duration-500 ${isAnimating ? 'animate-bounce' : ''}`}>
          {currentPhrase}
        </p>
        
        <div className="space-y-6 mt-16">
          <p className="text-sm sm:text-base text-foreground/60 font-[family-name:var(--font-geist-mono)]">
            Stay tuned to be updated on our progress.
          </p>
          
          <a
            href="mailto:inquiry@shrishesha.online"
            target='_blank'
            className="inline-block rounded-full border border-solid border-transparent transition-colors bg-foreground text-background px-6 py-3 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base"
          >
            Contact Us
          </a>
        </div>
      </main>
      
      <footer className="w-full text-sm text-foreground/60 relative z-10 mt-16">
        © {new Date().getFullYear()} Shrishesha. All rights reserved.
      </footer>
    </div>
  );
}
