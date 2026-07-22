# Claude Code — Add products from filled template

> Paste into Claude Code with `products.js` and `product_update.md` open, AND paste the filled "Add Products Template" blocks below this prompt. Vanilla JS, no backend. Additive only — do NOT touch or remove the 7 existing products.

---

## What to do

For EACH product block I paste below, generate a complete products.js entry, following the exact schema and the rules here. Write results in TWO places:

1. **First, into `product_update.md`** — a human-readable review list (so Gaurav checks before it goes live). Format each as: the product name as a heading, the generated description, and the raw JS entry in a code block.
2. **Then, into `products.js`** — append the new entries to the existing product array. Do NOT modify or reorder the existing 7 entries. Add the new ones after them.

Show me the `product_update.md` review list FIRST and pause so Gaurav can eyeball it, THEN apply to products.js on confirmation.

---

## Schema (match exactly)

```js
{
  id: "pNNN",                 // next sequential id after existing ones (p008, p009, ...)
  po: "PO-002",               // from the block
  name: "Deep Magenta Bandhani Saree",
  type: "Saree",              // "Saree" | "Dupatta" | "Choli"
  priceAud: null,             // ALWAYS null for these — price is hidden until Stock sheet confirms
  qtyRemain: 3,               // from the block
  status: "almost-gone",      // DERIVE from qtyRemain, see rule below
  imagesFolder: "po002-deep-magenta-bandhani-saree",  // the slug from the block
  hasVideo: true,             // from the block (yes->true, no->false)
  collection: "PO-002",       // same as po
  description: "..."          // YOU write this — see description guide
}
```

## Status derivation (from qtyRemain)
- `0`  -> `"sold-out"`   (will be hidden from grid)
- `1`  -> `"last-1"`
- `2-5`-> `"almost-gone"`
- `>5` -> `"in-stock"`

## id rule
Continue the sequence from the existing entries. If the last existing product is `p007`, new ones start at `p008`. Never reuse an id.

## Slug / folder rule
Use the `Images folder` slug EXACTLY as given. If a slug has a space or capital letter, STOP and flag it — don't auto-fix silently, tell Gaurav the corrected slug and ask him to rename the folder so the site and folder match.

## Description guide (write these — keep them premium)
- 2-3 sentences, heritage-forward, calm and confident (matches the Meukow/Nike tone of the site).
- Lead with the visual (colour, the bandhani dot pattern, the drape), then a note of craft or occasion.
- NO prices, NO "buy now", NO hype words ("amazing", "stunning" x5). Understated luxury.
- Mention it's hand-tied / from Jamnagar where natural, but don't repeat the same sentence on every product — vary it.
- If the block has Notes, use them.
- Example (tone reference, don't copy verbatim):
  > "A deep magenta silk saree scattered with the fine tied dots of traditional bandhej. The gold-touched border and pallu give it a quiet formality — made for weddings and festive evenings. Hand-tied in Jamnagar, opened and finished ready to wear."

## Hard rules
- Price is ALWAYS `null` here. Never invent a number.
- Don't remove or edit the existing 7 products.
- Don't add a product whose `Images folder` slug is blank — flag it instead.
- If `Has video` is "no", set `hasVideo: false` (the card will just show the still — that's fine).

---

## Paste the filled template blocks below this line:

[Gaurav pastes filled PRODUCT blocks here]
