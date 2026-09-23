"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { type MouseEvent, useEffect, useRef, useState } from "react";

import { ImagePlaceholder } from "@/components/portfolio/image-placeholder";
import type { CaseImage } from "@/types/portfolio";

interface ProjectSliderProps {
  images: CaseImage[];
  title: string;
}

export function ProjectSlider({ images, title }: ProjectSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pointerToggleIntent = useRef<"pause" | "resume" | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (
      images.length < 2
      || isPaused
      || prefersReducedMotion
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const intervalId = window.setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setActiveIndex((current) => (current + 1) % images.length);
    }, 6500);
    return () => window.clearInterval(intervalId);
  }, [images.length, isPaused, prefersReducedMotion]);

  if (images.length === 0) {
    return <ImagePlaceholder label={`Captura de ${title} pendiente`} className="min-h-72" />;
  }

  const safeIndex = activeIndex < images.length ? activeIndex : 0;
  const activeImage = images[safeIndex];
  const isAutoplaying = images.length > 1 && !isPaused && !prefersReducedMotion;

  function showPreviousImage() {
    setIsPaused(true);
    setActiveIndex((safeIndex - 1 + images.length) % images.length);
  }

  function showNextImage() {
    setIsPaused(true);
    setActiveIndex((safeIndex + 1) % images.length);
  }

  function capturePointerToggleIntent() {
    pointerToggleIntent.current = isPaused ? "resume" : "pause";
  }

  function toggleAutoplay(event: MouseEvent<HTMLButtonElement>) {
    const intent = event.detail > 0 ? pointerToggleIntent.current : null;
    pointerToggleIntent.current = null;

    if (intent) {
      setIsPaused(intent === "pause");
      return;
    }

    setIsPaused((current) => !current);
  }

  return (
    <div
      className="space-y-3"
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Galería de capturas de ${title}`}
      onFocusCapture={() => setIsPaused(true)}
    >
      <div
        className="project-slider-frame relative w-full min-w-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45"
        role="group"
        aria-roledescription="diapositiva"
        aria-label={`Captura ${safeIndex + 1} de ${images.length}`}
      >
        <Image src={activeImage.src} alt={activeImage.alt} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-contain" unoptimized />
      </div>
      {images.length > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button type="button" onClick={showPreviousImage} className="slider-control" aria-label={`Ver captura anterior de ${title}`}>
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <p className="slider-counter" aria-live={isAutoplaying ? "off" : "polite"} aria-atomic="true">{safeIndex + 1} / {images.length}</p>
            <button type="button" onClick={showNextImage} className="slider-control" aria-label={`Ver captura siguiente de ${title}`}>
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onPointerDown={capturePointerToggleIntent}
            onPointerCancel={() => { pointerToggleIntent.current = null; }}
            onClick={toggleAutoplay}
            className="slider-toggle"
            disabled={prefersReducedMotion}
            aria-label={prefersReducedMotion
              ? `Reproducción automática desactivada para ${title} por la preferencia de movimiento reducido`
              : isPaused
                ? `Reanudar reproducción automática de ${title}`
                : `Pausar reproducción automática de ${title}`}
          >
            {prefersReducedMotion || !isPaused
              ? <Pause className="size-4" aria-hidden="true" />
              : <Play className="size-4" aria-hidden="true" />}
            <span>{prefersReducedMotion ? "Movimiento reducido activo" : isPaused ? "Reanudar" : "Pausar"}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
