// GET /api/tts/[slug] - Serve TTS audio for a place's ghost story
// Checks R2 cache first, generates via ElevenLabs if not cached

const VOICE_ID = 'N2lVS1w4EtoT3dr4eOWO'; // Callum - Husky Trickster
const MODEL_ID = 'eleven_multilingual_v2';

export async function onRequestGet(context) {
  const { env, params } = context;
  const slug = params.slug;

  if (!slug) {
    return new Response('Slug required', { status: 400 });
  }

  const r2Key = `tts/${slug}.mp3`;

  // Check R2 cache first
  const cached = await env.IMAGES.get(r2Key);
  if (cached) {
    return new Response(cached.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': cached.httpEtag,
      }
    });
  }

  // Fetch ghost story from D1
  const place = await env.DB.prepare(
    'SELECT ghost_story FROM places WHERE slug = ?'
  ).bind(slug).first();

  if (!place || !place.ghost_story) {
    return new Response('Story not found', { status: 404 });
  }

  // Generate via ElevenLabs
  const apiKey = env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response('TTS not configured', { status: 503 });
  }

  try {
    const ttsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: place.ghost_story,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.3,
            similarity_boost: 0.5,
            style: 0.7,
          }
        })
      }
    );

    if (!ttsResponse.ok) {
      console.error('ElevenLabs error:', ttsResponse.status, await ttsResponse.text());
      return new Response('TTS generation failed', { status: 502 });
    }

    // Read the audio data
    const audioBuffer = await ttsResponse.arrayBuffer();

    // Store in R2 for future requests
    await env.IMAGES.put(r2Key, audioBuffer, {
      httpMetadata: { contentType: 'audio/mpeg' }
    });

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    });
  } catch (error) {
    console.error('TTS error:', error);
    return new Response('TTS generation failed', { status: 500 });
  }
}
