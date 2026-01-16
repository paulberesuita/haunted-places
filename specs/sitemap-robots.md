# Feature: Sitemap and Robots.txt

## Why

Sitemap ensures Google discovers and indexes all 204+ pages quickly. Essential for SEO - without it, pages may never get indexed.

## Requirements

- [ ] Generate `/sitemap.xml` dynamically from D1 data
- [ ] Include all place pages with lastmod dates
- [ ] Include all state pages
- [ ] Include all city pages
- [ ] Include all category pages
- [ ] Include homepage
- [ ] `/robots.txt` allowing all crawlers
- [ ] robots.txt pointing to sitemap location
- [ ] Submit sitemap to Google Search Console (manual step)

## User Flow

1. Googlebot visits /robots.txt
2. Googlebot finds sitemap location
3. Googlebot crawls sitemap.xml
4. All pages get discovered and indexed

## Not Included

- Multiple sitemaps (not needed at this scale)
- Image sitemap (V2)

## Open Questions

- Should sitemap be static (generated at build) or dynamic?
- How often to update lastmod dates?
