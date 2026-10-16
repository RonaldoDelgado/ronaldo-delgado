"use client";

import { Line, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { lazy, Suspense, useEffect, useMemo, useRef } from "react";
import { MathUtils, SRGBColorSpace, type Group, type Texture } from "three";

import { scenePalette } from "@/components/portfolio/three/palette";
import type { PhoneScreenProps } from "@/components/portfolio/three/phone-showcase-fallback";
import type { SceneRenderProps } from "@/components/portfolio/three/scene-frame";
import { usePointer } from "@/components/portfolio/three/use-pointer";

// Postprocessing is only downloaded when the high tier actually needs it.
const SceneBloom = lazy(() => import("@/components/portfolio/three/scene-bloom"));

const BODY: [number, number, number] = [1.5, 3.1, 0.16];
const BODY_RADIUS = 0.2;
const BEZEL = 0.07;
const SCREEN_WIDTH = BODY[0] - BEZEL * 2;
const SCREEN_HEIGHT = BODY[1] - BEZEL * 2;
const SCREEN_RADIUS = BODY_RADIUS - BEZEL / 2;
const FRONT_Z = BODY[2] / 2;
const BASE_TILT_X = -0.12;
const BASE_TURN_Y = 0.42;
const BASE_ROLL_Z = 0.12;

// Closed rounded-rectangle outline in the XY plane, used for the neon bezel lines.
function roundedRectPoints(width: number, height: number, radius: number, z: number, segments = 8) {
  const points: [number, number, number][] = [];
  const corners: [number, number, number][] = [
    [width / 2 - radius, height / 2 - radius, 0],
    [-width / 2 + radius, height / 2 - radius, Math.PI / 2],
    [-width / 2 + radius, -height / 2 + radius, Math.PI],
    [width / 2 - radius, -height / 2 + radius, (Math.PI * 3) / 2],
  ];
  corners.forEach(([cx, cy, start]) => {
    for (let step = 0; step <= segments; step += 1) {
      const angle = start + (step / segments) * (Math.PI / 2);
      points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, z]);
    }
  });
  points.push(points[0]);
  return points;
}

// Object-fit: cover on a clone, so the cached texture shared by useTexture is never mutated.
function useCoverTexture(source: Texture, focusX: number) {
  const map = useMemo(() => {
    const texture = source.clone();
    const image = texture.image as { width: number; height: number };
    const imageAspect = image.width / image.height;
    const screenAspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    texture.colorSpace = SRGBColorSpace;
    if (imageAspect > screenAspect) {
      texture.repeat.set(screenAspect / imageAspect, 1);
      texture.offset.set((1 - texture.repeat.x) * MathUtils.clamp(focusX, 0, 1), 0);
    } else {
      texture.repeat.set(1, imageAspect / screenAspect);
      texture.offset.set(0, (1 - texture.repeat.y) / 2);
    }
    texture.needsUpdate = true;
    return texture;
  }, [source, focusX]);

  useEffect(() => () => map.dispose(), [map]);
  return map;
}

function PhoneScreen({ screenSrc, screenFocusX = 0.5 }: Pick<PhoneScreenProps, "screenSrc" | "screenFocusX">) {
  const map = useCoverTexture(useTexture(screenSrc), screenFocusX);
  const outline = useMemo(() => roundedRectPoints(SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_RADIUS, 0, 6), []);

  return (
    <group position={[0, 0, FRONT_Z + 0.003]}>
      <mesh>
        <planeGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT]} />
        {/* Unlit and slightly dimmed so a bright capture reads as a lit screen without blooming. */}
        <meshBasicMaterial map={map} color="#c9d4d0" />
      </mesh>
      <Line points={outline} color={scenePalette.emerald} lineWidth={1} transparent opacity={0.35} toneMapped={false} />
    </group>
  );
}

// Fires once the screenshot has loaded, so the fallback only fades out when the phone is complete.
function ReadySignal({ onReady }: { onReady: () => void }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    invalidate();
    onReady();
  }, [invalidate, onReady]);
  return null;
}

type PhoneProps = Pick<PhoneScreenProps, "screenSrc" | "screenFocusX"> & { animate: boolean; onReady: () => void };

function Phone({ animate, onReady, ...screen }: PhoneProps) {
  const phone = useRef<Group>(null);
  const pointer = usePointer(animate);
  const bodyOutline = useMemo(() => roundedRectPoints(BODY[0], BODY[1], BODY_RADIUS, FRONT_Z + 0.004), []);

  useFrame(({ clock }, delta) => {
    const group = phone.current;
    if (!group) return;

    if (!animate) {
      group.rotation.set(BASE_TILT_X, BASE_TURN_Y, BASE_ROLL_Z);
      group.position.y = 0;
      return;
    }

    const time = clock.elapsedTime;
    const ease = 1 - Math.exp(-delta * 3);
    const turn = BASE_TURN_Y + Math.sin(time * 0.25) * 0.16 + pointer.current.x * 0.22;
    const tilt = BASE_TILT_X + pointer.current.y * 0.1;
    group.rotation.y = MathUtils.lerp(group.rotation.y, turn, ease);
    group.rotation.x = MathUtils.lerp(group.rotation.x, tilt, ease);
    group.rotation.z = BASE_ROLL_Z + Math.sin(time * 0.4) * 0.025;
    group.position.y = Math.sin(time * 0.7) * 0.07;
  });

  return (
    <group ref={phone} rotation={[BASE_TILT_X, BASE_TURN_Y, BASE_ROLL_Z]}>
      <RoundedBox args={BODY} radius={BODY_RADIUS * 0.4} smoothness={3}>
        <meshStandardMaterial
          color={scenePalette.panel}
          emissive={scenePalette.emerald}
          emissiveIntensity={0.03}
          metalness={0.55}
          roughness={0.2}
        />
      </RoundedBox>
      <Line points={bodyOutline} color={scenePalette.emerald} lineWidth={1.6} toneMapped={false} />
      <PhoneScreen {...screen} />
      {/* Camera notch with a tiny emerald lens. */}
      <group position={[0, SCREEN_HEIGHT / 2 - 0.12, FRONT_Z + 0.008]}>
        <RoundedBox args={[0.34, 0.08, 0.01]} radius={0.004} smoothness={2}>
          <meshBasicMaterial color={scenePalette.background} />
        </RoundedBox>
        <mesh position={[0.1, 0, 0.007]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color={scenePalette.emerald} toneMapped={false} />
        </mesh>
      </group>
      <ReadySignal onReady={onReady} />
    </group>
  );
}

type PhoneShowcaseSceneProps = SceneRenderProps & PhoneScreenProps;

export default function PhoneShowcaseScene({
  reducedMotion,
  quality,
  active,
  onReady,
  screenSrc,
  screenFocusX,
}: PhoneShowcaseSceneProps) {
  const highQuality = quality === "high";

  return (
    <Canvas
      dpr={highQuality ? [1, 2] : [1, 1.25]}
      // Reduced motion or an off-screen scene only renders on demand (a single static frame).
      frameloop={reducedMotion || !active ? "demand" : "always"}
      camera={{ position: [0, 0, 7.2], fov: 32 }}
      gl={{ alpha: true, antialias: highQuality, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color={scenePalette.cyan} />
      <pointLight position={[-2.5, -1.5, 2.5]} intensity={5} color={scenePalette.emerald} />
      {/* The screenshot suspends; the fallback stays visible until it has loaded. */}
      <Suspense fallback={null}>
        <Phone animate={!reducedMotion} onReady={onReady} screenSrc={screenSrc} screenFocusX={screenFocusX} />
      </Suspense>
      {highQuality ? (
        <Suspense fallback={null}>
          <SceneBloom />
        </Suspense>
      ) : null}
    </Canvas>
  );
}
