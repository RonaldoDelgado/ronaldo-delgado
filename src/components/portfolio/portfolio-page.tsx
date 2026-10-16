"use client";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  Braces,
  BrainCircuit,
  Database,
  FileText,
  FileSearch,
  FlaskConical,
  GitBranch,
  Layers3,
  ListChecks,
  Mail,
  MapPin,
  MessageSquareCode,
  Network,
  Phone,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import type { MouseEvent } from "react";
import {
  SiDart,
  SiDotnet,
  SiExpo,
  SiFlutter,
  SiJavascript,
  SiMedusa,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

import { CaseStudy } from "@/components/portfolio/case-study";
import { Navigation } from "@/components/portfolio/navigation";
import { OrchestrationDiagram } from "@/components/portfolio/orchestration-diagram";
import { CV_PATH } from "@/data/portfolio";
import { usePortfolioContent } from "@/hooks/use-portfolio-content";
import { isExternalHttpUrl } from "@/lib/portfolio-storage";
import type { ContactPlatform } from "@/types/portfolio";

const socialIcons: Record<ContactPlatform, typeof GitBranch> = {
  github: GitBranch,
  linkedin: BadgeCheck,
  email: Mail,
  phone: Phone,
  location: MapPin,
};

const heroTechnologyGroups = [
  {
    name: "Frontend",
    technologies: [
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
      { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { label: "Vite", Icon: SiVite, color: "#646CFF" },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { label: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { label: "NestJS", Icon: SiNestjs, color: "#E0234E" },
      { label: ".NET / C#", Icon: SiDotnet, color: "#512BD4" },
      { label: "Medusa", Icon: SiMedusa, color: "#FFFFFF" },
    ],
  },
  {
    name: "Mobile",
    technologies: [
      { label: "Flutter", Icon: SiFlutter, color: "#02569B" },
      { label: "Dart", Icon: SiDart, color: "#0175C2" },
      { label: "React Native", Icon: SiReact, color: "#61DAFB" },
      { label: "Expo", Icon: SiExpo, color: "#FFFFFF" },
    ],
  },
  {
    name: "Datos",
    technologies: [
      { label: "PostgreSQL y SQL", Icon: SiPostgresql, color: "#4169E1" },
      { label: "TypeORM, MikroORM, Prisma y EF Core", Icon: Database, color: "#94A3B8" },
      { label: "Redis", Icon: Layers3, color: "#FF4438" },
    ],
  },
  {
    name: "Integraciones y cloud",
    technologies: [
      { label: "APIs REST", Icon: Network, color: "#94A3B8" },
      { label: "Socket.IO", Icon: SiSocketdotio, color: "#FFFFFF" },
      { label: "Microsoft Azure", Icon: Workflow, color: "#0078D4" },
      { label: "Servidores y despliegues", Icon: Layers3, color: "#94A3B8" },
      { label: "Git y GitHub", Icon: GitBranch, color: "#F05032" },
    ],
  },
  {
    name: "Seguridad y calidad",
    technologies: [
      { label: "JWT y control por roles", Icon: ShieldCheck, color: "#FB015B" },
      { label: "Pruebas unitarias e integración", Icon: FlaskConical, color: "#94A3B8" },
      { label: "Migraciones", Icon: Database, color: "#94A3B8" },
      { label: "Arquitectura modular", Icon: Braces, color: "#94A3B8" },
      { label: "Scrum", Icon: ListChecks, color: "#94A3B8" },
    ],
  },
] as const;

const heroAiCapabilities = [
  { label: "Orquestador", meaning: "coordina agentes y fases", Icon: Bot },
  { label: "SDD", meaning: "desarrollo guiado por especificaciones", Icon: FileSearch },
  { label: "ODD", meaning: "desarrollo orgánico guiado por tareas", Icon: ListChecks },
  { label: "TDD", meaning: "desarrollo guiado por pruebas", Icon: FlaskConical },
  { label: "Engram", meaning: "memoria persistente de contexto", Icon: BrainCircuit },
  { label: "Multiagente", meaning: "colaboración de agentes especializados", Icon: UsersRound },
  { label: "Prompt Engineering", meaning: "diseño de instrucciones, restricciones y contexto", Icon: MessageSquareCode },
  { label: "Integración de modelos", meaning: "conecta modelos con productos y servicios", Icon: Workflow },
  { label: "Flujos controlados", meaning: "clasifica intenciones y estructura respuestas", Icon: ShieldCheck },
  { label: "Conocimiento aprobado", meaning: "recupera información dentro de límites verificables", Icon: FileSearch },
] as const;

function buildWhatsAppUrl(phoneValue: string | undefined): string | null {
  const digits = phoneValue?.replace(/\D/g, "") ?? "";
  return digits ? `https://wa.me/${digits}` : null;
}

function HeroCapabilities() {
  return (
    <section className="hero-capabilities relative" aria-labelledby="hero-capabilities-title">
      <h2 id="hero-capabilities-title" className="section-kicker">Capacidades principales</h2>
      <div className="hero-capability-groups">
        {heroTechnologyGroups.map((group) => (
          <article key={group.name} className="hero-capability-group">
            <h3>{group.name}</h3>
            <ul className="hero-technology-list">
              {group.technologies.map(({ label, Icon, color }) => (
                <li key={label}>
                  <Icon color={color} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
        <article className="hero-capability-group hero-capability-group-ai">
          <h3>AI</h3>
          <ul className="hero-ai-list">
            {heroAiCapabilities.map(({ label, meaning, Icon }) => (
              <li key={label}>
                <Icon aria-hidden="true" />
                <span><strong>{label}</strong> ({meaning})</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{eyebrow}</p>
      <h2 id={id} className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">{description}</p>
    </div>
  );
}

export function PortfolioPage() {
  const { content } = usePortfolioContent();
  const whatsappUrl = buildWhatsAppUrl(
    content.contacts.find((contact) => contact.platform === "phone")?.value,
  );

  function focusMainContent(event: MouseEvent<HTMLAnchorElement>) {
    const main = document.getElementById("contenido");
    if (!main) return;

    event.preventDefault();
    window.history.replaceState(null, "", "#contenido");
    main.focus({ preventScroll: true });
    main.scrollIntoView();
  }

  return (
    <div id="inicio" className="min-h-screen bg-[#06100e] text-slate-100">
      <a href="#contenido" className="skip-link" onClick={focusMainContent}>Saltar al contenido principal</a>
      <Navigation />

      <main id="contenido" tabIndex={-1}>
        <section className="hero-section section-shell" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-layout relative grid min-w-0 max-w-full items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-12">
            <div className="hero-copy min-w-0 max-w-full">
              <p className="section-kicker">{content.hero.eyebrow}</p>
              <h1 id="hero-title" className="hero-title text-gradient max-w-full font-semibold">
                {content.hero.headline}
              </h1>
              <p className="hero-description max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">{content.hero.description}</p>

              <div className="hero-actions flex min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={content.hero.primaryCtaHref} className="button-primary">
                  {content.hero.primaryCtaLabel}<ArrowDownRight className="size-5" aria-hidden="true" />
                </a>
                <a href="#contacto" className="button-secondary">
                  Contactar<ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a href={CV_PATH} target="_blank" rel="noopener noreferrer" className="button-secondary">
                  <FileText className="size-4" aria-hidden="true" />Ver CV
                </a>
              </div>

            </div>

            <figure className="hero-profile relative mx-auto min-w-0 w-full">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_20%,rgba(64,224,185,0.18),transparent_58%)] blur-xl" aria-hidden="true" />
              <div className="photo-placeholder hero-image-frame relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border border-emerald-200/20 bg-[#0a1714]">
                <Image
                  src="/foto-perfil.jpg"
                  alt={content.hero.photoLabel}
                  width={1024}
                  height={1024}
                  preload
                  sizes="(min-width: 640px) 24rem, calc(100vw - 2rem)"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <figcaption className="hero-profile-card relative rounded-2xl border border-white/10 bg-[#0b1815]/95 p-4 shadow-2xl backdrop-blur">
                <div className="hero-profile-identity">
                  <p className="font-mono text-[0.8rem] uppercase tracking-[0.12em] text-cyan-200">Perfil profesional</p>
                  <p className="hero-profile-name mt-2 font-semibold text-white">{content.hero.role}</p>
                </div>
                <p className="hero-profile-description text-sm leading-6 text-slate-300">{content.hero.profileDescription}</p>
              </figcaption>
            </figure>
          </div>
          <HeroCapabilities />
        </section>

        <section id="enfoque" className="section-shell border-y border-white/7 bg-[#081511]" aria-labelledby="enfoque-title">
          <SectionHeading
            id="enfoque-title"
            eyebrow="Enfoque Full Stack"
            title="Interfaces, APIs, datos y servicios conectados como una sola solución."
            description="En cada proyecto parto de una necesidad concreta y conecto experiencia de usuario, lógica de negocio, persistencia, integraciones y verificación. Integro inteligencia artificial cuando aporta valor dentro de límites claros."
          />
          <div className="mt-12">
            <OrchestrationDiagram />
          </div>
        </section>

        <section id="casos" className="section-shell" aria-labelledby="casos-title">
          <div>
            <SectionHeading
              id="casos-title"
              eyebrow="Experiencia y proyectos"
              title="Presento siete proyectos con aportes y detalles verificables."
              description="En cada ficha explico el propósito del producto, mi participación confirmada y las tecnologías utilizadas."
            />
          </div>
          <div className="mt-12 space-y-8 lg:mt-16 lg:space-y-12">
            {content.cases.map((entry, index) => <CaseStudy key={entry.id} entry={entry} index={index} />)}
          </div>
        </section>

        <section id="formacion" className="section-shell border-y border-white/7 bg-[#081511]" aria-labelledby="formacion-title">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                id="formacion-title"
                eyebrow="Formación"
                title="Formación que respalda mi trabajo en desarrollo de software."
                description="Presento mi formación académica sin atribuir fechas de finalización ni certificaciones que el CV no publica."
              />
            </div>
            <ol className="evolution-list">
              {content.education.map((entry, index) => (
                <li key={entry.id}>
                  <span className="evolution-marker">{index + 1}</span>
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.institution}</p>
                    {entry.details.length > 0 ? <p>{entry.details.join(" · ")}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contacto" className="section-shell" aria-labelledby="contacto-title">
          <div className="contact-panel">
            <div>
              <p className="section-kicker">Contacto</p>
              <h2 id="contacto-title" className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">Hablemos sobre desarrollo Full Stack e inteligencia artificial aplicada.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Estoy disponible para conversar sobre aplicaciones web y móviles, APIs, datos, integraciones y soluciones con Azure OpenAI.</p>
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escribir por WhatsApp (abre en una pestaña nueva)"
                  className="button-primary mt-8"
                >
                  Escribir por WhatsApp<ArrowUpRight className="size-5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <ul className="grid gap-3 self-end">
              {content.contacts.map((contact) => {
                const Icon = socialIcons[contact.platform];
                const external = contact.href ? isExternalHttpUrl(contact.href) : false;
                return (
                  <li key={contact.id}>
                    {contact.href ? (
                      <a href={contact.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="contact-link">
                        <span className="flex min-w-0 items-center gap-3"><Icon className="size-5 shrink-0 text-emerald-200" aria-hidden="true" /><span className="truncate">{contact.value}</span></span>
                        <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      </a>
                    ) : (
                      <div className="contact-link" aria-label={`${contact.label}: ${contact.value}`}>
                        <span className="flex min-w-0 items-center gap-3"><Icon className="size-5 shrink-0 text-emerald-200" aria-hidden="true" /><span className="truncate">{contact.value}</span></span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ronaldo Delgado · Full Stack Developer | AI Engineer</p>
          <div className="flex flex-wrap gap-5">
            <a href="https://linkedin.com/in/ronaldo-delgado" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href="https://github.com/RonaldoDelgado" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="mailto:ronalldocorrea@gmail.com" className="footer-link">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
