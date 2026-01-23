---
name: design-system
description: Load UI guidance - colors, typography, components. Usage: /design-system
user_invokable: true
---

# Design System

Dark, spooky but modern aesthetic. Tailwind CSS CDN with custom colors. No gradients.

## Setup

Add to `<head>` in every SSR function:

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Creepster&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          'dark': '#0a0a0f',
          'dark-card': '#141419',
          'dark-border': '#2a2a35',
          'accent': '#e94560',
          'accent-hover': '#ff6b6b',
          'muted': '#6b7280',
          'ghost': '#9ca3af',
        }
      }
    }
  }
</script>
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `dark` | `#0a0a0f` | Page background (`bg-dark`) |
| `dark-card` | `#141419` | Card/section backgrounds |
| `dark-border` | `#2a2a35` | Borders, dividers |
| `accent` | `#e94560` | Primary action, links, highlights |
| `accent-hover` | `#ff6b6b` | Hover state for accent |
| `muted` | `#6b7280` | Secondary text, labels |
| `ghost` | `#9ca3af` | Tertiary text, navigation links |

**Note:** Use `#141419` for `dark-card` on all new pages (matches place detail pages).

## Typography

| Element | Classes | Font |
|---------|---------|------|
| Site name | `text-2xl tracking-widest` + `font-family: 'Bebas Neue'` | Bebas Neue |
| H1 (hero) | `font-['Bebas_Neue'] text-5xl md:text-7xl text-white` | Bebas Neue |
| H2 | `text-2xl font-semibold text-white` | Inter |
| H3 | `text-xl font-semibold text-white` | Inter |
| Body | `text-base text-ghost` | Inter |
| Helper | `text-sm text-muted` | Inter |

## Page Layout

All pages use a dark background with white/ghost text:

```html
<body class="bg-dark text-gray-100 min-h-screen font-sans">
  <!-- Header -->
  <header class="border-b border-dark-border">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="hover:text-white transition-colors">States</a>
        <a href="/tours" class="hover:text-white transition-colors">Tours</a>
        <a href="/about" class="hover:text-white transition-colors">About</a>
      </nav>
    </div>
  </header>

  <!-- Content -->
  <main class="max-w-7xl mx-auto px-4 py-8">
    ...
  </main>
</body>
```

## Components

### Place Card

No borders on cards. Use background color contrast and shadow glow on hover.

```html
<a href="/place/${slug}" class="group block bg-dark-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
  <!-- Image (grayscale filter) -->
  <div class="aspect-[4/3] overflow-hidden">
    <img src="/images/${image_url}" alt="${name}"
      class="place-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <!-- Info -->
  <div class="p-4">
    <h3 class="font-semibold text-white group-hover:text-accent transition-colors">${name}</h3>
    <p class="text-sm text-muted mt-1">${city}, ${state}</p>
  </div>
</a>
```

### Category Pill

```html
<span class="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
  ${category}
</span>
```

### State Filter Bar

```html
<div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
  <a href="/states/${url}" class="text-ghost hover:text-white transition-colors whitespace-nowrap">
    ${stateName}
  </a>
  <!-- Active state -->
  <a href="/states/${url}" class="text-white transition-colors whitespace-nowrap">
    ${activeStateName}
  </a>
</div>
```

### Ghost Emoji Placeholder (no image)

```html
<div class="aspect-[4/3] bg-gradient-to-br from-dark-card to-dark flex items-center justify-center">
  <span class="text-4xl opacity-30">👻</span>
</div>
```

## Images

- Served from R2 via `/images/places/[slug].jpg`
- Cards use `aspect-[4/3]` with `object-cover`
- **Grayscale filter** on all place images (adds to spooky vibe):
  ```css
  .place-img {
    filter: grayscale(70%);
    transition: filter 0.5s ease;
  }
  .place-img:hover, .place-card:hover .place-img {
    filter: grayscale(70%) sepia(20%) brightness(0.9);
  }
  ```
- Hero images use full-width with dark gradient overlay for text readability
- Lazy loading: `loading="lazy"` on card images
- Error handling: hide broken images gracefully

## Rules

1. **Dark theme only** — `bg-dark` page background, `text-gray-100` body text
2. **No borders on cards** — Use background color contrast (`bg-dark-card` on `bg-dark`) and `hover:shadow-lg hover:shadow-accent/10` for depth
3. **Grayscale images** — All place images use `place-img` class with grayscale filter
4. **Use custom color tokens** — `accent`, `ghost`, `muted`, `dark-card`, `dark-border`
5. **Mobile-first** — Base is mobile, `md:` for desktop
6. **Every list needs a ghost emoji placeholder** for items without images
7. **SSR everything** — All content in HTML, no client-side skeleton loaders
8. **Images first** — Sort lists to show places with images before those without
9. **Gradients only for overlays** — Image gradient overlays for text readability are fine, no decorative background gradients
