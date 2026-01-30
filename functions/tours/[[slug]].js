// GET /tours and /tours/[city-slug] - Ghost Tours Directory
// Handles both index (all cities) and city detail pages (operators in a city)

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

const stateAbbrevs = {
  'California': 'CA',
  'Connecticut': 'CT',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Illinois': 'IL',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Massachusetts': 'MA',
  'Maryland': 'MD',
  'North Carolina': 'NC',
  'New Jersey': 'NJ',
  'New York': 'NY',
  'Ohio': 'OH',
  'Pennsylvania': 'PA',
  'South Carolina': 'SC',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Virginia': 'VA'
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

// Parse city slug back to city and state: "new-orleans-la" -> { city pattern, state }
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
  <title>${escapeHtml(title)} | Spookfinder</title>
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
            'dark': '#0a0c12',
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
      <nav class="hidden md:flex gap-6 text-sm text-ghost">
        <a href="/states" class="${activePage === 'states' ? 'text-white' : 'hover:text-white transition-colors'}">States</a>
        <a href="/category" class="${activePage === 'category' ? 'text-white' : 'hover:text-white transition-colors'}">Categories</a>
        <a href="/tours" class="${activePage === 'tours' ? 'text-white' : 'hover:text-white transition-colors'}">Tours</a>
        <a href="/about" class="${activePage === 'about' ? 'text-white' : 'hover:text-white transition-colors'}">About</a>
      </nav>
      <button id="mobile-menu-btn" class="md:hidden p-2 text-ghost hover:text-white" aria-label="Open menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </header>
  <div id="mobile-menu" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 bg-dark/95 backdrop-blur-sm" onclick="document.getElementById('mobile-menu').classList.add('hidden')"></div>
    <nav class="absolute top-0 right-0 w-64 h-full bg-dark-card border-l border-dark-border p-6">
      <button onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="absolute top-4 right-4 p-2 text-ghost hover:text-white" aria-label="Close menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="mt-12 flex flex-col gap-6 text-lg">
        <a href="/states" class="${activePage === 'states' ? 'text-white' : 'text-ghost hover:text-white transition-colors'}">States</a>
        <a href="/category" class="${activePage === 'category' ? 'text-white' : 'text-ghost hover:text-white transition-colors'}">Categories</a>
        <a href="/tours" class="${activePage === 'tours' ? 'text-white' : 'text-ghost hover:text-white transition-colors'}">Tours</a>
        <a href="/about" class="${activePage === 'about' ? 'text-white' : 'text-ghost hover:text-white transition-colors'}">About</a>
      </div>
    </nav>
  </div>
  <script>document.getElementById('mobile-menu-btn').addEventListener('click',function(){document.getElementById('mobile-menu').classList.remove('hidden')});</script>`;
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

function renderToursIndexPage(cities, baseUrl) {
  const totalOperators = cities.reduce((sum, c) => sum + c.operator_count, 0);
  const title = `Ghost Tours Directory - ${cities.length} Cities with Ghost Tours`;
  const description = `Find ghost tours in ${cities.length} haunted cities across America. Browse ${totalOperators} tour operators with prices, reviews, and booking links.`;
  const canonicalUrl = `${baseUrl}/tours`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Ghost Tours" }
    ]
  };

  const cityCardsHtml = cities.map(city => {
    const slug = makeCitySlug(city.city, city.state);
    const stateName = stateNames[city.state] || city.state;
    return `
      <a href="/tours/${slug}" class="group block bg-dark-card rounded-xl p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-lg font-semibold text-white group-hover:text-accent transition-colors">${escapeHtml(city.city)}</h3>
            <p class="text-sm text-muted">${stateName}</p>
          </div>
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
            ${city.operator_count} ${city.operator_count === 1 ? 'tour' : 'tours'}
          </span>
        </div>
        <p class="text-sm text-ghost">
          Explore ghost tours in ${escapeHtml(city.city)} with prices and booking links.
        </p>
        <div class="mt-4 text-sm text-accent group-hover:text-accent-hover transition-colors flex items-center gap-1">
          View Tours
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
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
    html { background: #0a0c12; }
    .place-img {
      filter: none;
      transition: filter 0.5s ease;
    }
    .place-img:hover {
      filter: saturate(0.4) contrast(1.1);
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

  ${renderHeader('tours')}

  <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="mb-10 text-center">
        <h1 style="font-family: 'Creepster', cursive;" class="text-5xl md:text-7xl text-white mb-3">Ghost Tours</h1>
        <p class="text-ghost text-lg">${totalOperators} tour operators across ${cities.length} haunted cities</p>
      </div>

      <!-- City Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cityCardsHtml}
      </div>
    </main>

  ${renderFooter()}
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
</body>
</html>`;
}

function renderCityPage(city, state, operators, nearbyPlaces, baseUrl) {
  const stateName = stateNames[state] || state;
  const citySlug = makeCitySlug(city, state);
  const title = `Ghost Tours in ${city}, ${stateName} - ${operators.length} Tour Operators`;
  const description = `Find the best ghost tours in ${city}, ${stateName}. Compare ${operators.length} tour operators with prices, descriptions, and booking links. Discover haunted places nearby.`;
  const canonicalUrl = `${baseUrl}/tours/${citySlug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Ghost Tours", "item": `${baseUrl}/tours` },
      { "@type": "ListItem", "position": 3, "name": `${city}, ${stateName}` }
    ]
  };

  // JSON-LD LocalBusiness for each operator
  const operatorSchemas = operators.map(op => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": op.name,
    "description": op.description || `Ghost tour operator in ${city}, ${stateName}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": stateName
    },
    "url": op.website || op.booking_url || undefined,
    "priceRange": op.price_range || undefined
  }));

  const operatorCardsHtml = operators.map(op => {
    const bookingLink = op.booking_url || op.website;

    return `
      <div class="bg-dark-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
        <div class="p-6">
          <div class="mb-3">
            <h3 class="text-lg font-semibold text-white">${escapeHtml(op.name)}</h3>
          </div>
          ${op.description ? `<p class="text-sm text-ghost mb-4">${escapeHtml(truncate(op.description, 200))}</p>` : ''}
          ${bookingLink ? `
          <a href="${escapeHtml(bookingLink)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Book Now
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
          ` : ''}
        </div>
      </div>`;
  }).join('\n');

  const nearbyPlacesHtml = nearbyPlaces.length > 0 ? `
    <section class="mt-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-2xl">&#128126;</span>
        <h2 class="text-2xl font-semibold text-accent">Haunted Places in ${escapeHtml(city)}</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${nearbyPlaces.map(place => {
          const imageUrl = place.image_url ? `${baseUrl}/images/${place.image_url}` : null;
          return `
          <a href="/place/${place.slug}" class="place-card group block bg-dark-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
            <div class="aspect-[4/3] overflow-hidden">
              ${imageUrl
                ? `<img src="${imageUrl}" alt="${escapeHtml(place.name)}" class="place-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">`
                : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
                    <span class="text-4xl opacity-30">&#128123;</span>
                  </div>`
              }
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-white group-hover:text-accent transition-colors">${escapeHtml(place.name)}</h3>
              <p class="text-sm text-muted mt-1 capitalize">${place.category || 'haunted place'}</p>
            </div>
          </a>`;
        }).join('')}
      </div>
    </section>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${renderHead(title, description, canonicalUrl, baseUrl)}
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema)}
  </script>
  ${operatorSchemas.map(schema => `<script type="application/ld+json">\n  ${JSON.stringify(schema)}\n  </script>`).join('\n  ')}
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
    html { background: #0a0c12; }
    .place-img {
      filter: none;
      transition: filter 0.5s ease;
    }
    .place-card:hover .place-img {
      filter: saturate(0.4) contrast(1.1);
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

  ${renderHeader('tours')}

  <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-sm text-muted">
          <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
          <li class="text-dark-border">/</li>
          <li><a href="/tours" class="hover:text-accent transition-colors">Ghost Tours</a></li>
          <li class="text-dark-border">/</li>
          <li class="text-ghost">${escapeHtml(city)}, ${stateName}</li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="mb-10">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">&#128123;</span>
          <h1 class="text-3xl md:text-4xl font-bold text-white">Ghost Tours in ${escapeHtml(city)}, ${stateName}</h1>
        </div>
        <p class="text-ghost text-lg">${operators.length} tour ${operators.length === 1 ? 'operator' : 'operators'} offering haunted experiences</p>
      </div>

      <!-- Operator Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${operatorCardsHtml}
      </div>

      <!-- Nearby Haunted Places -->
      ${nearbyPlacesHtml}
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
  <title>Tours Not Found | Spookfinder</title>
  <meta name="robots" content="noindex">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
          colors: {
            'dark': '#0a0c12',
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
    <h1 class="text-3xl font-bold mb-4">No ghost tours found here...</h1>
    <p class="text-ghost mb-8 max-w-md mx-auto">
      We don't have ghost tour listings for this city yet. Try browsing our directory.
    </p>
    <a href="/tours" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors">
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

  // If no slug, render the tours index page
  if (!slugParts || slugParts.length === 0) {
    try {
      const { results: cities } = await env.DB.prepare(`
        SELECT city, state, COUNT(*) as operator_count
        FROM tour_operators
        GROUP BY city, state
        ORDER BY city
      `).all();

      const html = renderToursIndexPage(cities || [], baseUrl);
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    } catch (error) {
      console.error('Error rendering tours index:', error);
      return new Response('Error loading tours page', { status: 500 });
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
    // Get all operators in this state, then filter by slug match
    const { results: allOperators } = await env.DB.prepare(`
      SELECT * FROM tour_operators
      WHERE state = ?
      ORDER BY featured DESC, name
    `).bind(stateCode).all();

    if (!allOperators || allOperators.length === 0) {
      return new Response(render404(), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Find which city matches the slug
    const citiesInState = [...new Set(allOperators.map(op => op.city))];
    const matchedCity = citiesInState.find(c => makeCitySlug(c, stateCode) === citySlug);

    if (!matchedCity) {
      return new Response(render404(), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Filter operators for this city
    const operators = allOperators.filter(op => op.city === matchedCity);

    // Get nearby haunted places (same city and state)
    const { results: nearbyPlaces } = await env.DB.prepare(`
      SELECT slug, name, city, category, image_url
      FROM places
      WHERE city = ? AND state = ?
      ORDER BY image_url IS NULL, name
      LIMIT 9
    `).bind(matchedCity, stateCode).all();

    const html = renderCityPage(matchedCity, stateCode, operators, nearbyPlaces || [], baseUrl);
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error rendering city tours page:', error);
    return new Response('Error loading tours page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
