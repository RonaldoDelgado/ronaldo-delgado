"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import type { CaseImage } from "@/types/portfolio";

interface ProjectSliderProps {
  images: CaseImage[];
  title: string;
}

export function ProjectSlider({ images, title }: ProjectSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 6500);
    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (images.length === 0) {
    return <ImagePlaceholder label={`Captura de ${title} pendiente`} className="min-h-72" />;
  }

  const safeIndex = activeIndex < images.length ? activeIndex : 0;
  const activeImage = images[safeIndex];

  return (
    <div className="space-y-3">
      <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
        <Image src={activeImage.src} alt={activeImage.alt} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" unoptimized />
      </div>
      {images.length > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={() => setActiveIndex((safeIndex - 1 + images.length) % images.length)} className="slider-control" aria-label={`Ver captura anterior de ${title}`}>
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <p className="text-xs text-slate-400" aria-live="polite">{safeIndex + 1} / {images.length}</p>
          <button type="button" onClick={() => setActiveIndex((safeIndex + 1) % images.length)} className="slider-control" aria-label={`Ver captura siguiente de ${title}`}>
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
