# Feature: The Follower

## Why
Rewards repeat visitors with a creeping sense of being followed — a dark figure that grows more visible the more place pages they visit in a session.

## Requirements
- [ ] Track place page visits in sessionStorage (increment a counter each visit)
- [ ] After 3+ place page visits: render a dark silhouette (CSS shape, absolute positioned far right of header area)
- [ ] Silhouette opacity starts at 5%, increases by 3% per additional visit, caps at 15%
- [ ] Silhouette shape: simple dark humanoid figure using CSS (pseudo-elements or clip-path)
- [ ] If user hovers the silhouette: vanish with brief red flash (#e94560), show tooltip "It was watching you."
- [ ] After hover/dismiss: set sessionStorage flag so it does not return for the rest of the session
- [ ] Only appears on place detail pages

## User Flow
1. User visits their 1st, 2nd place page — nothing happens
2. User visits 3rd place page — a barely-visible dark silhouette appears at the far right of the header
3. Each subsequent visit — silhouette grows slightly more visible (5% → 8% → 11% → ... → 15% max)
4. User notices and hovers it — red flash, tooltip "It was watching you.", silhouette disappears permanently for the session

## Not Included
- Silhouette animation or movement
- Multiple silhouettes
- Cross-session persistence (localStorage)
- Any effect on non-place pages
