// GET /about - About page

function renderAboutPage(stats, baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About SpookFinder - America's Haunted Places Directory</title>
  <meta name="description" content="SpookFinder is a comprehensive directory of haunted places across America. Learn about our mission to document ghost stories, paranormal history, and haunted locations.">

  <!-- Open Graph -->
  <meta property="og:title" content="About SpookFinder">
  <meta property="og:description" content="Learn about America's most comprehensive haunted places directory.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/about">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="About SpookFinder">
  <meta name="twitter:description" content="Learn about America's most comprehensive haunted places directory.">

  <!-- Canonical -->
  <link rel="canonical" href="${baseUrl}/about">

  <!-- Breadcrumb Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "${baseUrl}"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About"
      }
    ]
  }
  </script>

  <!-- Organization Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SpookFinder",
    "url": "${baseUrl}",
    "description": "A comprehensive directory of haunted places across America"
  }
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
  <style>
    @media (max-width: 768px) {
      nav a {
        padding: 12px 8px;
        min-height: 44px;
        display: inline-flex;
        align-items: center;
      }
      nav[aria-label="Breadcrumb"] a {
        padding: 8px 4px;
        min-height: 44px;
      }
    }
  </style>
</head>
<body class="bg-dark text-gray-100 min-h-screen">

  <!-- Header -->
  <header class="border-b border-dark-border">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-lg font-semibold hover:text-accent transition-colors">Haunted Places</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="hover:text-white transition-colors">States</a>
        <a href="/about" class="text-white">About</a>
      </nav>
    </div>
  </header>

  <!-- Breadcrumbs -->
  <nav class="max-w-4xl mx-auto px-4 pt-4 pb-2" aria-label="Breadcrumb">
    <ol class="flex items-center gap-2 text-sm text-muted">
      <li>
        <a href="/" class="hover:text-accent transition-colors">Home</a>
      </li>
      <li class="text-dark-border">/</li>
      <li class="text-ghost">About</li>
    </ol>
  </nav>

  <!-- Main Content -->
  <main class="max-w-4xl mx-auto px-4 py-12">

    <!-- Hero -->
    <section class="mb-16">
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">About SpookFinder</h1>
      <p class="text-xl text-ghost leading-relaxed">
        SpookFinder is a comprehensive directory of haunted places across America.
        We document ghost stories, paranormal history, and haunted locations to help
        enthusiasts, researchers, and curious travelers discover the supernatural side of the USA.
      </p>
    </section>

    <!-- Stats -->
    <section class="mb-16">
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-dark-card rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-accent mb-1">${stats.totalPlaces}</div>
          <div class="text-sm text-ghost">Haunted Places</div>
        </div>
        <div class="bg-dark-card rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-accent mb-1">${stats.totalStates}</div>
          <div class="text-sm text-ghost">States Covered</div>
        </div>
        <div class="bg-dark-card rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-accent mb-1">${stats.totalCities}</div>
          <div class="text-sm text-ghost">Cities</div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
      <div class="prose prose-invert max-w-none text-ghost space-y-4">
        <p>
          Every haunted place has a story. Behind the ghost sightings and paranormal activity
          lies history - tales of love, tragedy, mystery, and the unexplained. Our mission is
          to preserve and share these stories.
        </p>
        <p>
          We research and document haunted locations across America, from famous haunted hotels
          and historic mansions to lesser-known cemeteries and battlefields. Each entry includes
          the location's history, reported paranormal activity, and practical information for visitors.
        </p>
      </div>
    </section>

    <!-- What We Cover -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">What We Cover</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="bg-dark-card rounded-lg p-4">
          <span class="text-2xl mb-2 block">&#127976;</span>
          <h3 class="font-medium mb-1">Haunted Hotels</h3>
          <p class="text-sm text-ghost">Historic hotels with ghostly guests</p>
        </div>
        <div class="bg-dark-card rounded-lg p-4">
          <span class="text-2xl mb-2 block">&#127962;&#65039;</span>
          <h3 class="font-medium mb-1">Mansions</h3>
          <p class="text-sm text-ghost">Grand estates with dark histories</p>
        </div>
        <div class="bg-dark-card rounded-lg p-4">
          <span class="text-2xl mb-2 block">&#129702;</span>
          <h3 class="font-medium mb-1">Cemeteries</h3>
          <p class="text-sm text-ghost">Resting places of the restless</p>
        </div>
        <div class="bg-dark-card rounded-lg p-4">
          <span class="text-2xl mb-2 block">&#9939;&#65039;</span>
          <h3 class="font-medium mb-1">Prisons</h3>
          <p class="text-sm text-ghost">Cells that still hold spirits</p>
        </div>
        <div class="bg-dark-card rounded-lg p-4">
          <span class="text-2xl mb-2 block">&#127973;</span>
          <h3 class="font-medium mb-1">Hospitals</h3>
          <p class="text-sm text-ghost">Asylums and medical facilities</p>
        </div>
        <div class="bg-dark-card rounded-lg p-4">
          <span class="text-2xl mb-2 block">&#9876;&#65039;</span>
          <h3 class="font-medium mb-1">Battlefields</h3>
          <p class="text-sm text-ghost">Sites of historic conflict</p>
        </div>
      </div>
    </section>

    <!-- Data Sources -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-4">Our Sources</h2>
      <div class="prose prose-invert max-w-none text-ghost space-y-4">
        <p>
          Our data comes from a variety of sources including historical records, local
          historical societies, paranormal research organizations, and firsthand accounts.
          We cross-reference multiple sources to ensure accuracy and provide attribution
          where available.
        </p>
        <p>
          We're always looking to expand our database. If you know of a haunted location
          that should be included, or if you have corrections to existing entries, we'd
          love to hear from you.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-dark-card rounded-xl p-8 text-center">
      <h2 class="text-2xl font-semibold mb-4">Start Exploring</h2>
      <p class="text-ghost mb-6">
        Ready to discover haunted places near you? Browse by state or explore our featured locations.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/states" class="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors">
          Browse by State
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="/" class="inline-flex items-center justify-center gap-2 bg-dark-card hover:bg-dark-border text-white font-medium px-6 py-3 rounded-lg transition-colors">
          Featured Places
        </a>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="mt-16 border-t border-dark-border">
    <div class="max-w-4xl mx-auto px-4 py-8">
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

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  try {
    // Fetch stats
    const { results: placeCount } = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM places'
    ).all();

    const { results: stateCount } = await env.DB.prepare(
      'SELECT COUNT(DISTINCT state) as count FROM places'
    ).all();

    const { results: cityCount } = await env.DB.prepare(
      'SELECT COUNT(DISTINCT city) as count FROM places'
    ).all();

    const stats = {
      totalPlaces: placeCount[0]?.count || 0,
      totalStates: stateCount[0]?.count || 0,
      totalCities: cityCount[0]?.count || 0
    };

    const html = renderAboutPage(stats, baseUrl);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error rendering about page:', error);
    return new Response('Error loading about page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
