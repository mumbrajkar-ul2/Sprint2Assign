# 9 — AI risk, security, and observability

This file is the To-Be operating design for the model, access, and watches.

It closes D1 spine 9 gaps: no model owner, shared API key, vendor-master users who also pay, no continuous SoD watch, risk metrics not tracked, no drift watch. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 9; `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-09, C-11; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-13, M-14, M-15; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-07, RCTE-10.

## Model ownership

Repo 1.0 does not name a model owner. Status: Missing. Path: `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-04.

An ADR in D3 must name the model owner. Until that ADR exists, AP remains the nearest named owner because AP owns P2P-01. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`. AP is not invented here as the model owner. The ADR names the person.

The data owner for labels is also Missing. The same ADR names that person. Training on representative labelled data stays a later job. See `03_detection_models.md`.

## Model card (To-Be)

| Card field | Value now | Honesty |
|---|---|---|
| Purpose | Rank procure-to-pay exception cases for a person. | EDUCATIONAL until a live card is signed |
| Not for | Payment authorization. Auto APPROVE or auto REJECT. | Rule |
| Versions in the packet | `p2p-risk-1`, `p2p-risk-2` | PRECOMPUTED |
| Features listed | amount, supplier age, bank change, approval count, `non_po_flag`, `duplicate_score` | Copied from `anomaly_model.md` |
| Precision / recall / false-positive rate | See `03_detection_models.md` | PRECOMPUTED |
| Independent validation | Missing | Missing |
| Class mix | Unknown | Unknown |
| Score caption | Uncalibrated ranking | Rule |

Change of live version needs written approval from the model owner named in D3. `deployment.md` says the model is deployed by hand and there is no approval gate for rule threshold changes. To-Be requires that gate. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/deployment.md`.

## Validation evidence

Required before a version is named current:

1. Precision, recall, and false-positive rate stored. v2 blanks must be filled.
2. PR-AUC or AUC stored.
3. Independent validation record with a name and a date.
4. Segment notes or an explicit Unknown for high-value vs low-value.
5. Residual-miss note on the packet patterns (duplicate, alias, same-user, split).

`evaluation.csv` already shows the blank v2 cells. That file is the current evidence that v2 is not ready to be treated as quality-proven.

## Change approvals

| Change | Who approves | Gate |
|---|---|---|
| Rule amount line | Owner named in a D3 ADR. Until then the line stays `THRESHOLD_UNSET`. | No edit to a live number without the ADR. |
| Rule condition (no number) | Finance Controls plus the control owner in `control_matrix.csv` | Versioned rule pack. Pull request. |
| Model version | Model owner named in D3 | Evaluation file attached. |
| Prompt used to draft reviewer text | Model owner | Prompt id and hash stored on the audit row. |
| Access role | Finance Controls (P2P-03) | SoD check must pass. |

Policy is enforced in the API and the rule pack. Policy does not live only in a prompt.

## Access controls

As-Is facts. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`.

1. AP analysts can view bank details.
2. Some vendor-master users also hold payment-processing roles.
3. No continuous SoD monitoring.
4. Model scoring API key is shared across two environments. The environments are not named.

To-Be:

| Control | Behaviour |
|---|---|
| Bank details | Masked by default. Full account visible only to Master Data and to a named REVIEW owner on a case that needs it. View is logged. |
| Vendor-master vs payment | One person cannot hold both roles. Finance Controls owns the check (P2P-03). |
| Same-user change | Blocked from auto-apply. See R-SOD-BANK. |
| Model API keys | One secret per named environment. Rotate the shared key. Environment names stay Missing until operations names them. D3 records those names. |
| Scoring call identity | Store which identity called score. |

Access-review date and reviewer name are Missing in Repo 1.0. To-Be stores both on each review.

## What operations watches

Repo 1.0 tracks invoice processing time, touchless processing rate, and overdue invoices. It does not define touchless. Write Unknown for that definition. Path: `metrics.md`.

To-Be watches the Missing list plus failure and latency. Touchless rate may stay on the board only after someone defines it in D3. It is not the quality headline.

| Watch | Why | Honesty at first demo |
|---|---|---|
| Precision, recall, false-positive trend | v2 FPR 0.24 vs v1 0.18. v2 precision and recall blank. | PRECOMPUTED for the csv cells. REAL later. |
| Catch rate on named patterns | Duplicate, alias, same-user, split | EDUCATIONAL on this packet |
| Residual miss | Bad pays that still leave | REAL later |
| REVIEW staffing and time to close | SLA harm to a supplier | REAL later |
| Override rate | Person disagrees with the recommendation | REAL later |
| Unscored rate | Scorer down path | REAL later |
| Audit completeness | Share of PAID cases with an audit row written first | REAL later |
| Prevented duplicate value | 9800 would be the packet illustration if INV-1002 had been held | EDUCATIONAL on the packet |
| Split-invoice detection count | INV-1003 / INV-1004 pair | EDUCATIONAL then REAL |
| Risky bank changes | CH-88 style | EDUCATIONAL then REAL |
| SoD violations | Same-user and role overlap | EDUCATIONAL then REAL |
| Data-quality fail rate | Extract uncertain, alias unresolved | REAL later |
| Latency per step | Ingest through Decide | REAL later |
| Failure rates | Extract, score, queue, payment key clashes | REAL later |
| Compliance-control alerts | `ESC_*` events in file 08 | REAL later |

Do not lead the operating board with accuracy 0.94.

Infra charts (CPU, uptime) may exist. They are not the AI watch list.

## Drift and retrain

If a drift chart moves, investigate first. Do not retrain from a drift number alone. Wait for delayed labels from the named data owner.

## Shared key and SoD overlap — required close

These two D1 facts must be addressed before production handover.

1. Shared model API key. Replace with one key per environment after operations names the environments. Store the call identity.
2. Vendor-master users who also pay. Finance Controls removes the overlap. Continuous SoD monitoring writes `sod_vendor_and_pay_overlap` on the case when a listed user appears as payer.

CH-88 still shows why the overlap matters: U22 requested and approved the bank change and is also the approver on INV-1003 and INV-1004.

## What stays open

- Model owner and data owner: Missing. D3 ADR.
- Environment names: Missing.
- Touchless definition: Unknown.
- Drift action: investigate first. Retrain later.
