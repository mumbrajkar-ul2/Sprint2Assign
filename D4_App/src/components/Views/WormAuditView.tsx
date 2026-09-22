import React, { useState } from 'react';
import { useP2P } from '../../context/P2PContext';
import { FileLock2, ShieldAlert, CheckCircle2, Lock, ShieldCheck, Database, KeyRound } from 'lucide-react';

export const WormAuditView: React.FC = () => {
  const { wormStore, auditLogs } = useP2P();

  const [overwriteAttemptFeedback, setOverwriteAttemptFeedback] = useState<string | null>(null);

  const simulateIllegalOverwrite = () => {
    // Demonstration of P2P-AC-024: Overwrite of locked WORM reference is refused!
    setOverwriteAttemptFeedback(
      'REFUSED (P2P-AC-024): Immutable WORM Reference Store strictly rejects overwrite or delete requests. Audit row remains locked for retention duration (THRESHOLD_UNSET).'
    );
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileLock2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">WORM Reference Store &amp; Identity Privacy</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              P2P-FR-055 &bull; P2P-AC-024 &bull; P2P-AC-025
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Write-Once-Read-Many (WORM) immutable reference persistence. Personal identity details remain segregated in the normal identity store.
          </p>
        </div>

        <button
          onClick={simulateIllegalOverwrite}
          className="text-xs bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700 font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Test Illegal Overwrite (AC-024)</span>
        </button>
      </div>

      {/* Overwrite Refusal Alert */}
      {overwriteAttemptFeedback && (
        <div className="p-4 bg-rose-950/60 border border-rose-700 rounded-xl text-xs text-rose-200 flex items-start gap-3 shadow-md">
          <Lock className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white block font-mono">CRITICAL IMMUTABILITY ENFORCEMENT:</strong>
            <p className="leading-relaxed">{overwriteAttemptFeedback}</p>
          </div>
        </div>
      )}

      {/* Two-Store Architecture Card (P2P-FR-055) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Store 1: WORM Reference Store (Locked)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Holds immutable cryptographic digests: <code>audit_row_id</code>, <code>document_hash</code>, <code>inputs_hash</code>, rule versions, model versions, outcomes, and timestamps.
          </p>
          <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800">
            Contains ZERO personal data. No plaintext supplier email addresses or raw bank numbers.
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Store 2: Normal Identity Store (Mutable &amp; Redactable)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Holds personal and operational identities: user display names, contact emails, and full bank account records.
          </p>
          <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800">
            Subject to GDPR/privacy erasure requests without destroying the immutable WORM audit digests.
          </div>
        </div>
      </div>

      {/* Append-Only WORM Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Locked WORM Records ({wormStore.length} Immutably Persisted)
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            Retention: THRESHOLD_UNSET (WORM Locked)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 font-medium">WORM ID</th>
                <th className="py-2.5 font-medium">Audit Row Reference</th>
                <th className="py-2.5 font-medium">Case ID</th>
                <th className="py-2.5 font-medium">Document Hash</th>
                <th className="py-2.5 font-medium">Inputs Hash</th>
                <th className="py-2.5 font-medium">Outcome</th>
                <th className="py-2.5 font-medium text-right">Locked Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {wormStore.map((record) => (
                <tr key={record.worm_id} className="hover:bg-slate-800/30">
                  <td className="py-3 font-bold text-cyan-400">{record.worm_id}</td>
                  <td className="py-3 text-white">{record.audit_row_id}</td>
                  <td className="py-3 text-slate-200">{record.case_id}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{record.document_hash}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{record.inputs_hash}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 border border-slate-700 text-white">
                      {record.outcome}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-400 text-[11px]">{record.locked_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500 font-sans italic">
          * No delete or overwrite controls are exposed on this interface per P2P-FR-053 and P2P-AC-024.
        </p>
      </div>
    </div>
  );
};
