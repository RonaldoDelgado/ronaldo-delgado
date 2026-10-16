"use client";

import dynamic from "next/dynamic";

import { SceneFrame } from "@/components/portfolio/three/scene-frame";
import { StackFallback } from "@/components/portfolio/three/scene-fallback";

// Client-only chunk: three.js never runs on the server and stays out of the initial page bundle.
const HeroStackScene = dynamic(() => import("@/components/portfolio/three/hero-stack-scene"), {
  ssr: false,
  loading: () => null,
});

export function HeroStack({ className }: { className?: string }) {
  return (
    <SceneFrame
      className={className}
      label="Pila de capas Full Stack"
      description="Ilustración tridimensional de cuatro placas apiladas que representan las capas que desarrollo: interfaz de usuario, API, base de datos y nube."
      fallback={<StackFallback />}
    >
      {(props) => <HeroStackScene {...props} />}
    </SceneFrame>
  );
}
