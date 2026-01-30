# SEO Learnings

Accumulated knowledge about search engine optimization for SpookFinder.

---

## Sitemap Best Practices

### The `lastmod` Field

The `<lastmod>` tag in sitemaps tells Google when a page was last modified. It's a **hint**, not a directive.

**How Google uses lastmod:**
1. Sees updated `lastmod` date
2. Prioritizes crawling that URL
3. Crawls the page and compares to cached version
4. If content actually changed, re-indexes with fresh data
5. If content is the same, notes the mismatch

**The trust factor:**
Google learns which sites have reliable `lastmod` signals. If your dates consistently match real content changes, Google trusts your sitemap more and responds faster to updates.

### Why Fake Freshness Dates Backfire

**The temptation:** Set `lastmod` to today's date for all pages so Google thinks everything is fresh.

**Why it fails:**
- Google compares `lastmod` claims to actual content changes
- Repeated mismatches = Google learns your dates are unreliable
- Eventually Google ignores your `lastmod` signals entirely
- This is called "lastmod spamming" and Google has explicitly addressed it

**John Mueller (Google Search Advocate) on lastmod:**
> "We use lastmod as a hint... if we see that your lastmod dates don't match reality, we'll learn to ignore them."

### Correct Implementation

**Do:**
- Only update `lastmod` when content actually changes
- Track `updated_at` timestamps in your database
- Use real modification dates in your sitemap

**Don't:**
- Set all pages to today's date
- Update `lastmod` without changing content
- Use `created_at` when you mean `updated_at`

---

## Content Freshness & Indexing

### How Long Until Google Re-indexes?

| Scenario | Typical Timeline |
|----------|------------------|
| Updated content on existing pages | 1-2 weeks |
| New pages on established site | 4 days - 4 weeks |
| Sites with frequent crawling | Hours to days |

### Factors That Speed Up Indexing

1. **Site authority** — Established sites get crawled more often
2. **Accurate sitemap** — Trustworthy `lastmod` dates get priority
3. **Internal linking** — Pages linked from homepage get crawled faster
4. **Content freshness history** — Sites that update regularly get crawled more
5. **Google Search Console** — "Request Indexing" for immediate attention

### Manual Indexing Requests

For important updates, use Google Search Console:
1. Go to URL Inspection tool
2. Enter the URL you updated
3. Click "Request Indexing"
4. Limited to ~10-20 requests per day

---

## Content Quality Signals

### What Google Looks For

**Thin content problems:**
- Short descriptions (< 500 chars)
- Duplicate/boilerplate text
- Missing context or depth
- Few or no sources

**Quality content signals:**
- Comprehensive coverage (1,500+ chars for place pages)
- Original research and details
- Multiple verified sources
- Specific names, dates, accounts
- Internal linking to related content

### SpookFinder Content Standards

Based on research batches (California, Connecticut, Virginia, Florida, Georgia):

| Metric | Before | After |
|--------|--------|-------|
| Ghost story length | 300-450 chars | 1,500-1,850 chars |
| Sources per place | 1-2 | 5-7 |
| Named ghosts/spirits | Rare | Common |
| Specific dates/events | Rare | Common |
| Witness accounts | Rare | Included |

---

## Sitemap Technical Details

### Current Implementation

SpookFinder's sitemap is dynamically generated at `/sitemap.xml`:
- Queries D1 database for all places, states, cities, categories
- Sets appropriate `changefreq` and `priority` values
- Returns XML with proper headers

### Priority Levels

| Page Type | Priority | Changefreq |
|-----------|----------|------------|
| Homepage | 1.0 | daily |
| /states | 0.9 | weekly |
| State pages | 0.8 | weekly |
| City pages | 0.7 | weekly |
| Category pages | 0.7 | weekly |
| Place pages | 0.6 | monthly |
| About/Contact | 0.3-0.4 | monthly |

### Required Fix: `updated_at` Column

**Problem:** Sitemap uses `created_at` for place page `lastmod`, so updates aren't signaled.

**Solution:**
```sql
ALTER TABLE places ADD COLUMN updated_at DATETIME;
UPDATE places SET updated_at = created_at;
```

Then update `sitemap.xml.js` to use `updated_at`.

---

## Lessons Learned

### 2026-01-30: Georgia Batch Research

After updating 50 Georgia places with expanded content, discovered:
- Sitemap wasn't signaling content freshness
- Using `created_at` instead of `updated_at`
- Need to implement proper change tracking

**Key takeaway:** Honest signaling to Google pays dividends. Don't try to game the system.

---

## Resources

- [Google Search Central: Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google Search Console](https://search.google.com/search-console)
- [John Mueller on Twitter/X](https://twitter.com/JohnMu) — Regular SEO insights
