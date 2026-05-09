"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Line =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string; muted?: boolean; tag?: string }
  | { type: "blank" };

const SCRIPT: Line[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "binay siwakoti" },
  { type: "blank" },
  { type: "cmd", text: "cat ~/skills.txt" },
  { type: "out", text: "html · css · js · ts" },
  { type: "out", text: "python · java · c · c++" },
  { type: "out", text: "django · mongodb · react" },
  { type: "blank" },
  { type: "cmd", text: "ls -1 ~/interests/" },
  { type: "out", text: "coding/", tag: "dir" },
  { type: "out", text: "cybersecurity/", tag: "dir" },
  { type: "out", text: "networking/", tag: "dir" },
  { type: "blank" },
  { type: "cmd", text: "git log --oneline" },
  { type: "out", text: "f3a9b2 always shipping", muted: true },
  { type: "out", text: "c1d840 learn → build → repeat", muted: true },
  { type: "out", text: "a002ff first commit", muted: true },
  { type: "blank" },
  { type: "cmd", text: "echo 'let’s build something'" },
  { type: "out", text: "let’s build something" },
];

export default function Terminal({ className }: { className?: string }) {
  const [completed, setCompleted] = useState<Line[]>([]);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (idx >= SCRIPT.length) {
      const t = window.setTimeout(() => {
        setCompleted([]);
        setIdx(0);
        setTyped(0);
      }, 4500);
      return () => window.clearTimeout(t);
    }

    const line = SCRIPT[idx];

    if (line.type === "blank") {
      const t = window.setTimeout(() => {
        setCompleted((p) => [...p, line]);
        setIdx((i) => i + 1);
      }, 90);
      return () => window.clearTimeout(t);
    }

    if (line.type === "out") {
      const t = window.setTimeout(() => {
        setCompleted((p) => [...p, line]);
        setIdx((i) => i + 1);
      }, 220);
      return () => window.clearTimeout(t);
    }

    if (typed < line.text.length) {
      const delay = 45 + Math.random() * 60;
      const t = window.setTimeout(() => setTyped((c) => c + 1), delay);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => {
      setCompleted((p) => [...p, line]);
      setIdx((i) => i + 1);
      setTyped(0);
    }, 480);
    return () => window.clearTimeout(t);
  }, [idx, typed]);

  const current = SCRIPT[idx];
  const typingCmd =
    current && current.type === "cmd" ? current.text.slice(0, typed) : null;

  const Cursor = (
    <motion.span
      className="inline-block align-middle w-[7px] h-[14px] bg-accent ml-[1px]"
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    />
  );

  return (
    <div className={className}>
      <div className="relative rounded-xl bg-[#080d14]/95 backdrop-blur border border-white/10 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.75)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_0%,rgba(45,212,168,0.07),transparent_60%),radial-gradient(circle_at_70%_100%,rgba(255,107,181,0.06),transparent_60%)]" />

        <div className="relative flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-mono text-[11px] tracking-wider text-foreground/45">
            binay@portfolio: ~
          </span>
        </div>

        <div className="relative p-5 font-mono text-[13px] leading-[1.75] min-h-[360px] md:min-h-[420px] max-h-[480px] overflow-hidden text-foreground/85">
          {completed.map((line, i) => {
            if (line.type === "blank") return <div key={i} className="h-[1.5em]" />;
            if (line.type === "cmd") {
              return (
                <div key={i}>
                  <span className="text-accent">$ </span>
                  <span className="text-foreground">{line.text}</span>
                </div>
              );
            }
            return (
              <div
                key={i}
                className={
                  line.muted
                    ? "text-foreground/45"
                    : line.tag === "dir"
                      ? "text-cyan-300/80"
                      : "text-foreground/75"
                }
              >
                {line.text}
              </div>
            );
          })}

          {typingCmd !== null && (
            <div>
              <span className="text-accent">$ </span>
              <span className="text-foreground">{typingCmd}</span>
              {Cursor}
            </div>
          )}

          {typingCmd === null && idx < SCRIPT.length && (
            <div className="opacity-90">
              <span className="text-accent">$ </span>
              {Cursor}
            </div>
          )}

          {idx >= SCRIPT.length && (
            <div>
              <span className="text-accent">$ </span>
              {Cursor}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
