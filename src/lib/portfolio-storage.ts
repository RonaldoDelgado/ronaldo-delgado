import {
  defaultPortfolioContent,
  LEGACY_PORTFOLIO_STORAGE_KEYS,
  PORTFOLIO_STORAGE_KEY,
} from "@/data/portfolio";
import type {
  CaseImage,
  CaseLink,
  CaseStudyEntry,
  ContactPlatform,
  ContactEntry,
  EducationEntry,
  PortfolioContent,
} from "@/types/portfolio";

const MAX_LOCAL_PATH_DECODE_PASSES = 4;
const LEGACY_DEFAULT_IDENTITY = "Ronaldo Delgado";
const LEGACY_PROFILE_DESCRIPTION =
  "Desarrollo aplicaciones web y móviles, APIs REST y soluciones de datos, con experiencia integrando inteligencia artificial de forma controlada.";
const LEGACY_EDUCATION_TITLE = "Estudios en Ingeniería de Sistemas";
const LEGACY_HERO_DESCRIPTION =
  "Soy desarrollador Full Stack con experiencia en aplicaciones web y móviles, APIs REST y bases de datos relacionales. Trabajo con TypeScript, React, Next.js, Node.js, .NET y PostgreSQL en soluciones de comercio electrónico y gestión empresarial. Integro Azure OpenAI con conocimiento aprobado, herramientas de solo lectura y auditoría como parte de mi experiencia en AI Engineering. Conecto interfaces, datos y servicios externos, con atención a la mantenibilidad, las pruebas y el despliegue en Microsoft Azure.";
const LEGACY_CASE_DETAILS = {
  luhos: [
    "Clasificación y enrutamiento de intenciones, respuestas estructuradas y recuperación de conocimiento aprobado y documentos.",
    "Herramientas de solo lectura y auditoría de conversaciones.",
    "Pruebas para los flujos de intención, documentos, conocimiento y herramientas.",
  ],
  ocho80: [
    "Backend NestJS, Prisma y PostgreSQL con eventos, participaciones, planes, vencimiento automático de reservas y Socket.IO.",
    "Panel React/Vite para eventos, revisión manual de comprobantes y control del sorteo.",
    "Aplicación Flutter para participantes.",
  ],
  gudfy: [
    "Backend Medusa v1/TypeScript y frontend Next.js/React desacoplados mediante REST.",
    "Compra y venta, rutas por rol, productos manuales, códigos de activación, solicitudes de productos y comisiones por vendedor.",
    "Redis para eventos y caché, y Socket.IO para notificaciones.",
  ],
  tanku: [
    "Monorepo con backend Medusa v2/TypeScript, PostgreSQL y MikroORM, y frontend Next.js/React basado en la tienda oficial de Medusa.",
    "Módulos de negocio para vendedores, pedidos e inventario e importación de productos desde Excel.",
    "Chat Socket.IO con presencia, escritura y salas de conversación.",
  ],
  "radio-navidad": [
    "Portada animada, reproductor en vivo, programación, versículos, secciones institucionales y administración del carrusel.",
    "Reproducción de una señal externa de castlive.stream.",
  ],
  "calculadora-contenedores": [
    "Cálculo de orientación de cajas, capas, palés, capacidad y peso.",
    "Visualizaciones frontal, lateral, superior e isométrica mediante SVG.",
  ],
  "libres-en-cristo-jesus": [
    "Gestión de jerarquías y personas.",
    "Registro de asistencia mediante QR.",
    "Generación de reportes Excel y PDF.",
  ],
} as const;
const controlCharacterPattern = /[\u0000-\u001f\u007f-\u009f]/;
const encodedPathSeparatorPattern = /%(?:2f|5c)/i;

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function identityText(value: unknown, fallback: string): string {
  const normalized = text(value, fallback);
  return normalized === LEGACY_DEFAULT_IDENTITY ? fallback : normalized;
}

function stringList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  return value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0).map((entry) => entry.trim());
}

function isExactStringList(value: unknown, expected: readonly string[]): boolean {
  return Array.isArray(value)
    && value.length === expected.length
    && value.every((entry, index) => entry === expected[index]);
}

function migratedDetails(value: unknown, fallback: CaseStudyEntry): string[] {
  const legacyDetails = LEGACY_CASE_DETAILS[fallback.id as keyof typeof LEGACY_CASE_DETAILS];
  return legacyDetails && isExactStringList(value, legacyDetails)
    ? fallback.details
    : stringList(value, fallback.details);
}

export function sanitizePortfolioHref(value: unknown, fallback = "#"): string {
  if (typeof value !== "string") return fallback;
  const candidate = value.trim();

  if (/^#[a-z][a-z0-9-]*$/i.test(candidate)) return candidate;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

function sanitizeContactHref(
  value: unknown,
  fallback: string | undefined,
  platform: ContactPlatform,
): string | undefined {
  if (platform === "location") return undefined;

  if (typeof value === "string") {
    const candidate = value.trim();
    if (platform === "email" && /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(candidate)) {
      return candidate;
    }
    if (platform === "phone" && /^tel:\+?[0-9]{7,15}$/i.test(candidate)) return candidate;
  }

  if (platform === "email" || platform === "phone") return fallback;
  const sanitized = sanitizePortfolioHref(value, fallback ?? "");
  return sanitized || fallback;
}

function isSafeLocalImagePath(candidate: string): boolean {
  const pathname = candidate.split(/[?#]/, 1)[0];
  let decodedPathname = pathname;

  for (let pass = 0; pass < MAX_LOCAL_PATH_DECODE_PASSES; pass += 1) {
    if (
      controlCharacterPattern.test(decodedPathname) ||
      encodedPathSeparatorPattern.test(decodedPathname)
    ) {
      return false;
    }

    let nextPathname: string;
    try {
      nextPathname = decodeURIComponent(decodedPathname);
    } catch {
      return false;
    }

    if (nextPathname === decodedPathname) {
      if (decodedPathname.includes("\\")) return false;

      return decodedPathname
        .split(/[\\/]/)
        .every(
          (segment) =>
            segment !== "." &&
            segment !== ".." &&
            !controlCharacterPattern.test(segment),
        );
    }

    decodedPathname = nextPathname;
  }

  return false;
}

export function sanitizeImageSrc(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  if (controlCharacterPattern.test(value)) return fallback;

  const candidate = value.trim();
  if (!candidate || /\s/.test(candidate)) return fallback;

  if (candidate.startsWith("/") && !candidate.startsWith("//")) {
    return isSafeLocalImagePath(candidate) ? candidate : fallback;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export function isExternalHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function normalizeImages(value: unknown, fallback: CaseImage[]): CaseImage[] {
  if (!Array.isArray(value)) return fallback;

  const images = value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const image = entry as Partial<CaseImage>;
    const src = sanitizeImageSrc(image.src);
    if (!src || typeof image.alt !== "string" || !image.alt.trim()) return [];
    return [{ src, alt: image.alt.trim() }];
  });

  return images.length > 0 ? images : fallback;
}

function normalizeLinks(value: unknown): CaseLink[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const link = entry as Partial<CaseLink>;
    const href = sanitizePortfolioHref(link.href, "");
    if (!href || typeof link.label !== "string" || !link.label.trim()) return [];
    return [{ href, label: link.label.trim() }];
  });
}

function normalizeCase(value: unknown, fallback: CaseStudyEntry): CaseStudyEntry {
  const entry = value && typeof value === "object" ? (value as Partial<CaseStudyEntry>) : {};

  return {
    id: fallback.id,
    name: text(entry.name, fallback.name),
    category: text(entry.category, fallback.category),
    status: typeof entry.status === "string" && entry.status.trim() ? entry.status.trim() : fallback.status,
    summary: text(entry.summary, fallback.summary),
    contribution: text(entry.contribution, fallback.contribution),
    details: migratedDetails(entry.details, fallback),
    technologies: stringList(entry.technologies, fallback.technologies),
    limitations: stringList(entry.limitations, fallback.limitations),
    aiScope: typeof entry.aiScope === "string" && entry.aiScope.trim() ? entry.aiScope.trim() : fallback.aiScope,
    evidenceNote: text(entry.evidenceNote, fallback.evidenceNote),
    links: normalizeLinks(entry.links),
    images: normalizeImages(entry.images, fallback.images),
  };
}

function normalizeContact(value: unknown, fallback: ContactEntry): ContactEntry {
  const entry = value && typeof value === "object" ? (value as Partial<ContactEntry>) : {};

  return {
    id: fallback.id,
    platform: fallback.platform,
    label: text(entry.label, fallback.label),
    value: text(entry.value, fallback.value),
    href: sanitizeContactHref(entry.href, fallback.href, fallback.platform),
  };
}

function normalizeEducation(value: unknown, fallback: EducationEntry): EducationEntry {
  const entry = value && typeof value === "object" ? (value as Partial<EducationEntry>) : {};
  const title = fallback.id === "universidad-cundinamarca" && entry.title === LEGACY_EDUCATION_TITLE
    ? fallback.title
    : entry.title;

  return {
    id: fallback.id,
    title: text(title, fallback.title),
    institution: text(entry.institution, fallback.institution),
    details: stringList(entry.details, fallback.details),
  };
}

function entriesById(value: unknown): Map<string, unknown> {
  if (!Array.isArray(value)) return new Map();

  return new Map(
    value.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const id = (entry as { id?: unknown }).id;
      return typeof id === "string" && id.trim() ? [[id.trim(), entry] as const] : [];
    }),
  );
}

export function normalizePortfolioContent(input: unknown): PortfolioContent {
  if (!input || typeof input !== "object") return defaultPortfolioContent;
  const unsafe = input as Partial<PortfolioContent>;
  const casesById = entriesById(unsafe.cases);
  const educationById = entriesById(unsafe.education);
  const contactsById = entriesById(unsafe.contacts);

  return {
    hero: {
      eyebrow: text(unsafe.hero?.eyebrow, defaultPortfolioContent.hero.eyebrow),
      headline: text(unsafe.hero?.headline, defaultPortfolioContent.hero.headline),
      role: identityText(unsafe.hero?.role, defaultPortfolioContent.hero.role),
      description: text(
        unsafe.hero?.description === LEGACY_HERO_DESCRIPTION
          ? defaultPortfolioContent.hero.description
          : unsafe.hero?.description,
        defaultPortfolioContent.hero.description,
      ),
      profileDescription: text(
        unsafe.hero?.profileDescription === LEGACY_PROFILE_DESCRIPTION
          ? defaultPortfolioContent.hero.profileDescription
          : unsafe.hero?.profileDescription,
        defaultPortfolioContent.hero.profileDescription,
      ),
      photoLabel: identityText(unsafe.hero?.photoLabel, defaultPortfolioContent.hero.photoLabel),
      primaryCtaLabel: text(unsafe.hero?.primaryCtaLabel, defaultPortfolioContent.hero.primaryCtaLabel),
      primaryCtaHref: sanitizePortfolioHref(
        unsafe.hero?.primaryCtaHref,
        defaultPortfolioContent.hero.primaryCtaHref,
      ),
    },
    cases: defaultPortfolioContent.cases.map((fallback) =>
      normalizeCase(casesById.get(fallback.id), fallback),
    ),
    education: defaultPortfolioContent.education.map((fallback) =>
      normalizeEducation(educationById.get(fallback.id), fallback),
    ),
    contacts: defaultPortfolioContent.contacts.map((fallback) =>
      normalizeContact(contactsById.get(fallback.id), fallback),
    ),
  };
}

export interface PortfolioStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface PortfolioLoadResult {
  cacheKey: string;
  content: PortfolioContent;
  storageAvailable: boolean;
}

function retireLegacyContent(storage: PortfolioStorage): void {
  for (const key of LEGACY_PORTFOLIO_STORAGE_KEYS) {
    try {
      storage.removeItem(key);
    } catch {
      // Legacy preview data is ignored even when this best-effort cleanup fails.
    }
  }
}

export function loadPortfolioContent(storage: PortfolioStorage): PortfolioLoadResult {
  try {
    const currentRaw = storage.getItem(PORTFOLIO_STORAGE_KEY);

    if (currentRaw !== null) {
      try {
        return {
          cacheKey: `v8:${currentRaw}`,
          content: normalizePortfolioContent(JSON.parse(currentRaw)),
          storageAvailable: true,
        };
      } catch {
        return {
          cacheKey: `v8-corrupt:${currentRaw}`,
          content: defaultPortfolioContent,
          storageAvailable: true,
        };
      }
    }

    const legacyEntry = LEGACY_PORTFOLIO_STORAGE_KEYS
      .map((key) => [key, storage.getItem(key)] as const)
      .find((entry): entry is readonly [typeof LEGACY_PORTFOLIO_STORAGE_KEYS[number], string] => entry[1] !== null);

    if (legacyEntry) {
      const [legacyKey, legacyRaw] = legacyEntry;
      let migratedContent: PortfolioContent;

      try {
        migratedContent = normalizePortfolioContent(JSON.parse(legacyRaw));
      } catch {
        retireLegacyContent(storage);
        return {
          cacheKey: `v8-migration-corrupt:${legacyKey}:${legacyRaw}`,
          content: defaultPortfolioContent,
          storageAvailable: true,
        };
      }

      const migratedRaw = JSON.stringify(migratedContent);

      try {
        storage.setItem(PORTFOLIO_STORAGE_KEY, migratedRaw);
      } catch {
        return {
          cacheKey: `v8-migration-memory:${legacyKey}:${legacyRaw}`,
          content: migratedContent,
          storageAvailable: false,
        };
      }

      retireLegacyContent(storage);
      return {
        cacheKey: `v8:${migratedRaw}`,
        content: migratedContent,
        storageAvailable: true,
      };
    }

    retireLegacyContent(storage);
    return { cacheKey: "v8-empty", content: defaultPortfolioContent, storageAvailable: true };
  } catch {
    return {
      cacheKey: "storage-unavailable",
      content: defaultPortfolioContent,
      storageAvailable: false,
    };
  }
}
