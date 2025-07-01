import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetManagement = ({ currentLanguage }) => {
  const [budgets, setBudgets] = useState([]);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const translations = {
    en: {
      budgetManagement: 'Budget Management',
      addBudget: 'Add Budget',
      totalBudget: 'Total Budget',
      totalSpent: 'Total Spent',
      remaining: 'Remaining',
      exceeded: 'Exceeded',
      onTrack: 'On Track',
      nearLimit: 'Near Limit',
      overBudget: 'Over Budget',
      spent: 'spent',
      of: 'of',
      setBudget: 'Set Budget',
      editBudget: 'Edit Budget',
      deleteBudget: 'Delete Budget',
      newBudget: 'New Budget',
      category: 'Category',
      monthlyLimit: 'Monthly Limit',
      createBudget: 'Create Budget',
      cancel: 'Cancel',
      alertThreshold: 'Alert at',
      percentOfBudget: '% of budget'
    },
    es: {
      budgetManagement: 'Gestión de Presupuesto',
      addBudget: 'Agregar Presupuesto',
      totalBudget: 'Presupuesto Total',
      totalSpent: 'Total Gastado',
      remaining: 'Restante',
      exceeded: 'Excedido',
      onTrack: 'En Camino',
      nearLimit: 'Cerca del Límite',
      overBudget: 'Sobre Presupuesto',
      spent: 'gastado',
      of: 'de',
      setBudget: 'Establecer Presupuesto',
      editBudget: 'Editar Presupuesto',
      deleteBudget: 'Eliminar Presupuesto',
      newBudget: 'Nuevo Presupuesto',
      category: 'Categoría',
      monthlyLimit: 'Límite Mensual',
      createBudget: 'Crear Presupuesto',
      cancel: 'Cancelar',
      alertThreshold: 'Alerta en',
      percentOfBudget: '% del presupuesto'
    },
    fr: {
      budgetManagement: 'Gestion du Budget',
      addBudget: 'Ajouter un Budget',
      totalBudget: 'Budget Total',
      totalSpent: 'Total Dépensé',
      remaining: 'Restant',
      exceeded: 'Dépassé',
      onTrack: 'Sur la Bonne Voie',
      nearLimit: 'Près de la Limite',
      overBudget: 'Hors Budget',
      spent: 'dépensé',
      of: 'de',
      setBudget: 'Définir le Budget',
      editBudget: 'Modifier le Budget',
      deleteBudget: 'Supprimer le Budget',
      newBudget: 'Nouveau Budget',
      category: 'Catégorie',
      monthlyLimit: 'Limite Mensuelle',
      createBudget: 'Créer le Budget',
      cancel: 'Annuler',
      alertThreshold: 'Alerte à',
      percentOfBudget: '% du budget'
    }
  };

  const categoryIcons = {
    'Food & Dining': 'UtensilsCrossed',
    'Transportation': 'Car',
    'Shopping': 'ShoppingBag',
    'Entertainment': 'Music',
    'Bills & Utilities': 'Zap',
    'Healthcare': 'Heart',
    'Travel': 'Plane',
    'Other': 'MoreHorizontal'
  };

  const categoryColors = {
    'Food & Dining': '#E67E22',
    'Transportation': '#3498DB',
    'Shopping': '#E74C3C',
    'Entertainment': '#9B59B6',
    'Bills & Utilities': '#F39C12',
    'Healthcare': '#1ABC9C',
    'Travel': '#34495E',
    'Other': '#95A5A6'
  };

  useEffect(() => {
    const mockBudgets = [
      {
        id: 1,
        category: 'Food & Dining',
        limit: 800,
        spent: 856.43,
        alertThreshold: 80,
        period: 'monthly'
      },
      {
        id: 2,
        category: 'Transportation',
        limit: 600,
        spent: 542.18,
        alertThreshold: 80,
        period: 'monthly'
      },
      {
        id: 3,
        category: 'Shopping',
        limit: 500,
        spent: 483.92,
        alertThreshold: 80,
        period: 'monthly'
      },
      {
        id: 4,
        category: 'Entertainment',
        limit: 300,
        spent: 341.52,
        alertThreshold: 80,
        period: 'monthly'
      },
      {
        id: 5,
        category: 'Bills & Utilities',
        limit: 350,
        spent: 284.77,
        alertThreshold: 80,
        period: 'monthly'
      },
      {
        id: 6,
        category: 'Healthcare',
        limit: 200,
        spent: 199.34,
        alertThreshold: 80,
        period: 'monthly'
      }
    ];
    setBudgets(mockBudgets);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getBudgetProgress = (spent, limit) => {
    return Math.min((spent / limit) * 100, 100);
  };

  const getBudgetStatus = (spent, limit, alertThreshold) => {
    const percentage = (spent / limit) * 100;
    if (percentage > 100) return 'overBudget';
    if (percentage >= alertThreshold) return 'nearLimit';
    return 'onTrack';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'onTrack':
        return 'var(--color-success)';
      case 'nearLimit':
        return 'var(--color-warning)';
      case 'overBudget':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'onTrack':
        return translations[currentLanguage].onTrack;
      case 'nearLimit':
        return translations[currentLanguage].nearLimit;
      case 'overBudget':
        return translations[currentLanguage].overBudget;
      default:
        return '';
    }
  };

  const getTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.limit, 0);
  };

  const getTotalSpent = () => {
    return budgets.reduce((total, budget) => total + budget.spent, 0);
  };

  const getTotalRemaining = () => {
    return Math.max(getTotalBudget() - getTotalSpent(), 0);
  };

  const getTotalExceeded = () => {
    return Math.max(getTotalSpent() - getTotalBudget(), 0);
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {translations[currentLanguage].budgetManagement}
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAddBudgetModal(true)}
          iconName="Plus"
          iconPosition="left"
          size="sm"
        >
          {translations[currentLanguage].addBudget}
        </Button>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">
                {translations[currentLanguage].totalBudget}
              </p>
              <p className="text-xl font-bold text-text-primary font-mono">
                {formatCurrency(getTotalBudget())}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Target" size={20} color="var(--color-primary)" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-warning/10 to-error/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">
                {translations[currentLanguage].totalSpent}
              </p>
              <p className="text-xl font-bold text-text-primary font-mono">
                {formatCurrency(getTotalSpent())}
              </p>
            </div>
            <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="var(--color-warning)" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-success/10 to-accent/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">
                {getTotalExceeded() > 0 ? translations[currentLanguage].exceeded : translations[currentLanguage].remaining}
              </p>
              <p className={`text-xl font-bold font-mono ${getTotalExceeded() > 0 ? 'text-error' : 'text-success'}`}>
                {formatCurrency(getTotalExceeded() > 0 ? getTotalExceeded() : getTotalRemaining())}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTotalExceeded() > 0 ? 'bg-error/20' : 'bg-success/20'}`}>
              <Icon 
                name={getTotalExceeded() > 0 ? "AlertTriangle" : "CheckCircle"} 
                size={20} 
                color={getTotalExceeded() > 0 ? "var(--color-error)" : "var(--color-success)"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Budget List */}
      <div className="space-y-4">
        {budgets.map((budget) => {
          const progressPercentage = getBudgetProgress(budget.spent, budget.limit);
          const status = getBudgetStatus(budget.spent, budget.limit, budget.alertThreshold);
          const remaining = Math.max(budget.limit - budget.spent, 0);
          const exceeded = Math.max(budget.spent - budget.limit, 0);

          return (
            <div 
              key={budget.id}
              className="p-4 bg-muted rounded-xl hover:bg-border-light transition-colors duration-200"
            >
              {/* Budget Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${categoryColors[budget.category]}20` }}
                  >
                    <Icon 
                      name={categoryIcons[budget.category] || 'Circle'} 
                      size={20} 
                      color={categoryColors[budget.category]}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{budget.category}</h3>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ 
                          backgroundColor: `${getStatusColor(status)}20`,
                          color: getStatusColor(status)
                        }}
                      >
                        {getStatusText(status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-text-primary">
                    {formatCurrency(budget.spent)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {translations[currentLanguage].of} {formatCurrency(budget.limit)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    {progressPercentage.toFixed(1)}% {translations[currentLanguage].spent}
                  </span>
                  <span 
                    className="font-medium"
                    style={{ color: getStatusColor(status) }}
                  >
                    {exceeded > 0 
                      ? `${formatCurrency(exceeded)} ${translations[currentLanguage].exceeded}`
                      : `${formatCurrency(remaining)} ${translations[currentLanguage].remaining}`
                    }
                  </span>
                </div>
                
                <div className="w-full bg-border-light rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(progressPercentage, 100)}%`,
                      backgroundColor: getStatusColor(status)
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{formatCurrency(0)}</span>
                  <span className="text-warning">
                    {budget.alertThreshold}%
                  </span>
                  <span>{formatCurrency(budget.limit)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  className="flex-1"
                  onClick={() => setSelectedBudget(budget)}
                >
                  {translations[currentLanguage].editBudget}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  className="flex-1"
                >
                  {translations[currentLanguage].deleteBudget}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Budget Modal */}
      {showAddBudgetModal && (
        <div className="fixed inset-0 z-200 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowAddBudgetModal(false)}
          />
          <div className="relative w-full max-w-md mx-4 bg-surface rounded-2xl shadow-elevation-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">
                {translations[currentLanguage].newBudget}
              </h3>
              <button
                onClick={() => setShowAddBudgetModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={20} color="var(--color-text-secondary)" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].category}
                </label>
                <select className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                  <option value="">Select category</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bills & Utilities">Bills & Utilities</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].monthlyLimit}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-mono"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].alertThreshold}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="80"
                    min="1"
                    max="100"
                    className="w-full pr-8 pl-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                    %
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 pt-4">
                <Button
                  variant="primary"
                  onClick={() => setShowAddBudgetModal(false)}
                  fullWidth
                >
                  {translations[currentLanguage].createBudget}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowAddBudgetModal(false)}
                  fullWidth
                >
                  {translations[currentLanguage].cancel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetManagement;