/* Analytics and ad tags for oximuspro.com. Loaded after the page, on
   every page. IDs live here so the CSP can stay strict (no inline
   scripts): change them here, bump ASSET_V in layout.js, redeploy. */
(function () {
  var GA_ID = 'G-ZJXRZXNVYS';
  var LI_ID = '11239361';

  /* Google Analytics 4 (gtag.js) */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
  var g = document.createElement('script');
  g.async = true;
  g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(g);

  /* LinkedIn Insight Tag */
  window._linkedin_partner_id = LI_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(LI_ID);
  if (!window.lintrk) {
    window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
    window.lintrk.q = [];
  }
  var l = document.createElement('script');
  l.type = 'text/javascript';
  l.async = true;
  l.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  document.head.appendChild(l);
})();
