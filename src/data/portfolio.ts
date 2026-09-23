import type { PortfolioContent } from "@/types/portfolio";

export const PORTFOLIO_STORAGE_KEY = "portfolio-content-v6";
export const PREVIOUS_PORTFOLIO_STORAGE_KEY = "portfolio-content-v5";
export const LEGACY_PORTFOLIO_STORAGE_KEYS = [
  PREVIOUS_PORTFOLIO_STORAGE_KEY,
  "portfolio-content-v4",
  "portfolio-content-v3",
  "portfolio-content-v2",
  "portfolio-content-v1",
] as const;

export const CV_PATH = "/CV-Ronaldo-Delgado.pdf";

const unpublishedCaptureEvidenceNote =
  "No publico en el CV fechas, métricas, repositorios, demos, enlaces ni capturas para este proyecto.";
const publishedCaptureEvidenceNote =
  "Las capturas publicadas documentan la interfaz del proyecto. No publico fechas, métricas, repositorios, demos ni enlaces no verificados.";

export const defaultPortfolioContent: PortfolioContent = {
  hero: {
    eyebrow: "Desarrollo web, móvil e inteligencia artificial aplicada",
    headline: "Full Stack Developer | AI Engineer",
    role: "Ronaldo Delgado Correa",
    description:
      "Soy desarrollador Full Stack con experiencia en aplicaciones web y móviles, APIs REST y bases de datos relacionales. Trabajo con TypeScript, React, Next.js, Node.js, .NET y PostgreSQL en soluciones de comercio electrónico y gestión empresarial. Integro Azure OpenAI con conocimiento aprobado, herramientas de solo lectura y auditoría como parte de mi experiencia en AI Engineering. Conecto interfaces, datos y servicios externos, con atención a la mantenibilidad, las pruebas y el despliegue en Microsoft Azure.",
    profileDescription: "Ingeniero en Sistemas",
    photoLabel: "Ronaldo Delgado Correa",
    primaryCtaLabel: "Explorar proyectos",
    primaryCtaHref: "#casos",
  },
  cases: [
    {
      id: "luhos",
      name: "Luhos",
      category: "Experiencia destacada · AI Engineer",
      summary:
        "Desarrollo Full Stack y de inteligencia artificial aplicada para aplicaciones empresariales web y móviles.",
      contribution:
        "Desarrollé funcionalidades y resolví incidencias en aplicaciones React.js y Flutter; integré Guesty y administré servidores y despliegues en Microsoft Azure. Construí un asistente empresarial multilingüe con Azure OpenAI y .NET 8/C#, integrado con interfaces web y móviles.",
      details: [
        "Aplicaciones empresariales web y móviles que conectan la operación con servicios externos como Guesty.",
        "Asistente empresarial multilingüe que clasifica solicitudes y responde con conocimiento aprobado y documentos.",
        "Sus flujos ofrecen respuestas estructuradas, herramientas de solo lectura y auditoría de conversaciones.",
      ],
      technologies: ["React.js", "Flutter", "Guesty", "Microsoft Azure", "Azure OpenAI", ".NET 8", "C#"],
      limitations: [],
      aiScope:
        "Integré la IA dentro del alcance verificado: conocimiento aprobado, herramientas de solo lectura, respuestas estructuradas y auditoría. No atribuyo a este trabajo agentes autónomos ni RAG vectorial.",
      evidenceNote: publishedCaptureEvidenceNote,
      links: [],
      images: [
        { src: "/Luhos/Luhos_Principal.png", alt: "Vista principal de Luhos" },
        { src: "/Luhos/Luhos_2.png", alt: "Captura 2 de la interfaz de Luhos" },
        { src: "/Luhos/Luhos_3.png", alt: "Captura 3 de la interfaz de Luhos" },
        { src: "/Luhos/Luhos_4.png", alt: "Captura 4 de la interfaz de Luhos" },
        { src: "/Luhos/Luhos_5.png", alt: "Captura 5 de la interfaz de Luhos" },
        { src: "/Luhos/Luhos_6.png", alt: "Captura 6 de la interfaz de Luhos" },
        { src: "/Luhos/Luhos_7.png", alt: "Captura 7 de la interfaz de Luhos" },
        { src: "/Luhos/Luhos-admin-1.png", alt: "Captura 1 del panel administrativo de Luhos" },
        { src: "/Luhos/Luhos_admin_2.png", alt: "Captura 2 del panel administrativo de Luhos" },
        { src: "/Luhos/Luhos_admin_3.png", alt: "Captura 3 del panel administrativo de Luhos" },
        { src: "/Luhos/Luhos_admin_4.png", alt: "Captura 4 del panel administrativo de Luhos" },
      ],
    },
    {
      id: "ocho80",
      name: "Ocho80",
      category: "Experiencia y proyecto destacado · Rifas y bingo digital",
      status: "En desarrollo",
      summary:
        "Plataforma para organizar eventos, reservar boletos o cartones y seguir sorteos de bingo en tiempo real.",
      contribution:
        "Participé en el desarrollo de una plataforma para organizar eventos, reservar boletos o cartones y seguir sorteos de bingo en tiempo real.",
      details: [
        "Permite a los organizadores crear eventos y gestionar planes, participaciones y reservas con vencimiento automático.",
        "Ofrece un panel para revisar comprobantes manualmente y controlar los sorteos de bingo.",
        "Permite a los participantes reservar boletos o cartones y seguir el sorteo en tiempo real desde una aplicación móvil.",
      ],
      technologies: ["NestJS", "Prisma", "PostgreSQL", "Socket.IO", "React", "Vite", "Flutter"],
      limitations: [
        "La estructura backend y las interfaces están en desarrollo.",
        "La aplicación de participantes utiliza mocks y carga simulada de comprobantes.",
        "La integración completa y el almacenamiento real están pendientes.",
        "La validación del pago corresponde al organizador.",
      ],
      evidenceNote: publishedCaptureEvidenceNote,
      links: [],
      images: [
        { src: "/Ocho80/Ocho80_Principal.png", alt: "Vista principal de Ocho80" },
        { src: "/Ocho80/Ocho80_1.png", alt: "Captura 1 de la interfaz de Ocho80" },
        { src: "/Ocho80/Ocho80_2.png", alt: "Captura 2 de la interfaz de Ocho80" },
        { src: "/Ocho80/Ocho80_3.png", alt: "Captura 3 de la interfaz de Ocho80" },
        { src: "/Ocho80/Ocho80_4.png", alt: "Captura 4 de la interfaz de Ocho80" },
        { src: "/Ocho80/Ocho80_5.png", alt: "Captura 5 de la interfaz de Ocho80" },
        { src: "/Ocho80/Ocho80_6.png", alt: "Captura 6 de la interfaz de Ocho80" },
        { src: "/Ocho80/Ocho80_7.png", alt: "Captura 7 de la interfaz de Ocho80" },
      ],
    },
    {
      id: "gudfy",
      name: "Gudfy",
      category: "Proyecto Full Stack · Comercio electrónico multivendedor",
      summary:
        "Plataforma de comercio electrónico multivendedor con backend y frontend desacoplados mediante REST.",
      contribution:
        "Diseñé el modelo relacional en PostgreSQL, desarrollé la persistencia con TypeORM y optimicé consultas.",
      details: [
        "Permite comprar y vender dentro de un comercio multivendedor con rutas diferenciadas por rol.",
        "Gestiona productos manuales, códigos de activación, solicitudes de productos y comisiones por vendedor.",
        "Envía notificaciones en tiempo real y utiliza eventos y caché para apoyar la operación.",
      ],
      technologies: ["Medusa v1", "TypeScript", "Next.js", "React", "REST", "PostgreSQL", "TypeORM", "Redis", "Socket.IO"],
      limitations: [],
      evidenceNote: publishedCaptureEvidenceNote,
      links: [],
      images: [
        { src: "/Gudfy/Gudfy_principal.png", alt: "Vista principal de Gudfy" },
        { src: "/Gudfy/Gudfy_1.png", alt: "Captura 1 de la interfaz de Gudfy" },
        { src: "/Gudfy/Gudfy_2.png", alt: "Captura 2 de la interfaz de Gudfy" },
        { src: "/Gudfy/Gudfy_3.png", alt: "Captura 3 de la interfaz de Gudfy" },
        { src: "/Gudfy/Gudfy_4.png", alt: "Captura 4 de la interfaz de Gudfy" },
        { src: "/Gudfy/Gudfy_5.png", alt: "Captura 5 de la interfaz de Gudfy" },
      ],
    },
    {
      id: "tanku",
      name: "Tanku",
      category: "Proyecto Full Stack · Comercio electrónico y funciones sociales",
      summary:
        "Plataforma multivendedor con comercio electrónico, comunicación en tiempo real y funciones sociales.",
      contribution:
        "Participé en el desarrollo de una plataforma multivendedor con solicitudes de vendedores, chat en tiempo real, amistades, listas de deseos y regalos.",
      details: [
        "Permite gestionar solicitudes de vendedores, productos, pedidos e inventario en un comercio multivendedor.",
        "Añade funciones sociales de amistades, listas de deseos y regalos.",
        "Incluye chat en tiempo real con presencia, escritura y salas de conversación, además de importación de productos desde Excel.",
      ],
      technologies: ["Medusa v2", "TypeScript", "PostgreSQL", "MikroORM", "Next.js", "React", "Excel", "Socket.IO"],
      limitations: [],
      evidenceNote: publishedCaptureEvidenceNote,
      links: [],
      images: [
        { src: "/Tanku/Tanku_principal.png", alt: "Vista principal de Tanku" },
        { src: "/Tanku/Tanku_1.png", alt: "Captura 1 de la interfaz de Tanku" },
        { src: "/Tanku/Tanku_2.png", alt: "Captura 2 de la interfaz de Tanku" },
        { src: "/Tanku/Tanku_3.png", alt: "Captura 3 de la interfaz de Tanku" },
        { src: "/Tanku/Tanku_4.png", alt: "Captura 4 de la interfaz de Tanku" },
      ],
    },
    {
      id: "radio-navidad",
      name: "Radio Navidad",
      category: "Proyecto Full Stack · Experiencia web para radio cristiana",
      summary:
        "Experiencia web para una radio cristiana con reproducción en vivo y administración de contenido visual.",
      contribution:
        "Participé en el desarrollo de una página con Next.js, TypeScript, Tailwind CSS y Framer Motion.",
      details: [
        "Permite escuchar en vivo una señal externa de castlive.stream y consultar programación, versículos e información institucional.",
        "Incluye una portada animada y administración del carrusel de contenido visual.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "castlive.stream"],
      limitations: ["La solución no incluye un backend de transmisión propio."],
      evidenceNote: unpublishedCaptureEvidenceNote,
      links: [],
      images: [],
    },
    {
      id: "calculadora-contenedores",
      name: "Calculadora de contenedores",
      category: "Proyecto complementario · Aplicación móvil",
      summary:
        "Aplicación cliente para calcular orientación de cajas, capas, palés, capacidad y peso.",
      contribution:
        "Participé en el desarrollo de una aplicación cliente con vistas frontal, lateral, superior e isométrica para apoyar cálculos de distribución y capacidad.",
      details: [
        "Calcula la orientación de cajas, capas, palés, capacidad y peso para apoyar la distribución de carga.",
        "Muestra la distribución en vistas frontal, lateral, superior e isométrica mediante SVG.",
      ],
      technologies: ["Expo", "React Native", "SVG"],
      limitations: ["Aplicación cliente sin backend."],
      evidenceNote: unpublishedCaptureEvidenceNote,
      links: [],
      images: [],
    },
    {
      id: "libres-en-cristo-jesus",
      name: "Libres en Cristo Jesús",
      category: "Proyecto complementario · Gestión congregacional",
      summary:
        "Sistema de gestión congregacional para organizar jerarquías, personas, asistencia y reportes.",
      contribution:
        "Participé en el desarrollo de un sistema de gestión congregacional con jerarquías, personas, asistencia mediante QR y reportes Excel/PDF.",
      details: [
        "Organiza jerarquías congregacionales y la información de las personas.",
        "Registra la asistencia mediante códigos QR.",
        "Genera reportes en Excel y PDF.",
      ],
      technologies: ["NestJS", "Next.js", "PostgreSQL", "TypeORM", "QR", "Excel", "PDF"],
      limitations: [],
      evidenceNote: unpublishedCaptureEvidenceNote,
      links: [],
      images: [],
    },
  ],
  education: [
    {
      id: "universidad-cundinamarca",
      title: "Estudios en Ingeniería de Sistemas",
      institution: "Universidad de Cundinamarca",
      details: [],
    },
    {
      id: "platzi-full-stack",
      title: "Estudios en desarrollo Full Stack",
      institution: "Platzi",
      details: ["Next.js, JavaScript, TypeScript, TypeORM y PostgreSQL"],
    },
    {
      id: "sena-unity",
      title: "Estudios en programación básica de videojuegos con Unity 3D",
      institution: "SENA",
      details: [],
    },
  ],
  contacts: [
    {
      id: "contact-location",
      platform: "location",
      label: "Ubicación",
      value: "Chía, Colombia",
    },
    {
      id: "contact-phone",
      platform: "phone",
      label: "Teléfono",
      value: "+57 313 748 5788",
      href: "tel:+573137485788",
    },
    {
      id: "contact-email",
      platform: "email",
      label: "Email",
      value: "ronaldocorrea@gmail.com",
      href: "mailto:ronaldocorrea@gmail.com",
    },
    {
      id: "contact-linkedin",
      platform: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/ronaldo-delgado",
      href: "https://linkedin.com/in/ronaldo-delgado",
    },
    {
      id: "contact-github",
      platform: "github",
      label: "GitHub",
      value: "github.com/RonaldoDelgado",
      href: "https://github.com/RonaldoDelgado",
    },
  ],
};

export const deliveryStages = [
  { step: "01", title: "Necesidad", detail: "Contexto, alcance y objetivos verificables" },
  { step: "02", title: "Interfaz", detail: "Experiencias web y móviles claras" },
  { step: "03", title: "APIs", detail: "Contratos y flujos entre aplicaciones" },
  { step: "04", title: "Datos", detail: "Persistencia relacional y consultas" },
  { step: "05", title: "Servicios / IA", detail: "Integraciones externas y capacidades aplicadas" },
  { step: "06", title: "Entrega", detail: "Pruebas, despliegue y seguimiento" },
] as const;

export const systemLayers = [
  {
    name: "Frontend y aplicaciones móviles",
    purpose: "Construcción de interfaces web y móviles.",
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Flutter", "Dart", "React Native", "Expo"],
  },
  {
    name: "Backend y APIs",
    purpose: "Servicios, módulos de negocio e integración mediante APIs.",
    technologies: ["Node.js", "NestJS", "Medusa", ".NET 8", "ASP.NET Core", "C#", "APIs REST", "Socket.IO"],
  },
  {
    name: "Datos y persistencia",
    purpose: "Modelado relacional, persistencia y consultas.",
    technologies: ["PostgreSQL", "SQL", "TypeORM", "MikroORM", "Prisma", "Entity Framework Core", "Redis"],
  },
  {
    name: "Inteligencia artificial aplicada",
    purpose: "Integración de modelos con conocimiento y límites operativos.",
    technologies: ["Azure OpenAI", "Integración de LLM", "Clasificación de intenciones", "Respuestas estructuradas", "Recuperación de conocimiento"],
  },
  {
    name: "Cloud y entrega",
    purpose: "Administración, despliegue y control de versiones.",
    technologies: ["Microsoft Azure", "Administración de servidores", "Despliegue de aplicaciones", "Git", "GitHub"],
  },
  {
    name: "Seguridad y calidad",
    purpose: "Protección de acceso, evolución del software y verificación.",
    technologies: ["JWT", "Control de acceso por roles", "Migraciones", "Pruebas unitarias", "Pruebas de integración", "Arquitectura modular", "Scrum"],
  },
] as const;

export const buildProcess = [
  ["Entender", "Alinear la necesidad, el contexto y el alcance verificable."],
  ["Diseñar", "Separar interfaces, servicios, datos y responsabilidades."],
  ["Desarrollar", "Construir aplicaciones web, móviles y APIs mantenibles."],
  ["Integrar", "Conectar persistencia, servicios externos e inteligencia artificial cuando aporta valor."],
  ["Verificar", "Probar flujos, revisar límites y preparar el despliegue."],
] as const;

export const professionalEvolution = [
  ["Ingeniería de Sistemas", "Estudios en la Universidad de Cundinamarca."],
  ["Desarrollo Full Stack", "Estudios en Platzi con Next.js, JavaScript, TypeScript, TypeORM y PostgreSQL."],
  ["Programación de videojuegos", "Estudios básicos con Unity 3D en el SENA."],
] as const;
