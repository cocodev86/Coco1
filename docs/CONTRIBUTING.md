# Contributing to Metaphor Documentation

**Status:** Active

**Owner:** Metaphor Automation Consulting

The repository `/docs` directory is the authoritative source for the Metaphor documentation portal. Portal routes, navigation, search records, metadata, tables of contents, and adjacent-document links are generated from this source tree.

## Contribution rules

1. Place a document in the operating domain that owns it: `mos`, `playbook`, `client-operations`, `platform`, `strategy`, or `templates`.
2. Use one level-one heading as the document title.
3. Use descriptive level-two through level-four headings so automatic anchors and tables of contents remain useful.
4. Preserve controlled-document metadata when it exists, including Document ID, Version, Classification, Status, Owner, and Last updated.
5. Use relative Markdown links for repository documentation. The portal resolves those links to generated routes.
6. Do not commit signed client agreements, credentials, secrets, personal data, privileged legal correspondence, or client-specific confidential material.
7. Contract download links may point only to verified template assets recorded in the contract asset register.
8. Renaming or moving a document requires an internal-link review and, when an existing public route changes, an explicit redirect decision.

## Review checklist

Before merging documentation changes, confirm that:

- the Markdown renders without malformed headings, tables, links, or code fences;
- every relative documentation link resolves to an existing source;
- referenced binary assets exist and are approved for public publication;
- the document appears in the intended category and search results;
- title, canonical URL, Open Graph data, and previous/next navigation are route-correct;
- `npm run validate:docs`, Repository Validation, and the Vercel preview pass.

## Source and portal relationship

Do not edit generated navigation or search data by hand. Update the Markdown source or the shared discovery engine instead. The portal must remain a projection of the repository source of truth, not a second documentation system.
