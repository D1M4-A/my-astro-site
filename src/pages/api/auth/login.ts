import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

const USERS_FILE = path.resolve(process.cwd(), 'src', 'content', 'site', 'users.json');

async function readUsers() {
  const raw = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(raw).users || [];
}

// Returns token format: "mock-token:<email>"
export const POST: APIRoute = async ({ request }) => {
  // POST handler remains for compatibility (best-effort parsing)

  try {
    // Parse body robustly: try JSON first, then formData — avoid relying on headers which may be missing in this environment
    let identifier;
    let password;
    try {
      try {
        const body = await request.json();
        identifier = body?.email || body?.username;
        password = body?.password;
      } catch (e1) {
        try {
          const form = await request.formData();
          identifier = form.get('email') || form.get('username');
          password = form.get('password');
        } catch (e2) {
          // nothing
        }
      }
    } catch (errParsing) {
      try { await fs.appendFile(path.resolve(process.cwd(),'logs','auth-login-raw.log'), `[${new Date().toISOString()}] PARSE_EXCEPTION: ${String(errParsing)}\n`,'utf-8') } catch(e){}
    }

    if (!identifier || !password) {
      try { await fs.appendFile(path.resolve(process.cwd(),'logs','auth-login-raw.log'), `[${new Date().toISOString()}] MISSING_BODY\n`,'utf-8') } catch(e){}
      return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
    }

    const users = await readUsers();
    // allow login by email or username
    const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const token = `mock-token:${user.email}`;
    return new Response(JSON.stringify({ token, role: user.role, expiresIn: 3600, name: user.name || '' }), { status: 200 });
  } catch (err) {
    // Log error for debugging
    try {
      const logFile = path.resolve(process.cwd(), 'logs', 'auth-login-error.log');
      await fs.mkdir(path.dirname(logFile), { recursive: true });
      const entry = `[${new Date().toISOString()}] ${String(err)}\n`;
      await fs.appendFile(logFile, entry, 'utf-8');
    } catch (logErr) {
      // ignore logging errors
    }
    // avoid leaking stack traces to client
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    try { await fs.appendFile(path.resolve(process.cwd(),'logs','auth-login-headers.log'), `[${new Date().toISOString()}] GET_URL: ${request.url}\n`,'utf-8') } catch(e){}
    const url = new URL(request.url);
    const identifier = url.searchParams.get('email') || url.searchParams.get('username');
    const password = url.searchParams.get('password');
    if (!identifier || !password) return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
    const users = await readUsers();
    const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
    if (!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    const token = `mock-token:${user.email}`;
    return new Response(JSON.stringify({ token, role: user.role, expiresIn: 3600, name: user.name || '' }), { status: 200 });
  } catch (err) {
    try { await fs.appendFile(path.resolve(process.cwd(),'logs','auth-login-raw.log'), `[${new Date().toISOString()}] GET_ERR: ${String(err)}\n`,'utf-8') } catch(e){}
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
};
