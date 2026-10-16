"use client";

import dynamic from "next/dynamic";

import { BranchGraphFallback } from "@/components/portfolio/three/branch-graph-fallback";
import { SceneFrame } from "@/components/portfolio/three/scene-frame";

// Client-only chunk: three.js never runs on the server and stays out of the initial page bundle.
const BranchGraphScene = dynamic(() => import("@/components/portfolio/three/branch-graph-scene"), {
  ssr: false,
  loading: () => null,
});

// Responsive 16:7 by default; pass a className to override the size from the page layout.
export function BranchGraph({ className }: { className?: string }) {
  return (
    <SceneFrame
      className={`aspect-[16/7] w-full ${className ?? ""}`}
      label="Flujo de ramas y despliegue"
      description="Flujo de ramas feature, develop, staging y main con despliegue a producción mediante tags."
      fallback={<BranchGraphFallback />}
    >
      {(props) => <BranchGraphScene {...props} />}
    </SceneFrame>
  );
}
