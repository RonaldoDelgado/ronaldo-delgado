"use client";

import { useEffect, useRef } from "react";

export type Pointer = { x: number; y: number };

// Window-normalized pointer position in [-1, 1]; stored in a ref so useFrame reads it without re-renders.
export function usePointer(enabled: boolean) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    function handleMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled]);

  return pointer;
}
