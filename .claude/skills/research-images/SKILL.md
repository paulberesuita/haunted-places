---
name: research-images
description: Find and upload images for existing places. Usage: /research-images [state]
user_invokable: true
agent: researcher
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

Follow the "Operation: Research Images" workflow from your agent definition:

1. **Find places without images**
   ```bash
   npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, city FROM places WHERE state = '[STATE]' AND (image_url IS NULL OR image_url = '') LIMIT 20;"
   ```

2. **For each place:**
   - Search WebSearch: "[place name] [city] wikimedia commons" or "[place name] photo"
   - Prefer: Wikimedia Commons > Official sites > Public domain
   - Download to `temp/[slug].jpg`
   - Upload to R2: `wrangler r2 object put haunted-places-images/[slug].jpg --file=./temp/[slug].jpg --remote`
   - Update DB with image_url

3. **Update CHANGELOG.md** — Document images added

4. **Handoff** — Report how many images uploaded, how many still missing

## Image Sources (Priority Order)

1. **Wikimedia Commons** — Creative Commons licensed, safest
2. **Official site images** — From the place's own website
3. **Public domain historical photos** — Library of Congress, state archives

## Remember

- Always use `--remote` flag for R2 and D1 commands
- Store only filename in image_url (e.g., `eastern-state-penitentiary.jpg`)
- Update CHANGELOG.md when done
