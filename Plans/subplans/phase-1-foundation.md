# Phase 1 — Foundation

## Goals
- Monorepo scaffolding, shared models, Functions v2 baseline (EU‑W2), frontend shell, testing infrastructure.

## Tasks
- [ ] Shared models
  - [ ] Add `shared/src/models.ts` with canonical Zod schemas: `chart`, `colorPalette`, `chartPreferences`
  - [ ] Re‑export from `shared/src/index.ts`
  - [ ] Unit tests for schemas (valid/invalid cases)
  - [ ] Docs: models reference and change log
- [ ] Functions v2 baseline
  - [ ] `setGlobalOptions({ region: 'europe-west2' })`
  - [ ] `healthCheck` (onCall)
  - [ ] Example `onRequest` with per‑function CORS
  - [ ] Emulator config and local invocation guides
  - [ ] Tests: onCall/onRequest with emulator
- [ ] Frontend baseline
  - [ ] Vite + React + TS; Tailwind v4
  - [ ] Auth and org contexts scaffolding
  - [ ] Shared formatter + palette utilities
  - [ ] Component tests for critical utilities
- [ ] Testing infrastructure
  - [ ] Playwright scaffolding under `e2e/`; smoke test loads app shell
  - [ ] Local gate: `npm run test:all` runs lint + typecheck + unit + integration with coverage
- [ ] Docs
  - [ ] ADR for Functions v2 + region and CORS policy
  - [ ] Getting started (dev + emulators + test)

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
