# Feature: Gravestone 404

## Why
Transforms the boring 404 page into a memorable, thematic dead-end that fits the haunted brand.

## Requirements
- [ ] Update existing 404 renderers: `render404Page` in place/[[slug]].js and `render404` in tours/[[slug]].js
- [ ] CSS-drawn tombstone shape (rounded top rectangle, gray gradient, darker base)
- [ ] URL slug parsed as epitaph: `john-smith` → "Here Lies John Smith" (split on hyphens, title case)
- [ ] Epitaph displayed as engraved text on the tombstone
- [ ] Subtle parallax tilt on mouse move (transform: perspective(600px) rotateX/rotateY based on cursor position)
- [ ] Keep existing "Return to Directory" CTA button below the tombstone
- [ ] Use design system colors for background and text

## User Flow
1. User navigates to a non-existent place or tour URL
2. Page shows a CSS tombstone with the slug rendered as an epitaph
3. User moves mouse — tombstone subtly tilts in 3D
4. "Return to Directory" link takes them back to /states

## Not Included
- Animated dirt/grass around the tombstone
- Sound effects
- Different tombstone styles
