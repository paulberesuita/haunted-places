# Backlog

Work queue. Planner maintains, builder executes.

---

## Inbox

### MVP (Launch With)

- [ ] **City Pages** — All haunted places in a city, grouped by category [spec](specs/city-pages.md)
  - SEO: High - captures "haunted places in Savannah/New Orleans/etc"
  - Effort: Medium
  - Routes: ~50 pages at `/states/[state]/[city]`


- [ ] **Sitemap and Robots.txt** — Dynamic sitemap for Google indexing [spec](specs/sitemap-robots.md)
  - SEO: Critical - ensures all pages get indexed
  - Effort: Small
  - Routes: `/sitemap.xml`, `/robots.txt`

### V2 (Add Later)

- [ ] **Category Pages** — Browse all hotels, battlefields, prisons, etc. across states [spec](specs/category-pages.md)
  - SEO: Medium - captures "haunted hotels" type searches
  - Effort: Small
  - Routes: ~11 pages at `/categories/[category]`

---

## Bugs

<!-- Track bugs and usability issues here -->

---

## Done

- [x] **Individual Place Pages** — Dedicated page for each haunted location with full ghost story [spec](specs/individual-place-pages.md)
  - Routes: 204 dynamic pages at `/place/[slug]`
  - Deployed: https://haunted-places.pages.dev/place/eastern-state-penitentiary

- [x] **Homepage** — Landing page with search, featured states, and featured places [spec](specs/homepage.md)
  - Routes: `/`
  - Deployed: https://haunted-places.pages.dev

- [x] **API Endpoints** — REST API to serve place data from D1 (powers all pages) [spec](specs/api-endpoints.md)
  - Routes: `/api/places`, `/api/places/[slug]`, `/api/states`, `/api/cities`, `/api/categories`
  - Deployed: https://haunted-places.pages.dev

- [x] **State Landing Pages** — Programmatic pages for each state with city listings [spec](specs/state-landing-pages.md)
  - Routes: `/states/georgia`, `/states/louisiana`, `/states/massachusetts`, `/states/pennsylvania`
  - Deployed: https://haunted-places.pages.dev
