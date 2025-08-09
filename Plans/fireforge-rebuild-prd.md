## FireForge v2 — Product Requirements Document (PRD)

### 1) Product overview
- **Goal**: Rebuild FireForge as a specialist, multi-tenant SaaS for creating modern, real‑time business dashboards from uploaded files, SaaS APIs, MCP servers, and cloud databases. Keep the UI simple and conversational, while ensuring secure, scalable data connectors and a unified data model.
- **UI**: React + TypeScript, Shadcn UI, Lucide icons, themeable to organization brands. Follow the existing look & feel from the design reference at [fireforge.ai/design-reference](https://fireforge.ai/design-reference).
- **Hosting/Platform**: Firebase (Hosting, Authentication, Firestore, Storage, Functions v2 in europe‑west2, Remote Config). Consider minimal GCP services only where needed (e.g., Pub/Sub or Cloud Scheduler for polling connectors).

### 2) Objectives and non‑goals
- Objectives
  - Single, canonical chart model used everywhere (frontend/backend). Avoid overlapping or duplicated schemas.
  - Easy data onboarding via file upload, step-by-step SaaS/API connector wizards, and MCP servers.
  - Conversational “PRD Builder” to elicit user intent for charts and dashboards via text (voice later).
  - Real‑time or near‑real‑time updates; seamless refresh on demand.
  - Strong multi‑tenant security; least‑privilege access; WIF for customer cloud data access.
  - Brand/palette management at org and user levels; consistent chart formatting through a centralized formatter.
- Non‑goals (v1)
  - Complex role hierarchies or granular per‑field permissions beyond org/user scopes.
  - Advanced ML analytics (beyond basic trend/regression/moving averages) in the initial milestones.
  - Full voice assistant (defer to a future milestone).
  - Data residency controls (out of scope initially for SME focus; revisit when moving up‑market).

### 3) Users and personas
- Small business owners, COOs, Heads of Sales/Marketing who want quick, reliable insights.
- Data‑curious operators who can follow a wizard but are not data engineers.
- Developers/analysts embedding or sharing dashboards with teams and partners.

### 4) High‑level architecture
- Client: React + TypeScript + Shadcn UI, state via Jotai, toaster notifications via shadcn/useToast, file uploads to Firebase Storage.
- Shared models: TypeScript types in a `shared/` package consumed by both frontend and Functions (e.g., chart, palette, data source, dashboard).
- Backend: Firebase Functions v2 (region europe‑west2). HTTP/onCall endpoints for connectors, PRD Builder, queries, webhooks. Use per‑function CORS configuration (do not set CORS in `setGlobalOptions`).
- Data storage: Firestore as primary store; Storage for uploads; optional Pub/Sub + Scheduler for polling connectors where webhooks not available.
- Security: Firebase Auth; custom claims for org membership; Firestore rules for multi‑tenant isolation; KMS/Secrets for credentials; WIF for customer GCP access.

### 5) Data model (canonical, shared)
Keep all types in `shared/` and import everywhere. Avoid duplicate or competing chart schemas.

- Organization
  - id, name, branding (logo, theme), chartPreferences (defaults, including `defaultPaletteId`, tooltip formatting), subscriptionTier, createdAt/updatedAt.

- User
  - id, email, displayName, organizations[], profile settings (chartPreferences), createdAt/updatedAt.

- Membership
  - organizationId, userId, role: 'owner' | 'admin' | 'member' (simple v1). Custom claims mirror role.

- ColorPalette
  - id, name, colors: string[] (max 20), defaultColor: string, ownerId, organizationId, visibility: 'private' | 'organization' | 'public', description?, usageCount, tags?, createdAt/updatedAt/lastUsedAt.
  - Business rule: org can set one `defaultPaletteId`; users can override with their own default.

- DataSource
  - id, organizationId, userId, type: 'file-json' | 'file-csv' | 'api-google-analytics' | 'api-shopify' | 'api-stripe' | 'mcp' | 'firestore' | 'bigquery' | 'postgres' | 'mysql' | ...
  - configuration: discriminated union per type (e.g., OAuth2 details, WIF settings, webhook secret, base URL, mapping info);
  - status: 'pending' | 'connected' | 'active' | 'error'; visibility, permissions: { read[], write[], admin[] } (user ids);
  - syncSettings: { enabled: boolean; frequency: 'manual' | 'hourly' | 'daily'; autoRefreshCharts: boolean };
  - usageStats, errorCount, createdAt/updatedAt.

- SemanticModel (per DataSource)
  - id (same as dataSourceId), metrics[], dimensions[], synonyms[], human‑readable labels and descriptions; optional unit/currency.
  - Used by the conversational PRD Builder to map user intent (“users by country”) to queries.

- Query (persisted)
  - id, organizationId, dataSourceId, definition: { metrics[], dimensions[], filters, dateRange, limit/order }, lastRunAt.

- Chart (single canonical model)
  - id, organizationId, userId, title, description?,
  - data: UniversalDataPoint[] where each point is { [key: string]: string | number | Date };
  - chartType: 'bar' | 'line' | 'area' | 'scatter' | 'pie' | 'doughnut';
  - xAxis: string; yAxis: string; optional seriesKey (for multi‑series);
  - configuration?: { responsive?, maintainAspectRatio?, singleColor?: string | { light: string; dark: string }, colorPalette?: string };
  - colors?: string[] (resolved array for series when multi‑series);
  - studies?: [
      { id, type: 'regression' | 'movingAverage' | 'polynomialTrend' | 'exponentialSmoothing' | 'mean' | 'median' | 'mode' | 'stdDeviation', period?, degree?, alpha?, color: string | { light; dark }, visible: boolean }
    ];
  - axisOptions?: { xMin?: number | null; xMax?: number | null; yMin?: number | null; yMax?: number | null };
  - displayOptions?: { showGridLines?: boolean } (default true if undefined);
  - metadata?: { yAxisType?: 'number' | 'currency' | 'percent'; dataSource?: string; queryType?: string; dateRange?: string; recordCount?: number; isMultiSeries?: boolean };
  - tags?, isPublic, createdAt/updatedAt/lastViewedAt?, viewCount.

- Dashboard
  - id, organizationId, userId, title, description?, layoutConfiguration { columns: number; rowHeight: number; gap: number },
  - items: Array<{ id, type: 'chart' | 'metric-tile' | 'text', refId?: string, position: { x,y,w,h }, options?: any }>, createdAt/updatedAt.

- MetricTile
  - id, title, valueType: 'number' | 'currency' | 'percent', formatting preferences, queryRef or inline computation, trend vs previous period.

Notes on overlap to remove
- Keep only the canonical chart model above across shared/frontend/functions. Remove any parallel “ChartSchema” variants that diverge. Centralize conversions in one module.

### 6) Firestore structure
- Organizations: `organizations/{orgId}`
- Users: `users/{userId}` (profile), `organizations/{orgId}/members/{userId}` (membership)
- Palettes: `organizations/{orgId}/palettes/{paletteId}` and/or `users/{userId}/palettes/{paletteId}`; public palettes at `palettes_public/{paletteId}`
- Data sources: `organizations/{orgId}/dataSources/{dataSourceId}` with `semanticModel` sub‑document
- Queries: `organizations/{orgId}/queries/{queryId}`
- Charts: `organizations/{orgId}/users/{userId}/charts/{chartId}`
- Dashboards: `organizations/{orgId}/users/{userId}/dashboards/{dashboardId}`
- Public shares: `public/{type}/{shareId}` pointing to read‑only projections of charts/dashboards

### 7) Connectors and data ingestion
Supported in v1:
- File upload
  - JSON, CSV. Parse, profile schema, infer types, let user relabel fields. Store original file in Storage, normalized sample in Firestore (or ephemeral cache) with a max row limit for previews.
  - Upload limits: up to 10,000 rows per file in v1 (org- and tier-agnostic initially). Large files prompt the user to filter/summarize prior to upload.
- SaaS APIs (initial set)
  - Google Analytics 4 (OAuth2)
  - Shopify (API key + webhooks)
  - Stripe (API key + webhooks)
  - Meta (Facebook/Instagram) Marketing APIs (OAuth2 + webhooks where available)
    - Scope details: Ads Insights (campaign/ad set/ad level metrics), Instagram Media (engagement, reach/impressions where available), Conversions API events ingestion (server‑side events)
  - Each connector offers a “Connector Wizard”:
    1) Authenticate
    2) Select properties/stores/accounts/businesses
    3) Choose core datasets/metrics (Shopify: Orders, Orders by Product, Products, Customers; Stripe: Charges, Subscriptions; GA4: standard engagement/acquisition; Meta: Ads Insights, IG Media, CAPI events)
    4) Install webhooks where available; otherwise choose polling frequency per subscription tier
    5) Test connection
    6) Confirm semantic labels and sample preview
  - Real‑time via webhooks to HTTPS Functions v2 in europe‑west2; polling via Scheduler + Pub/Sub where needed.
- Dataset selection and volume control (Shopify)
  - Provide explicit toggles for Orders, Orders by Product, Products, and Customers to manage volume and cost; clearly display estimated data volume per selection.
- Prebuilt computed metrics (Stripe)
  - Out‑of‑the‑box computed KPIs and tiles: Revenue (by period), Active Subscriptions, MRR/ARR, and simple LTV (configurable calculation assumptions). Expose derived metrics in the semantic model for easy charting.
- Polling tiers (fallback when no webhooks):
  - Freemium: daily
  - Professional (Tier 1): 4‑hourly
  - Team (Tier 2): hourly
  - Optional add‑on per connector: 15‑minute polling
- MCP servers
  - Early pattern: support a generic MCP client that can list tools and run them with parameters. As a concrete starter, include an example internal MCP server (e.g., “FireForge Data Tools MCP”) exposing simple read adapters (CSV from Storage, Firestore query) to validate the client pattern. This ensures our MCP design is stable for future third‑party servers.
- Cloud databases (secure)
  - Firestore and BigQuery via Workload Identity Federation (WIF). Optionally PostgreSQL/MySQL via Cloud SQL IAM + Cloud SQL Auth proxy (future milestone).

Credential storage and security
- Use Firebase/Google Cloud Secrets for connector credentials. For tokens that must be stored at rest, encrypt with Cloud KMS.
- For WIF, do not store service account keys. Store the WIF config and principal subject only.

### 8) Query and semantic layer
- Maintain a per‑data‑source `semanticModel` with metrics, dimensions, synonyms, units/currency, descriptions, and example values.
- Dynamic schema discovery:
  - Known APIs: ship curated semantic models (field dictionaries) for GA/Shopify/Stripe/Meta.
  - Unknown/new sources: auto‑profile sample data to infer types, propose semantic labels, and ask the user to confirm/refine.
- Conversational intent → semantic parse → query plan → resolver per connector → normalized rows.
- Persist common queries; support parameterized filters and quick date ranges.
 - Computed metrics support
 - Stripe: expose Revenue, Subscriptions, MRR/ARR, LTV as computed metrics with documented formulas and configurable parameters (e.g., churn). Default LTV = ARPU / monthly churn; compute on demand (no cohort snapshot persistence in v1). Optionally support cohort‑based realized LTV when sufficient data is present (future milestone).
 - Shopify: expose “Orders by Product,” AOV, and repeat‑customer rate as computed metrics when underlying data is available. Default time window for these KPIs is last 30 days (user can change).

### 9) Charts and studies
- Multi‑series support via `seriesKey`; colors resolved from selected palette or explicit `singleColor` for monochrome visuals.
- Centralized number/axis/tooltip formatter shared across all charts. Default tooltip formatting rules:
  - Locale aware
  - < 1 → 2 decimals; ≥ 1 and < 30 → 1 decimal; ≥ 30 → 0 decimals
- Studies: trendline, moving average (period), regression types, exponential smoothing (alpha), etc., all rendered on line/area/combined charts.
- Display options: grid lines on by default; hideable via `displayOptions.showGridLines`.

### 10) Dashboards
- Grid layout with drag‑resize (12‑column default). Items: charts, metric tiles, text blocks.
- Theme inheritance from organization brand/palette; per‑dashboard overrides limited to layout and background style.
- Sharing permissions per chart/dashboard (owner‑set):
  - Private (owner only, default)
  - Organization (visible to org members)
  - Public external (read‑only link), with optional iframe embedding and origin allowlist
  - Branding rules: Public shares include the phrase “Crafted with in FireForge” and a link to a dedicated landing page (URL TBD) in all tiers; branding removal is allowed for Tier 2 (Team) and above. UTM tagging is disabled by default and can be configured in organization settings.
  - Default allowlist: none preconfigured; organizations may add allowed origins for embeds.
- Real‑time updates: live Firestore listeners; webhook/polling writes update bound charts/tiles.
- Prebuilt KPI tiles and starter dashboards
  - Stripe: Revenue (period), Active Subscriptions, MRR/ARR, LTV
  - Shopify: Orders (period), Orders by Product, AOV, Top Products, New vs Returning Customers
  - GA/Meta: Sessions/Visitors, Conversions, CPA/ROAS (where available), IG engagement (include all available Instagram metrics for detailed analysis, subject to permissions)
  - Defaults: Shopify KPIs reflect last 30 days by default (editable); similar sensible defaults applied per connector where applicable.

### 11) Conversational PRD Builder (intelligent layer)
- Purpose: Guide users to produce an internal PRD for each chart or dashboard, then auto‑create the artifact.
- Flow (chart):
  1) Understand goal: metric(s), breakdowns, date range, segment filters
  2) Identify data source(s) and semantic fields; propose several visuals
  3) Ask clarifying questions until confidence threshold reached (with explicit uncertainty handling)
  4) Generate a “mini‑PRD” for the chart; create the chart with sample; allow user to save
- Flow (dashboard):
  1) Use one‑liner goal; suggest key tiles/charts; confirm KPIs
  2) Place items into a starter layout
  3) Offer refinements: add studies, change aggregations, alter time windows
- Implementation: onCall Function v2 in europe‑west2 with a provider‑agnostic LLM adapter supporting Google Vertex AI and OpenAI. Stream partial responses to the UI for responsiveness. Persist the created mini‑PRD alongside chart/dashboard metadata for auditability. Use Google Genkit for monitoring and observability of generative flows.

### 12) Frontend UX requirements
- Shadcn UI; Lucide icons; consistent dialogs and toasts. Include <Toaster /> in root layout; all notifications use the toast hook.
- Data source wizards: left‑rail steps, validation on each step, prominent “Test Connection”.
- Chart creator: unified table → encoding panel (x, y, series, study), live preview, palette selector, and advanced studies panel.
- Dashboard editor: drag‑drop grid, snap/resizing, quick add from existing charts; share & preview modes.
- Preferences
  - Organization and User “Colors” tab: custom palettes listed above defaults, responsive grid cards (up to 10 swatches), card selection sets default palette with clear highlight; edit/delete gated by permissions and subscription tier; helper copy: “Click on a palette to make it the default.”
  - “Chart Preferences” tab: central number/tooltip formatting; user overrides org defaults.
  - Currency defaults: easy presets for major regions (US, UK, EU, AU, CA, NZ, Middle East, Asia, South America, Africa). Org default currency/locale is stored and used by formatters; users can override in personal settings.
  - Public Share Settings: toggle/remove branding (Tier 2+), optional UTM parameter configuration (disabled by default), and iframe allowlist management (no default entries).

### 13) Backend/infra requirements
- Firebase Functions v2 only, region europe‑west2 for all functions. Do not set `cors` in `setGlobalOptions`; configure CORS per function as needed.
- Deploy functions with explicit `--only functions:functionA,functions:functionB` to avoid deleting unrelated functions in the same project. Never add an NPM script that deploys all functions.
- Webhooks: per‑connector HTTPS endpoints with verification/secrets; idempotent processing.
- Schedules: Cloud Scheduler (europe‑west2) → Pub/Sub → Function for polling fallbacks.
- Observability: structured logs; correlation IDs per request; error budget SLOs. Use Google Genkit to monitor LLM chains and semantic enrichment.

### 14) Security and compliance
- Multi‑tenant isolation via Firestore rules and custom claims; membership checks on orgId path segments.
- Principle of least privilege for connectors; encrypt tokens; short‑lived access where possible.
- WIF for customer GCP access (Firestore/BigQuery). No service account key files.
- Per‑function input validation and output filtering; rate limiting on public endpoints.
- GDPR compliance: document data categories, retention, and user deletion workflows; detect and minimize collection of PII. Add admin tools to export/delete user data. For public shares, ensure no sensitive/PII data is included or require explicit confirmation.

### 15) Testing and quality
- Unit tests for formatters, parsers (CSV/JSON), semantic mapping, and chart normalization.
- Integration tests for data source wizards and CRUD flows (Charts, Dashboards, Palettes).
- Contract tests for connectors (mocked HTTP/MCP servers). Webhook signature verification tests.
- E2E smoke tests for: file upload → chart → add to dashboard → share link.

### 16) Milestones and acceptance criteria
1) Foundation (auth, orgs, shared models, palette basics, formatter)
   - AC: Create org, set default palette, upload CSV, preview chart with correct formatting.
2) File ingestion and unified chart creator (multi‑series, studies alpha)
   - AC: Paste/upload CSV/JSON → semantic labels → chart preview → save chart (single model).
3) Dashboards (grid, tiles, sharing beta)
   - AC: Combine multiple charts + metric tiles; public read‑only link works; live updates.
4) SaaS connectors (GA, Shopify, Stripe, Meta) with webhooks/polling fallback
  - AC: Step wizard completes; “Test Connection” passes; semantic model populated; sample chart renders. Webhooks installed where supported; polling according to tier configured otherwise. Shopify dataset selection works. Stripe computed metrics (Revenue, Subscriptions, MRR/ARR, LTV) appear as chartable fields and KPI tiles.
5) MCP integration
  - AC: Register external MCP server; list tools; run tool with params; build chart from tool output. Include internal “FireForge Data Tools MCP” to validate client/server design pattern early.
6) WIF data access (Firestore/BigQuery)
   - AC: WIF setup wizard produces instructions; test query succeeds without service account keys.
7) Conversational PRD Builder
   - AC: Given a prompt, the app asks clarifying questions, generates a mini‑PRD, and creates a chart or dashboard.
8) Brand controls and preferences (org/user)
   - AC: Palettes and chart preferences propagate everywhere; user overrides respected.

### 17) Deployment and operations
- Environments: dev/stage/prod projects.
- Functions v2 in europe‑west2; deploy with explicit function lists; CI via GitHub Actions with lint/test/build.
- Rollbacks via release tags; on‑error alerts; rotation of secrets.

### 18) Open questions
Please confirm or clarify the following so we can finalize remaining PRD details:
1) Next connector shortlist beyond GA/Shopify/Stripe/Meta (e.g., Xero, QuickBooks, HubSpot, Notion?). Prioritize top 3.
2) MCP servers: which external MCP servers (if any) should we target first, and required auth methods?
3) Polling add‑on pricing: define initial pricing/limits for 15‑minute polling per connector (TBD).

---
Document owner: Product/Engineering
Last updated: YYYY‑MM‑DD

