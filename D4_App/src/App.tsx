/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { P2PProvider, useP2P } from './context/P2PContext';
import { Header } from './components/Header';
import { WorkflowView } from './components/Views/WorkflowView';
import { CaseHistoryView } from './components/Views/CaseHistoryView';
import { WormAuditView } from './components/Views/WormAuditView';
import { EscalationsView } from './components/Views/EscalationsView';
import { ModelMetricsView } from './components/Views/ModelMetricsView';
import { AcceptanceTestsView } from './components/Views/AcceptanceTestsView';
import { ShieldCheck, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView } = useP2P();

  const renderActiveView = () => {
    switch (activeView) {
      case 'workflow':
        return <WorkflowView />;
      case 'history':
        return <CaseHistoryView />;
      case 'worm':
        return <WormAuditView />;
      case 'escalations':
        return <EscalationsView />;
      case 'metrics':
        return <ModelMetricsView />;
      case 'tests':
        return <AcceptanceTestsView />;
      default:
        return <WorkflowView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>

      {/* Governed P2P Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">P2P-Payment-Control Governance Engine</span>
            <span className="text-slate-500">&bull;</span>
            <span className="font-mono text-[11px] text-slate-400">Rule Pack D3a &bull; Model p2p-risk-2</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
            <span>Outcomes: APPROVE &bull; REVIEW &bull; REJECT</span>
            <span>&bull;</span>
            <span>Audit-First Settlement</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <P2PProvider>
      <AppContent />
    </P2PProvider>
  );
}

