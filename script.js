/* =============================================
   Bandhani Australia — script.js
   ============================================= */

// ---- Sticky Nav ----
const navbar = document.getElementById('navbar');
const handleScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
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

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Fade-in Observer ----
function initFadeObserver() {
  const fadeEls = document.querySelectorAll('.fade-in, .section-header');
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  fadeEls.forEach(el => obs.observe(el));
}

// ============================================================
// PRODUCT DATA — colour mapping (keyed to products.js ids)
// ============================================================
const WHATSAPP_NUMBER = "61XXXXXXXXXX"; // ← replace with real number

const COLORS = [
  { value: 'red',     label: 'Crimson',       hex: '#8B1A1A' },
  { value: 'blue',    label: 'Royal Blue',    hex: '#1A3A8B' },
  { value: 'saffron', label: 'Saffron',       hex: '#E8832A' },
  { value: 'green',   label: 'Forest Green',  hex: '#1B5E20' },
  { value: 'maroon',  label: 'Maroon',        hex: '#6B0F1A' },
  { value: 'mustard', label: 'Mustard',       hex: '#C8973A' },
  { value: 'pink',    label: 'Pink',          hex: '#C2185B' },
  { value: 'teal',    label: 'Teal',          hex: '#00695C' },
  { value: 'ivory',   label: 'Ivory & Gold',  hex: '#9E8A5A' },
  { value: 'peacock', label: 'Peacock Blue',  hex: '#0277BD' },
  { value: 'magenta', label: 'Magenta',       hex: '#AD1457' },
  { value: 'purple',  label: 'Deep Purple',   hex: '#4A148C' },
];

// Maps each product id → colour value from the COLORS array above
const PRODUCT_COLOR_MAP = {
  p001: 'red',
  p002: 'blue',
  p003: 'saffron',
  p004: 'green',
  p005: 'maroon',
  p006: 'mustard',
  p007: 'pink',
  p008: 'teal',
  p009: 'ivory',
  p010: 'peacock',
  p011: 'magenta',
  p012: 'purple',
};

// ============================================================
// FILTER STATE
// Active: color, status, price
// ── To activate a hidden filter, uncomment its key below AND
//    remove the style="display:none" from the matching sidebar
//    <div class="filter-group"> in index.html.
// ============================================================
const filterState = {
  color:  [],   // array of colour values e.g. ['red','blue']
  status: [],   // 'in-stock' | 'made-to-order'
  price:  [],   // '0-199' | '200-399' | '400-599' | '600-9999'

  // type:      [],   // 'saree' | 'dupatta'
  // colortype: [],   // 'single-tone' | 'multi-tone'
  // material:  [],   // 'gaji-silk' | 'georgette' | 'modal-silk' | 'cotton' | 'khaddi-georgette'
  // occasion:  [],   // 'Wedding' | 'Bridal' | 'Festive' | 'Navratri' | 'Party' | 'Casual'
  // zari:      [],   // 'gold-zari' | 'silver-zari' | 'no-zari'
};

// ---- Parse price from "AUD 420" → number ----
function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
}

// ---- Check a price value falls within a range string "200-399" ----
function priceInRange(price, range) {
  const [min, max] = range.split('-').map(Number);
  return price >= min && price <= max;
}

// ============================================================
// applyFilters — called by every filter control change
// ============================================================
function applyFilters() {
  // Read checkbox state into filterState
  filterState.status = [...document.querySelectorAll('input[name="status"]:checked')].map(i => i.value);
  filterState.price  = [...document.querySelectorAll('input[name="price"]:checked')].map(i => i.value);

  // ── Uncomment these when activating hidden filters: ──
  // filterState.type      = [...document.querySelectorAll('input[name="type"]:checked')].map(i => i.value);
  // filterState.colortype = [...document.querySelectorAll('input[name="colortype"]:checked')].map(i => i.value);
  // filterState.material  = [...document.querySelectorAll('input[name="material"]:checked')].map(i => i.value);
  // filterState.occasion  = [...document.querySelectorAll('input[name="occasion"]:checked')].map(i => i.value);
  // filterState.zari      = [...document.querySelectorAll('input[name="zari"]:checked')].map(i => i.value);

  renderGrid();
  updateResultsBar();
  updateFilterCount();
}

// ============================================================
// toggleColorFilter — called by swatch clicks
// ============================================================
function toggleColorFilter(value, el) {
  const idx = filterState.color.indexOf(value);
  if (idx === -1) {
    filterState.color.push(value);
    el.classList.add('selected');
    el.setAttribute('aria-pressed', 'true');
  } else {
    filterState.color.splice(idx, 1);
    el.classList.remove('selected');
    el.setAttribute('aria-pressed', 'false');
  }
  renderGrid();
  updateResultsBar();
  updateFilterCount();
}

// ============================================================
// clearAllFilters
// ============================================================
function clearAllFilters() {
  filterState.color  = [];
  filterState.status = [];
  filterState.price  = [];
  // filterState.type      = [];
  // filterState.colortype = [];
  // filterState.material  = [];
  // filterState.occasion  = [];
  // filterState.zari      = [];

  document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => { cb.checked = false; });
  document.querySelectorAll('.swatch-btn').forEach(s => { s.classList.remove('selected'); s.setAttribute('aria-pressed', 'false'); });

  renderGrid();
  updateResultsBar();
  updateFilterCount();
}

// ============================================================
// renderGrid — filters PRODUCTS and writes cards to #product-grid
// ============================================================
function renderGrid() {
  const grid = document.getElementById('product-grid');
  const noResults = document.getElementById('no-results');
  if (!grid || typeof PRODUCTS === 'undefined') return;

  const filtered = PRODUCTS.filter(p => {
    // ── Colour ──
    if (filterState.color.length > 0) {
      const productColor = PRODUCT_COLOR_MAP[p.id];
      if (!filterState.color.includes(productColor)) return false;
    }

    // ── Availability ──
    if (filterState.status.length > 0 && !filterState.status.includes(p.status)) return false;

    // ── Price ──
    if (filterState.price.length > 0) {
      const price = parsePrice(p.price);
      if (!filterState.price.some(r => priceInRange(price, r))) return false;
    }

    // ── Uncomment each block when activating the hidden filter: ──
    // if (filterState.type.length > 0 && !filterState.type.includes(p.category)) return false;
    // if (filterState.colortype.length > 0 && !filterState.colortype.includes(p.colortype)) return false;
    // if (filterState.material.length > 0) {
    //   const mat = p.fabric.toLowerCase().replace(/\s+/g, '-');
    //   if (!filterState.material.some(m => mat.includes(m))) return false;
    // }
    // if (filterState.occasion.length > 0 && !filterState.occasion.some(o => p.occasion.includes(o))) return false;
    // if (filterState.zari.length > 0 && !filterState.zari.includes(p.zari)) return false;

    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';

  grid.innerHTML = filtered.map(p => {
    const hasImage = p.images && p.images[0];
    const imgHTML = hasImage
      ? `<img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const placeholderStyle = hasImage ? 'display:none' : '';

    return `
    <article class="product-card" onclick="openModal('${p.id}')" tabindex="0"
      onkeydown="if(event.key==='Enter')openModal('${p.id}')"
      aria-label="View details for ${p.name}">
      <div class="card-image-wrap">
        ${imgHTML}
        <div class="placeholder-img" style="background:${p.placeholderColor};${placeholderStyle}">${p.name}</div>
        <span class="status-badge ${p.status === 'in-stock' ? 'badge-in-stock' : 'badge-made-to-order'}">
          ${p.status === 'in-stock' ? 'In Stock' : 'Made to Order'}
        </span>
      </div>
      <div class="card-body">
        <p class="card-name">${p.name}</p>
        <p class="card-subtitle">${p.subtitle}</p>
        <p class="card-desc">${p.description.substring(0, 90)}...</p>
        <div class="card-tags">${p.occasion.map(o => `<span class="tag-pill">#${o}</span>`).join('')}</div>
        <p class="card-price">${p.price}</p>
        <button class="card-cta" onclick="event.stopPropagation();openModal('${p.id}')">View Details</button>
      </div>
    </article>`;
  }).join('');

  initFadeObserver();
}

// ============================================================
// updateResultsBar — count + active filter chips
// ============================================================
function updateResultsBar() {
  const count = document.querySelectorAll('#product-grid .product-card').length;
  const countEl = document.getElementById('results-count');
  if (countEl) countEl.textContent = `${count} piece${count !== 1 ? 's' : ''}`;

  const chipsEl = document.getElementById('active-chips');
  if (!chipsEl) return;
  const chips = [];

  filterState.color.forEach(v => {
    const col = COLORS.find(c => c.value === v);
    if (col) chips.push({ label: col.label, clear: () => { toggleColorFilter(v, document.querySelector(`.swatch-btn[data-color="${v}"]`)); } });
  });
  filterState.status.forEach(v => {
    chips.push({ label: v === 'in-stock' ? 'In Stock' : 'Made to Order', clear: () => { const cb = document.querySelector(`input[name="status"][value="${v}"]`); if (cb) { cb.checked = false; applyFilters(); } } });
  });
  filterState.price.forEach(v => {
    const labels = { '0-199': 'Under $200', '200-399': '$200–$399', '400-599': '$400–$599', '600-9999': '$600+' };
    chips.push({ label: labels[v] || v, clear: () => { const cb = document.querySelector(`input[name="price"][value="${v}"]`); if (cb) { cb.checked = false; applyFilters(); } } });
  });

  chipsEl.innerHTML = chips.map((c, i) => `
    <button class="filter-chip" onclick="(${c.clear.toString()})()" aria-label="Remove filter: ${c.label}">
      ${c.label} &times;
    </button>`).join('');
}

// ---- Update mobile filter button badge ----
function updateFilterCount() {
  const total = filterState.color.length + filterState.status.length + filterState.price.length;
  const badge = document.getElementById('active-filter-count');
  const btn   = document.getElementById('mobile-filter-btn');
  if (badge) { badge.textContent = total > 0 ? total : ''; badge.style.display = total > 0 ? 'inline-flex' : 'none'; }
  if (btn)   btn.setAttribute('aria-expanded', total > 0 ? 'true' : 'false');
}

// ============================================================
// toggleMobileSidebar
// ============================================================
function toggleMobileSidebar() {
  const sidebar  = document.getElementById('filter-sidebar');
  const overlay  = document.getElementById('sidebar-overlay');
  const isOpen   = sidebar.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// ============================================================
// Filter group accordion (collapse/expand)
// ============================================================
function initFilterAccordions() {
  document.querySelectorAll('.filter-group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.parentElement.classList.toggle('collapsed', expanded);
    });
  });
}

// ============================================================
// Build colour swatches
// ============================================================
function buildSwatches() {
  const wrap = document.getElementById('color-swatches');
  if (!wrap) return;
  wrap.innerHTML = COLORS.map(c => `
    <button class="swatch-btn" data-color="${c.value}"
      style="--swatch-color:${c.hex}"
      onclick="toggleColorFilter('${c.value}', this)"
      aria-label="${c.label}" aria-pressed="false"
      title="${c.label}">
    </button>`).join('');
}

// ============================================================
// MODAL
// ============================================================
const FINISHING_NOTES = {
  'Roll Press':  'Saree will be roller pressed. Fall and bidding will be done.',
  'Semi-Iron':   'Saree will remain slightly crushed with extra cloth at pleating area. Fall and bidding will be done.',
  'Crush':       'Saree will remain crushed as-is. Fall and bidding will not be done.',
};

let selectedFinishing = '';

function openModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  const statusBadge = document.getElementById('modal-status-badge');
  statusBadge.textContent = p.status === 'in-stock' ? 'In Stock' : 'Made to Order';
  statusBadge.className = `status-badge ${p.status === 'in-stock' ? 'badge-in-stock' : 'badge-made-to-order'}`;

  document.getElementById('modal-category-badge').textContent = p.category === 'saree' ? 'Saree' : 'Dupatta';
  document.getElementById('modal-product-name').textContent = p.name;
  document.getElementById('modal-subtitle').textContent = p.subtitle;
  document.getElementById('modal-price').textContent = p.price;
  document.getElementById('modal-description').textContent = p.description;
  document.getElementById('acc-fabric').textContent = 'Fabric: ' + p.fabric;
  document.getElementById('acc-length').textContent = 'Length: ' + p.length;
  document.getElementById('acc-blouse').textContent = 'Blouse: ' + p.blouse;
  document.getElementById('acc-care').textContent = p.care;

  document.getElementById('modal-tags').innerHTML = p.occasion.map(o => `<span class="tag-pill">#${o}</span>`).join('');

  selectedFinishing = p.finishing[0];
  document.getElementById('finishing-options').innerHTML = p.finishing.map(f => `
    <button class="finishing-btn ${f === selectedFinishing ? 'selected' : ''}"
      onclick="selectFinishing('${f}', this)">${f}</button>`).join('');
  document.getElementById('finishing-note').textContent = FINISHING_NOTES[selectedFinishing] || '';

  const mainImg = document.getElementById('modal-main-img');
  const thumbs  = document.getElementById('modal-thumbnails');
  const wrap    = document.querySelector('.modal-main-image-wrap');

  if (p.images && p.images[0]) {
    mainImg.src = p.images[0];
    mainImg.alt = p.name;
    mainImg.style.display = 'block';
    if (wrap) wrap.style.background = '';
    thumbs.innerHTML = p.images.map((img, i) => `
      <button class="thumb-btn ${i === 0 ? 'active' : ''}"
        onclick="swapMainImage('${img}', this)" aria-label="View image ${i + 1}">
        <img src="${img}" alt="${p.name} view ${i + 1}" loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=thumb-placeholder style=background:${p.placeholderColor}></div>'">
      </button>`).join('');
  } else {
    mainImg.src = '';
    mainImg.alt = '';
    mainImg.style.display = 'none';
    if (wrap) wrap.style.background = p.placeholderColor;
    thumbs.innerHTML = '';
  }

  updateWhatsAppLink(p);
  document.getElementById('product-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectFinishing(value, btn) {
  selectedFinishing = value;
  document.querySelectorAll('.finishing-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('finishing-note').textContent = FINISHING_NOTES[value] || '';
  const name = document.getElementById('modal-product-name').textContent;
  const p = PRODUCTS.find(x => x.name === name);
  if (p) updateWhatsAppLink(p);
}

function updateWhatsAppLink(p) {
  const msg = encodeURIComponent(`${p.whatsappText} Preferred finishing: ${selectedFinishing}.`);
  document.getElementById('modal-whatsapp-btn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function swapMainImage(src, btn) {
  document.getElementById('modal-main-img').src = src;
  document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

// ============================================================
// DOMContentLoaded — boot sequence
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildSwatches();
  initFilterAccordions();
  renderGrid();
  updateResultsBar();
  updateFilterCount();
  initFadeObserver();

  // Modal close handlers
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  const modalOverlay = document.getElementById('product-modal');
  if (modalOverlay) modalOverlay.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Modal accordion
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
