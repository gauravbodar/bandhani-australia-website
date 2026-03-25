/* =============================================
   Bandhani Australia — script.js
   ============================================= */

// ---- Sticky Nav ----
const navbar = document.getElementById('navbar');
const handleScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ---- Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

mobileNavClose.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- Smooth Scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Intersection Observer: fade-in animations ----
const fadeEls = document.querySelectorAll('.fade-in, .section-header');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
fadeEls.forEach(el => observer.observe(el));

// ---- Product Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card:not(.extra-card)');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else if (filter === 'sarees') {
        const type = card.dataset.type;
        type === 'saree' ? card.classList.remove('hidden') : card.classList.add('hidden');
      } else if (filter === 'dupattas') {
        const type = card.dataset.type;
        type === 'dupatta' ? card.classList.remove('hidden') : card.classList.add('hidden');
      } else if (filter === 'in-stock') {
        const status = card.dataset.status;
        status === 'in-stock' ? card.classList.remove('hidden') : card.classList.add('hidden');
      } else if (filter === 'made-to-order') {
        const status = card.dataset.status;
        status === 'made-to-order' ? card.classList.remove('hidden') : card.classList.add('hidden');
      }
    });
  });
});

// ---- Load More ----
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreMsg = document.getElementById('load-more-msg');
const extraCards = document.querySelectorAll('.extra-card');
let extraLoaded = false;

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    if (!extraLoaded) {
      extraCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.display = '';
      });
      extraLoaded = true;
      loadMoreBtn.textContent = 'View Full Stock via WhatsApp';
      loadMoreBtn.classList.remove('btn-outline');
      loadMoreBtn.classList.add('btn-whatsapp');
      loadMoreMsg.style.display = 'block';
      loadMoreBtn.href = 'https://wa.me/61XXXXXXXXXX?text=Hi%2C%20I%27d%20like%20to%20see%20your%20full%20Bandhani%20collection.';
      loadMoreBtn.setAttribute('target', '_blank');
      loadMoreBtn.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// ---- WhatsApp product CTA pre-fill ----
document.querySelectorAll('.product-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const productName = btn.dataset.product;
    const msg = encodeURIComponent(`Hi, I'm interested in the ${productName} from your Bandhani Australia collection. Could you please provide more details?`);
    window.open(`https://wa.me/61XXXXXXXXXX?text=${msg}`, '_blank', 'noopener,noreferrer');
  });
});
