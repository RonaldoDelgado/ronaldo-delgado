"use client";

import { useSyncExternalStore } from "react";

export type SceneQuality = "high" | "low";

export type ScenePreferences = {
  reducedMotion: boolean;
  quality: SceneQuality;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const LOW_QUALITY_QUERY = "(max-width: 1279px), (pointer: coarse)";

let webglSupport: boolean | undefined;

// Client-only and cached; called lazily so hidden scenes never create a probe context.
export function supportsWebgl(): boolean {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

function subscribe(onChange: () => void) {
  const queries = [REDUCED_MOTION_QUERY, LOW_QUALITY_QUERY].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

// Encoded as a string so useSyncExternalStore can compare snapshots by value.
function getSnapshot(): string {
  const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const lowDensity = window.devicePixelRatio < 1;
  const low = window.matchMedia(LOW_QUALITY_QUERY).matches || lowDensity;
  return `${reduced ? 1 : 0}${low ? "low" : "high"}`;
}

// The server never renders WebGL, so it reports the most conservative state.
function getServerSnapshot(): string {
  return "1low";
}

export function useScenePreferences(): ScenePreferences {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    reducedMotion: snapshot.startsWith("1"),
    quality: snapshot.endsWith("high") ? "high" : "low",
  };
}
