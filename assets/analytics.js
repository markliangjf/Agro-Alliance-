'use strict';
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else { root.AgroMetrics = api; api.start(); }
})(typeof window === 'undefined' ? globalThis : window, function () {
  const events = new Set(['page_view','product_view','product_guide_view','enquiry_start','enquiry_submit','generate_lead','enquiry_error','contact_click']);
  const products = new Set(['urea','as-crystal','as-granular','ac-crystal','ac-granular','potassium-nitrate','calcium-nitrate','npk','other','ammonium-sulphate']);
  const pages = new Set(['/','/index.html','/company.html','/urea.html','/ammonium-sulphate.html','/privacy.html']);
  const channels = new Set(['web','whatsapp','email']);
  const reasons = new Set(['network','timeout','unconfirmed','not_configured','rejected','rate_limited']);
  let enabled = false, initialized = false, config, banner, productObserver;
  function sanitize(name, raw = {}, path = '/') {
    if (!events.has(name) || !pages.has(path)) return null;
    const detail = {page_path:path === '/index.html' ? '/' : path};
    if (products.has(raw.product)) detail.product = raw.product;
    if (channels.has(raw.channel)) detail.channel = raw.channel;
    if (reasons.has(raw.reason)) detail.reason = raw.reason;
    return {name,detail};
  }
  function track(name, detail = {}) {
    const safe = sanitize(name,detail,location.pathname);
    if (!safe || !enabled) return;
    // No field values, query strings, fragments, messages, destination or full link URLs.
    window.gtag('event',safe.name,{
      ...safe.detail,
      page_location:'https://agro-alliance.sg'+safe.detail.page_path,
      page_referrer:''
    });
  }
  function preference(value) {
    try {
      if (value) localStorage.setItem('agro-analytics-consent',JSON.stringify({value,at:Date.now()}));
      const saved = JSON.parse(localStorage.getItem('agro-analytics-consent') || 'null');
      return saved && Date.now()-saved.at < 180*86400000 ? saved.value : null;
    } catch { return null; }
  }
  function activate() {
    if (enabled) return;
    enabled = true;
    window['ga-disable-'+config.gaMeasurementId] = false;
    if (initialized) {
      window.gtag('consent','update',{analytics_storage:'granted'});
      return;
    }
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js',new Date());
    window.gtag('config',config.gaMeasurementId,{
      send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,
      page_location:'https://agro-alliance.sg'+(pages.has(location.pathname)?location.pathname:'/'),page_referrer:''
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(config.gaMeasurementId);
    document.head.append(script);
    track('page_view');
    if (document.body.dataset.productGuide) track('product_guide_view',{product:document.body.dataset.productGuide});
    if ('IntersectionObserver' in window) {
      productObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting && enabled) { track('product_view',{product:entry.target.id}); productObserver.unobserve(entry.target); }
      }),{threshold:.5});
      document.querySelectorAll('.product-card').forEach(card=>productObserver.observe(card));
    }
  }
  function start() {
    config = window.AGRO_CONFIG || {};
    if (document.body.dataset.localPreview === 'true' || !/^G-[A-Z0-9]+$/.test(config.gaMeasurementId || '') || !(config.productionHosts || []).includes(location.hostname)) return;
    const privacySignal = navigator.globalPrivacyControl || navigator.doNotTrack === '1';
    const note = document.querySelector('[data-analytics-state]');
    if (note) note.textContent = 'With your permission, Google Analytics measures page and product views and enquiry actions. You can change your choice using Analytics preferences in the footer.';
    if (privacySignal) return;
    banner = document.createElement('aside');
    banner.className = 'analytics-choice';
    banner.setAttribute('aria-label','Optional analytics');
    banner.innerHTML = '<p><strong>Help us improve this website</strong><span>Allow optional analytics for page visits and enquiry actions? Form details are excluded. <a href="privacy.html">Privacy details</a></span></p><div><button type="button" data-choice="denied">No thanks</button><button type="button" data-choice="granted">Allow analytics</button></div>';
    banner.hidden = !!preference();
    document.body.append(banner);
    document.querySelectorAll('[data-analytics-settings]').forEach(button=>{
      button.hidden = false;
      button.addEventListener('click',()=>{banner.hidden=false;banner.querySelector('button').focus();});
    });
    banner.addEventListener('click',event=>{
      const choice = event.target.closest('[data-choice]')?.dataset.choice;
      if (!choice) return;
      preference(choice); banner.hidden = true;
      if (choice === 'granted') activate();
      else {
        enabled = false;
        window['ga-disable-'+config.gaMeasurementId] = true;
        // Consent can be withdrawn without reloading or losing enquiry fields.
        if (window.gtag) window.gtag('consent','update',{analytics_storage:'denied'});
        document.cookie.split(';').forEach(item=>{
          const name = item.split('=')[0].trim();
          if (/^_ga(?:_|$)/.test(name)) {
            document.cookie=name+'=; Max-Age=0; path=/';
            document.cookie=name+'=; Max-Age=0; path=/; domain=.agro-alliance.sg';
          }
        });
      }
    });
    document.addEventListener('click',event=>{
      const link = event.target.closest('a[href]');
      if (!link) return;
      if (link.getAttribute('href').startsWith('mailto:')) track('contact_click',{channel:'email'});
      else if (link.hostname === 'wa.me') track('contact_click',{channel:'whatsapp'});
    });
    if (preference() === 'granted') activate();
  }
  return {sanitize,track,start};
});
