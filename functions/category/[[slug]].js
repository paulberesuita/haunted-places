// GET /category and /category/[slug] - Category Pages Directory
// Handles both index (all categories with 10+ places) and category detail pages

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

// Category display names, URL slugs, and brand images
// Brand images are custom illustrations stored in R2 at /categories/[key].jpg
const categoryConfig = {
  'mansion': { slug: 'haunted-mansions', display: 'Haunted Mansions', singular: 'Mansion', description: 'Grand estates with restless spirits, hidden rooms, and tragic histories', brandImage: 'categories/mansion.jpg' },
  'hotel': { slug: 'haunted-hotels', display: 'Haunted Hotels', singular: 'Hotel', description: 'Lodgings where ghostly guests never check out', brandImage: 'categories/hotel.jpg' },
  'cemetery': { slug: 'haunted-cemeteries', display: 'Haunted Cemeteries', singular: 'Cemetery', description: 'Graveyards with wandering apparitions and unexplained phenomena', brandImage: 'categories/cemetery.jpg' },
  'museum': { slug: 'haunted-museums', display: 'Haunted Museums', singular: 'Museum', description: 'Collections guarded by spirits from the past', brandImage: 'categories/museum.jpg' },
  'restaurant': { slug: 'haunted-restaurants', display: 'Haunted Restaurants', singular: 'Restaurant', description: 'Dining establishments with spectral servers and phantom patrons', brandImage: 'categories/restaurant.jpg' },
  'theater': { slug: 'haunted-theaters', display: 'Haunted Theaters', singular: 'Theater', description: 'Stages where ghostly performers still take their bows', brandImage: 'categories/theater.jpg' },
  'hospital': { slug: 'haunted-hospitals', display: 'Haunted Hospitals', singular: 'Hospital', description: 'Medical facilities haunted by patients who never left', brandImage: 'categories/hospital.jpg' },
  'battlefield': { slug: 'haunted-battlefields', display: 'Haunted Battlefields', singular: 'Battlefield', description: 'Historic grounds where fallen soldiers still march', brandImage: 'categories/battlefield.jpg' },
  'prison': { slug: 'haunted-prisons', display: 'Haunted Prisons', singular: 'Prison', description: 'Penitentiaries where inmates remain locked in the afterlife', brandImage: 'categories/prison.jpg' },
  'lighthouse': { slug: 'haunted-lighthouses', display: 'Haunted Lighthouses', singular: 'Lighthouse', description: 'Coastal beacons with keepers who never abandoned their posts', brandImage: 'categories/lighthouse.jpg' },
  'university': { slug: 'haunted-universities', display: 'Haunted Universities', singular: 'University', description: 'Academic halls with scholarly spirits and dormitory hauntings', brandImage: 'categories/university.jpg' },
  'plantation': { slug: 'haunted-plantations', display: 'Haunted Plantations', singular: 'Plantation', description: 'Southern estates haunted by their troubled past', brandImage: 'categories/plantation.jpg' },
  'other': { slug: 'other-haunted-places', display: 'Other Haunted Places', singular: 'Place', description: 'Unique haunted locations that defy categorization', brandImage: 'categories/other.jpg' }
};

// Reverse lookup: slug -> category key
const slugToCategory = Object.fromEntries(
  Object.entries(categoryConfig).map(([key, config]) => [config.slug, key])
);

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

function renderCategoriesIndexPage(categories, baseUrl) {
  const totalCategories = categories.length;
  const totalPlaces = categories.reduce((sum, c) => sum + c.place_count, 0);
  const title = `Haunted Places by Category - ${totalCategories} Types of Hauntings | SpookFinder`;
  const description = `Explore ${totalPlaces} haunted places across ${totalCategories} categories. Browse haunted hotels, cemeteries, mansions, theaters, and more paranormal locations.`;
  const canonicalUrl = `${baseUrl}/category`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Categories" }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Haunted Place Categories",
    "description": `${totalCategories} types of haunted locations across America.`,
    "numberOfItems": totalCategories,
    "itemListElement": categories.map((cat, index) => {
      const config = categoryConfig[cat.category] || { slug: cat.category, display: cat.category };
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": config.display,
        "url": `${baseUrl}/category/${config.slug}`
      };
    })
  };

  const categoryCardsHtml = categories.map(cat => {
    const config = categoryConfig[cat.category] || {
      slug: cat.category,
      display: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
      description: `Haunted ${cat.category} locations`,
      brandImage: null
    };
    // Use brand image if available, fall back to sample_image
    const imageUrl = config.brandImage
      ? `${baseUrl}/images/${config.brandImage}`
      : (cat.sample_image ? `${baseUrl}/images/${cat.sample_image}` : null);

    return `
      <a href="/category/${config.slug}" class="group block">
        <!-- Card with layered white borders -->
        <div class="category-card relative bg-white/10 p-[3px] rounded-lg">
          <div class="bg-white/5 p-[3px] rounded-md">
            <div class="bg-dark-card rounded overflow-hidden">
              <div class="aspect-[4/5] overflow-hidden">
                ${imageUrl
                  ? `<img src="${imageUrl}" alt="${escapeHtml(config.display)}" class="category-img w-full h-full object-cover" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark\\'><span class=\\'text-4xl opacity-30\\'>&#128123;</span></div>'">`
                  : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
                      <span class="text-4xl opacity-30">&#128123;</span>
                    </div>`
                }
              </div>
              <div class="p-4 text-center">
                <h3 class="font-semibold text-white group-hover:text-accent transition-colors text-lg">${escapeHtml(config.display)}</h3>
                <span class="text-sm text-accent">${cat.place_count} ${cat.place_count === 1 ? 'place' : 'places'}</span>
              </div>
            </div>
          </div>
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
    html { background: #0a0c12; }
    .category-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .group:hover .category-card {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(233, 69, 96, 0.15);
    }
    .category-img {
      transition: transform 0.5s ease;
    }
    .group:hover .category-img {
      transform: scale(1.05);
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

  ${renderHeader('category')}

  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-muted">
        <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
        <li class="text-dark-border">/</li>
        <li class="text-ghost">Categories</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <div class="mb-10">
      <h1 class="font-['Bebas_Neue'] text-5xl md:text-7xl text-white mb-3">Browse by Category</h1>
      <p class="text-ghost text-lg">${totalPlaces} haunted places across ${totalCategories} categories</p>
    </div>

    <!-- Category Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      ${categoryCardsHtml}
    </div>
  </main>

  ${renderFooter()}
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
</body>
</html>`;
}

function renderCategoryDetailPage(categoryKey, places, baseUrl) {
  const config = categoryConfig[categoryKey] || {
    slug: categoryKey,
    display: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1) + 's',
    singular: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
    description: `Haunted ${categoryKey} locations`
  };

  const placeCount = places.length;

  // Get unique states for filter
  const states = [...new Set(places.map(p => p.state))].sort();

  // Get sample place names for meta description
  const sampleNames = places.slice(0, 3).map(p => p.name).join(', ');

  const title = `${config.display} in America - ${placeCount} Haunted Locations | SpookFinder`;
  const description = `Discover ${placeCount} ${config.display.toLowerCase()} across America. ${config.description}. Including ${sampleNames}.`;
  const canonicalUrl = `${baseUrl}/category/${config.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Categories", "item": `${baseUrl}/category` },
      { "@type": "ListItem", "position": 3, "name": config.display }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": config.display,
    "description": `${placeCount} ${config.display.toLowerCase()} in America.`,
    "numberOfItems": placeCount,
    "itemListElement": places.slice(0, 100).map((place, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": place.name,
      "url": `${baseUrl}/place/${place.slug}`,
      "description": `Haunted ${config.singular.toLowerCase()} in ${place.city}, ${stateNames[place.state] || place.state}`
    }))
  };

  // Sort places: those with images first, then by name
  const sortedPlaces = [...places].sort((a, b) => {
    if (a.image_url && !b.image_url) return -1;
    if (!a.image_url && b.image_url) return 1;
    return a.name.localeCompare(b.name);
  });

  // State filter options
  const stateOptionsHtml = states.map(stateCode => {
    const stateName = stateNames[stateCode] || stateCode;
    return `<option value="${stateCode}">${stateName}</option>`;
  }).join('\n');

  const placeCardsHtml = sortedPlaces.map(place => {
    const imageUrl = place.image_url ? `${baseUrl}/images/${place.image_url}` : null;
    const excerpt = truncate(place.ghost_story || place.description, 120);
    const stateName = stateNames[place.state] || place.state;

    return `
      <a href="/place/${place.slug}" class="group block bg-dark-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 place-card" data-state="${place.state}">
        <div class="aspect-[4/3] overflow-hidden">
          ${imageUrl
            ? `<img src="${imageUrl}" alt="${escapeHtml(place.name)}" class="place-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark\\'><span class=\\'text-4xl opacity-30\\'>&#128123;</span></div>'">`
            : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
                <span class="text-4xl opacity-30">&#128123;</span>
              </div>`
          }
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white group-hover:text-accent transition-colors line-clamp-2 mb-1">${escapeHtml(place.name)}</h3>
          <p class="text-sm text-muted mb-2">${escapeHtml(place.city)}, ${stateName}</p>
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
    html { background: #0a0c12; }
    .place-img {
      filter: none;
      transition: filter 0.5s ease;
    }
    .group:hover .place-img {
      filter: saturate(0.4) contrast(1.1);
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
    .place-card.hidden {
      display: none;
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

  ${renderHeader('category')}

  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-muted">
        <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
        <li class="text-dark-border">/</li>
        <li><a href="/category" class="hover:text-accent transition-colors">Categories</a></li>
        <li class="text-dark-border">/</li>
        <li class="text-ghost">${escapeHtml(config.display)}</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <div class="mb-8">
      <h1 class="font-['Bebas_Neue'] text-5xl md:text-7xl text-white mb-3">${escapeHtml(config.display)}</h1>
      <p class="text-ghost text-lg mb-4">${placeCount} haunted ${placeCount === 1 ? 'location' : 'locations'} across America</p>
      <p class="text-muted max-w-2xl">${escapeHtml(config.description)}</p>
    </div>

    <!-- State Filter -->
    ${states.length > 1 ? `
    <div class="mb-8">
      <label for="state-filter" class="sr-only">Filter by state</label>
      <select id="state-filter" class="bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none">
        <option value="">All States</option>
        ${stateOptionsHtml}
      </select>
      <span id="filter-count" class="ml-4 text-ghost text-sm"></span>
    </div>
    ` : ''}

    <!-- Empty State -->
    <div id="empty-state" class="hidden text-center py-16">
      <span class="text-6xl mb-4 block">&#128123;</span>
      <p class="text-ghost text-lg">No haunted ${config.display.toLowerCase()} found in this state.</p>
      <button onclick="document.getElementById('state-filter').value=''; filterPlaces('');" class="mt-4 text-accent hover:text-accent-hover transition-colors">
        Show all ${config.display.toLowerCase()}
      </button>
    </div>

    <!-- Place Cards Grid -->
    <div id="places-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${placeCardsHtml}
    </div>
  </main>

  ${renderFooter()}

  <script>
    function filterPlaces(stateCode) {
      const cards = document.querySelectorAll('.place-card');
      const emptyState = document.getElementById('empty-state');
      const filterCount = document.getElementById('filter-count');
      let visibleCount = 0;

      cards.forEach(card => {
        if (!stateCode || card.dataset.state === stateCode) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }

      if (filterCount) {
        filterCount.textContent = stateCode ? \`Showing \${visibleCount} of ${placeCount}\` : '';
      }
    }

    const stateFilter = document.getElementById('state-filter');
    if (stateFilter) {
      stateFilter.addEventListener('change', (e) => filterPlaces(e.target.value));
    }
  </script>
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
  <title>Category Not Found | SpookFinder</title>
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
    <h1 class="text-3xl font-bold mb-4">This category doesn't exist...</h1>
    <p class="text-ghost mb-8 max-w-md mx-auto">
      We couldn't find the haunted category you're looking for. Maybe the spirits moved it?
    </p>
    <a href="/category" class="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      Browse All Categories
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

  // If no slug, render the categories index page
  if (!slugParts || slugParts.length === 0) {
    try {
      // Get all categories with 10+ places, including a sample image
      const { results: categories } = await env.DB.prepare(`
        SELECT
          category,
          COUNT(*) as place_count,
          (SELECT image_url FROM places p2
           WHERE p2.category = places.category
           AND p2.image_url IS NOT NULL AND p2.image_url != ''
           LIMIT 1) as sample_image
        FROM places
        GROUP BY category
        HAVING place_count >= 10
        ORDER BY place_count DESC
      `).all();

      // Sort categories: by place_count DESC, but put "other" at the end
      const sortedCategories = (categories || []).sort((a, b) => {
        if (a.category === 'other') return 1;
        if (b.category === 'other') return -1;
        return b.place_count - a.place_count;
      });

      const html = renderCategoriesIndexPage(sortedCategories, baseUrl);
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    } catch (error) {
      console.error('Error rendering categories index:', error);
      return new Response('Error loading categories page', { status: 500 });
    }
  }

  // Category detail page
  const categorySlug = slugParts[0];
  const categoryKey = slugToCategory[categorySlug];

  if (!categoryKey) {
    return new Response(render404(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  try {
    // Verify this category has 10+ places
    const { results: countResult } = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM places WHERE category = ?
    `).bind(categoryKey).all();

    if (!countResult || countResult[0].count < 10) {
      return new Response(render404(), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Get all places in this category
    const { results: places } = await env.DB.prepare(`
      SELECT slug, name, city, state, description, ghost_story, image_url
      FROM places
      WHERE category = ?
      ORDER BY state, city, name
    `).bind(categoryKey).all();

    const html = renderCategoryDetailPage(categoryKey, places || [], baseUrl);
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error rendering category page:', error);
    return new Response('Error loading category page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
