'use strict';
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motions = new Set();
  function reveal(element, delay = 0) {
    if (reducedMotion.matches || !element || !element.animate) return;
    element.getAnimations().forEach(animation => animation.cancel());
    const animation = element.animate([
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 650, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    motions.add(animation);
    const cleanup = () => motions.delete(animation);
    animation.onfinish = cleanup;
    animation.oncancel = cleanup;
  }
  reducedMotion.addEventListener('change', event => {
    if (event.matches) motions.forEach(animation => animation.cancel());
  });
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
      if (!card.hidden) { reveal(card, visible * 45); visible++; }
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
    reveal(slides[current]);
  }
  slideButtons.forEach(button => button.addEventListener('click', () => showSlide(Number(button.dataset.slide))));
  document.getElementById('gallery-prev')?.addEventListener('click', () => showSlide(current - 1));
  document.getElementById('gallery-next')?.addEventListener('click', () => showSlide(current + 1));
  document.querySelector('.gallery-controls')?.addEventListener('keydown', event => {
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
  form?.addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    if (!fallback.hidden) {
      fallback.hidden = true;
      status.textContent = '';
      message = '';
    }
  });
  form?.addEventListener('change', () => {
    fallback.hidden = true;
    status.textContent = '';
    message = '';
  });
  form?.addEventListener('submit', event => {
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
  document.getElementById('copy-enquiry')?.addEventListener('click', async () => {
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

  const heroItems = document.querySelectorAll('.hero-identity, .hero-slogan, .hero-intro, .hero-description, .hero-actions, .hero-photo, .company-introduction, .company-hero-photo');
  heroItems.forEach((element, index) => {
    const box = element.getBoundingClientRect();
    if (box.bottom > 0 && box.top < innerHeight) reveal(element, index * 70);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      let stagger = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.boundingClientRect.top > 0) reveal(entry.target, stagger++ * 65);
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    document.querySelectorAll('.section-heading, .product-card, .about-visual, .about-copy, .supply-steps li, .shipping-band, .gallery, .location, .contact-copy, .quote-panel, .faq-grid, .editorial-grid, .company-pillars article, .heritage-timeline li, .company-process li').forEach(element => observer.observe(element));
  }

  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  const navSections = [...nav.querySelectorAll('a[href^="#"]')].map(link => ({
    link, section: document.querySelector(link.getAttribute('href'))
  })).filter(item => item.section);
  let scrollPending = false;
  function updateReadingPosition() {
    scrollPending = false;
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    header.classList.toggle('is-scrolled', scrollY > 20);
    let currentSection = null;
    navSections.forEach(item => {
      const box = item.section.getBoundingClientRect();
      if (box.top <= 180 && box.bottom > 180) currentSection = item;
    });
    navSections.forEach(item => {
      if (item === currentSection) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
  }
  function queueReadingPosition() {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateReadingPosition); }
  }
  addEventListener('scroll', queueReadingPosition, { passive: true });
  addEventListener('resize', queueReadingPosition);
  filters.forEach(button => button.addEventListener('click', queueReadingPosition));
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
    queueReadingPosition();
    if (detail.open) reveal(detail.querySelector('.details-content'));
  }));
  function revealLinkedDetail() {
    if (!location.hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
    catch { return; }
    if (!target) return;
    let ancestor = target.parentElement;
    let opened = false;
    while (ancestor) {
      if (ancestor.tagName === 'DETAILS' && !ancestor.open) { ancestor.open = true; opened = true; }
      ancestor = ancestor.parentElement;
    }
    if (opened) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
  addEventListener('hashchange', revealLinkedDetail);
  revealLinkedDetail();
  updateReadingPosition();
})();

