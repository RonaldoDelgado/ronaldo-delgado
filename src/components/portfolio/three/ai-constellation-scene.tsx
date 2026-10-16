"use client";

import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { lazy, Suspense, useMemo, useRef, type ComponentRef } from "react";
import {
  Color,
  MathUtils,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshStandardMaterial,
} from "three";

import {
  constellationEdges,
  constellationNodes,
  edgeKey,
  nodeById,
  requestPath,
  routeNodeIds,
  STATIC_ROUTE_INDEX,
  type ConstellationNodeId,
} from "@/components/portfolio/three/ai-constellation-fallback";
import { scenePalette } from "@/components/portfolio/three/palette";
import type { SceneRenderProps } from "@/components/portfolio/three/scene-frame";
import { usePointer } from "@/components/portfolio/three/use-pointer";

// Postprocessing is only downloaded when the high tier actually needs it.
const SceneBloom = lazy(() => import("@/components/portfolio/three/scene-bloom"));

const SEGMENT_SECONDS = 0.95;
const HOLD_SECONDS = 1.1;
const SEGMENTS = 3;
const CYCLE_SECONDS = SEGMENTS * SEGMENT_SECONDS + HOLD_SECONDS;
// Widest extent of the graph including labels, used to keep it inside narrow canvases.
const GRAPH_WIDTH = 6.9;

const emerald = new Color(scenePalette.emerald);
const cyan = new Color(scenePalette.cyan);

type LineRef = ComponentRef<typeof Line>;
type NodeRefs = { core: MeshStandardMaterial | null; wire: MeshBasicMaterial | null };

// Deterministic pseudo-random dust so every render (and the static frame) looks identical.
function useDust(count: number) {
  return useMemo(() => {
    let seed = 7;
    const next = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (next() - 0.5) * 7.6;
      positions[index * 3 + 1] = (next() - 0.5) * 4.2;
      positions[index * 3 + 2] = -0.6 - next() * 1.8;
    }
    return positions;
  }, [count]);
}

/** Path progress in segments (0..3) and the route the current request takes. */
function requestState(time: number) {
  const cycle = Math.floor(time / CYCLE_SECONDS);
  const progress = Math.min((time - cycle * CYCLE_SECONDS) / SEGMENT_SECONDS, SEGMENTS);
  return { routeIndex: cycle % routeNodeIds.length, progress };
}

function Constellation({ animate, dustCount, compactLabels }: { animate: boolean; dustCount: number; compactLabels: boolean }) {
  const graph = useRef<Group>(null);
  const pulse = useRef<Mesh>(null);
  const nodes = useRef<Partial<Record<ConstellationNodeId, NodeRefs>>>({});
  const edges = useRef<Record<string, LineRef | null>>({});
  const glow = useRef<Record<string, number>>({});
  const pointer = usePointer(animate);
  const dust = useDust(dustCount);
  const viewportWidth = useThree((state) => state.viewport.width);
  const scale = Math.min(1, viewportWidth / GRAPH_WIDTH);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;
    const { routeIndex, progress } = animate ? requestState(time) : { routeIndex: STATIC_ROUTE_INDEX, progress: SEGMENTS };
    const path = requestPath(routeIndex);
    const ease = animate ? 1 - Math.exp(-delta * 6) : 1;

    const litNodes = new Set(path.filter((_, index) => progress >= index).map((node) => node.id));
    const litEdges = new Set(
      path.slice(1).flatMap((node, index) => (progress > index ? [edgeKey({ from: path[index].id, to: node.id })] : [])),
    );

    // Each element fades toward its lit state, so the trail dims softly once the next request starts.
    const blend = (key: string, lit: boolean) => {
      const value = MathUtils.lerp(glow.current[key] ?? 0, lit ? 1 : 0, ease);
      glow.current[key] = value;
      return value;
    };

    constellationNodes.forEach((node) => {
      const refs = nodes.current[node.id];
      const value = blend(node.id, litNodes.has(node.id));
      if (refs?.core) {
        refs.core.emissive.lerpColors(emerald, cyan, value);
        refs.core.emissiveIntensity = 0.12 + value * 0.55;
      }
      if (refs?.wire) {
        refs.wire.color.lerpColors(emerald, cyan, value);
        refs.wire.opacity = 0.55 + value * 0.45;
      }
    });

    constellationEdges.forEach((edge) => {
      const key = edgeKey(edge);
      const material = edges.current[key]?.material;
      const value = blend(key, litEdges.has(key));
      if (material) {
        material.color.lerpColors(emerald, cyan, value);
        material.opacity = 0.28 + value * 0.67;
      }
    });

    const dot = pulse.current;
    if (dot) {
      const traveling = animate && progress < SEGMENTS;
      dot.visible = traveling;
      if (traveling) {
        const segment = Math.floor(progress);
        const from = path[segment].position;
        const to = path[segment + 1].position;
        const t = MathUtils.smoothstep(progress - segment, 0, 1);
        dot.position.set(
          MathUtils.lerp(from[0], to[0], t),
          MathUtils.lerp(from[1], to[1], t),
          MathUtils.lerp(from[2], to[2], t),
        );
      }
    }

    const group = graph.current;
    if (!group) return;
    if (!animate) {
      group.rotation.set(0.06, -0.14, 0);
      group.position.y = 0;
      return;
    }
    group.rotation.y = MathUtils.lerp(group.rotation.y, -0.14 + Math.sin(time * 0.14) * 0.12 + pointer.current.x * 0.14, ease * 0.4);
    group.rotation.x = MathUtils.lerp(group.rotation.x, 0.06 + pointer.current.y * 0.07, ease * 0.4);
    group.position.y = Math.sin(time * 0.45) * 0.04;
  });

  const labelSize = compactLabels ? "0.62rem" : "0.7rem";

  return (
    <group ref={graph} scale={scale} rotation={[0.06, -0.14, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial color={scenePalette.emerald} size={0.035} transparent opacity={0.45} depthWrite={false} />
      </points>

      {constellationEdges.map((edge) => {
        const key = edgeKey(edge);
        const from = nodeById(edge.from).position;
        const to = nodeById(edge.to).position;
        return (
          <Line
            key={key}
            ref={(line) => {
              edges.current[key] = line;
            }}
            points={[from, to]}
            color={scenePalette.emerald}
            lineWidth={1.2}
            transparent
            opacity={0.28}
            toneMapped={false}
          />
        );
      })}

      {constellationNodes.map((node) => (
        <group key={node.id} position={node.position}>
          <mesh>
            <icosahedronGeometry args={[node.radius, 0]} />
            <meshStandardMaterial
              ref={(material) => {
                nodes.current[node.id] = { ...nodes.current[node.id], core: material, wire: nodes.current[node.id]?.wire ?? null };
              }}
              color={scenePalette.panel}
              emissive={scenePalette.emerald}
              emissiveIntensity={0.12}
              metalness={0.3}
              roughness={0.35}
              flatShading
            />
          </mesh>
          {/* Wireframe shell: on a detail-0 icosahedron every edge is a facet edge, the low-poly neon look. */}
          <mesh scale={1.04}>
            <icosahedronGeometry args={[node.radius, 0]} />
            <meshBasicMaterial
              ref={(material) => {
                nodes.current[node.id] = { ...nodes.current[node.id], wire: material, core: nodes.current[node.id]?.core ?? null };
              }}
              color={scenePalette.emerald}
              wireframe
              transparent
              opacity={0.55}
              toneMapped={false}
            />
          </mesh>
          <Html pointerEvents="none" zIndexRange={[1, 0]}>
            <span
              className="scene-label"
              style={{
                borderColor: "rgba(98, 232, 189, 0.45)",
                fontSize: labelSize,
                padding: "0.1rem 0.4rem",
                transform:
                  node.labelPlacement === "above"
                    ? "translate(-50%, calc(-100% - 0.6rem))"
                    : "translate(-50%, 0.75rem)",
              }}
            >
              {node.label}
            </span>
          </Html>
        </group>
      ))}

      <mesh ref={pulse} visible={false}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={scenePalette.cyan} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function AiConstellationScene({ reducedMotion, quality, active, onReady }: SceneRenderProps) {
  const highQuality = quality === "high";

  return (
    <Canvas
      dpr={highQuality ? [1, 2] : [1, 1.25]}
      // Reduced motion or an off-screen scene only renders on demand (a single static frame).
      frameloop={reducedMotion || !active ? "demand" : "always"}
      camera={{ position: [0, 0, 7], fov: 34 }}
      gl={{ alpha: true, antialias: highQuality, powerPreference: "low-power" }}
      onCreated={() => onReady()}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 4, 5]} intensity={1} color={scenePalette.cyan} />
      <pointLight position={[-3, -1, 3]} intensity={5} color={scenePalette.emerald} />
      <Constellation animate={!reducedMotion} dustCount={highQuality ? 120 : 40} compactLabels={!highQuality} />
      {highQuality ? (
        <Suspense fallback={null}>
          <SceneBloom />
        </Suspense>
      ) : null}
    </Canvas>
  );
}
