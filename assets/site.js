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
  const productPager = document.querySelector('.product-pagination');
  const productPageStatus = document.getElementById('product-page-status');
  const productPrev = document.getElementById('products-prev');
  const productNext = document.getElementById('products-next');
  const productPageHeading = document.getElementById('product-page-heading');
  const productPageLinks = document.getElementById('product-page-links');
  const productNextLabel = document.querySelector('.product-next-label');
  const wideProducts = matchMedia('(min-width: 1200px)');
  let productFilter = 'all';
  let productPage = 0;
  const pageSize = () => desktop.matches ? (wideProducts.matches ? 4 : 3) : cards.length || 1;
  function renderProducts(animate = false) {
    if (!cards.length) return;
    const matched = cards.filter(card => productFilter === 'all' || card.dataset.family === productFilter);
    const size = pageSize();
    const pages = Math.max(1, Math.ceil(matched.length / size));
    productPage = Math.max(0, Math.min(productPage, pages - 1));
    const visible = matched.slice(productPage * size, (productPage + 1) * size);
    cards.forEach(card => { card.hidden = !visible.includes(card); });
    if (animate) visible.forEach((card, i) => reveal(card, i * 45));
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === productFilter)));
    document.getElementById('product-count').textContent = matched.length + (matched.length === 1 ? ' product' : ' products') + (pages > 1 ? ' / ' + pages + ' pages' : '');
    productPager.hidden = pages <= 1;
    productPageStatus.textContent = 'Showing ' + (productPage * size + 1) + '\u2013' + Math.min((productPage + 1) * size, matched.length) + ' of ' + matched.length;
    productPrev.disabled = productPage === 0;
    const remaining = matched.length - (productPage + 1) * size;
    productNextLabel.textContent = remaining > 0 ? 'View ' + Math.min(size, remaining) + ' more products' : 'Back to first products';
    productNext.setAttribute('aria-label', productNextLabel.textContent);
    productPageHeading.textContent = remaining > 0 ? remaining + ' more products to explore' : 'You have seen all ' + matched.length + ' products';
    productNext.dataset.wrap = String(productPage === pages - 1);
    // Retain existing page controls so keyboard focus survives a page change.
    if (productPageLinks.children.length !== pages) {
      productPageLinks.replaceChildren();
      for (let i = 0; i < pages; i++) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = String(i + 1).padStart(2, '0');
        button.setAttribute('aria-label', 'Product page ' + (i + 1));
        button.setAttribute('aria-controls', 'product-grid');
        button.addEventListener('click', () => {
          productPager.classList.remove('invite-motion');
          productPage = i;
          renderProducts(true);
          queueReadingPosition();
        });
        productPageLinks.append(button);
      }
    }
    [...productPageLinks.children].forEach((button, i) => {
      if (i === productPage) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }
  filters.forEach(button => button.addEventListener('click', () => {
    productFilter = button.dataset.filter;
    productPage = 0;
    renderProducts(true);
  }));
  function changeProductPage(delta) {
    productPager.classList.remove('invite-motion');
    productPage = delta > 0 && productNext.dataset.wrap === 'true' ? 0 : productPage + delta;
    renderProducts(true);
    // Keep keyboard focus on a visible control at the first/last page.
    if (document.activeElement === productNext && productNext.disabled) productPrev.focus();
    else if (document.activeElement === productPrev && productPrev.disabled) productNext.focus();
    queueReadingPosition();
  }
  productPrev?.addEventListener('click', () => changeProductPage(-1));
  productNext?.addEventListener('click', () => changeProductPage(1));
  function revealLinkedProduct() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = cards.find(card => card.id === id);
    if (!target) return;
    productFilter = 'all';
    productPage = Math.floor(cards.indexOf(target) / pageSize());
    renderProducts();
    requestAnimationFrame(() => target.scrollIntoView({block:'start',behavior:'instant'}));
  }
  desktop.addEventListener('change', () => { productPage = 0; renderProducts(); revealLinkedProduct(); });
  wideProducts.addEventListener('change', () => { productPage = 0; renderProducts(); revealLinkedProduct(); });
  addEventListener('hashchange', revealLinkedProduct);
  renderProducts();
  revealLinkedProduct();
  if (productPager && 'IntersectionObserver' in window) {
    const invitation = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && !reducedMotion.matches) {
        productPager.classList.add('invite-motion');
        invitation.disconnect();
      }
    }, {threshold: .8});
    invitation.observe(productPager);
  }
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

