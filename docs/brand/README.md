# Metaphor Enterprise Brand System

**Status:** Production brand source of truth  
**Identity:** Metaphor Systems Bridge  
**Owner:** Metaphor Automation Consulting

## Concept

The Systems Bridge symbol represents two operating sides becoming one connected system. Violet represents intelligence, architecture, and orchestration. Lime represents motion, measurable output, and growth. The dark center represents the controlled handoff where strategy becomes an operating workflow.

## Canonical assets

The production asset library lives under `public/brand/`:

- `logos/` contains horizontal, stacked, compact, wordmark, symbol, monogram, monochrome, outline, light, dark, and micro SVG variants.
- `favicons/` contains browser, Apple, Windows tile, Safari pinned-tab, and web-manifest assets.
- `app-icons/` contains standard, maskable, high-resolution application icons, source SVGs, and the social-avatar square.

Every wordmark is converted to vector outlines. Canonical logo SVGs must not contain `<text>` elements, system-font references, or external font dependencies.

## Application integration

Use `BrandLink` for linked header and footer lockups, `Logo` for standalone lockups, and `BrandMark` for compact symbol use. Do not create new hard-coded logo paths in route components.

```tsx
import BrandLink from "@/components/branding/BrandLink";

<BrandLink href="/" variant="compactDark" logoWidth={176} />
```

Brand names, colors, logo paths, application icons, and manifest paths are centralized in `lib/brand.ts`.

## Usage rules

- Use `compactDark` or `horizontalDark` on light backgrounds.
- Use `compactLight` or `horizontalLight` on dark backgrounds.
- Use monochrome variants where color reproduction is unavailable.
- Use `symbolMicro` for browser-scale rendering and `symbolColor` for normal icon use.
- Keep clear space around the symbol equal to at least one quarter of its width.
- Do not recolor individual bridge segments, stretch the lockup, add shadows, place live text over the mark, or recreate a temporary letter tile.
- Signed legal documents may use the monochrome lockup where print reproduction requires it.

## Validation

Run:

```bash
npm run validate:brand
```

The validator verifies the complete asset inventory, SVG outline integrity, raster dimensions, manifest purposes, and removal of placeholder `M` tiles from application source.
