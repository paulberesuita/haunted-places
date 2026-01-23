# Feature: Cold Spot

## Why
Simulates the paranormal "cold spot" phenomenon — an invisible zone on place pages that reveals a frost effect when your cursor passes through it.

## Requirements
- [ ] On place detail pages, calculate a deterministic "cold spot" position from place.id (e.g., hash id to get x/y percentages)
- [ ] Cold spot is a 150x150px invisible zone on the page
- [ ] Cursor entering the zone: radial white gradient fades in (frost effect), opacity ~20%
- [ ] Cursor hovers 3+ seconds in zone: tiny white particle dots float upward from cursor position (CSS keyframe animation)
- [ ] Apply backdrop-filter: blur(1px) momentarily within the zone
- [ ] Effect fully resets after cursor leaves the zone
- [ ] Position must not overlap critical content (keep within content margins)

## User Flow
1. User browses a place detail page
2. Cursor unknowingly enters the cold spot zone
3. A faint white frost gradient fades in around the cursor
4. If they linger 3+ seconds, small white particles float upward
5. Slight blur effect on content behind the frost
6. Moving cursor out of zone — everything fades away

## Not Included
- Temperature text or thermometer UI
- Sound effects
- Multiple cold spots per page
- Cursor style changes
