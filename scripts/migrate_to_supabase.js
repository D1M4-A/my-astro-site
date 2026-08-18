/*
  Migration script to push local JSON content into Supabase.
  Usage:
    SUPABASE_URL=https://xyz.supabase.co SUPABASE_SERVICE_ROLE_KEY=service_role_key node scripts/migrate_to_supabase.js

  NOTE: This script uses the Supabase service_role key and will create/insert rows in
  the public.site_content table. Run seed_supabase.sql in your Supabase SQL editor first,
  or let this script attempt to create the table automatically if permissions allow.
*/

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const CONTENT_DIR = path.resolve(process.cwd(), 'src', 'content', 'site');

async function run() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in env');
    process.exit(1);
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // create site_content table if not exists
  const createTableSql = fs.readFileSync(path.join(__dirname, 'seed_supabase.sql'), 'utf8');
  console.log('Ensuring tables exist...');
  const { error: ddlErr } = await supabase.rpc('sql', { sql: createTableSql }).catch(() => ({ error: true }));
  // Note: Some Supabase projects may not allow rpc("sql") — in that case run the SQL manually from the SQL editor.
  if (ddlErr) console.warn('Could not run SQL via RPC. If tables do not exist, run scripts/seed_supabase.sql in Supabase SQL editor.');

  // Read all json files and upsert into site_content
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const slug = path.basename(file, '.json');
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    let data = null;
    try { data = JSON.parse(raw); } catch (e) { console.warn(`Skipping ${file}: invalid JSON`); continue; }
    console.log(`Upserting ${slug}...`);
    const { error } = await supabase.from('site_content').upsert({ slug, data }).catch(err => ({ error: err }));
    if (error) console.error('Error upserting', slug, error);
  }
  console.log('Migration complete. Verify your data in Supabase.');
}

run().catch(err => { console.error(err); process.exit(1); });
