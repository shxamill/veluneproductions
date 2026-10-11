// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// No production domain is confirmed yet, so `site` is intentionally unset:
// canonical URLs, absolute Open Graph URLs and a sitemap host depend on it.
// Set `site: 'https://<confirmed-domain>'` here once Velune confirms one.
export default defineConfig({
  trailingSlash: 'always',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Lato',
      cssVariable: '--font-sans',
      weights: [400, 700, 900],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'EB Garamond',
      cssVariable: '--font-serif',
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['serif'],
    },
  ],
});
