import React from 'react';
import { useP2P } from '../../context/P2PContext';
import { CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Sliders, FileSpreadsheet } from 'lucide-react';

export const Step2Extract: React.FC = () => {
  const { currentCase, setStep, recomputeCaseDecision } = useP2P();

  const toggleExtractConfidence = () => {
    // Toggle between complete and uncertain to demonstrate R-EXTRACT
    const newStatus = currentCase.extract.extract_status === 'complete' ? 'uncertain' : 'complete';
    currentCase.extract.extract_status = newStatus;
    if (newStatus === 'uncertain') {
      currentCase.extract.confidence.amount = 0.42;
      currentCase.extract.confidence.supplier_id = 0.51;
    } else {
      currentCase.extract.confidence.amount = 0.99;
      currentCase.extract.confidence.supplier_id = 0.98;
    }
    recomputeCaseDecision(currentCase.case_id);
  };

  const isUncertain = currentCase.extract.extract_status === 'uncertain';

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              2
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 2: Extract</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                isUncertain
                  ? 'bg-rose-950 text-rose-300 border border-rose-700'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}
            >
              Status: {currentCase.extract.extract_status.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured optical/API extraction of key invoice fields with per-field confidence scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('ingest')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Ingest</span>
          </button>
          <button
            onClick={() => setStep('verify')}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Proceed to Verify</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Uncertainty Simulation Banner */}
      {isUncertain && (
        <div className="p-3 bg-rose-950/40 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>R-EXTRACT Triggered:</strong> Extract confidence is below threshold. Policy forces outcome to <strong>REVIEW</strong>.
            </span>
          </div>
          <button
            onClick={toggleExtractConfidence}
            className="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 text-white text-[11px] font-semibold rounded border border-rose-700 shrink-0"
          >
            Restore High Confidence
          </button>
        </div>
      )}

      {/* Extraction Fields Table & Confidence Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Extracted Structured Fields
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Channel: <strong className="font-mono text-slate-200">{currentCase.extract.channel}</strong></span>
              <span>&bull;</span>
              <span>Extractor: <strong className="font-mono text-slate-200">{currentCase.extract.extractor_version}</strong></span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 font-medium">Field</th>
                  <th className="py-2 font-medium">Extracted Value</th>
                  <th className="py-2 font-medium">Normalized</th>
                  <th className="py-2 font-medium text-right">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="py-2.5 text-slate-400 font-sans">Invoice ID</td>
                  <td className="py-2.5 font-bold text-white">{currentCase.extract.invoice_id_raw}</td>
                  <td className="py-2.5 text-slate-300">{currentCase.extract.invoice_id_normalized}</td>
                  <td className="py-2.5 text-right">
                    <span className="text-emerald-400 font-bold">
                      {(currentCase.extract.confidence.invoice_id * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400 font-sans">Supplier ID</td>
                  <td className="py-2.5 text-slate-200">{currentCase.extract.supplier_id_raw}</td>
                  <td className="py-2.5 text-slate-300 font-semibold">{currentCase.verify.supplier_id_canonical}</td>
                  <td className="py-2.5 text-right">
                    <span className={currentCase.extract.confidence.supplier_id < 0.8 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {(currentCase.extract.confidence.supplier_id * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400 font-sans">Supplier Name</td>
                  <td className="py-2.5 text-slate-200">{currentCase.extract.supplier_name_raw}</td>
                  <td className="py-2.5 text-slate-400 font-sans italic">Clean text</td>
                  <td className="py-2.5 text-right">
                    <span className="text-emerald-400 font-bold">
                      {(currentCase.extract.confidence.supplier_name * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400 font-sans">PO Number</td>
                  <td className="py-2.5 text-slate-200">
                    {currentCase.extract.po || <em className="text-amber-400 font-normal font-sans">Empty (Non-PO)</em>}
                  </td>
                  <td className="py-2.5 text-slate-400 font-sans">{currentCase.extract.po ? 'PO Ref' : 'None'}</td>
                  <td className="py-2.5 text-right">
                    <span className="text-slate-300 font-bold">
                      {currentCase.extract.po ? `${(currentCase.extract.confidence.po * 100).toFixed(0)}%` : 'N/A'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400 font-sans">Amount &amp; Currency</td>
                  <td className="py-2.5 font-bold text-emerald-400">
                    ${currentCase.extract.amount.toLocaleString()} {currentCase.extract.currency}
                  </td>
                  <td className="py-2.5 text-slate-300">{currentCase.extract.amount} USD</td>
                  <td className="py-2.5 text-right">
                    <span className={currentCase.extract.confidence.amount < 0.8 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {(currentCase.extract.confidence.amount * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400 font-sans">Approver ID</td>
                  <td className="py-2.5 text-slate-200">{currentCase.extract.approver_id}</td>
                  <td className="py-2.5 text-slate-400 font-sans">User Code</td>
                  <td className="py-2.5 text-right">
                    <span className="text-emerald-400 font-bold">
                      {(currentCase.extract.confidence.approver * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400 font-sans">Bank Changed (30d)</td>
                  <td className="py-2.5 font-semibold text-amber-300">{currentCase.extract.bank_changed_30d}</td>
                  <td className="py-2.5 text-slate-400 font-sans">Master Data join</td>
                  <td className="py-2.5 text-right">
                    <span className="text-emerald-400 font-bold">99%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Confidence & Policy Controls */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Extraction Controls
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Under PRD rule <strong>R-EXTRACT</strong>, any missing mandatory field or low-confidence extraction forces outcome to <strong>REVIEW</strong>.
            </p>

            <button
              onClick={toggleExtractConfidence}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isUncertain
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300 hover:bg-emerald-900'
                  : 'bg-rose-950/60 border-rose-700 text-rose-300 hover:bg-rose-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isUncertain ? 'Simulate High Confidence (Pass)' : 'Simulate Low Confidence (Fail R-EXTRACT)'}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-2 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] block">
              OCR Verification Reference
            </span>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div>Invoice: {currentCase.extract.invoice_id_raw}</div>
              <div>Digest: sha256-{currentCase.case_id.toLowerCase()}...</div>
              <div>Extracted At: {currentCase.extract.extract_time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
