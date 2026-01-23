---
name: cloudflare-deploy
description: Load deploy commands and environment details. Usage: /cloudflare-deploy
user_invokable: true
---

# Cloudflare Deploy

Deploy commands for Spookfinder.

## Project Details

| Resource | Name | ID |
|----------|------|-----|
| Pages Project | `spookfinder` | — |
| D1 Database | `haunted-places-db` | `b32d1ccc-aac8-472b-aedb-144e08e8ff8c` |
| R2 Bucket | `haunted-places-images` | — |
| Domain | `spookfinder.com` | — |
| Preview URL | `spookfinder.pages.dev` | — |

**CRITICAL:** Both preview and production are the SAME project. One deploy updates both URLs.

## Commands

```bash
# Local dev
wrangler pages dev ./public --d1=DB=haunted-places-db --local

# Run a migration (remote)
npx wrangler d1 execute haunted-places-db --file=./migrations/XXX.sql --remote

# Run ad-hoc SQL (remote)
npx wrangler d1 execute haunted-places-db --remote --command "SELECT COUNT(*) FROM places;"

# Deploy (updates BOTH spookfinder.pages.dev AND spookfinder.com)
wrangler pages deploy ./public --project-name=spookfinder

# Upload image to R2
npx wrangler r2 object put haunted-places-images/places/slug.jpg --file=./slug.jpg --remote

# List R2 objects
npx wrangler r2 object list haunted-places-images --remote
```

## wrangler.toml

```toml
name = "spookfinder"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./public"

[[d1_databases]]
binding = "DB"
database_name = "haunted-places-db"
database_id = "b32d1ccc-aac8-472b-aedb-144e08e8ff8c"

[[r2_buckets]]
binding = "IMAGES"
bucket_name = "haunted-places-images"
```

## Migration Naming

Migrations are numbered sequentially:
```
migrations/
├── 001_create_places.sql
├── 002_add_featured.sql
├── 003_create_tour_operators.sql
├── 004_add_tour_operators_fields.sql
└── 005_add_sources.sql
```

Always use the next number. Check existing migrations before creating.

## Post-Deploy Checklist

- [ ] Visit `spookfinder.com` — homepage loads
- [ ] Check a state page: `/states/california`
- [ ] Check a place page: `/place/eastern-state-penitentiary`
- [ ] Check images load (no broken thumbnails)
- [ ] No console errors in browser DevTools

## Common Issues

| Problem | Fix |
|---------|-----|
| Deploy goes to wrong project | Always use `--project-name=spookfinder` |
| D1 command fails with auth error | Run `npx wrangler login` to refresh token |
| R2 upload 404s | Add `--remote` flag (defaults to local) |
| State page not updating | Edit `functions/states/[[slug]].js`, not `index.js` |
| New state not showing | Update `stateNames` and `stateUrls` in ALL SSR functions |
