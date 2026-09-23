# Portfolio visual refresh

## Objective

Present the portfolio as a readable, responsive professional landing page with visible project evidence for Luhos, Ocho80, Gudfy, and Tanku.

## Problem and rationale

The current sticky header consumes first-screen space, navigation is not presented as the requested centered button group, the hero is too tall to communicate its relevant content within common desktop viewports, several labels are undersized, the displayed profile name is incomplete, and the supplied project screenshots are not connected to the case-study sliders.

## Authorized scope

- Portfolio source and styles under `src/app`, `src/components`, `src/data`, `src/hooks`, `src/lib`, and related types.
- Existing supplied assets under `public/Luhos`, `public/Ocho80`, `public/Gudfy`, and `public/Tanku`.
- Portfolio documentation required to explain image and local-content behavior.
- ODD tracking under `odd/tasks/portfolio-visual-refresh.md`.

## Constraints

- Preserve existing unrelated local changes and current portfolio functionality.
- Publish the supplied screenshots as-is, per the user's explicit privacy decision.
- Keep project screenshots uncropped and usable with keyboard, pointer, and reduced-motion preferences.
- Keep generated technical artifacts and code in English; preserve established Spanish public-facing copy.
- Do not push, open a pull request, or deploy without separate authorization.
- TDD mode: disabled because no explicit project/session TDD setting or test runner exists. Use lint, build, and runtime checks.
- Delivery strategy: `ask-on-risk`, resolved to chained delivery after the worktree measured approximately 2,773 authored lines plus 32 binaries.
- Chain strategy: `feature-branch-chain`; no push or pull request creation is authorized.
- Technology icon strategy: use tree-shaken brand icons from `react-icons`, explicitly approved by the user.
- Technology icon colors: use official brand colors when the technology has a recognizable brand; use an honest neutral semantic fallback only for generic concepts without an official brand mark.

## Checklist

- [x] **PVR-1 — Connect project media and durable defaults**
  - Populate Luhos, Ocho80, Gudfy, and Tanku image galleries with every supplied screenshot, principal image first.
  - Ensure persisted browser content cannot mask the new default image galleries.
  - Keep honest placeholders for projects without supplied images.
  - Update relevant documentation and storage/admin labels.
  - Route: delegated writer; trigger evidence: coordinated edits across data, storage, hooks, admin, documentation, and public assets.
  - Acceptance: all supplied paths resolve with exact case; local-content reset restores galleries; `npm run lint` and `npm run build` pass.
  - Evidence: 30 image paths verified with exact casing (Luhos 11, Ocho80 8, Gudfy 6, Tanku 5); `npm run lint` passed; `npm run build` passed with all static routes generated.
  - Commits: `1459c8a` (content and galleries), `8478496` (storage v5), `e9b2d7a` (local preview), with supporting foundation slices through `02725a7`.

- [x] **PVR-2 — Recompose navigation, hero, typography, and media presentation**
  - Remove the sticky branded header and place centered, wrapping navigation buttons at the top of the page.
  - Display `Ronaldo Delgado Correa` with the profile image.
  - Increase undersized kicker, labels, chips, evidence, timeline, diagram, and slider text.
  - Make the hero viewport-aware so the primary message, actions, profile image, and relevant context are visible without excessive first-screen overflow.
  - Render project screenshots without cropping and retain accessible controls.
  - Increase `section-kicker` text beyond the previous small-label treatment.
  - Make the profile information card wider than the portrait on supported viewports and compose its copy horizontally rather than as a narrow vertical block.
  - Replace the hero proof rows with Frontend, Backend, Mobile, and AI capability groups.
  - Use recognizable technology brand icons for verified Frontend, Backend, and Mobile technologies.
  - Present AI capabilities without naming the underlying product: Orchestrator, SDD, ODD, TDD, Engram, Multi-agent, and Prompt Engineering, each with a concise parenthetical meaning.
  - Route: delegated writer; trigger evidence: non-trivial responsive changes span multiple components and global styles.
  - Acceptance: coherent layouts at 320×568, 390×844, 768×1024, 1366×768, and 1440×900; keyboard focus remains visible; `npm run lint` and `npm run build` pass.
  - Evidence: `npm run lint`, `npm run build`, and `git diff --check` passed. Runtime verification passed at 320×568, 390×844, 768×1024, 1366×768, and 1440×900; `/admin` also passed at 320×568 and 1366×768. Navigation remained centered without horizontal overflow, desktop profile cards measured 464 px against 336–384 px portraits, screenshots used `object-fit: contain`, slider interaction/reduced-motion checks passed, and console/runtime/image failures were zero.

- [x] **PVR-3 — Refine profile and project technology presentation**
  - Replace the profile description with `Ingeniero en Sistemas`.
  - Stack the profile card content vertically while retaining its wider-than-portrait desktop width.
  - Rewrite every project detail section to explain what the product does, without inventing unsupported claims or removing explicit limitations.
  - Add an icon to every project technology and use its official brand color when one exists.
  - Keep accessible text labels with every icon and preserve responsive behavior.
  - Remove the public `Estado y límites`, `Evidencia y alcance`, and pending-link presentation from every project card while retaining the underlying verified content contract for local editing.
  - Prevent the `Full Stack Developer | AI Engineer` headline from clipping descenders such as the final `g`.
  - Center `Perfil profesional`, `Ronaldo Delgado Correa`, and `Ingeniero en Sistemas` within the profile card.
  - Route: delegated writer; trigger evidence: coordinated content, component, icon-mapping, and responsive-style changes span multiple non-trivial files.
  - Acceptance: all seven projects explain their purpose without the removed public metadata sections; all technology entries render with icon and label; profile card remains wider on desktop, stacked internally, and centered; the hero headline is not clipped; `npm run lint`, `npm run build`, and responsive runtime checks pass.
  - Evidence: `npm run lint`, `npm run build`, and `git diff --check` passed. Runtime verification at 320×568 and 1366×768 confirmed seven project cards, 46/46 technology chips with visible icons and labels, no removed metadata headings, centered profile content, complete headline descenders, no horizontal overflow, and zero console/page/request/image failures. The desktop profile card measured 464 px against a 336 px portrait.

- [x] **PVR-4 — Consolidate capabilities, approach, education, and contact**
  - Remove the standalone `Competencias técnicas` section and integrate its useful content into `Capacidades principales` without duplicating information.
  - Remove the standalone `Proceso de construcción` section and do not render the former five-step process inside `Enfoque Full Stack`.
  - Change the published education title from `Estudios en Ingeniería de Sistemas` to `Ingeniero de Sistemas`, including exact persisted-default migration without overwriting genuine user customizations.
  - Replace the contact CTA `Escribir por email` with `Escribir por WhatsApp` and link it to the already-published WhatsApp-capable phone number.
  - Render the opening `Capacidades principales` technology icons with their official brand colors where a brand exists; keep neutral semantic colors only for non-brand concepts.
  - Preserve responsive navigation, accessible section structure, and the current visual hierarchy after removing sections.
  - Route: delegated writer; trigger evidence: coordinated component, content, persistence, navigation, and responsive-layout changes span multiple non-trivial files.
  - Acceptance: the removed competencies and process sections no longer render or appear in navigation; technical competencies are represented in `Capacidades principales` with official brand icon colors where applicable; `Enfoque Full Stack` remains concise without the former process block; the education title and WhatsApp CTA persist correctly; `npm run lint` and `npm run build` pass. Final UI review is user-owned and native review is explicitly skipped for this candidate.
  - Evidence: `npm run lint`, `npm run build`, and `git diff --check` passed. Source readback confirmed the removed public section labels/process block are absent, navigation no longer links to removed sections, technical competencies are consolidated into seven capability groups, 27 opening technology items carry explicit official brand colors or honest neutral semantic fallbacks, the exact prior education title remains only as a v7 migration constant, and the CTA derives a WhatsApp URL from the published phone contact. Automated final UI review and native review were explicitly skipped at the user's request.

## Verification plan

- `npm run lint`
- `npm run build`
- `npm run dev` with structural/runtime checks for `/` and `/admin`
- Responsive viewport inspection at the five target sizes above
- Confirm browser console and image requests have no case-sensitive path failures

## Progress

- Exploration completed: component, data, storage, asset, and style paths mapped.
- User approved publishing the supplied screenshots without redaction.
- Tracker branch: `feat/portfolio-visual-refresh`.
- Current feature-chain tip: `feat/portfolio-visual-refresh-13-section-consolidation`.
- Foundation/PVR-1 chain boundaries:
  - `1459c8a` — content model and 30 project screenshots.
  - `8478496` — durable v5 normalization and migration.
  - `e9b2d7a` — local preview and reset behavior.
  - `6c79687` — reusable project presentation components.
  - `495949b` — portfolio landing and profile/CV assets.
  - `94a30b0` — responsive visual system.
  - `5b1ec0c` — routes and metadata.
  - `02725a7` — operational and evidence documentation.
- PVR-1 verification: lint passed, production build passed, 30/30 configured project images exist.
- PVR-2 implementation commits: `b8236dc` (navigation and viewport-aware hero), `928b523` (uncropped media, slider controls, and typography foundation), and `1b12a60` (technology/AI capability groups and verified mobile overflow correction).
- User refinement accepted: enlarge kickers, widen the profile card, and replace hero proof rows with capability groups and brand icons.
- PVR-2 runtime verification passed after removing mobile intrinsic-width overflow from the slider frame and the global 320 px body minimum.
- Accumulated PVR-2 RDD candidate: medium risk, 474 changed lines, review `review-cfd0a55ddb9f820d` approved without findings and acknowledged; authority burned normally.
- PVR-3 implementation completed: profile profession and alignment refined, all seven projects now explain their purpose, all 46 technology chips render icons with brand or honest neutral colors, and the public limitations/evidence/pending-link sections were removed as requested.
- PVR-3 work-unit commit: `ca65542` — profile, purpose-focused project details, technology icons/colors, v6 migration, and final public-presentation refinements.
- PVR-3 RDD assessment: medium risk, 288 changed lines from `472ead4`; review not yet due because the committed slice remains under the delivery budget (`under_budget`).
- PVR-4 implementation completed: technical competencies moved into `Capacidades principales`; the standalone competencies and process content were removed; education now publishes `Ingeniero de Sistemas`; the contact CTA uses WhatsApp; exact prior defaults migrate through storage v7.

## Next step

Record the PVR-4 work-unit commit and RDD outcome, then return to ordinary delivery decisions. Push, pull request creation, merge, and deployment remain unauthorized.
