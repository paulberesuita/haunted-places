# Directory Template

A template for building directory-style apps with Claude agents.

## On Session Start

**Before starting any work, read the recent sections of these files (first 150 lines only):**
1. `CONTEXT.md` — Key decisions and lessons learned
2. `CHANGELOG.md` — Recent changes and current status

Both files are ordered newest-first. Only read the top ~150 lines (covers the last 1-2 sessions). The full history is rarely needed — dig deeper only if your current task requires understanding older decisions.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla HTML/JS + Tailwind CDN |
| Hosting | Cloudflare Pages |
| Functions | Cloudflare Pages Functions |
| Database | Cloudflare D1 (SQLite) |
| Storage | Cloudflare R2 |

## Project Structure

```
/
├── public/                 # Static assets (HTML, CSS, JS)
├── functions/              # Cloudflare Pages Functions
├── migrations/             # SQL migrations
├── scripts/                # Seed scripts
├── specs/                  # Feature specifications
├── examples/               # Starter templates to copy from
├── .claude/
│   ├── agents/             # Agent definitions
│   │   ├── product.md      # Product features: ideate, spec, build, deploy
│   │   ├── marketing.md    # Marketing features: ideate, spec, build, deploy
│   │   └── researcher.md   # Gathers data, stores in D1/R2
│   └── skills/
│       ├── design-system/      # /design-system
│       ├── coding-standards/   # /coding-standards
│       ├── cloudflare-deploy/  # /cloudflare-deploy
│       ├── research-places/    # /research-places [state]
│       ├── research-images/    # /research-images [state]
│       ├── verify-data/        # /verify-data [state?]
│       └── query-data/         # /query-data [question]
├── BACKLOG.md              # Work queue (Inbox → Done)
├── CHANGELOG.md            # Record of changes
├── CONTEXT.md              # Key decisions & lessons learned
└── wrangler.toml           # Cloudflare config
```

## Routing Architecture

All pages are **server-side rendered** by Cloudflare Pages Functions. There are NO static HTML pages served for main routes — the `functions/` directory generates all HTML dynamically with data from D1.

### Function Routing Priority

Cloudflare Pages Functions use file-based routing. **Catch-all routes (`[[slug]]`) take priority over `index.js` for the parent path.**

```
functions/
├── index.js                    # Handles GET /
├── states/
│   ├── index.js                # ⚠️ NOT used for /states (overridden by [[slug]].js)
│   └── [[slug]].js             # Handles /states AND /states/california, /states/texas, etc.
├── place/
│   └── [[slug]].js             # Handles /place/[slug]
└── api/
    ├── tour-operators/
    │   ├── index.js             # GET /api/tour-operators
    │   ├── [id].js              # GET /api/tour-operators/:id
    │   └── cities.js            # GET /api/tour-operators/cities
    └── ...
```

**CRITICAL:** When `[[slug]].js` exists, it handles BOTH:
- `/states/california` (slug = `['california']`)
- `/states` (slug = `[]` or undefined → renders index page as fallback)

The `index.js` in the same directory is NEVER invoked. Always edit `[[slug]].js` for changes to either the index or detail pages.

### Static Files in `public/states/`

The `public/states/` directory contains pre-rendered HTML files for individual state pages (e.g., `california.html`). These are **legacy/unused** — the dynamic function handles all routes. Do not rely on or add to these static files.

### Key Rendering Functions

| File | Function | Renders |
|------|----------|---------|
| `functions/states/[[slug]].js` | `renderStatesIndexPage()` | /states (grid of all states) |
| `functions/states/[[slug]].js` | `renderStatePage()` | /states/[slug] (places in a state) |
| `functions/place/[[slug]].js` | main handler | /place/[slug] (individual place) |
| `functions/index.js` | main handler | / (homepage) |

## Agents

Agents are specialized assistants that own their domain end-to-end. Invoke by trigger words.

| Agent | Purpose | Triggers |
|-------|---------|----------|
| **product** | Product features: ideate, spec, build, deploy | "product", "build", "implement", "ship" |
| **marketing** | Marketing features: ideate, spec, build, deploy | "marketing", "seo", "growth", "traffic" |
| **researcher** | Data completeness: research places, images, verify quality | "researcher", "research", "find data", "populate" |

### How Agents Work

**Two modes** — the user decides which:
1. **Plan** — Ideate, discuss, propose backlog items. Nothing gets added without user approval.
2. **Execute** — Build/run a specific item. Read the spec, announce approach, do the work, deploy.

**Backlog ownership** — each agent owns a section of `BACKLOG.md`:
- Product → `## Product > ### Inbox`
- Marketing → `## Marketing > ### Inbox`
- Researcher → `## Data > ### Inbox`

Agents never touch each other's sections.

### Skills Used by Agents

| Skill | Product | Marketing | Researcher |
|-------|---------|-----------|------------|
| `/design-system` | Build | Build | — |
| `/coding-standards` | Build | Build | — |
| `/cloudflare-deploy` | Deploy | Deploy | Deploy |

### Task Tracking

In execute mode, agents use `TaskCreate` to break work into trackable steps. All tasks are created upfront, then marked `in_progress` → `completed` as work progresses. This gives visibility into multi-step operations.

### After Work Completes

All agents update:
- **CHANGELOG.md** — What changed
- **CONTEXT.md** — Why, lessons learned

## Skills

All skills are user-invokable with `/command`.

| Skill | Usage | What it does |
|-------|-------|--------------|
| `/design-system` | `/design-system` | Load UI guidance, colors, components |
| `/coding-standards` | `/coding-standards` | Load API patterns, D1/R2 usage |
| `/cloudflare-deploy` | `/cloudflare-deploy` | Load deploy commands |
| `/research-places` | `/research-places georgia` | Research haunted locations for a state |
| `/research-images` | `/research-images texas` | Find and upload images for existing places |
| `/verify-data` | `/verify-data` | Check data quality, find gaps |
| `/query-data` | `/query-data how many places in CA?` | Query the database |

## Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| **Local** | `localhost:8788` | Local development |
| **Preview** | `spookfinder.pages.dev` | Test before production |
| **Production** | `spookfinder.com` | Live site |

**Single project:** Both Preview and Production are served by the `spookfinder` Cloudflare Pages project. One deploy updates both URLs.

## Deploy Commands

```bash
# Local dev
wrangler pages dev ./public --d1=DB=haunted-places-db --local

# Run migration
npx wrangler d1 execute haunted-places-db --file=./migrations/XXX.sql --remote

# Deploy (updates both spookfinder.pages.dev AND spookfinder.com)
wrangler pages deploy ./public --project-name=spookfinder
```

**IMPORTANT:** Always deploy to `--project-name=spookfinder`. This updates both:
- Preview: `spookfinder.pages.dev`
- Production: `spookfinder.com`

## Documentation Requirements

**After making changes, update:**

1. **CHANGELOG.md** — What changed (use: Added, Changed, Fixed, Removed)
2. **CONTEXT.md** — Why it changed, lessons learned
