# 1 — Decision, risk, and boundary

This file is the To-Be boundary for the payment decision. It closes D1 spine 1 gaps: trainer outcome names, risk appetite, prohibited automation, and mandatory human oversight. Paths for the As-Is gaps: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 1; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-06; `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-12.

RCTE row: `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-06.

## Business decision

Finance must decide whether a supplier invoice can safely go on to payment.

The event is one supplier invoice. The objects in the decision are the supplier, the purchase order (PO), the goods receipt, the invoice, the supplier bank account, the requester, and the approver. Payment is the action that cannot be undone. INV-1001 and INV-1002 already have status `PAID` in the inherited files. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

## Users affected

These roles already appear in Repo 1.0. This file does not invent a person.

| Who | What this decision does to them | Source |
|---|---|---|
| Accounts Payable (AP) | Processes the invoice and owns control P2P-01. | `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv` |
| Master Data | Applies supplier bank or email changes. Owns P2P-02. | Same file. |
| Finance Controls | Owns segregation of duties (P2P-03). | Same file. |
| Procurement | Owns non-PO exception review (P2P-04). | Same file. |
| Internal Audit | Named as a later detector of some segregation issues. | `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md` |
| The company | Loses money if a duplicate or a diverted bank account is paid. | `D1_AsIs_Assessment/00_LOCKED_FACTS.md` |
| A legitimate supplier | Misses the promised pay time if a false block sits in a queue. | Same file. An SLA is the promised time to handle the invoice. |

The person who owns `REVIEW` is a named human account. Repo 1.0 does not store that name. Path: `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-07 and M-10. An ADR in D3 must name that person. Until the ADR exists, the queue uses the nearest control owner already in `control_matrix.csv`: AP for duplicate cases, Procurement for non-PO cases, Finance Controls for segregation cases, Master Data for bank-change cases.

P2P-05 owner stays `TBD`. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`. The same D3 ADR names that owner.

## Outcomes

Written policy picks one of three names. The model does not pick the money outcome.

| Outcome | What it means | Who acts next |
|---|---|---|
| APPROVE | Policy allows the invoice to go toward payment. | A named person releases payment. AI does not pay. |
| REVIEW | A named person must decide. The case waits in a persisted queue. | The named REVIEW owner. |
| REJECT | Policy forbids payment on this invoice. | Notify the requester and the supplier contact. No pay step runs. |

`PROCESS` is a Repo 1.0 result word. Paths: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`; `05_workflow_orchestration/processing_log.txt`. This design does not keep `PROCESS`.

`PAID` and `APPROVED` on `invoices.csv` are invoice status words. They are not outcome names. After policy says APPROVE, a named person may set status `PAID`. After policy says REVIEW, status stays held. After policy says REJECT, status stays unpaid.

Worked case for the three words: INV-1003 stored `PROCESS` on the log and `APPROVED` on the invoice file. Path: `D1_AsIs_Assessment/02_CASE_REPLAY.md`. In this design the same facts (empty PO, 4950, `bank_changed_30d=Y`, CH-88 same user U22, sibling INV-1004) produce `REVIEW`.

## Anomaly and fraud scenarios (P2P list)

Each row uses locked D1 numbers as evidence of today’s behaviour.

| Scenario | What the files already show | To-Be route | RCTE |
|---|---|---|---|
| Duplicate invoices with different invoice ids | INV-1001 and INV-1002: supplier `V-201`, PO `PO-7001`, amount 9800, both `PAID`. Check method `invoice_number_only`. INV-1002 stored `NO_DUPLICATE`. | Match on canonical supplier + PO + amount. Hold the later invoice. Outcome `REVIEW` with recommended `REJECT` of the second payment. | RCTE-01 |
| Alias ids | `V-201` name Alpha Industrial Supply. `V201` name Alpha Industries Supply. | Normalize before the match. Treat the two ids as one supplier for duplicate checks. | RCTE-02 |
| Anomalous pricing | Model card lists `amount`. No price catalog in the packet. | Rank the case. Policy does not auto-pay from the rank. Uncertain price evidence goes to `REVIEW`. | RCTE-07 |
| Supplier-master manipulation | CH-88: V-311 `bank_account` XXXX1122 to XXXX9988, requester U22, approver U22, `2026-08-11T13:44:00`, result SUCCESS. | Same-user bank change cannot apply itself. Outcome `REVIEW`. | RCTE-03 |
| Approval bypass | INV-1003 and INV-1004: empty PO, 4950 each, `bank_changed_30d=Y`, rule `NON_PO_UNDER_5000`, result `PROCESS`. | Non-PO plus recent bank change goes to `REVIEW`. The As-Is 5000 expedite is retired. | RCTE-04, RCTE-05 |
| Split invoices around the As-Is 5000 line | 4950 + 4950 = 9900, one minute apart (11:15 and 11:16 on 2026-08-12). | Aggregate sibling invoices on the same canonical supplier. Pair goes to `REVIEW`. 5000 stays As-Is evidence. | RCTE-04 |
| Segregation of duties | CH-88 same user. Some vendor-master users also pay. | Same requester and approver cannot finish a bank change. Vendor-master role cannot also release payment. | RCTE-03, RCTE-10 |
| Evidence from vendor change to payment | Audit line for INV-1003 is `PROCESS`. It does not link CH-88. | One audit row stores CH-88 with INV-1003 and INV-1004 before any pay state change. | RCTE-09 |
| Human escalation | Review queue is an email inbox. | A named person sees evidence, can agree or disagree, and records a disposition. | RCTE-11 |

## Risk appetite

Finance wants earlier detection and also wants to keep the payment SLA. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md`.

Harm if the route is wrong:

- Company money goes out on a duplicate or a diverted bank account. Worked case: two 9800 USD payments on INV-1001 and INV-1002.
- A legitimate supplier waits past the SLA if a good invoice sits in REVIEW.

This design accepts more REVIEW cases on the Wave 1 packet than Repo 1.0 accepted `PROCESS` cases. Wave 1 sends bank-change-plus-split cases to a person. Path: `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md`.

This file does not set a numeric false-positive target. `evaluation.csv` stores false-positive rate 0.18 on `p2p-risk-1` and 0.24 on `p2p-risk-2`. Honesty: PRECOMPUTED. A later model owner names the operating target in a D3 ADR.

## Applicable regulatory obligations

**Unknown.** Repo 1.0 folder `01_decision_risk_boundary` names business risks and does not name a statute. Paths: `business_problem.md`; `risk_notes.md`.

### Change request CR-REG-01

Ask Legal and Finance Controls which statutes, accounting rules, and internal policies apply to this shared-services payment decision. Include whether a sanctions, PEP, or address check is required. PEP means Politically Exposed Person.

Until CR-REG-01 returns an answer, this design does not invent a statute list. Uncertain identity or compliance evidence still goes to `REVIEW`. See `04_document_identity_compliance.md`.

## Prohibited automation

These actions cannot run without a named person.

1. Release payment. AI may analyse and recommend. A named person pays. Path for the risk: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`.
2. Treat a model rank as APPROVE or REJECT. Written policy picks the outcome.
3. Apply a supplier bank-account change when requester and approver are the same user. Worked case: CH-88 U22 / U22.
4. Auto-pay a non-PO invoice because the amount sits under the As-Is 5000 line. INV-1003 and INV-1004 used that path.
5. Skip the audit row and then change payment state.
6. Write `score = 0` after a crash. Failure goes to REVIEW. The case is stored as unscored.
7. Retry payment or notify without an idempotency key. The key is case id plus step name.
8. Change a policy amount while the amount is `THRESHOLD_UNSET`. An ADR in D3 must name an owner first.

## Mandatory human-oversight points

A named person must act in each of these cases.

| Trigger | Why a person is required | Packet example |
|---|---|---|
| Duplicate match on canonical supplier + PO + amount | Second payment cannot be pulled back. | INV-1002 vs INV-1001, 9800 USD. |
| Alias collision on the match key | `V-201` and `V201` can hide a duplicate. | `supplier_aliases.csv`. |
| Same-user requester and approver on a bank change | Segregation of duties failed at change time. | CH-88, U22 / U22. |
| Invoice after a linked bank change, including a split pair | Approval bypass plus diverted account. | CH-88 then INV-1003 and INV-1004, 4950 + 4950 = 9900. |
| Empty PO | The As-Is expedite is retired. Amount line is `THRESHOLD_UNSET`. | INV-1003, INV-1004. |
| Extract fields missing or uncertain | Wrong payee or wrong amount. | `invoice_extraction.md` known issues. |
| Scorer down or extract down | Repo 1.0 behaviour is Unknown. Locked later path: REVIEW and unscored. | `D1_AsIs_Assessment/00_LOCKED_FACTS.md`. |
| Reviewer disagrees with the recommendation | Equal-weight actions. Disagree must be as easy as agree. | Closes M-10. |
| Payment execute | Irreversible. | INV-1001 already `PAID`. |

## Capability verbs

AI may analyse and recommend on every capability. A named person decides. A named person executes payment. Path: `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md`.

| Capability | Analyse | Recommend | Decide | Execute |
|---|---|---|---|---|
| Duplicate payment detection | AI allowed | AI allowed | Named person | Named person pays |
| Supplier bank-account change | AI allowed | AI allowed | Named person other than the requester | Named person in Master Data |
| Split / non-PO invoice | AI allowed | AI allowed | Named person | Named person pays |
| Segregation of duties | AI allowed | AI allowed | Finance Controls (named owner in the matrix) | Named person. The requester does not also execute. |
| Payment release | AI allowed | AI allowed | Named person | Named person only |

## What stays open

- Regulatory list: Unknown. CR-REG-01.
- REVIEW person name: Missing. D3 ADR.
- P2P-05 owner: TBD. D3 ADR.
- Numeric risk-appetite target: `THRESHOLD_UNSET`. D3 ADR.
