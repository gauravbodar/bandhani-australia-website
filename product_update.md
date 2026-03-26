# CLAUDE CODE PROMPT — Product Listing & Detail Modal Update
# Run this AFTER the main website is built. Open the existing index.html, styles.css, script.js and apply these changes.

---

## TASK SUMMARY
Update the existing Bandhani Australia website with:
1. Improved product cards that support real images
2. A product detail MODAL (opens on card click, no new page needed)
3. Image gallery with thumbnails inside the modal
4. Finishing selector (Roll Press / Semi-Iron / Crush)
5. Product data moved to a clean JS data file for easy editing

---

## PART 1 — CREATE `products.js` (new file)

Create a new file called `products.js`. This is the ONLY file that needs editing when adding new products or swapping images. Structure every product exactly like this:

```js
const PRODUCTS = [
  {
    id: "p001",
    name: "Crimson Gaji Silk Bandhani Saree",
    subtitle: "Pure Gaji Silk · Fine Bandhani Dots",
    description: "Classic Jamnagar Borjaal pattern in vibrant red with ivory dots. Traditional artisan work from the Khatri families of Jamnagar. Suitable for weddings and festive occasions.",
    fabric: "Pure Gaji Silk",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    price: "AUD 420",
    status: "in-stock",       // "in-stock" OR "made-to-order"
    category: "saree",        // "saree" OR "dupatta"
    occasion: ["Wedding", "Festive"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    // IMAGE PATHS — replace with your real image filenames
    // Put your images in an /images/ folder next to index.html
    images: [
      "images/p001-1.jpg",   // main image (model shot or flat lay)
      "images/p001-2.jpg",   // detail / close-up of Bandhani work
      "images/p001-3.jpg",   // pallu / border detail
      "images/p001-4.jpg",   // full drape or second angle
    ],
    // PLACEHOLDER COLOUR shown before real images are added
    placeholderColor: "#8B1A1A",
    whatsappText: "Hi, I'm interested in the Crimson Gaji Silk Bandhani Saree from your collection."
  },
  {
    id: "p002",
    name: "Royal Blue Georgette Bandhani Dupatta",
    subtitle: "Pure Georgette · Borjaal Pattern",
    description: "Vibrant royal blue with classic white Borjaal dots. Lightweight georgette drape, perfect for casual and party styling.",
    fabric: "Pure Georgette",
    blouse: "N/A — Dupatta only",
    length: "2.5 metres",
    care: "Gentle hand wash in cold water. Do not bleach.",
    price: "AUD 180",
    status: "in-stock",
    category: "dupatta",
    occasion: ["Casual", "Party"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p002-1.jpg",
      "images/p002-2.jpg",
      "images/p002-3.jpg",
      "images/p002-4.jpg",
    ],
    placeholderColor: "#1A3A8B",
    whatsappText: "Hi, I'm interested in the Royal Blue Georgette Bandhani Dupatta from your collection."
  },
  {
    id: "p003",
    name: "Saffron Gharchola Bandhani Saree",
    subtitle: "Pure Gaji Silk · Gharchola Weave",
    description: "Traditional Gharchola weave with fine Bandhani work in warm saffron. A bridal staple in Gujarati weddings, rich in heritage significance.",
    fabric: "Pure Gaji Silk",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Dry clean only.",
    price: "AUD 580",
    status: "in-stock",
    category: "saree",
    occasion: ["Wedding", "Bridal"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p003-1.jpg",
      "images/p003-2.jpg",
      "images/p003-3.jpg",
      "images/p003-4.jpg",
    ],
    placeholderColor: "#E8832A",
    whatsappText: "Hi, I'm interested in the Saffron Gharchola Bandhani Saree from your collection."
  },
  {
    id: "p004",
    name: "Forest Green Silk Bandhani Dupatta",
    subtitle: "Modal Silk · Fine Dot Work",
    description: "Deep forest green with intricate fine-dot Bandhani pattern. Versatile dupatta for festive and semi-formal occasions.",
    fabric: "Modal Silk",
    blouse: "N/A — Dupatta only",
    length: "2.5 metres",
    care: "Dry clean recommended.",
    price: "AUD 220",
    status: "made-to-order",
    category: "dupatta",
    occasion: ["Festive"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p004-1.jpg",
      "images/p004-2.jpg",
      "images/p004-3.jpg",
      "images/p004-4.jpg",
    ],
    placeholderColor: "#1B5E20",
    whatsappText: "Hi, I'd like to enquire about a made-to-order Forest Green Silk Bandhani Dupatta."
  },
  {
    id: "p005",
    name: "Deep Maroon Bandhani Saree with Gota Border",
    subtitle: "Pure Gaji Silk · Gota Patti Border",
    description: "Rich maroon with traditional Bandhani work and an ornate Gota Patti border. An ideal wedding saree that commands attention.",
    fabric: "Pure Gaji Silk",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Dry clean only.",
    price: "AUD 650",
    status: "in-stock",
    category: "saree",
    occasion: ["Wedding"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p005-1.jpg",
      "images/p005-2.jpg",
      "images/p005-3.jpg",
      "images/p005-4.jpg",
    ],
    placeholderColor: "#8B1A1A",
    whatsappText: "Hi, I'm interested in the Deep Maroon Bandhani Saree with Gota Border from your collection."
  },
  {
    id: "p006",
    name: "Mustard Yellow Cotton Bandhani Dupatta",
    subtitle: "Pure Cotton · Classic Chunari Pattern",
    description: "Bright mustard yellow in breathable cotton with a classic Chunari Bandhani pattern. Perfect for Navratri and casual wear.",
    fabric: "Pure Cotton",
    blouse: "N/A — Dupatta only",
    length: "2.5 metres",
    care: "Machine wash cold, gentle cycle.",
    price: "AUD 120",
    status: "in-stock",
    category: "dupatta",
    occasion: ["Navratri", "Casual"],
    finishing: ["Roll Press", "Semi-Iron"],
    images: [
      "images/p006-1.jpg",
      "images/p006-2.jpg",
      "images/p006-3.jpg",
      "images/p006-4.jpg",
    ],
    placeholderColor: "#C8973A",
    whatsappText: "Hi, I'm interested in the Mustard Yellow Cotton Bandhani Dupatta from your collection."
  },
  {
    id: "p007",
    name: "Pink & Gold Bandhani Silk Saree",
    subtitle: "Khaddi Georgette · Banarasi Border",
    description: "Soft blush pink with gold Bandhani work and a heavy Banarasi woven border. A statement piece for receptions and sangeet.",
    fabric: "Khaddi Georgette",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Dry clean only.",
    price: "AUD 720",
    status: "made-to-order",
    category: "saree",
    occasion: ["Bridal", "Reception"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p007-1.jpg",
      "images/p007-2.jpg",
      "images/p007-3.jpg",
      "images/p007-4.jpg",
    ],
    placeholderColor: "#C2185B",
    whatsappText: "Hi, I'd like to enquire about a made-to-order Pink & Gold Bandhani Silk Saree."
  },
  {
    id: "p008",
    name: "Teal Bandhani Dupatta with Foil Work",
    subtitle: "Modal Silk · Gold Foil Detailing",
    description: "Striking teal with Bandhani dot pattern enhanced with hand-applied gold foil work. Exclusively finished by our in-house service.",
    fabric: "Modal Silk",
    blouse: "N/A — Dupatta only",
    length: "2.5 metres",
    care: "Dry clean only. Foil work is delicate.",
    price: "AUD 260",
    status: "in-stock",
    category: "dupatta",
    occasion: ["Party", "Festive"],
    finishing: ["Roll Press"],
    images: [
      "images/p008-1.jpg",
      "images/p008-2.jpg",
      "images/p008-3.jpg",
      "images/p008-4.jpg",
    ],
    placeholderColor: "#00695C",
    whatsappText: "Hi, I'm interested in the Teal Bandhani Dupatta with Foil Work from your collection."
  },
  {
    id: "p009",
    name: "Ivory & Gold Gharchola Saree",
    subtitle: "Pure Gaji Silk · Gharchola Weave · Bridal",
    description: "Pure ivory with delicate gold Bandhani dots in traditional Gharchola weave. The quintessential Gujarati bridal saree — timeless and deeply auspicious.",
    fabric: "Pure Gaji Silk",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Dry clean only.",
    price: "AUD 890",
    status: "made-to-order",
    category: "saree",
    occasion: ["Bridal"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p009-1.jpg",
      "images/p009-2.jpg",
      "images/p009-3.jpg",
      "images/p009-4.jpg",
    ],
    placeholderColor: "#9E8A5A",
    whatsappText: "Hi, I'd like to enquire about the made-to-order Ivory & Gold Gharchola Saree for a bridal occasion."
  },
  {
    id: "p010",
    name: "Peacock Blue Bandhani Saree",
    subtitle: "Modal Silk · Scattered Dot Pattern",
    description: "Vibrant peacock blue Modal Silk with evenly scattered fine Bandhani dots. Light, fluid, and perfect for festival and party wear.",
    fabric: "Modal Silk",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Gentle hand wash in cold water.",
    price: "AUD 480",
    status: "in-stock",
    category: "saree",
    occasion: ["Festival", "Party"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p010-1.jpg",
      "images/p010-2.jpg",
      "images/p010-3.jpg",
      "images/p010-4.jpg",
    ],
    placeholderColor: "#0277BD",
    whatsappText: "Hi, I'm interested in the Peacock Blue Bandhani Saree from your collection."
  },
  {
    id: "p011",
    name: "Magenta Bandhani Dupatta",
    subtitle: "Pure Georgette · Chunari Pattern",
    description: "Bold magenta georgette dupatta with classic Chunari Bandhani work. High-energy colour for Navratri and festive occasions.",
    fabric: "Pure Georgette",
    blouse: "N/A — Dupatta only",
    length: "2.5 metres",
    care: "Dry clean recommended.",
    price: "AUD 160",
    status: "in-stock",
    category: "dupatta",
    occasion: ["Casual", "Navratri"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p011-1.jpg",
      "images/p011-2.jpg",
      "images/p011-3.jpg",
      "images/p011-4.jpg",
    ],
    placeholderColor: "#AD1457",
    whatsappText: "Hi, I'm interested in the Magenta Bandhani Dupatta from your collection."
  },
  {
    id: "p012",
    name: "Deep Purple Silk Bandhani Saree",
    subtitle: "Pure Gaji Silk · Borjaal Lattice Pattern",
    description: "Deep royal purple with an intricate Borjaal lattice Bandhani pattern. A standout piece for weddings and receptions where you want to be remembered.",
    fabric: "Pure Gaji Silk",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Dry clean only.",
    price: "AUD 560",
    status: "made-to-order",
    category: "saree",
    occasion: ["Wedding", "Reception"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/p012-1.jpg",
      "images/p012-2.jpg",
      "images/p012-3.jpg",
      "images/p012-4.jpg",
    ],
    placeholderColor: "#4A148C",
    whatsappText: "Hi, I'd like to enquire about a made-to-order Deep Purple Silk Bandhani Saree."
  }
];
```

---

## PART 2 — UPDATE `index.html`

### 2a. Add script tag for products.js
In the `<head>` or just before `</body>`, add:
```html
<script src="products.js"></script>
```

### 2b. Product cards — update the grid rendering
Replace the hardcoded product cards HTML with a JS-rendered grid. The product grid container should have:
```html
<div id="product-grid" class="product-grid"></div>
```
Cards are rendered by `script.js` from `PRODUCTS` array (see Part 4).

### 2c. Add the Product Detail Modal HTML
Add this modal structure just before `</body>`. It is hidden by default and opens when a card is clicked:

```html
<!-- PRODUCT DETAIL MODAL -->
<div id="product-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-product-name">
  <div class="modal-container">
    <button class="modal-close" id="modal-close-btn" aria-label="Close product detail">&times;</button>
    <div class="modal-body">

      <!-- LEFT: Image Gallery -->
      <div class="modal-gallery">
        <div class="modal-main-image-wrap">
          <img id="modal-main-img" src="" alt="" class="modal-main-img" />
        </div>
        <div class="modal-thumbnails" id="modal-thumbnails"></div>
      </div>

      <!-- RIGHT: Product Info -->
      <div class="modal-info">
        <div class="modal-badge-row">
          <span id="modal-status-badge" class="status-badge"></span>
          <span id="modal-category-badge" class="category-badge"></span>
        </div>

        <h2 id="modal-product-name" class="modal-product-name"></h2>
        <p id="modal-subtitle" class="modal-subtitle"></p>
        <p id="modal-price" class="modal-price"></p>
        <p id="modal-description" class="modal-description"></p>

        <!-- Finishing Selector -->
        <div class="finishing-section">
          <p class="finishing-label">Preferred Finishing</p>
          <div class="finishing-options" id="finishing-options"></div>
          <p class="finishing-note" id="finishing-note"></p>
        </div>

        <!-- Detail Accordion -->
        <div class="accordion" id="product-accordion">
          <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">Fabric Details</button>
            <div class="accordion-content">
              <p id="acc-fabric"></p>
              <p id="acc-length"></p>
              <p id="acc-blouse"></p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">Care Instructions</button>
            <div class="accordion-content">
              <p id="acc-care"></p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">Shipping & Delivery</button>
            <div class="accordion-content">
              <p>In-stock pieces are dispatched within 1–2 business days. Made-to-order pieces take 3–4 weeks. We ship to Sydney, Melbourne, Brisbane, Adelaide, and Perth. Express shipping available on request.</p>
            </div>
          </div>
        </div>

        <!-- WhatsApp CTA -->
        <a id="modal-whatsapp-btn" href="#" target="_blank" class="whatsapp-cta-btn" aria-label="Enquire about this product on WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Enquire on WhatsApp
        </a>

        <!-- Occasion tags -->
        <div id="modal-tags" class="modal-tags"></div>
      </div>

    </div>
  </div>
</div>
```

### 2d. Add `images/` folder reference
Create an empty folder called `images/` next to `index.html`. Add a `.gitkeep` file inside so Git tracks it.

---

## PART 3 — UPDATE `styles.css`

Add these new CSS blocks. Keep all existing styles — only ADD these:

```css
/* ===== PRODUCT CARDS ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0;
}
@media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .product-grid { grid-template-columns: 1fr; } }

.product-card {
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}
.product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.13); }

.card-image-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f0eb;
}
.card-image-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  display: block;
}
.card-image-wrap .placeholder-img {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-heading);
  font-size: 14px;
  color: rgba(255,255,255,0.85);
  text-align: center;
  padding: 20px;
}
.product-card:hover .card-image-wrap img { transform: scale(1.04); }

.status-badge {
  position: absolute; top: 12px; left: 12px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
  padding: 4px 10px; border-radius: 20px;
  text-transform: uppercase;
}
.badge-in-stock    { background: var(--color-in-stock); color: #fff; }
.badge-made-to-order { background: var(--color-made-to-order); color: #fff; }

.card-body { padding: 14px 16px 18px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
.card-name { font-family: var(--font-heading); font-size: 15px; font-weight: 600; color: var(--color-dark); line-height: 1.3; }
.card-subtitle { font-size: 12px; color: #888; }
.card-desc { font-size: 13px; color: #555; line-height: 1.5; flex: 1; }
.card-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
.tag-pill { font-size: 11px; background: var(--color-light-grey); color: var(--color-secondary); border-radius: 20px; padding: 3px 10px; }
.card-price { font-size: 15px; font-weight: 700; color: var(--color-secondary); margin-top: 2px; }
.card-cta {
  margin-top: 10px; padding: 10px 16px;
  background: var(--color-primary); color: #fff;
  border: none; border-radius: var(--border-radius);
  font-family: var(--font-body); font-size: 13px; font-weight: 600;
  cursor: pointer; text-align: center;
  transition: var(--transition);
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.card-cta:hover { background: var(--color-secondary); }

/* ===== PRODUCT DETAIL MODAL ===== */
.modal-overlay {
  display: none;
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.65);
  overflow-y: auto;
  padding: 40px 20px;
}
.modal-overlay.open { display: flex; align-items: flex-start; justify-content: center; }

.modal-container {
  background: var(--color-ivory);
  border-radius: 12px;
  width: 100%; max-width: 980px;
  position: relative;
  overflow: hidden;
}
.modal-close {
  position: absolute; top: 16px; right: 20px; z-index: 10;
  background: none; border: none;
  font-size: 28px; color: var(--color-dark);
  cursor: pointer; line-height: 1;
}
.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
@media (max-width: 768px) { .modal-body { grid-template-columns: 1fr; } }

/* Gallery */
.modal-gallery { padding: 28px 24px 28px 28px; background: var(--color-light-grey); }
.modal-main-image-wrap {
  aspect-ratio: 3/4;
  border-radius: 8px;
  overflow: hidden;
  background: #e8e0d8;
  margin-bottom: 12px;
}
.modal-main-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.modal-thumbnails { display: flex; gap: 8px; flex-wrap: wrap; }
.thumb-btn {
  width: 60px; height: 72px;
  border-radius: 6px; overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer; padding: 0; background: none;
  transition: border-color 0.2s;
}
.thumb-btn.active { border-color: var(--color-primary); }
.thumb-btn img { width: 100%; height: 100%; object-fit: cover; }
.thumb-placeholder { width: 100%; height: 100%; }

/* Info panel */
.modal-info { padding: 28px 28px 28px 24px; overflow-y: auto; max-height: 85vh; }
.modal-badge-row { display: flex; gap: 8px; margin-bottom: 12px; }
.category-badge {
  font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
  padding: 4px 10px; border-radius: 20px; text-transform: uppercase;
  background: var(--color-light-grey); color: var(--color-secondary);
}
.modal-product-name { font-family: var(--font-heading); font-size: 22px; color: var(--color-dark); margin: 0 0 4px; }
.modal-subtitle { font-size: 13px; color: #888; margin: 0 0 8px; }
.modal-price { font-size: 20px; font-weight: 700; color: var(--color-secondary); margin: 0 0 12px; }
.modal-description { font-size: 14px; color: #555; line-height: 1.6; margin: 0 0 20px; }

/* Finishing selector */
.finishing-section { margin-bottom: 20px; }
.finishing-label { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-dark); margin-bottom: 8px; }
.finishing-options { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
.finishing-btn {
  padding: 8px 16px; border-radius: 6px;
  border: 1.5px solid var(--color-gold);
  background: transparent; color: var(--color-dark);
  font-size: 13px; cursor: pointer;
  transition: var(--transition);
}
.finishing-btn.selected { background: var(--color-gold); color: #fff; }
.finishing-note { font-size: 12px; color: #777; line-height: 1.5; min-height: 36px; }

/* Accordion */
.accordion { border-top: 1px solid #e0d8ce; margin-bottom: 20px; }
.accordion-item { border-bottom: 1px solid #e0d8ce; }
.accordion-trigger {
  width: 100%; text-align: left; padding: 14px 0;
  background: none; border: none;
  font-family: var(--font-body); font-size: 14px; font-weight: 600;
  color: var(--color-dark); cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
}
.accordion-trigger::after { content: '+'; font-size: 18px; color: var(--color-primary); }
.accordion-trigger[aria-expanded="true"]::after { content: '−'; }
.accordion-content { display: none; padding: 0 0 14px; }
.accordion-content p { font-size: 13px; color: #666; line-height: 1.6; margin: 0 0 6px; }
.accordion-item.open .accordion-content { display: block; }

/* WhatsApp CTA */
.whatsapp-cta-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 14px;
  background: #25D366; color: #fff;
  border-radius: var(--border-radius);
  font-size: 15px; font-weight: 700;
  text-decoration: none;
  transition: var(--transition);
  margin-bottom: 16px;
}
.whatsapp-cta-btn:hover { background: #1ebe5a; }

/* Modal tags */
.modal-tags { display: flex; flex-wrap: wrap; gap: 6px; }

/* ===== FILTER BAR ===== */
.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.filter-btn {
  padding: 8px 20px; border-radius: 30px;
  border: 1.5px solid var(--color-gold);
  background: transparent; color: var(--color-dark);
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: var(--transition);
}
.filter-btn.active, .filter-btn:hover { background: var(--color-gold); color: #fff; border-color: var(--color-gold); }
```

---

## PART 4 — UPDATE `script.js`

Replace or extend the existing script.js with these functions. Keep all existing code (sticky nav, smooth scroll, etc.) and ADD:

```js
// ============================================================
// PRODUCT RENDERING
// ============================================================

const WHATSAPP_NUMBER = "61XXXXXXXXXX"; // ← replace with real number

const FINISHING_NOTES = {
  "Roll Press":  "Saree will be roller pressed. Fall and bidding will be done.",
  "Semi-Iron":   "Saree will remain slightly crushed with extra cloth at pleating area. Fall and bidding will be done.",
  "Crush":       "Saree will remain crushed as-is. Fall and bidding will not be done."
};

function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  let filtered = PRODUCTS;
  if (filter === "sarees")       filtered = PRODUCTS.filter(p => p.category === "saree");
  if (filter === "dupattas")     filtered = PRODUCTS.filter(p => p.category === "dupatta");
  if (filter === "available")    filtered = PRODUCTS.filter(p => p.status === "in-stock");
  if (filter === "made-to-order") filtered = PRODUCTS.filter(p => p.status === "made-to-order");

  grid.innerHTML = filtered.map(p => {
    const hasImage = p.images && p.images[0];
    const imgHTML = hasImage
      ? `<img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : "";
    const placeholderStyle = hasImage ? "display:none" : "";

    return `
    <article class="product-card" onclick="openModal('${p.id}')" tabindex="0"
      onkeydown="if(event.key==='Enter')openModal('${p.id}')"
      aria-label="View details for ${p.name}">
      <div class="card-image-wrap">
        ${imgHTML}
        <div class="placeholder-img" style="background:${p.placeholderColor};${placeholderStyle}">
          ${p.name}
        </div>
        <span class="status-badge ${p.status === 'in-stock' ? 'badge-in-stock' : 'badge-made-to-order'}">
          ${p.status === 'in-stock' ? 'In Stock' : 'Made to Order'}
        </span>
      </div>
      <div class="card-body">
        <p class="card-name">${p.name}</p>
        <p class="card-subtitle">${p.subtitle}</p>
        <p class="card-desc">${p.description.substring(0,90)}...</p>
        <div class="card-tags">
          ${p.occasion.map(o => `<span class="tag-pill">#${o}</span>`).join("")}
        </div>
        <p class="card-price">${p.price}</p>
        <button class="card-cta" onclick="event.stopPropagation();openModal('${p.id}')">
          View Details
        </button>
      </div>
    </article>`;
  }).join("");
}

// ============================================================
// FILTER BAR
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
});

// ============================================================
// MODAL
// ============================================================
let selectedFinishing = "";

function openModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  // Status badge
  const statusBadge = document.getElementById("modal-status-badge");
  statusBadge.textContent = p.status === "in-stock" ? "In Stock" : "Made to Order";
  statusBadge.className = `status-badge ${p.status === "in-stock" ? "badge-in-stock" : "badge-made-to-order"}`;

  document.getElementById("modal-category-badge").textContent = p.category === "saree" ? "Saree" : "Dupatta";
  document.getElementById("modal-product-name").textContent = p.name;
  document.getElementById("modal-subtitle").textContent = p.subtitle;
  document.getElementById("modal-price").textContent = p.price;
  document.getElementById("modal-description").textContent = p.description;
  document.getElementById("acc-fabric").textContent  = "Fabric: " + p.fabric;
  document.getElementById("acc-length").textContent  = "Length: " + p.length;
  document.getElementById("acc-blouse").textContent  = "Blouse: " + p.blouse;
  document.getElementById("acc-care").textContent    = p.care;

  // Tags
  document.getElementById("modal-tags").innerHTML = p.occasion
    .map(o => `<span class="tag-pill">#${o}</span>`).join("");

  // Finishing selector
  selectedFinishing = p.finishing[0];
  const finOpts = document.getElementById("finishing-options");
  finOpts.innerHTML = p.finishing.map(f => `
    <button class="finishing-btn ${f === selectedFinishing ? 'selected' : ''}"
      onclick="selectFinishing('${f}', this)">${f}</button>
  `).join("");
  document.getElementById("finishing-note").textContent = FINISHING_NOTES[selectedFinishing] || "";

  // Image gallery
  const mainImg = document.getElementById("modal-main-img");
  const thumbs  = document.getElementById("modal-thumbnails");

  if (p.images && p.images[0]) {
    mainImg.src = p.images[0];
    mainImg.alt = p.name;
    thumbs.innerHTML = p.images.map((img, i) => `
      <button class="thumb-btn ${i === 0 ? 'active' : ''}"
        onclick="swapMainImage('${img}', this)" aria-label="View image ${i+1}">
        <img src="${img}" alt="${p.name} view ${i+1}" loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=thumb-placeholder style=background:${p.placeholderColor}></div>'">
      </button>`).join("");
  } else {
    mainImg.src = "";
    mainImg.alt = "";
    mainImg.style.display = "none";
    thumbs.innerHTML = "";
  }

  // WhatsApp CTA with finishing
  updateWhatsAppLink(p);

  // Open modal
  const modal = document.getElementById("product-modal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function selectFinishing(value, btn) {
  selectedFinishing = value;
  document.querySelectorAll(".finishing-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  document.getElementById("finishing-note").textContent = FINISHING_NOTES[value] || "";

  // Re-find product and update WhatsApp link
  const name = document.getElementById("modal-product-name").textContent;
  const p = PRODUCTS.find(x => x.name === name);
  if (p) updateWhatsAppLink(p);
}

function updateWhatsAppLink(p) {
  const msg = encodeURIComponent(`${p.whatsappText} Preferred finishing: ${selectedFinishing}.`);
  document.getElementById("modal-whatsapp-btn").href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function swapMainImage(src, btn) {
  document.getElementById("modal-main-img").src = src;
  document.querySelectorAll(".thumb-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// Close modal
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  document.getElementById("product-modal").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Accordion
  document.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion-item").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
});

function closeModal() {
  document.getElementById("product-modal").classList.remove("open");
  document.body.style.overflow = "";
}
```

---

## PART 5 — FOLDER STRUCTURE AFTER ALL CHANGES

```
bandhani-australia/
  ├── index.html         ← updated
  ├── styles.css         ← updated (new modal + card styles added)
  ├── script.js          ← updated (product rendering + modal logic)
  ├── products.js        ← NEW — edit this to update products & images
  └── images/
       ├── .gitkeep      ← so Git tracks the empty folder
       ├── p001-1.jpg    ← add your images here (see image guide)
       ├── p001-2.jpg
       ├── p001-3.jpg
       ├── p001-4.jpg
       ├── p002-1.jpg
       └── ... etc
```

---

## WHAT TO TELL CLAUDE CODE (copy-paste this as your prompt)

> "I have an existing Bandhani Australia static website with index.html, styles.css, and script.js. Please apply the following updates:
> 1. Create a new `products.js` file with the full PRODUCTS array as specified
> 2. Update `index.html` to load products.js and render cards dynamically from the PRODUCTS array, replacing any hardcoded product HTML
> 3. Add the product detail modal HTML to index.html (structure provided)
> 4. Add all new CSS blocks to styles.css (do not remove existing styles)
> 5. Update script.js with the product rendering, filter, and modal functions (keep existing sticky nav and scroll functions)
> 6. Create an `images/` folder with a `.gitkeep` file
> The product cards should show a coloured placeholder when images are missing, and automatically show the real image once the file exists in the images/ folder."
