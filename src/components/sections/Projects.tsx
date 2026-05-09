"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

type Project = {
  name: string;
  type: string;
  tools: string;
  gradient: string;
  blurb: string;
};

const PROJECTS: Project[] = [
  {
    name: "Personal Portfolio",
    type: "Personal Website",
    tools: "Next.js, React, Tailwind, Framer Motion, Three.js",
    gradient: "from-accent/30 via-emerald-500/15 to-cyan-500/10",
    blurb: "A dark-themed, animated portfolio showcasing my work and interests.",
  },
  {
    name: "Network Scanner",
    type: "Cybersecurity Tool",
    tools: "Python, Sockets, Scapy, Nmap",
    gradient: "from-fuchsia-500/30 via-purple-500/15 to-indigo-500/10",
    blurb: "A small CLI tool that probes hosts, lists open ports, and tags services.",
  },
  {
    name: "Task Manager",
    type: "Full-Stack App",
    tools: "Django, MongoDB, JavaScript, HTML/CSS",
    gradient: "from-amber-500/30 via-orange-500/15 to-rose-500/10",
    blurb: "A simple to-do app with auth, persistence, and a clean responsive UI.",
  },
];

const textVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 80, rotateY: d * 18 }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (d: number) => ({ opacity: 0, x: -d * 80, rotateY: -d * 18 }),
};

const mockVariants = {
  enter: (d: number) => ({
    opacity: 0,
    x: d * 120,
    rotateY: d * -22,
    scale: 0.9,
  }),
  center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
  exit: (d: number) => ({
    opacity: 0,
    x: -d * 120,
    rotateY: -d * -22,
    scale: 0.9,
  }),
};

export default function Projects() {
  const [[i, dir], setIDir] = useState<[number, number]>([0, 1]);
  const total = PROJECTS.length;
  const p = PROJECTS[i];

  const goTo = (next: number) => {
    setIDir((cur) => {
      const direction =
        next > cur[0] || (cur[0] === total - 1 && next === 0) ? 1 : -1;
      return [next, direction];
    });
  };
  const goNext = () => goTo((i + 1) % total);
  const goPrev = () => goTo((i - 1 + total) % total);

  return (
    <section
      id="work"
      className="relative min-h-screen w-full px-6 md:px-12 py-32 before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,107,181,0.05),transparent_55%)] before:pointer-events-none"
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="04" name="WORK" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-3"
        >
          My <span className="text-accent">Work</span>
        </motion.h2>
        <div className="h-px w-full bg-gradient-to-r from-accent/60 via-accent/20 to-transparent mb-16" />

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center"
          style={{ perspective: 1400 }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`text-${i}`}
              custom={dir}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="block text-7xl md:text-[160px] font-black text-foreground/10 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2">{p.name}</h3>
              <p className="text-foreground/65 mt-1">{p.type}</p>
              <p className="text-foreground/85 mt-4 max-w-md leading-relaxed">
                {p.blurb}
              </p>
              <p className="font-mono text-accent text-[10px] tracking-[0.35em] mt-8 mb-2">
                TOOLS &amp; FEATURES
              </p>
              <p className="text-foreground/85">{p.tools}</p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`mock-${i}`}
              custom={dir}
              variants={mockVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-xl border border-white/12 bg-[#101822] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                <div className="absolute top-0 left-0 right-0 h-7 bg-white/[0.04] border-b border-white/10 flex items-center gap-1.5 px-3">
                  <span className="h-2 w-2 rounded-full bg-red-500/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                  <span className="ml-3 font-mono text-[10px] tracking-widest text-foreground/40">
                    {p.name.toLowerCase().replace(/\s+/g, "-")}.app
                  </span>
                </div>
                <div
                  className={`absolute inset-x-0 top-7 bottom-0 bg-gradient-to-br ${p.gradient}`}
                />
                <div className="absolute inset-x-0 top-7 bottom-0 flex flex-col items-center justify-center gap-3 p-6">
                  <span className="font-mono text-accent text-[10px] tracking-[0.5em]">
                    PROJECT {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-foreground/85 text-center">
                    {p.name.toUpperCase()}
                  </span>
                  <div className="h-px w-16 bg-accent/60" />
                  <span className="font-mono text-[10px] text-foreground/45 text-center max-w-xs">
                    {p.type}
                  </span>
                </div>
              </div>
              <div className="mx-auto h-3 w-1/3 bg-white/5 rounded-b-md border-x border-b border-white/10" />
              <div className="mx-auto h-1.5 w-1/2 bg-black/40 rounded-b-full" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={goPrev}
            className="h-11 w-11 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
            aria-label="Previous project"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === i
                    ? "w-8 bg-accent"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            className="h-11 w-11 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
