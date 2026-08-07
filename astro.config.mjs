import { defineConfig } from 'astro/config';

// Public medical reference + calculator toolkit.
// Static build -> GitHub Pages project site at https://RDx75.github.io/medkit/.
// Because it's a *project* site, every URL needs the /medkit/ base prefix so
// links resolve under the repo path. Files are uploaded to the artifact root
// (the /medkit/ part comes from the repo name, not a folder).
export default defineConfig({
  site: 'https://rdx75.github.io/medkit/',
  base: '/medkit/',
  output: 'static',
  trailingSlash: 'ignore',
});
