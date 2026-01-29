---
name: research-story
description: Deep research on a haunted place for stories, accounts, and findings. Usage: /research-story [place-slug or search term]
user_invokable: true
agent: seo
---

# Research Story

You've been invoked to **deeply research a haunted place** to expand its story with detailed accounts, witness testimonies, historical context, and paranormal findings.

## Your Task

Research and expand content for: **{{args}}**

## If No Place Provided

Show places that need content expansion:

1. **Query places with thin ghost stories:**
   ```bash
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, city, state, LENGTH(ghost_story) as story_length FROM places WHERE LENGTH(ghost_story) < 300 ORDER BY story_length ASC LIMIT 20;"
   ```

2. **Show results:**
   ```
   ## Places Needing Deeper Research

   | Place | City | State | Story Length |
   |-------|------|-------|--------------|
   | [name] | [city] | [state] | [X chars] |

   **Which place would you like to research?** (Enter slug or name)
   ```

3. **Wait for user to pick a place before proceeding.**

## Process

### Step 1: Find the Place

```bash
npx wrangler d1 execute haunted-places-db --remote --command "SELECT * FROM places WHERE slug = '[slug]' OR name LIKE '%[search]%' LIMIT 5;"
```

Show current data and confirm which place to research.

### Step 2: Research from Multiple Sources

Search for detailed accounts using these source types (in priority order):

**Primary Sources (most reliable):**
1. **Local historical societies** — Often have primary documents, newspaper archives
   - Search: `"[place name]" [city] historical society`
2. **Paranormal investigation reports** — TAPS, Ghost Adventures, local groups
   - Search: `"[place name]" paranormal investigation report findings`
3. **Book excerpts** — Haunted [State] books, local history books
   - Search: `"[place name]" haunted book excerpt`
4. **Newspaper archives** — Historical incidents, original reports
   - Search: `"[place name]" [city] newspaper ghost haunted`

**Secondary Sources (good for context):**
5. **Ghost tour sites** — Ghost City Tours, US Ghost Adventures, Haunted Rooms
   - Search: `"[place name]" ghost tour [city]`
6. **Travel/tourism sites** — Atlas Obscura, Roadside America, Visit[State]
   - Search: `"[place name]" atlas obscura` or `site:atlasobscura.com "[place name]"`
7. **Wikipedia** — Historical facts, dates, people
   - Search: `"[place name]" wikipedia`
8. **Reddit/forums** — Personal experiences (use cautiously, note as "visitor reports")
   - Search: `"[place name]" reddit paranormal experience`

**For each source, extract:**
- Specific names (ghosts, victims, witnesses)
- Specific dates (incidents, deaths, sightings)
- Detailed paranormal claims (what exactly happens, where, when)
- Historical context (why the haunting began)
- Witness accounts (direct quotes if available)
- Investigation findings (EVPs, photos, equipment readings)

### Step 3: Compile the Expanded Story

Structure the expanded ghost_story with these sections (not as headers, but as narrative flow):

```
1. HISTORICAL CONTEXT (2-3 sentences)
   - When was it built/established?
   - What significant events happened here?
   - Who were the key people involved?

2. THE HAUNTING ORIGINS (2-3 sentences)
   - What tragedy/event sparked the haunting?
   - Who died and how?
   - When did paranormal activity first get reported?

3. PARANORMAL ACTIVITY (3-5 sentences)
   - What specific phenomena occur?
   - Where in the building/location?
   - How often? Any patterns?
   - Named ghosts and their behaviors

4. NOTABLE ACCOUNTS (2-4 sentences)
   - Specific witness experiences (with dates if available)
   - Investigation findings
   - Famous incidents

5. CURRENT STATUS (1-2 sentences)
   - Can you visit? Tours available?
   - Recent sightings or activity
```

**Target length:** 400-800 words (current average is ~150 words)

### Step 4: Update the Database

```bash
npx wrangler d1 execute haunted-places-db --remote --command "UPDATE places SET
  ghost_story = '[EXPANDED_STORY]',
  sources = '[UPDATED_SOURCES_JSON]',
  source_count = [NEW_COUNT]
WHERE slug = '[slug]';"
```

**Important:**
- Escape single quotes in the story by doubling them (`'` → `''`)
- Keep the sources JSON array format: `["url1","url2","url3"]`
- Preserve existing sources, add new ones

### Step 5: Verify and Report

```bash
npx wrangler d1 execute haunted-places-db --remote --command "SELECT name, LENGTH(ghost_story) as new_length, source_count FROM places WHERE slug = '[slug]';"
```

Report:
```
## Research Complete: [Place Name]

**Before:** [X] characters, [Y] sources
**After:** [X] characters, [Y] sources

### Key Additions:
- [Notable finding 1]
- [Notable finding 2]
- [Notable finding 3]

### New Sources Added:
- [source 1]
- [source 2]
```

## Research Tips

**DO:**
- Cross-reference claims across multiple sources
- Note specific names, dates, room numbers
- Include direct quotes from witnesses when available
- Mention paranormal investigation teams by name
- Add historical context that explains the haunting

**DON'T:**
- Make up details or embellish
- Include unverified Reddit posts as fact (say "visitors report...")
- Copy text verbatim (paraphrase and cite)
- Include content that's purely promotional
- Forget to escape SQL quotes

## Example Expanded Story

**Before (thin):**
> The hotel is said to be haunted by a former guest who died here. Staff report seeing apparitions and hearing strange noises.

**After (rich):**
> The Crescent Hotel was built in 1886 as a luxury resort for wealthy Victorians seeking the healing properties of the Ozark Mountain springs. Its dark chapter began in 1937 when Norman Baker, a charlatan claiming to cure cancer, converted it into a hospital where dozens of patients died from his fraudulent treatments. Their bodies were allegedly disposed of in the hotel's basement and surrounding grounds.

> The most frequently encountered spirit is "Michael," a stonemason who fell to his death during the hotel's construction in 1885. His ghost is seen in Room 218, where guests report a bearded man in Victorian work clothes standing at the foot of their bed before vanishing. Room 202 is associated with "Theodora," a cancer patient from the Baker era who appears as a woman in white wandering the hallways at night.

> Paranormal investigators from TAPS (Ghost Hunters) visited in 2005 and captured EVPs of voices saying "Help me" in the basement morgue. The hotel now embraces its haunted reputation, offering nightly ghost tours that take visitors through the former operating rooms and the basement where Baker stored bodies.

## Remember

- Quality over quantity — one well-researched place is better than many thin updates
- Always verify claims with at least 2 sources before including
- The goal is to make visitors want to read AND visit
- Update CHANGELOG.md when done with significant research
