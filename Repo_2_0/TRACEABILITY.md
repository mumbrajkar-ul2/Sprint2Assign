# Traceability — D1 ids to Repo 2.0

This file maps each D1 conflict, missing-control, matrix row, and RCTE row to a Repo 2.0 file. A gap stays visible until a file says how it closes or marks it still open.

D1 sources:

- Conflicts: `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md`
- Missing controls: `D1_AsIs_Assessment/04_MISSING_CONTROLS.md`
- RCTE: `D1_AsIs_Assessment/06_RCTE_ROWS.md`
- Locked facts: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`

## Conflicts

| D1 id | What disagrees | Repo 2.0 file | Close or still open |
|---|---|---|---|
| C-01 | Approval matrix 5000 vs non-PO PROCESS under 5000. INV-1003 / INV-1004 PROCESS at 4950. | `06_governed_decisioning.md` | Closed as design: expedite retired. Empty PO → REVIEW. Amount line `THRESHOLD_UNSET`. Chooser (Procurement and AP_SUPERVISOR) still signs the D3 ADR. |
| C-02 | Invoice splitting named vs no aggregation rule. Pair 9900 PROCESS. | `06_governed_decisioning.md`, `02_case_data_evidence.md` | Closed as design: named sibling pair INV-1003 / INV-1004 stored. Pair → REVIEW. Sibling-time window `THRESHOLD_UNSET`. |
| C-03 | CH-88 same user vs no SoD rule. | `06_governed_decisioning.md`, `01_decision_risk_boundary.md` | Closed as design: R-SOD-BANK. Change does not auto-apply. |
| C-04 | p2p-risk-2 accuracy headline vs worse false-positive rate and blank precision / recall. | `03_detection_models.md` | Closed as headline. Live version still open. Model owner Missing until D3. |
| C-05 | P2P-01 Active vs INV-1002 paid pair. | `06_governed_decisioning.md`, `10_production_readiness.md` | Closed as design: match supplier + PO + amount. T-FN-02. |
| C-06 | Status words PAID / APPROVED / PROCESS vs trainer APPROVE / REVIEW / REJECT. | `01_decision_risk_boundary.md`, `06_governed_decisioning.md` | Closed as design: three trainer names only. `PROCESS` retired. |
| C-07 | Bank-change REVIEW only above 10000 vs INV-1003 flagged Y at 4950. | `06_governed_decisioning.md` | Closed as design: linked bank change → REVIEW. 10000 stays As-Is. New gate `THRESHOLD_UNSET`. |
| C-08 | `V-201` vs `V201` names. | `02_case_data_evidence.md`, `04_document_identity_compliance.md` | Closed as design for matching. Live ERP merge still needs AP and Master Data in D3. |
| C-09 | Touchless rate tracked vs prevented-duplicate value not tracked. | `09_ai_risk_security_observability.md` | Closed as watch list. Touchless definition still Unknown. |
| C-10 | Passing tests vs untested miss paths. | `10_production_readiness.md` | Closed as catalog. Peak volume still has no number. |
| C-11 | Manual SoD vs overlapping payment roles. | `09_ai_risk_security_observability.md` | Closed as access rule. Per-user matrix still Missing. |
| C-12 | AI as payment authorization vs no blocking control. | `01_decision_risk_boundary.md`, `06_governed_decisioning.md` | Closed as design: prohibited automation. Payer name still Missing until D3. |

## Control matrix rows

| Id | As-Is | Repo 2.0 file | Close or still open |
|---|---|---|---|
| P2P-01 | Active. Method invoice_number_only missed INV-1002. | `06_governed_decisioning.md`, `10_production_readiness.md` | Method replaced in design. Owner remains AP. |
| P2P-02 | Partial. CH-88 SUCCESS. | `04_document_identity_compliance.md`, `06_governed_decisioning.md`, `08_compliance_audit.md` | Same-user auto-apply removed. Out-of-band country list still Unknown. |
| P2P-03 | Manual. | `06_governed_decisioning.md`, `09_ai_risk_security_observability.md` | Flag at change time. Continuous watch designed. Role overlap still to be removed in operations. |
| P2P-04 | Inconsistent. | `06_governed_decisioning.md` | Empty PO and split pair → REVIEW. 5000 not adopted. |
| P2P-05 | Missing. Owner TBD. | `08_compliance_audit.md` | Store and write-first order designed. Owner still TBD until D3 ADR. |

## Missing controls the matrix omitted

| D1 id | Gap | Repo 2.0 file | Close or still open |
|---|---|---|---|
| M-01 | Split-invoice aggregation | `06_governed_decisioning.md` | Closed as design. |
| M-02 | Requester / approver conflict rule | `06_governed_decisioning.md` | Closed as design. |
| M-03 | Supplier alias normalization | `02_case_data_evidence.md`, `04_document_identity_compliance.md` | Closed as matching rule. ERP merge still open. |
| M-04 | Rule precedence | `06_governed_decisioning.md` | Closed as design. |
| M-05 | Event correlation and link to payment | `05_workflow.md`, `08_compliance_audit.md` | Closed as design. |
| M-06 | Stop AI as payment authorization | `01_decision_risk_boundary.md` | Closed as design. |
| M-07 | Named person for payment execute | `01_decision_risk_boundary.md` | Still open. D3 ADR names the person. |
| M-08 | Scorer-down path | `05_workflow.md`, `03_detection_models.md` | Closed as design: REVIEW, unscored. |
| M-09 | Queue-outage path | `05_workflow.md`, `10_production_readiness.md` | Closed as design: persist and resume. |
| M-10 | Structured disposition, reason codes, contest | `07_explainability_review.md` | Closed as design. Reviewer name still Missing. |
| M-11 | Linked explainability | `07_explainability_review.md`, `08_compliance_audit.md` | Closed as design. |
| M-12 | Independent validation and v2 precision / recall | `03_detection_models.md` | Plan written. Fill and owner still open. |
| M-13 | Operational risk metrics | `09_ai_risk_security_observability.md` | Watch list written. Live numbers later. |
| M-14 | Separate model API keys | `09_ai_risk_security_observability.md` | Rule written. Environment names still Missing. |
| M-15 | Continuous SoD monitoring | `09_ai_risk_security_observability.md` | Watch written. Per-user matrix still Missing. |
| M-16 | Consistent bank-change out-of-band verification | `04_document_identity_compliance.md` | Uncertain → REVIEW. Country list still Unknown. |
| M-17 | Goods receipt evidence | `02_case_data_evidence.md`, `06_governed_decisioning.md` | Still Missing as a feed. PO without receipt → REVIEW until ADR. |
| M-18 | Idempotency key on payment | `05_workflow.md` | Closed as design. |
| M-19 | Threshold gate, IaC, release pack | `10_production_readiness.md`, `09_ai_risk_security_observability.md` | Designed. Not built. |
| M-20 | Tests omitted in Repo 1.0 | `10_production_readiness.md` | Catalog written. Peak volume number not invented. |
| M-21 | Extract confidence route to a person | `04_document_identity_compliance.md` | Closed as design. Numeric accept line `THRESHOLD_UNSET`. |
| M-22 | Meaning of approval_matrix `amount_limit` | `06_governed_decisioning.md` | Still open. `THRESHOLD_UNSET`. D3 ADR. |

## RCTE rows

Every recommendation keeps Risk, Control, Test, and Evidence. Detail sits in the spine file.

| RCTE | Control in Repo 2.0 | Test id | Evidence |
|---|---|---|---|
| RCTE-01 | R-DUP | T-FN-02 | Audit row with both invoice ids, method, 9800 |
| RCTE-02 | Alias canonical join | T-FN-04 | Raw ids plus canonical id |
| RCTE-03 | R-SOD-BANK | T-FN-07 | CH-88 requester, approver, result held |
| RCTE-04 | R-BANK-SPLIT | T-FN-06, T-FN-09 | CH-88 linked to INV-1003 and INV-1004, pair 9900 |
| RCTE-05 | R-NONPO | T-FN-05 | Empty PO, REVIEW, no PROCESS |
| RCTE-06 | Prohibited automation | T-AD-05 | Recommendation stored. `PAID` only after named payer |
| RCTE-07 | Evaluation headline | `03_detection_models.md` plan | Precision, recall, FPR, later PR-AUC |
| RCTE-08 | Unscored REVIEW | T-FL-01 | `scorer_status=unscored` |
| RCTE-09 | P2P-05 write-first | T-IN-03, T-CO-01, T-CO-05 | Audit row then `PAID` |
| RCTE-10 | Separate keys and role split | `09_ai_risk_security_observability.md` | Call identity, role attestation |
| RCTE-11 | Persisted REVIEW | T-HV-01 to T-HV-05 | Reviewer, times, disposition |
| RCTE-12 | Rule-change gate | T-RB-01, T-RB-03 | Pack version, ADR for numbers |
| RCTE-13 | Uncertain extract → REVIEW | T-FL-03 | Extract fields and confidence |

## What a reviewer should still see as open

These D1 gaps remain visible on purpose.

1. Regulatory obligations: Unknown. CR-REG-01.
2. Sanctions / PEP / address: Unknown.
3. Geography feed: Unknown.
4. Goods-receipt feed: Missing.
5. Model owner, data owner, REVIEW person, payer, P2P-05 owner: Missing or TBD.
6. Every new amount, timeout, retention, contest window, and sibling-time window: `THRESHOLD_UNSET`.
7. v2 precision and recall: blank until filled.
8. Peak-volume number: not invented.

D1 files were not edited. Repo 1.0 files were not edited.
