# 10 — Production readiness

This file is the To-Be test, release, and handover design.

It closes D1 spine 10 gaps: untested alias, split, same-user, bank-then-pay, model outage, queue outage, rollback, peak volume; no IaC; no release pack; no threshold gate. Paths: `D1_AsIs_Assessment/01_SPINE_NOTES.md` Spine 10; `D1_AsIs_Assessment/03_CONFLICT_REGISTER.md` C-10; `D1_AsIs_Assessment/04_MISSING_CONTROLS.md` M-19, M-20; `D1_AsIs_Assessment/06_RCTE_ROWS.md` RCTE-08, RCTE-12.

Repo 1.0 current tests: valid PO invoice; missing PO under threshold; exact invoice-number duplicate. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`.

A green result on “missing PO under threshold” can lock the As-Is expedite that sent INV-1003 and INV-1004 to `PROCESS`. That test is a known-gap lock until D4 replaces it. A green result on “exact invoice-number duplicate” can lock the method that missed INV-1002. Passing those two tests does not mean the business problem is solved.

## Test catalog

Every later automated test compares the full payload both ways: expected codes present, and unexpected codes absent.

Honesty: packet walk-throughs are EDUCATIONAL until a runner exists. Measured runner output is REAL.

### Functional

| Id | What it proves | Golden case |
|---|---|---|
| T-FN-01 | Valid PO invoice with no exception flags can reach APPROVE | New case modelled on INV-1001 arriving first |
| T-FN-02 | Duplicate by supplier + PO + amount with different invoice ids goes to REVIEW | INV-1001 and INV-1002, V-201, PO-7001, 9800 |
| T-FN-03 | Exact invoice-number duplicate still flagged | Keep the inherited test. Add T-FN-02. |
| T-FN-04 | Alias `V201` matches `V-201` | Inject a second 9800 invoice on `V201` |
| T-FN-05 | Empty PO goes to REVIEW | INV-1003 |
| T-FN-06 | Sibling pair stores sum 9900 and REVIEW | INV-1003 and INV-1004 |
| T-FN-07 | Same-user bank change does not auto-apply | CH-88 U22 / U22 |
| T-FN-08 | Different-user email change does not set SoD | CH-89 U18 / U19 |
| T-FN-09 | Bank change then payment path goes to REVIEW | CH-88 then INV-1003 |
| T-FN-10 | Outcomes are APPROVE, REVIEW, REJECT only | No `PROCESS` in To-Be output |
| T-FN-11 | Model rank caption is uncalibrated ranking | Score field |

### Integration

| Id | What it proves |
|---|---|
| T-IN-01 | Invoice ingest plus vendor-change ingest join on canonical supplier |
| T-IN-02 | Extract record stored before Verify |
| T-IN-03 | Audit row id exists before status `PAID` |
| T-IN-04 | Notify key `case_id:notify` returns the first result on retry |
| T-IN-05 | Payment key `case_id:payment` keeps payment count at 1 |

### Adverse

| Id | What it proves | Golden case |
|---|---|---|
| T-AD-01 | Alias duplicate | `V-201` / `V201` |
| T-AD-02 | Split invoices | 4950 + 4950 = 9900 |
| T-AD-03 | Same user requester and approver | CH-88 |
| T-AD-04 | Bank change immediately before invoice | CH-88 at 2026-08-11T13:44:00, INV-1003 at 2026-08-12 11:15 |
| T-AD-05 | Recommendation alone does not set `PAID` | RCTE-06 |

### Failure

| Id | What it proves |
|---|---|
| T-FL-01 | Model outage → REVIEW, `scorer_status=unscored`, rank empty. No `score = 0`. |
| T-FL-02 | Queue outage → case stays DECIDED / REVIEW on the application store and resumes |
| T-FL-03 | Extract down → REVIEW, `extract_status=uncertain` |
| T-FL-04 | Audit write fail → payment blocked, `ESC_P2P05` |
| T-FL-05 | Payment retry after crash → count stays 1 |

### Compliance

| Id | What it proves |
|---|---|
| T-CO-01 | CH-88 id stored on INV-1003 and INV-1004 audit rows |
| T-CO-02 | WORM store refuses overwrite of a locked reference |
| T-CO-03 | Email and full bank number are absent from the WORM payload |
| T-CO-04 | P2P-01 method is supplier+PO+amount, not invoice_number_only only |
| T-CO-05 | Rebuild INV-1002 and INV-1003 from the audit row |

### Performance

| Id | What it proves | Honesty |
|---|---|---|
| T-PE-01 | Step latency recorded | REAL when measured |
| T-PE-02 | Peak volume | EDUCATIONAL until a measured run exists. Repo 1.0 lists peak volume as not tested. No volume number sits in the packet. Do not invent one. |

### Fallback and human review

| Id | What it proves |
|---|---|
| T-HV-01 | Reviewer can Agree, Disagree, and Override on the same screen |
| T-HV-02 | Disagree writes a reason and does not pay by accident |
| T-HV-03 | Contest opens a second REVIEW |
| T-HV-04 | Scorer-down case shows unscored, not a fake rank |
| T-HV-05 | A stranger can finish the INV-1003 REVIEW using the script in `07_explainability_review.md` |

### Rollback

| Id | What it proves |
|---|---|
| T-RB-01 | Rule pack rolls back to the previous version. New invoices use the old pack. In-flight cases keep the pack they started with. |
| T-RB-02 | Model version rolls back the same way. |
| T-RB-03 | A rejected release does not change `THRESHOLD_UNSET` lines. |

## Defect handling

A failing test blocks release. The defect names the case id, the expected payload, and the actual payload.

Defects that re-open a D1 gap (invoice_number_only miss, silent PROCESS on a split, same-user SUCCESS) are severity 1. They cannot be waived by a green inherited test.

## Governance evidence pack

Required before production handover:

1. This Repo 2.0 pack.
2. D1 assessment still intact.
3. D3 PRD and any ADRs.
4. Evaluation file with precision, recall, false-positive rate. v2 blanks filled or v2 not live.
5. Access review with date and name. Separate API keys.
6. SoD attestation from Finance Controls.
7. CR-REG-01 answer or an explicit Unknown still open.
8. Test runner output for T-FN-02, T-FN-04, T-FN-06, T-FN-07, T-FN-09, T-FL-01, T-FL-02, T-RB-01, T-CO-01, T-HV-01.
9. One rebuilt case: actor, from-state, to-state, score or unscored, reasons, model version, rule version.

## CI/CD, IaC, release gates, rollback, hardening, handover

| Practice | To-Be | As-Is |
|---|---|---|
| CI/CD | Pipeline runs the catalog above on each rule or model change. | Missing. Model deployed by hand. |
| IaC | Cloud setup written as files a program can apply. | `deployment.md` says none. |
| Release gate | Evaluation file present. Threshold ADR present if a number is coded. SoD check green. Audit-first test green. | No approval gate for rule threshold changes. |
| Rollback | T-RB-01 to T-RB-03. | Not tested. |
| Security hardening | Separate API keys. Masked bank details. Role split. Logged access. | Shared key. Role overlap. |
| Production handover | Named REVIEW owner, named payer, named model owner, named P2P-05 owner. | Those names Missing or TBD. |

Rules sit in a versioned pack, not only a shared file that anyone can edit. Path for the As-Is shared file: `10_production_readiness/deployment.md`.

## Inherited tests to replace

| Inherited test | What it locks today | To-Be replacement |
|---|---|---|
| Valid PO invoice | Happy path | T-FN-01 |
| Missing PO under threshold | Silent PROCESS under 5000 | T-FN-05. Expedite retired. |
| Exact invoice-number duplicate | Misses INV-1002 | Keep T-FN-03 and add T-FN-02 and T-FN-04 |

## What stays open

- Peak-volume number: do not invent. EDUCATIONAL until measured.
- Owner names: D3 ADR.
- Timeout seconds and retention days: `THRESHOLD_UNSET`.
