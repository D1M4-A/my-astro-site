import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';
import { getSupabaseAdmin } from '../../lib/supabase';

const CONTENT_DIR = path.resolve(process.cwd(), 'src', 'content', 'site');
const ALLOWED_SLUGS = new Set([
  'header', 'hero', 'about', 'businessUnits', 'brands', 'statistics', 'sustainability', 'news', 'footer'
]);

async function readContentFile(slug: string) {
  const file = path.join(CONTENT_DIR, `${slug}.json`);
  const raw = await fs.readFile(file, 'utf-8');
  return JSON.parse(raw);
}

async function writeContentFile(slug: string, data: any) {
  const file = path.join(CONTENT_DIR, `${slug}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

const SUPABASE_ENABLED = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  let slug = url.searchParams.get('slug');
  if (!slug) {
    const parts = (url.pathname || '').split('/').filter(Boolean);
    slug = parts.length ? parts[parts.length - 1] : null;
  }
  if (!slug || !ALLOWED_SLUGS.has(slug)) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  // If Supabase is configured, try to read from site_content table first
  if (SUPABASE_ENABLED) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase.from('site_content').select('data').eq('slug', slug).limit(1).single();
        if (!error && data && data.data) {
          return new Response(JSON.stringify(data.data), { status: 200 });
        }
      }
    } catch (err) {
      // Fall back to file read below if Supabase read fails
      console.warn('Supabase read failed, falling back to local files:', String(err));
    }
  }

  try {
    const content = await readContentFile(slug === 'businessUnits' ? 'businessUnits' : slug);
    return new Response(JSON.stringify(content), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unable to read content', details: String(err) }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  let slug = url.searchParams.get('slug');
  if (!slug) {
    const parts = (url.pathname || '').split('/').filter(Boolean);
    slug = parts.length ? parts[parts.length - 1] : null;
  }
  if (!slug || !ALLOWED_SLUGS.has(slug)) {
    return new Response(JSON.stringify({ error: 'Not allowed' }), { status: 403 });
  }

  // Simple token check — replace with real auth in future
  // Accept either 'Bearer mock-token:<email>' or legacy '******<email>' formats.
  const authHeaderRaw = (request.headers.get('authorization') || '');
  let token = authHeaderRaw;
  if (authHeaderRaw.toLowerCase().startsWith('bearer ')) token = authHeaderRaw.slice(7);
  let userEmail = '';

  // Development convenience: if no token is provided in non-production, allow writes using the first admin user
  if ((!token || token === '') && process.env.NODE_ENV !== 'production') {
    try {
      const usersRaw = await fs.readFile(path.resolve(process.cwd(), 'src', 'content', 'site', 'users.json'), 'utf-8');
      const usersJson = JSON.parse(usersRaw).users || [];
      const adminUser = usersJson.find((u: any) => u.role === 'admin');
      if (adminUser) {
        userEmail = adminUser.email;
      }
    } catch (e) {
      // ignore and continue to the normal checks below
    }
  }

  if (!userEmail) {
    if (token.startsWith('mock-token:')) {
      userEmail = token.slice('mock-token:'.length);
    } else if (token.startsWith('******')) {
      userEmail = token.slice('******'.length);
    } else {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  }

  // Verify user exists and has admin role (local users.json)
  try {
    const usersRaw = await fs.readFile(path.resolve(process.cwd(), 'src', 'content', 'site', 'users.json'), 'utf-8');
    const usersJson = JSON.parse(usersRaw).users || [];
    // debug log
    try { await fs.appendFile(path.resolve(process.cwd(), 'logs', 'auth-save-debug.log'), `[${new Date().toISOString()}] slug=${slug} authHeaderRaw=${authHeaderRaw} token=${token} userEmail=${userEmail} users=${JSON.stringify(usersJson.map(u=>u.email))}\n`); } catch(e){}
    const user = usersJson.find((u: any) => u.email === userEmail && u.role === 'admin');
    try { await fs.appendFile(path.resolve(process.cwd(), 'logs', 'auth-save-debug.log'), `[${new Date().toISOString()}] found=${JSON.stringify(user)}\n`); } catch(e){}
    if (!user) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Auth verification failed', details: String(err) }), { status: 500 });
  }

  try {
    const payload = await request.json();

    // If Supabase is configured, write there as the source of truth (but keep local file fallback)
    if (SUPABASE_ENABLED) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          const upsert = await supabase.from('site_content').upsert({ slug, data: payload }, { onConflict: 'slug' });
          if (upsert.error) {
            console.warn('Supabase upsert error:', upsert.error);
            // Fall through to write local file as fallback
          } else {
            return new Response(JSON.stringify({ success: true, source: 'supabase' }), { status: 200 });
          }
        }
      } catch (err) {
        console.warn('Supabase write failed, falling back to local file:', String(err));
      }
    }

    await writeContentFile(slug === 'businessUnits' ? 'businessUnits' : slug, payload);
    return new Response(JSON.stringify({ success: true, source: 'local' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unable to save content', details: String(err) }), { status: 500 });
  }
};
