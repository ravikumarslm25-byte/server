import { COMPANY } from '../config.js';
import { html, raw, photo, renderMarkdown, fillSettings, fmtDate, isoDate, abs } from '../lib.js';
import { icon } from '../ui.js';
import { page, pageHero, breadcrumbLd, ctaBand, orgLd } from '../layout.js';

/* ---------- legal pages (content from the platform console) ---------- */
export function legalPage(site, pg) {
  const filled = fillSettings(pg.body, site.settings);
  const { html: content, toc } = renderMarkdown(filled);
  const path = `/${pg.slug}`;
  const others = (site.pages || []).filter((p) => p.slug !== pg.slug);
  const body = html`
${pageHero({ crumbs: [['Home', '/'], [pg.title, path]], eyebrow: 'Legal', title: pg.title, lead: `Effective ${fmtDate(pg.effectiveDate || pg.updatedAt)} · Last updated ${fmtDate(pg.updatedAt)}` })}
<section class="sec sec--soft sec--tight-top">
  <div class="wrap legal">
    <aside class="legal__side">
      ${toc.length ? html`<nav class="glass-light toc" aria-label="On this page"><b>On this page</b><ol>${toc.filter((t) => t.depth === 2).map((t) => html`<li><a href="#${t.id}">${t.text.replace(/^\d+\.\s*/, '')}</a></li>`)}</ol></nav>` : ''}
      ${others.length ? html`<nav class="glass-light toc" aria-label="Other legal pages"><b>Other policies</b><ol class="plain">${others.map((o) => html`<li><a href="/${o.slug}">${o.title}</a></li>`)}</ol></nav>` : ''}
    </aside>
    <div class="legal__main glass-light">
      ${pg.summary ? html`<p class="legal__sum">${icon('shieldCheck', 18)} <span>${pg.summary}</span></p>` : ''}
      <div class="prose prose--legal">${raw(content)}</div>
      <p class="legal__co">${COMPANY.legal} · CIN ${COMPANY.cin} · GSTIN ${COMPANY.gstin}</p>
    </div>
  </div>
</section>`;
  const seo = pg.seo || {};
  return page({
    site, body,
    seo: {
      title: seo.title || `${pg.title} | Oximus Pro`,
      description: seo.description || pg.summary,
      keywords: seo.keywords,
      canonical: path,
      noindex: seo.noindex,
      modified: isoDate(pg.updatedAt),
      jsonld: [breadcrumbLd([['Home', '/'], [pg.title, path]]), { '@context': 'https://schema.org', '@type': 'WebPage', name: pg.title, url: abs(path), dateModified: isoDate(pg.updatedAt), publisher: { '@type': 'Organization', name: COMPANY.legal } }],
    },
  });
}

/* ---------- about ---------- */
export function aboutPage(site) {
  const body = html`
${pageHero({ crumbs: [['Home', '/'], ['About', '/about']], eyebrow: 'About us', title: 'We build hiring you can trust', lead: 'Oximus Pro is built by HackGeniX Tech Private Limited, a product engineering and technology training company based in Chennai, Tamil Nadu.' })}
<section class="sec sec--soft sec--tight-top">
  <span class="blob b1" aria-hidden="true"></span>
  <div class="wrap about-intro">
    <div class="about-ph">${photo('client-round', 'A candidate in an in-person final round with a client\'s interview panel', { sizes: '(max-width: 900px) 100vw, 45vw', eager: true })}</div>
    <div class="glass-light about-story">
      <h2>Why we built Oximus Pro</h2>
      <p>An HR consultancy told us the same story every month. A candidate cleared every online round, the consultancy shortlisted them with confidence — and in the client's office, they could not answer a simple question. The answers had come from an AI tool, a hidden screen or a stand-in.</p>
      <p>Most online interviews still run on meeting software. It shows a face and a shared window, and nothing else. We started from how a consultancy actually hires — a test to shortlist, a technical round, an HR round and a final meeting with the client — and gave every online round a second camera, signals the panel can review, and a scorecard. The final round gets a short check built from what the candidate said before.</p>
      <p>Oximus Pro is built on ExamProbe, the online examination and AI proctoring platform HackGeniX built for universities, and shares its video and proctoring core.</p>
    </div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <div class="head head--c"><span class="eyebrow">How we build</span><h2>Four rules you can hold us to.</h2></div>
    <div class="values">
      ${[['userCheck', 'Signals, not verdicts', 'The software records what it sees. People decide what it means.'], ['eye', 'Say what it cannot do', 'We say where a browser\'s reach ends, and what is on the roadmap rather than in the product.'], ['shield', 'Tell the candidate first', 'What is watched and what is kept is on the candidate\'s first screen, before they agree to start.'], ['lock', 'Keep as little as works', 'No video recording. Pictures are kept only as long as each company decides, on servers in India.']].map(([ic, t, d]) => html`<div class="value glass-light"><span class="tr__ic">${icon(ic, 20)}</span><h3>${t}</h3><p>${d}</p></div>`)}
    </div>
  </div>
</section>
<section class="sec sec--dark">
  <span class="glow g1" aria-hidden="true"></span>
  <div class="wrap about-co">
    <div>
      <span class="eyebrow eyebrow--dark">The company</span>
      <h2>HackGeniX Tech Private Limited</h2>
      <p class="muted-d">Founded by ${COMPANY.founder} after ten years in software engineering and technical training. HackGeniX has trained more than 30,000 learners across Tamil Nadu and delivered more than 100 software projects. Oximus Pro sits beside our other products: ExamProbe for examinations, Clan Owl for real estate, TealMonk for hospitals and Junior Octo for schools.</p>
      <a class="link-arrow link-arrow--dark" href="${COMPANY.parentUrl}" target="_blank" rel="noopener">Visit hackgenix.com ${icon('arrow', 15)}</a>
    </div>
    <dl class="facts-list glass-dark">
      <div><dt>Product</dt><dd>Oximus Pro</dd></div>
      <div><dt>Company</dt><dd>${COMPANY.legal}</dd></div>
      <div><dt>Incorporated</dt><dd>13 June 2025</dd></div>
      <div><dt>CIN</dt><dd>${COMPANY.cin}</dd></div>
      <div><dt>GSTIN</dt><dd>${COMPANY.gstin}</dd></div>
      <div><dt>Registered office</dt><dd>${COMPANY.address}</dd></div>
      <div><dt>Office</dt><dd>COWRKS, Millenia Business Park, OMR, Perungudi, Chennai 600096</dd></div>
    </dl>
  </div>
</section>
${ctaBand()}`;
  return page({
    site, active: 'about', body,
    seo: {
      title: 'About Oximus Pro | AI Interview Monitoring by HackGeniX',
      description: 'Oximus Pro is built by HackGeniX Tech Private Limited, Chennai, to stop AI-assisted answers and proxy candidates in online interviews.',
      keywords: ['about Oximus Pro', 'HackGeniX', 'interview monitoring company India', 'ExamProbe'],
      canonical: '/about',
      jsonld: [orgLd(site.settings), breadcrumbLd([['Home', '/'], ['About', '/about']]), { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Oximus Pro', url: abs('/about') }],
    },
  });
}

/* ---------- 404 ---------- */
export function notFoundPage(site) {
  const body = html`
${pageHero({ title: 'That page isn\'t here', lead: 'The address may be mistyped, or the page may have moved.' })}
<section class="sec sec--soft sec--tight-top"><div class="wrap thanks">
  <a class="glass-light thanks__card" href="/">${icon('arrow', 20)}<b>Home</b><span>AI interview monitoring for hiring teams.</span></a>
  <a class="glass-light thanks__card" href="/blog">${icon('file', 20)}<b>Blog</b><span>Guides on AI cheating and proxy interviews.</span></a>
  <a class="glass-light thanks__card" href="/contact">${icon('mail', 20)}<b>Contact</b><span>Ask us anything.</span></a>
</div></section>`;
  return page({ site, body, seo: { title: 'Page not found | Oximus Pro', description: 'That page could not be found.', canonical: '/404', noindex: true } });
}
