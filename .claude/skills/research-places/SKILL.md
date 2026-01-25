---
name: research-places
description: Research haunted places for a state. Usage: /research-places [state]
user_invokable: false
agent: seo
---

# Research Places

You've been invoked to **research places** for a state.

**Operation:** Research Places (from researcher agent)

## Your Task

Research haunted locations for: **{{args}}**

## If No State Provided

Show the user what's been done and what's available:

1. **Query current coverage:**
   ```bash
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT state, COUNT(*) as places FROM places GROUP BY state ORDER BY places DESC;"
   ```

2. **Show results and suggest options:**
   ```
   ## Current Coverage
   | State | Places |
   |-------|--------|
   | GA    | 45     |
   | LA    | 52     |
   | PA    | 48     |
   ...

   ## States That Need Research
   Popular haunted states not yet covered:
   - Florida (St. Augustine, Key West)
   - Ohio (most haunted state per capita)
   - Virginia (Colonial history, Civil War)
   - Illinois (Chicago, Alton)
   - ...

   **Which state would you like to research?**
   ```

3. **Wait for user to pick a state before proceeding.**

## Process

### 1. Propose Research Plan

```markdown
## Research Proposal: [State Name]

### Target Areas
- [City 1] (est. X locations) — major tourism/ghost tour destination
- [City 2] (est. Y locations) — historical significance

### Expected Categories
hotel: ~X, mansion: ~Y, cemetery: ~Z, battlefield: ~W

### Primary Sources
- Ghost City Tours / US Ghost Adventures (commercial tours = verified locations)
- Visit[State].com (official tourism)
- Wikipedia (historical verification)

**Does this look right?**
```

**Wait for approval before proceeding.**

### 2. Research Locations

For each location, gather:
- Exact name and address
- GPS coordinates (latitude, longitude)
- Category (use established list)
- 2-3 sentence description
- Detailed ghost_story with names, dates, specific paranormal claims
- **Minimum 2 independent source URLs**

**Good sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America
- Official tourism sites (Visit[State], local CVBs)
- Wikipedia for historical facts
- Travel Channel / Ghost Adventures references

### 3. Create Seed File

Create `scripts/seed-[state].sql`:

```sql
-- Seed data for [State] haunted places
-- Generated on YYYY-MM-DD

INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES
  ('slug-name', 'Place Name', 'City', '123 Main St', 'XX', 00.0000, -00.0000, 'category',
   'Brief 2-3 sentence description.',
   'Detailed ghost story with specific names, dates, and paranormal activity.',
   1850, 'https://primary-source.com',
   '["https://primary-source.com","https://second-source.com"]', 2);
```

### 4. Run Migration

```bash
npx wrangler d1 execute haunted-places-db --file=./scripts/seed-[state].sql --remote
```

### 5. Verify and Report

```bash
npx wrangler d1 execute haunted-places-db --remote --command "SELECT COUNT(*) as places FROM places WHERE state = 'XX';"
```

Update CHANGELOG.md and CONTEXT.md, then report:
> "[State] now has [X] places. Notable additions: [highlights]"

## Remember

- Don't make up data — everything must be sourced
- **Minimum 2 independent sources per place** — skip any place that can't be corroborated
- Track all source URLs per place in the `sources` JSON array and set `source_count`
- Write detailed ghost_story with specific names, dates, paranormal claims
- Use established categories only
- Update both CONTEXT.md and CHANGELOG.md when done
