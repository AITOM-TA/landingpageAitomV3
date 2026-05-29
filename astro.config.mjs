import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://aitom.fr',
  output: 'static',
  // `astro preview` (utilisé sur Railway) bloque les hôtes inconnus par défaut.
  // Site public statique derrière le proxy Railway → on autorise tous les hôtes.
  server: {
    allowedHosts: true,
  },
});
