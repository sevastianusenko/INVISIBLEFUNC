// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://invisiblefunction.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    // One stylesheet instead of many small <link>s — fewer round trips.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
