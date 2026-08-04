import { defineConfig } from 'astro/config';

// Public medical reference + calculator toolkit.
// Static build -> GitHub Pages (RDx75.github.io/medkit) or Cloudflare Pages (med.mark.com).
// ASTRO_BASE is set by the Pages workflow so assets resolve under /medkit/.
export default defineConfig({
  site: 'https://med.mark.com',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  trailingSlash: 'ignore',
});
