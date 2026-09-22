import React from 'react';
import { useP2P } from '../../context/P2PContext';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Users,
  ShieldCheck,
  ShieldAlert,
  GitMerge,
  Building2,
} from 'lucide-react';

export const Step3Verify: React.FC = () => {
  const { currentCase, setStep, vendorChanges, supplierAliases } = useP2P();

  const linkedChanges = vendorChanges.filter((vc) =>
    currentCase.verify.linked_change_ids.includes(vc.change_id)
  );

  const rawSupplier = currentCase.extract.supplier_id_raw;
  const canonicalSupplier = currentCase.verify.supplier_id_canonical;
  const isAliasResolved = rawSupplier !== canonicalSupplier;
  const aliasInfo = supplierAliases[rawSupplier] || supplierAliases[canonicalSupplier];

  const hasSodViolation = currentCase.verify.same_user_requester_approver;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/30">
              3
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Step 3: Verify</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                hasSodViolation
                  ? 'bg-rose-950 text-rose-300 border border-rose-700'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}
            >
              Identity Consistency: {hasSodViolation ? 'SOD VIOLATION FLAGGED' : 'CHECK COMPLETE'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Supplier alias canonicalization, dual-control validation on changes, and bank verification evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('extract')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Extract</span>
          </button>
          <button
            onClick={() => setStep('detect')}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Proceed to Detect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Check 1: Supplier Canonical Alias Join */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Supplier Alias &amp; Identity Join
              </h3>
            </div>
            {isAliasResolved ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                Alias Resolved
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Direct Canonical
              </span>
            )}
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Raw Supplier ID:</span>
              <span className="font-bold text-white">{rawSupplier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Canonical Supplier ID:</span>
              <span className="font-bold text-emerald-400">{canonicalSupplier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Canonical Entity:</span>
              <span className="text-slate-200">{aliasInfo?.supplier_name || currentCase.extract.supplier_name_raw}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Known Alias Pair:</span>
              <span className="text-slate-300">V-201 / V201 (Alpha Industrial / Industries)</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed bg-slate-800/30 p-2.5 rounded-lg border border-slate-800">
            <strong>Rule P2P-FR-017 &amp; P2P-AC-002:</strong> Duplicate matching is executed on the <em>canonical</em> supplier ID ({canonicalSupplier}) so alias variants cannot bypass duplicate detection.
          </div>
        </div>

        {/* Verification Check 2: Segregation of Duties on Master Changes */}
        <div
          className={`border rounded-xl p-4 shadow-sm space-y-3 ${
            hasSodViolation ? 'bg-rose-950/20 border-rose-800/80' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Dual-Control &amp; Segregation of Duties
              </h3>
            </div>
            {hasSodViolation ? (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-900 text-rose-200 border border-rose-700 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-rose-300" />
                FAIL: SAME-USER SoD
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                PASS: 2-PERSON CONTROL
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            {linkedChanges.length === 0 ? (
              <p className="text-slate-400 py-3">No master data changes linked to this invoice.</p>
            ) : (
              linkedChanges.map((vc) => {
                const isViolation = vc.requester_id === vc.approver_id;
                return (
                  <div key={vc.change_id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Record:</span>
                      <span className="text-white font-bold">{vc.change_id} ({vc.field})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Requester ID:</span>
                      <span className="text-slate-200">{vc.requester_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Approver ID:</span>
                      <span className={isViolation ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                        {vc.approver_id} {isViolation && '(Same user!)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Master Data Status:</span>
                      <span className="text-amber-300">{vc.result} (Not auto-applied)</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {hasSodViolation ? (
              <span className="text-rose-300 font-medium">
                P2P-FR-019 Enforced: When requester equals approver, R-SOD-BANK is triggered. The bank change is held and the invoice is routed to human REVIEW.
              </span>
            ) : (
              'Requester and approver are distinct roles across master data and invoice flow.'
            )}
          </p>
        </div>

        {/* Verification Check 3: Bank Details & Verification Method */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Bank Account Verification Method
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {currentCase.verify.verification_method}
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Masked Account:</span>
              <span className="font-bold text-white">
                {currentCase.extract.bank_account_raw || 'XXXX9988'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Verification Protocol:</span>
              <span className="text-slate-200">
                {currentCase.verify.verification_method === 'callback' ? 'Out-of-band Callback Verified' : 'None / Missing Proof'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Cryptographic Proof:</span>
              <span className="text-slate-500">Missing (PRD Section 3.4)</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Per P2P-FR-020, bank changes without verifiable callback proof force the invoice to REVIEW.
          </p>
        </div>

        {/* Verification Check 4: Goods Receipt & External Feeds */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Goods Receipt &amp; Regulatory Checks
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              Honesty: Missing / Unknown
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Goods Receipt Status:</span>
              <span className="text-slate-300">Missing (Feed unintegrated)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Sanctions / PEP Feed:</span>
              <span className="text-slate-300">Unknown (CR-REG-01 open)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Price Catalog Feed:</span>
              <span className="text-slate-300">Unknown (Catalog unintegrated)</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Per PRD Section 3.1 &amp; Section What stays open on purpose: These feeds stay explicitly documented as Missing/Unknown without inventing fake feeds.
          </p>
        </div>
      </div>
    </div>
  );
};
