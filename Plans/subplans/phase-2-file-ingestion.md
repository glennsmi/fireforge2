# Phase 2 — File ingestion + unified chart creator

## Goals
- Users can upload CSV/JSON, profile schema, map fields, preview data, and build a chart in the creator.

## Tasks
- [ ] Parsers and profiling
  - [ ] CSV/JSON parsing with type inference
  - [ ] Sample storage (Storage raw + Firestore normalized sample)
  - [ ] Unit tests for parsers and profilers
- [ ] Field mapping UI
  - [ ] Table preview and encoding panel (x, y, series)
  - [ ] Centralized formatter integration
  - [ ] Component tests
- [ ] Creator
  - [ ] Live preview with shared `chart` model
  - [ ] Studies alpha (optional overlay)
  - [ ] Integration tests against emulators
- [ ] Docs
  - [ ] User guide: upload → map → preview → create
  - [ ] Developer notes: data normalization and limits

## Risks and mitigations
- Large files → sampling caps and progressive parsing
- Incorrect inference → allow manual relabeling and persist mapping

## Learning log
- YYYY‑MM‑DD — …

## Definition of Done
- End‑to‑end flow works locally (emulators)
- Playwright path: upload → map → preview → create chart
- Docs updated
