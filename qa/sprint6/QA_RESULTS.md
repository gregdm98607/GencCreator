# GenCreator — Sprint 6 QA Results

> Session: 2026-06-03 | Targets: P0-1 (visual QA), P0-5 (Lighthouse ≥90), P0-6 (WCAG 2.1 AA)
> Served from: `astro preview` of OGF **production build** (`C:\Dev\ogf-site\dist`)
> Tooling: Claude Preview MCP (Chromium), Lighthouse 13.3.0 CLI, axe-core 4.10.2, Chrome 148
> Result: **All three items PASS.** Two GenCreator a11y fixes applied + verified (not yet committed).

---

## Summary

| Item | Result |
|------|--------|
| P0-1 Visual QA (desktop / tablet / mobile + full flow) | ✅ PASS |
| P0-5 Lighthouse ≥90 (all categories) | ✅ PASS — 99 / 96 / 96 / 100 (clean run) |
| P0-6 WCAG 2.1 AA (GenCreator's own UI) | ✅ PASS after 2 fixes |

**Escalations to OGF-site owners (not GenCreator-scoped):**
1. OGF **footer** color-contrast — 6 elements below 4.5:1 (site-wide).
2. OGF-global **render-blocking Google Fonts** + 159 KiB GA4 script — perf headroom for every page.

---

## P0-5 — Lighthouse (`/gencreator/`, OGF production build)

| Category | Clean run | Target | Verdict |
|----------|----------:|--------|---------|
| Performance | **99** | ≥90 | ✅ |
| Accessibility | **96** | ≥90 | ✅ |
| Best Practices | **96** | ≥90 | ✅ |
| SEO | **100** | ≥90 | ✅ |

Clean-run metrics (simulated mobile, Slow-4G + 4× CPU): FCP 1.5s · LCP 1.5s · TBT 100ms · CLS 0.

### Measurement note (important)
A first run scored Performance **85**, but that was **CPU-contention-depressed** — Lighthouse was sharing the host with a second preview server + active interactive-browser automation. A clean run (nothing else competing) scored **99**. A homepage baseline run was even more contaminated (Perf 55 / LCP 59s) and was discarded. Takeaways for future runs:
- Run Lighthouse with **no other browser automation active**; expect run-to-run variance.
- Lighthouse CLI exits 1 on Windows (`EPERM … rmSync` deleting its temp Chrome profile) **after** writing the report — the non-zero exit is cosmetic; reports are valid.

### Production-hardening opportunity (escalate, not a blocker)
Even at Perf 99, the head has render-blocking resources that would matter more on real networks:
| Resource | render-block | Owner |
|----------|-------------:|-------|
| `fonts.googleapis.com/css2?family=Lora…` | ~840 ms | OGF-global (BaseHead) |
| `Footer.BIClSxVJ.css` | ~155 ms | OGF-global |
| `gencreator…css` (2 KiB) | ~300 ms (chain latency) | GenCreator |

`gtag/js` (GA4): 159 KiB, 63 KiB unused — OGF-global. Optimizing fonts (preconnect/preload/self-host) + deferring GA4 is an **OGF-site decision** affecting every page; GenCreator should not unilaterally rewrite the shared `<head>`.

---

## P0-1 — Visual QA

| Breakpoint | Form | Plan |
|-----------|------|------|
| Desktop 1280×800 | ✅ full horizontal nav, centered card, 2-col date/place grid | ✅ header + 10 step cards, badges, links, missions, tips |
| Tablet 768×1024 | ✅ 2-col date/place + 2-col checkbox grid | — (fluid; same components) |
| Mobile 375×812 | ✅ single-column, full-width touch-friendly inputs, hamburger nav | ✅ cards reflow, links stack, badges legible |

- "Archival Warmth" branding inherited throughout (Lora serif, parchment bg, crimson accents).
- Enrichment confirmed live (P0-10/P0-11): goal-tailored rationale + time-sensitive tips (e.g. 1890-fire census gap, pre-1880 birth-registration).
- **Full flow walk (end-to-end):** form (name + dates/places + goal) → Generate → plan with correctly-computed time period (e.g. birth 1850/death 1920 → 1840–1930), goal-appropriate step ordering (find_parents → Birth, Census, Marriage first), 30 DB links each carrying `utm_source=gencreator`, access-model badges, scroll-to-plan. ✅
- Minor (OGF-global, not GenCreator): at exactly 768px the header shows both full nav *and* a hamburger.

---

## P0-6 — Accessibility (WCAG 2.1 AA)

### Findings & fixes

| Finding | Scope | Status |
|---------|-------|--------|
| Badge contrast: `.gc-badge-subscription` / `.gc-badge-intermediate` gold `#b8860b` on cream `#fff3cd` = **2.93:1** (need 4.5) | GenCreator | **FIXED** → `--gc-amber` `#7A5900` = **5.82:1**, axe-verified 0 |
| `aria-label` on roleless `<div>` (`.gc-plan` ×1, `.gc-databases` ×10) → label not reliably exposed | GenCreator | **FIXED** → added `role="region"` / `role="group"` (matches existing grid pattern) |
| Footer contrast: `.footer-tagline`, `.footer-copyright`, privacy/terms/contact links — 6 elements 2.78–3.89:1 | **OGF-global** | ESCALATE (Footer.astro, site-wide) |

### Verification (against rebuilt production output)
- axe-core 2.1 A/AA scan, scoped to `main` (GenCreator UI): **form state 0 violations / 0 incomplete; plan state 0 violations / 0 incomplete.** Full page shows only the 6 OGF footer contrast items.
- Lighthouse Accessibility **96** (the 4-point gap = OGF footer contrast; GenCreator badges aren't on initial load so don't affect the page score, but were the real plan-state defect and are now fixed).

### Structure (excellent)
- Landmarks: `banner` / `navigation` / `main` / `contentinfo`. Form has accessible name; 3 `fieldset`+`legend` sections; every text input, all 16 checkboxes, all 8 radios have programmatic labels; required field marked.
- Label↔input associations all correct (no misassociation).

### Keyboard / focus
- Visible focus styles: text inputs/email (crimson outline), submit/buttons (gold outline), DB links (crimson outline). Native checkbox/radio focus rings preserved (no `outline:none` reset in either gencreator.css or OGF global.css).
- No positive `tabindex` (natural DOM order); no tab traps. Controls are native (radios/checkboxes are real 1.1rem inputs with `accent-color`), so keyboard activation is standard.

---

## Files changed this session (NOT committed — awaiting go-ahead)
- `gencreator/src/styles/gencreator.css` — `--gc-amber` `#B8860B`→`#7A5900`
- `gencreator/src/components/ResearchPlan.tsx` — add `role="region"`
- `gencreator/src/components/ResearchStep.tsx` — add `role="group"`
- `ogf-site/src/styles/gencreator.css` — synced token
- `ogf-site/src/components/gencreator/ResearchPlan.tsx` — synced
- `ogf-site/src/components/gencreator/ResearchStep.tsx` — synced

State after edits: gencreator **36 tests green**, typecheck clean; OGF **build green (11 pages)**; axe re-verified on rebuilt output.

### Artifacts
- `lh-gencreator.report.{html,json}` — first (contended) run, Perf 85
- `lh-gencreator-clean.json` — clean run, Perf 99
- `lh-homepage.report.{html,json}` — contaminated baseline (discarded)

*QA results — 2026-06-03 (complete)*
