Supabase integration scaffold

What was added:
- src/lib/supabase.ts — lightweight helper to create admin and anon clients.
- scripts/seed_supabase.sql — SQL to create site_content and news tables.
- scripts/migrate_to_supabase.js — Node script that reads local JSON files and upserts into Supabase using SERVICE_ROLE key.
- .env.example — environment variable examples.

How to use (recommended flow):
1. Create a Supabase project.
2. In your Supabase SQL editor, run scripts/seed_supabase.sql to create the schema.
3. Copy .env.example to .env and fill SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (and ANON key if needed).
4. Run migration script:
   SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/migrate_to_supabase.js
5. After migration, set SUPABASE env vars in your server (or .env) and restart the dev server.

Notes & next steps:
- This scaffold keeps the local JSON fallback so admin can continue using the current mock auth until you fully switch to Supabase Auth.
- To use Supabase Auth in admin UI, replace mock login logic with Supabase client signInWithPassword and update API auth checks to validate the Supabase access token.
- For image uploads, create a Supabase Storage bucket (e.g., bambulogy-media) and update the ImageUploader component to request signed uploads or use the Supabase client.
- For production use, rotate keys and never commit the service_role key into source control.
