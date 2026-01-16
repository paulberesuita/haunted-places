---
name: query-data
description: Query the database to answer questions. Usage: /query-data [question]
user_invokable: true
agent: researcher
---

# Query Data

You've been invoked to **query data** and answer questions.

**Operation:** Query Data (from researcher agent)

## Your Task

Answer this question: **{{args}}**

If no question was provided, ask the user what they want to know.

## Common Queries

```bash
# Count by state
npx wrangler d1 execute haunted-places-db --remote --command "SELECT state, COUNT(*) as count FROM places GROUP BY state ORDER BY count DESC;"

# All places in a state
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, city, category FROM places WHERE state = 'XX' ORDER BY city;"

# Category distribution
npx wrangler d1 execute haunted-places-db --remote --command "SELECT category, COUNT(*) as count FROM places GROUP BY category ORDER BY count DESC;"

# Places with images
npx wrangler d1 execute haunted-places-db --remote --command "SELECT COUNT(*) as with_images FROM places WHERE image_url IS NOT NULL AND image_url != '';"

# Places without images
npx wrangler d1 execute haunted-places-db --remote --command "SELECT COUNT(*) as without_images FROM places WHERE image_url IS NULL OR image_url = '';"

# Image coverage by state
npx wrangler d1 execute haunted-places-db --remote --command "SELECT state, COUNT(*) as total, SUM(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 ELSE 0 END) as with_images FROM places GROUP BY state ORDER BY total DESC;"

# Recent additions
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, state, created_at FROM places ORDER BY created_at DESC LIMIT 10;"

# Total count
npx wrangler d1 execute haunted-places-db --remote --command "SELECT COUNT(*) as total FROM places;"

# Places in a city
npx wrangler d1 execute haunted-places-db --remote --command "SELECT name, category, address FROM places WHERE city = 'City Name';"

# Search by name
npx wrangler d1 execute haunted-places-db --remote --command "SELECT slug, name, city, state FROM places WHERE name LIKE '%search term%';"
```

## Process

1. Understand the question
2. Write appropriate SQL query
3. Run query against D1
4. Present results clearly
5. Offer follow-up queries if relevant

## Remember

- Read-only operation — don't modify data
- Use `--remote` flag for production database
- Format results for easy reading
