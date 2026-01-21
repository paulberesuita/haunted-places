// GET /states - States index page listing all states

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

function renderStatesPage(states, totalPlaces, baseUrl) {
  const statesWithData = states.map(s => ({
    code: s.state,
    name: stateNames[s.state] || s.state,
    url: stateUrls[s.state] || s.state.toLowerCase(),
    count: s.place_count
  })).sort((a, b) => b.count - a.count); // Sort by count descending

  const stateCardsHtml = statesWithData.map(state => `
    <a href="/states/${state.url}" class="block bg-dark-card rounded-xl p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xl font-semibold group-hover:text-accent transition-colors">${state.name}</h2>
        <span class="text-3xl">&#128123;</span>
      </div>
      <p class="text-ghost text-sm">${state.count} haunted ${state.count === 1 ? 'place' : 'places'}</p>
      <div class="mt-4 flex items-center text-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Explore</span>
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Haunted Places by State - Browse All ${states.length} States | SpookFinder</title>
  <meta name="description" content="Explore ${totalPlaces} haunted places across ${states.length} US states. Browse haunted hotels, cemeteries, mansions, and more by state.">

  <!-- Open Graph -->
  <meta property="og:title" content="Haunted Places by State | SpookFinder">
  <meta property="og:description" content="Explore ${totalPlaces} haunted places across ${states.length} US states.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/states">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Haunted Places by State | SpookFinder">
  <meta name="twitter:description" content="Explore ${totalPlaces} haunted places across ${states.length} US states.">

  <!-- Canonical -->
  <link rel="canonical" href="${baseUrl}/states">

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
        "name": "States"
      }
    ]
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
    /* Mobile touch target improvements */
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
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-lg font-semibold hover:text-accent transition-colors">Haunted Places</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="text-white">States</a>
        <a href="/about" class="hover:text-white transition-colors">About</a>
      </nav>
    </div>
  </header>

  <!-- Breadcrumbs -->
  <nav class="max-w-6xl mx-auto px-4 pt-4 pb-2" aria-label="Breadcrumb">
    <ol class="flex items-center gap-2 text-sm text-muted">
      <li>
        <a href="/" class="hover:text-accent transition-colors">Home</a>
      </li>
      <li class="text-dark-border">/</li>
      <li class="text-ghost">States</li>
    </ol>
  </nav>

  <!-- Hero -->
  <section class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">Haunted Places by State</h1>
    <p class="text-ghost text-lg max-w-2xl">
      Explore ${totalPlaces} documented haunted locations across ${states.length} US states.
      Select a state to discover ghost stories, paranormal history, and haunted places near you.
    </p>
  </section>

  <!-- Stats -->
  <section class="max-w-6xl mx-auto px-4 pb-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-dark-card rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-accent">${totalPlaces}</div>
        <div class="text-sm text-ghost">Haunted Places</div>
      </div>
      <div class="bg-dark-card rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-accent">${states.length}</div>
        <div class="text-sm text-ghost">States</div>
      </div>
      <div class="bg-dark-card rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-accent">${statesWithData[0]?.count || 0}</div>
        <div class="text-sm text-ghost">Most in One State</div>
      </div>
      <div class="bg-dark-card rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-accent">${Math.round(totalPlaces / states.length)}</div>
        <div class="text-sm text-ghost">Avg per State</div>
      </div>
    </div>
  </section>

  <!-- State Cards Grid -->
  <main class="max-w-6xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${stateCardsHtml}
    </div>
  </main>

  <!-- Footer -->
  <footer class="mt-16 border-t border-dark-border">
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

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  try {
    // Fetch state counts
    const { results: states } = await env.DB.prepare(`
      SELECT state, COUNT(*) as place_count
      FROM places
      GROUP BY state
      ORDER BY state
    `).all();

    // Calculate total places
    const totalPlaces = states.reduce((sum, s) => sum + s.place_count, 0);

    const html = renderStatesPage(states || [], totalPlaces, baseUrl);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error rendering states page:', error);
    return new Response('Error loading states page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
