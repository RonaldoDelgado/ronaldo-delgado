import type { PortfolioContent } from "@/types/portfolio";

export const PORTFOLIO_STORAGE_KEY = "portfolio-content-v8";
export const PREVIOUS_PORTFOLIO_STORAGE_KEY = "portfolio-content-v7";
export const LEGACY_PORTFOLIO_STORAGE_KEYS = [
  PREVIOUS_PORTFOLIO_STORAGE_KEY,
  "portfolio-content-v6",
  "portfolio-content-v5",
  "portfolio-content-v4",
  "portfolio-content-v3",
  "portfolio-content-v2",
  "portfolio-content-v1",
] as const;

export const CV_PATH = "/ronaldo-delgado-cv.html";
export const CV_EN_PATH = "/ronaldo-delgado-cv-en.html";

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
      "Full Stack Developer con más de 3 años de experiencia (desde julio de 2023) en el desarrollo de aplicaciones web y móviles, APIs REST y bases de datos relacionales. Mi stack principal incluye TypeScript, React, Next.js, Node.js/NestJS, .NET 8/C#, PostgreSQL y Flutter. He desarrollado plataformas de comercio electrónico multivendedor y de gestión de operaciones empresariales, desde el modelo de datos hasta las interfaces por rol y el despliegue en Microsoft Azure. Aplico IA con Azure OpenAI en asistentes internos con herramientas de solo lectura y auditoría.",
    profileDescription: "Ingeniero de Sistemas graduado de la Universidad de Cundinamarca",
    photoLabel: "Ronaldo Delgado Correa",
    primaryCtaLabel: "Explorar proyectos",
    primaryCtaHref: "#casos",
  },
  cases: [
    {
      id: "luhos",
      name: "Luhos",
      category: "Experiencia laboral · Full Stack Developer",
      status: "oct. 2025 – actualidad · Empleado, tiempo completo",
      summary:
        "Plataforma que centraliza la administración de servicios de hotelería y propiedades: limpieza, mantenimiento y gestión de scooters.",
      contribution:
        "Desarrollé los flujos operativos por rol para administradores y trabajadores en React (web) y Flutter (móvil): tareas de limpieza con prioridades, asignaciones, horarios, listas de verificación y reportes de urgencia.",
      details: [
        "Implementé la API en .NET 8 y ASP.NET Core con Entity Framework Core, PostgreSQL y autenticación JWT/Identity, e integré Guesty mediante OAuth y su API.",
        "Construí el seguimiento de mantenimiento con validación de proximidad por GPS y mapas con Leaflet/OpenStreetMap, y el inventario, la entrega y la recogida de scooters con fotografías, firma digital y evaluación de daños.",
        "Diseñé un asistente interno con Azure OpenAI basado en conocimiento aprobado, herramientas de solo lectura sobre datos de Luhos y Guesty y registro de auditoría.",
        "Automaticé los despliegues con GitHub Actions hacia Azure App Service y Azure Static Web Apps, publicando en producción solo mediante tags de versión; administré los servidores, el almacenamiento en Azure Blob Storage y resolví incidencias de la plataforma.",
        "Diseñé el flujo de ramas y releases (feature → develop → staging → main) en los cuatro repositorios del producto, con un entorno de staging previo a producción.",
      ],
      technologies: [
        "React 18", "TypeScript", "Vite", "Zustand", "Tailwind CSS", "Flutter", "Dart", "Riverpod", "Firebase Messaging",
        ".NET 8", "ASP.NET Core", "C#", "Entity Framework Core", "PostgreSQL", "JWT/Identity", "Hangfire", "Azure OpenAI",
        "Azure Blob Storage", "Guesty API", "Leaflet/OpenStreetMap", "Microsoft Azure", "Azure App Service",
        "Azure Static Web Apps", "GitHub Actions", "xUnit", "Moq", "Jest", "Flutter Test",
      ],
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
      category: "Proyecto propio · Rifas y bingo digital",
      status: "Completado",
      summary:
        "Plataforma para organizar eventos, reservar boletos o cartones y seguir sorteos de bingo en tiempo real.",
      contribution:
        "Desarrollé el backend con NestJS, Prisma y PostgreSQL, el panel administrativo con React/Vite y la aplicación de participantes con Flutter.",
      details: [
        "Implementé el flujo completo de rifas: publicación del evento, reserva de números, carga multipart de comprobantes, aprobación o rechazo manual y liberación automática de reservas vencidas.",
        "Construí el bingo en tiempo real con Socket.IO: balotas sorteadas, chat, cartones y detección de patrones ganadores.",
      ],
      technologies: ["NestJS", "Prisma", "PostgreSQL", "Socket.IO", "React", "Vite", "Flutter"],
      limitations: ["La validación del pago corresponde al organizador."],
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
      category: "Experiencia laboral · Full Stack Developer",
      status: "jul. 2023 – sep. 2025 · Empleado, tiempo completo",
      summary:
        "Comercio electrónico multivendedor de productos digitales con compra y acceso a códigos desde la cuenta del comprador.",
      contribution:
        "Desarrollé las interfaces para compradores, vendedores y administradores, desde el catálogo y el carrito hasta los pedidos y el acceso a los códigos adquiridos.",
      details: [
        "Diseñé el modelo relacional en PostgreSQL, implementé la persistencia con TypeORM y optimicé consultas.",
        "Implementé el carrito con comprobación de existencias al crear cada pedido y un catálogo dinámico que ordena las variantes serializadas según sus ventas.",
        "Construí el panel del vendedor para inventario de códigos, pedidos, billetera y solicitudes de retiro, junto con las postulaciones de vendedores y las solicitudes de productos con revisión.",
        "Integré el flujo de correo transaccional que envía los códigos al comprador tras confirmar el pago de pedidos con códigos precargados.",
      ],
      technologies: ["Medusa v1", "TypeScript", "Next.js", "React", "APIs REST", "PostgreSQL", "TypeORM"],
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
      category: "Experiencia laboral · Full Stack Developer",
      status: "ene. 2025 – oct. 2025 · Empleado, medio tiempo",
      summary:
        "Plataforma multivendedor que combina comercio electrónico, comunicación en tiempo real y funciones sociales.",
      contribution:
        "Desarrollé módulos de vendedores, solicitudes de vendedores, pedidos e inventario sobre Medusa v2 con TypeScript, PostgreSQL y MikroORM.",
      details: [
        "Implementé la importación de productos desde archivos Excel.",
        "Construí el chat en tiempo real con Socket.IO, con presencia, indicador de escritura y salas de conversación.",
        "Desarrollé funciones sociales de amistades, listas de deseos y regalos con Next.js y React.",
      ],
      technologies: ["Medusa v2", "TypeScript", "PostgreSQL", "MikroORM", "Next.js", "React", "Socket.IO"],
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
      category: "Proyecto propio · Experiencia web para radio cristiana",
      summary:
        "Experiencia web para una radio cristiana con reproducción en vivo y administración de contenido visual.",
      contribution:
        "Desarrollé un sitio de radio web con reproductor en vivo, programación, versículos y administración del carrusel con Next.js, TypeScript, Tailwind CSS y Framer Motion.",
      details: [
        "Permite escuchar en vivo una señal externa de castlive.stream y consultar programación, versículos e información institucional.",
        "Incluye una portada animada y administración del carrusel de contenido visual.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      limitations: ["La solución no incluye un backend de transmisión propio."],
      evidenceNote: unpublishedCaptureEvidenceNote,
      links: [],
      images: [],
    },
    {
      id: "calculadora-contenedores",
      name: "Calculadora de contenedores",
      category: "Proyecto propio · Aplicación móvil",
      summary:
        "Aplicación cliente para calcular orientación de cajas, capas, palés, capacidad y peso.",
      contribution:
        "Desarrollé una aplicación para la distribución de carga con cálculos de cajas, capas, palés, capacidad y peso, y vistas SVG frontal, lateral, superior e isométrica.",
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
      category: "Proyecto propio · Gestión congregacional",
      summary:
        "Sistema de gestión congregacional con registro de personas, roles, asistencia mediante QR y exportaciones.",
      contribution:
        "Desarrollé un sistema de gestión congregacional con registro de personas, roles, asistencia mediante QR, exportaciones a Excel y códigos QR en PDF.",
      details: [
        "Registra personas y sus roles dentro de la congregación.",
        "Registra la asistencia mediante códigos QR.",
        "Exporta información a Excel y genera códigos QR en PDF.",
      ],
      technologies: ["NestJS", "Next.js", "PostgreSQL", "TypeORM"],
      limitations: [],
      evidenceNote: unpublishedCaptureEvidenceNote,
      links: [],
      images: [],
    },
  ],
  education: [
    {
      id: "universidad-cundinamarca",
      title: "Ingeniería de Sistemas",
      institution: "Universidad de Cundinamarca",
      details: ["Graduado"],
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
      value: "ronalldocorrea@gmail.com",
      href: "mailto:ronalldocorrea@gmail.com",
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

export const professionalEvolution = [
  ["Ingeniería de Sistemas", "Graduado de la Universidad de Cundinamarca."],
  ["Desarrollo Full Stack", "Estudios en Platzi con Next.js, JavaScript, TypeScript, TypeORM y PostgreSQL."],
  ["Programación de videojuegos", "Estudios básicos con Unity 3D en el SENA."],
] as const;
