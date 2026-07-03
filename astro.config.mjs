import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      // Pages de travail internes : hors sitemap (elles sont aussi en noindex).
      filter: (page) => !page.includes('/propositions-'),
    }),
  ],
  site: 'https://aitom.fr',
  output: 'static',
  // `astro preview` (utilisé sur Railway) bloque les hôtes inconnus par défaut.
  // Site public statique derrière le proxy Railway → on autorise tous les hôtes.
  server: {
    allowedHosts: true,
  },
});