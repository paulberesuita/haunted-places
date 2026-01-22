// GET /states - States index page listing all states

const stateNames = {
  'CA': 'California',
  'CT': 'Connecticut',
  'FL': 'Florida',
  'GA': 'Georgia',
  'IL': 'Illinois',
  'LA': 'Louisiana',
  'MA': 'Massachusetts',
  'MD': 'Maryland',
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
  'LA': 'louisiana',
  'MA': 'massachusetts',
  'MD': 'maryland',
  'NY': 'new-york',
  'OH': 'ohio',
  'PA': 'pennsylvania',
  'SC': 'south-carolina',
  'TN': 'tennessee',
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

  // States with woodcut etching icons
  const stateIcons = ['MA'];

  const stateCardsHtml = statesWithData.map(state => {
    const hasIcon = stateIcons.includes(state.code);
    return `
    <a href="/states/${state.url}" class="group">
      <div class="aspect-[4/3] overflow-hidden bg-dark-card mb-3 rounded-lg ${hasIcon ? '' : 'flex items-center justify-center'}">
        ${hasIcon
          ? `<img src="/icons/states/${state.code}.png" alt="${state.name}" class="w-full h-full object-cover group-hover:opacity-80 transition-opacity" loading="lazy">`
          : `<span class="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">&#128123;</span>`
        }
      </div>
      <h3 class="text-sm font-medium group-hover:text-accent transition-colors">${state.name}</h3>
      <p class="text-xs text-ghost">${state.count} haunted ${state.count === 1 ? 'place' : 'places'}</p>
    </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Haunted Places by State - Browse All ${states.length} States | SpookFinder</title>
  <meta name="description" content="Explore ${totalPlaces} haunted places across ${states.length} US states. Browse haunted hotels, cemeteries, mansions, and more by state.">
  <!-- DEPLOY_MARKER_20260122_1335 -->

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
    /* Canvas layers */
    #dust-canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    #fog-canvas {
      position: fixed;
      inset: 0;
      z-index: 1;
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

  <canvas id="dust-canvas"></canvas>
  <canvas id="fog-canvas"></canvas>

  <!-- Header -->
  <header>
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="text-2xl tracking-widest" style="font-family: 'Bebas Neue', sans-serif;">SPOOKFINDER</a>
      <nav class="flex gap-6 text-sm text-ghost">
        <a href="/states" class="text-white">States</a>
        <a href="/about" class="hover:text-white transition-colors">About</a>
      </nav>
    </div>
  </header>

  <!-- Tagline -->
  <section class="py-12 text-center">
    <h1 id="glitch-headline" class="glitch-text text-3xl md:text-4xl lg:text-5xl" style="font-family: 'Creepster', cursive;" data-text="Browse by State">Browse by State</h1>
    <p class="text-ghost text-sm mt-2">${totalPlaces} haunted locations across ${states.length} states</p>
  </section>

  <!-- State Cards Grid -->
  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
      ${stateCardsHtml}
    </div>
  </main>

  <!-- Footer -->
  <footer class="mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center">
        <p class="text-gray-300 text-sm">
          Documenting America's most haunted locations, one ghost story at a time.
        </p>
      </div>
    </div>
  </footer>

  <!-- Dust Particles -->
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
        if (Math.random() < 0.001 && wisps.length < 2) {
          spawnWisp();
        }
        for (let i = wisps.length - 1; i >= 0; i--) {
          const wisp = wisps[i];
          wisp.life++;
          wisp.wobble += wisp.wobbleSpeed;
          if (wisp.phase === 'fadein') {
            wisp.opacity = Math.min(wisp.opacity + 0.003, 0.15);
            if (wisp.opacity >= 0.15) wisp.phase = 'alive';
          } else if (wisp.life > wisp.maxLife - 150) {
            wisp.opacity = Math.max(wisp.opacity - 0.002, 0);
          }
          wisp.x += wisp.vx + Math.sin(wisp.wobble) * 0.2;
          wisp.y += wisp.vy;
          for (let j = 0; j < wisp.segments.length; j++) {
            const seg = wisp.segments[j];
            seg.drift += 0.01;
            const sx = wisp.x + seg.offsetX + Math.sin(seg.drift) * 15;
            const sy = wisp.y - seg.offsetY;
            const segOpacity = wisp.opacity * (1 - j * 0.12);
            ctx.save();
            ctx.translate(sx, sy);
            ctx.scale(1.8, 1);
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, seg.size);
            gradient.addColorStop(0, 'rgba(180, 195, 210, ' + (segOpacity * 0.5) + ')');
            gradient.addColorStop(0.4, 'rgba(150, 170, 190, ' + (segOpacity * 0.25) + ')');
            gradient.addColorStop(0.7, 'rgba(120, 145, 170, ' + (segOpacity * 0.1) + ')');
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

    // Noise-based fog shader (disabled on mobile)
    (function() {
      const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const canvas = document.getElementById('fog-canvas');
      if (isMobile) {
        canvas.style.display = 'none';
        return;
      }
      const ctx = canvas.getContext('2d');

      function resize() {
        canvas.width = window.innerWidth / 4;
        canvas.height = window.innerHeight / 4;
      }
      resize();
      window.addEventListener('resize', resize);

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
            const n = noise(nx + time, ny + time * 0.5) * 0.5 +
                      noise(nx * 2 + time * 0.7, ny * 2) * 0.25 +
                      noise(nx * 4 - time * 0.3, ny * 4 + time * 0.2) * 0.125;
            const v = Math.max(0, Math.min(255, (n + 0.5) * 80));
            const i = (y * canvas.width + x) * 4;
            data[i] = v * 0.8;
            data[i + 1] = v * 0.85;
            data[i + 2] = v;
            data[i + 3] = v * 0.6;
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

      function scheduleGlitch() {
        const delay = 3000 + Math.random() * 5000;
        setTimeout(() => {
          triggerGlitch();
          if (Math.random() < 0.3) {
            setTimeout(triggerGlitch, 150);
          }
          scheduleGlitch();
        }, delay);
      }

      setTimeout(triggerGlitch, 1000);
      scheduleGlitch();
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
