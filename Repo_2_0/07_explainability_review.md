# 7 — Explainability, review, and contest

This file is the To-Be review path. A person can finish a REVIEW. A supplier or an AP analyst can contest an outcome.

It closes D1 spine 7 gaps: email inbox, no disposition, no reason codes, no linked evidence, no model contribution, no rule version, no reviewer text, no contest path. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 7; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-10, M-11; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-11.

Repo 1.0 sample lines: `INV-1003: PROCESS - under threshold.` The line does not name 5000 or 10000. Path: `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`.

## Machine-readable reasons

Every decided case stores a list of reason codes. Codes are stable strings. The UI looks them up.

| Code | When it is written | Packet example |
|---|---|---|
| `DUP_SUPPLIER_PO_AMOUNT` | Canonical supplier, PO, amount match. Invoice ids differ. | INV-1002 vs INV-1001, 9800, V-201, PO-7001 |
| `ALIAS_CANONICAL_JOIN` | Raw id joined through the alias file | `V-201` / `V201` |
| `SOD_SAME_USER_BANK` | Requester equals approver on a bank change | CH-88, U22 / U22 |
| `BANK_CHANGE_LINKED` | Named change id sits on the invoice | CH-88 on INV-1003 |
| `NON_PO` | PO empty | INV-1003, INV-1004 |
| `SPLIT_SIBLING_SUM` | Sibling invoices stored with a pair sum | INV-1003 + INV-1004 = 9900 |
| `EXTRACT_UNCERTAIN` | Required field or confidence missing | No extract rows today |
| `SCORER_UNSCORED` | Model down or timed out | Locked path |
| `MODEL_RANK` | Rank present. Caption: uncalibrated ranking. | No stored rank today |
| `POLICY_REVIEW` | Written policy picked REVIEW | All Wave 1 exception cases |
| `POLICY_APPROVE` | Written policy picked APPROVE | Only the clean residual path |
| `POLICY_REJECT` | Written policy or person picked REJECT | After ADR or after the person acts |

Also store: rule version, model version or `unscored`, prompt id if a language model wrote text, workflow state, linked document hashes.

## Human-readable rationale

The review screen shows one short paragraph built from the codes and the packet numbers.

Template:

> Invoice {invoice_id} for supplier {canonical_id} amount {amount} {currency}. Policy outcome {APPROVE|REVIEW|REJECT}. Reasons: {codes}. Linked changes: {change_ids}. Sibling invoices: {ids} sum {sibling_amount_sum}. Duplicate of {prior_invoice_id} by supplier, PO, and amount. Model: {version or unscored}, rank {rank or empty}. Rule pack {rule_version}. Extract: {complete|uncertain}.

Worked INV-1003 paragraph:

> Invoice INV-1003 for supplier V-311 amount 4950 USD. Policy outcome REVIEW. Reasons: NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM. Linked changes: CH-88 (U22 requested and approved bank_account XXXX1122 to XXXX9988 at 2026-08-11T13:44:00). Sibling invoices: INV-1004 sum 9900. Model: unscored or named version, rank shown as an uncalibrated ranking. Rule pack: the To-Be pack. Extract: complete or uncertain.

Do not write “under threshold.” Name the facts.

## Feature attribution or counterfactual

When `scorer_status=scored`, store a short attribution list from the named features on the model card: amount, supplier age, bank change, approval count, `non_po_flag`, `duplicate_score`. Path: `03_detection_models/anomaly_model.md`.

Caption: uncalibrated contribution to the rank. Not a percent chance.

When the scorer is down, store no attribution. Do not invent a contribution.

A counterfactual is a stored sentence of the form “If this fact were different, the named rule would not fire.” Use it on rule flags, where the fact is in the packet.

| Case | Counterfactual that a reviewer can check |
|---|---|
| INV-1002 | If INV-1001 did not already exist with V-201, PO-7001, and 9800, `DUP_SUPPLIER_PO_AMOUNT` would not fire. |
| CH-88 | If `approved_by` were a user other than U22, `SOD_SAME_USER_BANK` would not fire. CH-89 is that contrast (U18 / U19). |
| INV-1004 | If INV-1003 did not exist, `SPLIT_SIBLING_SUM` would not include 9900. `NON_PO` and `BANK_CHANGE_LINKED` would still fire. |

## Reviewer evidence

The queue is a persisted application store. It is not an email inbox.

The named person sees:

1. Invoice fields and extract image or PDF.
2. Canonical supplier and raw ids.
3. Linked change rows with requester and approver.
4. Sibling invoices and the pair sum.
5. Duplicate candidates.
6. Reason codes and the rationale paragraph.
7. Model version, rank caption, attribution or unscored.
8. Rule version.
9. Recommended outcome.
10. Clock showing time already spent.

Actions have equal weight on the same screen:

| Action | What it stores |
|---|---|
| Agree | Disposition `agree`. Recommended outcome becomes the person’s outcome. |
| Disagree | Disposition `disagree`. Person picks APPROVE or REJECT and writes a reason code. |
| Override | Disposition `override`. Used when the person must break a recommendation and records why. |

Disagree is as easy to press as Agree. There is no Accept-only button.

Required fields on close: reviewer id, start time, end time, disposition, reason codes, free-text note.

Repo 1.0 does not name the reviewer. D3 ADR names the REVIEW owner. Until then the queue role is the nearest control owner in `control_matrix.csv`.

## Customer notification

Customer here means the supplier contact and the internal requester.

Notify runs after REVIEW closes, after REJECT, and after APPROVE.

| Audience | What they receive |
|---|---|
| Supplier contact | Outcome, invoice id, amount, contest path, SLA clock still running or paused. Bank numbers stay masked. |
| Internal requester / AP | Same outcome plus reason codes and the review case id. |

Notify uses idempotency key `case_id:notify`. See `05_workflow.md`.

CH-89 stored an email change to `accounts@vendor.example`. Use the current supplier email from master data. Do not invent an address.

## Contest and appeal

A supplier or an AP analyst may contest APPROVE, REVIEW delay, or REJECT.

| Step | What happens |
|---|---|
| 1 Open | Contest form stores contest id, invoice id, actor, and text. |
| 2 Queue | New REVIEW on the same case. A different named person from the first reviewer when two people exist. If only one named person exists, record that limit. |
| 3 Decision | Second disposition stored. Original audit row stays. New audit row links to the first. |
| 4 Notify | Same notify key pattern with step name `notify_contest`. |

Time allowed to contest is `THRESHOLD_UNSET`. D3 ADR names the owner and the days.

There is no feedback loop from confirmed fraud to a training set in Repo 1.0. Path: `escalation_notes.md`. To-Be writes `reviewer_disposition` onto the case. The named data owner later copies agreed labels into the training set. That copy is a later job. See `03_detection_models.md`.

## Worked review of INV-1003

A stranger can finish this REVIEW.

1. Open case INV-1003.
2. Read 4950 USD, empty PO, supplier V-311, approver U22, `bank_changed_30d=Y`.
3. Open CH-88. See U22 / U22 and XXXX1122 → XXXX9988 at 2026-08-11T13:44:00.
4. Open sibling INV-1004. See pair 9900.
5. Read recommended REJECT of silent pay. Final policy outcome until ADR: REVIEW.
6. Press Agree, Disagree, or Override.
7. Write a note. Close. Notify runs once.

## What stays open

- Reviewer name: Missing. D3 ADR.
- Contest window in days: `THRESHOLD_UNSET`.
- Label copy into a training set: later job for the data owner.
