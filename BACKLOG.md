# Backlog

Each agent owns their section. Order = priority. Top = next.

---

## Product

### Inbox
- **Boo Map** — Interactive full-US map with clustering and popup cards → `specs/boo-map.md`

### Done
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
- **Expand states below 40 places** — MD (24), SC (27), TN (25), OH (29), NY (32), CT (34) all need more places to reach launch threshold
- **Fill image gaps** — KY (73%), CT (79%), MD (79%) need image research to reach 80%+ coverage
- **Add new states** — WI, MO, IN are strong candidates with well-known haunted locations
- **Backfill sources** — All 752 entries at source_count=1, need 2+ independent sources each
- **Fix category inconsistencies** — 25 non-standard categories + 26 miscategorized `other` entries + 2 bad year_established values. Decide on `lighthouse` as official category.
- **Enrich VA ghost stories** — 50 places averaging 295 chars (thinnest state). Expand to 500+ chars with specific names, dates, paranormal claims.
- **Drop aircraft table** — Leftover from another project, 14 rows of airplane data. One SQL command cleanup.
- **Expand tour operators** — Boston, NYC, Philadelphia, Williamsburg, Asheville, Richmond, Louisville, Lexington all have 8+ places but zero tour operators.
- **Deduplicate Plant Hall / Plant Museum** — Same building, same address in Tampa. Consolidate into one entry with richer ghost story.

### Done
