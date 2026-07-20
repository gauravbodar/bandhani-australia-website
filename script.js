/* =============================================
   Bandhani Australia — script.js
   Vanilla JS. No build step, no dependencies.
   ============================================= */

/* ── Config ────────────────────────────────────────────────
   Replace WHATSAPP_NUMBER with Alpa's real number in
   international format, digits only (no +, spaces or dashes).
   e.g. Australian mobile 0412 345 678  →  "61412345678"
   This one constant feeds every wa.me link on the page.
   ---------------------------------------------------------- */
const WHATSAPP_NUMBER = "61XXXXXXXXXX"; // ← PLACEHOLDER — replace with Alpa's number

// Respect users who asked the OS to reduce motion.
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Desktop-style hover vs. touch (drives video hover-to-play behaviour).
const CAN_HOVER = window.matchMedia('(hover: hover)').matches;

// Helper: look up a product by id.
const productById = id => PRODUCTS.find(p => p.id === id);

/* ============================================================
   STICKY NAV
   ============================================================ */
const navbar = document.getElementById('navbar');
const handleScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ============================================================
   MOBILE NAV
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');

if (hamburger) hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}
if (mobileNav) mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

/* ============================================================
   SMOOTH SCROLL (anchor links)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
    }
  });
});

/* ============================================================
   SCROLL REVEAL — gentle fade + rise (gated on reduced-motion)
   ============================================================ */
function initFadeObserver() {
  const fadeEls = document.querySelectorAll('.reveal:not(.observed)');
  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    fadeEls.forEach(el => el.classList.add('visible', 'observed'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => { el.classList.add('observed'); obs.observe(el); });
}

/* ============================================================
   FILTERS — by Type + by Collection/Drop (single-select tabs)
   Type tabs are derived from the products actually present, so
   an empty category (e.g. Dupattas, until stock arrives) never
   shows a dead tab. Collections are derived too, so a new drop
   (PO-003…) appears automatically.
   ============================================================ */
const filterState = { type: 'all', collection: 'all' };

function pluralType(t) {
  if (t === 'Choli') return 'Cholis';
  return t + 's'; // Saree→Sarees, Dupatta→Dupattas
}

function buildFilters() {
  const live = PRODUCTS.filter(p => p.status !== 'sold-out');

  const order = ['Saree', 'Dupatta', 'Choli'];
  const types = order.filter(t => live.some(p => p.type === t));
  renderTabs('filter-type', 'type',
    [{ v: 'all', l: 'All' }, ...types.map(t => ({ v: t, l: pluralType(t) }))]);

  const cols = [...new Set(live.map(p => p.collection))].sort();
  const collectionWrap = document.getElementById('filter-collection-wrap');
  if (cols.length > 1) {
    if (collectionWrap) collectionWrap.style.display = '';
    renderTabs('filter-collection', 'collection',
      [{ v: 'all', l: 'All' }, ...cols.map(c => ({ v: c, l: c }))]);
  } else if (collectionWrap) {
    collectionWrap.style.display = 'none';
  }
}

function renderTabs(containerId, group, items) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = items.map(it => `
    <button class="filter-tab ${filterState[group] === it.v ? 'active' : ''}"
            role="tab" aria-selected="${filterState[group] === it.v}"
            data-group="${group}" data-value="${it.v}"
            onclick="setFilter('${group}', '${it.v}', this)">${it.l}</button>`).join('');
}

function setFilter(group, value, btn) {
  filterState[group] = value;
  const wrap = btn.closest('.filter-tabs');
  if (wrap) wrap.querySelectorAll('.filter-tab').forEach(b => {
    const on = b === btn;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  renderCollection();
}

/* ============================================================
   THE COLLECTION — cinematic, one piece per screen.
   Renders a vertical stack of full-height <section.piece>
   elements (NOT a grid). Sold-out pieces never render.
   ============================================================ */
function renderCollection() {
  const wrap = document.getElementById('collection-pieces');
  const noResults = document.getElementById('no-results');
  if (!wrap || typeof PRODUCTS === 'undefined') return;

  const filtered = PRODUCTS.filter(p => {
    if (p.status === 'sold-out') return false;               // never render sold-out
    if (filterState.type !== 'all' && p.type !== filterState.type) return false;
    if (filterState.collection !== 'all' && p.collection !== filterState.collection) return false;
    return true;
  });

  const paint = () => {
    if (filtered.length === 0) {
      wrap.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
    } else {
      if (noResults) noResults.style.display = 'none';
      wrap.innerHTML = filtered.map((p, i) => pieceHTML(p, i)).join('');
    }
    wrap.classList.remove('is-swapping');
    initCardVideos();
    initFadeObserver();          // reveal freshly-rendered pieces on scroll
    updateResultsBar(filtered.length);
  };

  if (REDUCED_MOTION) { paint(); return; }
  wrap.classList.add('is-swapping');           // fade between filtered states
  setTimeout(paint, 260);
}

function pieceHTML(p, i) {
  const media = productImages(p);
  const sm = STATUS_META[p.status] || STATUS_META['in-stock'];
  const hasImg = !!media.poster;

  // Crisp still or nothing — a missing image falls through to the
  // charcoal+gold placeholder sitting behind it. Never a stretched image.
  const posterHTML = hasImg
    ? `<img class="piece-poster" src="${media.poster}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none'">`
    : '';
  const videoHTML = media.video
    ? `<video class="piece-video" muted loop playsinline preload="none"
              data-src="${media.video}" aria-hidden="true"></video>`
    : '';
  // Price is intentionally NOT rendered — availability & price are confirmed
  // personally on WhatsApp. priceAud stays in products.js as internal data.
  const shortLine = p.subtitle ? `<p class="piece-line">${p.subtitle}</p>` : '';
  const leftLine = (p.status === 'almost-gone' && p.qtyRemain != null)
    ? `<p class="piece-left">Only ${p.qtyRemain} remaining</p>`
    : (p.status === 'last-1' ? `<p class="piece-left">The last one</p>` : '');

  return `
  <section class="piece reveal" data-id="${p.id}">
    <div class="piece-inner">
      <div class="piece-media" data-has-video="${media.video ? '1' : '0'}"
           onclick="openModal('${p.id}')" role="button" tabindex="0"
           onkeydown="if(event.key==='Enter')openModal('${p.id}')"
           aria-label="View details for ${p.name}">
        <div class="piece-placeholder" aria-hidden="true">${p.name}</div>
        ${posterHTML}
        ${videoHTML}
        <span class="status-badge ${sm.badge}">${sm.label}</span>
      </div>
      <div class="piece-text">
        <p class="piece-eyebrow">${p.type} · ${p.po}</p>
        <h3 class="piece-name">${p.name}</h3>
        ${shortLine}
        ${leftLine}
        <div class="piece-actions">
          <button class="btn-add-lg piece-add" onclick="addToCart('${p.id}')" aria-label="Add ${p.name} to cart">Add to Cart</button>
          <button class="text-link as-btn" onclick="openModal('${p.id}')" aria-label="View details for ${p.name}">View details &rarr;</button>
        </div>
      </div>
    </div>
  </section>`;
}

function updateResultsBar(count) {
  const el = document.getElementById('results-count');
  if (el) el.textContent = `${count} piece${count !== 1 ? 's' : ''}`;
}

/* ============================================================
   PIECE VIDEO — lazy-load + play on hover (desktop) /
   in-view (mobile). Never loads all videos at once.
   ============================================================ */
function initCardVideos() {
  if (REDUCED_MOTION) return; // no autoplay for reduced-motion users
  const cards = document.querySelectorAll('.piece-media[data-has-video="1"]');
  if (!cards.length) return;

  const lazyLoad = (media) => {
    const v = media.querySelector('.piece-video');
    if (v && !v.src) {
      v.src = v.dataset.src;
      v.addEventListener('error', () => { media.classList.remove('playing'); }, { once: true });
    }
    return v;
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        const media = en.target;
        if (en.isIntersecting) {
          const v = lazyLoad(media);
          if (!CAN_HOVER && v) { media.classList.add('playing'); v.play().catch(() => {}); }
        } else if (!CAN_HOVER) {
          const v = media.querySelector('.piece-video');
          if (v) { media.classList.remove('playing'); v.pause(); }
        }
      });
    }, { threshold: 0.4 });
    cards.forEach(m => io.observe(m));
  }

  if (CAN_HOVER) {
    cards.forEach(media => {
      media.addEventListener('mouseenter', () => {
        const v = lazyLoad(media);
        if (v) { media.classList.add('playing'); v.play().catch(() => {}); }
      });
      media.addEventListener('mouseleave', () => {
        const v = media.querySelector('.piece-video');
        if (v) { media.classList.remove('playing'); v.pause(); }
      });
    });
  }
}

/* ============================================================
   CART  — in-memory only (no localStorage/sessionStorage).
   Each line = { key, id, qty, finishing }.
   ============================================================ */
let cart = [];

function lineKey(id, finishing) { return `${id}|${finishing || ''}`; }

function addToCart(id, finishing) {
  const p = productById(id);
  if (!p) return;
  const fin = finishing || (p.finishing && p.finishing[0]) || '';
  const key = lineKey(id, fin);
  const existing = cart.find(l => l.key === key);
  if (existing) existing.qty += 1;
  else cart.push({ key, id, qty: 1, finishing: fin });
  renderCart();
  openCart();
  flashCartButton();
}

function changeQty(key, delta) {
  const line = cart.find(l => l.key === key);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter(l => l.key !== key);
  renderCart();
}

function removeLine(key) {
  cart = cart.filter(l => l.key !== key);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function cartCount() { return cart.reduce((n, l) => n + l.qty, 0); }

function renderCart() {
  const itemsWrap = document.getElementById('cart-items');
  const emptyEl   = document.getElementById('cart-empty');
  const sendBtn   = document.getElementById('cart-send');
  const priceNote = document.getElementById('cart-price-note');
  const countEl   = document.getElementById('cart-count');

  const count = cartCount();
  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }

  if (!itemsWrap) return;

  if (cart.length === 0) {
    itemsWrap.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    if (sendBtn) sendBtn.setAttribute('disabled', 'true');
    if (priceNote) priceNote.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (sendBtn) sendBtn.removeAttribute('disabled');
  if (priceNote) priceNote.style.display = 'block';

  itemsWrap.innerHTML = cart.map(line => {
    const p = productById(line.id);
    const media = productImages(p);
    const thumb = media.poster
      ? `<img src="${media.poster}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('cart-thumb-ph')">`
      : '';
    return `
    <div class="cart-line">
      <div class="cart-thumb${media.poster ? '' : ' cart-thumb-ph'}">${thumb}</div>
      <div class="cart-line-body">
        <p class="cart-line-name">${p.name}</p>
        <p class="cart-line-sub">${p.po}${line.finishing ? ' · ' + line.finishing : ''}</p>
        <div class="cart-qty">
          <button onclick="changeQty('${line.key}', -1)" aria-label="Decrease quantity">−</button>
          <span aria-live="polite">${line.qty}</span>
          <button onclick="changeQty('${line.key}', 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-line-end">
        <button class="cart-remove" onclick="removeLine('${line.key}')" aria-label="Remove ${p.name}">Remove</button>
      </div>
    </div>`;
  }).join('');
}

/* Cart drawer open/close */
function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function flashCartButton() {
  const btn = document.getElementById('cart-toggle');
  if (!btn || REDUCED_MOTION) return;
  btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
}

/* ── Build the single WhatsApp order message and open it ──── */
function sendWhatsAppOrder() {
  if (cart.length === 0) return;

  const lines = cart.map(l => {
    const p = productById(l.id);
    const fin = l.finishing ? ` [${l.finishing}]` : '';   // press choice, for Alpa
    return `- ${p.name} (${p.po}) x ${l.qty}${fin}`;
  }).join('\n');

  const ref = `BA-${Date.now().toString(36).toUpperCase()}`;

  const message =
`Hi Bandhani Australia! I'd like to order:

${lines}

Please confirm availability, price and PayID details. Thank you!

Ref: ${ref}`;

  // TODO: revisit live stock check if daily volume grows — today Alpa confirms
  // availability on WhatsApp, so we intentionally do not re-check stock here.
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

/* ============================================================
   PRODUCT DETAIL MODAL (larger media area: clip + stills)
   ============================================================ */
const FINISHING_NOTES = {
  'Roll Press': 'Saree will be roller pressed. Fall and bidding will be done.',
  'Semi-Iron':  'Saree stays slightly crushed with extra cloth at the pleating area. Fall and bidding will be done.',
  'Crush':      'Saree stays crushed as-is. Fall and bidding will not be done.'
};

let currentModalId = null;
let selectedFinishing = '';

function openModal(id) {
  const p = productById(id);
  if (!p) return;
  currentModalId = id;
  const media = productImages(p);
  const sm = STATUS_META[p.status] || STATUS_META['in-stock'];

  const statusBadge = document.getElementById('modal-status-badge');
  statusBadge.textContent = sm.label;
  statusBadge.className = `status-badge ${sm.badge}`;
  document.getElementById('modal-type-badge').textContent = p.type;
  document.getElementById('modal-product-name').textContent = p.name;
  document.getElementById('modal-subtitle').textContent = p.subtitle || '';

  // Price intentionally not shown in the detail view (confirmed on WhatsApp).
  document.getElementById('modal-description').textContent = p.description || '';
  document.getElementById('acc-fabric').textContent = 'Fabric: ' + (p.fabric || '—');
  document.getElementById('acc-length').textContent = 'Length: ' + (p.length || '—');
  document.getElementById('acc-blouse').textContent = 'Blouse: ' + (p.blouse || '—');
  document.getElementById('acc-care').textContent = p.care || '';
  document.getElementById('modal-tags').innerHTML =
    (p.occasion || []).map(o => `<span class="tag-pill">#${o}</span>`).join('');

  selectedFinishing = (p.finishing && p.finishing[0]) || '';
  document.getElementById('finishing-options').innerHTML =
    (p.finishing || []).map(f =>
      `<button class="finishing-btn ${f === selectedFinishing ? 'selected' : ''}"
               onclick="selectFinishing('${f}', this)">${f}</button>`).join('');
  document.getElementById('finishing-note').textContent = FINISHING_NOTES[selectedFinishing] || '';

  buildModalMedia(p, media);

  document.getElementById('product-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function buildModalMedia(p, media) {
  const thumbs = document.getElementById('modal-thumbnails');

  const views = [];
  if (media.video) views.push({ type: 'video', src: media.video });
  media.stills.forEach(src => views.push({ type: 'img', src }));

  // Default view: the clip (autoplay, unless reduced-motion) else first still.
  const startIndex = (media.video && !REDUCED_MOTION) ? 0 : (media.video ? 1 : 0);
  showModalView(views[startIndex] || views[0], p);

  thumbs.innerHTML = views.map((v, i) => {
    const inner = v.type === 'video'
      ? `<span class="thumb-video-badge" aria-hidden="true">▶</span>
         <img src="${media.poster || media.stills[0] || ''}" alt="${p.name} video" loading="lazy">`
      : `<img src="${v.src}" alt="${p.name} view ${i + 1}" loading="lazy"
              onerror="this.parentElement.style.display='none'">`;
    return `<button class="thumb-btn ${i === startIndex ? 'active' : ''}"
                    onclick='showModalViewByIndex(${i}, this)' aria-label="View ${v.type}">${inner}</button>`;
  }).join('');

  const modal = document.getElementById('product-modal');
  modal._views = views;
  modal._product = p;
}

function showModalViewByIndex(i, btn) {
  const modal = document.getElementById('product-modal');
  const views = modal._views || [];
  if (!views[i]) return;
  document.querySelectorAll('#modal-thumbnails .thumb-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  showModalView(views[i], modal._product);
}

function showModalView(view, p) {
  const mainImg = document.getElementById('modal-main-img');
  const mainVid = document.getElementById('modal-main-video');
  if (!view) return;
  if (view.type === 'video') {
    mainImg.style.display = 'none';
    mainVid.style.display = 'block';
    if (mainVid.src !== new URL(view.src, location.href).href) mainVid.src = view.src;
    mainVid.play().catch(() => {});
  } else {
    mainVid.pause();
    mainVid.style.display = 'none';
    mainImg.style.display = 'block';
    mainImg.src = view.src;
    mainImg.alt = p ? p.name : '';
  }
}

function selectFinishing(value, btn) {
  selectedFinishing = value;
  document.querySelectorAll('.finishing-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('finishing-note').textContent = FINISHING_NOTES[value] || '';
}

function modalAddToCart() {
  if (!currentModalId) return;
  addToCart(currentModalId, selectedFinishing);
  closeModal();
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  const v = document.getElementById('modal-main-video');
  if (v) v.pause();
  modal.classList.remove('open');
  if (!document.getElementById('cart-drawer')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

/* ============================================================
   BOOT
   ============================================================ */
// Keep every static wa.me link in the page in sync with WHATSAPP_NUMBER,
// so the number only ever has to be changed in one place (the const above).
function syncWhatsAppLinks() {
  document.querySelectorAll('a[href*="wa.me/61XXXXXXXXXX"]').forEach(a => {
    a.href = a.href.replace('61XXXXXXXXXX', WHATSAPP_NUMBER);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  syncWhatsAppLinks();
  buildFilters();
  renderCollection();
  renderCart();
  initFadeObserver();

  // Cart controls
  document.getElementById('cart-toggle')?.addEventListener('click', openCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('cart-send')?.addEventListener('click', sendWhatsAppOrder);
  document.getElementById('cart-clear')?.addEventListener('click', clearCart);
  document.getElementById('modal-add-cart')?.addEventListener('click', modalAddToCart);

  // Modal close handlers
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  const modalOverlay = document.getElementById('product-modal');
  if (modalOverlay) modalOverlay.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('cart-drawer')?.classList.contains('open')) closeCart();
      else closeModal();
    }
  });

  // Modal detail accordion (one open at a time)
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) { item.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); }
    });
  });
});
