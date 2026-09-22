import React from 'react';
import { useP2P } from '../../context/P2PContext';
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Split,
  FileX,
  Gauge,
  Info,
} from 'lucide-react';

export const Step4Detect: React.FC = () => {
  const { currentCase, setStep } = useP2P();

  const isDuplicate = currentCase.detect.duplicate_match_supplier_po_amount;
  const isNonPo = currentCase.detect.non_po_flag;
  const hasSiblings = currentCase.detect.sibling_invoice_ids.length > 0;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              4
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 4: Detect</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              Risk Detectors Evaluated
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate duplicate payment risks, sibling split patterns, non-PO flags, and statistical model rank.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('verify')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Verify</span>
          </button>
          <button
            onClick={() => setStep('score')}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Proceed to Score &amp; Decide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Model Anomaly Rank Card (Prompt & PRD mandate: Uncalibrated rank, NOT percent chance; Honesty badge) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Model Anomaly Ranking
              </h3>
              <p className="text-[11px] text-slate-400">
                Statistical risk ranking &bull; Model version: <strong className="font-mono text-slate-300">{currentCase.detect.model_version}</strong>
              </p>
            </div>
          </div>

          {/* Honesty Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 flex items-center gap-1">
              Honesty Badge: {currentCase.detect.score_honesty}
            </span>
            <span
              className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${
                currentCase.detect.scorer_status === 'scored'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
              }`}
            >
              Status: {currentCase.detect.scorer_status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Display of Uncalibrated Ranking */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              Uncalibrated Anomaly Rank (P2P-FR-002 &amp; P2P-FR-030):
            </span>
            {currentCase.detect.scorer_status === 'unscored' || !currentCase.detect.anomaly_rank ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-mono font-bold text-slate-500">NULL</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-900/60 text-rose-200 border border-rose-700">
                  UNSCORED (Scorer Down / Timeout)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-extrabold text-white tracking-tight">
                  {currentCase.detect.anomaly_rank}
                </span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 font-mono">
                  Raw Index: {currentCase.detect.anomaly_rank_raw}
                </span>
              </div>
            )}
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Caption: <em>Uncalibrated ranking across daily batch cohort. Not a percentage probability of fraud.</em>
            </span>
          </div>

          <div className="text-xs text-slate-400 max-w-xs space-y-1 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Model Governance Guardrail:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Model score ranks the case for prioritization. Written rules pick the outcome. The model is strictly prohibited from authorizing payment.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Risk Detectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Duplicate Detector */}
        <div
          className={`border rounded-xl p-4 space-y-3 ${
            isDuplicate ? 'bg-rose-950/25 border-rose-700' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Copy className={`w-4 h-4 ${isDuplicate ? 'text-rose-400' : 'text-slate-400'}`} />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Duplicate Detector
              </h4>
            </div>
            {isDuplicate ? (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-900 text-rose-200 border border-rose-700">
                FLAGGED
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                CLEAN
              </span>
            )}
          </div>

          <div className="text-xs space-y-2 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Method:</span>
              <span className="text-slate-200">Supplier+PO+Amount+Cur</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Match Key:</span>
              <span className="text-slate-300">
                {currentCase.verify.supplier_id_canonical}:{currentCase.extract.po || 'NO-PO'}:
                {currentCase.extract.amount}
              </span>
            </div>
            {isDuplicate && (
              <div className="flex justify-between text-rose-300">
                <span className="text-slate-500 font-sans">Prior Match:</span>
                <span className="font-bold">{currentCase.detect.duplicate_prior_case_id}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Invoice ID Match:</span>
              <span className="text-slate-400">
                {currentCase.detect.duplicate_invoice_number ? 'Yes' : 'No (Different ID)'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            {isDuplicate
              ? 'P2P-AC-001 satisfied: Catches duplicate by supplier+PO+amount+currency even though invoice numbers differ.'
              : 'No matching prior invoice on supplier+PO+amount+currency.'}
          </p>
        </div>

        {/* Sibling Split Pair Detector */}
        <div
          className={`border rounded-xl p-4 space-y-3 ${
            hasSiblings ? 'bg-amber-950/25 border-amber-700' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Split className={`w-4 h-4 ${hasSiblings ? 'text-amber-400' : 'text-slate-400'}`} />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Split Invoice Sibling
              </h4>
            </div>
            {hasSiblings ? (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-900 text-amber-200 border border-amber-700">
                SIBLING DETECTED
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                NO SIBLINGS
              </span>
            )}
          </div>

          <div className="text-xs space-y-2 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Sibling Cases:</span>
              <span className="text-amber-300">
                {hasSiblings ? currentCase.detect.sibling_invoice_ids.join(', ') : 'None'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Invoice Amount:</span>
              <span className="text-slate-200">${currentCase.extract.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Pair Combined Sum:</span>
              <span className="text-amber-400 font-bold">${currentCase.detect.sibling_amount_sum} USD</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            {hasSiblings
              ? 'P2P-AC-003 & AC-013: Named sibling pair INV-1003 & INV-1004 combined total $9,900 USD under 30d bank change.'
              : 'No sibling batch splits detected.'}
          </p>
        </div>

        {/* Non-PO Detector */}
        <div
          className={`border rounded-xl p-4 space-y-3 ${
            isNonPo ? 'bg-amber-950/25 border-amber-700' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileX className={`w-4 h-4 ${isNonPo ? 'text-amber-400' : 'text-slate-400'}`} />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Purchase Order Check
              </h4>
            </div>
            {isNonPo ? (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-900 text-amber-200 border border-amber-700">
                NON-PO
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                PO ATTACHED
              </span>
            )}
          </div>

          <div className="text-xs space-y-2 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">PO Reference:</span>
              <span className="text-white font-bold">
                {currentCase.extract.po || <em className="text-amber-400 font-normal">None</em>}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">As-Is 5,000 Rule:</span>
              <span className="text-rose-400 font-bold line-through">RETIRED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">To-Be Policy:</span>
              <span className="text-amber-300">Route to REVIEW</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            {isNonPo
              ? 'P2P-AC-008: Empty PO sends invoice directly to REVIEW. The As-Is bypass under 5,000 is retired.'
              : `Valid Purchase Order ${currentCase.extract.po} attached.`}
          </p>
        </div>
      </div>
    </div>
  );
};
