import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Collection blog, source locale (Markdown). Le même gabarit pourra plus tard
// être alimenté par un loader Supabase sans toucher aux pages : seul le `loader`
// change. Voir la stratégie de publication (ERP → Supabase → rebuild).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Tanguy A.'),
    heroImage: z.string(),
    heroAlt: z.string(),
    // Mot-clé SEO principal visé (documentaire, non affiché).
    targetKeyword: z.string().optional(),
    // Catégorie de filtrage (clé stable partagée FR/EN, libellés dans BlogList).
    category: z
      .enum(['guides', 'tarifs', 'metiers', 'technologie', 'exemples'])
      .default('guides'),
    // Langue de l'article : 'fr' (racine /blog) ou 'en' (/en/blog).
    lang: z.enum(['fr', 'en']).default('fr'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
