# Phase 1 — Foundation

## Goals
- Monorepo scaffolding, shared models, Functions v2 baseline (EU‑W2), frontend shell, testing infrastructure.

## Tasks
- [ ] Shared models
  - [x] Add `shared/src/models.ts` with canonical Zod schemas: `chart`, `colorPalette`, `chartPreferences`
  - [x] Re‑export from `shared/src/index.ts`
  - [ ] Unit tests for schemas (valid/invalid cases)
  - [ ] Docs: models reference and change log
- [ ] Functions v2 baseline
  - [x] `setGlobalOptions({ region: 'europe-west2' })`
  - [x] `healthCheck` (onCall)
  - [x] Example `onRequest` with per‑function CORS
  - [ ] Emulator config and local invocation guides
  - [ ] Tests: onCall/onRequest with emulator
- [ ] Frontend baseline
  - [x] Vite + React + TS; Tailwind v4 (CSS‑first config)
  - [x] Auth context scaffolding (Google sign‑in with redirect fallback)
  - [ ] Organization context scaffolding
  - [ ] Shared formatter + palette utilities
  - [ ] Component tests for critical utilities
- [ ] Testing infrastructure
  - [ ] Playwright scaffolding under `e2e/`; smoke test loads app shell
  - [ ] Local gate: `npm run test:all` runs lint + typecheck + unit + integration with coverage
  - Note: optional later downloads (webkit/firefox/ffmpeg) can be installed with `npx playwright install` if/when needed; only Chromium headless is required for smoke.
- [ ] Docs
  - [ ] ADR for Functions v2 + region and CORS policy
  - [ ] Getting started (dev + emulators + test)

## Additional tasks completed in Phase 1
- [x] Router v7 migration (`createBrowserRouter` + `RouterProvider`)
- [x] Firebase web SDK config via `VITE_` env; `.env.local` template populated
- [x] Auth: popup → redirect fallback; post‑login navigation to `/`
- [x] CORS allowlist param `ALLOWLIST_ORIGINS` and `functions/.env.local`
- [x] Sidebar: collapsible with icon tooltips; bottom chevron to expand; header chevron to collapse
- [x] Design tokens and Inter font; login/header polish
- [x] Docs: `Docs/Standards/env.md`; `Docs/Architecture/tenant-hierarchy.md`
- [x] Rules: `scripts/check-rules.cjs`; removed disallowed deploy script in `functions/`
- [x] Repo: initialized, remote configured, and initial commits pushed

## Risks and mitigations
- Mis‑configured CORS → per‑function CORS middleware and allowlist
- Shared models drift → single source `shared/src/models.ts` and CI/local gates

## Learning log
- YYYY‑MM‑DD — …

## Definition of Done
- Tests green; coverage thresholds met
- Playwright smoke suite green (Chromium headless)
- Optional deploy to single project (`prod`) after smoke pass
- Docs updated
