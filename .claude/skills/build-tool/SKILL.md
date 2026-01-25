---
name: build-tool
description: Build fun, interactive mini-tools. Usage: /build-tool
user_invokable: true
agent: mini-apps
---

# Build Tool

You've been invoked to **build a fun, interactive mini-tool** related to the haunted/spooky theme.

**Workflow:** Build Tool (from mini-apps agent)

## Tool Philosophy

Great tools are:
- **Useful** — Solve a real problem people have
- **Shareable** — Results worth showing others
- **Embeddable** — Easy to link to or share on social
- **Fast** — Instant results, no friction

## Tool Ideas

| Tool | What it does | Traffic driver |
|------|--------------|----------------|
| **"How haunted is your town?"** | Enter city, get spookiness score | Local pride, shareable results |
| **Haunted road trip planner** | Route between haunted spots | Practical utility, bookmarkable |
| **Ghost tour finder** | Find tours near you | Leads to tour operator partnerships |
| **Scare compatibility quiz** | "Which haunted place matches you?" | Viral quiz potential |
| **Paranormal activity calendar** | Peak haunting times, seasonal events | Timely relevance, repeat visits |

## Workflow

### 1. Validate Idea

Before building, answer these:

- [ ] **Is it useful?** — Does it solve a real problem or satisfy curiosity?
- [ ] **Will people share it?** — Is the output interesting to show others?
- [ ] **Is it searchable?** — What queries would lead here?
- [ ] **Can we build it?** — Do we have the data/capability?

**If a specific tool wasn't requested:**
Present tool ideas and get user approval.

### 2. Define Input/Output

```markdown
## [Tool Name]

**Input:** [What the user provides]
**Output:** [What they get back]
**Share hooks:** [How they share results]

Example:
- User enters: "Austin, TX"
- Tool returns: "Spookiness Score: 87/100 — 12 haunted locations, 3 active ghost tours"
- Share: Twitter card with score, shareable link with pre-filled city
```

### 3. Write Spec

Create `specs/tool-[name].md`:

```markdown
# [Tool Name]

## Purpose
[What problem it solves, why people will use it]

## User Flow
1. [Step 1]
2. [Step 2]
3. [Result]

## Data Required
[SQL queries or external APIs needed]

## Share Mechanics
- Twitter card: [what it shows]
- Embed: [how others can embed]
- URL structure: [/tool/name?city=austin-tx]

## SEO
- Title: [title tag]
- Description: [meta description]
- Landing page content: [text around the tool for SEO]
```

### 4. Load Design Standards

**Read before building:**
- `/design-system` — Colors, components, typography
- `/coding-standards` — API patterns, D1/R2 usage

### 5. Build the Tool

**Structure:**
```
functions/
  tools/
    [tool-name].js          # API endpoint (if needed)
public/
  tools/
    [tool-name]/
      index.html            # Tool page (or use function to render)
```

**For client-side tools:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>[Tool Name] | SpookFinder</title>
  <meta name="description" content="[Description]">

  <!-- Share cards -->
  <meta property="og:title" content="[Tool Name]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="[Tool preview image]">
  <meta name="twitter:card" content="summary_large_image">

  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Tool UI -->
  <main>
    <h1>[Tool Name]</h1>
    <form id="tool-form">
      <!-- Input fields -->
    </form>
    <div id="results"></div>
  </main>

  <!-- SEO content (below the fold) -->
  <article>
    <h2>About this tool</h2>
    <p>[SEO content explaining the tool, how it works, etc.]</p>
  </article>

  <script>
    // Tool logic
  </script>
</body>
</html>
```

**For server-side tools:**
```javascript
// functions/tools/[name].js
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const city = url.searchParams.get('city');

  // Query D1 for data
  const { results } = await env.DB.prepare(/* SQL */).all();

  // Return results (HTML page or JSON API)
  return new Response(renderToolPage(results), {
    headers: { 'Content-Type': 'text/html' }
  });
}
```

### 6. Add Share Hooks

**Twitter/X sharing:**
```javascript
function shareOnTwitter(result) {
  const text = encodeURIComponent(`My city's spookiness score: ${result.score}/100`);
  const url = encodeURIComponent(`https://spookfinder.com/tools/spookiness?city=${result.city}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
}
```

**Shareable URL with state:**
```javascript
// Update URL as user interacts
function updateShareableUrl(params) {
  const url = new URL(window.location);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  history.replaceState({}, '', url);
}

// Read state from URL on load
const params = new URLSearchParams(window.location.search);
if (params.get('city')) {
  runTool(params.get('city'));
}
```

**Open Graph dynamic images (optional, advanced):**
- Use a function to generate OG images with results
- `og:image` points to `/api/og/[tool]?city=austin`

### 7. Deploy

```bash
wrangler pages deploy ./public --project-name=spookfinder
```

### 8. Verify

- [ ] Tool works end-to-end
- [ ] Results are accurate
- [ ] Share button works
- [ ] Shareable URL works (copy link, open in incognito)
- [ ] Mobile-friendly
- [ ] No JavaScript errors in console

### 9. Update Documentation

- **CHANGELOG.md** — "Added: [tool name] tool"
- **CONTEXT.md** — Why this tool, expected traffic sources, share mechanics

## Remember

- Keep tools simple and focused — one clear purpose
- Share mechanics are critical — make results easy to share
- Read `/design-system` before building UI
- Test share links in incognito/fresh browser
- Update CHANGELOG.md and CONTEXT.md when done
