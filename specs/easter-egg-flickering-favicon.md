# Feature: The Flickering Favicon

## Why
A subtle browser-chrome-level scare — the tab icon briefly flickers to a skull, just enough to make users double-take.

## Requirements
- [ ] On all pages, after 30 seconds of page load, start a random timer (45-90s interval)
- [ ] When timer fires: swap favicon to a skull SVG data URI for 2-3 seconds, then restore original
- [ ] Skull SVG: simple white skull on transparent background, as an inline data URI
- [ ] Only trigger when page is visible (check document.visibilityState === 'visible')
- [ ] Pause timer when tab is hidden, resume when visible again
- [ ] Include in shared layout JS (all pages)

## User Flow
1. User is browsing any page
2. After 30s+ of being on the page, at a random moment the favicon briefly becomes a skull
3. 2-3 seconds later, it reverts to normal
4. Repeats at random intervals (45-90s) as long as the tab is active

## Not Included
- Tab title text changes
- Multiple favicon variants
- User-facing controls to disable
