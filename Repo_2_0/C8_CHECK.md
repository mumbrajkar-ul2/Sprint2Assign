# C.8 check — Repo 2.0

Checked against the S2b prompt list and `SPRINT2_FDE_Learnings_and_Capstone_Guide - Learning Guide C8 Section - Patterns that failed in the lab.md`.

Sources read: `Repo_2_0/` and `D1_AsIs_Assessment/`. Repo 1.0 was not edited. D1 was not edited. No new amount line was coded.

Result after the sibling-window fix: every row this procure-to-pay packet uses is PASS. NOT APPLICABLE is used only for the Lab 32 search-index ingest row from the full C.8 table.

## Results

| If the draft does this | Result | File citation | What the draft does |
|---|---|---|---|
| Accuracy or “90%” / 94% as the headline | PASS | `03_detection_models.md` version-compare and evaluation plan; `09_ai_risk_security_observability.md` watch table | `evaluation.csv` stores accuracy 0.91 on `p2p-risk-1` and 0.94 on `p2p-risk-2`. Those cells stay as copied source facts (PRECOMPUTED). The operating headline is precision, recall, false-positive rate, catch rate, staffing, residual miss, and later PR-AUC. PR-AUC is the ranking score that pays attention to the rare class. |
| Easy made-up fraud or ROC-AUC above 0.95 | PASS | `03_detection_models.md` evaluation plan | The file forbids inventing a ROC-AUC above 0.95. It keeps class overlap. Some bad cases will look like good cases on the listed features. AUC and PR-AUC are Missing from `evaluation.csv`. |
| Tune a test set to hit a syllabus target | PASS | `03_detection_models.md` evaluation plan | Report measured cells only. The four packet invoices are EDUCATIONAL walk-throughs. They are not the official test set. |
| Score shown as a percent chance | PASS | `README.md` Honesty; `03_detection_models.md` How the score is shown; `02_case_data_evidence.md` `anomaly_rank`; `07_explainability_review.md` `MODEL_RANK` | Caption is uncalibrated ranking. Blank when unscored. |
| Retrain from PSI alone | PASS | `03_detection_models.md` Failure path; `09_ai_risk_security_observability.md` Drift and retrain | If a drift chart moves, investigate first. Wait for delayed labels from the named data owner. Retrain is a later job. PSI is Population Stability Index: one number per column that compares an earlier slice to a later slice. |
| Passing tests treated as the business problem solved | PASS | `10_production_readiness.md` opening and Inherited tests to replace | The inherited “missing PO under threshold” test locks the As-Is expedite that sent INV-1003 and INV-1004 to `PROCESS`. The inherited “exact invoice-number duplicate” test locks the method that missed INV-1002. Those two tests stay visible as gap locks until T-FN-05, T-FN-02, and T-FN-04 replace them. |
| Rewrite the inherited system on day one | PASS | `README.md`; `D1_AsIs_Assessment/README.md`; `TRACEABILITY.md` | D1 stays the As-Is baseline. Repo 1.0 stays evidence. This folder does not edit those files. Wave 1 closes two requirements on paper: stop AI as payment authorization, and send bank-change-plus-split cases to a person. |
| AI invents a cutoff | PASS (fixed this check) | Was FAIL in `02_case_data_evidence.md` `sibling_invoice_ids`. Now also `01_decision_risk_boundary.md`, `05_workflow.md`, `06_governed_decisioning.md` R-BANK-SPLIT, `08_compliance_audit.md`. Amount lines: `06_governed_decisioning.md` Policy thresholds | Inherited 5000 and 10000 stay As-Is evidence. New amount, timeout, retention, contest, extract-accept, velocity, segment-band, and sibling-time lines are `THRESHOLD_UNSET`. `THRESHOLD_UNSET` means the number is unset until an Architecture Decision Record (ADR) in D3 names an owner. Until that ADR, sibling evidence is the named pair INV-1003 and INV-1004 (4950 + 4950 = 9900). |
| Green tests with no exact golden | PASS | `10_production_readiness.md` Test catalog | Every later automated test compares the full payload both ways: expected codes present, and unexpected codes absent. |
| Retry the whole workflow | PASS | `05_workflow.md` Path, Retries, Idempotency keys | Retry only reversible steps: Ingest, Extract, Verify, Detect, Score within timeout, Decide recompute. Payment and notify use an idempotency key built from case id plus step name. A second call with the same key returns the first result. |
| `except: pass` and `score = 0` | PASS | `03_detection_models.md` How the score is shown; `05_workflow.md` Score step; `06_governed_decisioning.md` R-UNSCORED; `10_production_readiness.md` T-FL-01 | Scorer failure goes to REVIEW. Store `scorer_status=unscored` and empty rank. |
| Keep the run open for a human | PASS | `05_workflow.md` Persisted state and Review step; `10_production_readiness.md` T-FL-02 | The run may stop. A later worker resumes from the last stored step. REVIEW is a persisted queue. Queue outage: the case stays DECIDED / REVIEW on the application store and resumes. |
| Change Feed as the first recorder | PASS | `08_compliance_audit.md` Write the audit row first | The application writes the audit row first. Then it writes references into the WORM store. WORM means write once, read many. After lock, delete and overwrite are refused for the retention period. Only then may status change to `PAID`. A change-data feed is not the first recorder. |
| Personal data locked in WORM | PASS | `08_compliance_audit.md` Two stores; T-CO-03 in `10_production_readiness.md` | WORM holds references: audit_row_id, document hash, inputs_hash, versions, outcome, timestamps. Names, emails, and full bank numbers stay in a normal identity store. CH-89 emails stay in the normal store. The WORM row stores a hash of the email field. |
| Human review as an Accept-only button | PASS | `07_explainability_review.md` Reviewer evidence; `10_production_readiness.md` T-HV-01 | Equal-weight actions on the same screen: Agree, Disagree, Override. Disagree is as easy to press as Agree. |
| Policy only in the prompt | PASS | `06_governed_decisioning.md` Fusion; `09_ai_risk_security_observability.md` Change approvals | Policy is a versioned rule pack enforced in the API. Policy does not live only in a prompt. Amount edits stay blocked while the line is `THRESHOLD_UNSET`. |
| One risk tier for money and advice | PASS | `01_decision_risk_boundary.md` Capability verbs; `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md` | Verdict is per capability: duplicate detection, bank-account change, split / non-PO, segregation of duties, payment release. AI may analyse and recommend. A named person decides. A named person pays. This packet has no advice-only capability. |
| Infra dashboards as the only AI monitoring | PASS | `09_ai_risk_security_observability.md` What operations watches | Watches include override rate, unscored rate, audit completeness, false-positive trend, residual miss, REVIEW staffing, catch rate. Infra charts (CPU, uptime) may sit next to that list. |
| Thin prompt that omits numbers | PASS | `README.md` Amount lines; `02_case_data_evidence.md`; `03_detection_models.md`; `D1_AsIs_Assessment/00_LOCKED_FACTS.md` | Packet numbers stay in this design: INV-1001 / INV-1002 amount 9800 both `PAID`; INV-1003 / INV-1004 4950 + 4950 = 9900; CH-88 U22 / U22; `V-201` / `V201`; v1 precision 0.52, recall 0.71, false-positive rate 0.18; v2 false-positive rate 0.24; v2 precision and recall blank. |
| Eval that checks only a subset of expected alerts | PASS | `10_production_readiness.md` Test catalog and T-FN-02 / T-FN-03 / T-FN-04 | Keep the inherited invoice-number duplicate test (T-FN-03). Add supplier + PO + amount (T-FN-02) and alias `V201` (T-FN-04). Compare exactly both ways. |

## Extra C.8 row this packet does not use

| If the draft does this | Result | Why |
|---|---|---|
| Index every file in a folder (Lab 32 search-index ingest) | NOT APPLICABLE | This packet has no retrieval corpus and no search index. There is no folder of files to ingest for grounded answers. |

## What was FAIL and how it was fixed

`02_case_data_evidence.md` stored `sibling_invoice_ids` as “other invoices on the same canonical supplier in the same decision window.” That window had no number and no `THRESHOLD_UNSET`. Without a bound, every later V-311 invoice could join INV-1003.

Fix: a numeric sibling-time window is `THRESHOLD_UNSET`. Until a D3 ADR names an owner, sibling evidence is the named pair INV-1003 and INV-1004 only.

## Files edited in this C.8 check

- `01_decision_risk_boundary.md`
- `02_case_data_evidence.md`
- `05_workflow.md`
- `06_governed_decisioning.md`
- `08_compliance_audit.md`
- `README.md`
- `TRACEABILITY.md`
- `C8_CHECK.md` (this file)

No other `Repo_2_0/` files were edited for C.8. `REVIEW_NOTES.md` stays the S2a review. Defects listed there that are not C.8 rows (dead APPROVE path, Notify order, duplicate match missing currency, alias name-mismatch) were left for a later edit.

## Done test

No FAIL remains that this P2P packet uses. NOT APPLICABLE is used only for the Lab 32 search-index row.
