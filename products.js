/* =============================================
   Bandhani Australia — products.js
   Edit THIS FILE to add/update products.

   IMAGE / VIDEO CONVENTION (per product folder under /images/):
     images/<imagesFolder>/hero-1.<ext>     ← primary still (card poster)
     images/<imagesFolder>/hero-2.<ext>     ← secondary still
     images/<imagesFolder>/detail-1.<ext>   ← supporting close-up
     images/<imagesFolder>/detail-2.<ext>   ← supporting close-up
     images/<imagesFolder>/clip.mp4         ← 5-sec lookbook video (if hasVideo)

   Only list the stills that actually exist in `stills` (in display order).
   Paths are DERIVED by productImages() below — never hardcode a full path here.

   PRICES/QTY BELOW ARE ILLUSTRATIVE PLACEHOLDERS.
   // TODO(Alpa/Gaurav): replace priceAud + qtyRemain + status with the real
   // figures from the Stock sheet before the site goes live.
   ============================================= */

const PRODUCTS = [
  {
    id: "p001",
    po: "PO-002-01",
    collection: "PO-002",              // drop/batch — Collection filter derives from this
    name: "Dana Bandhani Standard Saree",
    type: "Saree",                     // "Saree" | "Dupatta" | "Choli"
    subtitle: "Silk · Dana Bandhani Diamond Dots",
    description: "Deep royal purple silk, scattered with dana bandhani diamond dots in gold and silver-white that cluster denser toward the lower border. A soft-sheen drape made for weddings and receptions — thousands of hand-tied knots, each one a decision.",
    fabric: "Silk (soft-sheen art silk)",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5m saree + 0.8m blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    occasion: ["Wedding", "Reception", "Festive"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    priceAud: 420,                     // PLACEHOLDER
    qtyRemain: 9,                      // PLACEHOLDER
    status: "in-stock",                // "in-stock" | "last-1" | "almost-gone" | "sold-out"
    imagesFolder: "po002-dana-bandhani-standard",
    imagesExt: "jpg",
    stills: ["hero-1", "hero-2", "detail-1", "detail-2"],
    hasVideo: true,
    placeholderColor: "#4A148C",
    whatsappText: "Hi, I'm interested in the Dana Bandhani Standard Saree from your collection."
  },
  {
    id: "p002",
    po: "PO-002-02",
    collection: "PO-002",
    name: "Dana Bandhani Blue Saree",
    type: "Saree",
    subtitle: "Silk · Chandrakhani Medallion",
    description: "Deep indigo silk built around a single sunburst chandrakhani medallion — white-to-pink rings radiating outward, framed by magenta dana-dot clusters and a crinkled gold zari border. One large gesture, thousands of small knots.",
    fabric: "Silk (soft-sheen art silk)",
    blouse: "Matching blouse piece included",
    length: "5.5m saree + blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    occasion: ["Wedding", "Festive"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    priceAud: 460,                     // PLACEHOLDER
    qtyRemain: 4,                      // PLACEHOLDER
    status: "almost-gone",
    imagesFolder: "po002-blue-flower",
    imagesExt: "png",
    stills: ["hero-1", "hero-2", "detail-1", "detail-2"],
    hasVideo: false,
    placeholderColor: "#1A3A8B",
    whatsappText: "Hi, I'm interested in the Dana Bandhani Blue Saree from your collection."
  },
  {
    id: "p003",
    po: "PO-002-03",
    collection: "PO-002",
    name: "Maroon Abstract Bandhani Saree",
    type: "Saree",
    subtitle: "Silk · Contemporary Marbled Bandhani",
    description: "A modern take on the craft — organic marbled clusters of cream and rust bleeding across a deep maroon ground, with no central medallion and an understated self-coloured border. Contemporary bandhani for the woman who wants tradition, quietly.",
    fabric: "Soft silk (light sheen art silk)",
    blouse: "Matching printed blouse in the same maroon-cream pattern",
    length: "5.5m saree + blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    occasion: ["Festive", "Party"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    priceAud: 380,                     // PLACEHOLDER
    qtyRemain: 11,                     // PLACEHOLDER
    status: "in-stock",
    imagesFolder: "po002-bandhani-maroon",
    imagesExt: "png",
    stills: ["hero-1", "hero-2", "detail-1", "detail-2"],
    hasVideo: false,
    placeholderColor: "#6B0F1A",
    whatsappText: "Hi, I'm interested in the Maroon Abstract Bandhani Saree from your collection."
  },
  {
    id: "p004",
    po: "PO-002-04",
    collection: "PO-002",
    name: "Deep Magenta Bandhani Saree",
    type: "Saree",
    subtitle: "Silk · Dana Dots · Gold-Purple Zari",
    description: "Dana bandhani diamond dots in gold, silver-white and mauve, densely worked across a deep wine-magenta ground, finished with a woven gold-and-purple zari border along the pallu and hem. Rich, saturated, unmistakably festive.",
    fabric: "Silk (soft sheen)",
    blouse: "Matching blouse piece included",
    length: "5.5m saree + blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    occasion: ["Wedding", "Reception", "Festive"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    priceAud: 520,                     // PLACEHOLDER
    qtyRemain: 1,                      // PLACEHOLDER
    status: "last-1",
    imagesFolder: "po002-deep-magenta-bandhani-saree",
    imagesExt: "png",
    stills: ["hero-1"],
    hasVideo: true,
    placeholderColor: "#880E4F",
    whatsappText: "Hi, I'm interested in the Deep Magenta Bandhani Saree from your collection."
  },
  {
    id: "p005",
    po: "PO-002-05",
    collection: "PO-002",
    name: "Magenta Bandhani Saree",
    type: "Saree",
    subtitle: "Silk · Dana Dots · Gold-Purple Zari",
    description: "Dana bandhani diamond dots in gold, silver-white and soft pink, densely scattered across an orchid violet-magenta body, with a woven gold-and-purple zari border. A brighter sister to the deep magenta — the same craft, a lighter mood.",
    fabric: "Silk (soft sheen)",
    blouse: "Matching blouse piece included",
    length: "5.5m saree + blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    occasion: ["Festive", "Party"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    priceAud: 500,                     // PLACEHOLDER
    qtyRemain: 7,                      // PLACEHOLDER
    status: "in-stock",
    imagesFolder: "po002-magenta-saree",
    imagesExt: "png",
    stills: ["hero-1"],
    hasVideo: true,
    placeholderColor: "#AD1457",
    whatsappText: "Hi, I'm interested in the Magenta Bandhani Saree from your collection."
  },
  {
    // NOTE(brand-fit): the folder metadata flags this as Ajrakh-style BLOCK PRINT,
    // not bandhani tie-dye. Copy describes it accurately. Confirm whether it
    // belongs in the Bandhani collection before launch.
    id: "p006",
    po: "PO-002-06",
    collection: "PO-002",
    name: "Maroon Ajrakh-Print Saree",
    type: "Saree",
    subtitle: "Silk · Ajrakh Block-Print Medallions",
    description: "A change of technique — large Ajrakh-style block-print paisley medallions in charcoal, mustard-gold and cream, scattered across a deep oxblood ground and finished with a zari-trimmed woven border. Block-printed, not tie-dyed; heritage of a different Gujarati hand.",
    fabric: "Silk (soft sheen), zari-trimmed woven border",
    blouse: "Matching blouse piece included",
    length: "5.5m saree + blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    occasion: ["Festive", "Party", "Casual"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    priceAud: 340,                     // PLACEHOLDER
    qtyRemain: 6,                      // PLACEHOLDER
    status: "in-stock",
    imagesFolder: "po002-maroon-ajrakh-saree",
    imagesExt: "png",
    stills: ["hero-1"],
    hasVideo: true,
    placeholderColor: "#4E342E",
    whatsappText: "Hi, I'm interested in the Maroon Ajrakh-Print Saree from your collection."
  },
  {
    id: "p007",
    po: "PO-002-07",
    collection: "PO-002",
    name: "White Bandhani Chaniya Choli",
    type: "Choli",
    subtitle: "Silk · Bandhani Skirt · Mirror-Work Border",
    description: "An ivory-white chaniya with bandhani dotwork and a deep red-maroon border, paired with a royal-blue embroidered choli finished in gold mirror-work. Floral embroidery and mirror detailing throughout — a festive Navratri statement.",
    fabric: "Silk (soft flowing drape)",
    blouse: "Included — royal blue embroidered choli",
    length: "Chaniya choli set",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Navratri", "Festive"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: 280,                     // PLACEHOLDER
    qtyRemain: 2,                      // PLACEHOLDER
    status: "almost-gone",
    imagesFolder: "po002-white-choli",
    imagesExt: "jpg",
    stills: ["hero-1", "hero-2"],
    hasVideo: true,
    placeholderColor: "#B71C1C",
    whatsappText: "Hi, I'm interested in the White Bandhani Chaniya Choli from your collection."
  },
  {
    id: "p008",
    po: "PO-002-08",
    collection: "PO-002",
    name: "Rani Pink Bandhani Choli",
    type: "Choli",
    subtitle: "Mirror-work Choli · Kutchi Border",
    description: "A rani-pink mirror-work choli above a flared skirt trimmed with a colourful woven Kutchi border and gold fringe, finished with an ivory net dupatta scattered in pink and blue floral embroidery. Also available in a grey-blue and magenta bridal colourway. A festive, wedding-guest piece that catches every light.",
    fabric: "Cotton-silk blend, mirror and gota work",
    blouse: "Included — matching mirror-work choli",
    length: "Chaniya choli set (choli + flared skirt + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Wedding", "Festive"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 1,
    status: "last-1",
    imagesFolder: "po002-rani-pink-bandhani-choli",
    imagesExt: "jpg",
    stills: ["hero-1", "hero-2"],
    hasVideo: false,
    placeholderColor: "#C2185B",
    whatsappText: "Hi, I'm interested in the Rani Pink Bandhani Choli from your collection."
  },
  {
    id: "p009",
    po: "PO-002-09",
    collection: "PO-002",
    name: "Black & Red Mirror-Work Choli",
    type: "Choli",
    subtitle: "Mirror-work Choli · Gota Borders",
    description: "A black mirror-work blouse worked in red thread embroidery, paired with a black flared skirt edged in gold gota and a scalloped hem, and a red fringed dupatta. Bold, high-contrast and made to move — a Navratri and garba statement.",
    fabric: "Cotton-silk blend, mirror and gota work",
    blouse: "Included — black mirror-work choli",
    length: "Chaniya choli set (choli + flared skirt + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Navratri", "Festive"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 2,
    status: "almost-gone",
    imagesFolder: "po002-black-red-mirrorwork-choli",
    imagesExt: "jpg",
    stills: ["hero-1"],
    hasVideo: false,
    placeholderColor: "#1A1A1A",
    whatsappText: "Hi, I'm interested in the Black & Red Mirror-Work Choli from your collection."
  },
  {
    id: "p010",
    po: "PO-002-10",
    collection: "PO-002",
    name: "Beige & Gold Tiered Choli",
    type: "Choli",
    subtitle: "Tiered Choli · Gota Trim",
    description: "A beige tiered choli trimmed in gold gota, finished with a deep purple dupatta carrying fine gold zari embroidery. Also available in an emerald green and gold colourway. Elegant, understated and made for festive evenings.",
    fabric: "Silk with gota and zari work",
    blouse: "Included — matching tiered choli",
    length: "Chaniya choli set (choli + tiered skirt + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Festive", "Party"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 1,
    status: "last-1",
    imagesFolder: "po002-beige-gold-tiered-choli",
    imagesExt: "jpg",
    stills: ["hero-1"],
    hasVideo: false,
    placeholderColor: "#B79A6E",
    whatsappText: "Hi, I'm interested in the Beige & Gold Tiered Choli from your collection."
  },
  {
    id: "p011",
    po: "PO-002-11",
    collection: "PO-002",
    name: "Emerald Green Gota Choli",
    type: "Choli",
    subtitle: "Gota-striped Choli · Sequinned Border",
    description: "Deep emerald green choli worked in vertical gold gota stripes above a full pleated skirt, with a matching dupatta edged in a heavy gold sequinned border. The same design as the beige-and-gold set, here in jewel green. A Diwali and evening piece.",
    fabric: "Silk with gota and sequin work",
    blouse: "Included — emerald green gota choli",
    length: "Chaniya choli set (choli + pleated skirt + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Festive", "Party"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 1,
    status: "last-1",
    imagesFolder: "po002-emerald-green-gota-choli",
    imagesExt: "jpg",
    stills: ["hero-1"],
    hasVideo: false,
    placeholderColor: "#1B5E20",
    whatsappText: "Hi, I'm interested in the Emerald Green Gota Choli from your collection."
  },
  {
    id: "p012",
    po: "PO-002-12",
    collection: "PO-002",
    name: "Pink & Teal Mirror Choli",
    type: "Choli",
    subtitle: "Mirror-work Choli · Colour-block",
    description: "A rani-pink mirror-work blouse and gold-striped skirt set against a deep teal-blue dupatta finished with a scalloped gold-embroidered border. Vibrant, confident colour-blocking for the festive season.",
    fabric: "Cotton-silk blend, mirror work",
    blouse: "Included — rani-pink mirror-work choli",
    length: "Chaniya choli set (choli + skirt + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Festive", "Navratri"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 1,
    status: "last-1",
    imagesFolder: "po002-pink-teal-mirror-choli",
    imagesExt: "jpg",
    stills: ["hero-1"],
    hasVideo: false,
    placeholderColor: "#C2185B",
    whatsappText: "Hi, I'm interested in the Pink & Teal Mirror Choli from your collection."
  },
  {
    id: "p013",
    po: "PO-002-13",
    collection: "PO-002",
    name: "Black & Yellow Chevron Choli",
    type: "Choli",
    subtitle: "Chevron Choli · Pom-pom Dupatta",
    description: "A black choli with a yellow chevron bust above a mirror-and-gota yellow skirt hem, finished with a rani-pink Bandhani pom-pom dupatta. Playful, high-contrast and made for garba nights.",
    fabric: "Cotton-silk blend, mirror and gota work",
    blouse: "Included — black and yellow chevron choli",
    length: "Chaniya choli set (choli + skirt + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Navratri", "Festive"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 1,
    status: "last-1",
    imagesFolder: "po002-black-yellow-chevron-choli",
    imagesExt: "jpg",
    stills: ["hero-1"],
    hasVideo: false,
    placeholderColor: "#1A1A1A",
    whatsappText: "Hi, I'm interested in the Black & Yellow Chevron Choli from your collection."
  },
  {
    id: "p014",
    po: "PO-002-14",
    collection: "PO-002",
    name: "Rust Orange & Ivory Choli",
    type: "Choli",
    subtitle: "Contrast-border Choli · Gold Embroidery",
    description: "A rust-orange choli and skirt framed by a wide cream contrast border and delicate gold embroidery, softened by an ivory embroidered dupatta. Warm, understated and quietly festive.",
    fabric: "Silk with gold embroidery",
    blouse: "Included — rust-orange choli",
    length: "Chaniya choli set (choli + skirt + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Festive", "Party"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 1,
    status: "last-1",
    imagesFolder: "po002-rust-orange-ivory-choli",
    imagesExt: "jpg",
    stills: ["hero-1"],
    hasVideo: false,
    placeholderColor: "#C1440E",
    whatsappText: "Hi, I'm interested in the Rust Orange & Ivory Choli from your collection."
  },
  {
    id: "p015",
    po: "PO-002-15",
    collection: "PO-002",
    name: "Grey-Blue Bridal Lehenga Choli",
    type: "Choli",
    subtitle: "Bridal Lehenga · Magenta Zari Work",
    description: "A grey-blue lehenga edged in a magenta zari-embroidered border, paired with a matching magenta paisley dupatta. A bridal-grade, heavily worked piece — the same design as the rani-pink colourway, in a cooler, statelier tone.",
    fabric: "Silk with zari embroidery",
    blouse: "Included — matching worked blouse",
    length: "Lehenga choli set (blouse + lehenga + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Wedding", "Reception", "Festive"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 1,
    status: "last-1",
    imagesFolder: "po002-grey-blue-bridal-lehenga",
    imagesExt: "jpg",
    stills: ["hero-1"],
    hasVideo: false,
    placeholderColor: "#6E7B8B",
    whatsappText: "Hi, I'm interested in the Grey-Blue Bridal Lehenga Choli from your collection."
  },
  {
    id: "p016",
    po: "PO-002-16",
    collection: "PO-002",
    name: "Olive Green Polka Lehenga",
    type: "Choli",
    subtitle: "Polka Lehenga · Bandhani Dupatta",
    description: "A full olive-green lehenga scattered with large metallic gold polka motifs, topped by a gota-trimmed blouse and a deep brown Bandhani dupatta. Also available in a teal-blue colourway with a rani-pink dupatta. A statement Navratri set.",
    fabric: "Silk with gota work",
    blouse: "Included — gota-trimmed blouse",
    length: "Lehenga choli set (blouse + lehenga + dupatta)",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    occasion: ["Navratri", "Festive"],
    finishing: ["Roll Press", "Semi-Iron"],
    priceAud: null,
    qtyRemain: 3,
    status: "almost-gone",
    imagesFolder: "po002-olive-green-polka-lehenga",
    imagesExt: "jpg",
    stills: ["hero-1", "hero-2"],
    hasVideo: false,
    placeholderColor: "#7A8B1F",
    whatsappText: "Hi, I'm interested in the Olive Green Polka Lehenga from your collection."
  }
];

/* ---------------------------------------------
   productImages(p) — derives every media path from the folder slug + ext,
   so no full path is ever hardcoded on a product above.
   Returns { poster, stills:[…], video }.
   --------------------------------------------- */
function productImages(p) {
  const base = `images/${p.imagesFolder}`;
  const ext  = p.imagesExt || "jpg";
  const names = (p.stills && p.stills.length) ? p.stills : ["hero-1"];
  const stills = names.map(n => `${base}/${n}.${ext}`);
  return {
    poster: stills[0] || "",
    stills,
    video: p.hasVideo ? `${base}/clip.mp4` : null
  };
}

/* Status → human label + badge modifier. sold-out is filtered out before render. */
const STATUS_META = {
  "in-stock":    { label: "In Stock",     badge: "badge-in-stock",    urgent: false },
  "almost-gone": { label: "Almost Gone",  badge: "badge-almost-gone", urgent: true  },
  "last-1":      { label: "Last 1",       badge: "badge-last-1",      urgent: true  },
  "sold-out":    { label: "Sold Out",     badge: "badge-sold-out",    urgent: true  }
};
