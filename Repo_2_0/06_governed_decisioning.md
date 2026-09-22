# 6 — Governed decisioning

This file is the To-Be fusion of anomaly rank, identity evidence, business rules, policy constraints, and contextual risk into APPROVE, REVIEW, or REJECT.

The model ranks. Written policy picks the outcome. A named person owns REVIEW. The model does not make the uncontrolled final payment decision.

It closes D1 spine 6 gaps: `PROCESS` under 5000, bank-change REVIEW only above 10000, no split rule, no SoD rule, no alias rule, no precedence, outcome words disagree. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 6; `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-01, C-02, C-03, C-06, C-07, C-08; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-01, M-02, M-03, M-04, M-06; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-01 through RCTE-06.

## Inputs the policy engine reads

| Input | What it is | Packet example |
|---|---|---|
| Anomaly rank | Uncalibrated ranking, or empty if unscored | No stored rank on the four invoices |
| Identity evidence | Canonical supplier, SoD flag, extract status | CH-88 U22 / U22. `V-201` / `V201` |
| Business-rule flags | Duplicate, alias, non-PO, siblings, bank-change link | INV-1002 duplicate. INV-1003 siblings |
| Policy constraints | Prohibited automation from `01_decision_risk_boundary.md` | AI cannot pay |
| Contextual risk | Linked change, role overlap, scorer status | CH-88 then next-day invoices |

## Outcome names

`APPROVE`, `REVIEW`, `REJECT` only. `PROCESS` is retired.

Until a D3 ADR names auto-REJECT conditions, exception flags produce `REVIEW` and a recommended outcome. A named person can accept the recommendation or reject it. REJECT as a final money outcome is written by the person or by a later ADR.

APPROVE is allowed only when every required check finished and no exception flag is true.

## Policy thresholds

Inherited amount lines stay As-Is evidence. They are not the To-Be cutoff.

| Inherited line | As-Is behaviour | To-Be |
|---|---|---|
| amount under 5000 and empty PO → PROCESS | INV-1003 and INV-1004 both PROCESS | Expedite retired. Empty PO → REVIEW until ADR |
| bank_changed_30d and amount over 10000 → REVIEW | 4950 and pair 9900 stay under that line, so REVIEW does not fire | Amount gate is `THRESHOLD_UNSET`. Linked bank change → REVIEW |
| approval_matrix 5000 / 10000 / 50000 | Roles AP_SUPERVISOR, FINANCE_MANAGER, FINANCE_DIRECTOR | Inclusive vs exclusive is Missing (M-22). Amounts stay `THRESHOLD_UNSET` until ADR. Roles remain as named queues, not new people. |

An Architecture Decision Record in D3 must name an owner before anyone codes a new number.

## Rules that need no new number

These conditions fire from packet facts. Each cites an RCTE row.

| Id | Condition | Recommended outcome | Final outcome until ADR | RCTE |
|---|---|---|---|---|
| R-DUP | Canonical supplier, PO, and amount match a prior invoice. Invoice ids differ. | REJECT the later payment | REVIEW | RCTE-01 |
| R-ALIAS | Raw supplier id has an alias sibling. Match uses the canonical id. | Same as R-DUP if a match appears | REVIEW if unresolved or matched | RCTE-02 |
| R-SOD-BANK | Bank-account change requester equals approver. | REJECT applying the change | REVIEW. Change does not auto-apply. | RCTE-03 |
| R-BANK-SPLIT | Linked bank change and (empty PO or the named sibling pair INV-1003 / INV-1004). A numeric sibling-time window is `THRESHOLD_UNSET`. | REJECT silent pay | REVIEW | RCTE-04 |
| R-NONPO | PO empty. | REVIEW | REVIEW | RCTE-05 |
| R-SCORED-ONLY | Anomaly rank present and no other flag. | REVIEW | REVIEW. Rank alone cannot APPROVE or REJECT. | RCTE-06, RCTE-07 |
| R-UNSCORED | Scorer failed or timed out. | REVIEW | REVIEW. Case unscored. | RCTE-08 |
| R-EXTRACT | `extract_status=uncertain` | REVIEW | REVIEW | RCTE-13 |
| R-GR | PO present and goods receipt Missing | REVIEW | REVIEW until ADR says a PO invoice may proceed without a receipt | M-17 |

Wave 1 stance: stop AI authorization. Send bank-change-plus-split cases to a person. R-BANK-SPLIT and R-SOD-BANK implement that stance.

## Precedence

Repo 1.0 lists “no rule precedence” under `gaps`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`.

To-Be order. The first matching row wins the recommended outcome. The final outcome is still REVIEW until an ADR allows auto-REJECT or auto-APPROVE.

1. Prohibited automation (payment by the model, score written as 0, pay before audit). Stop. REVIEW or hold.
2. R-UNSCORED or R-EXTRACT. REVIEW.
3. R-SOD-BANK. REVIEW. Do not apply the bank change.
4. R-DUP or R-ALIAS match. REVIEW. Hold the later invoice.
5. R-BANK-SPLIT. REVIEW.
6. R-NONPO. REVIEW.
7. R-GR. REVIEW.
8. R-SCORED-ONLY. REVIEW.
9. Else APPROVE only if extract is complete, scorer ran, goods-receipt rule passed or was waived by ADR, and no flag above is true.

If two rules fire, store both reason codes. The person sees both.

Worked overlap: INV-1003 matches R-NONPO, R-BANK-SPLIT, and R-SOD-BANK (linked CH-88). All three reason codes sit on the case. Outcome REVIEW.

## Fusion

The policy engine is code and a versioned rule pack. Policy does not live only in a prompt. See `09_ai_risk_security_observability.md` for change approval.

| Signal | What it may do | What it may not do |
|---|---|---|
| Anomaly rank | Order the REVIEW queue. Add a reason code `MODEL_RANK`. | Pay. APPROVE. REJECT. Fill a missing score with 0. |
| Identity evidence | Set SoD and alias flags. | Apply a bank change. |
| Business rules | Set R-DUP, R-NONPO, R-BANK-SPLIT. | Invent an amount line. |
| Policy constraints | Block prohibited automation. | Name a new owner. |
| Contextual risk | Link CH-88 to INV-1003 and INV-1004. | Drop the link to look clean. |

## Human in the loop

REVIEW is a persisted queue. The named person sees evidence, has time, and can disagree. Actions have equal weight: agree with recommendation, disagree, or override. See `07_explainability_review.md`.

Payment execute stays with a named person after APPROVE. Repo 1.0 does not store that name. D3 ADR names the person.

## Worked outcomes on the packet

Honesty on amounts and times: PRECOMPUTED.

| Case | Flags that fire | Recommended | Final until ADR | What Repo 1.0 stored |
|---|---|---|---|---|
| INV-1001 | If it arrived first with no prior match, no bank flag | APPROVE possible | A named person still pays | PAID. No payer stored. |
| INV-1002 | R-DUP vs INV-1001, 9800, V-201, PO-7001 | REJECT second payment | REVIEW | PROCESS, PAID, `NO_DUPLICATE` |
| CH-88 | R-SOD-BANK U22 / U22 | REJECT auto-apply | REVIEW | SUCCESS |
| INV-1003 | R-NONPO, R-BANK-SPLIT, R-SOD-BANK link, sibling 9900 | REJECT silent pay | REVIEW | PROCESS, APPROVED |
| INV-1004 | Same as INV-1003 | REJECT silent pay | REVIEW | PROCESS, APPROVED |
| CH-89 | Requester U18, approver U19, field email | No SoD flag | No auto-pay effect. Email change still needs Master Data process. | No audit line |

INV-1001 and INV-1002 are already `PAID` in the inherited files. This design cannot pull those payments back. It changes the route for the next invoice that looks like them.

## What stays open

- All amount lines: `THRESHOLD_UNSET`. D3 ADR plus named owner.
- Sibling-time window: `THRESHOLD_UNSET`. Until the ADR, R-BANK-SPLIT uses the named pair INV-1003 / INV-1004.
- Auto-REJECT without a person: unset. D3 ADR.
- Approval-matrix inclusive vs exclusive: Missing (M-22).
- REVIEW person and payer: Missing. D3 ADR.
- C-01 chooser (Procurement and AP_SUPERVISOR) still must accept the retired expedite in that ADR.
