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
