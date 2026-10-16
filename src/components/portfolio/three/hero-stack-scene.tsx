"use client";

import { Edges, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { lazy, Suspense, useRef } from "react";
import { MathUtils, type Group } from "three";

import { scenePalette } from "@/components/portfolio/three/palette";
import { stackLayers } from "@/components/portfolio/three/scene-fallback";
import type { SceneRenderProps } from "@/components/portfolio/three/scene-frame";
import { usePointer } from "@/components/portfolio/three/use-pointer";

// Postprocessing is only downloaded when the high tier actually needs it.
const SceneBloom = lazy(() => import("@/components/portfolio/three/scene-bloom"));

const PLATE_SIZE: [number, number, number] = [2.6, 0.07, 1.7];
const PLATE_GAP = 0.72;
const PLATE_GAP_HOVER = 0.92;
const BASE_TILT = 0.42;
const BASE_TURN = -0.62;

function plateY(index: number, gap: number) {
  return ((stackLayers.length - 1) / 2 - index) * gap;
}

function LayeredStack({ animate }: { animate: boolean }) {
  const stack = useRef<Group>(null);
  const plates = useRef<(Group | null)[]>([]);
  const hovered = useRef(false);
  const pointer = usePointer(animate);

  useFrame(({ clock }, delta) => {
    const group = stack.current;
    if (!group) return;

    if (!animate) {
      group.rotation.set(BASE_TILT, BASE_TURN, 0);
      plates.current.forEach((plate, index) => plate?.position.setY(plateY(index, PLATE_GAP)));
      return;
    }

    const time = clock.elapsedTime;
    const ease = 1 - Math.exp(-delta * 3);
    const turn = BASE_TURN + Math.sin(time * 0.18) * 0.2 + pointer.current.x * 0.22;
    const tilt = BASE_TILT + pointer.current.y * 0.08;
    group.rotation.y = MathUtils.lerp(group.rotation.y, turn, ease);
    group.rotation.x = MathUtils.lerp(group.rotation.x, tilt, ease);
    group.position.y = Math.sin(time * 0.6) * 0.06;

    const gap = hovered.current ? PLATE_GAP_HOVER : PLATE_GAP;
    plates.current.forEach((plate, index) => {
      if (plate) plate.position.y = MathUtils.lerp(plate.position.y, plateY(index, gap), ease);
    });
  });

  return (
    <group
      ref={stack}
      position={[0.2, 0, 0]}
      rotation={[BASE_TILT, BASE_TURN, 0]}
      onPointerOver={() => (hovered.current = true)}
      onPointerOut={() => (hovered.current = false)}
    >
      {stackLayers.map((label, index) => {
        const accent = index === 0 ? scenePalette.cyan : scenePalette.emerald;
        return (
          <group
            key={label}
            ref={(node) => {
              plates.current[index] = node;
            }}
            position={[0, plateY(index, PLATE_GAP), 0]}
          >
            <mesh>
              <boxGeometry args={PLATE_SIZE} />
              <meshStandardMaterial
                color={scenePalette.panel}
                emissive={accent}
                emissiveIntensity={0.04}
                metalness={0.35}
                roughness={0.22}
                transparent
                opacity={0.78}
              />
              <Edges color={accent} lineWidth={1.5} toneMapped={false} />
            </mesh>
            {/* Anchored to the left-most corner so labels stay visible beside the profile photo. */}
            <Html position={[-PLATE_SIZE[0] / 2 - 0.08, 0, PLATE_SIZE[2] / 2]} pointerEvents="none" zIndexRange={[1, 0]}>
              <span className="scene-label" style={{ borderColor: accent }}>{label}</span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function HeroStackScene({ reducedMotion, quality, active, onReady }: SceneRenderProps) {
  const highQuality = quality === "high";

  return (
    <Canvas
      dpr={highQuality ? [1, 2] : [1, 1.25]}
      // Reduced motion or an off-screen scene only renders on demand (a single static frame).
      frameloop={reducedMotion || !active ? "demand" : "always"}
      camera={{ position: [0, 0, 6.6], fov: 34 }}
      gl={{ alpha: true, antialias: highQuality, powerPreference: "low-power" }}
      onCreated={() => onReady()}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color={scenePalette.cyan} />
      <pointLight position={[-3, -1, 2.5]} intensity={6} color={scenePalette.emerald} />
      <LayeredStack animate={!reducedMotion} />
      {highQuality ? (
        <Suspense fallback={null}>
          <SceneBloom />
        </Suspense>
      ) : null}
    </Canvas>
  );
}
