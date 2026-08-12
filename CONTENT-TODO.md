# Content to replace

The site was built for a business with no completed client projects. It
contains **no testimonials, no client names, no reviews, no ratings, no project
counts, no years-in-business, no statistics and no dealer badges**, because
none of those exist yet and inventing them would undo the argument the site is
making.

This file lists everything that is either a placeholder, deliberately empty, or
should change once there is real work to point at. Photography has its own
file: see [PHOTOS-NEEDED.md](PHOTOS-NEEDED.md).

---

## 1. Placeholders that are wrong today — fix before launch

| What | Where | Note |
| --- | --- | --- |
| **Phone number** | `src/data/site.ts` → `phone`, `phoneHref` | Currently `(717) 555-0142`. **555 is a reserved fiction range and will not connect.** Replace before the site goes live. |
| **Email address** | `src/data/site.ts` → `email` | `spec@invisiblefunction.com` — plausible but not provisioned. Create the mailbox or change the address. |
| **Business hours** | `src/data/site.ts` → `hours` | `Monday to Friday, 7:00 to 17:00` is an assumption. Confirm. |
| **Street address** | `src/data/site.ts` → `localBusinessSchema.address` | Only locality/region/postcode are published. Add `streetAddress` if the shop takes visitors; leave it off if it does not. Google treats a service-area business without a street address as valid. |
| **Founding year** | `src/pages/about.astro` | The page says the shop is new but names no year. If you want a founding date, add it — and add `foundingDate` to the schema in `src/data/site.ts` at the same time. |
| **Form handler** | `src/pages/contact.astro`, marked `// TODO: connect form handler` | Markup and validation are done. Nothing is transmitted. The submit handler currently tells the visitor to email instead. |

---

## 2. Deliberately empty sections

Both are commented out in the source with an explanation. Unwrap them when
there is something true to put inside.

### Awards, certifications and dealer badges
`src/components/Footer.astro`

Empty on purpose. Only add credentials a third party can verify. Manufacturer
logos are a particular trap here: the whole site argues that this shop is
brand-independent, so a wall of manufacturer badges would contradict the
positioning even if every badge were legitimate.

### Owner background
`src/pages/about.astro`

The one section nobody but the owner can write. Three short paragraphs: trade
background, training, what you built before this, and why concealment
specifically. This is the highest-value single piece of copy still missing —
a trade buyer deciding whether to subcontract will read it before anything else.

---

## 3. Things to add once real projects exist

These do not exist anywhere in the codebase yet. They are listed so the order
of operations is obvious.

**After project 1**
- Fill the before/after slots on `/` and `/services/hidden-doors/`. This is the
  single highest-impact change on the site.
- Add an `og:image` (`src/layouts/Base.astro`, currently a commented TODO).

**After projects 2–4**
- A project gallery. There is no gallery page and no gallery component —
  build one only when there are at least three finished jobs, otherwise a
  "portfolio" of one reads worse than no portfolio at all.
- Case-study detail on service pages: mechanism chosen, why, what the
  constraint was. This suits the site's voice far better than testimonials.

**After the first few handovers**
- Testimonials, if and only if they are real, attributed, and the client has
  agreed in writing. Put trade quotes on `/for-trade/` and homeowner quotes on
  the relevant service page — not in a carousel on the home page.
- Review counts and ratings: only once a Google Business Profile actually has
  them. If they are added, they must also be reflected in the schema — an
  `aggregateRating` that does not match a real review source is a manual-action
  risk, not a growth tactic.

**Never**
- Project counts, "years of experience", satisfaction percentages or any other
  statistic that cannot be independently checked. There are no stat bars or
  counters anywhere in this codebase and adding them would break the site's
  only real differentiator against every competitor in this niche.

---

## 4. Copy that should be revisited after a few months of trading

| Claim | Where | Why it may change |
| --- | --- | --- |
| Lead times (quote 2 days, shop 2–5 weeks, install 1–3 days) | `/for-trade/` | Written as a promise. Check them against reality after five jobs and adjust rather than quietly missing them. |
| Price ranges | `/pricing/` | The most valuable page on the site and the one most likely to drift. Re-check against actual invoices quarterly. |
| Service area and the West Chester minimum | `/areas/west-chester-pa/` | The travel policy is stated honestly. If the business grows an installer, this page changes. |
| Insurance answer | `/for-trade/` FAQ | States general liability and workers' comp are carried. **Confirm this is true before launch** — it is a factual claim a GC will act on. |
| "Two years on my labour" warranty | `/pricing/` FAQ | A contractual commitment. Make sure it matches the actual terms and conditions. |

---

## 5. Not content, but worth knowing

- **Analytics**: none installed. No third-party scripts of any kind ship with
  the site.
- **Cookie banner**: not needed as built, because nothing sets a cookie. If
  analytics are added, this stops being true.
- **Sitemap**: generated at build time from the pages that exist. Nothing to
  maintain by hand.
