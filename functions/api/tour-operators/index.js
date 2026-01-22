// GET /api/tour-operators - List all tour operators with optional filters
// Query params: state, city, featured, limit, offset

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

  // Parse query parameters
  const state = url.searchParams.get('state');
  const city = url.searchParams.get('city');
  const featured = url.searchParams.get('featured');
  const limit = Math.min(parseInt(url.searchParams.get('limit')) || 50, 100);
  const offset = parseInt(url.searchParams.get('offset')) || 0;

  try {
    // Build query dynamically based on filters
    let query = 'SELECT * FROM tour_operators WHERE 1=1';
    const params = [];

    if (state) {
      query += ' AND state = ?';
      params.push(state.toUpperCase());
    }

    if (city) {
      query += ' AND city = ?';
      params.push(city);
    }

    if (featured === 'true') {
      query += ' AND featured = 1';
    }

    query += ' ORDER BY featured DESC, state, city, name LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Execute query
    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM tour_operators WHERE 1=1';
    const countParams = [];

    if (state) {
      countQuery += ' AND state = ?';
      countParams.push(state.toUpperCase());
    }

    if (city) {
      countQuery += ' AND city = ?';
      countParams.push(city);
    }

    if (featured === 'true') {
      countQuery += ' AND featured = 1';
    }

    const countStmt = env.DB.prepare(countQuery);
    const countResult = await countStmt.bind(...countParams).first();

    return Response.json({
      data: results,
      meta: {
        total: countResult.total,
        limit,
        offset,
        hasMore: offset + results.length < countResult.total
      }
    }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Error fetching tour operators:', error);
    return Response.json(
      { error: 'Failed to fetch tour operators' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
