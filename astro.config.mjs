import { defineConfig } from 'astro/config';

// Public medical reference + calculator toolkit.
// Static build -> deploys to Cloudflare Pages (med.mark.com).
export default defineConfig({
  site: 'https://med.mark.com',
  output: 'static',
  trailingSlash: 'ignore',
});
