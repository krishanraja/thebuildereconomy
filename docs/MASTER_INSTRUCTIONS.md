# MASTER INSTRUCTIONS: VIBE-CODED PROJECTS

> **This document is the source of truth for all development practices in this project.**
> All AI assistants and developers MUST reference this file before making changes.

---

## 0. PURPOSE

This project must behave like a world-class engineer, UX designer, and operator in one:

- Fix issues first time, not via endless trial-and-error.
- Model the entire pipeline, not single functions.
- Produce 10/10 diagnostics and logging before edits.
- Never break working flows or overwrite real assets.
- Stay general enough to work for any codebase, regardless of tooling.

---

## 1. GLOBAL RULES OF ENGAGEMENT

### No edits before scope
- Always do a scope pass first: map the pipeline, list all related files, and call sites.
- Output a short plan before changing code.

### No unverified assumptions
- If something is unclear, log it, inspect it, or surface it to the user instead of guessing.

### No silent breakages
- Any failure must be visible in logs, UI, or both.
- Never swallow errors. Wrap them with context and rethrow or return a safe, flagged result.

### No asset vandalism
- Never overwrite real images, logos, fonts or brand files with generated ones.
- Never resize or crop assets unless explicitly instructed. If you must, preserve aspect ratio.

### No "probably fixed" outcomes
Every fix must be proven through:
- logs,
- screenshots / screen recordings, or
- clearly verifiable behavior in the UI.

---

## 2. THINK IN SYSTEMS, NOT SINGLE BUGS

### 2.1 Model the pipeline end-to-end

For any feature or error, always map:
- **Trigger**: what starts the flow (click, route change, cron, webhook, etc).
- **Frontend path(s)**: components, hooks, global state, routing.
- **Network layer**: edge functions / APIs, request/response shapes.
- **Business logic**: orchestrators, helpers, compute_ functions, branching logic.
- **Data**: DB queries, inserts, updates, external APIs.
- **Aggregation & UI**: how everything is stitched together and rendered.

**Deliverable** (mentally or in text):
A short call graph: `Trigger → Component → Hook/Util → API → Orchestrator → DB/External → Aggregator → UI`

### 2.2 Enumerate all failure points

For each step in the flow, enumerate:
- What can be null, undefined, empty array, or empty object?
- What can throw? (network, schema mismatch, parsing, LLM failure, rate limit, missing env)
- What can be out of date vs deployed code?

**Guard all of these:**
- Strong type checks where possible.
- Runtime defensive checks where necessary.
- Default values and fallbacks for every branch.

### 2.3 Anti-fragile design rules

Every function that participates in a user-facing flow must:
- Accept defined, well-typed inputs (or validate and fail fast with clear errors).
- Return a predictable shape, even on failure:
  - e.g. `{ success: false, error: "...", fallbackUsed: true }` instead of just throwing or returning null.
- Have safe defaults for: empty lists, missing sub-fields, partial records.
- Never assume downstream objects are populated. Always use safe access and guard clauses.

---

## 3. DATA & CONTEXT PRINCIPLES

### 3.1 Profiles as the anchor
- Anchor all meaningful data off stable IDs: `profile_id`, optional `organization_id`, `session_id`.
- Any event, insight, or output should link back to at least: `profile_id`, `session_id`, `tool/flow name`.
- Never create duplicate profiles if you can match on stable keys (e.g. email + name).
- Prefer "lookup then upsert", not blind insert.

### 3.2 Events, not blobs
For any interaction (assessment, intake, form, simulation, chatbot step):
Store a raw event row with at minimum:
- `id`, `profile_id` (if known), `session_id`, `question_id` or `prompt_key` (if applicable)
- `raw_input` (full text / payload), `structured_values` (JSON / JSONB)
- `created_at`, `tool_name` / `flow_name`

**LLM summaries are never the source of truth.** Raw input and structured fields are the primary record.

### 3.3 Meaning layer (insights & scores)
For any analysis flow, add an "insights/scores" layer with:
- `profile_id`, `source_event_id`, `dimension_name`, `score`, `label`, `llm_summary`, `context_snapshot`

### 3.4 Context linking across tools
Always link: `tool_name`, `question_block` or `section`.

### 3.5 Persistence & safety
- Use proper migrations.
- Avoid ad-hoc shape changes that silently break existing code.
- Validate writes: If an insert or update fails, log and surface an error; don't ignore.
- Use foreign keys and constraints where the platform allows.
- Prefer soft deletes / archival flags over hard deletes for anything user-facing.

---

## 4. LLM BEHAVIOR: DATA → INSIGHT → ACTION

### 4.1 Always read before you think
Any function that calls an LLM should:
- Read relevant data first: recent events, current insights/scores, current tool context and goals.
- Build a structured context object and pass that into the LLM.

### 4.2 Standard output schema
LLM responses for analytical flows should stick to a small, reusable schema:
- `summary`: synthesis, not just recap.
- `key_actions`: explicit actions tied to specific inputs or scores.
- `surprise_or_tension`: contradictions, blind spots, or non-obvious links.
- `scores`: structured array of `{ dimension, score, label }`.
- `data_updates`: suggestions for DB changes, never direct SQL.

### 4.3 "10/10" quality checks inside prompts
- **Grounding**: Is the answer clearly tied to provided data?
- **Clear next move**: At least one concrete "do this next" step.
- **Useful surprise**: `surprise_or_tension` must say something non-trivial.
- **Reusability**: Output must be easy to write back into existing tables or state.

### 4.4 Reuse modes, don't reinvent prompts
Define a small set of LLM "modes" and reuse them:
- `assessment_analyzer`, `portfolio_analyzer`, `session_synthesizer`

### 4.5 Guardrails against fluff
- No generic "communicate more" or "be open to change" style advice.
- Tie every recommendation to a specific answer, dimension/score, or tension in the data.

---

## 5. FAILURE PATTERNS & HOW TO TREAT THEM

### 5.1 Deployment desync
Log live runtime values, compare local vs deployed, maintain backward-compatible payloads.

### 5.2 Shallow error diagnosis
Log expected vs actual payload at each hop. Reproduce with minimal payloads. Fix root cause, not symptoms.

### 5.3 Partial logic updates
Build an input→output matrix. Verify each output path. Keep all branches in sync.

### 5.4 UX / business intent blindspots
Ask: "What is the real outcome we want?" Walk the flow like a real user.

### 5.5 Structural layout failures
Think in layers: page frame → section wrapper → content container → elements.

### 5.6 Asset mismanagement
Always treat uploaded assets as the single source of truth. Preserve aspect ratio at all times.

---

## 6. MASTER DIAGNOSTIC PROTOCOL

### PHASE 1: Scope & mapping
- Search for all related functions, hooks, classNames, env vars, error messages.
- Map architecture: trigger → component → util → API → orchestrator → DB/external → UI.
- Capture console errors, network traces, screenshots.

### PHASE 2: Root cause confirmation
- Trace payloads at each step.
- Log runtime env vars used.
- Compare expected schema vs actual payloads.

### PHASE 3: Implementation plan with checkpoints
- CP0: Plan sanity
- CP1: Environment & config
- CP2: Core fix
- CP3: Secondary impacts
- CP4: Regression pass

### PHASE 4: Implementation
Apply changes exactly as per the plan. Verify and log after each checkpoint.

### PHASE 5: Handover
Keep docs current. Update CHANGELOG. Add notes to COMMON_ISSUES for painful bugs.

---

## 7. PREVENTION CHECKLISTS

### 7.1 Before UI/layout changes
- Audit existing styles for conflicts.
- Use existing design tokens.
- Validate on both desktop and mobile.

### 7.2 Before data/LLM changes
- Confirm DB schema and table existence.
- Check that new fields fit the data model.
- Confirm downstream consumers can handle changes.

### 7.3 Before touching edge functions / APIs
- Verify all required secrets/env vars exist.
- Confirm CORS headers and OPTIONS handler.
- Add logging for incoming payload, outbound requests, key branches, error conditions.

---

## 8. ARCHITECTURE FOUNDATIONS

### Folder structure
```
/src
  /components    # UI components
  /lib           # Utilities, helpers, logger, config
  /hooks         # Custom React hooks
  /types         # Centralized type definitions
  /pages         # Route pages
  /integrations  # External service integrations
  /assets        # Static assets
/supabase
  /functions     # Edge functions
  /migrations    # Database migrations
/docs            # Documentation
/public          # Public static files
```

### Code architecture rules
- Every component pure unless there's a reason not to.
- State lives in as few places as possible.
- One data source of truth per feature.
- All async functions return a predictable shape: `{ data, error }`.
- No untyped returns.
- All config goes in one place.

---

## 9. DOCUMENTATION STANDARDS

- Each file has a header block: what it does, what it depends on, what returns look like.
- Every function gets: purpose in one line, inputs, outputs, edge cases.
- A global README that covers: Features, Architecture, Tech stack, API endpoints, DB schema, Local dev commands, Deployment steps.
- A CHANGELOG for every push.
- Inline comments only where context is missing from naming.

---

## 10. LOGGING AND DIAGNOSTICS

- Standard log format: `{ level, message, context, timestamp }`.
- Levels: `debug`, `info`, `warn`, `error`, `critical`.
- All LLM interactions logged with inputs and outputs (safely).
- Every error thrown must have: human readable message, error code, context snapshot.
- Add tracing ID per user session.

---

## 11. QUALITY RULES

- Never output code without: imports checked, clean naming, no dead branches, no unused variables, no implicit any.
- All code runnable without guessing missing pieces.
- All generated components are responsive.
- Produce diffs when editing instead of rewriting everything blindly.

---

## 12. UNIVERSAL SAFETY CLAUSE

**Do not:**
- Enforce project-specific values unless they already exist.
- Rename or delete existing tables, env vars, or core components without explicit instruction.
- Switch technology stack decisions already in place.

**Always:**
- Respect the existing design system and architecture.
- Extend instead of rewrite whenever possible.
- Make new behavior opt-in and backward-compatible by default.
