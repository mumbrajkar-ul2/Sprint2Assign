# D1 case replay

This file rebuilds the packet cases from Repo 1.0 source files. It starts from `Project Intent.md` Appendix D. It copies file values. It does not fix them.

`PROCESS` is a Repo 1.0 result word. Invoice status words in `invoices.csv` are `PAID` and `APPROVED`. Trainer-required later names are `APPROVE` / `REVIEW` / `REJECT`. See `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

---

## Appendix D check

Appendix D numbers match the source files listed below. Two wording notes are recorded so a reader uses the file text.

| Appendix D statement | Source file | Verdict |
|---|---|---|
| INV-1001 supplier V-201 (Alpha Industrial Supply), PO-7001, 9800 USD, approver U11, bank change N, PAID | `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv` and `supplier_aliases.csv` | Matches. Name comes from the `V-201` alias row. |
| INV-1002 same supplier, PO, amount, approver, PAID; log at 12:01 on 2026-08-12 `duplicate_check=NO_DUPLICATE` `method=invoice_number_only` | `invoices.csv`; `05_workflow_orchestration/processing_log.txt` | Matches. |
| CH-88 V-311 `bank_account` XXXX1122 to XXXX9988, requester U22, approver U22, `2026-08-11T13:44:00` | `02_data_evidence/vendor_master_changes.csv` | Matches. `audit_extract.log` also stores `result=SUCCESS`. |
| INV-1003 and INV-1004 V-311, no PO, 4950 USD each, approver U22, `bank_changed_30d=Y`, status APPROVED; log `NON_PO_UNDER_5000` PROCESS at 11:15 and 11:16 on 2026-08-12; pair 9900 | `invoices.csv`; `processing_log.txt` | Matches. 4950 + 4950 = 9900. |
| Bank-change rule REVIEW when amount over 10000; 9900 sits under that line; 10000 is also FINANCE_MANAGER on the matrix | `06_governed_decisioning/exception_rules.yaml`; `approval_matrix.csv` | Matches. File operator is `amount > 10000`. |
| CH-89 V-201 email change, requester U18, approver U19 | `vendor_master_changes.csv` | Matches. Appendix D omits old/new values and time. Source has them. Recorded below. |
| Aliases V-201 and V201 map to Alpha Industrial / Alpha Industries Supply | `supplier_aliases.csv` | Relationship matches. Source stores two different name strings: `Alpha Industrial Supply` and `Alpha Industries Supply`. V-311 is also on the alias file as `Nova Components`. |

No Appendix D number was wrong. The replay below uses the source-file fields.

---

## INV-1001

Rebuild from `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`.

| Field | Value | Path |
|---|---|---|
| invoice_id | INV-1001 | `02_data_evidence/invoices.csv` |
| supplier | V-201 | `02_data_evidence/invoices.csv` |
| supplier name | Alpha Industrial Supply | `02_data_evidence/supplier_aliases.csv` |
| po | PO-7001 | `02_data_evidence/invoices.csv` |
| amount | 9800 | `02_data_evidence/invoices.csv` |
| currency | USD | `02_data_evidence/invoices.csv` |
| approver | U11 | `02_data_evidence/invoices.csv` |
| bank_changed_30d | N | `02_data_evidence/invoices.csv` |
| status | PAID | `02_data_evidence/invoices.csv` |

Related change on the same supplier: CH-89 is an email change on V-201 at `2026-08-12T09:20:00`. Path: `02_data_evidence/vendor_master_changes.csv`. INV-1001 has no process time in `processing_log.txt`.

Missing on this row: goods receipt, extract fields, model score, rule version, payment-release actor, audit line. Status: Missing.

Worked picture: Finance paid 9800 USD to supplier V-201 against PO-7001. The invoice is already `PAID`. Payment cannot be undone. Path: `02_data_evidence/invoices.csv`. Locked fact: `D1_AsIs_Assessment/00_LOCKED_FACTS.md`.

---

## INV-1002

A reader can rebuild this case from the paths in this section.

### Invoice row

From `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`:

`INV-1002,V-201,PO-7001,9800,USD,U11,N,PAID`

| Field | INV-1001 | INV-1002 |
|---|---|---|
| invoice_id | INV-1001 | INV-1002 |
| supplier | V-201 | V-201 |
| po | PO-7001 | PO-7001 |
| amount | 9800 | 9800 |
| currency | USD | USD |
| approver | U11 | U11 |
| bank_changed_30d | N | N |
| status | PAID | PAID |

The two rows match on supplier, PO, amount, currency, approver, bank flag, and status. The invoice ids differ.

### Duplicate check at run time

From `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`:

`2026-08-12 12:01 INV-1002 duplicate_check=NO_DUPLICATE method=invoice_number_only`

The check method is invoice number only. INV-1001 and INV-1002 have different invoice numbers. The check stores `NO_DUPLICATE`.

`current_flow.md` in the same folder also says the duplicate check uses invoice number only.

### Rule that could have blocked

From `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`:

`if: duplicate_invoice_number == true` then `action: BLOCK`.

The live method never set `duplicate_invoice_number` from supplier + PO + amount.

### Decision text

From `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`:

`INV-1002: PROCESS - duplicate rule not triggered.`

`invoices.csv` stores status `PAID`. `sample_decisions.txt` stores result `PROCESS`. Both are current-state words on this case.

### Control row that names this check

From `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/control_matrix.csv`:

P2P-01 Duplicate invoice check, owner AP, status Active.

### Test that exists today

From `05_procure_to_pay_exception_repo_1_0/10_production_readiness/test_summary.md`:

Current tests include “exact invoice-number duplicate”. “supplier alias duplicate” is not tested.

### What a reader now knows

1. INV-1001 was already `PAID` at 9800 USD to V-201 on PO-7001. Path: `invoices.csv`.
2. INV-1002 has the same supplier, PO, amount, and `PAID`. Path: `invoices.csv`.
3. At 12:01 on 2026-08-12 the running check stored `NO_DUPLICATE` because the method was `invoice_number_only`. Path: `processing_log.txt`.
4. The irreversible action, payment, has already happened on both rows. Path: `invoices.csv`. Locked fact: `00_LOCKED_FACTS.md`.

Missing: audit line for INV-1002 in `audit_extract.log`; who released payment; model score; rule version.

---

## CH-88 then INV-1003

A reader can rebuild INV-1003 from the paths in this section. CH-88 is the bank-account change that sits on the day before.

### CH-88

From `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`:

`CH-88,V-311,bank_account,XXXX1122,XXXX9988,U22,U22,2026-08-11T13:44:00`

| Field | Value | Path |
|---|---|---|
| change_id | CH-88 | `vendor_master_changes.csv` |
| supplier | V-311 | `vendor_master_changes.csv` |
| supplier name | Nova Components | `supplier_aliases.csv` |
| field | bank_account | `vendor_master_changes.csv` |
| old | XXXX1122 | `vendor_master_changes.csv` |
| new | XXXX9988 | `vendor_master_changes.csv` |
| requested_by | U22 | `vendor_master_changes.csv` |
| approved_by | U22 | `vendor_master_changes.csv` |
| timestamp | 2026-08-11T13:44:00 | `vendor_master_changes.csv` |

From `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`:

`2026-08-11T13:44:00 vendor_change=CH-88 requester=U22 approver=U22 result=SUCCESS`

Same user requested and approved. The audit line stores `SUCCESS`.

`exception_rules.yaml` lists “no requester/approver conflict rule” under `gaps`.

`vendor_verification.md` says bank-change requests are emailed as PDFs and out-of-band checks are inconsistent.

P2P-02 owner Master Data, status Partial. Path: `control_matrix.csv`.

### INV-1003 invoice row

From `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`:

`INV-1003,V-311,,4950,USD,U22,Y,APPROVED`

| Field | Value | Path |
|---|---|---|
| invoice_id | INV-1003 | `invoices.csv` |
| supplier | V-311 | `invoices.csv` |
| po | empty | `invoices.csv` (blank between commas) |
| amount | 4950 | `invoices.csv` |
| currency | USD | `invoices.csv` |
| approver | U22 | `invoices.csv` |
| bank_changed_30d | Y | `invoices.csv` |
| status | APPROVED | `invoices.csv` |

Approver `U22` is the same user id as CH-88 requester and approver.

### INV-1003 at run time

From `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`:

`2026-08-12 11:15 INV-1003 rule=NON_PO_UNDER_5000 result=PROCESS`

From `05_procure_to_pay_exception_repo_1_0/08_compliance_audit/audit_extract.log`:

`2026-08-12T11:15:03 invoice=INV-1003 action=PROCESS`

`No vendor-change evidence linked to payment decision.`

Time order: CH-88 at `2026-08-11T13:44:00`. INV-1003 at `2026-08-12 11:15`. Bank change first. Invoice `PROCESS` the next day.

### Why PROCESS fired

From `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/exception_rules.yaml`:

- `po == ""` and `amount < 5000` → `PROCESS`. INV-1003 PO is empty. Amount 4950 is under 5000.
- `bank_changed_30d == true` and `amount > 10000` → `REVIEW`. `bank_changed_30d` is Y. Amount 4950 is not greater than 10000. This REVIEW rule does not fire on the single invoice.

From `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`:

`INV-1003: PROCESS - under threshold.`

The reason line does not name 5000 or 10000.

### Approval matrix sitting next to the same amount band

From `05_procure_to_pay_exception_repo_1_0/06_governed_decisioning/approval_matrix.csv`:

`5000,AP_SUPERVISOR`

The matrix does not say whether 4950 needs that role. INV-1003 still stored `PROCESS` and status `APPROVED`.

P2P-04 Non-PO exception review, owner Procurement, status Inconsistent. Path: `control_matrix.csv`.

### What a reader now knows

1. U22 changed V-311 bank account from XXXX1122 to XXXX9988 and U22 approved that change at 2026-08-11T13:44:00. Path: `vendor_master_changes.csv`.
2. The next day INV-1003 arrived with empty PO, amount 4950 USD, `bank_changed_30d=Y`, approver U22. Path: `invoices.csv`.
3. The running rule stored `NON_PO_UNDER_5000` and `PROCESS`. Path: `processing_log.txt`.
4. The audit line for INV-1003 is `PROCESS`. It does not link CH-88. Path: `audit_extract.log`.

INV-1003 status is `APPROVED`, not `PAID`. Payment has not been recorded on this row in `invoices.csv`.

---

## INV-1004

From `05_procure_to_pay_exception_repo_1_0/02_data_evidence/invoices.csv`:

`INV-1004,V-311,,4950,USD,U22,Y,APPROVED`

From `05_procure_to_pay_exception_repo_1_0/05_workflow_orchestration/processing_log.txt`:

`2026-08-12 11:16 INV-1004 rule=NON_PO_UNDER_5000 result=PROCESS`

From `05_procure_to_pay_exception_repo_1_0/07_explainability_review/sample_decisions.txt`:

`INV-1004: PROCESS - under threshold.`

INV-1004 is one minute after INV-1003. Same supplier V-311, empty PO, amount 4950, approver U22, `bank_changed_30d=Y`, status `APPROVED`.

Pair total: 4950 + 4950 = 9900. Path: `invoices.csv`.

`exception_rules.yaml` lists “no split-invoice aggregation” under `gaps`. Each row is under 5000, so `PROCESS` fires twice. Pair total 9900 is also under the bank-change REVIEW line `amount > 10000`.

`audit_extract.log` has no INV-1004 line.

`test_summary.md` lists split invoices under `Not tested`.

---

## CH-89

From `05_procure_to_pay_exception_repo_1_0/02_data_evidence/vendor_master_changes.csv`:

`CH-89,V-201,email,ap@vendor.example,accounts@vendor.example,U18,U19,2026-08-12T09:20:00`

| Field | Value |
|---|---|
| change_id | CH-89 |
| supplier | V-201 |
| field | email |
| old | ap@vendor.example |
| new | accounts@vendor.example |
| requested_by | U18 |
| approved_by | U19 |
| timestamp | 2026-08-12T09:20:00 |

Requester and approver are different people. This row sits next to CH-88 as the contrast case.

CH-89 is the same calendar day as the INV-1002 duplicate check at 12:01. Field is email, not bank_account. INV-1001 and INV-1002 store `bank_changed_30d=N`. Path: `invoices.csv`.

`audit_extract.log` has no CH-89 line.

---

## V-201 vs V201

From `05_procure_to_pay_exception_repo_1_0/02_data_evidence/supplier_aliases.csv`:

| supplier_id | name |
|---|---|
| V-201 | Alpha Industrial Supply |
| V201 | Alpha Industries Supply |
| V-311 | Nova Components |

`V-201` and `V201` differ by a hyphen. The names differ by `Industrial` vs `Industries`.

Invoice rows in this packet use `V-201` only. Path: `invoices.csv`.

`invoice_extraction.md` says supplier aliases cause duplicate misses. Path: `04_document_identity_compliance/invoice_extraction.md`.

`exception_rules.yaml` lists “no supplier alias normalization” under `gaps`.

`test_summary.md` lists supplier alias duplicate under `Not tested`.

A check that keys only on `V-201` can miss `V201`. No invoice in the packet uses `V201`. The alias file still stores the second id.

---

## Required numbers confirmed from source files

| Required number | Source value | Path |
|---|---|---|
| INV-1001 / INV-1002 supplier, PO, amount, status | V-201, PO-7001, 9800 USD, PAID | `02_data_evidence/invoices.csv` |
| INV-1003 / INV-1004 supplier, PO, amount, bank flag, status | V-311, empty PO, 4950 USD each, bank_changed_30d=Y, APPROVED | `02_data_evidence/invoices.csv` |
| Pair total | 9900 | 4950 + 4950 from `invoices.csv` |
| CH-88 | V-311 bank_account XXXX1122 → XXXX9988, U22 / U22, 2026-08-11T13:44:00 | `02_data_evidence/vendor_master_changes.csv` |
| CH-89 | V-201 email, U18 / U19 | `02_data_evidence/vendor_master_changes.csv` |
| Aliases | V-201, V201, V-311 | `02_data_evidence/supplier_aliases.csv` |
| Non-PO expedite | po == "" and amount < 5000 → PROCESS | `06_governed_decisioning/exception_rules.yaml` |
| Bank-change review | bank_changed_30d and amount > 10000 → REVIEW | `06_governed_decisioning/exception_rules.yaml` |
| Duplicate check | invoice_number_only; INV-1002 = NO_DUPLICATE | `05_workflow_orchestration/processing_log.txt` |
| Approval matrix | 5000 AP_SUPERVISOR, 10000 FINANCE_MANAGER, 50000 FINANCE_DIRECTOR | `06_governed_decisioning/approval_matrix.csv` |
| p2p-risk-2 accuracy / precision / recall / FPR | 0.94 / blank / blank / 0.24 | `03_detection_models/evaluation.csv` |
| p2p-risk-1 FPR | 0.18 | `03_detection_models/evaluation.csv` |
| P2P-05 | status Missing, owner TBD | `08_compliance_audit/control_matrix.csv` |
