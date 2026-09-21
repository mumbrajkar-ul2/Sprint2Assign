# D1 missing-control register

If a control is not evidenced in the files, it does not exist. This file writes Missing.

Section A copies `control_matrix.csv`. Section B lists gaps that matrix does not name.

This file does not invent an owner. Where the matrix stores `TBD`, this file keeps `TBD`. Where no owner exists, this file writes Missing.

---

## A. Rows from `control_matrix.csv`

Source path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`

### P2P-01 Duplicate invoice check

| Cell | Value in the file |
|---|---|
| control_id | P2P-01 |
| control | Duplicate invoice check |
| owner | AP |
| status | Active |

What the runtime shows: INV-1002 `duplicate_check=NO_DUPLICATE` `method=invoice_number_only`. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`. INV-1001 and INV-1002 both `PAID` at 9800 USD, same supplier, same PO. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`.

Control covering supplier + PO + amount match: Missing. Alias-aware duplicate check: Missing. See `exception_rules.yaml` gap “no supplier alias normalization”. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`.

---

### P2P-02 Supplier bank change approval

| Cell | Value in the file |
|---|---|
| control_id | P2P-02 |
| control | Supplier bank change approval |
| owner | Master Data |
| status | Partial |

What the runtime shows: CH-88 requester `U22`, approver `U22`, `result=SUCCESS`. Paths: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`; `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`.

Consistent out-of-band verification evidence: Missing. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/vendor_verification.md`. Cryptographic verification of bank details: Missing. Path: `05_procure_to_pay_exception_repo_1_0/04_document_identity_compliance/invoice_extraction.md`. Link from vendor-change evidence to the payment decision: Missing. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`.

---

### P2P-03 Segregation of duties

| Cell | Value in the file |
|---|---|
| control_id | P2P-03 |
| control | Segregation of duties |
| owner | Finance Controls |
| status | Manual |

What the files show: no requester/approver conflict rule. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml` `gaps`. No continuous SoD monitoring. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`. Some vendor-master users also hold payment-processing roles. Same path.

Automated SoD block at change time: Missing. Continuous SoD monitoring: Missing.

`business_problem.md` says some segregation-of-duties controls are detected later by Internal Audit. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md`. That later detection is named in a note. It is not evidenced as a stored control row beyond P2P-03 Manual.

---

### P2P-04 Non-PO exception review

| Cell | Value in the file |
|---|---|
| control_id | P2P-04 |
| control | Non-PO exception review |
| owner | Procurement |
| status | Inconsistent |

What the runtime shows: INV-1003 and INV-1004 `rule=NON_PO_UNDER_5000` `result=PROCESS`. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`. Split-invoice aggregation: Missing. Path: `exception_rules.yaml` `gaps`. Event correlation from CH-88 to these invoices: Missing. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`.

---

### P2P-05 Immutable payment decision evidence

| Cell | Value in the file |
|---|---|
| control_id | P2P-05 |
| control | Immutable payment decision evidence |
| owner | TBD |
| status | Missing |

This is the matrix row the assignment asked D1 to copy. Status Missing. Owner TBD. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`.

`audit_extract.log` stores two lines and a note that vendor-change evidence is not linked to the payment decision. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`. Those lines are not an immutable store. Immutable means the record cannot be overwritten or deleted for the keep period. That store is Missing.

---

## B. Gaps the matrix does not name

Each row is a control the packet needs for the payment decision and that `control_matrix.csv` does not list.

| ID | Gap | Evidence that it is Missing | Nearest named owner in Repo 1.0 |
|---|---|---|---|
| M-01 | Split-invoice aggregation | `exception_rules.yaml` `gaps`: no split-invoice aggregation. INV-1003 + INV-1004 = 9900 both PROCESS. Paths: `06_governed_decisioning/exception_rules.yaml`; `02_data_evidence/invoices.csv`; `05_workflow_orchestration/processing_log.txt` | Procurement (P2P-04). No split-control owner. |
| M-02 | Requester/approver conflict rule on the change | `exception_rules.yaml` `gaps`: no requester/approver conflict rule. CH-88 U22/U22 SUCCESS. Paths: `exception_rules.yaml`; `02_data_evidence/vendor_master_changes.csv` | Finance Controls (P2P-03). Master Data (P2P-02). |
| M-03 | Supplier alias normalization | `exception_rules.yaml` `gaps`: no supplier alias normalization. `supplier_aliases.csv` stores V-201 and V201. Paths: `exception_rules.yaml`; `02_data_evidence/supplier_aliases.csv` | AP (P2P-01). Master Data (P2P-02). |
| M-04 | Rule precedence | `exception_rules.yaml` `gaps`: no rule precedence. Path: `06_governed_decisioning/exception_rules.yaml` | Missing. No precedence owner. |
| M-05 | Event correlation from vendor-master change to invoice/payment | `current_flow.md`: no event correlation. `audit_extract.log`: no vendor-change evidence linked to payment decision. Paths: `05_workflow_orchestration/current_flow.md`; `08_compliance_audit/audit_extract.log` | Master Data (P2P-02). AP (P2P-01). Link itself is Missing. |
| M-06 | Stop AI recommendation as payment authorization | Named as a risk. No control row. Path: `01_decision_risk_boundary/risk_notes.md`; `08_compliance_audit/control_matrix.csv` | Missing. P2P-05 owner TBD. Wave 1 stance recorded in `05_CAPABILITY_SPLIT.md`. |
| M-07 | Named person for payment execute | INV-1001 and INV-1002 are PAID. No payment-release actor on the row. Path: `02_data_evidence/invoices.csv` | Missing. Approver ids U11 and U22 are stored. Who pressed pay is Missing. |
| M-08 | Scorer-down path | Unknown in Repo 1.0. Model outage not tested. Path: `10_production_readiness/test_summary.md`. Locked fact: `00_LOCKED_FACTS.md` | Missing. |
| M-09 | Queue-outage path | Queue outage not tested. Review queue is an email inbox. Paths: `10_production_readiness/test_summary.md`; `07_explainability_review/escalation_notes.md` | Missing. |
| M-10 | Structured review disposition, reason codes, contest path | `escalation_notes.md`: no structured disposition, no standardized reason codes, no feedback loop. `sample_decisions.txt`: no reviewer explanation. Paths: `07_explainability_review/escalation_notes.md`; `07_explainability_review/sample_decisions.txt` | Missing. |
| M-11 | Linked explainability (evidence, model contribution, rule version) | `sample_decisions.txt` says none retained. Path: `07_explainability_review/sample_decisions.txt` | P2P-05 owner TBD. The control row is Missing. |
| M-12 | Independent model validation and v2 precision/recall | `anomaly_model.md`: no independent validation, no precision/recall attached. `evaluation.csv`: v2 precision and recall blank. Paths: `03_detection_models/anomaly_model.md`; `03_detection_models/evaluation.csv` | Missing. No model owner named. |
| M-13 | Operational risk metrics | `metrics.md` Missing list: prevented duplicate value, split-invoice detection, risky bank changes, SoD violations, model/rule override rate, false positive rate, audit completeness. Path: `09_ai_risk_security_observability/metrics.md` | Missing. No metrics owner named. |
| M-14 | Separate model API keys per environment | Model scoring API key shared across two environments. Path: `09_ai_risk_security_observability/access_review.md` | Missing. Environments unnamed. |
| M-15 | Continuous SoD monitoring | `access_review.md` says none. Some vendor-master users also hold payment-processing roles. Path: `09_ai_risk_security_observability/access_review.md` | Finance Controls (P2P-03). Monitoring itself is Missing. |
| M-16 | Consistent bank-change out-of-band verification | `vendor_verification.md`: no consistent out-of-band verification evidence. Some countries use callback; others do not. Path: `04_document_identity_compliance/vendor_verification.md` | Master Data (P2P-02). Consistent evidence is Missing. |
| M-17 | Goods receipt evidence | Path named in `current_flow.md`. No goods-receipt file in `02_data_evidence`. Paths: `05_workflow_orchestration/current_flow.md`; folder `02_data_evidence` | Missing. |
| M-18 | Idempotency key on payment | No payment-retry key stored. INV-1001 and INV-1002 already PAID. Path: `02_data_evidence/invoices.csv`. Retry behaviour: Missing from `current_flow.md` | Missing. |
| M-19 | Approval gate for rule threshold changes; IaC; release evidence pack | All three stated as absent. Path: `10_production_readiness/deployment.md` | Missing. |
| M-20 | Tests for alias, split, same-user, bank-then-pay, model outage, queue outage, rollback, peak volume | Listed under Not tested. Path: `10_production_readiness/test_summary.md` | Missing. |
| M-21 | Extract confidence route to a person | Confidence threshold differs between batch and API. No route named when evidence is uncertain. Path: `04_document_identity_compliance/invoice_extraction.md` | Missing. |
| M-22 | Meaning of approval_matrix `amount_limit` | File stores 5000 / 10000 / 50000 and roles. It does not define inclusive vs exclusive. Path: `06_governed_decisioning/approval_matrix.csv` | Missing. No matrix owner column. |

---

## Worked example for P2P-05

Control P2P-05 is Missing. Owner is TBD.

`audit_extract.log` can still print `invoice=INV-1003 action=PROCESS`. That line does not make the control exist.

A reader who looks for an immutable payment-decision store in Repo 1.0 will not find one.
