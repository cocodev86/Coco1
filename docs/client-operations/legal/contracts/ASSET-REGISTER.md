# Metaphor Contract Asset Register

**Owner:** Metaphor Automation Consulting  
**Repository:** `cocodev86/Coco1`  
**Register status:** Active remediation record  
**Last reviewed:** July 19, 2026

This register separates the status of the legal text from the status of repository distribution assets. A contract can be a substantive draft while its PDF remains missing, invalid, incomplete, or withheld.

| Contract | Expected distribution asset | Agreement status | Repository asset status | Validation status | Required action |
|---|---|---|---|---|---|
| Master Services Agreement | `master-services-agreement/metaphor-master-services-agreement-v1.0.pdf` | Client-facing draft for counsel review | Missing | Not validated | Publish the authoritative supplied PDF without reconstructing legal language. |
| Statement of Work | `statement-of-work/metaphor-statement-of-work-v1.0.pdf` | Client-facing template | Withheld during remediation | Failed structural review | Regenerate from the authoritative source and validate the PDF cross-reference table. |
| Change Order | `change-order/metaphor-change-order-v1.0-interactive.pdf` | Client-facing interactive template | Missing | Not validated | Publish the authoritative AcroForm PDF and verify that form fields remain interactive. |
| Mutual Non-Disclosure Agreement | `mutual-nda/metaphor-mutual-nda-v1.0.pdf` | Draft for legal review | Withheld during remediation | Failed completeness review | Publish the complete authoritative draft; do not use the prior summary PDF. |
| Data Processing Addendum | `data-processing-addendum/metaphor-data-processing-addendum-v1.0.pdf` | Final Draft for Counsel Review | Missing | Not validated | Publish the authoritative supplied PDF without altering substantive legal language. |

## Required validation record

Before an asset is marked available, record all of the following in the pull request:

- Source provenance and version confirmation
- Exact repository filename
- File size and SHA-256 checksum
- Page count
- Successful open/render test in at least two independent PDF viewers
- Structural validation result
- Text-completeness review against the authoritative source
- Form-field validation for interactive PDFs
- Confirmation that no signed agreement or client-specific confidential information is included

## Status rules

- **Missing** means no repository distribution asset exists.
- **Withheld during remediation** means a previously published asset was removed from the remediation branch because it was incomplete or structurally defective.
- **Not validated** means the asset must not be offered for download.
- **Validated** may be used only after the required validation record is complete.
- No document may be represented as attorney-approved unless qualified counsel expressly approves that exact version.
