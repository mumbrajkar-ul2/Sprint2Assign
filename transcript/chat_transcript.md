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

## 2026-09-21 21:36

**Model:** Cursor Grok 4.6

### User

Document how the application - with source code in @D4_App - implemented the steps listed in @RunBook Pages 1-2.pdf  to deliver the capabilities mentioned in the 10 items mentioned in the "Sprint 2 - Steps & Approach" table.

### Assistant

The map is in `D4_App/SPINE_IMPLEMENTATION.md`. It walks the ten **Sprint 2 - Steps & Approach** rows from runbook pages 1–2 and names the D4 files that deliver each one.

The app is a React demo. Policy lives in `src/lib/p2pRulesEngine.ts`. Outcomes are `APPROVE`, `REVIEW`, and `REJECT` only. Payment writes the audit row first, then a WORM reference, then `PAID`. Notify and Pay use keys `{case_id}:notify` and `{case_id}:payment`. Scorer down stores an empty rank, not `0`.

Training, live OCR, sanctions, geography, cloud IaC, and CI/CD are not in this browser app. Those stay Unknown, Missing, or `THRESHOLD_UNSET` in the same file.

## 2026-09-21 23:40

**Model:** Cursor Grok 4.6

### User

Move the SPINE_IMPLEMENTATION.MD  to a sub-folder called "Documentation" under D4_APP/

### Assistant

The file now sits at `D4_App/Documentation/SPINE_IMPLEMENTATION.md`.

The `D4_App/README.md` link points to that path. The old copy at `D4_App/SPINE_IMPLEMENTATION.md` is gone.

## 2026-09-22 10:25

**Model:** Cursor Grok 4.6

### User

in @Implementation_Playbook.md it says on line 495 - "3. Paste the S4b prompt. Fill in the Studio URL and what you actually saw." what is expected when it comes to "what you actually saw"?

### Assistant

Line 495 is asking for **your click-through notes from the Studio app**, written before Cursor writes the D4 evidence files.

S4b is a recording step. Cursor is told not to invent screens you did not confirm. You supply the facts. Cursor turns them into `DEMO_SCRIPT.md`, `TEST_EVIDENCE.md`, `SIDE_EFFECT_COUNTER.md`, and `README.md`.

The S4b prompt names the three things to paste:

1. **Studio URL** — the live app link, for example the one already in `D4_App/README.md`.
2. **Screens that exist** — only the screens you opened. If Review or Case History is missing, say that.
3. **What the UI showed for each S4c case** — expected vs observed, PASS or FAIL, and the honesty label on any number (`SIMULATED`, `PRECOMPUTED`, `REAL`, or `EDUCATIONAL`).

### What to write for each demo case

Use the S4c table. For each row, write the outcome on screen, the rule ids if shown, and any count or badge.

| Case | What to record as “what I saw” |
|---|---|
| INV-1001 and INV-1002 | Whether INV-1002 was flagged as a duplicate of INV-1001. Outcome shown. Whether both could go to Pay. |
| V-201 vs V201 | Whether the UI treated them as the same supplier (Alpha Industrial Supply). |
| CH-88 then INV-1003 and INV-1004 | Outcome (must be REVIEW). Reviewer name you typed. Whether Disagree worked. |
| Scorer down | Score field empty or `UNSCORED`, not `0`. Outcome REVIEW. |
| Pay twice | `payment_count` after the second click. Must stay 1. Same for notify if you retried Notify. |

Also note: honesty badge on the rank number, whether Case History can rebuild one case, and Pay/Notify counts if you measured them. If you did not measure a count, write `Unknown`.

### Example paste into the S4b chat

```text
Studio URL: https://ai.studio/apps/<your-id>

Screens present: Ingest, Extract, Verify, Detect, Score+Decide, Review, Notify, Pay, Case History.
Screens missing: none.

INV-1001 / INV-1002: INV-1002 showed duplicate of INV-1001 (same supplier+PO+amount). Outcome REVIEW. PASS. Rank badge SIMULATED.

V-201 / V201: UI showed Alpha Industrial Supply for both. PASS.

CH-88 + INV-1003 / INV-1004: both invoices REVIEW. Reviewer "Ada". Disagree set REJECT. PASS.

Scorer down: score blank, banner UNSCORED, outcome REVIEW. PASS.

Pay retry on INV-1001: first click payment_count=1. Second click still 1. PASS.

Pay/Notify naive vs safe counts: Unknown. I did not count naive retries.
```

That block is “what you actually saw.” Step 4 then asks you to paste it so Cursor can fill the evidence files from those notes, not from the PRD wishlist.

## 2026-09-22 10:36

**Model:** Cursor Grok 4.7

### User

run the application from "https://aistudio.google.com/apps/4d381f01-eadc-4c67-bc79-5a3f55eb5e53?project=gen-lang-client-0889107005&showAssistant=true&showPreview=true&fullscreenApplet=true " and create the block listing “what you actually saw" to insert in the S4b prompt

### Assistant

The hosted Studio link opened a Google sign-in page, so these notes come from the local app at `http://localhost:3000`. That is the `D4_App` project whose README points at the same Studio app id. The local server is still running if you want to click the same path.

Paste this under the S4b prompt:

```text
Studio URL: https://aistudio.google.com/apps/4d381f01-eadc-4c67-bc79-5a3f55eb5e53?project=gen-lang-client-0889107005&showAssistant=true&showPreview=true&fullscreenApplet=true
Observed on the local run of that app: http://localhost:3000 (Google sign-in blocked the hosted page).

Screens I opened:
- Workflow: 1. Ingest, 2. Extract, 3. Verify, 4. Detect, 5. Score + Decide, 6. Review, 7. Notify, 8. Pay
- Case History & Rebuild
- WORM Reference Store
- Model Governance & Metrics

Tabs visible that I did not open: Escalation Events (badge showed 3), Acceptance Test Suite (AC-001..AC-038).

Header on every screen: outcomes APPROVE | REVIEW | REJECT only. Banner says No "PROCESS". Footer: Rule Pack D3a, Model p2p-risk-2.

Seed cases in the Active Case list:
- INV-1001 • V-201 • $9800 (APPROVE)
- INV-1002 • V-201 • $9800 (REVIEW)
- INV-1003 • V-311 • $4950 (REVIEW)
- INV-1004 • V-311 • $4950 (REVIEW)
- INV-1005 • V-500 • $3200 (APPROVE)

INV-1001 / INV-1002 duplicate. PASS.
- Detect on INV-1002: Duplicate Detector FLAGGED. Match key V-201:PO-7001:9800. Prior match INV-1001. Invoice ID match: No (Different ID).
- Rank: #4 of 420 cohort. Raw index 0.92. Honesty Badge: PRECOMPUTED. Status: SCORED. Model version p2p-risk-2.
- Score + Decide: outcome REVIEW. Recommended: REJECT. Rule fired: R-DUP. Reasons: DUP_SUPPLIER_PO_AMOUNT, POLICY_REVIEW. Rule pack p2p-rules-v2.0.
- Pay on INV-1002: Status PAYMENT LOCKED. Outcome on screen: REVIEW. Payment Count: 0. Pay button was present and the lock text said payment runs only for APPROVE.
- Detect on INV-1001: Duplicate Detector CLEAN. Rank #240 of 420 cohort. Raw index 0.12. Honesty Badge: PRECOMPUTED. Pay status: PAID & SETTLED. Payment Count: 1. Payer shown: AP-DIRECTOR-1. Audit ID: AUDIT-INV-1001-01.
- Extract on INV-1002 showed confidence percents with no honesty badge: Invoice ID 99%, Supplier ID 98%, Supplier Name 99%, PO 99%, Amount 99%, Approver U11 97%, Bank Changed N 99%. Extractor label: ocr-v2.1.

V-201 vs V201 alias. PASS for the id join. The display name is not the same string.
- Inject V201 Alias created INV-1006-ALIAS • V201 • $9800 (REVIEW).
- Verify: Raw Supplier ID V201. Canonical Supplier ID V-201. Canonical Entity line: Alpha Industries Supply. Known alias pair line: V-201 / V201 (Alpha Industrial / Industries).
- The seeded V-201 case (INV-1002 Verify) says Canonical Entity: Alpha Industrial Supply.
- Detect on INV-1006-ALIAS: Duplicate Detector FLAGGED. Match key V-201:PO-7001:9800. Prior match INV-1001. Rank #5 of 420 cohort. Raw index 0.91. Honesty Badge: SIMULATED. Status: SCORED.
- Score + Decide: outcome REVIEW. Recommended: REJECT. Rules fired: R-DUP, R-ALIAS. Reasons: DUP_SUPPLIER_PO_AMOUNT, ALIAS_CANONICAL_JOIN, POLICY_REVIEW.

CH-88 then INV-1003 and INV-1004. PASS. Both stay REVIEW until a person acts. Disagree is on screen and it works.
- INV-1003 Verify: Identity Consistency SOD VIOLATION FLAGGED. Record CH-88 (bank_account). Requester U22. Approver U22 (Same user!). Master Data Status: HELD_FOR_REVIEW. Masked account XXXX9988. Bank verification method: none.
- INV-1003 Detect: Duplicate CLEAN. Split sibling SIBLING DETECTED, sibling INV-1004, pair sum $9900 USD. PO check NON-PO. Rank #2 of 420 cohort. Raw index 0.96. Honesty Badge: PRECOMPUTED.
- INV-1003 Score + Decide: outcome REVIEW. Recommended: REJECT. Rules: R-SOD-BANK, R-BANK-SPLIT, R-NONPO. Reasons: NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW. Rationale names CH-88, bank XXXX1122 to XXXX9988, requester and approver U22, sibling INV-1004, sum 9900 USD.
- INV-1004 Score + Decide: same REVIEW / recommended REJECT pattern. Sibling named as INV-1003. Same reason codes. Rules: R-SOD-BANK, R-BANK-SPLIT, R-NONPO.
- Review on INV-1003 before a click: Queue Status AWAITING NAMED REVIEWER. Recommended REJECT. Three equal buttons: Agree REJECT, Disagree & Set APPROVE, Manager Override. Name field was already filled with Sarah Jenkins (AP Lead).
- Blank name then Disagree: stayed on Review. Message: "Reviewer account name is required by PRD P2P-FR-003."
- Name Ada, then Disagree & Set APPROVE: case list changed INV-1003 to APPROVE. Screen moved to Notify. Notify payload Decision Outcome: APPROVE. Notify Count: 0. Reason codes on the payload were still NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW.
- Case History after that click, case INV-1003: state REVIEWED. 1 audit row. Actor: Ada. Transition DECIDED to REVIEWED. Outcome & score: APPROVE • #2 of 420 cohort. Model: p2p-risk-2. Rule: p2p-rules-v2.0. Reasons: NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW. Note on row: "Review closed with disposition: disagree. Final outcome: APPROVE."
- Before that click, Case History for INV-1003 said 0 audit rows: "No audit rows written yet for this case."
- Review screen also showed "Active Review Session Time: 14s" with no honesty badge. That 14s was the same on every Review screen I opened.

Scorer down. PASS. I used INV-1005, which started as APPROVE.
- Header button after the toggle: Scorer: DOWN (UNSCORED).
- Detect: Honesty Badge: REAL. Status: UNSCORED. Rank field: NULL. Banner: UNSCORED (Scorer Down / Timeout).
- Score + Decide: outcome REVIEW. Recommended: REVIEW. Rule fired: R-UNSCORED. Reasons: SCORER_UNSCORED, POLICY_REVIEW. Case list showed INV-1005 (REVIEW).
- Review buttons: Agree REVIEW, Disagree & Set APPROVE, Manager Override.
- The rank field showed the word NULL. I did not see a score of 0 on that screen.

Pay twice. PASS.
- INV-1001 was already PAID. Payment Count showed 1. Click "Retry / Re-verify Idempotent Payment". Banner: "Idempotency verified: Payment already completed under key 'INV-1001:payment'. Returned existing payment confirmation. Count remains 1." Payment Count stayed 1.
- INV-1005 before any pay click: outcome APPROVE, Payment Count 0, button "Authorize & Pay $3,200 USD". Payer field already held Michael Vance (Treasurer).
- First pay click: "Payment released successfully. Key: INV-1005:payment. State updated to PAID." Payment Count: 1. Status: PAID & SETTLED. Audit ID: AUDIT-INV-1005-PAY. Header WORM Ref changed from 1 row to 2 rows.
- Second click: "Idempotency verified: Payment already completed under key 'INV-1005:payment'. ... Count remains 1." Payment Count stayed 1.

Notify retry. PASS for the safe counter.
- INV-1001 Notify Count was already 1. Key INV-1001:notify. Supplier line: Alpha Industrial Supply (V-201).
- Click "Retry / Verify Idempotent Notify". Banner: "Idempotency verified: Notification already sent under key 'INV-1001:notify'. Returned existing record. Count remains 1." Notify Count stayed 1.

Pay/Notify naive vs safe vs cached counts:
- Safe Pay count: measured. Stays 1. See INV-1001 and INV-1005 above.
- Safe Notify count: measured. Stays 1 on INV-1001.
- Naive count: Unknown. I did not run a path that ignores the idempotency key.
- Cached count: Unknown. The screen does not show a separate cached counter.
- How to measure naive: count payment and notify writes with the idempotency check removed, using the same case id and step name, then compare with payment_count and notify_count on screen.

Other numbers I saw:
- Model Governance page: no accuracy 94% figure. Table honesty classes included PRECOMPUTED (precision 0.52, recall 0.71, false-positive rate 0.18 / 0.24) and EDUCATIONAL (packet pattern catch rate 100% (4 / 4)). PR-AUC row said Missing, honesty Unknown.
- WORM page after Reset: 1 locked row, WORM-REF-001, audit AUDIT-INV-1001-01, case INV-1001, outcome APPROVE, timestamp 2026-08-11T10:05:00. Page text says no delete or overwrite controls are on that screen. I did not see a delete button.
```

## 2026-09-22 10:39

**Model:** Cursor Grok 4.7

### User

is the block covering "a list of screens that exist, and the result of each demo case (PASS/FAIL plus what the UI showed)."?

### Assistant

Yes. The block has both parts that sentence asks for.

**Screens that exist.** These were opened:

- The eight workflow screens: Ingest, Extract, Verify, Detect, Score + Decide, Review, Notify, Pay
- Case History & Rebuild
- WORM Reference Store
- Model Governance & Metrics

Score and Decide are one screen, titled “5. Score + Decide”. There is no separate Decide screen.

Escalation Events and Acceptance Test Suite are only header tabs. Those pages were not opened, so the block does not say those screens exist.

**Each demo case.** Each S4c case has PASS and the text that was on screen:

| Case | Verdict in the block |
|---|---|
| INV-1001 and INV-1002 duplicate | PASS, plus the flag, the locked pay screen, and the rank badge |
| V-201 vs V201 | PASS for the id join, plus the two supplier-name strings |
| CH-88 with INV-1003 and INV-1004 | PASS, plus REVIEW, the Ada disagree click, and the audit row |
| Scorer down on INV-1005 | PASS, plus NULL, UNSCORED, and REVIEW |
| Pay twice | PASS, plus payment count staying at 1 on INV-1001 and INV-1005 |

That is the full case list the evidence table asks for.

The notify retry, the metrics page, and the Unknown naive and cached counts are extra. Those lines feed the other three files. They are not required by that one sentence.

## 2026-09-22 10:50

**Model:** Cursor Grok 4.7

### User

@D3_PRD/PRD.md
You are an AI FDE recording Deliverable 4 evidence.

Do not edit 05_procure_to_pay_exception_repo_1_0.
Do not invent screens I did not confirm.

I will paste: the Studio app URL, a list of screens that exist, and the result of each demo case (PASS/FAIL plus what the UI showed).

URL:https://aistudio.google.com/apps/4d381f01-eadc-4c67-bc79-5a3f55eb5e53?project=gen-lang-client-0889107005&showAssistant=true&showPreview=true&fullscreenApplet=true

What I saw:
-----What I  saw (Start)----------------------------------------------------------
Studio URL: https://aistudio.google.com/apps/4d381f01-eadc-4c67-bc79-5a3f55eb5e53?project=gen-lang-client-0889107005&showAssistant=true&showPreview=true&fullscreenApplet=true
Observed on the local run of that app: http://localhost:3000 (Google sign-in blocked the hosted page).

Screens I opened:
- Workflow: 1. Ingest, 2. Extract, 3. Verify, 4. Detect, 5. Score + Decide, 6. Review, 7. Notify, 8. Pay
- Case History & Rebuild
- WORM Reference Store
- Model Governance & Metrics

Tabs visible that I did not open: Escalation Events (badge showed 3), Acceptance Test Suite (AC-001..AC-038).

Header on every screen: outcomes APPROVE | REVIEW | REJECT only. Banner says No "PROCESS". Footer: Rule Pack D3a, Model p2p-risk-2.

Seed cases in the Active Case list:
- INV-1001 • V-201 • $9800 (APPROVE)
- INV-1002 • V-201 • $9800 (REVIEW)
- INV-1003 • V-311 • $4950 (REVIEW)
- INV-1004 • V-311 • $4950 (REVIEW)
- INV-1005 • V-500 • $3200 (APPROVE)

INV-1001 / INV-1002 duplicate. PASS.
- Detect on INV-1002: Duplicate Detector FLAGGED. Match key V-201:PO-7001:9800. Prior match INV-1001. Invoice ID match: No (Different ID).
- Rank: #4 of 420 cohort. Raw index 0.92. Honesty Badge: PRECOMPUTED. Status: SCORED. Model version p2p-risk-2.
- Score + Decide: outcome REVIEW. Recommended: REJECT. Rule fired: R-DUP. Reasons: DUP_SUPPLIER_PO_AMOUNT, POLICY_REVIEW. Rule pack p2p-rules-v2.0.
- Pay on INV-1002: Status PAYMENT LOCKED. Outcome on screen: REVIEW. Payment Count: 0. Pay button was present and the lock text said payment runs only for APPROVE.
- Detect on INV-1001: Duplicate Detector CLEAN. Rank #240 of 420 cohort. Raw index 0.12. Honesty Badge: PRECOMPUTED. Pay status: PAID & SETTLED. Payment Count: 1. Payer shown: AP-DIRECTOR-1. Audit ID: AUDIT-INV-1001-01.
- Extract on INV-1002 showed confidence percents with no honesty badge: Invoice ID 99%, Supplier ID 98%, Supplier Name 99%, PO 99%, Amount 99%, Approver U11 97%, Bank Changed N 99%. Extractor label: ocr-v2.1.

V-201 vs V201 alias. PASS for the id join. The display name is not the same string.
- Inject V201 Alias created INV-1006-ALIAS • V201 • $9800 (REVIEW).
- Verify: Raw Supplier ID V201. Canonical Supplier ID V-201. Canonical Entity line: Alpha Industries Supply. Known alias pair line: V-201 / V201 (Alpha Industrial / Industries).
- The seeded V-201 case (INV-1002 Verify) says Canonical Entity: Alpha Industrial Supply.
- Detect on INV-1006-ALIAS: Duplicate Detector FLAGGED. Match key V-201:PO-7001:9800. Prior match INV-1001. Rank #5 of 420 cohort. Raw index 0.91. Honesty Badge: SIMULATED. Status: SCORED.
- Score + Decide: outcome REVIEW. Recommended: REJECT. Rules fired: R-DUP, R-ALIAS. Reasons: DUP_SUPPLIER_PO_AMOUNT, ALIAS_CANONICAL_JOIN, POLICY_REVIEW.

CH-88 then INV-1003 and INV-1004. PASS. Both stay REVIEW until a person acts. Disagree is on screen and it works.
- INV-1003 Verify: Identity Consistency SOD VIOLATION FLAGGED. Record CH-88 (bank_account). Requester U22. Approver U22 (Same user!). Master Data Status: HELD_FOR_REVIEW. Masked account XXXX9988. Bank verification method: none.
- INV-1003 Detect: Duplicate CLEAN. Split sibling SIBLING DETECTED, sibling INV-1004, pair sum $9900 USD. PO check NON-PO. Rank #2 of 420 cohort. Raw index 0.96. Honesty Badge: PRECOMPUTED.
- INV-1003 Score + Decide: outcome REVIEW. Recommended: REJECT. Rules: R-SOD-BANK, R-BANK-SPLIT, R-NONPO. Reasons: NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW. Rationale names CH-88, bank XXXX1122 to XXXX9988, requester and approver U22, sibling INV-1004, sum 9900 USD.
- INV-1004 Score + Decide: same REVIEW / recommended REJECT pattern. Sibling named as INV-1003. Same reason codes. Rules: R-SOD-BANK, R-BANK-SPLIT, R-NONPO.
- Review on INV-1003 before a click: Queue Status AWAITING NAMED REVIEWER. Recommended REJECT. Three equal buttons: Agree REJECT, Disagree & Set APPROVE, Manager Override. Name field was already filled with Sarah Jenkins (AP Lead).
- Blank name then Disagree: stayed on Review. Message: "Reviewer account name is required by PRD P2P-FR-003."
- Name Ada, then Disagree & Set APPROVE: case list changed INV-1003 to APPROVE. Screen moved to Notify. Notify payload Decision Outcome: APPROVE. Notify Count: 0. Reason codes on the payload were still NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW.
- Case History after that click, case INV-1003: state REVIEWED. 1 audit row. Actor: Ada. Transition DECIDED to REVIEWED. Outcome & score: APPROVE • #2 of 420 cohort. Model: p2p-risk-2. Rule: p2p-rules-v2.0. Reasons: NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW. Note on row: "Review closed with disposition: disagree. Final outcome: APPROVE."
- Before that click, Case History for INV-1003 said 0 audit rows: "No audit rows written yet for this case."
- Review screen also showed "Active Review Session Time: 14s" with no honesty badge. That 14s was the same on every Review screen I opened.

Scorer down. PASS. I used INV-1005, which started as APPROVE.
- Header button after the toggle: Scorer: DOWN (UNSCORED).
- Detect: Honesty Badge: REAL. Status: UNSCORED. Rank field: NULL. Banner: UNSCORED (Scorer Down / Timeout).
- Score + Decide: outcome REVIEW. Recommended: REVIEW. Rule fired: R-UNSCORED. Reasons: SCORER_UNSCORED, POLICY_REVIEW. Case list showed INV-1005 (REVIEW).
- Review buttons: Agree REVIEW, Disagree & Set APPROVE, Manager Override.
- The rank field showed the word NULL. I did not see a score of 0 on that screen.

Pay twice. PASS.
- INV-1001 was already PAID. Payment Count showed 1. Click "Retry / Re-verify Idempotent Payment". Banner: "Idempotency verified: Payment already completed under key 'INV-1001:payment'. Returned existing payment confirmation. Count remains 1." Payment Count stayed 1.
- INV-1005 before any pay click: outcome APPROVE, Payment Count 0, button "Authorize & Pay $3,200 USD". Payer field already held Michael Vance (Treasurer).
- First pay click: "Payment released successfully. Key: INV-1005:payment. State updated to PAID." Payment Count: 1. Status: PAID & SETTLED. Audit ID: AUDIT-INV-1005-PAY. Header WORM Ref changed from 1 row to 2 rows.
- Second click: "Idempotency verified: Payment already completed under key 'INV-1005:payment'. ... Count remains 1." Payment Count stayed 1.

Notify retry. PASS for the safe counter.
- INV-1001 Notify Count was already 1. Key INV-1001:notify. Supplier line: Alpha Industrial Supply (V-201).
- Click "Retry / Verify Idempotent Notify". Banner: "Idempotency verified: Notification already sent under key 'INV-1001:notify'. Returned existing record. Count remains 1." Notify Count stayed 1.

Pay/Notify naive vs safe vs cached counts:
- Safe Pay count: measured. Stays 1. See INV-1001 and INV-1005 above.
- Safe Notify count: measured. Stays 1 on INV-1001.
- Naive count: Unknown. I did not run a path that ignores the idempotency key.
- Cached count: Unknown. The screen does not show a separate cached counter.
- How to measure naive: count payment and notify writes with the idempotency check removed, using the same case id and step name, then compare with payment_count and notify_count on screen.

Other numbers I saw:
- Model Governance page: no accuracy 94% figure. Table honesty classes included PRECOMPUTED (precision 0.52, recall 0.71, false-positive rate 0.18 / 0.24) and EDUCATIONAL (packet pattern catch rate 100% (4 / 4)). PR-AUC row said Missing, honesty Unknown.
- WORM page after Reset: 1 locked row, WORM-REF-001, audit AUDIT-INV-1001-01, case INV-1001, outcome APPROVE, timestamp 2026-08-11T10:05:00. Page text says no delete or overwrite controls are on that screen. I did not see a delete button.
------------What I Saw (End)----------------------------------------------------

Write:
- D4_App/DEMO_SCRIPT.md — minute-by-minute click path for Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify → Pay. Honesty class on every number.
- D4_App/TEST_EVIDENCE.md — table of cases: INV-1001/1002 duplicate, V-201/V201 alias, CH-88 + INV-1003/1004, scorer down, payment retry. Columns: case, expected, observed, PASS/FAIL, honesty class.
- D4_App/SIDE_EFFECT_COUNTER.md — naive vs safe vs cached counts for Pay and Notify (Lab 29). If I did not measure a number, write Unknown and how to measure it.
- D4_App/README.md — URL, platform (Google AI Studio Build), PRD version, model/rule versions shown in the UI.

If a required screen is missing, list it as a defect. Do not claim it exists.

### Assistant

The four evidence files are written from the local run at `http://localhost:3000`. The Studio URL stopped at Google sign-in, so the hosted page is not described.

All five demo cases are PASS, using only the text you recorded:

- INV-1001 / INV-1002 duplicate: REVIEW, recommended REJECT, rule R-DUP, pay locked with count 0
- V-201 / V201: id join PASS. Display names stay two strings (Alpha Industrial Supply vs Alpha Industries Supply). Rank badge SIMULATED
- CH-88 with INV-1003 and INV-1004: both REVIEW until Ada disagrees. Case History then has one row, DECIDED to REVIEWED
- Scorer down on INV-1005: rank shows NULL, outcome REVIEW, badge REAL. Notes record no score of 0
- Pay twice: count stays 1 on INV-1001 and INV-1005

Notify retry on INV-1001 is also PASS. Count stays 1.

Unknown, with the measurement method in `SIDE_EFFECT_COUNTER.md`: naive Pay, naive Notify, cached Pay, cached Notify.

Screens opened are the eight workflow steps, Case History, WORM, and Model Governance. Escalation Events (badge 3) and Acceptance Test Suite were visible and not opened, so their contents are not claimed.

Two numbers were on screen with no honesty badge: Extract confidence percents on INV-1002 (extractor ocr-v2.1), and Review session time 14s on every Review screen. Model Governance showed no accuracy 94% figure. PR-AUC was Missing, honesty Unknown.

One gap in the click order: scorer down left INV-1005 as REVIEW, and the pay pass recorded it as APPROVE. The notes do not name the click that restored APPROVE. The script says to confirm APPROVE, or Reset, before repeating that pay.

Repo 1.0 was not edited.

Files:

- `D4_App/DEMO_SCRIPT.md`
- `D4_App/TEST_EVIDENCE.md`
- `D4_App/SIDE_EFFECT_COUNTER.md`
- `D4_App/README.md`

Versions on the UI: PRD D3a, model `p2p-risk-2`, rule pack `p2p-rules-v2.0`, footer Rule Pack D3a.

## 2026-09-22 11:01

**Model:** Cursor Grok 4.7

### User

did you find any screen missing and if so...where have you documented it?

### Assistant

No required screen was missing. The eight workflow steps, Case History & Rebuild, WORM Reference Store, and Model Governance & Metrics were all opened.

Two tabs were visible and not opened. I recorded them as unconfirmed pages, not as missing-screen defects:

- Escalation Events (badge showed 3)
- Acceptance Test Suite (AC-001..AC-038)

That note is in three files:

- `D4_App/DEMO_SCRIPT.md` — section “Not a confirmed page”, and the line that says no required workflow screen from this session was missing
- `D4_App/TEST_EVIDENCE.md` — table “Screens and gaps”
- `D4_App/README.md` — “Visible and not opened”

`SIDE_EFFECT_COUNTER.md` does not list screens. It only records the Unknown Pay and Notify counts.

## 2026-09-22 11:02

**Model:** Cursor Grok 4.7

### User

do we need to make any corrections to the app ?

### Assistant

No. The five cases you marked PASS do not need an app change. Duplicate hold, the alias join, the Ada disagree path, scorer-down NULL, and the second pay staying at count 1 already match what you saw.

Leave these as they are. They are gaps in what was measured, not failed screens:

- Escalation Events and Acceptance Test Suite were not opened.
- Naive and cached Pay and Notify counts were not measured. The safe counts already stay at 1.

Two items on screens you did open are label gaps. They did not fail a demo case:

- Extract on INV-1002 shows confidence percents, with extractor `ocr-v2.1`, and no honesty badge. Detect ranks on the same app do carry a badge.
- Review shows Active Review Session Time starting at 14s each time that screen opens, with no honesty badge. You saw that same 14s on every Review screen.

I have not changed the app. Say if you want those two labels fixed.

## 2026-09-22 11:09

**Model:** Cursor Grok 4.7

### User

The local Vite dev server on port 3000 was aborted.

### Assistant

The local app on port 3000 has stopped. The click-through notes from that run are unchanged.

## 2026-09-22 11:10

**Model:** Cursor Grok 4.7

### User

@D1_AsIs_Assessment @Repo_2_0 @D3_PRD @D4_App  @Project Intent - Section 3.3.md @Runbook Pages 4-5.pdf

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

### Assistant

The presentation pack is in `Presentation/`. A teammate can speak the seven slides and answer the nine defence questions from those files.

**What you can say out loud**

The event is one supplier invoice, and the question is whether it can go on to payment. The facts at decision time are the invoice id, supplier, purchase order, amount, currency, approver, the 30-day bank-change flag, and the named rule and model versions.

The numbers we lead with are precision, recall, and false-positive rate. Model v2 flags 0.24 of good invoices. Model v1 flags 0.18. Precision and recall on v2 are blank. PR-AUC is Missing.

Outcomes are APPROVE, REVIEW, and REJECT. Written rules pick the outcome. A named person releases the payment.

A second Pay or Notify would duplicate that write. On INV-1005 the payment count went from 0 to 1 and stayed 1 on the retry. Key: `INV-1005:payment`.

The inherited “missing PO under threshold” test and the “exact invoice-number duplicate” test stayed visible until the requirements document sent those cases to REVIEW. The sibling time window is still unset.

Rebuild INV-1003 after Ada: actor Ada, DECIDED to REVIEWED, rank #2 of 420 cohort, reasons NON_PO, BANK_CHANGE_LINKED, SOD_SAME_USER_BANK, SPLIT_SIBLING_SUM, POLICY_REVIEW, model p2p-risk-2, rule p2p-rules-v2.0.

P2P-05 stays Missing, owner TBD. The two old audit lines do not make that control exist.

**Files**

- `Presentation/SLIDE_OUTLINE.md` — slides 1 to 7
- `Presentation/DEFENCE.md` — nine answers, each with a source file
- `Presentation/README.md` — the four folders and those two files

Unknowns a judge may ask: prompt id on the audit row, whether Case History showed CH-88 as its own field, the Open Contest click, a second write of the same audit id, and naive versus cached counts. Those stay Unknown because the 22 Sep notes did not record them.

## 2026-09-22 11:18

**Model:** Cursor Grok 4.7

### User

Create a PowerPoint Presentation with the above content that is expected to be presented. Provide detailed notes in the notes section of each slide in plain-speak.

### Assistant

The deck is `Presentation/Team_Presentation.pptx`. It has the seven slides in trainer order. Each slide has a speaking script in the notes pane.

Open the file in PowerPoint. Use View, then Notes, to see the script under the slide. The script says what to speak, what a term means, and which file the fact comes from.

The slides are:

1. One supplier invoice may go on to payment.
2. Three conflicts. Control P2P-05 is Missing.
3. One design file for each of the ten runbook steps.
4. Five acceptance cases the app must pass.
5. Five clicked cases passed on the local app.
6. Case History rebuilds INV-1003 after Ada’s click.
7. These items stay open on purpose.

The notes for slide 6 walk the rebuild: actor Ada, from-state DECIDED, to-state REVIEWED, rank #2 of 420, the five reason codes, model p2p-risk-2, rule p2p-rules-v2.0. Prompt id stays Unknown.

`Presentation/README.md` now lists the deck next to the outline and the defence answers.

## 2026-09-22 11:42

**Model:** Cursor Grok 4.7

### User

Add a Glossary of acronyms (CH, FR, U, etc) used across this project at the end of the presentation

### Assistant

Two glossary slides are now at the end of `Presentation/Team_Presentation.pptx`. The deck is 9 slides. The earlier footers now say 9.

Slide 8 lists the codes on the cases and the controls: CH, U, INV, V, PO, AP, P2P, P2P-01 to P2P-05, P2P-FR, P2P-AC, and SoD.

Slide 9 lists the codes on the documents: D1 to D4, D3a and D3b, PRD, ADR, TBD, PROCESS, WORM, PR-AUC, USD, ERP, and C-01 to C-03.

Each row says what the code means in this project, with one worked example. The notes under each slide say more, including the codes that did not fit on the table: P2P-SM, ESC, RCTE, SLA, OCR, and PEP. Where the files never spell the letters, the notes say that. CH, U, TBD, and ERP are in that group.

`Presentation/SLIDE_OUTLINE.md` has the same two slides in text.

## 2026-09-22 12:26

**Model:** Cursor Grok 4.7

### User

Move these acronym slides in Appendix. Create a slide in Appendix section that compares the original application (based on Repo 1 - @05_procure_to_pay_exception_repo_1_0 ) with the improved application (in Repo 2 - @D4_App )  in terms of A. features B. Limitations/Flaws. Update the notes section as well

### Assistant

The deck is now 10 slides. Slides 8 to 10 are the appendix. Reopen `Presentation/Team_Presentation.pptx` if it was already open. The file was closed so the new slides could be saved.

Slide 8 compares the two sides. The left side is Repo 1.0, the inherited folder of files. That folder has no screens. The right side is the D4 app, the running demo built from the Repo 2.0 design.

Each side has two parts. A is what that side can do. B is what is still wrong or missing.

Repo 1.0 can store the four invoices, the two supplier changes, the rules, and the five controls. Its duplicate check uses the invoice number only. An empty purchase order under 5,000 goes forward as PROCESS. The flaws are the paid pair INV-1001 and INV-1002, the 9,900 pair that took PROCESS, CH-88 with user U22 on both sides and no audit link, P2P-05 Missing, and a worse false-positive rate on p2p-risk-2 (0.24 versus 0.18).

The D4 app walks Ingest through Pay and Case History. Outcomes are APPROVE, REVIEW, and REJECT. INV-1002, the V201 alias, and the CH-88 pair go to REVIEW. A second Pay click stays at count 1. What stays open: the hosted page stopped at Google sign-in, the P2P-05 owner is still TBD, new amount lines are still unset, precision and recall on p2p-risk-2 are still blank, and the contest click was not measured.

The notes under slide 8 are the speaking script, with the source files named. Slides 9 and 10 are the glossary, now labeled Appendix. Their notes say they are appendix slides.

`Presentation/SLIDE_OUTLINE.md` matches this order.

## 2026-09-22 14:33

**Model:** Cursor Grok 4.7

### User

add a slide on how the improved application (in Repo 2 - @D4_App )  addresses the below limitations/flaws in the original application (based on Repo 1 - @05_procure_to_pay_exception_repo_1_0 ) , namely ,
B. Limitations and flaws
INV-1001 and INV-1002 are both paid at 9,800 USD. The check stored NO_DUPLICATE.
INV-1003 and INV-1004 are 4,950 + 4,950 = 9,900. Both took PROCESS. CH-88 is user U22 on both sides. The audit line does not link that change.
P2P-05 is Missing. Owner TBD. No payment retry key. If the scorer is down, the path is Unknown.
p2p-risk-2 flags 0.24 of good invoices. p2p-risk-1 flags 0.18. Precision and recall on p2p-risk-2 are blank.

### Assistant

Slide 9 is now in the appendix of `Presentation/Team_Presentation.pptx`. It sits after the comparison and before the glossary. The deck is 11 slides. The notes under that slide are the speaking script.

Each of the four Repo 1.0 flaws has a D4 answer from the 22 September click notes.

The paid pair. INV-1002 goes to REVIEW. The match is supplier V-201, purchase order PO-7001, and 9,800 USD. Payment count stays 0.

The split pair and CH-88. Both invoices stay REVIEW. The screen names CH-88, same user U22, the empty purchase order, and the pair sum 9,900. The audit row stores the reason BANK_CHANGE_LINKED. The click notes did not record the change id as its own field on that history row. That detail stays Unknown.

The missing control and the unknown failure path. Pay uses a key. A second click on INV-1005 stays at count 1. Scorer down sets REVIEW and leaves the rank empty. The P2P-05 owner is still TBD.

The model rates. The metrics page shows false-positive rate 0.24 on p2p-risk-2 and 0.18 on p2p-risk-1. The rank orders the case. A named person pays. Precision and recall on p2p-risk-2 stay blank.

`Presentation/SLIDE_OUTLINE.md` lists the same slide as slide 9. The glossary is now slides 10 and 11.

## 2026-09-22 14:56

**Model:** Cursor Grok 4.7

### User

does REPO 1 support any payment status other than PROCESS?

### Assistant

Yes. Repo 1.0 stores more than one status word. PROCESS is the result the four packet cases actually hit.

The rule file names three actions: BLOCK, REVIEW, and PROCESS. A duplicate invoice number maps to BLOCK. A bank change in the last 30 days with an amount over 10,000 maps to REVIEW. An empty purchase order under 5,000 maps to PROCESS. Source: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`.

The invoice file uses two status words of its own. INV-1001 and INV-1002 are PAID. INV-1003 and INV-1004 are APPROVED. Source: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`.

On the cases you can replay, the decision text is PROCESS. The log stores PROCESS for INV-1003 and INV-1004. The decision file stores PROCESS for INV-1002, INV-1003, and INV-1004. The audit line for INV-1003 stores action PROCESS. None of those rows stores BLOCK or REVIEW. Sources: `05_workflow_orchestration/processing_log.txt`, `07_explainability_review/sample_decisions.txt`, `08_compliance_audit/audit_extract.log`.

CH-88 stores result SUCCESS. That word is on the bank-change line. It is a change result, and it is a separate word from the invoice status.

## 2026-09-22 17:12

**Model:** Cursor Grok 4.7

### User

Explain in layman terms - "Flaw 3. The missing payment record, the missing retry key, and the unknown scorer path. Control P2P-05 is immutable payment decision evidence. In Repo 1.0 the status is Missing and the owner is TBD. Immutable means the record cannot be overwritten or deleted for the keep period. The inherited files also store no payment retry key. The test list says a model outage is not tested, so the scorer-down path is Unknown. In the D4 app, payment uses a key made from the invoice id plus the word payment. On INV-1005 the count was 0. The first click set it to 1 and status PAID & SETTLED, and stored audit id AUDIT-INV-1005-PAY. The write-once reference count went from 1 row to 2 rows. The second click kept the count at 1 under key INV-1005:payment.

When the scorer was switched down, INV-1005 showed rank NULL, banner UNSCORED, and outcome REVIEW. The notes record no score of 0. Two limits stay. The P2P-05 owner is still TBD. A second write of the same audit id was not attempted, so a measured refusal is Unknown. The demo list lives in the browser. It is a classroom copy of a write-once store.
"

### Assistant

This paragraph is about three holes in the old files, and what the new app did about each one.

**The old files**

The company should keep a record of every payment decision, and that record should stay as it was written. Nobody should be able to change it or delete it during the time the company must keep it. That control is named P2P-05. In the inherited folder its status is Missing. The owner cell says TBD, which means no person is named to look after it.

The old files also have no stored name that stops a second click from paying the same invoice again. Click Pay twice, and nothing in those files proves the money went out only once.

The scorer is the model that ranks an invoice. The old test list never tried “the model is down.” So the old files do not say what should happen. That path is Unknown.

**What the new app did**

Payment now carries a stored name. The name is the invoice id plus the word payment. For invoice INV-1005 the name is `INV-1005:payment`.

On that invoice the payment count started at 0. The first Pay click paid it. The count became 1. The status became PAID & SETTLED. The app also wrote a decision record with the id `AUDIT-INV-1005-PAY`. A short reference list on screen grew from 1 row to 2 rows. That list is meant to point at the decision record.

The second Pay click used the same name, `INV-1005:payment`. The count stayed 1. The app returned the first payment. It did not create a second one.

Then the model was switched off on that same invoice. The rank box showed the word NULL, which means the rank is empty. A banner said UNSCORED. The outcome became REVIEW, so a person has to decide. The screen did not fill in a score of 0. A 0 would look like a real rank. An empty rank means the model did not answer.

**What is still unfinished**

No person is named yet as the owner of P2P-05. That cell is still TBD.

The team did not try to save the same decision-record id a second time. So there is no measured proof, from that session, that the store refuses the second save. That result is Unknown.

The reference list in the demo sits in the browser on that computer. It is a classroom copy of a store that keeps a record unchanged. It is a practice list for the demo. It is not the company’s long-term archive.

## 2026-09-22 17:17

**Model:** Cursor Grok 4.7

### User

explain in layman terms - "Flaw 4. The model evidence. False-positive rate is the share of good invoices the model flags. p2p-risk-2 flags 0.24. p2p-risk-1 flags 0.18. Precision and recall on p2p-risk-2 are blank. p2p-risk-1 stores precision 0.52 and recall 0.71. The D4 metrics page showed those cells. It showed a classroom catch rate of 4 of 4 packet patterns. It did not show an accuracy 0.94 figure. The rank on a case is an order in the demo set. A named person releases payment. The rank does not set the invoice to paid. What this slide does not claim: the app did not fill the blank precision and recall, and it did not measure a new false-positive rate. PR-AUC is still Missing. PR-AUC is a ranking score that pays extra attention to the rare bad class.
Source files: D1_AsIs_Assessment/02_CASE_REPLAY.md. D1_AsIs_Assessment/04_MISSING_CONTROLS.md. D4_App/TEST_EVIDENCE.md. D4_App/DEMO_SCRIPT.md. D4_App/SIDE_EFFECT_COUNTER.md."

### Assistant

This paragraph is about how good the risk model is, and what the demo is willing to say about it.

**Two versions of the same model**

`p2p-risk-1` is the older version. `p2p-risk-2` is the later version. Both try to point at invoices that look risky.

**What the numbers mean**

False-positive rate is the share of good invoices the model still flags. Picture 100 good invoices. Version 1 flags 18 of them. Version 2 flags 24 of them. Version 2 stops more good invoices than version 1.

Precision is the share of flagged invoices that were later confirmed bad. On version 1 that number is 0.52. Picture 100 invoices the model flagged. About 52 were actually bad. On version 2 that cell is blank. Nobody filled it in.

Recall is the share of bad invoices the model caught. On version 1 that number is 0.71. Picture 100 bad invoices. The model flagged about 71. On version 2 that cell is also blank.

**What the demo page showed**

The metrics page in the app showed those same cells: 0.52, 0.71, 0.18, and 0.24, and the two blanks on version 2. It also showed a classroom catch rate of 4 out of 4. That means the four patterns in this packet were all caught in the walk-through: the duplicate, the alias, the same-user bank change, and the split pair. Four homework cases are a classroom check. They are a small walk-through. They are a small set.

The inherited file also stores an accuracy of 0.94 on version 2. The demo page left that number off the screen. The page leads with the false-positive rate, because version 2 flags more good invoices than version 1.

**What the rank is allowed to do**

The rank is a place in line. On INV-1003 the place was 2nd in a demo set of 420. A named person presses Pay. The rank only orders the queue.

**What this slide is leaving unsaid on purpose**

The app copied the blank precision and recall. It did not invent numbers to fill them. It also did not run a new test to replace 0.24 and 0.18.

PR-AUC is still Missing. That is a score for ranking when bad invoices are rare. It looks harder at whether the flagged invoices were truly bad, and whether the bad ones were caught. The evaluation file never stored that score.

## 2026-09-22 17:31

**Model:** Cursor Grok 4.7

### User

explain - "What the rank is allowed to do

The rank is a place in line. On INV-1003 the place was 2nd in a demo set of 420. A named person presses Pay. The rank only orders the queue."

### Assistant

The rank is a place in a line. The model sorts invoices from the one that looks most risky to the one that looks least risky. A higher place means “look at this one sooner.”

On INV-1003 the screen said **#2 of 420**. In that demo line, 420 invoices were lined up, and INV-1003 stood second. One invoice sat ahead of it. The 420 is the size of the practice list on the screen. It is a classroom set for the demo. It is a practice list.

Paying is a separate step. A named person presses Pay. That click is what marks the invoice paid. On INV-1003 the rank put the invoice near the front of the line. The outcome was still REVIEW, so a person had to decide. Ada clicked. The rank itself left the money where it was.

So the rank’s job is to order the queue. The person’s job is to release the payment.




