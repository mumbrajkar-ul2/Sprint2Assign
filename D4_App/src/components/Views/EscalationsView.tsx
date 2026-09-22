import React from 'react';
import { useP2P } from '../../context/P2PContext';
import { BellRing, ShieldAlert, CheckCircle2, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';

export const EscalationsView: React.FC = () => {
  const { escalations, selectCase, setActiveView } = useP2P();

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Escalation Events Log (P2P-FR-057)</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              Events as Rows, Not Emails
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Machine-logged operational escalations routed directly to designated internal control owners.
          </p>
        </div>
      </div>

      {/* Escalations Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium text-[11px]">
                <th className="py-2.5">Event ID</th>
                <th className="py-2.5">Type</th>
                <th className="py-2.5">Case ID</th>
                <th className="py-2.5">Trigger Reason</th>
                <th className="py-2.5">Notified Control Owner</th>
                <th className="py-2.5">Timestamp</th>
                <th className="py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {escalations.map((esc) => (
                <tr key={esc.event_id} className="hover:bg-slate-800/30">
                  <td className="py-3 font-bold text-slate-200">{esc.event_id}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                        esc.event_type === 'ESC_P2P05' || esc.event_type === 'ESC_SOD'
                          ? 'bg-rose-950 text-rose-300 border-rose-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {esc.event_type}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-white">{esc.case_id}</td>
                  <td className="py-3 font-sans text-slate-300 max-w-xs">{esc.trigger_reason}</td>
                  <td className="py-3 font-sans text-emerald-400">{esc.notified_role}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{esc.timestamp}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        selectCase(esc.case_id);
                        setActiveView('workflow');
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] font-sans transition-colors inline-flex items-center gap-1"
                    >
                      <span>Open Case</span>
                      <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
