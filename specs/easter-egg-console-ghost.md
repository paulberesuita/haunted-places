# Feature: Ghost in the Console

## Why
Rewards curious developers who open DevTools with a spooky sequence of styled messages.

## Requirements
- [ ] On any page load, output styled console.log messages with delays
- [ ] Sequence: "You shouldn't be here." (after 3s) → "We see you." (after 3s more) → "Close this. Now." (red text, after 3s more)
- [ ] Use %c formatting for CSS styling in console.log (white/gray text, monospace, large font)
- [ ] Final message styled in red (#e94560)
- [ ] Fires once per session — set sessionStorage flag after first run
- [ ] Include in shared layout JS (all pages)

## User Flow
1. User opens browser DevTools console on any page
2. After 3s: "You shouldn't be here." appears in styled white text
3. After 6s: "We see you." appears
4. After 9s: "Close this. Now." appears in red
5. Subsequent page loads in same session — no messages

## Not Included
- Interactive console commands
- ASCII art
- Anything that interferes with actual debugging
