# Feature: The Dead Map (Nearby Hauntings)

## Why
Give visitors an immediate, personal connection to the data — "what's haunted near me?" turns abstract ghost stories into something uncomfortably close to home.

## Requirements
- [ ] Route at `/nearby` via `functions/nearby.js` (server-side rendered)
- [ ] Load all places with coordinates from D1, embed as JSON in SSR HTML
- [ ] Browser Geolocation API to request user's current position
- [ ] Calculate straight-line distance from user to each place using Haversine formula (client-side JS)
- [ ] Sort places by distance ascending, display ranked list (closest first)
- [ ] Each result card shows: rank number, place name, city/state, category badge, distance in miles (1 decimal), link to `/place/[slug]`
- [ ] Show top 25 results by default with a "Show more" button to load the next 25
- [ ] Geolocation denied fallback: show a search input for city/state, geocode to coordinates using a simple city lookup table (embed top 200 US cities with coords in the page)
- [ ] Geolocation pending state: show a "Locating you..." spinner/message
- [ ] Geolocation error state: show fallback city picker with friendly message
- [ ] Minimal header bar at top (site logo/name + navigation)
- [ ] "Nearby" link added to site-wide header navigation
- [ ] Mobile friendly (primary use case — someone on their phone wondering what's nearby)
- [ ] SEO: title "Nearby Hauntings - What's Haunted Near You | Spookfinder", meta description
- [ ] No external APIs for distance or routing — Haversine only, straight-line distance

## User Flow
1. User clicks "Nearby" in the site header
2. `/nearby` loads and immediately requests geolocation permission
3. Browser shows location permission prompt
4. **If granted:** User's coordinates are captured, distances calculated client-side, results appear ranked by proximity
5. **If denied:** Fallback city picker appears — user selects a city, distances calculated from that city's center
6. User sees a ranked list: "#1 - Old Salem Jail - 0.3 mi", "#2 - Hawthorne Hotel - 0.8 mi", etc.
7. User clicks a place card to navigate to `/place/[slug]`
8. User clicks "Show more" to see additional results beyond the initial 25

## Not Included
- No driving/walking directions or routing
- No external geocoding APIs (city fallback uses embedded lookup table)
- No real-time location tracking or updating
- No map view (that is the Boo Map feature)
- No "dare" or gamification elements
- No sharing of results
- No distance unit toggle (miles only)
