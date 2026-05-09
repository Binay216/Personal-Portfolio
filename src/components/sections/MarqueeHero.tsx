"use client";

import { motion } from "framer-motion";

const PHRASE =
  "TECH ENTHUSIAST • CODER • STUDENT • SOFTWARE EXPLORER • CYBERSECURITY • NETWORKING • ";

export default function MarqueeHero() {
  const repeated = PHRASE.repeat(6);
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#d4f0e7] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="flex whitespace-nowrap animate-marquee will-change-transform">
          <span className="font-black tracking-tight leading-none text-[#0a0e17] text-[64px] sm:text-[88px] md:text-[120px] pr-4">
            {repeated}
          </span>
          <span
            aria-hidden
            className="font-black tracking-tight leading-none text-[#0a0e17] text-[64px] sm:text-[88px] md:text-[120px] pr-4"
          >
            {repeated}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center gap-3 rounded-full bg-[#0a0e17] px-6 py-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)]"
      >
        <span className="block h-2.5 w-2.5 rounded-[2px] bg-accent animate-pulse-soft shadow-[0_0_10px_rgba(45,212,168,0.9)]" />
        <span className="font-mono text-[11px] md:text-xs tracking-[0.4em] text-white">
          WELCOME
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#0a0e17]/60">
          SCROLL
        </span>
        <span className="block h-10 w-px bg-[#0a0e17]/40" />
      </motion.div>
    </section>
  );
}
