import React from 'react';
import { Check, Circle } from 'lucide-react';
import { ApplicationStep } from '../types/ApplicationTypes';

interface ApplicationProgressTrackerProps {
  currentStep: ApplicationStep;
  completedSteps: ApplicationStep[];
}

const ApplicationProgressTracker: React.FC<ApplicationProgressTrackerProps> = ({
  currentStep,
  completedSteps
}) => {
  const steps = [
    { key: 'personal', label: 'Personal', number: 1 },
    { key: 'income', label: 'Income', number: 2 },
    { key: 'vehicle', label: 'Vehicle', number: 3 },
    { key: 'documents', label: 'Picture Required', number: 4 }
  ];

  const getStepStatus = (stepKey: string) => {
    if (completedSteps.includes(stepKey as ApplicationStep)) {
      return 'completed';
    }
    if (stepKey === currentStep) {
      return 'current';
    }
    return 'pending';
  };

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const status = getStepStatus(step.key);
        const isLast = index === steps.length - 1;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  status === 'completed'
                    ? 'bg-primary-500 text-white'
                    : status === 'current'
                    ? 'bg-primary-100 text-primary-500 border-2 border-primary-500'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {status === 'completed' ? (
                  <Check size={20} />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  status === 'current' ? 'text-primary-500' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`w-16 h-0.5 mx-4 transition-all duration-200 ${
                  completedSteps.includes(steps[index + 1].key as ApplicationStep)
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationProgressTracker;