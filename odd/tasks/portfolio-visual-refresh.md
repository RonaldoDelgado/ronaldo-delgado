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
- Current feature-chain tip: `feat/portfolio-visual-refresh-11-hero-capabilities`.
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

## Next step

The local implementation is complete and verified. Push, pull request creation, merge, and deployment remain separate, unauthorized delivery decisions.
