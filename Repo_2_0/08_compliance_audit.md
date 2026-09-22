# 8 — Compliance monitoring and audit evidence

This file is the To-Be audit design. The application writes the audit row before payment state changes. A tamper-resistant store holds references. Deletable identity stays in a normal store.

It closes D1 spine 8 gaps: P2P-05 Missing, vendor-change evidence not linked to the payment decision, missing model and rule versions, missing human actions. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 8; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` P2P-05, M-05; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-09.

## Exceptions this packet can detect

Detect only where D1 evidence supports the signal. Do not invent feeds.

| Exception type | Supported by D1? | How To-Be detects it | Packet example |
|---|---|---|---|
| Duplicate payment | Yes | Canonical supplier + PO + amount | INV-1001 and INV-1002, 9800, both PAID |
| Alias hide | Yes | Alias file join | `V-201` / `V201` |
| Same-user bank change | Yes | Requester equals approver | CH-88 U22 / U22 |
| Bank change then invoice | Yes | Linked change id | CH-88 then INV-1003 at 11:15 the next day |
| Split / sibling non-PO | Yes | Sibling sum | 4950 + 4950 = 9900 |
| Non-PO expedite | Yes | Empty PO | `NON_PO_UNDER_5000` in the As-Is log |
| Behavioural SoD overlap | Partial | Role overlap named in access review | Vendor-master users who also pay. Per-user matrix Missing. |
| Velocity | Partial | Two process times one minute apart | INV-1003 at 11:15, INV-1004 at 11:16 on 2026-08-12. `invoices.csv` has no timestamps. |
| Geographic | No | **Unknown**. No country or location field on the invoice rows. `vendor_verification.md` names countries and does not list them. | Do not invent a geography feed. |

A numeric velocity cutoff (invoices per hour) is `THRESHOLD_UNSET`. A numeric sibling-time window is also `THRESHOLD_UNSET`. Until a D3 ADR names an owner, store the named pair INV-1003 and INV-1004 and the two times (11:15 and 11:16). REJECT still needs a named rule from `06_governed_decisioning.md`. The sibling join stays that pair.

## Compliance escalation events

The application writes an escalation event when a named control fires. The event is a row, not an email.

| Event | Trigger | Notify |
|---|---|---|
| `ESC_DUP` | R-DUP | AP (P2P-01) |
| `ESC_ALIAS` | Unresolved alias or alias match | AP and Master Data |
| `ESC_SOD` | Same-user bank change | Finance Controls (P2P-03) |
| `ESC_BANK_SPLIT` | Linked bank change plus split or non-PO | Procurement (P2P-04) and Master Data (P2P-02) |
| `ESC_UNSCORED` | Scorer down | Model owner once D3 names that person. Operations until then. |
| `ESC_EXTRACT` | Uncertain extract | AP |
| `ESC_P2P05` | Attempt to change payment state with no audit row | P2P-05 owner (TBD). Block the state change. |
| `ESC_CONTEST` | Contest opened | REVIEW owner |

P2P control rows stay visible. Status words below are To-Be targets. They do not delete the As-Is statuses.

| Control | As-Is status | To-Be behaviour |
|---|---|---|
| P2P-01 Duplicate invoice check | Active, but method invoice_number_only missed INV-1002 | Match supplier + PO + amount after alias join |
| P2P-02 Supplier bank change approval | Partial | Same-user change cannot auto-apply. Link to later invoices. |
| P2P-03 Segregation of duties | Manual | Automated flag at change time. Continuous watch in file 09. |
| P2P-04 Non-PO exception review | Inconsistent | Empty PO → REVIEW. Split pair → REVIEW. |
| P2P-05 Immutable payment decision evidence | Missing, owner TBD | This file. Owner still TBD until D3 ADR. |

## Audit row contents

Write one application audit row per state change that matters. Required fields:

| Field | INV-1003 To-Be example |
|---|---|
| audit_row_id | Application-generated |
| case_id | INV-1003 |
| actor | System step or named person. U22 is the invoice approver. Reviewer id added at REVIEW. |
| from_state | DETECTED |
| to_state | IN_REVIEW |
| outcome | REVIEW |
| anomaly_rank | Rank or empty |
| scorer_status | scored or unscored |
| model_version | `p2p-risk-1` or `p2p-risk-2` or empty |
| rule_version | Named pack |
| prompt_ids | Ids and hashes if a language model wrote text |
| reason_codes | NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM |
| inputs_hash | Hash of the decision-time fields |
| linked_change_ids | CH-88 |
| sibling_invoice_ids | INV-1004 |
| sibling_amount_sum | 9900 |
| workflow_state | DECIDED / IN_REVIEW |
| human_intervention | Empty until the person acts, then disposition |
| created_at | Write time |

Repo 1.0 `audit_extract.log` stores two lines and the note “No vendor-change evidence linked to payment decision.” To-Be always stores the link when a change exists.

Missing As-Is lines that To-Be must also write: INV-1001, INV-1002, INV-1004, CH-89.

## Write the audit row first

Order of work on a pay attempt:

1. Application writes the audit row with intended `to_state=PAID`, payer id, reason codes, model version, rule version, and linked change ids.
2. Application writes references (audit_row_id, document hashes, inputs_hash) into the WORM store. WORM means write once, read many. After lock, delete and overwrite are refused for the retention period.
3. Only then may invoice status change to `PAID`.
4. Payment step uses idempotency key `case_id:payment`.

If step 1 or step 2 fails, payment does not run. Event `ESC_P2P05` fires.

A change-data feed is not the first recorder. The application is the first recorder.

## Two stores

| Store | What it holds | Delete |
|---|---|---|
| WORM / tamper-resistant | References: audit_row_id, document hash, inputs_hash, rule version, model version, outcome, timestamps | Refused for the retention period. Retention days: `THRESHOLD_UNSET`. D3 ADR names the owner. |
| Normal identity store | Names, emails, full bank numbers, user display names | Deletable under a later privacy request. The WORM row still points at a hash. |

Do not lock personal data in WORM. CH-89 emails `ap@vendor.example` and `accounts@vendor.example` stay in the normal store. The WORM row stores a hash of the email field, not the mailbox text.

Worked rebuild two years later: a reader loads audit_row for INV-1003, follows `linked_change_ids=CH-88`, reads reason codes, model version, rule version, reviewer disposition, and the WORM hashes. The reader can rebuild actor, from-state, to-state, score or unscored, and reasons.

## What stays open

- P2P-05 owner: TBD. D3 ADR.
- Geography feed: Unknown.
- Velocity numeric cutoff: `THRESHOLD_UNSET`.
- Sibling-time window: `THRESHOLD_UNSET`. Until the ADR, store INV-1003 and INV-1004 only.
- Retention days: `THRESHOLD_UNSET`.
- Per-user SoD matrix: Missing. File 09 asks for it.
