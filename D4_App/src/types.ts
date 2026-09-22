/**
 * Procure-to-Pay Payment Control & Exception Governance Types
 * PRD Version: D3a
 */

export type Outcome = 'APPROVE' | 'REVIEW' | 'REJECT';

export type WorkflowState =
  | 'INGESTED'
  | 'EXTRACTED'
  | 'VERIFIED'
  | 'DETECTED'
  | 'SCORED'
  | 'UNSCORED'
  | 'DECIDED'
  | 'IN_REVIEW'
  | 'REVIEWED'
  | 'NOTIFIED'
  | 'PAID'
  | 'REJECTED';

export type StepName =
  | 'ingest'
  | 'extract'
  | 'verify'
  | 'detect'
  | 'score'
  | 'decide'
  | 'review'
  | 'notify'
  | 'pay';

export type HonestyLabel = 'REAL' | 'PRECOMPUTED' | 'SIMULATED' | 'EDUCATIONAL';

export type RuleId =
  | 'R-DUP'
  | 'R-ALIAS'
  | 'R-SOD-BANK'
  | 'R-BANK-SPLIT'
  | 'R-NONPO'
  | 'R-UNSCORED'
  | 'R-EXTRACT';

export type ReasonCode =
  | 'DUP_SUPPLIER_PO_AMOUNT'
  | 'DUP_INVOICE_NUMBER'
  | 'ALIAS_CANONICAL_JOIN'
  | 'SOD_SAME_USER_BANK'
  | 'BANK_CHANGE_LINKED'
  | 'NON_PO'
  | 'SPLIT_SIBLING_SUM'
  | 'EXTRACT_UNCERTAIN'
  | 'SCORER_UNSCORED'
  | 'MODEL_RANK'
  | 'POLICY_REVIEW'
  | 'POLICY_APPROVE'
  | 'POLICY_REJECT';

export type EscalationEventType =
  | 'ESC_DUP'
  | 'ESC_ALIAS'
  | 'ESC_SOD'
  | 'ESC_BANK_SPLIT'
  | 'ESC_UNSCORED'
  | 'ESC_EXTRACT'
  | 'ESC_P2P05'
  | 'ESC_CONTEST';

export interface VendorMasterChange {
  change_id: string; // e.g. CH-88, CH-89
  supplier_id_raw: string; // e.g. V-311, V-201
  field: 'bank_account' | 'email' | 'address';
  old_value: string;
  new_value: string;
  requester_id: string; // e.g. U22, U18
  approver_id: string; // e.g. U22, U19
  timestamp: string;
  result: 'SUCCESS' | 'HELD_FOR_REVIEW' | 'REJECTED';
  document_hash?: string;
}

export interface SupplierAlias {
  raw_id: string; // e.g. V201, V-201
  canonical_id: string; // e.g. V-201
  supplier_name: string; // e.g. Alpha Industries Supply, Alpha Industrial Supply
  email: string;
  masked_bank: string;
}

export interface ExtractConfidence {
  invoice_id: number;
  supplier_id: number;
  supplier_name: number;
  po: number;
  amount: number;
  currency: number;
  approver: number;
  bank_details: number;
}

export interface ExtractData {
  invoice_id_raw: string;
  invoice_id_normalized: string;
  supplier_name_raw: string;
  supplier_id_raw: string;
  po: string;
  amount: number;
  currency: string;
  tax_id?: string;
  approver_id: string;
  bank_changed_30d: 'Y' | 'N';
  bank_account_raw?: string;
  channel: 'batch' | 'api';
  extractor_version: string;
  confidence: ExtractConfidence;
  extract_status: 'complete' | 'uncertain';
  extract_time: string;
}

export interface VerifyData {
  supplier_id_canonical: string;
  alias_collision: boolean;
  known_alias_pair: boolean;
  same_user_requester_approver: boolean;
  linked_change_ids: string[];
  verification_method: 'callback' | 'none' | 'Missing';
  goods_receipt_status: 'present' | 'Missing';
  sanctions_pep_status: 'Unknown';
}

export interface DetectData {
  duplicate_match_supplier_po_amount: boolean;
  duplicate_invoice_number: boolean;
  duplicate_prior_case_id?: string;
  non_po_flag: boolean;
  sibling_invoice_ids: string[];
  sibling_amount_sum: number;
  sod_vendor_and_pay_overlap: boolean;
  anomaly_rank: string | null; // Uncalibrated rank representation, e.g. "#14 of 420"
  anomaly_rank_raw?: number | null; // e.g. 0.87
  scorer_status: 'scored' | 'unscored';
  score_honesty: HonestyLabel;
  model_version: string;
}

export interface DecisionData {
  recommended_outcome: Outcome;
  final_policy_outcome: Outcome;
  rules_fired: RuleId[];
  reason_codes: ReasonCode[];
  rule_version: string;
  rationale_paragraph: string;
  counterfactuals: string[];
  decided_at: string;
}

export interface ReviewData {
  reviewer_id: string; // Named human account required
  disposition: 'agree' | 'disagree' | 'override';
  final_outcome: Outcome;
  reason_codes: ReasonCode[];
  notes: string;
  reviewed_at: string;
  time_spent_seconds: number;
}

export interface NotifyRecord {
  idempotency_key: string; // {case_id}:notify
  recipient_email: string;
  masked_bank: string;
  outcome: Outcome;
  reason_codes: ReasonCode[];
  notified_at: string;
  attempt_count: number;
}

export interface PaymentRecord {
  idempotency_key: string; // {case_id}:payment
  payer_id: string;
  amount: number;
  currency: string;
  paid_at: string;
  attempt_count: number;
  audit_row_id: string;
}

export interface CaseRecord {
  case_id: string; // e.g. INV-1001, INV-1002, INV-1003, INV-1004
  ingest_time: string;
  source_job_id: string;
  state: WorkflowState;
  current_step: StepName;
  extract: ExtractData;
  verify: VerifyData;
  detect: DetectData;
  decision: DecisionData;
  review?: ReviewData;
  notify?: NotifyRecord;
  payment?: PaymentRecord;
  notify_count: number;
  payment_count: number;
  is_contested?: boolean;
  contest_details?: {
    contest_id: string;
    actor: string;
    text: string;
    opened_at: string;
  };
}

export interface AuditRow {
  audit_row_id: string;
  case_id: string;
  actor: string;
  from_state: WorkflowState;
  to_state: WorkflowState;
  outcome: Outcome;
  anomaly_rank: string | null;
  scorer_status: 'scored' | 'unscored';
  model_version: string;
  rule_version: string;
  prompt_ids?: string;
  reason_codes: ReasonCode[];
  inputs_hash: string;
  linked_change_ids: string[];
  sibling_invoice_ids: string[];
  sibling_amount_sum: number;
  workflow_state: WorkflowState;
  human_intervention: boolean;
  reviewer_id?: string;
  payer_id?: string;
  created_at: string;
  notes?: string;
}

export interface WormRecord {
  worm_id: string;
  audit_row_id: string;
  document_hash: string;
  inputs_hash: string;
  rule_version: string;
  model_version: string;
  outcome: Outcome;
  case_id: string;
  locked_at: string;
  retention_days: 'THRESHOLD_UNSET';
}

export interface EscalationEvent {
  event_id: string;
  event_type: EscalationEventType;
  case_id: string;
  trigger_reason: string;
  notified_role: string;
  timestamp: string;
  resolved: boolean;
}
