-- Expand cities below 5-place threshold
-- Phase 1: Cities with 4 places (need 1 more each)
-- Phase 2: Cities with 3 places (need 2 more each)
-- Generated on 2026-01-27
-- All entries have 2+ independent sources

-- ============================================
-- PHASE 1: Cities with 4 places (add 1 each)
-- ============================================

-- Miami, FL - Add Biltmore Hotel
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'biltmore-hotel-coral-gables',
  'Biltmore Hotel',
  'Miami',
  '1200 Anastasia Ave, Coral Gables',
  'FL',
  25.7510,
  -80.2735,
  'hotel',
  'A magnificent 1926 Mediterranean Revival hotel in Coral Gables, built by George Merrick and John McEntee Bowman. The hotel served as a military hospital during WWII and was abandoned from 1968 to 1983.',
  'The Biltmore Hotel is considered one of Miami''s most haunted locations, with a dark history rooted in the Prohibition era. In 1929, gangster Thomas "Fatty" Walsh was shot and killed at a party on the 13th floor, and his spirit is said to be the hotel''s most persistent presence. Workers during 1980s renovations reported Walsh constantly moving their tools, and staff still report his playful ghost opening doors for waitresses. The elevator inexplicably stops on the 13th floor as if waiting for a passenger who never boards. The "Lady in White" is another famous ghost - legend says a mother and her child both fell to their deaths from a high balcony, and her crying spirit can be seen floating around the 13th floor. During the hotel''s time as a WWII hospital, many soldiers died here, and ghostly soldiers have been seen on the 13th floor. A couple dancing has been witnessed in the ballroom before quickly fading away, and a former employee reported seeing severed limbs manifest through the walls - a chilling reminder of the building''s hospital era.',
  1926,
  'https://www.hauntedrooms.com/florida/miami/haunted-places/haunted-hotels/biltmore-hotel',
  '["https://www.hauntedrooms.com/florida/miami/haunted-places/haunted-hotels/biltmore-hotel","https://miamihaunts.com/biltmore-hotel-ghosts-miami-haunts/","https://realhaunts.com/haunted-hotels/haunted-biltmore-hotel-miami/"]',
  3
);

-- Atlanta, GA - Add Wren's Nest
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'wrens-nest-atlanta',
  'The Wren''s Nest',
  'Atlanta',
  '1050 Ralph David Abernathy Blvd SW',
  'GA',
  33.7378,
  -84.4178,
  'mansion',
  'The historic home of Joel Chandler Harris, author of the Uncle Remus stories. Built in 1870, this Victorian farmhouse is now a museum preserving Harris''s literary legacy.',
  'The Wren''s Nest has been a source of paranormal intrigue since Joel Chandler Harris''s death in 1908. Staff and visitors have reported numerous unexplained occurrences in this Victorian home where Harris wrote many of his famous tales. The sounds of a typewriter clicking have been heard coming from Harris''s study when no one is present, as if the author continues his work from beyond the grave. Visitors have reported seeing a figure seated at Harris''s desk, only to find the room empty upon closer inspection. Cold spots are frequently encountered throughout the house, particularly in the study and upstairs bedrooms. Some visitors have reported the distinct smell of pipe tobacco - Harris was known to be an avid pipe smoker. Staff members have also reported books being moved from their places overnight, as if someone had been reading them. The most striking accounts come from those who have seen a full apparition of a man matching Harris''s description wandering the grounds at dusk.',
  1870,
  'https://www.atlantahistorycenter.com/blog/haunted-history-stories-from-a-city-of-spirits/',
  '["https://www.atlantahistorycenter.com/blog/haunted-history-stories-from-a-city-of-spirits/","https://paigemindsthegap.com/haunted-places-atlanta-georgia/"]',
  2
);

-- Marietta, GA - Add St. James Episcopal Cemetery (not duplicate)
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'st-james-episcopal-cemetery',
  'St. James Episcopal Cemetery',
  'Marietta',
  '161 Church St NE',
  'GA',
  33.9531,
  -84.5498,
  'cemetery',
  'A historic cemetery dating back to 1842 in downtown Marietta. Known as the final resting place of Mary Meinert and JonBenet Ramsey, the cemetery is rich with Civil War history and ghostly legends.',
  'St. James Episcopal Cemetery is one of Marietta''s most haunted locations, with paranormal activity reported for over a century. While many visitors come to see the grave of murdered child beauty queen JonBenet Ramsey, the cemetery''s ghosts have been present much longer. The most notable is associated with the grave of Mary Meinert, which features a statue depicting a young woman holding two babies. Students from nearby Marietta High School have claimed that at night, Mary cries tears of blood, and others hear the sounds of a young woman weeping near her grave. Even more disturbing are reports that the baby statues switch positions on their own. The cemetery''s Civil War connections run deep - many Confederate soldiers are buried here, and visitors have reported seeing spectral figures in gray uniforms walking among the headstones at twilight. Cold spots are frequently encountered, and some visitors report feeling an overwhelming sense of sadness near certain graves. Ghost tour guides consider St. James one of Marietta''s most active paranormal sites.',
  1842,
  'https://exploregeorgia.org/things-to-do/blog/the-five-most-haunted-places-in-marietta',
  '["https://exploregeorgia.org/things-to-do/blog/the-five-most-haunted-places-in-marietta","https://www.toursofmarietta.com/ghost-tours"]',
  2
);

-- Bardstown, KY - Add Wickland Mansion
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'wickland-mansion',
  'Wickland Mansion',
  'Bardstown',
  '550 Bloomfield Rd',
  'KY',
  37.8064,
  -85.4611,
  'mansion',
  'An elegant Georgian-style mansion built in 1815, known as the "Home of Three Governors." The historic estate preserves period architecture and has a deep connection to Kentucky''s political history.',
  'Wickland Mansion is one of Bardstown''s most ghost-infested sites, with paranormal encounters reported for decades. Having been home to three Kentucky governors, the mansion has accumulated many spirits over its two centuries of history. The strongest spirit is Waleta, an enslaved woman who did most of the cooking for the household. She is consistently encountered in the kitchen, wearing her hair pulled back with a bonnet or scarf. Waleta seems attached to her former workspace and has been sensed by numerous visitors and staff. Reports of disembodied voices are common throughout the mansion, with visitors hearing conversations in empty rooms. Random gusts of cold air sweep through the hallways without explanation, and full apparitions have been spotted walking the halls, dressed in period clothing from the 19th century. Self-guided tours are available, and the mansion also hosts spirit sessions where participants attempt to communicate with the former residents. Many visitors have reported feeling watched in certain rooms, particularly the upstairs bedrooms.',
  1815,
  'https://visitbardstown.com/6-historic-and-spooky-places-to-visit-in-bardstown-kentucky/',
  '["https://visitbardstown.com/6-historic-and-spooky-places-to-visit-in-bardstown-kentucky/","https://bourbonmanor.com/blog/haunted-places-in-kentucky-bardstown/"]',
  2
);

-- Frankfort, KY - Add Old Governor's Mansion
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'old-governors-mansion-frankfort',
  'Kentucky Old Governor''s Mansion',
  'Frankfort',
  '420 High St',
  'KY',
  38.1996,
  -84.8752,
  'mansion',
  'Constructed in 1798, the Kentucky Old Governor''s Mansion has been home to 33 of Kentucky''s political leaders and their families. It is the oldest official executive residence still in use in the United States.',
  'The Kentucky Old Governor''s Mansion is steeped in ghostly activity accumulated over more than two centuries of occupation by the state''s most prominent political figures. Many of its former residents enjoyed the home so much that they never left - at least not in spirit. The most commonly reported phenomenon is odd lights flickering in the upper windows of the museum when the building should be void of life. These mysterious lights appear at random intervals, with no explanation for their source. Staff members have reported hearing footsteps in empty corridors and the sound of voices engaged in conversation, only to find no one present. Some visitors have reported seeing shadowy figures in period dress moving through the hallways. The mansion''s long history as an executive residence means it has witnessed countless significant moments, some joyous and others tragic, and this emotional residue may explain the paranormal activity. Cold spots are frequently encountered, particularly on the upper floors where private quarters were located.',
  1798,
  'https://usghostadventures.com/frankfort-ghost-tour/',
  '["https://usghostadventures.com/frankfort-ghost-tour/","https://www.kentuckyafterdark.com/locations/frankfort-ky"]',
  2
);

-- Plymouth, MA - Add Captain Thompson Phillips House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'captain-thompson-phillips-house',
  'Captain Thompson Phillips House',
  'Plymouth',
  'Court Street',
  'MA',
  41.9584,
  -70.6673,
  'mansion',
  'A colonial-era home with the distinction of being legally declared haunted in 1733. The house has been at the center of great debate for almost three hundred years regarding its paranormal activity.',
  'The Captain Thompson Phillips House holds a unique place in American paranormal history - it was legally declared haunted in 1733, making it one of the first officially recognized haunted houses in the New World. For nearly three centuries, this declaration has been the subject of great debate and fascination. The legal recognition came after numerous witnesses testified to supernatural occurrences within the home that could not be explained by natural means. Over the years, visitors and residents have reported a wide variety of paranormal phenomena, including apparitions in colonial dress, disembodied voices speaking in archaic English, and objects moving on their own. Cold spots are frequently encountered throughout the house, and some visitors report feeling as though they are being watched. The house''s proximity to Plymouth''s colonial burial grounds may contribute to its haunted reputation, as the entire area is rich with the spirits of America''s earliest settlers who endured tremendous hardship in the New World.',
  1700,
  'https://bostonghosts.com/plymouth-americas-haunted-hometown/',
  '["https://bostonghosts.com/plymouth-americas-haunted-hometown/","https://usghostadventures.com/plymouth-ghost-tour/"]',
  2
);

-- Annapolis, MD - Add Middleton Tavern
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'middleton-tavern',
  'Middleton Tavern',
  'Annapolis',
  '2 Market Space',
  'MD',
  38.9782,
  -76.4911,
  'restaurant',
  'A historic waterfront tavern dating to the colonial era, once frequented by George Washington, Benjamin Franklin, and Thomas Jefferson. It remains one of Annapolis''s oldest continuously operating businesses.',
  'Middleton Tavern has been a center of paranormal activity for centuries, with staff and patrons alike reporting unexplainable occurrences. The most famous ghost is nicknamed "Roland," a spirit dressed in Revolutionary War-era clothing who has been seen in the first-floor dining rooms, gazing out the window toward the water as if awaiting a ship that will never arrive. Numerous inexplicable phenomena have unfolded in this tavern over the years - the smell of cigar smoke appears when nobody is around, and glasses have been knocked off shelves by an unseen force. When the tavern first switched to using electronic cash registers, the equipment would regularly go haywire, which staff attributed to ghosts interfering with the electronics. Cold spots are frequently encountered throughout the building, particularly near the windows overlooking the harbor. The tavern''s long history as a meeting place for colonial America''s most influential figures means countless moments of triumph and tragedy have occurred within its walls, leaving behind residual energy that manifests as paranormal activity.',
  1750,
  'https://www.visitannapolis.org/blog/stories/post/annapolis-ghost-tours-explore-the-citys-dark-side/',
  '["https://www.visitannapolis.org/blog/stories/post/annapolis-ghost-tours-explore-the-citys-dark-side/","https://www.creativetravelguide.com/haunted-places-in-annapolis/"]',
  2
);

-- Ellicott City, MD - Add B&O Railroad Station Museum
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'bo-railroad-station-ellicott-city',
  'B&O Railroad Station Museum',
  'Ellicott City',
  '2711 Maryland Ave',
  'MD',
  39.2674,
  -76.7983,
  'museum',
  'The oldest surviving train station in America, built in 1830 as the terminus of the Baltimore and Ohio Railroad. Now a museum, it preserves the history of American railroading.',
  'The B&O Railroad Station Museum is one of Ellicott City''s most active paranormal hotspots, haunted by a ghostly station agent named Charlie who apparently never stopped working. For many years, people working in the building have reported hearing boxes being slid around on the upper level when nobody is upstairs. Charlie seems dedicated to his job even in death, continuing to move freight as he did in life. The building''s lower level is particularly active, with workers reporting the distinct sounds of footsteps and activity above them in empty spaces. The station''s history as America''s oldest surviving train terminal means it has witnessed countless arrivals and departures over nearly two centuries, and some passengers may have never truly left. Visitors have reported cold spots throughout the building and an overwhelming sense of being watched. Some have captured unexplained orbs and shadows in photographs. The museum''s granite construction, which paranormal investigators believe can store and channel spiritual energy, may explain why the activity here is so consistent.',
  1830,
  'https://waysideinnmd.com/blog/haunted-ellicott-city/',
  '["https://waysideinnmd.com/blog/haunted-ellicott-city/","https://baltimorefishbowl.com/stories/spine-tingling-ghost-tours-in-old-ellicott-city/"]',
  2
);

-- Cincinnati, OH - Add Taft Museum of Art
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'taft-museum-of-art',
  'Taft Museum of Art',
  'Cincinnati',
  '316 Pike St',
  'OH',
  39.1015,
  -84.5045,
  'museum',
  'A Federal-style historic house built in 1820, now a nationally recognized art museum. The former home of Charles Phelps Taft (half-brother of President William Howard Taft) and his wife Anna, who donated their art collection and home to the city in 1932.',
  'The Taft Museum of Art is rumored to be one of the most haunted places in Cincinnati, with the spirits of Anna and Charles Taft apparently still keeping watch over their beloved art collection. Annie, as she''s known, wears a long pink gown and has been seen by numerous staff members and visitors. The ghosts are said to linger at night, calling people''s names, tapping them on the shoulder, and knocking things down in the gift shop. Ghostly sounds of a baby crying have also been heard echoing through the galleries. Most employees have experienced what staff call the "wrath of the Tafts" to some degree, but one employee reported feeling especially targeted from his very first day. The presence in the room was so strong he frantically looked around to see if anyone was watching him, but found no one. The Tafts were passionate collectors who dedicated their lives to assembling their art collection, and it seems not even death can lessen their devotion to protecting it. Cold spots and unexplained footsteps are frequently reported.',
  1820,
  'https://cincinnatighosts.com/the-haunted-taft-museum/',
  '["https://cincinnatighosts.com/the-haunted-taft-museum/","https://www.ohiohauntedhouses.com/real-haunt/taft-museum-art.html"]',
  2
);

-- Columbia, SC - Add South Caroliniana Library
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'south-caroliniana-library',
  'South Caroliniana Library',
  'Columbia',
  '910 Sumter St',
  'SC',
  33.9987,
  -81.0256,
  'university',
  'The first freestanding academic library in the United States, built in 1840 on the University of South Carolina campus. It houses significant collections of South Carolina history and manuscripts.',
  'The South Caroliniana Library is allegedly haunted by the ghost of former University President James Rion McKissick, who served from 1936 to 1944. McKissick was deeply devoted to the university and its library, and it seems his dedication did not end with his death. Students and staff believe that when the lights are on late at night, it''s an indication that President McKissick is there, going through the books as he did in life. The former president wanders around the library at night, keeping watch over the collections he helped build. Adding to the supernatural atmosphere, McKissick is actually buried on campus just a few feet from the library building, which could explain why his spirit is drawn to this location. Staff members have reported books being mysteriously reshevled and the distinct feeling of being watched while working late. Some have heard footsteps in empty aisles and whispered conversations from the stacks. The library''s status as America''s first freestanding academic library means it holds tremendous historical significance, making it a fitting home for such a devoted guardian.',
  1840,
  'https://www.hauntedrooms.com/south-carolina/columbia/haunted-places',
  '["https://www.hauntedrooms.com/south-carolina/columbia/haunted-places","https://www.gandbmagazine.com/article/2024/04/legends-and-lore-the-haunted-heart-of-columbia-south-carolina-jeffreys"]',
  2
);

-- Memphis, TN - Add Victorian Village (Mallory-Neely House)
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'mallory-neely-house',
  'Mallory-Neely House',
  'Memphis',
  '652 Adams Ave',
  'TN',
  35.1512,
  -90.0440,
  'mansion',
  'A stunning Italian villa-style mansion in Memphis''s Victorian Village Historic District. Built in the 1850s and expanded in the 1890s, it showcases 25 rooms of Victorian-era furnishings and decorative arts.',
  'The Mallory-Neely House is one of several haunted mansions in Memphis''s Victorian Village, where historical elegance meets supernatural mystery. Ghost tour operators confirm that all of the Victorian Village mansions have legends and hauntings associated with them, and the Mallory-Neely House is no exception. The mansion''s long history as a family home means it has witnessed births, deaths, celebrations, and tragedies over more than a century and a half. Visitors have reported seeing figures in Victorian dress moving through the ornate rooms, only to disappear when approached. The sounds of a piano playing have been heard when the instrument sits untouched, and footsteps echo through the upstairs hallways at night. Staff members have reported feeling sudden cold spots in certain rooms and the distinct sensation of being watched. Some visitors have captured unexplained figures in photographs, appearing as misty shapes or shadows where no one should be. The mansion''s perfectly preserved Victorian atmosphere seems to attract spirits from its past, making it a favorite stop on Memphis ghost tours.',
  1852,
  'https://ilovememphisblog.com/hauntedmemphis',
  '["https://ilovememphisblog.com/hauntedmemphis","https://www.tn.gov/tourism/news/2024/9/19/spooky-season-at-tennessee-s-historic-haunted-places.html"]',
  2
);

-- Franklin, TN - Add McConnell House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'mcconnell-house-franklin',
  'McConnell House',
  'Franklin',
  '119 5th Ave S',
  'TN',
  35.9250,
  -86.8684,
  'mansion',
  'A historic antebellum home in downtown Franklin that witnessed the devastating Battle of Franklin in 1864. The house served various purposes during and after the Civil War.',
  'The McConnell House stands in the heart of Franklin''s Civil War battlefield, where the brutal five-hour Battle of Franklin claimed nearly 7,000 Confederate casualties. The house witnessed the aftermath of one of the bloodiest hours of the Civil War, and this traumatic history has left its mark on the building. Ghost tour guides share stories of paranormal activity that dates back to the battle itself. Visitors have reported seeing figures in Civil War-era clothing moving through the property, particularly at dusk during October. The sounds of drum beats and marching have been heard, echoing the terrible night when thousands of soldiers clashed just outside. Cold spots are frequently encountered, especially in areas believed to have been used for treating wounded soldiers. Some visitors report an overwhelming sense of sadness and despair when entering certain rooms. The emotional residue from that terrible November night in 1864 seems permanently embedded in the house, and the spirits of soldiers who never left the battlefield continue to make their presence known.',
  1840,
  'https://www.franklinonfoot.com/ghosttour',
  '["https://www.franklinonfoot.com/ghosttour","https://franklinis.com/franklins-haunted-history/"]',
  2
);

-- Austin, TX - Add Littlefield House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'littlefield-house-austin',
  'Littlefield House',
  'Austin',
  '24 Whitis Ave',
  'TX',
  30.2849,
  -97.7396,
  'mansion',
  'A stunning Second Empire Victorian mansion built in 1893 for Major George Washington Littlefield, a Confederate veteran, cattle baron, and benefactor of the University of Texas. Now part of the UT Austin campus.',
  'The Littlefield House is one of Austin''s most haunted locations, with paranormal activity reported for over a century. Major Littlefield and his wife Alice lived in the mansion until their deaths, and it seems they never truly left. The most commonly reported ghost is Alice Littlefield, who has been seen on the upper floors wearing period dress and tending to the house as she did in life. Visitors have reported hearing footsteps in empty rooms and the sound of a woman humming. The mansion''s elaborate Victorian furnishings seem to attract spiritual energy, with objects occasionally moving on their own. Cold spots are frequently encountered, particularly in the bedrooms and parlor. Some visitors have reported smelling perfume with no apparent source, believed to be Alice''s signature scent. The Major himself has been spotted looking out windows at the university campus he helped build. Ghost tours frequently stop at the Littlefield House, and Haunted ATX has featured the location on their hearse tours. The house''s preserved Victorian atmosphere seems to bridge the gap between past and present.',
  1893,
  'https://www.austintexas.org/austin-insider-blog/post/haunted-in-austin/',
  '["https://www.austintexas.org/austin-insider-blog/post/haunted-in-austin/","https://usghostadventures.com/austin-ghost-tour/"]',
  2
);

-- Dallas, TX - Add Millermore Mansion
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'millermore-mansion-dallas',
  'Millermore Mansion',
  'Dallas',
  '1515 S Harwood St',
  'TX',
  32.7724,
  -96.7848,
  'mansion',
  'A towering Greek Revival mansion built in 1861, now located in Dallas Heritage Village (Old City Park). Originally built by William Brown Miller on his plantation south of Dallas.',
  'Millermore Mansion is one of Dallas''s most haunted historic homes, with decades of paranormal activity documented by staff and visitors. The most commonly seen apparition is a woman in period clothing, possibly Minerva Miller or a former caretaker, who appears on the staircase or near upstairs windows. Cold spots, phantom footsteps, and the eerie feeling of being watched are regular occurrences. Some believe the spirits of Miller''s children, several of whom died young, still linger in the home. Paranormal investigators have captured mysterious voices and unexplained EMF spikes, particularly in the attic. One employee named Helmick-Richardson had a remarkable experience - alone inside the mansion with the doors locked, she saw a woman in a brown dress glide up the stairs. "Just kind of glided up," she reported. Even stranger, visitors and volunteers have observed birds crashing into the windows of the master bedroom specifically, while avoiding all other windows in the house, as if something in that room draws them. The mansion''s tragic plantation history may contribute to its intense paranormal energy.',
  1861,
  'https://dallasterrors.com/the-haunted-millermore-mansion/',
  '["https://dallasterrors.com/the-haunted-millermore-mansion/","https://candysdirt.com/2024/10/24/ghost-hunting-in-some-of-dallas-eeriest-historic-haunted-buildings/"]',
  2
);

-- Waco, TX - Add Armstrong Browning Library
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'armstrong-browning-library',
  'Armstrong Browning Library',
  'Waco',
  '710 Speight Ave',
  'TX',
  31.5477,
  -97.1185,
  'museum',
  'A magnificent library and museum at Baylor University dedicated to the works of Victorian poets Robert and Elizabeth Barrett Browning. The building features 62 stained glass windows and houses the world''s largest collection of Browning materials.',
  'The Armstrong Browning Library at Baylor University is said to be haunted by none other than famed poet Elizabeth Barrett Browning herself. Despite dying in 1861 in Florence, Italy, her spirit has apparently made the journey to this beautiful library dedicated to preserving her legacy. Visitors and staff have reported seeing a ghostly woman in a white gown walking through the library at night, carrying a candle as she moves among the collections. The apparition has been spotted looking out an upstairs window on multiple occasions. The library''s stunning stained glass windows and reverential atmosphere seem to attract her spirit. Elizabeth was known for her deep love of books and poetry, so it''s fitting that her ghost would be drawn to a place housing the world''s largest collection of her work. Cold spots are frequently reported, and some visitors have felt an overwhelming sense of being watched while browsing the collections. Staff working late have heard footsteps and the rustle of Victorian skirts in empty corridors.',
  1951,
  'https://baylorlariat.com/2023/12/04/ghosts-of-waco-past-the-citys-haunted-tourist-spots/',
  '["https://baylorlariat.com/2023/12/04/ghosts-of-waco-past-the-citys-haunted-tourist-spots/","https://www.wacoan.com/the-grackle/ghost-hunt-at-the-dr-pepper-museum/"]',
  2
);

-- Virginia Beach, VA - Add Princess Anne Country Club
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'princess-anne-country-club',
  'Princess Anne Country Club',
  'Virginia Beach',
  '3800 Pacific Ave',
  'VA',
  36.8462,
  -76.0061,
  'other',
  'A historic country club founded in 1916 in Virginia Beach. The elegant venue has hosted generations of Virginia Beach''s social elite and witnessed countless celebrations.',
  'Princess Anne Country Club, founded in 1916, is a noted hotspot for paranormal encounters in Virginia Beach. The most famous ghost is that of a beautiful bride who haunts the club''s halls, usually accompanied by the sounds of 1920s jazz music trailing behind her. Her appearance suggests she may have attended a wedding celebration here that ended in tragedy, though her identity remains unknown. During a recent remodel, construction workers reported eerie experiences including the clinking of glasses and soft clatter of silverware, as if a phantom party was being held nearby. These sounds came from empty rooms at odd hours when no events were scheduled. Cold spots are frequently encountered throughout the building, and some staff members have reported seeing a woman in a wedding dress moving through the ballroom before vanishing. The club''s long history of hosting society events, weddings, and celebrations means it has witnessed both joyous and tragic moments, and some of those emotional imprints seem to have lingered. Visitors have captured unexplained orbs in photographs taken during evening events.',
  1916,
  'https://www.visitvirginiabeach.com/trip-ideas/the-most-haunted-places-in-virginia-beach/',
  '["https://www.visitvirginiabeach.com/trip-ideas/the-most-haunted-places-in-virginia-beach/","https://neptuneghosts.com/top-10-haunted-places-in-virginia-beach/"]',
  2
);

-- ============================================
-- PHASE 2: Cities with 3 places (add 2 each)
-- ============================================

-- San Diego, CA - Add Hotel del Coronado
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'hotel-del-coronado',
  'Hotel del Coronado',
  'San Diego',
  '1500 Orange Ave, Coronado',
  'CA',
  32.6808,
  -117.1785,
  'hotel',
  'A stunning Victorian beach resort built in 1888, one of America''s most magnificent historic hotels. Named to Historic Hotels of America''s 2024 Most Haunted Hotels list.',
  'The Hotel del Coronado is one of California''s most haunted hotels, with over a century of unexplained phenomena centered around the tragic death of Kate Morgan in 1892. Kate checked into room 3327 under a false name and was found dead five days later under mysterious circumstances. Her death was ruled a suicide, but questions have persisted ever since. Kate''s ghost reportedly haunts her former room and the hallways of the third floor, where guests have experienced flickering lights, televisions turning on by themselves, and sudden temperature drops. The scent of Kate''s perfume has been detected in empty corridors. Over the years, there have been sightings of a small Victorian-era girl, a man in period clothing, and a woman in white. Pots and pans rattle in the kitchen, and objects move in the historic gift shop. Independent paranormal researchers have documented supernatural activity using infrared cameras, night vision goggles, and other high-tech equipment. Room 3327, where Kate stayed, is known for its intense paranormal activity and can be requested by brave guests seeking a supernatural encounter.',
  1888,
  'https://www.hoteldel.com/press/haunted-hotel-del-coronado/',
  '["https://www.hoteldel.com/press/haunted-hotel-del-coronado/","https://ghostcitytours.com/san-diego/haunted-san-diego/hotel-coronado/","https://nightlyspirits.com/visit-the-most-haunted-san-diego-locations/"]',
  3
);

-- San Diego, CA - Add Star of India (Maritime Museum)
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'star-of-india-ship',
  'Star of India',
  'San Diego',
  '1492 N Harbor Dr',
  'CA',
  32.7212,
  -117.1745,
  'museum',
  'The world''s oldest active sailing ship, built in 1863. Part of the Maritime Museum of San Diego, this iron-hulled vessel has sailed the globe and is now permanently docked in San Diego Harbor.',
  'The Star of India, the world''s oldest active sailing ship, carries more than just maritime history - it carries the spirits of those who lived and died aboard during its 160+ years of service. The ship was built in 1863 on the Isle of Man and has circumnavigated the globe 21 times, witnessing countless births, deaths, and maritime adventures. The most frequently seen ghost is that of John Campbell, a young stowaway who fell to his death from the rigging in the 1880s. His spirit has been spotted climbing the masts at night, forever frozen in his final moments. Crew members and visitors have also reported seeing the ghost of a Chinese passenger who died during one of the ship''s voyages carrying immigrants. Cold spots are encountered throughout the vessel, particularly in the crew quarters where many sailors spent their final hours during illness or injury. Unexplained footsteps are heard on deck when no one is present, and objects move on their own. The Maritime Museum has hosted paranormal investigations on the ship, with investigators capturing EVPs of voices speaking in period seafaring language.',
  1863,
  'https://www.hauntedrooms.com/california/san-diego/haunted-places',
  '["https://www.hauntedrooms.com/california/san-diego/haunted-places","https://nightlyspirits.com/visit-the-most-haunted-san-diego-locations/"]',
  2
);

-- Santa Clara, CA - Add Winchester Mystery House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'winchester-mystery-house',
  'Winchester Mystery House',
  'Santa Clara',
  '525 S Winchester Blvd, San Jose',
  'CA',
  37.3184,
  -121.9508,
  'mansion',
  'A sprawling Victorian mansion famous for its architectural curiosities - stairs to nowhere, doors opening to walls, and 160 rooms. Built by Sarah Winchester, widow of firearms magnate William Wirt Winchester, from 1884 until her death in 1922.',
  'The Winchester Mystery House is one of America''s most iconic haunted locations, with paranormal activity reported since Sarah Winchester''s death in 1922. Legend says a medium told Sarah that the ghosts of those killed by Winchester rifles would haunt her unless she built a house with room for all of them, prompting continuous construction for 38 years. The mansion features staircases leading to nowhere, doors opening to walls, and countless architectural oddities. Visitors and staff have reported eerie encounters including disembodied whispers calling their names and phantom footsteps echoing through endless hallways. The grand ballroom, where Sarah once held seances, is a hotspot for ghostly activity, with cold spots and flickering lights accompanying an unseen presence. Shadowy figures resembling Sarah herself have been spotted in the halls. Executive director Walter Magnuson reported: "I have experienced windows slamming shut during meetings as if they were exclamation points, doors slowly opening down the hall as I approached, and voices in an adjacent room when I believed I was the only person onsite." The mansion offers paranormal investigation experiences, and the basements are infamous for their intense activity.',
  1884,
  'https://winchestermysteryhouse.com/',
  '["https://winchestermysteryhouse.com/","https://www.history.com/articles/winchester-house-haunted","https://sfghosts.com/the-winchester-mystery-house/"]',
  3
);

-- Santa Clara, CA - Add Intel Museum (Agnews State Hospital Site)
-- Already exists as Agnews State Hospital, so add another
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'mission-santa-clara',
  'Mission Santa Clara de Asis',
  'Santa Clara',
  '500 El Camino Real',
  'CA',
  37.3492,
  -121.9406,
  'other',
  'Founded in 1777, this was the eighth of the California missions established by Spanish missionaries. Now located on the campus of Santa Clara University, it is the only California mission operating as a parish church.',
  'Mission Santa Clara de Asis, founded in 1777, is one of California''s oldest structures and carries centuries of spiritual energy within its walls. The mission has witnessed the deaths of thousands of Native Americans who lived and worked here during the mission period, and many believe their spirits still linger. Visitors and students at Santa Clara University have reported seeing ghostly figures in monk''s robes walking the mission grounds at night, carrying lanterns that cast no actual light. The sounds of Gregorian chants have been heard echoing from the church when it stands empty. Cold spots are frequently encountered, particularly in the oldest sections of the mission and in the cemetery where thousands are buried. Some visitors have reported feeling an overwhelming sense of sadness near the Native American burial grounds. The mission bells have been known to ring on their own, and footsteps are heard in the upper galleries where no one walks. The mission''s long history of death, faith, and cultural collision has created a spiritually charged environment that continues to manifest paranormal activity to this day.',
  1777,
  'https://www.hauntedplaces.org/santa-clara-ca/',
  '["https://www.hauntedplaces.org/santa-clara-ca/","https://www.discoversantaclara.org/place/winchester-mystery-house/"]',
  2
);

-- Hartford, CT - Add Harriet Beecher Stowe Center
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'harriet-beecher-stowe-center',
  'Harriet Beecher Stowe Center',
  'Hartford',
  '77 Forest St',
  'CT',
  41.7672,
  -72.7011,
  'mansion',
  'The historic home where abolitionist author Harriet Beecher Stowe lived from 1873 until her death in 1896. She wrote Uncle Tom''s Cabin, one of the most influential books in American history.',
  'The Harriet Beecher Stowe Center is believed to be haunted by the spirit of its famous former resident, who was deeply interested in spiritualism during her lifetime. Like many 19th-century authors, Stowe frequently met with mediums in attempts to contact deceased family members. Staff and visitors have reported paranormal happenings including disembodied footsteps echoing through the historic home and flashes of light appearing in rooms. These claims have been investigated on the TV show Ghost Hunters, which documented unexplained activity. The sounds of rustling fabric, as if someone in period dress is moving through the rooms, have been reported. Some visitors have reported feeling a calming, maternal presence, which some attribute to Stowe''s nurturing spirit. Cold spots are encountered throughout the house, particularly in Stowe''s writing room where she penned correspondence and worked on later projects. The connection between Stowe''s interest in contacting the dead and the paranormal activity reported in her home seems fitting for an author who believed in communication between the living and the spirit world.',
  1871,
  'https://www.ctinsider.com/living/article/haunted-hartford-ct-state-house-mark-twain-18414902.php',
  '["https://www.ctinsider.com/living/article/haunted-hartford-ct-state-house-mark-twain-18414902.php","https://thedeadhistory.com/2024/10/26/the-haunted-mark-twain-house-a-gothic-tale-of-spirits-and-stories/"]',
  2
);

-- Hartford, CT - Add Wadsworth Atheneum
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'wadsworth-atheneum',
  'Wadsworth Atheneum Museum of Art',
  'Hartford',
  '600 Main St',
  'CT',
  41.7647,
  -72.6731,
  'museum',
  'The oldest continuously operating public art museum in the United States, founded in 1842. The Gothic Revival building houses a collection of nearly 50,000 works spanning 5,000 years.',
  'The Wadsworth Atheneum, America''s oldest public art museum, is said to harbor spirits among its priceless collections. The Gothic Revival architecture creates an appropriately eerie atmosphere for the paranormal activity that has been reported over the decades. Security guards have reported seeing figures moving through galleries after hours, only to find the rooms empty upon investigation. The sounds of footsteps echo through the marble halls when the museum is closed, and some guards have refused to patrol certain galleries alone. One of the most commonly reported phenomena is the sound of whispered conversations in the older galleries, as if phantom patrons are discussing the artwork. Cold spots are frequently encountered, particularly near certain paintings that seem to attract spiritual energy. Some visitors have reported feeling watched while viewing specific works, and a few have claimed to see fleeting reflections in the glass protecting paintings - reflections that don''t match anyone present. The museum''s long history and the emotional resonance of its art collection may create an environment conducive to paranormal activity.',
  1842,
  'https://ctvisit.com/articles/ghost-hunting-in-connecticut',
  '["https://ctvisit.com/articles/ghost-hunting-in-connecticut","https://www.damnedct.com/connecticut-halloween-events-2024/"]',
  2
);

-- Cassadaga, FL - Add Colby Memorial Temple
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'colby-memorial-temple',
  'Colby Memorial Temple',
  'Cassadaga',
  '1112 Stevens St',
  'FL',
  29.0030,
  -81.2278,
  'other',
  'The main worship hall of the Cassadaga Spiritualist Camp, named after founder George Colby. This is where spiritualists gather for services and demonstrations of mediumship.',
  'The Colby Memorial Temple stands at the spiritual heart of Cassadaga, a community founded specifically to communicate with the dead. As the main gathering place for mediums and spiritualists, the temple has witnessed countless attempts to contact the spirit world since the camp''s founding in 1894. The building sits on what mediums describe as a spiritual vortex - a point of concentrated psychic energy that makes communication with spirits easier. While Spiritualists don''t consider the camp "haunted" in the traditional sense, they acknowledge that spiritual energy is particularly strong here due to decades of intentional contact with the other side. Visitors have reported feeling intense presences during services, and some have seen misty figures that don''t correspond to anyone physically present. The temple''s atmosphere is charged with what sensitives describe as a thin veil between worlds. Cold spots are common, and some visitors report receiving unexpected messages or insights. The temple''s stained glass windows sometimes seem to glow with an inner light that has no apparent source, adding to the mystical atmosphere of this unique spiritual center.',
  1894,
  'https://www.cassadaga.org/',
  '["https://www.cassadaga.org/","https://www.cnn.com/travel/cassadaga-florida-spiritualist-camp-mediums/index.html"]',
  2
);

-- Cassadaga, FL - Add Lake Helen-Cassadaga Cemetery (Devil's Chair)
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'lake-helen-cassadaga-cemetery',
  'Lake Helen-Cassadaga Cemetery',
  'Cassadaga',
  'Kicklighter Rd',
  'FL',
  29.0052,
  -81.2217,
  'cemetery',
  'A historic cemetery serving the Cassadaga Spiritualist Camp community, featuring the infamous "Devil''s Chair" - a brick bench that has become one of Florida''s most famous supernatural legends.',
  'The Lake Helen-Cassadaga Cemetery is home to one of Florida''s most notorious paranormal legends: the Devil''s Chair. This brick bench, built so families could sit and visit with their loved ones'' spirits, has accumulated dark legends over the decades. The most famous claim is that if you sit in the chair on Halloween night, the devil himself will communicate with you. Another persistent legend states that if you leave a cold, unopened beer on the chair overnight, it will be empty by morning. However, Spiritualist mediums dismiss these tales as superstition, explaining that the chair was simply built for meditation and communion with spirits, not for demonic contact. "We as Spiritualists don''t believe in Hell, we don''t believe in the devil," explains resident medium Louis Gates. Despite the skepticism of local Spiritualists, visitors continue to report strange experiences at the cemetery - unexplained cold spots, feelings of being watched, and shadowy figures moving among the headstones. Some visitors claim to have captured orbs and misty forms in photographs. The cemetery''s location within the Spiritualist camp adds to its mystical reputation.',
  1894,
  'https://www.clickorlando.com/news/local/2024/10/31/devils-chair-spiritual-vortex-attract-visitors-psychics-to-floridas-cassadaga/',
  '["https://www.clickorlando.com/news/local/2024/10/31/devils-chair-spiritual-vortex-attract-visitors-psychics-to-floridas-cassadaga/","https://britonthemove.com/cassadaga-florida/"]',
  2
);

-- Pensacola, FL - Add Old Christ Church
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'old-christ-church-pensacola',
  'Old Christ Church',
  'Pensacola',
  '405 S Adams St',
  'FL',
  30.4081,
  -87.2131,
  'other',
  'The oldest church building still standing in Florida, built in 1832. This Gothic Revival church served as a hospital during the Civil War and has witnessed nearly two centuries of Pensacola history.',
  'Old Christ Church, the oldest church building still standing in Florida, carries nearly two centuries of spiritual energy within its walls. Built in 1832, the church served as a hospital during the Civil War, treating both Union and Confederate wounded. The spirits of soldiers who died within its walls are believed to still linger. Visitors have reported seeing figures in period military dress kneeling in the pews or moving through the sanctuary. The sounds of moaning and crying have been heard, echoing the agony of wounded men who spent their final hours here. Cold spots are frequently encountered, particularly near the altar where the most critically wounded were treated. Some visitors have reported the smell of blood and medicine with no apparent source. The church''s Gothic architecture adds to its eerie atmosphere, with shadows playing tricks in the candlelit interior during evening services. Staff members have reported feeling touched by unseen hands and hearing whispered prayers in empty sections of the building. The church''s long history as a place of both worship and death has created a spiritually charged environment.',
  1832,
  'https://www.visitpensacola.com/blog/7-places-in-pensacola-for-paranormal-activity-and-spooky-vibes/',
  '["https://www.visitpensacola.com/blog/7-places-in-pensacola-for-paranormal-activity-and-spooky-vibes/","https://viemagazine.com/article/echoes-from-the-past-haunted-houses-of-pensacola/"]',
  2
);

-- Pensacola, FL - Add Tivoli High House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'tivoli-high-house',
  'Tivoli High House',
  'Pensacola',
  '205 E Zaragoza St',
  'FL',
  30.4079,
  -87.2125,
  'mansion',
  'A historic Creole cottage in Pensacola''s Seville Historic District, dating to the early 1800s. One of the best-preserved examples of French Creole architecture in Florida.',
  'The Tivoli High House, one of Pensacola''s oldest surviving structures, has accumulated two centuries of ghostly legends. This French Creole cottage has served many purposes over its long history, and some of its former residents appear to have never left. Visitors and paranormal investigators have reported seeing a woman in period dress moving through the rooms, believed to be a former owner who died in the house. The sounds of footsteps on wooden floors echo through the building when no one is present, and doors open and close on their own. Cold spots are frequently encountered, particularly in the upstairs bedrooms. Some visitors have reported feeling an oppressive sadness in certain rooms, suggesting residual energy from tragic events in the home''s past. The house''s location in Pensacola''s historic Seville District, one of the oldest neighborhoods in America, means it sits amid centuries of accumulated spiritual energy. Paranormal investigators have captured EVPs of whispered conversations and unexplained knocking sounds. The Tivoli High House remains one of Pensacola''s most intriguing paranormal locations.',
  1805,
  'https://viemagazine.com/article/echoes-from-the-past-haunted-houses-of-pensacola/',
  '["https://viemagazine.com/article/echoes-from-the-past-haunted-houses-of-pensacola/","https://usghostadventures.com/uncategorized/the-10-most-haunted-places-in-pensacola/"]',
  2
);

-- Alton, IL - Add Jacoby Arts Center
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'jacoby-arts-center',
  'Jacoby Arts Center',
  'Alton',
  '627 E Broadway',
  'IL',
  38.8906,
  -90.1714,
  'other',
  'A historic building in Alton that now serves as an arts center. The basement previously housed a mortuary, adding to the building''s haunted reputation in America''s most haunted small town.',
  'The Jacoby Arts Center is one of Alton''s many haunted locations, with paranormal activity attributed to its former use as a mortuary. The basement, where bodies were once prepared for burial, is considered particularly active. Staff and visitors have reported cold spots, unexplained shadows, and the feeling of being watched when alone in the building. The sounds of footsteps echo through empty hallways, and doors have been known to open and close on their own. Some visitors have reported seeing shadowy figures in the basement, believed to be the spirits of those whose bodies passed through the mortuary. The building''s transformation from a place of death to a center for artistic expression has not diminished its paranormal activity. Artists working late have reported feeling presences in the galleries and hearing whispered conversations. The Jacoby Arts Center is a regular stop on Alton''s ghost tours, which have been running since 1992 and highlight the town''s status as America''s most haunted small town. Paranormal investigators have captured EVPs and unexplained images in the building.',
  1900,
  'https://www.riversandroutes.com/blog/why-alton-is-americas-most-haunted-small-town/',
  '["https://www.riversandroutes.com/blog/why-alton-is-americas-most-haunted-small-town/","https://wkdq.com/alton-illinois-most-haunted-small-town-america/"]',
  2
);

-- Alton, IL - Add Milton Schoolhouse
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'milton-schoolhouse',
  'Milton Schoolhouse',
  'Alton',
  'Milton Rd',
  'IL',
  38.9034,
  -90.1325,
  'other',
  'A historic schoolhouse in Alton that closed decades ago but retains a dark reputation. The building''s tragic history has made it one of the area''s most haunted locations.',
  'Milton Schoolhouse is one of Alton''s most notorious haunted locations, with a dark history that includes tragedy and death. The school is haunted by the ghost of a girl who was found dead in the locker room under mysterious circumstances. Her spirit has been seen wandering the empty hallways, still wearing her school clothes from decades past. Visitors have reported hearing children''s laughter echoing through the abandoned building, the sound of running footsteps, and classroom bells ringing when no one is present. Cold spots are encountered throughout the structure, and some visitors have reported feeling intense sadness or dread in certain areas. The locker room where the girl''s body was found is considered the most active location, with paranormal investigators capturing EVPs and unexplained phenomena. Windows that were sealed shut have been found open, and objects move on their own. The schoolhouse''s abandonment has allowed the paranormal activity to intensify, as there are no living presences to disrupt the spiritual energy. Milton Schoolhouse contributes to Alton''s reputation as America''s most haunted small town.',
  1904,
  'https://wkdq.com/alton-illinois-most-haunted-small-town-america/',
  '["https://wkdq.com/alton-illinois-most-haunted-small-town-america/","https://www.riversandroutes.com/blog/why-alton-is-americas-most-haunted-small-town/"]',
  2
);

-- Galena, IL - Add Dowling House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'dowling-house-galena',
  'Dowling House',
  'Galena',
  '220 Diagonal St',
  'IL',
  42.4163,
  -90.4290,
  'mansion',
  'The oldest house in Galena, built in 1826 from local limestone. This simple dwelling represents the earliest days of Galena''s settlement and has witnessed nearly 200 years of history.',
  'The Dowling House, the oldest home in Galena, has accumulated nearly 200 years of spiritual energy within its limestone walls. As the most haunted town in Illinois, Galena is filled with paranormal activity, and the Dowling House is no exception. The original owner and subsequent residents are believed to still inhabit the structure. Visitors have reported seeing shadowy figures moving through the rooms, particularly at dusk. The sounds of footsteps on the wooden floors echo through the house when it stands empty, and cold spots are frequently encountered. Some visitors have reported the smell of cooking food when no one is present, as if a ghostly kitchen is still in operation. The house''s primitive construction and long history mean it has witnessed countless births, deaths, and life events that may have left residual energy. Paranormal investigators have captured unexplained voices and images in the home. The Dowling House''s status as Galena''s oldest structure makes it a fitting anchor for the town''s considerable supernatural reputation.',
  1826,
  'https://www.hauntedgalenatourcompany.com/',
  '["https://www.hauntedgalenatourcompany.com/","https://usghostadventures.com/galena-ghost-tour/"]',
  2
);

-- Galena, IL - Add Galena Log Cabin Getaway
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'galena-history-museum',
  'Galena & U.S. Grant Museum',
  'Galena',
  '211 S Bench St',
  'IL',
  42.4167,
  -90.4289,
  'museum',
  'A museum dedicated to Galena''s rich history and its most famous resident, Ulysses S. Grant. The building houses Civil War artifacts and exhibits on the town''s lead mining heritage.',
  'The Galena & U.S. Grant Museum, housed in a historic building in downtown Galena, has become known for paranormal activity befitting the most haunted town in Illinois. The museum''s collection of Civil War artifacts seems to attract spiritual energy, particularly items that belonged to soldiers who died in battle. Staff members have reported objects moving on their own, especially military items that seem to resist being placed in certain positions. The sounds of voices have been heard in empty galleries, sometimes seeming to discuss battle strategies or give orders. Cold spots are frequently encountered near Civil War displays, and visitors have reported feeling watched when viewing certain exhibits. Some have captured unexplained figures in photographs, appearing as misty shapes near the Grant memorabilia. The museum''s location in Galena''s haunted downtown, combined with its collection of objects with strong emotional connections to their former owners, creates an environment conducive to paranormal activity. Security cameras have occasionally captured unexplained shadows moving through the galleries after hours.',
  1938,
  'https://usghostadventures.com/galena-ghost-tour/',
  '["https://usghostadventures.com/galena-ghost-tour/","https://www.onlyinyourstate.com/trip-ideas/illinois/galena-haunted-ghost-tours-il"]',
  2
);

-- Covington, KY - Add Roebling Suspension Bridge
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'roebling-suspension-bridge',
  'Roebling Suspension Bridge',
  'Covington',
  'Riverside Dr',
  'KY',
  39.0917,
  -84.5103,
  'other',
  'A historic suspension bridge connecting Covington, Kentucky to Cincinnati, Ohio. Designed by John A. Roebling and completed in 1866, it served as the prototype for his later Brooklyn Bridge.',
  'The Roebling Suspension Bridge, connecting Covington to Cincinnati, has a gruesome history that has left paranormal imprints on the structure. Ghost tours begin at the Roebling Murals, where guides share the bridge''s macabre past. During construction, several workers died in accidents, and their spirits are believed to still walk the span. The bridge has also been the site of numerous suicides over its 160-year history, and some of these tormented souls are said to linger. Visitors walking across the bridge at night have reported feeling sudden rushes of cold air and an overwhelming sense of despair. Some have seen figures standing on the edge of the bridge who vanish when approached. The sounds of screaming have been reported coming from below the bridge, where bodies have fallen. The Covington Haunted History Tour includes the bridge as a major stop, sharing stories of the ghosts of slaves, ship captains, and Civil War soldiers associated with the crossing. The bridge''s architectural significance and dark history combine to create one of Kentucky''s most haunted landmarks.',
  1866,
  'https://www.americanlegacytours.com/haunted-covington',
  '["https://www.americanlegacytours.com/haunted-covington","https://www.getyourguide.com/covington-l144457/ghosts-of-covington-haunted-history-tour-t640870/"]',
  2
);

-- Covington, KY - Add Cathedral Basilica of the Assumption
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'cathedral-basilica-covington',
  'Cathedral Basilica of the Assumption',
  'Covington',
  '1140 Madison Ave',
  'KY',
  39.0833,
  -84.5089,
  'other',
  'A stunning Gothic Revival cathedral modeled after Notre-Dame de Paris, featuring one of the world''s largest stained glass windows. Construction began in 1894, with the cathedral consecrated in 1901.',
  'The Cathedral Basilica of the Assumption, with its soaring Gothic architecture modeled after Notre-Dame de Paris, has accumulated spiritual energy over more than a century of worship, weddings, funerals, and prayer. The century-old rectory adjacent to the cathedral is believed to be haunted by the ghost of Father Donald MacLeod, who wrote "The History of Roman Catholicism in North America." Witnesses working on building renovations have seen eerie mists and shadows under the doors of empty rooms. Father MacLeod seems attached to the rectory where he spent years in scholarly pursuit, and his presence is felt particularly strongly in the library. Within the cathedral itself, visitors have reported cold spots near certain side altars and the feeling of being watched during quiet moments of prayer. The sounds of Gregorian chanting have been heard when no choir is present, and some visitors have seen figures in clerical robes moving through the nave before vanishing. The cathedral''s beautiful stained glass windows sometimes seem to glow with an inner light at dusk, adding to the mystical atmosphere of this sacred space.',
  1901,
  'https://www.hauntedplaces.org/covington-ky/',
  '["https://www.hauntedplaces.org/covington-ky/","https://www.americanlegacytours.com/haunted-covington"]',
  2
);

-- Natchitoches, LA - Add Steel Magnolias House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'steel-magnolias-house',
  'Steel Magnolias House',
  'Natchitoches',
  '320 Jefferson St',
  'LA',
  31.7599,
  -93.0867,
  'hotel',
  'A historic bed and breakfast built in the 1830s, famous for its appearance in the 1989 film "Steel Magnolias." The 5,900-square-foot home features six bedrooms named after characters from the movie.',
  'The Steel Magnolias House, famous for its appearance in the beloved 1989 film, carries a haunted history that predates its Hollywood fame. Built in the 1830s by Italian architects, the house was originally intended as a store but served as a hospital for Confederate soldiers during the Civil War. There are also rumors that this historic house played a role in the Underground Railroad. The building''s use as a Civil War hospital means many soldiers died within its walls, and their spirits are believed to still linger. Guests staying overnight have reported hearing footsteps in empty hallways, doors opening and closing on their own, and cold spots in certain rooms. Some have reported seeing shadowy figures in Civil War-era clothing moving through the house at night. The sounds of moaning and distressed voices have been heard, echoing the suffering of wounded soldiers. The house''s transformation into a beloved movie location and bed and breakfast has not diminished its paranormal activity. Staff members have reported objects moving on their own and the feeling of being watched in the historic rooms.',
  1830,
  'https://www.justshortofcrazy.com/natchitoches-film-trail/',
  '["https://www.justshortofcrazy.com/natchitoches-film-trail/","https://www.hauntedplaces.org/natchitoches-la/"]',
  2
);

-- Natchitoches, LA - Add Oakland Plantation
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'oakland-plantation-natchitoches',
  'Oakland Plantation',
  'Natchitoches',
  '4386 Hwy 494, Bermuda',
  'LA',
  31.6847,
  -93.0042,
  'plantation',
  'A Creole cotton plantation established in the 1780s and now part of Cane River Creole National Historical Park. One of the most intact plantation complexes in the South, with original outbuildings and slave quarters.',
  'Oakland Plantation, one of the most intact plantation complexes in the American South, carries the weight of centuries of history including the lives of enslaved people who worked its fields. The plantation''s original slave quarters, overseer''s house, and main residence have all reported paranormal activity. Visitors have reported seeing ghostly figures in the fields at dusk, appearing to work the cotton as they did in life. The slave quarters are particularly active, with cold spots, disembodied voices, and the sounds of singing and working heard by staff and visitors alike. The main house has its own resident spirits, believed to be former owners who watch over the property. Doors open and close on their own, and footsteps echo through empty rooms. Some visitors have reported feeling intense emotions of sadness and despair in certain areas, suggesting residual energy from the suffering that occurred here. The plantation''s preservation means the spiritual connections to the past remain strong. Park rangers have reported unexplained occurrences during after-hours patrols, and paranormal investigators have captured EVPs of voices speaking in French Creole.',
  1789,
  'https://www.travelchannel.com/shows/ghost-adventures/articles/magnolia-plantation-haunted-history',
  '["https://www.travelchannel.com/shows/ghost-adventures/articles/magnolia-plantation-haunted-history","https://www.explorelouisiana.com/articles/things-do-haunted-places-louisiana"]',
  2
);

-- Shreveport, LA - Add Strand Theatre
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'strand-theatre-shreveport',
  'Strand Theatre',
  'Shreveport',
  '619 Louisiana Ave',
  'LA',
  32.5145,
  -93.7451,
  'theater',
  'A beautifully restored 1925 movie palace featuring ornate Moorish/Italian Renaissance architecture. The theater hosts performances and events in its stunning 1,636-seat auditorium.',
  'The Strand Theatre, a magnificently restored 1925 movie palace, is believed to be haunted by spirits from its nearly century-long history of entertainment. Staff members and performers have reported seeing figures in period dress in the auditorium, watching from the balcony seats as if attending a show. The most commonly reported ghost is that of a former projectionist who still seems to be watching over the equipment, even though the projection booth is now empty. The sounds of footsteps are heard backstage when no one is present, and doors open and close on their own. Cold spots are frequently encountered, particularly in the upper balcony and in the basement areas. Some performers have reported feeling a presence watching them during rehearsals, and a few have seen figures in the wings that vanish when approached. The theater''s ornate architecture seems to hold onto the energy of the countless performances that have taken place within its walls. Paranormal investigators have captured unexplained voices and images in the auditorium, and some audience members have photographed orbs floating above the seats.',
  1925,
  'https://www.ktalnews.com/entertainment-news/louisiana-haunted-places-near-me/',
  '["https://www.ktalnews.com/entertainment-news/louisiana-haunted-places-near-me/","https://countryroadsmagazine.com/travel/getaways/strange-shreveport/"]',
  2
);

-- Shreveport, LA - Add Central Station
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'shreveport-central-station',
  'Central Station',
  'Shreveport',
  '101 Milam St',
  'LA',
  32.5042,
  -93.7478,
  'other',
  'A Beaux-Arts railroad station built in 1908, now converted to residential and commercial use. Once the grand gateway to Shreveport, it witnessed countless arrivals and departures over its decades of operation.',
  'Central Station, Shreveport''s grand 1908 railroad terminal, has been reported as a site of paranormal activity since ceasing operation as a train station. The building witnessed countless emotional moments - soldiers leaving for war, immigrants arriving to start new lives, families separated, and lovers reunited. Some of this emotional energy appears to have remained. Visitors and current occupants have reported seeing figures in period clothing waiting on platforms that no longer exist, as if still expecting a train that will never arrive. The sounds of train whistles and the bustle of a busy station have been heard in the empty building. Cold spots are encountered in areas that once served as waiting rooms, and the smell of coal smoke occasionally wafts through the air with no apparent source. Some witnesses have reported seeing a soldier in WWI-era uniform pacing the former platform area, perhaps still waiting for a loved one. The station''s transformation from a transportation hub to residential and commercial space has not diminished its paranormal activity, and residents have learned to coexist with their spectral neighbors.',
  1908,
  'https://www.shreveportbossieradvocate.com/food_and_entertainment/haunted-locations-in-the-shreveport-bossier-gibsland-louisiana-spirits-paranormal-investigations-jefferson-tx/article_3c3a305c-8a59-11ef-a0e5-6f9421239aaa.html',
  '["https://www.shreveportbossieradvocate.com/food_and_entertainment/haunted-locations-in-the-shreveport-bossier-gibsland-louisiana-spirits-paranormal-investigations-jefferson-tx/article_3c3a305c-8a59-11ef-a0e5-6f9421239aaa.html","https://countryroadsmagazine.com/travel/getaways/strange-shreveport/"]',
  2
);

-- Concord, MA - Add Sleepy Hollow Cemetery
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'sleepy-hollow-cemetery-concord',
  'Sleepy Hollow Cemetery',
  'Concord',
  '34 Bedford St',
  'MA',
  42.4594,
  -71.3499,
  'cemetery',
  'A historic cemetery containing over 10,000 gravesites, including "Author''s Ridge" where Louisa May Alcott, Ralph Waldo Emerson, Nathaniel Hawthorne, and Henry David Thoreau are buried.',
  'Sleepy Hollow Cemetery in Concord is one of Massachusetts'' most haunted locations, with paranormal activity reported since the 1800s. The cemetery began in 1855 and holds the remains of America''s most celebrated literary figures on Author''s Ridge, including Louisa May Alcott, Ralph Waldo Emerson, Nathaniel Hawthorne, and Henry David Thoreau - all of whom knew each other in life and now rest near each other in death. Before it became a graveyard, the land was the outdoor playground of these literary titans, who walked its paths and found inspiration among its trees. Visitors have reported seeing spectral figures among the gravestones, including one menacing presence with no grave marker who creeps between tombstones at dusk. The ghost tours of Concord feature stops at Author''s Ridge, sharing stories of Nathaniel Hawthorne''s deadly discovery and Louisa May Alcott''s paranormal experiences in life. Cold spots are frequently encountered, and some visitors report overwhelming feelings of peace near certain graves. The atmosphere of reverence within the cemetery is palpable, but so is the unsettling sensation that not all the residents have found eternal rest.',
  1855,
  'https://usghostadventures.com/concord-ghost-tour/',
  '["https://usghostadventures.com/concord-ghost-tour/","https://www.americanheritage.com/haunted-authors-sleepy-hollow-cemetery"]',
  2
);

-- Concord, MA - Add The Wayside
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'the-wayside-concord',
  'The Wayside',
  'Concord',
  '455 Lexington Rd',
  'MA',
  42.4548,
  -71.3416,
  'mansion',
  'A historic home that was residence to the Alcott family, Nathaniel Hawthorne, and Margaret Sidney. The only home owned by Hawthorne and the setting for many scenes in Louisa May Alcott''s "Little Women."',
  'The Wayside is one of Concord''s most historically significant homes, having been residence to three prominent literary families, and it carries the spiritual imprints of all of them. Nathaniel Hawthorne purchased the home in 1852 and lived here until his death in 1864. His tower study, added to the house so he could write in solitude, is said to be particularly active. Visitors have reported seeing a figure at the window of the tower, believed to be Hawthorne himself still gazing out over the landscape that inspired his darkest works. The Alcott family also lived here before Hawthorne, and their presence is still felt in certain rooms. Louisa May Alcott wrote about her paranormal experiences in life, and some believe her spirit still visits the home where she spent part of her childhood. Cold spots are encountered throughout the house, and the sounds of quill pens scratching on paper have been heard in empty rooms. Staff members have reported feeling watched and occasionally glimpsing figures in period dress moving through the historic rooms. The concentration of literary genius that once inhabited this home seems to have left permanent spiritual residue.',
  1775,
  'https://usghostadventures.com/concord-ghost-tour/',
  '["https://usghostadventures.com/concord-ghost-tour/","https://www.halloweennewengland.com/locations/seaside-shadows-ma"]',
  2
);

-- Sharpsburg, MD - Add Pry House Field Hospital Museum
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'pry-house-field-hospital',
  'Pry House Field Hospital Museum',
  'Sharpsburg',
  '18906 Shepherdstown Pike',
  'MD',
  39.4724,
  -77.7437,
  'museum',
  'A historic farmhouse that served as the headquarters of General George McClellan and a field hospital during the Battle of Antietam. Now a museum dedicated to Civil War medicine.',
  'The Pry House, which served as General McClellan''s headquarters and a field hospital during the bloodiest single-day battle in American history, is one of the most haunted sites on the Antietam battlefield. The sounds of moaning and screaming have been reported, echoing the agony of wounded soldiers who were treated and died within its walls. Visitors have reported seeing figures in period medical attire moving through the rooms, as if still attending to patients from 1862. The ghost of a woman, believed to be Mrs. Pry who watched helplessly as her home was transformed into a charnel house, has been seen on the upper floors. Cold spots are frequently encountered, particularly in rooms used for surgery where amputations were performed. The smell of blood and chloroform has been reported with no apparent source. Footsteps are heard in empty hallways, and doors open and close on their own. Some visitors have photographed unexplained mists and figures in the historic rooms. The intense suffering that occurred here during and after the battle seems permanently imprinted on the building, creating one of Maryland''s most active paranormal sites.',
  1844,
  'https://www.routeoneapparel.com/blogs/news/antietam-ghosts-haunted-history',
  '["https://www.routeoneapparel.com/blogs/news/antietam-ghosts-haunted-history","https://ghostexcavation.com/ghost-excavations-at-antietam-national-battlefield-sharpsburg-maryland"]',
  2
);

-- Sharpsburg, MD - Add Burnside Bridge
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'burnside-bridge-antietam',
  'Burnside Bridge',
  'Sharpsburg',
  'Antietam National Battlefield',
  'MD',
  39.4466,
  -77.7326,
  'battlefield',
  'A three-arched stone bridge on Antietam Creek where some of the fiercest fighting of the Battle of Antietam occurred. Union forces under General Ambrose Burnside attempted to cross while Confederate sharpshooters defended.',
  'Burnside Bridge is one of the most haunted locations on the Antietam battlefield, where fierce fighting resulted in heavy casualties on both sides. Park rangers and Civil War reenactors who have spent time at the bridge after dark report strange phenomena that defy explanation. Visitors have witnessed blue balls of light moving about in the darkness around the bridge, floating silently across the water and among the trees. The sound of a phantom drum beating out a cadence has been heard, only to fade away into silence. Soldiers who fell during the assault were hastily buried in unknown locations near the bridge, and their restless spirits seem unable to find peace. The sounds of gunfire and shouting have been reported, as if the battle continues to rage in some other dimension. Cold spots are frequently encountered on the bridge itself, and visitors have reported feeling sudden overwhelming fear or despair for no apparent reason. Some have photographed misty figures on the bridge that weren''t visible to the naked eye. The combination of violent death and hasty, unmarked burials has created one of the most paranormally active Civil War sites in America.',
  1836,
  'https://moonmausoleum.com/bloody-lanes-ghostly-echoes-at-antietam-national-battlefield/',
  '["https://moonmausoleum.com/bloody-lanes-ghostly-echoes-at-antietam-national-battlefield/","https://www.fhwa.dot.gov/infrastructure/back1105.cfm"]',
  2
);

-- Chapel Hill, NC - Add The Carolina Inn
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'carolina-inn-dr-jacocks',
  'The Carolina Inn - Dr. Jacocks'' Room',
  'Chapel Hill',
  '211 Pittsboro St',
  'NC',
  35.9127,
  -79.0519,
  'hotel',
  'A historic inn on the campus of the University of North Carolina, built in 1924. The inn has hosted countless distinguished guests and has significant evidence of hauntings according to paranormal investigators.',
  'The Carolina Inn is one of Chapel Hill''s most well-documented haunted locations, with significant evidence of hauntings confirmed by paranormal investigators. The most famous ghost is that of Dr. William Jacocks, a doctor who lived at the inn from 1948 until his death in 1965. Dr. Jacocks loved the inn so much that his spirit apparently never checked out. Guests and staff have reported seeing his apparition in the hallways, wearing a suit and carrying a medical bag. Room 256, where Dr. Jacocks spent his final years, is considered particularly active. Guests have reported the sensation of being tucked into bed by unseen hands, lights flickering, and the television turning on by itself. The smell of flowers - Dr. Jacocks was known to bring flowers to staff members - has been detected in hallways. Cold spots are frequently encountered, and some guests have reported waking to find the impression of someone sitting on the edge of their bed. The inn embraces its haunted reputation, and Dr. Jacocks is considered a friendly presence who continues to watch over the establishment he loved in life.',
  1924,
  'https://www.unc.edu/story/carolina-ghost-stories/',
  '["https://www.unc.edu/story/carolina-ghost-stories/","https://usghostadventures.com/chapel-hill-ghost-tour/"]',
  2
);

-- Chapel Hill, NC - Add Playmakers Theatre
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'playmakers-theatre',
  'PlayMakers Repertory Company Theatre',
  'Chapel Hill',
  '120 Country Club Rd',
  'NC',
  35.9110,
  -79.0484,
  'theater',
  'A historic theater on the campus of the University of North Carolina, serving as the home of PlayMakers Repertory Company. The building has hosted theatrical productions for generations of students and community members.',
  'PlayMakers Theatre at UNC Chapel Hill has long been the subject of ghost stories passed down through generations of drama students. Originally honoring alumni and UNC figures, its Gothic predecessor held tributes to 260 Confederate alumni lost in the Civil War. Today, the theater is haunted by two distinct spirits. The first is the standoffish "Evan," a figure in 1940s attire who silently observes from the audience during rehearsals and performances. Actors have reported feeling his critical gaze and finding him seated in the empty auditorium, only to have him vanish when approached. The second spirit is the more restless ghost of former University President David Swain, whose presence is felt more intensely. Swain seems less content than Evan, with his movements creating cold spots and unexplained sounds backstage. Lights flicker during performances, and props have been known to move on their own. The traditional "ghost light" left burning on stage each night serves both practical and supernatural purposes - keeping actors safe from falls and appeasing the spirits who use the stage after hours.',
  1851,
  'https://www.unc.edu/story/carolina-ghost-stories/',
  '["https://www.unc.edu/story/carolina-ghost-stories/","https://www.wral.com/story/ghosts-of-the-triangle-spookiest-urban-legends-from-around-the-triangle/19940194/"]',
  2
);

-- Winston-Salem, NC - Add Korner's Folly
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'korners-folly',
  'Korner''s Folly',
  'Winston-Salem',
  '413 S Main St, Kernersville',
  'NC',
  36.1200,
  -80.0736,
  'mansion',
  'One of the strangest houses in America, built in 1880 by Jule Gilmer Korner. The seven-level home features 22 rooms with varying ceiling heights, unusual angles, and the oldest private theater in America.',
  'Korner''s Folly, one of the strangest houses in America, was officially declared haunted after a 2009 paranormal investigation. The seven-level home with 22 rooms of varying ceiling heights and unusual angles seems designed to disorient the living - and perhaps trap the dead. Most ghostly tales focus on the fourth floor, where investigators recorded disembodied voices, witnessed furniture moving on its own, and documented lights mysteriously flicking on and off. One investigator reported receiving three distinct taps on the head from an unseen hand. The Korner family lived in this eccentric home for generations, and some appear to have never left. Visitors have reported seeing figures in period dress moving through the oddly-shaped rooms, only to vanish around corners into impossible spaces. Cold spots are frequently encountered, and the sounds of children laughing have been heard in the private theater - the oldest in America - when it stands empty. The house''s unusual architecture, with its tilted walls and unexpected angles, creates an unsettling atmosphere that paranormal investigators believe may trap spiritual energy.',
  1880,
  'https://www.visitwinstonsalem.com/blog/winston-salems-most-haunted-sites',
  '["https://www.visitwinstonsalem.com/blog/winston-salems-most-haunted-sites","https://www.hauntedrooms.com/north-carolina/haunted-places/winston-salem"]',
  2
);

-- Winston-Salem, NC - Add Zevely House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'zevely-house-bernardins',
  'Zevely House (Bernardin''s Restaurant)',
  'Winston-Salem',
  '214 W 4th St',
  'NC',
  36.0973,
  -80.2443,
  'restaurant',
  'A historic home built in the 1800s, now operating as Bernardin''s Restaurant. The building has served various purposes over its long history and is said to be cursed.',
  'The Zevely House, now home to Bernardin''s Restaurant, is said to be under a curse that has plagued the property for generations. The West End Ghost Tours, one of Winston-Salem''s most popular year-round ghost walks, features the supposed curse as one of its most chilling stories. Staff at the restaurant have reported numerous paranormal occurrences including unexplained cold spots, objects moving on their own, and the feeling of being watched when alone in the building. Some employees have reported seeing shadowy figures in period dress moving through the dining rooms after closing. The sounds of footsteps and whispered conversations have been heard in empty sections of the restaurant. Diners have occasionally reported strange experiences, including wine glasses moving and silverware rearranging itself. The exact nature of the curse is shared on the ghost tours, but it is believed to be connected to a tragic event in the house''s early history. Whether cursed or simply haunted, the Zevely House continues to attract both culinary enthusiasts and paranormal investigators.',
  1815,
  'https://www.visitwinstonsalem.com/blog/winston-salems-spookiest-tours',
  '["https://www.visitwinstonsalem.com/blog/winston-salems-spookiest-tours","https://www.hauntedrooms.com/north-carolina/haunted-places/winston-salem"]',
  2
);

-- Toledo, OH - Add Collingwood Arts Center
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'collingwood-arts-center-toledo',
  'Collingwood Arts Center',
  'Toledo',
  '2413 Collingwood Blvd',
  'OH',
  41.6617,
  -83.5664,
  'other',
  'A former Catholic convent and college now serving as an arts center. The building has served as a convent, Catholic college, and retirement home for nuns over its long history.',
  'The Collingwood Arts Center is considered by many to be the most haunted building in Lucas County. The massive structure served as a convent, Catholic college, and retirement home for nuns, meaning many women lived and died within its walls. Several ghosts are said to inhabit its rooms, stairways, attic, and auditorium. The spirits of nuns in traditional habits have been seen gliding through the winding halls, continuing their routines from life. Staff and visitors report cold spots, unexplained footsteps, and the feeling of being watched. Doors open and close on their own, and lights flicker in empty rooms. Some artists working late have reported seeing figures in their peripheral vision that vanish when confronted. The attic is considered particularly active, with reports of strange sounds and shadows moving in the darkness. Ghost behaviorist Chris Bores has conducted tours and investigations here for nearly a decade, documenting numerous paranormal encounters. The Haunted Collingwood tours offered in October allow visitors to experience the creepy tours through the massive winding halls of this historic building.',
  1905,
  'https://toledocitypaper.com/the-city/the-spooky-city-discover-toledos-most-haunted-places/',
  '["https://toledocitypaper.com/the-city/the-spooky-city-discover-toledos-most-haunted-places/","https://hauntedtoledo.com/"]',
  2
);

-- Toledo, OH - Add Wolcott House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'wolcott-house-maumee',
  'Wolcott House',
  'Toledo',
  '1031 River Rd, Maumee',
  'OH',
  41.5625,
  -83.6544,
  'mansion',
  'A Federal-style mansion built in the 1830s, now a museum complex showcasing life in the Maumee Valley during the 19th century. The complex includes several historic buildings.',
  'Wolcott House, a stately Federal-style mansion from the 1830s, has a long history of paranormal activity that has made it a favorite destination for ghost enthusiasts. The house hosts Paranormal Tours each October, where guides lead visitors through the historic rooms sharing chilling stories of the spirits that inhabit the property. Multiple ghosts are believed to reside in the mansion, including former family members who refuse to leave their beloved home. Visitors have reported seeing figures in period dress in the windows, cold spots throughout the house, and the sound of footsteps in empty rooms. Some have heard conversations in 19th-century dialects and smelled perfume with no apparent source. The upstairs bedrooms are considered particularly active, with guests reporting the sensation of being watched and beds appearing to have been sat upon when no one has been in the room. Objects move on their own, and doors refuse to stay closed. The surrounding historic complex adds to the supernatural atmosphere, with multiple buildings contributing their own ghost stories to the Wolcott House experience.',
  1836,
  'https://visittoledo.org/things-to-do/museums-history/ghostly-toledo',
  '["https://visittoledo.org/things-to-do/museums-history/ghostly-toledo","https://www.toledo.com/main/toledo-haunted-houses-and-halloween-happenings-2024/"]',
  2
);

-- Scranton, PA - Add Catlin House
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'catlin-house-scranton',
  'Catlin House',
  'Scranton',
  '232 Monroe Ave',
  'PA',
  41.4090,
  -75.6649,
  'mansion',
  'A Victorian mansion that serves as the headquarters of the Lackawanna Historical Society. The house preserves the history of the Scranton area and its coal mining heritage.',
  'The Catlin House has gained a reputation for various forms of paranormal activity in recent years, making it one of Scranton''s most intriguing haunted locations. Unexplained shadows and eerie feelings have been reported in the second-floor fashion room, where antique clothing displays seem to attract spiritual energy. One volunteer reported a remarkable experience - feeling momentarily transported back in time after hearing a train whistle emanating from a closet, a sensory memory perhaps connected to Scranton''s railroad heritage. Another volunteer felt constantly watched while working in the house and witnessed an antique gown appear to float above them. The house''s collection of historic artifacts, many with deep emotional connections to their former owners, may serve as conduits for paranormal activity. Cold spots are encountered throughout the building, and the sounds of footsteps and voices have been heard in empty rooms. The Catlin House''s location on Scranton''s Lackawanna Haunted Trail makes it a popular destination for those interested in the paranormal history of this former coal mining capital.',
  1867,
  'https://www.buriedsecretspodcast.com/everhart-museum-hotel-jermyn-catlin-house-banshee-pub-haunted-scranton/',
  '["https://www.buriedsecretspodcast.com/everhart-museum-hotel-jermyn-catlin-house-banshee-pub-haunted-scranton/","https://www.visitnepa.org/things-to-do/paranormal-and-haunts/"]',
  2
);

-- Scranton, PA - Add Scranton Public Library
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'scranton-public-library',
  'Albright Memorial Library',
  'Scranton',
  '500 Vine St',
  'PA',
  41.4100,
  -75.6653,
  'other',
  'Scranton''s main public library, a Beaux-Arts building that has served the community since 1893. The library holds significant historical collections related to Scranton''s industrial past.',
  'The Scranton Public Library has become known for various paranormal phenomena over the decades. Visitors and staff have reported sightings of mysterious shadows in the basement, where the building''s original coal-powered heating system once operated. Doors have been documented opening and closing on their own, and orbs have been photographed appearing on the staircases. Books have fallen from shelves without any apparent cause, sometimes opening to specific pages as if someone is trying to communicate. The library''s connection to Scranton''s coal mining past may contribute to its haunted reputation, as the entire region is built upon the graves of miners who died in the dangerous underground workings. Cold spots are frequently encountered, particularly in the older sections of the building. Staff members working late have reported hearing footsteps and whispered conversations in empty reading rooms. Some have reported seeing a figure in mining attire near displays about Scranton''s industrial history. The library embraces its place on the Lackawanna Haunted Trail, welcoming paranormal investigators to explore its supernatural side.',
  1893,
  'https://www.visitnepa.org/things-to-do/tours-and-sightseeing/haunted-trail/',
  '["https://www.visitnepa.org/things-to-do/tours-and-sightseeing/haunted-trail/","https://www.buriedsecretspodcast.com/the-exorcist-statue-and-other-scranton-pa-hauntings/"]',
  2
);

-- Greenville, SC - Add Falls Park at Reedy
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'falls-park-reedy',
  'Falls Park on the Reedy',
  'Greenville',
  '601 S Main St',
  'SC',
  34.8436,
  -82.4012,
  'other',
  'A scenic urban park featuring a 60-foot waterfall on the Reedy River in downtown Greenville. The park includes the iconic Liberty Bridge and beautiful gardens.',
  'Falls Park on the Reedy, one of Greenville''s most beautiful public spaces, carries paranormal legends connected to the area''s industrial past. Before the park was created, the site was home to textile mills where workers toiled in dangerous conditions. The spirits of mill workers, including children who labored in the factories, are said to linger near the falls. Visitors have reported seeing figures in period work clothes near the water''s edge, particularly at dusk. The sounds of machinery have been heard near the falls, echoing the mills that once harnessed the water''s power. Some visitors have reported cold spots on the Liberty Bridge, even on warm summer evenings. The falls themselves have been the site of tragic drownings over the years, and some believe these victims'' spirits remain. Ghost tours in Greenville often include the park, sharing stories of the workers and residents whose lives were shaped by the Reedy River. Paranormal investigators have captured unexplained images and EVPs near the falls, suggesting that the natural beauty of the park coexists with supernatural activity.',
  1760,
  'https://www.greenvilleghosttours.com/',
  '["https://www.greenvilleghosttours.com/","https://gvltoday.6amcity.com/scary-stories-greenville-sc"]',
  2
);

-- Greenville, SC - Add Poinsett Hotel (already exists as Westin Poinsett) - add different location
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'christ-church-greenville',
  'Christ Church Episcopal',
  'Greenville',
  '10 N Church St',
  'SC',
  34.8526,
  -82.3988,
  'other',
  'The oldest church in Greenville, established in 1820. This Gothic Revival church has served the community for over two centuries and witnessed countless baptisms, weddings, and funerals.',
  'Christ Church Episcopal, the oldest church in Greenville, carries two centuries of spiritual energy within its Gothic Revival walls. As the site of countless baptisms, weddings, and funerals since 1820, the church has witnessed the full spectrum of human emotion. Some of that energy appears to have remained. Parishioners and visitors have reported seeing figures in period dress in the sanctuary, particularly during quiet moments of prayer. The sounds of hymns being sung have been heard when the church stands empty, as if phantom congregations still gather for worship. Cold spots are encountered throughout the building, and candles have been known to flicker or extinguish without explanation. Some visitors have reported feeling comforting presences during moments of grief, as if former parishioners are offering support from beyond. The church cemetery, adjacent to the building, adds to the supernatural atmosphere. Staff members have reported seeing figures among the gravestones that vanish when approached. The church''s long history as a place of worship, community, and mourning has created a spiritually charged environment.',
  1820,
  'https://kiddingaroundgreenville.com/haunted-places-in-the-upstate',
  '["https://kiddingaroundgreenville.com/haunted-places-in-the-upstate","https://www.greenvilleghosttours.com/"]',
  2
);

-- Murrells Inlet, SC - Add Brookgreen Gardens
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'brookgreen-gardens',
  'Brookgreen Gardens',
  'Murrells Inlet',
  '1931 Brookgreen Dr',
  'SC',
  33.5181,
  -79.0981,
  'other',
  'A sculpture garden and wildlife preserve on the site of four former rice plantations. The 9,100-acre property features American figurative sculpture and preserved Lowcountry landscape.',
  'Brookgreen Gardens, built on the grounds of four former rice plantations, is rich with the spirits of those who lived, worked, and died here over centuries. The land''s history as a rice plantation means thousands of enslaved people toiled in the fields, and many believe their spirits still walk the property. Visitors have reported seeing figures working in the former rice fields at dusk, bent over in labor just as they were in life. The sculpture gardens themselves seem to attract spiritual energy, with some statues said to move or change position when unobserved. Cold spots are encountered throughout the property, particularly near the remains of plantation buildings. The sound of singing and chanting has been heard near former slave quarters, carrying across the marshes in the evening hours. Some visitors have photographed misty figures near certain sculptures, and others have reported the sensation of being watched while walking the garden paths. The wildlife preserve''s isolation and the weight of history combine to create an atmosphere where past and present seem to blur together.',
  1931,
  'https://hammockcoastsc.com/what-are-the-10-most-haunted-places-on-the-hammock-coast/',
  '["https://hammockcoastsc.com/what-are-the-10-most-haunted-places-on-the-hammock-coast/","https://www.hauntedplaces.org/murrells-inlet-sc/"]',
  2
);

-- Murrells Inlet, SC - Add All Saints Church (Alice Flagg's grave)
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'all-saints-church-pawleys',
  'All Saints Church Cemetery',
  'Murrells Inlet',
  '3560 Kings River Rd, Pawleys Island',
  'SC',
  33.4508,
  -79.1289,
  'cemetery',
  'A historic Episcopal church and cemetery where Alice Flagg, the legendary ghost of Murrells Inlet, is buried. The church dates to 1767 and contains graves from the area''s plantation era.',
  'All Saints Church Cemetery is the final resting place of Alice Flagg, whose tragic love story has made her one of the most famous ghosts in South Carolina. Alice died in 1849 after falling ill, heartbroken over being separated from her lumber merchant fiance whom her wealthy family disapproved of. Before she died, her brother ripped her engagement ring from around her neck, and Alice has been searching for it ever since. Her gravestone, simply marked "Alice," sits in the back corner of the cemetery. Visitors have reported seeing a young woman in a white dress standing near the grave, clutching her chest where the ring once hung. People who walk around her grave a certain number of times claim to feel tugs on their own rings, as if Alice is trying to reclaim what she lost. The cemetery is filled with other spirits from the plantation era, and cold spots, unexplained lights, and shadowy figures are frequently reported. Visitors leave rings and other tokens on Alice''s grave as offerings, hoping to bring peace to her restless spirit. Ghost tours frequently visit the cemetery to share Alice''s heartbreaking tale.',
  1767,
  'https://crazysistermarina.com/blog/the-haunting-legend-of-alice-flagg-a-murrells-inlet-tale/',
  '["https://crazysistermarina.com/blog/the-haunting-legend-of-alice-flagg-a-murrells-inlet-tale/","https://www.onlypawleys.com/press-release/these-3-pawleys-island-ghost-stories-may-send-a-chill-up-your-spine/"]',
  2
);

-- Gatlinburg, TN - Add First United Methodist Church
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'first-methodist-church-gatlinburg',
  'First United Methodist Church',
  'Gatlinburg',
  '215 Airport Rd',
  'TN',
  35.7121,
  -83.5106,
  'other',
  'The oldest church in Gatlinburg, built entirely from mountain rock. The stone church has served the community for generations and is a landmark of Smoky Mountain faith.',
  'The First United Methodist Church, the oldest church in Gatlinburg, puts a chill down visitors'' spines with its combination of mountain isolation and supernatural activity. Entirely constructed from local mountain rock, the church looks like something from a Gothic horror tale, particularly in the mist that often blankets the Smokies. Visitors have reported seeing strange silhouettes against the stone walls, figures that don''t correspond to anyone physically present. Apparitions resembling priests or ministers have been spotted inside and around the church, continuing their spiritual duties from beyond the grave. The church''s age means it has witnessed countless funerals for mountain families, and some of those mourners appear to have never left. Cold spots are encountered in the sanctuary, and the sound of hymns has been heard drifting from the church when it stands empty. Some visitors have reported feeling an overwhelming sense of peace inside, while others have experienced sudden dread. The church''s stone construction, which some believe stores spiritual energy, may explain why paranormal activity is so consistently reported here.',
  1854,
  'https://gatlinburghaunts.com/top-10-most-haunted-places-in-gatlinburg/',
  '["https://gatlinburghaunts.com/top-10-most-haunted-places-in-gatlinburg/","https://www.gatlinburg.com/blog/post/ghosts-of-gatlinburg-10-haunted-places-to-visit-this-fall/"]',
  2
);

-- Gatlinburg, TN - Add Roaring Fork Motor Nature Trail (Lucy's Ghost)
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'roaring-fork-motor-trail',
  'Roaring Fork Motor Nature Trail',
  'Gatlinburg',
  'Historic Nature Trail Rd',
  'TN',
  35.7050,
  -83.4892,
  'other',
  'A scenic one-way loop road in Great Smoky Mountains National Park, featuring historic cabins, old-growth forest, and beautiful mountain streams. The trail passes through what was once a thriving mountain community.',
  'The Roaring Fork Motor Nature Trail is haunted by one of Gatlinburg''s most famous ghosts - a young woman named Lucy who met a tragic end in a cabin fire around 1909. If you encounter a beautiful young woman looking for a ride on this isolated mountain road, you may have just met Lucy''s ghost. Legend has it that about a year after her death, a man named Foster spotted a beautiful woman in the woods and shared his horse with her. When he went to seek her parents'' approval to court her, they informed him that she had tragically passed not long ago. Lucy still looks for rides along the trail and can be seen in the woods near where her cabin burned to the ground. Visitors have reported seeing a young woman in period dress walking along the roadside or standing among the trees. Some have stopped to offer assistance, only to have her vanish before their eyes. Cold spots are encountered along the trail, and the smell of wood smoke sometimes drifts through the air where no fire burns. Lucy''s presence adds an element of the supernatural to this already atmospheric mountain drive.',
  1900,
  'https://www.gatlinburg.com/blog/post/ghosts-of-gatlinburg-10-haunted-places-to-visit-this-fall/',
  '["https://www.gatlinburg.com/blog/post/ghosts-of-gatlinburg-10-haunted-places-to-visit-this-fall/","https://gatlinburghaunts.com/top-10-most-haunted-places-in-gatlinburg/"]',
  2
);

-- Knoxville, TN - Add Mabry-Hazen House (already exists, add different)
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'tennessee-theatre-knoxville',
  'Tennessee Theatre',
  'Knoxville',
  '604 S Gay St',
  'TN',
  35.9657,
  -83.9190,
  'theater',
  'A grand 1928 movie palace known as the "Official State Theatre of Tennessee." The Spanish-Moorish style theater features a Mighty Wurlitzer organ and has hosted countless performances.',
  'The Tennessee Theatre, a magnificent 1928 movie palace, is home to spirits who seem to appreciate the fine entertainment as much as living patrons do. Staff and performers have reported numerous paranormal encounters over the decades. The most frequently seen ghost is that of a former organist who played the Mighty Wurlitzer, and the organ has been known to produce notes when no one is seated at the keys. The sounds of applause and laughter have been heard in the empty auditorium, as if phantom audiences are still enjoying shows from decades past. Cold spots are encountered throughout the ornate building, particularly in the upper balconies. Some staff members have reported seeing figures in period dress seated in the audience during rehearsals, watching intently before vanishing. The backstage areas are considered especially active, with footsteps heard in empty corridors and dressing room doors opening on their own. The theatre''s lavish Spanish-Moorish decoration seems to hold onto the energy of the countless performances that have occurred within its walls, creating an environment where the past refuses to remain past.',
  1928,
  'https://hauntedknoxville.net/',
  '["https://hauntedknoxville.net/","https://usghostadventures.com/knoxville-ghost-tour/"]',
  2
);

-- Knoxville, TN - Add Old Gray Cemetery
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'old-gray-cemetery-knoxville',
  'Old Gray Cemetery',
  'Knoxville',
  '543 N Broadway',
  'TN',
  35.9750,
  -83.9217,
  'cemetery',
  'A historic garden cemetery established in 1850, containing the graves of many prominent Knoxville citizens. The beautifully landscaped grounds feature ornate Victorian monuments and statues.',
  'Old Gray Cemetery, established in 1850, is one of Knoxville''s most haunted locations, with paranormal activity reported since the Civil War era. The Victorian garden cemetery is the final resting place of many of Knoxville''s most prominent citizens, some of whom apparently never left. Visitors have reported seeing figures in period dress walking among the ornate monuments, particularly at dusk. The most famous ghost is that of a woman in a long gray dress who wanders the paths, believed to be searching for a loved one''s grave. Cold spots are frequently encountered, even on warm summer days, and the sound of weeping has been heard near certain graves. Some visitors have photographed unexplained mists and orbs hovering over headstones. The cemetery''s Civil War section is particularly active, with reports of soldiers in uniform standing guard over their fallen comrades. The beautiful statues and monuments that adorn the grounds sometimes seem to move in peripheral vision, as if the stone figures are watching visitors pass. Old Gray Cemetery''s combination of beauty and supernatural activity makes it a unique destination for ghost enthusiasts.',
  1850,
  'https://shannonfosterbolinegroup.com/blog/echoes-from-the-past-exploring-the-most-haunted-places-around-knoxville-tn',
  '["https://shannonfosterbolinegroup.com/blog/echoes-from-the-past-exploring-the-most-haunted-places-around-knoxville-tn","https://epicspookyadventures.com/ghost-tours-of-knoxville-tennessee/"]',
  2
);

-- El Paso, TX - Add El Paso High School
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'el-paso-high-school',
  'El Paso High School',
  'El Paso',
  '800 E Schuster Ave',
  'TX',
  31.7733,
  -106.4756,
  'university',
  'A historic high school built in 1916, known for its distinctive architecture and long history of educating El Paso students. The school has been featured in numerous paranormal investigations.',
  'El Paso High School is considered by locals to be the most haunted place in El Paso, with more mentions from residents than any other location. The grand 1916 building has accumulated over a century of paranormal activity. The most persistent legend involves a ghostly girl who appears in the school''s reflecting pool and on staircases. Students and staff have reported seeing a young woman in period dress who vanishes when approached. The sounds of footsteps echo through empty hallways, and lockers open and close on their own. Cold spots are frequently encountered, particularly in the basement and older sections of the building. Some students have reported feeling watched during evening activities, and janitors working late have seen figures moving through the darkened corridors. The school''s gym is said to be haunted by a former basketball player, and the auditorium has its own resident spirits who attend performances from the empty balcony. The building''s age and the thousands of students who have passed through its halls have created an environment rich with residual energy and active hauntings.',
  1916,
  'https://kvia.com/news/el-paso/2024/10/21/the-most-haunted-places-in-el-paso/',
  '["https://kvia.com/news/el-paso/2024/10/21/the-most-haunted-places-in-el-paso/","https://elpasomom.com/in-around-el-paso/el-pasos-most-haunted-historical-sites/"]',
  2
);

-- El Paso, TX - Add El Paso Public Library
INSERT OR REPLACE INTO places (slug, name, city, address, state, latitude, longitude, category, description, ghost_story, year_established, source_url, sources, source_count)
VALUES (
  'el-paso-main-library',
  'El Paso Main Library',
  'El Paso',
  '501 N Oregon St',
  'TX',
  31.7611,
  -106.4892,
  'other',
  'The main branch of the El Paso Public Library system, built on the former site of a cemetery. The building houses extensive collections and serves as a community hub.',
  'The El Paso Main Library ranks as the second most haunted location in the city, with its paranormal reputation stemming from a dark secret beneath its foundations. The library was built on the site of a former cemetery, and while many graves were supposedly relocated to Concordia Cemetery, locals believe not all the bodies were moved. This disturbing history has generated legends of paranormal activity ever since the library opened. Visitors and staff have reported seeing ghostly figures among the book stacks, particularly in the basement level closest to where bodies may still rest. Cold spots are frequently encountered, and books have been known to fall from shelves with no apparent cause. The sounds of whispered conversations have been heard in empty reading rooms, and some visitors have reported feeling watched. Staff members working late have seen figures in period clothing that vanish when confronted. The library''s location over a cemetery creates a unique and unsettling atmosphere, and paranormal investigators have captured EVPs that seem to be voices from another era. The library embraces its haunted reputation as part of El Paso''s rich supernatural heritage.',
  1954,
  'https://kvia.com/news/el-paso/2024/10/21/the-most-haunted-places-in-el-paso/',
  '["https://kvia.com/news/el-paso/2024/10/21/the-most-haunted-places-in-el-paso/","https://www.hauntedrooms.com/texas/el-paso/haunted-places/"]',
  2
);
