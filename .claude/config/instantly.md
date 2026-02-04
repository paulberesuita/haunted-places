# Instantly.ai Configuration

API credentials and campaign settings for cold outreach.

---

## API Credentials

| Setting | Value |
|---------|-------|
| **API Key** | `NDIyMWJkZTYtNjgwMy00MzA2LTk3NzQtYjRlZGViNzY5YmZiOm1DUlJrdVd2aFBBeA==` |

---

## Campaigns

### SpookFinder Backlinks - Resource Pages

| Setting | Value |
|---------|-------|
| **Campaign ID** | `84b8f4c3-32b8-40b7-b0cd-d9240caccc55` |
| **Campaign Name** | SpookFinder Backlinks - Resource Pages |
| **Target** | Paranormal resource pages, library guides, directories |
| **Goal** | Get added to their links/resources pages |
| **Status** | Created 2026-02-03, 10 leads added |

### SpookFinder Backlinks - Tour Operators

| Setting | Value |
|---------|-------|
| **Campaign ID** | `[CREATE IN INSTANTLY AND PASTE HERE]` |
| **Campaign Name** | SpookFinder Backlinks - Tour Operators |
| **Target** | Ghost tour companies |
| **Goal** | Cross-promotion partnerships |

### SpookFinder Backlinks - Tourism Boards

| Setting | Value |
|---------|-------|
| **Campaign ID** | `[CREATE IN INSTANTLY AND PASTE HERE]` |
| **Campaign Name** | SpookFinder Backlinks - Tourism Boards |
| **Target** | CVBs, state tourism boards |
| **Goal** | Get listed on official tourism pages |

---

## Email Templates

### Resource Pages Template

**Subject:** {{pitch_subject}}

**Body:**
```
Hi {{first_name}},

I found {{personalization}}.

I run SpookFinder (spookfinder.com), a haunted places directory with deep research on 800+ locations. Unlike most sites, we verify each location with 8+ independent sources and include detailed historical context, named ghosts, and specific documented incidents.

Would you consider adding us as a resource?

Example page: spookfinder.com/place/stanley-hotel

Thanks!

Paul
SpookFinder.com
```

### Tour Operators Template

**Subject:** {{pitch_subject}}

**Body:**
```
Hi {{first_name}},

{{personalization}}

I run SpookFinder, a haunted places directory with deep research on 800+ locations.

I'd love to explore a simple partnership:
- We add {{company_name}} to our tours section with booking links
- You link to our place pages as a "learn more" resource for guests

No cost — just cross-promotion that helps visitors.

Interested?

Paul
SpookFinder.com
```

### Tourism Boards Template

**Subject:** {{pitch_subject}}

**Body:**
```
Hi {{first_name}},

I noticed {{personalization}}.

I run SpookFinder, a haunted places directory with researched pages on haunted locations in your area. Each entry includes verified historical sources, documented paranormal incidents, and visitor information.

Would you consider adding SpookFinder as a resource for visitors interested in paranormal tourism?

Happy to provide any additional information.

Paul
SpookFinder.com
```

---

## Setup Instructions

1. **Log into Instantly.ai**
2. **Create 3 campaigns** (one per category above)
3. **Copy each Campaign ID** from the campaign settings
4. **Paste the Campaign IDs** into this file
5. **Set up email sequences** using the templates above
6. **Run `/instantly-sync [category]`** to add leads
