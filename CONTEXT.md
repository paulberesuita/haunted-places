# Context

Key decisions, insights, and lessons learned. Update this when making significant decisions or discovering important information.

---

## 2026-01-27

### Image Research Batch 2 — Process Optimization

**Problem solved:**
118 places were missing images across 18 states. Previous batch added 28 images. This session tackled the remaining 118 to push overall coverage above 90%.

**Efficient workflow:**
1. **Wikipedia API first** - Query `action=query&prop=pageimages` to check if Wikipedia has an image
2. **Wikimedia Commons search** - If Wikipedia fails, search Commons with `action=query&list=search&srnamespace=6`
3. **Get direct URL** - Use `action=query&prop=imageinfo&iiprop=url` to get the actual image URL
4. **Download, resize, upload** - `curl` -> `sips --resampleWidth 1200` -> `wrangler r2 object put`
5. **Update D1** - Single UPDATE statement per place

**Key findings:**
- Wikipedia API is fastest for well-known landmarks (hotels, theaters, historic sites)
- Wikimedia Commons search finds images for places Wikipedia doesn't have articles on
- Many places have multiple images in Commons - search results are sorted by relevance
- Slug matching is critical - always verify the slug in D1 before uploading

**Slug issues encountered:**
- `bijou-theatre-knoxville` vs `bijou-theatre` - need to check D1 first
- `willcox-hotel-aiken` vs `hotel-aiken` - DB name was "Hotel Aiken", not "Willcox Hotel"

**Results:**
- Added 41 images in one session
- Coverage: 86.5% -> 91.2% (799/876)
- 77 places still missing images (mostly obscure local attractions)

**For future image research:**
- Focus on the 77 remaining places that have no Wikipedia/Wikimedia coverage
- Consider official tourism websites for these harder-to-find images
- WebSearch fallback for places with official websites

---

### Category Pages Infrastructure — SEO Decision

**Problem solved:**
Users searching for specific types of haunted places ("haunted hotels in America", "haunted cemeteries to visit", "haunted prisons near me") need category-specific landing pages to rank. The existing Hotels page only covers one category.

**Solution:**
Built programmatic category pages at `/category` and `/category/[slug]`:
- Index page shows 13 categories with 10+ places each
- Detail pages show all places in a category across all states
- State filter on detail pages lets users drill down by location

**Key implementation decisions:**
1. **10+ place threshold** - Higher than cities (5+) since categories span the whole country
2. **Custom URL slugs** - `hotel` -> `haunted-hotels` for SEO-friendly, descriptive URLs
3. **Custom descriptions per category** - Each category has a unique description (e.g., "Graveyards with wandering apparitions")
4. **State filter on detail pages** - Since categories span many states, users need to filter
5. **Images sorted first** - Places with images appear before those without
6. **Follows existing patterns** - Same `[[slug]].js` architecture as cities/tours/states

**Categories launched (13 total):**
- other (191 places), mansion (138), hotel (148), cemetery (104), museum (78)
- restaurant (49), theater (45), hospital (35), battlefield (21)
- university (15), prison (14), plantation (11), lighthouse (11)

**Navigation update:**
Added "Categories" link to all page functions. Placed after Cities in nav order.

**SEO metrics:**
- 13 new category detail pages + 1 index = 14 new URLs
- All added to sitemap.xml with proper priority
- Each page has unique title, meta description, OG tags, and JSON-LD schemas

**Live URLs:**
- Index: https://spookfinder.com/category
- Example: https://spookfinder.com/category/haunted-hotels (148 places)

---

### City Pages Infrastructure — SEO Decision

**Problem solved:**
State pages have good SEO but cities are where people actually visit. Search queries like "haunted places in New Orleans" or "ghosts in Savannah" need dedicated landing pages to rank.

**Solution:**
Built programmatic city pages at `/cities` and `/cities/[city-slug]`:
- Index page shows 74 cities with 5+ places, sorted by place count (most haunted first)
- Detail pages show all places in a city with images, categories, and ghost story excerpts
- Slug format: `city-name-state` (e.g., `new-orleans-la`) for unique URLs

**Key implementation decisions:**
1. **5+ place threshold** - Prevents thin content pages, ensures each city has enough value
2. **Sample image on index cards** - Uses subquery to grab one image per city, makes index visually appealing
3. **Sort by images first on detail pages** - Places with images appear first (better UX)
4. **Single file handles both routes** - `[[slug]].js` pattern matches existing tours/states architecture
5. **Full JSON-LD schemas** - BreadcrumbList + ItemList for both index and detail pages

**Navigation update:**
Added "Cities" link to all 7 page functions (index, states, place, tours, hotels, radio, about). Placed between States and Tours in the nav order.

**SEO metrics:**
- 74 new indexable city pages + 1 index page = 75 new URLs
- All added to sitemap.xml
- Each page has unique title, description, OG tags, and structured data

**Live URLs:**
- Index: https://spookfinder.com/cities
- Example detail: https://spookfinder.com/cities/new-orleans-la

---

### City Page Threshold Expansion — Data Decision

**Problem solved:**
Many notable cities were just below the 5-place threshold needed for city pages. These cities have strong SEO potential (Winchester Mystery House in Santa Clara, Hotel del Coronado in San Diego, Antietam in Sharpsburg) but couldn't have dedicated pages.

**Solution:**
Systematic research of 37 cities across 17 states:
- Phase 1: 16 cities with 4 places (added 1 each)
- Phase 2: 21 cities with 3 places (added 2 each)
- Total: 58 new haunted places, all with 2+ independent sources

**Key research sources:**
- Ghost tour operators (US Ghost Adventures, Ghost City Tours) - verified commercial locations
- Official tourism sites (Visit[State], local CVBs)
- Paranormal investigation sites (Haunted Rooms America, HauntedPlaces.org)
- Wikipedia for historical verification
- News articles documenting ghost tours and investigations

**Notable locations added:**
| Location | City | Why Notable |
|----------|------|-------------|
| Winchester Mystery House | Santa Clara, CA | America's most famous haunted house |
| Hotel del Coronado | San Diego, CA | Kate Morgan ghost, Historic Hotels 2024 list |
| Biltmore Hotel | Miami, FL | Fatty Walsh murder, WWII hospital |
| Sleepy Hollow Cemetery | Concord, MA | Author's Ridge - Emerson, Alcott, Thoreau |
| Burnside Bridge | Sharpsburg, MD | Most haunted spot at Antietam |
| Bijou Theatre | Knoxville, TN | Civil War hospital, General Sanders ghost |

**Database state after expansion:**
- Total places: 876 (up from 821)
- Cities with 5+ places: 75 (enables city pages)
- All new entries have source_count >= 2

**Next opportunity:**
Build city pages for these 37 newly-eligible cities. Highest SEO value targets: Santa Clara (Winchester), San Diego (Hotel del Coronado), Sharpsburg (Antietam).

---

## 2026-01-25

### Growth Agent Removed — Design Decision

**Problem solved:**
Growth agent was a catch-all that created friction. To build a city page, SEO agent needed data — but data research was owned by Growth. User had to bounce between agents.

**Solution:**
Removed Growth agent. Split responsibilities:
- **SEO agent** absorbs data research (places, images, verification) — can now research data as part of building pages
- **Outreach agent** takes cold campaigns — focused on backlinks and partnerships

**New agent lineup:**
| Agent | Focus |
|-------|-------|
| Product | UX features for people on the site |
| SEO | Data + content + SEO pages |
| Mini-Apps | Fun interactive tools |
| Outreach | Cold campaigns, partnerships |

**Why this is better:**
- SEO agent can say "Savannah needs images" → research them → build page (no context switching)
- Outreach is distinct enough to warrant its own agent (different mindset: relationship building vs. building pages)
- Fewer agents = simpler mental model

**Skill ownership after change:**
| Agent | Skills |
|-------|--------|
| SEO | /research-places, /research-images, /verify-data, /query-data, /build-seo-page, /optimize-seo |
| Mini-Apps | /build-tool |
| Outreach | /cold-campaign |
| Product | (builds directly) |
| Shared | /design-system, /coding-standards, /cloudflare-deploy, /add-to-backlog |

---

### Mini-Apps Agent — Design Decision

**Problem solved:**
Growth agent was becoming a catch-all — data research, image research, SEO, tools, campaigns. Tool-building is a different mindset: it's about building fun, interactive experiences, not just driving metrics.

**Solution:**
Created dedicated Mini-Apps agent for building fun interactive tools:
- Quizzes, calculators, planners, generators
- Related to the haunted/spooky theme
- Fun first, but shareable (which drives traffic too)

**Key differences from other agents:**
| Agent | Focus | Output |
|-------|-------|--------|
| Product | Core UX features | App functionality |
| Growth | Data and outreach | Researched places, campaigns |
| SEO | Pages and infrastructure | Deployed programmatic pages |
| Mini-Apps | Fun interactive tools | Standalone mini-experiences |

**Philosophy:**
- Fun first — would someone enjoy using this for 2 minutes?
- On-theme — related to haunted/spooky
- Self-contained — works without the main app
- Quick to build — hours, not days
- Shareable (bonus) — if results are fun, make them easy to share

**Advisor mode for all agents:**
Simplified agent flow — agents check state, recommend, and when user says "build it", they just build. Removed extra "Proceed?" confirmation gate since user already approved by choosing the action.

---

### Add-to-Backlog Skill — Design Decision

**Problem solved:**
When agents add items to backlog, they were just adding one-liners. When you come back later, there's not enough detail to execute without re-researching.

**Solution:**
Created `/add-to-backlog` skill that:
1. Writes a full spec to `specs/[name].md` with requirements, implementation notes, user flow
2. Adds a backlog entry that links to the spec
3. Ensures backlog items are executable later

**Principle:** Backlog items should have enough detail that anyone can pick them up and build without re-researching.

---

### SEO Agent Split — Design Decision

**Problem solved:**
Growth agent was doing too much — data research, image research, SEO pages, tools, campaigns. SEO is fundamentally different: it requires writing code and deploying, not just recommending.

**Solution:**
Created dedicated SEO agent that BUILDS rather than recommends:
- Technical SEO: sitemap.xml, robots.txt, structured data
- Programmatic pages: city pages, category pages
- On-page SEO: meta tags, OG tags in templates

**Key differences from Growth:**
| Agent | Focus | Output |
|-------|-------|--------|
| Growth | Data and outreach | Researched places, images, campaigns |
| SEO | Pages and infrastructure | Deployed Cloudflare Functions |

**SEO agent goals:**
| Goal | Target |
|------|--------|
| Technical SEO | 100% complete (sitemap, robots.txt, JSON-LD) |
| Meta coverage | 100% (all pages have title/desc/OG) |
| City pages | Every city with 5+ places |
| Category pages | Every category with 10+ places |

**Priority order:**
1. No sitemap? → Build sitemap.xml first
2. No robots.txt? → Build robots.txt
3. Pages missing structured data? → Add JSON-LD
4. City opportunity? → Build city page
5. Category opportunity? → Build category page

**Workflow:**
```
State check → Identify gap → Get approval → Read skills → Build → Deploy → Verify → Report
```

---

### Smart Agent Architecture — Design Decisions

**Problem solved:**
Previous agent design asked "plan or execute?" on every invocation. This was friction — the user had to choose a mode before getting value. Also, agents didn't track goals or understand state vs targets.

**New architecture:**
```
Invoke agent → Check state → Compare to goals → Recommend → Execute → Report updated state
```

**Key principles:**
1. **Agents know state** — Run queries, check coverage, know what exists
2. **Agents have goals** — Measurable targets they track toward (40+ places, 80% images, etc.)
3. **Agents recommend** — Present options ranked by impact, not just list capabilities
4. **Agents orchestrate** — Handle dependencies (need images before page? research first)
5. **Skills execute** — Pure "how to do X" instructions, no decision-making

**Growth agent goals:**
| Goal | Target |
|------|--------|
| Data coverage | 40+ places per state |
| Image coverage | 80%+ per state |
| SEO baseline | Sitemap, structured data, meta tags |
| City pages | Every city with 5+ places |

**Recommendation priority (Growth):**
1. SEO baseline missing → `/optimize-seo` first (foundational)
2. City with 5+ places but no page → `/build-seo-page`
3. State below 80% images → image research
4. State below 40 places → place research
5. All baselines met → `/build-tool`, `/cold-campaign`

**Product agent goals:**
| Goal | Target |
|------|--------|
| Core UX complete | Navigation, search, filters working |
| Mobile-friendly | All pages responsive |
| Accessibility | Semantic HTML, alt text, keyboard nav |
| No broken experiences | Zero reported issues |

**Dependencies matter:**
- Don't recommend city page if <60% images for that city
- Research images before building pages for a location
- Fix bugs before adding features

**Skills are self-contained:**
Skills contain full execution details. They don't reference back to the agent — no circular dependencies.

**Agent slimmed down:**
Growth agent went from ~440 lines to ~200 lines by removing execution details that duplicated skills. Agent now focuses on orchestration: goals, state checks, recommendations, delegation. Skills handle the "how."

---

## 2026-01-24

### Ghost Story Radio — Build Decisions

**Architecture:**
- Single SSR function at `functions/radio.js` — queries D1 for all places with both `ghost_story` and `image_url`
- Places JSON embedded directly in the page (includes image URLs as full paths)
- TTS via ElevenLabs `eleven_multilingual_v2` model with Callum voice (`N2lVS1w4EtoT3dr4eOWO`)
- TTS function at `functions/api/tts/[slug].js` — on-demand generation + R2 cache (`tts/[slug].mp3` keys)
- API key stored as Cloudflare Pages secret `ELEVENLABS_API_KEY`
- Ambient audio served via `functions/audio/[[path]].js` from R2 bucket (same bucket as images, `audio/` key prefix)

**Voice selection (Callum):**
- Tested George, Brian, Callum, and Daniel with various settings
- Callum ("husky trickster") chosen for eerie quality
- Settings: stability=0.3 (very expressive), similarity_boost=0.5, style=0.7
- These low-stability settings create variation between reads — good for storytelling

**Pre-generated stories:**
- 3 stories pre-generated and stored in R2 to avoid rate limiting on free tier
- Slugs: thomas-house-hotel, lilburn-mansion, historic-licking-county-jail
- SQL query prioritizes these 3 first (CASE WHEN slug IN (...) THEN 0 ELSE 1 END), then RANDOM()
- Remaining stories generate on-demand when played, then cache in R2

**Audio approach:**
- Generated synthetic ambient loops using ffmpeg `anoisesrc` filter (pink noise for rain, brown noise for wind, white noise for creak)
- 30-second loops at 128kbps MP3, ~470KB each
- Volume mixing: rain at 100%, wind at 60%, creak at 30% — layered for depth
- Fade in/out using `setInterval` with 0.01-0.02 increments every 50ms

**ElevenLabs TTS notes:**
- `eleven_monolingual_v1` is deprecated on free tier — must use `eleven_multilingual_v2`
- Free tier has strict rate limits (few requests/minute) — client-side retry logic handles 502s
- First request per story takes 3-8 seconds (API generation); subsequent requests serve from R2 in ~250ms
- Audio stored at R2 key `tts/[slug].mp3`
- Client uses `<audio>` element with `/api/tts/[slug]` src — shows "Loading..." until `canplay` event

**UI — Vinyl Turntable:**
- CSS-only vinyl record: radial-gradient for grooves, conic-gradient for texture
- Spin animation (3s linear infinite), paused when stopped
- Label center shows cover image of current story (img with object-fit: cover, 70% grayscale, border-radius: 50%)
- First story image shown on page load via `showPlace(0)` in init
- Click anywhere on turntable to toggle play/stop
- Fire video background (`fire-bg.mp4`) — separate from other pages' `smoke-bg.mp4`

**R2 audio serving:**
- `wrangler r2 object put` defaults to LOCAL unless `--remote` flag is passed
- Audio function uses same IMAGES binding as image function, just with `audio/` prefix in key path

### Ghost in the Console — Lessons

- External JS file (`/js/console-ghost.js`) was blocked by ad blockers (ERR_BLOCKED_BY_CLIENT)
- Fixed by inlining the script directly in the HTML template — can't be blocked
- Changed from 3-message sequence to single ASCII art ghost with "You shouldn't be here."
- Uses `_gh` sessionStorage key (short name to avoid ad blocker heuristics)

---

## 2026-01-23

### The Watcher Easter Egg — Build Decisions

Added subtle glowing eyes that track cursor movement on place detail pages.

**Implementation approach:**
- All CSS and JS added inline in `functions/place/[[slug]].js` (no external files)
- Eyes are a fixed-position div with two span elements (left/right eye)
- Used `requestAnimationFrame` loop with lerp factor of 0.02 for smooth, slow tracking
- Eyes track a point that is offset toward the cursor direction (not snapping to cursor position)
- This creates the effect of eyes "looking at" the cursor from a distance

**Key design decisions:**
- Opacity set to 15% via CSS on the eye elements themselves (not the container) so they feel ambient, not distracting
- Box-shadow glow matches the eye color at same 15% opacity for a subtle red glow effect
- Container uses `opacity: 0` with `transition: opacity 1.5s ease` for fade-in/out (class toggle)
- Blink uses `transform: scaleY(0)` with 0.15s transition for a quick, natural blink feel
- Flee distance is 120px — far enough to not feel like you can "catch" them easily

**Positioning strategy:**
- `randomMarginPos()` picks one of 4 sides (left, right, top, bottom margin)
- Each side constrains the position to the outer 60px of the viewport
- This keeps eyes in the periphery where they are unsettling but not blocking content

**Coexistence with idle scare:**
- The Watcher uses z-index 40, idle scare uses z-index 99999
- Both use independent IIFEs with no shared state
- The Watcher is purely visual/ambient; idle scare is an overlay event
- No timing conflicts — Watcher appears at 4-7s, idle scare at 60s of true inactivity

**Mobile handling:**
- Early return in JS if `window.innerWidth <= 768` (skips DOM creation entirely)
- CSS backup: `display: none !important` on `.watcher-eyes` at max-width 768px

---

### Data Expansion — MD, TN, SC to 40 Places Each

Researched and added 44 new haunted places across 3 states to reach the 40-place launch threshold.

**Research approach:**
- Used WebSearch with state-specific ghost tour sites, tourism boards, and paranormal directories
- Cross-referenced each place with 2+ independent sources before including
- Prioritized places with documented ghost stories (specific names, dates, reported activity)
- Focused on geographic diversity within each state (not just the major city)

**Source quality notes:**
- State tourism sites (tnvacation.com, discoversouthcarolina.com, visitmaryland.org) are excellent for verification
- Ghost tour company sites (Chesapeake Ghost Tours, Gatlinburg Haunts, US Ghost Adventures) have detailed stories
- hauntedplaces.org and southcarolinahauntedhouses.com are useful but entries are brief
- CNN/Travel Channel "most haunted" lists help identify well-documented locations

**Batch file naming:** Used `seed-[state]-batch2.sql` pattern to distinguish from original seed files.

### Data Expansion — OH, NY, CT to 40 Places Each

Researched and added 25 new haunted places across 3 states to bring all states to the 40-place launch threshold.

**State-specific research approach:**
- Ohio (+11): Targeted geographic gaps outside Columbus/Cleveland/Cincinnati — added Akron, Youngstown, Marietta, Sandusky, Fremont, Peninsula, Hamilton, Lakemore, Athens, Painesville, Oxford
- New York (+8): Filled Rochester (0→2), Finger Lakes (0→1), Hudson Valley south (0→3), Southern Tier (0→1), Western NY (0→1). Avoided adding more NYC entries (already 9).
- Connecticut (+6): Filled NE CT (Pomfret), W CT (Danbury), Central CT (Naugatuck, Middlebury), SW CT (Stamford), E CT (Norwich). Avoided adding more New Haven entries (already 6).

**Research sources by quality:**
- Haunted History Trail of New York State (hauntedhistorytrail.com) — excellent for NY, detailed stories with specific claims
- Damned Connecticut (damnedct.com) — well-researched CT-specific paranormal history
- Atlas Obscura — strong for unusual/obscure locations with historical context
- Ohio Exploration Society, hauntedplaces.org — useful for initial discovery, cross-referenced with other sources
- CTvisit, visitbinghamton.org — tourism board sites with verified location details

**Database milestone:** 821 total places across 18 states. All states now at 40+.

---

### Image Research — MD, TN, SC

Uploaded 39 images total across 4 batches. Final coverage: TN 98%, MD 83%, SC 80%.

**Image search strategy (order of priority):**
1. Wikipedia API (`action=query&prop=pageimages&piprop=original`) — fastest, checks if article has lead image
2. Wikimedia Commons search API (`action=query&list=search&srnamespace=6`) — finds photos by keywords even without Wikipedia article
3. **Website fallback** — WebSearch for the place's official site, then WebFetch to extract hero/primary image URL from their homepage
4. Alternate sources — Library of Congress, SC Picture Project, tourism board listings (Visit Annapolis, Kingsport Greenbelt)

**Processing pipeline:** `curl` download → `sips --resampleWidth 1200` → `wrangler r2 object put` → D1 `UPDATE`

**Website fallback results (7 images found):**
- Greenbrier Restaurant (greenbrierrestaurant.com — schema `primaryImageOfPage`)
- Wayside Inn (waysideinnmd.com — schema primary image)
- Rotherwood Mansion (kingsportgreenbelt.com — CDN-hosted attraction photo)
- Max's Taphouse (maxs.com — schema primary image)
- Reynolds Tavern (visitannapolis.org — listing photo via Simpleview CMS)
- The Hermitage (scpictureproject.org — dedicated SC landmarks photo site)
- Denton Old Jail (loc.gov — HABS survey photograph)

**What still doesn't have images (16 remaining):**
- Dynamically-loaded websites that WebFetch can't parse (The Bowery, Old Brick Inn, Brentwood Restaurant)
- 403-blocked sites (Governor Calvert House via historicinnsofannapolis.com, Colliers for Hotel Aiken)
- Demolished buildings (Greenville TB Hospital — burned 2001, now a playground)
- Abstract phenomena (Summerville Light, High Street Cambridge)
- Some cemeteries without distinctive photos (Graniteville, Quaker Cemetery)

**Lesson:** The website fallback (WebSearch → WebFetch for hero image) is very effective for hotels, restaurants, and tourist attractions. Schema.org markup (`primaryImageOfPage`, `image` in structured data) is the most reliable way to extract the main image. Tourism listing sites (Visit Annapolis, state tourism boards) serve images from CDNs with predictable URL patterns.

---

### Haunted Hotels Guide — Build Decisions

Built the haunted hotels guide at `/hotels` as a dedicated vertical for bookable haunted lodging.

**Routing:**
- Used `functions/hotels.js` (simple single-page route, no sub-pages needed)
- No [[slug]] pattern needed since there's only one page with client-side filtering

**Category matching:**
- Query uses `LOWER(category) IN ('hotel', 'inn', 'bed and breakfast', 'resort', 'motel', 'lodge')` to catch all lodging types
- Case-insensitive matching handles any inconsistencies in the data

**Scariest detail extraction:**
- Simple keyword-based sentence extraction from ghost_story field
- Keywords: room, floor, suite, wing, corridor, basement, attic
- Splits on sentence boundaries (`(?<=[.!?])\s+`), takes first matching sentence
- Returns null if no match, card simply omits the pull-quote section

**Client-side filtering approach:**
- All hotels are loaded in the SSR HTML (no pagination/lazy-loading needed for current data size)
- JavaScript toggles `display:none` on cards based on `data-state` attributes
- Sort re-orders DOM elements via `appendChild` (reads `data-state` and `data-name` attributes)
- Results count updates dynamically

**Design system compliance:**
- dark-card: #141419 (correct value)
- body: text-gray-100 (not text-ghost)
- No borders on cards, uses bg-dark-card on bg-dark for contrast
- Cards hover: hover:shadow-lg hover:shadow-accent/10
- Category pills: bg-accent/10 text-accent (no border)
- Images: grayscale filter with group-hover sepia effect
- Footer: bg-dark-card/50

**Navigation update:**
- Added "Hotels" to all 5 page functions (index.js, states/[[slug]].js, place/[[slug]].js, tours/[[slug]].js, about.js)
- Hotels link positioned between Tours and About in the nav order

---

### Ghost Tours Directory — Build Decisions

Built the ghost tours directory feature at `/tours` and `/tours/[city-slug]`.

**Routing:**
- Used `functions/tours/[[slug]].js` following the established catch-all pattern
- City slug format: `city-name-st` (e.g., `new-orleans-la`, `st-augustine-fl`)
- Slug parsing: state code is always the last 2 characters after final hyphen, then match city by regenerating slug from DB city names
- This avoids storing slugs in the DB and handles cities with special characters

**City matching approach:**
- Query all operators in the state (from URL slug's state code)
- Generate slugs from each city name in the results
- Match against the URL slug to find the actual city name
- This handles cities like "St. Augustine" correctly without needing a slug column in the DB

**Navigation update:**
- Added "Tours" link to all 4 page functions: index.js, states/[[slug]].js, place/[[slug]].js, about.js
- On place pages, the nav style uses `hover:text-accent` (white text on dark), consistent with existing style
- On other pages, uses `hover:text-white` (ghost text on dark)

**Cross-linking:**
- Place detail pages: query `tour_operators` by city + state, show callout in sidebar with link to city tours page
- State pages: query `tour_operators` grouped by city for the state, show section with city links below place grid
- City tours pages: query `places` by city + state, show grid below operators

**Tour operators in DB:**
- Only 11 cities currently have data (first seed batch of 47 operators)
- The batch 2 seed (scripts/seed-tour-operators-batch2.sql) with 50+ more operators across 10 additional cities has not been run against remote DB yet
- Feature works with whatever data exists; empty states/cities simply show no tours section

**Structured data:**
- LocalBusiness schema for each operator on city pages (name, description, address, URL, priceRange)
- BreadcrumbList on both index and city pages

---

### Agent Restructure — Plan/Execute Modes + Sectioned Backlog

Each agent (product, marketing, researcher) has two explicit modes:
1. **Plan** — Ideate, discuss, propose items for the backlog. Never add without user approval.
2. **Execute** — Build a specific item the user picks from the backlog.

The user drives which mode by what they say. "Build X" = execute. Anything else = plan.

**Backlog restructured:** Replaced tag-based system (`[product]`, `[marketing]`, `[data]`) with per-agent sections. Each agent owns their own `## Section > ### Inbox / ### Done`. Cleaner separation, no tag parsing needed.

**Product ideation categories:**
- **New Features** — entirely new experiences, pages, interactions
- **Enhancements** — improve existing features
- **Easter Eggs** — hidden spooky surprises (idle animations, secret interactions)

**Marketing ideation categories:** Programmatic SEO, Free Tools, Seasonal, Social/Viral (unchanged).

**Approval gate:** All agents propose items and wait for user approval before writing to the backlog. The flow is: ideate → propose → user approves → write spec → add to backlog.

**Specs still required:** The spec is the checkpoint before building. No building without a spec file.

---

### Backlog as Sectioned Priority List

The backlog has three sections, one per agent. Each agent reads/writes only their own section. Order within a section = priority.

**Structure:**
```
## Product
### Inbox / ### Done

## Marketing
### Inbox / ### Done

## Data
### Inbox / ### Done
```

**Rules:**
- Product specs required before building
- Marketing specs required before building
- Data items don't need formal specs (researcher knows its own workflows)
- Each agent proposes items, user approves, then they get added

---

### Skills Overhaul — Template Defaults to Project-Specific

The three builder skills (design-system, coding-standards, cloudflare-deploy) were still using generic template defaults from when the project was scaffolded. The builder agent was working from wrong colors, wrong patterns, and placeholder project names.

**What was wrong:**
- Design system had light-mode stone colors (`#1c1917`) instead of dark theme (`#e94560`)
- Coding standards showed generic `items` table patterns instead of SSR with `places`
- Deploy skill used `PROJECT_NAME` placeholders everywhere
- Builder agent's deploy commands referenced `PROJECT-db` and `PROJECT`

**Key decisions:**
- **Updated skills to document what IS, not what should be** — extracted patterns from actual functions files rather than designing idealized patterns
- **Noted the `dark-card` inconsistency** — homepage uses `#1a1a2e`, place pages use `#141419`. Documented rather than fixed, since both work fine.
- **Included the routing gotcha** in coding standards — this cost multiple deploys to debug originally, so it's now front and center
- **Added Common Issues table** to deploy skill — captures hard-won lessons about auth errors, wrong project names, and state mapping updates

**Impact:** The builder agent can now produce consistent output that matches the existing site instead of building light-themed generic pages.

---

### Multi-Source Tracking for Data Trust

Added `sources` and `source_count` columns to improve confidence in the data. The researcher agent uses LLM-powered web searches to compile entries, which creates two trust problems: (1) does the place actually exist? and (2) is the ghost story real folklore or hallucinated? Multiple independent sources corroborating the same claims filters out both.

**Key decisions:**
- **JSON array on existing table** — Chose `sources TEXT` (JSON array) over a separate `sources` table. Simpler schema, no joins, and the researcher agent just collects URLs as it goes.
- **Minimum 2-source rule** — New places must be corroborated by 2+ independent sources before inclusion. Single-source entries are skipped.
- **Kept `source_url` for backwards compatibility** — Still populated as the "primary" source. New `sources` array contains all URLs including the primary.
- **`source_count` as denormalized field** — Could be derived from JSON array length, but having it as a column makes coverage queries fast without JSON parsing in SQLite.

**Backfill strategy:** Existing 753 entries set to `source_count = 1` with their `source_url` wrapped in a JSON array. The verify operation flags these for additional corroboration over time.

**What this doesn't solve:** The agent could still save a valid URL that doesn't actually support specific claims in the ghost_story. Source count helps with existence verification but not claim-level accuracy.

---

### Boo Map Feature Planning

Planned an interactive map feature ("Boo Map") as a free marketing tool to attract visitors via "haunted places near me" and visual browsing.

**Key decisions:**
- **Map provider: Leaflet + OpenStreetMap** — Zero cost at any scale, no API key management, ghost-icon markers are native, keeps stack simple (CDN-loaded like Tailwind). Mapbox rejected due to cost beyond free tier; Google Maps rejected due to billing requirement.
- **Tile provider: CartoDB Dark Matter** — Free dark-themed tiles that give spooky vibe without needing custom Mapbox styles.
- **Marker interaction: Popup card** — Standard map UX, fast to build, drives clicks to existing place pages. Rejected side panel (more effort) and inline detail (high effort, duplicates place page).
- **Initial view: Full US with clustering** — Shows all 612+ places immediately for "wow" factor. Leaflet.markercluster handles density. Rejected state-level entry (extra click) and geolocation (needs permission).
- **Ghost icon: Simple SVG** — Not woodcut etching style. Keep it lightweight for V1, can upgrade later.
- **Data loading: Server-side JSON embed** — All places queried from D1 in the function, embedded as `<script>` JSON blob. No additional API calls after page load.

**Spec:** `specs/boo-map.md`

---

### AskUserQuestion Not Available to Subagents

Discovered that the `AskUserQuestion` tool listed in agent frontmatter is not actually provisioned to spawned subagents at runtime. The planner agent explicitly reported it doesn't have access.

**Workaround:** The planner asks questions via text output, the parent agent relays to the user, then resumes the planner with the answer. Works fine for conversational planning.

**Fix:** Removed `AskUserQuestion` from planner's tools list to avoid confusion.

---

### Data Audit Findings

Ran comprehensive data quality audit across all 752 places in 18 states.

**Key findings:**
- **Source coverage is 0%** — All entries have `source_count=1`. The multi-source columns exist but nothing backfilled yet. Largest quality gap.
- **Category drift** — 25 entries use non-standard categories (`lighthouse` x13, `historic_site` x4, `park` x4, `church` x3, `asylum` x1). Another 26 are `other` but clearly belong to real categories. Decision needed: add `lighthouse` as official category (13 entries justify it) or normalize to existing 12.
- **VA ghost stories are thin** — Average 295 chars vs. OH at 809 chars. Rich Civil War/colonial history available to expand.
- **Tour operators gap** — 47 operators in DB across 11 cities, but 8 cities with 8+ places have zero operators (Boston, NYC, Philadelphia, etc.).
- **Stray `aircraft` table** — Leftover from another project, needs dropping.
- **Plant Hall / Plant Museum duplicate** — Same building at same Tampa address, two entries.
- **Regional coverage lopsided** — Midwest (only IL, OH) and West (only CA) are nearly empty. 20+ states missing from those regions.
- **Geographic concentration** — LA is 53% New Orleans, MA is 60% Salem/Boston. Natural for famous haunted cities but limits state page variety.

**Clean areas (no action needed):**
- All required fields populated (0 nulls in address, coords, description, ghost_story, category, year_established)
- Descriptions are distinct from ghost stories (not duplicated)
- No real duplicate entries (shared names are all different locations with disambiguated slugs)
- Coordinates all within valid continental US bounds

---

## 2026-01-22

### Tour Operators Data Research

Populated the new `tour_operators` table with 47 ghost tour operators across 10 major haunted destinations in the US. All data verified through official websites and booking platforms.

**Cities covered (operators per city):**
- New Orleans, LA: 5 operators (2 featured)
- Savannah, GA: 5 operators (4 featured)
- Salem, MA: 5 operators (3 featured)
- St. Augustine, FL: 5 operators (3 featured)
- Charleston, SC: 5 operators (4 featured)
- Gettysburg, PA: 5 operators (3 featured)
- San Antonio, TX: 5 operators (3 featured)
- Key West, FL: 4 operators (2 featured)
- Chicago, IL: 4 operators (2 featured)
- Nashville/Franklin, TN: 4 operators (3 featured)

**Featured operators criteria:**
- Established companies with 10+ years of operation
- Award-winning (USA Today, TripAdvisor, etc.)
- Unique access (exclusive locations, paranormal equipment)
- Strong online presence with verified booking systems

**Key sources:**
- Official company websites for pricing and tour details
- TripAdvisor for ratings and reviews
- USA Today "10 Best" rankings
- Viator/GetYourGuide for pricing verification
- VisitSavannah.com, VisitStAugustine.com, NewOrleans.com official tourism sites

**Price ranges observed:**
- Budget: $7-20 (Ghost City Tours, Spellbound Tours)
- Mid-range: $20-40 (most walking tours)
- Premium: $40-89 (bus tours, paranormal investigations, dinner tours)

**Seed file:** `scripts/seed-tour-operators.sql`

---

### Cloudflare Pages Functions: Catch-All Route Priority

**Problem:** Edited `functions/states/index.js` to add state icons, deployed 10+ times, but changes never appeared on the live site. New test endpoints deployed fine, but updates to the states page were ignored.

**Root cause:** `functions/states/[[slug]].js` handles ALL requests under `/states`, including the bare `/states` path. When no slug is provided, it falls through to `renderStatesIndexPage()` inside `[[slug]].js`. The `index.js` file in the same directory is NEVER invoked.

**Key learnings:**
- In Cloudflare Pages Functions, `[[slug]].js` catch-all routes take priority over `index.js` for the parent path
- The compiled Functions bundle was correct (verified with `wrangler pages functions build`), but `index.js` simply wasn't being called at runtime
- Always check which file actually handles a route before editing — look for catch-all patterns that might override index files
- New function endpoints deploy instantly; the issue was routing, not deployment

**Fix:** Moved the icon rendering logic from `index.js` to the `renderStatesIndexPage()` function inside `[[slug]].js`.

---

### State Page Icons (Woodcut Etching Style)

Added conditional rendering for AI-generated state icons on the /states page. States with icons show a woodcut etching illustration; others show a ghost emoji placeholder.

**Art style:** Woodcut etching, white ink on pure #000000 black background, vintage horror book style. Generated with Nano Banana Pro (Google Gemini 3 Pro Image).

**Prompt template:**
```
Woodcut etching illustration of [object], white ink on pure #000000 black background, vintage horror book style, fine line detail, no color, engraving style, centered composition with padding, 16:9 aspect ratio, clean lines
```

**Implementation:** Icons stored at `public/icons/states/[STATE_CODE].png`. The `stateIcons` array in `functions/states/[[slug]].js` controls which states show icons.

**Current status:** 1/18 states done (MA = witch hat).

---

### Ghost Tour Operators Research - Batch 2: Next 10 Haunted Destinations

Expanded the `tour_operators` table with 50 additional ghost tour companies across 10 new cities, bringing total to 111 operators across 21 cities.

**New cities added (Batch 2):**
1. Boston, MA (6 operators) - Freedom Trail, colonial history, Omni Parker House
2. Philadelphia, PA (6 operators) - Eastern State Penitentiary, Independence Hall
3. San Francisco, CA (5 operators) - Alcatraz, Chinatown, Victorian mansions
4. San Diego, CA (5 operators) - Whaley House, Old Town, Gaslamp Quarter
5. Los Angeles, CA (5 operators) - Hollywood haunts, Cecil Hotel
6. Williamsburg, VA (5 operators) - Colonial ghosts, Revolutionary War
7. Richmond, VA (5 operators) - Civil War history, Hollywood Cemetery
8. Baltimore, MD (5 operators) - Poe's grave, Fells Point
9. New Haven, CT (4 operators) - Yale campus, colonial history
10. Memphis, TN (4 operators) - Orpheum Theatre, Beale Street

**Featured operators (25 total in batch 2):** 2-3 per city marked as featured based on:
- Longevity/establishment (years in operation)
- Awards and recognition (TripAdvisor, Best of the Bay, local awards)
- Unique offerings (official tours, exclusive access, paranormal equipment)
- Review quality (4.8+ star ratings)

**Notable tour types added:**
- Official Freedom Trail Lantern Tour (Boston)
- Alcatraz Night Tours (San Francisco)
- Whaley House Paranormal Investigations (San Diego)
- Eastern State Penitentiary Halloween Nights (Philadelphia)
- Colonial Williamsburg Official Ghost Tour
- American Ghost Walks bus tours (Los Angeles)
- Edgar Allan Poe-themed tours (Baltimore, Richmond)
- Yale/Skull and Bones tours (New Haven)

**Price ranges by tour type:**
- Walking tours: $20-35
- Pub crawls: $25-40
- Bus tours: $35-75
- Paranormal investigations: $45-85
- Official/exclusive access tours: $30-55

**Key sources:**
- Official tour company websites (Boston Ghosts, Colonial Ghosts, Richmond Ghosts, etc.)
- TripAdvisor, Viator for reviews, ratings, and booking info
- Official venue websites (Whaley House, Eastern State Penitentiary, Alcatraz)
- Local tourism boards (Visit Baltimore, Virginia.org, etc.)

**Seed file:** `/Users/paulberesuita/Desktop/haunted-places/scripts/seed-tour-operators-batch2.sql`

**Database totals:**
- Total tour operators: 111
- Total cities covered: 21
- States represented: 13 (CA, CT, FL, GA, IL, LA, MA, MD, PA, SC, TN, TX, VA)

---

### Ghost Tour Operators Research - Top 10 Haunted Destinations

Researched and populated the `tour_operators` table with 61 ghost tour companies across the 10 most popular haunted destinations in America.

**Cities covered (by ghost tour popularity):**
1. New Orleans, LA (8 operators) - French Quarter, cemetery, voodoo tours
2. Savannah, GA (7 operators) - One of America's most haunted cities
3. Salem, MA (6 operators) - Witch history, October peak season
4. Gettysburg, PA (6 operators) - Civil War battlefield ghost tours
5. St. Augustine, FL (6 operators) - Oldest city in America
6. Charleston, SC (5 operators) - Historic district tours
7. San Antonio, TX (6 operators) - Alamo area tours
8. Key West, FL (5 operators) - Island ghost tours
9. Chicago, IL (6 operators) - Gangster history, cemetery tours
10. Nashville/Franklin, TN (6 operators) - Civil War history tours

**Featured operators (30 total):** 2-3 per city marked as featured based on:
- Longevity/establishment (years in operation)
- Awards and recognition (USA Today, TripAdvisor, Conde Nast)
- Review quality (4.8+ star ratings)
- Unique offerings (exclusive access, equipment, investigations)

**Tour types captured:**
- Walking tours, bus/trolley tours, hearse rides, kayak tours
- Pub crawls, cemetery tours, paranormal investigations
- Adults-only, family-friendly, private tours
- Themed tours: gangster, Civil War, witch trials, voodoo/vampire

**Price ranges documented:**
- Budget: $10-25 (family walking tours)
- Mid-range: $25-40 (most walking tours and pub crawls)
- Premium: $40-90 (bus tours, investigations, special experiences)

**Key sources:**
- Official tour company websites
- TripAdvisor, Yelp, Viator for reviews and ratings
- USA Today, Conde Nast Traveler, Travel Channel for awards
- Local tourism sites (VisitSavannah, ChooseChicago, etc.)

**Seed file:** `/Users/paulberesuita/Desktop/haunted-places/scripts/seed-tour-operators.sql`

---

### Tennessee Image Research - Wikipedia/Wikimedia Commons

Sourced and uploaded authentic Wikipedia/Wikimedia Commons images for 10 Tennessee haunted places, bringing total coverage to 23 of 25 Tennessee places (92%).

**Sources used:**
- Wikipedia API (`action=query&prop=pageimages&piprop=original`)
- Wikimedia Commons category API for battlefield and historic site images
- Images from Wikimedia Commons (Creative Commons licensed)

**Images uploaded (10 total):**

| Place | Wikipedia/Commons Source | Description |
|-------|--------------------------|-------------|
| Bell Witch Cave (Bell Farm) | Bell_Witch_Cave.JPG | Famous cave entrance, Adams TN |
| Union Station Hotel | WTN_PeepHoles_156.JPG | Nashville's historic train station hotel |
| Hunt-Phelan Home | Hunt-Phelan_home_533_Beale_St_Memphis_TN_03.jpg | Memphis Civil War mansion on Beale St |
| Read House Hotel | ReadHouseChattanooga.jpg | Chattanooga's haunted Room 311 hotel |
| Stone Bridge at Chickamauga | Cannons_monument_and_cabin_LOC_npcc.00041.jpg | Chickamauga NMP with cannons and cabin |
| Bijou Theatre | Bijou-theater-lamar-house-tn1.jpg | Knoxville's historic Lamar House theater |
| Stones River National Battlefield | Hazen_brigade_1863_monument.jpg | Oldest intact Civil War monument |
| Oaklands Mansion | Oaklands_Mansion_03-2023.jpg | Murfreesboro Italianate mansion |
| Sam Davis Home | Sam_Davis_House.jpg | Smyrna Greek Revival house |
| Exchange Place | Prestonfarm.jpg | Kingsport's Preston Farm living history |

**Places without Wikipedia/Commons images (2 places):**
- Ernestine & Hazel's, Memphis (dive bar/former brothel, no Wikimedia documentation)
- Rotherwood Mansion, Kingsport (private antebellum mansion, no Wikimedia coverage)

**Key learnings:**
- Tennessee Civil War sites have excellent Wikimedia coverage (battlefields, monuments)
- Historic mansions with National Register status generally have Wikipedia images
- Smaller bars, restaurants, and private residences often lack documentation
- Exchange Place is documented under its NRHP name "Preston Farm"

---

### Maryland Image Research - Wikipedia/Wikimedia Commons

Sourced and uploaded authentic Wikipedia/Wikimedia Commons images for 5 additional Maryland haunted places, bringing total coverage to 19 of 24 places (79%).

**Sources used:**
- Wikipedia API (`action=query&prop=pageimages&piprop=original`)
- Wikimedia Commons search API for places without main Wikipedia page images
- Images from Wikimedia Commons (Creative Commons licensed)

**Images uploaded (5 total):**

| Place | Wikimedia Commons Source | Description |
|-------|--------------------------|-------------|
| The Horse You Came In On Saloon | The_Horse_You_Came_In_On_Saloon_(54547675099).jpg | Baltimore's oldest saloon, Poe's last stop |
| Antietam National Cemetery | Antietam_National_Cemetery_entrance_and_lodge_MD1.jpg | Civil War cemetery entrance and lodge |
| Pry House Field Hospital | Pry_House_Antietam_MD1.jpg | McClellan's headquarters at Antietam |
| Furnace Town | Nassawango_Iron_Furnace.jpg | 19th century iron furnace |
| Rackliffe House | Rackliffe_House_MD1.jpg | 1740s coastal plantation house |

**Places without Wikipedia/Commons images (5 places):**
- Max's Taphouse (Fells Point bar, no building exterior photo)
- St. Paul Episcopal Church, Sharpsburg (no Wikimedia category for this church)
- Governor Calvert House (no building exterior on Wikimedia)
- Reynolds Tavern (only a plaque photo exists, not building exterior)
- Shoreham Hotel, Ocean City (no Wikimedia images)

**Key learnings:**
- Maryland has good Wikimedia coverage for Civil War sites (Antietam area)
- Smaller taverns, hotels, and restaurants in historic areas often lack documentation
- Fells Point in Baltimore has neighborhood photos but not specific building documentation
- Historic Annapolis buildings have limited Wikimedia coverage despite tourism importance

---

### New Jersey Image Research - Wikipedia/Wikimedia Commons

Sourced and uploaded authentic Wikipedia/Wikimedia Commons images for 35 New Jersey haunted places, focusing on lighthouses, historic mansions, prisons/asylums, and Cape May Victorian hotels.

**Sources used:**
- Wikipedia API (`action=query&prop=pageimages&piprop=original`)
- Wikimedia Commons search API for places without main Wikipedia page images
- Images from Wikimedia Commons (Creative Commons licensed)

**Images uploaded (35 total):**

| Place | Wikipedia/Commons Source | Description |
|-------|--------------------------|-------------|
| Absecon Lighthouse | ABSECON_72_500.jpg | Atlantic City lighthouse |
| Barnegat Lighthouse | NJ_LBI_Lighthouse_04.JPG | "Old Barney" |
| Cape May Lighthouse | Cape_May_Lighthouse_in_Cape_May...jpg | Cape May Point tower |
| Nassau Hall | Cannon_Green_and_Nassau_Hall.jpg | Princeton University |
| Nassau Inn | Nassau_Inn.jpg | Historic Princeton hotel |
| Rockefeller College | Rockefeller_College_Courtyard.jpg | Princeton campus |
| Princeton Cemetery | Princeton_Cemetery_Main_Entrance.JPG | Presidents Row |
| Thomas Clarke House | Princeton_Battlefield_-_The_Clarke_House.jpg | Revolutionary War site |
| Ringwood Manor | Ringwood_Manor_spring_2015.jpg | Historic iron master's mansion |
| Ford Mansion | Ford_Mansion_Morristown_NHP_NJ2.jpg | Washington's Headquarters |
| Emlen Physick Estate | Emlen-physick-estate.jpg | Cape May Victorian mansion |
| The Hermitage | Hermitage-rear.jpg | Ho-Ho-Kus historic house |
| Proprietary House | ProprietaryHousePerthAmboy.JPG | Royal Governor's mansion |
| Smithville Mansion | Smithville_Historic_District_(31).JPG | Historic mansion |
| Southern Mansion | The_Southern_Mansion_Cape_May_NJ.jpg | Cape May B&B |
| Jonathan Pitney House | Dr._Jonathan_Pitney_House_2024.jpg | "Father of Atlantic City" home |
| Spy House | Seabrook-Wilson_House.jpg | Most haunted house in NJ |
| Burlington County Prison | Burlington_County_Prison_128_High_Street.jpg | Ghost Hunters location |
| Greystone Park | Greystone.jpg | Kirkbride asylum |
| Trenton Psychiatric | West_entrance_to_the_Trenton_Psychiatric_Hospital.jpg | Dr. Cotton's hospital |
| Essex County Hospital (Overbrook) | Overbrook_Hospital_-_2017-06-27_(003).jpg | Abandoned asylum |
| Jockey Hollow | Tempe_Wick_House_Jockey_Hollow_NJ.jpg | Revolutionary War encampment |
| Branch Brook Park | Aerial_view_of_Branch_Brook_Park.jpg | Newark park |
| Allaire Village | Row_Homes.jpg | Historic iron village |
| Batsto Village | Batsto_Village_house.jpg | Pine Barrens settlement |
| Clinton Furnace | Clinton_Road_ore_smelter.jpg | Haunted ruins |
| Clinton Road | Clinton_Road_sign.jpg | "Most haunted road in America" |
| Devil's Tree | The_Devil's_Tree.jpg | KKK hanging tree legend |
| Congress Hall | Congress_Hall_A.jpg | Cape May grand hotel |
| Chalfonte Hotel | Chalfonte_Hotel_A.jpg | Victorian Cape May hotel |
| Hotel Macomber | Hotel_Macomber_Cape_May.jpg | Historic Cape May |
| Flanders Hotel | Flanders_Hotel_OC_NJ.jpg | Ocean City landmark |
| Resorts Casino Hotel | Resorts_Atlantic_City_Hotel_Towers.jpg | First Atlantic City casino |
| Centenary University | Old_Main_Centenary_University_Hackettstown_NJ.jpg | Tillie Smith haunting |
| Kendall Hall TCNJ | Kendall_Hall_TCNJ.jpg | Campus theater |

**Places without Wikipedia/Commons images (15 places):**
- Angel of the Sea B&B, Burnt Mill Road (Atco Ghost), Devil's Tower (Rio Vista)
- Dios Cafe, Estell Manor, Gallows Hill Road, Inn of the Hawke
- Leeds Point (Jersey Devil birthplace), Old Bernardsville Library, Ong's Hat Ghost Town
- Surf City Hotel, The Barracks, The Inn at Cape May, The Publick House
- Union Cemetery Hackettstown

**Key learnings:**
- Wikimedia Commons search API is excellent for finding Cape May Victorian architecture
- NJ has strong coverage of lighthouses, state parks, and major landmarks
- Smaller B&Bs, restaurants, and haunted roads often have no photo documentation
- Pine Barrens locations (Ong's Hat, Leeds Point) are difficult to photograph authentically

**Script location:** `/Users/paulberesuita/Desktop/haunted-places/scripts/update-new-jersey-images.sql`

---

### Kentucky Image Research - Wikipedia/Wikimedia Commons

Sourced and uploaded authentic Wikipedia images for 32 Kentucky haunted places, focusing on famous landmarks like Waverly Hills Sanatorium, Bobby Mackey's Music World, and major historic sites.

**Sources used:**
- Wikipedia API (`action=query&prop=pageimages&piprop=original`)
- Wikimedia Commons search API for places without main Wikipedia page images
- Images from Wikimedia Commons (Creative Commons licensed)

**Images uploaded (32 total):**

| Place | Wikipedia/Commons Source | Description |
|-------|--------------------------|-------------|
| Waverly Hills Sanatorium | Waverlyhillssanatorium.jpg | Famous haunted hospital |
| Bobby Mackey's Music World | Bobby_Mackey's_Wilder_KY.jpg | "Most Haunted Nightclub" |
| Liberty Hall | Liberty_Hall_Frankfort_Kentucky.jpg | Home of the Gray Lady |
| Mammoth Cave | Mammoth_Cave_Rotunda.jpg | World's longest cave system |
| Buffalo Trace Distillery | Buffalo_Trace_Tower.jpg | Haunted bourbon distillery |
| Seelbach Hilton Hotel | Seelbach_Hotel_Louisville.jpg | F. Scott Fitzgerald's Great Gatsby inspiration |
| Mary Todd Lincoln House | Mary_Todd_Lincoln_House_Lexington.jpg | Lincoln's wife's childhood home |
| Ashland Henry Clay Estate | Ashland_HC.JPG | Henry Clay's mansion |
| Perryville Battlefield | Harpers-perryville-battle.jpg | Historic battle illustration |
| Cave Hill Cemetery | Cave_hill-rework.jpg | Louisville's Victorian cemetery |
| Old Talbott Tavern | Old_Talbott_Tavern_Bardstown.jpg | Jesse James bullet holes |
| My Old Kentucky Home | My_Old_Kentucky_Home_Mansion.png | Stephen Foster inspiration |
| White Hall | White_Hall_Mansion.jpg | Cassius Clay's home |
| Belle of Louisville | Belle_of_Louisville_2.jpg | Historic steamboat |
| Lexington Opera House | Lexington_Opera_House.jpg | Haunted theater |
| Lexington Cemetery | LexingtonCemetery.JPG | Henry Clay's burial site |
| Frankfort Cemetery | Frankfort_Cemetery.JPG | Daniel Boone's grave |
| Speed Art Museum | Speed_Art_Museum_2016.jpg | Louisville art museum |
| Lost River Cave | Lost_River_Cave_entrance.jpg | Underground river cave |
| Shaker Village Pleasant Hill | Shakertown_Trustees_House.jpeg | Historic Shaker community |
| Octagon Hall | Octagon_Hall_Simpson_Co_KY.jpg | Unique octagonal mansion |
| Camp Nelson | Camp_Nelson_landscape.JPG | Civil War monument |
| Old State Capitol | Kentucky_Old_State_Capitol.JPG | Governor assassination site |
| Colville Covered Bridge | Colville_Bridge02.jpg | Historic covered bridge |
| Old Fort Harrod | Old_Fort_Harrod_State_Park.jpg | First permanent settlement |
| Conrad-Caldwell House | Conrad-Caldwell_House_Museum.jpg | Old Louisville Victorian |
| Louisville Palace Theatre | LouisvillePalaceFullSign.jpg | Movie palace |
| Hunt-Morgan House | Hunt-Morgan_House_Lexington.jpg | Civil War general's home |
| Transylvania University | Old_Morrison.jpg | Famous cursed professor |
| Bodley-Bullock House | Bodley-Bullock_House.jpg | Lexington historic home |
| The Carneal House | Thomas_Carneal_House_Covington.jpg | Covington mansion |
| Booth Memorial Hospital | Old_William_Booth_Memorial_Hospital.jpg | Former Salvation Army hospital |

**Places without Wikipedia/Commons images (12 places):**
- Airdrie Iron Works Ruins, DuPont Mansion B&B, Gratz Park Inn
- Jailer's Inn B&B, Louisville Bourbon Inn, Maple Hill Manor B&B
- Pioneer Cemetery Bardstown, Sauerkraut Cave, Springhill Winery
- The Shinkle House, The Witches' Tree, Western Kentucky University

**Key learnings:**
- Wikimedia Commons search API is excellent for finding images when Wikipedia pages lack main images
- Kentucky's famous haunted locations (Waverly Hills, Bobby Mackey's) have excellent photo coverage
- Smaller B&Bs, inns, and local attractions often have no documentation
- Historic battlefields may only have paintings/illustrations rather than photos

**Script location:** `scripts/update-kentucky-images.sql`

---

### North Carolina Image Research - Wikipedia/Wikimedia Commons

Sourced and uploaded authentic Wikipedia images for 21 North Carolina haunted places, focusing on lighthouses, historic mansions, and famous landmarks.

**Sources used:**
- Wikipedia API (`action=query&prop=pageimages&piprop=original`)
- Images from Wikimedia Commons (Creative Commons licensed)

**Images uploaded (21 total):**

| Place | Wikipedia Source | Description |
|-------|------------------|-------------|
| Biltmore Estate | Biltmore_Estate,_Asheville,_North_Carolina.jpg | America's largest home |
| Thomas Wolfe Memorial | Thomas_Wolfe's_Home.jpg | Historic Victorian house |
| Brown Mountain Lights | Brown_Mountain,_North_Carolina_viewed_from_Beacon_Heights.jpg | Mountain view of lights location |
| Balsam Mountain Inn | Balsam-mountain-inn-nc1.jpg | Historic inn exterior |
| Battleship North Carolina | USS_North_Carolina_NYNY_11306-6-46.jpg | Historic Navy photo |
| Bellamy Mansion | Bellamy_Mansion_Wilmington_NC_front_02.jpg | Antebellum mansion |
| Thalian Hall | City_Hall-Thalian_Hall_(Wilmington,_NC)_2.JPG | Historic theater |
| Burgwin-Wright House | Burgwin-Wright_House,_Wilmington,_North_Carolina.jpg | Colonial-era house |
| Cape Hatteras Lighthouse | Cape_hatteras_lighthouse_img_0529.jpg | Tallest brick lighthouse in US |
| Currituck Beach Lighthouse | Currituck_lighthouse.jpg | Unpainted red brick tower |
| Ocracoke Lighthouse | Ocracoke_island_lighthouse_img_0478.jpg | Second-oldest operating lighthouse |
| Bodie Island Lighthouse | Bodie_Island_Lighthouse,_July_2007.jpg | Black and white striped tower |
| Fort Raleigh (Roanoke Island) | Fort-Raleigh-fort.jpg | Lost Colony site |
| Old Burying Ground Beaufort | Old_Burying_Ground,_Beaufort_NC_04.jpg | 300-year-old cemetery |
| North Carolina State Capitol | 2015_North_Carolina_State_Capitol.JPG | Greek Revival capitol |
| Mordecai House | Historic_Mordecai_House-Raleigh-NC-13_Sept_2010.jpeg | Oldest Raleigh house |
| Carolina Inn | Carolina_Inn.jpg | UNC campus hotel |
| Old Salem Single Brothers House | Old_Salem-1.jpg | Moravian historic district |
| Korner's Folly | Korner's_Folly_Kernersville_NC_Jan_2015.jpg | "Strangest House in the World" |
| Devil's Tramping Ground | DevilsTrampingGround.jdh.jpg | Mysterious barren circle |
| Green Park Inn | Green_Park_Inn.jpg | Victorian resort hotel |

**Places without Wikipedia images (skipped - 29 places):**
- Omni Grove Park Inn, Helen's Bridge, Riverside Cemetery, Battery Park Apartments
- Highland Hospital Site, Reynolds Mansion, Poplar Grove Plantation
- Zebulon Latimer House, Maco Light Site, Price-Gause House
- Springer's Point, Bath Historic District
- Oakwood Cemetery, Dorothea Dix Park, Gimghoul Castle, Horace Williams House, Crybaby Lane
- Old Salem Tavern, Salem College, Blandwood Mansion
- Duke Mansion, Latta Plantation, Lydia's Bridge
- Attmore-Oliver House, Christ Church Cemetery, Sandford House, Dr. Josephus Hall House

**Script location:** `/Users/paulberesuita/Desktop/haunted-places/scripts/update-north-carolina-images.sql`

---

## 2026-01-21

### New Jersey Data Research

Expanded the database to include New Jersey with 50 haunted locations, focusing on the state's unique paranormal heritage including the legendary Jersey Devil, Revolutionary War sites, Victorian Cape May, and notorious haunted roads.

**Research approach:**
- Prioritized Pine Barrens region (5 locations) as home of the Jersey Devil legend, ghost towns, and abandoned settlements
- Strong coverage of Cape May (8 locations) - one of America's most haunted Victorian resort towns with extensive ghost tour infrastructure
- Princeton area (6 locations) featuring Revolutionary War sites, Nassau Hall, and cemetery haunts
- Morristown/Revolutionary War sites (6 locations) including Jockey Hollow winter encampment and Washington's headquarters
- Burlington County (2 locations) featuring the Burlington County Prison, one of NJ's most documented haunted sites
- Atlantic City area (5 locations) including Absecon Lighthouse (featured on Ghost Hunters) and the Flanders Hotel
- Clinton Road area (4 locations) - ranked as the most haunted road in the world by SIXT
- Newark/North Jersey (5 locations) including Ringwood Manor and the Spy House
- Trenton area (2 locations) featuring the notorious Trenton Psychiatric Hospital
- Long Beach Island (3 locations) with maritime ghost legends and the Powhatan shipwreck victims
- Other notable locations (4 locations) including Centenary University, Greystone Park Psychiatric Hospital

**Key sources:**
- Weird NJ magazine - definitive source for New Jersey paranormal locations
- US Ghost Adventures, Haunted Rooms America for verified stories
- Ghost Hunters/TAPS investigations (Burlington County Prison, Absecon Lighthouse, Proprietary House)
- Forbes Magazine haunted rankings, Conde Nast Traveler
- Princeton Magazine, Cape May MAC for local expertise
- American Battlefield Trust for Revolutionary War sites

**Categories breakdown:**
- other: 11 (Clinton Road, Pine Barrens locations, Devil's Tree, parks)
- mansion: 9 (Ringwood Manor, Spy House, Proprietary House, Physick Estate, etc.)
- hotel: 8 (Cape May Victorians, Flanders Hotel, Nassau Inn, etc.)
- hospital: 3 (Trenton Psychiatric, Greystone Park, Overbrook Asylum)
- lighthouse: 3 (Absecon, Barnegat, Cape May)
- museum: 3 (Burlington Prison, Allaire Village, Thomas Clarke House)
- university: 3 (Princeton's Nassau Hall, Centenary, TCNJ)
- cemetery: 2 (Princeton Cemetery, Union Cemetery)
- battlefield: 1 (Jockey Hollow)
- prison: 1 (Burlington County Prison)
- restaurant: 2 (Publick House, Dios Cafe)

**Notable ghost stories:**
- Jersey Devil (1735) - New Jersey's most famous cryptid, born to Mother Leeds as her cursed 13th child
- Clinton Road Ghost Boy - throws coins back at midnight visitors under Dead Man's Curve bridge
- Burlington County Prison's Joel Clough - hanged 1833, guards heard chains rattling in his cell for years
- Tillie Smith at Centenary (1886) - strangled by janitor, haunts campus and appears in sorority photos
- Spy House - up to 22 documented ghosts, Forbes-ranked most haunted house in NJ
- Dr. Henry Cotton at Trenton Psychiatric - performed barbaric surgeries without anesthesia, his ghost still walks the halls
- Ringwood Manor's Jackson White - beaten to death for stealing food, his room generates crying and footsteps

**Geographic distribution:**
- Pine Barrens: 5 locations
- Cape May: 8 locations
- Princeton area: 6 locations
- Morristown/Morris County: 6 locations
- Burlington County: 2 locations
- Atlantic City/Shore: 5 locations
- Passaic County/Clinton Road: 4 locations
- Newark/North Jersey: 5 locations
- Trenton area: 2 locations
- Long Beach Island: 3 locations
- Other: 4 locations

**Seed file created:** `scripts/seed-new-jersey.sql`

---

### Kentucky State Research Completed

Added 47 haunted locations across Kentucky, focusing on the state's unique bourbon heritage, Civil War history, and some of America's most famous paranormal hotspots.

**Research approach:**
- Prioritized Louisville area (12 locations) including Waverly Hills Sanatorium (one of the most haunted buildings in America) and Old Louisville (called "America's Most Haunted Neighborhood")
- Strong coverage of Northern Kentucky (3 locations) including Bobby Mackey's Music World ("Most Haunted Nightclub in America")
- Lexington area (8 locations) featuring Mary Todd Lincoln House, Ashland Henry Clay Estate, and Transylvania University's famous curse
- Bardstown as bourbon and ghost capital (5 locations) - Old Talbott Tavern, Jailer's Inn, My Old Kentucky Home
- Frankfort (4 locations) with Liberty Hall's Gray Lady (Kentucky's most famous ghost), Old State Capitol (only governor assassination site), and Buffalo Trace Distillery
- Mammoth Cave area (3 locations) - world's longest cave system with over 150 documented paranormal events
- Civil War battlefields (4 locations) including Perryville (Kentucky's bloodiest battle with 7,600 casualties)
- Regional coverage: Harrodsburg, Bowling Green, Richmond, and unique sites

**Notable ghost stories:**
- Waverly Hills Sanatorium - 63,000 deaths, "Death Tunnel," Room 502 suicide nurse, "Creeper" entity
- Bobby Mackey's Music World - "Portal to Hell" in basement well, Pearl Bryan decapitation (1896), Carl the caretaker's EVPs
- Liberty Hall's Gray Lady (Margaretta Varick) - Kentucky's oldest and most famous ghost since 1817
- Transylvania University's Rafinesque Curse - professor's 1826 curse strikes every 7 years
- Perryville Battlefield - Confederate soldier "Sam" walks in full uniform, EVPs of "Jefferson Davis"
- Buffalo Trace Distillery - Colonel Blanton's ghost, heavy boots in Warehouse C
- Jailer's Inn - Travel Channel's "10 Most Haunted Places," Mrs. McKay watches sleeping guests

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America
- Kentucky Tourism (official Haunted Kentucky campaign)
- KY For KY, Kentucky Living, Kentucky Monthly
- Ghost Hunters and Ghost Adventures episode references
- Local ghost tour companies (Louisville Historic Tours, Bardstown Ghost Trek)

**Categories breakdown:**
- other: 10 (caves, bridges, distillery, steamboat, tree)
- mansion: 10 (Clay estates, Old Louisville Victorian homes)
- hotel: 7 (Seelbach, Gratz Park Inn, Jailer's Inn, etc.)
- museum: 4 (Old State Capitol, museums)
- cemetery: 4 (Cave Hill, Lexington, Frankfort, Pioneer)
- battlefield: 3 (Perryville, Camp Nelson, White Hall)
- hospital: 3 (Waverly Hills, Booth Memorial, Sauerkraut Cave/Lakeland)
- university: 2 (Transylvania, WKU)
- theater: 2 (Louisville Palace, Lexington Opera House)
- prison: 1 (Jailer's Inn - converted jail)
- restaurant: 1 (Old Talbott Tavern)

**Seed file created:** `scripts/seed-kentucky.sql`

---

## 2026-01-20

### Four New States Added: Connecticut, Maryland, South Carolina, Tennessee

Expanded the database from 503 places across 11 states to **612 places across 15 states**.

**New states researched:**
- Connecticut (CT): 34 places
- Maryland (MD): 24 places
- South Carolina (SC): 27 places
- Tennessee (TN): 25 places

**Research approach for each state:**

**Connecticut:**
- Focus areas: Hartford (Mark Twain House, Old State House), New Haven (Grove Street Cemetery, Yale), Fairfield County (Union Cemetery White Lady, Boothe Memorial Park), New London/Mystic (lighthouses, historic inns), Litchfield Hills (Dudleytown cursed village, Lake Compounce oldest amusement park)
- Notable: Union Cemetery's "White Lady" investigated by Ed and Lorraine Warren, Dudleytown called "most haunted place on earth" by Dan Aykroyd
- Categories: hotels (7), cemeteries (4), museums (3), historic sites (4), theaters (3), restaurants (3), lighthouses (2), other (8)

**Maryland:**
- Focus areas: Baltimore/Fells Point (Lord Baltimore Hotel, Westminster Hall/Poe's Grave, Admiral Fell Inn), Antietam (bloodiest day in US military history), Annapolis (Maryland Inn dating to 1772), Point Lookout (most haunted lighthouse in America), Frederick (Barbara Fritchie, Schifferstadt), Eastern Shore (Furnace Town, Ocean City)
- Notable: Westminster Hall (Poe's grave and "Poe Toaster" tradition), Lord Baltimore Hotel (Molly the ghost girl), Antietam's Bloody Lane (23,000 casualties in 12 hours)
- Categories: hotels (6), battlefields (3), cemeteries (2), mansions (3), museums (4), lighthouses (2), other (4)

**South Carolina:**
- Focus areas: Charleston (Old Jail/Lavinia Fisher, Dock Street Theatre, Battery Carriage House), Plantations (Boone Hall, Magnolia, Hampton), Pawleys Island (Gray Man hurricane ghost), Myrtle Beach (Atalaya Castle), Columbia (Longstreet Theatre, Bull Street asylum), Upstate (Poinsett Bridge, USS Yorktown)
- Notable: Old Charleston Jail (14,000 deaths, Lavinia Fisher legend), Pawleys Island Gray Man (warning of hurricanes since 1822), Poinsett Bridge (oldest in Southeast, named one of 30 most haunted in America)
- Categories: mansions/plantations (8), hotels (4), cemeteries (3), historic sites (4), theaters (2), museums (2), battlefields (2), other (2)

**Tennessee:**
- Focus areas: Adams (Bell Witch Cave - only documented supernatural death in US), Nashville (Ryman Auditorium "Opry Curse", Hermitage Hotel), Franklin (Carnton Plantation - Civil War hospital with bloodstained floors), Memphis (Orpheum Theatre "Mary", Ernestine & Hazel's), Chattanooga (Read House Room 311, Chickamauga "Old Green Eyes"), Knoxville (Bijou Theatre), Murfreesboro (Stones River headless horseman)
- Notable: Bell Witch (Tennessee only state to officially recognize supernatural death), Carnton (four dead generals laid on porch), Ryman (37 untimely performer deaths attributed to "Opry Curse")
- Categories: battlefields/historic sites (6), theaters (4), hotels (4), mansions (6), other (3), cemeteries (1), prisons (1)

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified stories
- State tourism sites and local ghost tour companies
- Historical societies and Civil War records
- TV show documentation (Ghost Hunters, Ghost Adventures)

**Seed files created:**
- `scripts/seed-connecticut.sql`
- `scripts/seed-maryland.sql`
- `scripts/seed-south-carolina.sql`
- `scripts/seed-tennessee.sql`

---

## 2026-01-17

### Cloudflare Pages Project Name

**CRITICAL:** The Cloudflare Pages project is named `spookfinder`, NOT `haunted-places`.

Always deploy with:
```bash
wrangler pages deploy ./public --project-name=spookfinder
```

The custom domain `spookfinder.com` is connected to the `spookfinder` project. Deploying to `haunted-places` will NOT update the production site.

---

## 2026-01-16

### MA, VA, IL, NY, OH Image Research - Wikipedia/Wikimedia Commons

Fixed images for five states using Wikipedia API to find authentic location photos from Wikimedia Commons.

**States covered:**
- Massachusetts (MA): 15 images
- Virginia (VA): 11 images
- Illinois (IL): 9 images
- New York (NY): 12 images
- Ohio (OH): 8 images
- **Total: 55 images**

**Wikipedia API used:**
```bash
curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=[TITLE]&prop=pageimages&piprop=original&format=json"
```

**Key images uploaded:**

| State | Place | Wikipedia Source |
|-------|-------|------------------|
| MA | Lizzie Borden House | Lizzie_Borden_House_(Bed_Breakfast).jpg |
| MA | Omni Parker House | Omni_Parker_House.jpg |
| MA | House of Seven Gables | House_of_the_Seven_Gables_(front_angle).jpg |
| MA | Hawthorne Hotel | Hawthorne_Hotel.JPG |
| MA | Danvers State Hospital | Danvers_State_Hospital_circa_1893.jpg |
| MA | Hoosac Tunnel | Hoosac_Tunnel_2024.jpg |
| MA | USS Constitution | USS_Constitution_fires_a_17-gun_salute.jpg |
| VA | Monticello | Monticello_reflected.JPG |
| VA | Fort Monroe | Fort_Monroe_Aerial.jpg |
| VA | Governor's Palace | Governor's_Palace_Williamsburg.jpg |
| VA | Peyton Randolph House | Peyton_Randolph_House.jpg |
| VA | Gadsby's Tavern | Gadsby's_Tavern_Alexandria.jpg |
| VA | Hollywood Cemetery | Hollywood_Cemetery_01.jpg |
| VA | Cavalier Hotel | The_Cavalier_Hotel.jpg |
| IL | Biograph Theater | BiographTheater.jpg |
| IL | Lincoln Home | Lincoln_Home_1.jpg |
| IL | Drake Hotel | Drake_Hotel_Chicago_postcard_1920.jpg |
| IL | Resurrection Cemetery | Resurrection_Cemetery_Justice_IL.jpg |
| IL | Wrigley Field | Wrigley_Field_in_line_with_sign.jpg |
| NY | The Dakota | The_Dakota.jpg |
| NY | Fort Ticonderoga | Fort_Ticonderoga.jpg |
| NY | Hotel Chelsea | Chelsea_Manhattan_Aug_2025.jpg |
| NY | Brooklyn Bridge | Brooklyn_Bridge_Manhattan.jpg |
| NY | Sleepy Hollow Cemetery | SleepyHollowNY-entrance.jpg |
| NY | Merchant's House Museum | Merchant's_House_Museum.jpg |
| OH | Ohio State Reformatory | Ohio_State_Reformatory_Mansfield.jpg |
| OH | Franklin Castle | Hannes_Tiedemann_House_Cleveland.jpg |
| OH | Cincinnati Music Hall | Renovated_Cincinnati_Music_Hall.jpg |
| OH | Squire's Castle | Squire's_Castle_2.jpg |

**Places skipped (no Wikipedia page images):**
- Salem Witch House (MA) - Wikipedia title search returned no image
- Congress Plaza Hotel (IL) - No page image
- Bachelor's Grove Cemetery (IL) - No page image
- Hull House (IL) - No page image
- Morris-Jumel Mansion (NY) - Unicode title issues
- Amityville Horror House (NY) - No page image
- Rolling Hills Asylum (NY) - No page image

**Script location:** `scripts/update-five-states-images.sql`

---

### Florida Image Research - Wikipedia/Wikimedia Commons (Fix)

Fixed Florida haunted place images by sourcing authentic photos from Wikipedia/Wikimedia Commons API.

**Sources used:**
- Wikipedia API (`action=query&prop=pageimages&piprop=original`)
- Images from Wikimedia Commons (Creative Commons licensed)

**Images uploaded (30 total):**

| Place | Wikipedia Source | Description |
|-------|------------------|-------------|
| Castillo de San Marcos | Castillo_de_San_Marcos.jpg | Spanish fort exterior |
| St. Augustine Lighthouse | St._Augustine_Lighthouse_1.jpg | Full tower view |
| Lightner Museum | Alcazar_Hotel,_St._Augustine,_FL,_US_(21).jpg | Historic Alcazar Hotel building |
| Flagler College | Ponce_de_Leon_Hotel courtyard view | Courtyard of the historic hotel |
| Casa Monica Hotel | Casa_Monica_Hotel,_St._Augustine,_FL,_US,_2022.jpg | 2022 exterior |
| Huguenot Cemetery | St_Aug_Huguenot_Cem01.jpg | Cemetery entrance |
| Tolomato Cemetery | Tolomato_Cemetery_entryway_July_2012.jpg | Cemetery entryway |
| Spanish Military Hospital | Spanish_Military_Hospital_Museum_(Oblique_View)_01.jpg | Museum building |
| Old Jail | St_Aug_old_county_jail01.jpg | Historic jail exterior |
| Tampa Theatre | TampaTheatre01.jpg | Theatre facade |
| Don CeSar Hotel | Don_Cesar.jpg | Pink palace hotel |
| Cuban Club (Circulo Cubano) | Tampa_Circulo_Cubano01.jpg | Historic social club |
| Plant Hall / Henry B. Plant Museum | Tampa_Bay_Hotel--7022-1.jpg | Moorish Revival architecture |
| May-Stringer House | May-Stringer_House01.jpg | Victorian mansion |
| Ybor City Museum | Centro_Ybor,_Ybor_City,_Tampa,_Florida.jpg | Centro Ybor building |
| Biltmore Hotel | Coral_Gables_FL_Biltmore01.jpg | Iconic hotel exterior |
| Vizcaya Museum | Villa_Vizcaya_20110228.jpg | Italian Renaissance villa |
| Coral Castle | Coral_Castle_1.jpg | Stone structure |
| Deering Estate | Deering_Estates_-_Richmond_Cottage.JPG | Richmond Cottage |
| Stranahan House | Stranahan-house.jpg | Historic house |
| Villa Paula | Villa_Paula.jpg | Historic mansion |
| Audubon House | Audoban_House,_Key_West,_FL,_US.jpg | Key West house |
| Captain Tony's Saloon | Sloppy_Joe's_Bar,_Key_West,_FL,_US_(09).jpg | Original Sloppy Joe's building |
| Devil's Millhopper | Devil's_Millhopper_-_2.jpg | Geological sinkhole |
| Pensacola Lighthouse | Pensacolalh.JPG | Lighthouse tower |
| Fort Pickens | Bastion_of_Fort_Pickens.jpg | Fort bastion |
| Kingsley Plantation | KingsleyPlantationSunset2.jpg | Plantation at sunset |
| Koreshan State Park | Koreshan_SHS_planetary_court02.jpg | Planetary court structure |

**Places without Wikipedia images (20):**
- Artist House, Ashley's Restaurant, Capitol Theatre (Clearwater)
- Casablanca Inn, Cassadaga Hotel, Cassadaga Spiritualist Camp
- Dorr House, Greenwood Cemetery, Hard Rock Cafe Key West
- Key West Cemetery, La Concha Hotel, Marrero's Guest Mansion
- Miami River Inn, Old Town Manor, Ripley's Believe It or Not!
- Safety Harbor Spa, Seville Quarter, St. Francis Inn
- Sunland Hospital Site, The Devil's Chair

**Key learnings:**
- Wikipedia API reliably provides main image for pages with images
- Many smaller B&Bs, inns, and restaurants have no Wikipedia coverage
- The Wikipedia API pattern is: `titles=Page_Title&prop=pageimages&piprop=original`
- Some pages exist but have no images (e.g., Cassadaga Spiritualist Camp)

**Script location:** `/Users/paulberesuita/Desktop/haunted-places/scripts/update-florida-images-wikipedia.sql`

---

### Pennsylvania Image Research - Wikipedia/Wikimedia Commons

Sourced and uploaded authentic Wikipedia images for Pennsylvania haunted places, focusing on major landmarks from Philadelphia, Pittsburgh, and Gettysburg.

**Sources used:**
- Wikipedia API with proper User-Agent header to avoid rate limiting
- Images from Wikimedia Commons (Creative Commons licensed)

**Images replaced (25 total):**

| Place | Wikipedia Source | Description |
|-------|------------------|-------------|
| Eastern State Penitentiary | Eastern_State_Penitentiary_aerial_crop.jpg | Aerial view of the prison |
| Fort Mifflin | Fort_Mifflin_-_Eastman.jpg | Historic fort exterior |
| Independence Hall | Exterior_of_the_Independence_Hall,_Aug_2019.jpg | 2019 exterior photo |
| Betsy Ross House | Betsy_Ross_House_(53572939795).jpg | Historic house facade |
| Carpenters Hall | Carpenters'_Hall,_Philadelphia,_U.S.,_May_2015.jpg | Colonial building |
| City Tavern | CityTavern-Philly.png | Historic tavern exterior |
| First Bank of the United States | First_Bank_of_the_United_States_LCCN2011633532_(edited).jpg | Historic bank building |
| Laurel Hill Cemetery | LaurelHillCemeteryGatehouse(cropped)_HABS314296cv.jpg | Cemetery gatehouse |
| Carnegie Library of Pittsburgh | Interior_of_Carnegie_Library_of_Pittsburgh.jpg | Library interior |
| National Aviary | National_Aviary.jpg | Building exterior |
| Allegheny County Jail/Courthouse | Allegheny_County_Courthouse,_2025-05-24-1.jpg | Richardson Romanesque courthouse |
| Sachs Covered Bridge | Sachs_Bridge_-_Gettysburg.jpg | Historic covered bridge |
| Dobbin House Tavern | Dobbin_Gettysburg_2.JPG | Colonial tavern |
| Cashtown Inn | Cashtown_Inn_Present.JPG | Civil War-era inn |
| Little Round Top | The_Twentieth_Maine.jpg | Battle of Gettysburg painting |
| Devils Den | Battle_of_Gettysburg_painting | Thure de Thulstrup painting |
| Soldiers National Museum | Gettysburg_national_cemetery_img_4164.jpg | National Cemetery |
| Fort Hunter Mansion | Fort_Hunter,_Pennsylvania_(5656723609).jpg | Historic mansion |
| Fulton Theatre | Fulton_Opera_House.jpg | Lancaster opera house |
| Centralia | Old_Mine_Fire_1969.jpg | Historic mine fire photo |
| Jean Bonnet Tavern | Jean_Bonnet_Tavern.jpg | Historic tavern |
| Golden Plough Tavern | YorkPaGPTavern.jpg | York colonial tavern |
| Houdini Museum | Harry_Handcuff_Houdini_Crop.jpg | Houdini portrait |
| Pennhurst Asylum | Admin-current-pennhurst.jpg | Abandoned asylum |
| Church Brew Works | The_Church_Brew_Works.jpg | Church converted to brewery |

**Places still without images (24):**
- AV Restaurant & Lounge, Accomac Inn, Baleroy Mansion
- Clayton (The Frick Mansion), Congress Hall, Dead Man's Hollow
- Doubleday Inn, Farnsworth House Inn, General Lee's Headquarters
- Gettysburg Hotel, Green Man's Tunnel, Hill View Manor
- Hummelbaugh House, Iverson's Pits, Jennie Wade House
- Nemacolin Castle, Omni William Penn Hotel, Pennsylvania Hall
- The Old Jail, The Ritz Theater, The Seven Gates of Hell
- The Slaughter Pen, Triangular Field, Troy Hill Firehouse

**Key learnings:**
- Wikipedia API requires proper User-Agent header to avoid 429 rate limiting
- Some Gettysburg battlefield locations have paintings rather than photos available
- Many smaller/local places have no Wikipedia pages

**Script location:** `/Users/paulberesuita/Desktop/haunted-places/scripts/update-pennsylvania-images.sql`

---

### California Image Research Phase 2 - Wikimedia Commons

Continued the California image research, replacing 21 additional generic Unsplash images with authentic photos from Wikimedia Commons.

**Sources used (in priority order):**
1. Wikimedia Commons - Primary source for most images (Creative Commons licensed)
2. Calisphere attempted but blocked by CloudFront WAF

**Images replaced with Wikimedia Commons sources:**

| Place | Wikimedia Source | Description |
|-------|------------------|-------------|
| Cecil Hotel | Cecil_Hotel,_L.A.jpg | 2015 exterior facade |
| Hollywood Roosevelt Hotel | Hollywood_Roosevelt_Hotel_2015.jpg | Modern exterior view |
| Queen Anne Hotel | 1590_Sutter_Queen_Anne_SF_CA.JPG | Victorian painted lady facade |
| Comedy Store | The_Comedy_Store_West_Hollywood_(51017780551).jpg | Night exterior with sign |
| Claremont Hotel | Berkeley_CA_-_Hotel_Claremont_(NBY_431525).jpg | Historic postcard view |
| Brookdale Lodge | Brookdale_Lodge_in_Brookdale,_California.JPG | Lodge exterior |
| Linda Vista Hospital | Santa_Fe_Coast_Lines_Hospital,_Los_Angeles.JPG | Original hospital building |
| Camarillo State Hospital | CSUCI-camarillo_state_hospital_bell_tower | Bell tower (now CSUCI) |
| Hollywood Forever Cemetery | 2009-0727-CA-Paramount-HollywoodForever.jpg | Cemetery entrance |
| Knickerbocker Hotel | KnickerbockerHotel_Dec2006.jpg | Building exterior |
| Queen Mary | RMS_Queen_Mary_Long_Beach_January_2011_view.jpg | Ship docked at Long Beach |
| Mission Inn | Mission_Inn,_Riverside,_California_(61085).jpg | Historic hotel exterior |
| Cosmopolitan Hotel | San_Diego_Old_Town_Cosmopolitan_Hotel.jpg | Old Town building |
| Curran Theatre | San_Francisco_Curran_Theatre_1.jpg | Theatre entrance |
| Sainte Claire Hotel | Hotel_Sainte_Claire,_on_a_sunny_day.JPG | Downtown San Jose landmark |
| Leland Stanford Mansion | Leland_Stanford_House_(Sacramento,_CA).jpg | Governor's mansion |
| Moss Beach Distillery | Moss_Beach_Distillery_08-15-2009.jpg | Coastal restaurant exterior |
| Mission San Juan Capistrano | Mission_San_Juan_Capistrano_02.jpg | Mission ruins and bell |
| Stow Lake | San_Francisco_Stow_Lake_Strawberry_Hill_pagoda.jpg | Lake with pagoda |
| Point Sur Lighthouse | Point_Sur_Lighthouse_(5063098751).jpg | Lighthouse on rocks |
| Calico Ghost Town | Calico_Mountains_and_Calico_Ghost_Town_(47).jpg | Town overview |

**Images NOT found (will skip rather than use wrong image):**
- El Campo Santo Cemetery - No good Wikimedia images (cemetery is small)
- Monterey Hotel - No specific building photos found
- Old Orange County Courthouse - Skipped (need specific search)
- Big Yellow House Summerland - No documentation found
- Various San Jose road/park locations - Generic by nature

**Total California image coverage:**
- Phase 1 (LOC): 15 images replaced
- Phase 2 (Wikimedia): 21 images replaced
- Total authentic images: 36 of 49 California places (73%)
- Remaining: 13 places still using Unsplash or need research

**Key learnings:**
- Wikimedia Commons has excellent coverage of California historic buildings
- Hotels and theaters are well-documented (tourism photos)
- Creative Commons licensing makes these safe to use
- Some smaller/niche locations have no documentation anywhere

---

### California Image Re-Research - Authentic Location Photos

Re-researched and replaced 15 California haunted place images that were generic Unsplash photos with authentic location-specific photographs from the Library of Congress.

**Problem addressed:**
- Original California images were sourced from Unsplash as generic fallbacks
- Many were "spooky atmosphere" photos that didn't show the actual locations
- Users reported images "are not good" and looked like stock photos

**Solution implemented:**
- Searched Library of Congress HABS, HAER, and Carol M. Highsmith Archive
- Found and downloaded authentic building/location photographs
- Replaced 15 images with actual photos of the haunted places

**Images replaced with LOC sources:**

| Place | Source | Description |
|-------|--------|-------------|
| Winchester Mystery House | HABS CA-2107 | Color front facade photo |
| Whaley House | HABS CA-422 | 1960 exterior photograph |
| Colorado Street Bridge | HAER CA-58 | Overall bridge view |
| Preston Castle | Highsmith 2012 | Reform school exterior |
| Delta King Riverboat | Highsmith 2012 | Steamboat in Old Sacramento |
| Santa Clara University | Highsmith 2012 | Mission church on campus |
| The Presidio | Highsmith 2012 | Historic military buildings |
| Hotel del Coronado | HABS CA-1958 | Historic Victorian hotel |
| Agnews State Hospital | HABS CA-2710 | Campus overview |
| Griffith Park/Observatory | Highsmith 2012 | Iconic observatory building |
| Pantages Theatre | Highsmith 2012 | Art Deco theater exterior |
| Alcatraz Island | Highsmith | Aerial island view |
| USS Hornet Museum | HAER WA-34 | Aircraft carrier aerial |
| Bodie Ghost Town | Highsmith 2012 | Town overview |
| Hearst Castle | Highsmith | Aerial estate view |

**Places still using Unsplash (no LOC images found):**
- Cecil Hotel (LOC has no photos; building is historic landmark)
- Hollywood Roosevelt Hotel (no LOC exterior photos)
- Queen Anne Hotel (no LOC documentation)
- Comedy Store (LOC blog mentions it, no photos)
- Claremont Hotel Berkeley (LOC has NY Claremont, not CA)
- Brookdale Lodge (no LOC documentation)
- Linda Vista Hospital (no LOC documentation)
- Camarillo State Hospital (no LOC photos; archives at CSU Channel Islands)
- And approximately 19 other locations with road/park/generic subjects

**Key learnings:**
- HABS/HAER collections have extensive California coverage for major landmarks
- Carol M. Highsmith's 2012 Jon B. Lovelace California Collection is excellent
- Some locations (newer hotels, private buildings) have no LOC documentation
- A missing image is better than a wrong image - prioritize authenticity

**Script location:** `scripts/update-california-images-v2.sql`

---

### Louisiana Image Research - Complete Coverage

Successfully sourced and uploaded images for all 50 Louisiana haunted locations using Library of Congress and Unsplash.

**Key LOC sources for Louisiana:**
- **Carol M. Highsmith Archive** has excellent Louisiana coverage (2020-2021 pandemic-era photos of plantations)
- Oak Alley Plantation: highsm.67668 (famous live oak alley view)
- Myrtles Plantation: highsm.66574 (manor house exterior)
- Houmas House: highsm.66393 (mansion and grounds)
- San Francisco Plantation: highsm.67806 (turret and cisterns)
- Old Ursuline Convent: highsm.12641 (oldest building in Mississippi Valley)
- Jackson Square/St. Louis Cathedral: highsm.11863, highsm.14835 (historic square and cathedral)
- Bourbon Street: highsm.73003-73007 (2022 street scenes)
- Louisiana Capitol Interior: highsm.67665 (Memorial Hall, Senate chambers)
- Faulkner House/Pirate's Alley: highsm.16364 (next to St. Louis Cathedral)
- Garden District Mansion: highsm.13244 (Grinnan Villa, 1850)

**LOC URL pattern for highsm collection:**
- `https://tile.loc.gov/storage-services/service/pnp/highsm/[XXXXX]/[id]v.jpg`
- Example: highsm.67668 = `/highsm/67600/67668v.jpg`

**Unsplash used for locations not in LOC:**
- French Quarter hotels: Balcony and building imagery
- Restaurants: Interior dining photos
- Cemeteries: Above-ground tomb imagery (Metairie Cemetery photos)
- Theaters: Ornate interior auditorium photos
- University buildings: Gothic/historic academic architecture
- Military barracks: Historic brick building exteriors
- Bed & breakfasts: Victorian mansion exteriors
- Haunted roads: Foggy road night imagery

**Coverage by region:**
- New Orleans French Quarter (25 places): 8 from LOC, 17 from Unsplash
- Louisiana Plantations (10 places): 4 from LOC (Oak Alley, Myrtles, Houmas, San Francisco), 6 from Unsplash
- Baton Rouge (6 places): 1 from LOC (Capitol), 5 from Unsplash
- Shreveport (3 places): Unsplash
- Lafayette (2 places): Unsplash
- Natchitoches (1 place): Unsplash
- Chalmette (1 place): Unsplash

**Script location:** `scripts/update-louisiana-images.sql`

---

### Florida Image Research - Complete Coverage

Successfully sourced and uploaded images for all 50 Florida haunted locations using Library of Congress and Unsplash.

**Key LOC sources for Florida:**
- **Carol M. Highsmith Archive** has good Florida coverage (2020 photos primarily)
- Castillo de San Marcos: highsm.62509 (cannon view of the fort)
- St. Augustine Lighthouse: highsm.62504 (full tower view, completed 1874)
- Flagler College: highsm.62533 (historic Ponce de Leon Hotel building)
- Old Jail St. Augustine: highsm.62566 (1891 jailhouse exterior)
- Coral Castle: highsm.13681 (Edward Leedskalnin's creation)
- Vizcaya Museum: highsm.12197 (James Deering's winter retreat)

**LOC URL pattern for highsm collection:**
- `https://tile.loc.gov/storage-services/service/pnp/highsm/[XXXXX]/[id]v.jpg`
- Example: highsm.62509 = `/highsm/62500/62509v.jpg`

**Unsplash used for locations not in LOC:**
- Key West mansions and inns: Victorian house imagery
- Tampa/Ybor City: Historic buildings and theaters
- Miami hotels: Luxury resort imagery
- Cassadaga: Spiritual/mystical atmosphere photos
- Cemeteries: Spanish moss and tombstone imagery

**Coverage by region:**
- St. Augustine (12 places): 4 from LOC, 8 from Unsplash
- Key West (9 places): Mostly Unsplash
- Tampa/St. Pete area (9 places): Unsplash
- Miami/South Florida (7 places): 2 from LOC (Coral Castle, Vizcaya), 5 from Unsplash
- Orlando/Cassadaga (7 places): Unsplash
- Pensacola/North Florida (6 places): Unsplash

**Script location:** `scripts/update-florida-images.sql`

---

### California Image Research - Complete Coverage

Successfully sourced and uploaded images for all 49 California haunted locations using Library of Congress and Unsplash.

**Key LOC sources for California:**
- **Carol M. Highsmith Archive** has excellent California coverage (2012-2013 photos)
- Alcatraz Island: Multiple aerial and ground-level views available (highsm-14872)
- Queen Mary: Two views available (highsm-11879, highsm-16513)
- Bodie Ghost Town: Extensive coverage with 72 images (highsm-22326 through 22431)
- Hearst Castle: Neptune Pool, Roman Pool, and exterior views (highsm-73008 through 73038)
- Hollywood/Pantages Theatre: Multiple views (highsm-22307 through 22313)
- Griffith Observatory: Several angles available (highsm-22252, 22255, 24222)
- Point Sur Lighthouse: highsm-16070
- Mission Inn Riverside: highsm-25395, 25396
- Calico Ghost Town: highsm-22685

**Unsplash used for locations not in LOC:**
- Winchester Mystery House: Architectural photos of the mansion
- Whaley House: Historic house imagery
- Cecil Hotel: Downtown LA building photos
- Hollywood Roosevelt Hotel: Hollywood landmark imagery
- Hotels/restaurants: Generic but relevant category images

**Coverage by region:**
- San Francisco Bay Area: 7 places (Alcatraz from LOC, others mix)
- Los Angeles area: 7 places (Pantages from LOC, Griffith from LOC)
- San Jose/Silicon Valley: 9 places (mostly Unsplash)
- San Diego: 5 places (Hotel del Coronado from LOC)
- Central Coast: 5 places (Point Sur, Hearst Castle from LOC)
- Ghost Towns: Bodie and Calico both from LOC

**Script location:** `scripts/update-california-images.sql`

---

### Virginia Data Research

Expanded the database to include Virginia, focusing on the state's rich Colonial and Civil War haunted heritage including Colonial Williamsburg, Civil War battlefields, and historic plantations.

**Research approach:**
- Prioritized Colonial Williamsburg (8 locations) as America's largest living history museum with Revolutionary War-era spirits
- Strong coverage of Richmond (10 locations) featuring Hollywood Cemetery, Edgar Allan Poe connections, and Civil War history
- Alexandria/Northern VA (6 locations) including Gadsby's Tavern and the famous "Female Stranger" legend
- Fredericksburg (6 locations) on the bloodiest ground in North America with intense Civil War activity
- Charlottesville (5 locations) featuring Monticello, UVA (where Poe studied), and Michie Tavern
- Shenandoah Valley (6 locations) including VMI, Stonewall Jackson sites, and Civil War hospitals
- Norfolk/Hampton Roads (5 locations) featuring Fort Monroe (400+ years of history) and Edgar Allan Poe sightings
- Virginia Beach/Coastal (4 locations) including the Cavalier Hotel with its mysterious Adolph Coors death

**Key sources:**
- Colonial Ghosts, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Virginia Tourism (official haunted trails and historic sites)
- Ghost City Tours (Williamsburg, Richmond, Alexandria specialists)
- Civil War Trust / National Park Service for battlefield accuracy
- Local ghost tour companies (Richmond Ghosts, Alexandria Ghosts, Neptune Ghosts)

**Categories breakdown:**
- mansion: 14 (Peyton Randolph, Monticello, Kenmore, Carlyle House, etc.)
- other: 9 (Natural Bridge, Church Hill Tunnel, Cape Henry Lighthouse, etc.)
- hotel: 5 (Cavalier, Linden Row Inn, Hotel 24 South, Exchange Hotel, Chamberlin)
- university: 4 (William & Mary, UVA, VMI, Mary Baldwin)
- battlefield: 3 (Fort Monroe, Fredericksburg, Chatham Manor)
- restaurant: 4 (Gadsby's Tavern, Michie Tavern, King's Arms, Shields Tavern)
- museum: 3 (Poe Museum, The Lyceum, Moses Myers House)
- cemetery: 2 (Hollywood Cemetery, Elmwood Cemetery)
- hospital: 1 (Public Hospital of 1773)
- prison: 1 (Historic Albemarle County Jail)

**Notable ghost stories:**
- Peyton Randolph House - cursed by an enslaved person in 1782, General Lafayette felt a phantasmic hand
- The Female Stranger at Gadsby's Tavern - mysterious woman died in 1816, identity never revealed
- Fort Monroe's Ghost Alley - Edgar Allan Poe's ghost, Lincoln in a rocking chair, Women in White
- Cavalier Hotel's Adolph Coors - fell/jumped/pushed from 6th floor, plus a ghost cat and phantom bellhop
- Hollywood Cemetery's Richmond Vampire - bloody figure fled Church Hill Tunnel collapse to a mausoleum
- Fredericksburg Battlefield's Bloody Angle - overwhelming paranormal readings on "bloodiest ground in North America"
- University of Virginia - Poe left a poem about a dark spirit, professor's wife propped dead husband in window

**Geographic distribution:**
- Colonial Williamsburg: 8 locations
- Richmond area: 10 locations
- Alexandria/Northern VA: 6 locations
- Fredericksburg: 6 locations
- Charlottesville: 5 locations
- Shenandoah Valley: 6 locations
- Norfolk/Hampton Roads: 5 locations
- Virginia Beach/Coastal: 4 locations

---

### Texas Image Research - Complete Coverage

Successfully sourced and uploaded images for all 50 Texas haunted locations using Library of Congress and Unsplash.

**Key LOC sources for Texas:**
- **Lyda Hill Texas Collection** in Carol M. Highsmith's America Project - extensive 2014 Texas photography
- Most San Antonio, Austin, Galveston landmarks available in high quality
- URL pattern: `https://tile.loc.gov/image-services/iiif/service:pnp:highsm:[id]/full/pct:50/0/default.jpg`

**HABS (Historic American Buildings Survey) limitations:**
- HABS images return HTML error pages when accessing via IIIF tile server
- Use alternative Unsplash images for HABS-documented buildings

**Coverage by city:**
- San Antonio: 13 places (LOC: Alamo, missions, Spanish Governor's Palace; Unsplash: hotels)
- Galveston: 7 places (LOC: Ashton Villa, Bishop's Palace, Moody Mansion)
- Austin: 5 places (LOC: Capitol, Driskill Hotel, Governor's Mansion)
- Dallas: 4 places (LOC: Adolphus Hotel, White Rock Lake, Majestic Theatre)
- El Paso: 3 places (LOC: Plaza Theatre, Concordia Cemetery, Camino Real interior)
- Fort Worth: 2 places (LOC: Thistle Hill)
- Other cities: 16 places (mix of LOC and Unsplash)

**Script location:** `scripts/update-texas-images.sql`

---

### Image Sourcing - Alternative to Wikimedia Commons

After Wikimedia Commons began rate-limiting and blocking automated image downloads (403 Forbidden errors), discovered effective alternative sources for public domain and free-to-use images.

**Working alternative sources:**
1. **Library of Congress (loc.gov)** - Best source for historic building photos
   - Carol M. Highsmith Archive: 70,000+ contemporary photos of US buildings, all public domain
   - Historic American Buildings Survey (HABS): Historic photos from 1930s onwards
   - Detroit Publishing Co. collection: Historic postcard-quality images
   - URL pattern for downloads: `https://tile.loc.gov/image-services/iiif/service:pnp:highsm:[id]/full/pct:50/0/default.jpg`

2. **Unsplash (unsplash.com)** - Modern free photos
   - All images free for commercial use, no attribution required
   - Good for generic category images (cemeteries, mansions, ruins)
   - URL pattern: `https://images.unsplash.com/photo-[id]?w=1200&q=80`

3. **Digital Library of Georgia (dlg.usg.edu)** - State-specific historic photos
   - Good for Georgia-specific locations
   - Historic postcards and photographs

**Key learnings:**
- Wikimedia Commons curl requests get blocked; use LOC and Unsplash instead
- LOC images are higher quality and legally cleaner (US government = public domain)
- Unsplash provides good fallback images when specific building photos unavailable
- Always resize images to max 1200px width before uploading to R2

**Image sourcing process:**
1. Search LOC first for specific building/location photos
2. If not found, search Unsplash for appropriate category images
3. Download with curl using proper User-Agent header
4. Resize with `sips -Z 1200 input.jpg --out resized/output.jpg`
5. Upload to R2: `npx wrangler r2 object put bucket/places/slug.jpg --file=./resized/slug.jpg --remote`

---

### Florida Data Research

Expanded the database to include Florida, focusing on the state's unique haunted heritage including America's oldest city (St. Augustine), Key West pirate history, Tampa's immigrant community spirits, and the spiritualist community of Cassadaga.

**Research approach:**
- Prioritized St. Augustine as Florida's most haunted region (12 locations) due to 450+ years of history, Spanish colonial heritage, and numerous documented ghost tours
- Strong coverage of Key West (9 locations) including Robert the Doll, Captain Tony's hanging tree, and Victorian-era mansions
- Tampa/St. Pete area (9 locations) featuring the Cuban Club (300+ documented spirits), Don CeSar Hotel, and Ybor City history
- Miami/South Florida (7 locations) including the Biltmore Hotel (Fatty Walsh gangster ghost), Deering Estate, and Coral Castle
- Orlando area (7 locations) with focus on Cassadaga spiritualist camp and its unique paranormal tourism
- Pensacola/North Florida (6 locations) including the most haunted lighthouse in America and Kingsley Plantation

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Official tourism sites: Visit St. Augustine, Visit Florida, Florida Historical Society
- Travel Channel (Ghost Hunters episodes filmed at multiple Florida locations)
- Local news coverage (Tampa Bay Times, Orlando Weekly, Miami New Times)
- Smoky Mountains research (ranked Ashley's Restaurant as "most haunted in America")

**Categories breakdown:**
- hotel: 12 (Casa Monica, Don CeSar, La Concha, Biltmore, Cassadaga Hotel, etc.)
- other: 7 (Castillo de San Marcos, Cuban Club, Coral Castle, Devil's Millhopper, etc.)
- mansion: 7 (Artist House, Deering Estate, May-Stringer House, etc.)
- museum: 6 (Fort East Martello, Lightner Museum, Plant Museum, etc.)
- cemetery: 5 (Huguenot, Key West, Greenwood, Tolomato, Cassadaga)
- restaurant: 4 (Captain Tony's, Ashley's, Hard Rock Key West, Seville Quarter)
- theater: 2 (Tampa Theatre, Capitol Theatre)
- lighthouse: 2 (St. Augustine, Pensacola)
- hospital: 2 (Spanish Military Hospital, Sunland Hospital site)
- university: 1 (Flagler College)
- prison: 1 (Old Jail St. Augustine)
- plantation: 1 (Kingsley Plantation)

**Notable ghost stories:**
- Robert the Doll at Fort East Martello - causes misfortune to those who disrespect him
- The Cuban Club in Ybor City - 300+ documented spirits including Rosalita who was thrown from the balcony
- St. Augustine Lighthouse - two Pittee girls who drowned during construction
- Fatty Walsh at the Biltmore - mobster shot on Friday the 13th on the 13th floor
- Ashley's Restaurant - Ethel Allen murdered in 1934, identified by her rose tattoo
- May-Stringer House - 11 documented ghosts including "Mr. Nasty" in the attic
- Cassadaga - entire town founded for spirit communication, the "Psychic Capital of the World"

**Geographic distribution:**
- St. Augustine: 12 locations (Spanish forts, cemeteries, historic inns)
- Key West: 9 locations (forts, Victorian mansions, saloons)
- Tampa/St. Pete area: 9 locations (Ybor City, Plant Hall, Don CeSar)
- Miami/South Florida: 7 locations (Coral Gables, Fort Lauderdale, Homestead)
- Orlando area: 7 locations (Cassadaga, Greenwood Cemetery, Rockledge)
- Pensacola/North Florida: 6 locations (lighthouses, forts, plantations)

---

### Illinois Data Research

Expanded the database to include Illinois, focusing on the state's unique haunted heritage including Chicago gangster history, Alton as "America's Most Haunted Small Town," Lincoln-related hauntings, and famous haunted cemeteries.

**Research approach:**
- Prioritized Chicago as the major metro area (15 locations) with focus on gangster history (St. Valentine's Day Massacre, Biograph Theater, HH Holmes Murder Castle)
- Strong coverage of Alton area (4 locations) recognized as "America's Most Haunted Small Town" - McPike Mansion, Mineral Springs Hotel
- Springfield coverage (5 locations) focusing on Lincoln-related hauntings - Lincoln's Tomb, Lincoln Home, phantom funeral train legend
- Galena as historic destination (3 locations) with DeSoto House Hotel and Ryan Mansion
- Included famous cemeteries: Bachelor's Grove (most haunted in America), Resurrection Cemetery (Resurrection Mary), Graceland (Inez Clarke statue)
- Covered notorious locations: Hull House Devil Baby legend, Old Joliet Prison, Bartonville Asylum (Old Book legend)

**Key sources:**
- Ghost City Tours, Windy City Ghosts, US Ghost Adventures for Chicago ghost stories
- Haunted Rooms America, Illinois Haunted Houses for statewide coverage
- Rivers and Routes (Alton tourism) for America's Most Haunted Small Town
- Choose Chicago, CBS Chicago, WBEZ for local journalism on hauntings
- Official site histories and local ghost tour companies

**Categories breakdown:**
- other: 9 (massacre sites, landmarks, municipal buildings)
- restaurant: 7 (Red Lion Pub, Golden Dagger, Great Escape, Irish Legend, etc.)
- mansion: 6 (McPike, Lincoln Home, Dana-Thomas House, Ryan Mansion, etc.)
- hotel: 6 (Congress Plaza, Drake, Mineral Springs, DeSoto House, Hotel Baker, Ruebel)
- theater: 4 (Biograph, Rialto Square, Avon, Springfield Theatre)
- cemetery: 4 (Bachelor's Grove, Resurrection, Graceland, Greenwood)
- hospital: 2 (Bartonville Asylum, Elgin State Hospital)
- prison: 1 (Old Joliet Prison)
- museum: 1 (Jane Addams Hull-House)

**Notable ghost stories:**
- Bachelor's Grove Cemetery - Most haunted cemetery in America with the White Lady, Disappearing House, and Capone body dump legend
- Resurrection Mary - Chicago's most famous ghost, hitchhiking woman in white dancing dress who vanishes at cemetery gates since 1930s
- Congress Plaza Hotel - Multiple sealed rooms, Peg Leg Johnny the mischievous ghost, Al Capone's spirit
- Hull House Devil Baby - 1913 mass hysteria about deformed child with hooves and horns
- Old Joliet Prison - Singing ghost legend from 1932, housed John Wayne Gacy and Richard Speck
- Bartonville Asylum - Old Book the gravedigger whose death sparked mass mourning, Graveyard Elm that wailed when cut down
- St. Valentine's Day Massacre - Haunted bricks returned by buyers, outlines appear in fresh snow

**Geographic distribution:**
- Chicago: 15 locations (including Lincoln Park, River North, Englewood, Midlothian suburbs)
- Springfield: 5 locations (Lincoln sites, state buildings)
- Alton area: 4 locations (including Grafton)
- Galena: 3 locations
- Joliet: 2 locations
- Decatur: 2 locations
- Various others: 9 locations (Aurora, Bartonville, Elgin, Mount Carroll, St. Charles, Schiller Park, Willow Springs, Justice)

---

### New York State Data Research

Expanded the database to include New York, focusing on the state's diverse haunted heritage including Revolutionary War sites, the Sleepy Hollow legend, famous NYC landmarks, historic asylums, and the infamous Amityville Horror House.

**Research approach:**
- Prioritized New York City as the largest concentration (10 locations) including Manhattan landmarks and Staten Island
- Strong coverage of Hudson Valley/Sleepy Hollow (7 locations) leveraging the Headless Horseman legend and Washington Irving connection
- Upstate NY coverage (6 locations) including Lake George resorts, Fort Ticonderoga, and Albany
- Long Island coverage (4 locations) including the Amityville Horror House and Kings Park Psychiatric Center
- Western NY representation with Buffalo Central Terminal and Syracuse Landmark Theatre
- Mix of famous and lesser-known locations for variety

**Key sources:**
- NY Ghosts, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Haunted History Trail of New York State (official tourism resource)
- NYC Tourism, Visit Sleepy Hollow for regional coverage
- Ghost Hunters and Ghost Adventures episode references for TV-featured locations
- Wikipedia for historical verification

**Categories breakdown:**
- mansion: 7 (Morris-Jumel, Merchant's House, House of Death, Conference House, Nyack Haunted House, Enslin Mansion, Amityville)
- hotel: 6 (Hotel Chelsea, The Dakota, Sagamore, Shanley, Burn Brae, Fainting Goat Island Inn)
- other: 5 (Brooklyn Bridge, Spook Rock Road, NY State Capitol, Buffalo Central Terminal, Lake Ronkonkoma)
- museum: 4 (Merchant's House, Ellis Island, Fort William Henry, Canfield Casino)
- hospital: 3 (Rolling Hills Asylum, Kings Park Psychiatric Center, Utica State Hospital)
- theater: 3 (Belasco Theatre, Tarrytown Music Hall, Landmark Theatre Syracuse)
- cemetery: 2 (Sleepy Hollow Cemetery, Elmira Civil War Prison Camp)
- battlefield: 1 (Fort Ticonderoga)
- restaurant: 1 (One If by Land, Two If by Sea)

**Notable ghost stories:**
- Rolling Hills Asylum - Roy Crouse, the 7-foot tall shadow man; rated 2nd most haunted in North America
- Sleepy Hollow Cemetery - The Headless Horseman and the Bronze Lady who weeps real tears
- Merchant's House Museum - Gertrude Tredwell never left after 93 years
- Amityville Horror House - The Lutz family's 28-day nightmare; Ed Warren rated it "a 10"
- Belasco Theatre - Broadway's most haunted; David Belasco and the Blue Lady
- Conference House - Servant girl murdered by Loyalist owner still screams
- Nyack Haunted House - Only house legally declared haunted by NY Supreme Court

**Geographic distribution:**
- New York City: 10 locations (Manhattan, Staten Island, Brooklyn)
- Hudson Valley: 7 locations (Sleepy Hollow, Tarrytown, Glen Spey, Napanoch, Nyack, Troy, Hudson)
- Upstate NY: 6 locations (Lake George, Ticonderoga, Saratoga Springs, Albany, East Bethany, Utica)
- Long Island: 4 locations (Amityville, Kings Park, Montauk, Lake Ronkonkoma)
- Western NY: 3 locations (Buffalo, Syracuse, Elmira)
- Southern Tier: 2 locations (Nichols, Elmira)

---

## 2026-01-15

### California Data Research

Expanded the database to include California, focusing on the state's diverse haunted heritage including Gold Rush ghost towns, Spanish mission history, Hollywood legends, and notorious haunted hotels.

**Research approach:**
- Prioritized major metro areas: Los Angeles/Hollywood (7 locations), San Francisco Bay Area (12 locations), San Diego (5 locations), San Jose/South Bay (9 locations)
- Strong coverage of ghost towns: Bodie (most authentic), Calico (family-friendly)
- Included iconic California locations: Alcatraz, Winchester Mystery House, Queen Mary, Hotel del Coronado
- Added Hollywood celebrity ghosts: Marilyn Monroe, Montgomery Clift, Rudolph Valentino
- Covered Central Coast: Hearst Castle, Big Sur lighthouse, Monterey area

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Official site histories (Winchester Mystery House, Hotel del Coronado, Queen Mary)
- Travel Channel (Ghost Adventures episodes filmed at multiple locations)
- Local ghost tour companies and paranormal investigators

**Categories breakdown:**
- other: 18 (ghost towns, bridges, parks, roads with legends)
- hotel: 12 (Hollywood Roosevelt, Cecil, Queen Anne, Brookdale Lodge, etc.)
- mansion: 4 (Winchester Mystery House, Whaley House, Hearst Castle, Big Yellow House)
- museum: 3 (USS Hornet, Old OC Courthouse, Queen Mary)
- theater: 3 (Comedy Store, Curran, Pantages)
- hospital: 3 (Camarillo State, Linda Vista, Agnews State)
- restaurant: 2 (Moss Beach Distillery, Grandview)
- cemetery: 2 (Hollywood Forever, El Campo Santo)
- university: 1 (Santa Clara University)
- prison: 1 (Alcatraz)

**Notable ghost stories:**
- Winchester Mystery House - Sarah Winchester building endlessly to confuse rifle victim ghosts
- Whaley House - "Most haunted house in America" per US Dept of Commerce
- Queen Mary - Up to 150 ghosts including Jackie the pool girl and Door 13 victims
- Cecil Hotel - Serial killers' home, Elisa Lam mystery
- Bodie Ghost Town - Curse makes artifact thieves mail items back with apologies
- Hollywood Roosevelt - Marilyn Monroe's reflection appears in mirrors
- Colorado Street Bridge - Over 150 suicides created "Suicide Bridge" legend

**Geographic distribution:**
- Los Angeles area: 9 locations (incl. West Hollywood, Long Beach, Pasadena)
- San Francisco Bay Area: 7 locations (SF, Berkeley, Alameda)
- San Jose/Silicon Valley: 9 locations (San Jose, Santa Clara, Milpitas)
- San Diego area: 5 locations (San Diego, Coronado, San Juan Capistrano)
- Central/Southern California: 8 locations (various)
- Gold Country: 3 locations (Bodie, Ione, Sacramento)
- Central Coast: 6 locations (Monterey, Big Sur, etc.)

---

### Texas Data Research

Expanded the database to include Texas, focusing on the state's unique haunted heritage including the Alamo and Spanish missions, 1900 Galveston hurricane victims, frontier hotels, and West Texas ghost towns.

**Research approach:**
- Prioritized San Antonio as the most haunted area (13 locations) due to the Alamo and Spanish colonial history
- Strong coverage of Galveston (7 locations) focusing on 1900 hurricane tragedy and Victorian-era mansions
- Austin coverage (5 locations) including the Driskill Hotel, State Capitol, and Texas State Lunatic Asylum
- Dallas/Fort Worth (6 locations) with focus on historic hotels and the Stockyards
- West Texas ghost towns and phenomena (Marfa Lights, Terlingua, Baker Hotel)
- East Texas (Jefferson) known as "most haunted town in Texas"

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- River City Ghosts (San Antonio), Historic Galveston Ghost Tours for local expertise
- Texas Monthly, Houston Chronicle, San Antonio Express-News for regional coverage
- Travel Channel (Ghost Adventures episodes) for featured locations

**Categories breakdown:**
- hotel: 14 (Menger, Emily Morgan, Driskill, Hotel Galvez, etc.)
- other: 13 (Alamo, missions, ghost tracks, Marfa Lights, etc.)
- mansion: 7 (Ashton Villa, Bishop's Palace, Thistle Hill, etc.)
- theater: 4 (Majestic, Grand Opera House, Hippodrome, Plaza)
- hospital: 3 (Austin State Hospital, San Antonio State Hospital, Yorktown Memorial)
- museum: 3 (USS Lexington, Battleship Texas, Dr Pepper Museum)
- cemetery: 2 (Oakwood, Concordia)
- restaurant: 2 (Spaghetti Warehouse, Catfish Plantation)
- prison: 1 (Old Bexar County Jail)
- battlefield: 1 (The Alamo)

**Notable ghost stories:**
- The Alamo's "diablos" with flaming swords who guard the site
- Hotel Galvez's Ghost Bride Audra who hanged herself after her fiance's ship sank
- The Driskill Hotel's four-year-old Samantha who still chases her ball down the stairs
- USS Lexington's tour guide "Charlie" who gives detailed tours despite being dead since 1944
- Yorktown Memorial Hospital's nuns who attack visitors with tattoos
- Baker Hotel's Lady in White (Virginia Brown) who jumped from the 7th floor

---

### R2 Image Storage Setup

Added Cloudflare R2 storage for place images, enabling the researcher agent to populate images for haunted locations.

**Architecture decisions:**
- Created a Pages Function at `/images/[[path]].js` to serve images from R2 rather than enabling public access on the bucket directly
- This approach provides better control over caching headers and CORS
- Images served with 1-year immutable cache for optimal CDN performance
- Added `image_url` column to places table to store the image path (not full URL)

**Usage pattern:**
- Researcher uploads images to R2 with key format: `[slug].jpg` (e.g., `eastern-state-penitentiary.jpg`)
- Store only the filename in `image_url` column
- Frontend constructs full URL: `https://haunted-places.pages.dev/images/[image_url]`

**Wrangler CLI notes:**
- R2 commands default to local; use `--remote` flag for production bucket operations
- Example: `wrangler r2 object put haunted-places-images/image.jpg --file=./image.jpg --remote`

---

### Pennsylvania Data Research

Expanded the database to include Pennsylvania, focusing on Civil War history (Gettysburg), Revolutionary War sites (Philadelphia), and infamous haunted asylums.

**Research approach:**
- Prioritized Gettysburg as the most haunted area (15 locations) due to Battle of Gettysburg casualties (50,000+)
- Strong focus on Philadelphia Revolutionary War sites (10 locations) including Independence Hall, Fort Mifflin, Betsy Ross House
- Pittsburgh coverage (7 locations) including haunted landmarks and urban legends
- Included notorious asylums: Pennhurst Asylum, Hill View Manor
- Added unique locations: Centralia ghost town (underground fire since 1962), Seven Gates of Hell legend

**Key sources:**
- Gettysburg Ghost Tours, US Ghost Adventures, Ghost City Tours for battlefield ghost stories
- Visit PA, Haunted Rooms America for statewide coverage
- National Park Service and American Battlefield Trust for historical accuracy
- Local news and paranormal investigation reports for recent activity

**Categories breakdown:**
- museum: 10 (Independence Hall, Jennie Wade House, Betsy Ross House, etc.)
- restaurant: 7 (City Tavern, Dobbin House, Jean Bonnet Tavern, etc.)
- other: 7 (Centralia, Green Man's Tunnel, Dead Man's Hollow, etc.)
- battlefield: 6 (Devil's Den, Little Round Top, Iverson's Pits, Slaughter Pen, etc.)
- mansion: 5 (Baleroy, Nemacolin Castle, Clayton Frick, etc.)
- hotel: 5 (Farnsworth House, Gettysburg Hotel, Cashtown Inn, etc.)
- prison: 3 (Eastern State Penitentiary, Allegheny County Jail, Old Jail Chambersburg)
- theater: 2 (Fulton Theatre, Ritz Theater)
- hospital: 2 (Pennhurst Asylum, Hill View Manor)
- university: 1 (Pennsylvania Hall at Gettysburg College)
- cemetery: 1 (Laurel Hill Cemetery)

**Notable ghost stories:**
- Pennsylvania Hall elevator that opens to reveal Civil War hospital scene
- Baleroy Mansion's "Chair of Death" that killed 4 people who sat in it
- Cashtown Inn where Confederate ghosts pack guests' luggage
- Fort Mifflin's Screaming Woman who triggers police calls

---

### Louisiana Data Research

Expanded the database to include Louisiana, focusing on the state's unique haunted heritage including voodoo traditions, French colonial history, and plantation ghosts.

**Research approach:**
- Prioritized New Orleans French Quarter as the most haunted area (26 locations)
- Added "plantation" as a new category (11 locations) since Louisiana River Road plantations are famous for paranormal activity
- Included voodoo and Marie Laveau connections to highlight Louisiana's unique spiritual history
- Covered Baton Rouge, Shreveport, Lafayette, and Natchitoches for geographic diversity

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Official plantation websites (Myrtles, Destrehan, Houmas House) for historical accuracy
- Travel Louisiana and Visit Baton Rouge for regional coverage

**Categories breakdown:**
- other: 12 (pharmacies, mounds, ghost towns, cemeteries with non-cemetery focus)
- plantation: 11 (River Road and regional plantations)
- hotel: 10 (French Quarter haunted hotels)
- mansion: 6 (LaLaurie, Beauregard-Keyes, etc.)
- restaurant: 5 (Muriel's, Lafitte's, Antoine's, Arnaud's, etc.)
- cemetery: 3 (St. Louis Cemeteries No. 1, 2, 3)
- theater: 2 (Saenger, Shreveport Municipal)
- battlefield: 1 (Chalmette)

---

### D1 Database Schema Design

Created the `places` table as the core data model for haunted locations.

**Schema decisions:**
- `slug` field for SEO-friendly URLs (unique, indexed)
- `state` defaults to 'GA' since focusing on Georgia haunted places
- `ghost_story` separate from `description` to allow detailed narratives
- `source_url` for attribution and credibility
- Indexes on state, city, category for filtering performance

**Database ID:** `b32d1ccc-aac8-472b-aedb-144e08e8ff8c`

---

<!-- Add dated entries here, newest first -->

<!-- Example format:

## 2026-01-15

### Decision Title

What was decided and why.

**Key learnings:**
- Insight 1
- Insight 2

---

-->
