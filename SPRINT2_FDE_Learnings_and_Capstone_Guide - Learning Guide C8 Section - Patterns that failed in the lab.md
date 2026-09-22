# Sprint 2 Learnings Guide — For a Trainer-Issued Capstone


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
