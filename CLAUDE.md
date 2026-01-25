# SpookFinder

A directory of haunted places across America. Browse by state, explore ghost stories, find haunted hotels, discover ghost tours, and enjoy spooky mini-apps.

**Live:** [spookfinder.com](https://spookfinder.com)

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
│   │   ├── product.md      # UX features for people on the site
│   │   ├── seo.md          # Data, content, SEO pages, technical SEO
│   │   ├── mini-apps.md    # Fun interactive tools
│   │   └── outreach.md     # Cold campaigns, backlinks, partnerships
│   └── skills/
│       ├── design-system/      # /design-system
│       ├── coding-standards/   # /coding-standards
│       ├── cloudflare-deploy/  # /cloudflare-deploy
│       ├── build-seo-page/     # /build-seo-page (workflow)
│       ├── build-tool/         # /build-tool (workflow)
│       ├── cold-campaign/      # /cold-campaign (workflow)
│       ├── optimize-seo/       # /optimize-seo (workflow)
│       ├── add-to-backlog/     # internal: adds specs to backlog
│       ├── research-places/    # internal operation
│       ├── research-images/    # internal operation
│       ├── verify-data/        # internal operation
│       └── query-data/         # internal operation
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

Agents are **state-aware, goal-tracking, and recommending**. They check current state, compare to goals, and recommend high-impact actions. Invoke by trigger words.

| Agent | Purpose | Triggers |
|-------|---------|----------|
| **product** | UX features for people on the site | "product", "build", "implement", "ship" |
| **seo** | Data research, content, SEO pages | "seo", "research", "data", "city pages", "sitemap" |
| **mini-apps** | Fun interactive tools | "mini-apps", "build tool", "interactive", "quiz" |
| **outreach** | Cold campaigns, backlinks, partnerships | "outreach", "cold campaign", "backlinks", "partnerships" |

### How Agents Work (Advisor Mode)

```
User invokes agent ("growth")
         ↓
Agent checks current state (queries D1, checks files)
         ↓
Agent compares to goals, recommends actions
         ↓
User picks: "build it" or "add to backlog"
         ↓
Agent executes (or writes spec to backlog)
         ↓
Agent reports results, recommends next action
```

**Agents don't ask "plan or execute?"** — they assess state, recommend, and when you say "build it", they build.

**Backlog ownership** — each agent owns a section of `BACKLOG.md`:
- Product → `## Product > ### Inbox`
- SEO → `## SEO > ### Inbox`
- Mini-Apps → `## Mini-Apps > ### Inbox`
- Outreach → `## Outreach > ### Inbox`

Agents never touch each other's sections.

### Task Tracking

When executing, agents use `TaskCreate` to break work into trackable steps. All tasks are created upfront, then marked `in_progress` → `completed` as work progresses.

### After Work Completes

All agents update:
- **CHANGELOG.md** — What changed
- **CONTEXT.md** — Why, lessons learned

Then recommend the next action based on updated state.

## Skills

User-invokable skills with `/command`:

| Skill | Usage | What it does |
|-------|-------|--------------|
| `/design-system` | `/design-system` | Load UI guidance, colors, components |
| `/coding-standards` | `/coding-standards` | Load API patterns, D1/R2 usage |
| `/cloudflare-deploy` | `/cloudflare-deploy` | Load deploy commands |
| `/build-seo-page` | `/build-seo-page` | Build programmatic SEO pages from data |
| `/build-tool` | `/build-tool` | Build fun, interactive mini-tools |
| `/cold-campaign` | `/cold-campaign` | Run outreach campaigns for links/partnerships |
| `/optimize-seo` | `/optimize-seo` | Improve technical SEO and on-page optimization |

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
