import Image from "next/image";

import { scenePalette } from "@/components/portfolio/three/palette";

export type PhoneScreenProps = {
  /** Real app screenshot served from /public (never a mocked UI). */
  screenSrc: string;
  screenAlt: string;
  /** Horizontal focus of the cover crop, 0 (left) to 1 (right). Useful for landscape captures. */
  screenFocusX?: number;
};

// Static CSS phone frame: SSR output, loading state and no-WebGL fallback for the phone scene.
export function PhoneShowcaseFallback({ screenSrc, screenAlt, screenFocusX = 0.5 }: PhoneScreenProps) {
  return (
    <div role="img" aria-label={screenAlt} className="relative flex h-full w-full items-center justify-center">
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full"
        style={{ background: `radial-gradient(circle, ${scenePalette.emerald}29 0%, transparent 70%)` }}
      />
      {/* Same proportions and tilt as the 3D phone so the swap to WebGL does not jump. */}
      <div
        className="relative h-[80%] rounded-[12%/6%] border p-[3.5%]"
        style={{
          aspectRatio: "1.5 / 3.1",
          transform: "rotate(-7deg)",
          background: scenePalette.panel,
          borderColor: scenePalette.emerald,
          boxShadow: `0 0 18px ${scenePalette.emerald}55, inset 0 0 0 1px ${scenePalette.background}`,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[9%/4.4%]">
          <Image
            src={screenSrc}
            alt=""
            fill
            sizes="(max-width: 1024px) 45vw, 18vw"
            className="object-cover"
            style={{ objectPosition: `${screenFocusX * 100}% 50%` }}
            unoptimized
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[4.6%] h-[2.2%] w-[22%] -translate-x-1/2 rounded-full"
          style={{ background: scenePalette.background, boxShadow: `inset 0 0 0 1px ${scenePalette.emerald}40` }}
        />
      </div>
    </div>
  );
}
