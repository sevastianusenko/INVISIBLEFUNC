# Photography needed

Every image slot on the site is currently a labelled placeholder — a shop
drawing that states what belongs there. Nothing on this site implies work that
has not been done.

Each slot is rendered by `src/components/PhotoSlot.astro`. To fill one:

1. Put the file at the path in the table below, under `public/`.
2. In the page file, replace the `<PhotoSlot … />` call with:
   ```astro
   <img src="/images/…" alt="…" width="1600" height="1067" loading="lazy" decoding="async" />
   ```
3. Write real alt text. Describe what is visible, not what it proves.
4. Delete the row from this file.

**Formats.** Export WebP at ~85 quality with a JPEG fallback if you want one.
Long edge 2000px is plenty. Keep every file under 300 KB — the site currently
loads no images at all and the Lighthouse budget assumes that stays close to
true.

**The one rule.** Do not fill any of these with stock photography or with
another shop's work. The site argues for honesty about a new business; a
borrowed photo undoes the whole argument in one click.

---

## Priority 1 — the proof device

The before/after comparison is the core sales device on the site. It needs two
frames from **the same locked-off tripod position, same lens, same exposure,
same white balance**. Shoot the stowed state first, do not touch the camera,
deploy the mechanism, shoot again. If the two frames do not line up pixel for
pixel the component looks broken.

| Path | Ratio | Shot |
| --- | --- | --- |
| `/images/proof/stowed.jpg` | 16:9 | Living room, screen fully stowed. Eye height, wide enough to read the whole millwork run. |
| `/images/proof/deployed.jpg` | 16:9 | Identical frame, screen fully deployed. Same tripod position, same lens. |
| `/images/hidden-doors/closed.jpg` | 16:9 | Panelled wall, hidden door closed, straight-on at eye height, even light across the run. |
| `/images/hidden-doors/open.jpg` | 16:9 | Identical frame, leaf swung to about 40 degrees, space behind visible. |

Used on: `/` and `/services/hidden-doors/`.

---

## Priority 2 — service pages

| Path | Ratio | Shot |
| --- | --- | --- |
| `/images/tv-lifts/bench-cycle.jpg` | 4:3 | Column lift on the bench, mid-travel, cabinet carcass dry-fitted around it. |
| `/images/tv-lifts/lid-reveal.jpg` | 4:3 | Detail of the closed lid meeting the cabinet top — the reveal line, raking light. |
| `/images/projector/ceiling-closed.jpg` | 3:2 | Ceiling closed, raking daylight across the plane, closure panel barely findable. |
| `/images/projector/ceiling-open.jpg` | 3:2 | Same ceiling, projector fully lowered, lens at working height. |
| `/images/hidden-doors/reveal-macro.jpg` | 1:1 | Macro of the reveal at the top corner of a closed leaf, raking light along the joint. |
| `/images/hidden-doors/pivot-hardware.jpg` | 1:1 | Pivot hardware exposed during install, before the case goes on. |
| `/images/panels/carriage-bench.jpg` | 3:2 | Carriage and belt drive on the bench, panel removed, guidance visible. |
| `/images/panels/mid-travel.jpg` | 3:2 | Installed panel mid-travel, showing the closed face and the cavity together. |
| `/images/speakers/driver-in-wall.jpg` | 4:3 | Driver mounted in the stud bay before skimming, back-box and wiring visible. |
| `/images/speakers/finished-raking.jpg` | 4:3 | Finished wall in raking light from a window — no visible outline anywhere. |

---

## Priority 3 — process and about

| Path | Ratio | Shot |
| --- | --- | --- |
| `/images/process/bench-load-test.jpg` | 3:2 | Bench setup: mechanism loaded with ballast to the real screen weight, mid-cycle. |
| `/images/process/shop-wide.jpg` | 3:2 | Shop interior, Ephrata — wide, honest, working rather than styled. |
| `/images/about/portrait.jpg` | 4:5 | Portrait at the bench, working, not posed to camera. Natural light, shop behind. |
| `/images/about/hands-detail.jpg` | 4:5 | Hands and a tool at work — reads as craft, not as stock photography. |

---

## Priority 4 — area pages

These are the last to fill. Until a job exists in each town, the placeholder is
more honest than a photograph from somewhere else.

| Path | Ratio | Shot |
| --- | --- | --- |
| `/images/areas/lancaster-city.jpg` | 3:2 | Installed cabinet lift in a period Lancaster interior — plaster, trim, screen stowed. |
| `/images/areas/lancaster-township.jpg` | 3:2 | Township great room, ceiling closure shut, wide enough to show the whole plane. |
| `/images/areas/lititz-borough.jpg` | 3:2 | Borough interior, flush jib door closed, panelled wall reading as continuous. |
| `/images/areas/lititz-township.jpg` | 3:2 | Township primary suite, foot-of-bed lift with the screen fully stowed. |
| `/images/areas/hershey-soffit-frame.jpg` | 3:2 | Dropped soffit under construction with the lift box framed inside it. |
| `/images/areas/hershey-soffit-done.jpg` | 3:2 | Same soffit finished and painted, closure panel shut, reading as architecture. |
| `/images/areas/west-chester-scribe.jpg` | 4:3 | Cabinet scribed to an irregular stone wall — detail of the scribe line. |
| `/images/areas/west-chester-run.jpg` | 4:3 | Completed millwork run in a stone house, screen stowed, wide frame. |

---

## Also missing: an Open Graph image

There is no `og:image` yet — the meta tag is commented out in
`src/layouts/Base.astro`. When the first project is photographed, export a
1200×630 crop and add it. Until then, a link to the site previews as text,
which is better than previewing as a stock photograph.

| Path | Ratio | Shot |
| --- | --- | --- |
| `/images/og.jpg` | 1200×630 | Best stowed/deployed frame, cropped wide. Legible at thumbnail size. |
