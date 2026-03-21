# Checkpoint — Product Vision & Roadmap

## TL;DR

Checkpoint is a Figma-native system for capturing, organizing, and eventually sharing the design process through intentional snapshots of work — called checkpoints.

This product is built in three deliberate phases, starting with a highly focused capture tool and expanding into a broader ecosystem for design process discovery and learning.

The goal is not to build another portfolio platform. The goal is to create infrastructure for design thinking itself — a layer between the raw chaos of iteration and the polished fiction of a finished case study.

---

## The Throughline

Across all three phases, one core idea drives everything:

> **Capture → Curate → Share → Learn**

Checkpoint starts as a tool designers use privately for themselves, becomes something they can share, and ultimately becomes a place others visit to learn from real design thinking.

---

## The Problem

### 1.1 Portfolio Pain — Designers Rebuild Their Story From Memory

Portfolios are slow, manual, and disconnected from real work. Designers reconstruct process after the fact. Thinking gets lost, simplified, or quietly fabricated. The gap between how work was actually done and how it's presented has become an accepted norm — and everyone knows it.

### 1.2 Learning Gap — The Design Community Shows Outcomes, Not Thinking

Most platforms show only finished work. There's no visibility into iterations, rejected directions, or the reasoning behind key decisions. Designers want to learn how others think — not just see what they shipped. That kind of content doesn't exist in any useful form today.

### 1.3 Tooling Gap — Figma's Version History Isn't Built for Humans

Figma's version history is buried, linear, and context-free. There's no way to mark meaningful moments in a workflow, annotate intent, or navigate between states in a way that maps to how designers actually think and work.

---

## The Core Insight

Designers don't need another place to post work.

They need a system to capture, understand, curate, and share their process — in that order, not backwards.

> **Curated Process — not raw history, not polished fiction.**

Two broken models already exist:
- Raw version history that no one reads
- Polished portfolio work that doesn't reflect reality

Checkpoint introduces a new category that sits between them.

---

## Product Evolution

Each phase builds on the previous one. No skipping.

### Phase 1 — Capture (Plugin)
**Goal:** Make process visible to the designer
**Horizon:** Immediate / MVP

### Phase 2 — Translate (Portfolio Layer)
**Goal:** Turn process into shareable output automatically
**Horizon:** Near-Term / Post-MVP

### Phase 3 — Distribute (Platform)
**Goal:** Enable discovery, learning, and monetization
**Horizon:** Long-Term / Vision

---

## Phase 1 — Plugin (MVP)

### Core Value

> "Never lose your design thinking again."

This must be useful even if no one ever shares anything.

### Core Features

**1. Create Checkpoint**
- Trigger via keyboard shortcut (primary) or button (secondary)
- Captures node selection, structure + properties, timestamp, and optional note

**2. Node-Scoped Grouping**
- Checkpoints belong to a node (frame or group)
- Each node acts as a mini timeline of that element's evolution

**3. On-Canvas Widget**
- Visual indicator attached directly to the node
- Shows checkpoint count and current state status
- Updates automatically

**4. Checkpoint Panel**
- List of checkpoint groups with preview thumbnails
- Count of saved states
- Ability to select, expand, and edit

**5. State Navigation**
- Clicking a checkpoint updates the canvas to that state
- "Current state" detection highlights the matching checkpoint

### Interaction Model

**Creation:** Select node → Trigger checkpoint → Snapshot saved → UI updates immediately

**Exploration:** Expand group → View thumbnails → Click to navigate

**Editing:** Enter edit mode → Select checkpoints → Delete, move, or group

**Grouping:** Create named groups (e.g., "Logo Ideas") → Add checkpoints into groups

### UX Principles

- **Fast** — Sub-1 second interactions. No friction at capture time.
- **Minimal** — No heavy UI. Get out of the way.
- **Contextual** — Node-based, not global. Scope is always clear.
- **Invisible** — Present when needed. Disappears otherwise.

### Technical Gotchas

1. **Performance** — Serializing nodes can get heavy; must optimize snapshot size carefully
2. **Storage Limits** — `clientStorage` constraints require a compression or pruning strategy
3. **State Accuracy** — Reverting must be predictable; partial vs. full node restoration is a real decision
4. **UI Complexity** — Current flows are strong but risk becoming system-heavy; keep MVP trimmed ruthlessly

---

## Phase 2 — Portfolio Layer

### Core Value

> "Turn your process into a case study instantly."

### What Changes

The product transitions from an internal tool to an outward-facing output. Same checkpoints, new purpose.

### Core Features

1. **Checkpoint Selection** — Choose which checkpoints to include in the export
2. **Light Annotation** — Rename checkpoints and add short contextual notes
3. **Auto Narrative** — System organizes checkpoints into a structured arc: Exploration → Iteration → Refinement → Final
4. **Shareable Link** — Clean viewer that requires no Figma account to access

### Why This Works

- Eliminates the blank-page problem that kills portfolio momentum
- Reduces portfolio creation time from weeks to minutes
- Uses real work — not reconstruction — as the source material

### Key Risks

- Viewer UI must feel polished — this is the first external impression of the product
- Must give designers control over what's exposed; curation UX is critical
- The difference between "useful" and "embarrassing" is all in the selection flow

---

## Phase 3 — Platform

### Core Value

> "See how great design actually happens."

### Platform Features

**Discovery**
- Browse projects and explore by category, discipline, or tool

**Profiles**
- Designers have public pages showing their process library

**Following**
- Subscribe to designers and receive updates when new process is published

**Process Explorer**
- Scrub through design timelines
- Compare states side-by-side
- Read the reasoning behind decisions

**Monetization (later)**
- Paid access to full checkpoint libraries
- Annotated file sales
- Tutorial and deep-dive publishing

### Why This Works

Content is generated passively from real work — which means it carries far higher signal than anything on a traditional portfolio platform. Learning becomes the primary value, not just inspiration.

### Platform Risks

1. **Becomes Dribbble 2.0** — Curation pressure causes only polished content to survive
2. **Too Raw** — Overwhelming to consume without good editorial structure and discoverability
3. **No Engagement Loop** — Needs a strong reason to return beyond novelty
4. **Creator Incentives** — Monetization must arrive before contributor fatigue does

---

## Differentiation

Checkpoint is **not**:
- A gallery
- A portfolio builder (the portfolio is a byproduct, not the product)
- Version control in the GitHub sense

Checkpoint **is**:
> A system for capturing and curating design thinking

---

## Strategic Positioning

**Avoid:** "GitHub for design" — too broad, too overused, too developer-coded

**Better:** "Design versioning that actually makes sense"
**Better:** "Never lose your design thinking"
**Best:** "See how great design actually happens"

---

## MVP Scope — Phase 1 (Strict)

**Must Have:**
- Create checkpoint
- View checkpoints in panel
- Navigate between saved states

**Nice to Have:**
- Named checkpoint groups
- Edit mode (select, delete, move)

**Avoid for Now:**
- Cloud sync
- Collaboration features
- Sharing of any kind

---

## Next Steps

1. **Build the minimal plugin** — Create, view, navigate. Nothing more. Ship the smallest working version possible.
2. **Use it on a real project** — Run a live design project through the plugin before showing it to anyone. Surface friction from real use, not imagined use.
3. **Refine based on friction** — Find the moments the flow breaks, adds unnecessary thinking, or slows down. Fix those first.
4. **Test with 3–5 designers** — Give it to designers who iterate in Figma regularly. Watch them use it without guidance. Listen carefully.
5. **Validate the emotional reaction** — The key question isn't "did it work?" It's "did it feel like something you'd actually keep using?"

---

## Final Thought

This product works because it starts with reality:

> Not how designers present work.
> But how they actually create it.

Everything else builds from there.

---

*This document is a living spec and should evolve alongside the product.*
