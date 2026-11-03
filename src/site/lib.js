import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { config } from './config.js';

/* ---------- escaping ---------- */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const attr = esc;

/* Tagged template that escapes interpolations unless wrapped in raw(). */
class Raw { constructor(v) { this.v = v; } toString() { return this.v; } }
export const raw = (v) => new Raw(v ?? '');
export function html(strings, ...vals) {
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < vals.length) {
      const v = vals[i];
      if (v == null || v === false) return;
      if (Array.isArray(v)) out += v.map((x) => (x instanceof Raw ? x.v : String(x))).join('');
      else if (v instanceof Raw) out += v.v;
      else out += esc(v);
    }
  });
  return raw(out);
}

export const abs = (p) => (/^https?:\/\//.test(p || '') ? p : `${config.siteUrl}${p?.startsWith('/') ? '' : '/'}${p || ''}`);

export const slugify = (s = '') => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

export function fmtDate(d, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', ...opts });
}
export const isoDate = (d) => (d ? new Date(d).toISOString() : undefined);

/* ---------- placeholders in CMS text ---------- */
export function fillSettings(text, settings = {}) {
  const missing = (label) => `<span class="ph-missing">${label}</span>`;
  const map = {
    salesEmail: settings.salesEmail ? `[${settings.salesEmail}](mailto:${settings.salesEmail})` : missing('sales email'),
    supportEmail: settings.supportEmail ? `[${settings.supportEmail}](mailto:${settings.supportEmail})` : missing('support email'),
    privacyEmail: settings.privacyEmail ? `[${settings.privacyEmail}](mailto:${settings.privacyEmail})` : missing('privacy email'),
    phone: settings.phone || missing('phone number'),
    grievanceOfficer: settings.grievanceOfficer || missing('Grievance Officer name'),
    address: settings.address || 'COWRKS, OMR, Campus 3B, Millenia Business Park, Phase 2, MGR Main Road, Kandhanchavadi, Perungudi, Chennai – 600096, Tamil Nadu, India',
  };
  return String(text || '').replace(/\{\{(\w+)\}\}/g, (m, k) => (k in map ? map[k] : m));
}

/* ---------- Markdown ---------- */
/* Headings get stable ids so they can be linked and listed in a table
   of contents; links leaving the site open safely; images load lazily.
   The output is sanitised: content is edited by HackGeniX staff only,
   but a pasted snippet should never be able to run script on the site. */
export function renderMarkdown(md) {
  const toc = [];
  const seen = new Map();
  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        /* Plain text for ids and the table of contents. Entities are
           decoded here because the template escapes the text again. */
        const plain = text.replace(/<[^>]+>/g, '')
          .replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        let id = slugify(plain) || `section-${toc.length + 1}`;
        const n = seen.get(id) || 0; seen.set(id, n + 1); if (n) id = `${id}-${n}`;
        if (depth === 2 || depth === 3) toc.push({ id, text: plain, depth });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith(config.siteUrl);
        return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
      },
      image({ href, title, text }) {
        return `<img src="${esc(href)}" alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy" decoding="async">`;
      },
    },
  });
  const dirty = marked.parse(String(md || '')).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  const clean = sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span', 'figure', 'figcaption', 'del']),
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'loading', 'decoding', 'width', 'height'],
      '*': ['id', 'class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  });
  return { html: clean, toc };
}

export const plainText = (md, n = 160) => String(md || '').replace(/[#*_>`~]|\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim().slice(0, n);

/* ---------- images ---------- */
/* Photos ship as WebP at several widths with a JPEG fallback. */
const PHOTOS = {
  candidate: { w: 1280, h: 853 }, 'side-view': { w: 1280, h: 853 }, 'two-screens': { w: 1280, h: 853 },
  'tablet-ai': { w: 1280, h: 853 }, 'client-round': { w: 1280, h: 853 }, panel: { w: 1280, h: 853 },
  hired: { w: 1280, h: 853 }, reading: { w: 1280, h: 853 },
};
export function photo(name, alt, { sizes = '(max-width: 760px) 100vw, 50vw', cls = '', eager = false, priority = false } = {}) {
  const p = PHOTOS[name];
  const set = [480, 800, 1280].map((w) => `/img/${name}-${w}.webp ${w}w`).join(', ');
  return raw(`<picture class="${esc(cls)}"><source type="image/webp" srcset="${set}" sizes="${esc(sizes)}"><img src="/img/${name}.jpg" alt="${esc(alt)}" width="${p.w}" height="${p.h}" ${eager ? '' : 'loading="lazy" '}decoding="async"${priority ? ' fetchpriority="high"' : ''}></picture>`);
}

/* Blog cover: /img/blog/x.jpg (bundled) or /media/<id> (uploaded). */
export function cover(src, alt, { sizes = '(max-width: 760px) 100vw, 33vw', eager = false } = {}) {
  if (!src) return raw('');
  const m = /^\/img\/blog\/([\w-]+)\.jpg$/.exec(src);
  if (m) {
    return raw(`<picture><source type="image/webp" srcset="/img/blog/${m[1]}-600.webp 600w, /img/blog/${m[1]}.webp 1200w" sizes="${esc(sizes)}"><img src="${esc(src)}" alt="${esc(alt || '')}" width="1200" height="630" ${eager ? '' : 'loading="lazy" '}decoding="async"></picture>`);
  }
  return raw(`<img src="${esc(src)}" alt="${esc(alt || '')}" width="1200" height="630" ${eager ? '' : 'loading="lazy" '}decoding="async">`);
}

export const waLink = (digits, text = 'Hi, I would like to know more about Oximus Pro.') =>
  (digits ? `https://wa.me/${String(digits).replace(/\D/g, '')}?text=${encodeURIComponent(text)}` : '');
