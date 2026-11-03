import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import { config, PUBLIC_DIR } from './config.js';
import crypto from 'node:crypto';
import { get, site, postLead, NotFound, clearCache, packsApi } from './api.js';
import { abs, slugify } from './lib.js';
import home from './pages/home.js';
import pricingPage from './pages/pricing.js';
import { contactPage, demoPage, thanksPage } from './pages/forms.js';
import { blogList, blogPost, rss } from './pages/blog.js';
import { legalPage, aboutPage, notFoundPage } from './pages/static.js';

/* ============================================================
   oximuspro.com

   Every page is rendered here, on the server, so search engines get
   complete HTML with its title, description, canonical address and
   structured data. Content that changes (blog, legal pages, pricing,
   contact details) comes from the Oximus Pro API and is edited in the
   platform console; forms post back here and are forwarded to it.

   Runs inside the API server (src/index.js hands it every request for
   the website's address), so one process serves the API, the web app
   and the website.
   ============================================================ */

const app = express();
app.disable('x-powered-by');

app.use(helmet({
  // Images are previewed inside the platform console on another origin.
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'data:', 'https:'],
      /* Google Analytics and the LinkedIn Insight Tag (site-public/js/tracking.js). */
      'script-src': ["'self'", 'https://www.googletagmanager.com', 'https://snap.licdn.com'],
      'style-src': ["'self'", "'unsafe-inline'"],
      'font-src': ["'self'"],
      'connect-src': ["'self'", 'https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://www.googletagmanager.com', 'https://*.ads.linkedin.com', 'https://*.licdn.com'],
      'frame-ancestors': ["'none'"],
      'form-action': ["'self'"],
      'upgrade-insecure-requests': config.isProd ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
}));

/* Static files: fingerprinted by ?v= in the page, so they can be cached hard. */
app.use(express.static(PUBLIC_DIR, {
  index: false,
  maxAge: config.isProd ? '30d' : 0,
  setHeaders(res, file) {
    if (/\.(woff2|webp|jpg|png)$/.test(file)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  },
}));
app.use(express.urlencoded({ extended: false, limit: '32kb' }));
app.use(express.json({ limit: '32kb' }));

const send = (res, htmlStr, status = 200) => {
  res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' }).send(htmlStr);
};
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/* ---------- old addresses from the static site ---------- */
const LEGACY = { '/index.html': '/', '/about.html': '/about', '/contact.html': '/contact', '/terms.html': '/terms', '/privacy.html': '/privacy-policy', '/refunds.html': '/refund-policy', '/delivery.html': '/refund-policy', '/privacy': '/privacy-policy', '/refunds': '/refund-policy', '/demo': '/book-a-demo', '/signup': '/pricing', '/signup/done': '/pricing', '/terms-and-conditions': '/terms', '/cancellation-and-refund-policy': '/refund-policy',
  '/acceptable-use': '/acceptable-use-policy', '/cookies': '/cookie-policy', '/dpa': '/data-processing-agreement',
  /* launch-draft blog addresses */
  '/blog/proxy-interview-fraud-india': '/blog/proxy-interview-detection',
  '/blog/invisible-interview-copilots-screen-share-blind-spot': '/blog/can-interviewers-detect-cluely-interview-coder',
  '/blog/deepfake-candidates-remote-hiring': '/blog/deepfake-job-interview-fake-candidates',
  '/blog/remote-technical-interviews-that-cannot-be-gamed': '/blog/video-interview-software-guide',
  '/blog/campus-hiring-online-assessment-proctoring': '/blog/online-proctoring-software-guide' };
app.use((req, res, next) => {
  if (LEGACY[req.path]) return res.redirect(301, LEGACY[req.path]);
  /* Invite (/i/...), phone (/c/...) and sign-in links typed on the bare
     domain belong to the web app. */
  if (/^\/(i|c|app|platform|login)(\/|$)/.test(req.path)) return res.redirect(302, `${config.appUrl}${req.originalUrl}`);
  /* One address per page: no trailing slash (except the home page). */
  if (req.path.length > 1 && req.path.endsWith('/')) return res.redirect(301, req.path.slice(0, -1) + (req.url.slice(req.path.length) || ''));
  next();
});

/* ---------- pages ---------- */
app.get('/healthz', (_req, res) => res.json({ ok: true, service: 'oximus-site' }));
app.get('/', wrap(async (_req, res) => {
  const [s, packs] = await Promise.all([site(), packsApi.packs()]);
  send(res, home(s, packs));
}));

app.get('/pricing', wrap(async (_req, res) => {
  const [s, packs] = await Promise.all([site(), packsApi.packs()]);
  send(res, pricingPage(s, s.pricing, packs));
}));

app.get('/about', wrap(async (_req, res) => send(res, aboutPage(await site()))));

app.get('/contact', wrap(async (req, res) => {
  const topic = ['question', 'quote', 'demo', 'support', 'partner'].includes(req.query.topic) ? req.query.topic : 'question';
  send(res, contactPage(await site(), { values: { topic } }));
}));

app.get('/book-a-demo', wrap(async (req, res) => {
  const plan = /^[a-z0-9-]{2,30}$/.test(req.query.plan || '') ? req.query.plan : '';
  send(res, demoPage(await site(), { values: { plan } }));
}));

app.get('/thank-you', wrap(async (req, res) => {
  res.set('X-Robots-Tag', 'noindex');
  send(res, thanksPage(await site(), req.query.type));
}));

app.get('/blog', wrap(async (req, res) => {
  const n = Math.max(1, Number(req.query.page) || 1);
  const [s, data] = await Promise.all([site(), get(`/posts?limit=10&page=${n}`)]);
  if (n > data.pages) return notFound(req, res);
  send(res, blogList(s, data));
}));

app.get('/blog/rss.xml', wrap(async (_req, res) => {
  const index = await get('/index');
  res.set('Content-Type', 'application/rss+xml; charset=utf-8').set('Cache-Control', 'public, max-age=600').send(rss(index));
}));

app.get('/blog/category/:cat', wrap(async (req, res) => {
  const s = await site();
  const all = await get('/posts?limit=1');
  const name = all.categories.find((c) => slugify(c) === req.params.cat);
  if (!name) return notFound(req, res);
  const n = Math.max(1, Number(req.query.page) || 1);
  const data = await get(`/posts?limit=12&page=${n}&category=${encodeURIComponent(name)}`);
  send(res, blogList(s, data, { category: req.params.cat }));
}));

app.get('/blog/:slug', wrap(async (req, res) => {
  try {
    const [s, data] = await Promise.all([site(), get(`/posts/${encodeURIComponent(req.params.slug)}`)]);
    send(res, blogPost(s, data));
  } catch (e) {
    if (e instanceof NotFound) return notFound(req, res);
    throw e;
  }
}));

/* Legal and other CMS pages live at the top level: /terms, /privacy-policy … */
app.get('/:slug([a-z0-9-]{2,60})', wrap(async (req, res, next) => {
  try {
    const [s, data] = await Promise.all([site(), get(`/pages/${req.params.slug}`)]);
    send(res, legalPage(s, data.page));
  } catch (e) {
    if (e instanceof NotFound) return next();
    throw e;
  }
}));

/* ---------- forms ---------- */
const FIELDS = ['type', 'name', 'email', 'phone', 'company', 'role', 'topic', 'teamSize', 'volume', 'hiringFor', 'preferredDate', 'preferredTime', 'message', 'plan', 'page', 'website'];

function readForm(body, type) {
  const v = {};
  for (const k of FIELDS) if (typeof body[k] === 'string') v[k] = body[k].trim().slice(0, k === 'message' ? 4000 : 300);
  v.type = type;
  const utm = {};
  for (const k of ['source', 'medium', 'campaign']) if (body[`utm_${k}`]) utm[k] = String(body[`utm_${k}`]).slice(0, 100);
  return { values: v, utm };
}

function quickCheck(v) {
  const e = {};
  if (!v.name || v.name.length < 2) e.name = 'Enter your name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email || '')) e.email = 'Enter an email address we can reply to';
  if (v.type === 'demo' && !v.company) e.company = 'Enter your company';
  if (v.type === 'contact' && (!v.message || v.message.length < 10)) e.message = 'Tell us a little about what you need';
  return e;
}

const wantsJson = (req) => (req.get('accept') || '').includes('application/json');

function formHandler(type) {
  return wrap(async (req, res) => {
    const { values, utm } = readForm(req.body || {}, type);
    let errors = quickCheck(values);
    let formError;
    if (!Object.keys(errors).length) {
      const { website, ...payload } = values;
      const r = await postLead({ ...payload, ...(website ? { website } : {}), utm, referrer: String(req.get('referer') || '').slice(0, 400) }, { ip: req.ip, ua: req.get('user-agent') });
      if (r.ok) {
        const to = `/thank-you${type === 'demo' ? '?type=demo' : ''}`;
        return wantsJson(req) ? res.json({ ok: true, redirect: to }) : res.redirect(303, to);
      }
      errors = r.data?.details || {};
      formError = r.status === 429 ? r.data?.error : (Object.keys(errors).length ? 'Please check the highlighted fields.' : (r.data?.error || 'We could not send your message just now. Please email us instead.'));
    } else formError = 'Please check the highlighted fields.';
    if (wantsJson(req)) return res.status(422).json({ ok: false, errors, error: formError });
    const s = await site();
    send(res, (type === 'demo' ? demoPage : contactPage)(s, { values, errors, formError }), 422);
  });
}
app.post('/contact', formHandler('contact'));
app.post('/book-a-demo', formHandler('demo'));

/* ---------- media uploaded in the console ---------- */
app.get('/media/:id([a-f0-9]{24})', wrap(async (req, res) => {
  const r = await fetch(`${config.apiUrl}/api/public/media/${req.params.id}`);
  if (!r.ok) return res.status(r.status === 404 ? 404 : 502).end();
  res.set('Content-Type', r.headers.get('content-type') || 'image/jpeg');
  res.set('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(await r.arrayBuffer()));
}));

/* ---------- search engines ---------- */
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /thank-you\nDisallow: /media/\n\nSitemap: ${abs('/sitemap.xml')}\n`);
});

app.get('/sitemap.xml', wrap(async (_req, res) => {
  const index = await get('/index');
  const day = (d) => (d ? new Date(d).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
  const latestPost = index.posts?.[0]?.updatedAt;
  const urls = [
    ['/', latestPost, '1.0', 'weekly'],
    ['/pricing', index.pricingUpdatedAt, '0.9', 'monthly'],
    ['/book-a-demo', null, '0.9', 'monthly'],
    ['/blog', latestPost, '0.8', 'weekly'],
    ['/about', null, '0.6', 'yearly'],
    ['/contact', null, '0.6', 'yearly'],
    ...[...new Set((index.posts || []).map((p) => p.category).filter(Boolean))].map((c) => [`/blog/category/${slugify(c)}`, latestPost, '0.5', 'weekly']),
    ...(index.posts || []).map((p) => [`/blog/${p.slug}`, p.updatedAt || p.publishedAt, '0.7', 'monthly', p.cover]),
    ...(index.pages || []).filter((p) => !p.seo?.noindex).map((p) => [`/${p.slug}`, p.updatedAt, '0.3', 'yearly']),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(([u, d, pr, cf, img]) => `<url><loc>${abs(u)}</loc><lastmod>${day(d)}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority>${img ? `<image:image><image:loc>${abs(img)}</image:loc></image:image>` : ''}</url>`).join('\n')}
</urlset>`;
  res.type('application/xml').set('Cache-Control', 'public, max-age=600').send(xml);
}));

app.get('/site.webmanifest', (_req, res) => {
  res.type('application/manifest+json').send(JSON.stringify({
    name: 'Oximus Pro', short_name: 'Oximus Pro', start_url: '/', display: 'browser', background_color: '#07152A', theme_color: '#07152A',
    icons: [{ src: '/img/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
  }));
});

/* The API calls this after an edit in the platform console. */
app.post('/__purge', (req, res) => {
  const a = Buffer.from(String(req.get('x-site-key') || ''));
  const b = Buffer.from(String(config.apiKey || ''));
  if (!b.length || a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(403).json({ ok: false });
  clearCache();
  res.json({ ok: true });
});

/* ---------- not found and errors ---------- */
async function notFound(_req, res) {
  send(res, notFoundPage(await site()), 404);
}
app.use(wrap(notFound));

// eslint-disable-next-line no-unused-vars
app.use(async (err, req, res, _next) => {
  console.error(`[site] ${req.method} ${req.path}:`, err.message);
  try { send(res, notFoundPage(await site()).replace('That page isn&#39;t here', 'Something went wrong on our side'), 500); } catch { res.status(500).send('Something went wrong'); }
});

export default app;
