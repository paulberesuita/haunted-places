# Feature: The Watcher

## Why
Adds an unsettling ambient detail to place pages — glowing eyes that follow your cursor create a "being watched" feeling.

## Requirements
- [x] Faint glowing red eyes (#e94560 at 15% opacity) appear in page margins on place detail pages
- [x] Eyes track cursor position with slow, delayed movement (CSS transition or requestAnimationFrame throttled)
- [x] If cursor stops for 5+ seconds, eyes blink (opacity briefly drops to 0)
- [x] If cursor moves toward the eyes, they vanish and reappear at a different margin position
- [x] Purely CSS for the eye shapes + minimal JS for mouse tracking
- [x] Eyes positioned using absolute/fixed positioning in margin areas (not overlapping content)

## User Flow
1. User visits a place detail page
2. After a few seconds, faint red eyes fade in at a random margin position
3. As user moves cursor, eyes slowly track the movement
4. User stops moving — after 5s, eyes blink
5. User moves cursor toward eyes — they vanish, reappear elsewhere

## Not Included
- Sound effects
- Multiple pairs of eyes
- Any interaction beyond cursor tracking
