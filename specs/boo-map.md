# Feature: Boo Map

## Why
Give visitors a visual, explorable way to discover all 612+ haunted places across America on a single interactive map.

## Requirements
- [ ] Route at `/map` via `functions/map.js` (server-side rendered)
- [ ] Full-viewport Leaflet map with CartoDB Dark Matter tiles (OpenStreetMap)
- [ ] Initial view centered on US (lat 39.5, lng -98.5, zoom 4)
- [ ] All places loaded from D1 server-side and embedded as JSON in the SSR HTML
- [ ] Simple ghost SVG icon for map markers (not woodcut style)
- [ ] Marker clustering via Leaflet.markercluster plugin
- [ ] Click/tap marker opens popup card with: place name, city/state, category badge, "View Place" link to `/place/[slug]`
- [ ] Minimal header bar at top (site logo/name + navigation)
- [ ] "Map" link added to site-wide header navigation
- [ ] SEO: title "Boo Map - Haunted Places Across America | Spookfinder", meta description
- [ ] Mobile: touch-friendly markers, popups on tap, responsive layout
- [ ] Load Leaflet CSS/JS and markercluster plugin from CDN

## User Flow
1. User clicks "Map" in the site header (from any page)
2. `/map` loads with a full-viewport dark-themed map of the US
3. User sees clustered markers across the country
4. User zooms in or pans to a region, clusters break apart into individual markers
5. User clicks/taps a ghost marker
6. Popup appears showing place name, city/state, category badge, and "View Place" link
7. User clicks "View Place" and navigates to `/place/[slug]`

## Not Included
- No filters or search on the map
- No geolocation ("find near me")
- No custom map tiles beyond CartoDB Dark Matter
- No favorites or saved places
- No sidebar or list view alongside the map
- No state/category color coding on markers
