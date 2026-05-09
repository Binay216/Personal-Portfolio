"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/config/site";

export default function Navbar() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (y < 80) setShow(true);
      else if (y < last) setShow(true);
      else if (Math.abs(y - last) > 4) setShow(false);
      last = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 px-3 md:px-6 pt-3 md:pt-5 transition-transform duration-500 ease-out ${
        show ? "translate-y-0" : "-translate-y-[120%]"
      }`}
    >
      <div className="mx-auto max-w-7xl backdrop-blur-xl bg-background/40 border border-white/10 rounded-full px-5 md:px-7 py-3 flex items-center justify-between gap-3">
        <a
          href={`mailto:${SITE.email}`}
          className="font-mono text-[10px] md:text-xs text-foreground/80 hover:text-accent transition-colors tracking-wider truncate"
        >
          {SITE.email}
        </a>
        <div className="flex items-center gap-4 md:gap-6 font-mono text-[10px] md:text-xs tracking-[0.2em] shrink-0">
          <a
            href="#about"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            ABOUT
          </a>
          <a
            href="#work"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            WORK
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-accent transition-colors flex items-center gap-1.5"
            aria-label="GitHub"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.7.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            <span className="hidden sm:inline">GITHUB</span>
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-accent transition-colors flex items-center gap-1.5"
            aria-label="LinkedIn"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.77c1.4-2.59 7-2.78 7 2.47V19z" />
            </svg>
            <span className="hidden sm:inline">LINKEDIN</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
