// GET /api/places - List all places with optional filters
// Query params: state, city, category, limit, offset

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
  const category = url.searchParams.get('category');
  const limit = Math.min(parseInt(url.searchParams.get('limit')) || 50, 100);
  const offset = parseInt(url.searchParams.get('offset')) || 0;

  try {
    // Build query dynamically based on filters
    let query = 'SELECT * FROM places WHERE 1=1';
    const params = [];

    if (state) {
      query += ' AND state = ?';
      params.push(state.toUpperCase());
    }

    if (city) {
      query += ' AND city = ?';
      params.push(city);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category.toLowerCase());
    }

    query += ' ORDER BY state, city, name LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Execute query
    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM places WHERE 1=1';
    const countParams = [];

    if (state) {
      countQuery += ' AND state = ?';
      countParams.push(state.toUpperCase());
    }

    if (city) {
      countQuery += ' AND city = ?';
      countParams.push(city);
    }

    if (category) {
      countQuery += ' AND category = ?';
      countParams.push(category.toLowerCase());
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
    console.error('Error fetching places:', error);
    return Response.json(
      { error: 'Failed to fetch places' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
