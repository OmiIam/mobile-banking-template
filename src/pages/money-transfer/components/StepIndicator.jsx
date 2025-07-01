import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps, currentLanguage }) => {
  const translations = {
    en: {
      steps: ['Amount', 'Recipient', 'Review', 'Confirm'],
      stepLabels: {
        1: 'Enter transfer amount',
        2: 'Select recipient',
        3: 'Review details',
        4: 'Confirm transfer'
      }
    },
    es: {
      steps: ['Monto', 'Destinatario', 'Revisar', 'Confirmar'],
      stepLabels: {
        1: 'Ingresar monto de transferencia',
        2: 'Seleccionar destinatario',
        3: 'Revisar detalles',
        4: 'Confirmar transferencia'
      }
    },
    fr: {
      steps: ['Montant', 'Destinataire', 'Réviser', 'Confirmer'],
      stepLabels: {
        1: 'Entrer le montant du transfert',
        2: 'Sélectionner le destinataire',
        3: 'Réviser les détails',
        4: 'Confirmer le transfert'
      }
    }
  };

  const steps = translations[currentLanguage].steps;
  const stepLabels = translations[currentLanguage].stepLabels;

  return (
    <div className="bg-surface border-b border-border px-4 py-6">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-accent transform -translate-y-1/2 transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${isCompleted 
                    ? 'bg-success text-success-foreground shadow-md' 
                    : isCurrent 
                      ? 'bg-accent text-accent-foreground shadow-md ring-4 ring-accent/20' 
                      : 'bg-border text-text-secondary'
                  }
                `}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} strokeWidth={2.5} />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                <div className="mt-2 text-center">
                  <p className={`
                    text-xs font-medium transition-colors duration-200
                    ${isCurrent 
                      ? 'text-accent' 
                      : isCompleted 
                        ? 'text-success' :'text-text-secondary'
                    }
                  `}>
                    {step}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Info */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-text-primary mb-1">
          Step {currentStep} of {totalSteps}
        </h1>
        <p className="text-sm text-text-secondary">
          {stepLabels[currentStep]}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;