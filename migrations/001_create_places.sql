CREATE TABLE places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  state TEXT NOT NULL DEFAULT 'GA',
  latitude REAL,
  longitude REAL,
  category TEXT,
  description TEXT,
  ghost_story TEXT,
  year_established INTEGER,
  source_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_places_state ON places(state);
CREATE INDEX idx_places_city ON places(city);
CREATE INDEX idx_places_category ON places(category);
CREATE INDEX idx_places_slug ON places(slug);
