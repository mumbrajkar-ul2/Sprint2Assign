# D1 spine notes — Repo 1.0 as evidence

This file is an As-Is reading of `05_procure_to_pay_exception_repo_1_0`. Each spine step follows `05_procure_to_pay_exception_repo_1_0/FOLDER_GUIDE.md` order.

Every bullet cites a path. A file is evidence of a claim or a behaviour. Two files can disagree. This file writes both sides. It does not choose a live policy.

`PROCESS` is a result word in Repo 1.0 logs and rules. The trainer later requires the names `APPROVE`, `REVIEW`, and `REJECT`. See `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

If a control is not in the files, this file writes Missing.

---

## Packet cover (outside folders 01–10)

These files sit at the root of Repo 1.0. They tell you how to read the packet. Folders 01–10 are the spine steps.

### What exists

- Cover note. Treat every artifact as evidence, not truth. Path: `05_procure_to_pay_exception_repo_1_0/README.md`
- Central challenge: decide whether a supplier transaction can safely proceed to payment. Path: `05_procure_to_pay_exception_repo_1_0/README.md`
- Case brief. Investigate first. Do not redesign yet. Path: `05_procure_to_pay_exception_repo_1_0/00_CASE_BRIEF.md`
- Folder list for the ten spine steps. Path: `05_procure_to_pay_exception_repo_1_0/FOLDER_GUIDE.md`
- Search list of brownfield signals. The file says it is not complete. Path: `05_procure_to_pay_exception_repo_1_0/KNOWN_BROWNFIELD_SIGNALS.md`
- File list with short hashes for version 1.0. Path: `05_procure_to_pay_exception_repo_1_0/manifest.json`

### What contradicts

- `README.md` says the packet can hold contradictory business rules. The numbered folders then store those disagreements. See `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md`.

### What is missing

- A finished policy pack. `00_CASE_BRIEF.md` says understand what is happening from the evidence first.
- A running application and a written PRD inside Repo 1.0. `00_CASE_BRIEF.md` names those as a later path.

---

## Spine 1 — Decision, risk, and boundary

Folder: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary`

### What exists

- Finance has identified duplicate payments, suspicious supplier bank changes, invoice splitting, and approval bypasses. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md`
- Finance wants earlier detection and also wants to preserve payment SLAs. An SLA is the promised time to handle the invoice. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md`
- Segregation-of-duties controls are partly preventive and partly detected later by Internal Audit. Segregation of duties means the person who asks for a change is not the only person who approves it. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md`
- Named risks: duplicate or manipulated invoice; compromised supplier master; split invoice around approval threshold; requester / approver conflict; false positive that blocks a legitimate supplier payment; AI recommendation used as payment authorization without an accountable reviewer. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`

### What contradicts

- `business_problem.md` names invoice splitting. `06_governed_decisioning/exception_rules.yaml` lists “no split-invoice aggregation” under `gaps`. INV-1003 and INV-1004 still receive `PROCESS`. Paths: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md`; `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- `risk_notes.md` names requester / approver conflict. CH-88 has `requested_by=U22` and `approved_by=U22`. `exception_rules.yaml` lists “no requester/approver conflict rule” under `gaps`. Paths: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`; `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- `risk_notes.md` names AI recommendation used as payment authorization. `08_compliance_audit/control_matrix.csv` has no control row for that use. Paths: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`; `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`

### What is missing

- Trainer outcome names `APPROVE` / `REVIEW` / `REJECT` in this folder. Missing. Repo 1.0 result word `PROCESS` appears later in `05_workflow_orchestration/processing_log.txt`.
- A named person who owns the payment decision. Missing in both files in this folder.
- A written risk appetite, a prohibited-automation list, or a mandatory human-oversight rule. Missing in both files in this folder.
- Scorer-down behaviour. Missing in this folder. Packet-wide status: Unknown. `10_production_readiness/test_summary.md` says model outage is not tested.

---

## Spine 2 — Case, data, and evidence

Folder: `05_procure_to_pay_exception_repo_1_0/02_data_evidence`

### What exists

- Four invoice rows: INV-1001, INV-1002, INV-1003, INV-1004. Columns: `invoice_id`, `supplier`, `po`, `amount`, `currency`, `approver`, `bank_changed_30d`, `status`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- INV-1001: supplier `V-201`, PO `PO-7001`, amount `9800`, currency `USD`, approver `U11`, `bank_changed_30d=N`, status `PAID`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- INV-1002: supplier `V-201`, PO `PO-7001`, amount `9800`, currency `USD`, approver `U11`, `bank_changed_30d=N`, status `PAID`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- INV-1003: supplier `V-311`, PO empty, amount `4950`, currency `USD`, approver `U22`, `bank_changed_30d=Y`, status `APPROVED`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- INV-1004: supplier `V-311`, PO empty, amount `4950`, currency `USD`, approver `U22`, `bank_changed_30d=Y`, status `APPROVED`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- Pair total INV-1003 + INV-1004 = 4950 + 4950 = 9900. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- Three supplier-id rows: `V-201` name `Alpha Industrial Supply`; `V201` name `Alpha Industries Supply`; `V-311` name `Nova Components`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/supplier_aliases.csv`
- CH-88: supplier `V-311`, field `bank_account`, old `XXXX1122`, new `XXXX9988`, requested_by `U22`, approved_by `U22`, timestamp `2026-08-11T13:44:00`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`
- CH-89: supplier `V-201`, field `email`, old `ap@vendor.example`, new `accounts@vendor.example`, requested_by `U18`, approved_by `U19`, timestamp `2026-08-12T09:20:00`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`

### What contradicts

- INV-1001 and INV-1002 share supplier, PO, amount, currency, and approver. Both are `PAID`. Invoice ids differ. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- `V-201` and `V201` are two supplier ids with two name strings that differ by `Industrial` vs `Industries`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/supplier_aliases.csv`
- CH-88 requester and approver are the same user `U22`. CH-89 requester `U18` and approver `U19` are different users. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`
- Invoice status words in this folder are `PAID` and `APPROVED`. Later logs use `PROCESS`. Paths: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`; `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`

### What is missing

- Goods receipt rows. Locked facts name goods receipt as an object. This folder has no goods-receipt file. Status: Missing.
- Invoice timestamps on `invoices.csv`. Missing. Process times for INV-1003, INV-1004, and INV-1002 sit in `05_workflow_orchestration/processing_log.txt`. INV-1001 has no log time.
- A confirmed-fraud or later-outcome label column. Missing on `invoices.csv`.
- A canonical supplier id that joins `V-201` and `V201`. Missing. `06_governed_decisioning/exception_rules.yaml` lists “no supplier alias normalization” under `gaps`.
- Bank-account values on the invoice rows. Missing. Bank change for V-311 is only on CH-88 in `vendor_master_changes.csv`.
- Who released payment after status `PAID`. Missing.

---

## Spine 3 — Detection models

Folder: `05_procure_to_pay_exception_repo_1_0/03_detection_models`

### What exists

- Model card version `p2p-risk-2`. Features listed: amount, supplier age, bank change, approval count, `non_po_flag`, `duplicate_score`. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/anomaly_model.md`
- Reported accuracy 94% on the model card. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/anomaly_model.md`
- Evaluation table with two versions. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`
- `p2p-risk-1`: accuracy `0.91`, precision `0.52`, recall `0.71`, false-positive rate `0.18`. False-positive rate is the share of good cases the detector flags. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`
- `p2p-risk-2`: accuracy `0.94`, precision blank, recall blank, false-positive rate `0.24`. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`

### What contradicts

- `anomaly_model.md` names `p2p-risk-2` as the current version and reports accuracy 94%. `evaluation.csv` stores a higher accuracy on v2 (`0.94`) than on v1 (`0.91`) and a higher false-positive rate on v2 (`0.24`) than on v1 (`0.18`). Paths: `05_procure_to_pay_exception_repo_1_0/03_detection_models/anomaly_model.md`; `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`
- v1 has precision `0.52` and recall `0.71`. v2 precision and recall cells are blank. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`
- `09_ai_risk_security_observability/metrics.md` lists false positive rate under `Missing`. `evaluation.csv` already stores false-positive rate for both versions. Paths: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/metrics.md`; `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`

### What is missing

- Precision and recall for `p2p-risk-2`. Blank in `evaluation.csv`. `anomaly_model.md` says “No precision/recall attached.”
- Independent validation. `anomaly_model.md` says “No independent validation.” Status: Missing.
- Evaluation for high-value vs low-value transactions. `anomaly_model.md` says none. Status: Missing.
- Analysis of false blocks by supplier category. `anomaly_model.md` says none. Status: Missing.
- AUC, PR-AUC, catch rate, and segment performance. Missing from both files in this folder.
- Feature definitions, training-file path, label source, and class mix. Missing.
- A stored model score on INV-1001 to INV-1004. Missing from `02_data_evidence/invoices.csv` and from `07_explainability_review/sample_decisions.txt`.
- Scorer-down behaviour. Unknown. `10_production_readiness/test_summary.md` lists model outage under `Not tested`.

---

## Spine 4 — Documents, identity, and compliance signals

Folder: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance`

### What exists

- OCR note. OCR is software that reads text from a document image. It extracts invoice number, supplier name, amount, tax ID, PO, and bank details. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/invoice_extraction.md`
- Known extract issues: invoice number formatting differs by supplier; supplier aliases cause duplicate misses; bank details are not cryptographically verified; confidence threshold differs between batch and API processing. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/invoice_extraction.md`
- Vendor master change requests are emailed as PDFs. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/vendor_verification.md`
- Out-of-band verification for bank-account changes is inconsistent. Some countries use callback verification; others do not. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/vendor_verification.md`

### What contradicts

- Confidence threshold differs between batch and API processing. The same extract step uses two thresholds. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/invoice_extraction.md`
- `invoice_extraction.md` says supplier aliases cause duplicate misses. `supplier_aliases.csv` stores `V-201` and `V201`. `exception_rules.yaml` lists “no supplier alias normalization” under `gaps`. Paths: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/invoice_extraction.md`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/supplier_aliases.csv`; `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Bank-change requests arrive as emailed PDFs. CH-88 still stores `result=SUCCESS` with requester and approver both `U22`. Paths: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/vendor_verification.md`; `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`

### What is missing

- Extracted field values and confidence scores for INV-1001 to INV-1004. Missing. This folder has notes, not extract rows.
- Cryptographic verification of bank details. `invoice_extraction.md` says it is not done. Status: Missing.
- Consistent out-of-band verification evidence for bank-account changes. `vendor_verification.md` says none. Status: Missing.
- The emailed PDF for CH-88 or CH-89. Missing from the packet.
- A rule that sends a case to a person when extract confidence is uncertain. Missing.
- Callback vs no-callback country list. Missing. `vendor_verification.md` names the split and does not name the countries.

---

## Spine 5 — Workflow orchestration

Folder: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration`

### What exists

- Named path: Supplier Setup → PO → Goods Receipt → Invoice → Approval → Payment. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`
- Non-PO invoice below 5,000 follows expedited approval. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`
- Bank change and payment workflows are separate. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`
- Duplicate check uses invoice number only. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`
- No event correlation across vendor master change and subsequent invoice or payment. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`
- `2026-08-12 11:15 INV-1003 rule=NON_PO_UNDER_5000 result=PROCESS`. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- `2026-08-12 11:16 INV-1004 rule=NON_PO_UNDER_5000 result=PROCESS`. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- `2026-08-12 12:01 INV-1002 duplicate_check=NO_DUPLICATE method=invoice_number_only`. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`

### What contradicts

- `current_flow.md` says duplicate check uses invoice number only. INV-1001 and INV-1002 have different invoice ids, the same supplier, PO, and amount, and both are `PAID`. Paths: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- Bank change and payment are separate. CH-88 at `2026-08-11T13:44:00` changes V-311 bank account. INV-1003 at `2026-08-12 11:15` is `PROCESS` with `bank_changed_30d=Y`. Paths: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- `current_flow.md` says expedited approval below 5,000. `exception_rules.yaml` action is `PROCESS`. `invoices.csv` status is `APPROVED`. Three words for the same two invoices. Paths: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`; `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`

### What is missing

- Event correlation between CH-88 and INV-1003 / INV-1004. `current_flow.md` says none. Status: Missing.
- A processing-log line for INV-1001. Missing.
- Goods receipt records on the named path. Missing in folder `02_data_evidence`.
- Payment-release log after status `PAID`. Missing.
- Retry handling, an idempotency key, timeouts, and a fallback path. Missing. An idempotency key is a stored case-id-plus-step name that stops a retry from paying twice. Repo 1.0 does not store one.
- Persisted workflow state between bank-change and invoice. Missing.
- Scorer-down and queue-outage behaviour. Unknown. Both are listed under `Not tested` in `10_production_readiness/test_summary.md`.

---

## Spine 6 — Governed decisioning

Folder: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning`

### What exists

- Rule: if `duplicate_invoice_number == true` then `BLOCK`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Rule: if `bank_changed_30d == true` and `amount > 10000` then `REVIEW`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Rule: if `po == ""` and `amount < 5000` then `PROCESS`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Named gaps: no split-invoice aggregation; no requester/approver conflict rule; no supplier alias normalization; no rule precedence. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Approval matrix row: amount_limit `5000`, required_role `AP_SUPERVISOR`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/approval_matrix.csv`
- Approval matrix row: amount_limit `10000`, required_role `FINANCE_MANAGER`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/approval_matrix.csv`
- Approval matrix row: amount_limit `50000`, required_role `FINANCE_DIRECTOR`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/approval_matrix.csv`

### What contradicts

- `approval_matrix.csv` names `AP_SUPERVISOR` at amount_limit `5000`. `exception_rules.yaml` says `PROCESS` when PO is empty and amount is under 5000. INV-1003 and INV-1004 are 4950 with empty PO and result `PROCESS`. Paths: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/approval_matrix.csv`; `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- Bank-change REVIEW fires only when `amount > 10000`. INV-1003 and INV-1004 have `bank_changed_30d=Y` and amount 4950 each. Pair total 9900. All three numbers sit at or under 10000. Result is `PROCESS`. Paths: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- `exception_rules.yaml` can `BLOCK` on `duplicate_invoice_number`. The live check method is `invoice_number_only`. INV-1002 is `NO_DUPLICATE`. Paths: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- `PROCESS` is the rule action. Trainer-required later names are `APPROVE` / `REVIEW` / `REJECT`. Path for current word: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`. Path for trainer names: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`

### What is missing

- Split-invoice aggregation. Named under `gaps`. Status: Missing.
- Requester/approver conflict rule. Named under `gaps`. Status: Missing.
- Supplier alias normalization. Named under `gaps`. Status: Missing.
- Rule precedence. Named under `gaps`. Status: Missing. If two rules could fire, the file does not say which wins.
- Meaning of `amount_limit` on `approval_matrix.csv` (whether 4950 needs `AP_SUPERVISOR`). Missing. The file stores the number 5000 and the role name. It does not define inclusive vs exclusive.
- An owner column on `approval_matrix.csv`. Missing.
- Mapping from `PROCESS` / `BLOCK` / `REVIEW` to `APPROVE` / `REVIEW` / `REJECT`. Missing in Repo 1.0.
- A named person who must decide a `REVIEW`. Missing.

---

## Spine 7 — Explainability and review

Folder: `05_procure_to_pay_exception_repo_1_0/07_explainability_review`

### What exists

- `INV-1003: PROCESS - under threshold.` Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`
- `INV-1004: PROCESS - under threshold.` Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`
- `INV-1002: PROCESS - duplicate rule not triggered.` Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`
- Note: no linked evidence, model contribution, rule version, or reviewer explanation is retained. Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`
- Manual review queue is an email inbox. Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/escalation_notes.md`
- No structured disposition. Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/escalation_notes.md`
- No standardized reason codes. Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/escalation_notes.md`
- No feedback loop from confirmed fraud / false alarm to the model dataset. Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/escalation_notes.md`

### What contradicts

- `sample_decisions.txt` stores INV-1002 as `PROCESS`. `invoices.csv` stores INV-1002 status `PAID`. Paths: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- `sample_decisions.txt` stores INV-1003 and INV-1004 as `PROCESS`. `invoices.csv` stores status `APPROVED`. Paths: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- Reason text “under threshold” does not name which threshold. `exception_rules.yaml` has both `amount < 5000` and `amount > 10000`. Path for the reason: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`. Path for the two amounts: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`

### What is missing

- Linked evidence, model contribution, rule version, reviewer explanation. `sample_decisions.txt` says none are retained. Status: Missing.
- A decision line for INV-1001. Missing.
- Structured disposition, standardized reason codes, and a model feedback loop. `escalation_notes.md` says none. Status: Missing.
- A contest path for a supplier or an AP analyst. Missing.
- Reviewer name, review time, and agree / disagree action on any case. Missing.
- Queue outage behaviour. Unknown. `10_production_readiness/test_summary.md` lists queue outage under `Not tested`.

---

## Spine 8 — Compliance and audit

Folder: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit`

### What exists

- P2P-01 Duplicate invoice check. Owner `AP`. Status `Active`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- P2P-02 Supplier bank change approval. Owner `Master Data`. Status `Partial`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- P2P-03 Segregation of duties. Owner `Finance Controls`. Status `Manual`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- P2P-04 Non-PO exception review. Owner `Procurement`. Status `Inconsistent`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- P2P-05 Immutable payment decision evidence. Owner `TBD`. Status `Missing`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- `2026-08-11T13:44:00 vendor_change=CH-88 requester=U22 approver=U22 result=SUCCESS`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`
- `2026-08-12T11:15:03 invoice=INV-1003 action=PROCESS`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`
- Note: no vendor-change evidence linked to payment decision. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`

### What contradicts

- P2P-01 status `Active`. INV-1002 `duplicate_check=NO_DUPLICATE` with method `invoice_number_only`. INV-1001 and INV-1002 both `PAID` at 9800 USD. Paths: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- P2P-02 status `Partial`. CH-88 bank change `result=SUCCESS` with the same user as requester and approver. Paths: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`; `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`
- P2P-03 status `Manual`. CH-88 still completed with requester `U22` and approver `U22`. Paths: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`; `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`
- P2P-04 status `Inconsistent`. INV-1003 and INV-1004 `PROCESS` as `NON_PO_UNDER_5000`. Paths: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- P2P-05 status `Missing`. Spine 8 still stores two audit lines. Those lines omit model version, rule version, and a link from CH-88 to INV-1003. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`

### What is missing

- P2P-05 immutable payment decision evidence. Status Missing. Owner TBD. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- Vendor-change evidence linked to the payment decision. `audit_extract.log` says none. Status: Missing.
- Audit lines for INV-1001, INV-1002, INV-1004, and CH-89. Missing from `audit_extract.log`.
- Model version, rule version, inputs, prompts, workflow state, and named human action on the audit row. Missing.
- A person named as P2P-05 owner. The cell is `TBD`. Status: Missing.

---

## Spine 9 — AI risk, security, and observability

Folder: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability`

### What exists

- Tracked: invoice processing time; touchless processing rate; overdue invoices. The file does not define what counts as touchless. Write Unknown for that definition. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/metrics.md`
- Listed as missing from tracking: prevented duplicate value; split-invoice detection; risky bank changes; SoD violations; model/rule override rate; false positive rate; audit completeness. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/metrics.md`
- AP analysts can view bank details. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`
- Some vendor-master users also hold payment-processing roles. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`
- No continuous SoD monitoring. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`
- Model scoring API key is shared across two environments. An API key is a secret that programs send when they call the scoring URL. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`

### What contradicts

- `metrics.md` tracks touchless processing rate. `metrics.md` does not track prevented duplicate value. INV-1001 and INV-1002 are both `PAID`. Paths: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/metrics.md`; `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- `metrics.md` lists false positive rate as missing from operations tracking. `evaluation.csv` stores `0.18` and `0.24`. Paths: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/metrics.md`; `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`
- P2P-03 owner is `Finance Controls` and status is `Manual`. `access_review.md` says some vendor-master users also hold payment-processing roles and there is no continuous SoD monitoring. Paths: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`; `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`

### What is missing

- Operational tracking of prevented duplicate value, split-invoice detection, risky bank changes, SoD violations, model/rule override rate, false positive rate, and audit completeness. Listed under `Missing` in `metrics.md`. Status: Missing.
- Continuous SoD monitoring. `access_review.md` says none. Status: Missing.
- Separate model API keys per environment. Missing. The file says one key is shared across two environments.
- Named environments. Missing. The file says “two environments” and does not name them.
- Access-review date and reviewer name. Missing.
- Drift monitoring. Missing from `metrics.md`.

---

## Spine 10 — Production readiness

Folder: `05_procure_to_pay_exception_repo_1_0/10_production_readiness`

### What exists

- Rules are edited in a shared configuration file. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/deployment.md`
- Model deployed manually. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/deployment.md`
- Current tests: valid PO invoice; missing PO under threshold; exact invoice-number duplicate. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`

### What contradicts

- `test_summary.md` includes “missing PO under threshold” as a current test. INV-1003 and INV-1004 are empty-PO 4950 rows with `PROCESS`. A green test on that path can lock the expedite behaviour. Paths: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- `test_summary.md` includes “exact invoice-number duplicate” as a current test. INV-1002 has a different invoice number from INV-1001 and is `NO_DUPLICATE`. Paths: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- `deployment.md` says there is no approval gate for rule threshold changes. `exception_rules.yaml` stores amount `5000` and amount `10000`. Paths: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/deployment.md`; `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`

### What is missing

- Infrastructure as code (IaC). IaC means the cloud setup is written as files a program can apply. `deployment.md` says none. Status: Missing.
- Release evidence pack. `deployment.md` says none. Status: Missing.
- Approval gate for rule threshold changes. `deployment.md` says none. Status: Missing.
- Tests not present: supplier alias duplicate; split invoices; same user requester/approver; bank change immediately before payment; model outage; queue outage; rollback; peak volume. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`
- Scorer-down behaviour. Unknown. Model outage is not tested. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`

---

## How to use these notes

Conflict rows with a named chooser sit in `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md`.

Missing-control rows sit in `D1_AsIs_Assessment/04_MISSING_CONTROLS.md`.

Case numbers replayed from source files sit in `D1_AsIs_Assessment/02_CASE_REPLAY.md`.
