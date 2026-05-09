"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "@/components/Terminal";
import SectionLabel from "@/components/SectionLabel";

type Item = {
  title: string;
  subtitle: string;
  desc: string;
  tools: string[];
};

const ITEMS: Item[] = [
  {
    title: "FRONTEND",
    subtitle: "Building Interactive UIs",
    desc: "Crafting clean, responsive interfaces with a focus on smooth interactions and clear hierarchy. I care about the small details — animation timing, type rhythm, and contrast.",
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind",
    ],
  },
  {
    title: "BACKEND",
    subtitle: "Scalable Server Logic",
    desc: "Designing reliable APIs and data layers that hold up under real use. I work in Python, Java, and C/C++ and have shipped projects with Django and MongoDB.",
    tools: ["Python", "Django", "Java", "C", "C++", "MongoDB", "REST APIs"],
  },
  {
    title: "CYBERSECURITY",
    subtitle: "Defensive Mindset",
    desc: "Studying how systems break so I can build them stronger. Currently exploring web app security, common attack patterns, and the foundations of ethical hacking.",
    tools: ["OWASP Top 10", "Wireshark", "Nmap", "Linux", "Burp Suite"],
  },
  {
    title: "NETWORKING",
    subtitle: "How Packets Travel",
    desc: "Going beyond “it just works” — understanding the layers, TCP/IP, routing, DNS, and how everything actually talks to everything else.",
    tools: ["TCP/IP", "DNS", "HTTP/S", "Subnetting", "VPN", "Routing"],
  },
];

function Card({
  item,
  isOpen,
  onEnter,
  onLeave,
  index,
}: {
  item: Item;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`border border-dashed rounded-2xl p-6 md:p-7 transition-colors ${
        isOpen
          ? "border-accent/50 bg-white/[0.045]"
          : "border-white/15 bg-white/[0.02] hover:border-accent/30"
      }`}
    >
      <div className="w-full flex items-start justify-between gap-4 text-left">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            {item.title}
          </h3>
          <p className="font-mono text-accent text-[11px] tracking-[0.3em] mt-2">
            {item.subtitle}
          </p>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-3xl text-accent leading-none mt-1"
        >
          +
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-foreground/85 mt-5 leading-relaxed">
              {item.desc}
            </p>
            <p className="font-mono text-accent text-[10px] tracking-[0.35em] mt-6 mb-3">
              SKILLSET &amp; TOOLS:
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-foreground/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WhatIDo() {
  const [hovered, setHovered] = useState<number>(-1);

  return (
    <section className="relative min-h-screen w-full px-6 md:px-12 py-32 overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top,rgba(45,212,168,0.04),transparent_60%)] before:pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="02" name="WHAT I DO" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-7xl mx-auto items-start">
        <div className="md:sticky md:top-28 md:self-start flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight"
          >
            WHAT I
            <br />
            <span className="text-accent">DO</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Terminal />
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {ITEMS.map((item, i) => (
            <Card
              key={item.title}
              item={item}
              index={i}
              isOpen={hovered === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(-1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
