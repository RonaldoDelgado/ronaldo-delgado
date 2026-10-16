"use client";

import dynamic from "next/dynamic";

import { ConstellationFallback } from "@/components/portfolio/three/ai-constellation-fallback";
import { SceneFrame } from "@/components/portfolio/three/scene-frame";

// Client-only chunk: three.js never runs on the server and stays out of the initial page bundle.
const AiConstellationScene = dynamic(() => import("@/components/portfolio/three/ai-constellation-scene"), {
  ssr: false,
  loading: () => null,
});

export function AiConstellation({ className }: { className?: string }) {
  return (
    <SceneFrame
      className={className}
      label="Constelación del asistente con IA"
      description="Enrutador del asistente con IA: la consulta pasa por un clasificador hacia herramientas permitidas y queda registrada en auditoría."
      fallback={<ConstellationFallback />}
    >
      {(props) => <AiConstellationScene {...props} />}
    </SceneFrame>
  );
}
