---
name: verify-data
description: Check data quality and fill gaps. Usage: /verify-data [state?]
user_invokable: false
agent: seo
---

# Verify Data

You've been invoked to **verify data** quality and fill gaps.

**Operation:** Verify Data (from researcher agent)

## Your Task

Check data quality for: **{{args}}** (or all states if not specified)

## Process

### 1. Run Diagnostic Queries

```bash
# Missing coordinates
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, state FROM places WHERE latitude IS NULL;"

# Missing source URLs
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name FROM places WHERE source_url IS NULL;"

# Missing addresses
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, city, state FROM places WHERE address IS NULL;"

# Category distribution (check for typos)
npx wrangler d1 execute haunted-places-db --remote --command "SELECT category, COUNT(*) as count FROM places GROUP BY category ORDER BY count DESC;"

# Under-sourced entries
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, state, source_count FROM places WHERE source_count < 2 OR source_count IS NULL ORDER BY state;"
```

### 2. Report Findings

```markdown
## Data Quality Report

### Issues Found
- **Missing coordinates:** X places
- **Missing addresses:** Y places
- **Under-sourced (< 2 sources):** Z places
- **Invalid categories:** [list any typos]

### Recommended Fixes
1. [Fix description]
2. [Fix description]

**Should I proceed with fixes?**
```

### 3. Fix Issues (after approval)

Create `scripts/fix-[issue].sql`:

```sql
-- Fix [issue description]
-- Generated on YYYY-MM-DD

UPDATE places SET latitude = X, longitude = Y WHERE slug = 'slug';
```

Run the fix:
```bash
npx wrangler d1 execute haunted-places-db --file=./scripts/fix-[issue].sql --remote
```

### 4. Update Docs

- **CHANGELOG.md** — Document fixes made
- **CONTEXT.md** — Note any patterns or lessons learned

## What to Check

- **Broken URLs** — source_url returns 404
- **Missing coordinates** — latitude/longitude is NULL
- **Missing addresses** — address is NULL
- **Category typos** — Not using established categories
- **Image coverage** — Places without images
- **Under-sourced entries** — source_count < 2 (need additional corroboration)

## Remember

- Report issues before fixing
- Create SQL scripts for fixes (don't run ad-hoc updates)
- Update CHANGELOG.md with fixes
