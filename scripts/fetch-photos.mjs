/**
 * Downloads the licensed reference photography from Pexels, crops it to the
 * sizes the site actually uses, and writes WebP into public/images.
 *
 *   PEXELS_KEY=... npm run photos
 *
 * The API key is read from the environment and never written to disk — it is
 * not needed at runtime, only to re-fetch.
 *
 * IMPORTANT — what these images are for.
 * Every photograph here is a MATERIAL, FINISH or HARDWARE reference, or an
 * abstract texture. None of them depicts work by this shop, and none of them
 * may be used to fill a project slot. The before/after comparisons and the
 * "installed project" slots stay as labelled placeholders until there is real
 * photography. See PHOTOS-NEEDED.md.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const KEY = process.env.PEXELS_KEY;
if (!KEY) {
  console.error('Set PEXELS_KEY in the environment first.');
  process.exit(1);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/images');

/** @type {{id:number,out:string,w:number,h:number,q:number,label:string,crop?:string}[]} */
const PICKS = [
  // Finish and hardware references — the material palette a client chooses
  // from. Displayed about 240px wide in a five-up row, so 560 covers 2x DPR.
  // Fine grain compresses badly; quality is tuned per image rather than shared.
  { id: 1260727, out: 'finishes/paint-grade.webp', w: 560, h: 700, q: 62, label: 'Paint grade' },
  { id: 6757411, out: 'finishes/white-oak.webp', w: 560, h: 700, q: 68, label: 'White oak' },
  // Was #28101611 — reclaimed-looking planks. A cabinet shop reads that as barn
  // wood, not as a furniture-grade surface, which undercuts the tile it sits in.
  { id: 8337527, out: 'finishes/walnut.webp', w: 560, h: 700, q: 70, label: 'Walnut' },
  { id: 1843717, out: 'finishes/plaster.webp', w: 560, h: 700, q: 70, label: 'Level-5 plaster' },
  { id: 5825540, out: 'finishes/brass.webp', w: 560, h: 700, q: 74, label: 'Aged brass' },

  // Wide atmosphere bands.
  // 'attention' finds the pull and the hand here, which is exactly the subject.
  { id: 5825555, out: 'bands/hardware.webp', w: 2000, h: 750, q: 70, label: 'Hand on a concealed pull', crop: 'attention' },
  // ...but on this one it locked onto a forearm, so it is centred instead.
  { id: 37358115, out: 'bands/handwork.webp', w: 2000, h: 750, q: 70, label: 'Hand plane and shavings' },

  // Dropped on purpose: Pexels #34549311, a wall of flush panels with a lit
  // recess. Technically on-brief, but it reads as a finished interior and a
  // visitor would reasonably assume it was this shop's work. Every image kept
  // here is a material, a tool or a piece of hardware — never a room.

  // Texture used behind dark sections. Compressed hard on purpose — it sits
  // under a heavy overlay and is never looked at directly.
  { id: 4705928, out: 'texture/dark-grain.webp', w: 1400, h: 950, q: 55, label: 'Dark wood grain' },
];

const credits = [];

for (const pick of PICKS) {
  const meta = await (
    await fetch(`https://api.pexels.com/v1/photos/${pick.id}`, { headers: { Authorization: KEY } })
  ).json();

  if (!meta.src) {
    console.error(`${pick.id}: no src returned`);
    continue;
  }

  const bytes = Buffer.from(await (await fetch(meta.src.original)).arrayBuffer());
  const target = resolve(outDir, pick.out);
  await mkdir(dirname(target), { recursive: true });

  await sharp(bytes)
    .resize(pick.w, pick.h, {
      fit: 'cover',
      position: pick.crop === 'attention' ? sharp.strategy.attention : 'centre',
    })
    .webp({ quality: pick.q, effort: 6 })
    .toFile(target);

  const { size } = await sharp(target).metadata().then(async () => {
    const { statSync } = await import('node:fs');
    return statSync(target);
  });

  credits.push({ ...pick, photographer: meta.photographer, url: meta.url, kb: Math.round(size / 1024) });
  console.log(`${pick.out.padEnd(34)} ${pick.w}x${pick.h}  ${Math.round(size / 1024)} KB  © ${meta.photographer}`);
}

const total = credits.reduce((n, c) => n + c.kb, 0);
console.log(`\ntotal ${total} KB across ${credits.length} images`);

const md = `# Photo credits

Every photograph on this site is a **material, finish or hardware reference**,
or an abstract texture. None of them depicts work by this shop. Project
photography slots are still labelled placeholders — see
[PHOTOS-NEEDED.md](PHOTOS-NEEDED.md).

All images below are from [Pexels](https://www.pexels.com) under the
[Pexels licence](https://www.pexels.com/license/): free for commercial use, no
attribution required. Credit is given here anyway, because the photographers
did the work.

Re-fetch or re-crop with \`PEXELS_KEY=... npm run photos\`.

| File | Used for | Photographer | Source |
| --- | --- | --- | --- |
${credits.map((c) => `| \`public/images/${c.out}\` | ${c.label} | ${c.photographer} | [Pexels #${c.id}](${c.url}) |`).join('\n')}

Total: ${total} KB across ${credits.length} images, all served as WebP from this
domain. Nothing is hot-linked.

## Not included

Manufacturer product photography (Auton, Nexus 21, Future Automation, Firgelli,
Sonance) is **not** used anywhere on this site. Those images are copyrighted by
their owners and permission has not been granted. If a manufacturer grants
permission in writing, add the images here with the grant recorded alongside.
`;

await writeFile(resolve(root, 'CREDITS.md'), md);
console.log('wrote CREDITS.md');
