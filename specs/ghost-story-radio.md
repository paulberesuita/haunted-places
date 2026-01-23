# Feature: Ghost Story Radio

## Why
Give visitors an ambient, atmospheric way to experience ghost stories — a "lo-fi beats to haunt to" page that reads stories aloud over layered spooky audio with a slow image slideshow.

## Requirements
- [ ] Route at `/radio` via `functions/radio.js` (server-side rendered)
- [ ] Load all places with ghost stories and images from D1, embed as JSON in SSR HTML
- [ ] Web Speech API (SpeechSynthesis) reads ghost stories aloud — no pre-generated audio
- [ ] Select a low-pitched, slower voice from available system voices
- [ ] Ambient audio layers: rain, wind, creaking — looped and mixed underneath narration
- [ ] Host ambient audio files on R2 (3-4 short loops, MP3 format, sourced from free/CC0 libraries)
- [ ] Slow crossfade slideshow of place images behind the player (8-10 second intervals)
- [ ] Images use the standard 70% grayscale filter
- [ ] Player controls: play/pause, skip to next story, ambient volume slider, narration volume slider
- [ ] Display current place name, city/state, and story text (scrolling or highlighted as read)
- [ ] Auto-advance to next story when current narration finishes
- [ ] Shuffle order of stories on page load (not alphabetical)
- [ ] Minimal header bar at top (site logo/name + navigation)
- [ ] "Radio" link added to site-wide header navigation
- [ ] Mobile friendly: controls accessible, works in foreground (background playback is browser-dependent)
- [ ] SEO: title "Ghost Story Radio - Haunted Tales on Demand | Spookfinder", meta description
- [ ] Fallback if Web Speech API unavailable: show story text only with ambient audio and slideshow

## User Flow
1. User clicks "Radio" in the site header
2. `/radio` loads with a dark ambient player interface, paused by default
3. User clicks play
4. Ambient audio fades in (rain + wind loop)
5. After 2 seconds, narration begins reading the first ghost story
6. Background image crossfades between place photos during narration
7. Current place name and story text are visible on screen
8. When story ends, 3-second pause, then next story begins automatically
9. User can skip stories, adjust volumes independently, or pause everything
10. User can click the place name to navigate to `/place/[slug]`

## Not Included
- No pre-generated TTS audio files (Web Speech API only)
- No user-selectable playlists or story queues
- No background playback guarantees (browser-dependent)
- No state/category filters on the radio page
- No sharing or "now playing" social features
- No music — ambient sounds only (rain, wind, creaking)
- No playback speed controls
