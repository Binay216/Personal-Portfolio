"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";

type Framing = "head" | "bust" | "full";

const FRAMING_PRESETS: Record<
  Framing,
  {
    cameraPos: [number, number, number];
    target: [number, number, number];
    fov: number;
  }
> = {
  head: { cameraPos: [0, 1.62, 0.75], target: [0, 1.58, 0], fov: 22 },
  bust: { cameraPos: [0, 1.45, 1.5], target: [0, 1.35, 0], fov: 30 },
  full: { cameraPos: [0, 1.0, 3.2], target: [0, 0.85, 0], fov: 36 },
};

const TARGET_HEIGHT = 1.7;

function Model({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url);

  const cloned = useMemo(() => skeletonClone(scene), [scene]);

  const { offset, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const s = size.y > 0.01 ? TARGET_HEIGHT / size.y : 1;
    return {
      scale: s,
      offset: [-center.x * s, -box.min.y * s, -center.z * s] as [
        number,
        number,
        number,
      ],
    };
  }, [cloned]);

  cloned.traverse((c) => {
    const mesh = c as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  const groupRef = useRef<THREE.Group>(null!);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!names.length) return;
    const idleName =
      names.find((n) => /idle/i.test(n)) ??
      names.find((n) => /breath/i.test(n)) ??
      names[0];
    const action = actions[idleName];
    if (action) {
      action.reset().fadeIn(0.4).play();
      action.timeScale = 0.85;
    }
    return () => {
      if (action) action.fadeOut(0.2).stop();
    };
  }, [actions, names]);

  const floatRef = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(performance.now() / 1100) * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={floatRef}>
        <group position={offset} scale={scale}>
          <primitive object={cloned} />
        </group>
      </group>
    </group>
  );
}

function CameraRig({
  position,
  target,
}: {
  position: [number, number, number];
  target: [number, number, number];
}) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(...target);
  }, [camera, position, target]);
  return null;
}

export default function Avatar3D({
  url,
  framing = "bust",
  className,
}: {
  url: string;
  framing?: Framing;
  className?: string;
}) {
  const c = FRAMING_PRESETS[framing];

  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: c.cameraPos, fov: c.fov, near: 0.1, far: 100 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true }}
      >
        <CameraRig position={c.cameraPos} target={c.target} />
        <ambientLight intensity={0.18} />
        <pointLight
          position={[-2.4, 1.6, 1.3]}
          intensity={9}
          distance={8}
          color="#2dd4a8"
        />
        <pointLight
          position={[2.4, 1.5, 1.3]}
          intensity={9}
          distance={8}
          color="#ff6bb5"
        />
        <pointLight
          position={[0, 3.2, 1.6]}
          intensity={2.2}
          distance={9}
          color="#ffffff"
        />
        <Suspense fallback={null}>
          <Model url={url} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const preloadAvatar = (url: string) => {
  if (url) useGLTF.preload(url);
};
