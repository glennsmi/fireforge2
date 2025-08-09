# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Key Commands

### Development
```bash
npm run dev           # Start Vite dev server on port 5173
npm run preview       # Preview production build on port 5173
```

### Build & Quality
```bash
npm run build         # Build shared models first, then Vite build
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run rules:check   # Check Firebase rules compliance
```

### Firebase Functions
```bash
cd functions
npm run build         # TypeScript compilation
npm run serve         # Local emulator
npm run shell         # Interactive shell
npm run deploy        # Deploy (use explicit function names)
```

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4 + Shadcn UI
- **Backend**: Firebase Functions v2 (europe-west2 region)
- **Database**: Firestore with multi-tenant isolation
- **Auth**: Firebase Auth with custom claims for org membership
- **Storage**: Firebase Storage for file uploads
- **State Management**: React Context (Auth), considering Jotai for app state
- **Routing**: React Router v7 with data routers (createBrowserRouter)

### Project Structure
- `/src` - React application code
  - `/components` - Reusable UI components (Header, Sidebar, ProtectedRoute)
  - `/context` - React contexts (AuthContext)
  - `/pages` - Route components (Shell layout, Login, feature pages)
  - `firebase.ts` - Firebase initialization with emulator support
- `/shared` - Shared TypeScript models package (workspace)
  - `/src/models.ts` - Canonical data models (Chart, ColorPalette, ChartPreferences)
- `/functions` - Firebase Functions v2 backend
  - Region locked to `europe-west2` via setGlobalOptions
  - Per-function CORS configuration (no global CORS)
- `/Docs` - Living documentation
  - `/Architecture` - System diagrams (Mermaid)
  - `/ADRs` - Architecture Decision Records
  - `/Standards` - Coding and deployment rules
- `/Plans` - PRD and implementation plans

### Critical Rules

1. **Firebase Functions Region**: Always use `europe-west2` via `setGlobalOptions`. Never pass `--region` on CLI.

2. **CORS Configuration**: Apply CORS per-function to `onRequest` only. Never set global CORS in `setGlobalOptions`.

3. **Shared Models**: All data models must be defined in `/shared/src/models.ts` and imported via `@fireforge/shared`. Never duplicate schemas.

4. **Environment Variables**:
   - Frontend: Use `VITE_` prefix for all env vars
   - Emulators: Controlled via `VITE_USE_EMULATORS=true`
   - Functions: Use `defineString`/`defineSecret` params system

5. **Multi-tenancy**: Implement strict organizationId-based isolation in Firestore rules and queries.

## Data Model

The application uses a multi-tenant architecture with these core entities:

- **Organization**: Top-level tenant with branding and chart preferences
- **User**: Can belong to multiple organizations via Membership
- **ColorPalette**: Hierarchical visibility (user/org/public)
- **Chart**: Canonical chart model with type-safe schema (line/bar/area/scatter)
- **ChartPreferences**: Locale, currency, decimal places, grid lines, default palette
- **DataSource**: File uploads, SaaS connectors, MCP servers (planned)
- **Dashboard**: Collection of charts with layout (planned)

## Firebase Emulators

Local development uses Firebase emulators:
- Auth: localhost:9099
- Firestore: localhost:8080
- Storage: localhost:9199

Set `VITE_USE_EMULATORS=true` in `.env.local` to enable.

## Testing Strategy

- Unit & integration tests on all PRs
- Coverage targets: ≥85% overall, no file <70%
- Playwright smoke tests before releases
- Pre-push hooks enforce: lint, typecheck, test coverage