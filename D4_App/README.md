# Deliverable 4 — Procure-to-Pay payment control

Shared-services staff decide whether a supplier invoice can go on to payment. The running app shows three outcomes: `APPROVE`, `REVIEW`, and `REJECT`. The header banner says `No "PROCESS"`.

Evidence for the 22 Sep 2026 click-through:

- [DEMO_SCRIPT.md](DEMO_SCRIPT.md) — minute-by-minute clicks
- [TEST_EVIDENCE.md](TEST_EVIDENCE.md) — expected, observed, PASS/FAIL
- [SIDE_EFFECT_COUNTER.md](SIDE_EFFECT_COUNTER.md) — Pay and Notify counts
- [Documentation/SPINE_IMPLEMENTATION.md](Documentation/SPINE_IMPLEMENTATION.md) — how the code maps to the ten runbook steps

## Where it ran

| Item | Value |
|---|---|
| Platform | Google AI Studio Build |
| Studio URL | https://aistudio.google.com/apps/4d381f01-eadc-4c67-bc79-5a3f55eb5e53?project=gen-lang-client-0889107005&showAssistant=true&showPreview=true&fullscreenApplet=true |
| What that URL did in this session | Google sign-in blocked the hosted page. The click evidence is from the local run. |
| Local URL | http://localhost:3000 |
| PRD version | D3a (`D3_PRD/PRD.md`). The app footer showed Rule Pack D3a. |

## Versions the UI showed

| Version | Where it appeared |
|---|---|
| Model `p2p-risk-2` | Footer on every opened screen. Detect and Case History. |
| Rule pack `p2p-rules-v2.0` | Score + Decide. Case History after the INV-1003 disagree click. |
| Rule Pack D3a | Footer text, together with the model version. |
| Extractor `ocr-v2.1` | Extract on INV-1002. The confidence percents on that screen had no honesty badge. |

## Screens this session confirmed

Opened and described in `DEMO_SCRIPT.md`:

1. Ingest
2. Extract
3. Verify
4. Detect
5. Score + Decide
6. Review
7. Notify
8. Pay
9. Case History & Rebuild
10. WORM Reference Store
11. Model Governance & Metrics

Visible and not opened. Page bodies stay unconfirmed:

- Escalation Events (badge showed 3)
- Acceptance Test Suite (AC-001..AC-038)

## Run the same local app

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. Start the app: `npm run dev`
4. Open `http://localhost:3000`.

The hosted Studio URL above still asks for a Google account. Use the local URL when you need the screens this evidence describes.
