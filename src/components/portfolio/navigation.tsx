import { FileText, Menu } from "lucide-react";

import { CV_PATH } from "@/data/portfolio";

const sections = [
  { href: "#enfoque", label: "Enfoque" },
  { href: "#casos", label: "Proyectos" },
  { href: "#competencias", label: "Competencias" },
  { href: "#formacion", label: "Formación" },
];

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <ul className={mobile ? "grid gap-1 p-2" : "flex items-center gap-1"}>
      {sections.map((section) => (
        <li key={section.href}>
          <a
            href={section.href}
            className="flex min-h-11 items-center rounded-full px-4 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07110f]/88 backdrop-blur-xl">
      <nav aria-label="Navegación principal" className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="group inline-flex min-h-11 items-center gap-3 rounded-lg text-white">
          <span className="grid size-9 place-items-center rounded-xl border border-emerald-300/25 bg-emerald-300/8 font-mono text-xs text-emerald-200 transition group-hover:border-emerald-300/50">
            RD
          </span>
          <span className="hidden text-sm font-semibold sm:inline">Ronaldo Delgado</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          <NavigationLinks />
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 text-sm font-semibold text-emerald-50 transition hover:border-emerald-200/60 hover:bg-emerald-300/15"
          >
            <FileText className="size-4" aria-hidden="true" />
            CV PDF
          </a>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-white/12 px-4 text-sm font-medium text-white marker:content-none">
            <Menu className="size-4" aria-hidden="true" />
            Menú
          </summary>
          <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-white/10 bg-[#0b1815] p-1 shadow-2xl">
            <NavigationLinks mobile />
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2 flex min-h-11 items-center gap-2 rounded-xl border border-emerald-300/25 px-4 text-sm text-emerald-100"
            >
              <FileText className="size-4" aria-hidden="true" />
              Ver CV PDF
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
