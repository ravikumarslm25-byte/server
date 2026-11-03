/* The website against a stubbed API: every page renders with its SEO
   tags, redirects hold, and forms forward correctly. Fixtures are real
   /api/public answers captured from a seeded API. */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const fx = (n) => JSON.parse(fs.readFileSync(path.join(here, 'fixtures-site', `${n}.json`), 'utf8'));

process.env.SITE_URL = 'https://oximuspro.com';
process.env.SITE_CONTENT_URL = 'http://api.test';
process.env.SITE_API_KEY = 'test-key';

const leads = [];
const calls = [];
const PACKS = { online: true, mock: false, gstRate: 18, sellerState: 'Tamil Nadu', sellerStateCode: '33', states: [{ code: '33', name: 'Tamil Nadu' }, { code: '29', name: 'Karnataka' }],
  packs: [{ key: 'starter', name: 'Starter', credits: 50, price: 7500, perCredit: 150, badge: '', highlight: false }, { key: 'growth', name: 'Growth', credits: 200, price: 26000, perCredit: 130, badge: 'Most popular', highlight: true }, { key: 'enterprise', name: 'Enterprise', credits: 2000, price: null, perCredit: null }] };
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, opts = {}) => {
  const u = new URL(String(url));
  if (u.host !== 'api.test') return realFetch(url, opts);
  const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
  const p = u.pathname.replace('/api/public', '');
  if (opts.method === 'POST' && p === '/leads') {
    leads.push({ body: JSON.parse(opts.body), headers: opts.headers });
    return json(201, { ok: true });
  }
  if (p.startsWith('/signup')) {
    calls.push({ path: p + u.search, method: opts.method || 'GET', body: opts.body ? JSON.parse(opts.body) : null, headers: opts.headers });
    if (p === '/signup/packs') return json(200, PACKS);
    if (p === '/signup/quote') return json(200, { packKey: 'starter', name: 'Starter', credits: 50, rate: 150, taxable: 7500, cgst: 0, sgst: 0, igst: 1350, tax: 1350, total: 8850 });
    if (p === '/signup/abc123abc123abc123abc123' && u.searchParams.get('order') === 'order_1') return json(200, { status: 'completed', email: 'a@b.co', company: 'Acme', credits: 50, invoice: { number: 'OXP/26-27/0001', total: 8850 }, loginUrl: 'https://app.test/login' });
    return json(404, { error: 'Not found' });
  }
  if (p === '/site') return json(200, fx('site'));
  if (p === '/pricing') return json(200, fx('pricing'));
  if (p === '/index') return json(200, fx('index'));
  if (p === '/posts') return json(200, fx('posts'));
  if (p === '/posts/proxy-interview-detection') return json(200, fx('post'));
  if (p === '/pages/terms') return json(200, fx('terms'));
  return json(404, { error: 'Not found' });
};

let server; let base;
before(async () => {
  const { default: app } = await import('../site/app.js');
  await new Promise((r) => { server = app.listen(0, r); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server?.close());

const get = (p, o) => realFetch(base + p, { redirect: 'manual', ...o });

test('every public page renders with title, description and canonical', async () => {
  for (const [p, canon] of [['/', '/'], ['/pricing', '/pricing'], ['/about', '/about'], ['/contact', '/contact'], ['/book-a-demo', '/book-a-demo'], ['/blog', '/blog'], ['/blog/proxy-interview-detection', '/blog/proxy-interview-detection'], ['/terms', '/terms']]) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
    const html = await res.text();
    assert.match(html, /<title>[^<]{10,}<\/title>/, `${p} title`);
    assert.match(html, /<meta name="description" content="[^"]{40,}"/, `${p} description`);
    assert.ok(html.includes(`<link rel="canonical" href="https://oximuspro.com${canon === '/' ? '/' : canon}"`), `${p} canonical`);
    assert.match(html, /application\/ld\+json/, `${p} structured data`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${p} has one h1`);
    for (const img of html.match(/<img\b[^>]*>/g) || []) assert.match(img, /\balt="/, `${p} image without alt: ${img.slice(0, 80)}`);
  }
});

test('blog post carries article markup', async () => {
  const html = await (await get('/blog/proxy-interview-detection')).text();
  assert.match(html, /"@type":"BlogPosting"/);
  assert.match(html, /property="og:type" content="article"/);
  assert.match(html, /"@type":"FAQPage"/);
});

test('footer links every legal page', async () => {
  const html = await (await get('/')).text();
  for (const slug of ['terms', 'privacy-policy', 'refund-policy', 'acceptable-use-policy', 'cookie-policy', 'data-processing-agreement']) assert.ok(html.includes(`href="/${slug}"`), slug);
});

test('old blog addresses redirect to the new posts', async () => {
  const res = await get('/blog/proxy-interview-fraud-india');
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), '/blog/proxy-interview-detection');
});

test('unknown pages are 404 and noindex', async () => {
  const res = await get('/no-such-page');
  assert.equal(res.status, 404);
  assert.match(await res.text(), /noindex/);
});

test('legacy addresses and trailing slashes redirect permanently', async () => {
  let res = await get('/privacy.html');
  assert.equal(res.status, 301); assert.equal(res.headers.get('location'), '/privacy-policy');
  res = await get('/pricing/');
  assert.equal(res.status, 301); assert.match(res.headers.get('location'), /\/pricing$/);
});

test('robots, sitemap and RSS', async () => {
  assert.match(await (await get('/robots.txt')).text(), /Sitemap: https:\/\/oximuspro\.com\/sitemap\.xml/);
  const map = await (await get('/sitemap.xml')).text();
  assert.match(map, /<loc>https:\/\/oximuspro\.com\/blog\/proxy-interview-detection<\/loc>/);
  assert.match(await (await get('/blog/rss.xml')).text(), /<rss version="2.0"/);
});

test('demo form forwards to the API with the site key and redirects', async () => {
  leads.length = 0;
  const body = new URLSearchParams({ name: 'Priya Raman', email: 'priya@talentaxis.in', company: 'TalentAxis', message: 'Hello', utm_source: 'google' });
  const res = await get('/book-a-demo', { method: 'POST', body, headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  assert.equal(res.status, 303);
  assert.match(res.headers.get('location'), /\/thank-you\?type=demo/);
  assert.equal(leads.length, 1);
  assert.equal(leads[0].headers['x-site-key'], 'test-key');
  assert.equal(leads[0].body.type, 'demo');
  assert.equal(leads[0].body.utm?.source, 'google');
});

test('a demo request without a company is re-shown with an error', async () => {
  leads.length = 0;
  const body = new URLSearchParams({ name: 'P', email: 'not-an-email' });
  const res = await get('/book-a-demo', { method: 'POST', body, headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' } });
  assert.equal(res.status, 422);
  const d = await res.json();
  assert.ok(d.errors.email);
  assert.equal(leads.length, 0);
});

test('cache purge needs the key', async () => {
  assert.equal((await get('/__purge', { method: 'POST' })).status, 403);
  assert.equal((await get('/__purge', { method: 'POST', headers: { 'x-site-key': 'test-key' } })).status, 200);
});

test('table of contents is not double-escaped', async () => {
  const { renderMarkdown } = await import('../site/lib.js');
  const { toc } = renderMarkdown("## Candidates' responsibilities");
  assert.equal(toc[0].text, "Candidates' responsibilities");
});

test('pricing shows packs without online buying; home has no buy button', async () => {
  const pricing = await (await get('/pricing')).text();
  assert.ok(pricing.includes('₹26,000'), 'price');
  assert.ok(pricing.includes('href="/book-a-demo?plan=growth"'), 'get started goes to a demo');
  assert.ok(pricing.includes('href="/contact?topic=quote"'), 'enterprise talks to sales');
  for (const p of ['/', '/pricing', '/about']) {
    const html = await (await get(p)).text();
    assert.doesNotMatch(html, /href="\/signup|Buy credits|per month|billed yearly/, `${p} has no website buying`);
  }
});

test('old sign-up address redirects to pricing; CSP allows only our scripts plus Google and LinkedIn tags', async () => {
  const res = await get('/signup?pack=growth');
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), '/pricing');
  const home = await get('/');
  const csp = home.headers.get('content-security-policy');
  assert.match(csp, /script-src 'self' https:\/\/www\.googletagmanager\.com https:\/\/snap\.licdn\.com(;|$)/);
  assert.doesNotMatch(csp, /'unsafe-inline'[^;]*;?[^;]*script/);
  const body = await home.text();
  assert.match(body, /\/js\/tracking\.js\?v=/);
  assert.doesNotMatch(body, /Salem/);
  assert.match(body, /Chennai/);
});

test('app links typed on the website address go to the web app', async () => {
  const res = await get('/i/abc123?x=1');
  assert.equal(res.status, 302);
  assert.match(res.headers.get('location'), /\/i\/abc123\?x=1$/);
});
