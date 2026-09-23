# Slide outline

Speak these slides in this order. Each bullet is one fact a teammate can say without opening another file.

Use case 5 is Procure-to-Pay Exception and Payment Control. Source for the use-case name: `Runbook Pages 4-5.pdf`, page 5.

---

## Slide 1 — What the case is

- This assignment is use case 5: Enterprise ERP / Shared Services, Procure-to-Pay Exception and Payment Control.
- Shared-services finance decides whether one supplier invoice can go on to payment.
- Payment is the step that cannot be undone. INV-1001 and INV-1002 are already paid at 9800 USD each, supplier V-201, purchase order PO-7001.
- The packet also holds a same-user bank change, CH-88, and two later invoices, INV-1003 and INV-1004, at 4950 USD each.
- The hand-back is four folders plus this presentation: the As-Is reading, the Repo 2.0 design, the product requirements document, and the working app.
- Page 4 of the runbook still shows the job in the last column: stop manipulation, approval bypass, and suspicious patterns, and keep segregation of duties, evidence, and a person in the path.

## Slide 2 — D1 As-Is findings

- Conflict C-01: the approval matrix names role AP_SUPERVISOR at amount 5000. The rule file sends an empty purchase order under 5000 to PROCESS. INV-1003 at 4950 USD took PROCESS.
- Conflict C-02: the business note names invoice splitting. The rule file says there is no split-invoice aggregation. INV-1003 and INV-1004 are 4950 plus 4950, which is 9900, and both took PROCESS.
- Conflict C-03: the risk note names a requester and approver conflict. CH-88 has requester U22 and approver U22, and the audit line stores SUCCESS. The rule file has no requester/approver conflict rule.
- Control P2P-05, immutable payment decision evidence, has status Missing and owner TBD. The two audit lines do not make that control exist.
- D1 recorded both sides of each conflict. D1 did not pick a winner and did not edit Repo 1.0.

## Slide 3 — D2 Repo 2.0 spine map

- The runbook lists ten steps. Repo 2.0 has one design file for each step. Repo 1.0 stays as evidence.
- Step 1 states the decision: outcomes are APPROVE, REVIEW, and REJECT. The model ranks. A named person pays.
- Step 2 keeps the packet cases: the 9800 USD pair, the alias V-201 and V201, and CH-88 before INV-1003.
- Step 3 compares models on precision, recall, and false-positive rate. The copied accuracy cells stay in the source file.
- Step 4 joins alias ids and sends an uncertain extract to a person.
- Step 5 links the bank change to the later invoice and puts a key on Pay and Notify.
- Step 6 retires PROCESS. Empty purchase order, same-user bank change, and the named pair INV-1003 plus INV-1004 go to REVIEW.
- Step 7 puts Agree, Disagree, and Override on the same screen and adds a contest path.
- Step 8 writes the audit row before payment status changes. P2P-05 owner stays TBD.
- Step 9 watches false-positive rate, override rate, unscored rate, and audit completeness.
- Step 10 keeps the two old green tests visible until new tests replace them. New amount lines stay unset until a named owner writes a decision note.

## Slide 4 — D3 PRD and acceptance cases

- The requirements document is version D3a. The app may implement only that document.
- Outcomes stay APPROVE, REVIEW, and REJECT. A named person owns REVIEW. The model does not release payment.
- Acceptance case 1: INV-1002 matches INV-1001 on supplier, purchase order, 9800 USD, and currency, so INV-1002 goes to REVIEW.
- Acceptance case 2: a new invoice that uses supplier id V201 joins to V-201 and goes to REVIEW.
- Acceptance case 3: CH-88, then INV-1003 and INV-1004, goes to REVIEW. Payment does not run. The pair sum 9900 is stored.
- Acceptance case 4: if the scorer is down, the outcome is REVIEW, the rank is empty, and the score is not written as 0.
- Acceptance case 5: paying twice with the same key leaves the payment count at 1.
- Every new numeric limit stays unset until a later note names an owner. The demo still reaches REVIEW with rules that need no new number.

## Slide 5 — D4 demo path and five cases

- The click evidence is the local app at http://localhost:3000 on 22 Sep 2026. The hosted Studio page stopped at Google sign-in.
- The path a person walks is Ingest, Extract, Verify, Detect, Score + Decide, Review, Notify, Pay, then Case History.
- Duplicate case: INV-1002 went to REVIEW with reason DUP_SUPPLIER_PO_AMOUNT. Payment Count stayed 0. Result PASS.
- Alias case: injected invoice INV-1006-ALIAS used raw id V201, joined to V-201, and went to REVIEW. Result PASS.
- Bank-change case: INV-1003 and INV-1004 both stayed REVIEW. Ada could disagree on the same screen as agree. A blank name was refused. Result PASS.
- Scorer-down case: INV-1005 showed rank NULL, banner UNSCORED, outcome REVIEW. The notes record no score of 0. Result PASS.
- Payment-retry case: INV-1005 went from Payment Count 0 to 1, and the second click stayed at 1, key INV-1005:payment. Result PASS.
- The rank on screen is an order in a cohort. Detect labeled the INV-1003 rank PRECOMPUTED. It is not a percent chance the invoice is bad.

## Slide 6 — One rebuilt case

- Case INV-1003, after Ada clicked Disagree and set APPROVE.
- Actor: Ada.
- From-state: DECIDED. To-state: REVIEWED.
- Score text on the audit line: #2 of 420 cohort. Detect had already labeled that rank PRECOMPUTED, with raw index 0.96.
- Reasons: NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW.
- Model version: p2p-risk-2. Rule version: p2p-rules-v2.0.
- The row note says the review closed as disagree and the final outcome is APPROVE.
- Before that click, Case History showed 0 audit rows. Prompt id on the row: Unknown.

## Slide 7 — Residual risk and Unknowns

- Statutes, sanctions, politically exposed persons, and address checks are Unknown. No country feed exists on the invoice rows.
- The goods-receipt file is Missing. The price catalog is Unknown.
- The review owner, the payer role, the model owner, the data owner, and the P2P-05 owner are Missing or TBD until a later note names them.
- New amount lines, the sibling time window, contest days, and retention days stay unset. The sibling pair in force is only INV-1003 and INV-1004.
- Precision and recall on model p2p-risk-2 are blank. PR-AUC is Missing. No one has measured how many bad pays still get through.
- Naive and cached Pay and Notify counts are Unknown. The measured safe payment count on INV-1005 stayed at 1.
- The 22 Sep session did not record an Open Contest click. A second write of the same audit id was not attempted. Those two results are Unknown.
- The demo audit list lives in the browser. It is a classroom copy of a store that refuses delete and overwrite.

## Slide 8 — Appendix: Repo 1.0 files compared with the D4 app

Repo 1.0 is the inherited file pack. The D4 app is the running demo built from the Repo 2.0 design.

Repo 1.0 features:

- A folder of files. Four invoices, two supplier changes, alias names, rules, a model card, and five controls.
- The duplicate check uses the invoice number only.
- An empty purchase order under 5,000 goes forward. The result word is PROCESS.
- A recent bank change goes to review only when the amount is over 10,000.

Repo 1.0 limitations:

- INV-1001 and INV-1002 are both paid at 9,800 USD. The check stored NO_DUPLICATE.
- INV-1003 and INV-1004 are 4,950 + 4,950 = 9,900. Both took PROCESS. CH-88 is user U22 on both sides. The audit line does not link that change.
- P2P-05 is Missing. Owner TBD. There is no payment retry key. If the scorer is down, the path is Unknown.
- p2p-risk-2 flags 0.24 of good invoices. p2p-risk-1 flags 0.18. Precision and recall on p2p-risk-2 are blank.

D4 app features:

- Screens run from Ingest through Pay, plus Case History.
- Outcomes are APPROVE, REVIEW, and REJECT. A named person can disagree. A named person pays.
- INV-1002 goes to REVIEW on supplier, purchase order, and amount. V201 joins to V-201.
- CH-88 and the 4,950 pair go to REVIEW. A second Pay click stays at count 1. Scorer down leaves the rank empty.

D4 app limitations:

- The click evidence is the local browser app. The hosted page stopped at Google sign-in.
- The P2P-05 owner is still TBD. New amount lines are still unset. The goods-receipt file is still Missing.
- Precision and recall on p2p-risk-2 are still blank. PR-AUC is Missing.
- The contest click, a second write of the same audit id, and the naive retry counts were not measured.

## Slide 9 — Appendix: how the D4 app answers the four Repo 1.0 flaws

- Flaw 1. Both 9,800 USD invoices were paid. The check stored NO_DUPLICATE. The D4 app sends INV-1002 to REVIEW. The match is supplier V-201, purchase order PO-7001, and 9,800 USD. Payment count stays 0.
- Flaw 2. The 4,950 pair took PROCESS. CH-88 is user U22 on both sides. The audit line does not link that change. The D4 app keeps both invoices in REVIEW. The screen names CH-88, same user U22, the empty purchase order, and the pair sum 9,900. The audit row stores BANK_CHANGE_LINKED.
- Flaw 3. P2P-05 is Missing. There is no payment retry key. If the scorer is down, the path is Unknown. The D4 app uses a payment key. A second click on INV-1005 stays at count 1. Scorer down sets REVIEW and leaves the rank empty. The P2P-05 owner is still TBD.
- Flaw 4. p2p-risk-2 flags 0.24 of good invoices. p2p-risk-1 flags 0.18. Precision and recall on p2p-risk-2 are blank. The metrics page shows those rates. The rank orders the case. A named person pays. Precision and recall on p2p-risk-2 stay blank.

## Slide 10 — Appendix glossary: codes on the cases

- CH is a supplier-master change id. CH-88 is the bank change. CH-89 is the email change. The files do not spell out the letters C and H.
- U is a user id. U22 requested and approved CH-88. U11 is on the two paid invoices.
- INV is an invoice id. V is a supplier id. PO is the purchase order, the company’s buy record.
- AP is Accounts Payable. P2P is Procure-to-Pay.
- P2P-01 through P2P-05 are the five controls. P2P-05 is Missing. Owner TBD.
- P2P-FR is a functional requirement. P2P-AC is an acceptance case.
- SoD is segregation of duties. The requester and the approver are different people.

## Slide 11 — Appendix glossary: codes on the documents

- D1 to D4 are the reading, the design, the requirements, and the app. D3a is this requirements version. D3b must name the owners.
- PRD is the Product Requirements Document. ADR is the short note that records a number, an owner, and why.
- TBD means no person is named yet. PROCESS is the old result word.
- WORM means write once, read many. After lock, delete and overwrite are refused.
- PR-AUC is a ranking score for the rare bad class. That number is Missing.
- USD is the currency on the four invoices. ERP is the company system named in use case 5. The packet does not spell out E, R, and P.
- C-01, C-02, and C-03 are the three conflicts on slide 2.
