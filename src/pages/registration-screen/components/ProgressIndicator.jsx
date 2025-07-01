import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
              ${currentStep >= step.id 
                ? 'bg-accent text-accent-foreground shadow-md' 
                : currentStep === step.id - 1
                ? 'bg-accent/20 text-accent border-2 border-accent' :'bg-muted text-text-secondary'
              }
            `}>
              {currentStep > step.id ? (
                <Icon name="Check" size={16} strokeWidth={2.5} />
              ) : (
                step.id
              )}
              {currentStep === step.id && (
                <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-25"></div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-12 sm:w-16 h-0.5 mx-2 transition-all duration-300
                ${currentStep > step.id ? 'bg-accent' : 'bg-border'}
              `} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-1">
          {steps[currentStep - 1]?.title}
        </h2>
        <p className="text-sm text-text-secondary">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;