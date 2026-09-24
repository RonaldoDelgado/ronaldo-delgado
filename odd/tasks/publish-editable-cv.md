# Publish the editable CV

## Objective
Use the user's editable HTML résumé as the portfolio's primary CV and include the deployed portfolio URL in that résumé.

## Problem and rationale
The previous edit placed the URL in a different, shorter HTML résumé under `public/`; both portfolio CV buttons still target the PDF. The canonical source is `../CV-Ronaldo-Delgado-editable.html`.

## Authorized scope and constraints
- Edit `../CV-Ronaldo-Delgado-editable.html` to include `https://ronaldo-delgado.vercel.app/` in its contact information.
- Publish that source as `public/ronaldo-delgado-cv.html`, preserving its existing Spanish content and layout, and route both CV buttons to it with accurate labels.
- Keep the PDF asset unchanged; leave `.atl/` and unrelated content untouched. No push, PR, merge, or deployment without separate authorization.
- Treat the user's editable source as the content of record. The already-made one-line change to the old public résumé is superseded by publication of that source.

## Plan and progress
- [x] CV-1: Add the URL to the editable source, publish the resulting HTML and switch the portfolio's CV CTAs to it. Focused verification, build, lint, and work-unit commit `c3037d3467ab18258a12183c0a9a5f756342b5c6` on `feat/publish-editable-cv` completed.

## Acceptance and checks
- Both CV CTAs open `/ronaldo-delgado-cv.html` and no longer claim to open a PDF.
- The published HTML matches the editable source and contains exactly one visible HTTPS portfolio link; its relative portrait resolves under `public/`.
- `npm run lint`, `npm run build`, focused structural assertions, and `git diff --check` succeed, or failures are recorded exactly. Visual/print verification is pending unless actually run.

## Route and verification mode
- Route: delegated direct writer. Mapping trigger: the change spans the external source, public HTML, route constant, and two UI components. Preparation and multi-file writer triggers also apply.
- TDD: not configured in this project/session; source: package scripts and available project context. Runner: no test script declared; use focused Node assertions and npm lint/build as ordinary checks.
- Advisory size: replacing the shorter public résumé with the complete canonical source yields 726 additions and 124 deletions (850 authored changed lines). Keep the document coherent rather than splitting it artificially.
- Delivery strategy: `single-pr`; after being told the complete replacement is 850 authored lines, the user chose "todo en una sola". Treat this as the maintainer's size exception for a cohesive single review unit; no PR is authorized or being created.

## Evidence and next step
- Initial state: `public/ronaldo-delgado-cv.html` has an uncommitted one-line portfolio link from the previous, mistaken edit. Preserve unrelated untracked `.atl/`.
- Implementation: the editable source now has one visible portfolio link; the public HTML is identical to that source, and both CV buttons target it under accurate labels. The portrait path resolves and matches the adjacent canonical image. Existing PDF asset was not edited.
- Checks: writer ran `npm run lint`, `npm run build`, `git diff --check`, and focused Node structural assertions — all passed. Parent reran `npm run lint` and `git diff --check` — passed. Browser and print preview were not run.
- Native assessment of the committed unit: medium risk, `slice_budget_reached`; the user explicitly selected "Omitir esta vez" for this exact candidate. Provider returned `action: declined` and `consent: declined_this_candidate` for its target; no review record or approval was created. Delivery follows ordinary repository policy.
- Commit boundary: `c3037d3467ab18258a12183c0a9a5f756342b5c6` contains the published HTML, CV CTA changes, and this task document's initial state. The canonical editable source at `../CV-Ronaldo-Delgado-editable.html` is outside Git and was edited separately. Rollback of the published behavior affects the four tracked implementation files; preserve the independent external source if retaining the URL there.
- Next: optional browser and print preview remain unverified. No remote operation is authorized.
