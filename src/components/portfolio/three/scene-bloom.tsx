"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

// Subtle bloom for the high quality tier; only unlit, non tone-mapped edges exceed the threshold.
export default function SceneBloom() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom intensity={0.55} luminanceThreshold={0.6} luminanceSmoothing={0.2} mipmapBlur />
    </EffectComposer>
  );
}
