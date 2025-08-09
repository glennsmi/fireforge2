# Phase 3 — Dashboards

## Goals
- Create, edit, and share dashboards composed of charts/tiles.

## Tasks
- [ ] Grid and items
  - [ ] 12‑column grid, drag/resize
  - [ ] Items: chart, metric tile, text
  - [ ] Live listeners for real‑time updates
- [ ] Sharing
  - [ ] Share/preview modes; ensure non‑sensitive data in public shares
  - [ ] Access checks in Firestore rules
- [ ] Tests
  - [ ] Integration tests for CRUD
  - [ ] Playwright flows for add/remove/rearrange/share
- [ ] Docs
  - [ ] Dashboard how‑to and sharing policy

## Risks and mitigations
- Layout persistence conflicts → debounce saves and resolve strategy
- Private data exposure → explicit confirmation for public shares

## Learning log
- YYYY‑MM‑DD — …

## Definition of Done
- CRUD stable; Playwright dashboard flows green
- Docs updated
