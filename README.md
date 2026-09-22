# Portafolio profesional de Ronaldo Delgado

Este es mi portafolio profesional como **Ronaldo Delgado — Full Stack Developer | AI Engineer**. Presento mi experiencia en aplicaciones web y móviles, APIs, datos, Microsoft Azure e inteligencia artificial aplicada, con aportes y límites de evidencia explícitos.

## Inicio rápido

```bash
npm run dev
npm run lint
npm run build
```

Abra `http://localhost:3000` para la landing y `http://localhost:3000/admin` para la herramienta local de preview.

## Arquitectura

| Área | Responsabilidad |
| --- | --- |
| `src/types/portfolio.ts` | Contrato estricto de hero, proyectos, formación, capturas, enlaces y contactos. |
| `src/data/portfolio.ts` | Contenido profesional predeterminado y datos de las secciones narrativas. |
| `src/lib/portfolio-storage.ts` | Normalización de datos y validación de protocolos de URL. |
| `src/hooks/use-portfolio-content.ts` | Snapshot estable con `useSyncExternalStore` y preview local en storage v5. |
| `src/components/portfolio/` | Presentación reutilizable: casos, diagrama, navegación, slider y placeholders. |
| `src/app/` | Rutas, metadata, JSON-LD, Open Graph, robots y sitemap. |

La landing pública lee los valores predeterminados y permite previsualizar cambios guardados por `/admin` únicamente en el navegador actual. El admin no se enlaza desde la navegación pública, tiene `noindex` y no debe tratarse como CMS ni como fuente de producción.

## Contenido basado en evidencia

El contenido de este portafolio se deriva de `../CV-Ronaldo-Delgado.pdf`. Mi identidad principal es **Full Stack Developer | AI Engineer** y presento los proyectos en el orden y con el alcance publicados en ese documento.

No se inventan fechas, métricas, repositorios, demos, resultados, propiedad de proyectos, títulos académicos ni certificaciones. Las capturas publicadas de Luhos, Ocho80, Gudfy y Tanku usan los recursos suministrados para esos proyectos. Ocho80 conserva su estado en desarrollo; Radio Navidad identifica la señal externa; Calculadora de contenedores declara que no tiene backend; y Luhos no se presenta como trabajo con agentes autónomos o RAG vectorial.

## Personalización segura

### Foto

El hero usa la fotografía real `public/foto-perfil.jpg` mediante `next/image`. Si se reemplaza, conserve el nombre o actualice la ruta, mantenga dimensiones adecuadas y siga [`docs/photo-guidance.md`](docs/photo-guidance.md).

### CV

`public/CV-Ronaldo-Delgado.pdf` debe ser una copia binaria exacta de `../CV-Ronaldo-Delgado.pdf`. `CV_PATH` en `src/data/portfolio.ts` centraliza la ruta utilizada por todos los CTA.

Verifique la igualdad después de cada actualización:

```powershell
$source = Get-FileHash -Algorithm SHA256 "..\CV-Ronaldo-Delgado.pdf"
$public = Get-FileHash -Algorithm SHA256 ".\public\CV-Ronaldo-Delgado.pdf"
if ($source.Hash -ne $public.Hash) { throw "El PDF público no coincide con la fuente canónica." }
```

### Casos, capturas y enlaces

- Edite la configuración fuente en `src/data/portfolio.ts`.
- Luhos, Ocho80, Gudfy y Tanku publican todas las capturas disponibles en sus directorios bajo `public/`, con la imagen principal primero. Use `images: []` únicamente en proyectos sin recursos públicos reales.
- Cada captura requiere una ruta local segura o URL `http`/`https` y texto alternativo; cada enlace se normaliza antes de persistirse o renderizarse.
- El slider no inicia autoplay con arrays vacíos o una sola imagen y respeta `prefers-reduced-motion`.

El storage v5 migra el contenido compatible guardado en v4. Durante la normalización, un array de imágenes vacío restaura la galería predeterminada cuando el proyecto dispone de capturas; las galerías personalizadas no vacías y el resto del contenido reconocido se conservan. La acción **Restaurar valores** elimina claves anteriores y recupera todo el contenido fuente, incluidas las cuatro galerías.

## Publicación y SEO

Defina el origen público real antes de desplegar:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio-confirmado.example
```

Sin esa variable se usa `http://localhost:3000`, exclusivamente como fallback de desarrollo. Ese origen alimenta `metadataBase`, canonical, JSON-LD, `robots.txt` y `sitemap.xml`; el proyecto no inventa un dominio de producción.

La imagen Open Graph se genera en `src/app/opengraph-image.tsx` con la misma identidad Full Stack Developer | AI Engineer. `src/app/favicon.ico` permanece como recurso provisional del proyecto y debe sustituirse cuando exista un favicon final.

## Lista de verificación antes de publicar

- [ ] Confirmar `NEXT_PUBLIC_SITE_URL` con el dominio real.
- [ ] Confirmar el retrato y sustituir el favicon provisional.
- [ ] Confirmar enlaces y capturas públicas de cada caso.
- [ ] Comprobar por SHA-256 que el PDF público coincide con su fuente canónica.
- [ ] Ejecutar `npm run lint` y `npm run build`.
- [ ] Revisar `/`, `/admin`, `/robots.txt` y `/sitemap.xml` en el entorno destino.
