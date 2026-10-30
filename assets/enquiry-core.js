'use strict';
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.AgroEnquiryCore = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  const products = Object.freeze({
    urea: 'Urea (Granular)',
    'as-crystal': 'Ammonium Sulphate (Crystal)',
    'as-granular': 'Ammonium Sulphate (Granular)',
    'ac-crystal': 'Ammonium Chloride (Crystal)',
    'ac-granular': 'Ammonium Chloride (Granular)',
    'potassium-nitrate': 'Potassium Nitrate',
    'calcium-nitrate': 'Calcium Nitrate',
    npk: 'NPK Compound (Custom Ratio)',
    other: 'Other / Multiple Products'
  });
  function error(code) { const e = new Error(code); e.code = code; return e; }
  function validate(raw) {
    const clean = {};
    for (const [key, max] of Object.entries({name:100,company:150,email:200,product:100,quantity:30,destination:150,terms:30,message:1500})) {
      clean[key] = String(raw[key] || '').trim();
      if (clean[key].length > max) throw error('invalid_fields');
    }
    if (!clean.name || !clean.company || !clean.destination || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || !Object.values(products).includes(clean.product)) throw error('invalid_fields');
    if (clean.quantity && (!Number.isFinite(Number(clean.quantity)) || Number(clean.quantity) < .01 || Number(clean.quantity) > 1000000)) throw error('invalid_quantity');
    if (!['To be discussed','FOB','CFR','CIF'].includes(clean.terms)) throw error('invalid_fields');
    clean.quantity = clean.quantity ? clean.quantity + ' MT' : 'To be confirmed';
    return clean;
  }
  function message(data) {
    return ['Hello Agro Alliance,','I would like to discuss the following fertilizer requirement:','',
      'Product: ' + data.product, 'Quantity: ' + data.quantity, 'Destination: ' + data.destination,
      'Shipping terms: ' + data.terms, 'Additional requirements: ' + (data.message || 'To be discussed'), '',
      'Name: ' + data.name, 'Company: ' + data.company, 'Email: ' + data.email].join('\n');
  }
  function validEndpoint(value) { return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(value || ''); }
  async function send(data, config, options = {}) {
    if (!config.formVerified || !validEndpoint(config.formEndpoint)) throw error('not_configured');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 20000);
    try {
      const response = await (options.fetch || fetch)(config.formEndpoint, {
        method: 'POST', headers: {'Accept':'application/json','Content-Type':'application/json'},
        credentials: 'omit', referrerPolicy: 'no-referrer', signal: controller.signal,
        body: JSON.stringify({ ...data, _subject: 'Agro Alliance website enquiry: ' + data.product })
      });
      let result;
      try { result = await response.json(); } catch { throw error('unconfirmed'); }
      if (response.status === 429) throw error('rate_limited');
      if (!response.ok || result?.errors?.length || result?.error || result?.ok === false || result?.success === false) throw error('rejected');
      // Formspree AJAX acknowledges accepted submissions with {ok:true}.
      // Never treat a generic HTTP 200, redirect or HTML page as receipt.
      if (result?.ok !== true) throw error('unconfirmed');
      return {accepted:true};
    } catch (e) {
      if (e.name === 'AbortError') throw error('timeout');
      if (e.code) throw e;
      throw error('network');
    } finally { clearTimeout(timeout); }
  }
  return {products, validate, message, validEndpoint, send};
});
