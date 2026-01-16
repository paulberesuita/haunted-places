# Directory Template

A template for building directory-style apps with Claude agents.

## On Session Start

**Before starting any work, read these files:**
1. `CONTEXT.md` — Key decisions and lessons learned
2. `CHANGELOG.md` — Recent changes and current status

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
│   │   ├── planner.md      # Plans features, maintains backlog
│   │   ├── builder.md      # Builds from backlog, deploys
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

## Agents

Agents are specialized assistants. Invoke by trigger words.

| Agent | Purpose | Triggers |
|-------|---------|----------|
| **planner** | Plans features, maintains backlog | "plan", "backlog", "prioritize" |
| **builder** | Builds from backlog, deploys | "build", "implement", "ship" |
| **researcher** | Gathers data, stores in D1/R2 | "research", "find data", "populate" |

**Agents read skills for reference** — design-system, coding-standards, cloudflare-deploy.

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

## Deploy Commands

```bash
# Local dev
wrangler pages dev ./public --d1=DB=PROJECT-db --local

# Run migration
npx wrangler d1 execute PROJECT-db --file=./migrations/XXX.sql --remote

# Deploy
wrangler pages deploy ./public --project-name=PROJECT
```

## Documentation Requirements

**After making changes, update:**

1. **CHANGELOG.md** — What changed (use: Added, Changed, Fixed, Removed)
2. **CONTEXT.md** — Why it changed, lessons learned
