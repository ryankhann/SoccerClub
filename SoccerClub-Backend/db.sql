CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'player'
    CHECK (role IN ('player', 'parent', 'agent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);