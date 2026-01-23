# Feature: Phantom Timeline

## Why
Reveal the hidden historical patterns in American hauntings — how they cluster around wars, epidemics, and tragedies — through a visual, scrollable timeline from the 1600s to present.

## Requirements
- [ ] Route at `/timeline` via `functions/timeline.js` (server-side rendered)
- [ ] Query all places with non-null `year_established` from D1, ordered by year ascending
- [ ] Embed place data as JSON in SSR HTML (id, name, slug, city, state, category, year_established, ghost_story first sentence)
- [ ] Vertical scrollable timeline with year markers and place nodes
- [ ] Each node shows: year, place name, city/state, category icon, first sentence of ghost story as excerpt
- [ ] Click/tap any node to navigate to `/place/[slug]`
- [ ] Era grouping labels dividing the timeline into historical periods:
  - Colonial Era (1600-1775)
  - Revolutionary War (1776-1799)
  - Antebellum (1800-1860)
  - Civil War (1861-1865)
  - Reconstruction & Gilded Age (1866-1899)
  - Early 20th Century (1900-1945)
  - Post-War (1946-1999)
  - Modern (2000-present)
- [ ] Era labels styled as section dividers with distinct visual treatment
- [ ] Visual density: where multiple places share the same year or decade, show them clustered together so spikes in haunting activity are visually obvious
- [ ] Smooth scroll behavior, with a floating era navigation (jump to Colonial, Civil War, etc.)
- [ ] Minimal header bar at top (site logo/name + navigation)
- [ ] "Timeline" link added to site-wide header navigation
- [ ] Desktop: vertical timeline with nodes alternating left/right of center line
- [ ] Mobile: vertical timeline with all nodes on one side, compact layout
- [ ] SEO: title "Phantom Timeline - Centuries of American Hauntings | Spookfinder", meta description
- [ ] Handle places with no year gracefully (exclude from timeline, do not show "null")

## User Flow
1. User clicks "Timeline" in the site header
2. `/timeline` loads showing a vertical timeline starting at the earliest haunting
3. User scrolls down through centuries of hauntings
4. Era labels appear as section dividers ("Civil War 1861-1865") helping orient the user
5. User notices clusters of nodes around the 1860s and early 1900s
6. User clicks a node to read more about a specific place
7. User navigates to `/place/[slug]`
8. Alternatively, user clicks an era in the floating nav to jump directly to that period

## Not Included
- No filtering by state or category on the timeline
- No horizontal scroll layout (vertical only for consistency and mobile friendliness)
- No animations or transitions beyond smooth scroll
- No "add to favorites" or bookmarking
- No data enrichment (uses existing year_established values only)
- No explanation of historical events (just era labels, not history lessons)
- No zoom or time-range slider
