# Explain Luhos work and introduce each project

## Objective and problem
The CV should explain what each company or project does before describing the user's role. Luhos currently compresses many personally implemented operational workflows into one dense paragraph, unlike the first-person feature list now used for Gudfy.

## Authorized scope and constraints
- The user confirms personal authorship of the Luhos features retrieved from Engram. Replace the Luhos CV detail paragraph with concrete first-person capabilities under a concise company summary; align the portfolio's Luhos case without turning technical implementation into unverified business metrics.
- Add a one-sentence, evidence-bounded introduction before the contribution of each of the seven CV projects, using facts already in the current CV/portfolio. Preserve project order and distinguish businesses from personal/complementary projects.
- The current CV is three A4 pages with emphasized print headings and project separators. Keep readable typography, the portrait, and complete project entries; do not silently cut other projects to meet pagination. If the content cannot fit three readable pages, report the tradeoff before finalizing PDF.
- Exclude claims that scooter pickup reminders are currently enabled, email is guaranteed in production, or the assistant's optional/unshipped capabilities are live. Use Flutter Geolocator and Leaflet/OpenStreetMap, not Google Maps; do not reintroduce vector RAG claims.
- Edit only Luhos/default content and exact-default migration in `src/data/portfolio.ts` / `src/lib/portfolio-storage.ts`, canonical `../CV-Ronaldo-Delgado-editable.html`, identical `public/ronaldo-delgado-cv.html`, and verified PDF copies `../CV-Ronaldo-Delgado.pdf` / `public/CV-Ronaldo-Delgado.pdf`. Leave `.atl/`, Gudfy text, other project contributions, and unrelated parent files untouched. No push, PR, merge, or deployment.

## Work unit and acceptance
- [ ] LUH-1: Write first-person Luhos `Aporte` plus concrete capabilities (cleaning, maintenance, scooters, pool reports, role-specific interfaces, scoped AI/Guesty and communications) and add concise company/project introductions across the CV; generate and verify the HTML/PDF copies and commit the cohesive unit on `feat/luhos-contributions-project-intros`.
- The portfolio Luhos case has a brief business summary, a personal contribution and readable concrete details; older exact defaults migrate without replacing customized browser-local text.
- The CV introductions precede personal contributions; all seven projects retain their verified names/order, the Gudfy feature list and the profile photo. Canonical/public HTML and PDF copies match respectively.
- Run focused migration/customization assertions, `npm run lint`, `npm run build`, `git diff --check`, and offline PDF page/text/visual checks. Record precise results, skipped live-site checks, and commit identity before marking LUH-1 complete.

## Route and delivery
- Delegated direct text/CSS writer for multiple non-trivial files, followed by one bounded offline PDF print/verification action. No TDD mode configured; package.json has no test script, so use focused deterministic assertions and proportional build/print checks.
- Advisory authored-size forecast below ~400 lines; generated PDF binary excluded from authored count, never from snapshot identity. Delivery strategy `ask-on-risk` unless actual change exceeds the review budget.

## Evidence and next step
- Engram: #1845/#1856 cleaning/admin roles, #2138/#2413 maintenance workday/geofence, #12/#13/#15 scooter delivery/return, #780 pool reports, #409/#785 email implementation and production caveat, #1942/#2055 assistant, #2931 verified stack. These are historical observations; corroborate current source before public claims.
- The canonical CV HTML/PDF in the parent `portafolio` repository are currently untracked there; only their published copies can join the nested app repo's work-unit commit.
- Next: implement locally, render/read back the PDF, record verified result and exact commit here and in the Engram mirror.
