---
name: optimize-seo
description: Improve technical SEO and on-page optimization. Usage: /optimize-seo
user_invokable: true
agent: seo
---

# Optimize SEO

You've been invoked to **optimize SEO** — improving technical SEO and on-page elements.

**Workflow:** Optimize SEO (from SEO agent)

## What This Covers

| Area | Elements |
|------|----------|
| **Meta tags** | Title, description, Open Graph, Twitter cards |
| **Structured data** | Schema.org JSON-LD |
| **Sitemap** | XML sitemap generation |
| **Internal linking** | Links between related pages |
| **Canonical URLs** | Preventing duplicate content |
| **Page speed** | Performance optimization |

## Workflow

### 1. Audit Current State

**Check meta tags:**
```bash
# Fetch a page and check for meta tags
curl -s https://spookfinder.com/ | grep -E '<title>|<meta name="description"|<meta property="og:'
curl -s https://spookfinder.com/states/georgia | grep -E '<title>|<meta name="description"|<meta property="og:'
curl -s https://spookfinder.com/place/[slug] | grep -E '<title>|<meta name="description"|<meta property="og:'
```

**Check structured data:**
```bash
# Look for JSON-LD
curl -s https://spookfinder.com/place/[slug] | grep -o '<script type="application/ld+json">.*</script>'
```

**Check sitemap:**
```bash
curl -s https://spookfinder.com/sitemap.xml
```

**Check robots.txt:**
```bash
curl -s https://spookfinder.com/robots.txt
```

**Check page speed:**
- Use Lighthouse in Chrome DevTools
- Or: `npx lighthouse https://spookfinder.com --output=json --quiet`

### 2. Identify Gaps

Create a checklist of what's missing:

```markdown
## SEO Audit Results

### Meta Tags
- [ ] Homepage title — [status]
- [ ] Homepage description — [status]
- [ ] State pages title — [status]
- [ ] State pages description — [status]
- [ ] Place pages title — [status]
- [ ] Place pages description — [status]

### Open Graph
- [ ] og:title — [status]
- [ ] og:description — [status]
- [ ] og:image — [status]
- [ ] og:type — [status]

### Twitter Cards
- [ ] twitter:card — [status]
- [ ] twitter:title — [status]
- [ ] twitter:description — [status]
- [ ] twitter:image — [status]

### Structured Data
- [ ] Homepage — [ItemList of states?]
- [ ] State pages — [ItemList of places]
- [ ] Place pages — [TouristAttraction]

### Technical
- [ ] sitemap.xml — [exists? includes all pages?]
- [ ] robots.txt — [exists? correct?]
- [ ] Canonical URLs — [set on all pages?]

### Page Speed
- [ ] LCP (Largest Contentful Paint) — [score]
- [ ] FID (First Input Delay) — [score]
- [ ] CLS (Cumulative Layout Shift) — [score]
```

### 3. Prioritize Fixes

**High priority (do first):**
- Missing or duplicate title tags
- Missing meta descriptions
- Missing structured data on place pages
- No sitemap

**Medium priority:**
- Open Graph / Twitter cards
- Internal linking improvements
- Canonical URLs

**Low priority:**
- Minor page speed improvements
- Schema.org enhancements

### 4. Load Coding Standards

**Read before making changes:**
- `/coding-standards` — Code patterns for Cloudflare Functions

### 5. Implement Fixes

**For meta tags (in Cloudflare Functions):**
```javascript
function renderHead({ title, description, url, image }) {
  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">

    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${image}">
    <meta property="og:type" content="website">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
  `;
}
```

**For structured data (place pages):**
```javascript
function renderStructuredData(place) {
  return `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "${place.name}",
      "description": "${place.description}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${place.address}",
        "addressLocality": "${place.city}",
        "addressRegion": "${place.state}",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": ${place.latitude},
        "longitude": ${place.longitude}
      },
      "image": "https://spookfinder.com/images/${place.image_url}"
    }
    </script>
  `;
}
```

**For sitemap (create sitemap function):**
```javascript
// functions/sitemap.xml.js
export async function onRequest(context) {
  const { env } = context;

  // Get all places
  const { results: places } = await env.DB.prepare(
    'SELECT slug, state FROM places'
  ).all();

  // Get unique states
  const states = [...new Set(places.map(p => p.state.toLowerCase()))];

  const urls = [
    'https://spookfinder.com/',
    'https://spookfinder.com/states',
    ...states.map(s => `https://spookfinder.com/states/${s}`),
    ...places.map(p => `https://spookfinder.com/place/${p.slug}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
```

**For robots.txt:**
```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://spookfinder.com/sitemap.xml
```

### 6. Deploy

```bash
wrangler pages deploy ./public --project-name=spookfinder
```

### 7. Verify

**Test structured data:**
- https://search.google.com/test/rich-results (paste URL)
- https://validator.schema.org/ (paste markup)

**Test Open Graph:**
- https://cards-dev.twitter.com/validator (for Twitter cards)
- Facebook Sharing Debugger (for OG tags)

**Test sitemap:**
```bash
curl -s https://spookfinder.com/sitemap.xml | head -20
```

**Check in Google Search Console:**
- Submit sitemap
- Check for indexing issues
- Request indexing for new pages

### 8. Update Documentation

- **CHANGELOG.md** — "Fixed: [SEO element] on [pages]"
- **CONTEXT.md** — SEO strategy decisions, verification results

## SEO Checklists by Page Type

### Homepage
- [ ] Title: "SpookFinder — Discover Haunted Places Across America"
- [ ] Description: Compelling, <160 chars, includes key terms
- [ ] Structured data: WebSite or Organization
- [ ] Internal links to state pages

### State Pages (/states/[state])
- [ ] Title: "Haunted Places in [State] | SpookFinder"
- [ ] Description: "[Number] haunted locations in [State]..."
- [ ] Structured data: ItemList of places
- [ ] Internal links to place pages

### Place Pages (/place/[slug])
- [ ] Title: "[Place Name] — [City], [State] | SpookFinder"
- [ ] Description: First ~150 chars of description
- [ ] Structured data: TouristAttraction
- [ ] Image with alt text
- [ ] Internal links to other places in same city/state

## Remember

- Verify changes with Google's testing tools
- Submit sitemap to Google Search Console
- Changes may take days/weeks to reflect in search results
- Read `/coding-standards` before modifying functions
- Update CHANGELOG.md and CONTEXT.md when done
