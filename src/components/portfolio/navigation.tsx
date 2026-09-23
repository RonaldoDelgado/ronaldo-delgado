import { FileText } from "lucide-react";

import { CV_PATH } from "@/data/portfolio";

const sections = [
  { href: "#enfoque", label: "Enfoque" },
  { href: "#casos", label: "Proyectos" },
  { href: "#competencias", label: "Competencias" },
  { href: "#formacion", label: "Formación" },
];

export function Navigation() {
  return (
    <header className="relative z-10 px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
      <nav aria-label="Navegación principal" className="mx-auto max-w-7xl">
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {sections.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                className="flex min-h-11 items-center rounded-full border border-white/10 bg-white/3 px-4 text-sm text-slate-300 transition hover:border-emerald-200/30 hover:bg-emerald-300/8 hover:text-white"
              >
                {section.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 text-sm font-semibold text-emerald-50 transition hover:border-emerald-200/60 hover:bg-emerald-300/15"
            >
              <FileText className="size-4" aria-hidden="true" />
              CV PDF
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
