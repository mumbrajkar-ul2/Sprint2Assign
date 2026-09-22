# Test evidence — local run, 22 Sep 2026

Source of the expected column: `D3_PRD/PRD.md` acceptance cases P2P-AC-001 through P2P-AC-005, plus the notify retry in P2P-AC-015 because this session measured it.

Source of the observed column: the local app at `http://localhost:3000`. The hosted Studio URL stopped at Google sign-in.

PASS/FAIL is the result recorded in that session. A row stays PASS when the session said PASS and the observed text matches the expected route.

## Honesty labels

| Label | Meaning here |
|---|---|
| REAL | Measured on the running app in this session, or the screen badge said REAL. |
| PRECOMPUTED | Screen badge said PRECOMPUTED. |
| SIMULATED | Screen badge said SIMULATED. |
| EDUCATIONAL | Model Governance table said EDUCATIONAL. |
| No badge | The number was visible. The screen did not show a class. |
| Unknown | Not measured, or the metrics row said Unknown. |

## Case table

| Case | Expected | Observed | PASS/FAIL | Honesty class |
|---|---|---|---|---|
| INV-1001 / INV-1002 duplicate (P2P-AC-001) | INV-1002 goes to REVIEW. Recommended outcome is REJECT of the second payment. Reason includes `DUP_SUPPLIER_PO_AMOUNT`. Match is canonical supplier + PO + amount + currency. Invoice ids differ. INV-1001 stays the already-paid invoice. Payment does not run while the outcome is REVIEW. | Detect on INV-1002: Duplicate Detector FLAGGED. Match key `V-201:PO-7001:9800`. Prior match INV-1001. Invoice ID match: No (Different ID). Rank `#4 of 420 cohort`. Raw index `0.92`. Status SCORED. Model `p2p-risk-2`. Score + Decide: outcome REVIEW. Recommended REJECT. Rule `R-DUP`. Reasons `DUP_SUPPLIER_PO_AMOUNT`, `POLICY_REVIEW`. Rule pack `p2p-rules-v2.0`. Pay on INV-1002: PAYMENT LOCKED, outcome REVIEW, Payment Count 0. Pay button was present. Lock text said payment runs only for APPROVE. This session did not click that button. Detect on INV-1001: Duplicate Detector CLEAN. Rank `#240 of 420 cohort`. Raw index `0.12`. Pay: PAID & SETTLED, Payment Count 1, payer `AP-DIRECTOR-1`, audit `AUDIT-INV-1001-01`. | PASS | Rank lines: PRECOMPUTED. Payment Count 0 and 1: REAL. Dollar amounts on the case list: No badge. |
| V-201 / V201 alias (P2P-AC-002) | Inject a second 9800 USD invoice on PO-7001 that uses raw id `V201`. After the canonical join, the case matches the INV-1001 key and goes to REVIEW with `ALIAS_CANONICAL_JOIN` and `DUP_SUPPLIER_PO_AMOUNT`. Display names stay two strings: Alpha Industrial Supply for `V-201`, Alpha Industries Supply for `V201`. | `Inject V201 Alias` created `INV-1006-ALIAS • V201 • $9800 (REVIEW)`. Verify: Raw Supplier ID `V201`. Canonical Supplier ID `V-201`. Canonical Entity: `Alpha Industries Supply`. Known alias pair line: `V-201 / V201 (Alpha Industrial / Industries)`. Seeded INV-1002 Verify: Canonical Entity `Alpha Industrial Supply`. Detect: FLAGGED. Match key `V-201:PO-7001:9800`. Prior match INV-1001. Rank `#5 of 420 cohort`. Raw index `0.91`. Status SCORED. Score + Decide: REVIEW. Recommended REJECT. Rules `R-DUP`, `R-ALIAS`. Reasons `DUP_SUPPLIER_PO_AMOUNT`, `ALIAS_CANONICAL_JOIN`, `POLICY_REVIEW`. | PASS | Alias rank line: SIMULATED. `$9800` on the new list row: No badge. |
| CH-88 + INV-1003 / INV-1004 (P2P-AC-003, review disagree P2P-AC-028) | Both invoices go to REVIEW. Reasons include `NON_PO`, `BANK_CHANGE_LINKED`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`. CH-88 stays held. Requester and approver are both U22. A named person can disagree on the same screen as agree. A blank reviewer name does not close the case. | INV-1003 Verify: SOD VIOLATION FLAGGED. Record CH-88 (bank_account). Requester U22. Approver U22 (Same user!). Master Data Status HELD_FOR_REVIEW. Masked account `XXXX9988`. Bank verification method `none`. Detect: Duplicate CLEAN. Sibling INV-1004. Pair sum `$9900 USD`. PO check NON-PO. Rank `#2 of 420 cohort`. Raw index `0.96`. Score + Decide on INV-1003 and INV-1004: outcome REVIEW, recommended REJECT, rules `R-SOD-BANK`, `R-BANK-SPLIT`, `R-NONPO`, same reason codes. INV-1003 rationale names CH-88, bank `XXXX1122` to `XXXX9988`, U22, sibling INV-1004, sum 9900 USD. Review before a click: AWAITING NAMED REVIEWER. Three equal buttons: Agree REJECT, Disagree & Set APPROVE, Manager Override. Name field already held Sarah Jenkins (AP Lead). Blank name then Disagree stayed on Review with message `Reviewer account name is required by PRD P2P-FR-003.` Name `Ada` then Disagree & Set APPROVE: case list showed INV-1003 APPROVE. Screen moved to Notify. Decision Outcome APPROVE. Notify Count 0. Reason codes on the payload stayed the five REVIEW codes. Case History after the click: state REVIEWED, 1 audit row, actor Ada, DECIDED to REVIEWED, `APPROVE • #2 of 420 cohort`, model `p2p-risk-2`, rule `p2p-rules-v2.0`, same five reasons, note `Review closed with disposition: disagree. Final outcome: APPROVE.` Before the click, Case History showed 0 audit rows. | PASS | INV-1003 rank line: PRECOMPUTED. Notify Count 0 at the moment of the disagree click: REAL. Review session time `14s`: No badge. Pair sum `$9900`: No badge on that line in the notes. |
| Scorer down (P2P-AC-004) | Stop the scorer. Outcome REVIEW. Rank empty. The screen does not show score = 0. Reason `SCORER_UNSCORED`. | Used INV-1005, which started as APPROVE. Header after the toggle: `Scorer: DOWN (UNSCORED)`. Detect: Honesty Badge REAL. Status UNSCORED. Rank field showed the word NULL. Banner: `UNSCORED (Scorer Down / Timeout)`. Score + Decide: outcome REVIEW. Recommended REVIEW. Rule `R-UNSCORED`. Reasons `SCORER_UNSCORED`, `POLICY_REVIEW`. Case list: INV-1005 (REVIEW). Review buttons: Agree REVIEW, Disagree & Set APPROVE, Manager Override. The rank field showed NULL. The notes for that screen record no score of 0. | PASS | Detect badge: REAL. The word NULL is the empty rank, not a measured score. |
| Payment retry (P2P-AC-005) | On a case that reached APPROVE, call payment twice with key `{case_id}:payment`. Payment count stays 1. The second call returns the first result. Do not use INV-1002 as the pay case. | INV-1001 was already PAID. Payment Count 1. Click `Retry / Re-verify Idempotent Payment`. Banner said payment already completed under key `INV-1001:payment` and count remains 1. Count stayed 1. INV-1005 before any pay click in that pass: outcome APPROVE, Payment Count 0, button `Authorize & Pay $3,200 USD`, payer field `Michael Vance (Treasurer)`. First click: payment released, key `INV-1005:payment`, state PAID, Payment Count 1, status PAID & SETTLED, audit `AUDIT-INV-1005-PAY`. Header WORM Ref changed from 1 row to 2 rows. Second click: idempotency verified under `INV-1005:payment`, count remains 1. Count stayed 1. The notes also show INV-1005 as REVIEW during the scorer-down pass. They do not name the click that restored APPROVE before this pay pass. | PASS | Payment Count after each click: REAL. WORM row count 1 then 2: REAL. `$3,200` on the button: No badge. |
| Notify retry (P2P-AC-015) | Key `{case_id}:notify` returns the first result on retry. Notify count stays 1. | INV-1001 Notify Count was already 1. Key `INV-1001:notify`. Supplier line `Alpha Industrial Supply (V-201)`. Click `Retry / Verify Idempotent Notify`. Banner said notification already sent under that key and count remains 1. Notify Count stayed 1. | PASS | Notify Count: REAL. |

## Rebuild check (INV-1003 after the Ada click)

A reader can rebuild this case from the one audit row that was on screen:

| Field | Value on Case History |
|---|---|
| Actor | Ada |
| From-state | DECIDED |
| To-state | REVIEWED |
| Outcome | APPROVE |
| Rank text on the same line | #2 of 420 cohort |
| Reasons | NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW |
| Model version | p2p-risk-2 |
| Rule version | p2p-rules-v2.0 |
| Disposition note | Review closed with disposition: disagree. Final outcome: APPROVE. |

Before that click the same screen showed 0 audit rows.

## Other confirmed pages

| Page | Observed | PASS/FAIL | Honesty class |
|---|---|---|---|
| Model Governance & Metrics | No accuracy 94% figure. PRECOMPUTED row: precision 0.52, recall 0.71, false-positive rate 0.18 / 0.24. EDUCATIONAL row: packet pattern catch rate 100% (4 / 4). PR-AUC row: Missing. | Not an S4c case. Recorded because the page was opened. | PRECOMPUTED and EDUCATIONAL as labeled. PR-AUC honesty: Unknown. |
| WORM Reference Store after Reset | 1 locked row. Id `WORM-REF-001`. Audit `AUDIT-INV-1001-01`. Case INV-1001. Outcome APPROVE. Timestamp `2026-08-11T10:05:00`. Page text says no delete or overwrite controls are on that screen. No delete button was seen. A second write of the same audit id was not attempted. | Screen present. Overwrite-refusal click: not run. | Row count 1: REAL for the moment after Reset. Timestamp: No badge in the notes. |

## Screens and gaps

Required workflow screens 1 through 8, Case History & Rebuild, WORM Reference Store, and Model Governance & Metrics were opened. Those screens are present.

| Item | Status |
|---|---|
| Escalation Events | Tab visible. Badge showed 3. Page not opened. Contents are not evidence. |
| Acceptance Test Suite (AC-001..AC-038) | Tab label visible. Page not opened. AC rows inside that tab stay unconfirmed. |
| Extract confidence percents on INV-1002 | On screen (99%, 98%, 99%, 99%, 99%, 97%, 99%). Extractor `ocr-v2.1`. No honesty badge. Class on screen: No badge. |
| Active Review Session Time | `14s` on every Review screen opened. No honesty badge. |
| Ingest body fields | Step opened. Field values not recorded. |
| Verify body for INV-1002 | Only the canonical entity name `Alpha Industrial Supply` was recorded. |
| WORM second write of the same audit id | Not attempted. Result Unknown. To measure: write the same `audit_row_id` a second time and record whether the store refuses it. |
| Naive and cached Pay / Notify counts | Unknown. Method is in `SIDE_EFFECT_COUNTER.md`. |
