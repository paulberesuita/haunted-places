// GET /sitemap.xml - Generate dynamic sitemap

const stateUrls = {
  'CA': 'california',
  'CT': 'connecticut',
  'FL': 'florida',
  'GA': 'georgia',
  'IL': 'illinois',
  'LA': 'louisiana',
  'MA': 'massachusetts',
  'MD': 'maryland',
  'NY': 'new-york',
  'OH': 'ohio',
  'PA': 'pennsylvania',
  'SC': 'south-carolina',
  'TN': 'tennessee',
  'TX': 'texas',
  'VA': 'virginia'
};

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const baseUrl = 'https://spookfinder.com';

  try {
    // Get all places
    const { results: places } = await env.DB.prepare(`
      SELECT slug, state, created_at
      FROM places
      ORDER BY state, slug
    `).all();

    // Get unique states with places
    const { results: states } = await env.DB.prepare(`
      SELECT DISTINCT state
      FROM places
      ORDER BY state
    `).all();

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- State Pages -->
`;

    // Add state pages
    for (const { state } of states) {
      const stateUrl = stateUrls[state] || state.toLowerCase();
      xml += `  <url>
    <loc>${baseUrl}/states/${stateUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    xml += `
  <!-- Place Pages -->
`;

    // Add individual place pages
    for (const place of places) {
      const lastmod = place.created_at
        ? new Date(place.created_at).toISOString().split('T')[0]
        : today;

      xml += `  <url>
    <loc>${baseUrl}/place/${place.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Sitemap error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
