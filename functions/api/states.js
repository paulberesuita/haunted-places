// GET /api/states - List all states with place counts

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const { results } = await env.DB.prepare(`
      SELECT
        state,
        COUNT(*) as place_count
      FROM places
      GROUP BY state
      ORDER BY state
    `).all();

    return Response.json({ data: results }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error fetching states:', error);
    return Response.json(
      { error: 'Failed to fetch states' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
