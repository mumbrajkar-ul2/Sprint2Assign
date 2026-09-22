# Demo script — local run of the payment-control app

This script repeats the clicks from the 22 Sep 2026 session. Each minute names a control that session opened and the text that was on screen.

The hosted Studio page asked for Google sign-in. This session recorded the local run at `http://localhost:3000`.

Studio URL (not exercised past sign-in):

https://aistudio.google.com/apps/4d381f01-eadc-4c67-bc79-5a3f55eb5e53?project=gen-lang-client-0889107005&showAssistant=true&showPreview=true&fullscreenApplet=true

## Honesty labels used below

| Label | What it means in this file |
|---|---|
| REAL | The running app measured the number in this session, or the screen badge said REAL. |
| PRECOMPUTED | The screen badge said PRECOMPUTED. The number was already stored. This session did not recompute it. |
| SIMULATED | The screen badge said SIMULATED. The number stands in for a service this packet does not call. |
| EDUCATIONAL | The Model Governance table labeled that row EDUCATIONAL. It is a classroom count on the packet patterns. |
| No badge | The number was on screen. The screen did not show an honesty class. This file does not assign one. |
| Unknown | This session did not measure the number. |

Worked example: INV-1002 Detect showed rank `#4 of 420 cohort` and raw index `0.92` with badge PRECOMPUTED. Extract on the same case showed `99%` on Invoice ID with no badge. Those are different labels. The `99%` stays "No badge".

## Header on every screen this session opened

- Outcomes on the header: `APPROVE | REVIEW | REJECT` only.
- Banner text: `No "PROCESS"`.
- Footer text: Rule Pack D3a, Model `p2p-risk-2`.
- Score + Decide and Case History also showed rule pack `p2p-rules-v2.0`.

## What you click

Open `http://localhost:3000`. Read the header before you pick a case.

The Active Case list at the start of the session held these seed rows:

| Case row | Outcome on the list |
|---|---|
| INV-1001 • V-201 • $9800 | APPROVE |
| INV-1002 • V-201 • $9800 | REVIEW |
| INV-1003 • V-311 • $4950 | REVIEW |
| INV-1004 • V-311 • $4950 | REVIEW |
| INV-1005 • V-500 • $3200 | APPROVE |

Dollar amounts on that list had no honesty badge. The PRD calls the packet amounts PRECOMPUTED. The screen did not print that word on the amount.

Workflow steps confirmed open: `1. Ingest`, `2. Extract`, `3. Verify`, `4. Detect`, `5. Score + Decide`, `6. Review`, `7. Notify`, `8. Pay`.

Other pages opened: Case History & Rebuild, WORM Reference Store, Model Governance & Metrics.

Tabs visible and not opened: Escalation Events (badge showed 3), Acceptance Test Suite (AC-001..AC-038). Their page bodies stay out of this script.

### 0:00 — Ingest

1. Open `1. Ingest`.
2. The step exists. This session did not record the field list on the Ingest body.
3. Use the Active Case list to select the case. The five seed rows above are the ingest set this session used.

### 1:00 — Extract on INV-1002

1. Select `INV-1002` in Active Case.
2. Open `2. Extract`.
3. Read these confidence percents. Extractor label: `ocr-v2.1`. No honesty badge on any percent.

| Field | Percent on screen | Honesty |
|---|---|---|
| Invoice ID | 99% | No badge |
| Supplier ID | 98% | No badge |
| Supplier Name | 99% | No badge |
| PO | 99% | No badge |
| Amount | 99% | No badge |
| Approver U11 | 97% | No badge |
| Bank Changed N | 99% | No badge |

### 2:00 — Detect on INV-1002 (duplicate)

1. Stay on `INV-1002`. Open `4. Detect`.
2. Duplicate Detector: `FLAGGED`.
3. Match key: `V-201:PO-7001:9800`.
4. Prior match: `INV-1001`.
5. Invoice ID match: `No (Different ID)`.
6. Rank: `#4 of 420 cohort`. Raw index: `0.92`. Honesty Badge: `PRECOMPUTED`. Status: `SCORED`. Model version: `p2p-risk-2`.

### 3:00 — Score + Decide on INV-1002

1. Open `5. Score + Decide`.
2. Outcome: `REVIEW`. Recommended: `REJECT`.
3. Rule fired: `R-DUP`.
4. Reasons: `DUP_SUPPLIER_PO_AMOUNT`, `POLICY_REVIEW`.
5. Rule pack: `p2p-rules-v2.0`.

This session did not record a separate Verify body for INV-1002. Verify notes below are for INV-1006-ALIAS and INV-1003.

### 4:00 — Pay lock on INV-1002

1. Open `8. Pay` on `INV-1002`.
2. Status: `PAYMENT LOCKED`. Outcome on screen: `REVIEW`. Payment Count: `0`. Honesty of that count: REAL (the screen showed the count for this case).
3. The Pay button was present. The lock text said payment runs only for `APPROVE`.
4. This session did not click Pay on INV-1002.

### 5:00 — Detect and Pay on INV-1001 (the prior invoice)

1. Select `INV-1001`. Open `4. Detect`.
2. Duplicate Detector: `CLEAN`.
3. Rank: `#240 of 420 cohort`. Raw index: `0.12`. Honesty Badge: `PRECOMPUTED`.
4. Open `8. Pay`. Status: `PAID & SETTLED`. Payment Count: `1` (REAL). Payer: `AP-DIRECTOR-1`. Audit ID: `AUDIT-INV-1001-01`.

INV-1002 is held in `REVIEW`. INV-1001 is the invoice that is already paid. They are not two independent approve-to-pay paths.

### 6:00 — Alias inject, then Verify

1. Click `Inject V201 Alias`.
2. The Active Case list gains `INV-1006-ALIAS • V201 • $9800 (REVIEW)`. The `$9800` has no honesty badge on the list.
3. Open `3. Verify` on `INV-1006-ALIAS`.
4. Raw Supplier ID: `V201`.
5. Canonical Supplier ID: `V-201`.
6. Canonical Entity line: `Alpha Industries Supply`.
7. Known alias pair line: `V-201 / V201 (Alpha Industrial / Industries)`.
8. Select seeded `INV-1002` and open `3. Verify`. Canonical Entity: `Alpha Industrial Supply`.

The id join is `V201` → `V-201`. The two display names are different strings.

### 7:00 — Detect and Score on the alias case

1. Select `INV-1006-ALIAS`. Open `4. Detect`.
2. Duplicate Detector: `FLAGGED`. Match key: `V-201:PO-7001:9800`. Prior match: `INV-1001`.
3. Rank: `#5 of 420 cohort`. Raw index: `0.91`. Honesty Badge: `SIMULATED`. Status: `SCORED`.
4. Open `5. Score + Decide`.
5. Outcome: `REVIEW`. Recommended: `REJECT`.
6. Rules fired: `R-DUP`, `R-ALIAS`.
7. Reasons: `DUP_SUPPLIER_PO_AMOUNT`, `ALIAS_CANONICAL_JOIN`, `POLICY_REVIEW`.

### 8:00 — Verify and Detect on INV-1003 (CH-88)

1. Select `INV-1003`. Open `3. Verify`.
2. Identity Consistency: `SOD VIOLATION FLAGGED`.
3. Record: `CH-88 (bank_account)`. Requester: `U22`. Approver: `U22 (Same user!)`.
4. Master Data Status: `HELD_FOR_REVIEW`.
5. Masked account: `XXXX9988`. Bank verification method: `none`.
6. Open `4. Detect`.
7. Duplicate: `CLEAN`.
8. Split sibling: `SIBLING DETECTED`, sibling `INV-1004`, pair sum `$9900 USD`. The `$9900` had no separate honesty badge in the notes.
9. PO check: `NON-PO`.
10. Rank: `#2 of 420 cohort`. Raw index: `0.96`. Honesty Badge: `PRECOMPUTED`.

### 9:00 — Score + Decide on INV-1003 and INV-1004

1. On `INV-1003`, open `5. Score + Decide`.
2. Outcome: `REVIEW`. Recommended: `REJECT`.
3. Rules: `R-SOD-BANK`, `R-BANK-SPLIT`, `R-NONPO`.
4. Reasons: `NON_PO`, `BANK_CHANGE_LINKED`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`, `POLICY_REVIEW`.
5. The rationale names `CH-88`, bank `XXXX1122` to `XXXX9988`, requester and approver `U22`, sibling `INV-1004`, sum `9900 USD`.
6. Select `INV-1004`. Open `5. Score + Decide`.
7. Same pattern: outcome `REVIEW`, recommended `REJECT`, sibling named `INV-1003`, same reason codes, same three rules.

Both cases stay `REVIEW` until a person acts.

### 10:00 — Review on INV-1003 before a decision

1. Select `INV-1003`. Open `6. Review`.
2. Queue Status: `AWAITING NAMED REVIEWER`.
3. Recommended: `REJECT`.
4. Three equal buttons: `Agree REJECT`, `Disagree & Set APPROVE`, `Manager Override`.
5. Name field already filled: `Sarah Jenkins (AP Lead)`.
6. The screen also showed `Active Review Session Time: 14s`. No honesty badge. That `14s` was the same on every Review screen opened in this session.

### 11:00 — Blank name, then Disagree

1. Clear the name. Click `Disagree & Set APPROVE`.
2. The case stays on Review. Message: `Reviewer account name is required by PRD P2P-FR-003.`
3. Type `Ada`. Click `Disagree & Set APPROVE`.
4. The case list changes `INV-1003` to `APPROVE`.
5. The screen moves to `7. Notify`.
6. Notify payload Decision Outcome: `APPROVE`. Notify Count: `0` (REAL for this moment; no notify click yet).
7. Reason codes on the payload were still `NON_PO`, `BANK_CHANGE_LINKED`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`, `POLICY_REVIEW`.

### 12:00 — Case History rebuild for INV-1003

1. Before the Ada click, Case History for `INV-1003` showed `0` audit rows and the text `No audit rows written yet for this case.`
2. After the Ada click, open `Case History & Rebuild` and select `INV-1003`.
3. State: `REVIEWED`. Audit rows: `1`.
4. Actor: `Ada`. Transition: `DECIDED` to `REVIEWED`.
5. Outcome and score line: `APPROVE • #2 of 420 cohort`. The notes do not record a separate honesty badge on this history line. Detect for this case had badge PRECOMPUTED on that rank.
6. Model: `p2p-risk-2`. Rule: `p2p-rules-v2.0`.
7. Reasons: `NON_PO`, `BANK_CHANGE_LINKED`, `SOD_SAME_USER_BANK`, `SPLIT_SIBLING_SUM`, `POLICY_REVIEW`.
8. Note on the row: `Review closed with disposition: disagree. Final outcome: APPROVE.`

### 13:00 — Scorer down on INV-1005

1. `INV-1005` starts as `APPROVE` on the seed list.
2. Click the header control until it reads `Scorer: DOWN (UNSCORED)`.
3. Select `INV-1005`. Open `4. Detect`.
4. Honesty Badge: `REAL`. Status: `UNSCORED`. Rank field: the word `NULL`. Banner: `UNSCORED (Scorer Down / Timeout)`.
5. Open `5. Score + Decide`. Outcome: `REVIEW`. Recommended: `REVIEW`. Rule fired: `R-UNSCORED`. Reasons: `SCORER_UNSCORED`, `POLICY_REVIEW`.
6. The case list shows `INV-1005 (REVIEW)`.
7. Open `6. Review`. Buttons: `Agree REVIEW`, `Disagree & Set APPROVE`, `Manager Override`.
8. The rank field showed the word `NULL`. The notes for that screen record no score of `0`.

### 14:00 — Pay twice

The notes record `INV-1005` as `APPROVE` with Payment Count `0` before any pay click. The scorer-down pass above left that case as `REVIEW`. The notes do not name the click that restored `APPROVE`. Before you repeat the pay pass, confirm the header says the scorer is not down and the case list shows `INV-1005 (APPROVE)`. If the list still says `REVIEW`, click `Reset`, then select `INV-1005` again and confirm `APPROVE` before you pay.

**Already paid — INV-1001**

1. Select `INV-1001`. Open `8. Pay`.
2. Status is already `PAID`. Payment Count: `1`.
3. Click `Retry / Re-verify Idempotent Payment`.
4. Banner: `Idempotency verified: Payment already completed under key 'INV-1001:payment'. Returned existing payment confirmation. Count remains 1.`
5. Payment Count stays `1`. Honesty: REAL.

**First pay, then retry — INV-1005**

1. Select `INV-1005` while outcome is `APPROVE` and Payment Count is `0`.
2. Payer field already held `Michael Vance (Treasurer)`.
3. Button: `Authorize & Pay $3,200 USD`. The `$3,200` had no honesty badge in the notes.
4. First click banner: `Payment released successfully. Key: INV-1005:payment. State updated to PAID.`
5. Payment Count: `1`. Status: `PAID & SETTLED`. Audit ID: `AUDIT-INV-1005-PAY`.
6. Header WORM Ref changed from `1 row` to `2 rows`. That row count is REAL for this click.
7. Second click banner: `Idempotency verified: Payment already completed under key 'INV-1005:payment'. ... Count remains 1.`
8. Payment Count stays `1`. Honesty: REAL.

### 16:00 — Notify retry on INV-1001

1. Select `INV-1001`. Open `7. Notify`.
2. Notify Count is already `1`. Key: `INV-1001:notify`. Supplier line: `Alpha Industrial Supply (V-201)`.
3. Click `Retry / Verify Idempotent Notify`.
4. Banner: `Idempotency verified: Notification already sent under key 'INV-1001:notify'. Returned existing record. Count remains 1.`
5. Notify Count stays `1`. Honesty: REAL.

This session did not run a notify path that ignores the idempotency key. Naive notify count is Unknown. See `SIDE_EFFECT_COUNTER.md`.

### 17:00 — Model Governance & Metrics

1. Open `Model Governance & Metrics`.
2. The page did not show an accuracy `94%` figure.
3. Table honesty classes included:
   - PRECOMPUTED: precision `0.52`, recall `0.71`, false-positive rate `0.18 / 0.24`.
   - EDUCATIONAL: packet pattern catch rate `100% (4 / 4)`.
4. PR-AUC row said `Missing`. Honesty on that row: `Unknown`.

### 18:00 — WORM Reference Store after Reset

1. Click `Reset`.
2. Open `WORM Reference Store`.
3. One locked row: `WORM-REF-001`, audit `AUDIT-INV-1001-01`, case `INV-1001`, outcome `APPROVE`, timestamp `2026-08-11T10:05:00`.
4. Page text says no delete or overwrite controls are on that screen. This session did not see a delete button.
5. This session did not attempt a second write of the same audit id. That refusal test is Unknown.

## Required screens

| Screen | This session |
|---|---|
| 1. Ingest | Opened. Body fields not recorded. |
| 2. Extract | Opened. INV-1002 percents recorded. |
| 3. Verify | Opened. Recorded for INV-1006-ALIAS and INV-1003. INV-1002 Verify recorded the canonical entity name only. |
| 4. Detect | Opened. Recorded for INV-1001, INV-1002, INV-1006-ALIAS, INV-1003, INV-1005. |
| 5. Score + Decide | Opened. Recorded for INV-1002, INV-1006-ALIAS, INV-1003, INV-1004, INV-1005. |
| 6. Review | Opened. Recorded for INV-1003 and for scorer-down INV-1005. |
| 7. Notify | Opened. Recorded after the Ada click on INV-1003, and for the INV-1001 retry. |
| 8. Pay | Opened. Recorded for INV-1002 (locked), INV-1001, and INV-1005. |
| Case History & Rebuild | Opened. INV-1003 rebuild recorded. |
| WORM Reference Store | Opened after Reset. One locked row recorded. |
| Model Governance & Metrics | Opened. Metrics above recorded. |

## Not a confirmed page

| Tab | What was seen | What this file does not claim |
|---|---|---|
| Escalation Events | Tab visible. Badge showed `3`. | Page body. Which three events. |
| Acceptance Test Suite (AC-001..AC-038) | Tab label visible. | Any AC pass or fail inside that page. |

No required workflow screen from this session was missing. The two tabs above were visible and were not opened.
