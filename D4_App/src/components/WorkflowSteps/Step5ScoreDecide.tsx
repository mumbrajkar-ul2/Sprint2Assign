import React from 'react';
import { useP2P } from '../../context/P2PContext';
import {
  Gavel,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  FileCheck,
  Shield,
  Layers,
} from 'lucide-react';

export const Step5ScoreDecide: React.FC = () => {
  const { currentCase, setStep } = useP2P();

  const decision = currentCase.decision;
  const isApproved = decision.final_policy_outcome === 'APPROVE';
  const isReview = decision.final_policy_outcome === 'REVIEW';
  const isReject = decision.final_policy_outcome === 'REJECT';

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              5
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 5: Score &amp; Decide</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              Rule Pack: {decision.rule_version}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Apply deterministic written policy rules based on verified evidence and uncalibrated statistical risk rank.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('detect')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Detect</span>
          </button>
          <button
            onClick={() => setStep('review')}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Proceed to Review Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Decision Summary Hero Box */}
      <div
        className={`rounded-xl p-5 border shadow-sm ${
          isApproved
            ? 'bg-emerald-950/20 border-emerald-800/80'
            : isReview
            ? 'bg-amber-950/20 border-amber-800/80'
            : 'bg-rose-950/20 border-rose-800/80'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Governed Policy Outcome
            </span>
            <div className="flex items-center gap-3">
              <span
                className={`text-2xl font-mono font-extrabold px-3 py-1 rounded-lg border ${
                  isApproved
                    ? 'bg-emerald-900/80 text-emerald-200 border-emerald-600'
                    : isReview
                    ? 'bg-amber-900/80 text-amber-200 border-amber-600'
                    : 'bg-rose-900/80 text-rose-200 border-rose-600'
                }`}
              >
                {decision.final_policy_outcome}
              </span>
              <div className="text-xs text-slate-300">
                <div>
                  Recommended: <strong className="font-mono text-white">{decision.recommended_outcome}</strong>
                </div>
                <div className="text-[11px] text-slate-400">
                  {isReview && 'Exception flags held for human review (Until auto-REJECT ADR)'}
                  {isApproved && 'All checks clean; authorized for named human payment release'}
                </div>
              </div>
            </div>
          </div>

          {/* Fired Rules Badges */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Policy Rules Triggered:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {decision.rules_fired.length === 0 ? (
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  NONE (Clean PO Pathway)
                </span>
              ) : (
                decision.rules_fired.map((rule) => (
                  <span
                    key={rule}
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-700 shadow-sm"
                  >
                    {rule}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rationale Paragraph (P2P-FR-044) & Reason Codes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Official Rationale Paragraph Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Governed Rationale Paragraph (P2P-FR-044)</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
              {decision.rationale_paragraph}
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * Constructed directly from verified machine facts, canonical identities, and deterministic policy rule outputs.
            </p>
          </div>

          {/* Counterfactuals Card (P2P-FR-046) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>Policy Counterfactual Explanations (P2P-FR-046)</span>
            </div>
            <div className="space-y-2">
              {decision.counterfactuals.map((cf, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="font-mono text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span>{cf}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reason Codes & Precedence Sidebar */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Machine Reason Codes (P2P-FR-043)
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {decision.reason_codes.map((code) => (
                <span
                  key={code}
                  className="text-xs font-mono px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-700"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>

          {/* Precedence Hierarchy (P2P-FR-038) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Decide Precedence Order</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li className="text-rose-400 font-medium">Prohibited Automation Guardrail</li>
              <li>R-UNSCORED / R-EXTRACT (Review)</li>
              <li>R-SOD-BANK (Review &amp; Hold)</li>
              <li>R-DUP / R-ALIAS (Review / Rec Reject)</li>
              <li>R-BANK-SPLIT (Review / Rec Reject)</li>
              <li>R-NONPO (Review)</li>
              <li className="text-emerald-400 font-medium">Clean PO Pathway (APPROVE)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
