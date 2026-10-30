'use strict';
(() => {
  const form = document.getElementById('quote-form');
  if (!form) return;
  const core = window.AgroEnquiryCore;
  const config = window.AGRO_CONFIG || {};
  const preview = document.body.dataset.localPreview === 'true' || ['localhost','127.0.0.1',''].includes(location.hostname);
  const status = document.getElementById('form-status');
  const fallback = document.getElementById('enquiry-fallback');
  const preparedLink = document.getElementById('prepared-link');
  const preparedMessage = document.getElementById('prepared-message');
  const submit = document.getElementById('send-enquiry');
  const quantity = document.getElementById('quote-quantity');
  const undecided = document.getElementById('quantity-undecided');
  const selection = document.getElementById('quote-product');
  let text = '', busy = false, accepted = false, started = false;
  const track = (event, detail = {}) => window.AgroMetrics?.track(event, detail);
  const productKey = () => Object.keys(core.products).find(key => core.products[key] === selection.value) || 'other';
  function report(message, state) {
    status.textContent = message;
    status.dataset.state = state;
    status.focus({preventScroll:true});
  }
  function restore() {
    if (busy) return;
    accepted = false;
    submit.disabled = false;
    submit.textContent = 'Send enquiry';
    status.textContent = '';
    delete status.dataset.state;
    fallback.hidden = true;
    text = '';
  }
  const preselected = new URLSearchParams(location.search).get('product');
  if (Object.hasOwn(core.products, preselected)) selection.value = core.products[preselected];
  function updateQuantity() {
    quantity.disabled = undecided.checked;
    quantity.required = false;
    quantity.setAttribute('aria-describedby','quantity-hint');
  }
  undecided.addEventListener('change', updateQuantity);
  updateQuantity();
  form.addEventListener('input', event => {
    event.target.setCustomValidity?.('');
    restore();
    if (!started) { started = true; track('enquiry_start',{product:productKey()}); }
  });
  form.addEventListener('change', restore);
  function prepareFallback(data) {
    text = core.message(data);
    preparedMessage.textContent = text;
    preparedLink.href = 'mailto:info@agro-alliance.sg?subject=' + encodeURIComponent('Fertilizer enquiry: ' + data.product) + '&body=' + encodeURIComponent(text);
    fallback.hidden = false;
  }
  function lock(value) {
    busy = value;
    form.setAttribute('aria-busy', String(value));
    form.querySelectorAll('input,select,textarea,button').forEach(el => { el.disabled = value; });
    if (!value) { updateQuantity(); submit.disabled = accepted; }
  }
  if (preview) {
    document.getElementById('enquiry-preview-note').hidden = false;
  } else if (!config.formVerified || !core.validEndpoint(config.formEndpoint)) {
    submit.hidden = true;
    document.getElementById('web-enquiry-note').textContent = 'Prepare your enquiry below, then send it by WhatsApp or email.';
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || (accepted && event.submitter?.value !== 'whatsapp' && event.submitter?.value !== 'email')) return;
    for (const input of form.querySelectorAll('input[required]')) {
      if (!input.value.trim()) input.setCustomValidity('Please complete this field.');
    }
    if (!form.reportValidity()) return;
    if (form.elements.website.value) { report('Please contact our trade desk by email or WhatsApp.','error'); return; }
    let data;
    try { data = core.validate(Object.fromEntries(new FormData(form))); }
    catch { report('Please check your contact details, product, quantity and destination.','error'); return; }
    const channel = event.submitter?.value || 'web';
    if (channel === 'whatsapp' || channel === 'email') {
      prepareFallback(data);
      track('contact_click',{channel,product:productKey()});
      if (channel === 'whatsapp') {
        const url = 'https://wa.me/6590305772?text=' + encodeURIComponent(text);
        preparedLink.href = url;
        preparedLink.textContent = 'Open WhatsApp enquiry';
        window.open(url,'_blank','noopener,noreferrer');
      } else {
        preparedLink.textContent = 'Open email draft';
        location.href = preparedLink.href;
      }
      report('Your draft is ready. Press Send in ' + (channel === 'whatsapp' ? 'WhatsApp' : 'your email app') + ' to complete your enquiry.','draft');
      return;
    }
    const key = productKey();
    track('enquiry_submit',{channel:'web',product:key});
    fallback.hidden = true;
    lock(true);
    submit.textContent = 'Sending…';
    report('Sending your enquiry. Please keep this page open.','sending');
    try {
      if (preview) {
        await new Promise(resolve => setTimeout(resolve,550));
        const test = new URLSearchParams(location.search).get('form-test');
        if (test === 'error' || test === 'timeout') throw Object.assign(new Error(test),{code:test==='timeout'?'timeout':'network'});
        accepted = true;
        report('Preview complete — no enquiry was sent. On the live site, confirmation appears only after the enquiry service accepts your submission.','preview');
      } else {
        await core.send(data, config);
        accepted = true;
        track('generate_lead',{channel:'web',product:key});
        report('Thank you. Your enquiry has been accepted for delivery to our trade desk. We will reply using the email you provided.','success');
      }
      submit.textContent = preview ? 'Preview complete' : 'Enquiry submitted';
      document.getElementById('new-enquiry').hidden = false;
    } catch (e) {
      track('enquiry_error',{channel:'web',product:key,reason:e.code || 'network'});
      prepareFallback(data);
      preparedLink.textContent = 'Open email draft';
      report(e.code === 'timeout' || e.code === 'unconfirmed'
        ? 'We could not confirm receipt. Your details are still here. You can retry or contact us by email or WhatsApp; mention this attempt to avoid duplicate enquiries.'
        : 'Your enquiry could not be confirmed. Your details are still here. Please retry or use email or WhatsApp.','error');
      submit.textContent = 'Try sending again';
    } finally { lock(false); }
  });
  document.getElementById('new-enquiry').addEventListener('click', () => {
    form.reset(); updateQuantity(); restore(); started = false;
    document.getElementById('new-enquiry').hidden = true;
    document.getElementById('quote-name').focus();
  });
  document.getElementById('copy-enquiry').addEventListener('click', async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); report('Enquiry copied. Paste it into your email or WhatsApp to send.','draft'); }
    catch { preparedMessage.closest('details').open = true; report('Select and copy the message below.','draft'); }
  });
})();
