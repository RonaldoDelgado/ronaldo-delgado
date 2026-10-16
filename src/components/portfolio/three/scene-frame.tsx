"use client";

import { Component, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import {
  supportsWebgl,
  useScenePreferences,
  type ScenePreferences,
} from "@/components/portfolio/three/use-scene-preferences";

export type SceneRenderProps = ScenePreferences & {
  active: boolean;
  onReady: () => void;
};

type SceneFrameProps = {
  label: string;
  description: string;
  fallback: ReactNode;
  className?: string;
  children: (props: SceneRenderProps) => ReactNode;
};

class SceneErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Tracks viewport visibility and waits for an idle slot so the scene never competes with LCP.
function useDeferredVisibility(ref: RefObject<HTMLElement | null>) {
  const [idle, setIdle] = useState(false);
  const [seen, setSeen] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    }, { rootMargin: "200px" });
    observer.observe(element);

    const requestIdle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 200));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = requestIdle(() => setIdle(true), { timeout: 1500 });

    return () => {
      observer.disconnect();
      cancelIdle(handle);
    };
  }, [ref]);

  return { mounted: idle && seen, inView };
}

/**
 * Fixed-size container for a WebGL scene. The fallback is the server output and stays visible
 * until the client-only scene reports its first frame; it is also what remains without WebGL.
 */
export function SceneFrame({ label, description, fallback, className, children }: SceneFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const preferences = useScenePreferences();
  const { mounted, inView } = useDeferredVisibility(containerRef);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // `mounted` is only true on the client, after hydration, so the WebGL probe never runs on the server.
  const showScene = mounted && !failed && supportsWebgl();

  return (
    <div ref={containerRef} role="img" aria-label={label} className={`relative ${className ?? ""}`}>
      <span className="sr-only">{description}</span>
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: showScene && ready ? 0 : 1 }}
        aria-hidden="true"
      >
        {fallback}
      </div>
      {showScene ? (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
          aria-hidden="true"
        >
          <SceneErrorBoundary onError={() => setFailed(true)}>
            {children({ ...preferences, active: inView, onReady: () => setReady(true) })}
          </SceneErrorBoundary>
        </div>
      ) : null}
    </div>
  );
}
