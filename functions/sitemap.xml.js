// GET /sitemap.xml - Generate dynamic sitemap

const stateUrls = {
  'CA': 'california',
  'CT': 'connecticut',
  'FL': 'florida',
  'GA': 'georgia',
  'IL': 'illinois',
  'KY': 'kentucky',
  'LA': 'louisiana',
  'MA': 'massachusetts',
  'MD': 'maryland',
  'NC': 'north-carolina',
  'NJ': 'new-jersey',
  'NY': 'new-york',
  'OH': 'ohio',
  'PA': 'pennsylvania',
  'SC': 'south-carolina',
  'TN': 'tennessee',
  'TX': 'texas',
  'VA': 'virginia'
};

function makeCitySlug(city, state) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + state.toLowerCase();
}

// Category URL slugs mapping
const categoryConfig = {
  'mansion': 'haunted-mansions',
  'hotel': 'haunted-hotels',
  'cemetery': 'haunted-cemeteries',
  'museum': 'haunted-museums',
  'restaurant': 'haunted-restaurants',
  'theater': 'haunted-theaters',
  'hospital': 'haunted-hospitals',
  'battlefield': 'haunted-battlefields',
  'prison': 'haunted-prisons',
  'lighthouse': 'haunted-lighthouses',
  'university': 'haunted-universities',
  'plantation': 'haunted-plantations',
  'other': 'other-haunted-places'
};

export async function onRequestGet(context) {
  const { env, request } = context;
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

    // Get tour operator cities
    const { results: tourCities } = await env.DB.prepare(`
      SELECT DISTINCT city, state
      FROM tour_operators
      ORDER BY city
    `).all();

    // Get cities with 5+ places (for city pages)
    const { results: hauntedCities } = await env.DB.prepare(`
      SELECT city, state, COUNT(*) as place_count
      FROM places
      GROUP BY city, state
      HAVING place_count >= 5
      ORDER BY place_count DESC, city
    `).all();

    // Get categories with 10+ places (for category pages)
    const { results: categories } = await env.DB.prepare(`
      SELECT category, COUNT(*) as place_count
      FROM places
      GROUP BY category
      HAVING place_count >= 10
      ORDER BY place_count DESC
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

  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/states</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/tours</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/hotels</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/cities</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/category</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- State Pages -->
`;

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
  <!-- Haunted City Pages -->
`;

    for (const { city, state } of hauntedCities) {
      const citySlug = makeCitySlug(city, state);
      xml += `  <url>
    <loc>${baseUrl}/cities/${citySlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    xml += `
  <!-- Category Pages -->
`;

    for (const { category } of categories) {
      const categorySlug = categoryConfig[category] || category;
      xml += `  <url>
    <loc>${baseUrl}/category/${categorySlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    xml += `
  <!-- Tour City Pages -->
`;

    for (const { city, state } of tourCities) {
      const citySlug = makeCitySlug(city, state);
      xml += `  <url>
    <loc>${baseUrl}/tours/${citySlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    xml += `
  <!-- Place Pages -->
`;

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
