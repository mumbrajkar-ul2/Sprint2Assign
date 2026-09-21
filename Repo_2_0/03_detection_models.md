# 3 — Detection models

This file is the To-Be evaluation plan. It does not claim a production model was trained on this packet.

This packet has four invoices. Paths: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`; `D1_AsIs_Assessment/02_CASE_REPLAY.md`. Four rows are not representative labelled data.

Training on representative labelled data is a later job. The data owner is Missing in Repo 1.0. Path: `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-12. An ADR in D3 must name the data owner and the model owner.

It closes D1 spine 3 gaps: accuracy used as the quality story, blank v2 precision and recall, no independent validation, no segment view. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 3; `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-04; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-07.

## What exists today

Model card version `p2p-risk-2`. Features listed: amount, supplier age, bank change, approval count, `non_po_flag`, `duplicate_score`. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/anomaly_model.md`.

The card says no precision or recall is attached. It says no evaluation for high-value vs low-value transactions. It says no analysis of false blocks by supplier category. It says no independent validation.

Evaluation table path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`.

No stored model score sits on INV-1001 to INV-1004. Path: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 3.

Scorer-down behaviour in Repo 1.0 is Unknown. Locked later path: REVIEW and unscored. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

## Version compare (numbers from `evaluation.csv` only)

Honesty on every cell below: **PRECOMPUTED**. The cells were copied from `evaluation.csv`. This design did not recompute them.

| Metric | p2p-risk-1 | p2p-risk-2 |
|---|---|---|
| Precision | 0.52 | blank |
| Recall | 0.71 | blank |
| False-positive rate | 0.18 | 0.24 |

False-positive rate is the share of good cases the detector flags. v1 flags 0.18 of good cases. v2 flags 0.24 of good cases.

Precision is the share of flagged cases that were truly bad. v1 precision is 0.52. v2 precision is an empty cell.

Recall is the share of bad cases the detector flagged. v1 recall is 0.71. v2 recall is an empty cell.

`evaluation.csv` also stores accuracy 0.91 on v1 and 0.94 on v2. Those cells remain as copied source facts. The operating headline is precision, recall, false-positive rate, catch rate, and later PR-AUC.

PR-AUC is the area under the precision-recall curve. It pays attention to the rare class. AUC is the area under the ranking curve. Both are Missing from `evaluation.csv`.

This file does not name a live winner version. A named model owner, with AP (P2P-01), chooses the live version after v2 precision and recall are filled and after independent validation exists. Path for the chooser gap: `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-04.

## How the score is shown

The model emits an uncalibrated ranking. Caption it as a rank. Do not caption it as a percent chance of fraud.

If the scorer crashes or times out, store `scorer_status=unscored` and `anomaly_rank` empty. Do not write `score = 0`. Send the case to REVIEW.

## Evaluation plan

This plan is what later work must measure. The four packet invoices may be used as EDUCATIONAL walk-throughs. They are not the official test set.

A named data owner must assemble a labelled set that is larger than this packet. Class mix, source of labels, and time split stay Unknown until that owner writes them.

Independent validation means a person or team who did not train the model scores the same held-out set.

| Measure | What it answers | Source of the number | Honesty when first shown |
|---|---|---|---|
| Precision | Of the cases the model flags, how many were later confirmed bad. | Later labelled set | PRECOMPUTED until a live run; then REAL |
| Recall | Of the later-confirmed bad cases, how many the model flagged. | Later labelled set | Same |
| PR-AUC | Ranking quality with attention to the rare class. | Later labelled set | Same |
| AUC | Ranking quality across thresholds. | Later labelled set | Same |
| Catch rate | Share of named packet patterns the detector flags at the operating point. | Packet cases plus later set | EDUCATIONAL on the four invoices; REAL later |
| False-positive rate | Share of good cases flagged. | `evaluation.csv` now; later labelled set | PRECOMPUTED 0.18 and 0.24 |
| Segment: high-value vs low-value | Same measures on each amount band. | Missing today. `anomaly_model.md` says none. | Unknown until the data owner defines the bands. Band edges are `THRESHOLD_UNSET`. |
| Segment: supplier category | False blocks by category. | Missing today. | Unknown |
| Segment: non-PO vs PO | Catch on INV-1003 / INV-1004 style rows vs INV-1001 style rows. | Packet plus later set | EDUCATIONAL on the packet |
| Segment: alias | Catch when the second id is `V201`. | Packet has no invoice on `V201`. Test must add one. | EDUCATIONAL until live data |
| Version compare | Precision, recall, false-positive rate, PR-AUC side by side. | `evaluation.csv` plus later fill of v2 blanks | PRECOMPUTED today |
| Residual miss | Bad cases the live route still misses. | Reviewer labels | REAL after go-live |
| Staffing | REVIEW queue count and time to close. | Review store | REAL after go-live |

Do not tune a test set to hit a syllabus number. Report the measured cells.

Do not invent a ROC-AUC above 0.95. Keep class overlap. Some bad cases will look like good cases on the listed features.

## Catch-rate walk-through on this packet (EDUCATIONAL)

These four invoices have no stored model score. This table is a rule-and-evidence walk-through. It is not a trained-model result.

| Case | Pattern a detector must catch | As-Is result | To-Be route |
|---|---|---|---|
| INV-1002 | Same supplier, PO, amount as INV-1001. Invoice ids differ. | `NO_DUPLICATE`, `PAID` | REVIEW, recommended REJECT of the second payment |
| V-201 vs V201 | Alias hide | No invoice uses `V201` | Alias test must inject `V201` |
| CH-88 | Same-user bank change | SUCCESS | REVIEW. Do not apply the change automatically. |
| INV-1003 | Non-PO, 4950, bank change Y, day after CH-88 | PROCESS | REVIEW |
| INV-1004 | Sibling of INV-1003, pair 9900 | PROCESS | REVIEW |

Catch rate on these named rows is EDUCATIONAL. A later labelled set replaces it.

## Anomalous pricing

The runbook asks the system to detect anomalous pricing. The model card lists `amount`. The packet has no unit price, no catalog, and no historical price file.

Status of a price-catalog feed: **Unknown**. Do not invent one.

Until a catalog exists, the model may rank amount with its other features. Policy still picks APPROVE / REVIEW / REJECT. A high rank alone cannot pay. A high rank with no matching rule goes to REVIEW.

## Limitations

1. Four invoices. No production training claim.
2. v2 precision and recall are blank.
3. No independent validation.
4. No high-value vs low-value split.
5. No false-block analysis by supplier category.
6. AUC, PR-AUC, and catch rate are Missing from `evaluation.csv`.
7. Feature definitions, training-file path, label source, and class mix are Missing.
8. `supplier age` and `approval count` are named on the card and do not appear on `invoices.csv`.
9. `duplicate_score` is named on the card. The live duplicate method is `invoice_number_only`. Those two facts can disagree.
10. Shared model API key across two environments. Path: `09_ai_risk_security_observability/access_review.md`. See `09_ai_risk_security_observability.md`.

## Failure path

If the scorer is down, the workflow continues. The case goes to REVIEW. `scorer_status=unscored`. `anomaly_rank` stays empty. See `05_workflow.md`.

Do not retrain because a drift chart moved. Investigate first. Wait for delayed labels from the data owner.

## What stays open

- Model owner: Missing. D3 ADR.
- Data owner: Missing. D3 ADR.
- Live version choice: open (C-04).
- Representative labelled set: later job.
- Price catalog: Unknown.
- Segment band edges: `THRESHOLD_UNSET`.
