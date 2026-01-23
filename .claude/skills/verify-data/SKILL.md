---
name: verify-data
description: Check data quality and fill gaps. Usage: /verify-data [state?]
user_invokable: true
agent: researcher
---

# Verify Data

You've been invoked to **verify data** quality and fill gaps.

**Operation:** Verify Data (from researcher agent)

## Your Task

Check data quality for: **{{args}}** (or all states if not specified)

## Process

Follow the "Operation: Verify Data" workflow from your agent definition:

1. **Run diagnostic queries:**

   ```bash
   # Places with missing coordinates
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, state FROM places WHERE latitude IS NULL;"

   # Places with missing source URLs
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name FROM places WHERE source_url IS NULL;"

   # Places with missing addresses
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, city, state FROM places WHERE address IS NULL;"

   # Category distribution (check for typos/inconsistencies)
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT category, COUNT(*) as count FROM places GROUP BY category ORDER BY count DESC;"

   # Image coverage
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT state, COUNT(*) as total, SUM(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 ELSE 0 END) as with_images FROM places GROUP BY state;"

   # Under-sourced entries (need additional corroboration)
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, state, source_count FROM places WHERE source_count < 2 OR source_count IS NULL ORDER BY state;"
   ```

2. **Report findings** — Summarize issues found

3. **Ask before fixing** — Get approval before making changes

4. **Create fix script** — `scripts/fix-[issue].sql`

5. **Update CHANGELOG.md** — Document fixes made

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
