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

function renderPlacePage(place, relatedPlaces, statePlaces, categoryPlaces, baseUrl) {
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

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": stateName,
        "item": `${baseUrl}/states/${stateUrl}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": place.name
      }
    ]
  };

  const relatedHtml = relatedPlaces.length > 0 ? `
    <!-- Related Places -->
    <section class="max-w-6xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-semibold tracking-tight mb-6">
        More Haunted Places in ${escapeHtml(place.city)}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${relatedPlaces.map(related => `
          <a href="/place/${related.slug}" class="block bg-dark-card rounded-xl p-5 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
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

  // More places in same state (different cities)
  const statePlacesHtml = statePlaces.length > 0 ? `
    <section class="max-w-6xl mx-auto px-4 py-12 border-t border-dark-border">
      <h2 class="text-2xl font-semibold tracking-tight mb-6">
        More Haunted Places in ${stateName}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        ${statePlaces.map(p => `
          <a href="/place/${p.slug}" class="block bg-dark-card rounded-lg p-4 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
            <span class="text-2xl block mb-2">${categoryIcons[p.category] || categoryIcons['other']}</span>
            <h3 class="text-sm font-medium group-hover:text-accent transition-colors line-clamp-2">${escapeHtml(p.name)}</h3>
            <p class="text-muted text-xs mt-1">${escapeHtml(p.city)}</p>
          </a>
        `).join('')}
      </div>
      <div class="mt-6 text-center">
        <a href="/states/${stateUrl}" class="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm">
          View all haunted places in ${stateName}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  ` : '';

  // Similar category places from other states
  const categoryLabel = place.category ? place.category.charAt(0).toUpperCase() + place.category.slice(1) + 's' : 'Places';
  const categoryPlacesHtml = categoryPlaces.length > 0 ? `
    <section class="max-w-6xl mx-auto px-4 py-12 border-t border-dark-border">
      <h2 class="text-2xl font-semibold tracking-tight mb-6">
        More Haunted ${categoryLabel} Across America
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${categoryPlaces.map(p => `
          <a href="/place/${p.slug}" class="block bg-dark-card rounded-lg p-4 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
            <h3 class="text-sm font-medium group-hover:text-accent transition-colors line-clamp-2">${escapeHtml(p.name)}</h3>
            <p class="text-muted text-xs mt-1">${escapeHtml(p.city)}, ${stateNames[p.state] || p.state}</p>
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
  <title>${escapeHtml(place.name)} - Haunted ${escapeHtml(place.city)}, ${stateName} | SpookFinder</title>
  <meta name="description" content="Explore ${escapeHtml(place.name)}, a haunted ${place.category || 'location'} in ${escapeHtml(place.city)}, ${stateName}. ${escapeHtml(truncate(place.description, 120))}">

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

  <!-- Breadcrumb Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbData, null, 2)}
  </script>

  <!-- Fonts & Tailwind -->
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
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
  <style>
    /* Transparent header that darkens on scroll */
    .nav-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: transparent;
      transition: background 0.3s ease;
    }
    .nav-header.scrolled {
      background: rgba(10, 10, 15, 0.95);
      backdrop-filter: blur(8px);
    }

    /* Mobile touch target improvements */
    @media (max-width: 768px) {
      nav a, .nav-header a {
        padding: 12px 8px;
        min-height: 44px;
        display: inline-flex;
        align-items: center;
      }
      /* Breadcrumb touch targets */
      nav[aria-label="Breadcrumb"] a {
        padding: 8px 4px;
        min-height: 44px;
      }
    }
  </style>
</head>
<body class="bg-dark text-gray-100 min-h-screen">

  <!-- Navigation Header -->
  <header class="nav-header" id="nav-header">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-white">
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
      class="place-img w-full h-full object-cover"
      loading="eager"
      onerror="this.parentElement.style.display='none'"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
  </div>
  ` : ''}

  <!-- Hero Section -->
  <header class="relative overflow-hidden ${imageUrl ? '-mt-24 md:-mt-32' : 'pt-16'}">
    ${!imageUrl ? `<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>` : ''}
    <div class="max-w-6xl mx-auto px-4 py-10 md:py-14 relative">
      <div class="max-w-4xl">
        <!-- Breadcrumb -->
        <nav class="mb-4" aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-sm text-muted">
            <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
            <li class="text-dark-border">/</li>
            <li><a href="/states/${stateUrl}" class="hover:text-accent transition-colors">${stateName}</a></li>
          </ol>
        </nav>

        <!-- Place Name + Category -->
        <div class="flex items-center gap-4 mb-4 flex-wrap">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${imageUrl ? 'drop-shadow-lg' : ''}">
            ${escapeHtml(place.name)}
          </h1>
          <span class="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1.5 rounded-full text-sm font-medium capitalize backdrop-blur-sm">
            <span>${categoryIcon}</span>
            ${place.category || 'haunted place'}
          </span>
        </div>

        <!-- Location + Est Year -->
        <p class="text-xl text-ghost ${imageUrl ? 'drop-shadow-md' : ''}">
          ${escapeHtml(place.city)}, ${stateName}${place.year_established ? ` · Est. ${place.year_established}` : ''}
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
        <section class="bg-dark-card rounded-xl p-6 md:p-8">
          <h2 class="text-xl font-semibold mb-4">About This Location</h2>
          <div class="text-ghost leading-relaxed">
            ${formatParagraphs(place.description)}
          </div>
        </section>

        <!-- Ghost Story -->
        ${place.ghost_story ? `
        <section class="bg-dark-card rounded-xl p-6 md:p-8">
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
        <div class="bg-dark-card rounded-xl p-6">
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
        <div class="bg-dark-card rounded-xl p-6">
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
        <div class="bg-dark-card rounded-xl p-6">
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
        <div class="bg-dark-card rounded-xl p-6">
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
  ${statePlacesHtml}
  ${categoryPlacesHtml}

  <!-- Footer -->
  <footer class="bg-dark-card/50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="text-center">
        <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
        <p class="text-muted text-sm mt-2">
          Documenting America's most haunted locations, one ghost story at a time<span id="donkey-trigger" class="cursor-pointer select-none" title="...">.</span>
        </p>
      </div>
    </div>
  </footer>

  <!-- Donkey Scare Easter Egg -->
  <div id="donkey-scare" style="display:none;position:fixed;inset:0;z-index:99999;background:#000;">
    <video id="donkey-video" style="width:100%;height:100%;object-fit:cover;" playsinline>
      <source src="${baseUrl}/images/easter-eggs/donkey.mp4" type="video/mp4">
    </video>
    <button id="donkey-close" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.2);border:none;color:#fff;padding:10px 20px;cursor:pointer;font-size:14px;border-radius:4px;">Close</button>
  </div>

  <script>
    // Scroll detection for nav header
    const navHeader = document.getElementById('nav-header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        navHeader.classList.add('scrolled');
      } else {
        navHeader.classList.remove('scrolled');
      }
    });

    // Donkey Scare Easter Egg
    (function() {
      const scareOverlay = document.getElementById('donkey-scare');
      const scareVideo = document.getElementById('donkey-video');
      const closeBtn = document.getElementById('donkey-close');
      const trigger = document.getElementById('donkey-trigger');

      let idleTimer;
      const IDLE_TIMEOUT = 60000;
      let scarePlayed = false;

      function showScare() {
        if (scarePlayed) return;
        scarePlayed = true;
        scareOverlay.style.display = 'block';
        scareVideo.currentTime = 0;
        scareVideo.play();
      }

      function hideScare() {
        scareOverlay.style.display = 'none';
        scareVideo.pause();
        scareVideo.currentTime = 0;
      }

      function resetIdleTimer() {
        clearTimeout(idleTimer);
        if (!scarePlayed) {
          idleTimer = setTimeout(showScare, IDLE_TIMEOUT);
        }
      }

      ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetIdleTimer, { passive: true });
      });

      resetIdleTimer();
      trigger.addEventListener('click', showScare);
      closeBtn.addEventListener('click', hideScare);
      scareVideo.addEventListener('ended', hideScare);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideScare(); });
    })();
  </script>
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
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
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

    // Fetch more places in same state (different city)
    const { results: statePlaces } = await env.DB.prepare(
      'SELECT slug, name, city, category FROM places WHERE state = ? AND city != ? ORDER BY RANDOM() LIMIT 6'
    ).bind(place.state, place.city).all();

    // Fetch similar category places (different state for variety)
    const { results: categoryPlaces } = await env.DB.prepare(
      'SELECT slug, name, city, state, category FROM places WHERE category = ? AND slug != ? AND state != ? ORDER BY RANDOM() LIMIT 4'
    ).bind(place.category, slug, place.state).all();

    // Render the page
    const html = renderPlacePage(place, relatedPlaces || [], statePlaces || [], categoryPlaces || [], baseUrl);

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
