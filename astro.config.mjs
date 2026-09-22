import { defineConfig } from 'astro/config';

// Update `site` to the final deployed origin before going live — it is what
// canonical URLs, Open Graph tags and the sitemap are built from.
export default defineConfig({
  site: 'https://mohamedhassan.dev',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
});
