"use client";

import { motion } from "framer-motion";

export default function AvatarPlaceholder({
  size = 360,
  initials = "BS",
}: {
  size?: number;
  initials?: string;
}) {
  return (
    <div
      className="relative select-none"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-[-15%] rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,168,0.35),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(255,107,181,0.32),transparent_60%)]" />

      <motion.div
        className="absolute inset-0 rounded-full border border-accent/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          maskImage:
            "conic-gradient(from 0deg, black 0deg, transparent 110deg, black 220deg, transparent 330deg, black 360deg)",
        }}
      />
      <motion.div
        className="absolute inset-[8%] rounded-full border border-pink/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[16%] rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-[#1a2535] via-[#0d141d] to-[#06080d] border border-white/10 overflow-hidden flex items-center justify-center shadow-[inset_0_0_60px_rgba(45,212,168,0.18),inset_0_0_60px_rgba(255,107,181,0.15)]">
        <div className="absolute -left-4 top-0 bottom-0 w-2/3 bg-gradient-to-r from-accent/35 via-accent/10 to-transparent blur-2xl" />
        <div className="absolute -right-4 top-0 bottom-0 w-2/3 bg-gradient-to-l from-pink/35 via-pink/10 to-transparent blur-2xl" />
        <span className="relative text-[28%] font-black bg-gradient-to-br from-white via-accent to-cyan-200 bg-clip-text text-transparent">
          {initials}
        </span>
      </div>

      <motion.div
        className="absolute right-[5%] top-[12%] h-3 w-3 rounded-full bg-accent shadow-[0_0_22px_6px_rgba(45,212,168,0.7)]"
        animate={{ y: [0, -10, 0], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[8%] bottom-[18%] h-2 w-2 rounded-full bg-pink shadow-[0_0_14px_4px_rgba(255,107,181,0.6)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
