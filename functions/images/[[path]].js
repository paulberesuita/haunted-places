// GET /images/* - Serve images from R2 bucket
// Example: /images/eastern-state-penitentiary.jpg

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Map file extensions to MIME types
const MIME_TYPES = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'avif': 'image/avif',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const { env, params } = context;

  // [[path]] captures everything after /images/ as an array
  const pathParts = params.path;
  if (!pathParts || pathParts.length === 0) {
    return new Response('Image path required', {
      status: 400,
      headers: CORS_HEADERS
    });
  }

  // Join path parts to get the full object key
  const key = pathParts.join('/');

  try {
    // Fetch the object from R2
    const object = await env.IMAGES.get(key);

    if (!object) {
      return new Response('Image not found', {
        status: 404,
        headers: CORS_HEADERS
      });
    }

    // Determine content type from file extension
    const ext = key.split('.').pop()?.toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Return the image with appropriate headers
    const headers = new Headers({
      ...CORS_HEADERS,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable', // 1 year cache
      'ETag': object.httpEtag,
    });

    // Add content length if available
    if (object.size) {
      headers.set('Content-Length', object.size.toString());
    }

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Error fetching image from R2:', error);
    return new Response('Failed to fetch image', {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}
