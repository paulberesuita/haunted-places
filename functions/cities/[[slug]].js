// GET /cities and /cities/[city-slug] - City Pages Directory
// Handles both index (all cities with 5+ places) and city detail pages

const stateNames = {
  'CA': 'California',
  'CT': 'Connecticut',
  'FL': 'Florida',
  'GA': 'Georgia',
  'IL': 'Illinois',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'MA': 'Massachusetts',
  'MD': 'Maryland',
  'NC': 'North Carolina',
  'NJ': 'New Jersey',
  'NY': 'New York',
  'OH': 'Ohio',
  'PA': 'Pennsylvania',
  'SC': 'South Carolina',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'VA': 'Virginia'
};

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function truncate(text, length) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

// Generate city slug from city name and state code: "New Orleans" + "LA" -> "new-orleans-la"
function makeCitySlug(city, state) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + state.toLowerCase();
}

// Parse city slug back to state code: "new-orleans-la" -> { stateCode: "LA" }
function parseCitySlug(slug) {
  // State abbreviation is always the last 2 chars after the final hyphen
  const lastHyphen = slug.lastIndexOf('-');
  if (lastHyphen === -1 || lastHyphen === slug.length - 1) return null;
  const stateCode = slug.substring(lastHyphen + 1).toUpperCase();
  if (!stateNames[stateCode]) return null;
  return { stateCode };
}

function renderHead(title, description, canonicalUrl, baseUrl) {
  return `<meta charset="UTF-8">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <script async src="https://plausible.io/js/pa-U75YbwDcDaK8C53IH8RVe.js"></script>
  <script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()</script>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Creepster&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
          colors: {
            'dark': '#0a0a0f',
            'dark-card': '#141419',
            'dark-border': '#2a2a35',
            'accent': '#e94560',
            'accent-hover': '#ff6b6b',
            'muted': '#6b7280',
            'ghost': '#9ca3af',
          }
        }
      }
    }
  </script>`;
}

function renderHeader(activePage) {
  return `<header>
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="${activePage === 'states' ? 'text-white' : 'hover:text-white transition-colors'}">States</a>
        <a href="/category" class="${activePage === 'category' ? 'text-white' : 'hover:text-white transition-colors'}">Categories</a>
        <a href="/tours" class="${activePage === 'tours' ? 'text-white' : 'hover:text-white transition-colors'}">Tours</a>
        <a href="/about" class="${activePage === 'about' ? 'text-white' : 'hover:text-white transition-colors'}">About</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `<footer class="mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center">
        <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
        <a href="/radio" class="block text-ghost hover:text-white text-sm transition-colors mt-2">Ghost Story Radio</a>
        <p class="text-muted text-sm mt-2">Documenting America's most haunted locations, one ghost story at a time.</p>
      </div>
    </div>
  </footer>`;
}

function renderCitiesIndexPage(cities, baseUrl) {
  const totalCities = cities.length;
  const totalPlaces = cities.reduce((sum, c) => sum + c.place_count, 0);
  const title = `Haunted Cities - ${totalCities} Most Haunted Cities in America | SpookFinder`;
  const description = `Explore ${totalCities} haunted cities across America with ${totalPlaces} paranormal locations. From New Orleans to Salem, discover ghost stories and haunted places by city.`;
  const canonicalUrl = `${baseUrl}/cities`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Cities" }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Most Haunted Cities in America",
    "description": `${totalCities} cities with significant paranormal activity and haunted locations.`,
    "numberOfItems": totalCities,
    "itemListElement": cities.slice(0, 50).map((city, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${city.city}, ${stateNames[city.state] || city.state}`,
      "url": `${baseUrl}/cities/${makeCitySlug(city.city, city.state)}`
    }))
  };

  const cityCardsHtml = cities.map(city => {
    const slug = makeCitySlug(city.city, city.state);
    const stateName = stateNames[city.state] || city.state;
    const imageUrl = city.sample_image ? `${baseUrl}/images/${city.sample_image}` : null;

    return `
      <a href="/cities/${slug}" class="group block bg-dark-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
        <div class="aspect-[4/3] overflow-hidden">
          ${imageUrl
            ? `<img src="${imageUrl}" alt="Haunted places in ${escapeHtml(city.city)}" class="place-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark\\'><span class=\\'text-4xl opacity-30\\'>&#128123;</span></div>'">`
            : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
                <span class="text-4xl opacity-30">&#128123;</span>
              </div>`
          }
        </div>
        <div class="p-4">
          <div class="flex items-start justify-between gap-2 mb-1">
            <h3 class="font-semibold text-white group-hover:text-accent transition-colors">${escapeHtml(city.city)}</h3>
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent whitespace-nowrap flex-shrink-0">
              ${city.place_count} ${city.place_count === 1 ? 'place' : 'places'}
            </span>
          </div>
          <p class="text-sm text-muted">${stateName}</p>
        </div>
      </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${renderHead(title, description, canonicalUrl, baseUrl)}
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(itemListSchema)}
  </script>
  <style>
    .smoke-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      object-fit: cover;
      z-index: -1;
      pointer-events: none;
    }
    html { background: #0a0a0f; }
    .place-img {
      filter: grayscale(70%);
      transition: filter 0.5s ease;
    }
    .group:hover .place-img {
      filter: grayscale(70%) sepia(20%) brightness(0.9);
    }
    @media (max-width: 768px) {
      nav a { padding: 12px 8px; min-height: 44px; display: inline-flex; align-items: center; }
    }
  </style>
</head>
<body class="text-gray-100 min-h-screen font-sans">
  <video class="smoke-video" autoplay muted loop playsinline>
    <source src="/smoke-bg.mp4" type="video/mp4">
  </video>

  ${renderHeader('cities')}

  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-muted">
        <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
        <li class="text-dark-border">/</li>
        <li class="text-ghost">Cities</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <div class="mb-10">
      <h1 class="font-['Bebas_Neue'] text-5xl md:text-7xl text-white mb-3">Most Haunted Cities</h1>
      <p class="text-ghost text-lg">${totalPlaces} haunted places across ${totalCities} cities</p>
    </div>

    <!-- City Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      ${cityCardsHtml}
    </div>
  </main>

  ${renderFooter()}
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
</body>
</html>`;
}

function renderCityDetailPage(city, state, places, baseUrl) {
  const stateName = stateNames[state] || state;
  const citySlug = makeCitySlug(city, state);
  const placeCount = places.length;

  // Get sample place names for meta description
  const sampleNames = places.slice(0, 3).map(p => p.name).join(', ');

  const title = `Haunted Places in ${city}, ${stateName} | SpookFinder`;
  const description = `Discover ${placeCount} haunted places in ${city}, ${stateName}. Explore ghost stories, paranormal history, and haunted locations including ${sampleNames}.`;
  const canonicalUrl = `${baseUrl}/cities/${citySlug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Cities", "item": `${baseUrl}/cities` },
      { "@type": "ListItem", "position": 3, "name": `${city}, ${stateName}` }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Haunted Places in ${city}, ${stateName}`,
    "description": `${placeCount} haunted locations in ${city}, ${stateName}.`,
    "numberOfItems": placeCount,
    "itemListElement": places.map((place, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": place.name,
      "url": `${baseUrl}/place/${place.slug}`,
      "description": place.category ? `Haunted ${place.category} in ${city}, ${stateName}` : undefined
    }))
  };

  // Sort places: those with images first
  const sortedPlaces = [...places].sort((a, b) => {
    if (a.image_url && !b.image_url) return -1;
    if (!a.image_url && b.image_url) return 1;
    return a.name.localeCompare(b.name);
  });

  const placeCardsHtml = sortedPlaces.map(place => {
    const imageUrl = place.image_url ? `${baseUrl}/images/${place.image_url}` : null;
    const excerpt = truncate(place.ghost_story || place.description, 120);

    return `
      <a href="/place/${place.slug}" class="group block bg-dark-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
        <div class="aspect-[4/3] overflow-hidden">
          ${imageUrl
            ? `<img src="${imageUrl}" alt="${escapeHtml(place.name)}" class="place-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark\\'><span class=\\'text-4xl opacity-30\\'>&#128123;</span></div>'">`
            : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
                <span class="text-4xl opacity-30">&#128123;</span>
              </div>`
          }
        </div>
        <div class="p-4">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">${escapeHtml(place.name)}</h3>
            ${place.category ? `<span class="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent whitespace-nowrap flex-shrink-0 capitalize">${escapeHtml(place.category)}</span>` : ''}
          </div>
          ${excerpt ? `<p class="text-sm text-ghost line-clamp-3">${escapeHtml(excerpt)}</p>` : ''}
        </div>
      </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${renderHead(title, description, canonicalUrl, baseUrl)}
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(itemListSchema)}
  </script>
  <style>
    .smoke-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      object-fit: cover;
      z-index: -1;
      pointer-events: none;
    }
    html { background: #0a0a0f; }
    .place-img {
      filter: grayscale(70%);
      transition: filter 0.5s ease;
    }
    .group:hover .place-img {
      filter: grayscale(70%) sepia(20%) brightness(0.9);
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    @media (max-width: 768px) {
      nav a { padding: 12px 8px; min-height: 44px; display: inline-flex; align-items: center; }
    }
  </style>
</head>
<body class="text-gray-100 min-h-screen font-sans">
  <video class="smoke-video" autoplay muted loop playsinline>
    <source src="/smoke-bg.mp4" type="video/mp4">
  </video>

  ${renderHeader('cities')}

  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-muted">
        <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
        <li class="text-dark-border">/</li>
        <li><a href="/cities" class="hover:text-accent transition-colors">Cities</a></li>
        <li class="text-dark-border">/</li>
        <li class="text-ghost">${escapeHtml(city)}, ${stateName}</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <div class="mb-10">
      <h1 class="font-['Bebas_Neue'] text-5xl md:text-7xl text-white mb-3">Haunted ${escapeHtml(city)}</h1>
      <p class="text-ghost text-lg">${placeCount} haunted ${placeCount === 1 ? 'place' : 'places'} in ${escapeHtml(city)}, ${stateName}</p>
    </div>

    <!-- Place Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${placeCardsHtml}
    </div>
  </main>

  ${renderFooter()}
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
</body>
</html>`;
}

function render404() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>City Not Found | SpookFinder</title>
  <meta name="robots" content="noindex">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
          colors: {
            'dark': '#0a0a0f',
            'dark-card': '#141419',
            'dark-border': '#2a2a35',
            'accent': '#e94560',
            'accent-hover': '#ff6b6b',
            'muted': '#6b7280',
            'ghost': '#9ca3af',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-dark text-gray-100 min-h-screen flex items-center justify-center font-sans">
  <div class="text-center px-4">
    <div class="text-6xl mb-6">&#128123;</div>
    <h1 class="text-3xl font-bold mb-4">No ghosts found in this city...</h1>
    <p class="text-ghost mb-8 max-w-md mx-auto">
      We don't have enough haunted places for this city yet, or the city doesn't exist in our database.
    </p>
    <a href="/cities" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      Browse All Cities
    </a>
  </div>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { env, request, params } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const slugParts = params.slug;

  // If no slug, render the cities index page
  if (!slugParts || slugParts.length === 0) {
    try {
      // Get all cities with 5+ places, including a sample image
      const { results: cities } = await env.DB.prepare(`
        SELECT
          city,
          state,
          COUNT(*) as place_count,
          (SELECT image_url FROM places p2
           WHERE p2.city = places.city AND p2.state = places.state
           AND p2.image_url IS NOT NULL AND p2.image_url != ''
           LIMIT 1) as sample_image
        FROM places
        GROUP BY city, state
        HAVING place_count >= 5
        ORDER BY place_count DESC, city
      `).all();

      const html = renderCitiesIndexPage(cities || [], baseUrl);
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    } catch (error) {
      console.error('Error rendering cities index:', error);
      return new Response('Error loading cities page', { status: 500 });
    }
  }

  // City detail page
  const citySlug = slugParts[0];
  const parsed = parseCitySlug(citySlug);

  if (!parsed) {
    return new Response(render404(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  const { stateCode } = parsed;

  try {
    // Get all cities in this state that have 5+ places
    const { results: citiesInState } = await env.DB.prepare(`
      SELECT city, COUNT(*) as place_count
      FROM places
      WHERE state = ?
      GROUP BY city
      HAVING place_count >= 5
    `).bind(stateCode).all();

    if (!citiesInState || citiesInState.length === 0) {
      return new Response(render404(), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Find which city matches the slug
    const matchedCity = citiesInState.find(c => makeCitySlug(c.city, stateCode) === citySlug);

    if (!matchedCity) {
      return new Response(render404(), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Get all places in this city
    const { results: places } = await env.DB.prepare(`
      SELECT slug, name, city, state, category, description, ghost_story, image_url
      FROM places
      WHERE city = ? AND state = ?
      ORDER BY name
    `).bind(matchedCity.city, stateCode).all();

    const html = renderCityDetailPage(matchedCity.city, stateCode, places || [], baseUrl);
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error rendering city page:', error);
    return new Response('Error loading city page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
