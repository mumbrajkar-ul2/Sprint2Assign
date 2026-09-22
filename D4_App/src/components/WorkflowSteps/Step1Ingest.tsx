import React, { useState } from 'react';
import { useP2P } from '../../context/P2PContext';
import { UploadCloud, CheckCircle2, Clock, FileText, ArrowRight, ShieldAlert, PlusCircle } from 'lucide-react';
import { CaseRecord } from '../../types';

export const Step1Ingest: React.FC = () => {
  const { currentCase, cases, selectCase, createNewCase, setStep, vendorChanges } = useP2P();

  const [showNewModal, setShowNewModal] = useState(false);
  const [newInvoiceId, setNewInvoiceId] = useState('');
  const [newSupplierId, setNewSupplierId] = useState('V-201');
  const [newSupplierName, setNewSupplierName] = useState('Alpha Industrial Supply');
  const [newAmount, setNewAmount] = useState('5000');
  const [newPo, setNewPo] = useState('PO-9910');
  const [newApprover, setNewApprover] = useState('U11');
  const [newBankChanged, setNewBankChanged] = useState<'Y' | 'N'>('N');

  const linkedChanges = vendorChanges.filter((vc) =>
    currentCase.verify.linked_change_ids.includes(vc.change_id)
  );

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceId.trim()) return;

    const id = newInvoiceId.trim().toUpperCase();
    const amountNum = parseFloat(newAmount) || 1000;

    const customCase: CaseRecord = {
      case_id: id,
      ingest_time: new Date().toISOString(),
      source_job_id: `JOB-${Date.now().toString().slice(-6)}`,
      state: 'INGESTED',
      current_step: 'extract',
      notify_count: 0,
      payment_count: 0,
      extract: {
        invoice_id_raw: id,
        invoice_id_normalized: id,
        supplier_name_raw: newSupplierName,
        supplier_id_raw: newSupplierId,
        po: newPo.trim(),
        amount: amountNum,
        currency: 'USD',
        approver_id: newApprover,
        bank_changed_30d: newBankChanged,
        channel: 'api',
        extractor_version: 'ocr-v2.1',
        confidence: {
          invoice_id: 0.99,
          supplier_id: 0.98,
          supplier_name: 0.98,
          po: newPo ? 0.98 : 0,
          amount: 0.99,
          currency: 0.99,
          approver: 0.98,
          bank_details: 0.97,
        },
        extract_status: 'complete',
        extract_time: new Date().toISOString(),
      },
      verify: {
        supplier_id_canonical: newSupplierId === 'V201' ? 'V-201' : newSupplierId,
        alias_collision: newSupplierId === 'V201' || newSupplierId === 'V-201',
        known_alias_pair: newSupplierId === 'V201' || newSupplierId === 'V-201',
        same_user_requester_approver: false,
        linked_change_ids: newBankChanged === 'Y' ? ['CH-88'] : [],
        verification_method: 'callback',
        goods_receipt_status: 'Missing',
        sanctions_pep_status: 'Unknown',
      },
      detect: {
        duplicate_match_supplier_po_amount: false,
        duplicate_invoice_number: false,
        non_po_flag: !newPo.trim(),
        sibling_invoice_ids: [],
        sibling_amount_sum: amountNum,
        sod_vendor_and_pay_overlap: false,
        anomaly_rank: '#210 of 420 cohort',
        anomaly_rank_raw: 0.25,
        scorer_status: 'scored',
        score_honesty: 'SIMULATED',
        model_version: 'p2p-risk-2',
      },
      decision: {
        recommended_outcome: !newPo.trim() ? 'REVIEW' : 'APPROVE',
        final_policy_outcome: !newPo.trim() ? 'REVIEW' : 'APPROVE',
        rules_fired: !newPo.trim() ? ['R-NONPO'] : [],
        reason_codes: !newPo.trim() ? ['NON_PO', 'POLICY_REVIEW'] : ['POLICY_APPROVE'],
        rule_version: 'p2p-rules-v2.0',
        rationale_paragraph: `Invoice ${id} ingested for ${newSupplierName}.`,
        counterfactuals: [],
        decided_at: new Date().toISOString(),
      },
    };

    createNewCase(customCase);
    setShowNewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              1
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 1: Ingest</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
              State: {currentCase.state}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Store supplier invoice &amp; join with prior vendor-master change records on canonical supplier.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewModal(true)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ingest Custom Case</span>
          </button>
          <button
            onClick={() => setStep('extract')}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Proceed to Extract</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Case Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Invoice Metadata Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Invoice Ingest Record
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Invoice ID:</span>
              <span className="font-mono font-bold text-white">{currentCase.case_id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Supplier:</span>
              <span className="font-medium text-slate-200 text-right">
                {currentCase.extract.supplier_name_raw} ({currentCase.extract.supplier_id_raw})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Amount:</span>
              <span className="font-mono font-bold text-emerald-400">
                ${currentCase.extract.amount.toLocaleString()} {currentCase.extract.currency}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">PO Number:</span>
              <span className="font-mono text-slate-200">
                {currentCase.extract.po || <em className="text-amber-400 font-normal">None (Non-PO)</em>}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Approver ID:</span>
              <span className="font-mono text-slate-300">{currentCase.extract.approver_id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Bank Changed (30d):</span>
              <span
                className={`font-mono font-semibold ${
                  currentCase.extract.bank_changed_30d === 'Y' ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                {currentCase.extract.bank_changed_30d}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Ingest Timestamp:</span>
              <span className="font-mono text-slate-400 text-[11px]">{currentCase.ingest_time}</span>
            </div>
          </div>
        </div>

        {/* Linked Vendor Master Changes */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Linked Vendor-Master Changes (Joined by Supplier)
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {linkedChanges.length} linked record{linkedChanges.length === 1 ? '' : 's'}
            </span>
          </div>

          {linkedChanges.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-slate-800 rounded-lg text-slate-400 text-xs">
              No recent vendor master changes detected for canonical supplier{' '}
              <strong className="text-slate-300">{currentCase.verify.supplier_id_canonical}</strong>.
            </div>
          ) : (
            <div className="space-y-2.5">
              {linkedChanges.map((vc) => {
                const isSameUser = vc.requester_id === vc.approver_id;
                return (
                  <div
                    key={vc.change_id}
                    className={`p-3 rounded-lg border text-xs space-y-2 ${
                      isSameUser
                        ? 'bg-rose-950/20 border-rose-800/60'
                        : 'bg-slate-800/40 border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">
                          {vc.change_id}
                        </span>
                        <span className="text-slate-300">
                          Field: <strong className="text-amber-400">{vc.field}</strong>
                        </span>
                        {isSameUser && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded border border-rose-700 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            Same-User SoD Violation
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{vc.timestamp}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Old Value:</span>
                        <span className="font-mono text-slate-400">{vc.old_value}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">New Value:</span>
                        <span className="font-mono text-amber-300">{vc.new_value}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Requester:</span>
                        <span className="font-mono text-slate-200">{vc.requester_id}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Approver:</span>
                        <span className={`font-mono ${isSameUser ? 'text-rose-400 font-bold' : 'text-slate-200'}`}>
                          {vc.approver_id} {isSameUser && '(Matches Requester!)'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Preset Packet Case Switcher */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Replay Packet Seed Cases (D1 Case Replay)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {Object.values(cases).map((c) => {
            const isSelected = c.case_id === currentCase.case_id;
            return (
              <button
                key={c.case_id}
                onClick={() => selectCase(c.case_id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-100 ring-1 ring-emerald-500/50'
                    : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-bold text-white mb-1">
                  <span>{c.case_id}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-semibold ${
                      c.state === 'PAID'
                        ? 'bg-blue-900/60 text-blue-300'
                        : c.decision?.final_policy_outcome === 'APPROVE'
                        ? 'bg-emerald-900/60 text-emerald-300'
                        : 'bg-amber-900/60 text-amber-300'
                    }`}
                  >
                    {c.decision?.final_policy_outcome || c.state}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <p>
                    {c.extract.supplier_id_raw} &bull; ${c.extract.amount.toLocaleString()}
                  </p>
                  <p className="truncate text-slate-400">
                    {c.extract.po ? `PO: ${c.extract.po}` : 'Non-PO expedited'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* New Ingest Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Ingest New Invoice Record</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Invoice ID (Unique):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. INV-2001"
                  value={newInvoiceId}
                  onChange={(e) => setNewInvoiceId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Supplier ID:</label>
                  <select
                    value={newSupplierId}
                    onChange={(e) => {
                      setNewSupplierId(e.target.value);
                      if (e.target.value === 'V-201') setNewSupplierName('Alpha Industrial Supply');
                      if (e.target.value === 'V201') setNewSupplierName('Alpha Industries Supply');
                      if (e.target.value === 'V-311') setNewSupplierName('Beta Global Fabrication');
                      if (e.target.value === 'V-500') setNewSupplierName('Apex Machinery Corp');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-white font-mono"
                  >
                    <option value="V-201">V-201 (Canonical Alpha)</option>
                    <option value="V201">V201 (Alias Alpha)</option>
                    <option value="V-311">V-311 (Beta Global)</option>
                    <option value="V-500">V-500 (Apex Machinery)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Amount ($ USD):</label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">PO Number (or empty):</label>
                  <input
                    type="text"
                    placeholder="e.g. PO-7001 or empty"
                    value={newPo}
                    onChange={(e) => setNewPo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Bank Changed (30d):</label>
                  <select
                    value={newBankChanged}
                    onChange={(e) => setNewBankChanged(e.target.value as 'Y' | 'N')}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-white font-mono"
                  >
                    <option value="N">N (No change)</option>
                    <option value="Y">Y (Changed recently)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-1.5 rounded text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Ingest Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
