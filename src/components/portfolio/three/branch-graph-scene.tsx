"use client";

import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { lazy, Suspense, useMemo, useRef } from "react";
import {
  Color,
  CubicBezierCurve3,
  CurvePath,
  LineCurve3,
  MathUtils,
  Vector3,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
} from "three";

import {
  branchCommits,
  branchLanes,
  branchMerges,
  laneById,
  pulseMerges,
  releaseTag,
  type BranchMerge,
  type LaneId,
} from "@/components/portfolio/three/branch-graph-fallback";
import { scenePalette } from "@/components/portfolio/three/palette";
import type { SceneRenderProps } from "@/components/portfolio/three/scene-frame";
import { usePointer } from "@/components/portfolio/three/use-pointer";

// Postprocessing is only downloaded when the high tier actually needs it.
const SceneBloom = lazy(() => import("@/components/portfolio/three/scene-bloom"));

const BASE_TILT = -0.12;
const BASE_TURN = 0.14;
// Room reserved left of the lanes for the DOM branch labels, in CSS pixels.
const LABEL_PX = 100;
const COMPACT_LABEL_PX = 66;
// Below this canvas width (phones) the DOM labels shrink so they do not overlap the lanes.
const COMPACT_WIDTH = 640;
const compactLabel = { fontSize: "0.625rem", padding: "0.05rem 0.3rem" } as const;
const GRAPH_MIN_X = -4.2;
const GRAPH_MAX_X = releaseTag.x + 0.6;
const GRAPH_HEIGHT = 2.9;
const TRAVEL_SECONDS = 7;
const CYCLE_SECONDS = 10;
const TRAIL = [0, 0.012, 0.024, 0.036];

const emerald = new Color(scenePalette.emerald);
const cyan = new Color(scenePalette.cyan);
const backdrop = new Color(scenePalette.background);

function lanePoint(id: LaneId, x: number) {
  const lane = laneById(id);
  return new Vector3(x, lane.y, lane.z);
}

function mergeCurve({ from, fromX, to, toX }: BranchMerge) {
  const start = lanePoint(from, fromX);
  const end = lanePoint(to, toX);
  const bend = (toX - fromX) * 0.6;
  return new CubicBezierCurve3(
    start,
    new Vector3(start.x + bend, start.y, start.z),
    new Vector3(end.x - bend, end.y, end.z),
    end,
  );
}

// Route of the release pulse: along each lane, then up through every promotion merge.
function buildPulseRoute() {
  const route = new CurvePath<Vector3>();
  let cursor = lanePoint("feature", laneById("feature").start);
  for (const merge of pulseMerges) {
    route.add(new LineCurve3(cursor, lanePoint(merge.from, merge.fromX)));
    route.add(mergeCurve(merge));
    cursor = lanePoint(merge.to, merge.toX);
  }
  route.add(new LineCurve3(cursor, lanePoint(releaseTag.lane, releaseTag.x)));
  return route;
}

// Scales the graph down on narrow canvases so it and its fixed-size labels always fit.
function useGraphFit() {
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);
  const compact = size.width < COMPACT_WIDTH;
  const labelWorld = ((compact ? COMPACT_LABEL_PX : LABEL_PX) * viewport.width) / Math.max(size.width, 1);
  const span = GRAPH_MAX_X - GRAPH_MIN_X;
  const scale = Math.min(1, (viewport.width * 0.94 - labelWorld) / span, (viewport.height * 0.86) / GRAPH_HEIGHT);
  const offsetX = -(scale * GRAPH_MIN_X - labelWorld + scale * GRAPH_MAX_X) / 2;
  return { scale, offsetX, compact };
}

function BranchLines({ segments, compact }: { segments: number; compact: boolean }) {
  const merges = useMemo(
    () => branchMerges.map((merge) => ({ merge, points: mergeCurve(merge).getPoints(segments) })),
    [segments],
  );

  return (
    <>
      {branchLanes.map((lane) => (
        <group key={lane.id}>
          <Line
            points={[lanePoint(lane.id, lane.start), lanePoint(lane.id, lane.end)]}
            color={lane.accent}
            lineWidth={1.6}
            transparent
            opacity={0.85}
            toneMapped={false}
          />
          <Html position={[lane.start - 0.14, lane.y, lane.z]} pointerEvents="none" zIndexRange={[1, 0]}>
            <span className="scene-label" style={{ borderColor: lane.accent, ...(compact ? compactLabel : null) }}>{lane.id}</span>
          </Html>
        </group>
      ))}
      {merges.map(({ merge, points }) => (
        <Line
          key={`${merge.from}-${merge.fromX}`}
          points={points}
          color={laneById(merge.to).accent}
          lineWidth={1.6}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      ))}
    </>
  );
}

function CommitGems() {
  return (
    <>
      {branchCommits.map(({ lane, x }) => {
        const accent = laneById(lane).accent;
        return (
          <mesh key={`${lane}-${x}`} position={lanePoint(lane, x)} rotation={[0.4, x, 0]}>
            <icosahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color={scenePalette.panel}
              emissive={accent}
              emissiveIntensity={0.7}
              metalness={0.3}
              roughness={0.3}
              flatShading
            />
          </mesh>
        );
      })}
    </>
  );
}

function ReleaseGraph({ animate, segments }: { animate: boolean; segments: number }) {
  const graph = useRef<Group>(null);
  const trail = useRef<(Mesh | null)[]>([]);
  const tag = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  const tagLabel = useRef<HTMLSpanElement>(null);
  const pointer = usePointer(animate);
  const route = useMemo(() => buildPulseRoute(), []);
  const fit = useGraphFit();
  const tagPosition = lanePoint(releaseTag.lane, releaseTag.x);

  useFrame(({ clock }, delta) => {
    const group = graph.current;
    if (!group || !animate) return;

    const time = clock.elapsedTime;
    const ease = 1 - Math.exp(-delta * 2.5);
    group.rotation.y = MathUtils.lerp(group.rotation.y, BASE_TURN + Math.sin(time * 0.15) * 0.06 + pointer.current.x * 0.12, ease);
    group.rotation.x = MathUtils.lerp(group.rotation.x, BASE_TILT + pointer.current.y * 0.06, ease);

    const phase = time % CYCLE_SECONDS;
    const travelling = phase < TRAVEL_SECONDS;
    const progress = MathUtils.smootherstep(Math.min(phase / TRAVEL_SECONDS, 1), 0, 1);
    trail.current.forEach((mesh, index) => {
      if (!mesh) return;
      const at = progress - TRAIL[index];
      mesh.visible = travelling && at > 0;
      if (!mesh.visible) return;
      route.getPointAt(at, mesh.position);
      (mesh.material as MeshBasicMaterial).color.lerpColors(emerald, cyan, MathUtils.smoothstep(at, 0.7, 0.85));
    });

    // Flash at the production tag once the pulse arrives, then fade out before the next loop.
    const flash = travelling ? 0 : Math.exp(-(phase - TRAVEL_SECONDS) * 1.6);
    tag.current?.scale.setScalar(1 + flash * 0.45);
    tag.current?.rotateY(delta * 0.5);
    if (ring.current) {
      // Fades toward the site background instead of using alpha: low-alpha pixels turn into a
      // dark halo once bloom composites the transparent canvas.
      ring.current.visible = flash > 0.02;
      ring.current.scale.setScalar(1 + (1 - flash) * 1.4);
      (ring.current.material as MeshBasicMaterial).color.lerpColors(backdrop, cyan, flash * 0.8);
    }
    if (tagLabel.current) {
      tagLabel.current.style.boxShadow = `0 0 ${Math.round(flash * 18)}px rgba(121, 223, 242, ${(flash * 0.7).toFixed(2)})`;
    }
  });

  return (
    <group position={[fit.offsetX, 0, 0]} scale={fit.scale}>
      <group ref={graph} rotation={[BASE_TILT, BASE_TURN, 0]}>
        <BranchLines segments={segments} compact={fit.compact} />
        <CommitGems />
        {TRAIL.map((offset, index) => (
          <mesh
            key={offset}
            ref={(node) => {
              trail.current[index] = node;
            }}
            scale={1 - index * 0.2}
            visible={false}
          >
            <sphereGeometry args={[0.075, 12, 8]} />
            <meshBasicMaterial color={scenePalette.emerald} transparent opacity={1 - index * 0.22} toneMapped={false} />
          </mesh>
        ))}
        <mesh ref={tag} position={tagPosition}>
          <octahedronGeometry args={[0.17, 0]} />
          <meshBasicMaterial color={scenePalette.cyan} toneMapped={false} />
        </mesh>
        <mesh ref={ring} position={tagPosition}>
          <ringGeometry args={[0.22, 0.25, segments]} />
          {/* Static frames (reduced motion) keep a soft halo so the destination still reads as live. */}
          <meshBasicMaterial
            color={animate ? scenePalette.background : backdrop.clone().lerp(cyan, 0.5)}
            toneMapped={false}
          />
        </mesh>
        <Html position={[tagPosition.x, tagPosition.y + 0.32, tagPosition.z]} pointerEvents="none" zIndexRange={[1, 0]}>
          <span
            ref={tagLabel}
            className="scene-label"
            style={{
              borderColor: scenePalette.cyan,
              color: scenePalette.cyan,
              transform: "translate(-50%, -100%)",
              ...(fit.compact ? compactLabel : null),
            }}
          >
            {releaseTag.label}
          </span>
        </Html>
      </group>
    </group>
  );
}

export default function BranchGraphScene({ reducedMotion, quality, active, onReady }: SceneRenderProps) {
  const highQuality = quality === "high";

  return (
    <Canvas
      dpr={highQuality ? [1, 2] : [1, 1.25]}
      // Reduced motion or an off-screen scene only renders on demand (a single static frame).
      frameloop={reducedMotion || !active ? "demand" : "always"}
      camera={{ position: [0, 0, 7.6], fov: 30 }}
      gl={{ alpha: true, antialias: highQuality, powerPreference: "low-power" }}
      onCreated={() => onReady()}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color={scenePalette.cyan} />
      <ReleaseGraph animate={!reducedMotion} segments={highQuality ? 48 : 16} />
      {highQuality ? (
        <Suspense fallback={null}>
          <SceneBloom />
        </Suspense>
      ) : null}
    </Canvas>
  );
}
