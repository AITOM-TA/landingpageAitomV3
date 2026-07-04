# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to /dist
npm run preview  # Serve built site locally
npm start        # serve dist/ on $PORT (used by Railway)
```

No test suite or linter is configured.

## Architecture

Marketing site for **Aitom**, an AI phone receptionist ("standard téléphonique IA") for French artisans, practices and service SMBs. Built with **Astro 5** + **Tailwind CSS 3**, `output: 'static'`. All copy and code comments are in **French**: keep new copy in French.

> **Règle de rédaction, NON NÉGOCIABLE : jamais de tiret cadratin (`—`, U+2014) ni de tiret demi-cadratin (`–`, U+2013), nulle part** : ni dans le contenu (articles, pages, composants), ni dans les commentaires de code, ni dans ce fichier. À la place : deux-points pour introduire une explication ou un intitulé (`Label : texte`), virgule pour une incise, ou parenthèses. Cette règle s'applique à toute nouvelle rédaction, y compris les articles de blog générés.

**Pages:**
- `src/pages/index.astro`: the landing page (see composition below)
- `src/pages/mentions-legales.astro`, `politique-de-confidentialite.astro`: legal pages using `LegalLayout.astro` (minimal header + `.prose` styling, wraps `Layout.astro`)
- `src/pages/propositions-hero.astro`, `propositions-reassurance.astro`: internal "pages de travail" showing design variants; reachable by URL but not linked, `noindex` (via the Layout prop) and excluded from the sitemap (filter in `astro.config.mjs`)
- `src/pages/blog/index.astro`: blog listing (hero + client-side search + card grid). `src/pages/blog/[...slug].astro`: article template (breadcrumb, two-column header, sticky numbered TOC with scroll-spy, prose, author box, CTA, related posts, `Article` JSON-LD). Both reuse `Nav`/`Footer`.

**Blog content** lives in `src/content/blog/*.md`, driven by the `blog` collection in `src/content.config.ts` (Astro Content Layer, `glob` loader). Frontmatter schema: `title`, `description`, `publishDate`, `author`, `heroImage` (a `/blog/*.webp` path), `heroAlt`, `targetKeyword` (SEO doc), `draft`. Hero images are generated with Replicate FLUX (isometric flat-vector, indigo/periwinkle) and live in `public/blog/`. The blog is linked only from the **Footer** (not the main Nav) but IS in the sitemap. To migrate to a Supabase-sourced pipeline later, swap only the collection's `loader`; the pages don't change. **Never introduce em-dashes in articles** (see the rule above).

**Landing page composition**: `index.astro` assembles sections in order; navigation is anchor-based, no routing:

```
Layout.astro          ← <html>, SEO meta, GA4, global styles, scroll reveal + Lenis init
└── Nav.astro         ← Fixed nav (68px), mobile burger; "Se connecter" (app.aitom.fr) + "Parler à un expert" (#contact). Nav/Footer anchors auto-prefix `/` off the home page (see the `home` const) so they work from /blog and legal pages.
└── Hero.astro        ← Above-fold: headline, marquee, PhoneMock.astro (2.5D tilt phone mockup)
└── Cost.astro        ← Cost of missed calls (#cout)
└── Services.astro    ← Solution grid (#solution)
└── Approach.astro    ← How it works steps (#fonctionnement)
└── Video.astro       ← 60s presentation video in a phone frame (#video)
└── TrustLogos.astro  ← Client logo banner
└── Work.astro        ← Client cases (#projets)
└── Platform.astro    ← Dashboard screenshots from /public/app (#plateforme)
└── Beyond.astro      ← Going further (#plus-loin)
└── FAQ.astro         ← Accordion (#faq)
└── CTASection.astro  ← Lead form (#contact)
└── Footer.astro
```

`About.astro` and `CookieBanner.astro` exist but are currently **not rendered** (the cookie banner is commented out in `Layout.astro`; re-enable by restoring its import + tag). `Container.astro` / `Section.astro` are reusable wrappers.

## External services (hard-coded URLs/IDs)

- **Lead form** (`CTASection.astro`): submits JSON via `fetch` to an **n8n webhook** (URL hard-coded in the component script), payload `{first_name, last_name, email, phone, message, submitted_at, source: 'landing-aitom', page}`. Fallback contact email: contact@aitom.fr.
- **GA4**: gtag snippet in `Layout.astro` `<head>`, ID `G-YEXF5GRC6F`, with **Consent Mode v2 defaulting to denied** (cookieless pings only; re-enable `CookieBanner` + `gtag('consent','update',…)` to collect full data). Only page views: no custom events wired up.
- **Video** (`Video.astro`): MP4 served from **Supabase Storage** (public URL hard-coded); `#t=0.5` fragment used as poster frame.
- **SEO**: `@astrojs/sitemap` with `site: 'https://aitom.fr'`; `robots.txt` in `public/`. Per-page canonical is computed in `Layout.astro` from `Astro.url.pathname`. JSON-LD: `Organization` in `Layout.astro`, `FAQPage` in `FAQ.astro` (generated from the `faqs` array). `public/og.png` (1200×630) is wired as `og:image`/`twitter:image`.

## Deployment

`vercel.json` configures Vercel, but the site also runs on **Railway** via `npm start` (static `serve` of `dist/` behind Railway's proxy; `astro.config.mjs` keeps `server.allowedHosts: true` from the earlier `astro preview` setup). Don't remove either without checking where production actually lives.

## Styling conventions

Custom Tailwind tokens (defined in `tailwind.config.mjs`):
- Colors (light/warm palette): `bg` (`#FAF8F2`), `surface` (`#F1EDE4`), `surface-2` (`#E7E1D5`), `border` (`#DCD5C8`), `ink` (`#1A1712`), `muted` (`#6B635A`), `faint` (`#B3AA9B`), accent tint scale darkest→lightest: `accent` (`#6967FB`, indigo), `accent-2` (`#8785FC`), `accent-3` (`#A5A4FD`), `accent-4` (`#C3C2FD`). The palette sits under `theme.colors` (not `extend`), so it **replaces** Tailwind's defaults: utilities like `text-red-500` are unavailable. The palette has been flipped wholesale in past commits, so read the config rather than assuming a theme.
- **Accent is also hard-coded** (`#6967FB` or its rgba) outside the token, in component `<style>` blocks: `Layout.astro` (`::selection`, `.btn-primary` hover shadow), `PhoneMock.astro`, `Video.astro`, `Work.astro`, `FAQ.astro`, `CTASection.astro`, `CookieBanner.astro`, `LegalLayout.astro`, and the propositions pages. When retoning the accent, `grep -ri 6967FB src/` and update everything together.
- **Gotcha:** editing tokens in `tailwind.config.mjs` does NOT hot-reload: restart the dev server and clear `node_modules/.vite` for the regenerated utility CSS to apply.
- Spacing: `py-section` (160px), `py-section-sm` (96px); `max-w-container` (1280px); default radius `4px`; base body text `17px`/`1.65`; `ease-expo` → `cubic-bezier(0.16, 1, 0.3, 1)`.
- Font: **Figtree**, self-hosted via `@font-face` in `Layout.astro` pointing to `/fonts/Figtree-*.woff2` (only Regular/Italic/Bold/BoldItalic are shipped; the original `.ttf` files sit alongside, unreferenced). `font-display` / `font-sans` both map to `'Figtree'`. The `@fontsource-variable/figtree` dependency is **not** used; the full weight set in `fontsAItom/` is not wired up.
- Display sizes `text-hero`, `text-display`, `text-display-sm` are **not** Tailwind tokens: they're clamp-based global classes in `Layout.astro`'s `<style>` block, alongside `.btn-primary` (sheen sweep + lift) and `.btn-secondary` (animated underline via a `.btn-label` child span). A fixed `.grain` film-grain overlay div is rendered once in `Layout.astro`.

## Motion

- **Scroll reveal:** elements opt in with `data-animate`; an IntersectionObserver in `Layout.astro`'s script adds `.is-visible`, which triggers a `@keyframes reveal` animation (translateY + scale + blur, 950ms). Keyframes are used deliberately so the reveal doesn't fight hover `transition`s on cards. Stagger with `data-delay="1"` to `"5"` (90-480ms). One-shot: the observer `unobserve`s after reveal.
- **Smooth scrolling:** **Lenis** inertia scroll is initialised in the same script (skipped under `prefers-reduced-motion`, where native CSS `scroll-smooth` takes over). Anchor offset `-80` clears the fixed nav, matching the global `[id] { scroll-margin-top: 80px }`.
- **2.5D phone tilt:** `PhoneMock.astro` (hero) and `Video.astro` implement mouse-follow parallax + idle float on the phone frames (`data-tilt` / `data-tilt-video`).

## Assets

Web-served assets live in `public/` (`logos/` client logos, `app/` dashboard screenshots, `fonts/`). Components reference the **`.webp`** versions (generated via `sharp`, which is available through `node_modules`); the original `.png`/`.jpg` files sit alongside as sources. Image files at the repo root and in `logos/` / `fontsAItom/` are raw source material, not served.
