# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to /dist
npm run preview  # Serve built site locally
```

No test suite or linter is configured.

## Architecture

Single-page static site for Aitom (AI & automation consulting agency). Built with **Astro 5** + **Tailwind CSS 3**, deployed to Vercel as static HTML.

**Page composition** — `src/pages/index.astro` assembles all sections in order:

```
Layout.astro        ← <html>, SEO meta, global styles, scroll animation init
└── Nav.astro       ← Fixed sticky nav with mobile hamburger
└── Hero.astro      ← Above-fold with marquee + rotating SVG arc
└── Services.astro  ← 4-item hover-reveal grid (#services)
└── Approach.astro  ← 4-step methodology (#approche)
└── Work.astro      ← Project showcase grid (#projets)
└── About.astro     ← Agency description + stats (#about)
└── CTASection.astro
└── Footer.astro
```

Navigation is anchor-based (`#services`, `#approche`, `#projets`, `#about`, `#contact`). No routing.

**Reusable primitives:** `Container.astro` (max-width wrapper) and `Section.astro` (section wrapper with padding).

## Styling conventions

Custom Tailwind tokens (defined in `tailwind.config.mjs`):
- Colors: `bg-bg` (`#0C0B08`), `text-ink` (`#EDE9E0`), `text-muted` (`#787068`), `bg-accent` / `text-accent` (`#CCFF00`)
- Spacing: `py-section` (160px), `py-section-sm` (96px)
- Font: Figtree Variable — self-hosted via `@fontsource-variable/figtree`, family name `'Figtree Variable'`
- Easing: `ease-expo` → `cubic-bezier(0.16, 1, 0.3, 1)`

## Scroll animations

Elements gain `data-animate` to opt into fade-up-on-scroll. Stagger order is controlled with `data-delay="1"` through `data-delay="5"`. The Intersection Observer that drives this is initialised in `Layout.astro`. Respects `prefers-reduced-motion`.
