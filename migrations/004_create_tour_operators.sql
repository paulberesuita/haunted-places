CREATE TABLE tour_operators (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  website TEXT,
  booking_url TEXT,
  description TEXT,
  price_range TEXT,
  tour_types TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tour_operators_state ON tour_operators(state);
CREATE INDEX idx_tour_operators_city ON tour_operators(city);
