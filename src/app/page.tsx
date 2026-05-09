"use client";

import dynamic from "next/dynamic";
import MainHero from "@/components/sections/MainHero";
import { SITE } from "@/config/site";
import About from "@/components/sections/About";
import WhatIDo from "@/components/sections/WhatIDo";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";

const TechStack = dynamic(() => import("@/components/sections/TechStack"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center">
      <span className="font-mono text-xs tracking-[0.35em] text-foreground/40">
        LOADING TECHSTACK…
      </span>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative">
      <MainHero />
      <About />
      <WhatIDo />
      <Timeline />
      <Projects />
      <TechStack />

      <footer className="border-t border-white/10 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-foreground/60">
          <p className="font-mono text-[11px] tracking-[0.3em]">
            © {new Date().getFullYear()} {SITE.name.toUpperCase()}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-[11px] tracking-[0.3em] hover:text-accent transition-colors"
            >
              {SITE.email.toUpperCase()}
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.3em] hover:text-accent transition-colors flex items-center gap-2"
              aria-label="GitHub"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.7.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GITHUB
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.3em] hover:text-accent transition-colors flex items-center gap-2"
              aria-label="LinkedIn"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.77c1.4-2.59 7-2.78 7 2.47V19z" />
              </svg>
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
