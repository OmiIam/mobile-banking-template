import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll, currentLanguage }) => {
  const translations = {
    en: {
      clearAll: 'Clear All',
      dateRange: 'Date Range',
      amount: 'Amount',
      category: 'Category',
      status: 'Status',
      account: 'Account',
      type: 'Type'
    },
    es: {
      clearAll: 'Limpiar Todo',
      dateRange: 'Rango de Fechas',
      amount: 'Monto',
      category: 'Categoría',
      status: 'Estado',
      account: 'Cuenta',
      type: 'Tipo'
    },
    fr: {
      clearAll: 'Tout effacer',
      dateRange: 'Plage de dates',
      amount: 'Montant',
      category: 'Catégorie',
      status: 'Statut',
      account: 'Compte',
      type: 'Type'
    }
  };

  const formatFilterValue = (filter) => {
    switch (filter.type) {
      case 'dateRange':
        return `${filter.startDate} - ${filter.endDate}`;
      case 'amount':
        return `$${filter.min} - $${filter.max}`;
      case 'category': case'status': case'account': case'type':
        return filter.value;
      default:
        return filter.value;
    }
  };

  const getFilterLabel = (filter) => {
    return translations[currentLanguage][filter.type] || filter.type;
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <div className="flex items-center space-x-2 flex-shrink-0">
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-accent/10 text-accent px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap"
          >
            <span>
              {getFilterLabel(filter)}: {formatFilterValue(filter)}
            </span>
            <button
              onClick={() => onRemoveFilter(filter)}
              className="p-0.5 hover:bg-accent/20 rounded-full transition-colors duration-200"
              aria-label={`Remove ${getFilterLabel(filter)} filter`}
            >
              <Icon
                name="X"
                size={12}
                color="var(--color-accent)"
              />
            </button>
          </div>
        ))}
      </div>
      
      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="flex items-center space-x-1 text-text-secondary hover:text-text-primary px-3 py-2 rounded-full hover:bg-muted transition-colors duration-200 text-sm font-medium whitespace-nowrap"
        >
          <Icon
            name="X"
            size={14}
          />
          <span>{translations[currentLanguage].clearAll}</span>
        </button>
      )}
    </div>
  );
};

export default FilterChips;