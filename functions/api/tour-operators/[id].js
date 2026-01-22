// GET /api/tour-operators/:id - Get a single tour operator by ID

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
  const { id } = params;

  try {
    const operator = await env.DB.prepare(
      'SELECT * FROM tour_operators WHERE id = ?'
    ).bind(id).first();

    if (!operator) {
      return Response.json(
        { error: 'Tour operator not found' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return Response.json({ data: operator }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error fetching tour operator:', error);
    return Response.json(
      { error: 'Failed to fetch tour operator' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
