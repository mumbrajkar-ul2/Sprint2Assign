import React, { useState } from 'react';
import { useP2P } from '../../context/P2PContext';
import { History, ShieldCheck, CheckCircle2, Clock, FileText, ArrowRight, Database } from 'lucide-react';

export const CaseHistoryView: React.FC = () => {
  const { cases, auditLogs, currentCaseId, selectCase } = useP2P();
  const [selectedCaseId, setSelectedCaseId] = useState<string>(currentCaseId);

  const activeCase = cases[selectedCaseId] || cases[currentCaseId];

  // Filter audit rows for selected case, ordered newest first or chronological
  const caseAuditTrail = auditLogs
    .filter((row) => row.case_id === selectedCaseId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Case History &amp; Audit Rebuild</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              P2P-FR-054 &bull; P2P-AC-027
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rebuild any case years later from immutable audit rows: actor, from-state, to-state, score, reasons, model version, rule version, and linked changes.
          </p>
        </div>

        {/* Case Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="history-case-select" className="text-xs text-slate-400">Select Case to Rebuild:</label>
          <select
            id="history-case-select"
            value={selectedCaseId}
            onChange={(e) => {
              setSelectedCaseId(e.target.value);
              selectCase(e.target.value);
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-semibold focus:ring-1 focus:ring-emerald-500"
          >
            {Object.values(cases).map((c) => (
              <option key={c.case_id} value={c.case_id}>
                {c.case_id} &bull; {c.extract.supplier_id_raw} &bull; ${c.extract.amount}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reconstructed Case Summary Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Reconstructed File: {activeCase.case_id}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Current State:</span>
            <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              {activeCase.state}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block mb-0.5">Supplier:</span>
            <span className="text-slate-200 font-semibold">
              {activeCase.verify.supplier_id_canonical} ({activeCase.extract.supplier_name_raw})
            </span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Disbursement Amount:</span>
            <span className="text-emerald-400 font-bold">
              ${activeCase.extract.amount.toLocaleString()} {activeCase.extract.currency}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Linked Master Changes:</span>
            <span className="text-amber-300 font-semibold">
              {activeCase.verify.linked_change_ids.length > 0
                ? activeCase.verify.linked_change_ids.join(', ')
                : 'None'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Sibling Split Invoices:</span>
            <span className="text-slate-300 font-semibold">
              {activeCase.detect.sibling_invoice_ids.length > 0
                ? `${activeCase.detect.sibling_invoice_ids.join(', ')} (Sum: $${activeCase.detect.sibling_amount_sum})`
                : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Sequential Audit Trail Reconstruction */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Immutable Audit Row Trail ({caseAuditTrail.length} Recorded Rows)
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Append-Only &bull; Refuses Overwrite
          </span>
        </div>

        {caseAuditTrail.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 border border-dashed border-slate-800 rounded-xl text-slate-400 text-xs">
            No audit rows written yet for this case. Progress through the workflow steps to generate state transition audit rows.
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {caseAuditTrail.map((row, idx) => (
              <div
                key={row.audit_row_id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3 relative overflow-hidden"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 text-[10px] font-bold flex items-center justify-center border border-slate-700">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white">{row.audit_row_id}</span>
                    <span className="text-[10px] text-slate-400 px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">
                      Actor: {row.actor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{row.created_at}</span>
                  </div>
                </div>

                {/* State transition row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Transition:</span>
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="text-slate-400">{row.from_state}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-400">{row.to_state}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Outcome &amp; Score:</span>
                    <div className="text-slate-200">
                      <strong className="text-white">{row.outcome}</strong> &bull;{' '}
                      <span className="text-indigo-300 font-sans">
                        {row.anomaly_rank || 'UNSCORED (Scorer Down)'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Versions:</span>
                    <div className="text-slate-400 text-[11px]">
                      Model: {row.model_version} &bull; Rule: {row.rule_version}
                    </div>
                  </div>
                </div>

                {/* Reasons & Notes */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-500 font-sans text-[11px]">Reasons Fired:</span>
                    {row.reason_codes.map((rc) => (
                      <span
                        key={rc}
                        className="bg-slate-950 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-800"
                      >
                        {rc}
                      </span>
                    ))}
                  </div>

                  {row.notes && (
                    <div className="text-slate-300 font-sans text-xs bg-slate-800/30 p-2.5 rounded border border-slate-800">
                      {row.notes}
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1">
                    <span>Input Hash: {row.inputs_hash}</span>
                    <span>&bull;</span>
                    <span>Human Intervention: {row.human_intervention ? 'Yes (Named Human)' : 'No'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
