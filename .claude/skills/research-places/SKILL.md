---
name: research-places
description: Research haunted places for a state. Usage: /research-places [state]
user_invokable: true
agent: researcher
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

Follow the "Operation: Research Places" workflow from your agent definition:

1. **Propose** — Present target areas, expected categories, sources
2. **Wait for approval** — Don't proceed until user confirms
3. **Research** — Use WebSearch to find haunted locations
4. **Create seed file** — `scripts/seed-[state].sql`
5. **Run migration** — Execute against D1
6. **Update CONTEXT.md** — Document research approach, sources, notable stories
7. **Update CHANGELOG.md** — Add entry for what was added
8. **Handoff** — Report what was added

## Remember

- Don't make up data — everything must be sourced
- **Minimum 2 independent sources per place** — skip any place that can't be corroborated
- Track all source URLs per place in the `sources` JSON array and set `source_count`
- Write detailed ghost_story with specific names, dates, paranormal claims
- Use established categories only
- Update both CONTEXT.md and CHANGELOG.md when done
