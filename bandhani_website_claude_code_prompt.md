# CLAUDE CODE PROMPT — Bandhani Australia Static Website

---

## CONTEXT & RESEARCH SUMMARY (Do not skip — shapes all decisions)

**Indian Market Leaders (Bandhani-specific):**
- `khatrijamnadas.com` — Authentic Jamnagar/Gujarati Bandhani, heritage positioning, specialist tone
- `onlinebandhej.com` (KCPC Bandhani, est. 1978) — Specialist only, strong trust signals, express dispatch messaging
- `weaveinindia.com` — Authenticity-first copy, fabric education, premium positioning
- `jhakhas.com` — Rajasthan Bandhej specialist, strong product filtering, occasion-driven copy

**Australian Market Gap (confirmed by research):**
- `simplysarees.com.au` (Melbourne) — Physical + online, appointment model, in-stock ready-to-post model ✅ closest competitor
- `kanchiaustralia.com.au` (Brisbane) — personal founder story, curated collection, all saree types
- `fabricoz.com.au`, `sareeka.com`, `indyvogue.com` — All generalist (all saree types, no Bandhani focus)
- **ZERO Australian sites are dedicated Bandhani-only sellers** — this is our whitespace
- No Australian competitor offers Bandhani services (Foil/Fol work, Chheda, Roll Polish)

**Our Unique Position:**
- Only Jamnagar Bandhani specialist in Australia
- Limited 50 pieces = curated exclusivity (not a warehouse)
- Services no one else offers locally
- WhatsApp-first = personalised concierge buying experience
- Immediate dispatch from Australian stock

---

## BUILD INSTRUCTIONS

Build a complete, beautiful, production-ready **static HTML/CSS/JS website** (single `index.html` file + one `styles.css` + one `script.js`) for a Bandhani saree and dupatta business targeting Australian Indian women.

**No backend. No checkout. No database. No frameworks required.**
Use vanilla HTML5, CSS3, and minimal vanilla JS only.

---

## BRAND IDENTITY

**Business Name:** Bandhani Australia *(use this throughout)*
**Tagline:** *"Jamnagar's Finest. Yours in Australia."*
**Brand Personality:** Elegant, warm, trustworthy, heritage-proud, boutique
**Aesthetic:** Rich jewel tones (deep saffron `#E8832A`, heritage maroon `#8B1A1A`, gold `#C8973A`, ivory `#FAF6F0`, charcoal `#2C2C2C`)
**Typography:** Use Google Fonts — `Playfair Display` for headings, `Lato` for body
**Logo placeholder:** A circular emblem with stylised "BA" monogram and the tagline below it

---

## WEBSITE SECTIONS — FULL COPY & STRUCTURE

### 1. NAVIGATION BAR
- Sticky, semi-transparent with blur on scroll
- Logo left, nav links right: `Collection | Services | About | Contact`
- Mobile hamburger menu
- CTA button in nav: `Order via WhatsApp` (green WhatsApp icon, links to `https://wa.me/61XXXXXXXXXX`)

---

### 2. HERO SECTION

**Use Variation 1 as primary default (other 2 coded but hidden, swap via JS class):**

**Variation 1 — Emotional Heritage:**
- Headline: `Every Knot Tells a Story.`
- Subheadline: `Authentic Jamnagar Bandhani — Handcrafted for You, Here in Australia.`
- Body: *"Thousands of tiny knots. Vibrant dyes. Generations of mastery from the artisan families of Jamnagar. Each Bandhani saree and dupatta in our collection carries that living heritage — now available in your city, ready when you are."*
- CTA Button: `Explore the Collection` (scrolls to collection section)
- Secondary CTA: `Contact to Order` (opens WhatsApp)

**Variation 2 — Scarcity/Exclusivity:**
- Headline: `50 Pieces. One Craft. Zero Compromises.`
- Subheadline: `Our Current Collection — Genuine Bandhani, Physically Here in Australia.`
- Body: *"We carry exactly 50 carefully selected Bandhani sarees and dupattas at any time. No fillers, no generics — just authentic Jamnagar Bandhani, ready for immediate dispatch to your door."*
- CTA: `View Current Collection`

**Variation 3 — Occasion/Aspiration:**
- Headline: `Dress for the Moments That Matter.`
- Subheadline: `Bandhani Sarees & Dupattas — from Jamnagar to Your Doorstep in Australia.`
- Body: *"Whether it's a wedding, a puja, a Navratri celebration, or simply the joy of wearing something beautiful — our Bandhani pieces are made for women who love tradition without compromising on quality."*
- CTA: `Shop the Collection`

**Hero Visual:** Full-width background with a rich jewel-toned overlay gradient (saffron to maroon, 60% opacity) on a placeholder `hero-bg.jpg`. Add a small floating badge: `✦ Ships Across Australia ✦`

---

### 3. TRUST BAR (below hero)
A thin full-width strip with 4 icons + short text:
- 🪡 `Authentic Jamnagar Craft`
- 🇦🇺 `Based in Australia`
- 📦 `Immediate Dispatch on In-Stock Pieces`
- 💬 `Personal WhatsApp Service`

---

### 4. CURRENT COLLECTION SECTION

**Section Header:** `Our Current Collection`
**Intro Paragraph:**
*"These are the Bandhani sarees and dupattas physically with us in Australia right now. Each piece has been hand-selected from Jamnagar's finest artisan workshops. What you see is what we have — and what we have won't last.*

*You can purchase any piece for immediate dispatch, or request the same or similar design for a 3–4 week custom order. Either way, we're just a WhatsApp message away."*

**Filter Bar (JS-powered, no backend):**
Filter buttons: `All` | `Sarees` | `Dupattas` | `Available Now` | `Made to Order`

**Product Grid:**
- Responsive CSS grid: 4 columns desktop → 3 tablet → 2 mobile
- Generate **12 sample product cards** as realistic placeholders. Use this data pattern for each card:

```
Card Structure:
- Product image placeholder (aspect ratio 3:4, background gradient using brand colors, centered text showing product name)
- Badge (top-left): "In Stock" (green) OR "Made to Order" (gold)
- Product Name (e.g., "Crimson Gaji Silk Bandhani Saree")
- Subtitle: fabric + work (e.g., "Pure Gaji Silk · Fine Bandhani Dots")
- Short description (1 line): "Classic Jamnagar Borjaal pattern in vibrant red with ivory dots"
- Tags: #Wedding #Festive (small pill tags)
- CTA Button: "Enquire on WhatsApp" (opens WhatsApp with pre-filled message: "Hi, I'm interested in [Product Name] from your collection.")
```

**12 Sample Products to generate (mix of in-stock and made-to-order):**
1. Crimson Gaji Silk Bandhani Saree — In Stock — Wedding/Festive
2. Royal Blue Georgette Bandhani Dupatta — In Stock — Casual/Party
3. Saffron Gharchola Bandhani Saree — In Stock — Wedding/Bridal
4. Forest Green Silk Bandhani Dupatta — Made to Order — Festive
5. Deep Maroon Bandhani Saree with Gota Border — In Stock — Wedding
6. Mustard Yellow Cotton Bandhani Dupatta — In Stock — Navratri/Casual
7. Pink & Gold Bandhani Silk Saree — Made to Order — Bridal/Reception
8. Teal Bandhani Dupatta with Foil Work — In Stock — Party/Festive
9. Ivory & Gold Gharchola Saree — Made to Order — Bridal
10. Peacock Blue Bandhani Saree — In Stock — Festival/Party
11. Magenta Bandhani Dupatta — In Stock — Casual/Navratri
12. Deep Purple Silk Bandhani Saree — Made to Order — Wedding/Reception

**"View More / Load More" button** (JS: reveals next 12 dummy cards on click, shows message "Contact us to see our full current stock")

---

### 5. HOW IT WORKS SECTION

**Heading:** `How to Order`
**3-step process (horizontal card layout):**

**Step 1 — Browse & Choose**
Icon: 👁
*"Explore our current collection of 50 Bandhani pieces. Find what speaks to you — a saree for a wedding, a dupatta for Navratri, or a piece you've always dreamed of owning."*

**Step 2 — Reach Out**
Icon: 💬
*"Contact us via WhatsApp, phone, or email. Share which piece you love, ask questions about fabric and finish, and we'll guide you personally. No bots. No forms."*

**Step 3 — Receive Your Piece**
Icon: 📦
*"In-stock pieces are dispatched immediately. Custom or similar-design orders are ready in 3–4 weeks. We ship to all Australian metro cities — Sydney, Melbourne, Brisbane, Adelaide, and Perth."*

---

### 6. SERVICES SECTION

**Heading:** `Bandhani Services`
**Subheading:** *"We don't just sell Bandhani — we transform it."*
**Intro:** *"Bring your existing Bandhani pieces to life with our specialist services, available exclusively for our customers in Australia."*

**3 Service Cards:**

**Foil Work (Fol)**
Icon: ✨
*"Add a layer of golden or silver foil detailing to your Bandhani saree or dupatta. Foil work elevates the piece for weddings, receptions, and grand celebrations without overpowering the Bandhani patterns underneath."*
CTA: `Enquire about Foil Work`

**Chheda Work**
Icon: 🪡
*"Chheda is a traditional Gujarati finishing technique applied to the edge or pallu of a Bandhani saree — adding fine decorative detailing that completes the piece and honours its heritage roots."*
CTA: `Enquire about Chheda`

**Roll Polish**
Icon: 💎
*"Roll Polish gives your Bandhani fabric a lustrous, refined finish — smoothing the texture and enhancing the vibrancy of the colours. Perfect for special occasions where you want your saree to truly shine."*
CTA: `Enquire about Roll Polish`

---

### 7. ABOUT SECTION

**Heading:** `The Story Behind Bandhani Australia`
**Copy:**
*"Bandhani is not just a textile technique — it's a living tradition, practised by artisan families in Jamnagar, Gujarat, for over a thousand years. Each saree or dupatta begins with a plain fabric and is transformed — knot by knot — into something extraordinary.*

*We started Bandhani Australia because we wanted to bring that extraordinary craft directly to our community here. Not mass-produced imitations. Not sarees sourced from wherever is cheapest. But real Bandhani, from real artisans, with authenticity you can see and feel.*

*We are proudly based in Australia. We know our customers personally. We hand-select every piece. And we stand behind everything we sell — with a real phone number and a real WhatsApp conversation."*

**Stats bar (3 numbers):**
- `50+` Pieces curated at any time
- `3–4 Weeks` Custom order delivery
- `5 Cities` Served across Australia

---

### 8. TESTIMONIALS SECTION (Placeholder — styled for future real reviews)

**Heading:** `What Our Customers Say`
**3 placeholder testimonial cards:**

*"I bought a Bandhani saree for my daughter's wedding — the quality was exactly what I remembered from India. So glad to have found this in Australia."*
— Priya M., Sydney

*"The dupatta I ordered had the most beautiful Jamnagar Borjaal pattern. The foil work they added was perfect. Highly recommend."*
— Deepa K., Melbourne

*"Ordering through WhatsApp felt so personal. They helped me choose the right saree for Navratri and it arrived quickly. Will definitely order again."*
— Anita S., Brisbane

---

### 9. INSTAGRAM FEED PLACEHOLDER

**Heading:** `Follow Our Collection on Instagram`
**Subheading:** `@bandhaniau` *(placeholder handle)*
**Show 6 placeholder image tiles** (coloured boxes using brand palette with Instagram icon overlay)
**CTA:** `Follow Us on Instagram` button

---

### 10. CONTACT / ORDER SECTION

**Heading:** `Ready to Order? Let's Talk.`
**Subheading:** *"We don't have an online checkout — because great Bandhani deserves a real conversation."*

**3 contact method cards:**

**WhatsApp (Primary)**
Icon: WhatsApp green logo
*"The fastest way to order, ask questions, or request a custom piece. We typically reply within a few hours."*
Button: `Chat on WhatsApp` → `https://wa.me/61XXXXXXXXXX?text=Hi, I'd like to enquire about your Bandhani collection`

**Phone**
Icon: 📞
*"Prefer to talk? Call us directly.*"
Display: `+61 XXX XXX XXX`
*"Available Monday–Saturday, 9am–7pm AEST"*

**Email**
Icon: ✉️
*"For detailed enquiries, custom orders, or service requests."*
Display: `hello@bandhaniaustralia.com.au` *(placeholder)*

**Shipping note (highlighted box):**
`📦 We ship to Sydney · Melbourne · Brisbane · Adelaide · Perth`
`Standard delivery: 2–5 business days | Express available on request`

---

### 11. FOOTER

**Left:** Logo + tagline `"Jamnagar's Finest. Yours in Australia."`
**Centre:** Quick links — Collection | Services | About | Contact | Privacy Policy
**Right:** Social icons — Instagram | Facebook | WhatsApp
**Bottom bar:** `© 2025 Bandhani Australia. All rights reserved. | ABN: XX XXX XXX XXX`
**Small note:** `Handcrafted Bandhani sourced directly from artisan families in Jamnagar, Gujarat, India.`

---

## TECHNICAL REQUIREMENTS

- **Single `index.html`** with embedded or linked CSS/JS
- **Mobile-first responsive** (breakpoints: 480px, 768px, 1024px, 1280px)
- **Smooth scroll** for all nav anchor links
- **Sticky nav** that changes background opacity on scroll (JS)
- **Filter functionality** on product grid (vanilla JS, filter by data attributes)
- **WhatsApp CTA** links pre-fill message with product name (data attribute on each card)
- **Lazy loading** for all product images (use `loading="lazy"`)
- **CSS animations:** Subtle fade-in on scroll for section headers (Intersection Observer)
- **No placeholder lorem ipsum** — all copy is final production-ready text as written above
- **Accessibility:** All images have descriptive `alt` text, all CTAs have `aria-label`, colour contrast meets WCAG AA
- **Performance:** Minify inline CSS, use system fonts as fallback if Google Fonts fail to load
- **Meta tags:** Full SEO meta title, description, Open Graph tags
  - Title: `Bandhani Australia — Authentic Jamnagar Bandhani Sarees & Dupattas`
  - Description: `Shop handcrafted Jamnagar Bandhani sarees and dupattas in Australia. In-stock pieces available for immediate dispatch to Sydney, Melbourne, Brisbane, Adelaide and Perth. Contact via WhatsApp.`

---

## COLOUR & STYLE TOKENS (Use as CSS variables)

```css
:root {
  --color-primary: #E8832A;       /* Saffron orange */
  --color-secondary: #8B1A1A;     /* Heritage maroon */
  --color-gold: #C8973A;          /* Bandhani gold */
  --color-ivory: #FAF6F0;         /* Warm ivory background */
  --color-dark: #2C2C2C;          /* Charcoal text */
  --color-light-grey: #F5F0EB;    /* Section alternate background */
  --color-white: #FFFFFF;
  --color-in-stock: #2E7D32;      /* Green for in-stock badge */
  --color-made-to-order: #C8973A; /* Gold for made-to-order badge */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Lato', Arial, sans-serif;
  --border-radius: 8px;
  --shadow: 0 4px 20px rgba(0,0,0,0.08);
  --transition: all 0.3s ease;
}
```

---

## DELIVERABLES

Output the following files:
1. `index.html` — complete page structure with all sections
2. `styles.css` — full stylesheet using CSS variables, mobile-first
3. `script.js` — sticky nav, product filtering, smooth scroll, scroll animations

**Do not use any CSS frameworks (Bootstrap, Tailwind etc.). Pure CSS only.**
**Do not use any JS libraries (jQuery, etc.). Vanilla JS only.**

The site should look like a premium boutique brand — clean, elegant, with rich use of the jewel-tone palette. Reference the visual aesthetic of high-end Indian ethnic wear boutiques, not generic e-commerce templates.