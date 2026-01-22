// GET /states/[slug] - Serve state page with server-side rendering
// Example: /states/california, /states/new-york

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

const stateUrls = {
  'CA': 'california',
  'CT': 'connecticut',
  'FL': 'florida',
  'GA': 'georgia',
  'IL': 'illinois',
  'KY': 'kentucky',
  'LA': 'louisiana',
  'MA': 'massachusetts',
  'MD': 'maryland',
  'NC': 'north-carolina',
  'NJ': 'new-jersey',
  'NY': 'new-york',
  'OH': 'ohio',
  'PA': 'pennsylvania',
  'SC': 'south-carolina',
  'TN': 'tennessee',
  'TX': 'texas',
  'VA': 'virginia'
};

// Reverse mapping: URL slug to state code
const urlToStateCode = Object.fromEntries(
  Object.entries(stateUrls).map(([code, url]) => [url, code])
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

function renderStatePage(stateCode, stateName, places, allStates, baseUrl) {
  // Sort places: those with images first
  const sortedPlaces = [...places].sort((a, b) => {
    if (a.image_url && !b.image_url) return -1;
    if (!a.image_url && b.image_url) return 1;
    return 0;
  });

  const totalPlaces = places.length;
  const statesWithPlaces = allStates.filter(s => s.place_count > 0);

  // ItemList schema for all places in this state (helps with Google carousel results)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Haunted Places in ${stateName}`,
    "description": `${totalPlaces} haunted locations in ${stateName} including hotels, cemeteries, mansions, and other paranormal hotspots.`,
    "numberOfItems": totalPlaces,
    "itemListElement": sortedPlaces.map((place, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": place.name,
      "url": `${baseUrl}/place/${place.slug}`,
      "description": place.city ? `Haunted ${place.category} in ${place.city}, ${stateName}` : undefined
    }))
  };

  // Generate state filter links
  const stateFiltersHtml = statesWithPlaces.map(s => {
    const name = stateNames[s.state] || s.state;
    const url = stateUrls[s.state] || s.state.toLowerCase();
    const isActive = s.state === stateCode;
    return `<a href="/states/${url}" class="${isActive ? 'text-white' : 'text-ghost hover:text-white'} transition-colors whitespace-nowrap">${name}</a>`;
  }).join('\n              ');

  // Generate place cards
  const placeCardsHtml = sortedPlaces.map(place => {
    const imageUrl = place.image_url
      ? `${baseUrl}/images/${place.image_url}`
      : null;

    return `
            <a href="/place/${place.slug}" class="group">
              <div class="place-card aspect-[4/3] overflow-hidden bg-dark-card mb-3">
                ${imageUrl
                  ? `<img src="${imageUrl}" alt="${escapeHtml(place.name)}" class="place-img w-full h-full object-cover" loading="lazy">`
                  : `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark">
                      <span class="text-4xl opacity-30">&#128123;</span>
                    </div>`
                }
              </div>
              <h3 class="text-sm font-medium group-hover:text-accent transition-colors">${escapeHtml(place.name)}</h3>
              <p class="text-xs text-ghost">${escapeHtml(place.city)}</p>
            </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Haunted Places in ${stateName} - ${totalPlaces} Haunted Locations | SpookFinder</title>
  <meta name="description" content="Discover ${totalPlaces} haunted places in ${stateName}. Browse haunted hotels, cemeteries, mansions, and more with ghost stories, paranormal history, and visitor information.">

  <!-- Open Graph -->
  <meta property="og:title" content="Haunted Places in ${stateName}">
  <meta property="og:description" content="Explore ${totalPlaces} haunted locations in ${stateName}.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/states/${stateUrls[stateCode]}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Haunted Places in ${stateName}">
  <meta name="twitter:description" content="Explore ${totalPlaces} haunted locations in ${stateName}.">

  <!-- Canonical -->
  <link rel="canonical" href="${baseUrl}/states/${stateUrls[stateCode]}">

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
        "name": "${stateName}"
      }
    ]
  }
  </script>

  <!-- ItemList Structured Data (for carousel results) -->
  <script type="application/ld+json">
  ${JSON.stringify(itemListSchema)}
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
    /* Subtle grain texture */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 9999;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
    }
    /* Smoke background video */
    .smoke-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      pointer-events: none;
    }
    html {
      background: #0a0a0f;
      overflow-x: hidden;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Mobile touch target improvements */
    @media (max-width: 768px) {
      nav a {
        padding: 12px 8px;
        min-height: 44px;
        display: inline-flex;
        align-items: center;
      }
      #state-filters a {
        padding: 12px 4px;
        min-height: 44px;
      }
      /* Breadcrumb touch targets */
      nav[aria-label="Breadcrumb"] a {
        padding: 8px 4px;
        min-height: 44px;
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

    /* Image filter - ghostly desaturated look */
    .place-img {
      filter: url(#grain) saturate(0.3) contrast(1.1);
      transition: filter 0.5s ease;
    }
    .place-img:hover {
      filter: url(#grain) saturate(0.5) contrast(1.15) brightness(1.05);
    }

    /* Card with animated smoke effect */
    .place-card {
      position: relative;
      overflow: hidden;
    }
    .group {
      position: relative;
    }
    /* Content container - no frame */
    .frame-container {
      position: relative;
    }
    .frame-content {
      position: relative;
      min-height: 80vh;
    }
    #dust-canvas {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
    }
    #fog-canvas {
      position: absolute;
      inset: 0;
      z-index: 4;
      pointer-events: none;
      opacity: 0.3;
    }
  </style>
</head>
<body class="text-gray-100 min-h-screen">
  <!-- Smoke Background Video -->
  <video class="smoke-video" autoplay muted loop playsinline>
    <source src="/smoke-bg.mp4" type="video/mp4">
  </video>

  <!-- SVG Grain Filter -->
  <svg style="position:absolute;width:0;height:0;">
    <defs>
      <filter id="grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" result="noise"/>
        <feColorMatrix in="noise" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0" result="grainFaded"/>
        <feBlend in="SourceGraphic" in2="grainFaded" mode="multiply"/>
      </filter>
    </defs>
  </svg>

  <!-- Header (outside frame) -->
  <header class="max-w-7xl mx-auto px-4">
    <div class="h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="hover:text-white transition-colors">States</a>
        <a href="/about" class="hover:text-white transition-colors">About</a>
      </nav>
    </div>
  </header>

  <!-- Framed Container -->
  <div class="frame-container">
    <canvas id="dust-canvas"></canvas>
    <canvas id="fog-canvas"></canvas>

    <div class="frame-content">
      <!-- Breadcrumbs -->
      <nav class="max-w-7xl mx-auto px-4 pt-4 pb-4" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-sm text-muted">
          <li>
            <a href="/" class="hover:text-accent transition-colors">Home</a>
          </li>
          <li class="text-dark-border">/</li>
          <li class="text-ghost">${stateName}</li>
        </ol>
      </nav>

      <!-- Tagline -->
      <section class="py-12 text-center">
        <h1 id="glitch-headline" class="glitch-text text-3xl md:text-4xl lg:text-5xl mb-2" style="font-family: 'Creepster', cursive;" data-text="Haunted Places in ${stateName}">Haunted Places in ${stateName}</h1>
        <p class="text-ghost text-sm">${totalPlaces} haunted locations</p>
      </section>

      <!-- State Filters -->
      <div id="state-filters" class="sticky top-0 z-40 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex gap-8 py-4 text-base font-light overflow-x-auto hide-scrollbar">
            <a href="/" class="text-ghost hover:text-white transition-colors whitespace-nowrap">Featured</a>
            ${stateFiltersHtml}
          </div>
        </div>
      </div>

      <!-- Place Cards Grid -->
      <main class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          ${placeCardsHtml}
        </div>
      </main>

      <!-- Footer -->
      <footer class="mt-8 pb-8">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center">
            <p class="text-gray-400 text-sm">
              Documenting America's most haunted locations, one ghost story at a time<span id="donkey-trigger" class="cursor-pointer select-none" title="...">.</span>
            </p>
          </div>
        </div>
      </footer>

    </div><!-- /frame-content -->
  </div><!-- /frame-container -->

  <!-- Donkey Scare Easter Egg -->
  <div id="donkey-scare" style="display:none;position:fixed;inset:0;z-index:99999;background:#000;">
    <!-- TV image as full background -->
    <img src="${baseUrl}/tv.png" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;">
    <!-- Video positioned over the TV screen area -->
    <video id="donkey-video" style="position:absolute;top:35%;left:35%;width:24%;height:28%;object-fit:cover;border-radius:4px;z-index:2;" playsinline>
      <source src="${baseUrl}/donkey.mp4" type="video/mp4">
    </video>
    <button id="donkey-close" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.2);border:none;color:#fff;padding:10px 20px;cursor:pointer;font-size:14px;border-radius:4px;z-index:3;">Close</button>
  </div>

  <!-- VHS Glitch Transition -->
  <div id="vhs-glitch" style="display:none;position:fixed;inset:0;z-index:9999;pointer-events:none;">
    <div class="glitch-overlay"></div>
  </div>
  <style>
    #vhs-glitch .glitch-overlay {
      position: absolute;
      inset: 0;
      background: #0a0a0f;
    }
    #vhs-glitch.active {
      display: block !important;
      animation: vhs-flash 0.9s ease-out;
    }
    #vhs-glitch.active .glitch-overlay {
      animation: vhs-noise 0.9s steps(6) infinite;
    }
    @keyframes vhs-flash {
      0% { opacity: 0; }
      10% { opacity: 1; }
      20% { opacity: 0.3; }
      30% { opacity: 1; }
      40% { opacity: 0.5; }
      50% { opacity: 1; }
      60% { opacity: 0.4; }
      70% { opacity: 1; }
      80% { opacity: 0.6; }
      100% { opacity: 1; }
    }
    @keyframes vhs-noise {
      0% {
        background: linear-gradient(0deg, transparent 40%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.15) 60%, transparent 60%),
                    linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.08) 50%);
        background-size: 100% 80px, 100% 4px;
        transform: translateX(-8px) skewX(-1deg);
      }
      20% {
        background: linear-gradient(0deg, transparent 70%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.2) 75%, transparent 75%),
                    linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.1) 50%);
        background-size: 100% 100px, 100% 3px;
        transform: translateX(12px) skewX(1.5deg);
      }
      40% {
        background: linear-gradient(0deg, transparent 20%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 35%, transparent 35%),
                    linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.06) 50%);
        background-size: 100% 120px, 100% 5px;
        transform: translateX(-5px);
      }
      60% {
        background: linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.18) 55%, transparent 55%),
                    linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.1) 50%);
        background-size: 100% 60px, 100% 2px;
        transform: translateX(10px) skewX(-2deg);
      }
      80% {
        background: linear-gradient(0deg, transparent 80%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.15) 90%, transparent 90%),
                    linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.08) 50%);
        background-size: 100% 90px, 100% 4px;
        transform: translateX(-15px) skewX(1deg);
      }
    }
  </style>
  <script>
    (function() {
      const glitch = document.getElementById('vhs-glitch');

      // Ensure clean state on load
      glitch.classList.remove('active');
      glitch.style.display = 'none';
      glitch.style.opacity = '0';

      function triggerGlitch(callback) {
        // Force layout recalc to ensure animation starts fresh
        glitch.style.display = 'block';
        glitch.offsetHeight; // Force reflow
        glitch.style.opacity = '1';
        glitch.classList.add('active');

        setTimeout(() => {
          callback();
        }, 900);
      }

      function resetGlitch() {
        glitch.classList.remove('active');
        glitch.style.display = 'none';
        glitch.style.opacity = '0';
      }

      // Reset glitch when returning via back button (bfcache)
      window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
          resetGlitch();
        }
      });

      // Check if this is a state/home navigation (should use SPA navigation)
      function isStateNavigation(path) {
        return path === '/' || path.startsWith('/states/');
      }

      // SPA navigation for state links - keeps video playing
      async function navigateWithoutReload(href) {
        try {
          const response = await fetch(href);
          const html = await response.text();
          const parser = new DOMParser();
          const newDoc = parser.parseFromString(html, 'text/html');

          // Update title
          document.title = newDoc.title;

          // Update tagline section
          const oldTagline = document.querySelector('section.py-12');
          const newTagline = newDoc.querySelector('section.py-12');
          if (oldTagline && newTagline) {
            oldTagline.innerHTML = newTagline.innerHTML;
          }

          // Update state filters (active state)
          const oldFilters = document.getElementById('state-filters');
          const newFilters = newDoc.getElementById('state-filters');
          if (oldFilters && newFilters) {
            oldFilters.innerHTML = newFilters.innerHTML;
          }

          // Update main content
          const oldMain = document.querySelector('main');
          const newMain = newDoc.querySelector('main');
          if (oldMain && newMain) {
            oldMain.innerHTML = newMain.innerHTML;
          }

          // Update URL
          history.pushState({}, '', href);

          // Scroll to top
          window.scrollTo(0, 0);
        } catch (error) {
          console.error('Navigation failed:', error);
          window.location.href = href;
        }
      }

      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
          e.preventDefault();
          const path = new URL(link.href).pathname;

          // Use SPA navigation for state/home links to keep video playing
          if (isStateNavigation(path)) {
            navigateWithoutReload(link.href);
          } else if (path.startsWith('/place/')) {
            // VHS glitch transition for place detail pages
            triggerGlitch(() => {
              window.location.href = link.href;
            });
          } else {
            // Full page navigation for other links
            window.location.href = link.href;
          }
        }
      });

      // Handle browser back/forward
      window.addEventListener('popstate', () => {
        navigateWithoutReload(window.location.href);
      });
    })();
  </script>

  <!-- Scroll-based state filter background -->
  <script>
    (function() {
      const filters = document.getElementById('state-filters');
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 200, 0.9);
        filters.style.background = \`rgba(10, 10, 15, \${opacity})\`;
        filters.style.backdropFilter = scrollY > 50 ? 'blur(8px)' : 'none';
      });
    })();
  </script>

  <!-- Dust Particles in Light Cone -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
  <script defer>
    (function() {
      const isMobile = window.innerWidth < 768;
      const canvas = document.getElementById('dust-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Reduce particles on mobile for performance
      const particleCount = isMobile ? 80 : 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        // Spread particles randomly across the entire scene
        positions[i * 3] = (Math.random() - 0.5) * 20;     // X: full width
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16; // Y: full height
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z: depth

        // Float randomly in all directions with slight variation in speed
        velocities.push({
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.006,
          z: (Math.random() - 0.5) * 0.003
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = 32;
      particleCanvas.height = 32;
      const pCtx = particleCanvas.getContext('2d');
      const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 32, 32);
      const particleTexture = new THREE.CanvasTexture(particleCanvas);

      const material = new THREE.PointsMaterial({
        color: 0xc8d8e8,
        size: 0.06,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      function animate() {
        requestAnimationFrame(animate);

        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;

          // Wrap around all directions
          if (positions[i * 3] > 10) positions[i * 3] = -10;
          if (positions[i * 3] < -10) positions[i * 3] = 10;
          if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
          if (positions[i * 3 + 1] < -10) positions[i * 3 + 1] = 10;
          if (positions[i * 3 + 2] > 5) positions[i * 3 + 2] = -5;
          if (positions[i * 3 + 2] < -5) positions[i * 3 + 2] = 5;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();

    // Ghostly wisps
    (function() {
      const canvas = document.createElement('canvas');
      canvas.id = 'wisp-canvas';
      canvas.style.cssText = 'position:fixed;inset:0;z-index:2;pointer-events:none;';
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      const wisps = [];

      function spawnWisp() {
        const segments = [];
        const numSegments = 4 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numSegments; i++) {
          segments.push({
            offsetX: (Math.random() - 0.5) * 40,
            offsetY: i * 20,
            size: 25 + Math.random() * 30,
            drift: Math.random() * Math.PI * 2
          });
        }
        wisps.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 50,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.3 - Math.random() * 0.2,
          opacity: 0,
          phase: 'fadein',
          life: 0,
          maxLife: 600 + Math.random() * 400,
          segments: segments,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.006 + Math.random() * 0.006
        });
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Very rare spawn - roughly every 15-20 seconds
        if (Math.random() < 0.001 && wisps.length < 2) {
          spawnWisp();
        }

        for (let i = wisps.length - 1; i >= 0; i--) {
          const wisp = wisps[i];
          wisp.life++;
          wisp.wobble += wisp.wobbleSpeed;

          // Fade in/out - more subtle
          if (wisp.phase === 'fadein') {
            wisp.opacity = Math.min(wisp.opacity + 0.003, 0.15);
            if (wisp.opacity >= 0.15) wisp.phase = 'alive';
          } else if (wisp.life > wisp.maxLife - 150) {
            wisp.opacity = Math.max(wisp.opacity - 0.002, 0);
          }

          // Movement
          wisp.x += wisp.vx + Math.sin(wisp.wobble) * 0.2;
          wisp.y += wisp.vy;

          // Draw wispy segments
          for (let j = 0; j < wisp.segments.length; j++) {
            const seg = wisp.segments[j];
            seg.drift += 0.01;
            const sx = wisp.x + seg.offsetX + Math.sin(seg.drift) * 15;
            const sy = wisp.y - seg.offsetY;
            const segOpacity = wisp.opacity * (1 - j * 0.12);

            // Draw stretched, blurry ellipse
            ctx.save();
            ctx.translate(sx, sy);
            ctx.scale(1.8, 1);
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, seg.size);
            gradient.addColorStop(0, \`rgba(180, 195, 210, \${segOpacity * 0.5})\`);
            gradient.addColorStop(0.4, \`rgba(150, 170, 190, \${segOpacity * 0.25})\`);
            gradient.addColorStop(0.7, \`rgba(120, 145, 170, \${segOpacity * 0.1})\`);
            gradient.addColorStop(1, 'rgba(120, 145, 170, 0)');
            ctx.beginPath();
            ctx.arc(0, 0, seg.size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
          }

          if (wisp.life > wisp.maxLife || wisp.y < -200) {
            wisps.splice(i, 1);
          }
        }

        requestAnimationFrame(animate);
      }
      animate();
    })();

    // Noise-based fog shader (disabled on mobile for performance)
    (function() {
      const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const canvas = document.getElementById('fog-canvas');

      // Skip fog animation on mobile - too CPU intensive
      if (isMobile) {
        canvas.style.display = 'none';
        return;
      }

      const ctx = canvas.getContext('2d');

      function resize() {
        canvas.width = window.innerWidth / 4;  // Lower res for performance
        canvas.height = window.innerHeight / 4;
      }
      resize();
      window.addEventListener('resize', resize);

      // Simplex noise implementation
      const perm = new Uint8Array(512);
      const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
      for (let i = 0; i < 256; i++) perm[i] = perm[i + 256] = Math.floor(Math.random() * 256);

      function dot(g, x, y) { return g[0]*x + g[1]*y; }

      function noise(x, y) {
        const F2 = 0.5 * (Math.sqrt(3) - 1);
        const G2 = (3 - Math.sqrt(3)) / 6;
        const s = (x + y) * F2;
        const i = Math.floor(x + s), j = Math.floor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t, Y0 = j - t;
        const x0 = x - X0, y0 = y - Y0;
        const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
        const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2*G2, y2 = y0 - 1 + 2*G2;
        const ii = i & 255, jj = j & 255;
        const gi0 = perm[ii + perm[jj]] % 12;
        const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
        const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
        let n0 = 0, n1 = 0, n2 = 0;
        let t0 = 0.5 - x0*x0 - y0*y0;
        if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot(grad3[gi0], x0, y0); }
        let t1 = 0.5 - x1*x1 - y1*y1;
        if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot(grad3[gi1], x1, y1); }
        let t2 = 0.5 - x2*x2 - y2*y2;
        if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot(grad3[gi2], x2, y2); }
        return 70 * (n0 + n1 + n2);
      }

      let time = 0;
      function animate() {
        time += 0.003;
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const nx = x * 0.02;
            const ny = y * 0.02;
            // Layer multiple octaves for more organic look
            const n = noise(nx + time, ny + time * 0.5) * 0.5 +
                      noise(nx * 2 + time * 0.7, ny * 2) * 0.25 +
                      noise(nx * 4 - time * 0.3, ny * 4 + time * 0.2) * 0.125;
            const v = Math.max(0, Math.min(255, (n + 0.5) * 80));
            const i = (y * canvas.width + x) * 4;
            data[i] = v * 0.8;     // R - slight blue tint
            data[i + 1] = v * 0.85; // G
            data[i + 2] = v;        // B
            data[i + 3] = v * 0.6;  // A
          }
        }
        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(animate);
      }
      animate();
    })();
  </script>

  <!-- Glitch Headline Effect -->
  <script>
    (function() {
      const headline = document.getElementById('glitch-headline');
      if (!headline) return;

      function triggerGlitch() {
        headline.classList.add('glitching');
        setTimeout(() => {
          headline.classList.remove('glitching');
        }, 300);
      }

      // Random glitches every 3-8 seconds
      function scheduleGlitch() {
        const delay = 3000 + Math.random() * 5000;
        setTimeout(() => {
          triggerGlitch();
          // Sometimes double-glitch for extra creepiness
          if (Math.random() < 0.3) {
            setTimeout(triggerGlitch, 150);
          }
          scheduleGlitch();
        }, delay);
      }

      // Initial glitch after 1 second
      setTimeout(triggerGlitch, 1000);
      scheduleGlitch();
    })();
  </script>

  <!-- Donkey Scare Script -->
  <script>
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

// Render states index page (when no slug provided)
function renderStatesIndexPage(states, totalPlaces, baseUrl) {
  const statesWithData = states.map(s => ({
    code: s.state,
    name: stateNames[s.state] || s.state,
    url: stateUrls[s.state] || s.state.toLowerCase(),
    count: s.place_count
  })).sort((a, b) => b.count - a.count);

  const stateCardsHtml = statesWithData.map(state => `
    <a href="/states/${state.url}" class="group">
      <div class="aspect-[4/3] overflow-hidden bg-dark-card mb-3 flex items-center justify-center">
        <span class="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">&#128123;</span>
      </div>
      <h3 class="text-sm font-medium group-hover:text-accent transition-colors">${state.name}</h3>
      <p class="text-xs text-ghost">${state.count} haunted ${state.count === 1 ? 'place' : 'places'}</p>
    </a>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Haunted Places by State - Browse All ${states.length} States | SpookFinder</title>
  <meta name="description" content="Explore ${totalPlaces} haunted places across ${states.length} US states. Browse haunted hotels, cemeteries, mansions, and more by state.">
  <meta property="og:title" content="Haunted Places by State | SpookFinder">
  <meta property="og:description" content="Explore ${totalPlaces} haunted places across ${states.length} US states.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/states">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Haunted Places by State | SpookFinder">
  <link rel="canonical" href="${baseUrl}/states">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${baseUrl}"},{"@type":"ListItem","position":2,"name":"States"}]}
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
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 9999;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
    }
    .smoke-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      pointer-events: none;
    }
    html { background: #0a0a0f; overflow-x: hidden; }
    @media (max-width: 768px) {
      nav a { padding: 12px 8px; min-height: 44px; display: inline-flex; align-items: center; }
    }
    .glitch-text {
      position: relative;
      animation: flicker 4s infinite;
    }
    .glitch-text::before, .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .glitch-text::before { color: #ff0040; z-index: -1; }
    .glitch-text::after { color: #00ffff; z-index: -2; }
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
    #dust-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    #fog-canvas { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.3; }
  </style>
</head>
<body class="text-gray-100 min-h-screen">
  <video class="smoke-video" autoplay muted loop playsinline>
    <source src="/smoke-bg.mp4" type="video/mp4">
  </video>
  <svg style="position:absolute;width:0;height:0;">
    <defs>
      <filter id="grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" result="noise"/>
        <feColorMatrix in="noise" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0" result="grainFaded"/>
        <feBlend in="SourceGraphic" in2="grainFaded" mode="multiply"/>
      </filter>
    </defs>
  </svg>
  <canvas id="dust-canvas"></canvas>
  <canvas id="fog-canvas"></canvas>
  <header>
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="text-white">States</a>
        <a href="/about" class="hover:text-white transition-colors">About</a>
      </nav>
    </div>
  </header>
  <section class="py-12 text-center">
    <h1 id="glitch-headline" class="glitch-text text-3xl md:text-4xl lg:text-5xl" style="font-family: 'Creepster', cursive;" data-text="Browse by State">Browse by State</h1>
    <p class="text-ghost text-sm mt-2">${totalPlaces} haunted locations across ${states.length} states</p>
  </section>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
      ${stateCardsHtml}
    </div>
  </main>
  <footer class="mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center">
        <p class="text-gray-300 text-sm">Documenting America's most haunted locations, one ghost story at a time.</p>
      </div>
    </div>
  </footer>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
  <script defer>
    (function() {
      const isMobile = window.innerWidth < 768;
      const canvas = document.getElementById('dust-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      const particleCount = isMobile ? 80 : 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        velocities.push({ x: (Math.random() - 0.5) * 0.006, y: (Math.random() - 0.5) * 0.006, z: (Math.random() - 0.5) * 0.003 });
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = 32; particleCanvas.height = 32;
      const pCtx = particleCanvas.getContext('2d');
      const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = gradient; pCtx.fillRect(0, 0, 32, 32);
      const particleTexture = new THREE.CanvasTexture(particleCanvas);
      const material = new THREE.PointsMaterial({ color: 0xc8d8e8, size: 0.06, transparent: true, opacity: 0.5, sizeAttenuation: true, map: particleTexture, blending: THREE.AdditiveBlending, depthWrite: false });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      function animate() {
        requestAnimationFrame(animate);
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;
          if (positions[i * 3] > 10) positions[i * 3] = -10;
          if (positions[i * 3] < -10) positions[i * 3] = 10;
          if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
          if (positions[i * 3 + 1] < -10) positions[i * 3 + 1] = 10;
          if (positions[i * 3 + 2] > 5) positions[i * 3 + 2] = -5;
          if (positions[i * 3 + 2] < -5) positions[i * 3 + 2] = 5;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      }
      animate();
      window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
    })();
  </script>
  <script>
    (function() {
      const headline = document.getElementById('glitch-headline');
      if (!headline) return;
      function triggerGlitch() { headline.classList.add('glitching'); setTimeout(() => { headline.classList.remove('glitching'); }, 300); }
      function scheduleGlitch() { const delay = 3000 + Math.random() * 5000; setTimeout(() => { triggerGlitch(); if (Math.random() < 0.3) { setTimeout(triggerGlitch, 150); } scheduleGlitch(); }, delay); }
      setTimeout(triggerGlitch, 1000);
      scheduleGlitch();
    })();
  </script>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { env, request, params } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  // Get the state slug from the URL
  const slugParts = params.slug;

  // If no slug, render the states index page
  if (!slugParts || slugParts.length === 0) {
    try {
      const { results: states } = await env.DB.prepare(`
        SELECT state, COUNT(*) as place_count
        FROM places
        GROUP BY state
        ORDER BY state
      `).all();
      const totalPlaces = states.reduce((sum, s) => sum + s.place_count, 0);
      const html = renderStatesIndexPage(states || [], totalPlaces, baseUrl);
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    } catch (error) {
      console.error('Error rendering states index:', error);
      return new Response('Error loading states page', { status: 500 });
    }
  }

  const stateSlug = slugParts[0];
  const stateCode = urlToStateCode[stateSlug];

  if (!stateCode) {
    return new Response('State not found', { status: 404 });
  }

  const stateName = stateNames[stateCode];

  try {
    // Fetch places for this state
    const { results: places } = await env.DB.prepare(`
      SELECT slug, name, city, state, category, image_url
      FROM places
      WHERE state = ?
      ORDER BY city, name
    `).bind(stateCode).all();

    // Fetch all state counts for the filter bar
    const { results: states } = await env.DB.prepare(`
      SELECT state, COUNT(*) as place_count
      FROM places
      GROUP BY state
      ORDER BY state
    `).all();

    // Render the state page
    const html = renderStatePage(stateCode, stateName, places || [], states || [], baseUrl);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error rendering state page:', error);
    return new Response('Error loading state page', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
