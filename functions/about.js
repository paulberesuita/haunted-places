// GET /about - About page

function renderAboutPage(stats, baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About SpookFinder - America's Haunted Places Directory</title>
  <meta name="description" content="SpookFinder is a comprehensive directory of haunted places across America. Learn about our mission to document ghost stories, paranormal history, and haunted locations.">

  <!-- Open Graph -->
  <meta property="og:title" content="About SpookFinder">
  <meta property="og:description" content="Learn about America's most comprehensive haunted places directory.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/about">
  <meta property="og:image" content="${baseUrl}/about-ghosts.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About SpookFinder">
  <meta name="twitter:description" content="Learn about America's most comprehensive haunted places directory.">
  <meta name="twitter:image" content="${baseUrl}/about-ghosts.png">

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

  <!-- Privacy-friendly analytics by Plausible -->
  <script async src="https://plausible.io/js/pa-U75YbwDcDaK8C53IH8RVe.js"></script>
  <script>
    window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
    plausible.init()
  </script>

  <!-- Fonts & Tailwind -->
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Creepster&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
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
    html {
      background: #0a0a0f;
    }
    @media (max-width: 768px) {
      nav a {
        padding: 12px 8px;
        min-height: 44px;
        display: inline-flex;
        align-items: center;
      }
    }

    /* Glitch text effect */
    .glitch-text {
      position: relative;
      animation: flicker 4s infinite;
    }
    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .glitch-text::before {
      color: #ff0040;
      z-index: -1;
    }
    .glitch-text::after {
      color: #00ffff;
      z-index: -2;
    }
    .glitch-text.glitching::before {
      animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      opacity: 0.8;
    }
    .glitch-text.glitching::after {
      animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
      opacity: 0.8;
    }
    @keyframes flicker {
      0%, 100% { opacity: 1; }
      92% { opacity: 1; }
      93% { opacity: 0.8; }
      94% { opacity: 1; }
      95% { opacity: 0.9; }
      96% { opacity: 1; }
      97% { opacity: 0.7; }
      98% { opacity: 1; }
    }
    @keyframes glitch-1 {
      0% { transform: translate(0); }
      20% { transform: translate(-3px, 2px); }
      40% { transform: translate(-3px, -2px); }
      60% { transform: translate(3px, 2px); }
      80% { transform: translate(3px, -2px); }
      100% { transform: translate(0); }
    }
    @keyframes glitch-2 {
      0% { transform: translate(0); }
      20% { transform: translate(3px, -2px); }
      40% { transform: translate(3px, 2px); }
      60% { transform: translate(-3px, -2px); }
      80% { transform: translate(-3px, 2px); }
      100% { transform: translate(0); }
    }

    /* Ghost illustration - full-width bleed */
    .ghost-illustration {
      position: relative;
      width: 100vw;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 4rem;
    }
    .ghost-illustration::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(180deg, rgba(10,10,15,1) 0%, rgba(10,10,15,0.7) 40%, transparent 100%);
      z-index: 1;
      pointer-events: none;
    }
    .ghost-illustration img {
      width: 100%;
      max-width: none;
      display: block;
      opacity: 0.9;
    }
    footer {
      position: relative;
      z-index: 2;
      margin-top: -60px !important;
      padding-top: 0;
      background: rgba(10,10,15,1);
    }
    footer > div.py-8 {
      padding-top: 16px !important;
      padding-bottom: 16px !important;
    }
  </style>
</head>
<body class="text-gray-100 min-h-screen">

  <!-- Header -->
  <header>
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="hover:text-white transition-colors">States</a>
        <a href="/category" class="hover:text-white transition-colors">Categories</a>
        <a href="/tours" class="hover:text-white transition-colors">Tours</a>
        <a href="/about" class="text-white">About</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-2xl mx-auto px-6 py-16 md:py-24">

    <!-- Title -->
    <h1 id="glitch-headline" class="glitch-text text-4xl md:text-5xl lg:text-6xl text-center mb-16" style="font-family: 'Creepster', cursive;" data-text="About SpookFinder">About SpookFinder</h1>

    <!-- Prose -->
    <article class="space-y-8 text-lg md:text-xl leading-relaxed text-gray-300">

      <p>
        Every haunted place has a story.
      </p>

      <p>
        Behind the ghost sightings and paranormal activity lies history—tales of love, tragedy, mystery, and the unexplained. SpookFinder exists to preserve and share these stories.
      </p>

      <p>
        We're building a comprehensive directory of haunted places across America. From the infamous hotels where guests check in but never leave, to forgotten cemeteries where the restless still wander, to Civil War battlefields where soldiers march through the mist—we document them all.
      </p>

      <p class="text-ghost text-base md:text-lg border-l-2 border-accent pl-6 my-12">
        Currently cataloging <span class="text-white font-medium">${stats.totalPlaces}</span> haunted locations across <span class="text-white font-medium">${stats.totalStates}</span> states and <span class="text-white font-medium">${stats.totalCities}</span> cities.
      </p>

      <p>
        Each entry includes the location's history, reported paranormal activity, and practical information for visitors. Whether you're a paranormal investigator, a history buff, or just someone who enjoys a good ghost story, SpookFinder helps you discover the supernatural side of America.
      </p>

      <p>
        Our data comes from historical records, local historical societies, paranormal research organizations, and firsthand accounts. We cross-reference multiple sources to ensure accuracy.
      </p>

      <p>
        Know of a haunted location we're missing? <a href="/contact" class="text-accent hover:text-accent-hover transition-colors">Submit it here</a>.
      </p>

      <!-- Ghost Illustration -->
      <figure class="ghost-illustration mt-16">
        <img src="/about-ghosts.png" alt="Three ethereal ghosts emerging from mist">
      </figure>

    </article>

  </main>

  <!-- Footer -->
  <footer class="mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between">
        <div>
          <a href="/" class="text-2xl tracking-widest hover:text-accent transition-colors" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
          <p class="text-muted text-sm mt-1">
            Documenting America's most haunted locations, one ghost story at a time.
          </p>
        </div>
        <a href="/radio" class="text-ghost hover:text-white text-sm transition-colors">Ghost Story Radio</a>
      </div>
    </div>
  </footer>

  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
  <script>
    // Periodic glitch effect on headline
    (function() {
      const headline = document.getElementById('glitch-headline');
      if (!headline) return;
      setInterval(function() {
        headline.classList.add('glitching');
        setTimeout(function() {
          headline.classList.remove('glitching');
        }, 300);
      }, 4000);
    })();
  </script>
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
