import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const text = await request.text();
    const hdrs: any = {};
    for (const [k,v] of request.headers) hdrs[k] = v;
    const out = { headers: hdrs, body: text };
    try { await fs.appendFile(path.resolve(process.cwd(),'logs','echo.log'), JSON.stringify(out)+"\n"); } catch(e) {}
    return new Response(JSON.stringify(out), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'echo failed', details: String(err) }), { status: 500 });
  }
};
