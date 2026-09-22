import React, { useState, useEffect } from 'react';
import { useP2P } from '../../context/P2PContext';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Send,
  FileCheck,
  Info,
} from 'lucide-react';
import { Outcome, ReasonCode } from '../../types';

export const Step6Review: React.FC = () => {
  const { currentCase, setStep, submitReview, reviewerName, setReviewerName } = useP2P();

  const [notes, setNotes] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome>(
    currentCase.decision.recommended_outcome === 'APPROVE' ? 'APPROVE' : 'REJECT'
  );
  const [dispositionMode, setDispositionMode] = useState<'agree' | 'disagree' | 'override'>('agree');
  const [disagreeReason, setDisagreeReason] = useState<ReasonCode>('POLICY_REVIEW');
  const [errorMessage, setErrorMessage] = useState('');
  const [secondsElapsed, setSecondsElapsed] = useState(14);

  // Review timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isAlreadyReviewed = currentCase.review !== undefined;

  const handleSubmit = (mode: 'agree' | 'disagree' | 'override', targetOutcome: Outcome) => {
    if (!reviewerName.trim()) {
      setErrorMessage('Reviewer account name is required by PRD P2P-FR-003.');
      return;
    }

    setErrorMessage('');
    const additionalReasons: ReasonCode[] = [];
    if (mode === 'disagree') {
      additionalReasons.push(disagreeReason);
    }

    const success = submitReview(mode, targetOutcome, reviewerName, notes, additionalReasons);
    if (success) {
      setStep('notify');
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              6
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 6: Review (Human Queue)</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                isAlreadyReviewed
                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}
            >
              Queue Status: {isAlreadyReviewed ? 'REVIEWED & CLOSED' : 'AWAITING NAMED REVIEWER'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Human-in-the-loop review queue. Equal-weight action controls. Reviewer account identity is strictly mandatory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('score')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Score</span>
          </button>
          <button
            onClick={() => setStep('notify')}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Proceed to Notify</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Review Banner with Timer */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300">
            Active Review Session Time: <strong className="font-mono text-white">{secondsElapsed}s</strong>
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Persist and resume active. No blocking spinners.</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Recommended:</span>
          <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
            {currentCase.decision.recommended_outcome}
          </span>
        </div>
      </div>

      {/* Reviewer Completed Information Card (if already closed) */}
      {isAlreadyReviewed && (
        <div className="p-4 bg-blue-950/30 border border-blue-800/80 rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Prior Review Record Logged
            </span>
            <span className="font-mono text-slate-400 text-[11px]">{currentCase.review?.reviewed_at}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-slate-300 pt-1">
            <div>
              Reviewer: <strong className="text-white">{currentCase.review?.reviewer_id}</strong>
            </div>
            <div>
              Disposition: <strong className="text-amber-300 uppercase">{currentCase.review?.disposition}</strong>
            </div>
            <div>
              Final Outcome: <strong className="text-emerald-300 uppercase">{currentCase.review?.final_outcome}</strong>
            </div>
          </div>
          {currentCase.review?.notes && (
            <p className="text-slate-300 text-xs italic bg-slate-950/60 p-2.5 rounded border border-slate-800">
              &quot;{currentCase.review.notes}&quot;
            </p>
          )}
        </div>
      )}

      {/* Review Evidence Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evidence Column */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Verified Case Evidence Package
            </h3>

            <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Invoice ID:</span>
                <span className="text-white font-bold">{currentCase.case_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Supplier:</span>
                <span className="text-slate-200">
                  {currentCase.extract.supplier_name_raw} ({currentCase.verify.supplier_id_canonical})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Amount:</span>
                <span className="text-emerald-400 font-bold">
                  ${currentCase.extract.amount.toLocaleString()} {currentCase.extract.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">PO Number:</span>
                <span className="text-slate-200">
                  {currentCase.extract.po || <em className="text-amber-400 font-sans">Non-PO</em>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Bank Changed 30d:</span>
                <span className="text-amber-300 font-bold">{currentCase.extract.bank_changed_30d}</span>
              </div>
              {currentCase.verify.linked_change_ids.length > 0 && (
                <div className="flex justify-between text-rose-300">
                  <span className="text-slate-500 font-sans">Linked Changes:</span>
                  <span className="font-bold">{currentCase.verify.linked_change_ids.join(', ')}</span>
                </div>
              )}
              {currentCase.detect.sibling_invoice_ids.length > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span className="text-slate-500 font-sans">Sibling Split Pair:</span>
                  <span className="font-bold">
                    {currentCase.detect.sibling_invoice_ids.join(', ')} (Sum: ${currentCase.detect.sibling_amount_sum})
                  </span>
                </div>
              )}
              {currentCase.detect.duplicate_prior_case_id && (
                <div className="flex justify-between text-rose-300">
                  <span className="text-slate-500 font-sans">Duplicate Of:</span>
                  <span className="font-bold">{currentCase.detect.duplicate_prior_case_id}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Model Anomaly Rank:</span>
                <span className="text-indigo-300">
                  {currentCase.detect.anomaly_rank || 'UNSCORED (Scorer Down)'}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <strong className="text-slate-400 block mb-1">Governed Decision Rationale:</strong>
              <p className="leading-relaxed">{currentCase.decision.rationale_paragraph}</p>
            </div>
          </div>
        </div>

        {/* Human Action Controls: Equal Weight Agree, Disagree, Override (P2P-FR-048) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Human Reviewer Authorization (Equal-Weight Controls)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              P2P-FR-048
            </span>
          </div>

          {/* Mandatory Reviewer Account Input */}
          <div className="space-y-1 text-xs">
            <label className="text-slate-300 font-medium block">
              Reviewer Name / User ID <span className="text-rose-400">*</span>:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins (AP Lead)"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:ring-1 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-slate-400">
              A named person owns every REVIEW. Model never authorizes payment.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-lg text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Review Notes Input */}
          <div className="space-y-1 text-xs">
            <label className="text-slate-300 font-medium block">Reviewer Findings / Audit Note:</label>
            <textarea
              rows={3}
              placeholder="Record operational justification for decision..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Equal-Weight Action Buttons (Prompt & PRD: Disagree is as easy to click as Agree) */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              Choose Action (Equal Weight):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Option 1: Agree */}
              <button
                type="button"
                onClick={() =>
                  handleSubmit('agree', currentCase.decision.recommended_outcome)
                }
                className="p-3 rounded-lg border text-left bg-slate-800/80 hover:bg-slate-800 hover:border-emerald-500/60 border-slate-700 transition-all group"
              >
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Agree {currentCase.decision.recommended_outcome}</span>
                </div>
                <p className="text-[11px] text-slate-400 group-hover:text-slate-300">
                  Accept policy recommendation of {currentCase.decision.recommended_outcome}.
                </p>
              </button>

              {/* Option 2: Disagree (Equal visual weight) */}
              <button
                type="button"
                onClick={() => {
                  const opposite =
                    currentCase.decision.recommended_outcome === 'APPROVE' ? 'REJECT' : 'APPROVE';
                  handleSubmit('disagree', opposite);
                }}
                className="p-3 rounded-lg border text-left bg-slate-800/80 hover:bg-slate-800 hover:border-amber-500/60 border-slate-700 transition-all group"
              >
                <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs mb-1">
                  <XCircle className="w-4 h-4" />
                  <span>
                    Disagree &amp; Set{' '}
                    {currentCase.decision.recommended_outcome === 'APPROVE' ? 'REJECT' : 'APPROVE'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 group-hover:text-slate-300">
                  Contest recommendation and enforce opposite outcome.
                </p>
              </button>

              {/* Option 3: Override (Equal visual weight) */}
              <button
                type="button"
                onClick={() => handleSubmit('override', 'APPROVE')}
                className="p-3 rounded-lg border text-left bg-slate-800/80 hover:bg-slate-800 hover:border-indigo-500/60 border-slate-700 transition-all group"
              >
                <div className="flex items-center gap-1.5 font-bold text-indigo-400 text-xs mb-1">
                  <UserCheck className="w-4 h-4" />
                  <span>Manager Override</span>
                </div>
                <p className="text-[11px] text-slate-400 group-hover:text-slate-300">
                  Force APPROVE under authorized control override.
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
