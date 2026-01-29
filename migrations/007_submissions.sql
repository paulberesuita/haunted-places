-- Submissions table for user-submitted haunted places
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  category TEXT,
  description TEXT NOT NULL,
  source TEXT,
  email TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL
);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
