# Metaphor Contract Suite

**Series:** MCO — Client Operations  
**Owner:** Metaphor Automation Consulting  
**Agreement library status:** Controlled draft and template catalog  
**Repository classification:** Public reusable-template metadata  
**Last updated:** July 19, 2026

This directory catalogs Metaphor Automation Consulting's reusable client-contract templates. The repository is public, so it must not contain signed agreements, negotiated client terms, privileged legal advice, client information, credentials, personal data, or other confidential engagement records.

The agreement status and repository asset status are separate. No document is represented as attorney-approved unless qualified counsel expressly approves that exact version. A distribution asset must not be offered for download until its provenance, completeness, structural validity, page count, checksum, and absence of client-specific information have been verified.

See:

- [Contract Asset Register](./ASSET-REGISTER.md)
- [Contract Publication and Confidentiality Policy](./PUBLICATION-POLICY.md)

## Contract catalog

| Contract | Purpose | Agreement status | Repository asset status | Canonical path |
|---|---|---|---|---|
| [Mutual Non-Disclosure Agreement](./mutual-nda/) | Reciprocal protection of confidential information before and during an engagement | Draft for legal review | Withheld pending complete authoritative PDF | `mutual-nda/` |
| [Master Services Agreement](./master-services-agreement/) | Governing commercial relationship and baseline service terms | Client-facing draft for counsel review | Missing authoritative PDF | `master-services-agreement/` |
| [Data Processing Addendum](./data-processing-addendum/) | Privacy, security, AI processing, subprocessors, and personal-data obligations | Final Draft for Counsel Review | Missing authoritative PDF | `data-processing-addendum/` |
| [Statement of Work](./statement-of-work/) | Project-specific scope, fees, schedule, deliverables, and acceptance | Client-facing template | Withheld pending structurally valid regenerated PDF | `statement-of-work/` |
| [Change Order](./change-order/) | Approved changes to scope, schedule, pricing, or delivery | Client-facing interactive template | Missing authoritative interactive PDF | `change-order/` |

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
- Do not publish or link a distribution asset until the validation record in the asset register is complete.
