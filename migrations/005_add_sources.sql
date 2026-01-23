-- Add source tracking fields to places
-- sources: JSON array of URLs used to compile the entry
-- source_count: number of independent sources (minimum 2 for new entries)

ALTER TABLE places ADD COLUMN sources TEXT;
ALTER TABLE places ADD COLUMN source_count INTEGER DEFAULT 1;

-- Backfill existing places: move source_url into sources array
UPDATE places
SET sources = json_array(source_url),
    source_count = 1
WHERE source_url IS NOT NULL AND source_url != '';
