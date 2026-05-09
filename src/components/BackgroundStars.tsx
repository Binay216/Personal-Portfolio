"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COUNT = 90;

function rand(seed: number, n: number) {
  const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function BackgroundStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const sz = 0.6 + rand(i, 1) * 2.6;
        const op = 0.18 + rand(i, 2) * 0.6;
        return {
          id: i,
          left: rand(i, 3) * 100,
          top: rand(i, 4) * 100,
          size: sz,
          baseOpacity: op,
          twinkleDuration: 3 + rand(i, 5) * 6,
          twinkleDelay: rand(i, 6) * 5,
          driftDuration: 14 + rand(i, 7) * 22,
          driftDistance: 8 + rand(i, 8) * 18,
          color: rand(i, 9) > 0.85 ? "#2dd4a8" : rand(i, 10) > 0.92 ? "#ff6bb5" : "#ffffff",
        };
      }),
    [],
  );

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow:
              s.color === "#2dd4a8"
                ? `0 0 ${s.size * 3}px rgba(45,212,168,0.55)`
                : s.color === "#ff6bb5"
                  ? `0 0 ${s.size * 3}px rgba(255,107,181,0.5)`
                  : s.size > 2
                    ? `0 0 ${s.size * 2}px rgba(255,255,255,0.35)`
                    : undefined,
          }}
          animate={{
            opacity: [
              s.baseOpacity * 0.35,
              s.baseOpacity,
              s.baseOpacity * 0.35,
            ],
            y: [0, -s.driftDistance, 0],
          }}
          transition={{
            opacity: {
              duration: s.twinkleDuration,
              delay: s.twinkleDelay,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: s.driftDuration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
}
