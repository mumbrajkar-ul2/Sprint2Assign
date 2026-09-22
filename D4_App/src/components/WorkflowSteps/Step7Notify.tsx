import React, { useState } from 'react';
import { useP2P } from '../../context/P2PContext';
import {
  BellRing,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  RotateCw,
  HelpCircle,
} from 'lucide-react';

export const Step7Notify: React.FC = () => {
  const { currentCase, setStep, sendNotification, openContest, supplierAliases } = useP2P();

  const [notificationStatus, setNotificationStatus] = useState<{
    message: string;
    isIdempotentRetry: boolean;
  } | null>(null);

  const [showContestModal, setShowContestModal] = useState(false);
  const [contestActor, setContestActor] = useState('Vendor AP Desk (Alpha Industrial)');
  const [contestText, setContestText] = useState(
    'We dispute the duplicate holding flag. This invoice represents separate shipment deliverables under PO-7001 batch release 2.'
  );

  const alias = supplierAliases[currentCase.verify.supplier_id_canonical] || supplierAliases['V-201'];
  const idempotencyKey = `${currentCase.case_id}:notify`;

  const handleSendNotification = () => {
    const res = sendNotification();
    setNotificationStatus({
      message: res.message,
      isIdempotentRetry: res.isIdempotentRetry,
    });
  };

  const handleOpenContest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contestText.trim()) return;
    openContest(contestActor, contestText);
    setShowContestModal(false);
  };

  const isApproved = currentCase.decision.final_policy_outcome === 'APPROVE';

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              7
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 7: Notify</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              Notify Count: {currentCase.notify_count}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch governed decision payload to supplier contacts and internal stakeholders with idempotency guarantees.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('review')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Review</span>
          </button>
          <button
            onClick={() => setStep('pay')}
            disabled={!isApproved}
            className={`text-xs font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors ${
              isApproved
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
            title={!isApproved ? 'Payment is strictly locked unless outcome is APPROVE' : ''}
          >
            <span>Proceed to Payment Execution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Idempotent Notification Execution Feedback */}
      {notificationStatus && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
            notificationStatus.isIdempotentRetry
              ? 'bg-amber-950/40 border-amber-800 text-amber-200'
              : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notificationStatus.message}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 shrink-0">
            Notify Count: {currentCase.notify_count}
          </span>
        </div>
      )}

      {/* Main Grid: Notification Payload Preview + Idempotency Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payload Preview */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Notification Payload Envelope
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
              Idempotency Key: {idempotencyKey}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs text-slate-200">
            <div className="flex justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-500 font-sans">Recipient Contact:</span>
              <span className="text-white font-semibold">{alias.email}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-500 font-sans">Canonical Supplier:</span>
              <span>{alias.supplier_name} ({currentCase.verify.supplier_id_canonical})</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-500 font-sans">Invoice ID &amp; Amount:</span>
              <span className="text-emerald-400 font-bold">
                {currentCase.case_id} &bull; ${currentCase.extract.amount.toLocaleString()} {currentCase.extract.currency}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-500 font-sans">Bank Reference (Masked):</span>
              <span className="text-amber-300 font-bold flex items-center gap-1 font-sans">
                <Lock className="w-3 h-3 text-amber-400" />
                {alias.masked_bank} (Masked per privacy rule)
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-500 font-sans">Decision Outcome:</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                {currentCase.decision.final_policy_outcome}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-sans block mb-1">Reason Codes Attached:</span>
              <div className="flex flex-wrap gap-1">
                {currentCase.decision.reason_codes.map((rc) => (
                  <span key={rc} className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-[11px]">
                    {rc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-800 space-y-1">
            <strong className="text-slate-300 block">Bank Privacy Mandate (P2P-FR-049 &amp; P2P-FR-055):</strong>
            <p>
              Full account numbers and personal mailboxes are never transmitted or stored in the immutable WORM reference store. Masked tokens (e.g. {alias.masked_bank}) are utilized for supplier correspondence.
            </p>
          </div>
        </div>

        {/* Idempotency Controls & Supplier Dispute Options */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Idempotency Action
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clicking &quot;Send Notification&quot; multiple times is guaranteed safe by the <code>{idempotencyKey}</code> key. Subsequent calls return the existing record without dispatching a second notification.
            </p>

            <button
              onClick={handleSendNotification}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{currentCase.notify_count > 0 ? 'Retry / Verify Idempotent Notify' : 'Dispatch Notification'}</span>
            </button>
          </div>

          {/* Supplier Dispute / Contest Pathway (P2P-FR-050) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Supplier Contest Flow
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                P2P-FR-050
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If a supplier or AP analyst disputes a holding REVIEW delay or REJECT outcome, an official contest opens a second REVIEW on the case.
            </p>

            <button
              onClick={() => setShowContestModal(true)}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Dispute / Contest</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contest Modal */}
      {showContestModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Open Dispute / Contest (P2P-FR-050)</h3>
              <button
                onClick={() => setShowContestModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOpenContest} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Contesting Party Identity:</label>
                <input
                  type="text"
                  required
                  value={contestActor}
                  onChange={(e) => setContestActor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Contest Justification / Evidence:</label>
                <textarea
                  rows={3}
                  required
                  value={contestText}
                  onChange={(e) => setContestText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white"
                />
              </div>

              <p className="text-[11px] text-slate-400">
                Opening a contest reverts the case to <strong>IN_REVIEW</strong> and appends a linked dispute audit row.
              </p>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowContestModal(false)}
                  className="px-3 py-1.5 rounded text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold"
                >
                  Submit Contest &amp; Re-Open Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
