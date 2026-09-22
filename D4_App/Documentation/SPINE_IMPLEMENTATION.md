# How D4 implements the ten Sprint 2 spine steps

This file maps the working application in `D4_App/` to the table **Sprint 2 - Steps & Approach** on pages 1–2 of `Sprint_2 -  Steps_&_Approach - Runbook`.

The runbook column **What Is Actually Delivered** is the contract. Each section below copies that line, then says what the shipped code does, which files do it, and what stays open.

The app is a React demo built from `D3_PRD/PRD.md`. It stores cases in the browser (`localStorage`). It does not call a live OCR service or a live training job. Honesty labels on numbers: **REAL** (this session measured it), **PRECOMPUTED** (copied from Repo 1.0 or D1), **SIMULATED** (stand-in for a service this packet does not call), **EDUCATIONAL** (classroom walk-through on the four packet invoices).

Outcomes in the app are `APPROVE`, `REVIEW`, and `REJECT` only. The banner in `src/components/Header.tsx` states that. `PROCESS` is not an outcome.

---

## Spine map

| # | Runbook step | What the runbook says you deliver | Where the app does it |
|---|---|---|---|
| 1 | Frame the decision, risk, and regulatory boundary | Business decision, users, APPROVE / REVIEW / REJECT, fraud scenarios, risk appetite, regulatory obligations, prohibited automation, human oversight | Header banner; case replay on Ingest; payment lock on Pay |
| 2 | Engineer the case, data, and evidence model | Events, entities, identity fields, risk variables, labels, document fields, data-quality rules, lineage, evidence to keep | `src/types.ts`; `src/data/seedData.ts` |
| 3 | Build and independently evaluate detection models | Train on labelled data; precision, recall, AUC, catch rate, false positives, segments; version compare; limitations | `src/components/Views/ModelMetricsView.tsx`. Training is a later job. |
| 4 | Extract documents and verify identity and compliance signals | PDFs to fields; identity and confidence; sanctions / PEP / address where they apply; uncertain evidence to REVIEW | `Step2Extract.tsx`; `Step3Verify.tsx` |
| 5 | Orchestrate the end-to-end case workflow | Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify; parallel checks; persisted state; retries; timeouts; fallback; compensating actions | `WorkflowView.tsx`; `P2PContext.tsx` |
| 6 | Combine AI and rules into governed risk decisioning | Fuse rank, identity, rules, policy, and context into APPROVE / REVIEW / REJECT. Human in the loop. The model does not make the final money decision. | `src/lib/p2pRulesEngine.ts`; `Step5ScoreDecide.tsx` |
| 7 | Make decisions explainable, reviewable, and contestable | Machine reasons, human rationale, attribution or counterfactual, reviewer evidence, customer notice, appeal | `Step6Review.tsx`; `Step7Notify.tsx` |
| 8 | Embed compliance monitoring and immutable audit evidence | Velocity, behaviour, geography where evidence exists; escalation events; model version, inputs, rules, prompts, states, humans; WORM | `WormAuditView.tsx`; `EscalationsView.tsx`; `executePayment` in `P2PContext.tsx` |
| 9 | Operationalize AI risk, security, and observability | Owner, model card, validation, change approval, access, drift, false-positive trend, data quality, audit completeness, latency, failure rates, control alerts | `ModelMetricsView.tsx`; Header scorer-down toggle; escalation log |
| 10 | Prove, govern, and productionize the complete AI product | Functional, integration, adverse, failure, compliance, and performance tests; fallback and human-review tests; defects; governance pack; CI/CD, IaC, gates, rollback, hardening, handover | `AcceptanceTestsView.tsx`. Cloud IaC is not in this demo. |

---

## 1. Frame the decision, risk, and regulatory boundary

**Runbook delivery.** Define the business decision, users affected, APPROVE / REVIEW / REJECT, anomaly and fraud scenarios, risk appetite, applicable regulatory obligations, prohibited automation, and mandatory human-oversight points.

**What the app does.** Finance decides whether a supplier invoice can go to payment. Payment is the action that cannot be undone. The header states the three outcomes and that the model ranks, written policy decides, and a named person authorizes payment. Path: `src/components/Header.tsx`.

Users in the demo: AP reviewer (typed name on Review), named payer (typed name on Pay), supplier contact on Notify, control owners on Escalations (AP, Master Data, Finance Controls, Procurement).

Fraud and exception scenarios are the seeded cases:

| Scenario | Case | What the app shows |
|---|---|---|
| Duplicate with different invoice ids | INV-1001 and INV-1002, V-201, PO-7001, 9800 USD, both historically `PAID` in Repo 1.0 | INV-1002 is `REVIEW` with recommended `REJECT`. Match is supplier + PO + amount + currency. |
| Alias hide | `V-201` / `V201` | Header injects `INV-1006-ALIAS` with raw id `V201`, canonical `V-201`. |
| Same-user bank change | CH-88, U22 / U22, XXXX1122 → XXXX9988 | Seed result is `HELD_FOR_REVIEW`, not `SUCCESS`. |
| Split non-PO after bank change | INV-1003 and INV-1004, 4950 + 4950 = 9900 | Both `REVIEW`. Reasons include `NON_PO`, `BANK_CHANGE_LINKED`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`. |
| Clean PO invoice | INV-1005, PO-8820, 3200 USD | `APPROVE`. A named person still pays. |

Honesty on those amounts and times: PRECOMPUTED from D1.

Prohibited automation is enforced in code:

- `executePayment` returns false unless `final_policy_outcome === 'APPROVE'`. Path: `src/context/P2PContext.tsx`.
- A named payer string is required. Empty payer is refused.
- Scorer down stores rank as `null` and status `unscored`. It does not write `score = 0`.
- Audit write failure (`auditFailureSimulation`) blocks `PAID` and fires `ESC_P2P05`.

Regulatory obligations stay **Unknown**. Verify shows Sanctions / PEP as Unknown and CR-REG-01 still open. Path: `src/components/WorkflowSteps/Step3Verify.tsx`. The app does not invent a statute list.

Mandatory human oversight: Review requires a reviewer name (`P2P-FR-003`). Pay requires a payer name (`P2P-FR-004`). Disagree and Override sit next to Agree. Path: `src/components/WorkflowSteps/Step6Review.tsx`.

---

## 2. Engineer the case, data, and evidence model

**Runbook delivery.** Define case events, entities, identity attributes, risk variables, labels, document fields, data-quality rules, lineage, and the evidence retained for every decision.

**What the app does.** `src/types.ts` is the case model. One `CaseRecord` holds ingest time, state, extract, verify, detect, decision, optional review, notify, and payment.

| Runbook item | Type or field | Packet example |
|---|---|---|
| Event | Invoice ingest; vendor-master change | INV-1003 ingest `2026-08-12T11:15:00`; CH-88 at `2026-08-11T13:44:00` |
| Entities | Invoice, supplier, PO, bank change, requester, approver, reviewer, payer | INV-1002, V-201, PO-7001, U11 |
| Identity | `supplier_id_raw`, `supplier_id_canonical`, requester, approver | `V201` → `V-201` |
| Risk variables | Duplicate flags, non-PO, siblings, SoD, rank, scorer status | INV-1003 sibling INV-1004, sum 9900 |
| Labels | `reviewer.disposition` agree / disagree / override | Written when Review closes |
| Document fields | Extract fields plus per-field confidence | `ExtractData` |
| Data quality | `extract_status` complete or uncertain | Uncertain fires `R-EXTRACT` |
| Lineage | `source_job_id`, extractor version, model version, rule version | `p2p-risk-2`, `p2p-rules-v2.0` |
| Evidence retained | `AuditRow` plus `WormRecord` | Written before `PAID` |

Goods receipt stays **Missing**. Sanctions / PEP stay **Unknown**. Those values are stored on `VerifyData` so the gap stays visible. Path: `src/types.ts` `VerifyData`.

---

## 3. Build and independently evaluate detection models

**Runbook delivery.** Train anomaly or fraud models on representative labelled data. Evaluate precision, recall, AUC, catch rate, false positives, and segment performance. Compare versions. Write limitations before deployment.

**What the app does.** This packet has four invoices. The app does not train a production model. The Model Governance board shows the `evaluation.csv` cells and the limits. Path: `src/components/Views/ModelMetricsView.tsx`.

| Metric | p2p-risk-1 | p2p-risk-2 | Honesty |
|---|---|---|---|
| Precision | 0.52 | blank | PRECOMPUTED |
| Recall | 0.71 | blank | PRECOMPUTED |
| False-positive rate | 0.18 | 0.24 | PRECOMPUTED |
| PR-AUC / AUC | Missing | Missing | Unknown |
| Packet catch-rate walk-through | four named patterns | four named patterns | EDUCATIONAL |

The board does not lead with accuracy 0.94. The model card states purpose (rank cases for a person) and prohibited use (payment authorization). Independent validation is labelled Missing.

Ranks on cases are uncalibrated strings such as `#4 of 420 cohort`. Caption in Detect: not a percent chance of fraud. Honesty on INV-1001–INV-1004 ranks: PRECOMPUTED. Honesty on INV-1005 rank: SIMULATED.

Training on representative labelled data stays a later job. The data owner is still Missing until a D3 ADR names that person.

---

## 4. Extract documents and verify identity and compliance signals

**Runbook delivery.** Convert PDFs, forms, and images into structured case data. Check identity consistency and confidence. Add sanctions / PEP / address where they apply. Send uncertain evidence to REVIEW.

**What the app does.**

**Extract.** `Step2Extract.tsx` shows invoice id, supplier id, supplier name, PO, amount, currency, approver, bank-change flag, channel (`batch` or `api`), extractor version, and per-field confidence. There is no live OCR call. Extracted values are seeded. Honesty: PRECOMPUTED for packet cases; SIMULATED for a newly ingested custom case.

The Extract screen can simulate low confidence. That sets `extract_status` to `uncertain` and recomputes the decision through `evaluateP2PRules`. `R-EXTRACT` then sends the case to `REVIEW`. Path: `src/components/WorkflowSteps/Step2Extract.tsx`; `src/lib/p2pRulesEngine.ts`.

**Verify.** `Step3Verify.tsx` does four checks:

1. Alias join. Raw `V201` maps to canonical `V-201`. Duplicate matching uses the canonical id.
2. Segregation of duties. CH-88 requester U22 equals approver U22. Flag `same_user_requester_approver`. CH-89 (U18 / U19) is the contrast that passes.
3. Bank verification method. Callback, none, or Missing. Cryptographic proof stays Missing.
4. Goods receipt Missing. Sanctions / PEP Unknown. Price catalog Unknown. No invented feed.

Uncertain extract or failed SoD does not auto-pay. Policy sends those cases to REVIEW.

---

## 5. Orchestrate the end-to-end case workflow

**Runbook delivery.** Connect Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify, including parallel checks, state persistence, retries, timeouts, fallback paths, and compensating actions.

**What the app does.** `WorkflowView.tsx` is the eight-step bar. Score and Decide share one screen (`Step5ScoreDecide.tsx`) because the rules engine reads the rank and emits the outcome together. Pay sits after Notify and only after APPROVE. Path: `src/components/Views/WorkflowView.tsx`.

| Step | Screen | What it stores |
|---|---|---|
| Ingest | `Step1Ingest.tsx` | Case id, supplier, amount, PO, linked CH-88 / CH-89 |
| Extract | `Step2Extract.tsx` | Fields and confidence |
| Verify | `Step3Verify.tsx` | Canonical id, SoD, bank method |
| Detect | `Step4Detect.tsx` | Duplicate, siblings, non-PO, rank |
| Score + Decide | `Step5ScoreDecide.tsx` | Rule pack outcome |
| Review | `Step6Review.tsx` | Named person, disposition |
| Notify | `Step7Notify.tsx` | Key `{case_id}:notify` |
| Pay | `Step8Pay.tsx` | Key `{case_id}:payment` |

**Persisted state.** `CaseRecord.state` holds `INGESTED` through `PAID` or `REJECTED`. Cases, audit rows, WORM rows, and escalations save to `localStorage` under `p2p_payment_control_v2`. Path: `src/context/P2PContext.tsx`. Closing the tab and reopening resumes the same case. The Review timer says persist and resume. There is no spinner that holds the run open.

**Parallel checks.** Detect shows duplicate, sibling split, and non-PO side by side. Verify shows alias, SoD, bank method, and missing feeds side by side. They write onto one case object.

**Retries.** Notify and Pay sit outside retry. A second click on Send or Pay returns the first record. `notify_count` and `payment_count` stay 1. Worked case: INV-1001 keys `INV-1001:notify` and `INV-1001:payment`.

**Fallback.** Scorer-down toggle sets rank to `null` and forces REVIEW. Audit-failure toggle blocks Pay and fires `ESC_P2P05`. Extract-uncertain toggle forces REVIEW.

**Timeouts.** Numeric timeout seconds stay `THRESHOLD_UNSET`. The demo uses the scorer-down switch instead of a live clock.

**Compensating action.** A later Extract that restores high confidence recomputes the decision. The uncertain row is not deleted; status flips and rules run again.

---

## 6. Combine AI and rules into governed risk decisioning

**Runbook delivery.** Fuse anomaly scores, identity evidence, business rules, policy constraints, and contextual risk into APPROVE / REVIEW / REJECT, with policy thresholds and human-in-the-loop escalation. The model does not make an uncontrolled final decision.

**What the app does.** `evaluateP2PRules` in `src/lib/p2pRulesEngine.ts` is the policy engine. It is code, not a prompt. Rule pack version: `p2p-rules-v2.0`.

Inputs it reads: extract completeness, scorer status, same-user bank change, duplicate on canonical supplier + PO + amount + currency, alias join, linked bank change plus split or non-PO, empty PO.

| Rule | When it fires | Recommended | Final until ADR |
|---|---|---|---|
| R-EXTRACT | Uncertain or missing required fields | REVIEW | REVIEW |
| R-UNSCORED | Rank empty or status unscored | REVIEW | REVIEW |
| R-SOD-BANK | Requester equals approver on a bank change | REJECT the auto-apply | REVIEW |
| R-DUP / R-ALIAS | Match with INV-1001 on 9800 USD | REJECT the second payment | REVIEW |
| R-BANK-SPLIT | Linked CH-88 and split or non-PO | REJECT silent pay | REVIEW |
| R-NONPO | Empty PO | REVIEW | REVIEW |
| None of the above | Clean scored case | APPROVE | APPROVE |

INV-1005 is the clean APPROVE path. INV-1002, INV-1003, and INV-1004 stay REVIEW. A named person writes the final REJECT or APPROVE on Review.

No new amount line is coded. The As-Is 5000 expedite is labelled retired on the Detect screen. 5000 and 10000 stay As-Is evidence. Auto-REJECT without a person stays unset.

The rank may order the queue. It cannot set `PAID`.

---

## 7. Make decisions explainable, reviewable, and contestable

**Runbook delivery.** Produce machine-readable reasons, human-readable rationale, feature attribution or counterfactual where suitable, reviewer evidence, customer notification, and a path for human reconsideration or appeal.

**What the app does.**

**Machine-readable reasons.** `reason_codes` on the decision, for example `DUP_SUPPLIER_PO_AMOUNT`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`, `POLICY_REVIEW`. Path: `src/types.ts`; shown on Score + Decide and Review.

**Human-readable rationale.** `rationale_paragraph` from the rules engine. Worked INV-1003 text names 4950 USD, empty PO, CH-88, U22 / U22, sibling INV-1004, pair 9900, model version, rule pack.

**Counterfactuals.** Stored sentences such as: if INV-1001 did not already exist with V-201, PO-7001, and 9800 USD, `DUP_SUPPLIER_PO_AMOUNT` would not fire. Feature list from the model card is shown on the metrics board. Features Missing on `invoices.csv` (`supplier age`, `approval count`) stay labelled Missing. The app does not invent a contribution for those.

**Reviewer evidence.** Review shows invoice facts, recommended outcome, timer, and three equal actions: Agree, Disagree, Override. Reviewer name is required. Notes are stored. Path: `src/components/WorkflowSteps/Step6Review.tsx`; `submitReview` in `P2PContext.tsx`.

**Customer notification.** Notify sends outcome and reason codes to the supplier email from the alias store. Bank numbers stay masked (`XXXX4455`). Key `{case_id}:notify`. Path: `src/components/WorkflowSteps/Step7Notify.tsx`.

**Contest.** Notify has Open Contest. That writes `ESC_CONTEST`, an audit row, and returns the case to `IN_REVIEW`. Path: `openContest` in `P2PContext.tsx`. Contest window in days stays `THRESHOLD_UNSET`.

---

## 8. Embed compliance monitoring and immutable audit evidence

**Runbook delivery.** Detect velocity, behavioural, geographic, and other relevant exceptions. Generate compliance escalation events. Record model version, inputs, rules, prompts, workflow states, human interventions, and decisions in a tamper-resistant / WORM store.

**What the app does.**

| Exception type | Supported in this packet? | What the app stores |
|---|---|---|
| Duplicate | Yes | INV-1002 vs INV-1001 |
| Alias | Yes | `V201` → `V-201` |
| Same-user bank change | Yes | CH-88 U22 / U22 |
| Split pair | Yes | 4950 + 4950 = 9900 at 11:15 and 11:16 |
| Behavioural SoD overlap | Partial | `sod_vendor_and_pay_overlap` on INV-1003 |
| Velocity | Partial | The two process times. No invoices-per-hour cutoff. That cutoff is `THRESHOLD_UNSET`. |
| Geographic | No | Unknown. No country field. No invented feed. |

Escalation events are rows, not emails. Types: `ESC_DUP`, `ESC_SOD`, `ESC_BANK_SPLIT`, `ESC_UNSCORED`, `ESC_EXTRACT`, `ESC_P2P05`, `ESC_CONTEST`. Screen: `src/components/Views/EscalationsView.tsx`. Seeded rows already exist for INV-1002 and INV-1003.

**Write the audit row first.** `executePayment` writes `AuditRow`, then `WormRecord`, then sets state `PAID`. If `auditFailureSimulation` is on, none of those three happen and `ESC_P2P05` fires. Path: `src/context/P2PContext.tsx`.

**Two stores.** WORM holds `audit_row_id`, document hash, inputs hash, rule version, model version, outcome, timestamp. Retention days: `THRESHOLD_UNSET`. The identity store holds emails and masked bank numbers. WORM overwrite test on `WormAuditView.tsx` shows REFUSED. This WORM store is a demo list in `localStorage`. It is not a cloud write-once disk. Honesty: SIMULATED store, REAL sequence in this session (audit then pay).

**Rebuild.** `CaseHistoryView.tsx` rebuilds a case from audit rows: actor, from-state, to-state, rank, reasons, model version, rule version, linked change ids. Worked paid case: INV-1001, payer `AP-DIRECTOR-1`, linked CH-89.

---

## 9. Operationalize AI risk, security, and observability

**Runbook delivery.** Establish model ownership, model cards, validation evidence, change approvals, access controls, drift and performance monitoring, false-positive trends, data-quality monitoring, audit completeness, latency, failure rates, and compliance-control alerts.

**What the app does.**

| Runbook item | In the app | Honesty / limit |
|---|---|---|
| Model ownership | Metrics board. Owner Missing until D3 ADR. AP is nearest named control owner, not invented as model owner. | Missing person |
| Model card | Purpose, prohibited use, features, validation Missing | PRECOMPUTED card |
| Validation evidence | Precision, recall, FPR table. v2 blanks stay blank. | PRECOMPUTED |
| Change approvals | Rule pack version shown. Thresholds stay `THRESHOLD_UNSET`. | No live git gate in the demo |
| Access | Reviewer and payer are typed named people. Bank details masked on Notify. | Demo accounts |
| Shared API key from D1 | Not a live two-environment key in this browser app. Scorer-down stands in for a failed scoring call. | SIMULATED outage |
| SoD overlap | CH-88 held. Vendor-master vs pay shown on INV-1003 flag. | PRECOMPUTED flag |
| Drift | Investigate first is stated on the metrics board. No retrain button. | Later job |
| False-positive trend | 0.18 vs 0.24 on the board | PRECOMPUTED |
| Data quality | Extract uncertain toggle | REAL in this session when toggled |
| Audit completeness | WORM count in the header | REAL count in this session |
| Latency | Review session timer in seconds | REAL while Review is open |
| Failure rates | Scorer-down and audit-failure toggles | SIMULATED failures |
| Compliance-control alerts | Escalations view and header badge | REAL list in this session |

---

## 10. Prove, govern, and productionize the complete AI product

**Runbook delivery.** Run functional, integration, adverse, failure, compliance, and performance tests. Validate fallback and human-review paths. Resolve defects. Package governance evidence. Then CI/CD, IaC, release gates, rollback, security hardening, and production handover.

**What the app does.** `AcceptanceTestsView.tsx` runs checks against live app state. It compares expected payload to actual payload.

| Test id | What it proves | Class |
|---|---|---|
| P2P-AC-001 | INV-1002 duplicate by supplier + PO + amount + currency | Functional / packet |
| P2P-AC-002 | `V201` joins `V-201` | Adverse / alias |
| P2P-AC-003 | CH-88 then INV-1003 / INV-1004 REVIEW, pair 9900 | Adverse / split |
| P2P-AC-004 | Scorer down: rank null, REVIEW, not score 0 | Failure / fallback |
| P2P-AC-005 | Payment key, count stays 1 | Integration |
| P2P-AC-006 | INV-1005 reaches APPROVE | Functional |
| P2P-AC-010 | No `PROCESS` | Functional |
| P2P-AC-012 | CH-88 `HELD_FOR_REVIEW` | Adverse / SoD |
| P2P-AC-015 | Notify key, count stays 1 | Integration |
| P2P-AC-019 | Audit fail blocks Pay, `ESC_P2P05` | Failure / compliance |
| P2P-AC-024 | WORM overwrite refused | Compliance |
| P2P-AC-028 | Agree / Disagree / Override equal weight | Human review |

Those tests cover the list Repo 1.0 omitted: alias, split, same-user, bank-then-pay, model outage, queue persist (review state in `localStorage`), rollback of demo data (Reset in the header restores seed). Peak-volume number is not invented.

**What this demo does not ship.** There is no Terraform or other IaC folder. There is no cloud CI pipeline in `D4_App/`. Release gates, production hardening, and named handover people stay in the PRD as D3b ADR items. The in-app Reset is a demo rollback to seed data, not a production deploy rollback.

Governance evidence a reviewer can open now: this file, `D3_PRD/PRD.md`, `Repo_2_0/`, D1 assessment, the Model board, the WORM view, and one rebuilt INV-1001 row.

---

## Worked path a stranger can run

1. Open Workflow. Select INV-1003.
2. Walk Ingest (CH-88 U22 / U22) → Extract → Verify (SoD fail) → Detect (siblings 9900, non-PO) → Score + Decide (`REVIEW`, recommended `REJECT`).
3. On Review, type a name, press Agree, Disagree, or Override. Time is shown. Case becomes `REVIEWED`.
4. On Notify, send once. Send again. Count stays 1. Optionally open Contest.
5. Pay is locked because outcome is not `APPROVE`.
6. Open Case History and WORM. Rebuild actor, states, rank, reasons, model version, rule version, linked CH-88.

For payment retry: select INV-1001 or complete INV-1005 through Review as APPROVE, then Pay twice. Count stays 1. Audit row exists before `PAID`.

---

## What stays open on purpose

- Regulatory list, sanctions / PEP / address, geography feed: Unknown.
- Goods-receipt feed and price catalog: Missing.
- Model owner, data owner, standing REVIEW owner, P2P-05 owner: Missing or TBD in the PRD. The demo asks for a typed name at Review and Pay.
- Amount lines, timeout seconds, retention days, contest days: `THRESHOLD_UNSET`.
- v2 precision and recall: blank.
- Live OCR, live model training, cloud WORM disk, IaC, CI/CD: not in this browser app.
