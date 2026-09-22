import React, { useState } from 'react';
import { useP2P } from '../../context/P2PContext';
import {
  DollarSign,
  Lock,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  FileLock2,
  FileText,
  RotateCcw,
} from 'lucide-react';

export const Step8Pay: React.FC = () => {
  const {
    currentCase,
    setStep,
    executePayment,
    payerName,
    setPayerName,
    auditFailureSimulation,
    toggleAuditFailure,
    auditLogs,
    wormStore,
  } = useP2P();

  const [paymentFeedback, setPaymentFeedback] = useState<{
    success: boolean;
    message: string;
    isIdempotentRetry: boolean;
  } | null>(null);

  const isApproved = currentCase.decision.final_policy_outcome === 'APPROVE';
  const isPaid = currentCase.state === 'PAID' && currentCase.payment !== undefined;
  const idempotencyKey = `${currentCase.case_id}:payment`;

  const handlePayClick = () => {
    if (!payerName.trim()) {
      setPaymentFeedback({
        success: false,
        message: 'A named human payer is required to authorize disbursement (P2P-FR-004).',
        isIdempotentRetry: false,
      });
      return;
    }

    const res = executePayment(payerName);
    setPaymentFeedback(res);
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              8
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 8: Payment Execution</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                isPaid
                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                  : isApproved
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              Status: {isPaid ? 'PAID & SETTLED' : isApproved ? 'AUTHORIZED TO PAY' : 'PAYMENT LOCKED'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Irreversible disbursement release. Strictly gated to APPROVE outcomes with audit-first persistence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('notify')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Notify</span>
          </button>
        </div>
      </div>

      {/* Outcome Guardrail Alert if NOT Approved */}
      {!isApproved && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/80 rounded-xl text-xs text-rose-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-200">
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
            <span>CRITICAL GOVERNANCE LOCK: PAYMENT FORBIDDEN</span>
          </div>
          <p className="leading-relaxed">
            Invoice <strong>{currentCase.case_id}</strong> is in outcome state{' '}
            <strong className="font-mono text-white underline">{currentCase.decision.final_policy_outcome}</strong>.
            Under PRD mandates (P2P-FR-001, P2P-FR-051, and P2P-AC-021), payment can <em>only</em> be executed when the policy outcome is <strong>APPROVE</strong>. Payment keys are not consumed on REVIEW or REJECT cases.
          </p>
        </div>
      )}

      {/* Payment Feedback Banner */}
      {paymentFeedback && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 ${
            paymentFeedback.success
              ? paymentFeedback.isIdempotentRetry
                ? 'bg-blue-950/40 border-blue-800 text-blue-200'
                : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
              : 'bg-rose-950/40 border-rose-800 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {paymentFeedback.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{paymentFeedback.message}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 shrink-0">
            Payment Count: {currentCase.payment_count}
          </span>
        </div>
      )}

      {/* Main Payment Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Audit-First Workflow Visualization */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Audit-First Write Protocol (P2P-FR-053)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
              Irreversible Step
            </span>
          </div>

          {/* Sequential 4-Step Audit-First Protocol Flow */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-500/40 mt-0.5">
                1
              </span>
              <div className="space-y-0.5">
                <span className="text-white font-semibold block">Application Writes Audit Row</span>
                <span className="text-[11px] text-slate-400 font-sans block">
                  Intended to_state=PAID, payer ID, rule version, model version, and reason codes persisted.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-cyan-500/40 mt-0.5">
                2
              </span>
              <div className="space-y-0.5">
                <span className="text-white font-semibold block">WORM Reference Locking</span>
                <span className="text-[11px] text-slate-400 font-sans block">
                  Write references (audit_row_id, document hashes, inputs_hash) into append-only WORM store. Refuses overwrite.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-indigo-500/40 mt-0.5">
                3
              </span>
              <div className="space-y-0.5">
                <span className="text-white font-semibold block">State Transition to PAID</span>
                <span className="text-[11px] text-slate-400 font-sans block">
                  Only after Step 1 &amp; Step 2 succeed may the invoice status transition to PAID.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-500/40 mt-0.5">
                4
              </span>
              <div className="space-y-0.5">
                <span className="text-white font-semibold block">Idempotent Settlement</span>
                <span className="text-[11px] text-slate-400 font-sans block">
                  Payment executed under key <strong className="text-slate-200">{idempotencyKey}</strong>. Payment count stays 1.
                </span>
              </div>
            </div>
          </div>

          {/* Paid Invoice Confirmation Details */}
          {isPaid && (
            <div className="p-4 bg-emerald-950/30 border border-emerald-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Payment Executed &amp; Settled
                </span>
                <span className="font-mono text-slate-400 text-[11px]">{currentCase.payment?.paid_at}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-slate-300 pt-1">
                <div>
                  Payer: <strong className="text-white block">{currentCase.payment?.payer_id}</strong>
                </div>
                <div>
                  Amount: <strong className="text-emerald-300 block">${currentCase.payment?.amount} {currentCase.payment?.currency}</strong>
                </div>
                <div>
                  Payment Count: <strong className="text-white block">{currentCase.payment_count}</strong>
                </div>
                <div>
                  Audit ID: <strong className="text-slate-400 block">{currentCase.payment?.audit_row_id}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Execution Controls & Simulation */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Payment Authorization
            </h3>

            {/* Named Payer Input */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-300 font-medium block">
                Authorized Payer Account <span className="text-rose-400">*</span>:
              </label>
              <input
                type="text"
                required
                disabled={isPaid}
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:ring-1 focus:ring-emerald-500 disabled:opacity-60"
              />
              <p className="text-[11px] text-slate-400">
                P2P-FR-004: A named human releases payment. AI does not pay.
              </p>
            </div>

            {/* Disbursement Details */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Payee:</span>
                <span className="text-white font-semibold">{currentCase.verify.supplier_id_canonical}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Amount:</span>
                <span className="text-emerald-400 font-bold">
                  ${currentCase.extract.amount.toLocaleString()} {currentCase.extract.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Payment Count:</span>
                <span className="text-white font-bold">{currentCase.payment_count}</span>
              </div>
            </div>

            {/* Execute Payment Button */}
            <button
              onClick={handlePayClick}
              disabled={!isApproved}
              className={`w-full py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                isApproved
                  ? isPaid
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>
                {isPaid
                  ? 'Retry / Re-verify Idempotent Payment'
                  : `Authorize & Pay $${currentCase.extract.amount.toLocaleString()} USD`}
              </span>
            </button>
          </div>

          {/* Audit Write Failure Simulation Box (PRD P2P-AC-019 & P2P-FR-053) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                P2P-AC-019 Control Test
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                P2P-05
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test compliance rule P2P-FR-053: If the audit row fails to write, payment state change is aborted and <strong>ESC_P2P05</strong> fires.
            </p>

            <button
              onClick={() => toggleAuditFailure()}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                auditFailureSimulation
                  ? 'bg-rose-950 text-rose-300 border-rose-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Audit Write Failure: {auditFailureSimulation ? 'SIMULATION ON' : 'SIMULATION OFF'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
