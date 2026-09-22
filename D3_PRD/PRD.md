# Product Requirements Document — Procure-to-Pay Exception and Payment-Control

Version: D3a. Source of design: `Repo_2_0/`. Packet cases: `D1_AsIs_Assessment/02_CASE_REPLAY.md`.

This file is Deliverable 3. D4 may implement only this PRD.

Repo 1.0 and Repo 2.0 were not edited for this deliverable.

## How to read this PRD

Written policy picks one outcome: `APPROVE`, `REVIEW`, or `REJECT`. A named person owns every `REVIEW`. The model ranks the case. The model does not release payment.

`PROCESS` is a Repo 1.0 result word. This product does not emit `PROCESS`.

`THRESHOLD_UNSET` means a number is not chosen yet. D3b must write an Architecture Decision Record (ADR) that names an owner before anyone codes that number. An ADR is a short decision note. It records the number, the owner, and why. Until that ADR exists, D4 uses rule conditions that need no new number. Example: same-user bank change goes to `REVIEW`. Example: INV-1003 and INV-1004 as a named sibling pair go to `REVIEW`.

Honesty labels used in this file:

| Label | Meaning |
|---|---|
| REAL | A number the running application measured. |
| PRECOMPUTED | A number copied from Repo 1.0 or D1. This PRD did not recompute it. |
| SIMULATED | A stand-in for a service this packet does not call. |
| EDUCATIONAL | A classroom walk-through on the four packet invoices. Not an official test-set result. |

Packet amounts and times in this PRD are PRECOMPUTED from `D1_AsIs_Assessment/02_CASE_REPLAY.md`.

## Spine coverage

Every Repo 2.0 spine file has a PRD section.

| Repo 2.0 file | Spine | PRD section |
|---|---|---|
| `01_decision_risk_boundary.md` | 1 Decision, risk, boundary | 1 Business problem; 2 Users; 8 Risk and compliance |
| `02_case_data_evidence.md` | 2 Case, data, evidence | 6 Data |
| `03_detection_models.md` | 3 Detection models | 4 AI capabilities |
| `04_document_identity_compliance.md` | 4 Documents and identity | 3 Functional requirements (Extract, Verify); 7 Integrations |
| `05_workflow.md` | 5 Workflow | 5 Workflows |
| `06_governed_decisioning.md` | 6 Governed decisioning | 3 Functional requirements (Detect, Decide) |
| `07_explainability_review.md` | 7 Explainability and review | 3 Functional requirements (Review, Notify); 5 Workflows |
| `08_compliance_audit.md` | 8 Compliance and audit | 8 Risk and compliance |
| `09_ai_risk_security_observability.md` | 9 Risk, security, observability | 8 Risk and compliance; 9 Non-functional; 11 Success metrics |
| `10_production_readiness.md` | 10 Production readiness | 9 Non-functional; 10 Acceptance criteria |
| `README.md` | Pack cover | This header; honesty; outcomes |
| `TRACEABILITY.md` | D1 id map | `D3_PRD/TRACEABILITY.md` |
| `REVIEW_NOTES.md` | S2a defects | Section 3.1 resolutions |
| `C8_CHECK.md` | C.8 results | Section 9; no invented cutoff |

---

## 1. Business problem

Finance must decide whether a supplier invoice can go on to payment.

The event is one supplier invoice. The objects in the decision are the supplier, the purchase order (PO), the goods receipt, the invoice, the supplier bank account, the requester, and the approver.

Payment is the action that cannot be undone. INV-1001 and INV-1002 already have status `PAID` in the inherited files. Source: `D1_AsIs_Assessment/02_CASE_REPLAY.md`. This product cannot pull those two payments back. It changes the route for the next invoice that looks like them.

### What goes wrong today

These rows use locked D1 numbers. Honesty: PRECOMPUTED.

| Harm | What the files already show | Source |
|---|---|---|
| Company money goes out twice | INV-1001 and INV-1002 share supplier `V-201`, PO `PO-7001`, and amount 9800 USD. Both are `PAID`. The live check used `invoice_number_only` and stored `NO_DUPLICATE` on INV-1002 at 12:01 on 2026-08-12. | `02_CASE_REPLAY.md` INV-1001 and INV-1002 |
| Alias ids hide a duplicate | `V-201` is Alpha Industrial Supply. `V201` is Alpha Industries Supply. Invoice rows use `V-201` only. A check that keys only on `V-201` can miss `V201`. | `02_CASE_REPLAY.md` V-201 vs V201 |
| Bank account diverted, then invoices paid on the new account | CH-88 on 2026-08-11T13:44:00 changed V-311 bank account XXXX1122 to XXXX9988. Requester U22. Approver U22. Result SUCCESS. | `02_CASE_REPLAY.md` CH-88 |
| Two non-PO invoices skip review | INV-1003 at 11:15 and INV-1004 at 11:16 on 2026-08-12. Empty PO. 4950 USD each. Pair total 9900. `bank_changed_30d=Y`. Rule `NON_PO_UNDER_5000`. Result `PROCESS`. | `02_CASE_REPLAY.md` INV-1003 and INV-1004 |
| Audit does not link the bank change to the invoice | INV-1003 audit line is `PROCESS`. It does not link CH-88. | `02_CASE_REPLAY.md` INV-1003 |
| A person cannot finish review in a stored queue | Repo 1.0 review sits in an email inbox. | `Repo_2_0/07_explainability_review.md` |

Finance also wants to keep the payment SLA. An SLA is the promised time to handle the invoice. A legitimate supplier waits past that time if a good invoice sits in `REVIEW`.

The first delivery slice does two things. It stops using an AI rank as payment authorization. It sends bank-change-plus-split cases to a person. Repo 2.0 calls that slice Wave 1. This product sends those packet cases to `REVIEW`.

### Inherited amount lines

These numbers are As-Is behaviour. They are not the To-Be cutoff. Honesty: PRECOMPUTED.

| Inherited number | Where it appears today |
|---|---|
| 5000 | Non-PO expedite. INV-1003 and INV-1004 at 4950 used that path and stored `PROCESS`. |
| 10000 | Bank-change REVIEW line. Pair total 9900 sits under that line, so that REVIEW rule did not fire. |
| 9800 | INV-1001 and INV-1002 amount. |
| 4950 + 4950 = 9900 | INV-1003 and INV-1004. |

If a new amount line is required, this PRD writes `THRESHOLD_UNSET`. See P2P-FR-006.

Anomalous pricing is a named risk. Repo 1.0 lists `amount` as a model feature. The packet has no price catalog. Detection stays a ranking plus `REVIEW`. Do not invent a catalog.

---

## 2. Users

These roles already appear in Repo 1.0. This PRD does not invent a person. User ids `U11`, `U18`, `U19`, and `U22` stay as in the files.

| Who | What this product does for them | Source role |
|---|---|---|
| Accounts Payable (AP) | Processes the invoice. Owns control P2P-01 (duplicate invoice check). Receives `ESC_DUP` and `ESC_EXTRACT`. | `control_matrix.csv` P2P-01 |
| Master Data | Applies supplier bank or email changes. Owns P2P-02. Receives `ESC_BANK_SPLIT` and `ESC_ALIAS`. | P2P-02 |
| Finance Controls | Owns segregation of duties (P2P-03). Receives `ESC_SOD`. Approves access-role changes. | P2P-03 |
| Procurement | Owns non-PO exception review (P2P-04). Receives `ESC_BANK_SPLIT`. | P2P-04 |
| Internal Audit | Later detector of some segregation issues. Rebuilds a case from the audit row. | Repo 1.0 business problem note |
| Operations | Receives `ESC_UNSCORED` until D3b names a model owner. | `Repo_2_0/08_compliance_audit.md` |
| The company | Stops a second 9800 USD pay and a diverted-account pay when policy holds the case. | Locked D1 facts |
| A legitimate supplier | Receives notify of `APPROVE`, `REVIEW`, or `REJECT`, plus a contest path. Bank numbers stay masked. | `Repo_2_0/07_explainability_review.md` |

### Named people D3b must assign

Repo 1.0 does not store these names. Until the ADR exists, the queue uses the nearest control owner already in `control_matrix.csv`.

| Role | Until the ADR | ADR required |
|---|---|---|
| REVIEW owner | Nearest control owner. AP for duplicate. Procurement for non-PO. Finance Controls for segregation. Master Data for bank-change. | D3b names one human account. P2P-FR-008. |
| Payer | Missing in Repo 1.0. AI does not pay. | D3b names the role. |
| Model owner | AP remains the nearest named owner because AP owns P2P-01. AP is not invented as the model owner. | D3b names the person. |
| Data owner for labels | Missing. | D3b names the person. |
| P2P-05 owner | Status TBD in `control_matrix.csv`. | D3b names the owner. |

When several flags fire on one case, the case sits in one persisted queue. All reason codes stay visible. Escalation events still notify each control owner. Until D3b names one REVIEW owner, Finance Controls closes the case when a segregation flag is present. Otherwise the first matching control owner in the Decide precedence (section 3.8) closes it. Worked case: INV-1003 fires non-PO, bank-change, and same-user SoD together. Finance Controls is the closer until the ADR.

P2P-05 owner stays `TBD` until that ADR.

---

## 3. Functional requirements

Each requirement has an id `P2P-FR-001` onward.

### 3.1 Resolutions of Repo 2.0 file disagreements

`Repo_2_0/REVIEW_NOTES.md` lists design clashes. This PRD picks one path so D4 can code. Repo 2.0 itself is not edited.

| Clash | What D4 implements |
|---|---|
| Rank-only vs APPROVE | Rank does not pick `APPROVE` or `REJECT`. Until a rank operating line exists (`THRESHOLD_UNSET`, P2P-FR-006), a scored case with no exception flags can reach `APPROVE`. Unscored still goes to `REVIEW`. |
| Missing goods receipt vs APPROVE | Store `goods_receipt_status=Missing`. Leave the receipt blank when no feed exists. Until a D3b ADR says a PO invoice needs a receipt to APPROVE, missing receipt does not by itself pick `REVIEW`. Duplicate, alias match, SoD, bank-split, non-PO, uncertain extract, and unscored still pick `REVIEW`. A valid PO invoice with none of those flags can reach `APPROVE` (P2P-AC-006). |
| Decide vs auto-REJECT | Decide may store recommended `REJECT`. Until a D3b ADR names auto-REJECT conditions, the final money outcome for exception flags is `REVIEW`. A named person writes the final `REJECT` or `APPROVE`. |
| Notify order | `APPROVE`: write audit row, notify, then a named person pays. `REVIEW`: persist the queue, person acts, then notify. `REJECT`: notify, no pay. Notify runs for all three outcomes. |
| Duplicate key omits currency | Match on canonical supplier + PO + amount + currency. Invoice ids differ. Packet currency is USD on all four invoices. |
| Alias join vs name mismatch | `V-201` / `V201` with names Alpha Industrial Supply / Alpha Industries Supply is the known alias pair. That pair does not by itself go to `REVIEW` for name mismatch. A third name on the same canonical id goes to `REVIEW`. |
| Price catalog | Detect does not emit a price-catalog flag. Catalog status is Unknown. Do not invent a catalog. |
| Payment key example | Idempotency proof uses a case that reached `APPROVE`. INV-1002 To-Be is `REVIEW` and does not pay. |

### 3.2 Outcomes and prohibited automation

**P2P-FR-001.** The product emits `APPROVE`, `REVIEW`, or `REJECT` only. It does not emit `PROCESS`. `PAID` and `APPROVED` on `invoices.csv` are invoice status words. After policy says `APPROVE`, a named person may set status `PAID`. After policy says `REVIEW`, status stays held. After policy says `REJECT`, status stays unpaid.

Worked case: INV-1003 stored `PROCESS` on the log and `APPROVED` on the invoice file. Source: `02_CASE_REPLAY.md`. The same facts (empty PO, 4950, `bank_changed_30d=Y`, CH-88 same user U22, sibling INV-1004) produce `REVIEW`.

**P2P-FR-002.** Written policy picks the outcome. The model emits an uncalibrated ranking. Caption the rank as a rank. Do not caption it as a percent chance of fraud.

**P2P-FR-003.** A named human account owns every `REVIEW`. The case waits in a persisted queue. See section 2 for the interim closer.

**P2P-FR-004.** A named person releases payment. AI may analyse and recommend. AI does not pay.

**P2P-FR-005.** These actions cannot run without a named person:

1. Release payment.
2. Treat a model rank as `APPROVE` or `REJECT`.
3. Apply a supplier bank-account change when requester and approver are the same user. Worked case: CH-88 U22 / U22.
4. Auto-pay a non-PO invoice because the amount sits under the As-Is 5000 line. INV-1003 and INV-1004 used that path.
5. Skip the audit row and then change payment state.
6. Write `score = 0` after a crash. Failure goes to `REVIEW`. The case is stored as unscored.
7. Retry payment or notify without an idempotency key. The key is case id plus step name.
8. Change a policy amount while the amount is `THRESHOLD_UNSET`.

**P2P-FR-006.** Every new numeric limit stays `THRESHOLD_UNSET` until D3b writes an ADR that names an owner. D4 must not code that number before the ADR. The unset list is in section 9.2. Until those ADRs exist, D4 demos `REVIEW` with rule conditions that need no new number: same-user bank change; named sibling pair INV-1003 and INV-1004; empty PO; duplicate match; scorer down.

**P2P-FR-007.** Applicable statutes are Unknown. Change request CR-REG-01 asks Legal and Finance Controls which statutes, accounting rules, and internal policies apply. Include whether a sanctions, PEP, or address check is required. PEP means Politically Exposed Person. Until CR-REG-01 returns an answer, do not invent a statute list. Uncertain identity or compliance evidence still goes to `REVIEW`.

**P2P-FR-008.** D3b names the REVIEW owner, the payer role, the model owner, the data owner, and the P2P-05 owner. Until those names exist, use the nearest control owner in section 2. Do not invent a person.

### 3.3 Ingest and data quality

**P2P-FR-009.** When a supplier invoice arrives, store it, assign a case id, persist state `INGESTED`, and store an ingest time. `invoices.csv` has no invoice timestamps. To-Be stores an ingest time on every invoice. Process times for INV-1003 (11:15), INV-1004 (11:16), and INV-1002 (12:01) on 2026-08-12 sit in the inherited log and may be copied as ingest times for those packet rows.

**P2P-FR-010.** When a vendor-master change arrives, store change id, field, old value, new value, requester, approver, and time. Join that change to later invoices on the same canonical supplier. Worked case: CH-88 at 2026-08-11T13:44:00 joins INV-1003 the next day.

**P2P-FR-011.** Data-quality checks are checks on the data. They are not payment cutoffs. Fail action is `REVIEW` except where ingest must stop.

| Rule | Fail action |
|---|---|
| Invoice id present and unique | Stop ingest. `REVIEW` if a duplicate id arrives. |
| Supplier raw id present | `REVIEW`. |
| Canonical supplier id resolved | If unresolved, set `alias_collision` unknown and `REVIEW`. |
| Amount present and numeric | `REVIEW`. |
| Currency present | `REVIEW`. |
| PO may be empty | Set `non_po_flag`. Do not auto-pay. |
| `bank_changed_30d` present | If missing, treat as unknown and `REVIEW`. |
| Approver present | If missing, `REVIEW`. |
| Requester and approver both present on a bank change | If one is missing, `REVIEW`. If they match, set `same_user_requester_approver`. |
| Extract confidence present per required field | If missing, `extract_status=uncertain`, `REVIEW`. |
| Batch confidence line and API confidence line recorded | If the two channels disagree on the same document, `REVIEW`. The numeric accept line is `THRESHOLD_UNSET`. |
| Goods receipt | If a PO exists and no goods-receipt feed exists, store Missing. Do not invent a receipt. See section 3.1. |

**P2P-FR-012.** Every stored field names where it came from: source system, file or API, ingest time, ingest job id; extractor version and channel; alias-file version; model version; rule version; reviewer id; payer id and audit row id.

**P2P-FR-013.** `invoices.csv` has no confirmed-fraud column. This packet has four invoices. It is not a labelled training set. Store `reviewer_disposition` and `reviewer_reason_codes` at REVIEW close. A named data owner later writes `later_confirmed_outcome`. Training on representative labelled data is a later job.

### 3.4 Extract and identity

**P2P-FR-014.** Store one extract record per invoice before Verify. OCR means software that reads text from a document image. Required fields: invoice number (raw and normalized), supplier name, supplier id if printed, amount, currency, tax ID if present, PO (may be empty), bank details if present, per-field confidence, extract channel (`batch` or `api`), extractor version.

Extract values for INV-1001 to INV-1004 are Missing in Repo 1.0. To-Be still stores an extract record before Verify. If the PDF is Missing, `extract_status=uncertain` and the case goes to `REVIEW`.

**P2P-FR-015.** Store one confidence number per field. Store the channel. Repo 1.0 uses two confidence lines: one for batch, one for API. A single numeric accept line is `THRESHOLD_UNSET` (P2P-FR-006).

**P2P-FR-016.** Treat extract evidence as uncertain when any of these is true: a required field is missing; per-field confidence is missing; batch extract and API extract on the same document disagree; bank details have no verification artifact; alias is unresolved; the emailed bank-change PDF is Missing. Uncertain evidence goes to `REVIEW`. Do not invent one confidence number and then auto-pay.

**P2P-FR-017.** Normalize supplier ids before match. For this packet, `V-201` and `V201` are the same supplier for matching. AP (P2P-01) and Master Data (P2P-02) must confirm that join in D3b. This product does not rewrite the live ERP supplier row. Store `supplier_id_raw` and `supplier_id_canonical`.

**P2P-FR-018.** The alias file stores Alpha Industrial Supply for `V-201` and Alpha Industries Supply for `V201`. Treat those two name strings as the known alias pair. Send `REVIEW` for name mismatch only when a third name appears on the same canonical id.

**P2P-FR-019.** On a bank-account change, compare `requester_id` to `approver_id`. If they match, set `same_user_requester_approver` and send `REVIEW`. The change does not apply itself. Worked fail: CH-88, both U22. Worked pass contrast: CH-89, U18 / U19, field email.

**P2P-FR-020.** Store `verification_method` as `callback`, `none`, or `Missing`. A bank-account change with `none` or `Missing` goes to `REVIEW`. Country list for callback is Unknown. Do not invent the list. Cryptographic bank proof stays Missing. `REVIEW` when bank details matter and no proof exists.

**P2P-FR-021.** Sanctions, PEP, and address feeds are Unknown. Do not invent those lists. If CR-REG-01 later requires them, add a feed only after that change request names the source. Until then, any requested sanctions, PEP, or address result that is missing or unclear goes to `REVIEW`.

**P2P-FR-022.** Vendor-change requests arrive as emailed PDFs. Store the document hash and a pointer when the file exists. The PDFs for CH-88 and CH-89 are Missing from the packet. The file bytes sit in a normal store. The hash sits in the WORM reference store. WORM means write once, read many.

### 3.5 Detect

**P2P-FR-023.** Duplicate match uses canonical supplier + PO + amount + currency. Invoice ids differ. Worked case: INV-1002 vs INV-1001, supplier `V-201`, PO `PO-7001`, amount 9800, currency USD. Set `duplicate_match_supplier_po_amount=true`. Hold the later invoice. Outcome `REVIEW` with recommended `REJECT` of the second payment. Source: `02_CASE_REPLAY.md`.

**P2P-FR-024.** Keep `duplicate_invoice_number` as a secondary flag. INV-1002 is false on that flag and still a duplicate on P2P-FR-023.

**P2P-FR-025.** Store `sibling_invoice_ids` and `sibling_amount_sum`. A numeric sibling-time window is `THRESHOLD_UNSET` (P2P-FR-006). Until the ADR, sibling evidence is the named pair INV-1003 and INV-1004 only. Amounts 4950 + 4950 = 9900. Process times 11:15 and 11:16 on 2026-08-12. The join stays that pair. Do not join every later V-311 invoice.

**P2P-FR-026.** Empty PO sets `non_po_flag`. INV-1003 and INV-1004 are true. The As-Is expedite `po == ""` and `amount < 5000` → `PROCESS` is retired. Empty PO goes to `REVIEW`.

**P2P-FR-027.** Link named change ids on the same canonical supplier before this invoice. INV-1003 and INV-1004 link CH-88. INV-1001 links CH-89 as email, not bank. Join keys: canonical supplier id; change timestamp before invoice ingest time; inherited `bank_changed_30d` when present. The As-Is 30-day bank window is an inherited field name. A new window length is `THRESHOLD_UNSET`.

**P2P-FR-028.** Detect does not emit a price-catalog flag. Price-catalog feed status is Unknown. Until a catalog exists, the model may rank amount with its other features. Policy still picks the outcome.

**P2P-FR-029.** When the access file supplies it, store `sod_vendor_and_pay_overlap`. Per-user matrix is Missing in Repo 1.0. Store the flag when the file supplies it. Do not invent users.

### 3.6 Score

**P2P-FR-030.** The model emits an uncalibrated ranking stored as `anomaly_rank`. Caption: uncalibrated ranking. Blank when unscored.

**P2P-FR-031.** If the scorer crashes or times out, store `scorer_status=unscored` and leave `anomaly_rank` empty. Do not write `score = 0`. Send the case to `REVIEW`. The workflow continues.

**P2P-FR-032.** This packet has four invoices. Four rows are not representative labelled data. Training on representative labelled data is a later job after D3b names the data owner and the model owner.

**P2P-FR-033.** The operating headline is precision, recall, false-positive rate, catch rate, staffing, residual miss, and later PR-AUC. PR-AUC is the area under the precision-recall curve. It pays attention to the rare class. `evaluation.csv` stores accuracy 0.91 on `p2p-risk-1` and 0.94 on `p2p-risk-2`. Honesty: PRECOMPUTED. Those cells remain as copied source facts. Do not lead operations with accuracy 0.94.

Copied cells, honesty PRECOMPUTED:

| Metric | p2p-risk-1 | p2p-risk-2 |
|---|---|---|
| Precision | 0.52 | blank |
| Recall | 0.71 | blank |
| False-positive rate | 0.18 | 0.24 |

False-positive rate is the share of good cases the detector flags. v1 flags 0.18 of good cases. v2 flags 0.24 of good cases. Precision is the share of flagged cases that were truly bad. Recall is the share of bad cases the detector flagged.

**P2P-FR-034.** A named model owner, with AP (P2P-01), chooses the live version after v2 precision and recall are filled and after independent validation exists. Independent validation means a person or team who did not train the model scores the same held-out set. Do not name a live winner version in D4 from this packet alone.

**P2P-FR-035.** If a drift chart moves, investigate first. Do not retrain from a drift number alone. Wait for delayed labels from the named data owner.

### 3.7 Decide — policy rules that need no new number

**P2P-FR-036.** Policy is a versioned rule pack enforced in the API. Policy does not live only in a prompt.

**P2P-FR-037.** Implement these rules. Each cites an RCTE row from `Repo_2_0/TRACEABILITY.md`.

| Id | Condition | Recommended outcome | Final outcome until auto-REJECT ADR |
|---|---|---|---|
| R-DUP | Canonical supplier, PO, amount, and currency match a prior invoice. Invoice ids differ. | REJECT the later payment | REVIEW |
| R-ALIAS | Raw supplier id has an alias sibling. Match uses the canonical id. | Same as R-DUP if a match appears | REVIEW if unresolved or matched |
| R-SOD-BANK | Bank-account change requester equals approver. | REJECT applying the change | REVIEW. Change does not auto-apply. |
| R-BANK-SPLIT | Linked bank change and (empty PO or the named sibling pair INV-1003 / INV-1004). | REJECT silent pay | REVIEW |
| R-NONPO | PO empty. | REVIEW | REVIEW |
| R-UNSCORED | Scorer failed or timed out. | REVIEW | REVIEW. Case unscored. |
| R-EXTRACT | `extract_status=uncertain` | REVIEW | REVIEW |

Worked overlap: INV-1003 matches R-NONPO, R-BANK-SPLIT, and R-SOD-BANK (linked CH-88). All three reason codes sit on the case. Outcome `REVIEW`. Source: `02_CASE_REPLAY.md`.

**P2P-FR-038.** Precedence. The first matching row wins the recommended outcome. If two rules fire, store both reason codes. The person sees both.

1. Prohibited automation (payment by the model, score written as 0, pay before audit). Stop. `REVIEW` or hold.
2. R-UNSCORED or R-EXTRACT. `REVIEW`.
3. R-SOD-BANK. `REVIEW`. Do not apply the bank change.
4. R-DUP or R-ALIAS match. `REVIEW`. Hold the later invoice.
5. R-BANK-SPLIT. `REVIEW`.
6. R-NONPO. `REVIEW`.
7. Else `APPROVE` only if extract is complete, `scorer_status=scored`, and no flag above is true.

**P2P-FR-039.** `APPROVE` is allowed only when every required check finished and no exception flag in P2P-FR-037 is true. A named person still pays. Rank is stored and shown. Rank does not pick `APPROVE`.

**P2P-FR-040.** Anomaly rank may order the `REVIEW` queue and add reason code `MODEL_RANK`. Rank may not pay, `APPROVE`, `REJECT`, or fill a missing score with 0. A rank operating line that would send a scored-only case to `REVIEW` is `THRESHOLD_UNSET`.

**P2P-FR-041.** Until a D3b ADR names auto-REJECT conditions, exception flags produce `REVIEW` and a recommended outcome. A named person can agree, disagree, or override.

### 3.8 Review, notify, contest

**P2P-FR-042.** The queue is a persisted application store. It is not an email inbox.

**P2P-FR-043.** Every decided case stores machine-readable reason codes.

| Code | When it is written | Packet example |
|---|---|---|
| `DUP_SUPPLIER_PO_AMOUNT` | Canonical supplier, PO, amount, currency match. Invoice ids differ. | INV-1002 vs INV-1001, 9800, V-201, PO-7001, USD |
| `ALIAS_CANONICAL_JOIN` | Raw id joined through the alias file | `V-201` / `V201` |
| `SOD_SAME_USER_BANK` | Requester equals approver on a bank change | CH-88, U22 / U22 |
| `BANK_CHANGE_LINKED` | Named change id sits on the invoice | CH-88 on INV-1003 |
| `NON_PO` | PO empty | INV-1003, INV-1004 |
| `SPLIT_SIBLING_SUM` | Sibling invoices stored with a pair sum | INV-1003 + INV-1004 = 9900 |
| `EXTRACT_UNCERTAIN` | Required field or confidence missing | No extract rows today |
| `SCORER_UNSCORED` | Model down or timed out | Locked path |
| `MODEL_RANK` | Rank present. Caption: uncalibrated ranking. | No stored rank today |
| `POLICY_REVIEW` | Written policy picked REVIEW | Duplicate, alias, SoD, bank-split, non-PO, unscored, uncertain extract |
| `POLICY_APPROVE` | Written policy picked APPROVE | Clean residual path |
| `POLICY_REJECT` | Written policy or person picked REJECT | After ADR or after the person acts |

Also store: rule version, model version or `unscored`, prompt id if a language model wrote text, workflow state, linked document hashes.

**P2P-FR-044.** The review screen shows one short paragraph built from the codes and the packet numbers. Do not write “under threshold.” Name the facts.

Template:

> Invoice {invoice_id} for supplier {canonical_id} amount {amount} {currency}. Policy outcome {APPROVE\|REVIEW\|REJECT}. Reasons: {codes}. Linked changes: {change_ids}. Sibling invoices: {ids} sum {sibling_amount_sum}. Duplicate of {prior_invoice_id} by supplier, PO, amount, and currency. Model: {version or unscored}, rank {rank or empty}. Rule pack {rule_version}. Extract: {complete\|uncertain}.

Worked INV-1003 paragraph:

> Invoice INV-1003 for supplier V-311 amount 4950 USD. Policy outcome REVIEW. Reasons: NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM. Linked changes: CH-88 (U22 requested and approved bank_account XXXX1122 to XXXX9988 at 2026-08-11T13:44:00). Sibling invoices: INV-1004 sum 9900. Model: unscored or named version, rank shown as an uncalibrated ranking. Rule pack: the To-Be pack. Extract: complete or uncertain.

**P2P-FR-045.** When `scorer_status=scored`, store a short attribution list from the named features on the model card: amount, supplier age, bank change, approval count, `non_po_flag`, `duplicate_score`. Caption: uncalibrated contribution to the rank. `supplier age` and `approval count` do not appear on `invoices.csv`. Show Missing for those features. Do not invent a contribution. When the scorer is down, store no attribution.

**P2P-FR-046.** Store a counterfactual sentence on rule flags. A counterfactual is “If this fact were different, the named rule would not fire.”

| Case | Counterfactual |
|---|---|
| INV-1002 | If INV-1001 did not already exist with V-201, PO-7001, 9800, and USD, `DUP_SUPPLIER_PO_AMOUNT` would not fire. |
| CH-88 | If `approved_by` were a user other than U22, `SOD_SAME_USER_BANK` would not fire. CH-89 is that contrast (U18 / U19). |
| INV-1004 | If INV-1003 did not exist, `SPLIT_SIBLING_SUM` would not include 9900. `NON_PO` and `BANK_CHANGE_LINKED` would still fire. |

**P2P-FR-047.** The named person sees invoice fields and extract image or PDF; canonical supplier and raw ids; linked change rows with requester and approver; sibling invoices and the pair sum; duplicate candidates; reason codes and the rationale paragraph; model version, rank caption, attribution or unscored; rule version; recommended outcome; clock showing time already spent.

**P2P-FR-048.** Actions have equal weight on the same screen: Agree, Disagree, Override. Disagree is as easy to press as Agree. There is no Accept-only button.

| Action | What it stores |
|---|---|
| Agree | Disposition `agree`. Recommended outcome becomes the person’s outcome. |
| Disagree | Disposition `disagree`. Person picks APPROVE or REJECT and writes a reason code. |
| Override | Disposition `override`. Person breaks a recommendation and records why. |

Required fields on close: reviewer id, start time, end time, disposition, reason codes, free-text note.

**P2P-FR-049.** Notify tells the supplier contact and the internal requester the outcome. Bank numbers stay masked. CH-89 stored an email change to `accounts@vendor.example`. Use the current supplier email from master data. Do not invent an address.

Notify uses idempotency key `{case_id}:notify`. A second call returns the first result. Notify count stays 1.

**P2P-FR-050.** A supplier or an AP analyst may contest `APPROVE`, `REVIEW` delay, or `REJECT`. Contest form stores contest id, invoice id, actor, and text. A new `REVIEW` opens on the same case. A different named person from the first reviewer when two people exist. If only one named person exists, record that limit. Original audit row stays. New audit row links to the first. Notify uses step name `notify_contest`. Time allowed to contest is `THRESHOLD_UNSET` (P2P-FR-006).

### 3.9 Payment and audit write order

**P2P-FR-051.** Payment is a separate irreversible step after `APPROVE`. It is not a ninth workflow name that replaces Notify. A named person presses pay.

**P2P-FR-052.** Payment uses idempotency key `{case_id}:payment`. A second call with the same key returns the first result. Payment count stays 1. Payment does not run while outcome is `REVIEW`. Worked retry: a worker crashes after `APPROVE` on a later case and starts again. The payment step sees the same key and does not pay twice.

**P2P-FR-053.** The application writes the audit row before payment state changes. Order:

1. Application writes the audit row with intended `to_state=PAID`, payer id, reason codes, model version, rule version, and linked change ids.
2. Application writes references (audit_row_id, document hashes, inputs_hash) into the WORM store. After lock, delete and overwrite are refused for the retention period. Retention days: `THRESHOLD_UNSET`.
3. Only then may invoice status change to `PAID`.
4. Payment step uses idempotency key `{case_id}:payment`.

If step 1 or step 2 fails, payment does not run. Event `ESC_P2P05` fires. A change-data feed is not the first recorder. The application is the first recorder.

**P2P-FR-054.** Required audit fields include: audit_row_id, case_id, actor, from_state, to_state, outcome, anomaly_rank, scorer_status, model_version, rule_version, prompt_ids, reason_codes, inputs_hash, linked_change_ids, sibling_invoice_ids, sibling_amount_sum, workflow_state, human_intervention, created_at.

Worked INV-1003 To-Be row stores outcome `REVIEW`, linked_change_ids `CH-88`, sibling_invoice_ids `INV-1004`, sibling_amount_sum `9900`, reason codes `NON_PO`, `BANK_CHANGE_LINKED`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`.

Missing As-Is lines that To-Be must also write: INV-1001, INV-1002, INV-1004, CH-89.

**P2P-FR-055.** Two stores. WORM holds references: audit_row_id, document hash, inputs_hash, rule version, model version, outcome, timestamps. Normal identity store holds names, emails, full bank numbers, user display names. Do not lock personal data in WORM. CH-89 emails `ap@vendor.example` and `accounts@vendor.example` stay in the normal store. The WORM row stores a hash of the email field, not the mailbox text.

**P2P-FR-056.** Store `payer_id` on every `PAID`. Store `reviewer_id` on every REVIEW close. INV-1001 and INV-1002 `PAID` rows in the inherited files have no payer. Those two payments already happened.

**P2P-FR-057.** Escalation events are rows, not emails.

| Event | Trigger | Notify |
|---|---|---|
| `ESC_DUP` | R-DUP | AP (P2P-01) |
| `ESC_ALIAS` | Unresolved alias or alias match | AP and Master Data |
| `ESC_SOD` | Same-user bank change | Finance Controls (P2P-03) |
| `ESC_BANK_SPLIT` | Linked bank change plus split or non-PO | Procurement (P2P-04) and Master Data (P2P-02) |
| `ESC_UNSCORED` | Scorer down | Model owner once D3b names that person. Operations until then. |
| `ESC_EXTRACT` | Uncertain extract | AP |
| `ESC_P2P05` | Attempt to change payment state with no audit row | P2P-05 owner (TBD). Block the state change. |
| `ESC_CONTEST` | Contest opened | REVIEW owner |

---

## 4. AI capabilities

AI may analyse and recommend on every capability. A named person decides. A named person executes payment.

| Capability | Analyse | Recommend | Decide | Execute |
|---|---|---|---|---|
| Duplicate payment detection | AI allowed | AI allowed | Named person | Named person pays |
| Supplier bank-account change | AI allowed | AI allowed | Named person other than the requester | Named person in Master Data |
| Split / non-PO invoice | AI allowed | AI allowed | Named person | Named person pays |
| Segregation of duties | AI allowed | AI allowed | Finance Controls (named owner in the matrix) | Named person. The requester does not also execute. |
| Payment release | AI allowed | AI allowed | Named person | Named person only |

### What exists today

Model card version `p2p-risk-2`. Features listed: amount, supplier age, bank change, approval count, `non_po_flag`, `duplicate_score`. No stored model score sits on INV-1001 to INV-1004.

Scorer-down behaviour in Repo 1.0 is Unknown. Locked later path: `REVIEW` and unscored.

This product does not claim a production model was trained on this packet.

### How D4 may show a rank

| Situation | Honesty | What to store |
|---|---|---|
| Live scorer returns a rank | REAL | `scorer_status=scored`, `anomaly_rank` as uncalibrated ranking |
| D4 uses a stand-in rank because no scorer runs | SIMULATED | Caption the stand-in. Still cannot pay from the rank. |
| Scorer down or timeout | REAL path even in a demo | `unscored`, empty rank, `REVIEW` |
| Packet catch-rate walk-through | EDUCATIONAL | Rule-and-evidence table below. Not a trained-model result. |

### Catch-rate walk-through on this packet (EDUCATIONAL)

| Case | Pattern a detector must catch | As-Is result | To-Be route |
|---|---|---|---|
| INV-1002 | Same supplier, PO, amount, currency as INV-1001. Invoice ids differ. | `NO_DUPLICATE`, `PAID` | REVIEW, recommended REJECT of the second payment |
| V-201 vs V201 | Alias hide | No invoice uses `V201` | Alias test must inject `V201` |
| CH-88 | Same-user bank change | SUCCESS | REVIEW. Do not apply the change automatically. |
| INV-1003 | Non-PO, 4950, bank change Y, day after CH-88 | PROCESS | REVIEW |
| INV-1004 | Sibling of INV-1003, pair 9900 | PROCESS | REVIEW |

### Model card (To-Be)

| Card field | Value now | Honesty |
|---|---|---|
| Purpose | Rank procure-to-pay exception cases for a person. | EDUCATIONAL until a live card is signed |
| Not for | Payment authorization. Auto APPROVE or auto REJECT. | Rule |
| Versions in the packet | `p2p-risk-1`, `p2p-risk-2` | PRECOMPUTED |
| Features listed | amount, supplier age, bank change, approval count, `non_po_flag`, `duplicate_score` | Copied from the model card |
| Precision / recall / false-positive rate | Section 3.6 | PRECOMPUTED |
| Independent validation | Missing | Missing |
| Score caption | Uncalibrated ranking | Rule |

Required before a version is named current: precision, recall, and false-positive rate stored (v2 blanks filled); PR-AUC or AUC stored; independent validation record with a name and a date; segment notes or an explicit Unknown for high-value vs low-value; residual-miss note on duplicate, alias, same-user, split. Segment band edges are `THRESHOLD_UNSET`.

Do not invent a ROC-AUC above 0.95. Keep class overlap. Some bad cases will look like good cases on the listed features. Do not tune a test set to hit a syllabus number.

---

## 5. Workflows

Named steps: Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify.

Payment is a separate irreversible step after `APPROVE`. Notify still runs for `APPROVE`, `REVIEW`, and `REJECT`.

### 5.1 Path

| Step | What it does | Parallel | Retry |
|---|---|---|---|
| Ingest | Store the invoice or the vendor-change event. Assign a case id. Persist state `INGESTED`. | Vendor-change ingest may run next to invoice ingest. | Yes. Reversible. |
| Extract | Turn the PDF or image into fields. Store confidence and channel. | Invoice extract and change-PDF extract may run side by side. | Yes. Reversible. |
| Verify | Join alias, requester vs approver, bank-change link, field completeness. | Alias join, SoD compare, and change link run side by side. | Yes. Reversible. |
| Detect | Set duplicate, split, non-PO, SoD, and alias flags. | Those detectors run side by side. | Yes. Reversible. |
| Score | Call the named model. Store an uncalibrated rank or leave unscored. | After Detect flags are stored. | Retry the call only while the timeout window is open. After timeout: REVIEW, unscored. Do not write `score = 0`. |
| Decide | Written policy reads flags, evidence, and rank. Emits APPROVE, REVIEW, or REJECT. Exception flags: REVIEW plus recommended outcome until auto-REJECT ADR. | No. Single policy engine. | Recompute from stored flags. Do not call payment. |
| Review | Named person sees evidence and records a disposition. | No. Persisted queue. | Do not keep the run open. Persist and resume. |
| Notify | Send the outcome to the requester and the supplier contact. | After Review close, after REJECT, and after APPROVE. | No retry loop. Idempotency key. |
| Payment (after APPROVE) | Named person releases money. | Outside the eight-step retry block. | No retry loop. Idempotency key. |

**P2P-FR-058.** Implement the eight named steps in this order. Goods receipt stays Missing as a live feed.

**P2P-FR-059.** Every case stores `state`, `updated_at`, and `step`. The run may stop. A later worker resumes from the last stored step.

| State | Meaning |
|---|---|
| INGESTED | Case id exists. |
| EXTRACTED | Fields stored. |
| VERIFIED | Identity checks stored. |
| DETECTED | Risk flags stored. |
| SCORED or UNSCORED | Rank stored, or scorer failed. |
| DECIDED | Outcome is APPROVE, REVIEW, or REJECT. |
| IN_REVIEW | Waiting for a named person. |
| REVIEWED | Disposition stored. |
| NOTIFIED | Notify key consumed. |
| PAID | Payment key consumed. Audit row already written. |
| REJECTED | No payment. Notify key consumed. |

Repo 1.0 stored INV-1003 as `PROCESS` at 11:15 and did not persist a link to CH-88. To-Be state for that pair is `IN_REVIEW` with `linked_change_ids=CH-88`.

**P2P-FR-060.** After Extract, these checks run side by side and write to the same case:

1. Alias normalize (`V-201` / `V201`).
2. Duplicate match on canonical supplier + PO + amount + currency.
3. Sibling invoices: named pair INV-1003 with INV-1004 until ADR.
4. Same-user requester and approver on linked changes (CH-88).
5. Bank-change link (CH-88 to V-311 invoices).
6. Non-PO flag.
7. Extract completeness.

Score may start when Detect has written its flags. Decide waits for Verify, Detect, and Score (or unscored).

**P2P-FR-061.** Retry only reversible steps: Ingest, Extract, Verify, Detect, Score (within timeout), Decide (recompute). Payment and notify sit outside retry.

Timeout seconds for Ingest, Extract, Verify, Detect, Score, and Review wait are `THRESHOLD_UNSET` (P2P-FR-006).

| Step | After timeout (until ADR names seconds) |
|---|---|
| Ingest | Leave `INGESTED` incomplete. Alert operations. Do not pay. |
| Extract | `extract_status=uncertain`. REVIEW. |
| Verify | REVIEW. |
| Detect | REVIEW with flags that did finish. Missing flags stored as unknown. |
| Score | REVIEW, `scorer_status=unscored`. Rank empty. |
| Review wait | Case stays held. Alert the named REVIEW owner. Do not invent a manager role. |
| Payment | Person retries with the same idempotency key. Count stays 1. |
| Notify | Same key. Count stays 1. |

Fallback: any failed reversible step that cannot finish cleanly sends the case to `REVIEW`. The case is held. No fake safe score. No auto-pay.

**P2P-FR-062.** If Extract wrote a partial row and then failed, mark that row `superseded` and keep it. Do not delete it. A later Extract writes a new row.

**P2P-FR-063.** If the queue service is down, cases stay in state `DECIDED` / outcome `REVIEW` on the application store. Workers resume when the queue returns.

**P2P-FR-064.** Event correlation sequence for the packet:

1. CH-88 at `2026-08-11T13:44:00` on V-311 bank account. Persist change case. SoD flag true.
2. INV-1003 at `2026-08-12 11:15`. Join CH-88. Persist `linked_change_ids=CH-88`.
3. INV-1004 at `2026-08-12 11:16`. Join CH-88 and sibling INV-1003. Persist pair sum 9900.
4. Both invoices go to `REVIEW`. Payment does not run.

### 5.2 Worked As-Is vs To-Be

| Case | As-Is path | To-Be path |
|---|---|---|
| INV-1002 | Ingest, invoice-number check `NO_DUPLICATE`, PROCESS, PAID | Ingest → Extract → Verify (alias) → Detect (supplier+PO+amount+currency 9800 USD vs INV-1001) → Score or unscored → Decide REVIEW → named person → Notify. Payment blocked unless the person overrides. |
| INV-1003 | Non-PO under 5000, PROCESS, no CH-88 link | Ingest → Extract → Verify (link CH-88, U22=U22) → Detect (non-PO, sibling INV-1004, pair 9900) → Score or unscored → Decide REVIEW → named person → Notify. |

### 5.3 INV-1003 REVIEW script

A stranger can finish this REVIEW.

1. Open case INV-1003.
2. Read 4950 USD, empty PO, supplier V-311, approver U22, `bank_changed_30d=Y`.
3. Open CH-88. See U22 / U22 and XXXX1122 → XXXX9988 at 2026-08-11T13:44:00.
4. Open sibling INV-1004. See pair 9900.
5. Read recommended REJECT of silent pay. Final policy outcome until ADR: REVIEW.
6. Press Agree, Disagree, or Override.
7. Write a note. Close. Notify runs once.

---

## 6. Data

### 6.1 Case events

A case starts when a supplier invoice arrives. Vendor-master changes join the same case when the supplier matches.

| Event | What arrives | Packet example |
|---|---|---|
| Invoice ingested | Invoice id, supplier id, PO, amount, currency, approver, bank-change flag | INV-1003 |
| Vendor master changed | Change id, field, old value, new value, requester, approver, time | CH-88 at `2026-08-11T13:44:00` |
| Document extracted | Structured fields plus per-field confidence | Extract rows Missing in Repo 1.0. To-Be stores them. |
| Identity verified | Canonical supplier id, requester vs approver, bank-change link | `V-201` and `V201` join. CH-88 links to INV-1003. |
| Detected | Duplicate, split, SoD, alias, non-PO, bank-change flags | INV-1002 matches INV-1001 on supplier + PO + amount + currency 9800 USD |
| Scored | Uncalibrated rank, or unscored | Scorer-down stores unscored. Never `score = 0`. |
| Decided | APPROVE, REVIEW, or REJECT from written policy | INV-1003 To-Be: REVIEW |
| Reviewed | Named person, disposition, reason codes | Replaces the email inbox |
| Payment released | Named payer, idempotency key, time | INV-1001 `PAID` has no payer in Repo 1.0. To-Be stores the payer. |
| Notified | Recipient, template, idempotency key | After APPROVE, REVIEW close, or REJECT |

### 6.2 Entities

| Entity | What it is | Identity in this packet |
|---|---|---|
| Supplier | The company to pay | Raw ids `V-201`, `V201`, `V-311`. Canonical id joins `V-201` and `V201`. |
| Purchase order | The official buy record | `PO-7001` on INV-1001 and INV-1002. Empty on INV-1003 and INV-1004. |
| Goods receipt | Record that goods arrived | Named in locked facts. No file in Repo 1.0 `02_data_evidence`. Status: Missing. Stay Missing until a feed exists. |
| Invoice | The claim for payment | INV-1001, INV-1002, INV-1003, INV-1004 |
| Bank account | Payee account on the supplier master | CH-88 old `XXXX1122`, new `XXXX9988` |
| Requester | Person who asks for a master-data change | CH-88 `U22`. CH-89 `U18`. |
| Approver | Person who approved the change or the invoice | CH-88 `U22`. Invoice approvers `U11` and `U22`. |
| Reviewer | Named person who owns REVIEW | Missing in Repo 1.0. D3b names the person. |
| Payer | Named person who releases payment | Missing in Repo 1.0. D3b names the role. |

### 6.3 Identity attributes and risk variables

| Attribute | Purpose | Packet fact |
|---|---|---|
| `supplier_id_raw` | Id as received | `V-201` on the four invoice rows. `V201` sits only on the alias file. |
| `supplier_id_canonical` | Id used for matching | Join `V-201` and `V201`. |
| `supplier_name_raw` | Name as received | Alpha Industrial Supply vs Alpha Industries Supply |
| `requester_id` | Who asked for the change | U22 on CH-88 |
| `approver_id` | Who approved the change or invoice | U22 on CH-88. Same value as requester. |
| `payer_id` | Who released payment | Missing today. Required on every `PAID`. |
| `reviewer_id` | Who finished REVIEW | Missing today. Required on every REVIEW close. |
| `bank_account_old` / `bank_account_new` | Masked account values | XXXX1122 → XXXX9988 |
| `verification_method` | How the bank change was checked | Callback vs none. Country list Missing. |

| Variable | How it is set | Worked value |
|---|---|---|
| `duplicate_match_supplier_po_amount` | Canonical supplier, PO, amount, and currency match a prior invoice. Invoice ids differ. | INV-1002 vs INV-1001: true. Amount 9800 USD. |
| `duplicate_invoice_number` | Exact invoice id match. As-Is method only. | INV-1002 is false on this flag and still a duplicate on the first flag. |
| `alias_collision` | Raw supplier id maps to a canonical id that has another raw id. | `V-201` / `V201`: true. |
| `bank_changed_30d` | Inherited flag from `invoices.csv`. | INV-1003 and INV-1004: Y. INV-1001 and INV-1002: N. |
| `linked_change_ids` | Change rows on the same canonical supplier before this invoice. | INV-1003: CH-88. INV-1001: CH-89 is email, not bank. |
| `same_user_requester_approver` | `requester_id` equals `approver_id` on a change. | CH-88: true. CH-89: false. |
| `non_po_flag` | PO empty. | INV-1003 and INV-1004: true. |
| `sibling_invoice_ids` | Named packet pair until ADR. | INV-1003 sibling INV-1004. |
| `sibling_amount_sum` | Sum of this invoice plus siblings. | 4950 + 4950 = 9900. Honesty: PRECOMPUTED. |
| `sod_vendor_and_pay_overlap` | Same user holds vendor-master and payment roles. | Store when the access file supplies it. |
| `extract_status` | `complete` or `uncertain` | Uncertain goes to REVIEW. |
| `scorer_status` | `scored` or `unscored` | Down scorer stores `unscored`. |
| `anomaly_rank` | Uncalibrated model rank | Not a percent chance. Blank when unscored. |
| `goods_receipt_status` | `present`, `Missing`, or later ADR waiver | Packet: Missing. |

### 6.4 Evidence retained

P2P-05 is Missing today. Owner TBD. This list is what the To-Be audit row must hold before payment state changes.

| Evidence | INV-1002 example | INV-1003 example |
|---|---|---|
| Case id / invoice id | INV-1002 | INV-1003 |
| Actor | Store reviewer and payer. | Approver U22. Store reviewer separately. |
| From-state | Ingested | Ingested |
| To-state | REVIEW (To-Be). Repo 1.0 stored PROCESS and PAID. | REVIEW (To-Be). Repo 1.0 stored PROCESS and APPROVED. |
| Score | Uncalibrated rank or unscored | Uncalibrated rank or unscored |
| Reasons | Duplicate match INV-1001, method supplier+PO+amount+currency 9800 USD | Linked CH-88, same user U22, empty PO, sibling INV-1004, pair 9900 |
| Model version | Named version or unscored | Named version or unscored |
| Rule version | Named rule pack | Named rule pack |
| Linked change ids | CH-89 (email, same supplier) | CH-88 |
| Sibling ids and sum | None on this case | INV-1004, 9900 |
| Extract fields and confidence | Required | Required |
| Reviewer text | Required before pay | Required before pay |

Honesty on packet amounts and times: PRECOMPUTED.

### 6.5 What stays open on data

- Goods-receipt feed: Missing.
- Confirmed-fraud labels and the data owner: Missing. D3b ADR.
- Country list for callback verification: Missing.
- Meaning of approval-matrix `amount_limit` inclusive vs exclusive: `THRESHOLD_UNSET`. D3b ADR.
- Sibling-time window: `THRESHOLD_UNSET`. Until the ADR, use the named pair INV-1003 and INV-1004.
- Who pressed pay on INV-1001 and INV-1002: Missing in the inherited files.

---

## 7. Integrations

Do not invent a feed this packet does not have.

| Integration | What it does | Packet status | Failure behaviour |
|---|---|---|---|
| Invoice source (file or API) | Delivers invoice rows | Four rows INV-1001 to INV-1004 | Incomplete ingest. Do not pay. |
| Vendor-master change source | Delivers CH-style rows | CH-88, CH-89 | Case still joins later by supplier when the row arrives. |
| Alias file | Maps raw supplier ids | `V-201`, `V201`, `V-311` | Unresolved alias → REVIEW |
| Document extractor (batch and API) | Turns PDF or image into fields | Extract rows Missing for these invoices | `extract_status=uncertain` → REVIEW |
| Model scoring API | Returns an uncalibrated rank | No stored scores on the four invoices. Shared API key across two unnamed environments. | REVIEW, unscored. P2P-FR-031. |
| Notify channel | Sends outcome to requester and supplier contact | Email addresses on CH-89 only | Same notify key. Count stays 1. |
| Payment execute | Named person releases money | INV-1001 and INV-1002 already PAID with no payer stored | Same payment key. Count stays 1. |
| WORM reference store | Locks hashes and versions | Missing in Repo 1.0. To-Be required. | Block PAID. `ESC_P2P05`. |
| Normal identity store | Holds names, emails, full bank numbers | CH-89 emails present | Deletable under a later privacy request. |
| REVIEW queue store | Persists REVIEW cases | Email inbox As-Is. To-Be application store. | Stay DECIDED / REVIEW. Resume. |
| Goods-receipt feed | Proves goods arrived | Missing | Store Missing. See section 3.1. |
| Price catalog | Detects anomalous unit price | Unknown. Do not invent. | No price-catalog flag. Rank may still include amount. |
| Sanctions / PEP / address | Identity compliance | Unknown. Do not invent. | If later required and missing → REVIEW |
| Geography / location | Geographic exception | Unknown. No country field on invoice rows. Do not invent. | No geographic detector |
| Live ERP supplier merge | Rewrite surviving supplier id | Not in this product. AP and Master Data confirm the join in D3b. | Matching still uses canonical id in this app. |

Environment names for the scoring API stay Missing until operations names them. D3b records those names. One secret per named environment. Rotate the shared key. Store which identity called score.

---

## 8. Risk and compliance requirements

### 8.1 Risk appetite

Finance wants earlier detection and also wants to keep the payment SLA.

Harm if the route is wrong:

- Company money goes out on a duplicate or a diverted bank account. Worked case: two 9800 USD payments on INV-1001 and INV-1002.
- A legitimate supplier waits past the SLA if a good invoice sits in REVIEW.

This file does not set a numeric false-positive target. `evaluation.csv` stores false-positive rate 0.18 on `p2p-risk-1` and 0.24 on `p2p-risk-2`. Honesty: PRECOMPUTED. A later model owner names the operating target in a D3b ADR (`THRESHOLD_UNSET`).

### 8.2 Mandatory human-oversight points

A named person must act in each of these cases.

| Trigger | Why a person is required | Packet example |
|---|---|---|
| Duplicate match on canonical supplier + PO + amount + currency | Second payment cannot be pulled back. | INV-1002 vs INV-1001, 9800 USD. |
| Alias collision on the match key | `V-201` and `V201` can hide a duplicate. | Alias file. |
| Same-user requester and approver on a bank change | Segregation of duties failed at change time. | CH-88, U22 / U22. |
| Invoice after a linked bank change, including a split pair | Approval bypass plus diverted account. | CH-88 then INV-1003 and INV-1004, 4950 + 4950 = 9900. |
| Empty PO | The As-Is expedite is retired. Amount line is `THRESHOLD_UNSET`. | INV-1003, INV-1004. |
| Extract fields missing or uncertain | Wrong payee or wrong amount. | Extract known issues. |
| Scorer down or extract down | Locked path: REVIEW and unscored. | P2P-FR-031. |
| Reviewer disagrees with the recommendation | Disagree must be as easy as Agree. | P2P-FR-048. |
| Payment execute | Irreversible. | INV-1001 already `PAID`. |

### 8.3 Exceptions this packet can detect

Detect only where D1 evidence supports the signal.

| Exception type | Supported by D1? | How this product detects it | Packet example |
|---|---|---|---|
| Duplicate payment | Yes | Canonical supplier + PO + amount + currency | INV-1001 and INV-1002, 9800 USD, both PAID |
| Alias hide | Yes | Alias file join | `V-201` / `V201` |
| Same-user bank change | Yes | Requester equals approver | CH-88 U22 / U22 |
| Bank change then invoice | Yes | Linked change id | CH-88 then INV-1003 at 11:15 the next day |
| Split / sibling non-PO | Yes | Named sibling sum | 4950 + 4950 = 9900 |
| Non-PO expedite | Yes | Empty PO | `NON_PO_UNDER_5000` in the As-Is log |
| Behavioural SoD overlap | Partial | Role overlap named in access review | Vendor-master users who also pay. Per-user matrix Missing. |
| Velocity | Partial | Two process times one minute apart | INV-1003 at 11:15, INV-1004 at 11:16. A numeric invoices-per-hour cutoff is `THRESHOLD_UNSET`. |
| Geographic | No | Unknown. No country field. | Do not invent a geography feed. |

### 8.4 Control matrix To-Be behaviour

| Control | As-Is status | To-Be behaviour |
|---|---|---|
| P2P-01 Duplicate invoice check | Active, but method invoice_number_only missed INV-1002 | Match supplier + PO + amount + currency after alias join |
| P2P-02 Supplier bank change approval | Partial | Same-user change cannot auto-apply. Link to later invoices. |
| P2P-03 Segregation of duties | Manual | Automated flag at change time. Continuous watch. One person cannot hold vendor-master and payment roles. |
| P2P-04 Non-PO exception review | Inconsistent | Empty PO → REVIEW. Split pair → REVIEW. |
| P2P-05 Immutable payment decision evidence | Missing, owner TBD | Write-first audit. Owner still TBD until D3b ADR. |

### 8.5 Access controls

As-Is facts: AP analysts can view bank details; some vendor-master users also hold payment-processing roles; no continuous SoD monitoring; model scoring API key is shared across two unnamed environments.

To-Be:

| Control | Behaviour |
|---|---|
| Bank details | Masked by default. Full account visible only to Master Data and to a named REVIEW owner on a case that needs it. View is logged. |
| Vendor-master vs payment | One person cannot hold both roles. Finance Controls owns the check (P2P-03). |
| Same-user change | Blocked from auto-apply. R-SOD-BANK. |
| Model API keys | One secret per named environment. Rotate the shared key. |
| Scoring call identity | Store which identity called score. |

Access-review date and reviewer name are Missing in Repo 1.0. To-Be stores both on each review.

CH-88 still shows why the overlap matters: U22 requested and approved the bank change and is also the approver on INV-1003 and INV-1004.

### 8.6 Change approvals

| Change | Who approves | Gate |
|---|---|---|
| Rule amount line | Owner named in a D3b ADR. Until then the line stays `THRESHOLD_UNSET`. | No edit to a live number without the ADR. |
| Rule condition (no number) | Finance Controls plus the control owner in `control_matrix.csv` | Versioned rule pack. Pull request. |
| Model version | Model owner named in D3b | Evaluation file attached. |
| Prompt used to draft reviewer text | Model owner | Prompt id and hash stored on the audit row. |
| Access role | Finance Controls (P2P-03) | SoD check must pass. |

### 8.7 Rebuild two years later

A reader loads the audit row for INV-1003, follows `linked_change_ids=CH-88`, reads reason codes, model version, rule version, reviewer disposition, and the WORM hashes. The reader can rebuild actor, from-state, to-state, score or unscored, and reasons.

---

## 9. Non-functional requirements

### 9.1 Scorer down and other failures

**P2P-FR-065.** Scorer down: the case goes to `REVIEW`. The case is marked `scorer_status=unscored`. `anomaly_rank` stays empty. Do not write `score = 0`. Show unscored on the review screen. Fire `ESC_UNSCORED`.

| Failure | Required behaviour | Measurable check |
|---|---|---|
| Model outage or timeout | REVIEW, unscored, empty rank | P2P-AC-004 |
| Extract down | REVIEW, `extract_status=uncertain` | P2P-AC-018 |
| Queue outage | Case stays DECIDED / REVIEW on the application store and resumes | P2P-AC-017 |
| Audit write fail | Payment blocked, `ESC_P2P05` | P2P-AC-019 |
| Payment retry after crash | Count stays 1 for one key | P2P-AC-005 |
| Notify retry | Count stays 1 for one key | P2P-AC-015 |

### 9.2 Limits that stay THRESHOLD_UNSET

D3b must produce an ADR, with a named owner, before any of these can be coded. Skip coding the number if D4 can demo `REVIEW` without it.

| Unset limit | Why it is unset | What D4 uses until the ADR |
|---|---|---|
| New amount lines (do not copy 5000, 10000, or 50000 as To-Be policy) | Inherited As-Is evidence only | Empty PO → REVIEW. Linked bank change → REVIEW. |
| Sibling-time window | Would join later invoices without a bound | Named pair INV-1003 and INV-1004 only |
| Bank-change window length other than inherited `bank_changed_30d` | Inherited field name | Inherited flag plus named change ids such as CH-88 |
| Extract numeric accept line | Two confidence channels in Repo 1.0 | Uncertain extract → REVIEW |
| Timeout seconds (Ingest, Extract, Verify, Detect, Score, Review wait) | No seconds in the packet | Failure → REVIEW or hold. Do not pay. |
| Contest window in days | No days in the packet | Contest form still exists. Days unset. |
| WORM retention days | No days in the packet | Overwrite refused while locked. Days unset. |
| Velocity invoices-per-hour | Partial evidence only (11:15 and 11:16) | Store the named pair and the two times |
| Segment amount-band edges | Model card says none | Unknown until data owner defines bands |
| Numeric false-positive operating target | 0.18 and 0.24 are PRECOMPUTED source cells | Do not code a target |
| Rank operating line that forces REVIEW | Would be a cutoff | Rank stored. Rank does not pick the money outcome. |
| Approval-matrix inclusive vs exclusive (M-22) | Missing in Repo 1.0 | Amounts stay unset. Roles remain named queues. |
| Auto-REJECT without a person | Unset in Repo 2.0 | REVIEW plus recommendation |
| Goods-receipt required to APPROVE | Feed Missing | Store Missing. See section 3.1. |

A rejected release does not change `THRESHOLD_UNSET` lines.

### 9.3 Security, release, and operations

**P2P-FR-066.** Separate model API keys after operations names the environments. Mask bank details. Split vendor-master and payment roles. Log full-account views.

**P2P-FR-067.** Pipeline runs the acceptance catalog on each rule or model change. Cloud setup is written as files a program can apply (infrastructure as code). Repo 1.0 has none.

**P2P-FR-068.** Release gate: evaluation file present; threshold ADR present if a number is coded; SoD check green; audit-first test green. Rules sit in a versioned pack.

**P2P-FR-069.** Rule pack rolls back to the previous version. New invoices use the old pack. In-flight cases keep the pack they started with. Model version rolls back the same way.

**P2P-FR-070.** Peak-volume number: do not invent. Honesty: EDUCATIONAL until a measured run exists. Repo 1.0 lists peak volume as not tested. No volume number sits in the packet.

**P2P-FR-071.** A failing test blocks release. The defect names the case id, the expected payload, and the actual payload. Defects that re-open a D1 gap (invoice_number_only miss, silent PROCESS on a split, same-user SUCCESS) are severity 1. They cannot be waived by a green inherited test.

A green result on “missing PO under threshold” can lock the As-Is expedite that sent INV-1003 and INV-1004 to `PROCESS`. A green result on “exact invoice-number duplicate” can lock the method that missed INV-1002. Passing those two tests does not mean the business problem is solved. D4 replaces them with P2P-AC-001, P2P-AC-002, P2P-AC-003, and P2P-AC-008.

**P2P-FR-072.** Every later automated test compares the full payload both ways: expected codes present, and unexpected codes absent.

**P2P-FR-073.** Governance pack before production handover: this PRD and any ADRs; D1 assessment still intact; Repo 2.0 pack; evaluation file with precision, recall, false-positive rate (v2 blanks filled or v2 not live); access review with date and name; separate API keys; SoD attestation from Finance Controls; CR-REG-01 answer or an explicit Unknown still open; test runner output for P2P-AC-001, P2P-AC-002, P2P-AC-003, P2P-AC-004, P2P-AC-017, P2P-AC-020, P2P-AC-025, P2P-AC-030; one rebuilt case.

Touchless processing rate sits in Repo 1.0 metrics. Touchless is not defined. Write Unknown for that definition. It is not the quality headline.

Infra charts (CPU, uptime) may exist. They are not the AI watch list.

---

## 10. Acceptance criteria

Each criterion has an id `P2P-AC-001` onward. Every line names a case or a measurable check. Packet citations: `D1_AsIs_Assessment/02_CASE_REPLAY.md`.

Honesty: packet walk-throughs are EDUCATIONAL until a runner exists. Measured runner output is REAL.

### 10.1 Required packet cases

**P2P-AC-001 Duplicate (INV-1001 and INV-1002).** Replay INV-1001 then INV-1002. Same supplier `V-201`, PO `PO-7001`, amount 9800, currency USD, different invoice ids. Source: `02_CASE_REPLAY.md` INV-1001 and INV-1002. As-Is stored `duplicate_check=NO_DUPLICATE` `method=invoice_number_only` at 12:01 on 2026-08-12. To-Be: INV-1002 goes to `REVIEW` with reason `DUP_SUPPLIER_PO_AMOUNT`. Recommended outcome: REJECT the second payment. Match method is canonical supplier + PO + amount + currency. INV-1001 remains already `PAID` in the inherited files.

**P2P-AC-002 Alias (V-201 vs V201).** Source: `02_CASE_REPLAY.md` V-201 vs V201. Alias file maps `V-201` to Alpha Industrial Supply and `V201` to Alpha Industries Supply. Inject a second 9800 USD invoice on PO-7001 that uses raw id `V201`. After canonical join, the case matches INV-1001 / INV-1002 keys and goes to `REVIEW` with `ALIAS_CANONICAL_JOIN` and `DUP_SUPPLIER_PO_AMOUNT`. A check that keys only on `V-201` fails this criterion.

**P2P-AC-003 Bank change + split (CH-88 then INV-1003 and INV-1004).** Source: `02_CASE_REPLAY.md` CH-88, INV-1003, INV-1004. Sequence: CH-88 at 2026-08-11T13:44:00, requester U22, approver U22, V-311 bank_account XXXX1122 to XXXX9988. Then INV-1003 at 11:15 and INV-1004 at 11:16 on 2026-08-12, empty PO, 4950 + 4950 = 9900, `bank_changed_30d=Y`. As-Is stored `NON_PO_UNDER_5000` `PROCESS` on both invoices. To-Be: both invoices go to `REVIEW`. Payment does not run. Audit rows store `linked_change_ids=CH-88`, sibling pair, sum 9900, and reason codes `NON_PO`, `BANK_CHANGE_LINKED`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`. CH-88 stays held for a named person. The change does not apply itself.

**P2P-AC-004 Scorer down.** Stop or time out the scorer on a case. The walk-through may use INV-1003 or a new PO invoice with no exception flags. Outcome `REVIEW`. `scorer_status=unscored`. Rank empty. No `score = 0`. Reason `SCORER_UNSCORED`. Review screen shows unscored.

**P2P-AC-005 Payment retry.** On a case that reached `APPROVE`, call payment twice with key `{case_id}:payment`. Payment count stays 1. The second call returns the first result. Do not use INV-1002 as the pay case. To-Be INV-1002 is `REVIEW` and does not pay.

### 10.2 Functional

**P2P-AC-006.** A valid PO invoice with no exception flags can reach `APPROVE`. Worked case: a new invoice modelled on INV-1001 arriving first (PO-7001, no prior match, `bank_changed_30d=N`). A named person still pays. AI does not set `PAID`.

**P2P-AC-007.** Exact invoice-number duplicate is still flagged (keep the inherited test) in addition to P2P-AC-001.

**P2P-AC-008.** Empty PO goes to `REVIEW`. Worked case: INV-1003. Reason `NON_PO`. The result word is `REVIEW`.

**P2P-AC-009.** CH-89 (V-201 email, requester U18, approver U19, 2026-08-12T09:20:00) does not set `same_user_requester_approver`. Source: `02_CASE_REPLAY.md` CH-89.

**P2P-AC-010.** To-Be output contains only `APPROVE`, `REVIEW`, `REJECT`. No `PROCESS`.

**P2P-AC-011.** Model rank caption is uncalibrated ranking. Score is not shown as a percent chance of fraud.

**P2P-AC-012.** Same-user bank change CH-88 does not auto-apply. Outcome `REVIEW`. Reason `SOD_SAME_USER_BANK`. Audit result is not SUCCESS as a finished apply.

**P2P-AC-013.** Sibling pair stores sum 9900 and `REVIEW`. Measurable fields: `sibling_invoice_ids` contains INV-1003 and INV-1004; `sibling_amount_sum=9900`.

**P2P-AC-014.** Recommendation alone does not set `PAID`. Measurable: stored recommendation with status still held until a named payer runs P2P-FR-053.

### 10.3 Integration

**P2P-AC-015.** Notify key `{case_id}:notify` returns the first result on retry. Notify count stays 1. Worked case: INV-1003 after REVIEW close.

**P2P-AC-016.** Invoice ingest plus vendor-change ingest join on canonical supplier. Worked sequence: CH-88 then INV-1003.

**P2P-AC-017.** Queue outage: case stays `DECIDED` / `REVIEW` on the application store and resumes. Measurable: state still present after queue restart. Worked case: INV-1003.

**P2P-AC-018.** Extract down → `REVIEW`, `extract_status=uncertain`. Reason `EXTRACT_UNCERTAIN`.

**P2P-AC-019.** Audit write fail → payment blocked, `ESC_P2P05`. Measurable: status is not `PAID`.

**P2P-AC-020.** Extract record stored before Verify. Measurable: extract row exists when Verify starts. If PDF Missing, uncertain path still recorded.

**P2P-AC-021.** Invoice with outcome `REVIEW` (INV-1003) does not consume `{case_id}:payment`. Payment count stays 0.

### 10.4 Compliance and evidence

**P2P-AC-022.** CH-88 id stored on INV-1003 and INV-1004 audit rows.

**P2P-AC-023.** Audit row id exists before status `PAID` on an APPROVE path.

**P2P-AC-024.** WORM store refuses overwrite of a locked reference. Measurable: second write of the same audit_row_id is refused.

**P2P-AC-025.** Email and full bank number are absent from the WORM payload. CH-89 mailbox text is not in WORM. Masked bank values may appear in the application audit row; full numbers stay in the identity store.

**P2P-AC-026.** P2P-01 method in To-Be is supplier+PO+amount+currency after alias join, not `invoice_number_only` only.

**P2P-AC-027.** Rebuild INV-1002 and INV-1003 from the audit row: actor, from-state, to-state, score or unscored, reasons, model version, rule version, linked change ids.

### 10.5 Human review and contest

**P2P-AC-028.** Reviewer can Agree, Disagree, and Override on the same screen. Worked case: INV-1003.

**P2P-AC-029.** Disagree writes a reason and does not pay by accident. Measurable: no `{case_id}:payment` consumed.

**P2P-AC-030.** Contest opens a second REVIEW. Original audit row stays. New audit row links to the first.

**P2P-AC-031.** Scorer-down case shows unscored, not a fake rank. Same case as P2P-AC-004 on the UI.

**P2P-AC-032.** A stranger can finish the INV-1003 REVIEW using the script in section 5.3. Required close fields present: reviewer id, start time, end time, disposition, reason codes, free-text note.

### 10.6 Rollback and release

**P2P-AC-033.** Rule pack rolls back to the previous version. New invoices use the old pack. In-flight cases keep the pack they started with.

**P2P-AC-034.** Model version rolls back the same way.

**P2P-AC-035.** A rejected release does not change `THRESHOLD_UNSET` lines. Measurable: no new amount, timeout, or sibling window appears in the shipped rule pack.

**P2P-AC-036.** Step latency is recorded when measured. Honesty: REAL when a runner exists.

**P2P-AC-037.** Peak volume is not invented. Honesty: EDUCATIONAL until a measured run exists.

**P2P-AC-038.** Every automated test compares expected reason codes present and unexpected codes absent on the full payload.

---

## 11. Success metrics

Honesty class is required on every metric. The operating board shows precision, recall, false-positive rate, catch rate, staffing, residual miss, and later PR-AUC. Accuracy 0.91 and 0.94 stay as copied source cells (P2P-SM-004).

| Id | Metric | What it answers | First number | Honesty |
|---|---|---|---|---|
| P2P-SM-001 | Precision | Of the cases the model flags, how many were later confirmed bad. | v1 0.52. v2 blank. | PRECOMPUTED until a live run; then REAL |
| P2P-SM-002 | Recall | Of the later-confirmed bad cases, how many the model flagged. | v1 0.71. v2 blank. | PRECOMPUTED until a live run; then REAL |
| P2P-SM-003 | False-positive rate | Share of good cases flagged. | v1 0.18. v2 0.24. | PRECOMPUTED now; REAL later |
| P2P-SM-004 | Accuracy cells from `evaluation.csv` | Copied source facts only. Not the operating headline. | v1 0.91. v2 0.94. | PRECOMPUTED |
| P2P-SM-005 | PR-AUC / AUC | Ranking quality. | Missing from `evaluation.csv`. | Unknown until measured; then REAL |
| P2P-SM-006 | Catch rate on named packet patterns | Duplicate, alias, same-user, split. | Walk-through in section 4. | EDUCATIONAL on the four invoices; REAL later |
| P2P-SM-007 | Segment non-PO vs PO | Catch on INV-1003 / INV-1004 style rows vs INV-1001 style rows. | Packet only. | EDUCATIONAL on the packet |
| P2P-SM-008 | Segment alias | Catch when the second id is `V201`. | Packet has no invoice on `V201`. Test injects one. | EDUCATIONAL until live data |
| P2P-SM-009 | Residual miss | Bad cases the live route still misses. | None measured. | REAL after go-live |
| P2P-SM-010 | REVIEW staffing and time to close | SLA harm to a supplier. | None measured. | REAL after go-live |
| P2P-SM-011 | Override rate | Person disagrees with the recommendation. | None measured. | REAL after go-live |
| P2P-SM-012 | Unscored rate | Scorer down path. | None measured. | REAL after go-live |
| P2P-SM-013 | Audit completeness | Share of PAID cases with an audit row written first. | None measured. | REAL after go-live |
| P2P-SM-014 | Prevented duplicate value | 9800 would be the packet illustration if INV-1002 had been held. | 9800 USD. | EDUCATIONAL on the packet |
| P2P-SM-015 | Split-invoice detection count | INV-1003 / INV-1004 pair. | Pair sum 9900. | EDUCATIONAL then REAL |
| P2P-SM-016 | Risky bank changes | CH-88 style. | One packet row. | EDUCATIONAL then REAL |
| P2P-SM-017 | SoD violations | Same-user and role overlap. | CH-88 U22 / U22. | EDUCATIONAL then REAL |
| P2P-SM-018 | Data-quality fail rate | Extract uncertain, alias unresolved. | None measured. | REAL later |
| P2P-SM-019 | Latency per step | Ingest through Decide. | None measured. | REAL later |
| P2P-SM-020 | Failure rates | Extract, score, queue, payment key clashes. | None measured. | REAL later |
| P2P-SM-021 | Compliance-control alerts | `ESC_*` events. | None measured. | REAL later |
| P2P-SM-022 | Stand-in model rank in D4 if no scorer runs | Demo rank only. Cannot pay. | Whatever the demo injects. | SIMULATED |
| P2P-SM-023 | High-value vs low-value segment | Same measures on each amount band. | Missing. Band edges `THRESHOLD_UNSET`. | Unknown until the data owner defines the bands |

Class mix, source of labels, and time split stay Unknown until the data owner writes them.

---

## What stays open on purpose

These items stay visible. D4 does not invent them.

1. Regulatory obligations: Unknown. CR-REG-01.
2. Sanctions / PEP / address: Unknown.
3. Geography feed: Unknown.
4. Goods-receipt feed: Missing.
5. Price catalog: Unknown.
6. REVIEW person, payer, model owner, data owner, P2P-05 owner: Missing or TBD until D3b names them.
7. Every row in section 9.2: `THRESHOLD_UNSET` until a D3b ADR.
8. v2 precision and recall: blank until filled.
9. Peak-volume number: not invented.
10. Touchless definition: Unknown.
11. Environment names: Missing.

## Done test for this PRD

- Every Repo 2.0 spine file has a PRD section (header table).
- Every acceptance criterion names a case or a measurable check (section 10).
- No cutoff exists without pointing to an ADR or `THRESHOLD_UNSET` (P2P-FR-006 and section 9.2).
- Outcomes remain `APPROVE`, `REVIEW`, `REJECT`. A named person owns `REVIEW`. The model ranks. Written policy picks the action.
