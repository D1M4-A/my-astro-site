import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

const USERS_FILE = path.resolve(process.cwd(), 'src', 'content', 'site', 'users.json');

async function readUsers() {
  const raw = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(raw).users || [];
}

async function writeUsers(users: any[]) {
  await fs.writeFile(USERS_FILE, JSON.stringify({ users }, null, 2), 'utf-8');
}

function getEmailFromAuth(header: string | null) {
  if (!header) return null;
  const prefix = 'Bearer mock-token:';
  if (!header.startsWith(prefix)) return null;
  return header.slice(prefix.length);
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('authorization');
    const email = getEmailFromAuth(authHeader);
    if (!email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const users = await readUsers();
    const requester = users.find(u => u.email === email);
    if (!requester || requester.role !== 'admin') return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    // Don't return passwords
    const safe = users.map(u => ({ email: u.email, role: u.role }));
    return new Response(JSON.stringify({ users: safe }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Could not read users', details: String(err) }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('authorization');
    const email = getEmailFromAuth(authHeader);
    if (!email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const users = await readUsers();
    const requester = users.find(u => u.email === email);
    if (!requester || requester.role !== 'admin') return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    const payload = await request.json();
    const { email: newEmail, password, role } = payload || {};
    if (!newEmail || !password || !role) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });

    if (users.find(u => u.email === newEmail)) return new Response(JSON.stringify({ error: 'User exists' }), { status: 400 });

    users.push({ email: newEmail, password, role });
    await writeUsers(users);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Could not save user', details: String(err) }), { status: 500 });
  }
};
