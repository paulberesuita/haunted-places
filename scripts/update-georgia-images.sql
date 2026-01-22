-- Georgia Haunted Places: Update image_url for places with Wikipedia images
-- Images sourced from Wikimedia Commons (CC-licensed)
-- Uploaded to R2 bucket: haunted-places-images/places/
-- Updated: 2026-01-16

-- Savannah locations
UPDATE places SET image_url = 'places/bonaventure-cemetery.jpg' WHERE slug = 'bonaventure-cemetery';
UPDATE places SET image_url = 'places/colonial-park-cemetery.jpg' WHERE slug = 'colonial-park-cemetery';
UPDATE places SET image_url = 'places/the-pirates-house.jpg' WHERE slug = 'the-pirates-house';
UPDATE places SET image_url = 'places/mercer-williams-house.jpg' WHERE slug = 'mercer-williams-house';
UPDATE places SET image_url = 'places/the-kehoe-house.jpg' WHERE slug = 'the-kehoe-house';

-- Atlanta area locations
UPDATE places SET image_url = 'places/fox-theatre.jpg' WHERE slug = 'fox-theatre';
UPDATE places SET image_url = 'places/rhodes-hall.jpg' WHERE slug = 'rhodes-hall';
UPDATE places SET image_url = 'places/oakland-cemetery.jpg' WHERE slug = 'oakland-cemetery';
UPDATE places SET image_url = 'places/six-flags-over-georgia.jpg' WHERE slug = 'six-flags-over-georgia';

-- Battlefields and historic sites
UPDATE places SET image_url = 'places/andersonville-prison.jpg' WHERE slug = 'andersonville-prison';
UPDATE places SET image_url = 'places/chickamauga-battlefield.jpg' WHERE slug = 'chickamauga-battlefield';
UPDATE places SET image_url = 'places/kennesaw-mountain-battlefield.jpg' WHERE slug = 'kennesaw-mountain-battlefield';
UPDATE places SET image_url = 'places/marietta-national-cemetery.jpg' WHERE slug = 'marietta-national-cemetery';

-- Coastal Georgia
UPDATE places SET image_url = 'places/jekyll-island-club.jpg' WHERE slug = 'jekyll-island-club';
UPDATE places SET image_url = 'places/st-simons-lighthouse.jpg' WHERE slug = 'st-simons-lighthouse';
UPDATE places SET image_url = 'places/tybee-island-lighthouse.jpg' WHERE slug = 'tybee-island-lighthouse';

-- Other Georgia locations
UPDATE places SET image_url = 'places/stone-mountain.jpg' WHERE slug = 'stone-mountain';
UPDATE places SET image_url = 'places/barnsley-gardens.jpg' WHERE slug = 'barnsley-gardens';
UPDATE places SET image_url = 'places/central-state-hospital.jpg' WHERE slug = 'central-state-hospital';
UPDATE places SET image_url = 'places/roswell-mill.jpg' WHERE slug = 'roswell-mill';
UPDATE places SET image_url = 'places/georgia-guidestones-site.jpg' WHERE slug = 'georgia-guidestones-site';
UPDATE places SET image_url = 'places/windsor-hotel.jpg' WHERE slug = 'windsor-hotel';
UPDATE places SET image_url = 'places/springer-opera-house.jpg' WHERE slug = 'springer-opera-house';
