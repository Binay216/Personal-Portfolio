"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Skill = {
  name: string;
  color: string;
  blurb: string;
};

const ORBITS: { radius: number; duration: number; reverse: boolean; skills: Skill[] }[] = [
  {
    radius: 110,
    duration: 22,
    reverse: false,
    skills: [
      { name: "HTML", color: "#e34f26", blurb: "Semantic markup" },
      { name: "CSS", color: "#1572b6", blurb: "Styling & layout" },
      { name: "JS", color: "#f7df1e", blurb: "JavaScript" },
    ],
  },
  {
    radius: 175,
    duration: 36,
    reverse: true,
    skills: [
      { name: "Python", color: "#3776ab", blurb: "Scripts, scraping, ML" },
      { name: "Java", color: "#f89820", blurb: "OOP fundamentals" },
      { name: "C++", color: "#00599c", blurb: "Systems programming" },
      { name: "C", color: "#a8b9cc", blurb: "Low-level code" },
    ],
  },
  {
    radius: 240,
    duration: 54,
    reverse: false,
    skills: [
      { name: "VB.NET", color: "#9b71e0", blurb: "Windows app dev" },
      { name: "Django", color: "#3da16e", blurb: "Python web framework" },
      { name: "MongoDB", color: "#47a248", blurb: "NoSQL database" },
      { name: "React", color: "#61dafb", blurb: "UI library" },
      { name: "Networking", color: "#2dd4a8", blurb: "TCP/IP, DNS, routing" },
    ],
  },
];

export default function Galaxy({ size = 540 }: { size?: number }) {
  const [active, setActive] = useState<Skill | null>(null);
  const half = size / 2;

  return (
    <div
      className="relative select-none"
      style={{ width: size, height: size }}
      aria-label="Skills constellation"
    >
      <div className="absolute inset-[-15%] rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,168,0.32),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(255,107,181,0.28),transparent_60%)] pointer-events-none" />

      {ORBITS.map((orbit, oi) => (
        <div
          key={`ring-${oi}`}
          className="absolute rounded-full border border-white/[0.07] pointer-events-none"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            left: half - orbit.radius,
            top: half - orbit.radius,
          }}
        />
      ))}

      {ORBITS.map((orbit, oi) => (
        <motion.div
          key={`orbit-${oi}`}
          className="absolute pointer-events-none"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            left: half - orbit.radius,
            top: half - orbit.radius,
          }}
          animate={{ rotate: orbit.reverse ? -360 : 360 }}
          transition={{
            duration: orbit.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {orbit.skills.map((skill, si) => {
            const angle = (si / orbit.skills.length) * Math.PI * 2;
            const x = Math.round(orbit.radius + Math.cos(angle) * orbit.radius);
            const y = Math.round(orbit.radius + Math.sin(angle) * orbit.radius);
            const isActive = active?.name === skill.name;
            return (
              <button
                key={skill.name}
                onClick={() =>
                  setActive((prev) =>
                    prev?.name === skill.name ? null : skill,
                  )
                }
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  const cx = r.left + r.width / 2;
                  const cy = r.top + r.height / 2;
                  e.currentTarget.style.setProperty(
                    "--mx",
                    `${(e.clientX - cx) * 0.55}px`,
                  );
                  e.currentTarget.style.setProperty(
                    "--my",
                    `${(e.clientY - cy) * 0.55}px`,
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty("--mx", "0px");
                  e.currentTarget.style.setProperty("--my", "0px");
                }}
                className="absolute group pointer-events-auto"
                style={{
                  left: x,
                  top: y,
                  transform:
                    "translate(calc(-50% + var(--mx, 0px)), calc(-50% + var(--my, 0px)))",
                  transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
                }}
                aria-label={`Show ${skill.name}`}
              >
                <motion.span
                  className="block rounded-full"
                  animate={{
                    scale: isActive ? 1.6 : [1, 1.15, 1],
                    boxShadow: `0 0 ${isActive ? 18 : 10}px ${skill.color}, 0 0 ${
                      isActive ? 36 : 22
                    }px ${skill.color}66`,
                  }}
                  transition={{
                    scale: isActive
                      ? { duration: 0.25 }
                      : { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    width: isActive ? 14 : 11,
                    height: isActive ? 14 : 11,
                    backgroundColor: skill.color,
                  }}
                />
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: orbit.reverse ? 360 : -360 }}
                  transition={{
                    duration: orbit.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {skill.name}
                </motion.span>
              </button>
            );
          })}
        </motion.div>
      ))}

      <div
        className="absolute rounded-full border border-white/15 overflow-hidden bg-gradient-to-br from-[#11192a] via-[#0a1018] to-[#05080d]"
        style={{
          width: 150,
          height: 150,
          left: half - 75,
          top: half - 75,
          boxShadow:
            "inset 0 0 50px rgba(45,212,168,0.22), inset 0 0 50px rgba(255,107,181,0.18), 0 0 60px rgba(45,212,168,0.18)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,168,0.22),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,107,181,0.18),transparent_60%)] pointer-events-none" />
        <div className="absolute -left-3 top-0 bottom-0 w-3/4 bg-gradient-to-r from-accent/30 via-accent/5 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute -right-3 top-0 bottom-0 w-3/4 bg-gradient-to-l from-pink/30 via-pink/5 to-transparent blur-2xl pointer-events-none" />

        {!active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-[88px] h-[88px] drop-shadow-[0_0_16px_rgba(45,212,168,0.35)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bsTealPink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4a8" />
                  <stop offset="100%" stopColor="#ff6bb5" />
                </linearGradient>
                <linearGradient id="bsPinkTeal" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff6bb5" />
                  <stop offset="100%" stopColor="#2dd4a8" />
                </linearGradient>
              </defs>

              <path
                d="M 22 34 L 50 14 L 78 34"
                stroke="url(#bsTealPink)"
                strokeWidth="3.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <motion.g
                style={{
                  transformOrigin: "50px 50px",
                  transformBox: "fill-box" as const,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                <path
                  d="M 50 28 L 72 50 L 50 72 L 28 50 Z"
                  stroke="url(#bsTealPink)"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinejoin="round"
                />
                <path
                  d="M 50 38 L 62 50 L 50 62 L 38 50 Z"
                  fill="url(#bsPinkTeal)"
                  fillOpacity="0.45"
                />
              </motion.g>

              <path
                d="M 22 66 L 50 86 L 78 66"
                stroke="url(#bsPinkTeal)"
                strokeWidth="3.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <motion.circle
                cx="50"
                cy="50"
                r="2.2"
                fill="#ffffff"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        )}

        {active && (
          <motion.div
            key={active.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-3"
          >
            <p
              className="font-black text-2xl leading-tight"
              style={{ color: active.color }}
            >
              {active.name}
            </p>
            <p className="font-mono text-[9px] tracking-[0.2em] text-foreground/70 mt-1.5 uppercase">
              {active.blurb}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
