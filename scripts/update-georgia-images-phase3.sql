-- Update Georgia places with new images (Phase 3)
-- 5 images from target list of 26 missing images

-- The Kehoe House (ID 88)
UPDATE places SET image_url = 'places/the-kehoe-house.jpg' WHERE id = 88;

-- Hay House (ID 105)
UPDATE places SET image_url = 'places/hay-house.jpg' WHERE id = 105;

-- Springer Opera House (ID 106)
UPDATE places SET image_url = 'places/springer-opera-house.jpg' WHERE id = 106;

-- Central State Hospital (ID 108)
UPDATE places SET image_url = 'places/central-state-hospital.jpg' WHERE id = 108;

-- Tybee Island Lighthouse (ID 119)
UPDATE places SET image_url = 'places/tybee-island-lighthouse.jpg' WHERE id = 119;
