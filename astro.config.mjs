import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://aitom.fr',
  output: 'static',
  // `astro preview` (utilisé sur Railway) bloque les hôtes inconnus par défaut.
  // Site public statique derrière le proxy Railway → on autorise tous les hôtes.
  server: {
    allowedHosts: true,
  },
});