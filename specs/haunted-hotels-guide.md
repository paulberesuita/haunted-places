# Feature: Haunted Hotels Guide

## Why
Give visitors a dedicated page to find haunted hotels they can actually stay at — turning Spookfinder from a reading experience into a trip-planning tool.

## Requirements
- [ ] Route at `/hotels` via `functions/hotels.js` (server-side rendered)
- [ ] Query all places where `category` matches hotel-type values (e.g., "Hotel", "Inn", "Bed and Breakfast", "Resort")
- [ ] **Hero section** with tagline: "Sleep With Ghosts" or similar, count of haunted hotels
- [ ] **Filter bar**: filter by state (dropdown of states that have haunted hotels)
- [ ] **Hotel cards grid** showing:
  - Place name
  - City, State
  - Hero image from R2 (if available)
  - Category badge (Hotel, Inn, B&B, etc.)
  - Short excerpt from ghost_story (first ~150 chars)
  - "Scariest detail" pull-quote if extractable (see below)
  - Link to full `/place/[slug]` page
- [ ] **State filtering** works client-side (all hotels loaded in SSR, JS filters the grid)
- [ ] Sort options: by state (A-Z), by name (A-Z)
- [ ] Link to `/hotels` added to site-wide header navigation
- [ ] SEO: title "Haunted Hotels - Stay at America's Most Haunted | Spookfinder"
- [ ] SEO: meta description referencing number of haunted hotels
- [ ] Mobile responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

## Scariest Detail Extraction
For v1, use a simple approach:
- Look for sentences in `ghost_story` containing keywords: "room", "floor", "suite", "wing", "corridor", "basement", "attic"
- Extract the first matching sentence as the "scariest detail" pull-quote
- Display in a distinct visual style (italic, with a ghost icon or red accent)
- If no match found, skip the pull-quote for that hotel

## Data
Uses existing `places` table filtered by category:
- `name`, `city`, `state` — display and filtering
- `slug` — link to detail page
- `category` — filter for hotel-type places
- `ghost_story` — excerpt and scariest-detail extraction
- `latitude`, `longitude` — available for future map integration

Images from R2 at path: `states/[state]/[slug].jpg`

## User Flow
1. User clicks "Hotels" in site header (from any page)
2. `/hotels` loads showing all haunted hotels across America
3. User optionally selects a state from the filter dropdown
4. Grid filters to show only hotels in that state
5. User reads card excerpts and scariest-detail quotes
6. User clicks a hotel card to visit the full place page at `/place/[slug]`

## Not Included
- No booking links or price information (we don't have this data)
- No "book now" integration with hotel booking sites
- No user reviews or "I stayed here" functionality
- No room-specific pages or floor plans
- No map view of hotels
- No "nearby haunted places" on this page (that's on the place detail page already)
