// GET /audio/* - Serve audio files from R2 bucket
// Example: /audio/rain-loop.mp3

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MIME_TYPES = {
  'mp3': 'audio/mpeg',
  'ogg': 'audio/ogg',
  'wav': 'audio/wav',
  'webm': 'audio/webm',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const { env, params } = context;

  const pathParts = params.path;
  if (!pathParts || pathParts.length === 0) {
    return new Response('Audio path required', { status: 400, headers: CORS_HEADERS });
  }

  const key = 'audio/' + pathParts.join('/');

  try {
    const object = await env.IMAGES.get(key);

    if (!object) {
      return new Response('Audio not found', { status: 404, headers: CORS_HEADERS });
    }

    const ext = key.split('.').pop()?.toLowerCase();
    const contentType = MIME_TYPES[ext] || 'audio/mpeg';

    const headers = new Headers({
      ...CORS_HEADERS,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': object.httpEtag,
    });

    if (object.size) {
      headers.set('Content-Length', object.size.toString());
    }

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Error fetching audio from R2:', error);
    return new Response('Failed to fetch audio', { status: 500, headers: CORS_HEADERS });
  }
}
