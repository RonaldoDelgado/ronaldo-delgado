"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

// Subtle bloom for the high quality tier; only unlit, non tone-mapped edges exceed the threshold.
// The composer keeps the size it was created with, so it is remounted per canvas size; otherwise a
// frame resized after mount renders the bloom pass into a stale corner.
export default function SceneBloom() {
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const invalidate = useThree((state) => state.invalidate);

  // On-demand frame loops (reduced motion, off screen) need a fresh frame once the new composer is sized.
  useEffect(() => {
    invalidate();
  }, [width, height, invalidate]);

  return (
    <EffectComposer key={`${width}x${height}`} multisampling={4}>
      <Bloom intensity={0.55} luminanceThreshold={0.6} luminanceSmoothing={0.2} mipmapBlur />
    </EffectComposer>
  );
}
