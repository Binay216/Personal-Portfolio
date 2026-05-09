"use client";

import { motion } from "framer-motion";
import Galaxy from "@/components/Galaxy";
import ScrambleText from "@/components/ScrambleText";

export default function MainHero() {
  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center px-6 md:px-12 py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-4">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="md:col-span-4 order-2 md:order-1 text-center md:text-left"
          >
            <p className="font-mono text-foreground/55 text-[11px] tracking-[0.4em] mb-3">
              HELLO, I&apos;M
            </p>
            <h1 className="font-black leading-[0.92] tracking-tight text-[clamp(40px,5.5vw,80px)] whitespace-nowrap">
              <ScrambleText text="BINAY" className="inline-block" />
              <br />
              <ScrambleText text="SIWAKOTI" className="inline-block" />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-4 order-1 md:order-2 flex items-center justify-center relative z-10"
          >
            <Galaxy size={500} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="md:col-span-4 order-3 text-center md:text-right"
          >
            <p className="font-mono text-foreground/55 text-[11px] tracking-[0.4em] mb-3">
              A PASSIONATE
            </p>
            <h2 className="font-black leading-[0.92] tracking-tight text-[clamp(40px,5.5vw,80px)] whitespace-nowrap">
              <span className="bg-gradient-to-r from-accent via-emerald-300 to-cyan-200 bg-clip-text text-transparent inline-block">
                <ScrambleText text="TECH" />
              </span>
              <br />
              <ScrambleText text="ENTHUSIAST" className="inline-block" />
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] text-foreground/45"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </section>
  );
}
