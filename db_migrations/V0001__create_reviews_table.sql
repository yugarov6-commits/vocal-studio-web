CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  course TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW()
);