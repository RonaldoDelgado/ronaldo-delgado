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
- [ ] GUD-1: Update Gudfy's evidence-bounded public copy and canonical CV, regenerate both PDF artifacts, preserve browser customizations, and verify the printed résumé and site. Commit the cohesive change on `feat/gudfy-purchase-delivery-copy` only after checks.

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
- Next: commit only these intended nested-repo files and this task document, assess the committed candidate, then record its identity and review outcome. No remote operation is authorized.
