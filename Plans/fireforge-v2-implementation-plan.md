## FireForge v2 — Implementation Plan (from PRD)

Source PRD: See “FireForge v2 — Product Requirements Document (PRD)” in `Plans/fireforge-rebuild-prd.md`.

### Guiding constraints (must follow throughout)
- All backend uses Firebase Functions v2 in region `europe-west2`. Region is set in code, not via CLI flag. Do not add an NPM script that deploys all functions.
- Deploy functions explicitly with `--only functions:functionA,functions:functionB` to avoid removing others in the same project.
- Do not set a `cors` option in `setGlobalOptions`. Configure CORS per `onRequest` handler only. `onCall` functions do not require CORS.
- Use a single canonical chart model in `shared/` for both frontend and backend. Any chart conversions happen in one place only.
- Centralize number/axis/tooltip formatting. Tooltip rules: locale-aware; < 1 → 2 decimals; ≥ 1 and < 30 → 1 decimal; ≥ 30 → 0 decimals.
- Charts respect `displayOptions.showGridLines` (default true when undefined).
- Color palettes: keep the FireForge system/default palette rules intact; support custom palettes with `defaultColor`. Org can set default; users may override.
- Org policy requires manual IAM role grants for default service accounts prior to deployments (see IAM section below).
 - Single environment for now: use one Firebase project aliased as `prod`. Use Firebase Emulator Suite and Hosting preview channels instead of separate `dev`/`stage` projects.

### Phase roadmap (mirrors PRD §16)
1) Foundation: auth, orgs, shared models, palettes, formatter
2) File ingestion + unified chart creator (multi-series, studies alpha)
3) Dashboards (grid, tiles, sharing beta)
4) SaaS connectors (GA, Shopify, Stripe, Meta) with webhooks/polling fallback
5) MCP integration
6) WIF data access (Firestore/BigQuery)
7) Conversational PRD Builder
8) Brand controls and preferences (org/user)

Each phase closes with tests, docs, and, when appropriate, a smoke‑tested deploy to the single project (`prod`).

### Monorepo layout (target)
```
fireforge/
  frontend/            # React + TS app (Vite)
  functions/           # Firebase Functions v2 (TS)
  shared/              # Canonical models/types consumed by both
  Plans/               # PRD and implementation docs
  Docs/                # Architecture docs, ADRs, style guides, Mermaid diagrams
  e2e/                 # Playwright end-to-end tests and config
  scripts/             # Dev & CI helper scripts
  firebase.json        # Hosting + Functions config
  .firebaserc          # Single project alias: prod
```

### Tooling & baseline
- Node 20 LTS. TypeScript strict mode everywhere.
- Package manager: npm (workspace-ready). Set `engines` in root and `functions/`.
- Styling: Tailwind CSS v4. Add `prettier-plugin-tailwindcss` for class sorting in CI.
- Linting/formatting: ESLint + Prettier; local checks.
- Tests: Jest/Vitest (node + jsdom as needed). Keep unit/integration/E2E split.
- Commit hooks: lint-staged + husky (optional) for pre-commit formatting.
 - E2E runner: Playwright. Default to headless Chromium; optionally run WebKit/Firefox locally when needed. Store traces/screenshots on failure.

### Bootstrapping from scratch (high level)
1) Repo init and workspaces
   - Initialize root `package.json` with workspaces: `frontend`, `functions`, `shared`.
   - Add ESLint/Prettier configs; set `tsconfig.json` base for path aliases into `shared`.
2) Firebase projects
   - Create a single Firebase project for now. Add a single alias (e.g., `prod`) to `.firebaserc`.
   - Enable Hosting, Functions, Firestore, Storage, Remote Config. Keep everything in `europe-west2` where configurable (Scheduler, Pub/Sub).
   - Set up Firebase Emulator Suite (Auth, Firestore, Storage, Functions) for integration tests and development.
3) Shared models (`shared/`)
   - Implement canonical schemas: `chart`, `colorPalette`, `dataSource`, `organization`, `user`, `chartPreferences` (matching PRD fields). Export types + Zod schemas.
4) Functions v2 (`functions/`)
   - Set `setGlobalOptions({ region: 'europe-west2' })`. Do NOT place a cors option here.
   - Add base callable `healthCheck`, `testCallable`, and onRequest with per-function CORS example.
   - Add Secrets/Config plumbing for connectors; adopt Google Cloud Secrets for credentials.
5) Frontend (`frontend/`)
   - Vite + React + TS. Tailwind CSS v4. Shadcn UI (Tailwind v4 compatible) + Lucide icons. Jotai for state. Toaster in root layout.
   - Tailwind v4 setup: install and initialize; add `tailwind.config.ts` with `content` covering `index.html`, `src/**/*.{ts,tsx}`, and Shadcn component paths; create `src/index.css` with `@tailwind base; @tailwind components; @tailwind utilities;` and import it in the app entry.
   - Firebase web SDK auth & Firestore; shape contexts for org, preferences, theme.
   - Centralized chart formatter (tooltip/axis/number) and palette utilities.
6) CI/CD
   - No CI/CD at this point.

7) Testing scaffolding
   - Add Playwright at repo root under `e2e/` with `playwright.config.ts` using a `webServer` that starts the Vite dev server.
   - Configure base URL to the local dev server (e.g., `http://localhost:5173`).
   - Default browser: Chromium headless; add projects for WebKit/Firefox that can be enabled locally.
   - Add example smoke test covering app load and auth UI entry points.
   - Add npm scripts: `test:e2e`, `test:e2e:headed`, `test:e2e:smoke`.

### Firebase & IAM setup (critical)
- Before first deploy, manually grant roles due to org policy:
  - App Engine default SA: `PROJECT_ID@appspot.gserviceaccount.com` → Editor (or equivalent write permissions).
  - Cloud Functions Service Agent: `service-PROJECT_NUMBER@gcf-admin-robot.iam.gserviceaccount.com` → `roles/cloudfunctions.serviceAgent`.
  - Cloud Run Service Agent: `service-PROJECT_NUMBER@serverless-robot-prod.iam.gserviceaccount.com` → `roles/run.serviceAgent`.
  - Optional: API Gateway Service Agent → `roles/apigateway.serviceAgent`.
- Enable required APIs: Firestore, Firebase Auth, Cloud Functions, Cloud Run, Secret Manager, Pub/Sub, Cloud Scheduler, Vertex AI (when PRD Builder is implemented).

### Functions v2 patterns
- Global options (region only):
```ts
import { setGlobalOptions } from 'firebase-functions/v2';
setGlobalOptions({ region: 'europe-west2', timeoutSeconds: 60, memory: '256MiB' });
```
- Callable example (no CORS needed):
```ts
import { onCall } from 'firebase-functions/v2/https';
export const healthCheck = onCall({ invoker: 'public' }, async () => ({ ok: true }));
```
- HTTP with per-function CORS:
```ts
import { onRequest } from 'firebase-functions/v2/https';
import cors from 'cors';
const allowlist = ['https://app.fireforge.ai', 'http://localhost:5173'];
const corsMiddleware = cors({ origin: (origin, cb) => cb(null, !origin || allowlist.includes(origin)) });
export const exampleHttp = onRequest(async (req, res) => {
  await new Promise<void>((resolve) => corsMiddleware(req, res, () => resolve()));
  res.json({ ok: true });
});
```
- Deploy explicitly (examples):
```sh
firebase deploy --only functions:healthCheck,functions:exampleHttp
```

### Shared models (canonical)
- `shared/src/schemas/chart.ts`: matches PRD §5/§9 with fields: `data`, `chartType`, `xAxis`, `yAxis`, optional `seriesKey`, `colors`, `configuration`, `studies`, `axisOptions`, `displayOptions`, `metadata`.
- `shared/src/schemas/colorPalette.ts`: include `colors`, `defaultColor`, `ownerId`, `organizationId`, `visibility`.
- `shared/src/schemas/chartPreferences.ts`: central number/tooltip formatting, currency/locale defaults.
- Consumers must import these from `shared/` only. No duplicate schemas in `frontend/` or `functions/`.

### Frontend implementation slices
- Auth & org contexts: `AuthContext`, `OrganizationContext`, `ChartPreferencesContext`.
- Preferences UI: Colors tab (custom palettes listed above defaults; click-to-select default), Chart Preferences tab (formatter options; user overrides org defaults).
- Unified Chart Creator: table preview → encoding panel (x, y, series, studies) → palette selector → live preview.
- Charts: single renderer that uses centralized formatter and shared model; supports multi-series via `seriesKey` and studies overlay.
- Dashboards: grid layout (12 columns default), drag/resize, items: charts, metric tiles, text. Share & preview modes.

### Data ingestion & connectors (v1 set)
- File upload: CSV/JSON; parse, profile schema, infer types, allow relabel; store raw in Storage and normalized sample in Firestore (row cap for previews).
- OAuth/API connectors:
  - GA4, Stripe, Shopify, Meta: implement connector wizards with steps: authenticate → select properties/accounts → dataset/metrics → install webhooks or schedule polling → test connection → confirm semantic labels/sample.
  - Webhooks: HTTPS Functions v2 in `europe-west2`, signature verification, idempotent writes.
  - Polling: Cloud Scheduler (region `europe-west2`) → Pub/Sub → Functions.
- WIF connectors (Firestore/BigQuery): store WIF config and principal subject; no key files.

### Conversational PRD Builder (later phase)
- Provider-agnostic LLM adapter (Vertex AI, OpenAI). Use Google Genkit for tracing/observability.
- Flow: intent → clarifying questions → mini‑PRD → create chart/dashboard artifact; persist PRD alongside artifacts for audit.

### Security & compliance
- Firestore rules for multi-tenant isolation on `organizations/{orgId}` paths; custom claims reflect simple roles.
- Secrets via Secret Manager; encrypt at rest; short-lived tokens when possible.
- Rate limiting for public endpoints; per-function input validation.
- GDPR: document data categories, retention, export/delete flows; ensure public shares exclude sensitive data or require explicit confirmation.

### Testing strategy
- Unit: formatters, parsers (CSV/JSON), schema validation, chart normalization.
- Integration (using Emulator Suite): data source wizards; CRUD for charts/dashboards/palettes; webhook signature verification; Firestore rules via `@firebase/rules-unit-testing`.
- Contract tests: mocked HTTP/MCP servers for connectors; verify request/response shapes and error handling.
- Functions tests: invoke `onRequest` handlers via supertest against the local emulator; invoke `onCall` handlers via SDK with auth context.
- Frontend tests: component tests with jsdom; critical renderer paths use snapshot tests backed by stable, seeded data.
- E2E: Playwright covering file upload → chart → add to dashboard → share link, running against local emulators. Headless Chromium by default; optional cross‑browser runs (WebKit/Firefox) on demand. Use role-based locators and `data-testid` attributes.
- Coverage: require ≥ 85% statements/branches/functions/lines overall per package; no file < 70% (excluding generated types). Coverage is combined across `frontend/`, `functions/`, and `shared/`.
- Local gates: `npm run test:all` (lint + typecheck + unit + integration with coverage). E2E can run on demand or before significant releases.

### CI/CD & environments
- Environment: single Firebase project (`prod`) only. `.firebaserc` has a single alias.
- No GitHub Actions for now. Enforce local pre-push checks that run `test:all` with coverage thresholds.
- Hosting deploys are independent of functions; use Firebase Hosting Preview Channels to test UI changes without separate environments.
- Pre-release manual step: run `npm run test:e2e:smoke` (Playwright, Chromium headless) against local emulators before deploying.

### Work breakdown (initial backlog)
- Foundation
  - Shared schemas: chart, colorPalette, chartPreferences, dataSource, organization, user
  - Functions scaffolding: global options, health check, onCall/onRequest patterns
  - Frontend scaffolding: auth flows, contexts, Toaster, base routing
  - Formatter module and tests; palette utilities and tests
  - IAM grants + API enablement scripts/checklist
  - Playwright scaffolding: config, smoke test, scripts, and emulator-aware helpers
- File ingestion + chart creator
  - CSV/JSON parsers + schema profiler; sample store; UI wizard
  - Single renderer wired to shared model + centralized formatter; studies alpha
- Dashboards
  - Grid layout + items; CRUD; share/preview; live listeners
- Connectors (per provider)
  - OAuth + wizard, webhook endpoint, polling fallback, semantic model, tests
- WIF
  - Setup wizard, test query functions, docs
- PRD Builder
  - LLM adapter, onCall endpoint, streaming UI, observability

### Definition of Done (per phase)
- All acceptance criteria met from the PRD for the phase.
 - Tests passing (unit/integration/E2E as applicable). Lint clean. Coverage thresholds met.
 - Playwright smoke suite (Chromium headless) green against local emulators.
 - Optionally deployed to the single project (`prod`) after local smoke tests. Docs updated in `Plans/`.

### Operational playbooks
- Function deployment: always explicit list, region set in code, no global CORS in `setGlobalOptions`.
- Incident response: structured logs with correlation IDs; rollbacks via release tags.
- Secrets rotation: documented per connector; avoid long-lived tokens.

–––
This implementation plan converts the PRD into an actionable roadmap with enforceable constraints (Functions v2 in `europe-west2`, canonical shared models, centralized formatting, explicit deploys, and security/IAM guardrails) to begin work from a clean slate and iterate phase by phase.


