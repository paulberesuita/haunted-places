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

function makeCitySlug(city, state) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + state.toLowerCase();
}

function formatParagraphs(text) {
  if (!text) return '';
  return text.split('\n\n').map(p => `<p class="mb-4">${escapeHtml(p.trim())}</p>`).join('');
}

function renderPlacePage(place, relatedPlaces, statePlaces, categoryPlaces, baseUrl, tourCount = 0) {
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
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-semibold tracking-tight mb-6">
        More Haunted Places in ${escapeHtml(place.city)}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        ${relatedPlaces.map(related => {
          const relatedImageUrl = related.image_url ? `${baseUrl}/images/${related.image_url}` : null;
          return `
          <a href="/place/${related.slug}" class="group">
            <div class="place-card aspect-[4/3] overflow-hidden bg-dark-card mb-3 rounded-lg">
              ${relatedImageUrl
                ? `<img src="${relatedImageUrl}" alt="${escapeHtml(related.name)}" class="place-img w-full h-full object-cover" loading="lazy">`
                : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
                    <span class="text-4xl opacity-30">${categoryIcons[related.category] || categoryIcons['other']}</span>
                  </div>`
              }
            </div>
            <h3 class="text-sm font-medium group-hover:text-accent transition-colors">${escapeHtml(related.name)}</h3>
            <p class="text-xs text-ghost capitalize">${related.category}</p>
          </a>`;
        }).join('')}
      </div>
    </section>
  ` : '';

  // More places in same state (different cities)
  const statePlacesHtml = statePlaces.length > 0 ? `
    <section class="max-w-7xl mx-auto px-4 py-12 border-t border-dark-border">
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
    <section class="max-w-7xl mx-auto px-4 py-12 border-t border-dark-border">
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

  <!-- Privacy-friendly analytics by Plausible -->
  <script async src="https://plausible.io/js/pa-U75YbwDcDaK8C53IH8RVe.js"></script>
  <script>
    window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
    plausible.init()
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
    /* Image filter - grayscale */
    .place-img {
      filter: grayscale(70%);
      transition: filter 0.5s ease;
    }
    .place-img:hover {
      filter: grayscale(70%) sepia(20%) brightness(0.9);
    }
    .place-card {
      position: relative;
      overflow: hidden;
    }

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

    /* The Watcher - Easter Egg */
    .watcher-eyes {
      position: fixed;
      pointer-events: none;
      z-index: 40;
      opacity: 0;
      transition: opacity 2.5s ease;
      white-space: nowrap;
      overflow: visible;
    }
    .watcher-eyes.visible {
      opacity: 1;
    }
    .watcher-eyes.blink .watcher-eye {
      transform: scaleY(0);
    }
    .watcher-eye {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #e94560;
      opacity: 0.6;
      box-shadow: 0 0 12px 4px rgba(233, 69, 96, 0.4);
      display: inline-block;
      margin: 0 7px;
      transition: transform 0.15s ease;
    }
    @media (max-width: 768px) {
      .watcher-eyes { display: none !important; }
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
        <a href="/cities" class="hover:text-accent transition-colors">Cities</a>
        <a href="/category" class="hover:text-accent transition-colors">Categories</a>
        <a href="/tours" class="hover:text-accent transition-colors">Tours</a>
        <a href="/hotels" class="hover:text-accent transition-colors">Hotels</a>
        <a href="/radio" class="hover:text-accent transition-colors">Radio</a>
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
    <div class="max-w-7xl mx-auto px-4 py-10 md:py-14 relative">
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
  <main class="max-w-7xl mx-auto px-4 pb-16">
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

        <!-- Ghost Tours Callout -->
        ${tourCount > 0 ? `
        <div class="bg-dark-card rounded-xl p-6 border border-accent/20">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">&#128123;</span>
            <h3 class="font-semibold text-accent">Ghost Tours in ${escapeHtml(place.city)}</h3>
          </div>
          <p class="text-sm text-ghost mb-4">${tourCount} ghost tour ${tourCount === 1 ? 'operator' : 'operators'} in ${escapeHtml(place.city)} with booking links and prices.</p>
          <a href="/tours/${makeCitySlug(place.city, place.state)}" class="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors font-medium">
            View Ghost Tours
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
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
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center">
        <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
        <p class="text-muted text-sm mt-2">
          Documenting America's most haunted locations, one ghost story at a time<span id="donkey-trigger" class="cursor-pointer select-none" title="...">.</span>
        </p>
      </div>
    </div>
  </footer>

  <!-- Idle Scare Easter Egg -->
  <div id="idle-scare" style="display:none;position:fixed;inset:0;z-index:99999;background:#000;cursor:pointer;">
    <video id="scare-video" style="width:100%;height:100%;object-fit:cover;" playsinline muted>
      <source src="/idle-scare.mp4" type="video/mp4">
    </video>
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

    // Idle Scare Easter Egg
    (function() {
      const scareOverlay = document.getElementById('idle-scare');
      const scareVideo = document.getElementById('scare-video');
      const trigger = document.getElementById('donkey-trigger');

      let idleTimer;
      const IDLE_TIMEOUT = 60000;
      let scarePlayed = false;

      function showScare() {
        if (scarePlayed) return;
        scarePlayed = true;
        scareOverlay.style.display = 'block';
        scareVideo.currentTime = 0;
        scareVideo.play().catch(() => {});
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
      scareOverlay.addEventListener('click', hideScare);
      scareVideo.addEventListener('ended', hideScare);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideScare(); });
    })();

    // The Watcher Easter Egg
    (function() {
      if (window.innerWidth <= 768) return;

      var eyes = document.createElement('div');
      eyes.className = 'watcher-eyes';
      eyes.innerHTML = '<span class="watcher-eye"></span><span class="watcher-eye"></span>';
      document.body.appendChild(eyes);

      var posX = 0, posY = 0;
      var targetX = 0, targetY = 0;
      var mouseX = 0, mouseY = 0;
      var lastMoveTime = Date.now();
      var blinking = false;
      var fleeing = false;
      var visible = false;
      var LERP = 0.02;
      var FLEE_DIST = 50;
      var IDLE_BLINK = 5000;

      function randomMarginPos() {
        var side = Math.floor(Math.random() * 2); // left or right only
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var x, y;
        // Keep eyes in lower 60% of viewport (below hero image) and in the side margins
        var minY = vh * 0.4;
        if (side === 0) { x = Math.random() * 40 + 15; y = minY + Math.random() * (vh - minY - 80); }
        else { x = vw - (Math.random() * 40 + 35); y = minY + Math.random() * (vh - minY - 80); }
        return { x: x, y: y };
      }

      function placeEyes() {
        var p = randomMarginPos();
        posX = p.x; posY = p.y;
        targetX = p.x; targetY = p.y;
        eyes.style.left = posX + 'px';
        eyes.style.top = posY + 'px';
      }

      function showEyes() {
        placeEyes();
        visible = true;
        eyes.classList.add('visible');
      }

      function hideAndReappear() {
        if (fleeing) return;
        fleeing = true;
        eyes.style.transition = 'opacity 0.8s ease';
        eyes.classList.remove('visible');
        setTimeout(function() {
          eyes.style.transition = 'opacity 2.5s ease';
          placeEyes();
          eyes.classList.add('visible');
          fleeing = false;
        }, 15000 + Math.random() * 15000);
      }

      function dist(x1, y1, x2, y2) {
        var dx = x1 - x2, dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
      }

      function tick() {
        if (!visible || fleeing) { requestAnimationFrame(tick); return; }

        // Lerp toward a point offset by cursor direction
        var dx = mouseX - posX;
        var dy = mouseY - posY;
        var d = Math.sqrt(dx * dx + dy * dy) || 1;
        var offsetMag = Math.min(d * 0.08, 20);
        targetX = posX + (dx / d) * offsetMag;
        targetY = posY + (dy / d) * offsetMag;

        var curX = parseFloat(eyes.style.left) || posX;
        var curY = parseFloat(eyes.style.top) || posY;
        var newX = curX + (targetX - curX) * LERP;
        var newY = curY + (targetY - curY) * LERP;
        eyes.style.left = newX + 'px';
        eyes.style.top = newY + 'px';

        // Flee if cursor approaches
        if (dist(mouseX, mouseY, newX, newY) < FLEE_DIST) {
          hideAndReappear();
        }

        // Blink after idle
        var idle = Date.now() - lastMoveTime;
        if (idle > IDLE_BLINK && !blinking) {
          blinking = true;
          eyes.classList.add('blink');
          setTimeout(function() {
            eyes.classList.remove('blink');
            blinking = false;
          }, 200);
        }

        requestAnimationFrame(tick);
      }

      document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMoveTime = Date.now();
      }, { passive: true });

      // Delay initial appearance
      setTimeout(showEyes, 5000 + Math.random() * 2000);
      requestAnimationFrame(tick);
    })();
  </script>
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
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

    // Fetch tour operators in the same city
    const { results: tourOperators } = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM tour_operators WHERE city = ? AND state = ?'
    ).bind(place.city, place.state).all();
    const tourCount = tourOperators && tourOperators[0] ? tourOperators[0].count : 0;

    // Fetch related places (same city, different slug)
    const { results: relatedPlaces } = await env.DB.prepare(
      'SELECT slug, name, city, category, description, image_url FROM places WHERE city = ? AND slug != ? LIMIT 6'
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
    const html = renderPlacePage(place, relatedPlaces || [], statePlaces || [], categoryPlaces || [], baseUrl, tourCount);

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
