import { scenePalette } from "@/components/portfolio/three/palette";

// Shared graph model: world units used by the 3D scene and projected by the SVG fallback.
export type LaneId = "feature" | "develop" | "staging" | "main";

export type BranchLane = {
  id: LaneId;
  y: number;
  z: number;
  start: number;
  end: number;
  accent: string;
};

export type BranchMerge = {
  from: LaneId;
  fromX: number;
  to: LaneId;
  toX: number;
};

export const branchLanes: readonly BranchLane[] = [
  { id: "feature", y: -1.05, z: 0.45, start: -3.4, end: -2.1, accent: scenePalette.emerald },
  { id: "develop", y: -0.35, z: 0.15, start: -4.2, end: 3.1, accent: scenePalette.emerald },
  { id: "staging", y: 0.35, z: -0.15, start: -4.2, end: 3.1, accent: scenePalette.emerald },
  { id: "main", y: 1.05, z: -0.45, start: -4.2, end: 3.6, accent: scenePalette.cyan },
];

// The first merge branches the feature off develop; the rest promote it up to main.
export const branchMerges: readonly BranchMerge[] = [
  { from: "develop", fromX: -4.0, to: "feature", toX: -3.4 },
  { from: "feature", fromX: -2.1, to: "develop", toX: -1.4 },
  { from: "develop", fromX: -0.6, to: "staging", toX: 0.1 },
  { from: "staging", fromX: 0.9, to: "main", toX: 1.6 },
];

// Merges travelled by the release pulse, in order (feature → develop → staging → main).
export const pulseMerges = branchMerges.slice(1);

export const branchCommits: readonly { lane: LaneId; x: number }[] = [
  { lane: "feature", x: -3.4 },
  { lane: "feature", x: -2.75 },
  { lane: "feature", x: -2.1 },
  { lane: "develop", x: -4.0 },
  { lane: "develop", x: -3.0 },
  { lane: "develop", x: -1.4 },
  { lane: "develop", x: -0.6 },
  { lane: "develop", x: 1.0 },
  { lane: "develop", x: 2.3 },
  { lane: "staging", x: -3.5 },
  { lane: "staging", x: -1.9 },
  { lane: "staging", x: 0.1 },
  { lane: "staging", x: 0.9 },
  { lane: "staging", x: 2.4 },
  { lane: "main", x: -3.7 },
  { lane: "main", x: -1.2 },
  { lane: "main", x: 1.6 },
];

export const releaseTag = { lane: "main" as LaneId, x: 3.6, label: "producción" };

export function laneById(id: LaneId): BranchLane {
  const lane = branchLanes.find((candidate) => candidate.id === id);
  if (!lane) throw new Error(`Unknown lane ${id}`);
  return lane;
}

// Oblique projection that roughly matches the 3D framing so the swap to WebGL does not jump.
function project(x: number, lane: BranchLane): [number, number] {
  return [440 + x * 80 - lane.z * 40, 175 - lane.y * 88 + lane.z * 10];
}

function mergePath({ from, fromX, to, toX }: BranchMerge) {
  const [x0, y0] = project(fromX, laneById(from));
  const [x1, y1] = project(toX, laneById(to));
  const bend = (x1 - x0) * 0.6;
  return `M ${x0} ${y0} C ${x0 + bend} ${y0} ${x1 - bend} ${y1} ${x1} ${y1}`;
}

function mergeAccent(merge: BranchMerge) {
  return laneById(merge.to).accent;
}

// Static version of the release-flow graph: SSR output, loading state and no-WebGL fallback.
export function BranchGraphFallback() {
  const tagLane = laneById(releaseTag.lane);
  const [tagX, tagY] = project(releaseTag.x, tagLane);

  return (
    <svg viewBox="0 0 800 350" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="branch-fallback-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={scenePalette.cyan} stopOpacity="0.35" />
          <stop offset="100%" stopColor={scenePalette.cyan} stopOpacity="0" />
        </radialGradient>
      </defs>
      {branchLanes.map((lane) => {
        const [x0, y0] = project(lane.start, lane);
        const [x1, y1] = project(lane.end, lane);
        return (
          <g key={lane.id}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={lane.accent} strokeWidth="2" strokeOpacity="0.8" />
            <text
              className="stack-fallback-label"
              x={x0 - 12}
              y={y0 + 4}
              textAnchor="end"
              fill={scenePalette.text}
              fontSize="11"
            >
              {lane.id}
            </text>
          </g>
        );
      })}
      {branchMerges.map((merge) => (
        <path
          key={`${merge.from}-${merge.fromX}`}
          d={mergePath(merge)}
          fill="none"
          stroke={mergeAccent(merge)}
          strokeWidth="2"
          strokeOpacity="0.8"
        />
      ))}
      {branchCommits.map(({ lane: laneId, x }) => {
        const lane = laneById(laneId);
        const [cx, cy] = project(x, lane);
        return (
          <circle
            key={`${laneId}-${x}`}
            cx={cx}
            cy={cy}
            r="5"
            fill={scenePalette.panel}
            stroke={lane.accent}
            strokeWidth="2"
          />
        );
      })}
      <circle cx={tagX} cy={tagY} r="34" fill="url(#branch-fallback-glow)" />
      <path
        d={`M ${tagX} ${tagY - 10} L ${tagX + 10} ${tagY} L ${tagX} ${tagY + 10} L ${tagX - 10} ${tagY} Z`}
        fill={scenePalette.cyan}
      />
      <text
        className="stack-fallback-label"
        x={tagX}
        y={tagY - 22}
        textAnchor="middle"
        fill={scenePalette.cyan}
        fontSize="11"
      >
        {releaseTag.label}
      </text>
    </svg>
  );
}
