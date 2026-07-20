# PRD.md — Bandhani Australia Business OS
### Product Requirements Document | Last updated: July 2026

---

## PRODUCT OVERVIEW
Bandhani Australia is a Bandhani textile business selling dupattas, sarees, and
chaniya cholis in Australia, sourced from Jamnagar/Ahmedabad. This PRD defines
the full operating system built on top of Claude, Google Sheets, and a custom
HTML/CSS/JS website.

**Revenue context (validated):**
- $10,000 revenue collected by the second Open Day — model validated, break-even passed
- PO-001 alone: $1,450
- Stock: 100+ items, avg $150 AUD price point

**Phase 2 target — the "double income" model:**
- $10,000 revenue per cycle × 4 cycles/year = **$40,000 annual revenue**
- Each cycle structured as ~$5,000 purchase (COGS) + ~$5,000 profit
- Supersedes the old $20,000 annual target
- Requires (a) fixed quarterly stock cycles, (b) a premium brand-grade website
  with a real ordering flow, and (c) content production that doesn't bottleneck
  on manual editing.

---

## HUMANS & ROLES
| Person | Device | Role |
|---|---|---|
| Gaurav | MacBook + Windows 11 | Orchestrator, approver, code, inventory |
| Mitesh | MacBook Pro + Claude Desktop | Marketing execution, campaigns, deployments |
| Alpa | iPhone 13 Pro | WhatsApp, customer service, fulfilment, PayID |
| Varsha | India | Purchasing partner, transacts in INR |

---

## BRAND DIRECTION (NEW)

**Reference model: Nike, not a shoe catalogue.**
Nike rarely sells shoes on the page — it sells the athlete's excellence, and the
product follows. Bandhani Australia's premium site should apply the same logic:
lead with the craft, the tradition, and the hands behind it — Jamnagar's tie-dye
heritage, the artisans, the generations of technique — with product as the proof
point, not the pitch.

**Practical implications for the website rebuild:**
- Hero sections built around craft story and heritage imagery/video, not grids
  of product thumbnails
- Product photography quality becomes brand-critical (ties into the existing
  Alpa-character-lock / real-photo image pipeline — no more room for
  inconsistent renders)
- Copy tone: confident, heritage-forward, understated — not discount-driven
- Collections framed as editions/drops (tied to the 4 stock cycles below) rather
  than a static catalogue that never changes

This is a design-system decision, not just a page redesign — flagged for the
`frontend-design` skill when the build starts.

---

## COMPONENTS

### COMPONENT 1 — INVOICE PROCESSING
**Status:** Designed. Skill written. Ready to use. *(Unchanged)*

**Flow:**
Scan invoice (iPhone) → drop in ~/Projects/Bandhani/_inbox/invoices/
→ Gaurav runs invoice skill in Claude Desktop
→ Claude extracts structured row
→ Gaurav reviews → pastes into Google Sheet Stock tab

**Skill file:** SKILL-invoice.md
**Complexity:** Low

---

### COMPONENT 2 — PREMIUM WEBSITE + CART → WHATSAPP ORDER (REVISED, PRIORITY 1)
**Status:** New build. Supersedes the old "Option A, page-load CSV fetch" design.

**What's changing from Phase 1:**
- Phase 1 site: static product cards, CSV fetched once on page load, no cart,
  price fields removed pending confirmed pricing
- Phase 2 site: premium brand site (see Brand Direction above) + a real
  multi-item cart that produces a single consolidated WhatsApp order message

**Cart → WhatsApp flow (as specified by Gaurav):**
1. Customer browses collection, adds multiple items to cart (client-side state,
   no login, no payment)
2. On confirm, site generates one formatted WhatsApp message (prefilled via
   `wa.me` link) listing all cart items, quantities, and reference IDs, and
   opens it addressed to Alpa's number
3. The cart order also drops a row into a **Sales Ledger** tab (or, simpler,
   just notifies Gaurav/Alpa to update manually — see amendment below)
4. Alpa manually confirms availability + takes payment via PayID as today —
   **no checkout, no payment gateway on-site** (DECISION 001 still holds)

**Amendment to DECISION 003 (no live cart-time stock check):**
Earlier this was scoped as a live pre-checkout stock re-fetch. At current volume
(1-2 sales/day), that's unnecessary complexity. Instead:
   - The cart order writes an entry to a **Sales Ledger** tab, OR triggers a
     manual notification that Gaurav/Alpa updates — whichever is simpler to
     wire up. This keeps the existing business flow completely unchanged: the
     Sheet stays source of truth, Alpa confirms availability at the WhatsApp
     step exactly as she does today.
   - No extra CSV fetch, no Sheets API auth, no double-sold-prevention logic.
   - **Revisit trigger:** if daily order volume climbs to the point where
     stale-cart double-sells actually happen, re-introduce a live stock check.
     Not before.

**Collections / navigation:**
- Filter by Type (Saree / Dupatta / Choli — `choli` filter still pending add
  per existing backlog)
- Filter by PO batch / "drop" (ties into the new quarterly cadence below)
- Status-aware display (Sold Out hidden, Last 1 / Almost Gone badged) — logic
  unchanged from SKILL-stock.md

**Skill files:** SKILL-stock.md (stock logic), `code-builder` skill,
`frontend-design` skill (new — for the premium visual system)
**Complexity:** Medium-High — the cart + live-check logic and the brand
redesign are both real scope, larger than anything built in Phase 1

---

### COMPONENT 3 — SALES CHANNELS → STOCK UPDATES
**Status:** Designed. Decision made: No Stripe. *(Unchanged, still holds under Phase 2)*

**Channel A — Display Day (Events)** — Google Form → Apps Script updates Stock
**Channel B — WhatsApp Sales (Alpa)** — checkbox tick → Apps Script updates Stock
**Channel C — Cart order confirmed (NEW, still manual)** — once Alpa confirms
payment on a cart-generated WhatsApp order, she ticks the same WhatsApp Sold
checkbox as today. No new automation needed — the cart just changes how the
WhatsApp message is generated, not how the sale is recorded.

**What is NOT being built:**
- Stripe or any payment gateway (deferred indefinitely, per DECISION 001)
- Automated payment webhooks
- Any backend server

**Complexity:** Low (no change from Phase 1)

---

### COMPONENT 4 — MARKETING ENGINE + CONTENT AUTOMATION (REVISED)
**Status:** Live for manual content. New sub-component for content automation.

**Existing flow (unchanged):**
Gaurav drops brief in _inbox/ → Claude generates drafts/ → Gaurav approves →
Mitesh executes (per DECISION 007, no exceptions)

**Conversion path (fixed):** Instagram → DM/WhatsApp → Payment → Delivery
**Now also:** TikTok and Instagram/Facebook **Live** during Open Days (Gaurav's
new requirement) — Open Day events get simulcast, not just documented after
the fact

**NEW — Content automation tool: Zeely.ai (zeely.ai)**
Gaurav will trial **Zeely.ai** — an AI marketing tool for generating Reels and
posting to Instagram/Facebook. Plan: use it as-is to learn the workflow, and if
it proves too expensive, rebuild an equivalent in-house modelled on their
approach. No action required from Claude at this stage — this is Gaurav's trial
to run. (Note: distinct from the existing Pippit AI + `generate_twirl.py` + Kling
render pipeline; Zeely is being evaluated as the generation + posting layer.)

**Claude rule (unchanged):** Check stock before generating content. Sold Out →
no content. Last 1 → urgency content auto-generated. Max 3 pieces/week
(DECISION 010) unless Gaurav raises the cap for the higher-volume Phase 2 push.

**Skill file:** `marketing` skill (existing)
**Complexity:** Medium — tool selection + integration, not a ground-up build

---

### COMPONENT 5 — P&L DASHBOARD
**Status:** Designed. Decision made: Google Sheet dashboard tab first. *(Unchanged)*
**Skill file:** SKILL-pnl.md — see that file for full formula set.
No changes needed for Phase 2 other than watching the $20K target pace against
the new quarterly stock cycles.

---

### COMPONENT 6 — QUARTERLY STOCK CYCLE (NEW)
**Status:** New — operational calendar change from ad-hoc to fixed quarterly.

**Cadence (as decided by Gaurav):**
| Cycle | Month | Season / collection | Notes |
|---|---|---|---|
| Cycle 1 | January | New Year stock | — |
| Cycle 2 | March | March collection | Aligns with existing PO cadence |
| Cycle 3 | June | Pre-Navratri Choli push | Choli sells *ahead of* Navratri, not during it. Artists travel to Canberra in August, so the June cycle stocks the winter/pre-festival Choli demand. This is the model — no October Navratri cycle needed. |
| Cycle 4 | October | **Diwali collection** | Next major collection after the June/July cycle. Largest festive push. |

**Each cycle drives:**
- A new PO batch (per existing PO-00X numbering convention)
- A new "collection/drop" on the website (ties into Component 2's premium
  collections model)
- A content burst timed to the drop (Component 4)
- An Open Day event (Component 7)

---

### COMPONENT 7 — OPEN DAY EVENTS + LIVE (REVISED)
**Status:** Validated model (Canberra x2). Expanding.

**Format (unchanged core):** In-person Open Day at 14 McGlashan Street, Taylor
ACT, ~65-70% of stock typically sells on the day, remainder cleared via
WhatsApp broadcast + website afterward.

**New for Phase 2:**
- Simulcast on TikTok and/or Instagram/Facebook Live during the event —
  extends reach beyond in-room attendance, feeds the Instagram → WhatsApp
  conversion path even for people not physically present
- Expansion beyond Canberra: Sydney and Melbourne events (Melbourne is next
  week, already scheduled)
- Each Open Day maps to a quarterly stock cycle drop (Component 6) rather than
  running independently of the stocking calendar

**Complexity:** Low-Medium — mostly logistics + a live-streaming checklist,
not a code build. Can produce a simple pre-event checklist skill if useful.

---

## GOOGLE SHEET STRUCTURE
Single source of truth. Tab: **Stock**. *(Unchanged — see SKILL-stock.md)*

---

## WHAT CLAUDE NEVER DOES
- Posts to Instagram/TikTok/Facebook directly
- Contacts Mitesh or Alpa directly
- Updates Google Sheet directly (Gaurav pastes)
- Makes purchases or payments
- Deploys code to GitHub or Hostinger
- Adds payment gateway / checkout to the website (DECISION 001 still holds)

---

## BUILD SEQUENCE (Phase 2, priority order per Gaurav)
| # | Task | Skill/Tool | Status |
|---|---|---|---|
| 1 | Premium website design system (Nike-style brand direction) | `frontend-design` skill | Not started |
| 2 | Cart UI (multi-item, client-side state) | `code-builder` skill | Not started |
| 3 | Cart order → Sales Ledger row (or manual notify) — NO live stock check | `code-builder` + SKILL-stock.md | Not started |
| 4 | WhatsApp order message generator (wa.me prefilled link) | `code-builder` skill | Not started |
| 5 | Choli filter category + PO-batch/drop filtering | `code-builder` skill | Backlog carried over |
| 6 | Quarterly stock cycle calendar (Jan/Mar/Jun/Oct) confirmed + PO-003 slotted in | Gaurav + Varsha | Cycle 3 timing TBC |
| 7 | Sydney/Melbourne Open Day logistics + Live streaming checklist | Manual/Gaurav | Melbourne event next week |
| 8 | Trial Zeely.ai for Reels generation + posting | Gaurav (no Claude action) | Gaurav to trial |
| 9 | P&L dashboard re-baselined to $40K target ($10K × 4 cycles) | SKILL-pnl.md | Ready to re-baseline |

---

## OPEN QUESTIONS FOR GAURAV
| # | Question | By when |
|---|---|---|
| OQ1 | Confirm PO numbers for the 3 drafted PO-002 sarees (carried over from existing backlog) | Before Component 2 goes live with real inventory |
| OQ2 | Sales Ledger tab vs. manual notification for cart orders — which do you prefer? (Affects Component 2 build) | Before cart build starts |

*Resolved in July 2026 update: stock cadence (Jan/Mar/Jun/Oct, Diwali = Cycle 4),
$40K target model, Zeely.ai trial, no live cart stock check.*
