-- Georgia Haunted Places: Update image_url for places with images
-- Images sourced from Wikimedia Commons (CC-licensed)
-- Uploaded to R2 bucket: haunted-places-images/places/

-- Savannah locations
UPDATE places SET image_url = 'places/bonaventure-cemetery.jpg' WHERE slug = 'bonaventure-cemetery';
UPDATE places SET image_url = 'places/colonial-park-cemetery.jpg' WHERE slug = 'colonial-park-cemetery';
UPDATE places SET image_url = 'places/the-marshall-house.jpg' WHERE slug = 'the-marshall-house';
UPDATE places SET image_url = 'places/the-pirates-house.jpg' WHERE slug = 'the-pirates-house';
UPDATE places SET image_url = 'places/moon-river-brewing-company.jpg' WHERE slug = 'moon-river-brewing-company';
UPDATE places SET image_url = 'places/the-olde-pink-house.jpg' WHERE slug = 'the-olde-pink-house';
UPDATE places SET image_url = 'places/savannah-theatre.jpg' WHERE slug = 'savannah-theatre';
UPDATE places SET image_url = 'places/hamilton-turner-inn.jpg' WHERE slug = 'hamilton-turner-inn';

-- Atlanta area locations
UPDATE places SET image_url = 'places/fox-theatre.jpg' WHERE slug = 'fox-theatre';
UPDATE places SET image_url = 'places/rhodes-hall.jpg' WHERE slug = 'rhodes-hall';

-- Other Georgia locations
UPDATE places SET image_url = 'places/lake-lanier.jpg' WHERE slug = 'lake-lanier';
UPDATE places SET image_url = 'places/kennesaw-mountain-battlefield.jpg' WHERE slug = 'kennesaw-mountain-battlefield';
UPDATE places SET image_url = 'places/windsor-hotel.jpg' WHERE slug = 'windsor-hotel';
UPDATE places SET image_url = 'places/dahlonega-gold-museum.jpg' WHERE slug = 'dahlonega-gold-museum';
UPDATE places SET image_url = 'places/georgia-guidestones-site.jpg' WHERE slug = 'georgia-guidestones-site';
UPDATE places SET image_url = 'places/st-simons-lighthouse.jpg' WHERE slug = 'st-simons-lighthouse';
UPDATE places SET image_url = 'places/andersonville-prison.jpg' WHERE slug = 'andersonville-prison';
UPDATE places SET image_url = 'places/stone-mountain.jpg' WHERE slug = 'stone-mountain';
UPDATE places SET image_url = 'places/six-flags-over-georgia.jpg' WHERE slug = 'six-flags-over-georgia';
UPDATE places SET image_url = 'places/oakland-cemetery.jpg' WHERE slug = 'oakland-cemetery';
UPDATE places SET image_url = 'places/chickamauga-battlefield.jpg' WHERE slug = 'chickamauga-battlefield';
UPDATE places SET image_url = 'places/jekyll-island-club.jpg' WHERE slug = 'jekyll-island-club';
