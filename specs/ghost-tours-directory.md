# Feature: Ghost Tours Directory

## Why
Surface the 111 tour operators already in the database so users searching for ghost tours in specific cities can find and book them — while discovering nearby haunted places.

## Requirements
- [ ] Route at `/tours` via `functions/tours/[[slug]].js` (handles both index and city pages)
- [ ] **Index page** (`/tours`) shows all 21 cities with tour operators, as a card grid
  - Each city card shows: city name, state, number of operators, and a "View Tours" link
  - Sorted alphabetically by city name
- [ ] **City page** (`/tours/[city-slug]`) shows all operators in that city
  - City slug format: `savannah-ga`, `new-orleans-la` (city + state abbrev, lowercased, hyphenated)
  - Each operator card shows: name, description (truncated), price_range, tour_types badges, "Book Now" button (links to booking_url or website)
  - Below operators: "Haunted Places in [City]" section showing places from the same city (query `places` table by city + state match)
- [ ] Link to `/tours` added to site-wide header navigation
- [ ] On place detail pages (`/place/[slug]`): if tour operators exist in the same city, show a "Ghost Tours in [City]" callout linking to the city tours page
- [ ] On state pages (`/states/[slug]`): if tour operators exist in that state, show a "Ghost Tours" section with links to city pages
- [ ] SEO: JSON-LD LocalBusiness structured data for each operator on city pages
- [ ] SEO: title/meta description for both index and city pages
- [ ] Mobile responsive card grid (1 col mobile, 2 col tablet, 3 col desktop)

## Data
Uses existing `tour_operators` table:
- `name`, `city`, `state` — display and routing
- `website`, `booking_url` — CTA links (prefer booking_url, fall back to website)
- `description` — card text
- `price_range` — display as badge (e.g., "$20-40")
- `tour_types` — comma-separated string, display as tags
- `image_url` — card image (if available)
- `featured` — future use for highlighting top picks

Cross-references `places` table by matching `city` + `state`.

## User Flow
1. User clicks "Tours" in site header (from any page)
2. `/tours` loads showing a grid of cities that have ghost tours
3. User clicks a city (e.g., "Savannah, GA")
4. `/tours/savannah-ga` loads showing all tour operators in Savannah
5. User sees operator cards with descriptions, prices, and booking buttons
6. User scrolls down to see haunted places in Savannah
7. User clicks "Book Now" on an operator (opens external site in new tab)

## Not Included
- No reviews or ratings for operators
- No booking integration (links to external sites only)
- No filtering by tour type or price on the index page
- No "featured" operator highlighting (data exists but not used in v1)
- No operator detail pages (each operator is a card, not a full page)
- No map view of operators
