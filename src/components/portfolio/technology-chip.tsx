import type { IconType } from "react-icons";
import { FaFileExcel } from "react-icons/fa";
import { LuBox, LuDatabase, LuFileText, LuHotel, LuRadio } from "react-icons/lu";
import {
  SiDotnet,
  SiExpo,
  SiFlutter,
  SiFramer,
  SiMedusa,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiSvg,
  SiTailwindcss,
  SiTypeorm,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { TbApi, TbBrandAzure, TbBrandCSharp, TbBrandOpenai, TbQrcode } from "react-icons/tb";

interface TechnologyVisual {
  Icon: IconType;
  color: `#${string}`;
}

const neutralVisuals = {
  Guesty: { Icon: LuHotel, color: "#94A3B8" },
  REST: { Icon: TbApi, color: "#94A3B8" },
  MikroORM: { Icon: LuDatabase, color: "#94A3B8" },
  "castlive.stream": { Icon: LuRadio, color: "#94A3B8" },
  QR: { Icon: TbQrcode, color: "#94A3B8" },
  PDF: { Icon: LuFileText, color: "#94A3B8" },
} satisfies Record<string, TechnologyVisual>;

const technologyVisuals: Record<string, TechnologyVisual> = {
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  "Microsoft Azure": { Icon: TbBrandAzure, color: "#0078D4" },
  "Azure OpenAI": { Icon: TbBrandOpenai, color: "#0078D4" },
  ".NET 8": { Icon: SiDotnet, color: "#512BD4" },
  "C#": { Icon: TbBrandCSharp, color: "#512BD4" },
  NestJS: { Icon: SiNestjs, color: "#E0234E" },
  Prisma: { Icon: SiPrisma, color: "#2D3748" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  "Socket.IO": { Icon: SiSocketdotio, color: "#FFFFFF" },
  Vite: { Icon: SiVite, color: "#646CFF" },
  "Medusa v1": { Icon: SiMedusa, color: "#FFFFFF" },
  "Medusa v2": { Icon: SiMedusa, color: "#FFFFFF" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  TypeORM: { Icon: SiTypeorm, color: "#FE0803" },
  Redis: { Icon: SiRedis, color: "#FF4438" },
  Excel: { Icon: FaFileExcel, color: "#217346" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  Expo: { Icon: SiExpo, color: "#FFFFFF" },
  SVG: { Icon: SiSvg, color: "#FFB13B" },
  ...neutralVisuals,
};

const unknownTechnologyVisual: TechnologyVisual = {
  Icon: LuBox,
  color: "#94A3B8",
};

export function TechnologyChip({ technology }: { technology: string }) {
  const { Icon, color } = technologyVisuals[technology] ?? unknownTechnologyVisual;

  return (
    <span className="tech-chip">
      <Icon className="tech-chip-icon" color={color} aria-hidden="true" focusable="false" />
      <span>{technology}</span>
    </span>
  );
}
