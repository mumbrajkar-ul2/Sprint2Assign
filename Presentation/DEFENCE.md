# Defence answers

Read these answers out loud. Each answer uses files already written in this project. If a fact was not stored, the answer says Unknown.

Use case 5 is Enterprise ERP / Shared Services — Procure-to-Pay Exception and Payment Control. Source: `Runbook Pages 4-5.pdf`, page 5.

---

## 1. What event did you score or route, and which facts existed at decision time?

The event is one supplier invoice. The question is whether that invoice can go on to payment.

The facts that must be present when that decision is made are the invoice id, the supplier id, whether a purchase order exists, the amount, the currency, the approver, the flag `bank_changed_30d`, and the named rule version and model version. A later label that says “this was fraud” is not on these invoice rows.

Worked case, INV-1003, as the inherited files stored it. At 11:15 on 2026-08-12 the invoice row held: supplier V-311, empty purchase order, 4950 USD, approver U22, `bank_changed_30d=Y`, status APPROVED. The day before, at 2026-08-11T13:44:00, change CH-88 had already changed V-311’s bank account from XXXX1122 to XXXX9988. Requester U22. Approver U22. The running rule stored `NON_PO_UNDER_5000` and result `PROCESS`. The audit line stored `action=PROCESS` and said no vendor-change evidence was linked to the payment decision.

INV-1004 was processed at 11:16, one minute later, at the same 4950 USD. The inherited log does not say the pair total 9900 was an input to the 11:15 decision.

In the D4 demo both invoices were already loaded, so Score + Decide on INV-1003 also showed sibling INV-1004, pair sum 9900 USD, model `p2p-risk-2`, and rule pack `p2p-rules-v2.0`. The outcome on that screen was REVIEW.

Source: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`; `D1_AsIs_Assessment/02_CASE_REPLAY.md`; `D4_App/DEMO_SCRIPT.md`; `D4_App/TEST_EVIDENCE.md`.

---

## 2. What metric did you report instead of accuracy 94%, and why?

The operating numbers are precision, recall, false-positive rate, catch rate on the named packet patterns, review staffing, residual miss, and later PR-AUC.

False-positive rate is the share of good invoices the model flags. Precision is the share of flagged invoices that were later confirmed bad. Recall is the share of bad invoices the model flagged. PR-AUC is a ranking score that pays extra attention to the rare bad class.

The evaluation file stores accuracy 0.91 on `p2p-risk-1` and 0.94 on `p2p-risk-2`. Those cells stay as copied source facts. They are not the number operations leads with. Model `p2p-risk-2` has a higher accuracy cell and a worse false-positive rate: 0.24 versus 0.18 on `p2p-risk-1`. Precision and recall on `p2p-risk-2` are blank. `p2p-risk-1` stores precision 0.52 and recall 0.71. PR-AUC is Missing from the evaluation file.

The D4 metrics page showed precision 0.52, recall 0.71, and false-positive rates 0.18 and 0.24. It showed a classroom catch rate of 100% on 4 of 4 packet patterns. It did not show an accuracy 0.94 figure. The PR-AUC row on that page was Missing.

Source: `D3_PRD/PRD.md` (P2P-FR-033 and section 11); `Repo_2_0/C8_CHECK.md`; `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` (C-04); `D4_App/TEST_EVIDENCE.md`.

---

## 3. What are the outcome names? Who makes the money decision?

The outcome names are APPROVE, REVIEW, and REJECT.

Written rules pick the outcome. The model only ranks the invoice. A named person owns every REVIEW and can agree, disagree, or override. A named person releases the payment. The rank does not set the invoice to paid.

In the demo, reviewer Ada closed INV-1003 by disagreeing and setting APPROVE. That click moved the screen to Notify. Notify Count was 0. It did not record a payment. On INV-1005, the payer field showed Michael Vance (Treasurer). The first Pay click set status PAID under key `INV-1005:payment`. Payment Count became 1.

Repo 1.0 does not name the person who pressed pay. That person is Missing until a later decision note names the payer role. The demo names are typed on the screen. They are not names from the inherited files.

Source: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`; `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md`; `D3_PRD/PRD.md` (P2P-FR-001 through P2P-FR-004); `D4_App/TEST_EVIDENCE.md`; `D4_App/DEMO_SCRIPT.md`.

---

## 4. What would a retry duplicate, and how did you prove the count?

A second Pay click would write a second payment. A second Notify click would send a second notice. Those two steps use a key made from the invoice id plus the step name. A second click with the same key returns the first record.

Measured safe counts, honesty REAL:

| Case | Key | What the second click did |
|---|---|---|
| INV-1005 Pay | `INV-1005:payment` | Count was 0. First click set it to 1 and status PAID & SETTLED. Second click kept the count at 1. |
| INV-1001 Pay | `INV-1001:payment` | Count was already 1. Retry kept the count at 1. |
| INV-1001 Notify | `INV-1001:notify` | Count was already 1. Retry kept the count at 1. |
| INV-1002 Pay | No payment key used | Outcome stayed REVIEW. Payment Count stayed 0. Pay was not clicked. |

Naive counts and cached counts are Unknown. This session did not remove the key check, and the screens did not show a separate cached counter.

Source: `D4_App/SIDE_EFFECT_COUNTER.md`; `D4_App/TEST_EVIDENCE.md`; `D3_PRD/PRD.md` (P2P-AC-005 and P2P-AC-015).

---

## 5. Which inherited gap did you leave visible until a spec closed it?

Two inherited tests stayed visible as gap locks until the product requirements document replaced them.

The test “missing PO under threshold” still passed while INV-1003 and INV-1004, 4950 USD each, took rule `NON_PO_UNDER_5000` and result PROCESS. The test “exact invoice-number duplicate” still passed while INV-1002 was marked `NO_DUPLICATE` by invoice number only, even though INV-1001 was already paid at the same supplier, purchase order, and 9800 USD.

Repo 2.0 left both tests visible. It did not treat a green result on those tests as the business problem solved. The product requirements document closed that lock. Empty purchase order goes to REVIEW (P2P-AC-008). A duplicate match uses the official supplier id, the purchase order, the amount, and the currency (P2P-AC-001). The D4 demo showed both of those routes as PASS.

A numeric window for “which other invoices count as siblings” was also left visible. No specification closed it. That window is still `THRESHOLD_UNSET`. Until a later decision note names an owner, the sibling pair is only INV-1003 and INV-1004.

Source: `Repo_2_0/C8_CHECK.md`; `D3_PRD/PRD.md` (P2P-FR-071, P2P-AC-001, P2P-AC-008, P2P-FR-025); `D4_App/TEST_EVIDENCE.md`.

---

## 6. Rebuild one case: actor, from-state, to-state, score, reasons, model version, rule version

Case: INV-1003 after reviewer Ada disagreed. D4 Case History supports this rebuild. Before the click, that screen showed 0 audit rows.

| Field | Value on Case History |
|---|---|
| Actor | Ada |
| From-state | DECIDED |
| To-state | REVIEWED |
| Outcome on the same line | APPROVE |
| Score text on that line | #2 of 420 cohort |
| Reasons | NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW |
| Model version | p2p-risk-2 |
| Rule version | p2p-rules-v2.0 |
| Note | Review closed with disposition: disagree. Final outcome: APPROVE. |

Detect, before that click, showed the same rank `#2 of 420 cohort` and raw index 0.96. The honesty badge on that Detect rank was PRECOMPUTED. The Case History notes do not record a separate honesty badge on the history line.

The recommended outcome before the click was REJECT. Ada set APPROVE. Rules shown on Score + Decide were R-SOD-BANK, R-BANK-SPLIT, and R-NONPO. The rationale on that screen named CH-88, bank XXXX1122 to XXXX9988, requester and approver U22, sibling INV-1004, and sum 9900 USD.

Prompt version on the recorded audit row: Unknown. The Case History notes do not list a prompt id.

Source: `D4_App/TEST_EVIDENCE.md` (Rebuild check); `D4_App/DEMO_SCRIPT.md` (12:00 Case History).

---

## 7. Which facts does the Repo 1.0 audit trail leave out? Which of those does D4 now store?

Repo 1.0 `audit_extract.log` has two lines and a note. The lines are CH-88 result SUCCESS, and INV-1003 action PROCESS. The note says no vendor-change evidence is linked to the payment decision.

That trail leaves out the model version, the rule version, the inputs, the prompt, the workflow state, and the named human action. It does not link CH-88 to INV-1003. It has no lines for INV-1001, INV-1002, INV-1004, or CH-89. Control P2P-05, immutable payment decision evidence, is Missing. Owner is TBD.

D4 Case History for INV-1003 now stores the actor (Ada), from-state DECIDED, to-state REVIEWED, the rank text, the reason codes (including BANK_CHANGE_LINKED and SOD_SAME_USER_BANK), model `p2p-risk-2`, and rule `p2p-rules-v2.0`. Pay on INV-1001 stored audit id `AUDIT-INV-1001-01`. Pay on INV-1005 stored audit id `AUDIT-INV-1005-PAY` and the header WORM reference count moved from 1 row to 2 rows.

The recorded Case History line did not list the change id CH-88 as its own field. Score + Decide did name CH-88 in the rationale. Whether the Case History header showed CH-88 in this session is Unknown. The notes did not record that field. Prompt id on the audit row is Unknown. A second write of the same audit id, to prove the store refuses overwrite, was not attempted. That result is Unknown.

Source: `D1_AsIs_Assessment/01_SPINE_NOTES.md` (Spine 8); `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` (P2P-05); `Repo_2_0/08_compliance_audit.md`; `D4_App/TEST_EVIDENCE.md`; `D4_App/DEMO_SCRIPT.md`.

---

## 8. How does a person contest the outcome?

A supplier or an accounts-payable analyst may contest APPROVE, a REVIEW delay, or REJECT. The contest stores a contest id, the invoice id, the actor, and the text. The original audit row stays. A new audit row links to the first. The case opens a second REVIEW. The time allowed to contest is `THRESHOLD_UNSET`.

In the app, Notify has Open Contest. That action writes event `ESC_CONTEST`, appends an audit row, and returns the case to IN_REVIEW.

The 22 Sep 2026 click-through did not record an Open Contest click. Whether that button was pressed in the session is Unknown. The path is in the requirements and in the code.

A person can also disagree on the Review screen before any contest. Disagree sits on the same screen as Agree. On INV-1003, a blank name was refused. The message said a reviewer account name is required. Ada then clicked Disagree and set APPROVE. That is a review disposition. It is a separate step from the later contest.

Source: `D3_PRD/PRD.md` (P2P-FR-050 and P2P-AC-030); `D4_App/Documentation/SPINE_IMPLEMENTATION.md` (section 7); `D4_App/DEMO_SCRIPT.md` (11:00 Disagree).

---

## 9. If a control is missing from Repo 1.0, did you treat it as missing? Give one example (P2P-05).

Yes. A control that the files do not evidence stays Missing.

Example: P2P-05 Immutable payment decision evidence. The control matrix stores status Missing and owner TBD. D1 copied that row. D1 did not treat the two lines in `audit_extract.log` as that control. Those lines can still print `invoice=INV-1003 action=PROCESS`. That print does not make an immutable store exist. Immutable means the record cannot be overwritten or deleted for the keep period.

Repo 2.0 designs the later store: write the audit row before payment status changes, then write references into a write-once store. The owner stays TBD. The product requirements document keeps the same status. D4 has a reference list on screen. After Reset it showed one locked row, `WORM-REF-001`, for INV-1001. The page text says that screen has no delete or overwrite controls. A second write of the same audit id was not attempted, so refusal of that write is Unknown. The owner of P2P-05 is still TBD.

Source: `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` (P2P-05 and the worked example); `Repo_2_0/08_compliance_audit.md`; `D3_PRD/PRD.md` (control table in section 8); `D4_App/TEST_EVIDENCE.md` (WORM Reference Store).
