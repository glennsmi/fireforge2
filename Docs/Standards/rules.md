# Project Rules

These rules are mandatory. Keep this doc updated and enforce via lint/scripts.

## Firebase Functions
- Use Functions v2 in region `europe-west2`.
- Set region in code via `setGlobalOptions`; do not pass `--region` on CLI.
- Do not create a `deploy` script under `functions/` that runs `firebase deploy --only functions`.
- Deploy functions explicitly by name (avoid blanket deploys).

## CORS
- No global CORS in `setGlobalOptions`.
- Apply per-function CORS to `onRequest` only.

## Models
- Canonical schemas live in `shared/src/models.ts` and are re-exported from `shared/src/index.ts`.
- Frontend and backend import from `@fireforge/shared` only.

## Testing
- Unit + integration on PRs; Playwright smoke before release.
- Coverage thresholds: ≥ 85% overall; no file < 70% (generated code excluded).

## Documentation
- Update subplans and ADRs in the same PR as code changes.
- Maintain Mermaid diagrams in `Docs/Architecture`.

## Enforcement
- Pre-push script runs: lint, typecheck, unit/integration with coverage.
- Periodic check scans for prohibited scripts/config.
