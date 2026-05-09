"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

type Tech = { name: string; color: string; desc: string };

const TECH: Tech[] = [
  {
    name: "JS",
    color: "#f7df1e",
    desc: "JavaScript — the engine of every interactive thing I build for the web.",
  },
  {
    name: "PY",
    color: "#3776ab",
    desc: "Python — my go-to for scripting, automation, and quick experiments.",
  },
  {
    name: "JAVA",
    color: "#f89820",
    desc: "Java — strong types, OOP fundamentals, and serious tooling.",
  },
  {
    name: "C++",
    color: "#00599c",
    desc: "C++ — when I want speed and to feel close to the metal.",
  },
  {
    name: "C",
    color: "#a8b9cc",
    desc: "C — the language that made everything else make sense.",
  },
  {
    name: "HTML",
    color: "#e34f26",
    desc: "HTML — the bones of every page I write.",
  },
  {
    name: "CSS",
    color: "#1572b6",
    desc: "CSS — for layout, motion, and getting the small details right.",
  },
  {
    name: "DJANGO",
    color: "#0c4b33",
    desc: "Django — Python's batteries-included web framework.",
  },
  {
    name: "MONGO",
    color: "#47a248",
    desc: "MongoDB — flexible NoSQL storage when schemas need to breathe.",
  },
  {
    name: "VB.NET",
    color: "#9b71e0",
    desc: "VB.NET — for desktop apps on the Windows side.",
  },
  {
    name: "REACT",
    color: "#149eca",
    desc: "React — the component model that this whole site is built on.",
  },
  {
    name: "NEXT",
    color: "#aaaaaa",
    desc: "Next.js — React with routing, SSR, and a real production story.",
  },
];

function makeLogoTexture(label: string, color: string): THREE.Texture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createRadialGradient(
    size * 0.45,
    size * 0.4,
    30,
    size / 2,
    size / 2,
    size * 0.6,
  );
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.7, "#f3f0f6");
  grad.addColorStop(1, "#d8d4e0");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = color;
  const fontSize = label.length > 4 ? 70 : 110;
  ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, size / 2, size / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Ball({
  position,
  scale,
  texture,
  seed,
  isActive,
  isDimmed,
  onClick,
}: {
  position: [number, number, number];
  scale: number;
  texture: THREE.Texture;
  seed: number;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse, viewport } = useThree();

  const cfg = useMemo(() => {
    const r = (n: number) => {
      const x = Math.sin((seed + 1) * (n + 1) * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      driftX: 0.35 + r(1) * 0.55,
      driftY: 0.45 + r(2) * 0.6,
      driftZ: 0.25 + r(3) * 0.45,
      driftSpeedX: 0.55 + r(4) * 0.7,
      driftSpeedY: 0.7 + r(5) * 0.8,
      driftSpeedZ: 0.5 + r(6) * 0.6,
      rotSpeedX: 0.25 + r(7) * 0.6,
      rotSpeedY: 0.35 + r(8) * 0.7,
      rotSpeedZ: 0.1 + r(9) * 0.3,
      phaseX: r(10) * Math.PI * 2,
      phaseY: r(11) * Math.PI * 2,
      phaseZ: r(12) * Math.PI * 2,
      rotStartX: r(13) * Math.PI * 2,
      rotStartY: r(14) * Math.PI * 2,
    };
  }, [seed]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const driftScale = isActive ? 0.4 : 1;
      const baseX =
        position[0] +
        Math.sin(t * cfg.driftSpeedX + cfg.phaseX) * cfg.driftX * driftScale;
      const baseY =
        position[1] +
        Math.sin(t * cfg.driftSpeedY + cfg.phaseY) * cfg.driftY * driftScale;
      const baseZ =
        position[2] +
        Math.cos(t * cfg.driftSpeedZ + cfg.phaseZ) * cfg.driftZ * driftScale;

      // Mouse pull — soft attraction when cursor is nearby.
      const mx = (mouse.x * viewport.width) / 2;
      const my = (mouse.y * viewport.height) / 2;
      const dx = mx - baseX;
      const dy = my - baseY;
      const dist = Math.hypot(dx, dy);
      const threshold = 4;
      const pull = Math.max(0, 1 - dist / threshold);
      const pullStrength = pull * pull * 0.5;

      const targetX = baseX + dx * pullStrength;
      const targetY = baseY + dy * pullStrength;

      groupRef.current.position.x +=
        (targetX - groupRef.current.position.x) * 0.12;
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * 0.12;
      groupRef.current.position.z = baseZ;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = cfg.rotStartX + t * cfg.rotSpeedX;
      meshRef.current.rotation.y = cfg.rotStartY + t * cfg.rotSpeedY;
      meshRef.current.rotation.z = t * cfg.rotSpeedZ;

      const target = isActive ? scale * 1.55 : scale;
      const cur = meshRef.current.scale.x;
      const next = cur + (target - cur) * 0.12;
      meshRef.current.scale.set(next, next, next);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
        }}
      >
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.3}
          metalness={0.05}
          envMapIntensity={0.7}
          transparent={isDimmed || isActive}
          opacity={isDimmed ? 0.22 : 1}
          emissive={isActive ? "#222222" : "#000000"}
          emissiveIntensity={isActive ? 0.6 : 0}
        />
      </mesh>
    </group>
  );
}

function MouseLight() {
  const ref = useRef<THREE.PointLight>(null!);
  const { mouse, viewport } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = (mouse.x * viewport.width) / 2;
    ref.current.position.y = (mouse.y * viewport.height) / 2;
  });
  return (
    <pointLight
      ref={ref}
      intensity={1.2}
      distance={10}
      color="#ffd5ec"
      position={[0, 0, 3]}
    />
  );
}

function Scene({
  activeIdx,
  setActiveIdx,
}: {
  activeIdx: number | null;
  setActiveIdx: (i: number | null) => void;
}) {
  const items = useMemo(() => {
    const layout: [number, number, number][] = [
      [-5.0, 2.0, 0.4],
      [-1.7, 2.4, -0.5],
      [1.6, 2.0, 0.6],
      [4.8, 2.3, -0.2],
      [-4.6, 0.0, -0.6],
      [-1.4, -0.2, 0.7],
      [1.9, 0.3, -0.4],
      [4.9, -0.1, 0.5],
      [-5.2, -2.1, 0.2],
      [-2.0, -2.4, -0.5],
      [1.4, -2.2, 0.3],
      [4.6, -2.0, -0.4],
    ];

    return TECH.map((t, idx) => {
      const tex = makeLogoTexture(t.name, t.color);
      const r = Math.sin(idx * 91.91) * 0.5 + 0.5;
      const scale = 0.95 + r * 0.2;
      return {
        ...t,
        tex,
        scale,
        position: layout[idx % layout.length],
        seed: idx + 1,
      };
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={0.9}
        color="#ffffff"
      />
      <pointLight position={[6, 5, 6]} intensity={1.4} color="#ff6bb5" />
      <pointLight position={[-6, -2, -2]} intensity={1.1} color="#2dd4a8" />
      <pointLight position={[0, 7, 5]} intensity={0.6} color="#ffffff" />
      <MouseLight />
      {items.map((b, i) => (
        <Ball
          key={i}
          position={b.position}
          scale={b.scale}
          texture={b.tex}
          seed={b.seed}
          isActive={activeIdx === i}
          isDimmed={activeIdx !== null && activeIdx !== i}
          onClick={() => setActiveIdx(activeIdx === i ? null : i)}
        />
      ))}
    </>
  );
}

export default function TechStack() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? TECH[activeIdx] : null;

  return (
    <section className="relative w-full px-6 md:px-12 py-32 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="05" name="TECH" />
        <h2 className="text-center text-5xl md:text-7xl font-black tracking-tight">
          MY <span className="text-accent">TECHSTACK</span>
        </h2>
        <p className="text-center font-mono text-[11px] tracking-[0.4em] text-foreground/45 mt-4">
          TAP A SPHERE
        </p>

        <div className="relative mt-10 h-[520px] md:h-[620px] w-full">
          <Canvas
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true }}
            onPointerMissed={() => setActiveIdx(null)}
          >
            <Scene activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
          </Canvas>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-16 max-w-md w-[88%] text-center px-4"
              >
                <p
                  className="font-black text-3xl md:text-5xl tracking-tight"
                  style={{ color: active.color }}
                >
                  {active.name}
                </p>
                <p className="text-foreground/85 text-sm md:text-base mt-2 leading-relaxed">
                  {active.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
