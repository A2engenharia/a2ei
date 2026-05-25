// ── NAVBAR SCROLL ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
function closeMenu() {
  navMobile.classList.remove('open');
}

// ── ACTIVE NAV LINK ON SCROLL ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

// ── ANIMATE ON SCROLL ─────────────────────────
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => animateObserver.observe(el));

// ── SMOOTH SCROLL ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── FORM SUBMIT ───────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-text');
  const success = document.getElementById('form-success');
  const form = document.getElementById('form');

  btn.textContent = 'Enviando...';

  // Monta mensagem WhatsApp com os dados do form
  const nome    = document.getElementById('nome').value;
  const empresa = document.getElementById('empresa').value;
  const email   = document.getElementById('email').value;
  const tel     = document.getElementById('telefone').value;
  const servico = document.getElementById('servico').value;
  const msg     = document.getElementById('mensagem').value;

  const texto = encodeURIComponent(
    `Olá! Vim pelo site da A2 Engenharia.\n\n` +
    `*Nome:* ${nome}\n` +
    `*Empresa:* ${empresa}\n` +
    `*E-mail:* ${email}\n` +
    (tel ? `*Telefone:* ${tel}\n` : '') +
    (servico ? `*Serviço:* ${servico}\n` : '') +
    `\n*Mensagem:*\n${msg}`
  );

  setTimeout(() => {
    // Abre WhatsApp com a mensagem
    window.open(`https://wa.me/5519978129914?text=${texto}`, '_blank');

    // Mostra sucesso
    form.reset();
    btn.textContent = 'Enviar Mensagem';
    success.classList.remove('hidden');
    setTimeout(() => success.classList.add('hidden'), 6000);
  }, 600);
}

// ── COUNTER ANIMATION ─────────────────────────
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
  const text = el.textContent;
  const prefix = text.startsWith('+') ? '+' : '';
  const num = parseInt(text.replace(/\D/g, ''));
  const suffix = text.replace(/[\d+]/g, '');
  if (!num) return;

  let start = 0;
  const duration = 1200;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * num);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
