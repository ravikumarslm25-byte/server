import { config, COMPANY } from './config.js';
import { html, raw, esc, abs, waLink } from './lib.js';
import { icon } from './ui.js';

/* ============================================================
   The page shell: <head> with every SEO tag, header, footer.
   ============================================================ */

const NAV = [
  { href: '/#platform', label: 'Platform', key: 'home' },
  { href: '/#integrity', label: 'Integrity', key: 'home' },
  { href: '/pricing', label: 'Pricing', key: 'pricing' },
  { href: '/blog', label: 'Resources', key: 'blog' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/contact', label: 'Contact', key: 'contact' },
];

/* ---------- structured data ---------- */
export const ORG_ID = `${config.siteUrl}/#organization`;

export function orgLd(settings = {}) {
  const sameAs = [settings.linkedin, settings.twitter, settings.youtube, settings.instagram].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: COMPANY.brand,
    legalName: COMPANY.legal,
    url: `${config.siteUrl}/`,
    logo: abs('/img/icon-512.png'),
    foundingDate: COMPANY.incorporated,
    founder: { '@type': 'Person', name: COMPANY.founder },
    parentOrganization: { '@type': 'Organization', name: COMPANY.legal, url: COMPANY.parentUrl },
    address: { '@type': 'PostalAddress', streetAddress: COMPANY.street, addressLocality: COMPANY.city, addressRegion: COMPANY.region, postalCode: COMPANY.postcode, addressCountry: COMPANY.country },
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: settings.salesEmail || undefined, telephone: settings.phone || undefined, areaServed: 'IN', availableLanguage: ['en', 'ta', 'hi'] }],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

export const faqLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const ldScript = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/* ---------- head ---------- */
function head({ seo, settings }) {
  const d = settings.defaultSeo || {};
  const title = seo.title || d.title || 'Oximus Pro — AI Interview Monitoring & Online Assessment Platform';
  const description = seo.description || d.description || '';
  const keywords = (seo.keywords && seo.keywords.length ? seo.keywords : d.keywords || []).join(', ');
  const canonical = abs(seo.canonical || '/');
  const image = abs(seo.image || '/img/og-default.jpg');
  const robots = seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}
<meta name="robots" content="${robots}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="en-IN" href="${esc(canonical)}">
<link rel="alternate" hreflang="x-default" href="${esc(canonical)}">
<meta name="author" content="${esc(seo.author || COMPANY.legal)}">
<meta name="theme-color" content="#FFFFFF">
<meta name="format-detection" content="telephone=no">
${seo.refresh ? `<meta http-equiv="refresh" content="${Number(seo.refresh)}">` : ''}
<meta property="og:site_name" content="Oximus Pro">
<meta property="og:locale" content="en_IN">
<meta property="og:type" content="${esc(seo.ogType || 'website')}">
<meta property="og:title" content="${esc(seo.ogTitle || title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(seo.imageAlt || 'Oximus Pro — AI interview monitoring')}">
${seo.published ? `<meta property="article:published_time" content="${esc(seo.published)}">` : ''}
${seo.modified ? `<meta property="article:modified_time" content="${esc(seo.modified)}">` : ''}
${seo.section ? `<meta property="article:section" content="${esc(seo.section)}">` : ''}
${(seo.tags || []).map((t) => `<meta property="article:tag" content="${esc(t)}">`).join('\n')}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(seo.ogTitle || title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/img/favicon-192.png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Oximus Pro blog" href="/blog/rss.xml">
<link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${seo.preload || ''}
<link rel="stylesheet" href="/css/site.css?v=${ASSET_V}">
${(seo.jsonld || []).map(ldScript).join('\n')}`;
}

export const ASSET_V = '1.3.0';

/* ---------- header ---------- */
function header(active, settings) {
  const ann = settings.announcement?.active && settings.announcement?.text
    ? html`<div class="ann">${settings.announcement.link ? html`<a href="${settings.announcement.link}">${settings.announcement.text} ${icon('arrow', 14)}</a>` : settings.announcement.text}</div>`
    : '';
  return html`${ann}<a class="skip" href="#main">Skip to content</a>
<header class="nav" id="nav">
  <div class="wrap nav__row">
    <a class="nav__logo" href="/" aria-label="Oximus Pro home"><img src="/img/logo.png" alt="Oximus Pro" width="154" height="30"></a>
    <nav class="nav__links" id="nav-links" aria-label="Main">
      ${NAV.map((n) => html`<a href="${n.href}"${n.key === active && !n.href.includes('#') ? raw(' aria-current="page"') : ''}>${n.label}</a>`)}
      <a class="nav__m-only" href="${config.appUrl}/login">Sign in</a>
      <a class="btn btn--primary nav__m-only" href="/book-a-demo">Book a demo</a>
    </nav>
    <div class="nav__right">
      <a class="nav__signin" href="${config.appUrl}/login">Sign in</a>
      <a class="btn btn--primary btn--sm" href="/book-a-demo">Book a demo</a>
    </div>
    <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">${icon('list', 20)}</button>
  </div>
</header>`;
}

/* ---------- footer ---------- */
function footer(settings, pages = []) {
  const legal = [['terms', 'Terms and Conditions'], ['privacy-policy', 'Privacy Policy'], ['refund-policy', 'Cancellation & Refund'], ['acceptable-use-policy', 'Acceptable Use'], ['cookie-policy', 'Cookie Policy'], ['data-processing-agreement', 'Data Processing (DPA)']]
    .filter(([slug]) => !pages.length || pages.some((p) => p.slug === slug));
  const social = [['linkedin', settings.linkedin, 'LinkedIn'], ['globe', settings.twitter, 'X (Twitter)'], ['play', settings.youtube, 'YouTube'], ['sparkle', settings.instagram, 'Instagram']].filter(([, u]) => u);
  return html`<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div class="foot__brand">
        <a href="/" aria-label="Oximus Pro home"><img src="/img/logo-light.png" alt="Oximus Pro" width="164" height="32" loading="lazy"></a>
        <p>AI interview monitoring and online assessments for HR consultancies and hiring teams. Smarter interviews. Better hiring.</p>
        ${social.length ? html`<div class="foot__social">${social.map(([ic, u, l]) => html`<a href="${u}" rel="noopener" target="_blank" aria-label="${l}">${icon(ic, 16)}</a>`)}</div>` : ''}
      </div>
      <div><h2>Product</h2><ul>
        <li><a href="/#integrity">AI cheating detection</a></li>
        <li><a href="/#platform">Live interviews and tests</a></li>
        <li><a href="/#see-a-round">See a round</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/book-a-demo">Book a demo</a></li>
      </ul></div>
      <div><h2>Resources</h2><ul>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/blog/how-to-detect-ai-cheating-in-online-interviews">Detect AI cheating</a></li>
        <li><a href="/blog/can-interviewers-detect-cluely-interview-coder">Detect Cluely and Interview Coder</a></li>
        <li><a href="/blog/proxy-interview-detection">Proxy interview detection</a></li>
        <li><a href="/blog/online-proctoring-software-guide">Online proctoring guide</a></li>
        <li><a href="/blog/rss.xml">RSS feed</a></li>
      </ul></div>
      <div><h2>Company</h2><ul>
        <li><a href="/about">About us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="${config.appUrl}/login">Sign in</a></li>
      </ul></div>
      <div><h2>Legal</h2><ul>
        ${legal.map(([s, t]) => html`<li><a href="/${s}">${t}</a></li>`)}
      </ul></div>
    </div>
    <div class="foot__legal">
      <span>© ${new Date().getFullYear()} ${COMPANY.legal}. CIN ${COMPANY.cin}. GSTIN ${COMPANY.gstin}.</span>
      <span>${settings.address || COMPANY.address}</span>
    </div>
  </div>
</footer>
${settings.whatsapp ? html`<a class="wa-float" href="${waLink(settings.whatsapp)}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon('wa', 22)}</a>` : ''}`;
}

/* ---------- page ---------- */
export function page({ site, seo = {}, body, active = '', bodyClass = '', scripts = [] }) {
  const settings = site?.settings || {};
  const jsonld = [...(seo.jsonld || [])];
  return `<!doctype html>
<html lang="en-IN">
<head>
${head({ seo: { ...seo, jsonld }, settings })}
</head>
<body class="${esc(bodyClass)}">
${header(active, settings)}
<main id="main">
${body}
</main>
${footer(settings, site?.pages)}
<script src="/js/site.js?v=${ASSET_V}" defer></script>
<script src="/js/tracking.js?v=${ASSET_V}" defer></script>
<noscript><img height="1" width="1" style="display:none" alt="" src="https://px.ads.linkedin.com/collect/?pid=11239361&amp;fmt=gif"></noscript>
${scripts.map((src) => `<script src="${esc(src)}?v=${ASSET_V}" defer></script>`).join('\n')}
</body>
</html>`;
}

/* ---------- shared blocks ---------- */
export function pageHero({ crumbs = [], title, lead, eyebrow, aside = '' }) {
  return html`<section class="phero">
  <div class="phero__bg" aria-hidden="true"></div>
  <div class="wrap phero__in${aside ? ' phero__in--aside' : ''}">
    <div>
      ${crumbs.length ? html`<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs.map(([name, href], i) => (i < crumbs.length - 1 ? html`<li><a href="${href}">${name}</a></li>` : html`<li aria-current="page">${name}</li>`))}</ol></nav>` : ''}
      ${eyebrow ? html`<span class="eyebrow eyebrow--dark">${eyebrow}</span>` : ''}
      <h1>${title}</h1>
      ${lead ? html`<p class="phero__lead">${lead}</p>` : ''}
    </div>
    ${aside ? raw(aside) : ''}
  </div>
</section>`;
}

export function ctaBand({ title = 'See Oximus Pro on one of your own interviews.', text = 'Book a 30-minute demo. We will set it up on one of your open roles and join your first interviews with you.' } = {}) {
  return html`<section class="cta-sec">
  <div class="wrap">
    <div class="cta">
      <div class="cta__txt">
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      <div class="cta__act">
        <a class="btn btn--teal btn--lg" href="/book-a-demo">Book a demo</a>
        <a class="btn btn--ghost-dark btn--lg" href="/contact?topic=quote">Talk to sales</a>
      </div>
    </div>
  </div>
</section>`;
}
