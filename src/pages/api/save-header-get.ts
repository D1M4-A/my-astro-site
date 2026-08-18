import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const d = url.searchParams.get('d');
    try { await fs.appendFile(path.resolve(process.cwd(),'logs','save-header-get.log'), `[${new Date().toISOString()}] d=${String(d).slice(0,200)}\n`); } catch(e){}

    let payload: any = null;
    if (d) {
      // Try robust decoding: the incoming 'd' may be percent-encoded or double-encoded.
      let candidate = d;
      try { await fs.appendFile(path.resolve(process.cwd(),'logs','save-header-get.log'), `[${new Date().toISOString()}] RAW_D_LEN=${String(d).length}\n`); } catch(e){}
      let parsed = false;
      for (let i = 0; i < 4 && !parsed; i++) {
        try {
          const json = Buffer.from(candidate, 'base64').toString('utf8');
          payload = JSON.parse(json);
          parsed = true;
          try { await fs.appendFile(path.resolve(process.cwd(),'logs','save-header-get.log'), `[${new Date().toISOString()}] DECODE_SUCCESS after ${i} decodes\n`); } catch(e){}
          break;
        } catch (err) {
          // try to percent-decode and retry
          try {
            candidate = decodeURIComponent(candidate);
            try { await fs.appendFile(path.resolve(process.cwd(),'logs','save-header-get.log'), `[${new Date().toISOString()}] DECODE_ATTEMPT ${i+1} candidate_len=${String(candidate).length}\n`); } catch(e){}
          } catch (err2) {
            // cannot decode further
            break;
          }
        }
      }
      if (!parsed) {
        try { await fs.appendFile(path.resolve(process.cwd(),'logs','save-header-get.log'), `[${new Date().toISOString()}] DECODE_FAILED\n`); } catch(e){}
      }
    } else {
      // Accept individual query params as fallback
      const siteName = url.searchParams.get('siteName');
      const logoUrl = url.searchParams.get('logoUrl');
      const ctaText = url.searchParams.get('ctaText');
      const ctaLink = url.searchParams.get('ctaLink');
      const menuRaw = url.searchParams.get('menu');
      if (!siteName && !logoUrl && !menuRaw) {
        return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
      }
      let menu = [];
      try { if (menuRaw) menu = JSON.parse(decodeURIComponent(menuRaw)); } catch (e) { menu = []; }
      payload = { siteName: siteName || '', logoUrl: logoUrl || '', cta: { text: ctaText || '', link: ctaLink || '' }, menu };
    }

    const file = path.resolve(process.cwd(), 'src', 'content', 'site', 'header.json');
    await fs.writeFile(file, JSON.stringify(payload, null, 2), 'utf-8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    try { await fs.appendFile(path.resolve(process.cwd(),'logs','save-header-get.log'), `[${new Date().toISOString()}] ERROR ${String(err)}\n`); } catch(e){}
    return new Response(JSON.stringify({ error: 'Unable to save header (get)', details: String(err) }), { status: 500 });
  }
};
