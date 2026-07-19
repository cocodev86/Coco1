# Metaphor Contract Asset Register

**Owner:** Metaphor Automation Consulting  
**Repository:** `cocodev86/Coco1`  
**Register status:** Active controlled record  
**Last reviewed:** July 19, 2026

This register separates legal-review status from repository publication status. Technical validation confirms that a distribution file is complete, structurally openable, consistently rendered, and suitable for public-template publication. It does not constitute legal approval.

| Contract | Distribution asset | Agreement status | Repository asset status | Pages | Form fields | Size (bytes) | SHA-256 |
|---|---|---|---|---:|---:|---:|---|
| Master Services Agreement | `master-services-agreement/metaphor-master-services-agreement-v1.0.pdf` | Client-facing draft for counsel review | Validated and published | 15 | 12 | 120954 | `d045b3edbd02d59fd416504884811a7c1b5c660038b931894bb4d53209ced9b0` |
| Statement of Work | `statement-of-work/metaphor-statement-of-work-v1.0.pdf` | Client-facing template | Regenerated, validated, and published | 3 | 0 | 4737 | `c6f0028bf65705d109452d75a264c4d1a34f7a1f71fdaa1ce84ec72059312a06` |
| Change Order | `change-order/metaphor-change-order-v1.0-interactive.pdf` | Client-facing interactive template | Validated and published | 7 | 96 | 110798 | `7777591d76d911c767348a4496d40f0640cef30c105f22224c049ce82399b2b7` |
| Mutual Non-Disclosure Agreement | `mutual-nda/metaphor-mutual-nda-v2.0.pdf` | Final draft for counsel review | Complete v2.0 validated and published | 12 | 0 | 188811 | `777e75575edd84fb544188692a6cff2f5f9311276d63aa630b47499687c9b093` |
| Data Processing Addendum | `data-processing-addendum/metaphor-data-processing-addendum-v1.0.pdf` | Final draft for counsel review | Validated and published | 13 | 0 | 176265 | `9e24bef81dde741ee32e85094d26fcc5e780a40569eeb5d6996c05eb890e11f4` |

## Validation record

All five assets passed the following publication checks:

- Source provenance and version confirmation
- Successful structural open and text extraction
- Page-count verification
- Render verification in two independent PDF renderers
- Visual inspection for clipping, overlaps, broken glyphs, and blank pages
- SHA-256 and file-size recording
- Confirmation that files are not encrypted
- Confirmation that no signed, negotiated, or client-populated agreement is included
- Form-field preservation check for interactive documents

The Change Order retained 96 interactive fields. The MSA retained 12 form fields. The SOW replacement is a structurally valid regenerated three-page PDF.

See [VALIDATION-RECORD.md](./VALIDATION-RECORD.md) for the detailed technical publication record.

## Status rules

- **Validated and published** means the exact file listed above passed technical publication checks and is available in this public template library.
- **Counsel review** means qualified legal counsel has not yet approved the substantive legal language.
- Signed agreements, negotiated client terms, privileged advice, credentials, personal data, and client-specific records must remain outside this public repository.
- New versions must be added as separately versioned assets rather than silently replacing an approved or executed copy.