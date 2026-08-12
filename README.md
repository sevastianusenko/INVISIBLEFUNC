# Invisible Function

Marketing site for [invisiblefunction.com](https://invisiblefunction.com) — a
one-person shop in Ephrata, Pennsylvania that installs and customizes
concealment mechanisms for media and equipment.

Astro, static output, no client framework, no CSS framework, no third-party
scripts. Hand-written CSS with custom properties. Small vanilla-JS islands only
where an interaction genuinely needs one: the mobile menu, the scroll reveals,
the before/after comparison, the FAQ accordions and the contact form
validation. That is all of it.

---

## Running it

```bash
npm install     # also fetches the font packages
npm run fonts   # copies the woff2 files into public/fonts (run once after install)
npm run dev     # http://localhost:4321
npm run build   # static output into dist/
npm run preview # serve dist/ locally
```

Images are committed, so there is nothing to fetch. To re-crop or swap the
reference photography:

```bash
PEXELS_KEY=your_key npm run photos
```

The key is only needed for that command — it is never read at runtime and is
not stored in the repo.

Node 20 or newer.

`npm run fonts` copies four `.woff2` files out of `node_modules` into
`public/fonts`. They are committed, so you only need to re-run it if you change
which weights or axes the site uses. **No font is ever fetched from a CDN** —
there is no Google Fonts call anywhere.

---

## Deploying

Static output. Nothing to configure on either host.

**Vercel** — import the repo. Framework preset: Astro. Build `npm run build`,
output `dist`. Nothing else.

**Netlify** — build `npm run build`, publish `dist`. `404.html` is picked up
automatically.

Set the production domain to `invisiblefunction.com`. The canonical URL,
sitemap and JSON-LD all come from `site` in `astro.config.mjs`; change it there
if the domain changes and everything else follows.

`robots.txt` is static in `public/`. `sitemap-index.xml` and `sitemap-0.xml`
are generated at build time by `@astrojs/sitemap`.

---

## Where things are

```
public/fonts/            self-hosted woff2 (Archivo, Source Serif 4, IBM Plex Mono)
src/styles/global.css    the entire design system — tokens, components, motion
src/data/site.ts         business details, nav, services, areas, LocalBusiness schema
src/lib/schema.ts        Service / FAQPage / area schema builders
src/layouts/Base.astro   head, meta, JSON-LD, the scroll-reveal observer
src/components/          Header, Footer, Seam, PageHero, ServiceCard,
                         BeforeAfter, PhotoSlot, Faq, Cta
src/pages/               one file per route
```

Editing business details (phone, email, hours, service area, the service list)
means editing `src/data/site.ts` only. It feeds the nav, the footer, the
contact page and the schema.

---

## The design system, briefly

Everything lives in `src/styles/global.css`.

**Colour.** Six named values. `--plaster #D5D1C7` is the ground, `--paper
#E9E6DF` and `--paper-lift #F2EFE9` are panel faces that sit proud of it,
`--cavity #221D18` is both the ink and the colour of what is behind a panel,
`--brass #9E7C3E` is hardware, `--brass-ink #6B4E22` is its text-safe step, and
`--seam #B4AEA1` draws the shadow gap.

Components never read those directly. They read contextual roles — `--fg`,
`--bg`, `--panel-bg`, `--accent`, `--line` — which are redefined by
`.surface-light`, `.surface-paper` and `.surface-dark`. To invert a section,
change one class on the `<section>`; everything inside adapts, including
contrast-safe accents.

**Type.** Archivo variable for display, set expanded (`font-stretch: 108–118%`)
and uppercase — an equipment nameplate rather than a masthead. Source Serif 4
for body. IBM Plex Mono for anything that is a measurement, a model number, a
price or a label.

**Layout.** `.wrap` centres and gutters. `.rail` is the two-column stile: a
narrow left rail carrying the mono label, and the content beside it. Below
900px it collapses to one column.

**Header breakpoints are measured, not chosen.** The wordmark (225px) plus the
six nav links (497px) fit inside the 942px of usable width at 1024 — adding the
quote button (205px) does not, and needs 1100. So the nav appears at 1024 with
Contact as a plain link, and at 1120 that link is replaced by the button. If
you add a nav item, re-measure: `.nav` has no wrapping fallback, by design,
because a header that wraps to two lines looks broken rather than responsive.

---

## Motion

One easing curve and three durations, defined once:

```css
--ease-mech: cubic-bezier(0.65, 0.02, 0.22, 1);
--t-1: 420ms;  --t-2: 720ms;  --t-3: 1100ms;
```

The curve has a soft start, constant travel and a soft stop, with no overshoot
— which is how a real lift controller ramps. Nothing on the site animates
faster than 420ms or slower than 1100ms.

There is one mechanic, applied everywhere, in two forms:

- `data-rv="lift"` — content rises out of a slot, like a screen out of a
  cabinet. Used on headings.
- `data-rv="leaf"` — a door leaf slides off the face of a panel. Used on cards,
  panels and steps.
- `data-rv="seam"` — the signature: a hairline with a brass tick at its leading
  edge, travelling into place.

Three rules the system holds to:

1. **Transform only. No opacity fades.** A mechanism moves; it does not
   dissolve. This is also why the hero does not hurt LCP — the headline is
   painted at first paint and then moves.
2. **Everything JS-driven is gated on `.js`**, added by an inline script in
   `<head>`. With scripting off, every reveal is simply absent and all content
   is visible. There is also a 3-second safety net in `Base.astro` that opens
   everything if the observer never fires.
3. **`prefers-reduced-motion: reduce` is honoured completely.** All transforms
   are cleared, the door leaves are removed from the DOM flow, durations drop
   to 1ms, and the before/after slider skips its self-demonstration. Nothing is
   left hidden behind an animation that will not play.

The hero is CSS keyframes rather than JS, so it plays with scripting disabled
and costs nothing on the critical path.

---

## Accessibility

- Semantic landmarks, one `<h1>` per page, heading order never skips a level.
- Skip link to `#main`.
- Focus is visible everywhere: a 2px outline in `--accent`, which is the
  contrast-safe step of the metal on both light and dark surfaces.
- The before/after comparison is a real `<input type="range">` stretched over
  the component, so dragging, touch and arrow keys all work and the control is
  announced correctly. The brass pull is a decorative sibling that follows it.
- The mobile menu traps nothing but closes on Escape, on focus leaving it, and
  on crossing the desktop breakpoint.
- Form errors are announced (`role="alert"`), tied to their field, and written
  as instructions rather than error codes.

---

## Content rules this site was built under

The business is new and has no completed client projects. So the site contains
no testimonials, no client names, no reviews or ratings, no project counts, no
years-in-business and no statistics of any kind. Every image slot is a labelled
placeholder describing the photograph that belongs there.

The photography that *is* here draws a hard line: **materials, tools and
hardware only — never a room, and never anything presented as this shop's
work.** Every one of those images carries a caption or label saying what it is,
and the finishes section says in plain words that they are references rather
than projects. Project slots stay as labelled shop drawings until real
photography exists.

Three files track what is still owed:

- **[PHOTOS-NEEDED.md](PHOTOS-NEEDED.md)** — every remaining image slot, what to
  shoot, aspect ratio, file path.
- **[CONTENT-TODO.md](CONTENT-TODO.md)** — the placeholder phone number, the
  unconnected form handler, the deliberately empty badge and background
  sections, and what to add once real projects exist.
- **[CREDITS.md](CREDITS.md)** — every photograph on the site, what it is used
  for, and who took it.

Read CONTENT-TODO.md before launching. The published phone number is currently
in the reserved 555 range and will not connect.
