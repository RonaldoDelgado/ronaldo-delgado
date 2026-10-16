import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { ProjectSlider } from "@/components/portfolio/project-slider";
import { TechnologyChip } from "@/components/portfolio/technology-chip";
import type { CaseStudyEntry } from "@/types/portfolio";

// `children` renders full-width visuals between the details and the technologies.
export function CaseStudy({ entry, index, children }: { entry: CaseStudyEntry; index: number; children?: ReactNode }) {
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
            <span className="case-detail-label">De qué trata</span>
            <ul className="mt-4 space-y-3">
              {entry.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-[0.9rem] leading-6 text-slate-300">
                  <Check className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden="true" />{detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="case-detail">
            <span className="case-detail-label">Aporte confirmado</span>
            <p>{entry.contribution}</p>
          </div>
        </div>
      </div>

      {children}

      <div className="mt-8 border-t border-white/8 pt-8">
        <div>
          <h4 className="case-subheading">Tecnologías</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.technologies.map((technology) => <TechnologyChip key={technology} technology={technology} />)}
          </div>
        </div>
      </div>
    </article>
  );
}
