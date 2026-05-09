"use client";

import { motion } from "framer-motion";

const CODE_LINES = [
  "import React",
  "function App() {",
  "  return <Site />",
  "}",
  "export default App",
  "// shipping…",
];

export default function GuyAtComputer({ size = 500 }: { size?: number }) {
  return (
    <div
      className="relative select-none"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-[8%] rounded-full blur-3xl bg-[radial-gradient(circle_at_70%_45%,rgba(255,107,181,0.32),transparent_60%),radial-gradient(circle_at_28%_60%,rgba(45,212,168,0.22),transparent_65%)] pointer-events-none" />

      <svg
        viewBox="0 0 600 600"
        className="relative w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="screen2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8fc8" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ff5da3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5b1f4f" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="sweater2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2c3d" />
            <stop offset="100%" stopColor="#0a121b" />
          </linearGradient>
          <linearGradient id="rim2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4a8" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#2dd4a8" stopOpacity="0" />
            <stop offset="100%" stopColor="#ff6bb5" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="floor2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6bb5" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ff6bb5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a1c14" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </linearGradient>
          <filter id="screenGlow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="320" cy="540" rx="220" ry="26" fill="url(#floor2)" />

        <rect
          x="80"
          y="430"
          width="440"
          height="10"
          rx="2"
          fill="#1a2535"
          stroke="#2a3447"
          strokeWidth="0.8"
        />
        <rect x="92" y="440" width="7" height="100" fill="#0e1620" />
        <rect x="510" y="440" width="7" height="100" fill="#0e1620" />

        <rect
          x="100"
          y="240"
          width="80"
          height="190"
          rx="14"
          fill="#0d141d"
          stroke="#2a3447"
          strokeWidth="1.5"
        />
        <rect x="106" y="260" width="68" height="100" rx="8" fill="#141d2a" />

        <rect x="370" y="395" width="44" height="35" fill="#1a2535" />
        <rect x="340" y="430" width="100" height="6" fill="#1a2535" />

        <rect
          x="290"
          y="190"
          width="220"
          height="175"
          rx="8"
          fill="#06090f"
          stroke="#2a3447"
          strokeWidth="2.5"
        />
        <rect
          x="300"
          y="200"
          width="200"
          height="155"
          rx="3"
          fill="url(#screen2)"
          filter="url(#screenGlow2)"
        />

        <g fontFamily="ui-monospace, Menlo, Consolas, monospace" fontSize="10" fill="#ffffff">
          {CODE_LINES.map((line, i) => (
            <motion.text
              key={i}
              x={310}
              y={222 + i * 18}
              opacity={0}
              animate={{ opacity: [0, 0.85, 0.85, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.4,
                times: [0, 0.18, 0.85, 1],
              }}
            >
              {line}
            </motion.text>
          ))}
          <motion.rect
            x={310}
            y={222 + CODE_LINES.length * 18 - 9}
            width={6}
            height={11}
            fill="#ffffff"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
        </g>

        <rect
          x="240"
          y="450"
          width="240"
          height="14"
          rx="3"
          fill="#1a2535"
          stroke="#2a3447"
          strokeWidth="1"
        />
        <g fill="#3a475a">
          {Array.from({ length: 22 }).map((_, i) => (
            <rect
              key={i}
              x={246 + i * 10.5}
              y={454}
              width={7}
              height={6}
              rx={1}
            />
          ))}
        </g>

        <rect
          x="135"
          y="280"
          width="92"
          height="160"
          rx="14"
          fill="#0e1620"
          stroke="#2a3447"
          strokeWidth="1"
        />
        <rect x="173" y="438" width="16" height="60" fill="#0e1620" />
        <ellipse cx="181" cy="500" rx="28" ry="6" fill="#0e1620" />

        <path
          d="M 165 400
             Q 152 392 156 372
             Q 160 350 188 344
             Q 222 339 240 358
             Q 250 388 244 432
             L 244 460
             L 156 460 Z"
          fill="url(#sweater2)"
          stroke="#2a3447"
          strokeWidth="1.4"
        />
        <path
          d="M 165 400 Q 152 392 156 372 Q 160 350 188 344 Q 222 339 240 358"
          fill="none"
          stroke="url(#rim2)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <ellipse cx="208" cy="295" rx="34" ry="38" fill="#c89272" />
        <ellipse
          cx="208"
          cy="295"
          rx="34"
          ry="38"
          fill="none"
          stroke="url(#rim2)"
          strokeWidth="1.4"
        />

        <path
          d="M 175 290
             Q 175 252 210 246
             Q 250 246 248 295
             L 248 270
             Q 240 260 220 260
             Q 192 263 184 282
             L 178 290 Z"
          fill="url(#hair)"
        />
        <path
          d="M 244 280
             Q 256 282 252 295
             Q 248 296 244 295 Z"
          fill="#1a0f0a"
        />

        <ellipse cx="225" cy="298" rx="2.6" ry="3.2" fill="#0d0d0d" />
        <ellipse cx="225.5" cy="297" rx="0.9" ry="1" fill="#ffffff" />
        <path
          d="M 244 296 L 251 298"
          stroke="#7a4530"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 230 318 Q 240 322 248 318"
          stroke="#7a4530"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="232" cy="313" rx="3.5" ry="2.2" fill="#b87a5e" opacity="0.55" />

        <path
          d="M 178 318 L 174 312 L 174 326 Z"
          fill="#c89272"
        />

        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 240 360 Q 268 364 296 408 Q 304 426 290 446"
            stroke="#1f2c3d"
            strokeWidth="22"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 240 360 Q 268 364 296 408 Q 304 426 290 446"
            stroke="url(#rim2)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <ellipse cx="288" cy="450" rx="16" ry="8" fill="#c89272" />
          <g stroke="#a87158" strokeWidth="1" strokeLinecap="round">
            <line x1="280" y1="450" x2="278" y2="456" />
            <line x1="285" y1="451" x2="284" y2="457" />
            <line x1="290" y1="451" x2="290" y2="457" />
            <line x1="295" y1="450" x2="296" y2="456" />
          </g>
        </motion.g>

        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{
            duration: 0.55,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.18,
          }}
        >
          <path
            d="M 230 380 Q 264 388 308 432 Q 322 446 314 458"
            stroke="#1f2c3d"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="312" cy="460" rx="16" ry="8" fill="#c89272" />
          <g stroke="#a87158" strokeWidth="1" strokeLinecap="round">
            <line x1="304" y1="460" x2="302" y2="466" />
            <line x1="309" y1="461" x2="308" y2="467" />
            <line x1="314" y1="461" x2="314" y2="467" />
            <line x1="319" y1="460" x2="320" y2="466" />
          </g>
        </motion.g>

        <motion.circle
          cx="350"
          cy="220"
          r="3"
          fill="#2dd4a8"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </svg>

      <motion.div
        className="absolute right-[18%] top-[6%] h-3 w-3 rounded-full bg-[#ff6bb5] shadow-[0_0_14px_4px_rgba(255,107,181,0.6)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[6%] top-[55%] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_3px_rgba(45,212,168,0.6)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
