-- SQL seed to create a simple site_content table and a news table

-- Create site_content table: stores JSON data per slug
CREATE TABLE IF NOT EXISTS public.site_content (
  slug text PRIMARY KEY,
  data jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Create news table: structured posts (optional)
CREATE TABLE IF NOT EXISTS public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text,
  cover_url text,
  category text,
  content jsonb,
  published_at timestamptz DEFAULT now()
);

-- Ensure pgcrypto extension (for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
