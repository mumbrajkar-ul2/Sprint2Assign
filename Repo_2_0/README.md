# Repo 2.0 — Procure-to-Pay Exception and Payment-Control

This folder is Deliverable 2. It is the To-Be design for the payment-control system.

Repo 1.0 stays as evidence. Path: `05_procure_to_pay_exception_repo_1_0`. D1 stays as the As-Is reading. Path: `D1_AsIs_Assessment`. This folder does not edit those files.

Event: a supplier invoice that may lead to payment. Irreversible action: payment. INV-1001 and INV-1002 are already `PAID` in the inherited files. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

Outcomes in this design are `APPROVE`, `REVIEW`, and `REJECT` only. Written policy picks the outcome. A named person owns every `REVIEW`. The model ranks the case. The model does not release payment.

`PROCESS` is Repo 1.0 language. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`. This design does not keep `PROCESS` as an outcome.

## How to read this pack

Read `01_decision_risk_boundary.md` first. Then walk files 02 through 10. Use `TRACEABILITY.md` to map each D1 conflict and missing-control id to a file here.

Every recommendation keeps Risk, Control, Test, and Evidence visible. Source rows: `D1_AsIs_Assessment/06_RCTE_ROWS.md`.

## Honesty

Numbers copied from Repo 1.0 or D1 are **PRECOMPUTED**. A later live app may mark a computed value **REAL**. A stand-in for a service this packet does not call is **SIMULATED**. A classroom-only figure is **EDUCATIONAL**.

Anomaly scores are an uncalibrated ranking. They are not a percent chance of fraud.

## Amount lines in the inherited files

These numbers are As-Is behaviour. They are not the To-Be cutoff.

| Inherited number | Where it appears today | Honesty |
|---|---|---|
| 5000 | Non-PO expedite and AP_SUPERVISOR line. Paths: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`; `approval_matrix.csv` | PRECOMPUTED |
| 10000 | Bank-change REVIEW line and FINANCE_MANAGER line. Same folder. | PRECOMPUTED |
| 9800 | INV-1001 and INV-1002 amount. Path: `02_data_evidence/invoices.csv` | PRECOMPUTED |
| 4950 + 4950 = 9900 | INV-1003 and INV-1004. Same path. | PRECOMPUTED |

If a new amount line is required, this design writes `THRESHOLD_UNSET`. An Architecture Decision Record (ADR) in D3 must name an owner before anyone codes that line.

## Spine files and the D1 gap each one closes

| Spine | Repo 2.0 file | D1 gap it closes | What stays open |
|---|---|---|---|
| 1 Decision, risk, boundary | `01_decision_risk_boundary.md` | Trainer outcomes missing. No risk appetite. No prohibited-automation list. AI used as payment authorization (C-12, M-06, RCTE-06). | Regulatory obligations stay **Unknown** until change-request CR-REG-01 returns an answer. REVIEW owner name stays Missing until the D3 ADR. |
| 2 Case, data, evidence | `02_case_data_evidence.md` | Alias join missing (M-03, C-08). Goods receipt missing (M-17). No label column. No payment-release actor (M-07). Weak lineage. | Goods-receipt feed stays Missing. Confirmed-fraud labels stay a later job for a named data owner. |
| 3 Detection models | `03_detection_models.md` | Accuracy used as the headline (C-04, RCTE-07, M-12). v2 precision and recall blank. No independent validation. | Training on representative labelled data stays a later job. Model owner and data owner stay Missing until D3 names them. |
| 4 Documents and identity | `04_document_identity_compliance.md` | Alias misses. Two extract confidence lines (M-21). Bank details not verified. Uncertain extract has no person route. | Sanctions, PEP, and address stay **Unknown**. Country callback list stays Missing. Cryptographic bank proof stays Missing. |
| 5 Workflow | `05_workflow.md` | No event correlation (M-05). No retry key (M-18). Bank change and payment sit in separate flows. Scorer-down Unknown (M-08). Queue-outage Unknown (M-09). | Goods-receipt step stays Missing as a live feed. |
| 6 Governed decisioning | `06_governed_decisioning.md` | `PROCESS` under 5000 (C-01, C-07). No split rule (C-02, M-01). No SoD rule (C-03, M-02). No alias rule (M-03). No precedence (M-04). Outcome words disagree (C-06). | Amount cutoffs stay `THRESHOLD_UNSET` until a D3 ADR. Auto-REJECT conditions stay unset until that ADR. |
| 7 Explainability and review | `07_explainability_review.md` | Email inbox. No reason codes. No linked evidence (M-10, M-11, RCTE-11). No contest path. | Feedback into a labelled training set waits for the data owner. |
| 8 Compliance and audit | `08_compliance_audit.md` | P2P-05 Missing (RCTE-09). Vendor change not linked to the payment decision (M-05). | Geography feed stays **Unknown**. A numeric velocity cutoff stays `THRESHOLD_UNSET`. P2P-05 owner stays TBD until D3. |
| 9 Risk, security, observability | `09_ai_risk_security_observability.md` | Shared model API key (M-14, RCTE-10). Vendor-master users also pay (C-11, M-15). Risk metrics not tracked (C-09, M-13). | Environment names stay Missing until operations names them. Drift action is investigate first. Retrain is a later job. |
| 10 Production readiness | `10_production_readiness.md` | Tests omit alias, split, same-user, bank-then-pay, outage, rollback (C-10, M-20). No IaC, no release pack, no threshold gate (M-19, RCTE-12). | Peak-volume numbers stay EDUCATIONAL until a measured run exists. |

## What this design must solve

These items come from the runbook P2P list and the locked D1 cases.

1. Duplicate invoices. INV-1001 and INV-1002 share supplier `V-201`, PO `PO-7001`, and amount 9800. Both are `PAID`. The live check used `invoice_number_only` and stored `NO_DUPLICATE` on INV-1002. Paths: `D1_AsIs_Assessment/02_CASE_REPLAY.md`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`.
2. Alias ids `V-201` and `V201`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/supplier_aliases.csv`.
3. Anomalous pricing. Repo 1.0 names the risk and lists `amount` as a model feature. No price catalog sits in the packet. Detection stays a ranking plus REVIEW. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/anomaly_model.md`.
4. Supplier-master manipulation. CH-88 requester and approver are both `U22`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`.
5. Approval bypass. INV-1003 and INV-1004 are empty-PO 4950 rows with `bank_changed_30d=Y` and result `PROCESS`. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`.
6. Split invoices around the As-Is 5000 line. Pair total 9900. The 5000 line stays As-Is evidence.
7. Segregation of duties. Same-user bank change. Vendor-master users who also pay. Paths: `vendor_master_changes.csv`; `09_ai_risk_security_observability/access_review.md`.
8. Evidence linked from vendor change to payment decision. Path: `08_compliance_audit/audit_extract.log`.
9. Human escalation a person can finish. Path: `07_explainability_review/escalation_notes.md`.

## Wave 1 stance this design implements on paper

1. Stop using an AI recommendation as payment authorization. Source: `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md`.
2. Send bank-change-plus-split cases to a person. Worked case: CH-88 then INV-1003 and INV-1004.

## Files in this folder

| File | Spine |
|---|---|
| `01_decision_risk_boundary.md` | 1 |
| `02_case_data_evidence.md` | 2 |
| `03_detection_models.md` | 3 |
| `04_document_identity_compliance.md` | 4 |
| `05_workflow.md` | 5 |
| `06_governed_decisioning.md` | 6 |
| `07_explainability_review.md` | 7 |
| `08_compliance_audit.md` | 8 |
| `09_ai_risk_security_observability.md` | 9 |
| `10_production_readiness.md` | 10 |
| `TRACEABILITY.md` | D1 id → this folder |

## Done test for this pack

A reviewer can map each of the ten spine steps to a file in this folder. No new cutoff is set. Each D1 gap is either closed by a named file or marked still open.
