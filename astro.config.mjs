import { defineConfig } from 'astro/config';

// Public medical reference + calculator toolkit.
// Static build -> GitHub Pages (RDx75.github.io/medkit) or Cloudflare Pages (med.mark.com).
// Base path is applied at deploy time (files copied under /medkit/), so we keep base '/'
// and the workflow places dist into the gh-pages/medkit/ folder.
export default defineConfig({
  site: 'https://med.mark.com',
  output: 'static',
  trailingSlash: 'ignore',
});
