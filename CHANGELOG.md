# Changelog

What we shipped. Builder appends here after each feature.

---

## 2026-01-16

### Changed
- Homepage Simplification
  - Replaced stats bar (places/states/categories counts) with atmospheric tagline: "Every location has a story. Some refuse to stay buried."
  - Removed "Browse by Category" section to reduce decision fatigue — kept only "Browse by State"
  - Fixed inconsistent state name display — all states now show full names (California, not CA)
  - Added missing states to mappings: CA, FL, IL, NY, TX (in addition to existing GA, LA, MA, PA)
  - Removed unused loadStats() and loadCategories() JavaScript functions

### Added
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
