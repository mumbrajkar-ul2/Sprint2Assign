# Traceability — Repo 2.0 to PRD

This file maps each `Repo_2_0/` file to PRD requirement ids and acceptance ids. Source of requirements: `D3_PRD/PRD.md`. Packet cases: `D1_AsIs_Assessment/02_CASE_REPLAY.md`.

Repo 1.0, Repo 2.0, and D1 were not edited for this deliverable.

`THRESHOLD_UNSET` lines stay unset. D3b must write an ADR with a named owner before anyone codes those numbers. See P2P-FR-006 and P2P-AC-035.

## Spine file → PRD section → requirements → acceptance

| Repo 2.0 file | PRD section | Requirement ids | Acceptance ids |
|---|---|---|---|
| `README.md` | Header; honesty; outcomes | P2P-FR-001, P2P-FR-002, P2P-FR-006 | P2P-AC-010, P2P-AC-011, P2P-AC-035 |
| `01_decision_risk_boundary.md` | 1 Business problem; 2 Users; 8 Risk and compliance | P2P-FR-001 to P2P-FR-008, P2P-FR-041, P2P-FR-057 | P2P-AC-001, P2P-AC-002, P2P-AC-003, P2P-AC-004, P2P-AC-006, P2P-AC-010, P2P-AC-012, P2P-AC-014 |
| `02_case_data_evidence.md` | 6 Data; 3.3 Ingest | P2P-FR-009 to P2P-FR-013, P2P-FR-023 to P2P-FR-029, P2P-FR-056 | P2P-AC-001, P2P-AC-002, P2P-AC-003, P2P-AC-013, P2P-AC-016, P2P-AC-027 |
| `03_detection_models.md` | 4 AI capabilities; 3.6 Score | P2P-FR-030 to P2P-FR-035, P2P-FR-040, P2P-FR-065 | P2P-AC-004, P2P-AC-011, P2P-AC-031 |
| `04_document_identity_compliance.md` | 3.4 Extract and identity; 7 Integrations | P2P-FR-014 to P2P-FR-022, P2P-FR-016 | P2P-AC-002, P2P-AC-012, P2P-AC-018, P2P-AC-020 |
| `05_workflow.md` | 5 Workflows | P2P-FR-031, P2P-FR-049, P2P-FR-051, P2P-FR-052, P2P-FR-058 to P2P-FR-064 | P2P-AC-003, P2P-AC-004, P2P-AC-005, P2P-AC-015, P2P-AC-017, P2P-AC-021 |
| `06_governed_decisioning.md` | 3.7 Decide | P2P-FR-036 to P2P-FR-041 | P2P-AC-001, P2P-AC-002, P2P-AC-003, P2P-AC-006, P2P-AC-008, P2P-AC-010, P2P-AC-012, P2P-AC-013, P2P-AC-014 |
| `07_explainability_review.md` | 3.8 Review, notify, contest; 5.3 | P2P-FR-042 to P2P-FR-050 | P2P-AC-015, P2P-AC-028, P2P-AC-029, P2P-AC-030, P2P-AC-031, P2P-AC-032 |
| `08_compliance_audit.md` | 8 Risk and compliance; 3.9 Payment and audit | P2P-FR-053 to P2P-FR-057 | P2P-AC-019, P2P-AC-022, P2P-AC-023, P2P-AC-024, P2P-AC-025, P2P-AC-026, P2P-AC-027 |
| `09_ai_risk_security_observability.md` | 8.5 Access; 9 NFR; 11 Success metrics | P2P-FR-033, P2P-FR-035, P2P-FR-066, P2P-FR-068 | P2P-AC-011, P2P-AC-014, P2P-AC-035; metrics P2P-SM-001 to P2P-SM-023 |
| `10_production_readiness.md` | 9 NFR; 10 Acceptance criteria | P2P-FR-067 to P2P-FR-073 | P2P-AC-001 to P2P-AC-038 |
| `TRACEABILITY.md` | This file plus D1 ids below | P2P-FR-037 (RCTE rule ids) | P2P-AC-001 to P2P-AC-004, P2P-AC-026 |
| `REVIEW_NOTES.md` | PRD section 3.1 resolutions | P2P-FR-006, P2P-FR-023 (currency), P2P-FR-018 (alias names), P2P-FR-039 (APPROVE path), P2P-FR-049 (notify order) | P2P-AC-005, P2P-AC-006 |
| `C8_CHECK.md` | 9.1 scorer-down; 9.2 no invented cutoff | P2P-FR-006, P2P-FR-031, P2P-FR-052, P2P-FR-053, P2P-FR-055, P2P-FR-065 | P2P-AC-004, P2P-AC-005, P2P-AC-023, P2P-AC-024, P2P-AC-025, P2P-AC-035 |

## Requirement → acceptance (primary)

One requirement may have several checks. The primary acceptance id is the check D4 must pass first.

| Requirement id | What it requires | Primary acceptance id | Case or measurable check |
|---|---|---|---|
| P2P-FR-001 | Outcomes APPROVE, REVIEW, REJECT only | P2P-AC-010 | No `PROCESS` in To-Be output |
| P2P-FR-002 | Policy picks outcome. Model ranks. | P2P-AC-011 | Rank caption uncalibrated |
| P2P-FR-003 | Named person owns REVIEW | P2P-AC-032 | INV-1003 REVIEW close fields |
| P2P-FR-004 | Named person pays. AI does not pay. | P2P-AC-014 | Recommendation does not set `PAID` |
| P2P-FR-005 | Prohibited automation list | P2P-AC-012, P2P-AC-004, P2P-AC-019 | CH-88; scorer down; audit-first |
| P2P-FR-006 | THRESHOLD_UNSET until D3b ADR | P2P-AC-035 | Rejected release does not set a number |
| P2P-FR-007 | CR-REG-01. No invented statute. | P2P-AC-018 | Uncertain identity → REVIEW (measurable hold) |
| P2P-FR-008 | D3b names owners | P2P-AC-032 | Reviewer id required on close |
| P2P-FR-009 | Invoice ingest and ingest time | P2P-AC-016 | INV-1003 ingest joins CH-88 |
| P2P-FR-010 | Vendor-change ingest | P2P-AC-003 | CH-88 then INV-1003 / INV-1004 |
| P2P-FR-011 | Data-quality fail → REVIEW | P2P-AC-018 | Extract uncertain |
| P2P-FR-012 | Lineage on every field | P2P-AC-027 | Rebuild from audit row |
| P2P-FR-013 | Labels later; four invoices not a training set | P2P-AC-032 | Disposition stored at close |
| P2P-FR-014 | Extract before Verify | P2P-AC-020 | Extract row exists |
| P2P-FR-015 | Per-field confidence and channel | P2P-AC-020 | Confidence recorded or uncertain |
| P2P-FR-016 | Uncertain extract → REVIEW | P2P-AC-018 | INV-style case held |
| P2P-FR-017 | Canonical join V-201 / V201 | P2P-AC-002 | Injected `V201` 9800 invoice |
| P2P-FR-018 | Known alias names not a mismatch REVIEW | P2P-AC-002 | Known pair still matches |
| P2P-FR-019 | Same-user bank change → REVIEW | P2P-AC-012 | CH-88 U22 / U22 |
| P2P-FR-020 | verification_method none/Missing → REVIEW | P2P-AC-012 | CH-88 PDF Missing in packet |
| P2P-FR-021 | Sanctions / PEP / address Unknown | P2P-AC-018 | Missing requested check → REVIEW |
| P2P-FR-022 | Change PDF hash when file exists | P2P-AC-024 | Hash in WORM when present |
| P2P-FR-023 | Duplicate key supplier+PO+amount+currency | P2P-AC-001 | INV-1001 and INV-1002, 9800 USD |
| P2P-FR-024 | Secondary invoice-number flag | P2P-AC-007 | Exact invoice-number duplicate |
| P2P-FR-025 | Named sibling pair until ADR | P2P-AC-013 | 4950 + 4950 = 9900 |
| P2P-FR-026 | Empty PO → REVIEW | P2P-AC-008 | INV-1003 |
| P2P-FR-027 | Link CH-88 to later invoices | P2P-AC-022 | CH-88 on INV-1003 and INV-1004 audit |
| P2P-FR-028 | No price-catalog detect flag | P2P-AC-038 | Unexpected price code absent |
| P2P-FR-029 | Role-overlap flag when file supplies it | P2P-AC-038 | Flag present only when supplied |
| P2P-FR-030 | Uncalibrated rank | P2P-AC-011 | Caption check |
| P2P-FR-031 | Scorer down → REVIEW, unscored | P2P-AC-004 | Empty rank. No `score = 0` |
| P2P-FR-032 | Four invoices not a training set | P2P-AC-006 | APPROVE fixture is not a trained claim |
| P2P-FR-033 | Headline precision / recall / FPR | Metrics P2P-SM-001 to P2P-SM-003 | Copied cells labelled PRECOMPUTED |
| P2P-FR-034 | Independent validation before live version | P2P-AC-034 | Model rollback without treating v2 as proven |
| P2P-FR-035 | Drift: investigate first | P2P-AC-034 | No silent retrain on rollback |
| P2P-FR-036 | Versioned rule pack in API | P2P-AC-033 | Pack version on new vs in-flight |
| P2P-FR-037 | Rules R-DUP through R-EXTRACT | P2P-AC-001, P2P-AC-002, P2P-AC-003, P2P-AC-004 | Packet cases |
| P2P-FR-038 | Precedence and all reason codes | P2P-AC-003 | INV-1003 stores four reason codes |
| P2P-FR-039 | APPROVE when no exception flags | P2P-AC-006 | INV-1001-style first arrival |
| P2P-FR-040 | Rank does not pick money outcome | P2P-AC-014 | `PAID` only after named payer |
| P2P-FR-041 | Exception → REVIEW plus recommendation | P2P-AC-001 | INV-1002 recommended REJECT, final REVIEW |
| P2P-FR-042 | Persisted REVIEW queue | P2P-AC-017 | Queue outage resume |
| P2P-FR-043 | Reason codes | P2P-AC-003 | Codes on INV-1003 |
| P2P-FR-044 | Rationale paragraph with numbers | P2P-AC-032 | INV-1003 script names 4950, CH-88, 9900 |
| P2P-FR-045 | Attribution when scored; none when unscored | P2P-AC-031 | Unscored screen |
| P2P-FR-046 | Counterfactuals | P2P-AC-032 | INV-1003 / INV-1004 script |
| P2P-FR-047 | Reviewer evidence list | P2P-AC-032 | Stranger finishes REVIEW |
| P2P-FR-048 | Agree / Disagree / Override equal | P2P-AC-028 | Same screen |
| P2P-FR-049 | Notify after APPROVE, REVIEW close, REJECT | P2P-AC-015 | Key `{case_id}:notify` count 1 |
| P2P-FR-050 | Contest path | P2P-AC-030 | Second REVIEW |
| P2P-FR-051 | Payment after APPROVE only | P2P-AC-021 | INV-1003 payment count 0 |
| P2P-FR-052 | Payment idempotency | P2P-AC-005 | Count stays 1 |
| P2P-FR-053 | Audit then WORM then PAID | P2P-AC-023 | Audit id before `PAID` |
| P2P-FR-054 | Audit field list | P2P-AC-027 | Rebuild INV-1002 and INV-1003 |
| P2P-FR-055 | WORM vs identity store | P2P-AC-025 | Email and full bank absent from WORM |
| P2P-FR-056 | payer_id and reviewer_id | P2P-AC-023, P2P-AC-032 | Stored on PAID and REVIEW close |
| P2P-FR-057 | ESC_* events | P2P-AC-019 | `ESC_P2P05` on audit fail |
| P2P-FR-058 | Eight workflow steps | P2P-AC-003 | Ingest through Notify on INV-1003 |
| P2P-FR-059 | Persisted state and resume | P2P-AC-017 | State present after restart |
| P2P-FR-060 | Parallel checks | P2P-AC-003 | Alias, SoD, sibling, bank link together |
| P2P-FR-061 | Retry reversible only | P2P-AC-005 | Payment outside retry |
| P2P-FR-062 | Superseded extract row kept | P2P-AC-020 | Partial row not deleted |
| P2P-FR-063 | Queue outage persist | P2P-AC-017 | DECIDED / REVIEW |
| P2P-FR-064 | CH-88 correlation sequence | P2P-AC-003 | Times 13:44 then 11:15 then 11:16 |
| P2P-FR-065 | Scorer-down NFR | P2P-AC-004 | REVIEW, unscored |
| P2P-FR-066 | Separate keys, mask, role split | P2P-AC-025 | Bank numbers not in WORM |
| P2P-FR-067 | CI catalog | P2P-AC-038 | Both-ways payload |
| P2P-FR-068 | Release gates | P2P-AC-035 | No number without ADR |
| P2P-FR-069 | Rollback | P2P-AC-033, P2P-AC-034 | Pack and model |
| P2P-FR-070 | No invented peak volume | P2P-AC-037 | EDUCATIONAL until measured |
| P2P-FR-071 | Severity 1 on D1-gap defects | P2P-AC-001, P2P-AC-003 | Duplicate and split cannot be waived |
| P2P-FR-072 | Both-ways test compare | P2P-AC-038 | Expected present, unexpected absent |
| P2P-FR-073 | Governance pack | P2P-AC-027 | One rebuilt case |

## D1 RCTE → PRD rule → test

Copied from `Repo_2_0/TRACEABILITY.md` and pointed at PRD ids.

| RCTE | PRD rule | Acceptance id | Evidence |
|---|---|---|---|
| RCTE-01 | R-DUP (P2P-FR-037) | P2P-AC-001 | Audit row with both invoice ids, method, 9800 USD |
| RCTE-02 | Alias canonical join (P2P-FR-017) | P2P-AC-002 | Raw ids plus canonical id |
| RCTE-03 | R-SOD-BANK | P2P-AC-012 | CH-88 requester, approver, change held |
| RCTE-04 | R-BANK-SPLIT | P2P-AC-003 | CH-88 linked to INV-1003 and INV-1004, pair 9900 |
| RCTE-05 | R-NONPO | P2P-AC-008 | Empty PO, REVIEW, no PROCESS |
| RCTE-06 | Prohibited automation (P2P-FR-005) | P2P-AC-014 | Recommendation stored. `PAID` only after named payer |
| RCTE-07 | Evaluation headline (P2P-FR-033) | P2P-SM-001 to P2P-SM-003 | Precision, recall, FPR, later PR-AUC |
| RCTE-08 | Unscored REVIEW (P2P-FR-031) | P2P-AC-004 | `scorer_status=unscored` |
| RCTE-09 | P2P-05 write-first (P2P-FR-053) | P2P-AC-023, P2P-AC-022, P2P-AC-027 | Audit row then `PAID` |
| RCTE-10 | Separate keys and role split (P2P-FR-066) | P2P-AC-025 | Identity store vs WORM |
| RCTE-11 | Persisted REVIEW (P2P-FR-048) | P2P-AC-028 to P2P-AC-032 | Reviewer, times, disposition |
| RCTE-12 | Rule-change gate (P2P-FR-068) | P2P-AC-033, P2P-AC-035 | Pack version, ADR for numbers |
| RCTE-13 | Uncertain extract → REVIEW | P2P-AC-018 | Extract fields and confidence |

## Required acceptance cases → D1 replay

| Acceptance id | D1 replay section | Expected To-Be |
|---|---|---|
| P2P-AC-001 | INV-1001; INV-1002; 12:01 `invoice_number_only` `NO_DUPLICATE` | REVIEW on INV-1002. Method supplier+PO+amount+currency 9800 USD. |
| P2P-AC-002 | V-201 vs V201 | Inject `V201`. Canonical match. REVIEW. |
| P2P-AC-003 | CH-88; INV-1003; INV-1004; pair 9900 | REVIEW. Not silent PROCESS. |
| P2P-AC-004 | Locked scorer-down path (Repo 2.0 / D1) | REVIEW, unscored. |
| P2P-AC-005 | Workflow idempotency (Repo 2.0 `05_workflow.md`) | Payment count stays 1. |

## Done test

- Every Repo 2.0 spine file has a row in the first table.
- Every acceptance criterion in `PRD.md` section 10 names a case or a measurable check.
- No cutoff is mapped as coded. Unset lines point at P2P-FR-006 and P2P-AC-035.
