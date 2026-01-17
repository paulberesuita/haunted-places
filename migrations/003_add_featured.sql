-- Add featured column to mark top scary places
ALTER TABLE places ADD COLUMN featured BOOLEAN DEFAULT 0;

-- Initially mark places with images as featured (can be adjusted later)
UPDATE places SET featured = 1 WHERE image_url IS NOT NULL;
