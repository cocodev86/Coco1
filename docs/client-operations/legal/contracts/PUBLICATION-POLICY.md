# Contract Publication and Confidentiality Policy

**Owner:** Metaphor Automation Consulting  
**Applies to:** `docs/client-operations/legal/contracts/`  
**Status:** Controlled repository policy  
**Last reviewed:** July 19, 2026

## Public repository scope

This public repository may contain only reusable, unsigned contract templates and non-confidential documentation about those templates. Publication does not make a document attorney-approved, execution-ready, or appropriate for every engagement.

## Prohibited content

Do not commit any of the following to this public repository:

- Signed agreements
- Client names, addresses, contact information, pricing, account data, or signatures
- Negotiated redlines or client-specific terms
- Confidential security schedules or client infrastructure details
- Personal data, credentials, API keys, access tokens, or regulated information
- Internal legal advice or privileged attorney communications

Signed and negotiated agreements must be stored in an approved private contract-management or secure document-storage system.

## Classification model

Repository pages must distinguish between:

1. **Agreement status** — for example, draft for counsel review or client-facing template.
2. **Repository publication status** — missing, withheld, pending validation, or validated.
3. **Repository classification** — public reusable template metadata or public reusable template.

The word **Confidential** must not be used as the repository classification for material intentionally published in this public repository. A contract may still contain confidentiality obligations as substantive agreement terms.

## Publication gate

A PDF may be offered for download only after:

- Its provenance and version are confirmed.
- The complete text matches the authoritative source.
- The file passes structural validation and opens in multiple viewers.
- Interactive fields work when applicable.
- No signed, negotiated, client-specific, privileged, personal, or secret information is present.
- Its checksum, page count, and validation result are recorded.

## Versioning

- Never overwrite signed or superseded documents.
- Publish revised templates as separately versioned assets.
- Use lowercase kebab-case filenames.
- Preserve document identifiers, version numbers, review status, and counsel-review notices.
- Route substantive legal changes through qualified counsel and pull-request review.
