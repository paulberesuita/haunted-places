# Feature: Individual Place Pages

## Why

Individual place pages are the SEO backbone - they capture long-tail searches like "Eastern State Penitentiary ghosts" and "LaLaurie Mansion haunted."

## Requirements

- [x] Route: `/place/[slug]` (e.g., `/place/eastern-state-penitentiary`)
- [x] Display: name, city, state, address, category badge
- [x] Display: description and full ghost story
- [x] Display: map link with Google Maps (clickable link to coordinates)
- [x] Display: year established if available
- [x] Meta tags: title, description, Open Graph for social sharing
- [x] Structured data: TouristAttraction schema with geo coordinates
- [x] Breadcrumb: Home > State > Place
- [x] Internal links: "More haunted places in [city]" section
- [x] Source attribution link at bottom

## User Flow

1. User searches "Myrtles Plantation ghost story"
2. Google shows place page in results
3. User lands on page, reads ghost story
4. User clicks "More haunted places in St. Francisville" to explore

## Not Included

- User reviews/comments (V2)
- Photo gallery (V2)
- "Report an issue" form (V2)

## Open Questions

- Map: Use static Google Maps image or embedded map?
- Should we show "nearby places" by distance?
