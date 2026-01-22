// GET /api/tour-operators/cities - List all cities with tour operator counts
// Query params: state (optional filter)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const state = url.searchParams.get('state');

  try {
    let query = `
      SELECT
        city,
        state,
        COUNT(*) as operator_count,
        SUM(featured) as featured_count
      FROM tour_operators
    `;
    const params = [];

    if (state) {
      query += ' WHERE state = ?';
      params.push(state.toUpperCase());
    }

    query += ' GROUP BY city, state ORDER BY operator_count DESC, city';

    const stmt = env.DB.prepare(query);
    const { results } = params.length > 0
      ? await stmt.bind(...params).all()
      : await stmt.all();

    return Response.json({ data: results }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error fetching tour operator cities:', error);
    return Response.json(
      { error: 'Failed to fetch tour operator cities' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
