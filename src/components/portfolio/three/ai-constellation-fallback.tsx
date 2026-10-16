import { scenePalette } from "@/components/portfolio/three/palette";

export type ConstellationNodeId =
  | "consulta"
  | "clasificador"
  | "lectura"
  | "conocimiento"
  | "guesty"
  | "aclaracion"
  | "auditoria";

export type ConstellationNode = {
  id: ConstellationNodeId;
  label: string;
  position: [number, number, number];
  radius: number;
  labelPlacement: "above" | "below";
};

// Shared graph of the assistant router: the WebGL scene and the SVG fallback draw the same layout.
export const constellationNodes: readonly ConstellationNode[] = [
  { id: "consulta", label: "consulta", position: [-2.7, 0, 0], radius: 0.2, labelPlacement: "below" },
  { id: "clasificador", label: "clasificador", position: [-1, 0, 0.2], radius: 0.26, labelPlacement: "below" },
  { id: "lectura", label: "herramientas de solo lectura", position: [0.7, 1.35, 0.25], radius: 0.16, labelPlacement: "above" },
  { id: "conocimiento", label: "conocimiento aprobado", position: [0.7, 0.45, -0.2], radius: 0.16, labelPlacement: "above" },
  { id: "guesty", label: "Guesty", position: [0.7, -0.45, 0.2], radius: 0.16, labelPlacement: "above" },
  { id: "aclaracion", label: "aclaración", position: [0.7, -1.35, -0.25], radius: 0.16, labelPlacement: "above" },
  { id: "auditoria", label: "auditoría", position: [2.8, 0, 0], radius: 0.13, labelPlacement: "below" },
];

export const routeNodeIds = ["lectura", "conocimiento", "guesty", "aclaracion"] as const satisfies readonly ConstellationNodeId[];

export type ConstellationEdge = { from: ConstellationNodeId; to: ConstellationNodeId };

export const constellationEdges: readonly ConstellationEdge[] = [
  { from: "consulta", to: "clasificador" },
  ...routeNodeIds.map((route) => ({ from: "clasificador" as const, to: route })),
  ...routeNodeIds.map((route) => ({ from: route, to: "auditoria" as const })),
];

export function edgeKey(edge: ConstellationEdge) {
  return `${edge.from}-${edge.to}`;
}

export function nodeById(id: ConstellationNodeId): ConstellationNode {
  const node = constellationNodes.find((candidate) => candidate.id === id);
  if (!node) throw new Error(`Unknown constellation node: ${id}`);
  return node;
}

// A request always travels consulta → clasificador → one route → auditoría.
export function requestPath(routeIndex: number): ConstellationNode[] {
  const route = routeNodeIds[routeIndex % routeNodeIds.length];
  return [nodeById("consulta"), nodeById("clasificador"), nodeById(route), nodeById("auditoria")];
}

// The static frame (reduced motion, fallback) highlights the read-only tools route.
export const STATIC_ROUTE_INDEX = 0;

const SVG_SCALE = 84;
const SVG_CENTER_X = 320;
const SVG_CENTER_Y = 180;

function toSvg([x, y]: [number, number, number]) {
  return { x: SVG_CENTER_X + x * SVG_SCALE, y: SVG_CENTER_Y - y * SVG_SCALE };
}

function hexagonPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 3) * index + Math.PI / 6;
    return `${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`;
  }).join(" ");
}

// Static 2D version of the constellation: SSR output, loading state and no-WebGL fallback.
export function ConstellationFallback() {
  const highlighted = requestPath(STATIC_ROUTE_INDEX);
  const highlightedNodes = new Set(highlighted.map((node) => node.id));
  const highlightedEdges = new Set(
    highlighted.slice(1).map((node, index) => edgeKey({ from: highlighted[index].id, to: node.id })),
  );

  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" overflow="visible" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="constellation-fallback-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={scenePalette.emerald} stopOpacity="0.12" />
          <stop offset="100%" stopColor={scenePalette.emerald} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={SVG_CENTER_X} cy={SVG_CENTER_Y} rx="320" ry="180" fill="url(#constellation-fallback-glow)" />
      {constellationEdges.map((edge) => {
        const from = toSvg(nodeById(edge.from).position);
        const to = toSvg(nodeById(edge.to).position);
        const active = highlightedEdges.has(edgeKey(edge));
        return (
          <line
            key={edgeKey(edge)}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={active ? scenePalette.cyan : scenePalette.emerald}
            strokeOpacity={active ? 0.95 : 0.35}
            strokeWidth={active ? 1.6 : 1}
          />
        );
      })}
      {constellationNodes.map((node) => {
        const { x, y } = toSvg(node.position);
        const r = node.radius * SVG_SCALE;
        const accent = highlightedNodes.has(node.id) ? scenePalette.cyan : scenePalette.emerald;
        const labelY = node.labelPlacement === "above" ? y - r - 8 : y + r + 15;
        return (
          <g key={node.id}>
            <polygon points={hexagonPoints(x, y, r)} fill={scenePalette.panel} stroke={accent} strokeWidth="1.5" />
            <polygon points={hexagonPoints(x, y, r * 0.45)} fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
            <text
              className="stack-fallback-label"
              x={x}
              y={labelY}
              textAnchor="middle"
              fill={scenePalette.text}
              fontSize="11"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
