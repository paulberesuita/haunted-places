# Feature: City Pages

## Why

City pages capture searches like "haunted places in Savannah" and "New Orleans ghost tours locations" - cities are often the primary search intent.

## Requirements

- [ ] Route: `/states/[state]/[city]` (e.g., `/states/georgia/savannah`)
- [ ] City hero with name, state, place count
- [ ] List all haunted places in the city
- [ ] Group by category (hotels, restaurants, mansions, etc.)
- [ ] Map showing all locations in city
- [ ] Meta tags optimized for "haunted places in [City]"
- [ ] Structured data: ItemList schema
- [ ] Breadcrumb: Home > State > City
- [ ] Internal links back to state page

## User Flow

1. User searches "Gettysburg haunted places"
2. Google shows city page
3. User sees all 15 Gettysburg locations grouped by type
4. User clicks into Devil's Den or Pennsylvania Hall

## Not Included

- Walking tour route generator (V2)
- "Best time to visit" info (V2)

## Open Questions

- City slug format: lowercase with hyphens (new-orleans)?
- How to handle cities that exist in multiple states?
