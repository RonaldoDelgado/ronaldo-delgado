"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";

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

// Mounts once the frame nears the viewport and an idle slot is free so the scene never competes with LCP.
function useDeferredVisibility(ref: RefObject<HTMLElement | null>) {
  const [idle, setIdle] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
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

  return idle && seen;
}

// Page-wide registry so only the most visible scene animates; every other mounted scene drops to
// on-demand rendering, keeping a single continuous WebGL loop however close the scenes are placed.
const visibleAreas = new Map<symbol, number>();
const activityListeners = new Set<() => void>();
let activeScene: symbol | null = null;

function electActiveScene() {
  let best: symbol | null = null;
  let bestArea = 0;
  for (const [id, area] of visibleAreas) {
    if (area > bestArea) {
      best = id;
      bestArea = area;
    }
  }
  if (best === activeScene) return;
  activeScene = best;
  activityListeners.forEach((listener) => listener());
}

function subscribeActivity(listener: () => void) {
  activityListeners.add(listener);
  return () => activityListeners.delete(listener);
}

const VISIBILITY_STEPS = Array.from({ length: 21 }, (_, index) => index / 20);

function useExclusiveActivity(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const [id] = useState(() => Symbol("scene"));

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(([entry]) => {
      const { width, height } = entry.intersectionRect;
      visibleAreas.set(id, entry.isIntersecting ? width * height : 0);
      electActiveScene();
    }, { threshold: VISIBILITY_STEPS });
    observer.observe(element);

    return () => {
      observer.disconnect();
      visibleAreas.delete(id);
      electActiveScene();
    };
  }, [ref, enabled, id]);

  return useSyncExternalStore(subscribeActivity, () => activeScene === id, () => false);
}

/**
 * Fixed-size container for a WebGL scene. The fallback is the server output and stays visible
 * until the client-only scene reports its first frame; it is also what remains without WebGL.
 */
export function SceneFrame({ label, description, fallback, className, children }: SceneFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const preferences = useScenePreferences();
  const mounted = useDeferredVisibility(containerRef);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // `mounted` is only true on the client, after hydration, so the WebGL probe never runs on the server.
  const showScene = mounted && !failed && supportsWebgl();
  const active = useExclusiveActivity(containerRef, showScene);

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
            {children({ ...preferences, active, onReady: () => setReady(true) })}
          </SceneErrorBoundary>
        </div>
      ) : null}
    </div>
  );
}
