# Feature: Category Pages

## Why

Category pages capture niche searches like "haunted hotels" and "haunted battlefields" - these differentiate from competitors who organize only by location.

## Requirements

- [ ] Route: `/categories/[category]` (e.g., `/categories/hotel`, `/categories/plantation`)
- [ ] Category hero with name, description, place count
- [ ] List all places in that category across all states
- [ ] Group by state for easy scanning
- [ ] Category descriptions for SEO content
- [ ] Meta tags optimized for "haunted [category]s in America"
- [ ] Structured data: ItemList schema
- [ ] Categories to generate: hotel, mansion, restaurant, cemetery, battlefield, prison, hospital, theater, plantation, museum, other

## User Flow

1. User searches "haunted prisons to visit"
2. Google shows category page for prisons
3. User sees Eastern State Penitentiary, Old Jail, etc.
4. User clicks into a specific prison

## Not Included

- Category images/icons (keep simple for MVP)
- "Most haunted in category" ranking (V2)

## Open Questions

- Should "other" category be shown or split into subcategories?
- Category descriptions: write unique content or auto-generate?
