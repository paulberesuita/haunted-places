# SpookFinder

A directory of haunted places across America. Browse by state, explore ghost stories, find haunted hotels, discover ghost tours, and enjoy spooky mini-apps.

**Live:** [spookfinder.com](https://spookfinder.com)

---

## On Session Start

**Read the recent sections of these files (first 150 lines):**
1. `CONTEXT.md` — Key decisions and lessons learned
2. `CHANGELOG.md` — Recent changes and current status

Both are ordered newest-first. Only read ~150 lines (last 1-2 sessions).

---

## How We Work

### Agents = What to do

Agents are **advisors that execute**. They check state, recommend actions, and when you say "build it", they build.

| Agent | Focus | Triggers |
|-------|-------|----------|
| **product** | UX features for users on the site | "product", "build", "ship" |
| **seo** | Data + content + SEO pages | "seo", "research", "data" |
| **mini-apps** | Fun interactive tools | "mini-apps", "quiz", "tool" |
| **outreach** | Campaigns, backlinks, partnerships | "outreach", "backlinks" |

**Advisor mode flow:**
```
User: "seo"
    ↓
Agent checks state (runs queries, checks files)
    ↓
Agent recommends: "Savannah has 12 places. Build city page?"
    ↓
User: "build it" or "add to backlog"
    ↓
Agent executes (or writes spec for later)
    ↓
Agent reports results, recommends next
```

### Skills = How to do it

Skills are **detailed instructions** for specific tasks. Agents invoke skills when executing.

**Shared skills (all agents use):**
| Skill | What it does |
|-------|--------------|
| `/design-system` | Colors, typography, components |
| `/coding-standards` | API patterns, D1/R2 usage |
| `/cloudflare-deploy` | Deploy commands |
| `/add-to-backlog` | Write spec + add to backlog |

**Agent-owned skills:**
| Agent | Skills |
|-------|--------|
| **seo** | `/research-places`, `/research-images`, `/research-story`, `/verify-data`, `/query-data`, `/build-seo-page`, `/optimize-seo` |
| **mini-apps** | `/build-tool` |
| **outreach** | `/cold-campaign` |
| **product** | *(builds directly, no special skills)* |

### Backlog = What's planned

Each agent owns a section of `BACKLOG.md`:
- `## Product > ### Inbox` — Product agent
- `## SEO > ### Inbox` — SEO agent
- `## Mini-Apps > ### Inbox` — Mini-Apps agent
- `## Outreach > ### Inbox` — Outreach agent

Agents never touch each other's sections.

**Backlog items always have specs:** When adding to backlog, agents invoke `/add-to-backlog` which writes a full spec to `specs/[name].md`.

### Documentation = What happened

After work completes, always update:
- **CHANGELOG.md** — What changed (Added, Changed, Fixed, Removed)
- **CONTEXT.md** — Why it changed, lessons learned

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla HTML/JS + Tailwind CDN |
| Hosting | Cloudflare Pages |
| Functions | Cloudflare Pages Functions (SSR) |
| Database | Cloudflare D1 (SQLite) |
| Storage | Cloudflare R2 |

---

## Project Structure

```
/
├── public/                 # Static assets
├── functions/              # Cloudflare Pages Functions (SSR)
├── migrations/             # SQL migrations
├── scripts/                # Seed scripts
├── specs/                  # Feature specifications
├── .claude/
│   ├── agents/             # Agent definitions (what to do)
│   │   ├── product.md
│   │   ├── seo.md
│   │   ├── mini-apps.md
│   │   └── outreach.md
│   └── skills/             # Skill definitions (how to do it)
│       ├── design-system/
│       ├── coding-standards/
│       ├── cloudflare-deploy/
│       ├── add-to-backlog/
│       ├── build-seo-page/
│       ├── build-tool/
│       ├── cold-campaign/
│       ├── optimize-seo/
│       ├── research-places/
│       ├── research-images/
│       ├── verify-data/
│       └── query-data/
├── BACKLOG.md              # Work queue (Inbox → Done)
├── CHANGELOG.md            # Record of changes
├── CONTEXT.md              # Key decisions & lessons
└── wrangler.toml           # Cloudflare config
```

---

## Routing Architecture

All pages are **server-side rendered** by Cloudflare Pages Functions.

### Function Routing

```
functions/
├── index.js                    # GET /
├── states/
│   └── [[slug]].js             # GET /states AND /states/[state]
├── place/
│   └── [[slug]].js             # GET /place/[slug]
└── api/
    └── ...
```

**CRITICAL:** `[[slug]].js` handles both index and detail pages. Don't create `index.js` in the same directory.

### Key Rendering Functions

| File | Renders |
|------|---------|
| `functions/index.js` | Homepage |
| `functions/states/[[slug]].js` | /states and /states/[state] |
| `functions/place/[[slug]].js` | /place/[slug] |

---

## Environments

| Environment | URL |
|-------------|-----|
| Preview | `spookfinder.pages.dev` |
| Production | `spookfinder.com` |

**Single deploy** updates both Preview and Production.

**No local testing.** We deploy to preview/production and test there. Fast iteration > local parity issues.

---

## Deploy Commands

```bash
# Run migration
npx wrangler d1 execute haunted-places-db --file=./migrations/XXX.sql --remote

# Deploy (updates BOTH preview and production)
wrangler pages deploy ./public --project-name=spookfinder
```
