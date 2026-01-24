# Backlog

Each agent owns their section. Order = priority. Top = next.

---

## Product

### Inbox
- **[Feature] Boo Map** — Interactive full-US map with clustering and popup cards → `specs/boo-map.md`
- **[Feature] Ghost Story Radio** — Ambient "lo-fi haunts" page with TTS narration, atmospheric audio, and image slideshow → `specs/ghost-story-radio.md`
- **[Feature] The Dead Map** — "What's haunted near me?" geolocation-based ranked list of closest places → `specs/the-dead-map.md`
- **[Feature] Phantom Timeline** — Scrollable vertical timeline of hauntings by year with era groupings → `specs/phantom-timeline.md`
- **[Easter Egg] Ghost in the Console** — Spooky styled messages in browser DevTools console → `specs/easter-egg-console-ghost.md`
- **[Easter Egg] Gravestone 404** — CSS tombstone with URL slug as epitaph on 404 pages → `specs/easter-egg-gravestone-404.md`
- **[Easter Egg] The Flickering Favicon** — Tab icon briefly flickers to a skull at random intervals → `specs/easter-egg-flickering-favicon.md`
- **[Easter Egg] Cold Spot** — Invisible frost zone on place pages that reveals when cursor passes through → `specs/easter-egg-cold-spot.md`
- **[Easter Egg] The Follower** — Dark silhouette that grows more visible with each place page visit → `specs/easter-egg-the-follower.md`

### Done
- **[Easter Egg] The Watcher** — Glowing red eyes in page margins that track your cursor → `specs/easter-egg-the-watcher.md`
- **Haunted Hotels Guide** — Dedicated vertical for haunted hotels with state filters and scariest-room highlights from ghost stories → `specs/haunted-hotels-guide.md`
- **Ghost Tours Directory** — City pages surfacing tour operators with prices, booking links, and nearby haunted places → `specs/ghost-tours-directory.md`
- **Individual Place Pages** — Dedicated page for each haunted location with full ghost story → `specs/individual-place-pages.md`
- **Homepage** — Landing page with search, featured states, and featured places → `specs/homepage.md`
- **API Endpoints** — REST API to serve place data from D1 → `specs/api-endpoints.md`

---

## Marketing

### Inbox
- **City Pages** — All haunted places in a city, grouped by category → `specs/city-pages.md`
- **Sitemap and Robots.txt** — Dynamic sitemap for Google indexing → `specs/sitemap-robots.md`
- **Category Pages** — Browse all hotels, battlefields, prisons across states → `specs/category-pages.md`

### Done
- **State Landing Pages** — Programmatic pages for each state with city listings → `specs/state-landing-pages.md`

---

## Data

### Inbox
- **Fill image gaps** — OH, NY, CT new places need images; KY (73%) still below 80% threshold
- **Add new states** — WI, MO, IN are strong candidates with well-known haunted locations
- **Backfill sources** — All 752 entries at source_count=1, need 2+ independent sources each
- **Fix category inconsistencies** — 25 non-standard categories + 26 miscategorized `other` entries + 2 bad year_established values. Decide on `lighthouse` as official category.
- **Enrich VA ghost stories** — 50 places averaging 295 chars (thinnest state). Expand to 500+ chars with specific names, dates, paranormal claims.
- **Drop aircraft table** — Leftover from another project, 14 rows of airplane data. One SQL command cleanup.
- **Expand tour operators** — Boston, NYC, Philadelphia, Williamsburg, Asheville, Richmond, Louisville, Lexington all have 8+ places but zero tour operators.
- **Deduplicate Plant Hall / Plant Museum** — Same building, same address in Tampa. Consolidate into one entry with richer ghost story.

### Done
- **Expand OH, NY, CT to 40 places** — OH +11, NY +8, CT +6. All states now at 40+ (2026-01-23)
- **Image research for MD, TN, SC** — 39 images uploaded (Wikimedia + website fallback). TN 98%, MD 83%, SC 80% (2026-01-23)
- **Expand MD, TN, SC to 40 places** — MD +16, TN +15, SC +13 (2026-01-23)
