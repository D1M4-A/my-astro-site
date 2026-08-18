import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  const logsDir = path.resolve(process.cwd(), 'logs');
  try {
    // Capture headers
    const hdrs: any = {};
    for (const [k,v] of request.headers) hdrs[k] = v;
    try { await fs.appendFile(path.join(logsDir,'save-header-headers.log'), `[${new Date().toISOString()}] ${JSON.stringify(hdrs)}\n`); } catch(e){}

    // Try multiple ways to read body
    let raw = '';
    try { raw = await request.text(); } catch(e) { raw = ''; }
    try { await fs.appendFile(path.join(logsDir,'save-header-raw.log'), `[${new Date().toISOString()}] RAW_LEN=${String(raw?.length||0)} RAW_PREVIEW=${String(raw||'').slice(0,200)}\n`); } catch(e){}

    let payload: any = null;

    // 1) try JSON from raw
    if (raw && raw.trim()) {
      try { payload = JSON.parse(raw); } catch(e) { /* ignore, try other ways */ }
    }

    // 2) try formData (if client sent as form)
    if (!payload) {
      try {
        const fd = await request.formData();
        if (fd && [...fd.entries()].length) {
          payload = {};
          for (const [k,v] of fd.entries()) {
            // If value is File, skip
            if (typeof v === 'string') payload[k] = v;
          }
        }
      } catch(e) { /* ignore */ }
    }

    // 3) try query param 'd' base64 (fallback from client)
    if (!payload) {
      try {
        const url = new URL(request.url);
        const d = url.searchParams.get('d');
        if (d) {
          const json = Buffer.from(d, 'base64').toString('utf8');
          payload = JSON.parse(json);
          try { await fs.appendFile(path.join(logsDir,'save-header-raw.log'), `[${new Date().toISOString()}] GOT_QUERY_LEN=${String(d.length)}\n`); } catch(e){}
        }
      } catch(e) { /* ignore */ }
    }

    if (!payload) {
      throw new Error('Empty or invalid payload');
    }

    const file = path.resolve(process.cwd(), 'src', 'content', 'site', 'header.json');
    await fs.writeFile(file, JSON.stringify(payload, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    try { await fs.appendFile(path.join(logsDir,'save-header-error.log'), `[${new Date().toISOString()}] ${String(err)}\n`); } catch(e){}
    return new Response(JSON.stringify({ error: 'Unable to save header', details: String(err) }), { status: 500 });
  }
};
