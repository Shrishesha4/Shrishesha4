import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 text-center text-white/30 font-mono text-xs">
        © 2026 CYBER_DEV SYSTEM. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
