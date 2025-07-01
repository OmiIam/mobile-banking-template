import React from 'react';
import Icon from '../../../components/AppIcon';

const PeriodSelector = ({ selectedPeriod, onPeriodChange, currentLanguage }) => {
  const translations = {
    en: {
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly',
      selectPeriod: 'Select Period'
    },
    es: {
      weekly: 'Semanal',
      monthly: 'Mensual',
      yearly: 'Anual',
      selectPeriod: 'Seleccionar Período'
    },
    fr: {
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      yearly: 'Annuel',
      selectPeriod: 'Sélectionner la Période'
    }
  };

  const periods = [
    { id: 'weekly', label: translations[currentLanguage].weekly, icon: 'Calendar' },
    { id: 'monthly', label: translations[currentLanguage].monthly, icon: 'CalendarDays' },
    { id: 'yearly', label: translations[currentLanguage].yearly, icon: 'CalendarRange' }
  ];

  return (
    <div className="bg-surface rounded-2xl p-4 shadow-elevation-1 border border-border mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text-secondary">
          {translations[currentLanguage].selectPeriod}
        </h3>
        <div className="flex items-center space-x-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => onPeriodChange(period.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 ease-out
                ${selectedPeriod === period.id
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon 
                name={period.icon} 
                size={16} 
                color={selectedPeriod === period.id ? 'white' : 'var(--color-text-secondary)'}
              />
              <span>{period.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodSelector;