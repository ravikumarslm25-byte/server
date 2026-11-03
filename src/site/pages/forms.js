import { config } from '../config.js';
import { html, raw, esc, photo, waLink } from '../lib.js';
import { icon } from '../ui.js';
import { page, pageHero, breadcrumbLd, orgLd } from '../layout.js';

/* ============================================================
   Contact and Book a demo. Both post to this server, which forwards
   to the API (leads land in the platform console). They work with
   JavaScript off; with it on, site.js submits without a reload.
   ============================================================ */

function field({ name, label, type = 'text', req = false, values = {}, errors = {}, hint, auto, placeholder, options, rows, min }) {
  const v = values[name] ?? '';
  const err = errors[name];
  const id = `f-${name}`;
  const common = raw(`id="${id}" name="${name}"${req ? ' required aria-required="true"' : ''}${err ? ` aria-invalid="true" aria-describedby="${id}-err"` : ''}${auto ? ` autocomplete="${auto}"` : ''}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}`);
  let control;
  if (options) control = html`<select ${common}>${options.map(([val, lab]) => html`<option value="${val}"${String(v) === String(val) ? raw(' selected') : ''}>${lab}</option>`)}</select>`;
  else if (type === 'textarea') control = html`<textarea ${common} rows="${rows || 5}">${v}</textarea>`;
  else control = html`<input type="${type}" ${common} value="${v}"${min ? raw(` min="${min}"`) : ''}>`;
  return html`<div class="field${err ? ' field--err' : ''}"><label for="${id}">${label}${req ? html`<span class="req" aria-hidden="true">*</span>` : ''}</label>${control}${err ? html`<span class="field__err" id="${id}-err">${err}</span>` : hint ? html`<span class="field__hint">${hint}</span>` : ''}</div>`;
}

const hidden = (values) => html`
  <input type="hidden" name="page" value="${values.page || ''}">
  <input type="hidden" name="utm_source" value="${values.utm_source || ''}"><input type="hidden" name="utm_medium" value="${values.utm_medium || ''}"><input type="hidden" name="utm_campaign" value="${values.utm_campaign || ''}">
  <div class="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>`;

function contactAside(settings) {
  const rows = [
    settings.salesEmail && ['mail', 'Sales and demos', html`<a href="mailto:${settings.salesEmail}">${settings.salesEmail}</a>`],
    settings.supportEmail && ['chat', 'Support for customers', html`<a href="mailto:${settings.supportEmail}">${settings.supportEmail}</a>`],
    settings.phone && ['call', 'Phone', html`<a href="tel:${settings.phone.replace(/\s/g, '')}">${settings.phone}</a>`],
    settings.whatsapp && ['wa', 'WhatsApp', html`<a href="${waLink(settings.whatsapp)}" target="_blank" rel="noopener">Chat with us</a>`],
    ['map', 'Office', html`COWRKS, Campus 3B, Millenia Business Park, OMR, Perungudi, Chennai 600096`],
  ].filter(Boolean);
  return html`<aside class="contact-aside glass-light">
    <h2 class="h4">Reach us directly</h2>
    <ul>${rows.map(([ic, t, v]) => html`<li><span class="ci">${icon(ic, 17)}</span><span><small>${t}</small>${v}</span></li>`)}</ul>
    <p class="muted small">We reply within one working day. Candidates with a problem during a round should contact the company that invited them.</p>
  </aside>`;
}

export function contactPage(site, { values = {}, errors = {}, formError } = {}) {
  const s = site.settings || {};
  const body = html`
${pageHero({ crumbs: [['Home', '/'], ['Contact', '/contact']], eyebrow: 'Contact', title: 'Talk to the Oximus Pro team', lead: 'Questions about interview monitoring, pricing for your hiring volume, or a partnership? Tell us how you hire and we will get back within one working day.' })}
<section class="sec sec--soft sec--tight-top">
  <span class="blob b1" aria-hidden="true"></span>
  <div class="wrap form-wrap">
    <form class="lead-form glass-light" method="post" action="/contact" data-lead-form novalidate>
      <input type="hidden" name="type" value="contact">
      ${formError ? html`<div class="form-alert" role="alert">${formError}</div>` : ''}
      ${field({ name: 'topic', label: 'What can we help with?', values, errors, options: [['question', 'A question about the product'], ['quote', 'Pricing or a quote'], ['demo', 'A demo'], ['support', 'Support for an existing account'], ['partner', 'Partnership or reselling']] })}
      <div class="row2">
        ${field({ name: 'name', label: 'Your name', req: true, values, errors, auto: 'name' })}
        ${field({ name: 'role', label: 'Your role', values, errors, auto: 'organization-title', placeholder: 'Talent acquisition lead' })}
      </div>
      <div class="row2">
        ${field({ name: 'email', label: 'Work email', type: 'email', req: true, values, errors, auto: 'email' })}
        ${field({ name: 'phone', label: 'Phone', type: 'tel', values, errors, auto: 'tel', placeholder: '+91' })}
      </div>
      ${field({ name: 'company', label: 'Company', values, errors, auto: 'organization' })}
      ${field({ name: 'message', label: 'Message', type: 'textarea', req: true, values, errors, placeholder: 'The roles you hire for, how many interview rounds you run, and what you would like to know.' })}
      ${hidden({ ...values, page: '/contact' })}
      <div class="form-foot">
        <button class="btn btn--teal btn--lg" type="submit">Send message ${icon('arrow', 16)}</button>
        <p class="small muted">By sending this you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
      </div>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>
    ${contactAside(s)}
  </div>
</section>`;
  return page({
    site, active: 'contact', body,
    seo: {
      title: 'Contact Oximus Pro | Interview Monitoring Software Team',
      description: 'Contact the Oximus Pro team for pricing, partnerships or questions about AI interview monitoring and online assessment proctoring. We reply within one working day.',
      keywords: ['contact Oximus Pro', 'interview monitoring software India', 'HackGeniX contact'],
      canonical: '/contact',
      jsonld: [orgLd(s), breadcrumbLd([['Home', '/'], ['Contact', '/contact']]), { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Oximus Pro', url: `${config.siteUrl}/contact` }],
    },
  });
}

export function demoPage(site, { values = {}, errors = {}, formError } = {}) {
  const s = site.settings || {};
  const today = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const body = html`
${pageHero({ crumbs: [['Home', '/'], ['Book a demo', '/book-a-demo']], eyebrow: 'Book a demo', title: 'See Oximus Pro catch what a video call misses', lead: 'A 30-minute live demo with your own scenarios: an online assessment, a technical round with a code pad, and the phone side view. Then we can run your next real interview with you.' })}
<section class="sec sec--soft sec--tight-top">
  <span class="blob b2" aria-hidden="true"></span>
  <div class="wrap form-wrap">
    <form class="lead-form glass-light" method="post" action="/book-a-demo" data-lead-form novalidate>
      <input type="hidden" name="type" value="demo">
      <input type="hidden" name="plan" value="${values.plan || ''}">
      ${formError ? html`<div class="form-alert" role="alert">${formError}</div>` : ''}
      <div class="row2">
        ${field({ name: 'name', label: 'Your name', req: true, values, errors, auto: 'name' })}
        ${field({ name: 'role', label: 'Your role', values, errors, auto: 'organization-title', placeholder: 'HR manager, recruiter, founder' })}
      </div>
      <div class="row2">
        ${field({ name: 'email', label: 'Work email', type: 'email', req: true, values, errors, auto: 'email' })}
        ${field({ name: 'phone', label: 'Phone / WhatsApp', type: 'tel', values, errors, auto: 'tel', placeholder: '+91' })}
      </div>
      <div class="row2">
        ${field({ name: 'company', label: 'Company', req: true, values, errors, auto: 'organization' })}
        ${field({ name: 'teamSize', label: 'Recruiters and interviewers', values, errors, options: [['', 'Choose'], ['1-5', '1 to 5'], ['6-20', '6 to 20'], ['21-50', '21 to 50'], ['50+', 'More than 50']] })}
      </div>
      <div class="row2">
        ${field({ name: 'volume', label: 'Candidate rounds a month', values, errors, options: [['', 'Choose'], ['<100', 'Under 100'], ['100-500', '100 to 500'], ['500-2000', '500 to 2,000'], ['2000+', 'More than 2,000']], hint: 'One candidate taking one round counts as one.' })}
        ${field({ name: 'hiringFor', label: 'Roles you hire for', values, errors, placeholder: 'Java developers, support, campus freshers' })}
      </div>
      <div class="row2">
        ${field({ name: 'preferredDate', label: 'Preferred date', type: 'date', values, errors, min: today })}
        ${field({ name: 'preferredTime', label: 'Preferred time (IST)', values, errors, options: [['', 'Any time'], ['morning', 'Morning, 10 am – 12 pm'], ['afternoon', 'Afternoon, 2 – 5 pm'], ['evening', 'Evening, 5 – 7 pm']] })}
      </div>
      ${field({ name: 'message', label: 'Anything we should prepare?', type: 'textarea', rows: 3, values, errors, placeholder: 'The problem you face today: AI answers, proxy candidates, campus drives…' })}
      ${hidden({ ...values, page: '/book-a-demo' })}
      <div class="form-foot">
        <button class="btn btn--teal btn--lg" type="submit">Book my demo ${icon('arrow', 16)}</button>
        <p class="small muted">We confirm a slot by email within one working day. <a href="/privacy-policy">Privacy Policy</a>.</p>
      </div>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>
    <aside class="demo-aside">
      <div class="demo-ph">${photo('panel', 'Recruiters watching a live interview in Oximus Pro', { sizes: '(max-width: 960px) 100vw, 40vw' })}</div>
      <div class="glass-light demo-list">
        <h2 class="h4">In 30 minutes you will see</h2>
        <ol>
          <li><b>A candidate's journey</b><span>Consent, device check, identity capture and phone pairing by QR code.</span></li>
          <li><b>A live technical round</b><span>Panel of interviewers, screen share, code pad that runs, whiteboard.</span></li>
          <li><b>Signals with evidence</b><span>Gaze, answer timing, text without typing and the phone side view.</span></li>
          <li><b>The final-round check</b><span>The printable report your client gets before the in-person round.</span></li>
        </ol>
      </div>
      ${s.whatsapp ? html`<a class="btn btn--line wa-btn" href="${waLink(s.whatsapp, 'Hi, I would like a demo of Oximus Pro.')}" target="_blank" rel="noopener">${icon('wa', 17)} Prefer WhatsApp? Message us</a>` : ''}
    </aside>
  </div>
</section>`;
  return page({
    site, active: 'demo', body,
    seo: {
      title: 'Book a Demo | AI Interview Monitoring Software | Oximus Pro',
      description: 'Book a 30-minute live demo of Oximus Pro: online assessment proctoring, live technical interviews with a code pad, phone second camera and AI cheating signals.',
      keywords: ['interview monitoring software demo', 'AI proctoring demo', 'online interview platform demo', 'book a demo Oximus Pro'],
      canonical: '/book-a-demo',
      jsonld: [orgLd(s), breadcrumbLd([['Home', '/'], ['Book a demo', '/book-a-demo']])],
    },
  });
}

export function thanksPage(site, type) {
  const demo = type === 'demo';
  const body = html`
${pageHero({ title: demo ? 'Thank you — your demo request is in' : 'Thank you — we have your message', lead: demo ? 'We will email you within one working day to confirm a time. Meanwhile, here is what other hiring teams read first.' : 'We reply within one working day. Meanwhile, here is what other hiring teams read first.' })}
<section class="sec sec--soft sec--tight-top"><div class="wrap thanks">
  <a class="glass-light thanks__card" href="/blog/how-to-detect-ai-cheating-in-online-interviews">${icon('eye', 20)}<b>How to detect AI cheating in online interviews</b><span>The signs, the follow-up questions and a process that holds up.</span></a>
  <a class="glass-light thanks__card" href="/blog/can-interviewers-detect-cluely-interview-coder">${icon('userCheck', 20)}<b>Can interviewers detect Cluely?</b><span>How invisible AI interview tools work, and how to catch them.</span></a>
  <a class="glass-light thanks__card" href="/pricing">${icon('sparkle', 20)}<b>Pricing</b><span>One credit per candidate, per round. Nothing for no-shows.</span></a>
</div></section>`;
  return page({ site, body, seo: { title: 'Thank you | Oximus Pro', description: 'Thank you for contacting Oximus Pro.', canonical: demo ? '/thank-you?type=demo' : '/thank-you', noindex: true } });
}
