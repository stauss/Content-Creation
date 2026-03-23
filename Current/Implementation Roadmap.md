# Current Initial Implementation Roadmap

## Foundation priorities

1. Establish the TypeScript monorepo, shared configuration, and app shells.
2. Lock the shared domain language and zod schemas before feature endpoints grow.
3. Model Convex tables and indexes for Streams, Drops, Digests, Podcasts, Segments, and thresholds.
4. Build the web and extension shells first because they drive the core connection workflow.
5. Version prompts and scoring logic in dedicated packages before generation features start.

## Backlog slices

### 1. Monorepo foundation
- Purpose: create durable package boundaries and workspace automation.
- Packages and apps: root, all apps, all shared packages.
- Data model work: none.
- UI work: shell surfaces only.
- Backend work: none.

### 2. Convex schema and auth
- Purpose: establish operational backend structure and authentication entry points.
- Packages and apps: `convex/`, `packages/auth`, `apps/web`, `apps/extension`.
- Data model work: users, streams, source connections, drops, digests, podcasts, segments, thresholds.
- UI work: sign-in affordances later.
- Backend work: schema, core queries/mutations, auth integration.

### 3. Shared domain and schema packages
- Purpose: keep product vocabulary and validation versioned outside apps.
- Packages and apps: `packages/domain`, `packages/schemas`.
- Data model work: entity types and input schemas.
- UI work: none directly.
- Backend work: validate mutations and action boundaries.

### 4. Shared UI primitives and tokens
- Purpose: centralize styling ownership and prevent page-level utility sprawl.
- Packages and apps: `packages/ui`, `packages/tokens`, web/docs/desktop/extension.
- Data model work: none.
- UI work: primitives, composed cards, app shell, theme tokens.
- Backend work: none.

### 5. Web app shell
- Purpose: become the primary management surface for Streams, Digests, and Podcasts.
- Packages and apps: `apps/web`, `packages/ui`, `convex/`.
- Data model work: read models for streams and digest summaries.
- UI work: navigation, dashboard panels, shell layout.
- Backend work: initial queries for stream listing and user bootstrapping.

### 6. Extension shell
- Purpose: become the fastest connection surface.
- Packages and apps: `apps/extension`, `packages/ui`, `packages/schemas`, `convex/`.
- Data model work: source capture inputs and threshold payloads.
- UI work: popup shell, stream suggestion card, connect action.
- Backend work: stream lookup and lightweight mutations.
