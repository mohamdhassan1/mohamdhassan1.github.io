import { defineConfig } from 'astro/config';

// `site` is the deployed origin: canonical URLs and Open Graph tags are built
// from it. Deployed as a GitHub Pages user site, so it serves from the domain
// root and needs no `base` path.
export default defineConfig({
  site: 'https://mohamdhassan1.github.io',
  compressHTML: true,
  // Default is "_astro"; a leading underscore is reserved by some static hosts,
  // so the bundled CSS and fonts go somewhere portable instead.
  build: { inlineStylesheets: 'auto', assets: 'assets' },
  image: { responsiveStyles: true },
});
