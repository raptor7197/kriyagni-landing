# Kriyagni AI — Website Build Checklist (Spec v2)

Domain: `kriyagniai.com` · Covers §8–§14: design direction, responsive/mobile, accessibility, performance, onboarding flow, analytics stack, and handoff gates.

---

## 8. Design Direction & Typography

### Visual tone

- [ ] Serious tool, not consumer app
- [ ] Reference points honored: Notion, Are.na, Readwise, Linear
- [ ] Clean, text-forward, generous whitespace, low visual noise
- [ ] Avoid: gradient-heavy AI aesthetics
- [ ] Avoid: circuit/brain iconography
- [ ] Avoid: playful illustration

### Typography

- [ ] Headlines: serif or humanist-serif (family of Tiempos, GT Sectra, or Source Serif)
- [ ] Body: clean sans-serif (Inter, IBM Plex Sans, or similar)
- [ ] Avoid geometric/tech sans (Poppins, Montserrat) — too "startup generic"

### Color palette

- [ ] Muted, low-saturation base
- [ ] Off-white/cream background (not pure white) — editorial, not "app"
- [ ] One accent color max, used for CTAs
- [ ] Avoid gradient/neon accents common in AI product marketing

### Imagery

- [ ] No imagery required for hero — text + live demo module ARE the visual
- [ ] If imagery used elsewhere (About page): photography/archival-style over illustration

### Iconography

- [ ] Minimal, line-based, used sparingly
- [ ] Use-case section only

### Motion

- [ ] Subtle only — fade/slide on scroll acceptable
- [ ] No auto-playing animation loops
- [ ] No "AI is thinking" gimmick animations beyond the demo's real loading state

### Design deliverable (gate — do not start build without it)

- [ ] One-page style tile requested from designer BEFORE build starts: type scale, color hex values, spacing unit
- [ ] Dev must not improvise design from prose alone

---

## 9. Responsive / Mobile Behavior

### Breakpoints

| Breakpoint | Width | Behavior |
| --- | --- | --- |
| Desktop | 1200px+ | Full layout as scoped; demo input + output side-by-side or stacked (dev's call based on chosen demo type) |
| Tablet | 768–1199px | Single-column stack; live demo module remains fully functional, not simplified |
| Mobile | <768px | Single-column; hero headline shortens if needed (mobile-length variant from copywriter, not just auto-wrap); live demo module must stay fully functional |

### Navigation

- [ ] Standard hamburger below 768px
- [ ] Single primary CTA kept visible/sticky on mobile scroll (sticky "Try it" in header or bottom bar)

### Non-negotiables

- [ ] Live-proof demo works identically well on mobile as on desktop
- [ ] No "view on desktop for full experience" degradation shipped
- [ ] If interactive demo chosen: tested on-device before launch, not just in browser dev tools

---

## 10. Accessibility (WCAG 2.1 AA baseline)

- [ ] Color contrast: min 4.5:1 for body text, 3:1 for large text
- [ ] Contrast verified against chosen muted palette (low-saturation designs often fail and need adjustment)
- [ ] Full keyboard navigation (logical tab order, especially through the live demo module — most interactive element on page)
- [ ] Alt text on all non-decorative images
- [ ] Semantic HTML — H1 once per page, logical H2/H3 nesting (also SEO-relevant for this audience)
- [ ] Focus states visible (don't strip default focus outlines without replacement)
- [ ] Form labels properly associated (signup form, pricing inquiry forms)
- [ ] Streaming/generated output: `aria-live="polite"` regions — no aggressive interrupt announcements that overwhelm screen readers

---

## 11. Performance Targets

| Metric | Target |
| --- | --- |
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay / Interaction to Next Paint | < 200ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Homepage/product page weight | < ~1.5MB initial load |

### Page weight & assets

- [ ] No heavy hero video
- [ ] Optimized font loading: subset fonts, `font-display: swap`

### Live demo API

- [ ] Interactive: loading state shown within 300ms of submit
- [ ] Timeout ~15–20s with graceful error message

### Context

- [ ] Performance treated as a trust signal (prosumer/technical users read jank as low credibility) — not just a technical checkbox

---

## 12. Signup / Onboarding

### Destination flow after "Try it" CTA

1. [ ] CTA click → (a) lands directly in live demo module on-page, no clickthrough needed (preferred) OR (b) scrolls/anchors to demo section if already visible
2. [ ] After demo output → secondary CTA appears: "Sign up to save this / ask your own questions" (soft ask, not a hard paywall on the first example)
3. [ ] Signup form: minimal fields only — email + password, or OAuth (Google) if feasible
4. [ ] Excluded from signup: name, company, "how did you hear about us", use-case dropdowns (friction kills conversion; collect later via optional profile completion)
5. [ ] Post-signup destination: land directly in-app on an empty/ready state to immediately ask their own question — not a dashboard, not a tutorial video, not an empty settings page
6. [ ] First action after signup: using the core product within seconds

### Email verification

- [ ] Not gated on first use — try the product first, verify email in background/async

### Dev note

- [ ] Gap between "saw demo" and "using product" as close to zero clicks as engineering allows — every extra screen is a conversion leak

---

## 13. Analytics Stack & Exact Event Spec

### Stack

- [ ] PostHog (recommended: self-hostable, generous free tier, session recording for qualitative demo engagement) — or Mixpanel as alternative
- [ ] Avoid relying on GA4 alone (insufficient for product/funnel-level tracking at required granularity)

### Required events (exact naming)

| Event | Trigger | Properties |
| --- | --- | --- |
| `page_view` | Every page load | page path, referrer, UTM params (source, medium, campaign) |
| `demo_view` | Live demo module enters viewport | page path |
| `demo_interact` | User engages demo (submits question if interactive; clicks "see another example" if static) | interaction type, question text (if interactive — flag PII/privacy handling) |
| `demo_output_view` | Full Lean/Tension/Take output rendered and visible | time-to-render |
| `cta_click` | Any "Try it" / signup CTA clicked | CTA location on page (hero, post-demo, footer, sticky mobile bar), referring event (which CTA) |
| `signup_started` | Signup form opened | — |
| `signup_completed` | Account created | signup method (email/OAuth), UTM source attribution carried through |
| `first_query_submitted` | First real product use post-signup | time since signup (activation speed) |
| `about_page_view` | `/mandana/about` visited | — |
| `examples_page_view` | `/mandana/examples` visited | — |
| `session_return` | User returns for a second session | days since first session |

### UTM handling requirement

- [ ] All distribution links (Move 2 — HN, Reddit, community posts) preserve UTM params through to `signup_completed` (source attribution not lost at signup step)
- [ ] Dev signup flow confirmed to not strip query params on redirect

### Dashboard requirement (post-launch, NOT blocking dev handoff)

- [ ] One funnel view: `page_view` → `demo_view` → `demo_interact` → `cta_click` → `signup_completed` → `first_query_submitted` → `session_return`
- [ ] Funnel segmented by traffic source (parent homepage vs. direct/referral) — this is the view that answers whether the site is working

---

## 14. Handoff Checklist (Before Dev Starts)

- [ ] Style tile from designer (type scale, hex colors, spacing) — §8
- [ ] Copywriter-finalized hero headline + mobile-length variant — §9
- [ ] Static vs. interactive demo decision confirmed — carries through §5, §9, §11, §12
- [ ] Analytics account (PostHog/Mixpanel) provisioned, event names locked — §13
- [ ] Pricing model decision (or explicit "TBD, build shell only") — §4
- [ ] Signup method decided: email/password vs. OAuth vs. both — §12

### Flagging rule

- [ ] Anything still open at handoff (pricing, demo type) flagged to dev explicitly as **"build shell, confirm before launch"** — never left ambiguous
