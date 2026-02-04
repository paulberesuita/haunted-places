# Backlink Strategy: Building SpookFinder's Authority

How to get other websites to link to SpookFinder, boosting SEO and referral traffic.

---

## Why Backlinks Matter

Google uses backlinks as a primary ranking signal. More quality backlinks = higher rankings = more organic traffic.

**Current state:** SpookFinder likely has minimal backlinks (new site)
**Goal:** Build 50-100 quality backlinks in 6 months

---

## Backlink Quality Tiers

Not all links are equal:

| Tier | Source Type | Value | Difficulty |
|------|-------------|-------|------------|
| **S-Tier** | Major news (NYT, CNN), .gov, .edu | Extremely high | Very hard |
| **A-Tier** | Local news, travel blogs, tourism sites | High | Medium |
| **B-Tier** | Niche blogs, directories, resource pages | Medium | Easy-Medium |
| **C-Tier** | Forum signatures, blog comments | Low | Easy |

**Focus on A-Tier and B-Tier** — achievable and valuable.

---

## Strategy 1: Local News & Media

### Why It Works

- Local news always needs content, especially around Halloween
- They love "local angles" on broader topics
- One article = high-authority backlink + traffic spike

### Target Publications

For each state with SpookFinder content, identify:

1. **Local newspapers** (digital editions)
2. **Local TV station websites** (NBC/ABC/CBS affiliates)
3. **City magazines** (e.g., Atlanta Magazine, Texas Monthly)
4. **Alternative weeklies** (e.g., Creative Loafing, Village Voice)

### Pitch Angles

**Halloween Season (September-October):**
```
Subject: Story idea: The 5 most haunted places in [City] — with the research to back it up

Hi [Name],

Halloween is coming up and I thought your readers might enjoy a deep dive into
[City's] most haunted locations.

I run SpookFinder, a haunted places directory, and I've spent months researching
[City's] paranormal history with verified sources. A few highlights:

- [Place 1]: [One-sentence hook about the ghost story]
- [Place 2]: [One-sentence hook]
- [Place 3]: [One-sentence hook]

I can provide a full write-up, photos, and source citations. Happy to do an
interview or provide a guest post — whatever works for your format.

[Your name]
SpookFinder.com
```

**Non-Halloween Angles:**
- "Dark tourism is booming — here's where locals are going"
- "[City]'s haunted history: The stories behind the legends"
- "This [City] hotel was just named one of the most haunted in America"

### Timing

- **August-September:** Pitch Halloween stories (editors plan 4-6 weeks ahead)
- **October:** Pitch "last minute Halloween" angles
- **Year-round:** Pitch evergreen travel/history angles

### Finding Contacts

1. Search "[Publication] + contact" or "[Publication] + tips"
2. Look for "Travel Editor," "Features Editor," or "Tips" email
3. Use Hunter.io to find email patterns
4. Twitter/X DMs work for some journalists

---

## Strategy 2: Tourism Boards & CVBs

### Why It Works

- State/city tourism boards maintain resource pages
- They want to promote unique attractions
- .gov links are high authority
- Often have "things to do" or "unique experiences" pages

### Targets

| Type | Example | Link Opportunity |
|------|---------|------------------|
| State tourism | VisitNC.com, VisitFlorida.com | "Haunted places" or "unique attractions" page |
| City CVB | VisitSavannah.com, NewOrleans.com | "Ghost tours" or "paranormal" page |
| Regional tourism | Outer Banks CVB, Hill Country Texas | Niche attraction pages |

### Outreach Template

```
Subject: Resource for your [haunted/paranormal/unique attractions] page

Hi [Name],

I noticed [Tourism Site] has a page about [ghost tours / unique attractions /
things to do] in [Location].

I run SpookFinder.com, a directory of haunted places with in-depth research
on each location. We have detailed pages for [X] haunted places in [Location],
including:

- [Place 1] — [brief description]
- [Place 2] — [brief description]

Each page includes verified historical sources, specific ghost stories, and
visitor information.

Would you consider adding SpookFinder as a resource for visitors interested
in [Location's] paranormal history?

Happy to provide any additional information.

[Your name]
```

### Finding the Right Pages

Search Google for:
- `site:visit[state].com haunted`
- `site:[city]tourism.com ghost`
- `"things to do" + "[city]" + haunted`

Look for resource pages, listicles, or "unique experiences" sections.

---

## Strategy 3: Ghost Tour Operators

### Why It Works

- Tour operators already link to places they visit
- Mutually beneficial — you send them traffic, they link to you
- Many have "about our stops" or "locations" pages
- Builds relationships for future partnerships

### The Pitch

```
Subject: Partnership idea — SpookFinder + [Tour Company]

Hi [Name],

I run SpookFinder.com, a haunted places directory with deep research on
800+ locations across the US.

I noticed [Tour Company] visits several places we've researched, including
[Place 1] and [Place 2]. We have detailed ghost stories, historical context,
and visitor info for each.

I'd love to explore a simple partnership:
- We'll add [Tour Company] to our ghost tours page with a booking link
- You could link to our place pages as a resource for guests who want to
  learn more

No cost to either of us — just cross-promotion that helps visitors.

Interested in chatting?

[Your name]
```

### Finding Tour Operators

SpookFinder already has tour operators in the database. Query:
```sql
SELECT name, city, state, website FROM tours WHERE website IS NOT NULL;
```

Also search:
- "[City] ghost tour"
- "[City] haunted tour"
- "Ghost tours near [Location]"

---

## Strategy 4: Resource Page Link Building

### Why It Works

- Many sites maintain "resources" or "links" pages
- They're actively looking for quality content to link to
- Lower competition than news/PR

### Finding Resource Pages

Search Google for:

```
"haunted places" + "resources"
"paranormal" + "useful links"
"ghost hunting" + "links" + "resources"
"[state]" + "haunted" + "resources"
intitle:resources "haunted"
intitle:links "paranormal"
```

### Types of Resource Pages

| Type | Example Search | Notes |
|------|----------------|-------|
| Paranormal research groups | "paranormal society" + "resources" | Often have link pages |
| Ghost hunting teams | "ghost hunters" + "[state]" + "links" | Local teams love local resources |
| Travel bloggers | "haunted travel" + "resources" | Niche travel sites |
| Halloween sites | "Halloween" + "haunted places" + "links" | Seasonal but valuable |
| Library guides | site:.edu "haunted" "resources" | .edu links are gold |

### Outreach Template

```
Subject: Resource suggestion for your [page name]

Hi,

I came across your [resource page / links page] about [topic] and thought
SpookFinder might be a useful addition.

We're a haunted places directory with in-depth research on 800+ locations,
including verified sources and detailed ghost stories. Unlike most haunted
place sites, we research each location with 8+ independent sources.

Here's our homepage: spookfinder.com
Here's an example place page: spookfinder.com/place/stanley-hotel

If you think it'd be valuable for your visitors, we'd be grateful for
the inclusion.

Thanks for maintaining such a great resource!

[Your name]
```

---

## Strategy 5: Blogger Outreach

### Why It Works

- Travel and paranormal bloggers always need content
- Guest posts = backlink + exposure to their audience
- Can build ongoing relationships

### Finding Bloggers

Search for:
- "haunted travel blog"
- "paranormal blog" + "guest post"
- "spooky travel" + blog
- "[State] travel blog"

Look for blogs that:
- Have been updated in the last 6 months
- Accept guest posts (check footer or "Write for us" page)
- Cover travel, paranormal, or unique destinations

### Guest Post Pitch

```
Subject: Guest post idea: [Specific topic]

Hi [Name],

I've been reading [Blog Name] and loved your post about [specific post].
Your take on [detail] was really interesting.

I run SpookFinder, a haunted places directory, and I'd love to contribute
a guest post if you're accepting them. A few ideas:

1. "The 5 Most Haunted Places in [State] You've Never Heard Of"
2. "A Paranormal Road Trip: [Region] Edition"
3. "The Real History Behind [Famous Haunted Place]"

I can write 1,500-2,000 words with original research, and of course I'd
promote it to our audience as well.

Would any of these work for [Blog Name]?

[Your name]
SpookFinder.com
```

### Guest Post Guidelines

- **Length:** 1,500-2,000 words minimum
- **Quality:** Better than your average SpookFinder content
- **Links:** 1-2 natural links to SpookFinder (not spammy)
- **Images:** Provide 3-5 relevant images
- **Bio:** Short author bio with link to SpookFinder

---

## Strategy 6: HARO & Journalist Requests

### What is HARO?

Help A Reporter Out (HARO) connects journalists with sources. Sign up at helpareporter.com.

### How It Works

1. Sign up as a "Source"
2. Receive 3 emails/day with journalist queries
3. Respond to relevant queries
4. If selected, get quoted with a backlink

### Relevant Categories

- Travel
- Lifestyle
- Entertainment
- Business (if angle is about niche websites)

### Query Types to Respond To

- "Looking for unique travel destinations"
- "Haunted places for Halloween story"
- "Experts on dark tourism"
- "Unusual road trip ideas"
- "Paranormal experts" (position yourself as a researcher)

### Response Template

```
Subject: RE: [Original Query Subject]

Hi [Name],

[Direct answer to their question in 2-3 sentences]

[1-2 additional relevant points or examples]

[Your credentials: "I run SpookFinder.com, a haunted places directory
where I've researched 800+ locations with verified historical sources."]

Happy to provide more details or do a quick call.

[Your name]
SpookFinder.com
[Phone if comfortable]
```

### Time Investment

- **Daily:** 5-10 minutes scanning emails
- **Weekly:** 2-3 quality responses
- **Success rate:** ~5-10% of responses get picked up

---

## Strategy 7: Broken Link Building

### Why It Works

- Find dead links on other sites
- Offer SpookFinder as a replacement
- Webmasters appreciate the help
- Low competition tactic

### How to Find Broken Links

**Method 1: Manual**
1. Find resource pages (see Strategy 4)
2. Check links using browser extension (Check My Links for Chrome)
3. Note broken links
4. Offer SpookFinder as replacement

**Method 2: Ahrefs/SEMrush (Paid)**
1. Search for competitors' broken backlinks
2. Find pages linking to dead haunted place sites
3. Reach out with SpookFinder as replacement

### Outreach Template

```
Subject: Broken link on your [page name]

Hi,

I was reading your [page about topic] and noticed a broken link to
[dead site name] in the [section/paragraph].

If you're looking for a replacement, SpookFinder.com covers similar
content — we're a haunted places directory with research on 800+
locations.

Either way, thought you'd want to know about the broken link!

[Your name]
```

---

## Outreach Best Practices

### Email Tips

1. **Personalize every email** — mention something specific about their site
2. **Keep it short** — 150 words max for initial outreach
3. **Clear ask** — make it obvious what you want
4. **Follow up once** — after 5-7 days if no response
5. **Track everything** — spreadsheet with: site, contact, date sent, response

### What NOT to Do

- ❌ Mass email templates with no personalization
- ❌ Offer to pay for links (against Google guidelines)
- ❌ Be pushy or send multiple follow-ups
- ❌ Link to low-quality or thin pages
- ❌ Use fake names or identities

### Response Rates

Expect:
- **5-15% response rate** on cold outreach
- **2-5% success rate** (actually get the link)
- 100 emails → 5-15 responses → 2-5 links

This is normal. It's a numbers game.

---

## Monthly Backlink Building Workflow

### Week 1: Research
- [ ] Identify 20 target sites (mix of strategies)
- [ ] Find contact information
- [ ] Note specific pages/opportunities
- [ ] Add to tracking spreadsheet

### Week 2: Outreach Round 1
- [ ] Send 10 personalized emails
- [ ] Respond to any HARO queries
- [ ] Follow up on previous week's emails

### Week 3: Outreach Round 2
- [ ] Send 10 more emails
- [ ] Follow up on Week 2 emails
- [ ] Pitch 1-2 guest posts

### Week 4: Review & Adjust
- [ ] Check for new backlinks (Google Search Console)
- [ ] Analyze response rates
- [ ] Note what worked, what didn't
- [ ] Plan next month's targets

---

## Tracking Backlinks

### Tools

| Tool | Cost | What It Shows |
|------|------|---------------|
| Google Search Console | Free | Links Google knows about |
| Ahrefs | $99/mo | Most comprehensive backlink data |
| Ubersuggest | Free tier | Basic backlink overview |
| Moz Link Explorer | Free tier | Domain authority, top links |

### Metrics to Track

| Metric | Target (6 months) |
|--------|-------------------|
| Total referring domains | 50-100 |
| Average domain authority of links | 30+ |
| Links from .gov/.edu | 2-5 |
| Links from news sites | 5-10 |
| Guest posts published | 3-5 |

---

## Quick Wins (This Week)

1. **Sign up for HARO** — takes 5 minutes, passive opportunity
2. **Find 5 ghost tour operators** — send partnership emails
3. **Search for 3 resource pages** — send outreach emails
4. **Check SpookFinder's current backlinks** — Google Search Console > Links

---

## Seasonal Opportunities

### Halloween (August-October)
- Highest demand for haunted content
- Local news actively seeking stories
- Pitch early (August) for October coverage

### Friday the 13th
- Mini news cycle around superstition
- Pitch "13 haunted places" listicles

### Anniversary of Famous Events
- Titanic anniversary (April 15) — pitch haunted Titanic-connected locations
- Famous deaths — pitch locations connected to celebrities
- Historical tragedies — pitch locations with anniversary hooks

### Travel Season (May-September)
- Travel bloggers planning content
- Tourism boards updating pages
- Road trip content in demand

---

## Key Principles

1. **Quality over quantity** — 10 good links > 100 spammy links
2. **Give value first** — help them before asking for anything
3. **Be patient** — link building takes months to show SEO results
4. **Diversify sources** — don't rely on one type of backlink
5. **Build relationships** — one good contact can lead to multiple links over time
