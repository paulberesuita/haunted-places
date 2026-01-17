// GET /place/:slug - Serve individual place page with server-side rendering

const stateNames = {
  'CA': 'California',
  'FL': 'Florida',
  'GA': 'Georgia',
  'IL': 'Illinois',
  'LA': 'Louisiana',
  'MA': 'Massachusetts',
  'NY': 'New York',
  'OH': 'Ohio',
  'PA': 'Pennsylvania',
  'TX': 'Texas',
  'VA': 'Virginia'
};

const stateUrls = {
  'CA': 'california',
  'FL': 'florida',
  'GA': 'georgia',
  'IL': 'illinois',
  'LA': 'louisiana',
  'MA': 'massachusetts',
  'NY': 'new-york',
  'OH': 'ohio',
  'PA': 'pennsylvania',
  'TX': 'texas',
  'VA': 'virginia'
};

const categoryIcons = {
  'hotel': '&#127976;',
  'mansion': '&#127962;&#65039;',
  'cemetery': '&#129702;',
  'prison': '&#9939;&#65039;',
  'hospital': '&#127973;',
  'theater': '&#127917;',
  'restaurant': '&#127869;&#65039;',
  'battlefield': '&#9876;&#65039;',
  'lighthouse': '&#128495;',
  'museum': '&#127963;&#65039;',
  'university': '&#127891;',
  'plantation': '&#127806;',
  'other': '&#128123;'
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

function formatParagraphs(text) {
  if (!text) return '';
  return text.split('\n\n').map(p => `<p class="mb-4">${escapeHtml(p.trim())}</p>`).join('');
}

function renderPlacePage(place, relatedPlaces, baseUrl) {
  const stateName = stateNames[place.state] || place.state;
  const stateUrl = stateUrls[place.state] || place.state.toLowerCase();
  const categoryIcon = categoryIcons[place.category] || categoryIcons['other'];
  const mapUrl = place.latitude && place.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`
    : null;
  const imageUrl = place.image_url
    ? `${baseUrl}/images/${place.image_url}`
    : null;

  // Build structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": place.name,
    "description": place.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": place.city,
      "addressRegion": stateName,
      "streetAddress": place.address || undefined
    }
  };

  if (place.latitude && place.longitude) {
    structuredData.geo = {
      "@type": "GeoCoordinates",
      "latitude": place.latitude,
      "longitude": place.longitude
    };
  }

  if (imageUrl) {
    structuredData.image = imageUrl;
  }

  const relatedHtml = relatedPlaces.length > 0 ? `
    <!-- Related Places -->
    <section class="max-w-6xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-semibold tracking-tight mb-6">
        More Haunted Places in ${escapeHtml(place.city)}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${relatedPlaces.map(related => `
          <a href="/place/${related.slug}" class="block bg-dark-card border border-dark-border rounded-xl p-5 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-semibold group-hover:text-accent transition-colors">${escapeHtml(related.name)}</h3>
              <span class="text-xl ml-2">${categoryIcons[related.category] || categoryIcons['other']}</span>
            </div>
            <p class="text-muted text-sm mb-3 capitalize">${related.category}</p>
            <p class="text-ghost text-sm line-clamp-2">${escapeHtml(truncate(related.description, 100))}</p>
          </a>
        `).join('')}
      </div>
    </section>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(place.name)} | Haunted Places Directory</title>
  <meta name="description" content="${escapeHtml(truncate(place.description, 160))}">

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(place.name)} - Haunted ${escapeHtml(place.city)}, ${stateName}">
  <meta property="og:description" content="${escapeHtml(truncate(place.description, 200))}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${baseUrl}/place/${place.slug}">
  ${imageUrl ? `<meta property="og:image" content="${imageUrl}">` : ''}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}">
  <meta name="twitter:title" content="${escapeHtml(place.name)} | Haunted Places">
  <meta name="twitter:description" content="${escapeHtml(truncate(place.description, 140))}">
  ${imageUrl ? `<meta name="twitter:image" content="${imageUrl}">` : ''}

  <!-- Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify(structuredData, null, 2)}
  </script>

  <!-- Fonts & Tailwind -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
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
  <style></style>
</head>
<body class="bg-dark text-gray-100 min-h-screen">

  <!-- Navigation Header -->
  <header>
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <div class="flex items-center gap-3 text-sm">
        <a href="/" class="text-lg font-semibold hover:text-accent transition-colors">Haunted Places</a>
        <span class="text-muted">/</span>
        <a href="/states/${stateUrl}" class="text-muted hover:text-accent transition-colors">${stateName}</a>
      </div>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="hover:text-accent transition-colors">States</a>
        <a href="/about" class="hover:text-accent transition-colors">About</a>
      </nav>
    </div>
  </header>

  <!-- Hero Image -->
  ${imageUrl ? `
  <div class="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
    <img
      src="${imageUrl}"
      alt="${escapeHtml(place.name)}"
      class="w-full h-full object-cover"
      loading="eager"
      onerror="this.parentElement.style.display='none'"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
  </div>
  ` : ''}

  <!-- Hero Section -->
  <header class="relative overflow-hidden ${imageUrl ? '-mt-24 md:-mt-32' : ''}">
    ${!imageUrl ? `<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>` : ''}
    <div class="max-w-6xl mx-auto px-4 py-10 md:py-14 relative">
      <div class="max-w-4xl">
        <!-- Category Badge -->
        <div class="flex items-center gap-3 mb-4">
          <span class="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1.5 rounded-full text-sm font-medium capitalize backdrop-blur-sm">
            <span>${categoryIcon}</span>
            ${place.category || 'haunted place'}
          </span>
          ${place.year_established ? `<span class="text-muted text-sm">Est. ${place.year_established}</span>` : ''}
        </div>

        <!-- Place Name -->
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${imageUrl ? 'drop-shadow-lg' : ''}">
          ${escapeHtml(place.name)}
        </h1>

        <!-- Location -->
        <p class="text-xl text-ghost mb-6 ${imageUrl ? 'drop-shadow-md' : ''}">
          ${escapeHtml(place.city)}, ${stateName}
        </p>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-6xl mx-auto px-4 pb-16">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- Content Column -->
      <div class="lg:col-span-2 space-y-8">

        <!-- Description -->
        <section class="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
          <h2 class="text-xl font-semibold mb-4">About This Location</h2>
          <div class="text-ghost leading-relaxed">
            ${formatParagraphs(place.description)}
          </div>
        </section>

        <!-- Ghost Story -->
        ${place.ghost_story ? `
        <section class="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">&#128123;</span>
            <h2 class="text-xl font-semibold text-accent">The Ghost Story</h2>
          </div>
          <div class="text-ghost leading-relaxed">
            ${formatParagraphs(place.ghost_story)}
          </div>
        </section>
        ` : ''}

      </div>

      <!-- Sidebar -->
      <aside class="space-y-6">

        <!-- Location Info -->
        <div class="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Location
          </h3>

          ${place.address ? `
          <p class="text-ghost text-sm mb-4">${escapeHtml(place.address)}</p>
          ` : ''}

          <p class="text-muted text-sm mb-4">${escapeHtml(place.city)}, ${stateName}</p>

          ${place.latitude && place.longitude ? `
          <!-- Embedded Map -->
          <div class="w-full rounded-lg overflow-hidden border border-dark-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000!2d${place.longitude}!3d${place.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="200"
              style="border:0; filter: grayscale(100%) invert(92%) contrast(83%);"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="block text-center text-sm text-muted hover:text-accent transition-colors mt-2">
            Open in Google Maps
          </a>
          ` : ''}
        </div>

        <!-- Quick Facts -->
        <div class="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Quick Facts</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-3">
              <span class="text-accent">&#128205;</span>
              <div>
                <span class="text-muted">State:</span>
                <a href="/states/${stateUrl}" class="text-gray-100 hover:text-accent transition-colors ml-1">${stateName}</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent">&#127961;</span>
              <div>
                <span class="text-muted">City:</span>
                <span class="text-gray-100 ml-1">${escapeHtml(place.city)}</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent">${categoryIcon}</span>
              <div>
                <span class="text-muted">Type:</span>
                <span class="text-gray-100 ml-1 capitalize">${place.category || 'Unknown'}</span>
              </div>
            </li>
            ${place.year_established ? `
            <li class="flex items-start gap-3">
              <span class="text-accent">&#128197;</span>
              <div>
                <span class="text-muted">Established:</span>
                <span class="text-gray-100 ml-1">${place.year_established}</span>
              </div>
            </li>
            ` : ''}
          </ul>
        </div>

        <!-- Source Attribution -->
        ${place.source_url ? `
        <div class="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 class="font-semibold mb-3 text-sm text-muted">Source</h3>
          <a href="${escapeHtml(place.source_url)}" target="_blank" rel="noopener noreferrer" class="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            View original source
          </a>
        </div>
        ` : ''}

        <!-- Explore More -->
        <div class="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Explore More</h3>
          <div class="space-y-3">
            <a href="/states/${stateUrl}" class="flex items-center gap-3 text-sm text-ghost hover:text-accent transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              All haunted places in ${stateName}
            </a>
            <a href="/" class="flex items-center gap-3 text-sm text-ghost hover:text-accent transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              Browse all states
            </a>
          </div>
        </div>

      </aside>
    </div>
  </main>

  ${relatedHtml}

  <!-- Footer -->
  <footer class="bg-dark-card/50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="text-center">
        <a href="/" class="text-lg font-semibold hover:text-accent transition-colors">Haunted Places Directory</a>
        <p class="text-muted text-sm mt-2">
          Documenting America's most haunted locations, one ghost story at a time.
        </p>
      </div>
    </div>
  </footer>

</body>
</html>`;
}

function render404Page() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Place Not Found | Haunted Places Directory</title>
  <meta name="robots" content="noindex">

  <!-- Fonts & Tailwind -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
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
<body class="bg-dark text-gray-100 min-h-screen flex items-center justify-center">
  <div class="text-center px-4">
    <div class="text-6xl mb-6">&#128123;</div>
    <h1 class="text-3xl font-bold mb-4">This spirit has moved on...</h1>
    <p class="text-ghost mb-8 max-w-md mx-auto">
      The haunted place you're looking for couldn't be found. Perhaps it was just a trick of the light.
    </p>
    <a href="/" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      Return to the Directory
    </a>
  </div>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { env, params, request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  // Get slug from catch-all params
  const slugParts = params.slug;
  const slug = Array.isArray(slugParts) ? slugParts.join('/') : slugParts;

  if (!slug) {
    return new Response(render404Page(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  try {
    // Fetch the place
    const place = await env.DB.prepare(
      'SELECT * FROM places WHERE slug = ?'
    ).bind(slug).first();

    if (!place) {
      return new Response(render404Page(), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Fetch related places (same city, different slug)
    const { results: relatedPlaces } = await env.DB.prepare(
      'SELECT slug, name, city, category, description FROM places WHERE city = ? AND slug != ? LIMIT 6'
    ).bind(place.city, slug).all();

    // Render the page
    const html = renderPlacePage(place, relatedPlaces || [], baseUrl);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error fetching place:', error);
    return new Response(render404Page(), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
