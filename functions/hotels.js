// GET /hotels - Haunted Hotels Guide page
// Server-side rendered with client-side filtering by state

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

function extractScariestDetail(ghostStory) {
  if (!ghostStory) return null;
  const keywords = ['room', 'floor', 'suite', 'wing', 'corridor', 'basement', 'attic'];
  const sentences = ghostStory.split(/(?<=[.!?])\s+/);
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return sentence.trim();
      }
    }
  }
  return null;
}

function renderHead(title, description, canonicalUrl, baseUrl, hotelCount) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Haunted Hotels" }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Haunted Hotels in America",
    "description": `${hotelCount} haunted hotels, inns, and bed & breakfasts you can stay at across America.`,
    "numberOfItems": hotelCount
  };

  return `<meta charset="UTF-8">
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
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(itemListSchema)}
  </script>
  <script async src="https://plausible.io/js/pa-U75YbwDcDaK8C53IH8RVe.js"></script>
  <script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()</script>
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
  </script>`;
}

function renderHeader() {
  return `<header>
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="hover:text-white transition-colors">States</a>
        <a href="/tours" class="hover:text-white transition-colors">Tours</a>
        <a href="/hotels" class="text-white">Hotels</a>
        <a href="/radio" class="hover:text-white transition-colors">Radio</a>
        <a href="/about" class="hover:text-white transition-colors">About</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `<footer class="mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center">
        <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
        <p class="text-muted text-sm mt-2">Documenting America's most haunted locations, one ghost story at a time.</p>
      </div>
    </div>
  </footer>`;
}

function renderHotelCard(hotel, baseUrl) {
  const imageUrl = hotel.image_url ? `${baseUrl}/images/${hotel.image_url}` : null;
  const stateName = stateNames[hotel.state] || hotel.state;
  const excerpt = truncate(hotel.ghost_story, 150);
  const scariestDetail = extractScariestDetail(hotel.ghost_story);

  return `
    <a href="/place/${hotel.slug}" class="hotel-card group block bg-dark-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300" data-state="${escapeHtml(hotel.state)}" data-name="${escapeHtml(hotel.name)}">
      <div class="aspect-[4/3] overflow-hidden">
        ${imageUrl
          ? `<img src="${imageUrl}" alt="${escapeHtml(hotel.name)}" class="place-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark\\'><span class=\\'text-4xl opacity-30\\'>&#127976;</span></div>'">`
          : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
              <span class="text-4xl opacity-30">&#127976;</span>
            </div>`
        }
      </div>
      <div class="p-4">
        <div class="flex items-start justify-between gap-2 mb-2">
          <h3 class="font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">${escapeHtml(hotel.name)}</h3>
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent whitespace-nowrap flex-shrink-0">${escapeHtml(hotel.category)}</span>
        </div>
        <p class="text-sm text-muted mb-3">${escapeHtml(hotel.city)}, ${stateName}</p>
        ${excerpt ? `<p class="text-sm text-ghost mb-3 line-clamp-3">${escapeHtml(excerpt)}</p>` : ''}
        ${scariestDetail ? `
        <div class="mt-3 pt-3 border-t border-dark-border">
          <p class="text-sm text-accent/80 italic line-clamp-2">
            <span class="text-accent mr-1">&#128123;</span>
            "${escapeHtml(truncate(scariestDetail, 120))}"
          </p>
        </div>
        ` : ''}
      </div>
    </a>`;
}

function renderHotelsPage(hotels, states, baseUrl) {
  const hotelCount = hotels.length;
  const title = `Haunted Hotels - Stay at America's Most Haunted | Spookfinder`;
  const description = `Discover ${hotelCount} haunted hotels, inns, and bed & breakfasts across America. Find ghost stories, scariest rooms, and plan your paranormal overnight stay.`;
  const canonicalUrl = `${baseUrl}/hotels`;

  const hotelCardsHtml = hotels.map(hotel => renderHotelCard(hotel, baseUrl)).join('\n');

  const stateOptionsHtml = states.map(s => {
    const stateName = stateNames[s] || s;
    return `<option value="${escapeHtml(s)}">${stateName}</option>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${renderHead(title, description, canonicalUrl, baseUrl, hotelCount)}
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

  ${renderHeader()}

  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-muted">
        <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
        <li class="text-dark-border">/</li>
        <li class="text-ghost">Haunted Hotels</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <div class="mb-10">
      <h1 class="font-['Bebas_Neue'] text-5xl md:text-7xl text-white mb-3">Sleep With Ghosts</h1>
      <p class="text-ghost text-lg">${hotelCount} haunted hotels, inns, and B&Bs where you can spend the night</p>
    </div>

    <!-- Filter & Sort Bar -->
    <div class="flex flex-col sm:flex-row gap-4 mb-8">
      <div class="flex-1">
        <select id="state-filter" class="w-full sm:w-auto bg-dark-card text-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent">
          <option value="">All States</option>
          ${stateOptionsHtml}
        </select>
      </div>
      <div>
        <select id="sort-select" class="w-full sm:w-auto bg-dark-card text-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent">
          <option value="state">Sort by State (A-Z)</option>
          <option value="name">Sort by Name (A-Z)</option>
        </select>
      </div>
    </div>

    <!-- Results count -->
    <p id="results-count" class="text-sm text-muted mb-6">${hotelCount} results</p>

    <!-- Hotel Cards Grid -->
    <div id="hotels-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${hotelCardsHtml}
    </div>

    <!-- Empty state -->
    <div id="empty-state" class="hidden text-center py-16">
      <span class="text-4xl mb-4 block">&#127976;</span>
      <p class="text-ghost text-lg">No haunted hotels found in this state.</p>
      <button onclick="document.getElementById('state-filter').value='';filterHotels();" class="mt-4 text-accent hover:text-accent-hover transition-colors text-sm">Show all hotels</button>
    </div>
  </main>

  ${renderFooter()}

  <script>
    (function() {
      const stateFilter = document.getElementById('state-filter');
      const sortSelect = document.getElementById('sort-select');
      const grid = document.getElementById('hotels-grid');
      const resultsCount = document.getElementById('results-count');
      const emptyState = document.getElementById('empty-state');
      const allCards = Array.from(grid.querySelectorAll('.hotel-card'));

      function filterHotels() {
        const selectedState = stateFilter.value;
        let visibleCount = 0;

        allCards.forEach(card => {
          const cardState = card.getAttribute('data-state');
          const show = !selectedState || cardState === selectedState;
          card.style.display = show ? '' : 'none';
          if (show) visibleCount++;
        });

        resultsCount.textContent = visibleCount + ' result' + (visibleCount !== 1 ? 's' : '');
        emptyState.classList.toggle('hidden', visibleCount > 0);
        grid.classList.toggle('hidden', visibleCount === 0);
      }

      function sortHotels() {
        const sortBy = sortSelect.value;
        const sorted = [...allCards].sort((a, b) => {
          if (sortBy === 'state') {
            const stateA = a.getAttribute('data-state');
            const stateB = b.getAttribute('data-state');
            if (stateA !== stateB) return stateA.localeCompare(stateB);
            return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
          }
          return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
        });

        sorted.forEach(card => grid.appendChild(card));
      }

      stateFilter.addEventListener('change', filterHotels);
      sortSelect.addEventListener('change', () => {
        sortHotels();
        filterHotels();
      });

      // Expose for empty state button
      window.filterHotels = filterHotels;
    })();
  </script>
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  try {
    // Query all hotel-type places
    const { results: hotels } = await env.DB.prepare(`
      SELECT slug, name, city, state, category, ghost_story, image_url
      FROM places
      WHERE LOWER(category) IN ('hotel', 'inn', 'bed and breakfast', 'resort', 'motel', 'lodge')
      ORDER BY state, name
    `).all();

    // Get unique states that have hotels (for filter dropdown)
    const statesWithHotels = [...new Set((hotels || []).map(h => h.state))].sort();

    // Sort: places with images first
    const sortedHotels = [...(hotels || [])].sort((a, b) => {
      if (a.image_url && !b.image_url) return -1;
      if (!a.image_url && b.image_url) return 1;
      // Then by state, then name
      if (a.state !== b.state) return a.state.localeCompare(b.state);
      return a.name.localeCompare(b.name);
    });

    const html = renderHotelsPage(sortedHotels, statesWithHotels, baseUrl);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error rendering hotels page:', error);
    return new Response('Error loading hotels page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
