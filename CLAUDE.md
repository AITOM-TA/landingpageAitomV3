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
- Colors (currently a **light/warm** palette): `bg` (`#FAF8F2`), `surface` (`#F1EDE4`), `surface-2` (`#E7E1D5`), `border` (`#DCD5C8`), `ink` (`#1A1712`), `muted` (`#6B635A`), `faint` (`#B3AA9B`), `accent` (`#6967FB`, an indigo). The accent ships with a tint scale (darkest→lightest): `accent` (`#6967FB`), `accent-2` (`#8785FC`), `accent-3` (`#A5A4FD`), `accent-4` (`#C3C2FD`). The palette is set under `theme.colors` (not `extend`), so it **replaces** Tailwind's defaults — utilities like `text-red-500` are unavailable. Note: recent commits have flipped the whole palette (and re-toned the accent) by editing these values, so always read the config rather than assuming a theme. The accent hex is also hard-coded in a few non-token spots that must be changed alongside the token: `Layout.astro` (`::selection`, button hover shadow), the `Hero.astro` decorative SVG arcs, and the `.work-card:hover .tag` / `.faq-icon` / CTA form-focus rules in their component `<style>` blocks. **Gotcha:** editing accent (or any token) in `tailwind.config.mjs` does NOT hot-reload — restart the dev server and clear `node_modules/.vite` for the regenerated utility CSS to apply.
- Spacing: `py-section` (160px), `py-section-sm` (96px); `max-w-container` (1280px)
- Other tokens: `rounded` default radius is `4px`; base body text is `17px`/`1.65` line-height; `ease-expo` → `cubic-bezier(0.16, 1, 0.3, 1)`
- Font: **Figtree**, self-hosted via `@font-face` in `Layout.astro` pointing to `/fonts/Figtree-*.ttf` (in `public/fonts/`; only Regular/Italic/Bold/BoldItalic are shipped). Use `font-display` / `font-sans` (both map to `'Figtree'`). The `@fontsource-variable/figtree` dependency is **not** actually used; the full weight set in `fontsAItom/` is not wired up.
- Display sizes `text-hero`, `text-display`, `text-display-sm` are **not** Tailwind tokens — they're clamp-based global classes in `Layout.astro`'s `<style>` block.
- Global component classes also live in that `<style>` block: `.btn-primary` (sheen sweep + lift on hover) and `.btn-secondary` (animated underline via a `.btn-label` child span). A fixed `.grain` film-grain overlay div is rendered once in `Layout.astro`.

## Scroll animations

Elements gain `data-animate` to opt into fade-up-on-scroll (translateY + opacity). Stagger order is controlled with `data-delay="1"` through `data-delay="5"` (80ms steps; only 1–3 are currently used). The Intersection Observer that drives this is initialised in `Layout.astro`'s `<script>` and adds `.is-visible` when an element scrolls into view. `prefers-reduced-motion` is respected via CSS (the observer still runs, but the animated properties are neutralised).
