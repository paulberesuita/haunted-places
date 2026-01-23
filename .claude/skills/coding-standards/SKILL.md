---
name: coding-standards
description: Load API patterns, D1/R2 usage, SSR patterns. Usage: /coding-standards
user_invokable: true
---

# Coding Standards

Technical patterns for Spookfinder on Cloudflare Pages.

## Project Structure

```
/
├── public/             # Static assets (JS, CSS, icons — NOT HTML pages)
├── functions/          # Cloudflare Pages Functions (SSR + API)
│   ├── index.js        # GET / (homepage)
│   ├── about.js        # GET /about
│   ├── states/
│   │   └── [[slug]].js # GET /states AND /states/[slug]
│   ├── place/
│   │   └── [[slug]].js # GET /place/[slug]
│   ├── images/
│   │   └── [[path]].js # GET /images/* (R2 proxy)
│   └── api/            # JSON API endpoints
├── migrations/         # SQL migrations (numbered)
├── scripts/            # Seed SQL scripts
├── specs/              # Feature specifications
└── wrangler.toml       # Cloudflare config
```

## Bindings

| Binding | Type | Name | Usage |
|---------|------|------|-------|
| `env.DB` | D1 | `haunted-places-db` | SQLite database |
| `env.IMAGES` | R2 | `haunted-places-images` | Place photos |

## SSR Page Pattern

All pages are **server-side rendered**. Functions return full HTML responses with data from D1. No static HTML files for routes.

```javascript
// functions/my-page.js

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderPage(data, baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.title)} | Spookfinder</title>

  <!-- Fonts & Tailwind -->
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Creepster&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
          colors: {
            'dark': '#0a0a0f',
            'dark-card': '#1a1a2e',
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
</head>
<body class="bg-dark text-ghost min-h-screen font-sans">
  <!-- Content here -->
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM places WHERE state = ? ORDER BY name'
    ).bind('CA').all();

    const html = renderPage({ title: 'California' }, baseUrl);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error loading page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
```

## Routing Gotcha: [[slug]].js Priority

**CRITICAL:** When `[[slug]].js` exists in a directory, it handles ALL requests — including the bare path. An `index.js` in the same directory is NEVER called.

```
functions/states/
├── index.js        # DEAD — never invoked
└── [[slug]].js     # Handles /states AND /states/california
```

In `[[slug]].js`, check for the bare path:
```javascript
export async function onRequestGet(context) {
  const { params } = context;
  const slug = params.slug?.[0]; // undefined for /states, "california" for /states/california

  if (!slug) {
    return renderIndexPage(context);
  }
  return renderDetailPage(context, slug);
}
```

## API Route Pattern

```javascript
// functions/api/items.js
export async function onRequestOptions() {
  return new Response(null, {
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET' }
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM places ORDER BY name LIMIT ?'
    ).bind(50).all();

    return Response.json(results, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Request failed' }, { status: 500 });
  }
}
```

## D1 Database Patterns

```javascript
// Single record
const place = await env.DB.prepare(
  'SELECT * FROM places WHERE slug = ?'
).bind(slug).first();

// Multiple records
const { results } = await env.DB.prepare(
  'SELECT * FROM places WHERE state = ? ORDER BY name'
).bind(stateCode).all();

// Aggregation
const { results: states } = await env.DB.prepare(
  'SELECT state, COUNT(*) as place_count FROM places GROUP BY state ORDER BY state'
).all();
```

## R2 Image Serving

Images are served through a Pages Function proxy, not directly from R2:

```javascript
// functions/images/[[path]].js
export async function onRequestGet(context) {
  const { env, params } = context;
  const key = params.path.join('/'); // e.g., "places/eastern-state-penitentiary.jpg"

  const object = await env.IMAGES.get(key);
  if (!object) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
  });
}
```

**Image URL pattern:** `/images/places/[slug].jpg`

## State Mappings

Every SSR page that references states uses these mappings (duplicated in each function):

```javascript
const stateNames = { 'CA': 'California', 'FL': 'Florida', ... };
const stateUrls = { 'CA': 'california', 'FL': 'florida', 'NY': 'new-york', ... };
```

When adding a new state, update these mappings in ALL SSR functions.

## Security Rules

1. **Always escape HTML** — Use `escapeHtml()` for any user/database content rendered in templates
2. **Use prepared statements** — `env.DB.prepare('...').bind(value)` — never string concatenation
3. **Log errors** — `console.error()` before returning error responses
4. **Cache public pages** — `Cache-Control: public, max-age=300` for HTML, `max-age=31536000` for images
5. **CORS on API only** — Add `Access-Control-Allow-Origin: *` to `/api/` endpoints only
