# Changelog

What we shipped. Builder appends here after each feature.

---

## 2026-01-16

### Changed
- **Louisiana Images Fixed with Wikipedia/Wikimedia Commons**
  - Used Wikipedia API to source 37 authentic images for Louisiana haunted places
  - Replaced previous Library of Congress/Unsplash images with actual Wikipedia photos of the locations
  - Image sources: Wikipedia API (`action=query&prop=pageimages&piprop=original`) and Wikimedia Commons search
  - **Plantations (8):** Oak Alley, Myrtles, Nottoway, Destrehan, San Francisco, Houmas House, Madewood, Woodland, Magnolia (Natchitoches)
  - **French Quarter Hotels (7):** Hotel Monteleone, Bourbon Orleans, Omni Royal Orleans, Le Pavillon, Hotel Provincial, Place d'Armes, Andrew Jackson
  - **French Quarter Restaurants/Bars (4):** Antoine's, Arnaud's, Old Absinthe House, Lafitte's Blacksmith Shop
  - **French Quarter Mansions (6):** LaLaurie Mansion, Beauregard-Keyes House, Gallier House, Hermann-Grima House, Sultan's Palace, Muriel's Jackson Square
  - **French Quarter Other (6):** Pharmacy Museum, Old Ursuline Convent, St. Louis Cemetery No. 1/2/3, Marie Laveau's House
  - **Baton Rouge (4):** Old State Capitol, Pentagon Barracks, LSU Indian Mounds, Hilton Capitol Center
  - **Shreveport (2):** Municipal Auditorium, Logan Mansion
  - **Other (1):** Front Street Natchitoches, Chalmette Battlefield, Saenger Theatre
  - All images from Wikimedia Commons (Creative Commons licensed)
  - Coverage: 37 of 50 Louisiana places (74%) now have authentic Wikipedia images
  - Created documentation at `scripts/update-louisiana-images-wikipedia.sql`

- **California Images Phase 2 - Wikimedia Commons**
  - Replaced 21 additional California place images with authentic Wikimedia Commons photos
  - Previous images were generic Unsplash stock photos; new images show actual buildings
  - Image sources: Wikimedia Commons (Creative Commons licensed)
  - Key images updated:
    - Los Angeles: Cecil Hotel, Hollywood Roosevelt Hotel, Comedy Store, Linda Vista Hospital, Camarillo State Hospital, Hollywood Forever Cemetery, Knickerbocker Hotel
    - San Francisco: Queen Anne Hotel, Curran Theatre, Stow Lake
    - Bay Area: Claremont Hotel (Berkeley), Brookdale Lodge
    - Central California: Queen Mary (Long Beach), Mission Inn (Riverside), Leland Stanford Mansion (Sacramento), Moss Beach Distillery, Point Sur Lighthouse
    - San Diego: Cosmopolitan Hotel
    - Other: Mission San Juan Capistrano, Sainte Claire Hotel (San Jose), Calico Ghost Town
  - Total California images now authentic: 36 of 49 (73%)
  - Combined with Phase 1 (15 LOC images): 36 places have real location photos
  - Remaining 13 places using Unsplash or generic (roads, small parks, undocumented buildings)

- **Florida Images Fixed with Wikipedia/Wikimedia Commons**
  - Used Wikipedia API to source 30 authentic images for Florida haunted places
  - Replaced previous generic/incorrect images with actual location photos
  - Image sources: Wikipedia API (`action=query&prop=pageimages&piprop=original`)
  - Places with real images (30):
    - St. Augustine (9): Castillo de San Marcos, St. Augustine Lighthouse, Flagler College, Lightner Museum, Casa Monica Hotel, Huguenot Cemetery, Tolomato Cemetery, Spanish Military Hospital, Old Jail
    - Tampa/St. Pete (7): Tampa Theatre, Don CeSar Hotel, Cuban Club, Plant Hall, Henry B. Plant Museum, May-Stringer House, Ybor City Museum
    - Miami/South Florida (6): Biltmore Hotel, Vizcaya Museum, Coral Castle, Deering Estate, Stranahan House, Villa Paula
    - Key West (2): Captain Tony's Saloon, Audubon House
    - North Florida (5): Pensacola Lighthouse, Fort Pickens, Kingsley Plantation, Koreshan State Park, Devil's Millhopper
  - Places without Wikipedia images (20): Smaller B&Bs, restaurants, and locations without Wikipedia coverage
  - Coverage: 30 of 50 Florida places (60%) now have authentic Wikipedia images

- **Research Images Skill Improvements**
  - Updated image source priority to focus on location-specific photos over generic stock images
  - New source hierarchy: Wikimedia Commons → Official websites → Google Maps → Flickr CC → Find A Grave (cemeteries) → Historical archives → TripAdvisor → Unsplash (last resort only)
  - Added category-specific search strategies (Find A Grave for cemeteries, TripAdvisor for hotels/restaurants, etc.)
  - Added verification checklist before downloading: must show actual building, be identifiable, have proper license
  - Explicit guidance: skip places rather than use wrong/generic images
  - Updated both `/research-images` skill and researcher agent with new workflow

### Added
- **Louisiana Haunted Places Images (Complete)**
  - Downloaded and uploaded 48 images for remaining Louisiana haunted locations (2 already had images)
  - Image sources: Library of Congress (Carol M. Highsmith Archive) and Unsplash (free commercial use)
  - New Orleans French Quarter (25 places): Lafitte's Blacksmith Shop (LOC), Muriel's (LOC Jackson Square), St. Louis Cemetery No. 1 (LOC), Old Ursuline Convent (LOC), Sultan's Palace, Pharmacy Museum, Antoine's, Arnaud's, Hotel Monteleone, Le Pavillon, Bourbon Orleans Hotel, Andrew Jackson Hotel, Hotel Provincial, Dauphine Orleans, Place d'Armes, Omni Royal Orleans, Saenger Theatre, Marie Laveau House, Beauregard-Keyes House, Hermann-Grima House, Faulkner House (LOC), Gallier House, St. Louis Cemetery No. 2, St. Louis Cemetery No. 3, Old Absinthe House
  - Louisiana Plantations (10 places): Oak Alley (LOC), Myrtles (LOC), Houmas House (LOC), San Francisco (LOC), Destrehan, Nottoway, Magnolia (Schriever), Magnolia (Natchitoches), Madewood, St. Maurice, Woodland
  - Baton Rouge (6 places): Louisiana Old State Capitol (LOC), Pentagon Barracks, Hilton Capitol Center, LSU Indian Mounds, Pleasant Hall, Highland Road Confederate Ghosts
  - Shreveport (3 places): Municipal Auditorium, Logan Mansion, Old Ellerbe Road School
  - Lafayette (2 places): Harris Hall ULL, T'Frere's House B&B
  - Natchitoches (1 place): Front Street
  - Chalmette (1 place): Chalmette Battlefield
  - All images resized to 1200px max width for web performance
  - Created update script at `scripts/update-louisiana-images.sql`
  - All 50 Louisiana places now have images (100% coverage)
  - Total: 248 places now have images (49 GA + 49 CA + 50 TX + 50 FL + 50 LA)

- **Florida Haunted Places Images (Complete)**
  - Downloaded and uploaded 50 images for all Florida haunted locations
  - Image sources: Library of Congress (Carol M. Highsmith Archive) and Unsplash (free commercial use)
  - St. Augustine (12 places): Castillo de San Marcos (LOC), St. Augustine Lighthouse (LOC), Huguenot Cemetery, Old Jail (LOC), Spanish Military Hospital, Casa Monica Hotel, Flagler College (LOC), Lightner Museum, Casablanca Inn, Ripley's Believe It or Not!, St. Francis Inn, Tolomato Cemetery
  - Key West (9 places): Fort East Martello, Artist House, Captain Tony's Saloon, Audubon House, La Concha Hotel, Marrero's Guest Mansion, Hard Rock Cafe, Key West Cemetery, Old Town Manor
  - Tampa/St. Pete area (9 places): Don CeSar Hotel, Cuban Club, Tampa Theatre, Plant Hall, Henry Plant Museum, May-Stringer House, Capitol Theatre, Safety Harbor Spa, Ybor City Museum
  - Miami/South Florida (7 places): Biltmore Hotel, Deering Estate, Coral Castle (LOC), Villa Paula, Miami River Inn, Stranahan House, Vizcaya Museum (LOC)
  - Orlando/Cassadaga (7 places): Greenwood Cemetery, Cassadaga Hotel, Devil's Chair, Sunland Hospital Site, Ashley's Restaurant, Cassadaga Spiritualist Camp, Devil's Millhopper
  - Pensacola/North Florida (6 places): Pensacola Lighthouse, Fort Pickens, Kingsley Plantation, Koreshan State Park, Dorr House, Seville Quarter
  - All images resized to 1200px max width for web performance
  - Created update script at `scripts/update-florida-images.sql`
  - All 50 Florida places now have images (100% coverage)
  - Total: 198 places now have images (49 GA + 49 CA + 50 TX + 50 FL)

- **SSR State Page Function**
  - Created server-side rendered state pages at `/states/[slug]` (e.g., `/states/california`)
  - Matches new Minimal Gallery style with same design as homepage
  - All place links pre-rendered in HTML for SEO
  - Horizontal scrollable state filter bar with active state highlighted
  - Card grid showing all places in the state with ghost emoji placeholders
  - All 11 states now have SSR pages (CA, FL, GA, IL, LA, MA, NY, OH, PA, TX, VA)

### Fixed
- **Image Display Issue**
  - Added `public/_headers` file to set correct Content-Type headers for images and API responses
  - Images now served with `Content-Type: image/jpeg` instead of incorrect `text/html`
  - API responses now served with `Content-Type: application/json`
  - 148 places now display images correctly (49 GA + 49 CA + 50 TX)

### Changed
- **Homepage Redesign (Minimal Gallery Style)**
  - Complete SSR (Server-Side Rendering) homepage for SEO — all content now in HTML, no JavaScript-loaded skeletons
  - New design inspired by Minimal.gallery and Godly.website:
    - Simple header with logo and minimal nav
    - Small centered tagline: "Discover America's most haunted places"
    - Horizontal scrollable state filter row
    - Card grid with images + place names (4 columns desktop, 2 tablet, 1 mobile)
  - 50 places pre-rendered in HTML for search engines
  - All 11 state links included for crawlers
  - Places with images prioritized at top of grid
  - Added Virginia to state mappings

- Homepage Simplification
  - Replaced stats bar (places/states/categories counts) with atmospheric tagline: "Every location has a story. Some refuse to stay buried."
  - Removed "Browse by Category" section to reduce decision fatigue — kept only "Browse by State"
  - Fixed inconsistent state name display — all states now show full names (California, not CA)
  - Added missing states to mappings: CA, FL, IL, NY, TX (in addition to existing GA, LA, MA, PA)
  - Removed unused loadStats() and loadCategories() JavaScript functions

### Added
- California Haunted Places Images (Complete)
  - Downloaded and uploaded 49 images for all California haunted locations
  - Image sources: Library of Congress (Carol M. Highsmith Archive) and Unsplash (free commercial use)
  - San Francisco Bay Area (7 places): Alcatraz Island, Queen Anne Hotel, Stow Lake, Curran Theatre, The Presidio, USS Hornet Museum (Alameda), Claremont Hotel (Berkeley)
  - Los Angeles area (7 places): Hollywood Roosevelt Hotel, Cecil Hotel, Hollywood Forever Cemetery, Knickerbocker Hotel, Pantages Theatre, Griffith Park, Linda Vista Hospital
  - San Jose/Silicon Valley (9 places): Winchester Mystery House, Grandview Restaurant, Sainte Claire Hotel, Hicks Road, Santa Teresa Park, Quimby Road, Marsh Road (Milpitas), Great America, Santa Clara University
  - San Diego area (5 places): Whaley House, El Campo Santo Cemetery, Cosmopolitan Hotel, Hotel del Coronado (Coronado)
  - Central Coast (5 places): Point Sur Lighthouse (Big Sur), Monterey Hotel, Moss Beach Distillery, Hearst Castle (San Simeon), Ghost Tree 17-Mile Drive (Pebble Beach)
  - Sacramento (2 places): Delta King Riverboat, Leland Stanford Mansion
  - Other cities (14 places): Bodie Ghost Town, Calico Ghost Town (Yermo), Preston Castle (Ione), Brookdale Lodge, Camarillo State Hospital, Agnews State Hospital, Colorado Street Bridge (Pasadena), Mission San Juan Capistrano, Mission Inn (Riverside), Old Orange County Courthouse (Santa Ana), Ocean Street White Lady (Santa Cruz), Arana Gulch (Santa Cruz), Big Yellow House (Summerland), The Comedy Store (West Hollywood)
  - All images resized to 1200px max width for web performance
  - Created update script at `scripts/update-california-images.sql`
  - All 49 California places now have images (100% coverage)

- Texas Haunted Places Images (Complete)
  - Downloaded and uploaded 50 images for all Texas haunted locations
  - Image sources: Library of Congress (Carol M. Highsmith Archive, Lyda Hill Texas Collection) and Unsplash (free commercial use)
  - San Antonio (13 places): The Alamo, Menger Hotel, Emily Morgan Hotel, Crockett Hotel, Hotel Gibbs, Mission San Jose, Mission Espada, San Antonio State Hospital, Ghost Tracks, San Fernando Cathedral, St. Anthony Hotel, Spanish Governor's Palace, Old Bexar County Jail
  - Galveston (7 places): Hotel Galvez, Ashton Villa, Bishop's Palace, Moody Mansion, 1894 Grand Opera House, Battleship Texas, Tremont House
  - Austin (5 places): The Driskill Hotel, Texas State Capitol, Governor's Mansion, Oakwood Cemetery, Austin State Hospital
  - Dallas (4 places): The Adolphus Hotel, White Rock Lake, Sons of Hermann Hall, Majestic Theatre
  - El Paso (3 places): Camino Real Hotel, Concordia Cemetery, Plaza Theatre
  - Fort Worth (2 places): Miss Molly's Hotel, Thistle Hill Mansion
  - Houston (2 places): Julia Ideson Building, Spaghetti Warehouse
  - Jefferson (2 places): Excelsior House Hotel, The Grove
  - Waco (4 places): Waco Hippodrome Theatre, Dr Pepper Museum, Cameron Park, ALICO Building
  - Other cities: USS Lexington (Corpus Christi), Baker Hotel (Mineral Wells), Fort Phantom Hill (Abilene), Gage Hotel (Marathon), Marfa Lights (Marfa), Terlingua Ghost Town, Catfish Plantation (Waxahachie), Yorktown Memorial Hospital
  - All images resized to 1200px max width for web performance
  - Created update script at `scripts/update-texas-images.sql`
  - All 50 Texas places now have images (100% coverage)

- Georgia Haunted Places Images (Phase 4 - Complete)
  - Downloaded and uploaded 21 images for remaining Georgia places using alternative sources
  - Image sources: Library of Congress (Carol M. Highsmith Archive, Fort Jackson collection) and Unsplash (free commercial use)
  - Savannah: 17Hundred90 Inn, Old Candler Hospital, Mercer-Williams House, Forsyth Park Inn, Mansion on Forsyth Park
  - Atlanta area: The Ellis Hotel
  - Marietta area: Kennesaw House, Kolb Farm, William Root House, Marietta National Cemetery
  - Roswell: The Public House, Roswell Mill Ruins
  - North Georgia: Barnsley Gardens Resort (Adairsville), Surrency Poltergeist Site
  - Central Georgia: Orna Villa (Oxford), Scull Shoals Ghost Town (Greensboro), The 1842 Inn (Macon), Eagle Tavern Museum (Watkinsville)
  - Augusta area: Ezekiel Harris House, The Partridge Inn, The Fitzpatrick Hotel (Washington)
  - All images resized to 1200px max width for web performance
  - Created update script at `scripts/update-georgia-images-phase4.sql`
  - All 49 Georgia places now have images (100% coverage)
  - Note: Wikimedia Commons was rate-limiting/blocking requests, so switched to LOC and Unsplash

- Virginia Haunted Places Data
  - Researched and populated 50 haunted locations across Virginia
  - Categories: 14 mansions, 9 other, 5 hotels, 4 universities, 4 restaurants, 3 museums, 3 battlefields, 2 cemeteries, 1 hospital, 1 prison
  - Geographic coverage: 10 in Richmond, 8 in Colonial Williamsburg, 6 in Alexandria, 6 in Fredericksburg, 6 in Shenandoah Valley, 5 in Charlottesville, 5 in Hampton Roads, 4 in Virginia Beach
  - Notable locations: Peyton Randolph House, Monticello, Gadsby's Tavern (Female Stranger), Fort Monroe, Cavalier Hotel, Hollywood Cemetery
  - Created seed script at `scripts/seed-virginia.sql`

- Georgia Haunted Places Images (Phase 3)
  - Downloaded and uploaded 5 additional CC-licensed images from Library of Congress to R2
  - Added: The Kehoe House (Savannah), Hay House (Macon), Springer Opera House (Columbus), Central State Hospital (Milledgeville), Tybee Island Lighthouse (Tybee Island)
  - Images sourced from Carol M. Highsmith Archive (LOC) and Historic American Buildings Survey (HABS)
  - Created update script at `scripts/update-georgia-images-phase3.sql`
  - 28 of 49 Georgia places now have images
  - Note: Wikimedia Commons blocked automated downloads (403 Forbidden), limiting image collection
  - 21 places still need images - requires manual download or alternative sources

- Georgia Haunted Places Images (Phase 2)
  - Downloaded and uploaded 22 CC-licensed images from Wikimedia Commons to R2
  - Savannah locations: Bonaventure Cemetery, Colonial Park Cemetery, The Marshall House, The Pirates' House, Moon River Brewing Company, The Olde Pink House, Savannah Theatre, Hamilton-Turner Inn
  - Atlanta area: Fox Theatre, Oakland Cemetery, Rhodes Hall
  - Other Georgia: Lake Lanier, Kennesaw Mountain Battlefield, Windsor Hotel (Americus), Dahlonega Gold Museum, Georgia Guidestones Site, St. Simons Lighthouse, Andersonville Prison, Stone Mountain, Six Flags Over Georgia, Chickamauga Battlefield, Jekyll Island Club
  - All images resized to 1200px max width for web performance
  - Updated database with image_url for 22 Georgia places
  - Created update script at `scripts/update-georgia-images.sql`

- Florida Haunted Places Data
  - Researched and populated 50 haunted locations across Florida
  - Categories: 12 hotels, 7 other, 7 mansions, 6 museums, 5 cemeteries, 4 restaurants, 2 theaters, 2 lighthouses, 2 hospitals, 1 university, 1 prison, 1 plantation
  - Geographic coverage: 12 in St. Augustine, 9 in Key West, 5 in Tampa, 4 in Miami, 3 in Pensacola, 3 in Cassadaga, plus 14 other cities
  - Created seed script at `scripts/seed-florida.sql`
  - Focus areas: St. Augustine (America's oldest city ghost tours), Key West (Robert the Doll, Captain Tony's), Tampa/Ybor City (Cuban Club), Miami (Biltmore Hotel, Coral Castle), Cassadaga (Psychic Capital of the World)
  - Notable locations: Castillo de San Marcos (oldest masonry fort), Fort East Martello (Robert the Doll), The Don CeSar Hotel (Pink Lady), The Cuban Club (300 spirits), Ashley's Restaurant (most haunted in America), May-Stringer House (most haunted in Florida)
  - All locations include coordinates, descriptions, ghost stories, and source URLs
  - Total database now contains 425 haunted places across 9 states (CA, FL, GA, IL, LA, MA, NY, PA, TX)

- Illinois Haunted Places Data
  - Researched and populated 40 haunted locations across Illinois
  - Categories: 9 other, 7 restaurants, 6 mansions, 6 hotels, 4 theaters, 4 cemeteries, 2 hospitals, 1 prison, 1 museum
  - Geographic coverage: 15 in Chicago, 5 in Springfield, 3 in Galena, 3 in Alton, 2 in Joliet, 2 in Decatur, plus 10 other cities
  - Created seed script at `scripts/seed-illinois.sql`
  - Focus areas: Chicago gangster history (St. Valentine's Day Massacre, Biograph Theater), Alton "America's Most Haunted Small Town" (McPike Mansion, Mineral Springs Hotel), Lincoln-related hauntings (Springfield), famous cemeteries (Bachelor's Grove, Resurrection Mary, Graceland)
  - Notable locations: Congress Plaza Hotel (most haunted in state), Bachelor's Grove Cemetery (most haunted cemetery in America), H.H. Holmes Murder Castle site, Hull House Devil Baby, Wrigley Field ghosts, Old Joliet Prison, Bartonville Asylum (Old Book legend)
  - All locations include coordinates, descriptions, ghost stories, and source URLs
  - Total database now contains 375 haunted places across 8 states (CA, GA, IL, LA, MA, NY, PA, TX)

- New York State Haunted Places Data
  - Researched and populated 32 haunted locations across New York State
  - Categories: 7 mansions, 6 hotels, 5 other, 4 museums, 3 hospitals, 3 theaters, 2 cemeteries, 1 battlefield, 1 restaurant
  - Geographic coverage: 10 in New York City, 7 in Hudson Valley/Sleepy Hollow, 6 in Upstate NY, 4 on Long Island, 3 in Western NY, 2 in Southern Tier
  - Created seed script at `scripts/seed-new-york.sql`
  - Focus areas: NYC landmarks (The Dakota, Hotel Chelsea, Brooklyn Bridge), Sleepy Hollow/Headless Horseman legend, Revolutionary War sites (Fort Ticonderoga, Conference House), haunted asylums (Rolling Hills, Kings Park)
  - Notable locations: Morris-Jumel Mansion (oldest residence in Manhattan), Merchant's House Museum ("Manhattan's Most Haunted"), Amityville Horror House, Belasco Theatre (Broadway's most haunted), The Sagamore Resort, Sleepy Hollow Cemetery, Buffalo Central Terminal
  - All locations include coordinates, descriptions, ghost stories, and source URLs
  - Total database now contains 335 haunted places across 7 states (CA, GA, LA, MA, NY, PA, TX)

---

## 2026-01-15

### Added
- California Haunted Places Data
  - Researched and populated 49 haunted locations across California
  - Categories: 18 other, 12 hotels, 4 mansions, 3 museums, 3 theaters, 3 hospitals, 2 restaurants, 2 cemeteries, 1 university, 1 prison
  - Geographic coverage: 9 in LA area, 7 in SF Bay Area, 9 in San Jose/Silicon Valley, 5 in San Diego area, plus 19 other locations
  - Created seed scripts at `scripts/seed-california.sql` and `scripts/seed-california-additional.sql`
  - Focus areas: Hollywood celebrity ghosts, Gold Rush ghost towns (Bodie, Calico), Spanish missions, Victorian mansions
  - Notable locations: Alcatraz Island, Winchester Mystery House, Queen Mary, Hotel del Coronado, Hollywood Roosevelt Hotel, Cecil Hotel, Whaley House, Bodie Ghost Town, Colorado Street Bridge (Suicide Bridge)
  - All locations include coordinates, descriptions, ghost stories, and source URLs
  - Total database now contains 303 haunted places across 6 states (CA, GA, LA, MA, PA, TX)

- Texas Haunted Places Data
  - Researched and populated 50 haunted locations across Texas
  - Categories: 14 hotels, 13 other, 7 mansions, 4 theaters, 3 museums, 3 hospitals, 2 restaurants, 2 cemeteries, 1 prison, 1 battlefield
  - Geographic coverage: 13 in San Antonio, 7 in Galveston, 5 in Austin, 4 in Dallas, 4 in Waco, 3 in El Paso, 2 in Fort Worth, 2 in Houston, 2 in Jefferson, plus 8 other cities
  - Created seed scripts at `scripts/seed-texas.sql` and `scripts/seed-texas-additional.sql`
  - Focus areas: Alamo and Spanish missions (San Antonio), 1900 hurricane victims (Galveston), frontier hotels (West Texas), ghost towns (Terlingua, Marfa)
  - Notable locations: The Alamo, Menger Hotel, Emily Morgan Hotel, Hotel Galvez (Ghost Bride), The Driskill Hotel, USS Lexington (Blue Ghost), Yorktown Memorial Hospital, Baker Hotel, Miss Molly's Hotel, Excelsior House
  - All locations include coordinates, descriptions, ghost stories, and source URLs
  - Total database now contains 254 haunted places across 5 states (GA, LA, MA, PA, TX)

- Image Display on Frontend
  - Individual Place Pages: Full-width hero image with dark gradient overlay for text readability
  - Homepage Featured Places: Image thumbnails on cards with hover zoom effect
  - State Pages: Thumbnail images on place cards (displays when image_url exists)
  - Open Graph and Twitter Card meta tags include images for social sharing
  - Structured data includes image property for SEO
  - Graceful fallback: cards show category icon placeholder when no image available
  - Error handling: broken images gracefully hide without breaking layout
  - Lazy loading on all card images for performance

- Phase 1 Featured Place Images
  - Downloaded and uploaded 6 CC-licensed images from Wikimedia Commons to R2
  - Eastern State Penitentiary (Philadelphia, PA)
  - LaLaurie Mansion (New Orleans, LA)
  - Lizzie Borden House (Fall River, MA)
  - The Myrtles Plantation (St. Francisville, LA)
  - Sorrel-Weed House (Savannah, GA)
  - The Witch House (Salem, MA)
  - Updated database with image_url for all 6 places
  - Created update script at `scripts/update-images-phase1.sql`

- R2 Storage Setup for place images
  - Created R2 bucket `haunted-places-images` with binding `IMAGES`
  - Added `image_url` column to places table via migration 002
  - Created image serving function at `/images/[[path]].js`
  - Public URL pattern: `https://haunted-places.pages.dev/images/[filename]`
  - Images are cached for 1 year with immutable headers

- Individual Place Pages for all 204 haunted locations
  - Dynamic server-side rendered pages using Cloudflare Pages Functions
  - Route: `/place/[slug]` (e.g., `/place/eastern-state-penitentiary`)
  - Hero section with place name, city, state, category badge, and year established
  - Full description in "About This Location" card
  - Ghost story section with red accent glow effect
  - Sidebar with location info, Google Maps link, quick facts, source attribution, and explore more links
  - "More Haunted Places in [City]" section showing up to 6 related places
  - Breadcrumb navigation (Home > State > Place Name)
  - Full SEO meta tags (title, description, Open Graph, Twitter Card)
  - TouristAttraction structured data schema with geo coordinates
  - Custom 404 page with spooky messaging for non-existent places
  - Mobile responsive design matching site aesthetic
  - Updated homepage and all state pages to link to new `/place/[slug]` URLs
  - Deployed to https://haunted-places.pages.dev/place/[slug]

- State Landing Pages for all 4 states (GA, LA, MA, PA)
  - Routes: `/states/georgia`, `/states/louisiana`, `/states/massachusetts`, `/states/pennsylvania`
  - Hero section with state name, place count, and intro about state's haunted history
  - Browse by City section with clickable city cards sorted by place count
  - All Places grid showing every location in the state with name, city, category, and description
  - Breadcrumb navigation (Home > State)
  - SEO meta tags optimized for "[State] haunted places" searches
  - Structured data (ItemList schema) for Google rich results
  - Loading skeletons for all dynamic sections
  - Error handling with toast notifications
  - Mobile responsive design matching homepage aesthetic
  - Updated homepage state cards to link to new state pages
  - Deployed to https://haunted-places.pages.dev/states/[state-name]

### Fixed
- Homepage "Failed to load data" error - frontend JavaScript was expecting different API response format
  - API returns `{ data: [...] }` wrapper and `place_count` field
  - Frontend was expecting array directly and `count` field
  - Updated `loadStats()`, `loadStates()`, `loadCategories()`, `loadFeaturedPlaces()`, and search functions

### Homepage
- Hero section with bold headline and search bar
- Stats bar showing 204 haunted places, 4 states, and category count
- Browse by State section with clickable cards for GA, LA, MA, PA
- Browse by Category section with emoji icons and counts for all 11 categories
- Featured Places grid with 6 hand-picked notorious locations
- Search functionality with debounced autocomplete (searches name and city)
- Dark, spooky but modern aesthetic with accent color (#e94560)
- Loading skeletons for all dynamic sections
- Error handling with toast notifications
- Mobile responsive design using Tailwind CDN
- Meta tags and Open Graph for SEO
- Deployed to https://haunted-places.pages.dev

### API Endpoints
- Created REST API using Cloudflare Pages Functions
- `GET /api/places` - List all places with filters (state, city, category, limit, offset) and pagination metadata
- `GET /api/places/:slug` - Get single place by URL slug
- `GET /api/states` - List all states with place counts
- `GET /api/cities` - List all cities with place counts, optional state filter
- `GET /api/categories` - List all categories with place counts
- Added CORS headers for cross-origin requests
- 5-minute cache headers on all endpoints
- Proper error handling (404 for not found, 500 for server errors)
- Deployed to https://haunted-places.pages.dev

### Pennsylvania Haunted Places Data
- Researched and populated 49 haunted locations across Pennsylvania
- Categories: 10 museums, 7 restaurants, 7 other, 6 battlefields, 5 mansions, 5 hotels, 3 prisons, 2 theaters, 2 hospitals, 1 university, 1 cemetery
- Geographic coverage: 15 in Gettysburg, 10 in Philadelphia, 7 in Pittsburgh, 3 in Scranton, plus 14 other locations
- Created seed script at `scripts/seed-pennsylvania.sql`
- Focus areas: Civil War battlefields (Gettysburg), Revolutionary War sites (Philadelphia), haunted asylums (Pennhurst, Hill View Manor)
- Notable locations: Eastern State Penitentiary, Fort Mifflin, Devil's Den, Pennsylvania Hall (haunted elevator), Cashtown Inn, Centralia ghost town, Baleroy Mansion (Death Chair)
- All locations include coordinates, descriptions, ghost stories, and source URLs

### Massachusetts Haunted Places Data
- Researched and populated 56 haunted locations across Massachusetts
- Categories: 17 other, 12 cemeteries, 11 mansions, 6 hotels, 4 museums, 2 hospitals, 1 theater, 1 restaurant, 1 prison, 1 university
- Geographic coverage: 18 in Salem, 15 in Boston, 5 in Cambridge, 4 in Plymouth, 4 in Concord, plus 10 other cities
- Created seed script at `scripts/seed-massachusetts.sql`
- Focus areas: Salem Witch Trials sites, Revolutionary War landmarks, colonial-era haunts, Bridgewater Triangle
- Notable locations: Lizzie Borden House, Hawthorne Hotel, Omni Parker House, Fort Warren (Lady in Black), Hoosac Tunnel, Danvers State Hospital site
- All locations include coordinates, descriptions, ghost stories, and source URLs

### Louisiana Haunted Places Data
- Researched and populated 50 haunted locations across Louisiana
- Categories: 12 other, 11 plantations, 10 hotels, 6 mansions, 5 restaurants, 3 cemeteries, 2 theaters, 1 battlefield
- Geographic coverage: 26 in New Orleans, 6 in Baton Rouge, 3 in Shreveport, 3 in Natchitoches, 2 in Lafayette, plus 10 plantation sites
- Created seed scripts at `scripts/seed-louisiana.sql` and `scripts/seed-louisiana-additional.sql`
- Rich coverage of French Quarter haunts, voodoo history, plantation ghosts, and Civil War-era spirits
- All locations include coordinates, descriptions, ghost stories, and source URLs

### Georgia Haunted Places Data
- Researched and populated 49 haunted locations across Georgia
- Categories: 13 hotels, 9 mansions, 9 other, 5 restaurants, 4 cemeteries, 3 theaters, 2 battlefields, 2 hospitals, 2 lighthouses
- Geographic coverage: 15 in Savannah, 4 in Atlanta, 4 in Marietta, plus 26 other cities
- Created seed script at `scripts/seed-georgia.sql`
- All locations include coordinates, descriptions, ghost stories, and source URLs

### D1 Database Setup
- Created Cloudflare D1 database `haunted-places-db`
- Added `places` table with schema for haunted locations
- Indexes on state, city, category, and slug for query performance
- wrangler.toml configured with D1 binding

---

<!-- Example format:

## 2025-01-12
### Landing Page
- Hero section with value prop
- Email signup CTA
- Mobile responsive

## 2025-01-15
### PDF Export
- Export results to PDF
- Branded footer with logo
- Growth: "Powered by" badge on exports

-->
