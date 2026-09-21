# Sprint 2 Learnings Guide — For a Trainer-Issued Capstone

## Part C — What to do when the trainer hands you the assignment

The trainer will give you a packet. That packet is the Capstone. Your job is to solve that brief with Sprint 2 methods. Your job is not to invent a new product from this file.

### C.1 First hour — read the packet before you open Cursor

Write these answers on paper. Use the trainer’s words.

| # | Write this down | Why |
|---|---|---|
| 1 | What event arrives? | Lab 26 Exercise 1. If you cannot name the event, you cannot name the score. |
| 2 | Which people or objects does it touch? | Identity, account, claim, booking, driver. Wrong joins poison later alerts (Lab 28 CH-01). |
| 3 | What action cannot be undone? | Email, payment, suspend, voucher, decline, file a report. That action sits last and needs a key (Lab 29). |
| 4 | What did they give you? | Repo, specs, messy estate, Colab notebook, empty brief, data files. This picks the work method in C.3. |
| 5 | What must you hand back? | Code, assessment, workflow JSON, model card, defence, slides. Build only that list. |
| 6 | Who is harmed if the score is wrong? | A customer, a claimant, a driver, a passenger. That picks Lab 31 if a person’s status or money changes. |
| 7 | Which facts exist at decision time? | Later labels and post-settlement fields stay out of the score (Labs 23 and 26). |
| 8 | What still works if Azure or the scorer is down? | Mode C / sidecar / fail to a person (Labs 23, 27, 29). |

If a row is missing from the packet, write Unknown. Ask the trainer or record the assumption in a change-request style note. Do not guess a business cutoff.

### C.2 Match the packet to a lab

Use the first row that fits. Then open that lab in Part B. A packet can match two rows. Start with the first match. Add the second only if the deliverable list needs it.

| If the packet looks like this | Open this lab | First move |
|---|---|---|
| A score, a cutoff, drift, or a workbench the room must operate | **23** | Name the event. Split by time. Pick the model with PR-AUC. Let a person agree the dollar costs. Label REAL / PRECOMPUTED / SIMULATED. |
| “Specify it, generate it, find what is wrong” | **26** | Write the brief and acceptance checks. Review the output before you read the failure list. Check fraud rate, overlap, and route names. |
| An inherited repo. Tests already pass. | **27** then **28** | Inspect first. Replay the cases. List what exists, what works, what is missing, which tests lock current behaviour. |
| Written specs, challenge cards, `/v1` plus a later `/v2` | **28** | Specs lead. Failing test. Smallest edit. ADR. Evidence. Traceability row. |
| Logic Apps, retries, customer email, payment release, human wait | **29** | Build the side-effect counter first. Reproduce the extra email. Then fix order, key, and cache as three separate jobs. |
| “Show me this case in two years” or WORM or Change Feed | **30** | The application writes the audit row before the state change. Change Feed only copies. |
| A score or agent can suspend, deny, or stop someone’s work | **31** | Draw analyse / recommend / decide / execute. Block execute tools. Design a review screen that makes Disagree easy. |
| A messy GenAI estate, RAG, an agent with tools, “approve the demo” | **32** | Treat the files as evidence. Do not tidy first. Verdict per use case. Wave 1 turns harmful actions off. |
| Accuracy, AUC, or “90%” is the headline | **23** and **26** | Report PR-AUC, staffing, and residual miss. Keep the rare-event rate. |
| Draft or old policy in search | **32** | Approval on the index. Filter at ingest and at query. Refuse when no approved source exists. |

Worked example: The trainer gives a claims repo, a Logic App stub, and a note that a customer letter went out twice. That is Lab 29 first (count emails), then Lab 30 (write the audit row before notify), then Lab 31 if the route is named reject.

### C.3 Pick the work method

| What they gave you | Method | Order |
|---|---|---|
| A prompt and a blank notebook | Generate and govern (Lab 26, 29) | Brief → prompt → your review → then the known-failure list |
| An inherited repo | Forensic pass, then SDD (Labs 27, 28) | Read specs and code. Do not edit. List gaps. Pick one challenge. Failing test. Smallest edit. Evidence. |
| A messy estate of files | Assessment first (Lab 32) | If a control is missing from the files, treat it as missing. Record conflicts. Then Wave 1. |
| A working model and a UI brief | Spec, then build, then compare (Lab 23A–D) | Write the PRD and the prompt with numbers inlined. After the build, compare detector, cutoff, and Overview cards. |

### C.4 Work order after you have a match

Stay inside the trainer’s brief. Add a Sprint 2 control only when that brief needs it.

1. **Restate the brief** in one page: purpose, inputs, outputs, word list, how you will know you are done (Lab 23 / 28 Project Intent style).
2. **Classify use cases** if more than one capability sits under one product name (Lab 32).
3. **Fill event, entity, variable, availability, proxy** if you will score or detect (Lab 26).
4. **Draw analyse / recommend / decide / execute** if a person can be harmed (Lab 31).
5. **Name routes as queues** unless the trainer explicitly asked for a legal decision and named the legal basis.
6. **Count irreversible effects** before you add retry (Lab 29).
7. **Write the audit row in the application** before the case moves (Lab 30).
8. **Change one requirement at a time** if you inherited code (Lab 28).
9. **Label honesty** on every number a demo will show (Lab 23).
10. **Prepare the defence** in C.7 while you work, not the night before.

### C.5 Ready to implement

Tick these only where the packet needs them. Skip a row that the brief never asked for.

- [ ] The trainer’s deliverable list is copied into your notes.
- [ ] Event, entities, and the irreversible action are named.
- [ ] Availability and proxy notes exist if you will score.
- [ ] Use-case split exists if more than one capability is in the packet.
- [ ] Route names send a case to a queue, or you recorded why the trainer required a decision verb.
- [ ] A named owner exists for any cutoff you chose. You wrote an ADR.
- [ ] You know what still runs if Azure or the scorer is down.
- [ ] The prompt or spec contains required numbers and forbidden verbs.

### C.6 Done enough to hand back

Tick these only where the packet needs them.

- [ ] Each item on the trainer’s deliverable list exists.
- [ ] Targeted tests pass. Legacy behaviour is unchanged, or a change request explains the change.
- [ ] A readiness or golden check can fail for the reason that matters. You reviewed the diff. You did not regenerate a baseline only to go green.
- [ ] Irreversible actions sit outside retry, use a fixed key, and appear on a counter if the brief has a workflow.
- [ ] A scoring or tool failure sends the case to a person and marks it unscored.
- [ ] The audit row is written before the state change if the brief asks for history.
- [ ] Draft and working notes stay out of live retrieval if the brief has RAG.
- [ ] High-risk agent tools need a gate outside the model if the brief has an agent.
- [ ] Docs match the code you shipped.
- [ ] You can answer the C.7 questions that apply to this packet.

### C.7 Defence — answer only what this packet used

Skip a question that the brief never touched. Prepare the ones it did.

1. What event did you score, and which facts existed at decision time?
2. What is the rare-event rate, and why did you keep that rate?
3. What is PR-AUC (or the matching metric), and what does ROC-AUC leave out on this mix?
4. If a target metric was missed, what number did you take back?
5. How many reviews per day does the operating point create, and who agreed to staff them?
6. What share of harm still gets through? Say the number.
7. What are the route names? Who makes the legal or money decision?
8. What would a retry duplicate, and how did you prove the count?
9. Which inherited gap did you leave visible until a spec closed it?
10. Rebuild one case: actor, from-state, to-state, score, reasons, model, policy, and prompt versions.
11. Which facts does the audit trail leave out?
12. How does a person contest the outcome?
13. What did the generated output get wrong that you caught?
14. If a control is missing from the repo, did you treat it as missing?

### C.8 Patterns that failed in the labs — check your draft against this list

| If your draft does this | Labs that already failed that way | Change it to |
|---|---|---|
| Accuracy or “90%” as the headline | 23, 26, 32 | PR-AUC, cost, staffing, residual miss |
| Easy made-up fraud, ROC-AUC above 0.95 | 26 | Overlap the classes. Keep an unlearnable share. State the catch rate the features support. |
| Tune the test set to hit a syllabus target | 26 | Report the measured number. |
| `fraud_score` shown as a percent chance | 23 | Caption it as an uncalibrated ranking. |
| Retrain from PSI alone | 23, 32 | Investigate first. Wait for delayed labels or groundedness. |
| Passing tests treated as the business problem solved | 27 | Some tests lock the known gap. |
| Rewrite the inherited system on day one | 27, 28 | Inspect first. Then close one requirement. |
| AI invents a cutoff | 28 | Write an ADR and cite the spec or the trainer. |
| Green tests with no exact golden | 28 ADR-016 | Compare the full payload both ways. |
| Retry the whole workflow | 29 | Retry reversible steps. Key irreversible steps. |
| `except: pass` and default `score = 0` | 26, 29 | Send to a person. Store `None`. |
| Keep the run open for a human | 29 | Persist and resume. |
| Change Feed as the first recorder | 30 | The app writes the row first. The lesson saw 67 feed rows from 200 changes. |
| Personal data locked in WORM | 30, 31 | Store references in WORM. Keep deletable identity in a normal store. |
| Human review as an Accept button | 31 | Equal-weight actions. Watch agreement rate and time. |
| Policy only in the prompt | 32 | Enforce in the API and gateway. |
| Index every file in a folder | 32 | Gate ingest. Put status on each chunk. Refuse when no approved source exists. |
| One risk tier for money and advice | 32 | Verdict per use case. Wave 1 turns harmful actions off first. |
| Infra dashboards as AI monitoring | 32 | Watch groundedness, bypass, and stale sources. |
| Thin builder prompt that omits numbers | 23B | Put numbers in the prompt. The prompt wins on conflict. |
| Second model flattened to one line | 23C | Keep a real second scorer or label the stand-in. Compare builds. |
| Eval that only checks a subset of expected alerts | 28 CH-15 | Compare exactly both ways. |

### C.9 How to use AI on the assignment

Sprint 2 calls this Generate and Govern. The trainer’s brief is the spec. This file is the memory of how you work.

- Copy the trainer’s acceptance checks into the prompt.
- Put required numbers, route names, honesty classes, and forbidden verbs in the prompt.
- Review the output before you read a failure list from this guide.
- On inherited code: failing test, smallest edit, evidence.
- Keep rules that say: specs first, no invented policy, no silent break of a locked API.
- When Azure, OCR, or a vendor API is down, keep the core running (Lab 23 Mode C; Lab 27 and 28 sidecars).

### C.10 What to put in the hand-back pack

Ship what the trainer asked for. Use this list as a reminder of Sprint 2 evidence types. Drop a row the brief never requested.

| If the brief asked for… | Evidence that usually satisfies a Sprint 2 trainer |
|---|---|
| Understanding of the system | One-page restatement: purpose, inputs, outputs, word list, done test |
| A score or model | Model card with purpose, not-for, class mix, test-positive count, both AUCs, who agreed the cutoff, selection bias |
| A change to inherited code | Failing test, small diff, ADR, evidence file, traceability row, full suite still green |
| A workflow | Side-effect table (naive vs safe vs cached), eleven named paths if time allows, JSON assertions |
| An audit design | One rebuilt case, list of facts the trail leaves out, refused delete/overwrite if you claim WORM |
| A person-affecting decision | Decision boundary, permission table, review screen, contest path |
| A GenAI / agent estate | Inventory, per-use-case verdict, RAG source status, agent grants, Risk-Control-Test-Evidence rows |
| A demo UI | Honesty badges on every number |
| A verbal defence | Written answers to the C.7 questions that apply |

---

## Part D — Word list

After each product word, the next sentence says what it does here.

| Term | Meaning in this sprint |
|---|---|
| **FDE / AI FDE** | An engineer who works at the customer, uses AI under written rules, and leaves a system people can run and explain. |
| **PIT / point-in-time** | A feature for time *t* uses only earlier events. |
| **Leakage** | A later or current fact sits inside a feature or score that claims to use only earlier or already-known facts. |
| **PR-AUC** | A ranking score that pays attention to the rare class. Training uses it to pick the winner. |
| **PSI** | Population Stability Index. One number per column that compares an earlier slice to a later slice. A large PSI is a reason to look. |
| **Concept drift** | The link from features to labels changes. Lab 23 injects this after day 125. PSI on columns can stay low. |
| **Delayed labels** | Investigator, chargeback, or settlement marks that arrive after the decision. |
| **ALLOW / STEP_UP / REVIEW / DECLINE** | Lab 23 payment actions. DECLINE blocks a payment. Other labs use queue names when the legal effect is larger. |
| **straight_through / standard_review / priority_review** | Lab 26 and 29 queue names. A person still decides the legal outcome. |
| **Brownfield** | An inherited running system with gaps. You improve it in pieces. |
| **Sidecar OCR** | A text file stored next to a document image. The service reads this file instead of running a live OCR engine. |
| **SDD** | Specs-Driven Development. Specs lead. Then a failing test, a small edit, evidence, and a traceability row. |
| **ADR** | Architecture Decision Record. What you chose, why, and what follows. It cites a requirement ID. |
| **Policy digest** | A hash of the constants the code actually uses. A hand-typed version label can go stale. |
| **Idempotency key** | A key built from case id and step name. A retry with the same key does not send a second email or write a second logical audit row. |
| **Recorder, delivery, evidence store** | The app writes the audit fact. Change Feed and functions copy it. WORM stores it for years. |
| **WORM** | Write once, read many. After lock, delete and overwrite are refused for the retention period. Agree fields first. |
| **Article 22** | GDPR rule on a solely automated significant decision. You produce a boundary map, a permission contract, a contest path, and a sensitive-data lineage map. |
| **Meaningful human review** | The reviewer sees evidence, has time, can disagree, can override, and is named. SENTINEL’s 11-second Accept fails this. |
| **Selection bias** | A fraud or risk model only learns cases someone already found. |
| **Honesty class** | REAL, PRECOMPUTED, SIMULATED, or EDUCATIONAL. |
| **Fail to a person** | Missing evidence, a down scorer, or no approved retrieval source sends the case to a person and marks it unscored. |
