/* ============================================================
   POP CORN — MAIN JS
   ============================================================ */

// ── NAV scroll class ─────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── BURGER ───────────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const [s1, s2] = burger.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'translateY(7.5px) rotate(45deg)';
    s2.style.transform = 'translateY(-7.5px) rotate(-45deg)';
  } else {
    s1.style.transform = '';
    s2.style.transform = '';
  }
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => s.style.transform = '');
  });
});

// ── SMOOTH ANCHOR ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealTargets = [
  '.fl-item',
  '.fmt-block',
  '.ev-card',
  '.ch-item',
  '.story-text',
  '.story-visual',
  '.sunday-inner',
  '.contact-left',
  '.contact-form',
  '.statement-inner',
  '.bm-left',
  '.bm-right',
  '.fl-head',
];

const allReveal = document.querySelectorAll(revealTargets.join(','));
allReveal.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // stagger children of same parent
    const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal') && !c.classList.contains('in'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('in'), Math.min(idx * 80, 320));
    io.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

allReveal.forEach(el => io.observe(el));

// ── CONTACT FORM ─────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message envoyé';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Envoyer →';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
});

// ── WARHOL HOVER ROTATE ──────────────────────────────────────
// Stagger rotate all cells on section hover
const warholCells = document.querySelectorAll('.w-cell');
document.querySelector('.warhol')?.addEventListener('mouseenter', () => {
  warholCells.forEach((c, i) => {
    setTimeout(() => c.classList.add('w-hovered'), i * 60);
  });
});
document.querySelector('.warhol')?.addEventListener('mouseleave', () => {
  warholCells.forEach(c => c.classList.remove('w-hovered'));
});
