"use client";

import { useSyncExternalStore } from "react";

import {
  defaultPortfolioContent,
  LEGACY_PORTFOLIO_STORAGE_KEYS,
  PORTFOLIO_STORAGE_KEY,
} from "@/data/portfolio";
import { loadPortfolioContent, normalizePortfolioContent } from "@/lib/portfolio-storage";
import type { PortfolioContent } from "@/types/portfolio";

const STORAGE_EVENT_NAME = "portfolio-content-v7-updated";
const STORAGE_ERROR_MESSAGE =
  "El almacenamiento del navegador no está disponible. Los cambios siguen visibles durante esta sesión, pero no se guardaron localmente.";

let cachedRawValue: string | undefined;
let cachedSnapshot: PortfolioContent = defaultPortfolioContent;
let persistenceWarning: string | null = null;
let persistenceFailed = false;

function getSnapshot(): PortfolioContent {
  if (typeof window === "undefined") return defaultPortfolioContent;
  if (persistenceFailed) return cachedSnapshot;

  const loaded = loadPortfolioContent(window.localStorage);
  if (loaded.cacheKey === cachedRawValue) return cachedSnapshot;

  cachedRawValue = loaded.cacheKey;
  cachedSnapshot = loaded.content;
  persistenceWarning = loaded.storageAvailable ? null : STORAGE_ERROR_MESSAGE;
  return cachedSnapshot;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(STORAGE_EVENT_NAME, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORAGE_EVENT_NAME, handleChange);
  };
}

function persist(nextContent: PortfolioContent) {
  const normalized = normalizePortfolioContent(nextContent);
  cachedSnapshot = normalized;

  try {
    const rawValue = JSON.stringify(normalized);
    window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, rawValue);
    for (const key of LEGACY_PORTFOLIO_STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
    cachedRawValue = `v7:${rawValue}`;
    persistenceWarning = null;
    persistenceFailed = false;
  } catch {
    persistenceFailed = true;
    persistenceWarning = STORAGE_ERROR_MESSAGE;
  }

  window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
}

export function usePortfolioContent() {
  const content = useSyncExternalStore(subscribe, getSnapshot, () => defaultPortfolioContent);

  return {
    content,
    persistenceWarning,
    updateContent: persist,
    resetContent: () => persist(defaultPortfolioContent),
  };
}
