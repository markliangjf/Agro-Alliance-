'use strict';
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  function closeMenu(returnFocus = false) {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('is-open', !isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const desktop = matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });

  const cards = [...document.querySelectorAll('.product-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    cards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.family !== filter;
      if (!card.hidden) visible++;
    });
    document.getElementById('product-count').textContent = visible + (visible === 1 ? ' product' : ' products');
  }));
  const productSelect = document.getElementById('quote-product');
  document.querySelectorAll('[data-product]').forEach(link => {
    link.addEventListener('click', () => {
      productSelect.value = link.dataset.product;
      productSelect.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  const slides = [...document.querySelectorAll('.gallery-slide')];
  const slideButtons = [...document.querySelectorAll('[data-slide]')];
  let current = 0;
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      const video = slide.querySelector('video');
      if (video && i !== current) video.pause();
    });
    slideButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    document.getElementById('gallery-count').textContent = (current + 1) + ' / ' + slides.length;
  }
  slideButtons.forEach(button => button.addEventListener('click', () => showSlide(Number(button.dataset.slide))));
  document.getElementById('gallery-prev').addEventListener('click', () => showSlide(current - 1));
  document.getElementById('gallery-next').addEventListener('click', () => showSlide(current + 1));
  document.querySelector('.gallery-controls').addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1));
      slideButtons[current].focus();
    }
  });

  const form = document.getElementById('quote-form');
  const status = document.getElementById('form-status');
  const fallback = document.getElementById('enquiry-fallback');
  const preparedLink = document.getElementById('prepared-link');
  const messagePreview = document.getElementById('prepared-message');
  let message = '';
  form.addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    if (!fallback.hidden) {
      fallback.hidden = true;
      status.textContent = '';
      message = '';
    }
  });
  form.addEventListener('change', () => {
    fallback.hidden = true;
    status.textContent = '';
    message = '';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const input of form.querySelectorAll('input[required]')) {
      if (!input.value.trim()) input.setCustomValidity('Please complete this field.');
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = key => String(data.get(key) || '').trim();
    message = [
      'Hello Agro Alliance,',
      'I would like a quotation for the following:',
      '',
      'Product: ' + value('product'),
      'Quantity: ' + value('quantity') + ' MT',
      'Destination: ' + value('destination'),
      'Shipping terms: ' + value('terms'),
      'Additional requirements: ' + (value('message') || 'None specified'),
      '',
      'Name: ' + value('name'),
      'Company: ' + value('company'),
      'Email: ' + value('email')
    ].join('\n');
    const channel = event.submitter?.value || 'whatsapp';
    const url = channel === 'email'
      ? 'mailto:info@agro-alliance.sg?subject=' + encodeURIComponent('Fertilizer enquiry: ' + value('product')) + '&body=' + encodeURIComponent(message)
      : 'https://wa.me/6590305772?text=' + encodeURIComponent(message);
    preparedLink.href = url;
    preparedLink.textContent = channel === 'email' ? 'Open email draft' : 'Open WhatsApp enquiry';
    messagePreview.textContent = message;
    fallback.hidden = false;
    status.textContent = channel === 'email'
      ? 'Your email draft is ready. Check the details and press Send in your email app. If it did not open, copy the enquiry and email it to info@agro-alliance.sg.'
      : 'Your WhatsApp enquiry is ready. Review it and press Send in WhatsApp. If no new tab opened, use the link below.';
    if (channel === 'email') window.location.href = url;
    else window.open(url, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('copy-enquiry').addEventListener('click', async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = 'Enquiry copied. Paste it into your email or WhatsApp conversation to send.';
    } catch {
      messagePreview.closest('details').open = true;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(messagePreview);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Select and copy the prepared message below, then paste it into email or WhatsApp.';
    }
  });
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
})();

