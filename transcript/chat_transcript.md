# Chat transcript

Project: `C:\MangeshStudy\FDE\Labs\Sprint2Assign`

Maintained per the `chat-transcript` Cursor rule: each turn is appended, never overwritten.

## 2026-09-20 23:16

**Model:** Cursor Grok 4.6

### User

enable the Chat Transcript based on the cursor rule for the same

### Assistant

I'll look up the Cursor rule for Chat Transcript and see how it's set up in this project.

The user-level rule is explicit: copy it into this project and start logging turns. I'll write that as a short enablement plan.

Plan: copy `C:\Users\mange\.cursor\rules\chat-transcript.mdc` to `.cursor/rules/chat-transcript.mdc` (including the required Model line), create `transcript/chat_transcript.md` if missing, and log the setup turn with **Model:** Cursor Grok 4.6.

## 2026-09-20 23:17

**Model:** Cursor Grok 4.6

### User

Enable Chat Transcript

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

### Assistant

Chat Transcript is enabled for this project.

- `.cursor/rules/chat-transcript.mdc` is a copy of your user-level rule (`alwaysApply: true`, required **Model** line).
- `transcript/chat_transcript.md` is the append-only log. The original enable request and this setup turn are recorded as **Model:** Cursor Grok 4.6.

From here on, each chat turn in this project will be appended to that same file.

## 2026-09-20 23:17

**Model:** Cursor Grok 4.6

### User

Apply the plain-speak cursor rule

### Assistant

The plain-speak rule is now in this project.

I copied `C:\Users\mange\.cursor\rules\plain-speak-speaker-notes.mdc` to `.cursor/rules/plain-speak-speaker-notes.mdc`. The copy is set to `alwaysApply: true`.

What the rule does: every explanation in this project uses short sentences and everyday words. It states the real name and the real action. It keeps code names as they are.

From this turn on, docs, notes, and chat replies that explain will follow that rule.

## 2026-09-20 23:19

**Model:** Cursor Grok 4.6

### User

I would like the plain-speak rules to apply across all documents that are produced in this project

### Assistant

The plain-speak rule now covers every document this project produces.

I updated `.cursor/rules/plain-speak-speaker-notes.mdc`. It is set to `alwaysApply: true`. It also attaches when you open markdown, text, YAML, Word, PowerPoint, or HTML files.

What that means: new files and edits to existing files use short sentences and everyday words. Code names and quoted source stay as they are.

I did not rewrite the assignment files already in the repo. Say if you want those rewritten next.

## 2026-09-20 23:43

**Model:** Cursor Grok 4.6

### User

Project Intent and FDE Execution Plan

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

### Assistant

Two files are at the project root. Repo 1.0 is unchanged.

- `Project Intent.md` states what this assignment is. It uses the runbook first: use case 5, the ten spine steps, and the four deliverables plus presentation. It lists every Repo 1.0 file, the C.1 answers, and the C.2 / C.3 method.
- `Execution Plan.md` is the work order for D1 to D4. Assessment first. Then prompt and context engineering. Then the PRD. Then the working application and demo.

The learnings guide is applied as method only. It does not replace the runbook hand-back list.

Next step is Deliverable 1: the As-Is reading of Repo 1.0. Say when you want to start that pack.

## 2026-09-21 00:06

**Model:** Cursor Grok 4.6

### User

is the execution plan @Execution Plan.md addressing the 10 points listed in the @Sprint_2 -  Steps_&_Approach - Runbook ?

### Assistant

Yes. The plan uses all ten runbook spine steps. D1 inspects each step in Repo 1.0. D2 says what Repo 2.0 must leave for each step. A few runbook phrases are thinner than the rest.

| Runbook step | What the runbook says you deliver | Where the plan covers it | What is thinner |
|---|---|---|---|
| 1 Frame decision, risk, boundary | Business decision, users, APPROVE / REVIEW / REJECT, fraud scenarios, risk appetite, regulatory obligations, prohibited automation, human oversight | D1 row 1. D2 row 1. C.1 in Project Intent. | **Regulatory obligations** are not named as a deliverable. Fraud scenarios are covered as the P2P list, not as a separate scenario catalog. |
| 2 Case, data, evidence | Events, entities, identity fields, risk variables, labels, document fields, data-quality rules, lineage, evidence to keep | D1 row 2. D2 row 2. Invoice replay. | Covered. |
| 3 Detection models | Train on labelled data. Report precision, recall, AUC, catch rate, false positives, segments. Compare versions. Write limitations. | D1 row 3. D2 row 3. D4: no 94% headline. | The plan asks for an **evaluation plan**. It does not say **train** a model on representative labelled data. This packet has only four invoices. |
| 4 Documents and identity | Turn PDFs into fields. Check identity and confidence. Add sanctions / PEP / address where they apply. Send weak evidence to REVIEW. | D1 row 4. D2 row 4. | **Sanctions / PEP / address** are not named. Project Intent says write Unknown if a PEP list is needed. |
| 5 Workflow | Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify. Parallel checks, persisted state, retries, timeouts, fallback, compensating actions. | D2 row 5. D4 steps 2–3. | Covered. |
| 6 Governed decisioning | Fuse score, identity evidence, rules, policy, and context into APPROVE / REVIEW / REJECT. Policy thresholds. Human escalation. No uncontrolled model final decision. | D2 row 6. D3 ADR for any cutoff. D4 REVIEW path. | **Contextual risk** is not named as its own field. Thresholds sit in the ADR line, not in D2 row 6. |
| 7 Explainable, reviewable, contestable | Machine reasons, human rationale, feature attribution or counterfactual where suitable, reviewer evidence, customer notice, appeal. | D2 row 7. D4 REVIEW. Presentation rebuilt case. | **Feature attribution / counterfactual** and **customer notification** are not named. Contest path is named. |
| 8 Compliance and immutable audit | Velocity, behaviour, geography, and other exceptions. Escalation events. Store model version, inputs, rules, prompts, states, human actions in WORM. | D2 row 8. D4 audit-before-pay. | **Velocity, behavioural, geographic** are not named as exception types. The plan uses the P2P patterns instead (duplicate, split, bank change). |
| 9 Risk, security, observability | Owner, model card, validation evidence, change approval, access, drift, false-positive trend, data quality, audit completeness, latency, failure rates, control alerts. | D1 row 9. D2 row 9. | **Validation evidence** and **compliance-control alerts** are not named. |
| 10 Prove and productionize | Functional, integration, adverse, failure, compliance, and performance tests. Fallback and human-review tests. Defects closed. Governance pack. CI/CD, IaC, release gates, rollback, security hardening, handover. | D1 row 10. D2 row 10. D4 extra tests. | **Security hardening** and **package governance evidence** are not named as their own lines. |

**Short answer:** the ten steps are the backbone of the plan. The plan does not skip a step. The gaps are missing phrases inside a step, not a missing step.

The largest gaps versus the runbook’s “what is actually delivered” column are: regulatory obligations (step 1), train-on-labels (step 3), sanctions / PEP / address (step 4), feature attribution and customer notice (step 7), and named velocity / geography checks (step 8).

Say if you want those phrases added to `Execution Plan.md`.

## 2026-09-21 00:14

**Model:** Cursor Grok 4.6

### User

Execution Plan says "This file is the work method for the four runbook deliverables.". what are those four?

### Assistant

Those four items are the trainer’s hand-back list on runbook pages 4–5. They map to D1–D4 in `Execution Plan.md`.

1. **Use Repo 1.0 as the As-Is baseline**  
   Read the inherited folder. Understand the current architecture, data, workflows, gaps, inconsistencies, risks, and technical debt. This is **D1**.

2. **Transform Repo 1.0 into Repo 2.0**  
   Use prompt engineering and context engineering. Improve architecture, AI workflow, risk controls, compliance, governance, security, observability, resilience, and production readiness. This is **D2**.

3. **Convert Repo 2.0 into a PRD**  
   Write a complete Product Requirements Document. Cover the business problem, users, functions, AI capabilities, workflows, data, integrations, risk and compliance, non-functional requirements, acceptance criteria, and success metrics. This is **D3**.

4. **Build a working application and demo**  
   Build from that PRD. Use Google AI Studio Build or another tool. Show workflows, AI, decision logic, controls, explainability, and an end-to-end demo. This is **D4**.

The runbook also asks for a **team presentation** of those four items. That sits after D4 in the plan. It is not a fifth product. It is how you show D1–D4.

## 2026-09-21 00:18

**Model:** Cursor Grok 4.6

### User

how should i go about executing the steps to produce the deliverables?

### Assistant

You already have the map. `Project Intent.md` says what to hand back. `Execution Plan.md` says the order. Here is how to sit down and do the work.

**Do D1 first. Do not open a language model to “fix” Repo 1.0.**

### Before D1

1. Keep the runbook open. It is the contract.
2. Keep `Project Intent.md` section 3.1 open. Those eight C.1 answers stay fixed unless a file proves one wrong.
3. Do not invent a cutoff. Do not edit `05_procure_to_pay_exception_repo_1_0`.

### D1 — As-Is baseline (this week’s first product)

Walk the ten folders in `FOLDER_GUIDE.md` order. For each folder write three lists: what exists, what contradicts, what is missing.

Replay the cases in this order:

1. INV-1001 and INV-1002 (same supplier, PO, amount; both `PAID`)
2. CH-88 (U22 requested and approved the bank change)
3. INV-1003 and INV-1004 (two 4950 non-PO invoices after that change)
4. CH-89 (different requester and approver — the contrast row)
5. V-201 vs V201 in `supplier_aliases.csv`

Write one assessment pack. Suggested files:

- spine notes (one section per step)
- case replay sheet
- conflict register (both sides, who must choose)
- missing-control register (if it is not in the files, it does not exist)

Stop D1 when you can rebuild INV-1002 and INV-1003 from cited files. Repo 1.0 is still unchanged.

### D2 — Repo 2.0 (only after D1 is written)

Write a brief first. Put in:

- the ten runbook “what is actually delivered” lines
- numbers copied from D1 (4950, 9900, U22, invoice-number-only check)
- APPROVE / REVIEW / REJECT
- forbidden: model as payment authorization, accuracy 94% as the headline, `score = 0` after a crash

Attach a context pack of cited Repo 1.0 paths plus the D1 pack.

Generate Repo 2.0. Read the draft yourself. Then open the learnings-guide C.8 list and fix only the rows this packet needs.

Stop D2 when a reviewer can map each spine step to a Repo 2.0 file.

### D3 — PRD (only from Repo 2.0)

Write the PRD from Repo 2.0. Cover the runbook PRD list. Give each requirement an id.

Turn INV-1001–INV-1004 and CH-88 into acceptance cases.

If you must choose a cutoff, write an ADR and name the owner. If a requirement is unclear, write a change-request note. Do not guess.

Stop D3 when every spine output has a PRD section and every acceptance line names a case or a measurable check.

### D4 — Working app and demo (only from the PRD)

Pick one platform (Google AI Studio Build or another tool). Build only what the PRD requires.

Show one path: Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify.

Before you add retry, count what a second run would duplicate. Payment and notify use a key and sit outside retry. The app writes the audit row before payment state changes. REVIEW is a named person who can disagree.

Demo these five cases: INV-1001/1002 duplicate, V-201/V201 alias, CH-88 then INV-1003/1004, scorer down, payment retry.

Label every number REAL, PRECOMPUTED, SIMULATED, or EDUCATIONAL.

### Presentation

Walk D1 → D2 → D3 → D4. Rebuild one case out loud. Answer only the Project Intent 3.3 questions this packet used.

**This week:** start D1. I can write the assessment pack from the Repo 1.0 files next, without editing those files. Say if you want that.

## 2026-09-21 00:21

**Model:** Cursor Grok 4.6

### User

can i use the entire D1 section in the Execution Plan.md as a prompt to run in Cursor?

### Assistant

You can use it as the **core of** a Cursor prompt. Do not paste the D1 section alone.

The D1 section says *how* to inspect. It does not say *where* to write the pack, *what not to change*, or *which facts are already locked*. A language model will fill those gaps if you leave them out.

**Keep from D1**

- Walk the ten folders
- Three lists per folder: exists, contradicts, missing
- Replay INV-1001–INV-1004, CH-88, CH-89, V-201 / V201
- If a control is not in the files, it does not exist
- Conflict register names both sides and who must choose
- Do not resolve conflicts in D1
- Stop when you can rebuild INV-1002 and INV-1003 from cited files

**Add these lines to the prompt**

1. Do not edit any file under `05_procure_to_pay_exception_repo_1_0`.
2. Write the assessment pack in a new folder, for example `D1_AsIs_Assessment/`.
3. Cite a file path for every claim.
4. Treat every artifact as evidence, not as finished policy.
5. Copy the C.1 answers from `Project Intent.md` section 3.1. Do not change them unless a source file proves one wrong.
6. Do not invent a cutoff, a new rule, or a Repo 2.0 design.
7. Output exactly: spine notes, case replay sheet, conflict register, missing-control register, capability split, and Risk-Control-Test-Evidence rows.

**What goes wrong if you paste D1 only**

Cursor may “fix” `exception_rules.yaml`, invent a 5000 policy owner, or start Repo 2.0. That breaks Deliverable 1.

**How to run it**

Open a new chat in this project. Attach `Execution Plan.md` (D1 section), `Project Intent.md` (section 3.1 and Appendix D), and the Repo 1.0 folder. Paste the extra constraints above. Then say: produce the D1 pack only.

I can draft that full prompt into a file next, or run D1 here. Say which you want.

## 2026-09-21 00:26

**Model:** Cursor Grok 4.6

### User

Implementation Playbook

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

### Assistant

`Implementation_Playbook.md` is at the project root. Repo 1.0 is unchanged.

The file is the how-to for S0 through S5. Each step lists inputs, tasks, and expected output. Steps that need a model have a ready-to-paste prompt. S4 has Google AI Studio Build actions plus a Cursor prompt to record the demo.

Order: lock the brief, then D1 assessment, then Repo 2.0, then the PRD, then the app, then the presentation. After you finish those steps, the four runbook deliverables and the presentation pack exist.

Start at S0, then open a new Cursor chat for the S1 prompt.

## 2026-09-21 00:31

**Model:** Cursor Grok 4.6

### User

create these folders in the root - D1_AsIs_Assessment/
Repo_2_0/
D3_PRD/
D4_App/
Presentation/

### Assistant

All five folders are in the project root:

- `D1_AsIs_Assessment/`
- `Repo_2_0/`
- `D3_PRD/`
- `D4_App/`
- `Presentation/`

They are empty and ready for files.

## 2026-09-21 00:35

**Model:** Cursor Grok 4.6

### User

Copy these locked facts into `D1_AsIs_Assessment/00_LOCKED_FACTS.md`:

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

### Assistant

`D1_AsIs_Assessment/00_LOCKED_FACTS.md` is in place with that table.

The file also has a short meaning for each row. It does not add an amount limit. It does not name a policy owner.

S0 done test: the four deliverables, the invoice-to-payment event, payment as the action that cannot be undone, messy-estate method, APPROVE / REVIEW / REJECT, and Unknown for scorer-down are all written down.

## 2026-09-21 00:42

**Model:** Cursor Grok 4.6

### User

@05_procure_to_pay_exception_repo_1_0 @Execution Plan.md @Project Intent.md @D1_AsIs_Assessment/00_LOCKED_FACTS.md You are an AI FDE doing Deliverable 1 only: an As-Is reading of an inherited messy estate.

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

### Assistant

D1 is written. Repo 1.0 was not edited. Start with `D1_AsIs_Assessment/README.md`.

## Pack

| File | What it holds |
|---|---|
| `D1_AsIs_Assessment/01_SPINE_NOTES.md` | Folders 01–10. Exists / contradicts / missing. Path on every bullet. |
| `D1_AsIs_Assessment/02_CASE_REPLAY.md` | INV-1001 to INV-1004, CH-88, CH-89, V-201 vs V201. |
| `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` | Both sides and who must choose. |
| `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` | P2P-01 to P2P-05, then gaps the matrix omits. |
| `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md` | Five capabilities. Analyse / recommend / decide / execute. |
| `D1_AsIs_Assessment/06_RCTE_ROWS.md` | Risk, Control, Test, Evidence for later D2. |
| `D1_AsIs_Assessment/README.md` | One-page index. |

`00_LOCKED_FACTS.md` is unchanged.

## Appendix D

Source files match Appendix D numbers. Two wording notes, not number errors:

- `supplier_aliases.csv` stores two name strings: `Alpha Industrial Supply` (`V-201`) and `Alpha Industries Supply` (`V201`). V-311 is `Nova Components`.
- CH-89 also has old/new email and time `2026-08-12T09:20:00`. Appendix D omitted those fields. The requester U18 / approver U19 match.

## Rebuild INV-1002

1. `invoices.csv`: INV-1001 and INV-1002 are both V-201, PO-7001, 9800 USD, U11, `PAID`.
2. `processing_log.txt`: `2026-08-12 12:01 INV-1002 duplicate_check=NO_DUPLICATE method=invoice_number_only`.
3. `sample_decisions.txt`: `INV-1002: PROCESS - duplicate rule not triggered.`
4. Payment already went out on both rows.

## Rebuild INV-1003

1. `vendor_master_changes.csv`: CH-88 at `2026-08-11T13:44:00` changes V-311 bank `XXXX1122` to `XXXX9988`. Requester U22. Approver U22.
2. `invoices.csv`: INV-1003 is V-311, empty PO, 4950 USD, U22, `bank_changed_30d=Y`, status `APPROVED`.
3. `processing_log.txt`: `2026-08-12 11:15 INV-1003 rule=NON_PO_UNDER_5000 result=PROCESS`.
4. INV-1004 is the same pattern one minute later. Pair total 4950 + 4950 = 9900.

## Conflicts (not resolved)

- C-01: `approval_matrix.csv` names AP_SUPERVISOR at 5000. `exception_rules.yaml` says PROCESS when PO is empty and amount is under 5000. INV-1003 took PROCESS.
- C-02: `business_problem.md` names invoice splitting. The yaml lists no aggregation rule. Both 4950 invoices PROCESS.
- C-03: CH-88 is U22 / U22 SUCCESS. No requester/approver conflict rule.
- C-04: `p2p-risk-2` accuracy 0.94. False-positive rate 0.24 vs 0.18 on v1. Precision and recall on v2 are blank.

Chooser cells use owners already in `control_matrix.csv`. Where no owner exists, the cell says Missing or TBD.

## Missing

P2P-05 immutable payment decision evidence: status **Missing**, owner **TBD**. Scorer-down behaviour: **Unknown**. `test_summary.md` says model outage is not tested.

## Wave 1 stance (text only)

Stop using an AI recommendation as payment authorization. Send bank-change-plus-split cases to a person. That stance sits in `05_CAPABILITY_SPLIT.md`. It is not implemented.

AI may analyse and recommend. Payment execute stays with a named person. Repo 1.0 does not name who pressed pay. Status: Missing.

## 2026-09-21 15:58

**Model:** Cursor Grok 4.6

### User

what does this mean "**Done test:** you can rebuild INV-1002 and INV-1003 from cited files. `git status` (or a folder compare) shows no edits under `05_procure_to_pay_exception_repo_1_0`."? does it mean I need to go and make  changes to the invoice entries in C:\MangeshStudy\FDE\Labs\Sprint2Assign\05_procure_to_pay_exception_repo_1_0\02_data_evidence\invoices.csv file?

### Assistant

Leave `invoices.csv` as it is. Do not change any row under `05_procure_to_pay_exception_repo_1_0`.

That done test is a check that D1 is finished. It has two parts.

**1. “You can rebuild INV-1002 and INV-1003 from cited files.”**

Rebuild here means retell the case from the files that already exist. A reader opens the D1 notes, follows the paths, and can say what happened without guessing.

For INV-1002 that means:

- `invoices.csv` already has INV-1001 and INV-1002, both V-201, PO-7001, 9800 USD, `PAID`.
- `processing_log.txt` already has `duplicate_check=NO_DUPLICATE method=invoice_number_only`.

For INV-1003 that means:

- `vendor_master_changes.csv` already has CH-88 (U22 / U22 bank change).
- `invoices.csv` already has INV-1003 at 4950 with an empty PO and `bank_changed_30d=Y`.
- `processing_log.txt` already has `NON_PO_UNDER_5000` and `PROCESS`.

That write-up is already in `D1_AsIs_Assessment/02_CASE_REPLAY.md`. You copy the file values. You do not “fix” them.

**2. “`git status` shows no edits under `05_procure_to_pay_exception_repo_1_0`.”**

This folder is the inherited evidence pack. D1 reads it. D1 does not tidy it. If `invoices.csv` (or any other Repo 1.0 file) shows as modified, the done test fails.

This workspace has no git repo, so use a folder compare instead: Repo 1.0 should match what you started with. Only `D1_AsIs_Assessment/` should have new files.

The messy rows in `invoices.csv` are the point of the assignment. INV-1002 looking like a paid duplicate, and INV-1003 looking like a split non-PO invoice, stay in the file on purpose.

## 2026-09-21 16:14

**Model:** Cursor Grok 4.6

### User

where is the C.8 table located?

### Assistant

The C.8 table is in `SPRINT2_FDE_Learnings_and_Capstone_Guide.md`, heading **C.8 Patterns that failed in the labs**. It starts at line 114.

It is a three-column table: what a draft does wrong, which labs already failed that way, and what to change it to.

The playbook uses it in S2b only. S2a says do not attach it yet. You review `Repo_2_0/` first, then open C.8. Path in the playbook: `Implementation_Playbook.md` around the S2b section (line 278).

## 2026-09-21 16:25

**Model:** Cursor Grok 4.6

### User

@D1_AsIs_Assessment @05_procure_to_pay_exception_repo_1_0 @Project Intent Appendix B & C.md @Execution Plan Section D2.md @RunBook Pages 1-2.pdf You are an AI FDE doing Deliverable 2: transform the As-Is evidence into Repo 2.0 with prompt engineering and context engineering.

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
2. Repo_2_0/02_case_data_evidence.md
3. Repo_2_0/03_detection_models.md
4. Repo_2_0/04_document_identity_compliance.md
5. Repo_2_0/05_workflow.md
6. Repo_2_0/06_governed_decisioning.md
7. Repo_2_0/07_explainability_review.md
8. Repo_2_0/08_compliance_audit.md
9. Repo_2_0/09_ai_risk_security_observability.md
10. Repo_2_0/10_production_readiness.md

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

### Assistant

Repo 2.0 is written under `Repo_2_0/` only. Repo 1.0 and D1 were not edited.

Each spine step has one file. Written policy picks `APPROVE`, `REVIEW`, or `REJECT`. A named person owns `REVIEW`. The model ranks. The model does not pay. `PROCESS` is retired.

## Spine map

| Spine | File |
|---|---|
| 1 Decision, risk, boundary | `Repo_2_0/01_decision_risk_boundary.md` |
| 2 Case, data, evidence | `Repo_2_0/02_case_data_evidence.md` |
| 3 Detection models | `Repo_2_0/03_detection_models.md` |
| 4 Documents and identity | `Repo_2_0/04_document_identity_compliance.md` |
| 5 Workflow | `Repo_2_0/05_workflow.md` |
| 6 Governed decisioning | `Repo_2_0/06_governed_decisioning.md` |
| 7 Explainability and review | `Repo_2_0/07_explainability_review.md` |
| 8 Compliance and audit | `Repo_2_0/08_compliance_audit.md` |
| 9 Risk, security, observability | `Repo_2_0/09_ai_risk_security_observability.md` |
| 10 Production readiness | `Repo_2_0/10_production_readiness.md` |

`README.md` maps each file to the D1 gap it closes. `TRACEABILITY.md` maps C-01–C-12, P2P-01–P2P-05, M-01–M-22, and RCTE-01–RCTE-13.

## Locked cases in this design

| Case | As-Is | To-Be |
|---|---|---|
| INV-1001 / INV-1002, V-201, PO-7001, 9800, both `PAID` | `invoice_number_only` stored `NO_DUPLICATE` | Match supplier + PO + amount. INV-1002 → `REVIEW`, recommended reject of the second payment |
| `V-201` / `V201` | No alias join | Canonical id used for matching |
| CH-88, U22 / U22, XXXX1122 → XXXX9988 | `SUCCESS` | `REVIEW`. Change does not apply itself |
| INV-1003 / INV-1004, 4950 + 4950 = 9900, after CH-88 | `NON_PO_UNDER_5000` `PROCESS` | `REVIEW` with CH-88 linked. Pair sum 9900 stored |
| Scorer down | Unknown | `REVIEW`, case unscored. No `score = 0` |

5000 and 10000 stay As-Is evidence. New amount lines are `THRESHOLD_UNSET`. A D3 ADR must name an owner before anyone codes a number.

## Honesty and model numbers

`evaluation.csv` is compared on precision, recall, and false-positive rate only. v1: precision 0.52, recall 0.71, false-positive rate 0.18. v2: precision and recall blank, false-positive rate 0.24. Honesty: **PRECOMPUTED**. Those cells are not a quality headline. This packet has four invoices. Training on representative labelled data is a later job. The data owner is Missing until D3 names one. Ranks are uncalibrated. They are not a percent chance.

## What stays open on purpose

Regulatory obligations, sanctions / PEP / address, and geography are **Unknown**. Goods-receipt feed is Missing. REVIEW person, payer, model owner, data owner, and P2P-05 owner stay Missing or TBD. Timeouts, retention days, and contest days stay `THRESHOLD_UNSET`.

Read `Repo_2_0/` yourself next. Write defects in `Repo_2_0/REVIEW_NOTES.md`. Then run S2b against the C.8 list. Do not open C.8 until that review is written.

## 2026-09-21 16:50

**Model:** Cursor Grok 4.6

### User

write review in `Repo_2_0/REVIEW_NOTES.md` in bullets after analyzing the output of above prompt in @Repo_2_0

### Assistant

The S2a review is in `Repo_2_0/REVIEW_NOTES.md`. C.8 was not opened.

The pack passes the D2 done test: ten spine files exist, no new cutoff is set, `PROCESS` is retired, and D1 gaps stay visible. The main defect is that APPROVE cannot actually fire. `R-SCORED-ONLY`, `R-UNSCORED`, `R-GR`, and `R-NONPO` send every invoice to REVIEW, while T-FN-01 and the INV-1001 row still say APPROVE is possible.

Other defects to fix before or during S2b: Decide vs policy on REJECT, three different Notify orders, sibling window with no `THRESHOLD_UNSET`, duplicate match missing currency, alias join vs name-mismatch, and no REVIEW owner when INV-1003 fires three flags.

Next step: new chat, attach this pack plus the C.8 table, write `C8_CHECK.md`.

## 2026-09-21 17:15

**Model:** Cursor Grok 4.6

### User

@Repo_2_0 @D1_AsIs_Assessment @SPRINT2_FDE_Learnings_and_Capstone_Guide - Learning Guide C8 Section - Patterns that failed in the lab.md 

#### Prompt — S2b C.8 check

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

### Assistant

The C.8 table is in `Repo_2_0/C8_CHECK.md`. After one fix, every row this payment packet uses is **PASS**. Lab 32 “index every file in a folder” is **NOT APPLICABLE**. This packet has no search index.

The fail was an unlabeled sibling time window. `02_case_data_evidence.md` stored `sibling_invoice_ids` as invoices “in the same decision window.” That window had no number. `THRESHOLD_UNSET` now marks it. That label means the number stays unset until an Architecture Decision Record in D3 names an owner. Until then, sibling evidence is the named pair INV-1003 and INV-1004 only (4950 + 4950 = 9900, process times 11:15 and 11:16).

Amount lines 5000 and 10000 stay As-Is evidence. Accuracy 0.94 stays a copied `evaluation.csv` cell. The operating headline is precision, recall, false-positive rate, catch rate, staffing, residual miss, and later PR-AUC. PR-AUC is the ranking score that pays attention to the rare class.

Files edited for the fail:

- `01_decision_risk_boundary.md`
- `02_case_data_evidence.md`
- `05_workflow.md`
- `06_governed_decisioning.md`
- `08_compliance_audit.md`
- `README.md`
- `TRACEABILITY.md`
- `C8_CHECK.md`

`REVIEW_NOTES.md` defects that are not C.8 rows were left in place: the dead APPROVE path, Notify order, duplicate match missing currency, alias name-mismatch, and multi-flag REVIEW owner.

Repo 1.0 and D1 were left unchanged.

## 2026-09-21 17:20

**Model:** Cursor Grok 4.6

### User

explain the results in @Repo_2_0/C8_CHECK.md to a layman.

### Assistant

C.8 is a checklist of mistakes earlier labs already made. We scored the payment-system design against that list. After one fix, every row this invoice-payment pack uses is **PASS**. One extra row is **NOT APPLICABLE** because this pack has no search index.

I will walk the table in everyday words.

## What PASS, FAIL, and NOT APPLICABLE mean

**PASS** means the design already does the safer thing the checklist asks for.

**FAIL** means the design repeated a known lab mistake. We had one FAIL. We fixed it. That row is now PASS.

**NOT APPLICABLE** means the mistake belongs to a different kind of system. This pack pays supplier invoices. It does not search a folder of documents to answer questions.

## Scoring and model numbers

**Accuracy 94% as the headline — PASS.** The inherited file stores accuracy 0.91 on model v1 and 0.94 on model v2. Those cells stay as copied facts. The live quality story uses other measures: how many flags were truly bad, how many bad cases were caught, how often good invoices are flagged, how many people the REVIEW queue needs, and how many bad pays still get through. Later work also uses PR-AUC. PR-AUC is a ranking score that pays extra attention to the rare bad class.

**A made-up easy-fraud score above 0.95 — PASS.** The design does not invent a high ranking score. Some bad invoices will look like good ones on the listed features. AUC and PR-AUC are still missing from the evaluation file.

**Tuning a test to hit a class target — PASS.** Report the measured cells. The four invoices in this pack (INV-1001 through INV-1004) are walk-throughs. They are not the official test set.

**Score shown as a percent chance of fraud — PASS.** The model rank is an uncalibrated ranking. Uncalibrated means 0.7 is higher risk than 0.4. It is not “70% chance this invoice is fraud.” If the scorer is down, the rank stays blank.

**Retrain because one drift number moved — PASS.** PSI is Population Stability Index. It is one number per column that compares an earlier slice of data to a later slice. A large PSI is a reason to look. The design says investigate first. Wait for later confirmed labels. Retrain is a later job.

## Tests that can hide a gap

**Green tests treated as “the problem is solved” — PASS.** Two inherited tests still pass today and still hide the known misses. “Missing PO under threshold” locked the shortcut that sent INV-1003 and INV-1004 (4950 + 4950 = 9900) through as PROCESS. “Exact invoice-number duplicate” locked the check that missed INV-1002, the second 9800 payment on the same supplier, PO, and amount. Those tests stay visible as gap locks until the new tests replace them.

**Green tests with no exact expected result — PASS.** Later automated tests must compare the full result both ways: every expected reason code is present, and extra codes are absent.

**Eval that only checks some of the alerts — PASS.** Keep the old invoice-number duplicate test. Add a test that matches supplier + PO + amount (INV-1001 vs INV-1002 at 9800). Add a test that joins alias ids `V-201` and `V201`. Compare exactly both ways.

## Keep today’s system as evidence

**Rewrite everything on day one — PASS.** D1 stays the reading of how the inherited system works today. Repo 1.0 stays the evidence folder. This design folder does not edit those files. Wave 1 on paper does two things: a model rank cannot authorize payment, and the bank-change-plus-split pair (CH-88, then INV-1003 and INV-1004) goes to a person.

## The one FAIL, now fixed: an invented cutoff

**AI invents a cutoff — PASS after a fix.** A cutoff is a number the system uses to choose a route, such as “under 5000, pay automatically.”

The inherited lines 5000 and 10000 stay as today’s evidence. New lines (amount, timeout, how long to keep records, how long a supplier may contest, extract-accept, invoices-per-hour, amount bands) stay `THRESHOLD_UNSET`. That label means the number is unset until an Architecture Decision Record in D3 names an owner. An Architecture Decision Record is a short written choice: what you picked, why, and who owns it.

The fail was this sentence: other invoices from the same supplier in “the same decision window.” That window had no number. Without a bound, every later invoice from supplier V-311 could attach to INV-1003.

The fix: the sibling-time window is also `THRESHOLD_UNSET`. Until D3 names an owner, sibling evidence is the named pair only: INV-1003 and INV-1004, 4950 + 4950 = 9900, processed at 11:15 and 11:16.

## Work that can be retried, and work that cannot

**Retry the whole workflow — PASS.** Retry only steps you can safely run again: take in the invoice, read the PDF, check identity, set flags, call the scorer, recompute the rule result. Payment and notify use a key built from invoice id plus step name, for example `INV-1003:notify`. A second call with the same key returns the first result. The system does not pay twice and does not send two emails.

**Scorer crash written as score 0 — PASS.** If the model is down, the case goes to REVIEW. REVIEW means a named person must decide. The store marks the case unscored. The rank stays empty.

**Keep a live run open while a person thinks — PASS.** The case is saved. A later worker picks it up from the last stored step. If the REVIEW queue is down, the case stays stored as REVIEW and resumes when the queue returns.

## Audit trail and personal data

**A change feed as the first recorder — PASS.** A change feed is a copy of database changes. The application writes the audit row first. Then it stores references in WORM. WORM means write once, read many. After lock, delete and overwrite are refused for the retention period. Only then may status become `PAID`.

**Personal data locked in WORM — PASS.** WORM holds references: audit row id, document hash, input hash, model version, rule version, outcome, times. Names, emails, and full bank numbers stay in a normal store that can delete them later. CH-89 emails stay in that normal store. WORM stores a hash of the email field, not the mailbox text.

## People, rules, and watches

**Review as an Accept-only button — PASS.** The person sees Agree, Disagree, and Override on the same screen. Disagree is as easy to press as Agree.

**Policy only in a prompt — PASS.** Policy is a versioned rule pack the API enforces. A prompt may draft text. It does not pick APPROVE, REVIEW, or REJECT by itself.

**One risk tier for money and advice — PASS.** Each use gets its own verdict: duplicate detection, bank-account change, split / empty-PO invoice, segregation of duties, payment release. AI may analyse and recommend. A named person decides. A named person pays. This pack has no advice-only use.

**Only CPU and uptime charts for AI — PASS.** Operations also watches override rate, unscored rate, audit completeness, false-positive trend, residual miss, REVIEW staffing, and catch rate.

**A thin design that drops the packet numbers — PASS.** The design keeps the locked numbers: two 9800 payments both `PAID`; 4950 + 4950 = 9900; CH-88 requester and approver both U22; alias `V-201` / `V201`; v1 precision 0.52, recall 0.71, false-positive rate 0.18; v2 false-positive rate 0.24; v2 precision and recall blank.

## The extra row

**Index every file in a folder — NOT APPLICABLE.** That mistake is for a search-index lab. This pack has no folder of documents to ingest for answers.

## What this check did not fix

`REVIEW_NOTES.md` still lists other defects: APPROVE cannot actually fire as written, Notify order disagrees across files, duplicate match omits currency, alias names can fight the join, and INV-1003 has no single REVIEW owner when three flags fire. Those are design bugs. They were outside this C.8 list.

## 2026-09-21 17:31

**Model:** Cursor Grok 4.6

### User

where are the D1 Case IDs located?

### Assistant

They live in `D1_AsIs_Assessment/02_CASE_REPLAY.md`. That file rebuilds each packet case from the inherited source files.

The case ids are:

- INV-1001
- INV-1002
- INV-1003
- INV-1004
- CH-88
- CH-89

The same file also replays the alias pair `V-201` / `V201`. That pair is two supplier ids, not an invoice id.

The playbook line “D1 case ids for acceptance cases” points at this replay. The S3a prompt says to read `D1_AsIs_Assessment/02_CASE_REPLAY.md` when you write the PRD.

The original rows sit in Repo 1.0:

- Invoices: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- Bank and email changes: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`
- Alias ids: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/supplier_aliases.csv`

`D1_AsIs_Assessment/00_LOCKED_FACTS.md` also names INV-1001 and INV-1002 as already `PAID`.

## 2026-09-21 17:38

**Model:** Cursor Grok 4.6

### User

@Repo_2_0 @Execution Plan Section D3.md @Project Intent Section 3.2.md @Runbook Pages 4-5.pdf @D1_AsIs_Assessment/02_CASE_REPLAY.md

#### Prompt — S3a write the PRD

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

### Assistant

The PRD is in `D3_PRD/PRD.md`. The map is in `D3_PRD/TRACEABILITY.md`. Repo 1.0 and Repo 2.0 were not edited. No ADR folder was added.

S3b was skipped. Every new limit stays `THRESHOLD_UNSET`. D4 can still demo `REVIEW` with rule conditions that need no new number: same-user bank change, the named sibling pair INV-1003 and INV-1004, empty PO, duplicate match, scorer down. P2P-FR-006 says D3b must write an ADR with a named owner before anyone codes a number.

**Outcomes stay `APPROVE`, `REVIEW`, `REJECT`.** Written policy picks the action. A named person owns `REVIEW`. The model ranks. The model does not pay.

Required acceptance cases cite `D1_AsIs_Assessment/02_CASE_REPLAY.md`:

| Id | Case | To-Be |
|---|---|---|
| P2P-AC-001 | INV-1001 and INV-1002, supplier V-201, PO-7001, 9800 USD, different invoice ids | Later invoice `REVIEW`, recommended REJECT of the second payment |
| P2P-AC-002 | V-201 vs V201 | Canonical join, then duplicate `REVIEW` |
| P2P-AC-003 | CH-88 (U22/U22) then INV-1003 and INV-1004, 4950 + 4950 = 9900 | `REVIEW`. Payment does not run. |
| P2P-AC-004 | Scorer down | `REVIEW`, `unscored`, empty rank |
| P2P-AC-005 | Payment retry, one idempotency key | Payment count stays 1 |

Inherited 5000 and 10000 stay As-Is evidence. They are not To-Be policy.

**Done test:** every Repo 2.0 spine file has a PRD section. Every acceptance line names a case or a measurable check. Every new cutoff points at `THRESHOLD_UNSET` or a future ADR.

## 2026-09-21 17:49

**Model:** Cursor Grok 4.6

### User

does the PRD keeps every new limit as THRESHOLD_UNSET and D4 can still demo REVIEW using **rule conditions without a new number** ?

### Assistant

Yes. The PRD keeps every new limit as `THRESHOLD_UNSET`, and D4 can still demo `REVIEW` with rule conditions that need no new number. S3b can stay skipped.

P2P-FR-006 says D4 must not code a number until D3b writes an ADR that names an owner. Section 9.2 lists the unset lines: new amount lines, sibling-time window, extract accept line, timeouts, contest days, retention days, velocity, rank operating line, false-positive target, auto-REJECT. Inherited 5000 and 10000 stay As-Is evidence. They are not To-Be policy.

D4 sends cases to `REVIEW` with these conditions. None of them needs a new cutoff.

| Rule | Condition | Demo case |
|---|---|---|
| R-SOD-BANK | Requester equals approver on a bank change | CH-88, U22 / U22 |
| R-BANK-SPLIT | Linked bank change plus the named pair INV-1003 and INV-1004 | 4950 + 4950 = 9900 |
| R-NONPO | PO empty | INV-1003, INV-1004 |
| R-DUP | Same canonical supplier, PO, amount, currency; different invoice ids | INV-1001 then INV-1002, 9800 USD |
| R-UNSCORED | Scorer down | Case marked unscored |

9800, 4950, and 9900 are packet amounts copied from the D1 replay. They are facts on those invoices. They are not a policy line such as “REVIEW when amount is over X.”

## 2026-09-21 19:14

**Model:** Cursor Grok 4.6

### User

Explain the issue with CF-88 + split non-PO invoice pair sum 9900 USD

### Assistant

The packet id is **CH-88**, not CF-88.

U22 changed supplier V-311’s bank account, then two invoices with no purchase order went through the next day as `PROCESS`. Each invoice is 4950 USD. Together they are 9900 USD. A person never held the pair. The money is still `APPROVED`, not `PAID`, on those two rows. The path already allowed pay on a new account after a same-user bank change.

### What happened, in order

1. On 2026-08-11 at 13:44, change CH-88 switched V-311 from bank account XXXX1122 to XXXX9988. Requester U22. Approver U22. The audit line stores `SUCCESS`. Source: `D1_AsIs_Assessment/02_CASE_REPLAY.md`.
2. On 2026-08-12 at 11:15, INV-1003 arrived. Supplier V-311. Empty PO. 4950 USD. Approver U22. `bank_changed_30d=Y`. The live rule `NON_PO_UNDER_5000` stored `PROCESS`. Status on the invoice file is `APPROVED`.
3. At 11:16, INV-1004 arrived with the same fields. Same rule. Same `PROCESS`. Pair total: 4950 + 4950 = 9900 USD.

`PROCESS` is the Repo 1.0 result word. It means the invoice continued toward pay without a named person holding it.

### Why the live rules let this through

The non-PO expedite looks at one invoice. Empty PO and amount under 5000 stores `PROCESS`. 4950 is under 5000, so that rule fires twice.

The bank-change review looks at one invoice. It stores `REVIEW` only when `bank_changed_30d` is true and amount is over 10000. 4950 is under 10000. The pair 9900 is also under 10000. That review rule never fires.

There is no split rule. The files name “no split-invoice aggregation” as a gap. The system never adds INV-1003 and INV-1004 together before it decides.

There is no same-user rule. U22 requested the bank change and U22 approved it. U22 is also the invoice approver on both rows.

The INV-1003 audit line stores `PROCESS`. It does not link CH-88. INV-1004 has no audit line.

The reason text is `PROCESS - under threshold.` It does not name 5000 or 10000.

### What that means for money

A new payee account is already on the supplier master. Two invoices with no purchase order sit at `APPROVED` for 9900 USD to that supplier. A person was not required to look at the bank change, the empty POs, or the pair together.

### What the To-Be product does

The PRD sends this sequence to `REVIEW`. Payment does not run. The case stores CH-88, the sibling pair, sum 9900, and the reason codes for empty PO, linked bank change, same-user bank change, and split sum. A named person owns that `REVIEW`.

## 2026-09-21 19:16

**Model:** Cursor Grok 4.6

### User

"Each invoice is 4950 USD. Together they are 9900 USD." why is this a problem?

### Assistant

The problem is that the live system looks at each invoice alone. Each 4950 invoice is under 5000, so each one stores `PROCESS`. Together they are a 9900 USD claim with no purchase order, on a bank account that U22 just changed.

9900 is the pair total from INV-1003 and INV-1004. It is not a To-Be cutoff. It shows what the two rows add up to.

### What the 5000 line does on one row

The live rule is: empty PO and amount under 5000 → `PROCESS`. Path: `exception_rules.yaml`.

INV-1003 amount is 4950. That is under 5000. `PROCESS` fires.
INV-1004 amount is 4950. That is under 5000. `PROCESS` fires again.

A person is not asked to look at either row.

### What changes when you add the two rows

4950 + 4950 = 9900. That is one supplier, V-311, two invoices one minute apart, no PO, both marked `bank_changed_30d=Y`.

If those goods or services had arrived as one 9900 invoice with an empty PO, the 5000 expedite would not have fired. 9900 is not under 5000. The live files have no other rule that would then force `REVIEW` on that single 9900 non-PO row. The bank-change review only fires when amount is over 10000. 9900 is also under 10000.

So 9900 is a problem for two reasons at once:

1. Splitting into 4950 + 4950 uses the 5000 expedite twice. The system never adds the pair, because “no split-invoice aggregation” is listed as a gap.
2. Even the pair total 9900 sits under the 10000 bank-change review line. After CH-88, money can still move toward a new account without that review rule firing.

U22 requested and approved the bank change. U22 is also the approver on both invoices. The 9900 is going toward the new account XXXX9988.

### Short picture with the numbers

One claim: 9900 USD, no PO, new bank account, same user U22.
Filed as two invoices: 4950 and 4950.
Each row is under 5000, so each row stores `PROCESS`.
The 9900 never appears as one decision.

That is why the To-Be product stores the named pair and sends both invoices to `REVIEW`. It does not adopt 5000 or 10000 as the new policy line.

## 2026-09-21 19:18

**Model:** Cursor Grok 4.6

### User

"Supplier bank account change with one  invoice for 4950 USD and another for 3000 USD ." would you consider that a problem?

### Assistant

Yes, if those invoices sit on the same supplier after the bank change, and each one skipped a person because each amount is under 5000. The amounts do not need to be equal. 3000 is not in the packet. It is a what-if.

### What the live rules would do

The non-PO expedite looks at one row. Empty PO and amount under 5000 → `PROCESS`.

- 4950 is under 5000. `PROCESS` fires.
- 3000 is under 5000. `PROCESS` fires again.

The bank-change review looks at one row. It stores `REVIEW` only when amount is over 10000.

- 4950 is under 10000.
- 3000 is under 10000.
- Pair total 4950 + 3000 = 7950, also under 10000.

So the live 10000 line still does not fire. Same miss as 9900, with a smaller pair total.

### What makes it a problem

The control failure is: a new payee account, then more than one invoice that each used the under-5000 path. Equal amounts (4950 + 4950) are a clean teaching pair. Unequal amounts (4950 + 3000) still use that path twice.

I would still need the same facts the packet gives for CH-88:

- Same supplier as the bank change.
- Empty PO, or another reason there is no official buy record.
- The invoices arrive after the change.
- Who requested and who approved the bank change.

If the 3000 invoice has a PO, a goods receipt, and a different supplier, that row is a different case.

### What the To-Be PRD would do

The PRD does not wait for a pair to reach 9900.

- Same-user bank change → `REVIEW` (R-SOD-BANK). No amount needed.
- Empty PO → `REVIEW` (R-NONPO). No amount needed.
- Linked bank change plus empty PO → `REVIEW` (R-BANK-SPLIT). No amount needed.

Each of those 4950 and 3000 rows would go to `REVIEW` on those flags, if they look like INV-1003 (empty PO, linked change).

A numeric sibling-time window stays `THRESHOLD_UNSET`. Until a D3b ADR, the stored sibling pair is only INV-1003 and INV-1004. D4 would not invent a general “any two invoices under 5000” join for 4950 + 3000. The person still sees each invoice with the linked bank change.

