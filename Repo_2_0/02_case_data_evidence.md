# 2 — Case, data, and evidence

This file is the To-Be case model. It says which events, people, fields, and stored records the payment decision uses.

It closes D1 spine 2 gaps: no canonical supplier id, no label column, no payment-release actor, no goods-receipt rows, weak lineage. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 2; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-03, M-07, M-17; `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-08.

RCTE rows: RCTE-01, RCTE-02, RCTE-03, RCTE-09, RCTE-13.

## Case events

A case starts when a supplier invoice arrives. Vendor-master changes join the same case when the supplier matches.

| Event | What arrives | Packet example |
|---|---|---|
| Invoice ingested | Invoice id, supplier id, PO, amount, currency, approver, bank-change flag | INV-1003 from `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv` |
| Vendor master changed | Change id, field, old value, new value, requester, approver, time | CH-88 at `2026-08-11T13:44:00` |
| Document extracted | Structured fields plus per-field confidence | Extract rows for INV-1001 to INV-1004 are Missing in Repo 1.0. To-Be stores them. |
| Identity verified | Canonical supplier id, requester vs approver, bank-change link | `V-201` and `V201` join. CH-88 links to INV-1003. |
| Detected | Duplicate, split, SoD, alias, non-PO, bank-change flags | INV-1002 matches INV-1001 on supplier + PO + amount 9800 |
| Scored | Uncalibrated rank, or unscored | Scorer-down stores unscored. Never `score = 0`. |
| Decided | APPROVE, REVIEW, or REJECT from written policy | INV-1003 To-Be: REVIEW |
| Reviewed | Named person, disposition, reason codes | Replaces the email inbox |
| Payment released | Named payer, idempotency key, time | INV-1001 `PAID` has no payer in Repo 1.0. To-Be stores the payer. |
| Notified | Recipient, template, idempotency key | After REVIEW or REJECT |

`invoices.csv` has no invoice timestamps. Process times for INV-1003, INV-1004, and INV-1002 sit in `05_workflow_orchestration/processing_log.txt`. INV-1001 has no log time. To-Be stores an ingest time on every invoice.

## Entities

| Entity | What it is | Identity in this packet |
|---|---|---|
| Supplier | The company to pay | Raw ids `V-201`, `V201`, `V-311`. Canonical id joins `V-201` and `V201`. |
| Purchase order | The official buy record | `PO-7001` on INV-1001 and INV-1002. Empty on INV-1003 and INV-1004. |
| Goods receipt | Record that goods arrived | Named in locked facts. No file in `02_data_evidence`. Status: Missing. Stay Missing until a feed exists. |
| Invoice | The claim for payment | INV-1001, INV-1002, INV-1003, INV-1004 |
| Bank account | Payee account on the supplier master | CH-88 old `XXXX1122`, new `XXXX9988` |
| Requester | Person who asks for a master-data change | CH-88 `U22`. CH-89 `U18`. |
| Approver | Person who approved the change or the invoice | CH-88 `U22`. Invoice approvers `U11` and `U22`. |
| Reviewer | Named person who owns REVIEW | Missing in Repo 1.0. D3 ADR names the person. |
| Payer | Named person who releases payment | Missing in Repo 1.0. D3 ADR names the role. |

## Identity attributes

| Attribute | Purpose | Packet fact |
|---|---|---|
| `supplier_id_raw` | Id as received | `V-201` on the four invoice rows. `V201` sits only on the alias file. |
| `supplier_id_canonical` | Id used for matching | Join `V-201` and `V201`. Master Data and AP choose the surviving id in D3. This file does not merge the live ERP row. |
| `supplier_name_raw` | Name as received | Alpha Industrial Supply vs Alpha Industries Supply |
| `requester_id` | Who asked for the change | U22 on CH-88 |
| `approver_id` | Who approved the change or invoice | U22 on CH-88. Same value as requester. |
| `payer_id` | Who released payment | Missing today. Required on every `PAID`. |
| `reviewer_id` | Who finished REVIEW | Missing today. Required on every REVIEW close. |
| `bank_account_old` / `bank_account_new` | Masked account values | XXXX1122 → XXXX9988 |
| `verification_method` | How the bank change was checked | Callback vs none. Country list Missing. Path: `04_document_identity_compliance/vendor_verification.md`. |

User ids `U11`, `U18`, `U19`, `U22` stay as in the files. This design does not invent people.

## Risk variables

These flags exist at decision time. They are stored on the case.

| Variable | How it is set | Worked value |
|---|---|---|
| `duplicate_match_supplier_po_amount` | Canonical supplier, PO, and amount match a prior invoice. Invoice ids differ. | INV-1002 vs INV-1001: true. Amount 9800. |
| `duplicate_invoice_number` | Exact invoice id match. As-Is method only. | Kept as a secondary flag. INV-1002 is false on this flag and still a duplicate on the first flag. |
| `alias_collision` | Raw supplier id maps to a canonical id that has another raw id. | `V-201` / `V201`: true. |
| `bank_changed_30d` | Inherited flag from `invoices.csv`. | INV-1003 and INV-1004: Y. INV-1001 and INV-1002: N. |
| `linked_change_ids` | Change rows on the same canonical supplier before this invoice. | INV-1003: CH-88. INV-1001: CH-89 is email, not bank. |
| `same_user_requester_approver` | `requester_id` equals `approver_id` on a change. | CH-88: true. CH-89: false. |
| `non_po_flag` | PO empty. | INV-1003 and INV-1004: true. |
| `sibling_invoice_ids` | Other invoices on the same canonical supplier. Until a D3 Architecture Decision Record (ADR) names a time bound, this field stores the named packet pair only: INV-1003 with INV-1004. A numeric sibling window is `THRESHOLD_UNSET`. | INV-1003 sibling INV-1004. |
| `sibling_amount_sum` | Sum of this invoice plus siblings. | 4950 + 4950 = 9900. Honesty: PRECOMPUTED from the packet. |
| `sod_vendor_and_pay_overlap` | Same user holds vendor-master and payment roles. | Named in `access_review.md`. Per-user matrix Missing. Store the flag when the access file supplies it. |
| `extract_status` | `complete` or `uncertain` | Uncertain goes to REVIEW. |
| `scorer_status` | `scored` or `unscored` | Down scorer stores `unscored`. |
| `anomaly_rank` | Uncalibrated model rank | Not a percent chance. Blank when unscored. |

The As-Is 30-day bank window is an inherited field name (`bank_changed_30d`). A new window length is `THRESHOLD_UNSET`. Until a D3 ADR names an owner, the design uses the inherited flag as evidence and also links named change ids such as CH-88.

A numeric sibling-time window is `THRESHOLD_UNSET`. An ADR in D3 must name an owner before anyone codes that window. Until then, sibling evidence is the named pair INV-1003 and INV-1004 (4950 + 4950 = 9900, process times 11:15 and 11:16 on 2026-08-12). The join stays that pair.

## Labels

`invoices.csv` has no confirmed-fraud or later-outcome column. Status: Missing. Path: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 2.

This packet has four invoices. It is not a labelled training set.

| Label | Who writes it | When |
|---|---|---|
| `reviewer_disposition` | Named reviewer | At REVIEW close: agree, disagree, or override |
| `reviewer_reason_codes` | Named reviewer | Same time. Codes sit in `07_explainability_review.md`. |
| `later_confirmed_outcome` | Named data owner | After payment or after investigation. Owner is Missing. D3 ADR names the data owner. |
| `false_alarm` / `confirmed_loss` | Named data owner | After delayed fact. Do not train from this packet alone. |

Training on representative labelled data is a later job. See `03_detection_models.md`.

## Document fields

OCR means software that reads text from a document image. Repo 1.0 lists these extract fields. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/invoice_extraction.md`.

| Field | Required for decision | Packet status |
|---|---|---|
| Invoice number | Yes | Known formatting differs by supplier. Store raw and normalized. |
| Supplier name | Yes | Alias miss named in the extract note. |
| Amount | Yes | 9800 or 4950 on these rows. |
| Currency | Yes | USD on all four rows. |
| Tax ID | Yes if present on the form | Extract values Missing for these invoices. |
| PO | Yes as presence | Empty on INV-1003 and INV-1004. |
| Bank details | Yes when present | Not cryptographically verified. Status: Missing proof. |
| Per-field confidence | Yes | Missing today. To-Be stores one number per field. Honesty: REAL when the extractor runs. |
| Extract channel | Yes | Batch or API. Repo 1.0 uses two confidence lines. Path: `invoice_extraction.md`. |

Vendor-change requests arrive as emailed PDFs. Path: `vendor_verification.md`. The PDFs for CH-88 and CH-89 are Missing from the packet. To-Be stores the document hash and a pointer. The file bytes sit in a normal store. The hash sits in the WORM reference store. See `08_compliance_audit.md`.

## Data-quality rules

A rule here is a check on the data. It is not a payment cutoff.

| Rule | Fail action |
|---|---|
| Invoice id present and unique | Stop ingest. REVIEW if a duplicate id arrives. |
| Supplier raw id present | REVIEW. |
| Canonical supplier id resolved | If unresolved, set `alias_collision` unknown and REVIEW. |
| Amount present and numeric | REVIEW. |
| Currency present | REVIEW. |
| PO may be empty | Set `non_po_flag`. Do not auto-pay. |
| `bank_changed_30d` present | If missing, treat as unknown and REVIEW. |
| Approver present | If missing, REVIEW. |
| Requester and approver both present on a bank change | If one is missing, REVIEW. If they match, set `same_user_requester_approver`. |
| Extract confidence present per required field | If missing, `extract_status=uncertain`, REVIEW. |
| Batch confidence line and API confidence line recorded | If the two channels disagree on the same document, REVIEW. The numeric accept line is `THRESHOLD_UNSET`. |
| Goods receipt | If a PO exists and no goods-receipt feed exists, store Missing. Do not invent a receipt. D3 ADR says whether a PO invoice may APPROVE without it. Until then, PO invoices with no receipt go to REVIEW. |

## Lineage

Every stored field names where it came from.

| Fact | Lineage to store |
|---|---|
| Invoice row | Source system, file or API, ingest time, ingest job id |
| Extracted field | Document id, extractor version, channel (batch or API), confidence |
| Alias join | Raw ids, alias-file version, who approved the join |
| Bank change | Change id, PDF hash, requester, approver, time |
| Model rank | Model version, feature list, scorer_status |
| Policy outcome | Rule version, recommended outcome, final outcome |
| Review | Reviewer id, start time, end time, disposition |
| Payment | Payer id, idempotency key, audit row id written first |

## Evidence retained for every decision

P2P-05 is Missing today. Owner TBD. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`. This list is what the To-Be audit row must hold before payment state changes.

| Evidence | INV-1002 example | INV-1003 example |
|---|---|---|
| Case id / invoice id | INV-1002 | INV-1003 |
| Actor | Missing today. Store reviewer and payer. | Approver U22. Store reviewer separately. |
| From-state | Ingested | Ingested |
| To-state | REVIEW (To-Be). Repo 1.0 stored PROCESS and PAID. | REVIEW (To-Be). Repo 1.0 stored PROCESS and APPROVED. |
| Score | Uncalibrated rank or unscored | Uncalibrated rank or unscored |
| Reasons | Duplicate match INV-1001, method supplier+PO+amount 9800 | Linked CH-88, same user U22, empty PO, sibling INV-1004, pair 9900 |
| Model version | Named version or unscored | Named version or unscored |
| Rule version | Named rule pack | Named rule pack |
| Prompt ids if a language model is used | Store id and hash | Store id and hash |
| Linked change ids | CH-89 (email, same supplier) | CH-88 |
| Duplicate method | supplier+PO+amount, plus alias | n/a |
| Sibling ids and sum | n/a | INV-1004, 9900 |
| Extract fields and confidence | Required | Required |
| Reviewer text | Required before pay | Required before pay |

Honesty on packet amounts and times: PRECOMPUTED.

## What stays open

- Goods-receipt feed: Missing (M-17).
- Confirmed-fraud labels and the data owner: Missing. D3 ADR.
- Country list for callback verification: Missing.
- Meaning of approval-matrix `amount_limit` inclusive vs exclusive (M-22): `THRESHOLD_UNSET`. D3 ADR.
- Sibling-time window: `THRESHOLD_UNSET`. Until the ADR, use the named pair INV-1003 and INV-1004.
- Who pressed pay on INV-1001 and INV-1002: Missing in the inherited files. Those two payments already happened.
