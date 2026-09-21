# 4 — Documents, identity, and compliance signals

This file is the To-Be extract and identity design. It turns PDFs, forms, and images into structured fields. It checks that the supplier and the bank account are consistent. Uncertain evidence goes to REVIEW.

It closes D1 spine 4 gaps: no extract rows, two confidence lines, no person route when extract is uncertain, aliases that hide duplicates, inconsistent bank-change checks. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 4; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-16, M-21; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-02, RCTE-13.

## Convert documents into fields

OCR means software that reads text from a document image. Repo 1.0 already names the extract list. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/invoice_extraction.md`.

| Field | What the extractor must write | Known As-Is issue |
|---|---|---|
| Invoice number | Raw string and a normalized string | Formatting differs by supplier. |
| Supplier name | Raw string | Aliases cause duplicate misses. |
| Supplier id | Raw id if printed, else Missing | Invoice rows use `V-201`. Alias file also has `V201`. |
| Amount | Number | Must match the invoice row used for decision. |
| Currency | Code | USD on the four packet rows. |
| Tax ID | Raw string or Missing | No extract rows in the packet. |
| PO | Raw string or empty | Empty on INV-1003 and INV-1004. |
| Bank details | Masked account and bank name if present | Not cryptographically verified. Status: Missing proof. |
| Per-field confidence | One number per field | Missing today. |
| Extract channel | `batch` or `api` | Confidence line differs between batch and API. |
| Extractor version | Named version | Missing today. |

Vendor-master change requests arrive as emailed PDFs. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/vendor_verification.md`.

| Change-PDF field | What to store | Packet example |
|---|---|---|
| Change id | From the master-data row | CH-88, CH-89 |
| Supplier | Raw and canonical | V-311 on CH-88. V-201 on CH-89. |
| Field changed | `bank_account` or `email` | CH-88 bank. CH-89 email. |
| Old value / new value | Masked | XXXX1122 → XXXX9988 |
| Requester / approver | User ids | CH-88 both U22 |
| Document hash | Hash of the PDF | PDFs Missing from the packet. Store hash when the file exists. |
| Out-of-band check | Callback done, callback skipped, or Missing | Inconsistent today. |

Extract values for INV-1001 to INV-1004 are Missing. To-Be stores one extract record per invoice before Verify.

## Identity consistency

| Check | Pass | Fail or uncertain |
|---|---|---|
| Supplier alias | Raw id maps to one canonical id | Unresolved map. REVIEW. |
| Supplier name vs alias file | Name sits on the same canonical id | Name mismatch. REVIEW. Worked pair: Alpha Industrial Supply vs Alpha Industries Supply. |
| Invoice amount vs extract amount | Both numbers match | Mismatch. REVIEW. |
| Invoice number raw vs normalized | Normalize then compare | Format-only difference is recorded. True clash REVIEW. |
| Requester vs approver on a bank change | Different user ids | Same id. Set `same_user_requester_approver`. REVIEW. CH-88 is the fail case. CH-89 is the pass contrast (U18 / U19). |
| Bank details on the invoice vs latest master change | Same masked account | Clash or Missing proof. REVIEW. |
| Linked change | CH-style id stored on the invoice case | Missing link when a change exists. REVIEW. |

Canonical join for this packet: `V-201` and `V201` are the same supplier for matching. AP (P2P-01) and Master Data (P2P-02) must confirm that join in D3. This file does not rewrite the live ERP supplier row. Path: `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-08.

## Confidence

Repo 1.0 uses two confidence lines: one for batch, one for API. Path: `invoice_extraction.md`. A single numeric accept line is `THRESHOLD_UNSET`. An ADR in D3 must name an owner before anyone codes that line.

Until that ADR exists, treat extract evidence as uncertain when any of these is true:

1. A required field is missing.
2. Per-field confidence is missing.
3. Batch extract and API extract on the same document disagree.
4. Bank details have no verification artifact.
5. Alias is unresolved.
6. The emailed bank-change PDF is Missing.

Uncertain evidence goes to REVIEW. The case stays held. A named person sees the raw image or PDF and the extracted fields.

Do not invent one confidence number and then auto-pay.

## Sanctions / PEP / address

**Unknown.** Repo 1.0 does not supply a sanctions list, a PEP list, or an address-verification feed. PEP means Politically Exposed Person.

Do not invent a sanctions list.

If CR-REG-01 in `01_decision_risk_boundary.md` later requires these checks, add a feed only after that change request names the source. Until then, any requested sanctions, PEP, or address result that is missing or unclear goes to REVIEW.

## Out-of-band bank-change verification

Repo 1.0 says some countries use callback verification and others do not. It does not name the countries. Path: `vendor_verification.md`.

Country list: **Unknown**. Do not invent the list.

To-Be stores `verification_method` as `callback`, `none`, or `Missing`. A bank-account change with `none` or `Missing` goes to REVIEW. Master Data still owns P2P-02. Status today: Partial.

Cryptographic verification of bank details: Missing. Path: `invoice_extraction.md`. Stay Missing. REVIEW when bank details matter and no proof exists.

## Worked cases

### INV-1002 alias risk

Invoice rows use `V-201` only. The alias file also stores `V201`. A check that keys only on `V-201` can miss a later `V201` invoice for the same 9800 USD on PO-7001. To-Be matches on the canonical id.

### CH-88 identity fail

The bank-change PDF is Missing. Requester U22 and approver U22 match. Result in Repo 1.0 is SUCCESS. Path: `08_compliance_audit/audit_extract.log`. To-Be: identity check fails SoD. Outcome REVIEW. The change does not apply itself.

### INV-1003 after CH-88

Invoice extract must carry `bank_changed_30d=Y` and linked change CH-88. If the extract omits the link, Verify still joins on canonical supplier V-311 and the change timestamp `2026-08-11T13:44:00` before the invoice process time `2026-08-12 11:15`.

## What stays open

- Sanctions / PEP / address feeds: Unknown.
- Callback country list: Unknown.
- Cryptographic bank proof: Missing.
- Numeric extract-accept line: `THRESHOLD_UNSET`.
- Emailed PDFs for CH-88 and CH-89: Missing from the packet.
