# D1 capability split

One product name sits on this packet: Procure-to-Pay Exception and Payment-Control. Path: `05_procure_to_pay_exception_repo_1_0/README.md`.

Five capabilities sit under that name. This file splits who may analyse, recommend, decide, and execute. AI may analyse and recommend. Payment execute stays with a named person.

Repo 1.0 does not name the person who releases payment. Approver ids exist on invoice rows. Who pressed pay is Missing. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`.

This file records current-state behaviour and the required split. It does not implement a new workflow.

`PROCESS` is current-state language. Trainer-required later names are `APPROVE` / `REVIEW` / `REJECT`. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

---

## Wave 1 stance (recorded only)

Wave 1 is the first later change. D1 writes the stance as text. Repo 1.0 files stay as they are. No workflow is changed in this step.

1. Stop using an AI recommendation as payment authorization. Source of the risk: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`.
2. Send bank-change-plus-split cases to a person. Worked case: CH-88 then INV-1003 and INV-1004. Paths: `02_data_evidence/vendor_master_changes.csv`; `02_data_evidence/invoices.csv`; `05_workflow_orchestration/processing_log.txt`.

Later D2 must name the control, the test, and the evidence. See `D1_AsIs_Assessment/06_RCTE_ROWS.md`.

---

## 1. Duplicate payment detection

**Current evidence.** Duplicate check uses invoice number only. INV-1002 stores `NO_DUPLICATE`. INV-1001 and INV-1002 are both `PAID` at 9800 USD to V-201 on PO-7001. Paths: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`. P2P-01 owner AP, status Active. Path: `08_compliance_audit/control_matrix.csv`. Alias ids V-201 and V201 exist. Path: `02_data_evidence/supplier_aliases.csv`. Alias duplicate is not tested. Path: `10_production_readiness/test_summary.md`.

| Verb | Who may do it | What Repo 1.0 shows |
|---|---|---|
| Analyse | A program or AI may compare invoices. | Method is `invoice_number_only`. Path: `processing_log.txt`. |
| Recommend | A program or AI may recommend BLOCK or REVIEW. | BLOCK exists only if `duplicate_invoice_number == true`. Path: `06_governed_decisioning/exception_rules.yaml`. |
| Decide | A named person must decide whether the invoice may proceed toward payment. | INV-1002 reached `PAID`. Approver on the row is U11. Path: `invoices.csv`. Decision text stores `PROCESS`. Path: `07_explainability_review/sample_decisions.txt`. |
| Execute | A named person releases payment. AI does not pay. | Both rows are `PAID`. Who pressed pay: Missing. Path: `invoices.csv`. |

Worked case: INV-1002. Same supplier, PO, and amount as INV-1001. Different invoice id. Payment already went out.

---

## 2. Supplier bank-account change

**Current evidence.** CH-88 changes V-311 `bank_account` from XXXX1122 to XXXX9988. Requester U22. Approver U22. Time `2026-08-11T13:44:00`. Result SUCCESS. Paths: `02_data_evidence/vendor_master_changes.csv`; `08_compliance_audit/audit_extract.log`. Requests arrive as emailed PDFs. Out-of-band checks are inconsistent. Path: `04_document_identity_compliance/vendor_verification.md`. Bank change and payment workflows are separate. Path: `05_workflow_orchestration/current_flow.md`. P2P-02 owner Master Data, status Partial. Path: `control_matrix.csv`.

CH-89 is the contrast row: V-201 email change, requester U18, approver U19. Path: `vendor_master_changes.csv`.

| Verb | Who may do it | What Repo 1.0 shows |
|---|---|---|
| Analyse | A program or AI may read the change request and the old/new bank values. | CH-88 fields are in `vendor_master_changes.csv`. The emailed PDF is Missing from the packet. |
| Recommend | A program or AI may recommend REVIEW. | REVIEW fires only if `bank_changed_30d` and `amount > 10000`. Path: `exception_rules.yaml`. CH-88 itself has no amount. |
| Decide | A named person other than the requester must approve a bank-account change. | CH-88 approver is the same user as requester. No conflict rule. Path: `exception_rules.yaml` `gaps`. |
| Execute | A named person in Master Data applies the master-data change. AI does not write the bank account. | `result=SUCCESS` is stored. Path: `audit_extract.log`. Who applied it beyond U22: Missing. |

Worked case: U22 requested and approved the V-311 bank change. The next day INV-1003 and INV-1004 used `bank_changed_30d=Y`.

---

## 3. Split / non-PO invoice

**Current evidence.** INV-1003 and INV-1004 have empty PO, 4950 USD each, `bank_changed_30d=Y`, status `APPROVED`, result `PROCESS` as `NON_PO_UNDER_5000`. Pair total 9900. Paths: `02_data_evidence/invoices.csv`; `05_workflow_orchestration/processing_log.txt`. Rule: `po == ""` and `amount < 5000` → `PROCESS`. Path: `exception_rules.yaml`. Gap: no split-invoice aggregation. Same path. P2P-04 owner Procurement, status Inconsistent. Path: `control_matrix.csv`. Split invoices not tested. Path: `test_summary.md`.

| Verb | Who may do it | What Repo 1.0 shows |
|---|---|---|
| Analyse | A program or AI may read PO presence, amount, supplier, and nearby invoices. | Two 4950 rows one minute apart. Path: `processing_log.txt`. |
| Recommend | A program or AI may recommend REVIEW when a pair looks like a split. | No aggregation rule. Path: `exception_rules.yaml` `gaps`. Wave 1 stance sends bank-change-plus-split cases to a person. Not implemented in Repo 1.0. |
| Decide | A named person must decide. Approval matrix names AP_SUPERVISOR at 5000. Path: `approval_matrix.csv`. | Runtime stored `PROCESS`. Approver on both rows is U22. Path: `invoices.csv`. |
| Execute | Payment execute stays with a named person. These two rows are `APPROVED`, not `PAID`. | Payment has not been recorded yet on INV-1003 and INV-1004. Path: `invoices.csv`. |

Worked case: 4950 + 4950 = 9900. Each row is under 5000, so PROCESS fires twice. Bank-change REVIEW needs amount > 10000, so it also does not fire.

---

## 4. Segregation of duties

**Current evidence.** P2P-03 owner Finance Controls, status Manual. Path: `control_matrix.csv`. Some vendor-master users also hold payment-processing roles. No continuous SoD monitoring. Path: `09_ai_risk_security_observability/access_review.md`. CH-88 same user. Path: `vendor_master_changes.csv`. INV-1003 approver is U22, the same id. Path: `invoices.csv`. Same-user requester/approver is not tested. Path: `test_summary.md`.

| Verb | Who may do it | What Repo 1.0 shows |
|---|---|---|
| Analyse | A program or AI may compare requester id and approver id. | CH-88 U22 / U22 is visible on `vendor_master_changes.csv`. |
| Recommend | A program or AI may recommend REVIEW when the two ids match. | No conflict rule. Path: `exception_rules.yaml` `gaps`. |
| Decide | Finance Controls owns the SoD control. A named person in that function must decide whether the change or invoice may proceed. | Status is Manual. Internal Audit is named as a later detector in `business_problem.md`. |
| Execute | A named person applies the master-data change or releases payment. The requester does not also execute. | CH-88 still stores SUCCESS. Path: `audit_extract.log`. Overlap of vendor-master and payment roles exists. Path: `access_review.md`. |

Worked case: U22 is requester and approver on CH-88 and approver on INV-1003 and INV-1004.

---

## 5. Payment release

**Current evidence.** Irreversible action is payment. INV-1001 and INV-1002 are `PAID`. Path: `02_data_evidence/invoices.csv`. Locked fact: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`. Risk: AI recommendation used as payment authorization without accountable reviewer. Path: `01_decision_risk_boundary/risk_notes.md`. P2P-05 immutable evidence Missing, owner TBD. Path: `control_matrix.csv`. Path in `current_flow.md` ends at Payment. No payment-release log. Who pressed pay: Missing.

| Verb | Who may do it | What Repo 1.0 shows |
|---|---|---|
| Analyse | A program or AI may read invoice, PO, bank-change flag, duplicate check, and scores. | Decision-time fields on the invoice row: invoice id, supplier, PO, amount, currency, approver, `bank_changed_30d`. Path: `invoices.csv`. Model score on the row: Missing. Rule version on the row: Missing. |
| Recommend | A program or AI may recommend APPROVE, REVIEW, or REJECT (trainer names) or the current word PROCESS. | `exception_rules.yaml` stores BLOCK / REVIEW / PROCESS. AI as authorization is named as a risk. Path: `risk_notes.md`. |
| Decide | A named person owns the money decision. REVIEW stays with that person. | Approver ids U11 and U22 sit on the invoice rows. Path: `invoices.csv`. Review queue is an email inbox with no structured disposition. Path: `07_explainability_review/escalation_notes.md`. |
| Execute | A named person releases payment. AI does not execute payment. | INV-1001 and INV-1002 are already `PAID`. Named execute person: Missing. Immutable evidence of that act: Missing (P2P-05). |

Worked case: INV-1001 9800 USD `PAID`. A second 9800 USD on INV-1002 is also `PAID`. Changing a rule later cannot pull those payments back.

---

## Product-level summary

| Capability | Analyse | Recommend | Decide | Execute |
|---|---|---|---|---|
| Duplicate payment detection | AI allowed | AI allowed | Named person | Named person pays |
| Supplier bank-account change | AI allowed | AI allowed | Named person other than requester | Named person in Master Data |
| Split / non-PO invoice | AI allowed | AI allowed | Named person | Named person pays |
| Segregation of duties | AI allowed | AI allowed | Finance Controls (named owner) | Named person; requester does not also execute |
| Payment release | AI allowed | AI allowed | Named person | Named person only |

AI may analyse and recommend on every row. Payment execute stays with a named person. Repo 1.0 does not store that person’s name on the pay step. Status: Missing.
