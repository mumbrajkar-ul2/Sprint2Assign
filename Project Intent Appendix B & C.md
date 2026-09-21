# Project Intent — Procure-to-Pay Exception and Payment-Control

---

## 1. Purpose of this document

This file says what this assignment is. It names the decision you must support. It names the files you start with. It names the four things you must hand back. It names the order of work.

After you finish this file, open [Execution Plan.md](Execution Plan.md). That file is the step list for a Forward Deployed Engineer. A Forward Deployed Engineer works at the customer site, uses AI under written rules, and leaves a system people can run and explain.

If a sentence here would still make you ask “of what?”, “why?”, or “what do I do with this?”, that sentence failed.

---

## 2. What this assignment is

### 2.1 The system, in one sentence

This assignment is about a shared-services payment-control system. Finance must decide whether a supplier invoice can safely go to payment.

### 2.2 The case the trainer assigned

The runbook lists five industry cases. This packet is case 5.

- **Domain:** Enterprise ERP / Shared Services. ERP means the company’s finance and purchasing system of record.
- **Name:** Procure-to-Pay Exception and Payment-Control Challenge. Procure-to-Pay is the path from buying goods to paying the supplier.
- **Central challenge (trainer words):** Determine whether a supplier transaction can safely proceed to payment.
- **What you must detect:** duplicate invoices, anomalous pricing, supplier-master manipulation, approval bypass, and suspicious transaction patterns.
- **What you must keep:** segregation of duties, evidence, and human escalation. Segregation of duties means the person who asks for a change is not the only person who approves it.

### 2.3 What you must leave with

The runbook names four team deliverables and a presentation. (See Appendix A for the four names in trainer order.)

1. An As-Is reading of Repo 1.0. Repo 1.0 is the inherited folder of evidence. You understand the current files, the gaps, the conflicts, the risks, and the technical debt.
2. A Repo 2.0. Repo 2.0 is the improved design. You produce it with prompt engineering and context engineering. Prompt engineering is the written brief you give a language model. Context engineering is the set of files and facts you attach so the model works from evidence.
3. A Product Requirements Document (PRD). A PRD is the written list of what the product must do.
4. A working application and an end-to-end demo. The demo shows workflow, AI, decision logic, controls, and explainability.
5. A team presentation of those four items.

### 2.4 What skill is assessed

The assessed skill is this chain. You read a messy inherited estate without treating the files as the finished design. You name the payment decision, the people and objects it touches, and the action that cannot be undone. You turn that reading into a governed Repo 2.0 that covers the ten AI FDE spine steps. You write a PRD from Repo 2.0. You build a working application from the PRD. You can defend one rebuilt case.

### 2.5 Teaching method

Repo 1.0 is an As-Is baseline. The README says treat every artifact as evidence, not truth. An artifact is a file in the packet. Evidence means the file shows what the current environment does or claims. Truth means a finished, consistent policy. This packet can hold both sides of a conflict.

The runbook says these repositories are intentionally problematic. They do not contain the Repo 2.0 solution. That solution is the FDE’s job.

The work path the runbook names is:

Repo 1.0 → Prompt Engineering + Context Engineering → Repo 2.0 → PRD → Working AI FDE Application.

### 2.6 Why the main tools and files exist

Each heading names one thing used in this assignment. The next sentences say what it is, what job it does, why you need it, and what you do with it.

#### Sprint 2 runbook (`Sprint_2 -  Steps_&_Approach - Runbook`)

This file is a five-page PDF with no `.pdf` extension. It is the assignment contract. It names the ten spine steps, the five use cases, and the four deliverables. You need it so you build what the trainer asked for. You read it with a PDF reader. You keep it. You do not replace it with the learnings guide.

#### Sprint 2 learnings guide (`SPRINT2_FDE_Learnings_and_Capstone_Guide.md`)

This file stores how Sprint 2 labs taught you to work. It does not invent a new product. You need it to pick the work method, avoid known lab failures, and prepare a defence. You review it before each deliverable. You apply a row only when this payment packet needs it.

#### Repo 1.0 (`05_procure_to_pay_exception_repo_1_0`)

This folder is the inherited As-Is packet. It holds notes, tables, rules, and logs arranged in the ten spine folders. You need it as the evidence for Deliverable 1 and as the input to the Repo 2.0 prompt. You read it. You replay the four invoices. You do not edit it to make it look finished.

#### Cursor

Cursor is an AI-powered code editor. It reads the project files and can write or edit files when you give a prompt. You need it to inspect Repo 1.0, draft Repo 2.0, draft the PRD, and keep a chat transcript. You review every output before you accept it.

#### A language model of your choice

A language model is the program that writes text from a prompt. The runbook allows any model for the Repo 1.0 to Repo 2.0 step. You need it to draft Repo 2.0 from a written brief and a context pack. You paste the brief. You attach cited files. You review the draft before you read the known-failure list in the learnings guide.

#### Google AI Studio Build, or another build tool

Google AI Studio Build is one platform that can generate a working application from a PRD. The runbook also allows any other tool or platform. You need it for Deliverable 4. You specify the PRD. You run the build. You review the demo against the PRD.

#### Execution Plan (`Execution Plan.md`)

This file is the ordered work method for the four deliverables. You need it after you finish this Project Intent. You follow it. You do not skip Deliverable 1.

---

## 3. What is expected

### 3.1 Decisions you must write down first (C.1)

Use the trainer’s words. If a row is missing from the packet, write Unknown. Do not guess a business cutoff.

| # | Question | Answer from this packet |
|---|---|---|
| 1 | What event arrives? | A supplier invoice that may lead to payment. The README names the central challenge as whether a supplier transaction can safely proceed to payment. |
| 2 | Which people or objects does it touch? | Supplier, purchase order (PO), goods receipt, invoice, supplier-master bank account, requester, approver. A PO is the official buy order. A goods receipt is the record that goods arrived. |
| 3 | What action cannot be undone? | Payment. INV-1001 and INV-1002 already have status `PAID`. |
| 4 | What did they give you? | An inherited messy estate of files (Repo 1.0). There is no running application and no written PRD in the packet. |
| 5 | What must you hand back? | As-Is understanding of Repo 1.0, Repo 2.0, a PRD, a working application with an end-to-end demo, and a team presentation. |
| 6 | Who is harmed if the score or route is wrong? | The company, if a duplicate or a diverted bank account is paid. A legitimate supplier, if a false block misses the payment SLA. An SLA is a promised time to pay. |
| 7 | Which facts exist at decision time? | Invoice id, supplier id, PO presence, amount, currency, approver, the `bank_changed_30d` flag, and the current rule and model versions that the files name. A later confirmed-fraud label is not in these rows. |
| 8 | What still works if Azure or the scorer is down? | Unknown in Repo 1.0. `test_summary.md` says model outage is not tested. The learnings guide says send the case to a person and mark it unscored. That path is not evidenced in the current files. |

Worked example for row 3: INV-1001 is $9,800 and status `PAID`. A second payment of the same amount to the same supplier on the same PO cannot be pulled back by changing a rule later.

### 3.2 Deliverables

| Deliverable | What it is | What proves it is done |
|---|---|---|
| D1. Repo 1.0 as As-Is baseline | A written reading of the inherited folder. | You can point to each spine folder and say what exists, what conflicts, and what is missing. You have replayed INV-1001 to INV-1004 and CH-88 / CH-89. |
| D2. Repo 2.0 | The improved design produced with a written prompt and a cited context pack. | Each of the ten spine steps has a coherent design. The runbook P2P detection list is covered. You reviewed the draft before using the learnings-guide failure list. |
| D3. PRD | A complete Product Requirements Document written from Repo 2.0. | It covers the runbook PRD list: business problem, users, functions, AI capabilities, workflows, data, integrations, risk and compliance, non-functional requirements, acceptance criteria, and success metrics. |
| D4. Working application and demo | A running system built from the PRD. | The demo walks Ingest → Extract → Verify → Detect → Score → Decide → Review → Notify. A person can complete a REVIEW. One case can be rebuilt from the audit row. |
| Presentation | A team walkthrough of D1 to D4. | You can answer the defence questions in section 3.3 that this packet uses. |

### 3.3 Defence

Defence means you answer with evidence, not opinion. Use the learnings-guide C.7 list only where this packet uses the topic.

1. What event did you score or route, and which facts existed at decision time?
2. What metric did you report instead of accuracy 94%, and why?
3. What are the outcome names? The runbook names APPROVE, REVIEW, and REJECT. Who makes the money decision?
4. What would a retry duplicate, and how did you prove the count?
5. Which inherited gap did you leave visible until a spec closed it?
6. Rebuild one case: actor, from-state, to-state, score, reasons, model version, rule version.
7. Which facts does the current audit trail leave out?
8. How does a person contest the outcome?
9. If a control is missing from Repo 1.0, did you treat it as missing?

---

## 4. Inputs

### 4.1 Assignment files outside Repo 1.0

| File | What it is | What job it does | Why you need it | What you do with it |
|---|---|---|---|---|
| `Sprint_2 -  Steps_&_Approach - Runbook` | Five-page PDF assignment contract. | Names spine steps, use cases, and the four deliverables. | It is the source of the hand-back list. | Read. Keep. Present from it. |
| `SPRINT2_FDE_Learnings_and_Capstone_Guide.md` | Written memory of Sprint 2 lab methods. | Tells you how to inspect, generate, spec, and defend. | It stops you from inventing a cutoff or rewriting Repo 1.0 on day one. | Review. Apply only the rows this packet needs. |
| `Execution Plan.md` | Ordered work method for D1 to D4. | Turns this Project Intent into steps. | You need a sequence after you restate the brief. | Follow. |
| `.cursor/rules/plain-speak-speaker-notes.mdc` | Writing rule for this project. | Requires short sentences and everyday words in new docs. | The reader must know what to picture after one pass. | Keep. Use when you write. |
| `.cursor/rules/chat-transcript.mdc` | Logging rule for this project. | Appends each chat turn to `transcript/chat_transcript.md`. | The assignment work stays replayable. | Keep. Do not create a new transcript file per chat. |

### 4.2 Repo 1.0 files

Every path below sits under `05_procure_to_pay_exception_repo_1_0`. You read these files. You do not treat them as the finished policy.

| File | What it is | What job it does | Why you need it | What you do with it |
|---|---|---|---|---|
| `README.md` | Cover note for Repo 1.0. | States the packet is imperfect, names the ten-step spine, and names the P2P case. | It tells you the later path: Repo 1.0 to Repo 2.0 to PRD to application. | Read first. Keep. |
| `00_CASE_BRIEF.md` | Short case card. | Says investigate first. Do not redesign yet. | It sets the first-hour rule. | Read. Keep. |
| `FOLDER_GUIDE.md` | List of the ten numbered folders. | Maps folders to the spine. | You use it to walk the packet in order. | Read. Keep. |
| `KNOWN_BROWNFIELD_SIGNALS.md` | Non-exhaustive list of things to look for. | Names contradiction, weak lineage, unsafe fallback, and similar signals. | It is a search list, not a complete defect list. | Review. Look for items it does not name. |
| `manifest.json` | File list with short hashes. | Records which files belong to Repo 1.0 version 1.0. | You can see whether a file was in the original packet. | Keep. Do not treat a hash as a content review. |
| `01_decision_risk_boundary/business_problem.md` | Finance problem note. | Names duplicate payments, suspicious bank changes, invoice splitting, approval bypass, SLA pressure, and partial segregation of duties. | It is the business problem you must restate in the PRD. | Read. Quote in D1. |
| `01_decision_risk_boundary/risk_notes.md` | Risk list. | Names duplicate or manipulated invoice, compromised supplier master, split invoice, requester and approver conflict, false block, and AI used as payment authorization. | It names who can be harmed. | Read. Use in C.1 row 6. |
| `02_data_evidence/invoices.csv` | Four invoice rows. | Shows INV-1001 to INV-1004 with supplier, PO, amount, approver, bank-change flag, and status. | These are the cases you replay. | Review. Replay. Keep. |
| `02_data_evidence/supplier_aliases.csv` | Three supplier-name rows. | Shows V-201, V201, and V-311. | Alias mismatch can hide a duplicate. | Review. Keep. |
| `02_data_evidence/vendor_master_changes.csv` | Two bank or email change rows. | Shows CH-88 and CH-89. | CH-88 is a same-user bank change before INV-1003 and INV-1004. | Review. Replay with the invoices. |
| `03_detection_models/anomaly_model.md` | Model card for `p2p-risk-2`. | Lists features and reports accuracy 94% with no precision, recall, or independent validation. | Spine step 3 requires a real evaluation. | Read. Do not copy 94% as the headline. |
| `03_detection_models/evaluation.csv` | Two model-version rows. | Shows `p2p-risk-1` and `p2p-risk-2` metrics. | v2 accuracy is 0.94. v2 precision and recall are blank. v2 false-positive rate is 0.24. v1 false-positive rate is 0.18. | Review. Keep both versions visible. |
| `04_document_identity_compliance/invoice_extraction.md` | OCR note. OCR means software that reads text from a document image. | Lists invoice fields and known extract errors. | Spine step 4 needs document fields and confidence. | Read. Keep. |
| `04_document_identity_compliance/vendor_verification.md` | Vendor-change verification note. | Says bank-change requests arrive as emailed PDFs and out-of-band checks are inconsistent. | It is evidence for identity and compliance gaps. | Read. Keep. |
| `05_workflow_orchestration/current_flow.md` | Current path note. | Names Supplier Setup → PO → Goods Receipt → Invoice → Approval → Payment, plus exception behaviour. | Spine step 5 needs the real path, including the gaps. | Read. Keep. |
| `05_workflow_orchestration/processing_log.txt` | Three log lines. | Shows INV-1003 and INV-1004 processed as `NON_PO_UNDER_5000`, and INV-1002 marked `NO_DUPLICATE` by invoice number only. | This is runtime evidence, not a policy paper. | Replay against the CSV. |
| `06_governed_decisioning/exception_rules.yaml` | Rule file with a gaps list. | Maps three conditions to BLOCK, REVIEW, or PROCESS. | It is the current decisioning, including missing split, conflict, alias, and precedence rules. | Read. Do not adopt as the Repo 2.0 policy. |
| `06_governed_decisioning/approval_matrix.csv` | Three amount limits and roles. | Names AP_SUPERVISOR at 5000, FINANCE_MANAGER at 10000, FINANCE_DIRECTOR at 50000. | It can conflict with the under-5000 PROCESS rule. | Read. Record both sides in D1. |
| `07_explainability_review/sample_decisions.txt` | Three decision lines. | Shows PROCESS reasons with no linked evidence, model contribution, rule version, or reviewer text. | Spine step 7 requires reasons a person can review. | Read. Keep. |
| `07_explainability_review/escalation_notes.md` | Review-queue note. | Says the queue is an email inbox with no disposition, reason codes, or model feedback loop. | It is the current human-review path. | Read. Keep. |
| `08_compliance_audit/control_matrix.csv` | Five control rows. | Names owner and status for duplicate check, bank-change approval, segregation of duties, non-PO review, and immutable evidence. | P2P-05 immutable evidence is Missing. Owner is TBD. | Read. Treat Missing as missing. |
| `08_compliance_audit/audit_extract.log` | Two log lines and a note. | Shows CH-88 success and INV-1003 PROCESS. Says vendor-change evidence is not linked to the payment decision. | Spine step 8 needs a linked audit row. | Read. Keep. |
| `09_ai_risk_security_observability/metrics.md` | Metric list. | Tracks processing time, touchless rate, and overdue invoices. Names missing risk metrics. | Spine step 9 needs the missing list as well as the tracked list. | Read. Keep. |
| `09_ai_risk_security_observability/access_review.md` | Access note. | Says AP can view bank details, some vendor-master users also pay, and the model API key is shared across two environments. | Spine step 9 needs access and key facts. | Read. Keep. |
| `10_production_readiness/deployment.md` | Deploy note. | Says rules sit in a shared file, the model is deployed by hand, and there is no IaC, release pack, or threshold approval gate. IaC means infrastructure written as code. | Spine step 10 needs release and rollback evidence. | Read. Keep. |
| `10_production_readiness/test_summary.md` | Test coverage note. | Lists three tests that exist and eight that do not. | A green note on the three tests leaves alias, split, same-user approval, bank-then-pay, and outage untested. | Read. Use as the D4 test gap list. |

Worked example for `invoices.csv` plus `processing_log.txt`: INV-1002 has the same supplier, PO, and amount as INV-1001. Both are `PAID`. The log says `duplicate_check=NO_DUPLICATE` because the method is `invoice_number_only`. The invoice numbers differ (INV-1001 vs INV-1002), so the current check misses the pair.

### 4.3 Constants found in Repo 1.0

These numbers appear in the files. They are current-state values. They are not a new policy you chose. A later cutoff needs a named owner and an Architecture Decision Record. An Architecture Decision Record (ADR) is a short note of what you chose, why, and what follows.

| Constant | Value in the files | Where it appears |
|---|---|---|
| Non-PO expedite amount | amount under 5000 | `exception_rules.yaml`, `current_flow.md`, processing log for INV-1003 and INV-1004 |
| Bank-change review amount | `bank_changed_30d` and amount over 10000 | `exception_rules.yaml` |
| Approval matrix amounts | 5000, 10000, 50000 | `approval_matrix.csv` |
| Duplicate check method | invoice number only | `current_flow.md`, `processing_log.txt` |
| Model versions | `p2p-risk-1`, `p2p-risk-2` | `anomaly_model.md`, `evaluation.csv` |
| Reported v2 accuracy | 0.94 | `evaluation.csv`, `anomaly_model.md` |
| v2 false-positive rate | 0.24 | `evaluation.csv` |
| v1 false-positive rate | 0.18 | `evaluation.csv` |
| Invoice amounts in the packet | 9800, 9800, 4950, 4950 | `invoices.csv` |
| CH-88 requester and approver | both `U22` | `vendor_master_changes.csv`, `audit_extract.log` |
| CH-88 time | 2026-08-11T13:44:00 | `vendor_master_changes.csv` |
| INV-1003 / INV-1004 process times | 2026-08-12 11:15 and 11:16 | `processing_log.txt` |

### 4.4 Accounts and tools

| Tool | What it is | Why you need it |
|---|---|---|
| Cursor | AI-powered editor for this workspace. | Inspect files, write D1 to D3 notes, keep the transcript. |
| A language model | Text generator used under a written brief. | Draft Repo 2.0 from cited context. |
| PDF reader | Program that opens the runbook PDF. | The runbook has no `.pdf` extension. Open the file by path. |
| Python (optional) | Language used only if you extract runbook text or later tests. | Not required to read the markdown and CSV evidence. |
| Google AI Studio Build or another build tool | Application builder for Deliverable 4. | Produce the working demo from the PRD. |

No Azure account is required to read Repo 1.0. If a later build uses Azure, label which numbers the app really computed. (See Appendix B.)

---

## 5. Approach

The order of work is [Execution Plan.md](Execution Plan.md). This section only names the four runbook deliverables and what each one produces for the next.

### 5.1 How this packet maps to the learnings guide

**C.3 primary method:** a messy estate of files. Assessment first. If a control is missing from the files, treat it as missing. Record conflicts.

**C.3 also true:** an inherited repo. Do a forensic pass. Do not edit Repo 1.0. Specs-driven development starts later, when a PRD exists.

**C.2 first match:** inherited repo. Inspect first. Replay the cases.

**C.2 rows the deliverable list adds:** Lab 26 for Repo 2.0 generation. Labs 23 and 26 for the 94% accuracy headline. Lab 31 because the runbook names APPROVE / REVIEW / REJECT and payment can harm a supplier or the company. Lab 29 because payment is the action that cannot be undone. Lab 30 because immutable evidence is required and control P2P-05 is Missing. Lab 28 when the PRD and the build start.

### 5.2 Order

| Step | What you produce | What the next step uses |
|---|---|---|
| Restate the brief | This Project Intent. | Execution Plan and D1 use the C.1 answers and the hand-back list. |
| D1 As-Is assessment | Inventory, conflict register, missing-control register, case replays, spine-by-spine notes. | The Repo 2.0 prompt cites this pack. |
| D2 Repo 2.0 | Improved design covering the ten spine steps. | The PRD is written from this design. |
| D3 PRD | Requirements, acceptance criteria, and success metrics. | The application is built only from this PRD. |
| D4 Application and demo | A running workflow with controls and explainability. | The presentation and defence use the demo and one rebuilt case. |
| Presentation | Spoken walkthrough plus C.7 answers this packet uses. | The trainer sees D1 to D4. |

What goes wrong if you skip D1: you generate a tidy Repo 2.0 that never names INV-1002 as a paid duplicate, or you invent a cutoff the packet never gave you.

---

## 6. How you know the work is complete

Tick a row only if the runbook asked for it.

### 6.1 Ready to start D2 (after D1)

- [ ] The four runbook deliverables are copied into your notes.
- [ ] Event, entities, and payment as the irreversible action are named.
- [ ] The C.3 method is recorded: messy estate, assessment first.
- [ ] You recorded why the trainer required APPROVE / REVIEW / REJECT. (See Appendix C.)
- [ ] Unknown is written where Repo 1.0 is silent, including scorer-down behaviour.
- [ ] You have not invented a cutoff.

### 6.2 Done enough to hand back

- [ ] D1 exists. Repo 1.0 files are unchanged.
- [ ] D2 exists. Each spine step has a design. The P2P detection list is covered.
- [ ] D3 exists. The runbook PRD list is covered. Any cutoff you chose has a named owner and an ADR.
- [ ] D4 exists. The demo completes one path to REVIEW or payment. Irreversible steps use a fixed key. The application writes the audit row before the payment state changes.
- [ ] A scoring or extract failure sends the case to a person and marks it unscored.
- [ ] Demo numbers carry an honesty label: REAL, PRECOMPUTED, SIMULATED, or EDUCATIONAL. (See Appendix B.)
- [ ] Docs match what you shipped.
- [ ] You can answer the section 3.3 questions that apply.

---

## 7. Words used in this assignment

| Word | What it means here |
|---|---|
| Repo 1.0 | The inherited As-Is folder `05_procure_to_pay_exception_repo_1_0`. |
| Repo 2.0 | The improved design you produce after D1. It is not already in the packet. |
| PRD | Product Requirements Document. The written list of what the product must do. |
| Prompt engineering | Writing the brief, acceptance checks, required numbers, and forbidden verbs for a language model. |
| Context engineering | Attaching cited Repo 1.0 paths and the D1 assessment so the model works from evidence. |
| APPROVE / REVIEW / REJECT | Outcome names the runbook requires. APPROVE means the case may proceed to payment under policy. REVIEW means a named person must decide. REJECT means the case must not proceed to payment under policy. |
| PROCESS | A result word in Repo 1.0 logs and rules. It is current-state language. It is not one of the three runbook outcome names. |
| Spine | The ten AI FDE steps in the runbook and the ten numbered folders in Repo 1.0. |
| Brownfield | An inherited running environment with gaps. You improve it in pieces. You do not pretend it is empty. |
| Evidence vs truth | A file shows a claim or a behaviour. Two files can disagree. You write both sides. |
| SoD | Segregation of duties. The requester and the approver must be different people for a bank-account change. |
| Non-PO invoice | An invoice with no purchase order. Repo 1.0 expedites these when amount is under 5000. |
| Alias | Two supplier ids that mean the same supplier, such as V-201 and V201. |
| Split invoice | Two or more invoices that stay under a limit one-by-one and exceed it together. INV-1003 and INV-1004 are 4950 each and 9900 together. |
| Idempotency key | A key built from case id and step name. A retry with the same key does not pay twice. |
| Fail to a person | Missing evidence or a down scorer sends the case to REVIEW and stores no fake safe score. |
| Honesty class | REAL, PRECOMPUTED, SIMULATED, or EDUCATIONAL. A label on a number the demo shows. |
| ADR | Architecture Decision Record. What you chose, why, and what follows. It cites a requirement. |
| SDD | Specs-Driven Development. Specs lead. Then a failing test, a small edit, and evidence. |
| WORM | Write once, read many. After lock, delete and overwrite are refused for the retention period. |
| FDE / AI FDE | An engineer at the customer site who uses AI under written rules and leaves a system people can run and explain. |

---

## 8. Glossary of terms, acronyms, and concepts

| Term | Full form | What it means here |
|---|---|---|
| AP | Accounts Payable | The team that processes supplier invoices and payments. |
| API | Application Programming Interface | A URL and data format other programs call. Repo 1.0 says the model scoring API key is shared across two environments. |
| AUC | Area Under the Curve | A ranking score for a detector. The runbook asks for AUC with precision, recall, catch rate, and false positives. |
| ERP | Enterprise Resource Planning | The finance and purchasing system of record. |
| FPR | False-positive rate | The share of good cases the detector flags. `evaluation.csv` shows 0.18 on v1 and 0.24 on v2. |
| HITL | Human in the loop | A named reviewer who can agree or disagree. The runbook forbids an uncontrolled model final decision. |
| OCR | Optical Character Recognition | Reading text from a document image. Repo 1.0 lists OCR field errors. |
| P2P | Procure-to-Pay | The path from buying to paying. |
| PEP | Politically Exposed Person | A compliance check the spine may require in other cases. This P2P packet does not supply a PEP list. Write Unknown if you need one. |
| PO | Purchase Order | The official buy order. INV-1003 and INV-1004 have an empty PO field. |
| PR-AUC | Precision-Recall Area Under the Curve | A ranking score that pays attention to the rare class. Use it when you report model quality. Do not lead with accuracy 94%. |
| SLA | Service level agreement | The promised time to pay a supplier. |

---

## Appendix A — The four runbook deliverables

The trainer text, shortened to one sentence each:

1. Use Repo 1.0 as the As-Is baseline. Understand the current repository, architecture, data, workflows, gaps, inconsistencies, risks, and technical debt.
2. Transform Repo 1.0 into Repo 2.0 with prompt engineering and context engineering. Improve architecture, AI workflow, risk controls, compliance, governance, security, observability, resilience, and production readiness.
3. Convert Repo 2.0 into a complete PRD.
4. Build and demonstrate a functional application from that PRD, with working workflows, AI capabilities, decision logic, controls, explainability, and an end-to-end demo.

The runbook also says each team presents these items.

---

## Appendix B — Honesty classes

A demo can show a number that the live app computed, a number computed earlier and stored, a number made for teaching, or a number that is only a classroom example.

- **REAL:** the running app computed this value from the case in front of you.
- **PRECOMPUTED:** a script computed this value earlier. The screen reads it back.
- **SIMULATED:** the value stands in for a live service you did not call.
- **EDUCATIONAL:** the value exists to teach a point. It is not an operating metric.

The labs did not calibrate `fraud_score` or this packet’s anomaly score into a percent chance. Show it as a ranking.

---

## Appendix C — Why this packet uses APPROVE / REVIEW / REJECT

The learnings guide says to name routes as queues, such as `straight_through` or `standard_review`, when the trainer did not ask for a legal decision verb.

The runbook asks for APPROVE / REVIEW / REJECT in spine steps 1 and 6. That is an explicit trainer request. Keep those three names.

How they are produced still follows the learnings guide. The model ranks the case. Written policy picks the outcome. A named person owns a REVIEW. The model does not make an uncontrolled final payment decision.

---

## Appendix D — Worked replay of the four invoices

Use this replay when a table cell in this file would otherwise need a lecture.

**INV-1001.** Supplier V-201 (Alpha Industrial Supply). PO-7001. Amount 9800 USD. Approver U11. Bank changed in 30 days: N. Status PAID.

**INV-1002.** Same supplier, same PO, same amount, same approver, status PAID. Invoice id differs. The processing log at 12:01 on 2026-08-12 says `duplicate_check=NO_DUPLICATE` and `method=invoice_number_only`.

**CH-88.** Supplier V-311. Field `bank_account` changes from XXXX1122 to XXXX9988. Requested by U22. Approved by U22. Time 2026-08-11T13:44:00. The same user is requester and approver.

**INV-1003 and INV-1004.** Supplier V-311. No PO. Amount 4950 USD each. Approver U22. `bank_changed_30d` is Y. Status APPROVED. The log marks both `NON_PO_UNDER_5000` and PROCESS at 11:15 and 11:16 on 2026-08-12. Each amount is under 5000, so the expedite rule fires. Together they are 9900. The bank-change rule in `exception_rules.yaml` only asks for REVIEW when amount is over 10000. 9900 is under that line. 10000 is also the FINANCE_MANAGER line in the approval matrix.

**CH-89.** Supplier V-201 email change. Requested by U18. Approved by U19. Different people. This row is the contrast case next to CH-88.

**Aliases.** V-201 and V201 both map to Alpha Industrial / Alpha Industries Supply. A check that keys only on `V-201` can miss `V201`.
