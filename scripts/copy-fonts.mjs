/**
 * Copies the self-hosted font binaries out of node_modules into public/fonts.
 * Run with `npm run fonts`. No CDN call is ever made at runtime.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/fonts');

const files = [
  // Archivo variable — carries BOTH wght and wdth axes ("standard" build).
  // The wdth axis is what lets headlines be set expanded.
  ['node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2', 'archivo-var.woff2'],
  ['node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2', 'source-serif-var.woff2'],
  ['node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2', 'plex-mono-400.woff2'],
  ['node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2', 'plex-mono-600.woff2'],
];

await mkdir(out, { recursive: true });
for (const [from, to] of files) {
  await copyFile(resolve(root, from), resolve(out, to));
  console.log(`fonts: ${to}`);
}
