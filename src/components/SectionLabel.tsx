"use client";

import { motion } from "framer-motion";

export default function SectionLabel({
  number,
  name,
}: {
  number: string;
  name: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12 md:mb-14"
    >
      <span className="font-mono text-accent text-xs tracking-[0.3em] tabular-nums">
        {number}
      </span>
      <span className="font-mono text-foreground/45 text-[10px] md:text-xs tracking-[0.45em] uppercase">
        / {name}
      </span>
      <span className="flex-1 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent ml-2" />
    </motion.div>
  );
}
