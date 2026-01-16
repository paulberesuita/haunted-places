-- Phase 1: Update image_url for 6 featured haunted places
-- Images sourced from Wikimedia Commons (CC-licensed)

UPDATE places SET image_url = 'eastern-state-penitentiary.jpg' WHERE slug = 'eastern-state-penitentiary';
UPDATE places SET image_url = 'lalaurie-mansion.jpg' WHERE slug = 'lalaurie-mansion';
UPDATE places SET image_url = 'lizzie-borden-house.jpg' WHERE slug = 'lizzie-borden-house';
UPDATE places SET image_url = 'myrtles-plantation.jpg' WHERE slug = 'myrtles-plantation';
UPDATE places SET image_url = 'sorrel-weed-house.jpg' WHERE slug = 'sorrel-weed-house';
UPDATE places SET image_url = 'witch-house.jpg' WHERE slug = 'witch-house';
