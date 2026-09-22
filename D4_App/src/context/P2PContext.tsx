/**
 * P2P Context - Application State, Governance, WORM Storage, & Audit Trails
 * PRD Version: D3a
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CaseRecord,
  StepName,
  Outcome,
  ReasonCode,
  AuditRow,
  WormRecord,
  EscalationEvent,
  VendorMasterChange,
  SupplierAlias,
} from '../types';
import {
  INITIAL_CASES,
  INITIAL_AUDIT_LOGS,
  INITIAL_WORM_STORE,
  INITIAL_ESCALATIONS,
  VENDOR_CHANGES,
  SUPPLIER_ALIASES,
} from '../data/seedData';
import { evaluateP2PRules } from '../lib/p2pRulesEngine';

export type AppView = 'workflow' | 'history' | 'worm' | 'escalations' | 'metrics' | 'tests';

interface P2PContextType {
  cases: Record<string, CaseRecord>;
  currentCaseId: string;
  currentCase: CaseRecord;
  activeView: AppView;
  vendorChanges: VendorMasterChange[];
  supplierAliases: Record<string, SupplierAlias>;
  auditLogs: AuditRow[];
  wormStore: WormRecord[];
  escalations: EscalationEvent[];
  scorerDownMode: boolean;
  auditFailureSimulation: boolean;
  reviewerName: string;
  payerName: string;
  setReviewerName: (name: string) => void;
  setPayerName: (name: string) => void;
  setActiveView: (view: AppView) => void;
  selectCase: (caseId: string) => void;
  setStep: (step: StepName) => void;
  toggleScorerDown: (value?: boolean) => void;
  toggleAuditFailure: (value?: boolean) => void;
  recomputeCaseDecision: (caseId: string) => void;
  submitReview: (
    disposition: 'agree' | 'disagree' | 'override',
    outcome: Outcome,
    reviewerId: string,
    notes: string,
    additionalReasons?: ReasonCode[]
  ) => boolean;
  sendNotification: () => { success: boolean; message: string; isIdempotentRetry: boolean };
  executePayment: (payerId: string) => { success: boolean; message: string; isIdempotentRetry: boolean };
  openContest: (actor: string, text: string) => boolean;
  injectAliasTestCase: () => string;
  createNewCase: (customCase: CaseRecord) => void;
  resetAllData: () => void;
}

const P2PContext = createContext<P2PContextType | undefined>(undefined);

const STORAGE_KEY = 'p2p_payment_control_v2';

export const P2PProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<Record<string, CaseRecord>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_cases`);
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [currentCaseId, setCurrentCaseId] = useState<string>('INV-1002');
  const [activeView, setActiveView] = useState<AppView>('workflow');
  const [scorerDownMode, setScorerDownMode] = useState<boolean>(false);
  const [auditFailureSimulation, setAuditFailureSimulation] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('Sarah Jenkins (AP Lead)');
  const [payerName, setPayerName] = useState<string>('Michael Vance (Treasurer)');

  const [auditLogs, setAuditLogs] = useState<AuditRow[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [wormStore, setWormStore] = useState<WormRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_worm`);
    return saved ? JSON.parse(saved) : INITIAL_WORM_STORE;
  });

  const [escalations, setEscalations] = useState<EscalationEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_esc`);
    return saved ? JSON.parse(saved) : INITIAL_ESCALATIONS;
  });

  // Save changes to localStorage for local persistence
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_cases`, JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_worm`, JSON.stringify(wormStore));
  }, [wormStore]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_esc`, JSON.stringify(escalations));
  }, [escalations]);

  const currentCase = cases[currentCaseId] || cases['INV-1002'] || Object.values(cases)[0];

  const selectCase = (caseId: string) => {
    if (cases[caseId]) {
      setCurrentCaseId(caseId);
    }
  };

  const setStep = (step: StepName) => {
    setCases((prev) => {
      const c = prev[currentCaseId];
      if (!c) return prev;
      return {
        ...prev,
        [currentCaseId]: {
          ...c,
          current_step: step,
        },
      };
    });
  };

  const toggleScorerDown = (value?: boolean) => {
    const newVal = value !== undefined ? value : !scorerDownMode;
    setScorerDownMode(newVal);

    // Apply to current case detect state
    setCases((prev) => {
      const c = prev[currentCaseId];
      if (!c) return prev;

      const newDetect = {
        ...c.detect,
        scorer_status: (newVal ? 'unscored' : 'scored') as 'scored' | 'unscored',
        anomaly_rank: newVal ? null : c.detect.anomaly_rank || '#14 of 420 cohort',
        anomaly_rank_raw: newVal ? null : c.detect.anomaly_rank_raw || 0.85,
        score_honesty: (newVal ? 'REAL' : c.detect.score_honesty) as any,
      };

      const newDecision = evaluateP2PRules(c.case_id, c.extract, c.verify, newDetect);

      return {
        ...prev,
        [currentCaseId]: {
          ...c,
          detect: newDetect,
          decision: {
            ...newDecision,
            decided_at: new Date().toISOString(),
          },
        },
      };
    });

    if (newVal) {
      // Fire ESC_UNSCORED escalation
      setEscalations((prev) => [
        {
          event_id: `ESC-${Date.now().toString().slice(-4)}`,
          event_type: 'ESC_UNSCORED',
          case_id: currentCaseId,
          trigger_reason: 'ML Scorer outage/timeout simulated. Score set to null (unscored). Outcome forced to REVIEW.',
          notified_role: 'Operations & Model Owner (D3b named interim)',
          timestamp: new Date().toISOString(),
          resolved: false,
        },
        ...prev,
      ]);
    }
  };

  const toggleAuditFailure = (value?: boolean) => {
    setAuditFailureSimulation(value !== undefined ? value : !auditFailureSimulation);
  };

  const recomputeCaseDecision = (caseId: string) => {
    setCases((prev) => {
      const c = prev[caseId];
      if (!c) return prev;
      const newDecision = evaluateP2PRules(c.case_id, c.extract, c.verify, c.detect);
      return {
        ...prev,
        [caseId]: {
          ...c,
          decision: {
            ...newDecision,
            decided_at: new Date().toISOString(),
          },
        },
      };
    });
  };

  const submitReview = (
    disposition: 'agree' | 'disagree' | 'override',
    outcome: Outcome,
    reviewerId: string,
    notes: string,
    additionalReasons: ReasonCode[] = []
  ): boolean => {
    if (!reviewerId.trim()) {
      return false; // Reviewer name is required by PRD!
    }

    const c = cases[currentCaseId];
    if (!c) return false;

    const fromState = c.state;
    const toState = 'REVIEWED';

    const mergedReasons = Array.from(
      new Set([...c.decision.reason_codes, ...additionalReasons])
    );

    const auditRowId = `AUDIT-${c.case_id}-${Date.now().toString().slice(-4)}`;
    const nowStr = new Date().toISOString();

    const newAuditRow: AuditRow = {
      audit_row_id: auditRowId,
      case_id: c.case_id,
      actor: reviewerId,
      from_state: fromState,
      to_state: toState,
      outcome: outcome,
      anomaly_rank: c.detect.anomaly_rank,
      scorer_status: c.detect.scorer_status,
      model_version: c.detect.model_version,
      rule_version: c.decision.rule_version,
      prompt_ids: 'none',
      reason_codes: mergedReasons,
      inputs_hash: `sha256-rev-${Date.now().toString().slice(-6)}`,
      linked_change_ids: c.verify.linked_change_ids,
      sibling_invoice_ids: c.detect.sibling_invoice_ids,
      sibling_amount_sum: c.detect.sibling_amount_sum,
      workflow_state: toState,
      human_intervention: true,
      reviewer_id: reviewerId,
      created_at: nowStr,
      notes: notes || `Review closed with disposition: ${disposition}. Final outcome: ${outcome}.`,
    };

    // Update case
    setCases((prev) => ({
      ...prev,
      [currentCaseId]: {
        ...c,
        state: toState,
        current_step: 'notify',
        decision: {
          ...c.decision,
          final_policy_outcome: outcome,
        },
        review: {
          reviewer_id: reviewerId,
          disposition,
          final_outcome: outcome,
          reason_codes: mergedReasons,
          notes: notes.trim(),
          reviewed_at: nowStr,
          time_spent_seconds: 45,
        },
      },
    }));

    // Append to WORM and Audit
    setAuditLogs((prev) => [newAuditRow, ...prev]);

    return true;
  };

  const sendNotification = (): { success: boolean; message: string; isIdempotentRetry: boolean } => {
    const c = cases[currentCaseId];
    if (!c) return { success: false, message: 'Case not found', isIdempotentRetry: false };

    const idempotencyKey = `${c.case_id}:notify`;

    // Check Idempotency: second call returns first result without second notify
    if (c.notify && c.notify_count > 0) {
      return {
        success: true,
        message: `Idempotency verified: Notification already sent under key '${idempotencyKey}'. Returned existing record. Count remains ${c.notify_count}.`,
        isIdempotentRetry: true,
      };
    }

    const alias = SUPPLIER_ALIASES[c.verify.supplier_id_canonical] || SUPPLIER_ALIASES['V-201'];
    const nowStr = new Date().toISOString();

    const notifyRecord = {
      idempotency_key: idempotencyKey,
      recipient_email: alias.email,
      masked_bank: alias.masked_bank,
      outcome: c.decision.final_policy_outcome,
      reason_codes: c.decision.reason_codes,
      notified_at: nowStr,
      attempt_count: 1,
    };

    setCases((prev) => ({
      ...prev,
      [currentCaseId]: {
        ...c,
        state: 'NOTIFIED',
        current_step: c.decision.final_policy_outcome === 'APPROVE' ? 'pay' : 'notify',
        notify: notifyRecord,
        notify_count: 1,
      },
    }));

    return {
      success: true,
      message: `Notification dispatched successfully with idempotency key ${idempotencyKey}.`,
      isIdempotentRetry: false,
    };
  };

  const executePayment = (payerId: string): { success: boolean; message: string; isIdempotentRetry: boolean } => {
    const c = cases[currentCaseId];
    if (!c) return { success: false, message: 'Case not found', isIdempotentRetry: false };

    // Strict Rule: Payment ONLY after APPROVE
    if (c.decision.final_policy_outcome !== 'APPROVE') {
      return {
        success: false,
        message: `Payment blocked! Policy outcome is ${c.decision.final_policy_outcome}. Payment cannot be released on REVIEW or REJECT cases.`,
        isIdempotentRetry: false,
      };
    }

    const idempotencyKey = `${c.case_id}:payment`;

    // Check Idempotency: second click must not create second payment
    if (c.payment && c.payment_count > 0) {
      return {
        success: true,
        message: `Idempotency verified: Payment already completed under key '${idempotencyKey}'. Returned existing payment confirmation. Count remains ${c.payment_count}.`,
        isIdempotentRetry: true,
      };
    }

    // Check Audit Failure Simulation (P2P-FR-053 & P2P-AC-019)
    if (auditFailureSimulation) {
      const escId = `ESC-${Date.now().toString().slice(-4)}`;
      setEscalations((prev) => [
        {
          event_id: escId,
          event_type: 'ESC_P2P05',
          case_id: c.case_id,
          trigger_reason: 'Audit row write failed prior to state change. State change to PAID aborted.',
          notified_role: 'Finance Controls & P2P-05 Owner',
          timestamp: new Date().toISOString(),
          resolved: false,
        },
        ...prev,
      ]);
      return {
        success: false,
        message: 'CRITICAL CONTROL STOP: Audit row write failed. Payment state change blocked and ESC_P2P05 logged.',
        isIdempotentRetry: false,
      };
    }

    const auditRowId = `AUDIT-${c.case_id}-PAY`;
    const nowStr = new Date().toISOString();

    // 1. Audit row is written BEFORE payment state changes (P2P-FR-053)
    const newAuditRow: AuditRow = {
      audit_row_id: auditRowId,
      case_id: c.case_id,
      actor: payerId,
      from_state: c.state,
      to_state: 'PAID',
      outcome: 'APPROVE',
      anomaly_rank: c.detect.anomaly_rank,
      scorer_status: c.detect.scorer_status,
      model_version: c.detect.model_version,
      rule_version: c.decision.rule_version,
      reason_codes: c.decision.reason_codes,
      inputs_hash: `sha256-pay-${Date.now().toString().slice(-6)}`,
      linked_change_ids: c.verify.linked_change_ids,
      sibling_invoice_ids: c.detect.sibling_invoice_ids,
      sibling_amount_sum: c.detect.sibling_amount_sum,
      workflow_state: 'PAID',
      human_intervention: true,
      payer_id: payerId,
      created_at: nowStr,
      notes: `Payment authorized and released by ${payerId}. Audit row persisted prior to state transition.`,
    };

    // 2. Reference written to WORM reference store
    const newWormRecord: WormRecord = {
      worm_id: `WORM-${Date.now().toString().slice(-4)}`,
      audit_row_id: auditRowId,
      document_hash: `sha256-doc-${c.case_id.toLowerCase()}`,
      inputs_hash: newAuditRow.inputs_hash,
      rule_version: c.decision.rule_version,
      model_version: c.detect.model_version,
      outcome: 'APPROVE',
      case_id: c.case_id,
      locked_at: nowStr,
      retention_days: 'THRESHOLD_UNSET',
    };

    setAuditLogs((prev) => [newAuditRow, ...prev]);
    setWormStore((prev) => [newWormRecord, ...prev]);

    // 3. Only then invoice status becomes PAID with payment_count = 1
    setCases((prev) => ({
      ...prev,
      [currentCaseId]: {
        ...c,
        state: 'PAID',
        current_step: 'pay',
        payment_count: 1,
        payment: {
          idempotency_key: idempotencyKey,
          payer_id: payerId,
          amount: c.extract.amount,
          currency: c.extract.currency,
          paid_at: nowStr,
          attempt_count: 1,
          audit_row_id: auditRowId,
        },
      },
    }));

    return {
      success: true,
      message: `Payment released successfully. Key: ${idempotencyKey}. State updated to PAID.`,
      isIdempotentRetry: false,
    };
  };

  const openContest = (actor: string, text: string): boolean => {
    const c = cases[currentCaseId];
    if (!c) return false;

    const contestId = `CNT-${Date.now().toString().slice(-4)}`;
    const nowStr = new Date().toISOString();

    // Log contest escalation
    setEscalations((prev) => [
      {
        event_id: `ESC-${Date.now().toString().slice(-4)}`,
        event_type: 'ESC_CONTEST',
        case_id: c.case_id,
        trigger_reason: `Contest opened by ${actor}: "${text}"`,
        notified_role: 'REVIEW Owner (D3b named interim)',
        timestamp: nowStr,
        resolved: false,
      },
      ...prev,
    ]);

    // Add audit row for contest opening
    const contestAudit: AuditRow = {
      audit_row_id: `AUDIT-CNT-${c.case_id}-${Date.now().toString().slice(-4)}`,
      case_id: c.case_id,
      actor: actor,
      from_state: c.state,
      to_state: 'IN_REVIEW',
      outcome: 'REVIEW',
      anomaly_rank: c.detect.anomaly_rank,
      scorer_status: c.detect.scorer_status,
      model_version: c.detect.model_version,
      rule_version: c.decision.rule_version,
      reason_codes: c.decision.reason_codes,
      inputs_hash: `sha256-cnt-${Date.now().toString().slice(-6)}`,
      linked_change_ids: c.verify.linked_change_ids,
      sibling_invoice_ids: c.detect.sibling_invoice_ids,
      sibling_amount_sum: c.detect.sibling_amount_sum,
      workflow_state: 'IN_REVIEW',
      human_intervention: true,
      created_at: nowStr,
      notes: `Supplier/AP dispute opened. Contest ID: ${contestId}. Text: ${text}`,
    };

    setAuditLogs((prev) => [contestAudit, ...prev]);

    // Case returns to IN_REVIEW with contest details preserved
    setCases((prev) => ({
      ...prev,
      [currentCaseId]: {
        ...c,
        state: 'IN_REVIEW',
        current_step: 'review',
        is_contested: true,
        contest_details: {
          contest_id: contestId,
          actor,
          text,
          opened_at: nowStr,
        },
      },
    }));

    return true;
  };

  const injectAliasTestCase = (): string => {
    const newCaseId = `INV-1006-ALIAS`;
    const newCase: CaseRecord = {
      case_id: newCaseId,
      ingest_time: new Date().toISOString(),
      source_job_id: 'JOB-ALIAS-TEST-INJECT',
      state: 'DECIDED',
      current_step: 'detect',
      notify_count: 0,
      payment_count: 0,
      extract: {
        invoice_id_raw: newCaseId,
        invoice_id_normalized: newCaseId,
        supplier_name_raw: 'Alpha Industries Supply',
        supplier_id_raw: 'V201', // RAW ALIAS KEY!
        po: 'PO-7001',
        amount: 9800,
        currency: 'USD',
        tax_id: 'US-8829102',
        approver_id: 'U11',
        bank_changed_30d: 'N',
        bank_account_raw: 'XXXX4455',
        channel: 'api',
        extractor_version: 'ocr-v2.1',
        confidence: {
          invoice_id: 0.99,
          supplier_id: 0.99,
          supplier_name: 0.99,
          po: 0.99,
          amount: 0.99,
          currency: 0.99,
          approver: 0.98,
          bank_details: 0.98,
        },
        extract_status: 'complete',
        extract_time: new Date().toISOString(),
      },
      verify: {
        supplier_id_canonical: 'V-201', // RESOLVES TO V-201!
        alias_collision: true,
        known_alias_pair: true,
        same_user_requester_approver: false,
        linked_change_ids: ['CH-89'],
        verification_method: 'callback',
        goods_receipt_status: 'Missing',
        sanctions_pep_status: 'Unknown',
      },
      detect: {
        duplicate_match_supplier_po_amount: true, // Matches INV-1001 via canonical V-201!
        duplicate_invoice_number: false,
        duplicate_prior_case_id: 'INV-1001',
        non_po_flag: false,
        sibling_invoice_ids: [],
        sibling_amount_sum: 9800,
        sod_vendor_and_pay_overlap: false,
        anomaly_rank: '#5 of 420 cohort',
        anomaly_rank_raw: 0.91,
        scorer_status: 'scored',
        score_honesty: 'SIMULATED',
        model_version: 'p2p-risk-2',
      },
      decision: {
        recommended_outcome: 'REJECT',
        final_policy_outcome: 'REVIEW',
        rules_fired: ['R-DUP', 'R-ALIAS'],
        reason_codes: ['DUP_SUPPLIER_PO_AMOUNT', 'ALIAS_CANONICAL_JOIN', 'POLICY_REVIEW'],
        rule_version: 'p2p-rules-v2.0',
        rationale_paragraph:
          'Invoice INV-1006-ALIAS with raw supplier V201 resolved to canonical V-201. Duplicate match with INV-1001 (PO-7001, 9800 USD). Outcome: REVIEW with recommended REJECT.',
        counterfactuals: ['If raw id V201 did not map to V-201, ALIAS_CANONICAL_JOIN would not fire.'],
        decided_at: new Date().toISOString(),
      },
    };

    setCases((prev) => ({
      ...prev,
      [newCaseId]: newCase,
    }));
    setCurrentCaseId(newCaseId);
    return newCaseId;
  };

  const createNewCase = (customCase: CaseRecord) => {
    setCases((prev) => ({
      ...prev,
      [customCase.case_id]: customCase,
    }));
    setCurrentCaseId(customCase.case_id);
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_cases`);
    localStorage.removeItem(`${STORAGE_KEY}_audit`);
    localStorage.removeItem(`${STORAGE_KEY}_worm`);
    localStorage.removeItem(`${STORAGE_KEY}_esc`);
    setCases(INITIAL_CASES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setWormStore(INITIAL_WORM_STORE);
    setEscalations(INITIAL_ESCALATIONS);
    setCurrentCaseId('INV-1002');
    setScorerDownMode(false);
    setAuditFailureSimulation(false);
  };

  return (
    <P2PContext.Provider
      value={{
        cases,
        currentCaseId,
        currentCase,
        activeView,
        vendorChanges: VENDOR_CHANGES,
        supplierAliases: SUPPLIER_ALIASES,
        auditLogs,
        wormStore,
        escalations,
        scorerDownMode,
        auditFailureSimulation,
        reviewerName,
        payerName,
        setReviewerName,
        setPayerName,
        setActiveView,
        selectCase,
        setStep,
        toggleScorerDown,
        toggleAuditFailure,
        recomputeCaseDecision,
        submitReview,
        sendNotification,
        executePayment,
        openContest,
        injectAliasTestCase,
        createNewCase,
        resetAllData,
      }}
    >
      {children}
    </P2PContext.Provider>
  );
};

export const useP2P = (): P2PContextType => {
  const context = useContext(P2PContext);
  if (!context) {
    throw new Error('useP2P must be used within a P2PProvider');
  }
  return context;
};
