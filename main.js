/* ============================================================
   POP CORN — MAIN JS
   ============================================================ */

// ── NAV ──────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── BURGER ───────────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const [s1, s2, s3] = burger.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'translateY(8px) rotate(45deg)';
    s2.style.opacity   = '0';
    s3.style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    [s1,s2,s3].forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  burger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
}));

// ── TABS ─────────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.getElementById('tabSucre').classList.toggle('hidden', tab !== 'sucre');
    document.getElementById('tabSale').classList.toggle('hidden',  tab !== 'sale');
  });
});

// ── SMOOTH ANCHOR ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
  });
});

// ── SCROLL REVEAL ────────────────────────────────────────────
document.querySelectorAll('.flavor-card, .fmt-card, .ev-card, .ch-item, .story-text, .story-art, .sunday-text, .contact-left, .contact-form, .statement-inner, .founders, .flavors-header')
  .forEach(el => el.classList.add('reveal'));

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children]
      .filter(c => c.classList.contains('reveal') && !c.classList.contains('in'));
    setTimeout(() => entry.target.classList.add('in'), Math.min(siblings.indexOf(entry.target) * 80, 300));
    // unobserve once animated
    entry.target._io?.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
.observe = (() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children]
        .filter(c => c.classList.contains('reveal') && !c.classList.contains('in'));
      setTimeout(() => entry.target.classList.add('in'), Math.min(siblings.indexOf(entry.target) * 80, 300));
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// ── FORM ─────────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message envoyé !';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Envoyer →';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
});
