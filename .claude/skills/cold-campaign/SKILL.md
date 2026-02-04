---
name: cold-campaign
description: Run outreach campaigns to get links, mentions, and partnerships. Usage: /cold-campaign
user_invokable: true
agent: outreach
---

# Cold Campaign

You've been invoked to **run a cold outreach campaign** to get links, mentions, and partnerships.

**Workflow:** Cold Campaign (from growth agent)

---

## Quick Start with Instantly

We have 40 pre-researched targets ready to load into Instantly.ai.

**Files:**
- `docs/outreach-targets.md` — 40 targets with pitches
- `docs/instantly-import.csv` — CSV formatted for import
- `.claude/config/instantly.md` — API credentials and campaign IDs
- `.claude/skills/instantly-sync/SKILL.md` — Full Instantly API reference

**To run a campaign:**

1. **Create campaigns in Instantly** (if not done):
   - "SpookFinder Backlinks - Resource Pages"
   - "SpookFinder Backlinks - Tour Operators"
   - "SpookFinder Backlinks - Tourism Boards"

2. **Copy campaign IDs** to `.claude/config/instantly.md`

3. **Add leads via API** — Use `/instantly-sync add [category]`

4. **Set up email sequences** in Instantly using templates from config

5. **Launch campaigns** in Instantly dashboard

---

## Campaign Types

| Type | Target | Goal |
|------|--------|------|
| **Link building** | Travel bloggers, paranormal sites | Backlinks to our pages |
| **Guest posts** | Travel/tourism publications | Exposure + links |
| **Tour operator partnerships** | Ghost tour companies | Mutual promotion |
| **Local press** | City newspapers, tourism boards | Coverage + credibility |
| **Community engagement** | Reddit, forums, Facebook groups | Traffic + awareness |

## Workflow

### 1. Define Goal

Before starting, clarify:

- **What do we want?** Links? Press coverage? Partnerships?
- **What can we offer?** Data, exposure, reciprocal links, content?
- **What's the hook?** Why should they care?

### 2. Identify Targets

**For link building:**
```
Search queries:
- "[state] haunted places blog"
- "[city] ghost tour reviews"
- "paranormal travel blogger"
- "[state] travel blogger"
```

**For tour operator partnerships:**
```bash
# Find cities with ghost tours in our data
npx wrangler d1 execute haunted-places-db --remote --command "SELECT DISTINCT city, state, COUNT(*) as places FROM places GROUP BY city, state HAVING places >= 5 ORDER BY places DESC;"
```
Then search: "[city] ghost tour company"

**For local press:**
```
- "[city] newspaper" travel section
- "[city] tourism board" PR contact
- "Visit [city]" official tourism
```

### 3. Research Each Target

Before reaching out, understand them:

- What have they covered before?
- What's their audience?
- Do they accept guest posts?
- What's their contact preference (email, form, Twitter)?

**Create a tracking list:**
```markdown
| Target | Type | Contact | Status | Notes |
|--------|------|---------|--------|-------|
| [Name] | blog | email@... | researched | Covers [state], accepts guest posts |
```

### 4. Craft Personalized Pitch

**Template structure (customize for each):**

```
Subject: [Specific, relevant hook]

Hi [Name],

[1 sentence showing you know their work]

[What we have that's relevant to them]

[Clear ask — what do you want?]

[What's in it for them?]

[Call to action]

[Your name]
SpookFinder.com
```

**Example pitches:**

**Link building:**
```
Subject: Data for your [State] haunted places article

Hi [Name],

Loved your piece on [specific article]. The part about [specific detail] was great.

We just compiled 45 haunted locations in [State] with verified addresses and ghost stories.
Might be useful for future articles or as a resource for your readers.

Happy to share our data or answer any questions about specific locations.

[Name]
SpookFinder.com
```

**Tour operator partnership:**
```
Subject: Partnership idea — [City] Ghost Tours

Hi [Name],

I run SpookFinder.com — we have 12 haunted locations listed in [City] and get
[X] monthly visitors looking for ghost experiences.

Would you be interested in being featured as a recommended tour? We'd link to your
booking page in exchange for a mention on your site.

Let me know if you'd like to chat.

[Name]
```

**Guest post:**
```
Subject: Guest post idea: Top 10 Haunted [Category] in [Region]

Hi [Name],

I noticed [Publication] covers paranormal travel. Would you be interested in a
guest piece on the most haunted [hotels/restaurants/etc.] in [Region]?

I've researched 40+ locations with verified ghost stories and could put together
something unique for your readers.

Let me know what you think.

[Name]
SpookFinder.com
```

### 5. Send Outreach

- Send personalized emails (not templates)
- Track who you contacted and when
- Don't spam — quality over quantity
- Use their preferred contact method

**Update tracking:**
```markdown
| Target | Type | Contact | Status | Notes |
|--------|------|---------|--------|-------|
| [Name] | blog | email@... | sent 1/25 | Pitched [specific angle] |
```

### 6. Follow Up

**One follow-up after 1 week if no response:**

```
Subject: Re: [Original subject]

Hi [Name],

Just wanted to follow up on my note below. Let me know if you have any questions
or if this isn't a good fit right now.

[Name]
```

**After second email, move on.** No more follow-ups.

### 7. Track Results

Update tracking with outcomes:

```markdown
| Target | Type | Status | Result |
|--------|------|--------|--------|
| [Name] | blog | replied | Link added to their [article] |
| [Name] | tour | no response | - |
| [Name] | press | replied | Writing article about [topic] |
```

**Measure:**
- Links acquired (check with `site:[domain] spookfinder.com`)
- Referral traffic (if we have analytics)
- Partnerships established
- Coverage/mentions

### 8. Update Documentation

- **CHANGELOG.md** — "Added: [Campaign name] outreach campaign"
- **CONTEXT.md** — Campaign learnings, what worked, what didn't

## Rules

- **Be genuine** — No spam, no bought links
- **Provide value** — Give them something useful
- **Personalize everything** — No copy-paste templates
- **Respect no** — One follow-up max, then move on
- **Track everything** — Know what's working

## Remember

- This is a research + outreach workflow, no code involved
- Quality of pitch matters more than quantity
- Partnerships are better than one-off links
- Update CHANGELOG.md and CONTEXT.md when done

---

## Instantly.ai Integration

### API Commands

```bash
# Set API key (get from .claude/config/instantly.md)
API_KEY="[YOUR_API_KEY]"

# List all campaigns
curl -s "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" | jq '.items[] | {name, id, status}'

# Add leads to campaign
curl -s -X POST "https://api.instantly.ai/api/v2/leads/add" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "[CAMPAIGN_ID]",
    "leads": [
      {"email": "contact@example.com", "first_name": "Name", "personalization": "detail"}
    ]
  }'

# List leads in campaign
curl -s "https://api.instantly.ai/api/v2/leads?campaign_id=[CAMPAIGN_ID]&limit=100" \
  -H "Authorization: Bearer $API_KEY" | jq '.items[] | {email, status}'
```

### Pre-Built Lead Lists

Run these to add all targets to campaigns:

- **Resource Pages:** See `/instantly-sync add resource`
- **Tour Operators:** See `/instantly-sync add tour`
- **Tourism Boards:** See `/instantly-sync add tourism`

Full scripts with all lead data are in `.claude/skills/instantly-sync/SKILL.md`
