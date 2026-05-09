"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/\\";

export default function ScrambleText({
  text,
  className,
  speed = 30,
  revealStep = 1 / 2.5,
}: {
  text: string;
  className?: string;
  speed?: number;
  revealStep?: number;
}) {
  const [display, setDisplay] = useState(text);
  const iterRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  const stop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const scramble = () => {
    stop();
    iterRef.current = 0;
    intervalRef.current = window.setInterval(() => {
      const i = iterRef.current;
      const next = text
        .split("")
        .map((ch, idx) => {
          if (ch === " " || ch === " ") return ch;
          if (idx < i) return text[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);
      if (i >= text.length) {
        setDisplay(text);
        stop();
      }
      iterRef.current = i + revealStep;
    }, speed);
  };

  useEffect(() => stop, []);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onFocus={scramble}
    >
      {display}
    </span>
  );
}
