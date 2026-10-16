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
      "Soy desarrollador Full Stack con experiencia en aplicaciones web y móviles, APIs REST y bases de datos relacionales. Trabajo con TypeScript, React, Next.js, Node.js, .NET y PostgreSQL en soluciones de comercio electrónico y gestión empresarial. He incorporado servicios externos de Microsoft Azure, AWS y otras plataformas para conectar sistemas, automatizar procesos y llevar productos desde la idea hasta producción. Mi enfoque profesional combina visión de producto, arquitectura mantenible, calidad, pruebas y mejora continua para construir soluciones preparadas para crecer.",
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
        "Plataforma para administrar servicios de hotelería y propiedades, con operaciones de limpieza, mantenimiento y gestión de scooters.",
      contribution:
        "Desarrollé los flujos operativos y las interfaces para administradores y trabajadores en React y Flutter; integré Guesty, resolví incidencias y administré servidores y despliegues en Microsoft Azure. Con mi trabajo, contribuí a mejorar la productividad y reducir costos administrativos.",
      details: [
        "Desarrollé la gestión de tareas de limpieza para administradores y trabajadores con prioridades baja, media y alta, asignaciones, horarios, listas de verificación y reportes de urgencia.",
        "Implementé el seguimiento de mantenimiento con una sola tarea activa por jornada, cierre diario y validación de proximidad por GPS al iniciar una tarea.",
        "Construí la gestión de inventario, entrega y recogida de scooters con registro de accesorios, fotografías, firma digital y evaluación de daños.",
        "Desarrollé reportes de piscinas y su panel administrativo con filtros, ordenamiento y paginación.",
        "Implementé ubicación GPS en Flutter con Geolocator y seguimiento cartográfico con Leaflet/OpenStreetMap.",
        "Construí un asistente interno con Azure OpenAI, conocimiento aprobado, herramientas de solo lectura de Luhos y Guesty y auditoría de conversaciones.",
        "Desarrollé plantillas de correo operativo y notificaciones en la aplicación.",
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
        "Comercio multivendedor de productos digitales con catálogo dinámico, compra de códigos e interfaces para compradores, vendedores y administradores.",
      contribution:
        "Desarrollé las interfaces de compradores, vendedores y administradores, desde el catálogo y el carrito hasta los pedidos y el acceso a códigos. Diseñé el modelo relacional en PostgreSQL, desarrollé la persistencia con TypeORM y optimicé consultas.",
      details: [
        "Creé un catálogo dinámico de productos disponibles y ordené las variantes serializadas según sus ventas.",
        "Desarrollé el carrito y la comprobación de existencias al crear cada pedido.",
        "Implementé la postulación de vendedores con revisión y correcciones, y las solicitudes de productos con su revisión.",
        "Construí el panel del vendedor para gestionar inventario de códigos, pedidos, billetera y solicitudes de retiro, junto con vistas administrativas.",
        "Desarrollé la compra y el acceso a los códigos adquiridos desde la cuenta del comprador.",
        "Integré el flujo de correo transaccional que solicita el envío de códigos al comprador tras confirmar el pago de pedidos regulares con códigos precargados; para los productos manuales, el vendedor asigna los códigos después.",
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
      title: "Ingeniero de Sistemas",
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
  ["Ingeniería de Sistemas", "Estudios en la Universidad de Cundinamarca."],
  ["Desarrollo Full Stack", "Estudios en Platzi con Next.js, JavaScript, TypeScript, TypeORM y PostgreSQL."],
  ["Programación de videojuegos", "Estudios básicos con Unity 3D en el SENA."],
] as const;
