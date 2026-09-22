"use client";

import Link from "next/link";
import { useState } from "react";

import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { normalizePortfolioContent } from "@/lib/portfolio-storage";

function JsonEditor({ initialDraft, onApply }: { initialDraft: string; onApply: (draft: string) => void }) {
  const [draft, setDraft] = useState(initialDraft);

  return (
    <form id="portfolio-content-editor" onSubmit={(event) => { event.preventDefault(); onApply(draft); }}>
      <label className="admin-field mt-6">
        <span>Configuración completa del portafolio</span>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={34} spellCheck={false} className="font-mono text-xs leading-6" aria-describedby="editor-status" />
      </label>
      <button type="submit" className="button-primary mt-4 sm:hidden">Validar y aplicar</button>
    </form>
  );
}

export function AdminPage() {
  const { content, persistenceWarning, updateContent, resetContent } = usePortfolioContent();
  const [message, setMessage] = useState<string | null>(null);
  const serializedContent = JSON.stringify(content, null, 2);

  const applyDraft = (draft: string) => {
    try {
      updateContent(normalizePortfolioContent(JSON.parse(draft)));
      setMessage("Vista local actualizada. Los enlaces y protocolos fueron normalizados.");
    } catch {
      setMessage("El JSON no es válido. Corrija la sintaxis antes de aplicar los cambios.");
    }
  };

  const restoreDefaults = () => {
    resetContent();
    setMessage("Contenido profesional predeterminado y galerías restaurados.");
  };

  return (
    <main className="min-h-screen bg-[#06100e] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="section-kicker">Herramienta local de preview</p>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Editor del contrato de contenido</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Esta ruta no es un CMS público. Edita una copia en localStorage v5 para revisar la landing en este navegador; los valores fuente siguen en <code className="text-emerald-200">src/data/portfolio.ts</code>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="button-secondary">Abrir landing</Link>
            <button type="button" onClick={restoreDefaults} className="button-secondary">Restaurar valores</button>
          </div>
        </header>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 sm:p-8" aria-labelledby="editor-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="editor-title" className="text-xl font-semibold text-white">Contenido JSON</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Los proyectos con capturas predeterminadas restauran su galería si el array de imágenes queda vacío; los demás conservan placeholders honestos. Los arrays vacíos de enlaces se mantienen.</p>
            </div>
            <button type="submit" form="portfolio-content-editor" className="button-primary hidden sm:inline-flex">Validar y aplicar</button>
          </div>
          <JsonEditor key={serializedContent} initialDraft={serializedContent} onApply={applyDraft} />
          <div id="editor-status" aria-live="polite" className="mt-4 space-y-2 text-sm">
            {message ? <p className="text-emerald-100">{message}</p> : null}
            {persistenceWarning ? <p className="text-amber-200">{persistenceWarning}</p> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
