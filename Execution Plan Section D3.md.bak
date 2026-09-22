# Execution Plan — Procure-to-Pay Exception and Payment-Control

This file is the work method for the four runbook deliverables. [Project Intent.md](Project Intent.md) says what the assignment is. This file says the order of work.

The assignment contract is `Sprint_2 -  Steps_&_Approach - Runbook`. The method file is `SPRINT2_FDE_Learnings_and_Capstone_Guide.md`. Stay inside the runbook brief. Add a Sprint 2 control only when this payment decision needs it.

Do not edit files under `05_procure_to_pay_exception_repo_1_0`. Do not invent a payment cutoff.

---

## Work method (C.2 and C.3)

**C.3 primary:** messy estate of files. Assessment first. If a control is missing from the files, treat it as missing. Record conflicts.

**C.3 also true:** inherited repo. Forensic pass. Do not edit Repo 1.0. Specs-driven development starts at D3.

**C.2 first match:** inherited repo (Lab 27, then Lab 28 later). Inspect first. Replay the cases.

**C.2 rows the runbook list adds:**

| When | Lab row you add | Why |
|---|---|---|
| D2 | Specify, generate, find what is wrong (Lab 26) | Repo 1.0 to Repo 2.0 uses prompt and context engineering. |
| D2 and D4 | Accuracy or “90%” as the headline (Labs 23 and 26) | `p2p-risk-2` reports accuracy 94%. |
| D1 through D4 | A score can deny payment or block a supplier (Lab 31) | The runbook names APPROVE / REVIEW / REJECT. |
| D4 | Payment release, retries, human wait (Lab 29) | Payment cannot be undone. |
| D4 | Show this case in two years / WORM (Lab 30) | Control P2P-05 is Missing. Spine step 8 requires tamper-resistant evidence. |
| D3 and D4 | Written specs, then a small change (Lab 28) | The PRD leads. The build follows the PRD. |

---

## D1 — Repo 1.0 as the As-Is baseline

### Goal

Understand the inherited folder. Name architecture, data, workflows, gaps, inconsistencies, risks, and technical debt. Repo 1.0 stays as-is.

### Method

1. Walk the ten spine folders in `FOLDER_GUIDE.md` order.
2. For each spine step write three lists: what exists, what contradicts, what is missing.
3. Replay INV-1001, INV-1002, INV-1003, INV-1004, CH-88, and CH-89. Use [Project Intent.md](Project%20Intent.md) Appendix D as the starting replay. Confirm every fact against the source file.
4. Apply the Lab 32 rule: if a control is not in the files, it does not exist.
5. Write a conflict register. When two files disagree, write both sides and name who must choose.
6. Write a missing-control register from `control_matrix.csv` and from gaps the matrix does not name.
7. Split capabilities under the one product name:
   - Duplicate payment detection
   - Supplier bank-account change
   - Split / non-PO invoice
   - Segregation of duties
   - Payment release
8. For each capability write analyse / recommend / decide / execute. Payment execute stays with a named person. AI may analyse and recommend.

### Spine walk (what to look for)

| Spine step | Repo 1.0 folder | First facts to record |
|---|---|---|
| 1 Decision, risk, boundary | `01_decision_risk_boundary` | Duplicate pay, bank change, split invoice, approval bypass, SLA, AI used as authorization. |
| 2 Case, data, evidence | `02_data_evidence` | Four invoices, aliases V-201 / V201, CH-88 same-user bank change. |
| 3 Detection models | `03_detection_models` | Accuracy 94%. v2 precision and recall blank. v2 false-positive rate 0.24 vs v1 0.18. No independent validation. |
| 4 Documents and identity | `04_document_identity_compliance` | OCR field errors. Bank-change PDFs by email. Inconsistent out-of-band checks. |
| 5 Workflow | `05_workflow_orchestration` | Bank change and payment are separate. Duplicate check is invoice number only. No event correlation. |
| 6 Governed decisioning | `06_governed_decisioning` | PROCESS under 5000 with no PO. REVIEW only if bank change and amount over 10000. No split, conflict, alias, or precedence rule. Approval matrix vs expedite rule. |
| 7 Explainability and review | `07_explainability_review` | No linked evidence, model contribution, rule version, or reviewer text. Queue is an email inbox. |
| 8 Compliance and audit | `08_compliance_audit` | P2P-05 Missing. Vendor-change evidence not linked to the payment decision. |
| 9 Risk, security, observability | `09_ai_risk_security_observability` | Touchless rate is tracked. Prevented duplicate value is not. Shared model API key. SoD overlap. |
| 10 Production readiness | `10_production_readiness` | Shared rule file. Manual model deploy. Three tests present. Alias, split, same-user, bank-then-pay, outage, and rollback are not tested. |

### Conflict examples to record (do not resolve in D1)

- `approval_matrix.csv` asks for AP_SUPERVISOR at 5000. `exception_rules.yaml` says PROCESS when PO is empty and amount is under 5000. INV-1003 and INV-1004 took PROCESS.
- `business_problem.md` names invoice splitting. `exception_rules.yaml` lists “no split-invoice aggregation” as a gap. The two 4950 invoices still PROCESS.
- `risk_notes.md` names requester and approver conflict. CH-88 requester and approver are both U22. No rule fires.
- `p2p-risk-2` is the named current model. Its false-positive rate is worse than `p2p-risk-1`. Precision and recall are blank.

### D1 output

An assessment pack:

- Spine-by-spine notes
- Case replay sheet
- Conflict register
- Missing-control register
- Capability split with analyse / recommend / decide / execute
- Risk-Control-Test-Evidence rows for later D2. Every later recommendation names those four things.

Wave 1 stance for later build, recorded now, not implemented now: stop using an AI recommendation as payment authorization. Send bank-change-plus-split cases to a person.

### D1 done test

You can rebuild INV-1002 and INV-1003 from the files. You can point to the file that supports each sentence. Repo 1.0 is unchanged.

---

## D2 — Repo 1.0 to Repo 2.0

Start only after D1 is written.

### Goal

Solve the problems inherent in Repo 1.0. Improve architecture, AI workflow, risk controls, compliance, governance, security, observability, resilience, and production readiness. Cover all ten spine steps.

### Method (Lab 26 generate and govern)

1. Write a transformation brief. Copy acceptance checks from the runbook spine outputs and from the D1 registers.
2. Put required numbers in the brief. Copy them from D1. Example: INV-1003 amount 4950, pair total 9900, CH-88 same user U22. Do not invent a new cutoff in the prompt.
3. Name outcomes APPROVE, REVIEW, and REJECT. State that written policy picks the outcome and a named person owns REVIEW. (See Project Intent Appendix C.)
4. Put honesty classes and forbidden verbs in the brief. Forbidden: treating a model score as payment authorization. Forbidden: accuracy 94% as the headline. Forbidden: `score = 0` after a crash.
5. Build a context pack. Cite Repo 1.0 paths and the D1 assessment. Do not attach an uncited extra policy.
6. Generate Repo 2.0 with the language model you chose.
7. Review the output before you open the learnings-guide C.8 failure list.
8. Then check the draft against C.8. Fix any row that this packet needs.

### What Repo 2.0 must solve (runbook P2P list)

- Duplicate invoices, including same supplier, PO, and amount with different invoice ids, and alias ids such as V-201 / V201
- Anomalous pricing
- Supplier-master manipulation, including a bank change with the same requester and approver
- Approval bypass, including non-PO expedite that ignores a recent bank change
- Suspicious transaction patterns, including split invoices around 5000
- Segregation of duties
- Evidence linked from vendor change to payment decision
- Human escalation that a person can complete

### What each spine step must contain in Repo 2.0

| Spine step | Repo 2.0 must leave |
|---|---|
| 1 | Decision, users, APPROVE / REVIEW / REJECT, risk appetite, prohibited automation, mandatory human oversight. |
| 2 | Case events, entities, identity fields, risk variables, labels, document fields, data-quality rules, lineage, evidence retained per decision. |
| 3 | Evaluation plan with precision, recall, AUC or PR-AUC, catch rate, false positives, segment performance, version compare, limitations. No accuracy headline. |
| 4 | Extracted document fields, identity consistency checks, confidence, route to REVIEW when evidence is uncertain. |
| 5 | Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify. Parallel checks, persisted state, retries on reversible steps only, timeouts, fallback, compensating actions. |
| 6 | Fusion of score, evidence, rules, and policy. The model does not make the uncontrolled final decision. |
| 7 | Machine-readable reasons, human-readable rationale, reviewer evidence, contest path. |
| 8 | Compliance exceptions, model version, inputs, rules, prompts, workflow states, human actions, tamper-resistant store. The application writes the audit row first. |
| 9 | Owner, model card, change approval, access control, drift and false-positive monitoring, data quality, audit completeness, latency, failure rates. |
| 10 | Functional, integration, adverse, failure, compliance, and performance tests. Fallback and human-review tests. CI/CD, IaC, release gates, rollback, handover. |

### D2 done test

A reviewer can map each spine step to a Repo 2.0 file. The draft does not invent a cutoff. The draft does not delete the D1 gaps to look clean.

---

## D3 — Repo 2.0 to PRD

### Goal

Write a complete Product Requirements Document from Repo 2.0. The application in D4 may implement only this PRD.

### Method (Lab 28 specs first)

Cover the runbook PRD list:

- Business problem
- Users
- Functional requirements
- AI capabilities
- Workflows
- Data
- Integrations
- Risk and compliance requirements
- Non-functional requirements
- Acceptance criteria
- Success metrics

Add the Sprint 2 items this packet needs:

- Requirement ids you can trace to tests later
- Acceptance cases built from INV-1001 to INV-1004 and CH-88
- A change-request note if a requirement is unclear. Do not guess.
- An ADR and a named owner for any cutoff you must choose. Cite the spec or the trainer.
- What still runs if the scorer or extract step is down: REVIEW, case marked unscored
- Honesty labels on every metric the future demo will show

### D3 done test

Every Repo 2.0 spine output has a PRD section. Every acceptance criterion names a case or a measurable check. No cutoff exists without an owner and an ADR.

---

## D4 — Working application and demo

### Goal

Build and demonstrate a functional application from the PRD. Platform: Google AI Studio Build, or any other tool you name in the PRD.

### Method

1. Build only what the PRD requires.
2. Show the runbook workflow: Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify.
3. Count irreversible effects before you add retry (Lab 29). Payment and notify sit outside the retry block. Use an idempotency key from case id and step name.
4. Write the audit row in the application before the payment state changes (Lab 30). Link CH-style vendor-change evidence to the payment decision. If you claim WORM, store references in the locked store and keep deletable identity in a normal store.
5. Make REVIEW a real human path (Lab 31). The reviewer sees evidence, has time, can disagree, can override, and is named.
6. Label every number on the demo (Lab 23). Do not show accuracy 94% as the quality headline. Report ranking quality, staffing, and residual miss when you show model numbers.
7. Add the tests `test_summary.md` omits: supplier alias, split invoices, same-user requester and approver, bank change then payment, model outage, queue outage, rollback.

### Demo cases to show

| Case | What the demo must make visible |
|---|---|
| INV-1001 and INV-1002 | Same supplier, PO, and amount. Different invoice ids. Duplicate handling. |
| V-201 vs V201 | Alias normalization. |
| CH-88 then INV-1003 and INV-1004 | Same-user bank change. Two 4950 non-PO invoices. REVIEW, not silent PROCESS. |
| Scorer down | Case goes to a person. No fake safe score. |
| Retry of payment | The counter stays at one payment for one key. |

### D4 done test

A stranger can complete one REVIEW. One paid or blocked case can be rebuilt two years later from the audit row. Docs match the shipped behaviour.

---

## Presentation and defence

Present D1 to D4 in trainer order.

Prepare written answers to Project Intent section 3.3. Skip a question this packet never used.

Include one rebuilt case with actor, from-state, to-state, score, reasons, model version, and rule version.

List facts the Repo 1.0 audit trail leaves out, so the room can see what D4 added.

---

## Ready and done checklists

Copy these into your notes. Tick only rows this packet needs.

### Ready for D2

- [ ] Trainer deliverable list copied
- [ ] Event, entities, and payment named
- [ ] Messy-estate method recorded
- [ ] APPROVE / REVIEW / REJECT recorded as trainer-required verbs
- [ ] Unknown written for scorer-down behaviour in Repo 1.0
- [ ] No invented cutoff

### Ready to hand back

- [ ] D1 pack exists. Repo 1.0 unchanged
- [ ] D2 covers ten spine steps and the P2P detection list
- [ ] D3 is complete against the runbook PRD list
- [ ] D4 demo runs end to end
- [ ] Irreversible steps use a key and sit outside retry
- [ ] Audit row is written before payment state change
- [ ] Failure goes to a person and is marked unscored
- [ ] Honesty labels on demo numbers
- [ ] Defence answers exist for the questions this packet uses
