# Documentation Contributor Guide

**Document ID:** DOCS-0001

**Version:** 1.0.0

**Owner:** Knowledge Curator

**Status:** Active

**Classification:** Internal

## Purpose

This guide explains how to extend the Metaphor Operating System documentation portal without duplicating content in application components. Markdown under `/docs` is the source of truth.

## Add a document

1. Choose the correct family directory: `mos`, `playbook`, `client-operations`, `platform`, `strategy`, or `templates`.
2. Create or update a Markdown file in that directory.
3. Add the required metadata immediately below the level-one title.
4. Use descriptive headings and relative Markdown links.
5. Run the validation commands and review the generated route locally.
6. Submit the change through a pull request.

Do not copy Markdown into React components. The portal discovers and renders source files during the Next.js build.

## Naming conventions

Controlled documents use the identifier pattern `SERIES-0000`, such as `MOS-0012` or `MPB-0005`. Use lowercase kebab-case filenames for standalone documents:

```text
docs/client-operations/MCO-0002-client-onboarding-standard.md
```

Series manuals may remain consolidated in `MANUAL.md`. A level-two heading that begins with a supported identifier becomes a virtual document with its own URL:

```markdown
## MOS-0012 — Security Engineering Standard
```

Templates use an uppercase descriptive filename ending in `-TEMPLATE.md`.

## Required metadata

Place metadata directly below the level-one heading. Use bold labels so the parser can read them without requiring frontmatter:

```markdown
# MOS-0012 — Security Engineering Standard

**Document ID:** MOS-0012
**Version:** 1.0.0
**Owner:** Security Engineering
**Status:** Proposed
**Classification:** Internal
**Last updated:** 2026-07-19
```

At minimum, provide a document ID, version, owner, status, and classification. Existing documents without complete metadata continue to render gracefully.

## Navigation ordering

Document families follow the centralized order in `lib/docs.ts`: MOS, MPB, MCO, MCP, MST, then Templates. Numbered sections inside a manual follow source order. Standalone files are ordered after numbered manual sections and then alphabetically by title.

The sidebar, category pages, previous/next links, route generation, and homepage counts all consume the same generated content model. Do not create a separate navigation list inside a page component.

## Stable routes

Filenames and numbered headings generate lowercase, human-readable URLs. For example:

```text
## MOS-0003 — Engineering Standards
→ /docs/mos/mos-0003-engineering-standards
```

Renaming a file or numbered heading changes its URL. Treat those names as stable public contracts and add a redirect if a rename is unavoidable.

## Search indexing

The build creates a lightweight client-side index from document titles, identifiers, categories, headings, and plain body content. Search requires no external service. New documents and heading changes are indexed automatically after a rebuild.

Do not include secrets, client-confidential material, credentials, or restricted personal information in the repository. Search data is shipped to the browser.

## Markdown support

The portal supports GitHub-flavored Markdown, including tables, task lists, blockquotes, fenced code blocks, inline code, and horizontal rules. Headings receive automatic anchors. Fenced code blocks receive syntax highlighting when a language is specified.

Use relative links for documentation references and absolute HTTPS links for external resources.

## Preview locally

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/docs`. Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm run build
```

## Portal architecture decisions

- The application remains on the existing Next.js App Router architecture.
- Markdown stays outside the route tree and is loaded only by server modules.
- Consolidated manuals are split into virtual documents at build time, preserving one source file while providing stable document routes.
- Navigation, metadata, search, table of contents, and adjacent-document links derive from one content model.
- Search remains client-side because the current corpus is small and does not justify external indexing infrastructure.
- Interactive behavior is isolated to client components; content discovery and rendering remain server-side.
- CSS Modules preserve the existing project styling approach and prevent documentation styles from leaking into the marketing application.

## Review checklist

- Metadata is complete and accurate.
- Heading hierarchy is semantic and does not skip levels unnecessarily.
- Relative links resolve correctly.
- Tables remain readable on narrow screens.
- Code fences specify a language where appropriate.
- The document appears in the intended category and order.
- Lint, type checking, and production build pass.
