import { scenePalette } from "@/components/portfolio/three/palette";

export const stackLayers = ["UI", "API", "Base de datos", "Nube"] as const;

const PLATE_HALF_WIDTH = 155;
const PLATE_HALF_DEPTH = 40;
const PLATE_THICKNESS = 5;

function platePath(cx: number, cy: number) {
  return `M ${cx} ${cy - PLATE_HALF_DEPTH} L ${cx + PLATE_HALF_WIDTH} ${cy} L ${cx} ${cy + PLATE_HALF_DEPTH} L ${cx - PLATE_HALF_WIDTH} ${cy} Z`;
}

function plateSidePath(cx: number, cy: number) {
  const bottom = cy + PLATE_HALF_DEPTH;
  return `M ${cx - PLATE_HALF_WIDTH} ${cy} L ${cx} ${bottom} L ${cx + PLATE_HALF_WIDTH} ${cy} L ${cx + PLATE_HALF_WIDTH} ${cy + PLATE_THICKNESS} L ${cx} ${bottom + PLATE_THICKNESS} L ${cx - PLATE_HALF_WIDTH} ${cy + PLATE_THICKNESS} Z`;
}

// Static isometric version of the layered stack: SSR output, loading state and no-WebGL fallback.
export function StackFallback() {
  // Roughly matches the 3D framing so the swap to WebGL does not jump.
  const cx = 215;
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" overflow="visible" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="stack-fallback-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={scenePalette.emerald} stopOpacity="0.16" />
          <stop offset="100%" stopColor={scenePalette.emerald} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy="200" r="190" fill="url(#stack-fallback-glow)" />
      {stackLayers
        .map((label, index) => ({
          label,
          cy: 100 + index * 68,
          accent: index === 0 ? scenePalette.cyan : scenePalette.emerald,
        }))
        // Draw the bottom plate first so upper plates overlap it.
        .reverse()
        .map(({ label, cy, accent }) => (
          <g key={label}>
            <path d={plateSidePath(cx, cy)} fill={scenePalette.background} stroke={accent} strokeOpacity="0.45" strokeWidth="1" />
            <path d={platePath(cx, cy)} fill={scenePalette.panel} fillOpacity="0.88" stroke={accent} strokeWidth="1.5" />
            <text
              className="stack-fallback-label"
              x={cx - PLATE_HALF_WIDTH - 6}
              y={cy + 2.5}
              textAnchor="end"
              fill={scenePalette.text}
              fontSize="7.5"
            >
              {label}
            </text>
          </g>
        ))}
    </svg>
  );
}
