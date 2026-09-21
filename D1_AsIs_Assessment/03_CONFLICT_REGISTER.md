# D1 conflict register

When two files disagree, this register writes both sides. It names who must choose. D1 does not choose.

Repo 1.0 does not name a person for most choices. The chooser column uses the owner or role already stored in the files. If no owner is stored, the chooser cell says Missing.

`PROCESS` is current-state language. Trainer-required later names are `APPROVE` / `REVIEW` / `REJECT`. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

---

## C-01 — Approval matrix at 5000 vs non-PO PROCESS under 5000

**Both sides**

- Side A. `approval_matrix.csv` stores amount_limit `5000` with required_role `AP_SUPERVISOR`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/approval_matrix.csv`
- Side B. `exception_rules.yaml` stores `po == ""` and `amount < 5000` → `PROCESS`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Runtime. INV-1003 and INV-1004 are 4950 USD, empty PO, result `PROCESS`, status `APPROVED`. Paths: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`

Worked numbers: amount 4950 is under 5000, so the PROCESS rule fires. The matrix names AP_SUPERVISOR at 5000. The matrix file does not say whether 4950 needs that role.

**Who must choose**

Procurement owns P2P-04 Non-PO exception review. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`. AP_SUPERVISOR is the role named at 5000. Path: `approval_matrix.csv`. Those two named roles must choose which file is the live rule for a 4950 empty-PO invoice. D1 does not choose. The matrix has no owner column. Status of that owner cell: Missing.

---

## C-02 — Split invoice named vs no aggregation rule

**Both sides**

- Side A. Finance has identified invoice splitting. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/business_problem.md`
- Side A also. Risk list names split invoice around approval threshold. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`
- Side B. `exception_rules.yaml` lists “no split-invoice aggregation” under `gaps`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Runtime. INV-1003 amount 4950 PROCESS at 11:15. INV-1004 amount 4950 PROCESS at 11:16. Pair total 9900. Paths: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`; `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`

Worked numbers: each invoice is under 5000, so `NON_PO_UNDER_5000` fires twice. Together they are 9900. There is no aggregation rule in the yaml file.

**Who must choose**

Procurement owns P2P-04. Finance Controls owns P2P-03. Path: `control_matrix.csv`. `business_problem.md` names Internal Audit as a later detector of some segregation issues. Those named groups must choose whether split invoices are in scope for a live rule. D1 does not write that rule and does not set a new amount.

---

## C-03 — CH-88 same user vs no SoD rule

**Both sides**

- Side A. Risk list names requester / approver conflict. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`
- Side A also. P2P-03 Segregation of duties, owner Finance Controls, status Manual. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- Side B. `exception_rules.yaml` lists “no requester/approver conflict rule” under `gaps`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Runtime. CH-88 requested_by `U22`, approved_by `U22`, result `SUCCESS`. Paths: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`; `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`
- Contrast. CH-89 requested_by `U18`, approved_by `U19`. Path: `vendor_master_changes.csv`

Worked case: U22 asked to change V-311 bank account from XXXX1122 to XXXX9988. U22 approved it. No conflict rule fired.

**Who must choose**

Finance Controls owns P2P-03. Master Data owns P2P-02 Supplier bank change approval (status Partial). Path: `control_matrix.csv`. Those two named owners must choose whether same-user approval is allowed. D1 does not choose.

---

## C-04 — p2p-risk-2 accuracy headline vs worse false-positive rate than v1

**Both sides**

- Side A. Model card version `p2p-risk-2`, reported accuracy 94%. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/anomaly_model.md`
- Side A also. `evaluation.csv` accuracy `0.94` on `p2p-risk-2` vs `0.91` on `p2p-risk-1`. Path: `05_procure_to_pay_exception_repo_1_0/03_detection_models/evaluation.csv`
- Side B. `p2p-risk-2` false-positive rate `0.24`. `p2p-risk-1` false-positive rate `0.18`. Precision and recall on v2 are blank. Path: `evaluation.csv`
- Side B also. No independent validation. Path: `anomaly_model.md`
- Operations. `metrics.md` lists false positive rate under Missing. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/metrics.md`

Worked numbers: v2 flags 0.24 of good cases. v1 flags 0.18 of good cases. v2 accuracy is higher. v2 precision and recall are empty cells.

**Who must choose**

Repo 1.0 does not name a model owner. Status: Missing. AP owns P2P-01. Path: `control_matrix.csv`. A named model owner must be assigned later. That owner, with AP, must choose which version is live and which metrics are the headline. D1 does not choose and does not treat 94% as quality proof.

---

## C-05 — P2P-01 Active vs INV-1002 paid pair

**Both sides**

- Side A. P2P-01 Duplicate invoice check, owner AP, status Active. Path: `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`
- Side B. Duplicate check method `invoice_number_only`. INV-1002 `NO_DUPLICATE`. Path: `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`
- Runtime. INV-1001 and INV-1002 both `PAID` at 9800 USD, same supplier, same PO. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`

**Who must choose**

AP owns P2P-01. Path: `control_matrix.csv`. AP must choose what “Active” means against the invoice-number-only method. D1 does not change the method.

---

## C-06 — Status words PAID / APPROVED / PROCESS

**Both sides**

- `invoices.csv` stores INV-1001 and INV-1002 as `PAID`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`
- `invoices.csv` stores INV-1003 and INV-1004 as `APPROVED`. Same path.
- `processing_log.txt` stores INV-1003, INV-1004, and the INV-1002 decision text path uses `PROCESS`. Paths: `05_workflow_orchestration/processing_log.txt`; `07_explainability_review/sample_decisions.txt` (`INV-1002: PROCESS - duplicate rule not triggered.`)
- `exception_rules.yaml` actions are `BLOCK`, `REVIEW`, `PROCESS`. Path: `06_governed_decisioning/exception_rules.yaml`
- Trainer later requires `APPROVE` / `REVIEW` / `REJECT`. Path: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`

Worked case: INV-1002 is `PAID` on the invoice file and `PROCESS` on the decision file. INV-1003 is `APPROVED` on the invoice file and `PROCESS` on the log.

**Who must choose**

No owner of outcome names is stored in Repo 1.0. Status: Missing. AP owns P2P-01. Procurement owns P2P-04. Path: `control_matrix.csv`. Those named owners must choose how `PROCESS`, `APPROVED`, and `PAID` map to later `APPROVE` / `REVIEW` / `REJECT`. D1 records `PROCESS` as current-state language. D1 does not add a new policy name.

---

## C-07 — Bank-change REVIEW only above 10000 vs INV-1003 flagged Y at 4950

**Both sides**

- Side A. `bank_changed_30d == true` and `amount > 10000` → `REVIEW`. Path: `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`
- Side B. INV-1003 and INV-1004 have `bank_changed_30d=Y` and amount 4950. Result `PROCESS`. Paths: `invoices.csv`; `processing_log.txt`
- Pair total 9900 is also under 10000. Path: `invoices.csv`
- amount_limit `10000` is also FINANCE_MANAGER on the matrix. Path: `approval_matrix.csv`

Worked numbers: a 4950 invoice with a recent bank change does not meet `amount > 10000`. REVIEW does not fire. PROCESS does fire because PO is empty and 4950 < 5000.

**Who must choose**

Master Data owns P2P-02. Procurement owns P2P-04. FINANCE_MANAGER is the role named at 10000. Paths: `control_matrix.csv`; `approval_matrix.csv`. Those named roles must choose whether a bank-changed invoice under 10000 stays on PROCESS. D1 does not invent a new cutoff.

---

## C-08 — Alias ids and two supplier names

**Both sides**

- `V-201` name `Alpha Industrial Supply`. `V201` name `Alpha Industries Supply`. Path: `05_procure_to_pay_exception_repo_1_0/02_data_evidence/supplier_aliases.csv`
- `invoice_extraction.md` says supplier aliases cause duplicate misses. Path: `04_document_identity_compliance/invoice_extraction.md`
- `exception_rules.yaml` lists “no supplier alias normalization” under `gaps`. Path: `06_governed_decisioning/exception_rules.yaml`

**Who must choose**

AP owns P2P-01. Master Data owns P2P-02. Path: `control_matrix.csv`. Those owners must choose whether `V-201` and `V201` are the same supplier for duplicate checks. D1 does not merge the ids.

---

## C-09 — Touchless rate tracked vs prevented-duplicate value not tracked

**Both sides**

- Tracked: invoice processing time, touchless processing rate, overdue invoices. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/metrics.md`
- Missing from tracking: prevented duplicate value, split-invoice detection, risky bank changes, SoD violations, model/rule override rate, false positive rate, audit completeness. Same path.
- Runtime. Two 9800 USD invoices are `PAID`. Path: `invoices.csv`

**Who must choose**

AP owns P2P-01. Path: `control_matrix.csv`. No metrics owner is named. Status: Missing. AP and a later named metrics owner must choose which numbers operations watch. D1 does not add a dashboard.

---

## C-10 — Passing tests vs untested miss paths

**Both sides**

- Current tests: valid PO invoice; missing PO under threshold; exact invoice-number duplicate. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`
- Not tested: supplier alias duplicate; split invoices; same user requester/approver; bank change immediately before payment; model outage; queue outage; rollback; peak volume. Same path.
- Runtime matches the untested list: INV-1002 different invoice numbers both PAID; INV-1003/1004 split; CH-88 same user; CH-88 then PROCESS. Paths: `invoices.csv`; `processing_log.txt`; `vendor_master_changes.csv`

**Who must choose**

No test-owner name is stored. Status: Missing. `deployment.md` says the model is deployed by hand and there is no approval gate for rule threshold changes. Path: `05_procure_to_pay_exception_repo_1_0/10_production_readiness/deployment.md`. A later named owner must choose which tests are required before a rule or model change. D1 does not add tests.

---

## C-11 — Manual SoD vs overlapping payment roles

**Both sides**

- P2P-03 status Manual, owner Finance Controls. Path: `control_matrix.csv`
- Some vendor-master users also hold payment-processing roles. No continuous SoD monitoring. Path: `05_procure_to_pay_exception_repo_1_0/09_ai_risk_security_observability/access_review.md`
- CH-88 same user SUCCESS. Path: `audit_extract.log`

**Who must choose**

Finance Controls owns P2P-03. Path: `control_matrix.csv`. That owner must choose how overlap of vendor-master and payment roles is handled. D1 does not change access.

---

## C-12 — AI used as payment authorization named as risk vs no blocking control

**Both sides**

- Risk: AI recommendation used as payment authorization without accountable reviewer. Path: `05_procure_to_pay_exception_repo_1_0/01_decision_risk_boundary/risk_notes.md`
- `control_matrix.csv` has no row that forbids that use. Path: `08_compliance_audit/control_matrix.csv`
- Wave 1 stance for later work is recorded in `D1_AsIs_Assessment/05_CAPABILITY_SPLIT.md`. This register does not implement it.

**Who must choose**

P2P-05 owner is TBD. Path: `control_matrix.csv`. No payment-release owner is named. Status: Missing. A named person must own payment execute. Finance Controls and AP are the named control owners nearest this risk. They must choose the live authorization rule. D1 records the stance only.
