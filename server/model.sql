CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) NOT NULL UNIQUE, -- Stores Google user ID
  email VARCHAR(255) NOT NULL UNIQUE, -- Stores user's email address
  name TEXT, -- Stores user's full name (optional)
  given_name TEXT, -- Stores user's given name (optional)
  family_name TEXT, -- Stores user's family name (optional)
  locale TEXT, -- Stores user's preferred language (optional)
  picture URL, -- Stores URL to user's profile picture (optional)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
