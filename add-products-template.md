# Bandhani Australia — Add Products Template

Fill one block per new piece. Copy a block for each product. Leave price OUT — it stays hidden until confirmed from the Stock sheet.

Slug rule: `po<NNN>-lowercase-hyphenated-name` (no spaces, no capitals).
Example: PO-002 + "Deep Magenta Bandhani Saree" -> `po002-deep-magenta-bandhani-saree`

---

PRODUCT
Name: Rani Pink Bandhani Choli
Type: Choli
PO #: PO-002
Qty remaining: 1
Images folder: po002-rani-pink-bandhani-choli
Has video?: no
Notes (optional): Rani-pink mirror-work choli with flared skirt, colourful woven Kutchi border and gold fringe, paired with an ivory net dupatta with pink & blue floral embroidery. Also available in a grey-blue & magenta bridal colourway. Festive / wedding-guest piece. [Sheet: No 12 · $130]

═══════════════════════════════════════════════

PRODUCT
Name: Black & Red Mirror-Work Choli
Type: Choli
PO #: PO-002
Qty remaining: 2
Images folder: po002-black-red-mirrorwork-choli
Has video?: no
Notes (optional): Black mirror-work blouse with red thread embroidery, black flared skirt with gold gota borders and scalloped hem, finished with a red fringed dupatta. Bold Navratri / garba piece. [Sheet: No 4 · $85]

═══════════════════════════════════════════════

PRODUCT
Name: Beige & Gold Tiered Choli
Type: Choli
PO #: PO-002
Qty remaining: 1
Images folder: po002-beige-gold-tiered-choli
Has video?: no
Notes (optional): Beige tiered choli set with gold gota trim, paired with a deep purple dupatta covered in fine gold zari embroidery. Also available in an emerald green & gold colourway. Elegant festive piece. [Sheet: No 7 · $85]

═══════════════════════════════════════════════

PRODUCT
Name: Emerald Green Gota Choli
Type: Choli
PO #: PO-002
Qty remaining: 1
Images folder: po002-emerald-green-gota-choli
Has video?: no
Notes (optional): Deep emerald green choli with vertical gold gota stripes on the blouse, a full pleated skirt, and a matching green dupatta with a heavy gold sequinned border. Same design as the beige/gold tiered set in a green colourway. Rich Diwali / evening piece. [Sheet: No 7 · $85]

═══════════════════════════════════════════════

PRODUCT
Name: Pink & Teal Mirror Choli
Type: Choli
PO #: PO-002
Qty remaining: 1
Images folder: po002-pink-teal-mirror-choli
Has video?: no
Notes (optional): Rani-pink mirror-work blouse and gold-striped skirt paired with a deep teal-blue dupatta with a scalloped gold-embroidered border. Vibrant colour-block festive set. [Sheet: No 5 · $75]

═══════════════════════════════════════════════

PRODUCT
Name: Black & Yellow Chevron Choli
Type: Choli
PO #: PO-002
Qty remaining: 1
Images folder: po002-black-yellow-chevron-choli
Has video?: no
Notes (optional): Striking black choli with a yellow chevron bust and mirror-and-gota skirt hem in yellow, styled with a rani-pink Bandhani pom-pom dupatta. Playful, high-contrast garba piece. [Sheet: No 10 · $90]

═══════════════════════════════════════════════

PRODUCT
Name: Rust Orange & Ivory Choli
Type: Choli
PO #: PO-002
Qty remaining: 1
Images folder: po002-rust-orange-ivory-choli
Has video?: no
Notes (optional): Rust-orange choli and skirt with a wide cream contrast border and delicate gold embroidery, finished with a soft ivory embroidered dupatta. Warm, understated festive elegance. [Sheet: No 6 · $75]

═══════════════════════════════════════════════

PRODUCT
Name: Grey-Blue Bridal Lehenga Choli
Type: Choli
PO #: PO-002
Qty remaining: 1
Images folder: po002-grey-blue-bridal-lehenga
Has video?: no
Notes (optional): Grey-blue lehenga with a magenta zari-embroidered border and matching magenta paisley dupatta — a bridal-grade, heavily worked festive piece. Same design as the rani-pink colourway. [Sheet: No 12 · $130]

═══════════════════════════════════════════════

PRODUCT
Name: Olive Green Polka Lehenga
Type: Choli
PO #: PO-002
Qty remaining: 3
Images folder: po002-olive-green-polka-lehenga
Has video?: no
Notes (optional): Full olive-green lehenga with large metallic gold polka motifs and a gota-trimmed blouse, styled with a deep brown Bandhani dupatta. Also available in a teal-blue colourway with a rani-pink dupatta. Statement Navratri piece. [Sheet: No 2 · $80 · 3 remaining across both colours]
---

### What happens with each field
| You give | I produce |
|---|---|
| Name, Type, PO#, Qty, Slug, Has video | A complete products.js entry + a written description |
| (price left blank) | `priceAud: null` -> price hidden on site (unchanged behaviour) |
| Qty | Auto-sets status: 0 = sold-out (hidden), 1 = last-1, <=5 = almost-gone, >5 = in-stock |
| Slug | All image paths (hero-1, hero-2, detail-1, clip.mp4) derived automatically |

### What I CANNOT fill (and why price stays blank)
Price, exact stock accuracy, and the official catalogue name must come from your Stock sheet.
I won't guess a price — a wrong price is worse than a hidden one. Confirm prices from the
Stock sheet later and we'll unhide them in one pass.
