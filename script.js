// Navigation, subtle motion, current year and email-app contact form.
document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      const icon = menuButton.querySelector('span');
      if (icon) icon.textContent = isOpen ? '−' : '＋';
    });
  }

  // Reveal sections as they enter the viewport. Respect reduced-motion preferences.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('main section, .timeline-item, .work-row, .credential, .interest-card, .values-grid article');
    targets.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    });
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(el => observer.observe(el));
  }

  // Soft fade between internal pages; no effect on external links or new tabs.
  if (!reduceMotion) {
    document.body.classList.add('page-ready');
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || link.target === '_blank' || /^(https?:|mailto:|tel:)/i.test(href)) return;
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const target = new URL(link.href, window.location.href);
        if (target.origin !== window.location.origin) return;
        event.preventDefault();
        document.body.classList.add('page-leaving');
        window.setTimeout(() => { window.location.href = link.href; }, 170);
      });
    });
  }

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = 'Nair1182@outlook.com';
      const subject = encodeURIComponent(`${data.get('topic')} - website message from ${data.get('name')}`);
      const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${data.get('topic')}\n\n${data.get('message')}`);
      const status = document.querySelector('#form-status');
      if (status) status.textContent = 'Opening your email app…';
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});
