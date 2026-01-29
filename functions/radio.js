// GET /radio - Ghost Story Radio
// Vinyl turntable player with video background and ElevenLabs TTS narration

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  try {
    const { results } = await env.DB.prepare(
      `SELECT slug, name, city, state, ghost_story, image_url
       FROM places
       WHERE ghost_story IS NOT NULL AND ghost_story != '' AND image_url IS NOT NULL AND image_url != ''
       ORDER BY
         CASE WHEN slug IN ('thomas-house-hotel','lilburn-mansion','historic-licking-county-jail') THEN 0 ELSE 1 END,
         RANDOM()`
    ).all();

    if (!results || results.length === 0) {
      return new Response('No stories available', { status: 404 });
    }

    const html = renderRadioPage(results, baseUrl);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (error) {
    console.error('Radio page error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

function renderRadioPage(places, baseUrl) {
  const placesJson = JSON.stringify(places.map(p => ({
    slug: p.slug,
    name: p.name,
    city: p.city,
    state: p.state,
    story: p.ghost_story,
    image: p.image_url ? `${baseUrl}/images/${p.image_url}` : null
  })));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ghost Story Radio - Haunted Tales on Demand | Spookfinder</title>
  <meta name="description" content="Listen to ghost stories narrated over atmospheric ambient audio. A lo-fi haunts experience with rain, wind, and real paranormal tales from across America.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0c12; font-family: 'Inter', sans-serif; overflow: hidden; height: 100vh; }

    /* Video Background */
    .video-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
    }
    .video-bg video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.4;
    }

    /* Overlay */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 1;
      background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%);
    }

    /* Main content */
    .content {
      position: relative;
      z-index: 10;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
    }

    /* Nav */
    .nav {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .nav a:hover { color: white; }
    .nav .logo { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; color: white; }
    .nav-links { display: flex; gap: 24px; }

    /* Turntable */
    .turntable {
      position: relative;
      width: 320px;
      height: 320px;
      cursor: pointer;
      user-select: none;
    }

    @media (min-width: 768px) {
      .turntable { width: 400px; height: 400px; }
    }

    /* Vinyl Record */
    .vinyl {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background:
        radial-gradient(circle, #1a1a1a 18%, transparent 18.5%),
        radial-gradient(circle, transparent 19%, #111 19.5%, #111 20%, transparent 20.5%),
        radial-gradient(circle, transparent 35%, rgba(30,30,30,0.5) 35.5%, rgba(30,30,30,0.5) 36%, transparent 36.5%),
        radial-gradient(circle, transparent 48%, rgba(25,25,25,0.4) 48.5%, rgba(25,25,25,0.4) 49%, transparent 49.5%),
        radial-gradient(circle, transparent 60%, rgba(30,30,30,0.5) 60.5%, rgba(30,30,30,0.5) 61%, transparent 61.5%),
        radial-gradient(circle, transparent 72%, rgba(25,25,25,0.4) 72.5%, rgba(25,25,25,0.4) 73%, transparent 73.5%),
        radial-gradient(circle, transparent 84%, rgba(30,30,30,0.5) 84.5%, rgba(30,30,30,0.5) 85%, transparent 85.5%),
        radial-gradient(circle, transparent 93%, rgba(20,20,20,0.8) 93.5%, rgba(20,20,20,0.8) 94%, #0a0a0a 94.5%),
        conic-gradient(from 0deg, #1a1a1a, #222, #1a1a1a, #222, #1a1a1a, #222, #1a1a1a, #222, #1a1a1a, #222, #1a1a1a, #222);
      box-shadow: 0 0 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5);
      animation: spin 3s linear infinite;
      animation-play-state: paused;
      transition: box-shadow 0.5s;
    }

    .vinyl.playing {
      animation-play-state: running;
      box-shadow: 0 0 80px rgba(233, 69, 96, 0.15), inset 0 0 30px rgba(0,0,0,0.5);
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Record Label */
    .label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 35%;
      height: 35%;
      border-radius: 50%;
      background: radial-gradient(circle, #2a1a1a 0%, #1a0a0a 70%, #0a0505 100%);
      border: 2px solid #333;
      overflow: hidden;
      pointer-events: none;
    }

    .label img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(70%);
      opacity: 0;
      transition: opacity 0.5s;
    }

    .label img.visible {
      opacity: 1;
    }

    .label-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #333;
      border: 1px solid #444;
      z-index: 1;
    }


    /* Place Info */
    .place-info {
      margin-top: 40px;
      text-align: center;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s, transform 0.5s;
    }

    .place-info.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .place-name {
      font-size: 18px;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
      letter-spacing: 0.5px;
    }

    .place-location {
      font-size: 13px;
      color: rgba(255,255,255,0.4);
      margin-top: 4px;
    }

    .place-status {
      font-size: 11px;
      color: #e94560;
      margin-top: 8px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    /* Play hint */
    .play-hint {
      position: absolute;
      bottom: 40px;
      font-size: 12px;
      color: rgba(255,255,255,0.3);
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: opacity 0.5s;
    }

    .play-hint.hidden { opacity: 0; }
  </style>
</head>
<body>

  <!-- Video Background -->
  <div class="video-bg">
    <video autoplay muted loop playsinline>
      <source src="/fire-bg.mp4" type="video/mp4">
    </video>
  </div>

  <!-- Dark overlay -->
  <div class="overlay"></div>

  <!-- Content -->
  <div class="content">

    <!-- Nav -->
    <nav class="nav">
      <a href="/" class="logo">SPOOKFINDER</a>
      <div class="nav-links">
        <a href="/states">States</a>
        <a href="/category">Categories</a>
        <a href="/tours">Tours</a>
        <a href="/about">About</a>
      </div>
    </nav>

    <!-- Turntable -->
    <div class="turntable" id="turntable">
      <div class="vinyl" id="vinyl">
        <div class="label">
          <img id="label-image" src="" alt="">
          <div class="label-dot"></div>
        </div>
      </div>
    </div>

    <!-- Place info -->
    <div class="place-info" id="place-info">
      <div class="place-name" id="place-name"></div>
      <div class="place-location" id="place-location"></div>
      <div class="place-status" id="place-status"></div>
    </div>

    <!-- Hint -->
    <div class="play-hint" id="play-hint">Click the record to play</div>
  </div>

  <script>
    const places = ${placesJson};
    let currentIndex = 0;
    let isPlaying = false;
    let ambientAudios = [];
    let narrationRetries = 0;
    const MAX_RETRIES = 2;

    const narrationAudio = new Audio();
    narrationAudio.preload = 'none';

    const vinyl = document.getElementById('vinyl');
    const turntable = document.getElementById('turntable');
    const placeInfo = document.getElementById('place-info');
    const placeName = document.getElementById('place-name');
    const placeLocation = document.getElementById('place-location');
    const placeStatus = document.getElementById('place-status');
    const playHint = document.getElementById('play-hint');
    const labelImage = document.getElementById('label-image');

    // Ambient audio
    const ambientFiles = ['/audio/rain-loop.mp3', '/audio/wind-loop.mp3', '/audio/creak-loop.mp3'];

    function initAmbient() {
      ambientFiles.forEach(src => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0;
        ambientAudios.push(audio);
      });
    }

    function fadeInAmbient() {
      ambientAudios.forEach((audio, i) => {
        audio.play().catch(() => {});
        const multipliers = [1, 0.6, 0.3];
        const target = 0.35 * multipliers[i];
        let vol = 0;
        const fade = setInterval(() => {
          vol = Math.min(vol + 0.01, target);
          audio.volume = vol;
          if (vol >= target) clearInterval(fade);
        }, 50);
      });
    }

    function fadeOutAmbient() {
      ambientAudios.forEach(audio => {
        let vol = audio.volume;
        const fade = setInterval(() => {
          vol = Math.max(vol - 0.02, 0);
          audio.volume = vol;
          if (vol <= 0) { clearInterval(fade); audio.pause(); }
        }, 50);
      });
    }

    // Narration
    function playNarration(slug, onEnd) {
      placeStatus.textContent = 'Loading...';

      narrationAudio.src = '/api/tts/' + slug;
      narrationAudio.volume = 0.85;

      narrationAudio.oncanplay = function() {
        placeStatus.textContent = 'Now playing';
        narrationRetries = 0;
        narrationAudio.play().catch(() => {});
      };

      narrationAudio.onended = function() {
        if (onEnd) onEnd();
      };

      narrationAudio.onerror = function() {
        if (narrationRetries < MAX_RETRIES) {
          narrationRetries++;
          placeStatus.textContent = 'Retrying...';
          setTimeout(() => {
            if (!isPlaying) return;
            narrationAudio.src = '/api/tts/' + slug;
            narrationAudio.load();
          }, 5000);
        } else {
          narrationRetries = 0;
          placeStatus.textContent = 'Skipping...';
          setTimeout(() => { if (onEnd) onEnd(); }, 2000);
        }
      };

      narrationAudio.load();
    }

    function stopNarration() {
      narrationAudio.pause();
      narrationAudio.currentTime = 0;
      narrationAudio.oncanplay = null;
      narrationAudio.onended = null;
      narrationAudio.onerror = null;
    }

    // Show place info
    function showPlace(index) {
      const place = places[index];
      placeName.textContent = place.name;
      placeLocation.textContent = place.city + ', ' + place.state;
      placeInfo.classList.add('visible');

      if (place.image) {
        labelImage.src = place.image;
        labelImage.classList.add('visible');
      }
    }

    // Play story
    function playStory() {
      showPlace(currentIndex);
      const place = places[currentIndex];

      playNarration(place.slug, () => {
        if (!isPlaying) return;
        placeStatus.textContent = '';
        setTimeout(() => {
          if (!isPlaying) return;
          currentIndex = (currentIndex + 1) % places.length;
          playStory();
        }, 3000);
      });
    }

    // Toggle play/stop
    function play() {
      isPlaying = true;
      vinyl.classList.add('playing');
      playHint.classList.add('hidden');

      fadeInAmbient();
      setTimeout(() => {
        if (isPlaying) playStory();
      }, 1500);
    }

    function stop() {
      isPlaying = false;
      vinyl.classList.remove('playing');
      placeStatus.textContent = '';
      placeInfo.classList.remove('visible');
      labelImage.classList.remove('visible');

      stopNarration();
      fadeOutAmbient();
    }

    turntable.addEventListener('click', () => {
      if (isPlaying) stop();
      else play();
    });

    // Init
    initAmbient();
    showPlace(0);
  </script>
  <script>(function(){if(sessionStorage.getItem('_gh'))return;sessionStorage.setItem('_gh','1');setTimeout(function(){console.log("%c    .-.\\n   (o o)\\n   | O |\\n   |   |\\n   '~~~'\\n\\n  You shouldn't be here.","color:#e94560;font-size:14px;font-family:monospace;line-height:1.4;")},3e3)})()</script>
</body>
</html>`;
}
