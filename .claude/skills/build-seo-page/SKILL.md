---
name: build-seo-page
description: Build programmatic SEO pages from data. Usage: /build-seo-page
user_invokable: true
agent: seo
---

# Build SEO Page

You've been invoked to **build a programmatic SEO page** that captures search traffic.

**Workflow:** Build SEO Page (from SEO agent)

## Page Types

| Type | URL Pattern | Minimum Data |
|------|-------------|--------------|
| **City page** | `/cities/[city-state]` | 5+ places in city |
| **Category page** | `/category/[category]` | Existing category data |
| **Top-10 list** | `/top-10/[topic]` | Curated selection |
| **Regional guide** | `/guides/[region]` | Multiple states/cities |

## Workflow

### 1. Identify Opportunity

**If no specific page requested, find opportunities:**

```bash
# Cities with 5+ places (candidates for city pages)
npx wrangler d1 execute haunted-places-db --remote --command "SELECT city, state, COUNT(*) as places FROM places GROUP BY city, state HAVING places >= 5 ORDER BY places DESC;"

# Category distribution (for category pages)
npx wrangler d1 execute haunted-places-db --remote --command "SELECT category, COUNT(*) as count FROM places GROUP BY category ORDER BY count DESC;"
```

Present findings and get user approval before proceeding.

### 2. Check Data Availability

Before building, verify we have the data:

```bash
# For city pages
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, category, image_url FROM places WHERE city = '[CITY]' AND state = '[STATE]';"
```

**If data gaps exist:**
- Run internal operations (research places, research images) to fill gaps
- Don't build pages with incomplete data

### 3. Write Spec

Create `specs/[page-type]-[name].md`:

```markdown
# [Page Name]

## URL
`/[path]`

## Purpose
[What search queries this captures, why it matters]

## Data Source
[SQL query or data requirements]

## SEO
- Title: [title tag]
- Description: [meta description]
- Structured data: [Schema.org type]

## Layout
[Description of the page layout, components to use]

## Components
[List of components from /design-system to use]
```

### 4. Load Design Standards

**Read these before building:**
- `/design-system` — Colors, components, typography
- `/coding-standards` — API patterns, D1/R2 usage

### 5. Build Cloudflare Pages Function

Create `functions/[path]/[[slug]].js` following patterns from existing functions:

```javascript
export async function onRequest(context) {
  const { env } = context;

  // Query D1
  const { results } = await env.DB.prepare(/* SQL */).all();

  // Render HTML with SEO
  return new Response(renderPage(results), {
    headers: { 'Content-Type': 'text/html' }
  });
}

function renderPage(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${/* SEO title */}</title>
  <meta name="description" content="${/* SEO description */}">

  <!-- Open Graph -->
  <meta property="og:title" content="${/* title */}">
  <meta property="og:description" content="${/* description */}">
  <meta property="og:type" content="website">

  <!-- Structured Data -->
  <script type="application/ld+json">
  ${/* Schema.org JSON-LD */}
  </script>

  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${/* page content */}
</body>
</html>`;
}
```

### 6. Add SEO Elements

**Required for every page:**

- [ ] Title tag (unique, keyword-rich, <60 chars)
- [ ] Meta description (compelling, <160 chars)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter card tags
- [ ] Canonical URL
- [ ] Structured data (Schema.org JSON-LD)
- [ ] Internal links to related pages
- [ ] Semantic HTML (h1, article, nav)

**Structured Data Types:**
- City/Category pages → `ItemList`
- Individual places → `TouristAttraction` or `LocalBusiness`
- Top-10 lists → `ItemList` with `ListItem`

### 7. Deploy

```bash
wrangler pages deploy ./public --project-name=spookfinder
```

### 8. Verify

- [ ] Page loads at production URL
- [ ] Mobile-friendly
- [ ] No JavaScript errors
- [ ] Images load (if applicable)
- [ ] Internal links work

### 9. Update Documentation

- **CHANGELOG.md** — "Added: [page type] for [name]"
- **CONTEXT.md** — SEO rationale, data requirements, lessons learned

## Internal Operations Available

These can be triggered if data gaps are found:

- **Research places** — Find more locations for a city/state
- **Research images** — Add images to places without them
- **Verify data** — Check data quality before building
- **Query data** — Explore what data is available

## Remember

- Read `/design-system` before building any UI
- Don't build pages without sufficient data
- All pages need proper SEO elements
- Test on mobile before deploying
- Update CHANGELOG.md and CONTEXT.md when done
