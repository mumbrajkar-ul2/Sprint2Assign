import React from 'react';
import { useP2P } from '../../context/P2PContext';
import { StepName } from '../../types';
import { Step1Ingest } from '../WorkflowSteps/Step1Ingest';
import { Step2Extract } from '../WorkflowSteps/Step2Extract';
import { Step3Verify } from '../WorkflowSteps/Step3Verify';
import { Step4Detect } from '../WorkflowSteps/Step4Detect';
import { Step5ScoreDecide } from '../WorkflowSteps/Step5ScoreDecide';
import { Step6Review } from '../WorkflowSteps/Step6Review';
import { Step7Notify } from '../WorkflowSteps/Step7Notify';
import { Step8Pay } from '../WorkflowSteps/Step8Pay';
import {
  UploadCloud,
  FileSpreadsheet,
  ShieldCheck,
  Search,
  Gavel,
  Users,
  BellRing,
  DollarSign,
  ChevronRight,
} from 'lucide-react';

const STEPS: { id: StepName; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'ingest', label: '1. Ingest', icon: UploadCloud },
  { id: 'extract', label: '2. Extract', icon: FileSpreadsheet },
  { id: 'verify', label: '3. Verify', icon: ShieldCheck },
  { id: 'detect', label: '4. Detect', icon: Search },
  { id: 'score', label: '5. Score + Decide', icon: Gavel },
  { id: 'review', label: '6. Review', icon: Users },
  { id: 'notify', label: '7. Notify', icon: BellRing },
  { id: 'pay', label: '8. Pay', icon: DollarSign },
];

export const WorkflowView: React.FC = () => {
  const { currentCase, setStep } = useP2P();

  const currentStep = currentCase.current_step;

  const renderActiveStep = () => {
    switch (currentStep) {
      case 'ingest':
        return <Step1Ingest />;
      case 'extract':
        return <Step2Extract />;
      case 'verify':
        return <Step3Verify />;
      case 'detect':
        return <Step4Detect />;
      case 'score':
      case 'decide':
        return <Step5ScoreDecide />;
      case 'review':
        return <Step6Review />;
      case 'notify':
        return <Step7Notify />;
      case 'pay':
        return <Step8Pay />;
      default:
        return <Step1Ingest />;
    }
  };

  const getStepIndex = (s: StepName) => {
    if (s === 'decide') return 4;
    return STEPS.findIndex((step) => step.id === s);
  };

  const currentIdx = getStepIndex(currentStep);

  return (
    <div className="space-y-6">
      {/* 8-Step Interactive Breadcrumb Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center min-w-max gap-1">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive =
              currentStep === step.id || (step.id === 'score' && currentStep === 'decide');
            const isCompleted = currentIdx > idx;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setStep(step.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                      : isCompleted
                      ? 'text-slate-200 hover:bg-slate-800/80'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  />
                  <span>{step.label}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Render Current Workflow Screen */}
      <div>{renderActiveStep()}</div>
    </div>
  );
};
