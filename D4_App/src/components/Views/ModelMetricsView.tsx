import React from 'react';
import { Award, ShieldAlert, CheckCircle2, Info, Activity, Gauge, HelpCircle } from 'lucide-react';

export const ModelMetricsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Model Governance &amp; Operating Board</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              PRD Section 4 &amp; 11
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Operating headline metrics: Precision, Recall, and False-Positive Rate with mandatory honesty classes.
          </p>
        </div>
      </div>

      {/* Model Governance Policy Callout */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold uppercase tracking-wider text-[11px]">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>Model Operational Boundary (P2P-FR-002 &amp; P2P-FR-033)</span>
        </div>
        <p className="leading-relaxed">
          The statistical model emits an uncalibrated ranking to order the human review queue. It does <em>not</em> compute a percentage probability of fraud. In accordance with PRD governance, raw test-set overall accuracy figures are omitted from the operating headline. Independent validation is pending before model promotion.
        </p>
      </div>

      {/* Operating Metrics Table with Honesty Labels */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Model Evaluation Metrics (PRECOMPUTED Source Cells)
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
            Source: evaluation.csv
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 font-medium font-sans">Operating Metric</th>
                <th className="py-2.5 font-medium">p2p-risk-1 (v1)</th>
                <th className="py-2.5 font-medium">p2p-risk-2 (v2)</th>
                <th className="py-2.5 font-medium">Honesty Class</th>
                <th className="py-2.5 font-medium font-sans">Interpretation &amp; SLA Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr>
                <td className="py-3 font-sans font-semibold text-white">Precision</td>
                <td className="py-3 text-emerald-400 font-bold">0.52</td>
                <td className="py-3 text-slate-500 italic">Blank (Pending validation)</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                    PRECOMPUTED
                  </span>
                </td>
                <td className="py-3 font-sans text-slate-400 text-[11px]">
                  Share of flagged cases that were confirmed exceptions.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-sans font-semibold text-white">Recall (Catch Rate)</td>
                <td className="py-3 text-emerald-400 font-bold">0.71</td>
                <td className="py-3 text-slate-500 italic">Blank (Pending validation)</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                    PRECOMPUTED
                  </span>
                </td>
                <td className="py-3 font-sans text-slate-400 text-[11px]">
                  Share of true bad cases successfully flagged by the detector.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-sans font-semibold text-white">False-Positive Rate</td>
                <td className="py-3 text-amber-400 font-bold">0.18</td>
                <td className="py-3 text-amber-400 font-bold">0.24</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                    PRECOMPUTED
                  </span>
                </td>
                <td className="py-3 font-sans text-slate-400 text-[11px]">
                  Share of benign cases flagged (v2 holds 24% of good cases in REVIEW).
                </td>
              </tr>
              <tr>
                <td className="py-3 font-sans font-semibold text-white">PR-AUC / AUC</td>
                <td className="py-3 text-slate-500 italic">Missing</td>
                <td className="py-3 text-slate-500 italic">Missing</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    Unknown
                  </span>
                </td>
                <td className="py-3 font-sans text-slate-400 text-[11px]">
                  Requires representative labelled training set; pending data owner.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-sans font-semibold text-white">Packet Pattern Catch Rate</td>
                <td className="py-3 text-emerald-400 font-bold">100% (4 / 4)</td>
                <td className="py-3 text-emerald-400 font-bold">100% (4 / 4)</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                    EDUCATIONAL
                  </span>
                </td>
                <td className="py-3 font-sans text-slate-400 text-[11px]">
                  D1 replay walk-through on INV-1002, alias, CH-88, and split pair.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model Card p2p-risk-2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Model Card: p2p-risk-2 (Candidate)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              Honesty: PRECOMPUTED
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
            <div>Purpose: Rank procure-to-pay exception cases for human queue.</div>
            <div>Prohibited: Payment authorization, auto APPROVE or auto REJECT.</div>
            <div>Independent Validation: Missing (P2P-FR-034 requires independent sign-off).</div>
            <div>Features Listed on Card:</div>
            <ul className="list-disc list-inside text-slate-400 pl-2 space-y-0.5 text-[11px]">
              <li>amount (USD numeric)</li>
              <li>supplier age (Missing in packet)</li>
              <li>bank change flag (bank_changed_30d)</li>
              <li>approval count (Missing in packet)</li>
              <li>non_po_flag (binary)</li>
              <li>duplicate_score (statistical similarity)</li>
            </ul>
          </div>
        </div>

        {/* Governance Decisions Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Governance Open Items &amp; ADRs
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              PRD Section 9.2
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <p className="leading-relaxed">
              Under PRD Section 9.2, numeric limits remain explicitly <code>THRESHOLD_UNSET</code> until an Architecture Decision Record (ADR) names an owner:
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <li>&bull; Sibling-time window: THRESHOLD_UNSET</li>
              <li>&bull; Bank-change window length (other than inherited 30d): THRESHOLD_UNSET</li>
              <li>&bull; Numeric false-positive operating target: THRESHOLD_UNSET</li>
              <li>&bull; Auto-REJECT without a person: THRESHOLD_UNSET</li>
              <li>&bull; WORM retention duration in days: THRESHOLD_UNSET</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
