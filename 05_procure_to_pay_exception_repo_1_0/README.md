# Repo 1.0 - Brownfield As-Is Baseline

This repository is intentionally imperfect. It represents a real-world current-state enterprise environment, not a clean reference architecture.

## Participant instruction
Treat every artifact as evidence, not truth.

The repository may contain:
- contradictory business rules
- stale or missing documents
- broken identifiers
- weak or undocumented ownership
- incomplete model documentation
- inconsistent thresholds
- missing human-oversight controls
- brittle integrations and unsafe fallbacks
- poor auditability and evidence lineage
- incomplete security and access controls
- observability gaps
- untested failure modes
- unresolved technical debt

Do not assume the correct solution is already present in the repository.

Your later task is to use Prompt Engineering + Context Engineering with an LLM of your choice to transform this Repo 1.0 into a coherent Repo 2.0.

## Anchor: AI FDE 10-step spine
1. Frame the Decision, Risk & Regulatory Boundary
2. Engineer the Case, Data & Evidence Model
3. Build & Independently Evaluate Detection Models
4. Extract Documents + Verify Identity & Compliance Signals
5. Orchestrate the End-to-End Case Workflow
6. Combine AI + Rules into Governed Risk Decisioning
7. Make Decisions Explainable, Reviewable & Contestable
8. Embed Compliance Monitoring + Immutable Audit Evidence
9. Operationalize AI Risk, Security & Observability
10. Prove, Govern & Productionize the Complete AI Product

Repo 1.0 contains the problems. It does not contain the finished solution.

## Case
**Procure-to-Pay Exception & Payment-Control Challenge**

**Domain:** Enterprise ERP / Shared Services

**Central challenge:** Determine whether a supplier transaction can safely proceed to payment.
