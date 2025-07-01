import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, currentFilters, currentLanguage }) => {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    amountRange: { min: '', max: '' },
    categories: [],
    statuses: [],
    accounts: [],
    types: []
  });

  const translations = {
    en: {
      filters: 'Filters',
      dateRange: 'Date Range',
      from: 'From',
      to: 'To',
      amountRange: 'Amount Range',
      minimum: 'Minimum',
      maximum: 'Maximum',
      categories: 'Categories',
      status: 'Status',
      accounts: 'Accounts',
      transactionType: 'Transaction Type',
      applyFilters: 'Apply Filters',
      clearAll: 'Clear All',
      cancel: 'Cancel',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      transfer: 'Transfer',
      payment: 'Payment',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      refund: 'Refund'
    },
    es: {
      filters: 'Filtros',
      dateRange: 'Rango de Fechas',
      from: 'Desde',
      to: 'Hasta',
      amountRange: 'Rango de Monto',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      categories: 'Categorías',
      status: 'Estado',
      accounts: 'Cuentas',
      transactionType: 'Tipo de Transacción',
      applyFilters: 'Aplicar Filtros',
      clearAll: 'Limpiar Todo',
      cancel: 'Cancelar',
      completed: 'Completado',
      pending: 'Pendiente',
      failed: 'Fallido',
      transfer: 'Transferencia',
      payment: 'Pago',
      deposit: 'Depósito',
      withdrawal: 'Retiro',
      refund: 'Reembolso'
    },
    fr: {
      filters: 'Filtres',
      dateRange: 'Plage de dates',
      from: 'De',
      to: 'À',
      amountRange: 'Plage de montant',
      minimum: 'Minimum',
      maximum: 'Maximum',
      categories: 'Catégories',
      status: 'Statut',
      accounts: 'Comptes',
      transactionType: 'Type de transaction',
      applyFilters: 'Appliquer les filtres',
      clearAll: 'Tout effacer',
      cancel: 'Annuler',
      completed: 'Terminé',
      pending: 'En attente',
      failed: 'Échoué',
      transfer: 'Transfert',
      payment: 'Paiement',
      deposit: 'Dépôt',
      withdrawal: 'Retrait',
      refund: 'Remboursement'
    }
  };

  const categoryOptions = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Education',
    'Groceries',
    'Gas & Fuel'
  ];

  const statusOptions = ['completed', 'pending', 'failed'];
  const accountOptions = ['Main Account', 'Savings Account', 'Business Account'];
  const typeOptions = ['transfer', 'payment', 'deposit', 'withdrawal', 'refund'];

  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCheckboxChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const handleDateChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const handleAmountChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      amountRange: {
        ...prev.amountRange,
        [field]: value
      }
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      dateRange: { start: '', end: '' },
      amountRange: { min: '', max: '' },
      categories: [],
      statuses: [],
      accounts: [],
      types: []
    };
    setFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md mx-4 bg-surface rounded-t-2xl sm:rounded-2xl shadow-elevation-4 max-h-[90vh] overflow-hidden animate-slide-up sm:animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {translations[currentLanguage].filters}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} color="var(--color-text-secondary)" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96 space-y-6">
          {/* Date Range */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">
              {translations[currentLanguage].dateRange}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  {translations[currentLanguage].from}
                </label>
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  {translations[currentLanguage].to}
                </label>
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">
              {translations[currentLanguage].amountRange}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  {translations[currentLanguage].minimum}
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={filters.amountRange.min}
                  onChange={(e) => handleAmountChange('min', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  {translations[currentLanguage].maximum}
                </label>
                <Input
                  type="number"
                  placeholder="10000.00"
                  value={filters.amountRange.max}
                  onChange={(e) => handleAmountChange('max', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">
              {translations[currentLanguage].categories}
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {categoryOptions.map((category) => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={(e) => handleCheckboxChange('categories', category, e.target.checked)}
                    className="rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-text-primary">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">
              {translations[currentLanguage].status}
            </h3>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes(status)}
                    onChange={(e) => handleCheckboxChange('statuses', status, e.target.checked)}
                    className="rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-text-primary">
                    {translations[currentLanguage][status]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Accounts */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">
              {translations[currentLanguage].accounts}
            </h3>
            <div className="space-y-2">
              {accountOptions.map((account) => (
                <label key={account} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.accounts.includes(account)}
                    onChange={(e) => handleCheckboxChange('accounts', account, e.target.checked)}
                    className="rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-text-primary">{account}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transaction Types */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">
              {translations[currentLanguage].transactionType}
            </h3>
            <div className="space-y-2">
              {typeOptions.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.types.includes(type)}
                    onChange={(e) => handleCheckboxChange('types', type, e.target.checked)}
                    className="rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-text-primary">
                    {translations[currentLanguage][type]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleClearAll}
          >
            {translations[currentLanguage].clearAll}
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              {translations[currentLanguage].cancel}
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
            >
              {translations[currentLanguage].applyFilters}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;