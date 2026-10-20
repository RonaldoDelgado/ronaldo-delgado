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
const PREVIOUS_LUHOS_SUMMARY =
  "Desarrollo Full Stack y de inteligencia artificial aplicada para aplicaciones empresariales web y móviles.";
const PREVIOUS_LUHOS_CONTRIBUTION =
  "Desarrollé funcionalidades y resolví incidencias en aplicaciones React.js y Flutter; integré Guesty y administré servidores y despliegues en Microsoft Azure. Construí un asistente empresarial multilingüe con Azure OpenAI y .NET 8/C#, integrado con interfaces web y móviles.";
const PREVIOUS_LUHOS_DETAILS = [
  "Aplicaciones empresariales web y móviles que conectan la operación con servicios externos como Guesty.",
  "Asistente empresarial multilingüe que clasifica solicitudes y responde con conocimiento aprobado y documentos.",
  "Sus flujos ofrecen respuestas estructuradas, herramientas de solo lectura y auditoría de conversaciones.",
] as const;
const PREVIOUS_GUDFY_SUMMARY =
  "Plataforma de comercio electrónico multivendedor con backend y frontend desacoplados mediante REST.";
const PREVIOUS_GUDFY_CONTRIBUTION =
  "Diseñé el modelo relacional en PostgreSQL, desarrollé la persistencia con TypeORM y optimicé consultas.";
const PREVIOUS_GUDFY_DETAILS = [
  "Permite comprar y vender dentro de un comercio multivendedor con rutas diferenciadas por rol.",
  "Gestiona productos manuales, códigos de activación, solicitudes de productos y comisiones por vendedor.",
  "Envía notificaciones en tiempo real y utiliza eventos y caché para apoyar la operación.",
] as const;
const PREVIOUS_GUD1_GUDFY_SUMMARY =
  "Comercio multivendedor con interfaces para compradores, vendedores y administradores y compra de productos digitales.";
const PREVIOUS_GUD1_GUDFY_CONTRIBUTION =
  "Participé en el desarrollo de las interfaces para compradores, vendedores y administradores, incluidos los recorridos de compra y acceso a códigos; diseñé el modelo relacional en PostgreSQL, desarrollé la persistencia con TypeORM y optimicé consultas.";
const PREVIOUS_GUD1_GUDFY_DETAILS = [
  "Los paneles por rol permiten comprar, gestionar productos y pedidos, atender solicitudes y administrar comisiones de vendedores.",
  "En pedidos regulares con códigos precargados, el comprador consulta sus códigos en la cuenta; tras confirmar el pago, el sistema intenta enviarlos también por correo electrónico.",
  "Los productos manuales requieren asignación del vendedor; la plataforma utiliza eventos, caché y notificaciones en tiempo real.",
] as const;
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
// Defaults published before the portfolio content was synced with the ATS CV.
// Hero description published with the ATS CV sync, before the Azure services wording.
const PREVIOUS_ATS_HERO_DESCRIPTION =
  "Full Stack Developer con más de 3 años de experiencia (desde julio de 2023) en el desarrollo de aplicaciones web y móviles, APIs REST y bases de datos relacionales. Mi stack principal incluye TypeScript, React, Next.js, Node.js/NestJS, .NET 8/C#, PostgreSQL y Flutter. He desarrollado plataformas de comercio electrónico multivendedor y de gestión de operaciones empresariales, desde el modelo de datos hasta las interfaces por rol y el despliegue en Microsoft Azure. Aplico IA con Azure OpenAI en asistentes internos con herramientas de solo lectura y auditoría.";
const PREVIOUS_AZURE_HERO_DESCRIPTION =
  "Full Stack Developer con más de 3 años de experiencia (desde julio de 2023) en el desarrollo de aplicaciones web y móviles, APIs REST y bases de datos relacionales. Mi stack principal incluye TypeScript, React, Next.js, Node.js/NestJS, .NET 8/C#, PostgreSQL y Flutter. He desarrollado plataformas de comercio electrónico multivendedor y de gestión de operaciones empresariales, desde el modelo de datos hasta las interfaces por rol y el despliegue en Microsoft Azure. Integro y administro servicios de Microsoft Azure (servidores y máquinas virtuales, bases de datos PostgreSQL, almacenamiento, monitoreo y analítica, traducción e IA con Azure OpenAI) y APIs de terceros para conectar sistemas y automatizar procesos.";
const PREVIOUS_CV_SYNC_HERO_DESCRIPTION =
  "Soy desarrollador Full Stack con experiencia en aplicaciones web y móviles, APIs REST y bases de datos relacionales. Trabajo con TypeScript, React, Next.js, Node.js, .NET y PostgreSQL en soluciones de comercio electrónico y gestión empresarial. He incorporado servicios externos de Microsoft Azure, AWS y otras plataformas para conectar sistemas, automatizar procesos y llevar productos desde la idea hasta producción. Mi enfoque profesional combina visión de producto, arquitectura mantenible, calidad, pruebas y mejora continua para construir soluciones preparadas para crecer.";
const PREVIOUS_CV_SYNC_PROFILE_DESCRIPTION = "Ingeniero en Sistemas";
const PREVIOUS_CV_SYNC_EDUCATION_TITLE = "Ingeniero de Sistemas";
const PREVIOUS_CV_SYNC_EDUCATION_DETAILS: readonly string[] = [];

interface PreviousCaseDefaults {
  category?: readonly string[];
  status?: readonly string[];
  summary?: readonly string[];
  contribution?: readonly string[];
  details?: readonly (readonly string[])[];
  technologies?: readonly (readonly string[])[];
  limitations?: readonly (readonly string[])[];
}

const PREVIOUS_CASE_DEFAULTS: Record<string, PreviousCaseDefaults> = {
  luhos: {
    category: ["Experiencia destacada · AI Engineer"],
    summary: [
      PREVIOUS_LUHOS_SUMMARY,
      "Plataforma para administrar servicios de hotelería y propiedades, con operaciones de limpieza, mantenimiento y gestión de scooters.",
    ],
    contribution: [
      PREVIOUS_LUHOS_CONTRIBUTION,
      "Desarrollé los flujos operativos y las interfaces para administradores y trabajadores en React y Flutter; integré Guesty, resolví incidencias y administré servidores y despliegues en Microsoft Azure. Con mi trabajo, contribuí a mejorar la productividad y reducir costos administrativos.",
    ],
    details: [
      LEGACY_CASE_DETAILS.luhos,
      PREVIOUS_LUHOS_DETAILS,
      [
        "Desarrollé la gestión de tareas de limpieza para administradores y trabajadores con prioridades baja, media y alta, asignaciones, horarios, listas de verificación y reportes de urgencia.",
        "Implementé el seguimiento de mantenimiento con una sola tarea activa por jornada, cierre diario y validación de proximidad por GPS al iniciar una tarea.",
        "Construí la gestión de inventario, entrega y recogida de scooters con registro de accesorios, fotografías, firma digital y evaluación de daños.",
        "Desarrollé reportes de piscinas y su panel administrativo con filtros, ordenamiento y paginación.",
        "Implementé ubicación GPS en Flutter con Geolocator y seguimiento cartográfico con Leaflet/OpenStreetMap.",
        "Construí un asistente interno con Azure OpenAI, conocimiento aprobado, herramientas de solo lectura de Luhos y Guesty y auditoría de conversaciones.",
        "Desarrollé plantillas de correo operativo y notificaciones en la aplicación.",
      ],
    ],
    technologies: [["React.js", "Flutter", "Guesty", "Microsoft Azure", "Azure OpenAI", ".NET 8", "C#"]],
  },
  ocho80: {
    category: ["Experiencia y proyecto destacado · Rifas y bingo digital"],
    status: ["En desarrollo", "Pendiente de publicación"],
    contribution: [
      "Participé en el desarrollo de una plataforma para organizar eventos, reservar boletos o cartones y seguir sorteos de bingo en tiempo real.",
    ],
    details: [
      LEGACY_CASE_DETAILS.ocho80,
      [
        "Implementé el flujo completo de rifas: publicación del evento, reserva de números, carga multipart de comprobantes, aprobación o rechazo manual y liberación automática de reservas vencidas.",
        "Construí el bingo en tiempo real con Socket.IO: balotas sorteadas, chat, cartones y detección de patrones ganadores.",
        "El producto está desarrollado y pendiente de publicación.",
      ],
      [
        "Permite a los organizadores crear eventos y gestionar planes, participaciones y reservas con vencimiento automático.",
        "Ofrece un panel para revisar comprobantes manualmente y controlar los sorteos de bingo.",
        "Permite a los participantes reservar boletos o cartones y seguir el sorteo en tiempo real desde una aplicación móvil.",
      ],
    ],
    limitations: [[
      "La estructura backend y las interfaces están en desarrollo.",
      "La aplicación de participantes utiliza mocks y carga simulada de comprobantes.",
      "La integración completa y el almacenamiento real están pendientes.",
      "La validación del pago corresponde al organizador.",
    ], ["Pendiente de publicación; la validación del pago corresponde al organizador."]],
  },
  gudfy: {
    category: ["Proyecto Full Stack · Comercio electrónico multivendedor"],
    summary: [
      PREVIOUS_GUDFY_SUMMARY,
      PREVIOUS_GUD1_GUDFY_SUMMARY,
      "Comercio multivendedor de productos digitales con catálogo dinámico, compra de códigos e interfaces para compradores, vendedores y administradores.",
    ],
    contribution: [
      PREVIOUS_GUDFY_CONTRIBUTION,
      PREVIOUS_GUD1_GUDFY_CONTRIBUTION,
      "Desarrollé las interfaces de compradores, vendedores y administradores, desde el catálogo y el carrito hasta los pedidos y el acceso a códigos. Diseñé el modelo relacional en PostgreSQL, desarrollé la persistencia con TypeORM y optimicé consultas.",
    ],
    details: [
      LEGACY_CASE_DETAILS.gudfy,
      PREVIOUS_GUDFY_DETAILS,
      PREVIOUS_GUD1_GUDFY_DETAILS,
      [
        "Creé un catálogo dinámico de productos disponibles y ordené las variantes serializadas según sus ventas.",
        "Desarrollé el carrito y la comprobación de existencias al crear cada pedido.",
        "Implementé la postulación de vendedores con revisión y correcciones, y las solicitudes de productos con su revisión.",
        "Construí el panel del vendedor para gestionar inventario de códigos, pedidos, billetera y solicitudes de retiro, junto con vistas administrativas.",
        "Desarrollé la compra y el acceso a los códigos adquiridos desde la cuenta del comprador.",
        "Integré el flujo de correo transaccional que solicita el envío de códigos al comprador tras confirmar el pago de pedidos regulares con códigos precargados; para los productos manuales, el vendedor asigna los códigos después.",
      ],
    ],
    technologies: [["Medusa v1", "TypeScript", "Next.js", "React", "REST", "PostgreSQL", "TypeORM", "Redis", "Socket.IO"]],
  },
  tanku: {
    category: ["Proyecto Full Stack · Comercio electrónico y funciones sociales"],
    summary: ["Plataforma multivendedor con comercio electrónico, comunicación en tiempo real y funciones sociales."],
    contribution: [
      "Participé en el desarrollo de una plataforma multivendedor con solicitudes de vendedores, chat en tiempo real, amistades, listas de deseos y regalos.",
    ],
    details: [
      LEGACY_CASE_DETAILS.tanku,
      [
        "Permite gestionar solicitudes de vendedores, productos, pedidos e inventario en un comercio multivendedor.",
        "Añade funciones sociales de amistades, listas de deseos y regalos.",
        "Incluye chat en tiempo real con presencia, escritura y salas de conversación, además de importación de productos desde Excel.",
      ],
    ],
    technologies: [["Medusa v2", "TypeScript", "PostgreSQL", "MikroORM", "Next.js", "React", "Excel", "Socket.IO"]],
  },
  "radio-navidad": {
    category: ["Proyecto Full Stack · Experiencia web para radio cristiana"],
    contribution: ["Participé en el desarrollo de una página con Next.js, TypeScript, Tailwind CSS y Framer Motion."],
    details: [LEGACY_CASE_DETAILS["radio-navidad"]],
    technologies: [["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "castlive.stream"]],
  },
  "calculadora-contenedores": {
    category: ["Proyecto complementario · Aplicación móvil"],
    contribution: [
      "Participé en el desarrollo de una aplicación cliente con vistas frontal, lateral, superior e isométrica para apoyar cálculos de distribución y capacidad.",
    ],
    details: [LEGACY_CASE_DETAILS["calculadora-contenedores"]],
  },
  "libres-en-cristo-jesus": {
    category: ["Proyecto complementario · Gestión congregacional"],
    summary: ["Sistema de gestión congregacional para organizar jerarquías, personas, asistencia y reportes."],
    contribution: [
      "Participé en el desarrollo de un sistema de gestión congregacional con jerarquías, personas, asistencia mediante QR y reportes Excel/PDF.",
    ],
    details: [
      LEGACY_CASE_DETAILS["libres-en-cristo-jesus"],
      [
        "Organiza jerarquías congregacionales y la información de las personas.",
        "Registra la asistencia mediante códigos QR.",
        "Genera reportes en Excel y PDF.",
      ],
    ],
    technologies: [["NestJS", "Next.js", "PostgreSQL", "TypeORM", "QR", "Excel", "PDF"]],
  },
};
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

/** Returns undefined for an exact previous default so the caller falls back to the current default. */
function withoutPreviousText(value: unknown, previous: readonly string[] | undefined): unknown {
  return typeof value === "string" && previous?.includes(value) ? undefined : value;
}

function migratedList(
  value: unknown,
  previous: readonly (readonly string[])[] | undefined,
  fallback: string[],
): string[] {
  return previous?.some((expected) => isExactStringList(value, expected))
    ? fallback
    : stringList(value, fallback);
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
  const previous = PREVIOUS_CASE_DEFAULTS[fallback.id] ?? {};
  const status = withoutPreviousText(entry.status, previous.status);

  return {
    id: fallback.id,
    name: text(entry.name, fallback.name),
    category: text(withoutPreviousText(entry.category, previous.category), fallback.category),
    status: typeof status === "string" && status.trim() ? status.trim() : fallback.status,
    summary: text(withoutPreviousText(entry.summary, previous.summary), fallback.summary),
    contribution: text(withoutPreviousText(entry.contribution, previous.contribution), fallback.contribution),
    details: migratedList(entry.details, previous.details, fallback.details),
    technologies: migratedList(entry.technologies, previous.technologies, fallback.technologies),
    limitations: migratedList(entry.limitations, previous.limitations, fallback.limitations),
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
  const isUniversity = fallback.id === "universidad-cundinamarca";
  const title = isUniversity
    ? withoutPreviousText(entry.title, [LEGACY_EDUCATION_TITLE, PREVIOUS_CV_SYNC_EDUCATION_TITLE])
    : entry.title;

  return {
    id: fallback.id,
    title: text(title, fallback.title),
    institution: text(entry.institution, fallback.institution),
    details: migratedList(entry.details, isUniversity ? [PREVIOUS_CV_SYNC_EDUCATION_DETAILS] : undefined, fallback.details),
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
      headline: text(
        withoutPreviousText(unsafe.hero?.headline, ["Full Stack Developer Semisenior | AI Engineer"]),
        defaultPortfolioContent.hero.headline,
      ),
      role: identityText(unsafe.hero?.role, defaultPortfolioContent.hero.role),
      description: text(
        withoutPreviousText(unsafe.hero?.description, [LEGACY_HERO_DESCRIPTION, PREVIOUS_CV_SYNC_HERO_DESCRIPTION, PREVIOUS_ATS_HERO_DESCRIPTION, PREVIOUS_AZURE_HERO_DESCRIPTION]),
        defaultPortfolioContent.hero.description,
      ),
      profileDescription: text(
        withoutPreviousText(unsafe.hero?.profileDescription, [LEGACY_PROFILE_DESCRIPTION, PREVIOUS_CV_SYNC_PROFILE_DESCRIPTION]),
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
