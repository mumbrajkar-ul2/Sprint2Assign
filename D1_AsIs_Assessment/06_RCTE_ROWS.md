# D1 Risk-Control-Test-Evidence rows

Later D2 must name these four things on every recommendation. This file writes the rows from Repo 1.0 evidence. It does not implement the control. It does not invent a cutoff.

`PROCESS` is current-state language. Trainer-required later names are `APPROVE` / `REVIEW` / `REJECT`. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

Wave 1 stance (text only, not built): stop using an AI recommendation as payment authorization; send bank-change-plus-split cases to a person. Path: `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md`.

How to read a row: Risk is what the files already show can go wrong. Control is what later D2 must name. Test is how later work will prove the control. Evidence is the record that must exist after a decision. Owner cells use names already in `control_matrix.csv`. If none exists, the cell says Missing or TBD.

---

## RCTE-01 — Duplicate pair paid (INV-1002)

| Field | Content |
|---|---|
| Risk | Two invoices with the same supplier, PO, and amount both reach `PAID`. Harm is company money out. Paths: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`; `01_decision_risk_boundary/risk_notes.md` |
| Control | Later D2 must name a duplicate-payment control that uses more than invoice number. D1 does not choose the match fields. Current method is `invoice_number_only`. Path: `05_workflow_orchestration/processing_log.txt`. Owner today: AP (P2P-01). Path: `08_compliance_audit/control_matrix.csv` |
| Test | `test_summary.md` currently tests exact invoice-number duplicate. Later D2 must add a test where invoice ids differ and supplier, PO, and amount match. Packet case to use: INV-1001 and INV-1002, 9800 USD, V-201, PO-7001. Path: `10_production_readiness/test_summary.md` |
| Evidence | Store invoice ids, supplier id, PO, amount, currency, duplicate method, duplicate result, approver, status, rule version, and who released payment. P2P-05 is Missing, so this store is not immutable today. Path: `08_compliance_audit/control_matrix.csv` |

Worked case: INV-1002 at 12:01 on 2026-08-12 stored `NO_DUPLICATE` because the method was `invoice_number_only`. Both rows are `PAID`.

---

## RCTE-02 — Supplier alias duplicate miss (V-201 vs V201)

| Field | Content |
|---|---|
| Risk | A second supplier id for the same supplier can hide a duplicate. `V-201` is `Alpha Industrial Supply`. `V201` is `Alpha Industries Supply`. Path: `02_data_evidence/supplier_aliases.csv`. Extract note says aliases cause duplicate misses. Path: `04_document_identity_compliance/invoice_extraction.md` |
| Control | Later D2 must name an alias-normalization control. Current gap: “no supplier alias normalization”. Path: `06_governed_decisioning/exception_rules.yaml`. D1 does not merge the ids. |
| Test | `test_summary.md` lists supplier alias duplicate under Not tested. Later D2 must add that test. Path: `10_production_readiness/test_summary.md` |
| Evidence | Store both raw supplier ids, the name strings, and the id used for matching. P2P-05 Missing. |

---

## RCTE-03 — Same-user bank change (CH-88)

| Field | Content |
|---|---|
| Risk | A compromised supplier master. Requester and approver are the same person. Path: `01_decision_risk_boundary/risk_notes.md`. CH-88 U22 / U22, bank_account XXXX1122 to XXXX9988, `2026-08-11T13:44:00`, SUCCESS. Paths: `02_data_evidence/vendor_master_changes.csv`; `08_compliance_audit/audit_extract.log` |
| Control | Later D2 must name an SoD control that a bank-account change cannot be approved only by the requester. Current gap: “no requester/approver conflict rule”. Path: `exception_rules.yaml`. Owners today: Finance Controls (P2P-03 Manual), Master Data (P2P-02 Partial). Path: `control_matrix.csv` |
| Test | `test_summary.md` lists same user requester/approver under Not tested. Contrast case already in files: CH-89 U18 / U19. Paths: `test_summary.md`; `vendor_master_changes.csv` |
| Evidence | Store change id, supplier, field, old value, new value, requester, approver, timestamp, result, and verification artifact. Emailed PDF is Missing from the packet. Path: `04_document_identity_compliance/vendor_verification.md`. Link to later invoice: Missing. Path: `audit_extract.log` |

---

## RCTE-04 — Bank change then split non-PO invoices (CH-88, INV-1003, INV-1004)

| Field | Content |
|---|---|
| Risk | Approval bypass and split invoice around the 5000 line, with a recent bank change. INV-1003 and INV-1004 are 4950 each, empty PO, `bank_changed_30d=Y`, `PROCESS`. Pair 9900. Paths: `01_decision_risk_boundary/business_problem.md`; `02_data_evidence/invoices.csv`; `05_workflow_orchestration/processing_log.txt` |
| Control | Wave 1 stance: send bank-change-plus-split cases to a person. Later D2 must name that human route. Current rules: empty PO and amount < 5000 → PROCESS; bank change REVIEW only if amount > 10000; no split aggregation; no event correlation. Paths: `06_governed_decisioning/exception_rules.yaml`; `05_workflow_orchestration/current_flow.md`. D1 does not implement the route and does not set a new amount. Owner today: Procurement (P2P-04 Inconsistent). |
| Test | `test_summary.md` lists split invoices and bank change immediately before payment under Not tested. Packet sequence to use: CH-88 at 2026-08-11T13:44:00, INV-1003 at 2026-08-12 11:15, INV-1004 at 11:16. Path: `test_summary.md` |
| Evidence | Link CH-88 to INV-1003 and INV-1004 on one decision record. Today `audit_extract.log` says no vendor-change evidence linked to payment decision. Store pair total 9900 as a calculated fact with the two invoice ids. P2P-05 Missing. |

---

## RCTE-05 — Non-PO PROCESS vs approval matrix

| Field | Content |
|---|---|
| Risk | Approval bypass. A 4950 empty-PO invoice stores PROCESS while the matrix names AP_SUPERVISOR at 5000. Paths: `exception_rules.yaml`; `06_governed_decisioning/approval_matrix.csv`; `processing_log.txt` |
| Control | Later D2 must name one live rule for empty-PO invoices in this amount band. Owners today: Procurement (P2P-04) and role AP_SUPERVISOR. D1 does not choose. Matrix owner column: Missing. |
| Test | Current test “missing PO under threshold” exists. Path: `test_summary.md`. Later D2 must say whether a green result on that test is desired business behaviour or a locked gap. D1 does not decide. |
| Evidence | Store PO presence, amount, required_role, rule id, rule version, result word, and named approver. INV-1003 approver is U22. Path: `invoices.csv` |

---

## RCTE-06 — AI recommendation as payment authorization

| Field | Content |
|---|---|
| Risk | AI recommendation used as payment authorization without an accountable reviewer. Path: `01_decision_risk_boundary/risk_notes.md`. Harm: company if a bad pay goes out; supplier if a false block misses the SLA. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md` |
| Control | Wave 1 stance: stop using an AI recommendation as payment authorization. Payment execute stays with a named person. AI may analyse and recommend. Path: `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md`. Named execute person today: Missing. P2P-05 owner TBD. |
| Test | No test in `test_summary.md` covers “model score cannot pay”. Later D2 must add a test that a recommendation alone does not change status to `PAID`. Path: `test_summary.md` |
| Evidence | Store recommendation, named decider, named payer, and timestamps for decide vs pay. Immutable store: Missing (P2P-05). |

---

## RCTE-07 — Model quality headline (p2p-risk-2)

| Field | Content |
|---|---|
| Risk | Operations treat accuracy 0.94 as proof of quality while false-positive rate is 0.24 vs 0.18 on v1, and v2 precision and recall are blank. A false block can delay a legitimate supplier. Paths: `03_detection_models/evaluation.csv`; `03_detection_models/anomaly_model.md`; `01_decision_risk_boundary/risk_notes.md` |
| Control | Later D2 must name evaluation metrics other than accuracy as the operating headline. Independent validation is Missing. Path: `anomaly_model.md`. Model owner: Missing. D1 does not pick a winner version. |
| Test | Later D2 must require precision, recall, and false-positive rate on a stored evaluation file before a model is named current. Current `evaluation.csv` already shows the blank cells. Path: `evaluation.csv` |
| Evidence | Store model version, accuracy, precision, recall, false-positive rate, and whether independent validation exists. `metrics.md` does not track false positive rate in operations. Path: `09_ai_risk_security_observability/metrics.md` |

---

## RCTE-08 — Scorer down

| Field | Content |
|---|---|
| Risk | The scoring model is unavailable. Repo 1.0 behaviour is Unknown. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md` |
| Control | Later design in the locked facts says REVIEW and unscored. That path is not evidenced in Repo 1.0. D1 keeps Unknown for current state. D1 does not implement the later path. |
| Test | `test_summary.md` lists model outage under Not tested. Path: `10_production_readiness/test_summary.md` |
| Evidence | Store that the case was unscored, the outage flag, and the named reviewer. Current sample decisions have no model contribution. Path: `07_explainability_review/sample_decisions.txt` |

---

## RCTE-09 — Immutable payment-decision evidence (P2P-05)

| Field | Content |
|---|---|
| Risk | A paid case cannot be rebuilt later. Vendor change is not linked to the payment decision. Path: `08_compliance_audit/audit_extract.log` |
| Control | P2P-05 Immutable payment decision evidence, owner TBD, status Missing. Path: `08_compliance_audit/control_matrix.csv`. Later D2 must name the store. D1 does not build it. |
| Test | Later D2 must rebuild INV-1002 and INV-1003 from the audit row two years later. Current `audit_extract.log` has CH-88 and INV-1003 only. INV-1002 line: Missing. INV-1004 line: Missing. |
| Evidence | Need: actor, from-state, to-state, score, reasons, model version, rule version, linked change id. Today `sample_decisions.txt` retains none of linked evidence, model contribution, rule version, or reviewer explanation. Path: `07_explainability_review/sample_decisions.txt` |

---

## RCTE-10 — Shared model API key and overlapping roles

| Field | Content |
|---|---|
| Risk | Model scoring API key is shared across two environments. Some vendor-master users also hold payment-processing roles. Path: `09_ai_risk_security_observability/access_review.md` |
| Control | Later D2 must name separate secrets per environment and an access control that separates vendor-master change from payment release. Continuous SoD monitoring: Missing. Same path. Owner today: Finance Controls (P2P-03). Environment names: Missing. |
| Test | No access or key test in `test_summary.md`. Later D2 must add one. Path: `test_summary.md` |
| Evidence | Store which identity called score, which identity changed master data, and which identity released payment. Current audit lines omit identity beyond U22 on CH-88. Path: `audit_extract.log` |

---

## RCTE-11 — Review queue is an email inbox

| Field | Content |
|---|---|
| Risk | A person cannot complete a structured REVIEW. No disposition, reason codes, or model feedback loop. Path: `07_explainability_review/escalation_notes.md`. False block harm to a supplier if the inbox is silent. Path: `risk_notes.md` |
| Control | Later D2 must name a human review path a person can finish. Queue owner: Missing. |
| Test | `test_summary.md` lists queue outage under Not tested. Path: `test_summary.md` |
| Evidence | Store reviewer name, time taken, agree or disagree, reason code, and whether the model dataset was updated. All Missing today. Path: `escalation_notes.md` |

---

## RCTE-12 — Rule change without an approval gate

| Field | Content |
|---|---|
| Risk | Amount lines 5000 and 10000 sit in a shared file. Anyone who can edit that file changes who gets PROCESS. Paths: `10_production_readiness/deployment.md`; `06_governed_decisioning/exception_rules.yaml` |
| Control | Later D2 must name an approval gate for rule threshold changes. Current gate: Missing. Path: `deployment.md`. IaC: Missing. Release evidence pack: Missing. D1 does not set a new threshold. |
| Test | Rollback is not tested. Path: `test_summary.md` |
| Evidence | Store who changed the rule file, previous values, new values, approver, and the rule version used on each invoice. Rule version on sample decisions: Missing. Path: `sample_decisions.txt` |

---

## RCTE-13 — Extract confidence and identity

| Field | Content |
|---|---|
| Risk | Wrong invoice number, alias, or bank details from OCR. OCR is software that reads text from a document image. Confidence threshold differs between batch and API. Bank details are not cryptographically verified. Path: `04_document_identity_compliance/invoice_extraction.md` |
| Control | Later D2 must name a route to a person when extract evidence is uncertain. Current route: Missing. |
| Test | No extract-confidence test in `test_summary.md`. Path: `test_summary.md` |
| Evidence | Store extracted fields, confidence, which threshold was used (batch or API), and whether a person confirmed identity. Extract rows for INV-1001 to INV-1004: Missing. |

---

## How later D2 should use this file

Every Repo 2.0 recommendation cites an RCTE id. It keeps Risk, Control, Test, and Evidence visible. It does not delete a Missing row to look clean. It does not invent a cutoff in the prompt. Required numbers stay as copied in `D1_AsIs_Assessment/02_CASE_REPLAY.md`.
