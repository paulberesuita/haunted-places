---
name: research-images
description: Find and upload images for existing places. Usage: /research-images [state]
user_invokable: false
agent: seo
---

# Research Images

You've been invoked to **research images** for existing places.

**Operation:** Research Images (from researcher agent)

## Your Task

Find and upload images for places in: **{{args}}**

## If No State Provided

Show the user which states need images:

1. **Query image coverage by state:**
   ```bash
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT state, COUNT(*) as total, SUM(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 ELSE 0 END) as with_images, COUNT(*) - SUM(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 ELSE 0 END) as missing FROM places GROUP BY state ORDER BY missing DESC;"
   ```

2. **Show results:**
   ```
   ## Image Coverage
   | State | Total | Has Image | Missing |
   |-------|-------|-----------|---------|
   | TX    | 50    | 12        | 38      |
   | CA    | 48    | 8         | 40      |
   | NY    | 30    | 0         | 30      |
   ...

   **Which state would you like to add images for?**
   ```

3. **Wait for user to pick a state before proceeding.**

## Process

**CRITICAL: Each image must be downloaded fresh, uploaded to R2, and database updated IMMEDIATELY — do not batch or defer.**

### Step 1: Find places needing images
```bash
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, city FROM places WHERE state = '[STATE]' AND (image_url IS NULL OR image_url = '') LIMIT 20;"
```

### Step 2: For EACH place (do all 3 steps before moving to next place):

**A. Find the actual image URL (try in order, stop when found):**

1. **Wikipedia API** — Check if the place has a Wikipedia article with a lead image:
   ```bash
   curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=[Article_Name]&prop=pageimages&piprop=original&format=json"
   ```

2. **Wikimedia Commons search** — Search for photos even without a Wikipedia article:
   ```bash
   curl -s "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=[Place+Name+City+State]&srnamespace=6&format=json"
   ```
   Then get the URL: `action=query&titles=File:[filename]&prop=imageinfo&iiprop=url&format=json`

3. **Place's own website** — WebSearch for the place, then WebFetch their homepage to find an image:
   ```
   WebSearch: "[place name]" [city] [state] official site
   WebFetch: [url] → "Find the main hero image or exterior photo URL on this page. Return just the direct image URL (ending in .jpg, .png, .webp)."
   ```
   This works well for hotels, restaurants, museums, and historic sites that have their own web presence.

4. **Other sources** — Flickr CC, Find A Grave (cemeteries), state historical societies, Library of Congress

- Get the direct image URL (ending in .jpg, .png, .webp, etc.)
- VERIFY it shows the real location before proceeding

**B. Download, upload to R2, update DB — ALL IN ONE GO:**
```bash
# Download fresh (use unique timestamp to avoid cached files)
curl -L "[IMAGE_URL]" -o temp/[slug]-new.jpg

# Upload to R2 IMMEDIATELY
npx wrangler r2 object put haunted-places-images/places/[slug].jpg --file=./temp/[slug]-new.jpg --remote

# Update database IMMEDIATELY
npx wrangler d1 execute haunted-places-db --remote --command "UPDATE places SET image_url = 'places/[slug].jpg' WHERE slug = '[slug]';"
```

**C. Verify the upload worked:**
```bash
curl -sI "https://spookfinder.pages.dev/images/places/[slug].jpg" | head -3
```

### Step 3: Update CHANGELOG.md — Document images added

### Step 4: Deploy to both environments

**Always deploy after adding images:**

```bash
# Deploy to production (spookfinder.com)
wrangler pages deploy ./public --project-name=spookfinder
```

Note: R2 images and D1 database changes are already live (using `--remote`). This deploy ensures any frontend changes are synced.

### Step 5: Handoff — Report results with verification URLs

Include both URLs for verification:
- **Preview:** `https://spookfinder.pages.dev/images/places/[slug].jpg`
- **Production:** `https://spookfinder.com/images/places/[slug].jpg`

## Search Strategy

**Use specific search terms to find the actual location:**

```
"[exact place name]" [city] [state] building
"[exact place name]" [city] exterior photo
"[exact place name]" wikimedia commons
"[exact place name]" flickr creative commons
```

**For specific categories:**
- **Cemeteries:** Search Find A Grave for the cemetery name
- **Hotels/Restaurants:** Check their official website, Facebook, or TripAdvisor
- **Historic sites:** Search "[name] national register historic places"
- **Mansions/Museums:** Search "[name] historic house" or "[name] museum"

## Image Sources (Priority Order)

**IMPORTANT: We want photos of the ACTUAL location, not generic atmosphere shots.**

1. **Wikimedia Commons** — Creative Commons licensed, safest. Search: `site:commons.wikimedia.org "[place name]"`
2. **Official website/social media** — The venue's own site, Facebook page, or Google Business listing
3. **Google Maps/Street View** — Screenshot of the actual building (if no better option)
4. **Flickr Creative Commons** — Search with license filter: `site:flickr.com "[place name]" creative commons`
5. **Find A Grave** — For cemeteries specifically: `site:findagrave.com "[cemetery name]"`
6. **State/local historical societies** — Often have archival photos
7. **TripAdvisor/Yelp user photos** — Real photos from visitors
8. **Library of Congress / state archives** — Historical photos in public domain

## Last Resort Only

9. **Unsplash** — ONLY use if all above sources fail AND you can find a photo that's clearly labeled as that specific location (not just a generic spooky building)

**If you cannot find an image of the actual place, skip it and note it in the handoff.** A missing image is better than a wrong image.

## Remember

- Always use `--remote` flag for R2 and D1 commands
- Store only filename in image_url (e.g., `eastern-state-penitentiary.jpg`)
- Update CHANGELOG.md when done
