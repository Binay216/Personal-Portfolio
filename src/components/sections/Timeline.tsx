"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/SectionLabel";

type Event = {
  year: string;
  title: string;
  org: string;
  desc: string;
};

const EVENTS: Event[] = [
  {
    year: "2022",
    title: "Started Coding",
    org: "Self-taught",
    desc: "Wrote my first lines of HTML and CSS, then quickly fell down the rabbit hole of programming. Hooked from the first JavaScript alert() that worked.",
  },
  {
    year: "2023",
    title: "Languages & Fundamentals",
    org: "Learning Phase",
    desc: "Picked up C, C++, Java, and Python. Spent time on data structures, algorithms, and how programs actually run under the hood.",
  },
  {
    year: "2024",
    title: "Full-Stack & Frameworks",
    org: "Project Phase",
    desc: "Started shipping projects with JavaScript and Django. Got comfortable with MongoDB and the basic shape of a real backend.",
  },
  {
    year: "NOW",
    title: "Cybersecurity & Networking",
    org: "Current Focus",
    desc: "Diving into network protocols, OWASP-style web security, and building tools I'd actually want to use. Always learning, always shipping.",
  },
];

function TimelineEntry({
  event,
  index,
  total,
  scrollYProgress,
}: {
  event: Event;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const myPos = total === 1 ? 0 : index / (total - 1);

  const proximity = useTransform(scrollYProgress, (p) =>
    Math.max(0, 1 - Math.abs(p - myPos) * 6),
  );
  const dotScale = useTransform(proximity, [0, 1], [1, 1.85]);
  const ringOpacity = useTransform(proximity, [0, 1], [0.25, 1]);
  const haloOpacity = useTransform(proximity, [0, 1], [0, 0.85]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="grid grid-cols-[1fr_auto_1fr] gap-3 md:gap-8 items-center mb-14 last:mb-0"
    >
      <div className="text-right md:pr-8">
        <h3 className="text-base md:text-xl font-bold leading-tight">
          {event.title}
        </h3>
        <p className="font-mono text-accent text-[10px] md:text-xs tracking-[0.25em] mt-1">
          {event.org}
        </p>
      </div>

      <div className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
        <div className="relative h-3 w-3">
          <motion.span
            className="absolute -inset-4 rounded-full bg-accent/40 blur-md"
            style={{ opacity: haloOpacity }}
          />
          <motion.span
            className="absolute inset-[-7px] rounded-full border border-accent"
            style={{ opacity: ringOpacity }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-accent shadow-[0_0_24px_rgba(45,212,168,0.85)]"
            style={{ scale: dotScale }}
          />
        </div>
        <p className="font-mono text-xl md:text-3xl font-black mt-3 text-foreground/90">
          {event.year}
        </p>
      </div>

      <div className="md:pl-8">
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
          {event.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const tipY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const tipOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0],
  );

  return (
    <section className="relative w-full px-6 md:px-12 py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionLabel number="03" name="EXPERIENCE" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-black text-center mb-20 leading-tight"
        >
          My career &amp; <span className="text-accent">experience</span>
        </motion.h2>

        <div ref={containerRef} className="relative">
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

          <motion.div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/70 to-accent shadow-[0_0_14px_rgba(45,212,168,0.55)]"
            style={{ scaleY: lineScale, transformOrigin: "top" }}
          />

          <motion.div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent shadow-[0_0_24px_8px_rgba(45,212,168,0.7)]"
            style={{ top: tipY, opacity: tipOpacity, y: "-50%" }}
          />

          {EVENTS.map((e, i) => (
            <TimelineEntry
              key={e.year + i}
              event={e}
              index={i}
              total={EVENTS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
