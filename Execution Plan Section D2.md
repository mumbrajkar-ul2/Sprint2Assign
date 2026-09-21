# Execution Plan — Procure-to-Pay Exception and Payment-Control

This file is the work method for the four runbook deliverables. [Project Intent.md](Project Intent.md) says what the assignment is. This file says the order of work.
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

