/* =============================================
   Bandhani Australia — products.js
   Edit THIS FILE to add/update products and images.
   Put images in the /images/ folder next to index.html.
   ============================================= */

const PRODUCTS = [
  {
    // PO-002 · po002-dana-bandhani-standard — images in folder, hero-N.jpg convention
    id: "p001",
    name: "Dana Bandhani Standard Saree",
    subtitle: "Silk · Dana Bandhani Diamond Dots",
    description: "Deep royal purple silk saree with dana bandhani diamond-shaped dots in gold and silver-white, scattered in a diagonal grid that clusters denser toward the lower border. A soft-sheen art silk drape for weddings and receptions.",
    fabric: "Silk (soft-sheen art silk)",
    blouse: "Matching blouse piece included (0.8m)",
    length: "5.5 metres saree + 0.8m blouse",
    care: "Dry clean only. Do not wring. Store folded in muslin cloth.",
    status: "in-stock", // TODO: confirm from Stock sheet Status column
    category: "saree",
    occasion: ["Wedding", "Reception", "Festive"],
    finishing: ["Roll Press", "Semi-Iron", "Crush"],
    images: [
      "images/po002-dana-bandhani-standard/hero-1.jpg",
      "images/po002-dana-bandhani-standard/hero-2.jpg",
      "images/po002-dana-bandhani-standard/hero-3.jpg",
      "images/po002-dana-bandhani-standard/hero-4.jpg",
    ],
    placeholderColor: "#4A148C",
    whatsappText: "Hi, I'm interested in the Dana Bandhani Standard Saree from your collection."
  },
  {
    // PO-002 · po002-white-choli — single hero image (currently named po002-white-choli-hero.jpg)
    id: "p002",
    name: "White Bandhani Chaniya Choli",
    subtitle: "Silk · Bandhani Skirt · Mirror-Work Border",
    description: "Ivory-white chaniya (skirt) with bandhani dotwork and a deep red-maroon border, paired with a royal blue embroidered choli finished with a gold mirror-work border. Floral embroidery and mirror detailing throughout — a festive Navratri statement piece.",
    fabric: "Silk (soft flowing drape)",
    blouse: "Included — royal blue embroidered choli",
    length: "Chaniya choli set",
    care: "Dry clean only. Mirror and embroidery work is delicate.",
    status: "in-stock", // TODO: confirm from Stock sheet Status column
    category: "choli",
    occasion: ["Navratri", "Festive"],
    finishing: ["Roll Press", "Semi-Iron"],
    images: [
      "images/po002-white-choli/po002-white-choli-hero.jpg",
    ],
    placeholderColor: "#B71C1C",
    whatsappText: "Hi, I'm interested in the White Bandhani Chaniya Choli from your collection."
  }
];