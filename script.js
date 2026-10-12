// Small enhancements: mobile navigation, current year and a mail-app contact form.
document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.querySelector('span').textContent = isOpen ? '−' : '＋';
    });
  }

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      // Messages are prepared in the visitor's default email app.
      const recipient = 'Nair1182@outlook.com';
      const subject = encodeURIComponent(`${data.get('topic')} — website message from ${data.get('name')}`);
      const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${data.get('topic')}\n\n${data.get('message')}`);
      const status = document.querySelector('#form-status');
      status.textContent = 'Opening your email app…';
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});
