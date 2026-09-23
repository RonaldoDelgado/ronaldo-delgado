import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";

import { ProjectSlider } from "@/components/portfolio/project-slider";
import { isExternalHttpUrl } from "@/lib/portfolio-storage";
import type { CaseStudyEntry } from "@/types/portfolio";

export function CaseStudy({ entry, index }: { entry: CaseStudyEntry; index: number }) {
  return (
    <article id={`caso-${entry.id}`} className="case-study">
      <div className="case-study-heading">
        <div>
          <p className="section-kicker">{entry.category}</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{entry.name}</h3>
          {entry.status ? <p className="mt-3 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-cyan-200">{entry.status}</p> : null}
        </div>
        <span className="font-mono text-5xl text-white/8" aria-hidden="true">0{index + 1}</span>
      </div>

      <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">{entry.summary}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <ProjectSlider images={entry.images} title={entry.name} />
        <div className="grid gap-4">
          <div className="case-detail">
            <span className="case-detail-label">Aporte confirmado</span>
            <p>{entry.contribution}</p>
          </div>
          <div className="case-detail">
            <span className="case-detail-label">Detalles verificados</span>
            <ul className="mt-4 space-y-3">
              {entry.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-[0.9rem] leading-6 text-slate-300">
                  <Check className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden="true" />{detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-white/8 pt-8 lg:grid-cols-3">
        <div>
          <h4 className="case-subheading">Tecnologías</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.technologies.map((technology) => <span key={technology} className="tech-chip">{technology}</span>)}
          </div>
        </div>
        <div>
          <h4 className="case-subheading">Estado y límites</h4>
          {entry.limitations.length > 0 ? (
            <ul className="mt-4 space-y-3 text-[0.9rem] leading-6 text-slate-300">
              {entry.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
            </ul>
          ) : <p className="mt-4 text-[0.9rem] leading-6 text-slate-400">Sin limitaciones adicionales publicadas en el CV.</p>}
        </div>
        <div>
          <h4 className="case-subheading">Evidencia y alcance</h4>
          {entry.aiScope ? <p className="mt-4 text-[0.9rem] leading-6 text-slate-300">{entry.aiScope}</p> : null}
          <p className="mt-4 flex gap-3 rounded-2xl border border-amber-200/15 bg-amber-200/5 p-4 text-[0.9rem] leading-6 text-amber-50/75">
            <ShieldCheck className="mt-1 size-4 shrink-0" aria-hidden="true" />{entry.evidenceNote}
          </p>
          {entry.links.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {entry.links.map((link) => (
                <a key={link.href} href={link.href} target={isExternalHttpUrl(link.href) ? "_blank" : undefined} rel={isExternalHttpUrl(link.href) ? "noreferrer" : undefined} className="text-link">
                  {link.label}<ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : <p className="mt-4 text-[0.8rem] uppercase tracking-[0.14em] text-slate-500">Enlaces públicos pendientes</p>}
        </div>
      </div>
    </article>
  );
}
