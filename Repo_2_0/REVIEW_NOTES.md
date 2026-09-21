# S2a review notes — Repo 2.0 draft

Reviewed against the S2a prompt, Execution Plan D2, Project Intent Appendix B and C, and the D1 registers. C.8 was not opened for this file.

These bullets are defects and open questions on the generated pack. They are not a C.8 table.

## What passed the S2a done test

- A reviewer can map each of the ten spine steps to a file. `README.md` holds the map.
- `PROCESS` is not a To-Be outcome. Trainer names are `APPROVE`, `REVIEW`, `REJECT` only.
- Written policy picks the outcome. The model ranks. The model does not pay.
- Scorer failure goes to `REVIEW` and stores unscored. No `score = 0` as a safe default.
- Accuracy 0.94 is copied as a source cell in `03_detection_models.md`. It is not the operating headline. Headline cells are precision, recall, false-positive rate, catch rate, and later PR-AUC.
- Locked D1 numbers are cited: INV-1001 / INV-1002 9800 `PAID`; INV-1003 / INV-1004 4950 + 4950 = 9900; CH-88 U22 / U22; `V-201` / `V201`; `invoice_number_only` miss; P2P-05 Missing.
- New amount lines are `THRESHOLD_UNSET`. 5000 and 10000 stay As-Is evidence.
- D1 gaps stay visible. `TRACEABILITY.md` marks closed-as-design vs still open (owners TBD, Unknown feeds, blank v2 precision / recall).
- P2P list is covered: duplicate, alias, pricing (honest Unknown catalog), same-user bank change, non-PO bypass, split around As-Is 5000, SoD, vendor-change link, human REVIEW a person can finish.
- Honesty classes are defined. Packet amounts and `evaluation.csv` cells are labelled PRECOMPUTED. Packet catch-rate is EDUCATIONAL.
- Repo 1.0 and `D1_AsIs_Assessment` were not edited in this generate step.

## Defects to fix (S2b or a short edit)

- **APPROVE is unreachable as written.** `06_governed_decisioning.md` step 8 sends every scored case with no other flag to `REVIEW` (`R-SCORED-ONLY`). Step 2 sends every unscored case to `REVIEW` (`R-UNSCORED`). Step 9 then says APPROVE only if the scorer ran. Those three lines cannot be true together. A clean invoice cannot reach APPROVE.
- **R-GR blocks the same clean path.** Goods receipt is Missing in the packet. `R-GR` sends every PO invoice to `REVIEW` until an ADR waives it. Combined with `R-NONPO` (every empty PO → REVIEW), every packet invoice is REVIEW. Wave 1 asked to send bank-change-plus-split cases to a person. It did not ask to retire APPROVE.
- **INV-1001 row disagrees with those rules.** `06_governed_decisioning.md` says INV-1001 is “APPROVE possible” if it arrives first. INV-1001 has PO-7001 and no goods-receipt row. `R-GR` would send it to REVIEW. `10_production_readiness.md` T-FN-01 also expects a valid PO invoice to reach APPROVE. Pick one path and write it in both files.
- **Decide vs policy disagree on REJECT.** `05_workflow.md` says Decide emits APPROVE, REVIEW, or REJECT. `06_governed_decisioning.md` says auto-REJECT stays unset until a D3 ADR, and exception flags produce REVIEW plus a recommendation. Align Decide to REVIEW-plus-recommendation until that ADR exists.
- **Notify path disagrees across files.** `05_workflow.md` table says Notify runs after Review or REJECT. The same file later says Notify also runs for APPROVE. `02_case_data_evidence.md` says notify after REVIEW or REJECT only. `07_explainability_review.md` says notify after REVIEW, REJECT, and APPROVE. Write one order: APPROVE → audit → notify → named person pays; REVIEW → persist → person → notify; REJECT → notify. No pay.
- **Sibling “decision window” is an unset limit that was never labelled.** `02_case_data_evidence.md` uses “same decision window” for `sibling_invoice_ids`. No `THRESHOLD_UNSET` sits on that window. Without a bound, every later V-311 invoice could join INV-1003. Mark the window `THRESHOLD_UNSET`, or bind siblings to the named packet pair (INV-1003 and INV-1004) until D3.
- **Duplicate match omits currency.** Locked decision-time facts include currency. `D1_AsIs_Assessment/00_LOCKED_FACTS.md`. R-DUP and T-FN-02 use supplier + PO + amount only. Add currency to the match key, or write why USD is assumed.
- **Alias join and name-mismatch fight.** `04_document_identity_compliance.md` joins `V-201` and `V201`, then sends a name mismatch to REVIEW. The alias file stores Alpha Industrial Supply vs Alpha Industries Supply. That name pair would REVIEW every joined invoice. Treat the two name strings as the known alias pair, or send REVIEW only when a third name appears.
- **REVIEW queue owner is unclear when several flags fire.** `01_decision_risk_boundary.md` routes duplicate to AP, non-PO to Procurement, SoD to Finance Controls, bank change to Master Data. INV-1003 fires non-PO, bank-change, and SoD together. No precedence names the person who owns that queue item. Add a queue-owner order, or say one named REVIEW owner from the D3 ADR owns every item.
- **Anomalous pricing has no Detect flag.** File 03 is honest that no price catalog exists. File 05 Detect list has duplicate, split, SoD, alias, non-PO, bank-change. It has no pricing flag. Add `price_catalog=Unknown` on the case, or say Detect does not emit a price flag until a catalog exists. Keep high rank → REVIEW only when a rank exists.
- **Idempotency example uses a To-Be REVIEW case as a payment key.** `05_workflow.md` shows `INV-1002:payment`. To-Be INV-1002 is REVIEW, not pay. Use a later APPROVE case, or label that row as the inherited `PAID` replay only.

## Soft issues (not a fail of the done test)

- CR-REG-01 asks Legal. Legal is not a named owner in `control_matrix.csv`. The ask is a change request, not a new payment owner. Keep it labelled as Unknown until someone answers.
- `05_workflow.md` escalates a REVIEW timeout to “the REVIEW owner’s manager.” That manager is not in Repo 1.0. Hold the case and alert the named REVIEW owner. Do not invent a manager role.
- `R-NONPO` is wider than Wave 1. Wave 1 is bank-change-plus-split. Sending every empty-PO invoice to REVIEW is a conservative default. Keep it only if the file says it is temporary until the C-01 ADR. Procurement and AP_SUPERVISOR still must sign that ADR.
- `SIMULATED` is defined in `README.md` and unused. Fine for D2. D4 must label stand-in scores if no live scorer runs.
- Feature attribution in `07_explainability_review.md` lists card features (`supplier age`, `approval count`) that are Missing on `invoices.csv`. File 03 already names that limit. The review screen must show Missing, not a made-up contribution.
- `09_ai_risk_security_observability.md` still mentions accuracy 0.94 in a “do not lead with” line. The operating table already leads with precision, recall, and false-positive trend. Drop the 0.94 clause in S2b if C.8 treats any 94% mention as a headline risk.

## File-by-file (required S2a sections)

- `01_decision_risk_boundary.md` — Has decision, users, three outcomes, P2P scenarios, risk appetite, Unknown regulation plus CR-REG-01, prohibited automation, human-oversight points. Queue-owner clash on multi-flag cases is the defect.
- `02_case_data_evidence.md` — Has events, entities, identity, risk variables, labels, document fields, data-quality rules, lineage, evidence retained. Sibling window and notify-after-APPROVE are the defects.
- `03_detection_models.md` — Four-invoice limit is stated. Evaluation plan has the required measures. Version compare uses only `evaluation.csv`. Training is a later job. No accuracy headline. Pass.
- `04_document_identity_compliance.md` — Extract fields, identity checks, confidence, sanctions / PEP / address Unknown, uncertain → REVIEW. Alias vs name-mismatch is the defect.
- `05_workflow.md` — Eight named steps, parallel checks, persisted state, reversible retries, timeouts as `THRESHOLD_UNSET`, fallback, compensating extract row, payment and notify keyed. Decide/REJECT and Notify order are the defects.
- `06_governed_decisioning.md` — Fusion table, `THRESHOLD_UNSET`, human in the loop, model cannot pay. Dead APPROVE path and INV-1001 row are the defects.
- `07_explainability_review.md` — Reason codes, rationale paragraph, attribution / counterfactual, reviewer evidence, supplier notify, contest path, equal-weight Agree / Disagree / Override. Pass for the spine list. INV-1003 script is usable.
- `08_compliance_audit.md` — Velocity Partial from 11:15 / 11:16. Geography Unknown. Escalation events. Audit fields include model, rules, prompts, states, humans. Write-first. WORM holds references. Identity in a normal store. P2P-05 owner still TBD. Pass.
- `09_ai_risk_security_observability.md` — Owner Missing until D3, model card, validation evidence, change approvals, access, drift investigate-first, false-positive trend, data quality, audit completeness, latency, failure rates, control alerts. Shared key and SoD overlap addressed. Pass, with the 0.94 wording note.
- `10_production_readiness.md` — Functional, integration, adverse, failure, compliance, performance, fallback, human-review, defect handling, governance pack, CI/CD, IaC, gates, rollback, hardening, handover. Omitted Repo 1.0 tests are listed (alias, split, same-user, bank-then-pay, model outage, queue outage, rollback). T-FN-01 must match the real APPROVE rule after the file 06 fix. Peak volume not invented.

## Still open on purpose (keep visible)

- Regulatory list, sanctions / PEP / address, geography feed: Unknown.
- Goods-receipt feed: Missing.
- REVIEW person, payer, model owner, data owner, P2P-05 owner: Missing or TBD.
- Amount, timeout, retention, contest days: `THRESHOLD_UNSET`.
- v2 precision and recall: blank.
- Peak-volume number: not invented.

## Next step

Write `C8_CHECK.md` in a new chat after this file. Fix the dead APPROVE path and the file disagreements first if C.8 does not already catch them.
