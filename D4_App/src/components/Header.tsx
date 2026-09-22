import React from 'react';
import { useP2P, AppView } from '../context/P2PContext';
import {
  ShieldCheck,
  AlertTriangle,
  History,
  FileLock2,
  BellRing,
  Award,
  CheckCircle2,
  RotateCcw,
  Zap,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cases,
    currentCaseId,
    currentCase,
    selectCase,
    activeView,
    setActiveView,
    scorerDownMode,
    toggleScorerDown,
    injectAliasTestCase,
    resetAllData,
    escalations,
    wormStore,
  } = useP2P();

  const unresolvedEscalations = escalations.filter((e) => !e.resolved).length;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-30 shadow-md">
      {/* Top Banner: Strict Governance Banner */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono font-medium text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
            PRD D3a Active
          </span>
          <span className="hidden sm:inline text-slate-300">
            Governed Outcomes: <strong className="text-emerald-400">APPROVE</strong> | <strong className="text-amber-400">REVIEW</strong> | <strong className="text-rose-400">REJECT</strong> only.
          </span>
          <span className="text-rose-400 font-semibold underline decoration-rose-500/50">
            No &quot;PROCESS&quot;
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">
            Model ranks; written policy decides; human authorizes payment.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800/70 px-2 py-0.5 rounded border border-slate-700">
            <FileLock2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>WORM Ref: {wormStore.length} rows</span>
          </div>
          {unresolvedEscalations > 0 && (
            <button
              onClick={() => setActiveView('escalations')}
              className="flex items-center gap-1 text-[11px] text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/70 animate-pulse hover:bg-rose-900"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>{unresolvedEscalations} Escalation{unresolvedEscalations > 1 ? 's' : ''}</span>
            </button>
          )}
          <button
            onClick={resetAllData}
            title="Reset to PRD seed data"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors py-0.5 px-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & App Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">P2P-Payment-Control</h1>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Shared-Services Control
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Exception Governance &bull; Audit-First Payment &bull; Idempotent Release
            </p>
          </div>
        </div>

        {/* Case Selector & Quick Simulation Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Current Case Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
            <label htmlFor="case-select" className="text-xs font-medium text-slate-400">
              Active Case:
            </label>
            <select
              id="case-select"
              value={currentCaseId}
              onChange={(e) => selectCase(e.target.value)}
              className="bg-slate-900 text-white text-xs font-mono font-semibold rounded px-2 py-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {Object.values(cases).map((c) => (
                <option key={c.case_id} value={c.case_id}>
                  {c.case_id} &bull; {c.extract.supplier_id_raw} &bull; ${c.extract.amount} (
                  {c.decision?.final_policy_outcome || c.state})
                </option>
              ))}
            </select>
          </div>

          {/* Inject Alias Test Button */}
          <button
            onClick={() => {
              const id = injectAliasTestCase();
              setActiveView('workflow');
            }}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Inject test invoice using alias raw ID V201 to test canonical join with V-201"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Inject</span> V201 Alias
          </button>

          {/* Scorer Simulation Toggle */}
          <button
            onClick={() => toggleScorerDown()}
            className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all font-medium ${
              scorerDownMode
                ? 'bg-rose-950/80 text-rose-300 border-rose-700 hover:bg-rose-900 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Scorer Down / Outage simulation (Forces score=null, outcome=REVIEW, UNSCORED banner)"
          >
            <Activity className={`w-3.5 h-3.5 ${scorerDownMode ? 'text-rose-400' : 'text-emerald-400'}`} />
            <span>Scorer: {scorerDownMode ? 'DOWN (UNSCORED)' : 'ACTIVE'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto text-xs font-medium border-t border-slate-800/80 pt-1 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveView('workflow')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeView === 'workflow'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Workflow (8 Screens)</span>
        </button>

        <button
          onClick={() => setActiveView('history')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeView === 'history'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Case History &amp; Rebuild</span>
        </button>

        <button
          onClick={() => setActiveView('worm')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeView === 'worm'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileLock2 className="w-3.5 h-3.5" />
          <span>WORM Reference Store</span>
        </button>

        <button
          onClick={() => setActiveView('escalations')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeView === 'escalations'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <BellRing className="w-3.5 h-3.5" />
          <span>Escalation Events</span>
          {unresolvedEscalations > 0 && (
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {unresolvedEscalations}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveView('metrics')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeView === 'metrics'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Model Governance &amp; Metrics</span>
        </button>

        <button
          onClick={() => setActiveView('tests')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeView === 'tests'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-amber-300">Acceptance Test Suite (AC-001..AC-038)</span>
        </button>
      </div>
    </header>
  );
};
