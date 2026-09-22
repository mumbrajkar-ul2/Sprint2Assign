# 5 — End-to-end case workflow

This file is the To-Be path from invoice arrival to notify.

Named steps: Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify.

It closes D1 spine 5 gaps: no event correlation, no persisted state between bank change and invoice, no retry key, no timeout or fallback, scorer-down Unknown, queue-outage Unknown. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 5; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-05, M-08, M-09, M-18; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-04, RCTE-08, RCTE-11.

`PROCESS` is Repo 1.0 language. This workflow does not emit `PROCESS`.

## Path

Repo 1.0 names Supplier Setup → PO → Goods Receipt → Invoice → Approval → Payment. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/current_flow.md`. Bank change and payment sit in separate flows. Duplicate check uses invoice number only. No event correlation.

To-Be keeps those business objects and adds the eight control steps below. Goods receipt stays Missing as a live feed. See `02_case_data_evidence.md`.

| Step | What it does | Parallel | Retry |
|---|---|---|---|
| Ingest | Store the invoice or the vendor-change event. Assign a case id. Persist state `INGESTED`. | Vendor-change ingest may run next to invoice ingest. | Yes. Reversible. |
| Extract | Turn the PDF or image into fields. Store confidence and channel. | Invoice extract and change-PDF extract may run side by side. | Yes. Reversible. |
| Verify | Join alias, requester vs approver, bank-change link, field completeness. | Alias join, SoD compare, and change link run side by side. | Yes. Reversible. |
| Detect | Set duplicate, split, non-PO, SoD, and alias flags. | Those detectors run side by side. | Yes. Reversible. |
| Score | Call the named model. Store an uncalibrated rank or leave unscored. | After Detect flags are stored. | Retry the call only while the timeout window is open. After timeout: REVIEW, unscored. Do not write `score = 0`. |
| Decide | Written policy reads flags, evidence, and rank. Emits APPROVE, REVIEW, or REJECT. | No. Single policy engine. | Recompute from stored flags. Do not call payment. |
| Review | Named person sees evidence and records a disposition. | No. Persisted queue. | Do not keep the run open. Persist and resume. |
| Notify | Send the outcome to the requester and the supplier contact. | After Review or after REJECT. | No retry loop. Idempotency key. |
| Payment (after APPROVE) | Named person releases money. | Outside the eight-step retry block. | No retry loop. Idempotency key. |

Payment is a separate irreversible step after APPROVE. It is not a ninth name that replaces Notify. Notify still runs for APPROVE, REVIEW, and REJECT.

## Persisted state

Every case stores `state`, `updated_at`, and `step`. The run may stop. A later worker resumes from the last stored step.

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

## Parallel checks

After Extract, these checks run side by side and write to the same case:

1. Alias normalize (`V-201` / `V201`).
2. Duplicate match on canonical supplier + PO + amount.
3. Sibling invoices: until D3, join the named pair INV-1003 with INV-1004. A numeric sibling-time window is `THRESHOLD_UNSET`.
4. Same-user requester and approver on linked changes (CH-88).
5. Bank-change link (CH-88 to V-311 invoices).
6. Non-PO flag.
7. Extract completeness.

Score may start when Detect has written its flags. Decide waits for Verify, Detect, and Score (or unscored).

## Retries, timeouts, fallback

Retry only reversible steps: Ingest, Extract, Verify, Detect, Score (within timeout), Decide (recompute).

| Step | Timeout | After timeout |
|---|---|---|
| Ingest | `THRESHOLD_UNSET`. D3 ADR names the owner and the seconds. | Leave `INGESTED` incomplete. Alert operations. Do not pay. |
| Extract | `THRESHOLD_UNSET` | `extract_status=uncertain`. REVIEW. |
| Verify | `THRESHOLD_UNSET` | REVIEW. |
| Detect | `THRESHOLD_UNSET` | REVIEW with flags that did finish. Missing flags stored as unknown. |
| Score | `THRESHOLD_UNSET` | REVIEW, `scorer_status=unscored`. Rank empty. |
| Review wait | `THRESHOLD_UNSET` | Escalation event to the REVIEW owner’s manager role once D3 names both people. Case stays held. |
| Payment | None for auto-retry | Person retries with the same idempotency key. Count stays 1. |
| Notify | None for auto-retry | Same key. Count stays 1. |

Fallback: any failed reversible step that cannot finish cleanly sends the case to REVIEW. The case is held. No fake safe score. No auto-pay.

Compensating action: if Extract wrote a partial row and then failed, mark that row `superseded` and keep it. Do not delete it. A later Extract writes a new row.

Queue outage: the REVIEW queue is a persisted store, not an email inbox. If the queue service is down, cases stay in state `DECIDED` / outcome REVIEW on the application store. Workers resume when the queue returns. Path for the As-Is inbox: `07_explainability_review/escalation_notes.md`.

## Idempotency keys

Payment and notify sit outside retry. Each uses a key built from case id plus step name.

| Case | Step name | Key | What a second call does |
|---|---|---|---|
| INV-1002 | `payment` | `INV-1002:payment` | Returns the first result. Payment count stays 1. |
| INV-1003 | `notify` | `INV-1003:notify` | Returns the first result. Notify count stays 1. |
| INV-1003 | `payment` | `INV-1003:payment` | Does not run while outcome is REVIEW. |

Worked retry: a worker crashes after APPROVE on a later case and starts again. The payment step sees the same key and does not pay twice.

## Event correlation

Repo 1.0 says there is no event correlation across vendor master change and later invoice or payment. Path: `current_flow.md`.

To-Be join keys:

- Canonical supplier id.
- Change timestamp before invoice ingest time.
- `bank_changed_30d` inherited flag when present.

Worked sequence:

1. CH-88 at `2026-08-11T13:44:00` on V-311 bank account. Persist change case. SoD flag true.
2. INV-1003 at `2026-08-12 11:15`. Join CH-88. Persist `linked_change_ids=CH-88`.
3. INV-1004 at `2026-08-12 11:16`. Join CH-88 and sibling INV-1003. Persist pair sum 9900.
4. Both invoices go to REVIEW. Payment does not run.

## Payment and notify

The application writes the audit row before payment state changes. See `08_compliance_audit.md`.

A named person presses pay. AI does not press pay.

Notify tells the requester and the supplier contact the outcome and the contest path. See `07_explainability_review.md`.

## Worked As-Is vs To-Be

| Case | As-Is path | To-Be path |
|---|---|---|
| INV-1002 | Ingest, invoice-number check `NO_DUPLICATE`, PROCESS, PAID | Ingest → Extract → Verify (alias) → Detect (supplier+PO+amount 9800 vs INV-1001) → Score or unscored → Decide REVIEW → named person → Notify. Payment blocked unless the person overrides. |
| INV-1003 | Non-PO under 5000, PROCESS, no CH-88 link | Ingest → Extract → Verify (link CH-88, U22=U22) → Detect (non-PO, sibling INV-1004, pair 9900) → Score or unscored → Decide REVIEW → named person → Notify. |

## What stays open

- Timeout seconds: `THRESHOLD_UNSET`. D3 ADR.
- Sibling-time window: `THRESHOLD_UNSET`. Until the ADR, join INV-1003 with INV-1004 only.
- Goods-receipt feed: Missing.
- REVIEW person name: Missing. D3 ADR.
