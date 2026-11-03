import path from 'node:path';
import { fileURLToPath } from 'node:url';

/* The website runs inside the API server (one process). Its settings
   come from server/.env, already loaded by config/env.js. */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');   // server/
export const PUBLIC_DIR = path.join(ROOT, 'site-public');

const clean = (u) => String(u).trim().replace(/\/+$/, '');

export const config = {
  /* The address search engines and visitors see. Every canonical URL,
     sitemap entry and social preview is built from it. */
  siteUrl: clean(process.env.SITE_URL || 'http://localhost:5080'),
  /* Where the pages read their content: this same process. */
  apiUrl: clean(process.env.SITE_CONTENT_URL || `http://127.0.0.1:${Number(process.env.PORT || 5070)}`),
  /* Same value as SITE_API_KEY in server/.env. */
  apiKey: process.env.SITE_API_KEY || '',
  appUrl: clean(process.env.APP_URL || 'http://localhost:5173'),
  /* How long a page's content is reused before asking the API again. */
  cacheSeconds: Number(process.env.CACHE_SECONDS || 60),
  isProd: process.env.NODE_ENV === 'production',
};

export const COMPANY = {
  brand: 'Oximus Pro',
  legal: 'HackGeniX Tech Private Limited',
  cin: 'U62013TZ2025PTC035022',
  gstin: '33AAICH0065K1ZO',
  address: 'COWRKS, OMR, Campus 3B, Millenia Business Park, Phase 2, MGR Main Road, Kandhanchavadi, Perungudi, Chennai – 600096, Tamil Nadu, India',
  street: 'COWRKS, OMR, Campus 3B, Millenia Business Park, Phase 2, MGR Main Road, Kandhanchavadi, Perungudi',
  city: 'Chennai', region: 'Tamil Nadu', postcode: '600096', country: 'IN',
  incorporated: '2025-06-13',
  founder: 'Ravikumar S',
  parentUrl: 'https://hackgenix.com',
};
