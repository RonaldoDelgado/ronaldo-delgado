# Portfolio 3D scenes

## Objective
Add 3D pieces to the portfolio that tell the user's real Full Stack story, matching the dark neon palette in `src/app/globals.css` (#06100e, #0b1815, #62e8bd, #79dff2).

## Problem and rationale
The site is visually flat; generic floating shapes would read as an AI template. Each 3D piece maps to evidenced work: layered full stack, the CI/CD release flow, the AI assistant router, Flutter apps, and the PostgreSQL backend.

## Authorized scope and constraints
- Install `three`, `@react-three/fiber` (v9), `@react-three/drei` (v10), `@react-three/postprocessing` + `postprocessing`, and `@types/three` (dev). Verified 2026-10-15: peers accept React 19.2 and three >= 0.159.
- Client-only, lazily loaded scenes with a static fallback; no SSR of WebGL; respect `prefers-reduced-motion`; reduced quality on mobile; at most one heavy WebGL scene per page, accents may be SVG/CSS 3D.
- Low-poly/wireframe, emissive palette edges, dark glass, subtle bloom; slow motion reacting to pointer/scroll.
- Read `node_modules/next/dist/docs/` for client components and dynamic import before writing Next-specific code (non-standard Next 16.3.3).
- No push, PR, merge, or deployment without separate authorization.

## Plan and progress
- [x] 3D-1: Install dependencies and build the shared 3D infrastructure (lazy client wrapper, reduced-motion and mobile quality handling, fallback) plus the hero "layered stack" scene (UI → API → database → cloud glass plates with neon edges, hover separation).
- [x] 3D-2: Experience section: 3D branch graph (feature → develop → staging → main) with a light pulse travelling to production.
- [x] 3D-3: AI section accent: node constellation lighting up in sequence.
- [x] 3D-4: Mobile projects accent: low-poly phone showing a real Flutter screenshot.
- [x] 3D-5: Backend accent: database cylinder linked to a server node with animated data lines (SVG/CSS 3D preferred).

## Acceptance and checks
- `npx tsc --noEmit`, `npm run lint`, `npm run build` pass; no WebGL in the server render; fallback renders without WebGL; reduced motion disables animation.
- Visual check of each scene in the browser (desktop and mobile width) recorded, or marked pending.

## Route and verification mode
- Route: delegated writer per task (multi-file, new components plus dependency install).
- TDD: no test runner configured; use typecheck, lint, build and visual/browser checks.
- Size forecast: about 700–900 authored lines across 5 tasks, above the ~400-line delivery budget; delivery strategy `ask-on-risk`, chain choice to be asked before the running count crosses the budget.

## Evidence and next step
- Branch `feat/portfolio-3d-scenes` created from `main` at `53d0dfd`.
- 3D-1 evidence (delegated writer): installed three 0.186.1, @react-three/fiber 9.8.2, drei 10.7.9, @react-three/postprocessing 3.2.0, postprocessing 6.39.5, @types/three 0.186.0 (no peer warnings). Shared infra in `src/components/portfolio/three/` (palette, `use-scene-preferences` reduced-motion/quality tier/WebGL check, `SceneFrame` with SVG fallback, deferred mount, error boundary, aria description; `next/dynamic` ssr:false loader; bloom as separate lazy chunk on high tier only). Hero stack placed behind the profile photo; hidden below 1024px (no WebGL on mobile) — layout change for mobile left to the user. Writer ran `npx tsc --noEmit`, `npm run lint`, `npm run build` (routes still static), import audit, Edge headless SwiftShader screenshots (desktop, mobile iframe, no-WebGL fallback, forced reduced motion), `git diff --check` — passed. Parent reran `npx tsc --noEmit` and inspected the desktop screenshot — passed. Not verified: hover/parallax interaction. Size: +424/−1 authored (lockfile excluded).
- Parallelization (user request 2026-10-16): 3D-2..3D-5 run as concurrent writers in isolated worktrees, each creating only new component files; one integration writer then wires them into the page.
- 3D-2..3D-5 evidence: four parallel worktree writers, cherry-picked onto the branch as 517aa64 (branch graph, +489), 2969a63 (AI constellation, +436), 4a36df4 (phone, +281), 3b4fa5b (data-flow SVG accent, +155). Each writer ran `npx tsc --noEmit`, `npm run lint`, `git diff --check`, `npm run build` and a headless SwiftShader screenshot of a temporary preview route (deleted before commit). Parent reran `npx tsc --noEmit` on the combined branch — passed. Not verified: pointer parallax, real phone viewport, reduced-motion 3D frame for some scenes.
- Findings for integration: shared `SceneBloom` draws at a stale size after canvas resize (hero affected; branch graph works around it by remounting with a size key); `usePointer` duplicated in three scenes; no portrait/Flutter screenshot exists in `public/`, so `PhoneShowcase` needs a real capture from the user before it is placed.
- [x] 3D-6: Integration: fix `SceneBloom` resize centrally, extract shared `usePointer`, place `BranchGraph` (experience/Luhos), `AiConstellation` (AI section) and `DataFlowAccent` (backend divider) in the page; keep `PhoneShowcase` unplaced until a real screenshot is provided. Route: delegated writer.
- 3D-6 evidence (delegated writer): shared `use-pointer.ts`; `SceneBloom` recreated on canvas resize; `.scene-label` replaces `.stack-scene-label`; `SceneFrame` lets only the most visible mounted scene keep a continuous loop (others render on demand); `CaseStudy` gained an optional children slot. Placements: `BranchGraph` and `AiConstellation` inside the Luhos case study ("Flujo de ramas y despliegue", "Asistente con Azure OpenAI"), `DataFlowAccent` before "Enfoque Full Stack"; `PhoneShowcase` exported but unplaced. Writer ran `npx tsc --noEmit`, `npx eslint src`, `npm run build` (all routes static), import audit, `git diff --check`, and headless screenshots at 1440 and 390 px (including a resize check). Parent removed the four finished agent worktrees (they polluted `npm run lint`), then reran `npm run lint` (clean) and `npx tsc --noEmit` (passed) and inspected the branch-graph screenshot. Not verified: real GPU/phone, first-frame scaling on slow devices.
