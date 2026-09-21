# Implementation Playbook

This file is the how-to. [Project Intent.md](Project Intent.md) says what the assignment is. [Execution Plan.md](Execution Plan.md) says the method. After you finish S0 through S5, you have all four runbook deliverables and the presentation pack.

Do the steps in order. Do not start S2 until S1 is done. Do not start S3 until S2 is done. Do not start S4 until S3 is done.

Do not edit any file under `05_procure_to_pay_exception_repo_1_0`. Do not invent a payment cutoff.

Plain speak applies to every file you write.

---

## How to use this file

1. Open a **new Cursor chat** for each step that has a prompt (S1, S2a, S2b, S3, S3b if needed, S5).
2. Attach the files listed under **Inputs**.
3. Paste the prompt in the fenced block. Do not trim the constraints.
4. Review the output against **Expected output** before you go on.
5. For S4, follow the Google AI Studio Build actions, then the Cursor recording steps.

---

## Folder map you will create

```text
D1_AsIs_Assessment/
Repo_2_0/
D3_PRD/
D4_App/
Presentation/
```

Repo 1.0 stays where it is.

---

## S0 — Lock the brief

No prompt. You read. You tick. You stop if you are about to invent a cutoff.

### Inputs

- `Sprint_2 -  Steps_&_Approach - Runbook` (PDF, no `.pdf` extension)
- [Project Intent.md](Project Intent.md) section 3.1 and Appendix C
- [Execution Plan.md](Execution Plan.md) “Work method (C.2 and C.3)”
- [SPRINT2_FDE_Learnings_and_Capstone_Guide.md](SPRINT2_FDE_Learnings_and_Capstone_Guide.md) C.1, C.2, C.3

### Tasks

1. Open the runbook with a PDF reader. Confirm the four deliverables: As-Is Repo 1.0, Repo 2.0, PRD, working application.
2. Confirm this packet is use case 5: whether a supplier transaction can safely proceed to payment.
3. Copy these locked facts into `D1_AsIs_Assessment/00_LOCKED_FACTS.md` by hand or by a short Cursor edit that only creates that file:

| # | Locked fact |
|---|---|
| Event | A supplier invoice that may lead to payment |
| Objects | Supplier, PO, goods receipt, invoice, bank account, requester, approver |
| Irreversible action | Payment (`PAID` on INV-1001 and INV-1002) |
| Packet type | Messy estate of files. Assessment first. |
| Hand-back | D1, D2, D3, D4, presentation |
| Harm | Company if a bad pay goes out. Supplier if a false block misses the SLA. |
| Decision-time facts | Invoice id, supplier id, PO presence, amount, currency, approver, `bank_changed_30d`, named rule and model versions |
| Scorer down | Unknown in Repo 1.0. Later design: REVIEW and unscored |
| Outcomes | APPROVE / REVIEW / REJECT (trainer asked for these names) |
| C.3 method | Messy estate, assessment first. Inherited-repo forensic pass. Do not edit Repo 1.0 |

4. Tick the ready-for-D2 list in Execution Plan only after S1 exists. For S0, tick only: deliverable list copied; event, entities, and payment named; messy-estate method recorded; APPROVE / REVIEW / REJECT recorded as trainer-required; Unknown written for scorer-down; no invented cutoff.

### Expected output

- File: `D1_AsIs_Assessment/00_LOCKED_FACTS.md` with the table above.
- You can say the four deliverables and the central challenge without opening the runbook.

**Done test:** no new amount limit or owner appears in `00_LOCKED_FACTS.md`.

---

## S1 — D1 As-Is assessment

This step produces Deliverable 1.

### Inputs

- Entire folder `05_procure_to_pay_exception_repo_1_0`
- [Execution Plan.md](Execution Plan.md) section “D1 — Repo 1.0 as the As-Is baseline”
- [Project Intent.md](Project Intent.md) section 3.1 and Appendix D
- `D1_AsIs_Assessment/00_LOCKED_FACTS.md` from S0

### Tasks

1. Open a new Cursor chat in this project.
2. Attach the inputs above.
3. Paste the prompt below. Run it once.
4. Read every output file. Confirm each claim has a path.
5. Confirm Repo 1.0 files have no diff.

#### Prompt — S1 D1 assessment

```text
You are an AI FDE doing Deliverable 1 only: an As-Is reading of an inherited messy estate.

Role
- Inspect. Do not tidy. Do not redesign. Do not write Repo 2.0, a PRD, or application code.

Forbidden
- Do not edit any file under 05_procure_to_pay_exception_repo_1_0.
- Do not invent a cutoff, a policy owner, or a new rule threshold.
- Do not resolve conflicts. Write both sides and name who must choose.
- Do not treat a file as finished policy. Treat every artifact as evidence.
- If a control is not evidenced in the files, it does not exist. Write Missing.

Locked facts (do not change unless a source file proves one wrong)
- Event: a supplier invoice that may lead to payment.
- Objects: supplier, PO, goods receipt, invoice, bank account, requester, approver.
- Irreversible action: payment. INV-1001 and INV-1002 are PAID.
- Outcomes the trainer requires later: APPROVE / REVIEW / REJECT. Repo 1.0 also uses PROCESS. Record PROCESS as current-state language, not as a new policy.
- Scorer-down behaviour in Repo 1.0: Unknown. test_summary.md says model outage is not tested.

Required numbers to confirm from source files (copy the file values; do not “fix” them)
- INV-1001 and INV-1002: supplier V-201, PO-7001, amount 9800 USD, both PAID.
- INV-1003 and INV-1004: supplier V-311, empty PO, amount 4950 USD each, bank_changed_30d = Y, status APPROVED.
- Pair total INV-1003 + INV-1004 = 9900.
- CH-88: V-311 bank_account XXXX1122 to XXXX9988, requester U22, approver U22, 2026-08-11T13:44:00.
- CH-89: V-201 email change, requester U18, approver U19.
- Aliases: V-201, V201, V-311.
- Non-PO expedite in exception_rules.yaml: po == "" and amount < 5000 → PROCESS.
- Bank-change review in exception_rules.yaml: bank_changed_30d and amount > 10000 → REVIEW.
- Duplicate check in processing_log.txt: invoice_number_only. INV-1002 = NO_DUPLICATE.
- Approval matrix: 5000 AP_SUPERVISOR, 10000 FINANCE_MANAGER, 50000 FINANCE_DIRECTOR.
- Model p2p-risk-2 accuracy 0.94. Precision and recall blank. False-positive rate 0.24. p2p-risk-1 false-positive rate 0.18.
- Control P2P-05 immutable payment decision evidence: status Missing, owner TBD.

Work
1. Walk folders 01 through 10 in FOLDER_GUIDE.md order.
2. For each spine step write three lists: what exists, what contradicts, what is missing. Cite a path on every bullet.
3. Replay INV-1001, INV-1002, INV-1003, INV-1004, CH-88, CH-89, and V-201 vs V201. Confirm Project Intent Appendix D against the source files. Correct Appendix D only if a source file differs. Cite the file.
4. Write a conflict register. Include at least: approval_matrix vs under-5000 PROCESS; split-invoice named in business_problem vs no aggregation rule; CH-88 same-user vs no SoD rule; p2p-risk-2 accuracy headline vs worse false-positive rate than v1.
5. Write a missing-control register from control_matrix.csv and from gaps the matrix does not name.
6. Split capabilities: duplicate payment detection; supplier bank-account change; split / non-PO invoice; segregation of duties; payment release. For each write analyse / recommend / decide / execute. Payment execute stays with a named person. AI may analyse and recommend.
7. Write Risk-Control-Test-Evidence rows for later D2. Every recommendation names those four things. Do not implement the control.
8. Record Wave 1 stance only: stop using an AI recommendation as payment authorization. Send bank-change-plus-split cases to a person. Do not implement Wave 1.

Write these files only (create the folder if needed)
- D1_AsIs_Assessment/01_SPINE_NOTES.md
- D1_AsIs_Assessment/02_CASE_REPLAY.md
- D1_AsIs_Assessment/03_CONFLICT_REGISTER.md
- D1_AsIs_Assessment/04_MISSING_CONTROLS.md
- D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md
- D1_AsIs_Assessment/06_RCTE_ROWS.md
- D1_AsIs_Assessment/README.md (one-page index of the pack)

Done test
- A reader can rebuild INV-1002 and INV-1003 from cited files.
- Every claim has a path.
- Repo 1.0 is unchanged.
- No Repo 2.0 design is in these files.
```

### Expected output

| File | What it must contain |
|---|---|
| `D1_AsIs_Assessment/README.md` | Index of the pack |
| `01_SPINE_NOTES.md` | Ten sections. Exists / contradicts / missing. Paths cited |
| `02_CASE_REPLAY.md` | The six change/invoice rows plus aliases, with file citations |
| `03_CONFLICT_REGISTER.md` | Both sides and a named chooser. Conflicts not resolved |
| `04_MISSING_CONTROLS.md` | P2P-05 Missing plus gaps the matrix omitted |
| `05_CAPABILITY_SPLIT.md` | Five capabilities. Analyse / recommend / decide / execute |
| `06_RCTE_ROWS.md` | Risk, control, test, evidence for later D2 |

**Done test:** you can rebuild INV-1002 and INV-1003 from cited files. `git status` (or a folder compare) shows no edits under `05_procure_to_pay_exception_repo_1_0`.

---

## S2 — D2 Repo 2.0

This step produces Deliverable 2. Two prompts. Review the first output **before** you run the second.

### Inputs

- All of `D1_AsIs_Assessment/`
- `05_procure_to_pay_exception_repo_1_0` (read only)
- [Execution Plan.md](Execution Plan.md) section D2
- [Project Intent.md](Project Intent.md) Appendix B and Appendix C
- Runbook pages 1–2 (ten “what is actually delivered” lines)
- [SPRINT2_FDE_Learnings_and_Capstone_Guide.md](SPRINT2_FDE_Learnings_and_Capstone_Guide.md) — attach it for S2b only, not S2a

### Tasks — S2a generate

1. Open a **new** Cursor chat. Do not continue the S1 chat.
2. Attach D1 pack, Repo 1.0 (read only), Execution Plan D2, Project Intent appendices B and C.
3. Do **not** attach the C.8 table yet.
4. Paste the S2a prompt. Run it.
5. Read `Repo_2_0/` yourself. Check the P2P list and the ten spine files. Write down defects on paper.

#### Prompt — S2a generate Repo 2.0

```text
You are an AI FDE doing Deliverable 2: transform the As-Is evidence into Repo 2.0 with prompt engineering and context engineering.

Role
- Design the governed To-Be system. Write files under Repo_2_0/ only.

Forbidden
- Do not edit 05_procure_to_pay_exception_repo_1_0.
- Do not edit D1_AsIs_Assessment except to read it.
- Do not invent a numeric cutoff or a policy owner. If a threshold is required, write THRESHOLD_UNSET and say an ADR in D3 must name an owner. You may cite current-state numbers from D1 as evidence of today’s behaviour, not as the new policy.
- Do not use accuracy 94% or 0.94 as a quality headline.
- Do not set score = 0 after a crash. Failure goes to REVIEW and the case is unscored.
- Do not let the model make an uncontrolled final payment decision.
- Do not delete D1 gaps to look clean. Show how Repo 2.0 closes each named gap or marks it still open.

Context you must use (cite paths)
- D1_AsIs_Assessment/ (all files)
- 05_procure_to_pay_exception_repo_1_0/ files cited in D1
- Locked numbers from D1: INV-1001/1002 9800 PAID duplicate by amount+supplier+PO; INV-1003/1004 4950+4950=9900 after CH-88; CH-88 requester=approver U22; alias V-201 vs V201; invoice_number_only miss on INV-1002; P2P-05 Missing.

Outcomes
- Use APPROVE, REVIEW, REJECT only. Written policy picks the outcome. A named person owns REVIEW.
- PROCESS is Repo 1.0 language. Do not keep PROCESS as a To-Be outcome.

What Repo 2.0 must solve
- Duplicate invoices: same supplier, PO, and amount with different invoice ids; alias ids V-201 / V201.
- Anomalous pricing.
- Supplier-master manipulation, including same-user bank change.
- Approval bypass, including non-PO expedite that ignores a recent bank change.
- Suspicious patterns, including split invoices around the current-state 5000 line (cite 5000 as As-Is, do not adopt it as your new cutoff).
- Segregation of duties.
- Evidence linked from vendor change to payment decision.
- Human escalation a person can complete.

Ten spine files you must write. Each file states what the To-Be system delivers.

1. Repo_2_0/01_decision_risk_boundary.md
   Business decision, users affected, APPROVE / REVIEW / REJECT, anomaly and fraud scenarios (the P2P list), risk appetite, applicable regulatory obligations (if Repo 1.0 is silent, write Unknown and the change-request you will need), prohibited automation, mandatory human-oversight points.

2. Repo_2_0/02_case_data_evidence.md
   Case events, entities, identity attributes, risk variables, labels, document fields, data-quality rules, lineage, evidence retained for every decision.

3. Repo_2_0/03_detection_models.md
   This packet has four invoices. Do not pretend you trained a production model on representative labelled data. Write an evaluation plan: precision, recall, PR-AUC or AUC, catch rate, false positives, segment performance, version compare, limitations. State that training on representative labelled data is a later job with a named data owner. Compare p2p-risk-1 and p2p-risk-2 using only the numbers in evaluation.csv. No accuracy headline.

4. Repo_2_0/04_document_identity_compliance.md
   Convert PDFs / forms / images into structured fields. Identity consistency and confidence. Sanctions / PEP / address: write Unknown if not in Repo 1.0; route uncertain evidence to REVIEW. Do not invent a sanctions list.

5. Repo_2_0/05_workflow.md
   Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify. Parallel checks, persisted state, retries on reversible steps only, timeouts, fallback, compensating actions. Payment and notify sit outside retry and use an idempotency key (case id + step name).

6. Repo_2_0/06_governed_decisioning.md
   Fuse anomaly score, identity evidence, business rules, policy constraints, and contextual risk into APPROVE / REVIEW / REJECT. Policy thresholds stay THRESHOLD_UNSET until an ADR. Human-in-the-loop. The model does not make the uncontrolled final decision.

7. Repo_2_0/07_explainability_review.md
   Machine-readable reasons, human-readable rationale, feature attribution or a counterfactual where suitable, reviewer evidence, customer notification, contest / appeal path.

8. Repo_2_0/08_compliance_audit.md
   Detect velocity, behavioural, geographic, and other exceptions where the D1 evidence supports them. If geography or velocity has no fields in Repo 1.0, write Unknown and do not invent feeds. Generate compliance escalation events. Record model version, inputs, rules, prompts, workflow states, human interventions, and decisions. The application writes the audit row before payment state changes. Tamper-resistant / WORM store holds references. Deletable identity stays in a normal store.

9. Repo_2_0/09_ai_risk_security_observability.md
   Model ownership, model card, validation evidence, change approvals, access controls, drift and performance monitoring, false-positive trends, data-quality monitoring, audit completeness, latency, failure rates, compliance-control alerts. Shared API keys and SoD overlap from D1 must be addressed.

10. Repo_2_0/10_production_readiness.md
    Functional, integration, adverse, failure, compliance, and performance tests. Fallback and human-review tests. Defect handling. Governance evidence pack. CI/CD, IaC, release gates, rollback, security hardening, production handover. Include the tests Repo 1.0 omitted: alias, split, same-user requester/approver, bank change then payment, model outage, queue outage, rollback.

Also write
- Repo_2_0/README.md — map each spine file to a D1 gap it closes.
- Repo_2_0/TRACEABILITY.md — D1 conflict or missing-control id → Repo 2.0 file.

Honesty
- Label any metric REAL, PRECOMPUTED, SIMULATED, or EDUCATIONAL.
- Show scores as uncalibrated ranking, not a percent chance.

Done test
- A reviewer can map each of the ten spine steps to a Repo_2_0 file.
- No invented cutoff.
- D1 gaps remain visible until a file says how they close.
```

### Tasks — S2b review and C.8

1. You review `Repo_2_0/` first. Do not open C.8 until that review is written in `Repo_2_0/REVIEW_NOTES.md` (your own bullets are enough).
2. Open a **new** Cursor chat.
3. Attach `Repo_2_0/`, `D1_AsIs_Assessment/`, and the learnings guide C.8 table.
4. Paste the S2b prompt.

#### Prompt — S2b C.8 check

```text
You are an AI FDE governing a generated Repo 2.0 draft.

Read Repo_2_0/ and D1_AsIs_Assessment/.

Do not edit 05_procure_to_pay_exception_repo_1_0.
Do not invent a cutoff.

Check the draft against these failure patterns. For each row say PASS, FAIL, or NOT APPLICABLE, with a file citation. If FAIL, edit only Repo_2_0/ files to fix that row.

- Accuracy or “90%” / 94% as the headline → use PR-AUC or the matching ranking metric, staffing, residual miss.
- Easy made-up fraud or ROC-AUC above 0.95 → keep class overlap; do not invent a high AUC.
- Tune a test set to hit a syllabus target → report measured numbers only.
- Score shown as a percent chance → caption as uncalibrated ranking.
- Retrain from PSI alone → investigate first.
- Passing tests treated as the business problem solved → say which tests lock a gap.
- Rewrite the inherited system on day one → D1 must remain the As-Is baseline.
- AI invents a cutoff → THRESHOLD_UNSET plus ADR in D3.
- Green tests with no exact golden → require exact payload compare later.
- Retry the whole workflow → retry reversible steps only; key payment and notify.
- except: pass and score = 0 → REVIEW, store unscored / None.
- Keep the run open for a human → persist and resume.
- Change Feed as the first recorder → application writes the audit row first.
- Personal data locked in WORM → references in WORM; identity in a normal store.
- Human review as an Accept-only button → equal-weight actions; Disagree is easy.
- Policy only in the prompt → enforce in API / gateway / rules engine.
- One risk tier for money and advice → verdict per capability.
- Infra dashboards as the only AI monitoring → watch override rate, unscored rate, audit completeness, false-positive trend.
- Thin prompt that omits numbers → numbers stay in this design.
- Eval that checks only a subset of expected alerts → exact compare both ways.

Write Repo_2_0/C8_CHECK.md with the table of results.
If you edit other Repo_2_0 files, list the files in C8_CHECK.md.

Done test: no FAIL remains that this P2P packet uses. NOT APPLICABLE is allowed for RAG-only or Lab 32 search-index rows.
```

### Expected output

- `Repo_2_0/01_decision_risk_boundary.md` through `10_production_readiness.md`
- `Repo_2_0/README.md`, `TRACEABILITY.md`, `REVIEW_NOTES.md`, `C8_CHECK.md`

**Done test:** a reviewer maps each spine step to a file. No invented cutoff. C.8 rows this packet uses are PASS.

---

## S3 — D3 PRD

This step produces Deliverable 3. The D4 app may implement only this PRD.

### Inputs

- Entire `Repo_2_0/` after S2b
- [Execution Plan.md](Execution Plan.md) section D3
- [Project Intent.md](Project Intent.md) section 3.2
- Runbook page 4 PRD list
- D1 case ids for acceptance cases

### Tasks — S3a PRD

1. Open a new Cursor chat.
2. Attach `Repo_2_0/` and Execution Plan D3.
3. Paste the S3a prompt.

#### Prompt — S3a write the PRD

```text
You are an AI FDE doing Deliverable 3: convert Repo 2.0 into a complete Product Requirements Document.

Read only Repo_2_0/ and D1_AsIs_Assessment/02_CASE_REPLAY.md.
Do not edit 05_procure_to_pay_exception_repo_1_0.
Do not edit Repo_2_0.
Do not invent a cutoff. If Repo 2.0 says THRESHOLD_UNSET, keep it unset in the PRD and add a requirement that D3b must produce an ADR before that limit can be coded.

Write D3_PRD/PRD.md with these sections, in this order:
1. Business problem
2. Users
3. Functional requirements (give each an id: P2P-FR-001 …)
4. AI capabilities
5. Workflows (Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify)
6. Data
7. Integrations
8. Risk and compliance requirements
9. Non-functional requirements (include scorer-down: REVIEW, case marked unscored)
10. Acceptance criteria (give each an id: P2P-AC-001 …)
11. Success metrics (honesty class on every metric: REAL, PRECOMPUTED, SIMULATED, or EDUCATIONAL)

Acceptance cases you must include (cite D1 replay):
- AC duplicate: INV-1001 and INV-1002, same supplier V-201, PO-7001, amount 9800, different invoice ids.
- AC alias: V-201 vs V201.
- AC bank change + split: CH-88 (U22/U22) then INV-1003 and INV-1004 (4950 + 4950 = 9900), expected REVIEW, not silent PROCESS.
- AC scorer down: case goes to REVIEW, unscored.
- AC payment retry: one idempotency key, payment count stays 1.

Also write D3_PRD/TRACEABILITY.md mapping Repo_2_0 file → PRD requirement id → acceptance id.

Outcomes remain APPROVE, REVIEW, REJECT. A named person owns REVIEW. The model ranks. Written policy picks the action.

Done test
- Every Repo 2.0 spine file has a PRD section.
- Every acceptance criterion names a case or a measurable check.
- No cutoff exists without pointing to an ADR (or THRESHOLD_UNSET).
```

### Tasks — S3b ADR (only if a cutoff must be chosen)

Skip S3b if the PRD keeps every new limit as THRESHOLD_UNSET and D4 can still demo REVIEW using **rule conditions without a new number** (for example: same-user bank change → REVIEW; two invoices same supplier same day both non-PO → REVIEW).

If you must pick a number, name a real owner (trainer, finance lead, or “UNASSIGNED — ask trainer”) and run this prompt.

#### Prompt — S3b ADR

```text
You are an AI FDE writing an Architecture Decision Record.

Read D3_PRD/PRD.md. Do not invent a cutoff if THRESHOLD_UNSET still works for the demo.

If and only if a numeric limit must be coded, write one ADR per limit in D3_PRD/ADR/ADR-00N-title.md with:
- Status
- Requirement id cited
- Decision (the number)
- Owner name (or UNASSIGNED — ask trainer)
- Why (cite Repo 1.0 evidence or the trainer, not the model)
- Consequences
- What was rejected

Do not edit Repo 1.0. Do not copy 5000 or 10000 from Repo 1.0 as “our policy” unless the owner explicitly adopts them and you say so.

Done test: every coded cutoff has one ADR and a named owner.
```

### Expected output

- `D3_PRD/PRD.md`
- `D3_PRD/TRACEABILITY.md`
- `D3_PRD/ADR/` only if S3b ran

**Done test:** every spine output has a PRD section. Every acceptance line names a case or a measurable check.

---

## S4 — D4 working application and demo

This step produces Deliverable 4. You build in Google AI Studio Build (runbook default). You record evidence in this repo with Cursor.

### Inputs

- `D3_PRD/PRD.md`
- `D3_PRD/TRACEABILITY.md`
- `D1_AsIs_Assessment/02_CASE_REPLAY.md`
- [Execution Plan.md](Execution Plan.md) section D4
- [Project Intent.md](Project Intent.md) Appendix B

### Tasks — S4a Studio build

1. Open [Google AI Studio](https://aistudio.google.com/). Sign in.
2. Open **Build** (or the current “build an app” entry).
3. Create a new app. Name it `P2P-Payment-Control`.
4. Paste the Studio prompt below into the build prompt box.
5. Attach or paste the full text of `D3_PRD/PRD.md` (the prompt wins if the model and the PRD conflict: follow the PRD).
6. Generate the app.
7. Walk the screens. Check the five demo cases in S4c.

#### Prompt — S4a Google AI Studio Build

```text
Build a working Procure-to-Pay payment-control application from the PRD I paste after this block.

Product
- Shared-services team decides whether a supplier invoice can safely proceed to payment.
- Outcomes: APPROVE, REVIEW, REJECT only. Do not use PROCESS.
- The model or score ranks the case. Written rules pick the outcome. A named human owns REVIEW. The model must not authorize payment by itself.

Workflow screens (all required)
1. Ingest — upload or select a case (invoice + optional vendor-change record).
2. Extract — show structured fields: invoice id, supplier id, supplier name, PO, amount, currency, approver, bank_changed_30d, extract confidence.
3. Verify — identity / supplier consistency. If confidence is low, force REVIEW.
4. Detect — show ranking score as an uncalibrated rank, not a percent chance. Honesty badge on the number: SIMULATED or PRECOMPUTED.
5. Score + Decide — apply written rules. Show rule ids fired.
6. Review — human queue. Equal-weight actions: Agree APPROVE, Agree REJECT, Disagree and set APPROVE or REJECT. Reviewer name is required. Persist and resume. Do not keep a spinner open.
7. Notify — show notification payload. Do not send a second notify on retry.
8. Pay — only after APPROVE. This step is irreversible.

Hard rules
- Idempotency key = case_id + step_name for Pay and Notify. A second click must not create a second payment or a second notify. Show a payment_count and notify_count on the case.
- Write an audit row in the application before the payment state changes. Fields: actor, from_state, to_state, score, reasons, model_version, rule_version, vendor_change_id if any, timestamp. Display that row on a Case History screen.
- If the scorer fails, set score = null (not 0), outcome = REVIEW, banner UNSCORED.
- Do not use accuracy 94% anywhere on the UI.
- Seed these cases so the demo works offline:
  - INV-1001: V-201, PO-7001, 9800 USD, U11, bank_changed N, already PAID.
  - INV-1002: V-201, PO-7001, 9800 USD, U11, bank_changed N. Must flag duplicate of INV-1001 (same supplier+PO+amount, different invoice id).
  - Alias: supplier key V201 must match V-201 (Alpha Industrial Supply).
  - CH-88: V-311 bank XXXX1122 → XXXX9988, requester U22, approver U22.
  - INV-1003 and INV-1004: V-311, no PO, 4950 each, bank_changed Y, approver U22. Together 9900. Must go to REVIEW because of same-user bank change and split pair. Must not silently APPROVE.
- REVIEW screen: Disagree is as easy to click as Agree.
- WORM-style audit list is append-only on screen. Do not offer delete or overwrite of an audit row. Store reviewer display name as a reference; do not bury a full personal profile in the locked list.

Build a Case History page that can rebuild one case: actor, from-state, to-state, score, reasons, model version, rule version.

I will paste the PRD next. If anything in your default design conflicts with the PRD, follow the PRD.
```

8. After the PRD paste, generate. If a screen is missing, send a follow-up in Studio that names the missing PRD requirement id.

### Tasks — S4b record the build in this repo

1. Open a new Cursor chat.
2. Attach `D3_PRD/PRD.md`.
3. Paste the S4b prompt. Fill in the Studio URL and what you actually saw.

#### Prompt — S4b demo script and evidence

```text
You are an AI FDE recording Deliverable 4 evidence.

Do not edit 05_procure_to_pay_exception_repo_1_0.
Do not invent screens I did not confirm.

I will paste: the Studio app URL, a list of screens that exist, and the result of each demo case (PASS/FAIL plus what the UI showed).

Write:
- D4_App/DEMO_SCRIPT.md — minute-by-minute click path for Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify → Pay. Honesty class on every number.
- D4_App/TEST_EVIDENCE.md — table of cases: INV-1001/1002 duplicate, V-201/V201 alias, CH-88 + INV-1003/1004, scorer down, payment retry. Columns: case, expected, observed, PASS/FAIL, honesty class.
- D4_App/SIDE_EFFECT_COUNTER.md — naive vs safe vs cached counts for Pay and Notify (Lab 29). If I did not measure a number, write Unknown and how to measure it.
- D4_App/README.md — URL, platform (Google AI Studio Build), PRD version, model/rule versions shown in the UI.

If a required screen is missing, list it as a defect. Do not claim it exists.
```

4. Paste your observed results into that chat and let Cursor write the four files.

### Tasks — S4c demo cases you must click

| Case | What you must see |
|---|---|
| INV-1001 and INV-1002 | Duplicate handling. Not two independent APPROVE-to-pay paths. |
| V-201 vs V201 | Same supplier. Alias match visible. |
| CH-88 then INV-1003 and INV-1004 | REVIEW. Named reviewer can disagree. |
| Scorer down (toggle or break the score call) | REVIEW. Score empty or UNSCORED. Not 0. |
| Pay twice with the same key | payment_count stays 1. |

### Expected output

- A running Google AI Studio app that a stranger can click.
- `D4_App/DEMO_SCRIPT.md`
- `D4_App/TEST_EVIDENCE.md`
- `D4_App/SIDE_EFFECT_COUNTER.md`
- `D4_App/README.md`

**Done test:** a stranger can complete one REVIEW. One case can be rebuilt from Case History. Docs match the shipped screens.

---

## S5 — Presentation and defence

This step produces the presentation pack. It is how you show D1–D4. It is not a fifth product.

### Inputs

- `D1_AsIs_Assessment/`
- `Repo_2_0/`
- `D3_PRD/`
- `D4_App/`
- [Project Intent.md](Project Intent.md) section 3.3
- Runbook four-deliverable list

### Tasks

1. Open a new Cursor chat.
2. Attach the four deliverable folders and Project Intent 3.3.
3. Paste the S5 prompt.

#### Prompt — S5 defence and slide outline

```text
You are an AI FDE preparing the team presentation for this capstone.

Read D1_AsIs_Assessment/, Repo_2_0/, D3_PRD/, and D4_App/.
Do not edit 05_procure_to_pay_exception_repo_1_0.
Do not invent evidence. If a fact is missing, write Unknown.

Write Presentation/DEFENCE.md answering only the questions this packet used, with a file citation after each answer:
1. What event did you score or route, and which facts existed at decision time?
2. What metric did you report instead of accuracy 94%, and why?
3. What are the outcome names? Who makes the money decision?
4. What would a retry duplicate, and how did you prove the count?
5. Which inherited gap did you leave visible until a spec closed it?
6. Rebuild one case: actor, from-state, to-state, score, reasons, model version, rule version. Prefer INV-1003 after CH-88 if D4 evidence supports it.
7. Which facts does the Repo 1.0 audit trail leave out? Which of those does D4 now store?
8. How does a person contest the outcome?
9. If a control is missing from Repo 1.0, did you treat it as missing? Give one example (P2P-05).

Write Presentation/SLIDE_OUTLINE.md with one slide per item, in trainer order:
1. What the case is (use case 5, payment decision)
2. D1 As-Is findings (three conflicts, P2P-05 Missing)
3. D2 Repo 2.0 spine map
4. D3 PRD and acceptance cases
5. D4 demo path and five cases
6. One rebuilt case
7. Residual risk and Unknowns

Each slide bullet must stand alone. Short sentences. Everyday words. No accuracy 94% headline.

Write Presentation/README.md listing the four deliverable folders and the two presentation files.

Done test: a teammate can present from SLIDE_OUTLINE.md and answer DEFENCE.md without opening Cursor.
```

### Expected output

- `Presentation/DEFENCE.md`
- `Presentation/SLIDE_OUTLINE.md`
- `Presentation/README.md`

**Done test:** you can walk D1 → D2 → D3 → D4 and rebuild one case out loud.

---

## Final hand-back checklist

Tick only when the file exists and the done test passed.

- [ ] S0 `D1_AsIs_Assessment/00_LOCKED_FACTS.md`
- [ ] S1 D1 pack (six assessment files + README). Repo 1.0 unchanged
- [ ] S2 `Repo_2_0/` ten spine files, TRACEABILITY, C8_CHECK
- [ ] S3 `D3_PRD/PRD.md` and TRACEABILITY. ADR only if a cutoff was coded
- [ ] S4 running Studio app + `D4_App/` demo script and test evidence
- [ ] S5 `Presentation/DEFENCE.md` and `SLIDE_OUTLINE.md`
- [ ] Irreversible steps use a key and sit outside retry
- [ ] Audit row is written before payment state change
- [ ] Failure goes to a person and is marked unscored
- [ ] Honesty labels on demo numbers
- [ ] Defence answers exist for the questions this packet uses

When every box is ticked, the four runbook deliverables and the presentation are complete.
