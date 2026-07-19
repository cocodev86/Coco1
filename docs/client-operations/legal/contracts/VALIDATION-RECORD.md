# Contract Distribution Technical Validation Record

**Owner:** Metaphor Automation Consulting  
**Validation date:** July 19, 2026  
**Scope:** Public reusable contract-template PDFs  
**Legal status:** Technical publication validation only; not legal approval

## Validation method

Each PDF was checked for source/version alignment, successful open and text extraction, page count, encryption state, visual rendering, and cross-renderer parity. Interactive fields were counted and preserved where present. Files were reviewed to confirm that they are unsigned reusable templates rather than executed or client-populated agreements.

## Results

| Asset | Pages | Fields | Bytes | SHA-256 | Result |
|---|---:|---:|---:|---|---|
| `master-services-agreement/metaphor-master-services-agreement-v1.0.pdf` | 15 | 12 | 120954 | `d045b3edbd02d59fd416504884811a7c1b5c660038b931894bb4d53209ced9b0` | Pass |
| `statement-of-work/metaphor-statement-of-work-v1.0.pdf` | 3 | 0 | 4737 | `c6f0028bf65705d109452d75a264c4d1a34f7a1f71fdaa1ce84ec72059312a06` | Pass |
| `change-order/metaphor-change-order-v1.0-interactive.pdf` | 7 | 96 | 110798 | `7777591d76d911c767348a4496d40f0640cef30c105f22224c049ce82399b2b7` | Pass |
| `mutual-nda/metaphor-mutual-nda-v2.0.pdf` | 12 | 0 | 188811 | `777e75575edd84fb544188692a6cff2f5f9311276d63aa630b47499687c9b093` | Pass |
| `data-processing-addendum/metaphor-data-processing-addendum-v1.0.pdf` | 13 | 0 | 176265 | `9e24bef81dde741ee32e85094d26fcc5e780a40569eeb5d6996c05eb890e11f4` | Pass |

## Specific findings

- The Statement of Work replacement is a structurally valid regenerated three-page PDF.
- The Change Order retains 96 interactive fields after optimization and publication preparation.
- The MSA retains 12 form fields.
- The Mutual NDA v2.0 contains the full 23-section agreement and supersedes the incomplete v1.0 distribution asset.
- The DPA contains its security, subprocessor, processing-details, and signature appendices.
- All five PDFs are unencrypted and rendered consistently in two independent renderers.

## Publication controls

- The PDFs remain drafts or templates according to their individual legal-review status.
- No document is represented as attorney-approved.
- Signed or negotiated agreements must not be committed to this public repository.
- Any byte-level change requires a new checksum and repeat technical validation.