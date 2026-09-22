/**
 * Procure-to-Pay Governed Decision Rules Engine
 * PRD Version: D3a (Section 3.7 & 3.8)
 */

import {
  CaseRecord,
  DecisionData,
  RuleId,
  ReasonCode,
  Outcome,
  ExtractData,
  VerifyData,
  DetectData,
} from '../types';

export const RULE_PACK_VERSION = 'p2p-rules-v2.0';

export interface EvaluationResult {
  recommended_outcome: Outcome;
  final_policy_outcome: Outcome;
  rules_fired: RuleId[];
  reason_codes: ReasonCode[];
  rule_version: string;
  rationale_paragraph: string;
  counterfactuals: string[];
}

export function evaluateP2PRules(
  caseId: string,
  extract: ExtractData,
  verify: VerifyData,
  detect: DetectData
): EvaluationResult {
  const rulesFired: RuleId[] = [];
  const reasonCodes: ReasonCode[] = [];
  const counterfactuals: string[] = [];

  // Check 1: Extract completeness / uncertainty (R-EXTRACT)
  if (
    extract.extract_status === 'uncertain' ||
    !extract.invoice_id_raw ||
    !extract.supplier_id_raw ||
    !extract.amount ||
    !extract.currency
  ) {
    rulesFired.push('R-EXTRACT');
    reasonCodes.push('EXTRACT_UNCERTAIN');
    counterfactuals.push(
      'If high-confidence extraction was achieved across all required fields, R-EXTRACT would not fire.'
    );
  }

  // Check 2: Scorer status / outage (R-UNSCORED)
  if (detect.scorer_status === 'unscored' || detect.anomaly_rank === null) {
    rulesFired.push('R-UNSCORED');
    reasonCodes.push('SCORER_UNSCORED');
    counterfactuals.push(
      'If the ML scoring service responded with a valid rank, R-UNSCORED would not fire.'
    );
  }

  // Check 3: Segregation of Duties on bank change (R-SOD-BANK)
  if (verify.same_user_requester_approver) {
    rulesFired.push('R-SOD-BANK');
    reasonCodes.push('SOD_SAME_USER_BANK');
    counterfactuals.push(
      'If requester and approver on the vendor change were distinct authorized identities, SOD_SAME_USER_BANK would not fire.'
    );
  }

  // Check 4: Duplicate match (R-DUP & R-ALIAS)
  if (detect.duplicate_match_supplier_po_amount) {
    rulesFired.push('R-DUP');
    reasonCodes.push('DUP_SUPPLIER_PO_AMOUNT');
    if (detect.duplicate_prior_case_id) {
      counterfactuals.push(
        `If prior case ${detect.duplicate_prior_case_id} did not already exist with canonical supplier ${verify.supplier_id_canonical}, PO ${extract.po}, and amount ${extract.amount} ${extract.currency}, DUP_SUPPLIER_PO_AMOUNT would not fire.`
      );
    }
    if (verify.alias_collision && extract.supplier_id_raw !== verify.supplier_id_canonical) {
      rulesFired.push('R-ALIAS');
      reasonCodes.push('ALIAS_CANONICAL_JOIN');
      counterfactuals.push(
        `Raw supplier id ${extract.supplier_id_raw} was resolved to canonical ${verify.supplier_id_canonical} via alias catalog.`
      );
    }
  }

  if (detect.duplicate_invoice_number) {
    reasonCodes.push('DUP_INVOICE_NUMBER');
  }

  // Check 5: Bank change linked + split/non-PO (R-BANK-SPLIT)
  const hasLinkedBankChange = verify.linked_change_ids.length > 0;
  const isSplitOrNonPo = detect.non_po_flag || detect.sibling_invoice_ids.length > 0;

  if (hasLinkedBankChange && isSplitOrNonPo) {
    rulesFired.push('R-BANK-SPLIT');
    if (hasLinkedBankChange) {
      reasonCodes.push('BANK_CHANGE_LINKED');
    }
    if (detect.sibling_invoice_ids.length > 0) {
      reasonCodes.push('SPLIT_SIBLING_SUM');
      counterfactuals.push(
        `If sibling invoice ${detect.sibling_invoice_ids.join(', ')} did not exist, pair sum of ${detect.sibling_amount_sum} ${extract.currency} would not trigger SPLIT_SIBLING_SUM.`
      );
    }
  }

  // Check 6: Non-PO invoice (R-NONPO)
  if (detect.non_po_flag || extract.po.trim() === '') {
    if (!rulesFired.includes('R-NONPO')) {
      rulesFired.push('R-NONPO');
    }
    if (!reasonCodes.includes('NON_PO')) {
      reasonCodes.push('NON_PO');
    }
    counterfactuals.push('If an authorized PO reference was attached to the invoice, NON_PO would not fire.');
  }

  // Determine Outcomes based on Precedence (P2P-FR-038)
  let recommendedOutcome: Outcome = 'APPROVE';
  let finalPolicyOutcome: Outcome = 'APPROVE';

  if (rulesFired.length > 0) {
    // There are exception flags
    // Precedence recommendations:
    if (rulesFired.includes('R-DUP')) {
      recommendedOutcome = 'REJECT'; // Recommended REJECT the duplicate payment
    } else if (rulesFired.includes('R-SOD-BANK')) {
      recommendedOutcome = 'REJECT'; // Recommended REJECT applying change
    } else if (rulesFired.includes('R-BANK-SPLIT')) {
      recommendedOutcome = 'REJECT'; // Recommended REJECT silent pay
    } else {
      recommendedOutcome = 'REVIEW';
    }

    // Per P2P-FR-037 & P2P-FR-041: Until a D3b ADR names auto-REJECT conditions,
    // the final money outcome for exception flags is REVIEW. A named person writes the final REJECT or APPROVE.
    finalPolicyOutcome = 'REVIEW';
    reasonCodes.push('POLICY_REVIEW');
  } else {
    // All checks clean and scored
    recommendedOutcome = 'APPROVE';
    finalPolicyOutcome = 'APPROVE';
    reasonCodes.push('POLICY_APPROVE');
    counterfactuals.push('No exception rules fired. Canonical identity verified, valid PO, and clean scoring.');
  }

  // Build Rationale Paragraph (P2P-FR-044)
  const uniqueReasonCodes = Array.from(new Set(reasonCodes));
  const linkedChangesStr =
    verify.linked_change_ids.length > 0 ? verify.linked_change_ids.join(', ') : 'none';
  const siblingStr =
    detect.sibling_invoice_ids.length > 0
      ? `${detect.sibling_invoice_ids.join(', ')} sum ${detect.sibling_amount_sum} ${extract.currency}`
      : 'none';
  const duplicateStr = detect.duplicate_prior_case_id
    ? ` Duplicate of ${detect.duplicate_prior_case_id} by supplier, PO, amount, and currency.`
    : '';
  const modelStr =
    detect.scorer_status === 'unscored'
      ? 'unscored'
      : `${detect.model_version}, rank ${detect.anomaly_rank || 'empty'} (uncalibrated ranking)`;
  const extractStr = extract.extract_status === 'complete' ? 'complete' : 'uncertain';

  const rationaleParagraph = `Invoice ${caseId} for supplier ${verify.supplier_id_canonical} amount ${extract.amount} ${extract.currency}. Policy outcome ${finalPolicyOutcome}. Reasons: ${uniqueReasonCodes.join(', ')}. Linked changes: ${linkedChangesStr}. Sibling invoices: ${siblingStr}.${duplicateStr} Model: ${modelStr}. Rule pack ${RULE_PACK_VERSION}. Extract: ${extractStr}.`;

  return {
    recommended_outcome: recommendedOutcome,
    final_policy_outcome: finalPolicyOutcome,
    rules_fired: rulesFired,
    reason_codes: uniqueReasonCodes,
    rule_version: RULE_PACK_VERSION,
    rationale_paragraph: rationaleParagraph,
    counterfactuals,
  };
}
