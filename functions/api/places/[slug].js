// GET /api/places/:slug - Get single place by slug

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const { env, params } = context;
  const { slug } = params;

  if (!slug) {
    return Response.json(
      { error: 'Slug is required' },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  try {
    const place = await env.DB.prepare(
      'SELECT * FROM places WHERE slug = ?'
    ).bind(slug).first();

    if (!place) {
      return Response.json(
        { error: 'Place not found' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return Response.json({ data: place }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error fetching place:', error);
    return Response.json(
      { error: 'Failed to fetch place' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
