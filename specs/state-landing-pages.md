# Feature: State Landing Pages

## Why

State pages capture high-volume searches like "haunted places in Georgia" and "Massachusetts haunted locations" - these are programmatic SEO gold.

## Requirements

- [ ] Route: `/states/[state]` (e.g., `/states/georgia`, `/states/massachusetts`)
- [ ] State hero with name, place count, featured image
- [ ] List all cities in that state with place counts
- [ ] Featured places section (3-5 most notable)
- [ ] Category breakdown for the state
- [ ] Meta tags optimized for "[State] haunted places"
- [ ] Structured data: ItemList schema
- [ ] Internal links to city pages and individual places
- [ ] Generate pages for: GA, LA, MA, PA

## User Flow

1. User searches "haunted places in Louisiana"
2. Google shows state landing page
3. User sees overview, clicks into New Orleans or a specific place
4. User explores multiple locations

## Not Included

- Interactive state map (V2)
- "Most haunted city" ranking (V2)

## Open Questions

- How to determine "featured places"? Most famous? Random rotation?
