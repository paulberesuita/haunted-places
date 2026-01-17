# Context

Key decisions, insights, and lessons learned. Update this when making significant decisions or discovering important information.

---

## 2026-01-16

### MA, VA, IL, NY, OH Image Research - Wikipedia/Wikimedia Commons

Fixed images for five states using Wikipedia API to find authentic location photos from Wikimedia Commons.

**States covered:**
- Massachusetts (MA): 15 images
- Virginia (VA): 11 images
- Illinois (IL): 9 images
- New York (NY): 12 images
- Ohio (OH): 8 images
- **Total: 55 images**

**Wikipedia API used:**
```bash
curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=[TITLE]&prop=pageimages&piprop=original&format=json"
```

**Key images uploaded:**

| State | Place | Wikipedia Source |
|-------|-------|------------------|
| MA | Lizzie Borden House | Lizzie_Borden_House_(Bed_Breakfast).jpg |
| MA | Omni Parker House | Omni_Parker_House.jpg |
| MA | House of Seven Gables | House_of_the_Seven_Gables_(front_angle).jpg |
| MA | Hawthorne Hotel | Hawthorne_Hotel.JPG |
| MA | Danvers State Hospital | Danvers_State_Hospital_circa_1893.jpg |
| MA | Hoosac Tunnel | Hoosac_Tunnel_2024.jpg |
| MA | USS Constitution | USS_Constitution_fires_a_17-gun_salute.jpg |
| VA | Monticello | Monticello_reflected.JPG |
| VA | Fort Monroe | Fort_Monroe_Aerial.jpg |
| VA | Governor's Palace | Governor's_Palace_Williamsburg.jpg |
| VA | Peyton Randolph House | Peyton_Randolph_House.jpg |
| VA | Gadsby's Tavern | Gadsby's_Tavern_Alexandria.jpg |
| VA | Hollywood Cemetery | Hollywood_Cemetery_01.jpg |
| VA | Cavalier Hotel | The_Cavalier_Hotel.jpg |
| IL | Biograph Theater | BiographTheater.jpg |
| IL | Lincoln Home | Lincoln_Home_1.jpg |
| IL | Drake Hotel | Drake_Hotel_Chicago_postcard_1920.jpg |
| IL | Resurrection Cemetery | Resurrection_Cemetery_Justice_IL.jpg |
| IL | Wrigley Field | Wrigley_Field_in_line_with_sign.jpg |
| NY | The Dakota | The_Dakota.jpg |
| NY | Fort Ticonderoga | Fort_Ticonderoga.jpg |
| NY | Hotel Chelsea | Chelsea_Manhattan_Aug_2025.jpg |
| NY | Brooklyn Bridge | Brooklyn_Bridge_Manhattan.jpg |
| NY | Sleepy Hollow Cemetery | SleepyHollowNY-entrance.jpg |
| NY | Merchant's House Museum | Merchant's_House_Museum.jpg |
| OH | Ohio State Reformatory | Ohio_State_Reformatory_Mansfield.jpg |
| OH | Franklin Castle | Hannes_Tiedemann_House_Cleveland.jpg |
| OH | Cincinnati Music Hall | Renovated_Cincinnati_Music_Hall.jpg |
| OH | Squire's Castle | Squire's_Castle_2.jpg |

**Places skipped (no Wikipedia page images):**
- Salem Witch House (MA) - Wikipedia title search returned no image
- Congress Plaza Hotel (IL) - No page image
- Bachelor's Grove Cemetery (IL) - No page image
- Hull House (IL) - No page image
- Morris-Jumel Mansion (NY) - Unicode title issues
- Amityville Horror House (NY) - No page image
- Rolling Hills Asylum (NY) - No page image

**Script location:** `scripts/update-five-states-images.sql`

---

### Florida Image Research - Wikipedia/Wikimedia Commons (Fix)

Fixed Florida haunted place images by sourcing authentic photos from Wikipedia/Wikimedia Commons API.

**Sources used:**
- Wikipedia API (`action=query&prop=pageimages&piprop=original`)
- Images from Wikimedia Commons (Creative Commons licensed)

**Images uploaded (30 total):**

| Place | Wikipedia Source | Description |
|-------|------------------|-------------|
| Castillo de San Marcos | Castillo_de_San_Marcos.jpg | Spanish fort exterior |
| St. Augustine Lighthouse | St._Augustine_Lighthouse_1.jpg | Full tower view |
| Lightner Museum | Alcazar_Hotel,_St._Augustine,_FL,_US_(21).jpg | Historic Alcazar Hotel building |
| Flagler College | Ponce_de_Leon_Hotel courtyard view | Courtyard of the historic hotel |
| Casa Monica Hotel | Casa_Monica_Hotel,_St._Augustine,_FL,_US,_2022.jpg | 2022 exterior |
| Huguenot Cemetery | St_Aug_Huguenot_Cem01.jpg | Cemetery entrance |
| Tolomato Cemetery | Tolomato_Cemetery_entryway_July_2012.jpg | Cemetery entryway |
| Spanish Military Hospital | Spanish_Military_Hospital_Museum_(Oblique_View)_01.jpg | Museum building |
| Old Jail | St_Aug_old_county_jail01.jpg | Historic jail exterior |
| Tampa Theatre | TampaTheatre01.jpg | Theatre facade |
| Don CeSar Hotel | Don_Cesar.jpg | Pink palace hotel |
| Cuban Club (Circulo Cubano) | Tampa_Circulo_Cubano01.jpg | Historic social club |
| Plant Hall / Henry B. Plant Museum | Tampa_Bay_Hotel--7022-1.jpg | Moorish Revival architecture |
| May-Stringer House | May-Stringer_House01.jpg | Victorian mansion |
| Ybor City Museum | Centro_Ybor,_Ybor_City,_Tampa,_Florida.jpg | Centro Ybor building |
| Biltmore Hotel | Coral_Gables_FL_Biltmore01.jpg | Iconic hotel exterior |
| Vizcaya Museum | Villa_Vizcaya_20110228.jpg | Italian Renaissance villa |
| Coral Castle | Coral_Castle_1.jpg | Stone structure |
| Deering Estate | Deering_Estates_-_Richmond_Cottage.JPG | Richmond Cottage |
| Stranahan House | Stranahan-house.jpg | Historic house |
| Villa Paula | Villa_Paula.jpg | Historic mansion |
| Audubon House | Audoban_House,_Key_West,_FL,_US.jpg | Key West house |
| Captain Tony's Saloon | Sloppy_Joe's_Bar,_Key_West,_FL,_US_(09).jpg | Original Sloppy Joe's building |
| Devil's Millhopper | Devil's_Millhopper_-_2.jpg | Geological sinkhole |
| Pensacola Lighthouse | Pensacolalh.JPG | Lighthouse tower |
| Fort Pickens | Bastion_of_Fort_Pickens.jpg | Fort bastion |
| Kingsley Plantation | KingsleyPlantationSunset2.jpg | Plantation at sunset |
| Koreshan State Park | Koreshan_SHS_planetary_court02.jpg | Planetary court structure |

**Places without Wikipedia images (20):**
- Artist House, Ashley's Restaurant, Capitol Theatre (Clearwater)
- Casablanca Inn, Cassadaga Hotel, Cassadaga Spiritualist Camp
- Dorr House, Greenwood Cemetery, Hard Rock Cafe Key West
- Key West Cemetery, La Concha Hotel, Marrero's Guest Mansion
- Miami River Inn, Old Town Manor, Ripley's Believe It or Not!
- Safety Harbor Spa, Seville Quarter, St. Francis Inn
- Sunland Hospital Site, The Devil's Chair

**Key learnings:**
- Wikipedia API reliably provides main image for pages with images
- Many smaller B&Bs, inns, and restaurants have no Wikipedia coverage
- The Wikipedia API pattern is: `titles=Page_Title&prop=pageimages&piprop=original`
- Some pages exist but have no images (e.g., Cassadaga Spiritualist Camp)

**Script location:** `/Users/paulberesuita/Desktop/haunted-places/scripts/update-florida-images-wikipedia.sql`

---

### Pennsylvania Image Research - Wikipedia/Wikimedia Commons

Sourced and uploaded authentic Wikipedia images for Pennsylvania haunted places, focusing on major landmarks from Philadelphia, Pittsburgh, and Gettysburg.

**Sources used:**
- Wikipedia API with proper User-Agent header to avoid rate limiting
- Images from Wikimedia Commons (Creative Commons licensed)

**Images replaced (25 total):**

| Place | Wikipedia Source | Description |
|-------|------------------|-------------|
| Eastern State Penitentiary | Eastern_State_Penitentiary_aerial_crop.jpg | Aerial view of the prison |
| Fort Mifflin | Fort_Mifflin_-_Eastman.jpg | Historic fort exterior |
| Independence Hall | Exterior_of_the_Independence_Hall,_Aug_2019.jpg | 2019 exterior photo |
| Betsy Ross House | Betsy_Ross_House_(53572939795).jpg | Historic house facade |
| Carpenters Hall | Carpenters'_Hall,_Philadelphia,_U.S.,_May_2015.jpg | Colonial building |
| City Tavern | CityTavern-Philly.png | Historic tavern exterior |
| First Bank of the United States | First_Bank_of_the_United_States_LCCN2011633532_(edited).jpg | Historic bank building |
| Laurel Hill Cemetery | LaurelHillCemeteryGatehouse(cropped)_HABS314296cv.jpg | Cemetery gatehouse |
| Carnegie Library of Pittsburgh | Interior_of_Carnegie_Library_of_Pittsburgh.jpg | Library interior |
| National Aviary | National_Aviary.jpg | Building exterior |
| Allegheny County Jail/Courthouse | Allegheny_County_Courthouse,_2025-05-24-1.jpg | Richardson Romanesque courthouse |
| Sachs Covered Bridge | Sachs_Bridge_-_Gettysburg.jpg | Historic covered bridge |
| Dobbin House Tavern | Dobbin_Gettysburg_2.JPG | Colonial tavern |
| Cashtown Inn | Cashtown_Inn_Present.JPG | Civil War-era inn |
| Little Round Top | The_Twentieth_Maine.jpg | Battle of Gettysburg painting |
| Devils Den | Battle_of_Gettysburg_painting | Thure de Thulstrup painting |
| Soldiers National Museum | Gettysburg_national_cemetery_img_4164.jpg | National Cemetery |
| Fort Hunter Mansion | Fort_Hunter,_Pennsylvania_(5656723609).jpg | Historic mansion |
| Fulton Theatre | Fulton_Opera_House.jpg | Lancaster opera house |
| Centralia | Old_Mine_Fire_1969.jpg | Historic mine fire photo |
| Jean Bonnet Tavern | Jean_Bonnet_Tavern.jpg | Historic tavern |
| Golden Plough Tavern | YorkPaGPTavern.jpg | York colonial tavern |
| Houdini Museum | Harry_Handcuff_Houdini_Crop.jpg | Houdini portrait |
| Pennhurst Asylum | Admin-current-pennhurst.jpg | Abandoned asylum |
| Church Brew Works | The_Church_Brew_Works.jpg | Church converted to brewery |

**Places still without images (24):**
- AV Restaurant & Lounge, Accomac Inn, Baleroy Mansion
- Clayton (The Frick Mansion), Congress Hall, Dead Man's Hollow
- Doubleday Inn, Farnsworth House Inn, General Lee's Headquarters
- Gettysburg Hotel, Green Man's Tunnel, Hill View Manor
- Hummelbaugh House, Iverson's Pits, Jennie Wade House
- Nemacolin Castle, Omni William Penn Hotel, Pennsylvania Hall
- The Old Jail, The Ritz Theater, The Seven Gates of Hell
- The Slaughter Pen, Triangular Field, Troy Hill Firehouse

**Key learnings:**
- Wikipedia API requires proper User-Agent header to avoid 429 rate limiting
- Some Gettysburg battlefield locations have paintings rather than photos available
- Many smaller/local places have no Wikipedia pages

**Script location:** `/Users/paulberesuita/Desktop/haunted-places/scripts/update-pennsylvania-images.sql`

---

### California Image Research Phase 2 - Wikimedia Commons

Continued the California image research, replacing 21 additional generic Unsplash images with authentic photos from Wikimedia Commons.

**Sources used (in priority order):**
1. Wikimedia Commons - Primary source for most images (Creative Commons licensed)
2. Calisphere attempted but blocked by CloudFront WAF

**Images replaced with Wikimedia Commons sources:**

| Place | Wikimedia Source | Description |
|-------|------------------|-------------|
| Cecil Hotel | Cecil_Hotel,_L.A.jpg | 2015 exterior facade |
| Hollywood Roosevelt Hotel | Hollywood_Roosevelt_Hotel_2015.jpg | Modern exterior view |
| Queen Anne Hotel | 1590_Sutter_Queen_Anne_SF_CA.JPG | Victorian painted lady facade |
| Comedy Store | The_Comedy_Store_West_Hollywood_(51017780551).jpg | Night exterior with sign |
| Claremont Hotel | Berkeley_CA_-_Hotel_Claremont_(NBY_431525).jpg | Historic postcard view |
| Brookdale Lodge | Brookdale_Lodge_in_Brookdale,_California.JPG | Lodge exterior |
| Linda Vista Hospital | Santa_Fe_Coast_Lines_Hospital,_Los_Angeles.JPG | Original hospital building |
| Camarillo State Hospital | CSUCI-camarillo_state_hospital_bell_tower | Bell tower (now CSUCI) |
| Hollywood Forever Cemetery | 2009-0727-CA-Paramount-HollywoodForever.jpg | Cemetery entrance |
| Knickerbocker Hotel | KnickerbockerHotel_Dec2006.jpg | Building exterior |
| Queen Mary | RMS_Queen_Mary_Long_Beach_January_2011_view.jpg | Ship docked at Long Beach |
| Mission Inn | Mission_Inn,_Riverside,_California_(61085).jpg | Historic hotel exterior |
| Cosmopolitan Hotel | San_Diego_Old_Town_Cosmopolitan_Hotel.jpg | Old Town building |
| Curran Theatre | San_Francisco_Curran_Theatre_1.jpg | Theatre entrance |
| Sainte Claire Hotel | Hotel_Sainte_Claire,_on_a_sunny_day.JPG | Downtown San Jose landmark |
| Leland Stanford Mansion | Leland_Stanford_House_(Sacramento,_CA).jpg | Governor's mansion |
| Moss Beach Distillery | Moss_Beach_Distillery_08-15-2009.jpg | Coastal restaurant exterior |
| Mission San Juan Capistrano | Mission_San_Juan_Capistrano_02.jpg | Mission ruins and bell |
| Stow Lake | San_Francisco_Stow_Lake_Strawberry_Hill_pagoda.jpg | Lake with pagoda |
| Point Sur Lighthouse | Point_Sur_Lighthouse_(5063098751).jpg | Lighthouse on rocks |
| Calico Ghost Town | Calico_Mountains_and_Calico_Ghost_Town_(47).jpg | Town overview |

**Images NOT found (will skip rather than use wrong image):**
- El Campo Santo Cemetery - No good Wikimedia images (cemetery is small)
- Monterey Hotel - No specific building photos found
- Old Orange County Courthouse - Skipped (need specific search)
- Big Yellow House Summerland - No documentation found
- Various San Jose road/park locations - Generic by nature

**Total California image coverage:**
- Phase 1 (LOC): 15 images replaced
- Phase 2 (Wikimedia): 21 images replaced
- Total authentic images: 36 of 49 California places (73%)
- Remaining: 13 places still using Unsplash or need research

**Key learnings:**
- Wikimedia Commons has excellent coverage of California historic buildings
- Hotels and theaters are well-documented (tourism photos)
- Creative Commons licensing makes these safe to use
- Some smaller/niche locations have no documentation anywhere

---

### California Image Re-Research - Authentic Location Photos

Re-researched and replaced 15 California haunted place images that were generic Unsplash photos with authentic location-specific photographs from the Library of Congress.

**Problem addressed:**
- Original California images were sourced from Unsplash as generic fallbacks
- Many were "spooky atmosphere" photos that didn't show the actual locations
- Users reported images "are not good" and looked like stock photos

**Solution implemented:**
- Searched Library of Congress HABS, HAER, and Carol M. Highsmith Archive
- Found and downloaded authentic building/location photographs
- Replaced 15 images with actual photos of the haunted places

**Images replaced with LOC sources:**

| Place | Source | Description |
|-------|--------|-------------|
| Winchester Mystery House | HABS CA-2107 | Color front facade photo |
| Whaley House | HABS CA-422 | 1960 exterior photograph |
| Colorado Street Bridge | HAER CA-58 | Overall bridge view |
| Preston Castle | Highsmith 2012 | Reform school exterior |
| Delta King Riverboat | Highsmith 2012 | Steamboat in Old Sacramento |
| Santa Clara University | Highsmith 2012 | Mission church on campus |
| The Presidio | Highsmith 2012 | Historic military buildings |
| Hotel del Coronado | HABS CA-1958 | Historic Victorian hotel |
| Agnews State Hospital | HABS CA-2710 | Campus overview |
| Griffith Park/Observatory | Highsmith 2012 | Iconic observatory building |
| Pantages Theatre | Highsmith 2012 | Art Deco theater exterior |
| Alcatraz Island | Highsmith | Aerial island view |
| USS Hornet Museum | HAER WA-34 | Aircraft carrier aerial |
| Bodie Ghost Town | Highsmith 2012 | Town overview |
| Hearst Castle | Highsmith | Aerial estate view |

**Places still using Unsplash (no LOC images found):**
- Cecil Hotel (LOC has no photos; building is historic landmark)
- Hollywood Roosevelt Hotel (no LOC exterior photos)
- Queen Anne Hotel (no LOC documentation)
- Comedy Store (LOC blog mentions it, no photos)
- Claremont Hotel Berkeley (LOC has NY Claremont, not CA)
- Brookdale Lodge (no LOC documentation)
- Linda Vista Hospital (no LOC documentation)
- Camarillo State Hospital (no LOC photos; archives at CSU Channel Islands)
- And approximately 19 other locations with road/park/generic subjects

**Key learnings:**
- HABS/HAER collections have extensive California coverage for major landmarks
- Carol M. Highsmith's 2012 Jon B. Lovelace California Collection is excellent
- Some locations (newer hotels, private buildings) have no LOC documentation
- A missing image is better than a wrong image - prioritize authenticity

**Script location:** `scripts/update-california-images-v2.sql`

---

### Louisiana Image Research - Complete Coverage

Successfully sourced and uploaded images for all 50 Louisiana haunted locations using Library of Congress and Unsplash.

**Key LOC sources for Louisiana:**
- **Carol M. Highsmith Archive** has excellent Louisiana coverage (2020-2021 pandemic-era photos of plantations)
- Oak Alley Plantation: highsm.67668 (famous live oak alley view)
- Myrtles Plantation: highsm.66574 (manor house exterior)
- Houmas House: highsm.66393 (mansion and grounds)
- San Francisco Plantation: highsm.67806 (turret and cisterns)
- Old Ursuline Convent: highsm.12641 (oldest building in Mississippi Valley)
- Jackson Square/St. Louis Cathedral: highsm.11863, highsm.14835 (historic square and cathedral)
- Bourbon Street: highsm.73003-73007 (2022 street scenes)
- Louisiana Capitol Interior: highsm.67665 (Memorial Hall, Senate chambers)
- Faulkner House/Pirate's Alley: highsm.16364 (next to St. Louis Cathedral)
- Garden District Mansion: highsm.13244 (Grinnan Villa, 1850)

**LOC URL pattern for highsm collection:**
- `https://tile.loc.gov/storage-services/service/pnp/highsm/[XXXXX]/[id]v.jpg`
- Example: highsm.67668 = `/highsm/67600/67668v.jpg`

**Unsplash used for locations not in LOC:**
- French Quarter hotels: Balcony and building imagery
- Restaurants: Interior dining photos
- Cemeteries: Above-ground tomb imagery (Metairie Cemetery photos)
- Theaters: Ornate interior auditorium photos
- University buildings: Gothic/historic academic architecture
- Military barracks: Historic brick building exteriors
- Bed & breakfasts: Victorian mansion exteriors
- Haunted roads: Foggy road night imagery

**Coverage by region:**
- New Orleans French Quarter (25 places): 8 from LOC, 17 from Unsplash
- Louisiana Plantations (10 places): 4 from LOC (Oak Alley, Myrtles, Houmas, San Francisco), 6 from Unsplash
- Baton Rouge (6 places): 1 from LOC (Capitol), 5 from Unsplash
- Shreveport (3 places): Unsplash
- Lafayette (2 places): Unsplash
- Natchitoches (1 place): Unsplash
- Chalmette (1 place): Unsplash

**Script location:** `scripts/update-louisiana-images.sql`

---

### Florida Image Research - Complete Coverage

Successfully sourced and uploaded images for all 50 Florida haunted locations using Library of Congress and Unsplash.

**Key LOC sources for Florida:**
- **Carol M. Highsmith Archive** has good Florida coverage (2020 photos primarily)
- Castillo de San Marcos: highsm.62509 (cannon view of the fort)
- St. Augustine Lighthouse: highsm.62504 (full tower view, completed 1874)
- Flagler College: highsm.62533 (historic Ponce de Leon Hotel building)
- Old Jail St. Augustine: highsm.62566 (1891 jailhouse exterior)
- Coral Castle: highsm.13681 (Edward Leedskalnin's creation)
- Vizcaya Museum: highsm.12197 (James Deering's winter retreat)

**LOC URL pattern for highsm collection:**
- `https://tile.loc.gov/storage-services/service/pnp/highsm/[XXXXX]/[id]v.jpg`
- Example: highsm.62509 = `/highsm/62500/62509v.jpg`

**Unsplash used for locations not in LOC:**
- Key West mansions and inns: Victorian house imagery
- Tampa/Ybor City: Historic buildings and theaters
- Miami hotels: Luxury resort imagery
- Cassadaga: Spiritual/mystical atmosphere photos
- Cemeteries: Spanish moss and tombstone imagery

**Coverage by region:**
- St. Augustine (12 places): 4 from LOC, 8 from Unsplash
- Key West (9 places): Mostly Unsplash
- Tampa/St. Pete area (9 places): Unsplash
- Miami/South Florida (7 places): 2 from LOC (Coral Castle, Vizcaya), 5 from Unsplash
- Orlando/Cassadaga (7 places): Unsplash
- Pensacola/North Florida (6 places): Unsplash

**Script location:** `scripts/update-florida-images.sql`

---

### California Image Research - Complete Coverage

Successfully sourced and uploaded images for all 49 California haunted locations using Library of Congress and Unsplash.

**Key LOC sources for California:**
- **Carol M. Highsmith Archive** has excellent California coverage (2012-2013 photos)
- Alcatraz Island: Multiple aerial and ground-level views available (highsm-14872)
- Queen Mary: Two views available (highsm-11879, highsm-16513)
- Bodie Ghost Town: Extensive coverage with 72 images (highsm-22326 through 22431)
- Hearst Castle: Neptune Pool, Roman Pool, and exterior views (highsm-73008 through 73038)
- Hollywood/Pantages Theatre: Multiple views (highsm-22307 through 22313)
- Griffith Observatory: Several angles available (highsm-22252, 22255, 24222)
- Point Sur Lighthouse: highsm-16070
- Mission Inn Riverside: highsm-25395, 25396
- Calico Ghost Town: highsm-22685

**Unsplash used for locations not in LOC:**
- Winchester Mystery House: Architectural photos of the mansion
- Whaley House: Historic house imagery
- Cecil Hotel: Downtown LA building photos
- Hollywood Roosevelt Hotel: Hollywood landmark imagery
- Hotels/restaurants: Generic but relevant category images

**Coverage by region:**
- San Francisco Bay Area: 7 places (Alcatraz from LOC, others mix)
- Los Angeles area: 7 places (Pantages from LOC, Griffith from LOC)
- San Jose/Silicon Valley: 9 places (mostly Unsplash)
- San Diego: 5 places (Hotel del Coronado from LOC)
- Central Coast: 5 places (Point Sur, Hearst Castle from LOC)
- Ghost Towns: Bodie and Calico both from LOC

**Script location:** `scripts/update-california-images.sql`

---

### Virginia Data Research

Expanded the database to include Virginia, focusing on the state's rich Colonial and Civil War haunted heritage including Colonial Williamsburg, Civil War battlefields, and historic plantations.

**Research approach:**
- Prioritized Colonial Williamsburg (8 locations) as America's largest living history museum with Revolutionary War-era spirits
- Strong coverage of Richmond (10 locations) featuring Hollywood Cemetery, Edgar Allan Poe connections, and Civil War history
- Alexandria/Northern VA (6 locations) including Gadsby's Tavern and the famous "Female Stranger" legend
- Fredericksburg (6 locations) on the bloodiest ground in North America with intense Civil War activity
- Charlottesville (5 locations) featuring Monticello, UVA (where Poe studied), and Michie Tavern
- Shenandoah Valley (6 locations) including VMI, Stonewall Jackson sites, and Civil War hospitals
- Norfolk/Hampton Roads (5 locations) featuring Fort Monroe (400+ years of history) and Edgar Allan Poe sightings
- Virginia Beach/Coastal (4 locations) including the Cavalier Hotel with its mysterious Adolph Coors death

**Key sources:**
- Colonial Ghosts, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Virginia Tourism (official haunted trails and historic sites)
- Ghost City Tours (Williamsburg, Richmond, Alexandria specialists)
- Civil War Trust / National Park Service for battlefield accuracy
- Local ghost tour companies (Richmond Ghosts, Alexandria Ghosts, Neptune Ghosts)

**Categories breakdown:**
- mansion: 14 (Peyton Randolph, Monticello, Kenmore, Carlyle House, etc.)
- other: 9 (Natural Bridge, Church Hill Tunnel, Cape Henry Lighthouse, etc.)
- hotel: 5 (Cavalier, Linden Row Inn, Hotel 24 South, Exchange Hotel, Chamberlin)
- university: 4 (William & Mary, UVA, VMI, Mary Baldwin)
- battlefield: 3 (Fort Monroe, Fredericksburg, Chatham Manor)
- restaurant: 4 (Gadsby's Tavern, Michie Tavern, King's Arms, Shields Tavern)
- museum: 3 (Poe Museum, The Lyceum, Moses Myers House)
- cemetery: 2 (Hollywood Cemetery, Elmwood Cemetery)
- hospital: 1 (Public Hospital of 1773)
- prison: 1 (Historic Albemarle County Jail)

**Notable ghost stories:**
- Peyton Randolph House - cursed by an enslaved person in 1782, General Lafayette felt a phantasmic hand
- The Female Stranger at Gadsby's Tavern - mysterious woman died in 1816, identity never revealed
- Fort Monroe's Ghost Alley - Edgar Allan Poe's ghost, Lincoln in a rocking chair, Women in White
- Cavalier Hotel's Adolph Coors - fell/jumped/pushed from 6th floor, plus a ghost cat and phantom bellhop
- Hollywood Cemetery's Richmond Vampire - bloody figure fled Church Hill Tunnel collapse to a mausoleum
- Fredericksburg Battlefield's Bloody Angle - overwhelming paranormal readings on "bloodiest ground in North America"
- University of Virginia - Poe left a poem about a dark spirit, professor's wife propped dead husband in window

**Geographic distribution:**
- Colonial Williamsburg: 8 locations
- Richmond area: 10 locations
- Alexandria/Northern VA: 6 locations
- Fredericksburg: 6 locations
- Charlottesville: 5 locations
- Shenandoah Valley: 6 locations
- Norfolk/Hampton Roads: 5 locations
- Virginia Beach/Coastal: 4 locations

---

### Texas Image Research - Complete Coverage

Successfully sourced and uploaded images for all 50 Texas haunted locations using Library of Congress and Unsplash.

**Key LOC sources for Texas:**
- **Lyda Hill Texas Collection** in Carol M. Highsmith's America Project - extensive 2014 Texas photography
- Most San Antonio, Austin, Galveston landmarks available in high quality
- URL pattern: `https://tile.loc.gov/image-services/iiif/service:pnp:highsm:[id]/full/pct:50/0/default.jpg`

**HABS (Historic American Buildings Survey) limitations:**
- HABS images return HTML error pages when accessing via IIIF tile server
- Use alternative Unsplash images for HABS-documented buildings

**Coverage by city:**
- San Antonio: 13 places (LOC: Alamo, missions, Spanish Governor's Palace; Unsplash: hotels)
- Galveston: 7 places (LOC: Ashton Villa, Bishop's Palace, Moody Mansion)
- Austin: 5 places (LOC: Capitol, Driskill Hotel, Governor's Mansion)
- Dallas: 4 places (LOC: Adolphus Hotel, White Rock Lake, Majestic Theatre)
- El Paso: 3 places (LOC: Plaza Theatre, Concordia Cemetery, Camino Real interior)
- Fort Worth: 2 places (LOC: Thistle Hill)
- Other cities: 16 places (mix of LOC and Unsplash)

**Script location:** `scripts/update-texas-images.sql`

---

### Image Sourcing - Alternative to Wikimedia Commons

After Wikimedia Commons began rate-limiting and blocking automated image downloads (403 Forbidden errors), discovered effective alternative sources for public domain and free-to-use images.

**Working alternative sources:**
1. **Library of Congress (loc.gov)** - Best source for historic building photos
   - Carol M. Highsmith Archive: 70,000+ contemporary photos of US buildings, all public domain
   - Historic American Buildings Survey (HABS): Historic photos from 1930s onwards
   - Detroit Publishing Co. collection: Historic postcard-quality images
   - URL pattern for downloads: `https://tile.loc.gov/image-services/iiif/service:pnp:highsm:[id]/full/pct:50/0/default.jpg`

2. **Unsplash (unsplash.com)** - Modern free photos
   - All images free for commercial use, no attribution required
   - Good for generic category images (cemeteries, mansions, ruins)
   - URL pattern: `https://images.unsplash.com/photo-[id]?w=1200&q=80`

3. **Digital Library of Georgia (dlg.usg.edu)** - State-specific historic photos
   - Good for Georgia-specific locations
   - Historic postcards and photographs

**Key learnings:**
- Wikimedia Commons curl requests get blocked; use LOC and Unsplash instead
- LOC images are higher quality and legally cleaner (US government = public domain)
- Unsplash provides good fallback images when specific building photos unavailable
- Always resize images to max 1200px width before uploading to R2

**Image sourcing process:**
1. Search LOC first for specific building/location photos
2. If not found, search Unsplash for appropriate category images
3. Download with curl using proper User-Agent header
4. Resize with `sips -Z 1200 input.jpg --out resized/output.jpg`
5. Upload to R2: `npx wrangler r2 object put bucket/places/slug.jpg --file=./resized/slug.jpg --remote`

---

### Florida Data Research

Expanded the database to include Florida, focusing on the state's unique haunted heritage including America's oldest city (St. Augustine), Key West pirate history, Tampa's immigrant community spirits, and the spiritualist community of Cassadaga.

**Research approach:**
- Prioritized St. Augustine as Florida's most haunted region (12 locations) due to 450+ years of history, Spanish colonial heritage, and numerous documented ghost tours
- Strong coverage of Key West (9 locations) including Robert the Doll, Captain Tony's hanging tree, and Victorian-era mansions
- Tampa/St. Pete area (9 locations) featuring the Cuban Club (300+ documented spirits), Don CeSar Hotel, and Ybor City history
- Miami/South Florida (7 locations) including the Biltmore Hotel (Fatty Walsh gangster ghost), Deering Estate, and Coral Castle
- Orlando area (7 locations) with focus on Cassadaga spiritualist camp and its unique paranormal tourism
- Pensacola/North Florida (6 locations) including the most haunted lighthouse in America and Kingsley Plantation

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Official tourism sites: Visit St. Augustine, Visit Florida, Florida Historical Society
- Travel Channel (Ghost Hunters episodes filmed at multiple Florida locations)
- Local news coverage (Tampa Bay Times, Orlando Weekly, Miami New Times)
- Smoky Mountains research (ranked Ashley's Restaurant as "most haunted in America")

**Categories breakdown:**
- hotel: 12 (Casa Monica, Don CeSar, La Concha, Biltmore, Cassadaga Hotel, etc.)
- other: 7 (Castillo de San Marcos, Cuban Club, Coral Castle, Devil's Millhopper, etc.)
- mansion: 7 (Artist House, Deering Estate, May-Stringer House, etc.)
- museum: 6 (Fort East Martello, Lightner Museum, Plant Museum, etc.)
- cemetery: 5 (Huguenot, Key West, Greenwood, Tolomato, Cassadaga)
- restaurant: 4 (Captain Tony's, Ashley's, Hard Rock Key West, Seville Quarter)
- theater: 2 (Tampa Theatre, Capitol Theatre)
- lighthouse: 2 (St. Augustine, Pensacola)
- hospital: 2 (Spanish Military Hospital, Sunland Hospital site)
- university: 1 (Flagler College)
- prison: 1 (Old Jail St. Augustine)
- plantation: 1 (Kingsley Plantation)

**Notable ghost stories:**
- Robert the Doll at Fort East Martello - causes misfortune to those who disrespect him
- The Cuban Club in Ybor City - 300+ documented spirits including Rosalita who was thrown from the balcony
- St. Augustine Lighthouse - two Pittee girls who drowned during construction
- Fatty Walsh at the Biltmore - mobster shot on Friday the 13th on the 13th floor
- Ashley's Restaurant - Ethel Allen murdered in 1934, identified by her rose tattoo
- May-Stringer House - 11 documented ghosts including "Mr. Nasty" in the attic
- Cassadaga - entire town founded for spirit communication, the "Psychic Capital of the World"

**Geographic distribution:**
- St. Augustine: 12 locations (Spanish forts, cemeteries, historic inns)
- Key West: 9 locations (forts, Victorian mansions, saloons)
- Tampa/St. Pete area: 9 locations (Ybor City, Plant Hall, Don CeSar)
- Miami/South Florida: 7 locations (Coral Gables, Fort Lauderdale, Homestead)
- Orlando area: 7 locations (Cassadaga, Greenwood Cemetery, Rockledge)
- Pensacola/North Florida: 6 locations (lighthouses, forts, plantations)

---

### Illinois Data Research

Expanded the database to include Illinois, focusing on the state's unique haunted heritage including Chicago gangster history, Alton as "America's Most Haunted Small Town," Lincoln-related hauntings, and famous haunted cemeteries.

**Research approach:**
- Prioritized Chicago as the major metro area (15 locations) with focus on gangster history (St. Valentine's Day Massacre, Biograph Theater, HH Holmes Murder Castle)
- Strong coverage of Alton area (4 locations) recognized as "America's Most Haunted Small Town" - McPike Mansion, Mineral Springs Hotel
- Springfield coverage (5 locations) focusing on Lincoln-related hauntings - Lincoln's Tomb, Lincoln Home, phantom funeral train legend
- Galena as historic destination (3 locations) with DeSoto House Hotel and Ryan Mansion
- Included famous cemeteries: Bachelor's Grove (most haunted in America), Resurrection Cemetery (Resurrection Mary), Graceland (Inez Clarke statue)
- Covered notorious locations: Hull House Devil Baby legend, Old Joliet Prison, Bartonville Asylum (Old Book legend)

**Key sources:**
- Ghost City Tours, Windy City Ghosts, US Ghost Adventures for Chicago ghost stories
- Haunted Rooms America, Illinois Haunted Houses for statewide coverage
- Rivers and Routes (Alton tourism) for America's Most Haunted Small Town
- Choose Chicago, CBS Chicago, WBEZ for local journalism on hauntings
- Official site histories and local ghost tour companies

**Categories breakdown:**
- other: 9 (massacre sites, landmarks, municipal buildings)
- restaurant: 7 (Red Lion Pub, Golden Dagger, Great Escape, Irish Legend, etc.)
- mansion: 6 (McPike, Lincoln Home, Dana-Thomas House, Ryan Mansion, etc.)
- hotel: 6 (Congress Plaza, Drake, Mineral Springs, DeSoto House, Hotel Baker, Ruebel)
- theater: 4 (Biograph, Rialto Square, Avon, Springfield Theatre)
- cemetery: 4 (Bachelor's Grove, Resurrection, Graceland, Greenwood)
- hospital: 2 (Bartonville Asylum, Elgin State Hospital)
- prison: 1 (Old Joliet Prison)
- museum: 1 (Jane Addams Hull-House)

**Notable ghost stories:**
- Bachelor's Grove Cemetery - Most haunted cemetery in America with the White Lady, Disappearing House, and Capone body dump legend
- Resurrection Mary - Chicago's most famous ghost, hitchhiking woman in white dancing dress who vanishes at cemetery gates since 1930s
- Congress Plaza Hotel - Multiple sealed rooms, Peg Leg Johnny the mischievous ghost, Al Capone's spirit
- Hull House Devil Baby - 1913 mass hysteria about deformed child with hooves and horns
- Old Joliet Prison - Singing ghost legend from 1932, housed John Wayne Gacy and Richard Speck
- Bartonville Asylum - Old Book the gravedigger whose death sparked mass mourning, Graveyard Elm that wailed when cut down
- St. Valentine's Day Massacre - Haunted bricks returned by buyers, outlines appear in fresh snow

**Geographic distribution:**
- Chicago: 15 locations (including Lincoln Park, River North, Englewood, Midlothian suburbs)
- Springfield: 5 locations (Lincoln sites, state buildings)
- Alton area: 4 locations (including Grafton)
- Galena: 3 locations
- Joliet: 2 locations
- Decatur: 2 locations
- Various others: 9 locations (Aurora, Bartonville, Elgin, Mount Carroll, St. Charles, Schiller Park, Willow Springs, Justice)

---

### New York State Data Research

Expanded the database to include New York, focusing on the state's diverse haunted heritage including Revolutionary War sites, the Sleepy Hollow legend, famous NYC landmarks, historic asylums, and the infamous Amityville Horror House.

**Research approach:**
- Prioritized New York City as the largest concentration (10 locations) including Manhattan landmarks and Staten Island
- Strong coverage of Hudson Valley/Sleepy Hollow (7 locations) leveraging the Headless Horseman legend and Washington Irving connection
- Upstate NY coverage (6 locations) including Lake George resorts, Fort Ticonderoga, and Albany
- Long Island coverage (4 locations) including the Amityville Horror House and Kings Park Psychiatric Center
- Western NY representation with Buffalo Central Terminal and Syracuse Landmark Theatre
- Mix of famous and lesser-known locations for variety

**Key sources:**
- NY Ghosts, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Haunted History Trail of New York State (official tourism resource)
- NYC Tourism, Visit Sleepy Hollow for regional coverage
- Ghost Hunters and Ghost Adventures episode references for TV-featured locations
- Wikipedia for historical verification

**Categories breakdown:**
- mansion: 7 (Morris-Jumel, Merchant's House, House of Death, Conference House, Nyack Haunted House, Enslin Mansion, Amityville)
- hotel: 6 (Hotel Chelsea, The Dakota, Sagamore, Shanley, Burn Brae, Fainting Goat Island Inn)
- other: 5 (Brooklyn Bridge, Spook Rock Road, NY State Capitol, Buffalo Central Terminal, Lake Ronkonkoma)
- museum: 4 (Merchant's House, Ellis Island, Fort William Henry, Canfield Casino)
- hospital: 3 (Rolling Hills Asylum, Kings Park Psychiatric Center, Utica State Hospital)
- theater: 3 (Belasco Theatre, Tarrytown Music Hall, Landmark Theatre Syracuse)
- cemetery: 2 (Sleepy Hollow Cemetery, Elmira Civil War Prison Camp)
- battlefield: 1 (Fort Ticonderoga)
- restaurant: 1 (One If by Land, Two If by Sea)

**Notable ghost stories:**
- Rolling Hills Asylum - Roy Crouse, the 7-foot tall shadow man; rated 2nd most haunted in North America
- Sleepy Hollow Cemetery - The Headless Horseman and the Bronze Lady who weeps real tears
- Merchant's House Museum - Gertrude Tredwell never left after 93 years
- Amityville Horror House - The Lutz family's 28-day nightmare; Ed Warren rated it "a 10"
- Belasco Theatre - Broadway's most haunted; David Belasco and the Blue Lady
- Conference House - Servant girl murdered by Loyalist owner still screams
- Nyack Haunted House - Only house legally declared haunted by NY Supreme Court

**Geographic distribution:**
- New York City: 10 locations (Manhattan, Staten Island, Brooklyn)
- Hudson Valley: 7 locations (Sleepy Hollow, Tarrytown, Glen Spey, Napanoch, Nyack, Troy, Hudson)
- Upstate NY: 6 locations (Lake George, Ticonderoga, Saratoga Springs, Albany, East Bethany, Utica)
- Long Island: 4 locations (Amityville, Kings Park, Montauk, Lake Ronkonkoma)
- Western NY: 3 locations (Buffalo, Syracuse, Elmira)
- Southern Tier: 2 locations (Nichols, Elmira)

---

## 2026-01-15

### California Data Research

Expanded the database to include California, focusing on the state's diverse haunted heritage including Gold Rush ghost towns, Spanish mission history, Hollywood legends, and notorious haunted hotels.

**Research approach:**
- Prioritized major metro areas: Los Angeles/Hollywood (7 locations), San Francisco Bay Area (12 locations), San Diego (5 locations), San Jose/South Bay (9 locations)
- Strong coverage of ghost towns: Bodie (most authentic), Calico (family-friendly)
- Included iconic California locations: Alcatraz, Winchester Mystery House, Queen Mary, Hotel del Coronado
- Added Hollywood celebrity ghosts: Marilyn Monroe, Montgomery Clift, Rudolph Valentino
- Covered Central Coast: Hearst Castle, Big Sur lighthouse, Monterey area

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Official site histories (Winchester Mystery House, Hotel del Coronado, Queen Mary)
- Travel Channel (Ghost Adventures episodes filmed at multiple locations)
- Local ghost tour companies and paranormal investigators

**Categories breakdown:**
- other: 18 (ghost towns, bridges, parks, roads with legends)
- hotel: 12 (Hollywood Roosevelt, Cecil, Queen Anne, Brookdale Lodge, etc.)
- mansion: 4 (Winchester Mystery House, Whaley House, Hearst Castle, Big Yellow House)
- museum: 3 (USS Hornet, Old OC Courthouse, Queen Mary)
- theater: 3 (Comedy Store, Curran, Pantages)
- hospital: 3 (Camarillo State, Linda Vista, Agnews State)
- restaurant: 2 (Moss Beach Distillery, Grandview)
- cemetery: 2 (Hollywood Forever, El Campo Santo)
- university: 1 (Santa Clara University)
- prison: 1 (Alcatraz)

**Notable ghost stories:**
- Winchester Mystery House - Sarah Winchester building endlessly to confuse rifle victim ghosts
- Whaley House - "Most haunted house in America" per US Dept of Commerce
- Queen Mary - Up to 150 ghosts including Jackie the pool girl and Door 13 victims
- Cecil Hotel - Serial killers' home, Elisa Lam mystery
- Bodie Ghost Town - Curse makes artifact thieves mail items back with apologies
- Hollywood Roosevelt - Marilyn Monroe's reflection appears in mirrors
- Colorado Street Bridge - Over 150 suicides created "Suicide Bridge" legend

**Geographic distribution:**
- Los Angeles area: 9 locations (incl. West Hollywood, Long Beach, Pasadena)
- San Francisco Bay Area: 7 locations (SF, Berkeley, Alameda)
- San Jose/Silicon Valley: 9 locations (San Jose, Santa Clara, Milpitas)
- San Diego area: 5 locations (San Diego, Coronado, San Juan Capistrano)
- Central/Southern California: 8 locations (various)
- Gold Country: 3 locations (Bodie, Ione, Sacramento)
- Central Coast: 6 locations (Monterey, Big Sur, etc.)

---

### Texas Data Research

Expanded the database to include Texas, focusing on the state's unique haunted heritage including the Alamo and Spanish missions, 1900 Galveston hurricane victims, frontier hotels, and West Texas ghost towns.

**Research approach:**
- Prioritized San Antonio as the most haunted area (13 locations) due to the Alamo and Spanish colonial history
- Strong coverage of Galveston (7 locations) focusing on 1900 hurricane tragedy and Victorian-era mansions
- Austin coverage (5 locations) including the Driskill Hotel, State Capitol, and Texas State Lunatic Asylum
- Dallas/Fort Worth (6 locations) with focus on historic hotels and the Stockyards
- West Texas ghost towns and phenomena (Marfa Lights, Terlingua, Baker Hotel)
- East Texas (Jefferson) known as "most haunted town in Texas"

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- River City Ghosts (San Antonio), Historic Galveston Ghost Tours for local expertise
- Texas Monthly, Houston Chronicle, San Antonio Express-News for regional coverage
- Travel Channel (Ghost Adventures episodes) for featured locations

**Categories breakdown:**
- hotel: 14 (Menger, Emily Morgan, Driskill, Hotel Galvez, etc.)
- other: 13 (Alamo, missions, ghost tracks, Marfa Lights, etc.)
- mansion: 7 (Ashton Villa, Bishop's Palace, Thistle Hill, etc.)
- theater: 4 (Majestic, Grand Opera House, Hippodrome, Plaza)
- hospital: 3 (Austin State Hospital, San Antonio State Hospital, Yorktown Memorial)
- museum: 3 (USS Lexington, Battleship Texas, Dr Pepper Museum)
- cemetery: 2 (Oakwood, Concordia)
- restaurant: 2 (Spaghetti Warehouse, Catfish Plantation)
- prison: 1 (Old Bexar County Jail)
- battlefield: 1 (The Alamo)

**Notable ghost stories:**
- The Alamo's "diablos" with flaming swords who guard the site
- Hotel Galvez's Ghost Bride Audra who hanged herself after her fiance's ship sank
- The Driskill Hotel's four-year-old Samantha who still chases her ball down the stairs
- USS Lexington's tour guide "Charlie" who gives detailed tours despite being dead since 1944
- Yorktown Memorial Hospital's nuns who attack visitors with tattoos
- Baker Hotel's Lady in White (Virginia Brown) who jumped from the 7th floor

---

### R2 Image Storage Setup

Added Cloudflare R2 storage for place images, enabling the researcher agent to populate images for haunted locations.

**Architecture decisions:**
- Created a Pages Function at `/images/[[path]].js` to serve images from R2 rather than enabling public access on the bucket directly
- This approach provides better control over caching headers and CORS
- Images served with 1-year immutable cache for optimal CDN performance
- Added `image_url` column to places table to store the image path (not full URL)

**Usage pattern:**
- Researcher uploads images to R2 with key format: `[slug].jpg` (e.g., `eastern-state-penitentiary.jpg`)
- Store only the filename in `image_url` column
- Frontend constructs full URL: `https://haunted-places.pages.dev/images/[image_url]`

**Wrangler CLI notes:**
- R2 commands default to local; use `--remote` flag for production bucket operations
- Example: `wrangler r2 object put haunted-places-images/image.jpg --file=./image.jpg --remote`

---

### Pennsylvania Data Research

Expanded the database to include Pennsylvania, focusing on Civil War history (Gettysburg), Revolutionary War sites (Philadelphia), and infamous haunted asylums.

**Research approach:**
- Prioritized Gettysburg as the most haunted area (15 locations) due to Battle of Gettysburg casualties (50,000+)
- Strong focus on Philadelphia Revolutionary War sites (10 locations) including Independence Hall, Fort Mifflin, Betsy Ross House
- Pittsburgh coverage (7 locations) including haunted landmarks and urban legends
- Included notorious asylums: Pennhurst Asylum, Hill View Manor
- Added unique locations: Centralia ghost town (underground fire since 1962), Seven Gates of Hell legend

**Key sources:**
- Gettysburg Ghost Tours, US Ghost Adventures, Ghost City Tours for battlefield ghost stories
- Visit PA, Haunted Rooms America for statewide coverage
- National Park Service and American Battlefield Trust for historical accuracy
- Local news and paranormal investigation reports for recent activity

**Categories breakdown:**
- museum: 10 (Independence Hall, Jennie Wade House, Betsy Ross House, etc.)
- restaurant: 7 (City Tavern, Dobbin House, Jean Bonnet Tavern, etc.)
- other: 7 (Centralia, Green Man's Tunnel, Dead Man's Hollow, etc.)
- battlefield: 6 (Devil's Den, Little Round Top, Iverson's Pits, Slaughter Pen, etc.)
- mansion: 5 (Baleroy, Nemacolin Castle, Clayton Frick, etc.)
- hotel: 5 (Farnsworth House, Gettysburg Hotel, Cashtown Inn, etc.)
- prison: 3 (Eastern State Penitentiary, Allegheny County Jail, Old Jail Chambersburg)
- theater: 2 (Fulton Theatre, Ritz Theater)
- hospital: 2 (Pennhurst Asylum, Hill View Manor)
- university: 1 (Pennsylvania Hall at Gettysburg College)
- cemetery: 1 (Laurel Hill Cemetery)

**Notable ghost stories:**
- Pennsylvania Hall elevator that opens to reveal Civil War hospital scene
- Baleroy Mansion's "Chair of Death" that killed 4 people who sat in it
- Cashtown Inn where Confederate ghosts pack guests' luggage
- Fort Mifflin's Screaming Woman who triggers police calls

---

### Louisiana Data Research

Expanded the database to include Louisiana, focusing on the state's unique haunted heritage including voodoo traditions, French colonial history, and plantation ghosts.

**Research approach:**
- Prioritized New Orleans French Quarter as the most haunted area (26 locations)
- Added "plantation" as a new category (11 locations) since Louisiana River Road plantations are famous for paranormal activity
- Included voodoo and Marie Laveau connections to highlight Louisiana's unique spiritual history
- Covered Baton Rouge, Shreveport, Lafayette, and Natchitoches for geographic diversity

**Key sources:**
- Ghost City Tours, US Ghost Adventures, Haunted Rooms America for verified ghost stories
- Official plantation websites (Myrtles, Destrehan, Houmas House) for historical accuracy
- Travel Louisiana and Visit Baton Rouge for regional coverage

**Categories breakdown:**
- other: 12 (pharmacies, mounds, ghost towns, cemeteries with non-cemetery focus)
- plantation: 11 (River Road and regional plantations)
- hotel: 10 (French Quarter haunted hotels)
- mansion: 6 (LaLaurie, Beauregard-Keyes, etc.)
- restaurant: 5 (Muriel's, Lafitte's, Antoine's, Arnaud's, etc.)
- cemetery: 3 (St. Louis Cemeteries No. 1, 2, 3)
- theater: 2 (Saenger, Shreveport Municipal)
- battlefield: 1 (Chalmette)

---

### D1 Database Schema Design

Created the `places` table as the core data model for haunted locations.

**Schema decisions:**
- `slug` field for SEO-friendly URLs (unique, indexed)
- `state` defaults to 'GA' since focusing on Georgia haunted places
- `ghost_story` separate from `description` to allow detailed narratives
- `source_url` for attribution and credibility
- Indexes on state, city, category for filtering performance

**Database ID:** `b32d1ccc-aac8-472b-aedb-144e08e8ff8c`

---

<!-- Add dated entries here, newest first -->

<!-- Example format:

## 2026-01-15

### Decision Title

What was decided and why.

**Key learnings:**
- Insight 1
- Insight 2

---

-->
