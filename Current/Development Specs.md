# Current — AI Agent Development Spec

## Purpose

This document is the implementation-facing operating spec for **Current**. It is written to support an AI coding agent and human collaborators building the product in a scalable, modular, long-term way.

It consolidates the ideas from the existing project materials, especially:
- **Current Podcast Connection Canvas**
- **Application Documentation**
- **Project Overview**
- **Terminology & Branding**

This spec should be treated as the working technical north star for architecture, data modeling, product behavior, shared component strategy, AI integration, and phased delivery.

---

# 1. Product framing

## 1.1 What Current is

Current is a **source-connection and synthesis platform**.

It is not primarily a bookmarking tool, not primarily a read-later system, and not simply a retrieval layer over saved links.

The core user action is:

**Connect this source to this Stream.**

From that point forward, the system monitors, classifies, scores, clusters, and synthesizes incoming content into:
- Digests
- Interactive Podcasts
- Timeline-linked source references
- Follow-up Q&A

## 1.2 Core conceptual model

### User-facing model
- **Drop** = connected source item or content unit
- **Stream** = user-facing destination / intent bucket
- **Digest** = scheduled or AI-triggered synthesis output
- **Podcast** = generated narrative audio output for a Digest

### System-facing model
- **Branch** = hidden or semi-hidden thematic subdivision inside a Stream
- **Weight** = editorial importance score for Drops, clusters, and podcast allocation
- **Podcast Segment** = weighted narrative region tied to one or more Drops

## 1.3 Core principle

**Users direct the Stream. The system shapes the current.**

---

# 2. Product surfaces

Current should be designed as one product ecosystem with multiple surfaces.

## 2.1 Required surfaces

### A. Desktop web application
Primary product surface.

Responsibilities:
- full account experience
- Stream management
- Drop management
- Digest reading
- Podcast playback
- source timeline inspection
- follow-up Q&A
- settings and threshold control
- future admin / analytics tools

### B. Desktop native application
A native desktop shell for focused usage, notifications, faster media access, and OS-level integrations.

Responsibilities:
- same core functionality as desktop web where practical
- richer desktop notifications
- native media controls
- local caching / offline support later
- possible drag/drop and share-target integrations later

### C. Mobile application
A focused mobile experience centered on consumption and lightweight connection.

Responsibilities:
- listen to podcasts
- read digests
- inspect segment sources
- ask follow-up questions
- connect URLs / shares to Streams
- basic Stream settings

### D. Chrome extension
A capture and lightweight management surface.

Responsibilities:
- connect current page to a Stream
- suggest Stream automatically
- create Stream inline
- add Drops to existing or new Streams
- remove Drops
- lightweight Stream management
- adjust podcast trigger threshold / stream-level thresholds
- inherit key account settings where useful
- no need to fully recreate full digest review workflow in V1

## 2.2 Product behavior across surfaces

The system should feel like one product, but each surface should be optimized for its job.

### Web + native desktop
Best for:
- management
- review
- synthesis
- deep inspection
- source attribution
- future advanced controls

### Mobile
Best for:
- listening
- reading
- lightweight reviewing
- follow-up chat
- quick saves via share actions

### Extension
Best for:
- capture
- stream assignment
- threshold tuning
- fast status awareness

---

# 3. Recommended technical strategy

## 3.1 Architecture recommendation

Use a **TypeScript monorepo** with shared packages and platform-specific apps.

### Recommended top-level stack
- **Monorepo:** Turborepo + pnpm by default. Bun may be evaluated later for package/runtime tasks, but pnpm should remain the default package manager unless the team deliberately standardizes on Bun across all apps and tooling.
- **Backend:** Convex
- **Primary language:** TypeScript
- **Web app:** Next.js App Router
- **Mobile app:** Expo / React Native
- **Desktop native app:** Tauri wrapping the web app shell first; a more specialized desktop client can come later if needed
- **Chrome extension:** Plasmo
- **Auth:** Convex Auth by default; only introduce a third-party auth system if a clear product need emerges
- **Styling:** shadcn/ui on top of Tailwind, with class-variance-authority or tailwind-variants, plus SCSS modules only where needed
- **Animation:** Motion for React for interaction polish and transitions
- **Component system:** shared design system package with strict ownership of tokens, primitives, and composed components
- **Player UI:** shared React component packages between web/native where practical; use best-in-class focused libraries for audio, waveform, and timeline behavior where they materially improve the player experience
- **AI orchestration:** server-side actions via Convex
- **Jobs / scheduling:** Convex scheduled functions + background actions
- **Search:** include unified search in V1 using Convex indexes and full-text search where appropriate; reserve embeddings/vector search for later semantic features

### Stack flexibility rule

These recommendations are the current default direction, not a rigid law.

If an AI agent or human implementer finds a better-supported, materially better option for this product, they may recommend and adopt it **only if** they:
- explain the tradeoff clearly
- preserve cross-platform scalability
- preserve shared package boundaries
- document why the deviation is better for Current long-term

## 3.2 Why this architecture

This approach allows:
- shared types across all apps
- shared business logic
- shared scoring logic
- shared validation schemas
- shared API contracts
- shared design system tokens
- platform-specific UX without duplicating the domain layer

## 3.3 Same-codebase interpretation

The goal should be:

**One shared monorepo and one shared domain system, not forced identical UI markup everywhere.**

That means:
- backend logic is shared
- data contracts are shared
- scoring and synthesis logic are shared
- design tokens are shared
- many components are shared
- platform-specific views are allowed when needed

This is the realistic path to scalability.

---

# 4. Front-end strategy

## 4.1 Important constraint from the project

The UI must remain modern, modular, and clean.

The codebase must avoid:
- giant Tailwind class soup in markup
- copy-pasted utility strings
- brittle one-off styling
- component logic mixed with presentation everywhere

## 4.2 Recommended UI architecture

### Use a layered component approach

#### Layer 1 — primitives
Examples:
- Button
- Input
- Card
- Badge
- Sheet
- Dialog
- Tabs
- Slider
- Tooltip
- Avatar
- Icon wrapper

#### Layer 2 — composed product components
Examples:
- StreamCard
- DropRow
- DigestListItem
- PodcastTimeline
- SegmentMarker
- SourcePopover
- FlowStatusBadge
- ConnectToStreamPanel
- ThresholdControl

#### Layer 3 — feature modules
Examples:
- StreamCreationFlow
- DropConnectionFlow
- DigestDetailView
- PodcastPlayerPanel
- SegmentSourceInspector
- ExtensionConnectPanel

## 4.3 Tailwind usage rules

Tailwind is acceptable, but should be abstracted.

### Required pattern
- keep raw utility usage mostly in primitives and component style files
- expose variants via `cva` or `tailwind-variants`
- allow class extension with `className`
- never repeat large utility sets across screens
- favor semantic props over ad hoc styling

### Example rule
Bad:
- each page contains 25–50 inline Tailwind classes for each card or row

Good:
- `<StreamCard density="compact" state="active" />`
- `<Button variant="primary" size="lg" />`
- `<FlowStatusBadge level="heavy" />`

## 4.4 Preprocessing recommendation

Because this product spans web, mobile, desktop native, and extension, do **not** use Pug/Jade as a central view technology.

It will reduce portability and complicate component sharing.

### Recommended alternative
Use:
- **TSX components as the canonical UI format**
- **SCSS modules** only where true stylesheet authoring helps
- **Tailwind + variants** for shared utility-driven design system work
- optional **MDX** for documentation or rich content, not app layout

This satisfies the desire for preprocessing and cleaner structure without damaging cross-platform reuse.

## 4.5 CSS strategy

Recommended:
- Tailwind for tokens, layout primitives, spacing, and responsive behaviors
- SCSS modules for rare complex cases such as waveform overlays, timeline layers, or advanced player visuals
- CSS variables for theme tokens
- no global spaghetti stylesheet

---

# 5. Monorepo structure

```text
/apps
  /web                -> Next.js app
  /mobile             -> Expo app
  /desktop            -> Tauri shell or desktop client
  /extension          -> Plasmo Chrome extension
  /docs               -> internal docs or storybook site

/packages
  /ui                 -> shared UI primitives and product components
  /tokens             -> design tokens, theme variables, motion tokens
  /domain             -> business models, constants, terminology, enums
  /schemas            -> zod schemas and validators
  /scoring            -> weighting and editorial rules
  /ai                 -> prompt builders, orchestration helpers, output parsers
  /media              -> podcast timeline logic, player helpers, transcript mapping
  /streaming          -> source ingestion and normalization logic
  /auth               -> auth wrappers and session utilities
  /config             -> eslint, tsconfig, prettier, shared build config
  /utils              -> generic utilities

/convex
  schema.ts
  users.ts
  streams.ts
  drops.ts
  branches.ts
  digests.ts
  podcasts.ts
  segments.ts
  thresholds.ts
  jobs.ts
  ingest.ts
  ai.ts
  search.ts
  auth.ts
```

---

# 6. Core product architecture

## 6.1 Core product pillars

### Pillar 1 — Connection
The user connects content to a Stream.

### Pillar 2 — Monitoring
The system continuously evaluates connected sources.

### Pillar 3 — Editorial intelligence
The system clusters content into thematic Branches and scores importance.

### Pillar 4 — Output generation
The system generates Digests and Podcasts.

### Pillar 5 — Attribution and trust
The system exposes what sources informed which podcast segments.

### Pillar 6 — Follow-up exploration
The user can inspect sources and ask questions grounded in the Digest.

---

# 7. Source ingestion model

## 7.1 Supported source types
- URL / article page
- RSS feed
- document upload
- media reference
- later: social posts, newsletters, video transcripts, bookmarked collections

## 7.2 Ingestion pipeline

### Phase flow
1. source connected
2. metadata fetched
3. content extracted
4. normalized into internal source structure
5. linked to Stream as Drop or feed-derived item
6. classified into Branches
7. scored
8. included in future Digest planning

## 7.3 Important distinction

The product should support both:
- **connected source definitions** such as RSS feeds or persistent monitored sources
- **captured content items** such as one-off pages or articles

This may require distinguishing between:
- `SourceConnection`
- `Drop`
- `DropSnapshot` or extracted content entry

That distinction should be preserved in the backend even if the UI simplifies it.

---

# 8. Podcast and weighting architecture

## 8.1 Product rule

The podcast must not be a flat read-back of all newest Drops.

It should be built from:
- weighted thematic clusters
- editorial synthesis
- source overlap handling
- playtime allocation by importance

## 8.2 Weighting layers

### Drop-level signals
- relevance score
- novelty score
- impact score
- recency score
- source trust score
- redundancy penalty
- cross-branch value

### Branch-level signals
- aggregate weighted significance
- momentum over time
- concentration of novelty
- alignment with Stream intent
- dominant vs side-current role

### Segment-level signals
- whether a Branch becomes a segment
- segment order
- allocated playtime
- lead / supporting / mention-only classification

## 8.3 Podcast segment model

A Podcast consists of ordered segments.

Each segment:
- may map to one Branch or a merged Branch theme
- contains one lead source and multiple supporting sources
- may share sources with adjacent segments
- includes importance score and timeline range

## 8.4 Critical relationship rule

**Source-to-segment mapping must be many-to-many.**

A single Drop can:
- anchor one segment
- support another segment
- serve as context in a third

This is required for a believable editorial podcast experience.

---

# 9. Database architecture recommendation for Convex

This section is an initial schema direction, not a frozen final schema.

The purpose is to give AI agents and human developers a strong starting model for:
- domain understanding
- table relationships
- index planning
- search planning
- generation pipeline design

Unknowns should be expected. The schema may evolve as the product is validated.

## 9.1 Core entities

### users
- profile
- preferences
- global schedule defaults
- quiet hours
- AI provider preferences later

### streams
- user_id
- title
- description
- icon
- cadence
- digest_mode
- threshold settings
- weighting profile
- topic profile
- status

### source_connections
Represents persistent monitored sources.
- user_id
- stream_id
- type
- source_url
- source_domain
- source_title
- favicon_url
- active_status
- fetch_status
- fetch_frequency
- trust_baseline
- last_checked_at
- last_success_at

### drops
Represents a connected item or captured source instance.
- user_id
- stream_id
- source_connection_id nullable
- source_url
- source_domain
- source_type
- title
- author
- published_at
- connected_at
- created_at
- content_status
- dedupe_hash

### drop_content
- drop_id
- raw_extracted_text
- cleaned_text
- summary_seed
- entities
- keywords
- canonical_url
- content_language
- extraction_version

### branches
- stream_id
- label
- confidence
- parent_branch_id nullable
- branch_profile_vector nullable
- visible_state

### drop_branch_assignments
- drop_id
- branch_id
- primary_assignment boolean
- affinity_score

### drop_scores
- drop_id
- relevance_score
- novelty_score
- impact_score
- recency_score
- source_trust_score
- redundancy_penalty
- cross_branch_value
- composite_score
- scored_at
- model_version

### digest_runs
Represents generation events.
- stream_id
- type
- status
- triggered_by
- generation_window_start
- generation_window_end
- generated_at
- summary_text
- token_usage
- model_used

### podcasts
- digest_run_id
- stream_id
- duration_seconds
- script
- transcript
- audio_url
- waveform_data nullable
- generation_status

### podcast_segments
- podcast_id
- branch_id nullable
- title
- segment_type
- start_time
- end_time
- importance_score
- summary
- order_index

### segment_source_references
- podcast_segment_id
- drop_id
- role
- weight_in_segment
- citation_reason

### digest_chats
- digest_run_id
- user_id
- session_id
- message_role
- message_content
- created_at

### notifications
- user_id
- stream_id nullable
- digest_run_id nullable
- type
- status
- sent_at

### user_threshold_overrides
- user_id
- stream_id
- overflow_threshold
- rogue_wave_sensitivity
- notify_immediately boolean

## 9.2 Optional future entities
- playlists or listening queues
- source groups
- AI provider configs
- team workspaces
- shared streams
- saved prompt presets

---

# 10. Functional architecture by feature area

## 10.1 Streams

Capabilities:
- create
- edit
- archive
- reorder
- set cadence
- choose strict vs adaptive mode
- set thresholds
- inspect flow health

## 10.2 Drops

Capabilities:
- connect from extension
- connect from web
- connect from mobile share target later
- dedupe within Stream
- inspect extraction status
- retry failed content
- move between Streams later

## 10.3 Digests

Capabilities:
- regular scheduled generation
- overflow generation
- rogue wave generation
- text summary
- source references
- read / unread state
- searchable metadata and searchable digest text in unified search

## 10.4 Podcasts

Capabilities:
- generated from digest plan
- playable in all surfaces
- segment markers
- source references by segment
- transcript support later
- chapter navigation

## 10.5 Digest chat

Capabilities:
- scoped only to the digest context
- answer from current digest sources
- explain segments
- compare sources
- recommend what to inspect first

## 10.6 Chrome extension

Capabilities:
- detect current page
- preview current page metadata
- suggest Stream
- connect to Stream
- create Stream
- edit threshold settings
- manage lightweight stream/drop actions
- unified quick search for Streams and recent Drops where useful

---

# 11. Cross-platform UX rules

## 11.1 Shared design language

The experience should consistently reflect the Current metaphor system:
- Stream
- Drop
- Digest
- Rogue Wave
- Flow
- Overflow

## 11.2 Web / desktop native

Primary UX modules:
- left navigation for Streams and recent items
- central content pane
- digest detail panel
- podcast timeline inspector
- contextual chat panel

## 11.3 Mobile

Primary UX modules:
- digest feed
- podcast player
- segment inspector sheet
- source list sheet
- follow-up chat view

## 11.4 Extension

Primary UX modules:
- page preview card
- suggested Stream card
- connect action
- create Stream inline
- threshold controls
- recent connection status

---

# 12. AI architecture

## 12.1 AI responsibilities

The AI layer should be used for:
- source classification
- Stream suggestion
- Branch assignment assistance
- summary generation
- editorial planning
- podcast segment planning
- script generation
- digest-scoped Q&A

## 12.2 Non-AI responsibilities

Use deterministic logic where possible for:
- dedupe
- scheduling
- threshold checks
- notification timing
- content windows
- stable rules and state transitions

## 12.3 Principle

Use AI for judgment and synthesis, not for everything.

---

# 13. Prompt architecture for AI agent implementation

The codebase should treat prompts as first-class assets.

## 13.1 Prompt package structure

```text
/packages/ai
  /prompts
    stream_suggestion.ts
    drop_classification.ts
    branch_assignment.ts
    digest_summary.ts
    digest_segment_planner.ts
    podcast_script.ts
    digest_chat.ts
    source_citation_reason.ts
  /parsers
  /guards
  /schemas
```

## 13.2 Prompting rules

All production prompts should:
- define task clearly
- define input schema clearly
- define output schema clearly
- forbid unsupported claims
- prefer grounded outputs
- require source attribution references by ids
- return structured JSON before any final prose when practical

## 13.3 Example system prompts

### A. Stream suggestion prompt

```text
You are assigning a captured source to the most likely Stream for this user.

Inputs:
- existing Streams with titles, descriptions, and topic profiles
- captured page title
- url
- domain
- extracted summary

Goals:
- recommend the single best Stream
- provide a short explanation
- provide confidence score from 0 to 1
- identify whether a new Stream may be more appropriate

Rules:
- prefer precision over broad matching
- do not invent Stream purposes that are not present
- if confidence is low, say so

Return JSON:
{
  "suggestedStreamId": string | null,
  "confidence": number,
  "reason": string,
  "suggestCreateNewStream": boolean,
  "newStreamSuggestion": string | null
}
```

### B. Drop scoring support prompt

```text
You are helping score a new Drop within a Stream.

Inputs:
- Stream purpose
- recent Drops
- existing Branches
- new Drop summary
- source domain and metadata

Assess:
- relevance
- novelty
- impact
- whether this belongs to an existing Branch
- whether it may create a new Branch

Return JSON only.
```

### C. Digest segment planner prompt

```text
You are an editorial planner creating a podcast segment plan.

Inputs:
- Stream definition
- candidate Branches with scores
- candidate Drops with scores
- generation window

Goals:
- rank story clusters by importance
- decide which clusters become segments
- assign playtime proportionally
- avoid repetitive read-back behavior
- preserve useful minority context

Return JSON with:
- ordered segments
- lead branch ids
- lead drop ids
- supporting drop ids
- segment purpose
- recommended duration range
```

### D. Podcast script writer prompt

```text
You are writing a highly listenable synthesis podcast.

Goals:
- sound editorial and intelligent
- avoid item-by-item source recitation
- explain why developments matter
- preserve nuance when sources disagree
- use source clusters as evidence

Constraints:
- do not fabricate unsupported claims
- do not cite sources that were not assigned
- keep the script aligned to the provided segment plan
- maintain clear transitions between segments
```

### E. Digest chat prompt

```text
You are answering follow-up questions about one Digest only.

You may use:
- digest summary
- digest segments
- referenced Drops
- podcast transcript if available

You may not use:
- external knowledge unless explicitly enabled
- other Digests
- unsupported assumptions

Always ground answers in the digest context and mention when evidence is limited.
```

---

# 14. Scoring and editorial engine guidance

## 14.1 Initial formula direction

The working scoring direction should begin from:

```text
drop_score =
  (relevance * 0.30) +
  (impact * 0.20) +
  (novelty * 0.18) +
  (recency * 0.12) +
  (source_trust * 0.10) +
  (cross_branch_value * 0.10) -
  (redundancy_penalty * 0.20)
```

```text
branch_score =
  sum(top_drop_scores) *
  branch_momentum *
  stream_alignment
```

This should not be hard-coded as permanent truth. It should be versioned and tunable.

## 14.2 Required implementation rule

Create a dedicated package for scoring so it is:
- testable
- versionable
- explainable
- reusable across web, backend, and future analytics tooling

---

# 15. Scheduling and generation engine

## 15.1 Modes

### Strict Schedule
- generate only on the defined cadence
- one digest per cycle unless manually triggered

### Adaptive Flow
- monitor for volume spikes
- monitor for clustered major events
- allow Rogue Wave and Overflow generation

## 15.2 Trigger sources
- scheduled event
- threshold exceeded
- editorial cluster significance
- manual trigger

## 15.3 Threshold controls

Thresholds should exist at:
- global user level
- Stream override level
- extension quick-control level

The extension should be able to adjust at least:
- overflow threshold
- rogue wave sensitivity
- immediate notification preference

---

# 16. Extension-specific architecture

## 16.1 Why extension matters

The extension is the fastest connection surface and a core differentiator.

The UX should emphasize:
- current page awareness
- Stream suggestion
- visual connection to Stream
- confidence and ease

## 16.2 Extension architecture recommendation

Use **Plasmo**.

Reasons:
- modern React extension workflow
- good DX
- TypeScript friendly
- supports content scripts, popup, background messaging
- easier shared package reuse inside monorepo

## 16.3 Extension features V1
- popup opens with current page metadata
- suggested Stream + reason
- connect to suggested Stream
- choose another Stream
- create Stream and connect
- adjust threshold controls for selected Stream
- inspect recent connection state

## 16.4 Extension implementation boundaries

Do not overload V1 with:
- full podcast playback
- full digest review
- large admin features

The extension should be optimized for speed and clarity.

---

# 17. Desktop native recommendation

## 17.1 Recommendation

Use **Tauri** for desktop native packaging after the web app architecture is stable.

Reasons:
- lightweight compared to Electron
- strong Rust-backed shell
- good system integration path
- lets the product reuse much of the web client code

## 17.2 Desktop-native-specific additions later
- OS notifications
- menu bar or tray helper
- media key integration
- offline digest caching
- quick connect window

---

# 18. Mobile recommendation

## 18.1 Recommendation

Use **Expo / React Native**.

Reasons:
- fastest path to iOS and Android
- good shared TypeScript stack
- supports React Native Web strategy if needed
- strong ecosystem for audio and push notifications

## 18.2 Mobile V1 priorities
- digest list
- digest detail
- podcast player
- source segment inspector
- digest chat
- share-to-current later

---

# 19. Backend implementation guidance with Convex

The backend should explicitly model both application state and searchability.

V1 should include enough indexing/search architecture to support a single search input that can surface:
- Streams
- Drops
- Digests
- Podcasts
- optionally Segment titles or source references later

## 19.1 Convex responsibilities
- persistent data model
- typed queries and mutations
- scheduled jobs
- ingestion actions
- AI orchestration actions
- notifications metadata
- user and Stream state

## 19.2 Convex coding rules
- keep mutations narrow and explicit
- use actions for long-running or external API work
- version AI outputs and score outputs
- store structured intermediates, not just final prose
- ensure re-runnable generation flows
- keep audit-friendly state transitions

## 19.3 Important persistence rule

Store not only final outputs, but also:
- candidate clusters
- score snapshots
- generation windows
- model versions
- prompt versions
- segment plans

This will be critical for debugging and future tuning.

---

# 20. Testing strategy

## 20.1 Required test layers

### Unit tests
- scoring logic
- threshold logic
- scheduling logic
- dedupe logic
- prompt output parsers

### Integration tests
- connect URL to Stream
- create Stream from extension
- generate digest from candidate Drops
- map segment sources many-to-many

### UI tests
- extension popup connection flow
- digest detail playback UI
- source inspector interactions
- threshold update controls

### Evaluation tests for AI outputs
- summary grounding
- segment planning quality
- podcast structure quality
- attribution correctness

## 20.2 AI evaluation rule

Do not treat prompt success as subjective only.

Create evaluation fixtures for:
- duplicate-heavy content windows
- major-event clusters
- mixed-quality sources
- overlapping segments
- low-signal streams

---

# 21. Coding standards for AI agents

## 21.1 Non-negotiable rules
- TypeScript first
- strict typing
- zod validation at boundaries
- no giant files when avoidable
- no feature code without reusable domain types
- no hidden side effects in UI components
- no repeated utility-class soup
- no direct AI prompt strings scattered across app files

## 21.2 Component standards
- components must accept `className` where appropriate
- components must expose variants, not styling forks
- business logic should live outside render functions where practical
- feature components should compose primitives instead of duplicating patterns

## 21.3 Backend standards
- separate queries, mutations, and actions clearly
- version long-lived scoring and prompt logic
- log generation lifecycle states
- preserve explainability in editorial decisions where practical

---

# 22. Build order recommendation

## Phase 1 — foundation
- monorepo setup
- Convex schema and auth
- shared domain package
- shared schema package
- shared UI primitives
- Stream and Drop CRUD
- web shell
- extension shell

## Phase 2 — connection system
- extension connect flow
- suggested Stream logic
- Stream creation inline
- ingestion pipeline for URLs
- drop dedupe and extraction

## Phase 3 — digest engine
- scheduling system
- basic summary generation
- digest list and detail views
- strict schedule mode

## Phase 4 — podcast intelligence
- branch assignment
- drop scoring
- segment planning
- podcast generation
- segment timeline UI
- source attribution layer

## Phase 5 — adaptive intelligence
- overflow triggers
- rogue wave triggers
- threshold controls
- extension threshold editing

## Phase 6 — multi-surface expansion
- desktop native shell
- mobile app
- playback refinement
- notifications
- offline caching strategy

---

# 23. What the AI coding agent should optimize for

The AI agent working on this project should optimize for:
- long-term maintainability
- modularity
- shared contracts
- explainable architecture
- reusable UI patterns
- scalable backend modeling
- platform-aware reuse
- future editorial intelligence expansion

The AI agent should **not** optimize for:
- rushed one-file MVP code
- copy-paste components
- platform-specific hacks as the default
- hidden architecture shortcuts that block later scaling

---

# 24. AI agent execution prompts

## Prompt: Architecture steward

```text
You are the technical architecture steward for Current.

Your job is to design and implement features in a way that preserves:
- shared domain logic
- reusable UI primitives
- scalable Convex data modeling
- future support for web, desktop native, mobile, and extension surfaces

You must avoid:
- one-off implementations
- duplicated view logic
- giant Tailwind-heavy page files
- mixing AI prompt logic directly into product components

For every feature request, output:
1. affected packages and apps
2. data model changes
3. API / Convex changes
4. reusable UI components needed
5. platform-specific considerations
6. implementation steps
7. risks and future-proofing notes
```

## Prompt: Feature builder

```text
Build this feature for Current using the existing monorepo structure.

Requirements:
- TypeScript
- strict typing
- reusable components
- zod at boundaries
- Convex-compatible patterns
- class abstraction via variants, not repeated utility strings
- platform reuse where practical

Before coding, state:
- assumptions
- relevant domain entities
- shared packages to update
- UI components to create or extend
- test cases required
```

## Prompt: Refactor reviewer

```text
Review the implementation for architectural quality.

Check for:
- duplicated logic
- styling clutter
- poor package boundaries
- weak typing
- prompt strings embedded in the wrong places
- business rules mixed into UI
- backend logic that is not versionable or testable

Return:
- issues found
- why they matter
- exact refactor plan
```

## Prompt: Prompt engineer for Current

```text
Create or revise a production prompt for Current.

Requirements:
- grounded in provided data only
- structured output first
- zod-parseable JSON where appropriate
- clear task boundaries
- no unsupported claims
- includes failure behavior when evidence is weak

Output:
- final prompt
- expected input schema
- expected output schema
- evaluation checklist
```

---

# 25. Key architectural decisions

## Decision 1
Use a **TypeScript monorepo** with shared packages.

## Decision 2
Use **Convex** as the operational backend and scheduling layer.

## Decision 3
Use **Next.js** for the desktop web app.

## Decision 4
Use **Expo / React Native** for mobile.

## Decision 5
Use **Plasmo** for the Chrome extension.

## Decision 6
Use **Tauri** for desktop native packaging when ready.

## Decision 7
Use **TSX component composition**, not Pug/Jade, as the canonical front-end structure.

## Decision 8
Use **Tailwind with abstraction** plus selective **SCSS modules**, not raw utility sprawl.

## Decision 9
Treat **prompts, scores, segment plans, and model versions** as versioned system assets.

## Decision 10
Treat **source-to-segment references as many-to-many**.

---

# 26. Immediate next implementation tasks

1. scaffold the monorepo
2. define shared domain entities and zod schemas
3. model Convex tables for Streams, Drops, Digests, Podcasts, Segments, and Thresholds
4. build the web app shell
5. build the extension popup shell
6. implement Stream creation and Drop connection flow
7. implement URL extraction and ingestion pipeline
8. implement strict-schedule digest generation
9. implement first-pass summary generation
10. implement versioned prompt package
11. implement scoring package skeleton
12. design podcast segment plan schema before full audio generation

---

# 27. Final instruction to any AI agent working on Current

Build Current like a durable product system, not a demo.

Preserve the distinction between:
- visible user concepts
- hidden editorial intelligence
- shared domain logic
- platform-specific interaction layers

Every implementation should strengthen:
- modularity
- explainability
- future reuse
- editorial quality
- source trust and attribution

The product should ultimately feel calm, intelligent, and beautifully structured — while the underlying architecture remains rigorous enough to support years of growth.

