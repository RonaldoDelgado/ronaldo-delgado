import type { IconType } from "react-icons";
import { FaFileExcel } from "react-icons/fa";
import { LuBox, LuClock, LuDatabase, LuFileText, LuFlaskConical, LuHotel, LuLayers, LuRadio } from "react-icons/lu";
import {
  SiDart,
  SiDotnet,
  SiExpo,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGithubactions,
  SiJest,
  SiJsonwebtokens,
  SiLeaflet,
  SiMedusa,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
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
  "Guesty API": { Icon: LuHotel, color: "#94A3B8" },
  REST: { Icon: TbApi, color: "#94A3B8" },
  "APIs REST": { Icon: TbApi, color: "#94A3B8" },
  "Entity Framework Core": { Icon: LuDatabase, color: "#94A3B8" },
  Zustand: { Icon: LuLayers, color: "#94A3B8" },
  Riverpod: { Icon: LuLayers, color: "#94A3B8" },
  Hangfire: { Icon: LuClock, color: "#94A3B8" },
  xUnit: { Icon: LuFlaskConical, color: "#94A3B8" },
  Moq: { Icon: LuFlaskConical, color: "#94A3B8" },
  "Flutter Test": { Icon: LuFlaskConical, color: "#94A3B8" },
  MikroORM: { Icon: LuDatabase, color: "#94A3B8" },
  "castlive.stream": { Icon: LuRadio, color: "#94A3B8" },
  QR: { Icon: TbQrcode, color: "#94A3B8" },
  PDF: { Icon: LuFileText, color: "#94A3B8" },
} satisfies Record<string, TechnologyVisual>;

const technologyVisuals: Record<string, TechnologyVisual> = {
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "React 18": { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  Dart: { Icon: SiDart, color: "#0175C2" },
  "Firebase Messaging": { Icon: SiFirebase, color: "#FFCA28" },
  "Microsoft Azure": { Icon: TbBrandAzure, color: "#0078D4" },
  "Azure OpenAI": { Icon: TbBrandOpenai, color: "#0078D4" },
  "Azure App Service": { Icon: TbBrandAzure, color: "#0078D4" },
  "Azure Static Web Apps": { Icon: TbBrandAzure, color: "#0078D4" },
  "Azure Blob Storage": { Icon: TbBrandAzure, color: "#0078D4" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
  ".NET 8": { Icon: SiDotnet, color: "#512BD4" },
  "ASP.NET Core": { Icon: SiDotnet, color: "#512BD4" },
  "JWT/Identity": { Icon: SiJsonwebtokens, color: "#FB015B" },
  "Leaflet/OpenStreetMap": { Icon: SiLeaflet, color: "#199900" },
  Jest: { Icon: SiJest, color: "#C21325" },
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
