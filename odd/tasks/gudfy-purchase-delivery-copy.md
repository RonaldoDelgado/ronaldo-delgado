# Describe Gudfy purchase and delivery

## Objective
Explain Gudfy's verified buyer, seller, and administrator experiences and the user's contribution to the purchase and digital-delivery flows in the portfolio and résumé.

## Problem and scope
The portfolio and current CV focus Gudfy's personal contribution on PostgreSQL/TypeORM, underselling the frontend work the user described. The user confirmed purchase and delivery by email and in the platform. Local source inspection supports buyer access to purchased codes and transactional email for regular, preloaded-code orders; manually assigned codes have a separate fulfillment path and no confirmed corresponding purchase email.

## Authorized work
- Update the Gudfy case in `src/data/portfolio.ts`, preserving the distinction between project capabilities and the user's stated frontend/database contribution.
- Preserve customized browser-local content while migrating only exact previous Gudfy default strings if necessary in `src/lib/portfolio-storage.ts` and tests.
- Update the canonical `../CV-Ronaldo-Delgado-editable.html`, publish the matching `public/ronaldo-delgado-cv.html`, regenerate `../CV-Ronaldo-Delgado.pdf`, and synchronize `public/CV-Ronaldo-Delgado.pdf` if generation can be verified.
- Keep the rest of the CV, other projects, portraits, images, `.atl/`, and unrelated parent-repository files intact. No remote operation, PR, merge, or deployment.
- Do not imply that email delivery is guaranteed, applies to manual orders, or that the user exclusively authored entire flows. Do not market the unreliable low-stock alert as operational.

## Work unit
- [x] GUD-1: Updated Gudfy's evidence-bounded public copy and canonical CV, regenerated both PDF artifacts, preserved browser customizations, and verified print layout and build. Work-unit commit: `10c16a7dbfd421d7b31b3a530d1127e6750b1d7a` on `feat/gudfy-purchase-delivery-copy`.
- [ ] GUD-2: Replace cautious Gudfy attribution with the user's confirmed first-person authorship of verified features. Expand Gudfy in the portfolio and CV, redesign the CV's print-only project headings and separators for three readable A4 pages, regenerate both PDFs, and commit the cohesive work unit on `feat/gudfy-first-person-cv-layout`.

## Accepted GUD-2 change
- The user confirms they personally built the verified Gudfy buyer, seller, and admin capabilities; write their contributions in first person. Cover cart and stock checks at order creation, dynamic catalog and sales-ranked serialized products, seller applications and review, product requests, code inventory, orders, wallet, admin views, and buyer access to purchased codes. Regular preloaded-code purchases attempt email delivery; manual products require seller assignment.
- Do not call stock checks continuously real-time, claim an active recommendation engine, imply email always arrives or applies to manual delivery, or advertise the unreliable low-stock alert as operational. Source evidence and the user's first-hand attribution have different roles.
- The user explicitly permits a three-page CV PDF to include the concrete functions with larger project titles and clearer separation. Retain readable font size, photograph, Spanish CV copy and non-Gudfy projects. Keep print-specific design inside print CSS rather than unexpectedly redesigning the hosted HTML screen view.
- Update the canonical editable HTML and public HTML in lockstep and regenerate/synchronize canonical and public PDF; do not alter other documents or publish to remote without fresh authorization. Preserve browser-local custom case copy; migrate only exact previous Gudfy defaults to the new text.
- GUD-2 checks: focused migration/customization assertions, HTML byte equality, `npm run lint`, `npm run build`, `git diff --check`, three-page A4 PDF text/image/visual readback without overlap or clipping, canonical/public PDF hash equality. Record unavailable checks honestly.
- Route: delegated direct text/CSS writer, followed by bounded offline PDF rendering and parent verification. The 400-line guideline is advisory; delivery strategy `ask-on-risk` if actual authored changes exceed the threshold.

## Acceptance and verification
- The portfolio's Gudfy summary, contribution, and details distinguish buyer, seller, and admin interfaces and accurately explain purchase, in-account code access, and regular-order transactional email.
- The editable HTML and published HTML match; the regenerated canonical/public PDFs match and include the updated Gudfy text with readable layout and the existing portrait. No claims about manual-order emails are added.
- Exact-default migration is tested without overwriting customized Gudfy content; `npm run lint`, `npm run build`, `git diff --check`, focused content assertions, and PDF page/text/visual checks report actual outcomes.

## Route, configuration, and forecast
- Delegated direct writer. Mapping/preparation and multi-file writer triggers apply: Gudfy frontend/backend evidence, portfolio content/storage, canonical HTML and two PDF copies span many files.
- TDD not configured in this project/session; package.json has no test script. Use focused assertions plus ordinary checks, rather than claiming RED/GREEN evidence.
- Forecast: fewer than 400 authored source lines plus generated PDF binaries; ~400 is a planning heuristic, not an acceptance threshold. Delivery strategy `ask-on-risk`; no PR is authorized.

## Evidence and next step
- Frontend buyer order/code retrieval: Gudfy `client/src/modules/account/templates/orders-template.tsx` and `components/products-serial-codes`; server email for regular orders: `server/src/services/order-payment.ts:560-570`; manual seller assignment: `server/src/services/store-order-manual-product.ts:181-239`.
- The canonical CV/PDF are currently untracked user-owned files in the parent `portafolio` repository; only their published copies and the portfolio source can be committed in the nested app repo. Preserve that boundary.
- Implementation: Gudfy public copy now explains buyer/seller/admin interfaces, the user's frontend and database contribution, code access in the buyer account, attempted email for regular preloaded-code orders, and seller assignment for manual products. Only exact previous Gudfy defaults migrate; customized fields remain unchanged. Canonical and public HTML are byte-identical.
- Checks observed: `npm run lint`, `npm run build`, and `git diff --check` passed. A focused `node -e` runtime assertion passed for previous Gudfy defaults and customized values. Edge printed the canonical HTML offline to a temporary PDF; the first preview had a footer overlap and was discarded. After condensing only Gudfy's three CV paragraphs, the second preview has two readable A4 pages, existing portrait, portfolio URL, Gudfy text, and no footer collision. Canonical and published PDF hashes match the verified second preview. Browser interactions and external email/payment delivery were not tested.
- Runtime boundary: static CV and portfolio copy; HTML/PDF rendering was checked locally, while live purchase/email execution is outside this content-only change. Rollback boundary: `src/data/portfolio.ts`, `src/lib/portfolio-storage.ts`, `public/ronaldo-delgado-cv.html`, and `public/CV-Ronaldo-Delgado.pdf`; retain or separately restore the external canonical CV HTML/PDF if rolling back the source.
- Native assessment of the committed unit against `397ce09`: medium risk, `review_due: false`, `review_due_reason: under_budget` (85 changed lines, five paths). No review was started, granted, declined, or acknowledged; the medium slice remains pending under the native budget. This checkbox creates no review authority.
- Next: implement GUD-2 locally, record verification and its commit. Prior GUD-1 delivery is complete; no new push, PR, merge, or deployment is authorized for GUD-2.
