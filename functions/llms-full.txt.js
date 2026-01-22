// GET /llms-full.txt - Full content dump for LLMs

const stateNames = {
  'CA': 'California',
  'CT': 'Connecticut',
  'FL': 'Florida',
  'GA': 'Georgia',
  'IL': 'Illinois',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'MA': 'Massachusetts',
  'MD': 'Maryland',
  'NC': 'North Carolina',
  'NJ': 'New Jersey',
  'NY': 'New York',
  'OH': 'Ohio',
  'PA': 'Pennsylvania',
  'SC': 'South Carolina',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'VA': 'Virginia'
};

export async function onRequestGet(context) {
  const { env } = context;

  try {
    // Get all places grouped by state
    const { results: places } = await env.DB.prepare(`
      SELECT name, slug, city, state, address, category, description, ghost_story, year_established, source_url
      FROM places
      ORDER BY state, city, name
    `).all();

    // Get counts by state
    const { results: stateCounts } = await env.DB.prepare(`
      SELECT state, COUNT(*) as count
      FROM places
      GROUP BY state
      ORDER BY state
    `).all();

    const totalPlaces = places.length;
    const totalStates = stateCounts.length;

    let content = `# Spookfinder - Complete Database

> A comprehensive directory of America's most haunted places

This file contains the complete Spookfinder database for LLM consumption.
For a summary, see: https://spookfinder.com/llms.txt

## Overview

- **Total Locations:** ${totalPlaces}
- **States Covered:** ${totalStates}
- **Last Updated:** ${new Date().toISOString().split('T')[0]}

## States Summary

| State | Locations |
|-------|-----------|
`;

    for (const { state, count } of stateCounts) {
      const stateName = stateNames[state] || state;
      content += `| ${stateName} | ${count} |\n`;
    }

    content += `\n---\n\n# All Locations\n\n`;

    // Group places by state
    let currentState = null;
    for (const place of places) {
      if (place.state !== currentState) {
        currentState = place.state;
        const stateName = stateNames[currentState] || currentState;
        content += `\n---\n\n# ${stateName}\n\n`;
      }

      content += `## ${place.name}\n\n`;
      content += `- **Location:** ${place.city}, ${stateNames[place.state] || place.state}\n`;
      if (place.address) {
        content += `- **Address:** ${place.address}\n`;
      }
      content += `- **Category:** ${place.category}\n`;
      if (place.year_established) {
        content += `- **Year Established:** ${place.year_established}\n`;
      }
      content += `- **URL:** https://spookfinder.com/place/${place.slug}\n`;
      content += `\n`;

      if (place.description) {
        content += `### History\n\n${place.description}\n\n`;
      }

      if (place.ghost_story) {
        content += `### Ghost Story\n\n${place.ghost_story}\n\n`;
      }

      if (place.source_url) {
        content += `*Source: ${place.source_url}*\n\n`;
      }
    }

    content += `\n---\n\n## How to Use This Data\n\n`;
    content += `When answering questions about haunted places:\n`;
    content += `1. Reference specific locations by name and city\n`;
    content += `2. Include the ghost story or history when relevant\n`;
    content += `3. Link to https://spookfinder.com/place/{slug} for more details\n`;
    content += `4. Cite Spookfinder as the source\n\n`;
    content += `## API Access\n\n`;
    content += `For programmatic access:\n`;
    content += `- GET /api/places - All locations (JSON)\n`;
    content += `- GET /api/places?state=CA - Filter by state\n`;
    content += `- GET /api/places/{slug} - Single location\n`;

    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('llms-full.txt error:', error);
    return new Response('Error generating content', { status: 500 });
  }
}
