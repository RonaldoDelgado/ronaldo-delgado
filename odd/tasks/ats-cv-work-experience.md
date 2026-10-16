# ATS-ready CV with dated work experience

## Objective
Restructure the CV so ATS parsers and AI screeners for Full Stack Developer roles can read a dated, employment-typed work history, a clean professional summary, and verifiable skills.

## Problem and rationale
The CV has no dates, lists employment under "Proyectos de desarrollo Full Stack", uses inconsistent titles (AI Engineer, FullStack, Frontend), contains spelling errors and generic claims in the profile, lists technologies not backed by any entry (AWS), leaves education status unclear, and runs to three pages. Screeners cannot compute years of experience or employment type, which drives automatic rejection.

## Facts confirmed by the user (2026-10-15)
- Luhos: Full Stack Developer, employee, full time, Oct 2025 – present.
- Gudfy: Full Stack Developer, employee, full time, Jul 2023 – Sep 2025.
- Tanku: Full Stack Developer, employee, part time, Jan 2025 – Oct 2025.
- Ocho80, Radio Navidad, Calculadora de contenedores, Libres en Cristo Jesús: personal projects.
- Ingeniería de Sistemas, Universidad de Cundinamarca: graduated (year not provided).

## Authorized scope and constraints
- Edit canonical `../CV-Ronaldo-Delgado-editable.html`, publish an identical `public/ronaldo-delgado-cv.html`, and regenerate verified PDF copies `../CV-Ronaldo-Delgado.pdf` / `public/CV-Ronaldo-Delgado.pdf`.
- Spanish content, neutral professional register. Do not invent metrics, technologies, dates, English level, or tools (Docker, CI/CD) not confirmed.
- Keep the email unchanged pending user confirmation; keep the portrait. Portfolio site data stays untouched.
- No push, PR, merge, or deployment.

## Plan and progress
- [x] ATS-2: Fix the email typo (`ronaldocorrea@` → `ronalldocorrea@gmail.com`, confirmed by the user) in the CV and in the portfolio site sources (`src/data/portfolio.ts`, `src/app/page.tsx`, `src/components/portfolio/portfolio-page.tsx`). Route: inline mechanical replacement. Browsers with previously saved local customizations keep the old contact until reset (no migration added).
- [x] ATS-1: Add a dated "Experiencia laboral" section (Luhos, Gudfy, Tanku) with consistent "Full Stack Developer" titles and 3–5 concrete achievements each; move the rest to a condensed "Proyectos propios"; rewrite the profile; single-column skills including testing; remove unsupported claims; mark education as graduated; target two A4 pages; regenerate PDF and verify text order.

## Acceptance and checks
- Every job shows title, company, month/year range and employment type; total timeline Jul 2023 – present is derivable.
- No spelling errors listed in the analysis; no "FullStack"/"AI Engineer" job titles; no AWS claim without evidence.
- Canonical and public HTML identical; PDF copies identical; PDF text extraction yields a sensible reading order.
- `npm run lint`, `npm run build`, `git diff --check` pass or failures are recorded.

## Route and verification mode
- Route: delegated direct writer (canonical + public HTML and two PDFs; multi-file writer and preparation triggers).
- TDD: not applicable (no test script; content change). Use structural assertions, PDF text/page checks, lint, build.
- Delivery strategy: `ask-on-risk`.

## Evidence and next step
- Branch `feat/ats-cv-work-experience` created from `732fab4`.
- Implementation (delegated writer): continuous A4 layout without repeated per-page headers, two pages at 10pt body; dated Experiencia laboral (Luhos, Tanku, Gudfy) with modality; condensed Proyectos propios; single-column skills with Pruebas; education marked Graduado. Dropped as unsupported: AWS, Redis, two AI sub-skills, Luhos pool-report and email-template bullets, the productivity/costs claim (rephrased without numbers).
- Checks: writer ran byte equality (HTML and PDF pairs identical), pypdf page count 2, pdftotext/pypdf reading order header → perfil → experiencia → proyectos → competencias → formación, rg negative/positive term checks, `npm run lint`, `npm run build`, `git diff --check`, PNG page renders — all passed. Parent reran byte equality, page count and PDF term checks — passed. Live browser render of the published HTML not run.
- Pending: graduation year.
- Commits: `015c1c4` fix(portfolio): correct contact email address (ATS-2); `3296077` feat(cv): add dated work experience for ATS screening (ATS-1).
- Native assessment of `732fab4..3296077` (committed-only): medium risk, `review_due: false`, `review_due_reason: under_budget`. No review started; boundary stays at `732fab4` until a later commit reaches the budget.
- The canonical CV HTML/PDF in the parent `portafolio` folder are outside this repository and were edited in place.
- [x] ATS-3: Added an "Idiomas" section (Español — Nativo · Inglés — B2, lectura técnica; English level confirmed by the user). Route: inline mechanical edit. A two-line layout pushed one line to page 3, so both languages share one line; PDF regenerated with Edge headless, back to 2 pages, page-2 PNG inspected without clipping; HTML and PDF copies byte-identical; `git diff --check` passed.
- [x] ATS-4: English CV (user approved 2026-10-15): canonical `../CV-Ronaldo-Delgado-EN-editable.html`, identical `public/ronaldo-delgado-cv-en.html`, PDF copies `../CV-Ronaldo-Delgado-EN.pdf` / `public/CV-Ronaldo-Delgado-EN.pdf`; faithful translation of the Spanish CV, two A4 pages. Route: delegated writer.
- [x] ATS-5: Link the English CV from the portfolio (`CV_EN_PATH` in `src/data/portfolio.ts`, CTA next to the existing CV button in `src/components/portfolio/portfolio-page.tsx`). Route: same delegated writer.
- ATS-4/ATS-5 evidence: writer created the English CV (same CSS, lang="en", ATS-standard English headings, no new facts), 2 A4 pages, PNG renders inspected; added `CV_EN_PATH` and a "CV en inglés" CTA (hrefLang="en") after "Ver CV". Writer ran cmp (HTML/PDF pairs identical), pypdf order/term checks, Spanish-leftover rg (none), `npm run lint`, `npm run build`, `git diff --check` — passed. Parent reran cmp and pypdf page count — passed. Live page and phone-width rendering of the new CTA not verified.
- [x] ATS-6: Visual redesign of both CVs (ES and EN), user chose "Índigo + lima" (2026-10-15): indigo header band (#3D2BD9), lime accents (#B8F23A) only as bars/backgrounds, technologies as monospace chips on light indigo that keep real comma separators in the text layer; single column, real text, two A4 pages each. Leadership claim explicitly excluded by the user. Route: delegated writer.
- ATS-6 evidence: writer applied identical CSS to ES/EN (indigo #3D2BD9 band, lime #B8F23A only for bars/ring, monospace chips #2A1D9E on #EEEBFF with real faint ", " separators). Visible text identical to HEAD; both PDFs 2 pages; text layer reads "Tecnologías: React 18, TypeScript, ..."; WCAG AA contrast ratios >= 5.8 for text. Fixed during verification: `position: relative` bullets scrambled the PDF reading order (switched to floated markers); ES spilled to 3 pages (spacing tightened, body 10pt kept). Parent reran cmp on all 4 pairs, page count and ES tech-line extraction, and inspected ES page 1 — passed. Not verified: physical print, mobile browser width, Cascadia Mono fallback off Windows. Date lines extract uppercase (CSS text-transform).
