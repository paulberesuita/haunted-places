// GET /crew - The Spookfinder Crew page

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Crew members - edit names and roles here
const crewMembers = [
  {
    id: 1,
    name: 'Mortimer',
    role: 'Head of Hauntings',
    image: 'crew/crew-1.jpg'
  },
  {
    id: 2,
    name: 'Vesper',
    role: 'Spirit Liaison',
    image: 'crew/crew-2.jpg'
  },
  {
    id: 3,
    name: 'Grimshaw',
    role: 'Cemetery Cartographer',
    image: 'crew/crew-3.jpg'
  },
  {
    id: 4,
    name: 'Oleander',
    role: 'Paranormal Archivist',
    image: 'crew/crew-4.jpg'
  }
];

function renderCrewPage(baseUrl) {
  const title = 'Meet the Crew | SpookFinder';
  const description = 'Meet the spectral staff behind SpookFinder. Our crew of otherworldly experts documents America\'s most haunted locations.';
  const canonicalUrl = `${baseUrl}/crew`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Crew" }
    ]
  };

  const crewCardsHtml = crewMembers.map(member => `
    <div class="group">
      <div class="aspect-[4/5] overflow-hidden rounded-xl bg-dark-card mb-4">
        <img
          src="${baseUrl}/images/${member.image}"
          alt="${escapeHtml(member.name)}"
          class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >
      </div>
      <h3 class="text-xl font-semibold text-white group-hover:text-accent transition-colors">${escapeHtml(member.name)}</h3>
      <p class="text-ghost text-sm">${escapeHtml(member.role)}</p>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema)}
  </script>
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
    @media (max-width: 768px) {
      nav a { padding: 12px 8px; min-height: 44px; display: inline-flex; align-items: center; }
    }
  </style>
</head>
<body class="text-gray-100 min-h-screen font-sans">
  <video class="smoke-video" autoplay muted loop playsinline>
    <source src="/smoke-bg.mp4" type="video/mp4">
  </video>

  <header>
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="hover:text-white transition-colors">States</a>
        <a href="/category" class="hover:text-white transition-colors">Categories</a>
        <a href="/tours" class="hover:text-white transition-colors">Tours</a>
        <a href="/about" class="hover:text-white transition-colors">About</a>
      </nav>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-muted">
        <li><a href="/" class="hover:text-accent transition-colors">Home</a></li>
        <li class="text-dark-border">/</li>
        <li class="text-ghost">Crew</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="font-['Bebas_Neue'] text-5xl md:text-7xl text-white mb-4">Meet the Crew</h1>
      <p class="text-ghost text-lg max-w-2xl mx-auto">The spectral staff behind SpookFinder. They've been documenting hauntings since... well, longer than they can remember.</p>
    </div>

    <!-- Crew Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      ${crewCardsHtml}
    </div>
  </main>

  <footer class="mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center">
        <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
        <a href="/radio" class="block text-ghost hover:text-white text-sm transition-colors mt-2">Ghost Story Radio</a>
        <p class="text-muted text-sm mt-2">Documenting America's most haunted locations, one ghost story at a time.</p>
      </div>
    </div>
  </footer>
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const html = renderCrewPage(baseUrl);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
