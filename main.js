/* Navbar scroll shadow */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* Hamburger menu */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* Scroll reveal */
function revealOnScroll(selector) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

revealOnScroll('.card');
revealOnScroll('.project-card');
revealOnScroll('.reveal');
revealOnScroll('.contact-copy');

/* Hero entrance animation */
window.addEventListener('DOMContentLoaded', () => {
  const heroCopy   = document.querySelector('.hero-copy');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroCopy)   heroCopy.style.transition   = 'opacity .7s ease, transform .7s ease';
  if (heroVisual) heroVisual.style.transition = 'opacity .7s .2s ease, transform .7s .2s ease';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (heroCopy)   heroCopy.classList.add('visible');
      if (heroVisual) heroVisual.classList.add('visible');
    });
  });

});

/* Contact form */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) { shakeForm(); return; }
    if (!isValidEmail(email))        { shakeField(form.email); return; }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled    = true;
    submitBtn.textContent = '전송 중…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled    = false;
      submitBtn.textContent = '메시지 보내기';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1200);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeField(field) {
  field.style.borderColor = '#ff4d6d';
  field.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(-4px)' },
    { transform: 'translateX(0)' }
  ], { duration: 320, easing: 'ease-out' });
  field.focus();
  setTimeout(() => { field.style.borderColor = ''; }, 1200);
}

function shakeForm() {
  ['name', 'email', 'message'].forEach(n => {
    const field = form[n];
    if (!field.value.trim()) shakeField(field);
  });
}

/* Scroll spy */
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => spyObserver.observe(s));

const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--green); } .nav-links a.active::after { width: 100%; }`;
document.head.appendChild(style);
