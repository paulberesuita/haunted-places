---
name: instantly-sync
description: Manage Instantly.ai campaigns for cold outreach. Add leads, check status, list campaigns.
allowed-tools: Bash, Read, Write
---

# Instantly Sync

Manage cold outreach campaigns with Instantly.ai API.

**Usage:**
- `/instantly-sync` — Show status of all campaigns
- `/instantly-sync create [name]` — Create a new campaign
- `/instantly-sync add [category]` — Add leads from outreach-targets.md
- `/instantly-sync list [campaign-id]` — List leads in a campaign
- `/instantly-sync campaigns` — List all campaigns
- `/instantly-sync verify [email]` — Verify a single email
- `/instantly-sync verify-all` — Verify all emails in campaign targets doc

**Config:** Read `.claude/config/instantly.md` for API key and campaign IDs.

---

## Step 0: Load Config

Always start by reading `.claude/config/instantly.md` to get:
- API Key
- Campaign IDs for each category

```bash
API_KEY="[FROM .claude/config/instantly.md]"
```

---

## Command: Show Status (default)

List all campaigns and their lead counts.

```bash
API_KEY="[FROM_CONFIG]"

curl -s "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" | jq '.items[] | {name, id, status, leads_count}'
```

---

## Command: List Campaigns

```bash
API_KEY="[FROM_CONFIG]"

curl -s "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" | jq '.items[] | {name: .name, id: .id, status: .status}'
```

---

## Command: Verify Email

Verify a single email address before adding to campaign.

### Verify Single Email

```bash
API_KEY="[FROM_CONFIG]"
EMAIL="user@example.com"

curl -s -X POST "https://api.instantly.ai/api/v2/email-verification" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\"}"
```

### Response Format

```json
{
  "email": "user@example.com",
  "verification_status": "valid",
  "status": "completed"
}
```

**verification_status values:**
| Status | Meaning | Action |
|--------|---------|--------|
| `valid` | Email exists and accepts mail | Safe to send |
| `invalid` | Email doesn't exist | Don't send |
| `catch_all` | Domain accepts all emails | Risky, may bounce |
| `unknown` | Couldn't verify | Proceed with caution |

**IMPORTANT:** Use `verification_status` field, NOT `status` field.

### Check Pending Verification

If verification takes >10 seconds, it returns `pending`. Check status with:

```bash
API_KEY="[FROM_CONFIG]"
EMAIL="user@example.com"

curl -s "https://api.instantly.ai/api/v2/email-verification/$EMAIL" \
  -H "Authorization: Bearer $API_KEY"
```

---

## Command: Verify All Campaign Emails

Verify all emails in `docs/resource-page-campaign-targets.md` and update the doc.

### Workflow

1. Read `docs/resource-page-campaign-targets.md`
2. Extract all emails from the tables
3. Verify each email via API
4. Update the Verified column in the doc

### Batch Verification Script

```bash
API_KEY="[FROM_CONFIG]"

# List of emails to verify
EMAILS=(
  "pittref@email.pittcc.edu"
  "reference@cerritos.edu"
  "library@illinois.edu"
  "refdesk@rollins.edu"
  "archives@wiu.edu"
  "calpara.research@yahoo.com"
  "webmaster@paranormaldatabase.com"
  "webmaster@theshadowlands.net"
  "info@paranormalsocieties.com"
  "webmaster@intothebeyond.net"
  "reference@thrall.org"
  "info@seekingbeyondparanormal.com"
  "contact@legendsofamerica.com"
  "info@ghostvillage.com"
  "steve@higgypop.com"
  "courtney@hauntjaunts.net"
  "troy@americanhauntings.net"
  "info@ghostresearch.org"
  "info@aghost.org"
  "info@laspirits.com"
)

# Verify each email
for EMAIL in "${EMAILS[@]}"; do
  RESULT=$(curl -s -X POST "https://api.instantly.ai/api/v2/email-verification" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$EMAIL\"}")

  STATUS=$(echo $RESULT | jq -r '.verification_status // .status')
  echo "$EMAIL: $STATUS"
  sleep 1  # Rate limit
done
```

### Update Doc After Verification

After running verification, update `docs/resource-page-campaign-targets.md`:

| Verification Result | Update Verified Column To |
|--------------------|---------------------------|
| `valid` | `[x]` |
| `invalid` | `[!] Invalid` |
| `catch_all` | `[?] Catch-all` |
| `unknown` | `[?] Unknown` |

---

## Best Practice: Always Verify Before Adding

When finding new targets, ALWAYS verify emails before adding to campaign:

```bash
# 1. Find a new target
NEW_EMAIL="contact@newsite.com"

# 2. Verify first
API_KEY="[FROM_CONFIG]"
curl -s -X POST "https://api.instantly.ai/api/v2/email-verification" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$NEW_EMAIL\"}" | jq '.verification_status'

# 3. If valid, add to campaign
# 4. Update docs/resource-page-campaign-targets.md with the new target
```

---

## Command: Create Campaign

Create a new campaign with email sequences.

### Basic Campaign (No Sequences)

```bash
API_KEY="[FROM_CONFIG]"

curl -s -X POST "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SpookFinder Backlinks - Resource Pages",
    "campaign_schedule": {
      "timezone": "America/New_York",
      "schedules": [
        {
          "name": "Weekday Schedule",
          "timing": {
            "from": "09:00",
            "to": "17:00"
          },
          "days": {
            "1": true,
            "2": true,
            "3": true,
            "4": true,
            "5": true,
            "6": false,
            "0": false
          }
        }
      ]
    }
  }'
```

### Campaign with Email Sequence

```bash
API_KEY="[FROM_CONFIG]"

curl -s -X POST "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SpookFinder Backlinks - Resource Pages",
    "campaign_schedule": {
      "timezone": "America/New_York",
      "schedules": [
        {
          "name": "Weekday Schedule",
          "timing": {"from": "09:00", "to": "17:00"},
          "days": {"1": true, "2": true, "3": true, "4": true, "5": true, "6": false, "0": false}
        }
      ]
    },
    "sequences": [
      {
        "steps": [
          {
            "type": "email",
            "delay": 0,
            "variants": [
              {
                "subject": "{{pitch_subject}}",
                "body": "Hi {{first_name}},\n\nI found {{personalization}}.\n\nI run SpookFinder (spookfinder.com), a haunted places directory with deep research on 800+ locations. Unlike most sites, we verify each location with 8+ independent sources and include detailed historical context, named ghosts, and specific documented incidents.\n\nWould you consider adding us as a resource?\n\nExample page: spookfinder.com/place/stanley-hotel\n\nThanks!\n\nPaul\nSpookFinder.com"
              }
            ]
          },
          {
            "type": "email",
            "delay": 7,
            "variants": [
              {
                "subject": "Re: {{pitch_subject}}",
                "body": "Hi {{first_name}},\n\nJust wanted to follow up on my note below. Let me know if you have any questions or if this isn't a good fit right now.\n\nThanks!\n\nPaul\nSpookFinder.com"
              }
            ]
          }
        ]
      }
    ]
  }'
```

### Response

Returns the created campaign with ID:

```json
{
  "id": "019b2e22-e564-7a77-b175-c604b27d4541",
  "name": "SpookFinder Backlinks - Resource Pages",
  "status": 1
}
```

**Save the campaign ID** to `.claude/config/instantly.md`

---

### Create All 3 SpookFinder Campaigns

Run these commands to create all campaigns with proper sequences:

**1. Resource Pages Campaign:**
```bash
API_KEY="[FROM_CONFIG]"

curl -s -X POST "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SpookFinder Backlinks - Resource Pages",
    "campaign_schedule": {
      "timezone": "America/New_York",
      "schedules": [{"name": "Weekdays", "timing": {"from": "09:00", "to": "17:00"}, "days": {"1": true, "2": true, "3": true, "4": true, "5": true, "6": false, "0": false}}]
    },
    "sequences": [{
      "steps": [
        {"type": "email", "delay": 0, "variants": [{"subject": "{{pitch_subject}}", "body": "Hi {{first_name}},\n\nI found {{personalization}}.\n\nI run SpookFinder (spookfinder.com), a haunted places directory with deep research on 800+ locations. Unlike most sites, we verify each location with 8+ independent sources.\n\nWould you consider adding us as a resource?\n\nExample: spookfinder.com/place/stanley-hotel\n\nThanks!\n\nPaul\nSpookFinder.com"}]},
        {"type": "email", "delay": 7, "variants": [{"subject": "Re: {{pitch_subject}}", "body": "Hi {{first_name}},\n\nJust following up on my note below. Let me know if you have questions or if this isn't a good fit.\n\nThanks!\nPaul"}]}
      ]
    }]
  }' | jq '{id, name, status}'
```

**2. Tour Operators Campaign:**
```bash
API_KEY="[FROM_CONFIG]"

curl -s -X POST "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SpookFinder Backlinks - Tour Operators",
    "campaign_schedule": {
      "timezone": "America/New_York",
      "schedules": [{"name": "Weekdays", "timing": {"from": "09:00", "to": "17:00"}, "days": {"1": true, "2": true, "3": true, "4": true, "5": true, "6": false, "0": false}}]
    },
    "sequences": [{
      "steps": [
        {"type": "email", "delay": 0, "variants": [{"subject": "{{pitch_subject}}", "body": "Hi {{first_name}},\n\nI noticed {{personalization}}.\n\nI run SpookFinder, a haunted places directory with deep research on 800+ locations.\n\nI would love to explore a simple partnership:\n- We add {{company_name}} to our tours section with booking links\n- You link to our place pages as a \"learn more\" resource for guests\n\nNo cost — just cross-promotion that helps visitors.\n\nInterested?\n\nPaul\nSpookFinder.com"}]},
        {"type": "email", "delay": 7, "variants": [{"subject": "Re: {{pitch_subject}}", "body": "Hi {{first_name}},\n\nJust following up — would a simple cross-promotion work for you?\n\nWe feature your tours, you link to our research. Win-win.\n\nLet me know!\nPaul"}]}
      ]
    }]
  }' | jq '{id, name, status}'
```

**3. Tourism Boards Campaign:**
```bash
API_KEY="[FROM_CONFIG]"

curl -s -X POST "https://api.instantly.ai/api/v2/campaigns" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SpookFinder Backlinks - Tourism Boards",
    "campaign_schedule": {
      "timezone": "America/New_York",
      "schedules": [{"name": "Weekdays", "timing": {"from": "09:00", "to": "17:00"}, "days": {"1": true, "2": true, "3": true, "4": true, "5": true, "6": false, "0": false}}]
    },
    "sequences": [{
      "steps": [
        {"type": "email", "delay": 0, "variants": [{"subject": "{{pitch_subject}}", "body": "Hi {{first_name}},\n\nI noticed {{personalization}}.\n\nI run SpookFinder, a haunted places directory with researched pages on haunted locations in your area. Each entry includes verified historical sources, documented paranormal incidents, and visitor information.\n\nWould you consider adding SpookFinder as a resource for visitors interested in paranormal tourism?\n\nHappy to provide any additional information.\n\nPaul\nSpookFinder.com"}]},
        {"type": "email", "delay": 7, "variants": [{"subject": "Re: {{pitch_subject}}", "body": "Hi {{first_name}},\n\nJust following up on my note about SpookFinder as a visitor resource.\n\nLet me know if you have questions!\n\nPaul"}]}
      ]
    }]
  }' | jq '{id, name, status}'
```

---

## Command: Add Leads

Add leads from `docs/outreach-targets.md` to the appropriate campaign.

### Categories

| Category | Targets in outreach-targets.md |
|----------|-------------------------------|
| `resource` | #1-10 (Resource Pages) |
| `tour` | #11-20 (Ghost Tour Operators) |
| `tourism` | #31-40 (Tourism Boards) |

### Step 1: Parse Targets

Read `docs/outreach-targets.md` and extract targets for the specified category.

For each target, extract:
- **Email** (from the table or estimate from website)
- **First name** (organization name or contact name)
- **Company name**
- **Website**
- **Personalization** (specific detail about their site)
- **Pitch subject** (from the pitch template)

### Step 2: Build Leads JSON

```json
[
  {
    "email": "calpara.research@yahoo.com",
    "first_name": "Cal-Para Team",
    "company_name": "Cal-Para Paranormal Research",
    "website": "https://calpara.org/paranormal-websites/",
    "personalization": "your paranormal websites page - I noticed you link to Haunted Places Directory and Ghost Village",
    "pitch_subject": "Resource suggestion for your Paranormal Websites page"
  }
]
```

### Step 3: Add to Campaign

Use the bulk add endpoint:

```bash
API_KEY="[FROM_CONFIG]"
CAMPAIGN_ID="[FROM_CONFIG]"

curl -s -X POST "https://api.instantly.ai/api/v2/leads/add" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "'"$CAMPAIGN_ID"'",
    "leads": [
      {
        "email": "calpara.research@yahoo.com",
        "first_name": "Cal-Para Team",
        "company_name": "Cal-Para Paranormal Research",
        "website": "https://calpara.org/paranormal-websites/",
        "personalization": "your paranormal websites page",
        "pitch_subject": "Resource suggestion for your Paranormal Websites page"
      }
    ]
  }'
```

### Step 4: Report Results

```
## Instantly Sync Complete

Category: [resource/tour/tourism]
Campaign: [Campaign Name]
Uploaded: [leads_uploaded] leads
Duplicates skipped: [duplicated_leads]
Invalid emails: [invalid_email_count]
```

---

## Command: List Leads in Campaign

```bash
API_KEY="[FROM_CONFIG]"
CAMPAIGN_ID="[CAMPAIGN_ID]"

curl -s "https://api.instantly.ai/api/v2/leads?campaign_id=$CAMPAIGN_ID&limit=100" \
  -H "Authorization: Bearer $API_KEY" | jq '.items[] | {email, first_name, status}'
```

---

## Quick Add Scripts

### Add Resource Page Leads

```bash
API_KEY="[FROM .claude/config/instantly.md]"
CAMPAIGN_ID="[RESOURCE_CAMPAIGN_ID]"

curl -s -X POST "https://api.instantly.ai/api/v2/leads/add" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "'"$CAMPAIGN_ID"'",
    "leads": [
      {"email": "calpara.research@yahoo.com", "first_name": "Cal-Para Team", "company_name": "Cal-Para Paranormal Research", "personalization": "your paranormal websites page - I noticed you link to Haunted Places Directory and Ghost Village", "pitch_subject": "Resource suggestion for your Paranormal Websites page"},
      {"email": "pittref@email.pittcc.edu", "first_name": "Pitt CC Library", "company_name": "Pitt Community College Library", "personalization": "your Paranormal LibGuide - great resource for students", "pitch_subject": "Resource suggestion for your Paranormal research guide"},
      {"email": "reference@cerritos.edu", "first_name": "Cerritos Library", "company_name": "Cerritos College Library", "personalization": "your LibGuide on Paranormal Phenomena", "pitch_subject": "Resource suggestion for your Paranormal Phenomena guide"},
      {"email": "info@seekingbeyondparanormal.com", "first_name": "Seeking Beyond Team", "company_name": "Seeking Beyond Paranormal", "personalization": "your resources page - especially the equipment breakdown", "pitch_subject": "Resource for your paranormal resources page"},
      {"email": "reference@thrall.org", "first_name": "Thrall Library", "company_name": "Thrall Library", "personalization": "your paranormal resources page", "pitch_subject": "Resource suggestion for your Paranormal page"},
      {"email": "contact@legendsofamerica.com", "first_name": "Dave and Kathy", "company_name": "Legends of America", "personalization": "your ghost stories content - especially the regional deep dives", "pitch_subject": "Cross-promotion idea - Legends of America + SpookFinder"},
      {"email": "webmaster@paranormaldatabase.com", "first_name": "Paranormal Database", "company_name": "Paranormal Database", "personalization": "your links page", "pitch_subject": "Link suggestion for your resources page"},
      {"email": "webmaster@theshadowlands.net", "first_name": "Shadowlands", "company_name": "Shadowlands Haunted Places", "personalization": "Shadowlands has been a go-to resource for years", "pitch_subject": "Complementary resource suggestion"},
      {"email": "info@paranormalsocieties.com", "first_name": "Paranormal Societies", "company_name": "Paranormal Societies Directory", "personalization": "your directory of investigation teams", "pitch_subject": "Resource for investigation teams"},
      {"email": "webmaster@intothebeyond.net", "first_name": "Into The Beyond", "company_name": "Into The Beyond", "personalization": "your paranormal links page", "pitch_subject": "Link suggestion"}
    ]
  }'
```

### Add Tour Operator Leads

```bash
API_KEY="[FROM .claude/config/instantly.md]"
CAMPAIGN_ID="[TOUR_CAMPAIGN_ID]"

curl -s -X POST "https://api.instantly.ai/api/v2/leads/add" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "'"$CAMPAIGN_ID"'",
    "leads": [
      {"email": "info@usghostadventures.com", "first_name": "US Ghost Adventures Team", "company_name": "US Ghost Adventures", "personalization": "you operate tours in 50+ cities where we have detailed place pages", "pitch_subject": "Partnership idea - SpookFinder + US Ghost Adventures"},
      {"email": "info@ghostsandgravestones.com", "first_name": "Ghosts and Gravestones Team", "company_name": "Ghosts and Gravestones", "personalization": "your tours in Savannah, St. Augustine, Boston, San Diego, and Key West", "pitch_subject": "Cross-promotion opportunity"},
      {"email": "info@ghostcitytours.com", "first_name": "Ghost City Tours Team", "company_name": "Ghost City Tours", "personalization": "your city-specific content in New Orleans, Savannah, and Charleston", "pitch_subject": "Partnership - Ghost City Tours + SpookFinder"},
      {"email": "info@nightlyspirits.com", "first_name": "Nightly Spirits Team", "company_name": "Nightly Spirits", "personalization": "your tours in Boston, Chicago, Denver, and Nashville", "pitch_subject": "Cross-promotion idea"},
      {"email": "info@savannahterrors.com", "first_name": "Savannah Tour Team", "company_name": "Savannah Ghost Tours", "personalization": "your Savannah tours", "pitch_subject": "Savannah haunted places partnership"},
      {"email": "info@frenchquarterphantoms.com", "first_name": "French Quarter Phantoms", "company_name": "New Orleans Ghost Tours", "personalization": "our pages on LaLaurie Mansion and St. Louis Cemetery", "pitch_subject": "New Orleans haunted places partnership"},
      {"email": "info@salemghosts.com", "first_name": "Salem Ghosts Team", "company_name": "Salem Ghost Tours", "personalization": "our research on the Witch House and Joshua Ward House", "pitch_subject": "Salem partnership opportunity"},
      {"email": "info@ghostsofgettysburg.com", "first_name": "Gettysburg Ghosts Team", "company_name": "Gettysburg Ghost Tours", "personalization": "our pages with full Civil War historical context", "pitch_subject": "Gettysburg haunted places partnership"},
      {"email": "info@staugustineghost.com", "first_name": "St Augustine Ghost Team", "company_name": "St Augustine Ghost Tours", "personalization": "our research on America's oldest city", "pitch_subject": "St. Augustine partnership"},
      {"email": "info@charlestonghosttour.com", "first_name": "Charleston Ghost Team", "company_name": "Charleston Ghost Tours", "personalization": "our researched pages on Charleston", "pitch_subject": "Charleston haunted places partnership"}
    ]
  }'
```

### Add Tourism Board Leads

```bash
API_KEY="[FROM .claude/config/instantly.md]"
CAMPAIGN_ID="[TOURISM_CAMPAIGN_ID]"

curl -s -X POST "https://api.instantly.ai/api/v2/leads/add" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "'"$CAMPAIGN_ID"'",
    "leads": [
      {"email": "media@visitsavannah.com", "first_name": "Visit Savannah Team", "company_name": "Visit Savannah", "personalization": "your ghost tours and haunted attractions pages", "pitch_subject": "Resource for Savannah haunted attractions"},
      {"email": "media@neworleans.com", "first_name": "New Orleans CVB Team", "company_name": "New Orleans CVB", "personalization": "your ghost tours and unique attractions pages", "pitch_subject": "Resource for New Orleans paranormal attractions"},
      {"email": "media@salem.org", "first_name": "Destination Salem Team", "company_name": "Destination Salem", "personalization": "your Haunted Salem page", "pitch_subject": "Resource for Salem haunted history"},
      {"email": "media@visitstaugustine.com", "first_name": "Visit St Augustine Team", "company_name": "Visit St. Augustine", "personalization": "your ghost tours and haunted history pages", "pitch_subject": "Resource for St. Augustine paranormal attractions"},
      {"email": "media@charlestoncvb.com", "first_name": "Charleston CVB Team", "company_name": "Charleston CVB", "personalization": "your tourism resources", "pitch_subject": "Resource for Charleston haunted attractions"},
      {"email": "media@visitsanantonio.com", "first_name": "Visit San Antonio Team", "company_name": "Visit San Antonio", "personalization": "your unique attractions pages including the Alamo", "pitch_subject": "Resource for San Antonio haunted attractions"},
      {"email": "media@destinationgettysburg.com", "first_name": "Destination Gettysburg Team", "company_name": "Destination Gettysburg", "personalization": "your Civil War and battlefield tourism pages", "pitch_subject": "Resource for Gettysburg haunted attractions"},
      {"email": "media@exploreasheville.com", "first_name": "Explore Asheville Team", "company_name": "Explore Asheville", "personalization": "your unique attractions pages including Grove Park Inn", "pitch_subject": "Resource for Asheville haunted attractions"},
      {"email": "media@visitnc.com", "first_name": "Visit NC Team", "company_name": "Visit North Carolina", "personalization": "your unique attractions pages - we have 51 verified NC locations", "pitch_subject": "Resource for North Carolina haunted attractions"},
      {"email": "media@visitma.com", "first_name": "Visit MA Team", "company_name": "Visit Massachusetts", "personalization": "your Salem and haunted attractions pages", "pitch_subject": "Resource for Massachusetts haunted attractions"}
    ]
  }'
```

---

## API Reference

### Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v2/campaigns` | GET | List all campaigns |
| `/api/v2/campaigns` | POST | Create new campaign |
| `/api/v2/campaigns/{id}` | GET | Get campaign details |
| `/api/v2/leads/add` | POST | Bulk add leads to campaign |
| `/api/v2/leads` | GET | List leads (with ?campaign_id=) |

**Docs:** [Instantly API V2](https://developer.instantly.ai/api/v2)

### Authentication

All requests use Bearer token:
```
Authorization: Bearer [API_KEY]
```

### Response Format (Add Leads)

```json
{
  "status": "success",
  "leads_uploaded": 10,
  "duplicated_leads": 0,
  "skipped_count": 0,
  "invalid_email_count": 0
}
```

---

## Error Handling

| Error | Meaning | Action |
|-------|---------|--------|
| 401 | Invalid API key | Check config |
| 400 | Invalid request | Check JSON format |
| 404 | Campaign not found | Check campaign ID |
| duplicated_leads > 0 | Already in campaign | Normal, not an error |

---

## Workflow

### Initial Setup (Once)

1. **Get API key** from Instantly: Settings > Integrations > API
2. **Paste API key** in `.claude/config/instantly.md`
3. **Create campaigns via API** using the commands above (or in Instantly UI)
4. **Copy campaign IDs** from response to `.claude/config/instantly.md`

**Quick setup command** — Create all 3 campaigns with sequences:
```bash
# After setting API_KEY, run the 3 campaign creation commands above
# Then copy the returned IDs to the config file
```

### Adding Leads

1. Run `/instantly-sync add resource` to add resource page targets
2. Run `/instantly-sync add tour` to add tour operator targets
3. Run `/instantly-sync add tourism` to add tourism board targets

### Monitoring

1. Run `/instantly-sync` to see campaign status
2. Check Instantly.ai dashboard for replies
3. Update `docs/outreach-targets.md` with results

---

## Best Practices

1. **Verify emails first** — Some emails are estimated (info@, media@)
2. **Start with resource pages** — Highest success rate
3. **Personalize in Instantly** — Use the variables in email templates
4. **Follow up once** — Set 7-day follow-up sequence
5. **Track results** — Update outreach-targets.md status column
