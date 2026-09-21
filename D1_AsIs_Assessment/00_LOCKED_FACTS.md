# Locked facts

These facts stay fixed for this assignment. Later work uses them unless a source file in Repo 1.0 proves one of them wrong.

This file does not add an amount limit. This file does not name a policy owner.

| # | Locked fact |
|---|---|
| Event | A supplier invoice that may lead to payment |
| Objects | Supplier, PO, goods receipt, invoice, bank account, requester, approver |
| Irreversible action | Payment (`PAID` on INV-1001 and INV-1002) |
| Packet type | Messy estate of files. Assessment first. |
| Hand-back | D1, D2, D3, D4, presentation |
| Harm | Company if a bad pay goes out. Supplier if a false block misses the SLA. |
| Decision-time facts | Invoice id, supplier id, PO presence, amount, currency, approver, `bank_changed_30d`, named rule and model versions |
| Scorer down | Unknown in Repo 1.0. Later design: REVIEW and unscored |
| Outcomes | APPROVE / REVIEW / REJECT (trainer asked for these names) |
| C.3 method | Messy estate, assessment first. Inherited-repo forensic pass. Do not edit Repo 1.0 |

## What each row means

**Event.** Finance is looking at one supplier invoice. The question is whether that invoice can go on to payment.

**Objects.** The people and records in that decision are the supplier, the purchase order (PO), the goods receipt, the invoice, the bank account, the requester, and the approver. A purchase order is the company’s buy record. A goods receipt is the record that the goods arrived.

**Irreversible action.** Payment cannot be undone. In the inherited files, invoices INV-1001 and INV-1002 already have status `PAID`.

**Packet type.** The starting pack is a messy set of files. You read and assess those files first. You do not treat them as the finished design.

**Hand-back.** You must produce four deliverables and a presentation. D1 is the As-Is reading of Repo 1.0. D2 is Repo 2.0. D3 is the Product Requirements Document. D4 is the working application.

**Harm.** A wrong pay-out can cost the company. A wrong block can delay a supplier past the service-level agreement (SLA). An SLA is the promised time to handle the invoice.

**Decision-time facts.** The facts that must be known when Finance decides are: invoice id, supplier id, whether a PO exists, amount, currency, approver, whether the bank account changed in the last 30 days (`bank_changed_30d`), and the named rule and model versions used.

**Scorer down.** A scorer is the model that gives a risk score. Repo 1.0 does not say what to do if that model is down. Write that as Unknown. Later design must send the case to REVIEW and leave it unscored.

**Outcomes.** The trainer asked for these decision names: APPROVE, REVIEW, and REJECT.

**C.3 method.** C.3 is the work-method choice from the Sprint 2 learnings guide. This packet is a messy estate. Assessment comes first. The repo is inherited, so you do a forensic pass: you inspect the files as evidence. You do not edit Repo 1.0.
