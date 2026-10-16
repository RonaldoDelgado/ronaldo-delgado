import { scenePalette } from "@/components/portfolio/three/palette";

import styles from "./data-flow-accent.module.css";

type DataFlowAccentProps = {
  className?: string;
  /** When set, the accent is exposed as an image with this accessible name; otherwise it is decorative. */
  label?: string;
};

// Database cylinder (left): top ellipse center, radii and body bottom.
const DB_CX = 62;
const DB_TOP = 34;
const DB_BOTTOM = 82;
const DB_RX = 34;
const DB_RY = 11;

// Isometric server box (right): top face center, half sizes and height.
const API_CX = 256;
const API_TOP = 40;
const API_HALF_WIDTH = 36;
const API_HALF_DEPTH = 18;
const API_HEIGHT = 36;

const dbLeft = DB_CX - DB_RX;
const dbRight = DB_CX + DB_RX;
const apiLeft = API_CX - API_HALF_WIDTH;
const apiRight = API_CX + API_HALF_WIDTH;
const apiFront = API_TOP + API_HALF_DEPTH;

function frontArc(y: number) {
  return `M ${dbLeft} ${y} A ${DB_RX} ${DB_RY} 0 0 0 ${dbRight} ${y}`;
}

const flows = [
  { d: "M 100 50 C 150 40, 180 42, 223 50", color: scenePalette.emerald, variant: "" },
  { d: "M 100 60 C 150 60, 180 60, 223 61", color: scenePalette.cyan, variant: styles.flowReverse },
  { d: "M 100 70 C 150 80, 180 78, 223 72", color: scenePalette.emerald, variant: styles.flowSlow },
];

// Server-renderable SVG accent: a PostgreSQL cylinder exchanging data with an API node.
export function DataFlowAccent({ className, label }: DataFlowAccentProps) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  return (
    <svg
      viewBox="0 0 320 120"
      className={className ? `${styles.root} ${className}` : styles.root}
      fill="none"
      focusable="false"
      {...a11y}
    >
      {flows.map(({ d, color, variant }) => (
        <g key={d}>
          <path d={d} stroke={color} strokeOpacity="0.18" strokeWidth="1" />
          <path d={d} className={`${styles.flow} ${variant}`} stroke={color} strokeWidth="2.4" />
        </g>
      ))}

      <g stroke={scenePalette.emerald} strokeWidth="1.25">
        <path
          d={`M ${dbLeft} ${DB_TOP} V ${DB_BOTTOM} A ${DB_RX} ${DB_RY} 0 0 0 ${dbRight} ${DB_BOTTOM} V ${DB_TOP}`}
          fill={scenePalette.panel}
          fillOpacity="0.9"
        />
        <path d={frontArc(50)} strokeOpacity="0.45" />
        <path d={frontArc(66)} strokeOpacity="0.45" />
        <ellipse cx={DB_CX} cy={DB_TOP} rx={DB_RX} ry={DB_RY} fill={scenePalette.background} />
      </g>

      <g stroke={scenePalette.emerald} strokeWidth="1.25" strokeLinejoin="round">
        <path
          d={`M ${apiLeft} ${API_TOP} L ${API_CX} ${apiFront} V ${apiFront + API_HEIGHT} L ${apiLeft} ${API_TOP + API_HEIGHT} Z`}
          fill={scenePalette.panel}
          fillOpacity="0.9"
        />
        <path
          d={`M ${API_CX} ${apiFront} L ${apiRight} ${API_TOP} V ${API_TOP + API_HEIGHT} L ${API_CX} ${apiFront + API_HEIGHT} Z`}
          fill={scenePalette.background}
          strokeOpacity="0.6"
        />
        <path
          d={`M ${API_CX} ${API_TOP - API_HALF_DEPTH} L ${apiRight} ${API_TOP} L ${API_CX} ${apiFront} L ${apiLeft} ${API_TOP} Z`}
          fill={scenePalette.panel}
        />
        {/* Rack slots on the right face. */}
        <path d={`M 264 62 L 284 52 M 264 72 L 284 62`} strokeOpacity="0.45" />
      </g>
      <circle className={styles.pulse} cx="230" cy="58" r="1.8" fill={scenePalette.cyan} />
      <circle className={styles.pulse} cx="236" cy="61" r="1.8" fill={scenePalette.emerald} />

      <text className={styles.label} x={DB_CX} y="108" textAnchor="middle" fill={scenePalette.text}>
        PostgreSQL
      </text>
      <text className={styles.label} x={API_CX} y="110" textAnchor="middle" fill={scenePalette.text}>
        API
      </text>
    </svg>
  );
}
