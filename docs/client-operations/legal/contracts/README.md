# Metaphor Contract Suite

**Series:** MCO — Client Operations  
**Owner:** Metaphor Automation Consulting  
**Agreement library status:** Controlled draft and template catalog  
**Repository classification:** Public reusable-template library  
**Last updated:** July 19, 2026

This directory contains Metaphor Automation Consulting's reusable client-contract templates and their controlled distribution assets. The repository is public, so it must not contain signed agreements, negotiated client terms, privileged legal advice, client information, credentials, personal data, or confidential engagement records.

Technical publication validation and legal approval are separate. The PDFs listed below have been validated for repository distribution, but documents marked for counsel review are not represented as attorney-approved.

See:

- [Contract Asset Register](./ASSET-REGISTER.md)
- [Technical Validation Record](./VALIDATION-RECORD.md)
- [Contract Publication and Confidentiality Policy](./PUBLICATION-POLICY.md)

## Contract catalog

| Contract | Purpose | Agreement status | Repository asset status | Canonical path |
|---|---|---|---|---|
| [Mutual Non-Disclosure Agreement](./mutual-nda/) | Reciprocal protection of confidential information before and during an engagement | Final draft for counsel review, v2.0 | Validated PDF available | `mutual-nda/` |
| [Master Services Agreement](./master-services-agreement/) | Governing commercial relationship and baseline service terms | Client-facing draft for counsel review | Validated PDF available | `master-services-agreement/` |
| [Data Processing Addendum](./data-processing-addendum/) | Privacy, security, AI processing, subprocessors, and personal-data obligations | Final draft for counsel review | Validated PDF available | `data-processing-addendum/` |
| [Statement of Work](./statement-of-work/) | Project-specific scope, fees, schedule, deliverables, and acceptance | Client-facing template | Regenerated validated PDF available | `statement-of-work/` |
| [Change Order](./change-order/) | Approved changes to scope, schedule, pricing, or delivery | Client-facing interactive template | Validated interactive PDF available | `change-order/` |

## Recommended execution order

1. Mutual NDA, when needed before substantive discussions.
2. Master Services Agreement.
3. Data Processing Addendum, when Metaphor will process personal data.
4. Statement of Work.
5. Change Order, when approved project changes occur.

## Governance

- Preserve all version identifiers and legal-review designations.
- Do not overwrite signed, approved, or superseded documents.
- Add revised editions as separately versioned assets.
- Use lowercase kebab-case repository filenames.
- Route substantive legal changes through pull-request review and qualified counsel.
- Keep signed and client-specific agreements outside this public repository.
- Recalculate checksums and repeat technical validation whenever a distribution asset changes.