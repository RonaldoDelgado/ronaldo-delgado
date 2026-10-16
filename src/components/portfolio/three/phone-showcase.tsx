"use client";

import dynamic from "next/dynamic";

import { SceneFrame } from "@/components/portfolio/three/scene-frame";
import { PhoneShowcaseFallback, type PhoneScreenProps } from "@/components/portfolio/three/phone-showcase-fallback";

// Client-only chunk: three.js never runs on the server and stays out of the initial page bundle.
const PhoneShowcaseScene = dynamic(() => import("@/components/portfolio/three/phone-showcase-scene"), {
  ssr: false,
  loading: () => null,
});

type PhoneShowcaseProps = PhoneScreenProps & { className?: string };

export function PhoneShowcase({ className, screenSrc, screenAlt, screenFocusX }: PhoneShowcaseProps) {
  const screen = { screenSrc, screenAlt, screenFocusX };
  return (
    <SceneFrame
      className={`aspect-[3/4] w-full ${className ?? ""}`}
      label={screenAlt}
      description="Ilustración tridimensional de un teléfono que muestra una captura real de la aplicación móvil."
      fallback={<PhoneShowcaseFallback {...screen} />}
    >
      {(props) => <PhoneShowcaseScene {...props} {...screen} />}
    </SceneFrame>
  );
}
