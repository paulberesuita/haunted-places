// GET /contact - Contact page with submission form
// POST /contact - Handle form submissions

function renderContactPage(baseUrl, success = false, error = null) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Submit a Haunted Place - SpookFinder</title>
  <meta name="description" content="Know of a haunted location we're missing? Submit it to SpookFinder and help us document America's most haunted places.">

  <!-- Open Graph -->
  <meta property="og:title" content="Submit a Haunted Place - SpookFinder">
  <meta property="og:description" content="Know of a haunted location we're missing? Submit it to SpookFinder.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/contact">
  <meta property="og:image" content="${baseUrl}/about-ghosts.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Submit a Haunted Place - SpookFinder">
  <meta name="twitter:description" content="Know of a haunted location we're missing? Submit it to SpookFinder.">
  <meta name="twitter:image" content="${baseUrl}/about-ghosts.png">

  <!-- Canonical -->
  <link rel="canonical" href="${baseUrl}/contact">

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
        "name": "Submit a Place"
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
    /* Smoke background video */
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
  </style>
</head>
<body class="text-gray-100 min-h-screen">
  <!-- Smoke Background Video -->
  <video class="smoke-video" autoplay muted loop playsinline>
    <source src="/smoke-bg.mp4" type="video/mp4">
  </video>

  <!-- Header -->
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

  <!-- Main Content -->
  <main class="max-w-xl mx-auto px-6 py-16 md:py-24">

    <h1 class="text-3xl md:text-4xl text-center mb-4" style="font-family: 'Creepster', cursive;">Submit a Haunted Place</h1>
    <p class="text-ghost text-center mb-12">Know of a location we're missing? Tell us about it.</p>

    ${success ? `
    <div class="bg-green-900/30 border border-green-700 rounded-lg p-6 text-center mb-8">
      <p class="text-green-400 text-lg font-medium mb-2">Thanks for your submission!</p>
      <p class="text-ghost">We'll review it and add it to SpookFinder if it checks out.</p>
      <a href="/states" class="inline-block mt-4 text-accent hover:text-accent-hover transition-colors">Explore haunted places</a>
    </div>
    ` : `
    ${error ? `
    <div class="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center mb-8">
      <p class="text-red-400">${error}</p>
    </div>
    ` : ''}

    <form method="POST" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-ghost mb-2">Place Name *</label>
        <input type="text" id="name" name="name" required
          class="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., The Stanley Hotel">
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="city" class="block text-sm font-medium text-ghost mb-2">City *</label>
          <input type="text" id="city" name="city" required
            class="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
            placeholder="e.g., Estes Park">
        </div>
        <div>
          <label for="state" class="block text-sm font-medium text-ghost mb-2">State *</label>
          <input type="text" id="state" name="state" required
            class="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
            placeholder="e.g., Colorado">
        </div>
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-ghost mb-2">Category</label>
        <select id="category" name="category"
          class="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors">
          <option value="">Select a category...</option>
          <option value="hotel">Hotel</option>
          <option value="mansion">Mansion</option>
          <option value="cemetery">Cemetery</option>
          <option value="hospital">Hospital</option>
          <option value="prison">Prison</option>
          <option value="theater">Theater</option>
          <option value="restaurant">Restaurant</option>
          <option value="museum">Museum</option>
          <option value="battlefield">Battlefield</option>
          <option value="lighthouse">Lighthouse</option>
          <option value="university">University</option>
          <option value="plantation">Plantation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-ghost mb-2">Ghost Story / Activity *</label>
        <textarea id="description" name="description" rows="4" required
          class="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="What paranormal activity has been reported? Any history or backstory?"></textarea>
      </div>

      <div>
        <label for="source" class="block text-sm font-medium text-ghost mb-2">Source / How do you know?</label>
        <input type="text" id="source" name="source"
          class="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
          placeholder="e.g., Personal experience, local news article, ghost tour">
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-ghost mb-2">Your Email (optional)</label>
        <input type="email" id="email" name="email"
          class="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
          placeholder="In case we have questions">
      </div>

      <button type="submit"
        class="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-6 rounded-lg transition-colors">
        Submit Place
      </button>
    </form>
    `}

  </main>

  <!-- Footer -->
  <footer class="mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8 border-t border-dark-border">
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
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const html = renderContactPage(baseUrl);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  try {
    const formData = await request.formData();

    const name = formData.get('name')?.trim();
    const city = formData.get('city')?.trim();
    const state = formData.get('state')?.trim();
    const category = formData.get('category')?.trim() || null;
    const description = formData.get('description')?.trim();
    const source = formData.get('source')?.trim() || null;
    const email = formData.get('email')?.trim() || null;

    // Validate required fields
    if (!name || !city || !state || !description) {
      const html = renderContactPage(baseUrl, false, 'Please fill in all required fields.');
      return new Response(html, {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Insert into submissions table
    await env.DB.prepare(`
      INSERT INTO submissions (name, city, state, category, description, source, email, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(name, city, state, category, description, source, email).run();

    const html = renderContactPage(baseUrl, true);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    const html = renderContactPage(baseUrl, false, 'Something went wrong. Please try again.');
    return new Response(html, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
