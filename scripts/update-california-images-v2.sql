-- Update California Haunted Places with NEW Authentic Images
-- Sources: Library of Congress (Carol M. Highsmith Archive and HABS/HAER)
-- Date: 2026-01-16
-- Note: These images replace generic Unsplash photos with actual location photos

-- Winchester Mystery House - LOC HABS (color photo of front facade)
UPDATE places SET image_url = 'places/winchester-mystery-house.jpg' WHERE slug = 'winchester-mystery-house';

-- Whaley House - LOC HABS (1960 exterior photo of historic building)
UPDATE places SET image_url = 'places/whaley-house.jpg' WHERE slug = 'whaley-house';

-- Colorado Street Bridge - LOC HAER (overall view of the historic bridge)
UPDATE places SET image_url = 'places/colorado-street-bridge.jpg' WHERE slug = 'colorado-street-bridge';

-- Preston Castle - LOC Carol M. Highsmith 2012 (exterior of reform school building)
UPDATE places SET image_url = 'places/preston-castle.jpg' WHERE slug = 'preston-castle';

-- Delta King Riverboat - LOC Carol M. Highsmith 2012 (steamboat in Old Sacramento)
UPDATE places SET image_url = 'places/delta-king-riverboat.jpg' WHERE slug = 'delta-king-riverboat';

-- Santa Clara University (Mission Santa Clara) - LOC Carol M. Highsmith 2012 (mission church on campus)
UPDATE places SET image_url = 'places/santa-clara-university.jpg' WHERE slug = 'santa-clara-university';

-- The Presidio - LOC Carol M. Highsmith 2012 (historic military post buildings)
UPDATE places SET image_url = 'places/presidio-san-francisco.jpg' WHERE slug = 'presidio-san-francisco';

-- Hotel del Coronado - LOC HABS (historic photo of the Victorian hotel)
UPDATE places SET image_url = 'places/hotel-del-coronado.jpg' WHERE slug = 'hotel-del-coronado';

-- Agnews State Hospital - LOC HABS (campus overview of historic psychiatric facility)
UPDATE places SET image_url = 'places/agnews-state-hospital.jpg' WHERE slug = 'agnews-state-hospital';

-- Griffith Park / Observatory - LOC Carol M. Highsmith 2012 (iconic observatory building)
UPDATE places SET image_url = 'places/griffith-park.jpg' WHERE slug = 'griffith-park';

-- Pantages Theatre - LOC Carol M. Highsmith 2012 (art deco theater at Hollywood and Vine)
UPDATE places SET image_url = 'places/pantages-theatre.jpg' WHERE slug = 'pantages-theatre';

-- Alcatraz Island - LOC Carol M. Highsmith (aerial view of the island prison)
UPDATE places SET image_url = 'places/alcatraz-island.jpg' WHERE slug = 'alcatraz-island';

-- USS Hornet Museum - LOC HAER (aerial view of the aircraft carrier)
UPDATE places SET image_url = 'places/uss-hornet-museum.jpg' WHERE slug = 'uss-hornet-museum';

-- Bodie Ghost Town - LOC Carol M. Highsmith 2012 (town overview from state historic park)
UPDATE places SET image_url = 'places/bodie-ghost-town.jpg' WHERE slug = 'bodie-ghost-town';

-- Hearst Castle - LOC Carol M. Highsmith (aerial view of the estate)
UPDATE places SET image_url = 'places/hearst-castle.jpg' WHERE slug = 'hearst-castle';
