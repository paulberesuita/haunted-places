# Feature: API Endpoints

## Why

API endpoints power all frontend pages with data from D1. Clean REST API enables future expansions (mobile app, third-party integrations).

## Requirements

- [ ] `GET /api/places` - List all places (with pagination)
- [ ] `GET /api/places?state=GA` - Filter by state
- [ ] `GET /api/places?city=Savannah` - Filter by city
- [ ] `GET /api/places?category=hotel` - Filter by category
- [ ] `GET /api/places/[slug]` - Get single place by slug
- [ ] `GET /api/states` - List all states with place counts
- [ ] `GET /api/states/[state]/cities` - List cities in a state with counts
- [ ] Response format: JSON with consistent structure
- [ ] Error handling: 404 for not found, 500 for server errors
- [ ] CORS headers for potential external use

## User Flow

1. Frontend page loads
2. JavaScript fetches data from API
3. Page renders with data

## Not Included

- Authentication (public API)
- Rate limiting (V2)
- POST/PUT/DELETE endpoints (V2)

## Open Questions

- Pagination: offset/limit or cursor-based?
- Cache headers: how aggressive?
