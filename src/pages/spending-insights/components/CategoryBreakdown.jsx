import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryBreakdown = ({ selectedPeriod, currentLanguage }) => {
  const [categories, setCategories] = useState([]);

  const translations = {
    en: {
      categoryBreakdown: 'Category Breakdown',
      viewAll: 'View All',
      spent: 'spent',
      budget: 'budget',
      remaining: 'remaining',
      exceeded: 'exceeded',
      onTrack: 'on track',
      overBudget: 'over budget'
    },
    es: {
      categoryBreakdown: 'Desglose por Categoría',
      viewAll: 'Ver Todo',
      spent: 'gastado',
      budget: 'presupuesto',
      remaining: 'restante',
      exceeded: 'excedido',
      onTrack: 'en camino',
      overBudget: 'sobre presupuesto'
    },
    fr: {
      categoryBreakdown: 'Répartition par Catégorie',
      viewAll: 'Voir Tout',
      spent: 'dépensé',
      budget: 'budget',
      remaining: 'restant',
      exceeded: 'dépassé',
      onTrack: 'sur la bonne voie',
      overBudget: 'hors budget'
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
    const mockCategories = [
      {
        id: 1,
        name: 'Food & Dining',
        spent: 856.43,
        budget: 800.00,
        previousPeriod: 742.18,
        transactions: 24
      },
      {
        id: 2,
        name: 'Transportation',
        spent: 542.18,
        budget: 600.00,
        previousPeriod: 598.45,
        transactions: 18
      },
      {
        id: 3,
        name: 'Shopping',
        spent: 483.92,
        budget: 500.00,
        previousPeriod: 521.33,
        transactions: 12
      },
      {
        id: 4,
        name: 'Entertainment',
        spent: 341.52,
        budget: 300.00,
        previousPeriod: 289.76,
        transactions: 8
      },
      {
        id: 5,
        name: 'Bills & Utilities',
        spent: 284.77,
        budget: 350.00,
        previousPeriod: 298.12,
        transactions: 6
      },
      {
        id: 6,
        name: 'Healthcare',
        spent: 199.34,
        budget: 200.00,
        previousPeriod: 156.89,
        transactions: 4
      }
    ];
    setCategories(mockCategories);
  }, [selectedPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPercentageChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  const getBudgetProgress = (spent, budget) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getBudgetStatus = (spent, budget) => {
    if (spent > budget) return 'overBudget';
    return 'onTrack';
  };

  const getBudgetStatusColor = (spent, budget) => {
    if (spent > budget) return 'var(--color-error)';
    if (spent > budget * 0.8) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {translations[currentLanguage].categoryBreakdown}
        </h2>
        <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200">
          {translations[currentLanguage].viewAll}
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => {
          const percentageChange = getPercentageChange(category.spent, category.previousPeriod);
          const budgetProgress = getBudgetProgress(category.spent, category.budget);
          const budgetStatus = getBudgetStatus(category.spent, category.budget);
          const remaining = Math.max(category.budget - category.spent, 0);
          const exceeded = Math.max(category.spent - category.budget, 0);

          return (
            <div 
              key={category.id}
              className="p-4 bg-muted rounded-xl hover:bg-border-light transition-colors duration-200 cursor-pointer"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${categoryColors[category.name]}20` }}
                  >
                    <Icon 
                      name={categoryIcons[category.name] || 'Circle'} 
                      size={20} 
                      color={categoryColors[category.name]}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{category.name}</h3>
                    <p className="text-sm text-text-secondary">
                      {category.transactions} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-text-primary">
                    {formatCurrency(category.spent)}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={percentageChange >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                      size={12} 
                      color={percentageChange >= 0 ? 'var(--color-error)' : 'var(--color-success)'}
                    />
                    <span 
                      className="text-xs font-medium"
                      style={{ 
                        color: percentageChange >= 0 ? 'var(--color-error)' : 'var(--color-success)'
                      }}
                    >
                      {Math.abs(percentageChange).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Budget Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    {translations[currentLanguage].budget}: {formatCurrency(category.budget)}
                  </span>
                  <span 
                    className="font-medium"
                    style={{ color: getBudgetStatusColor(category.spent, category.budget) }}
                  >
                    {budgetStatus === 'overBudget' 
                      ? `${formatCurrency(exceeded)} ${translations[currentLanguage].exceeded}`
                      : `${formatCurrency(remaining)} ${translations[currentLanguage].remaining}`
                    }
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-border-light rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${budgetProgress}%`,
                      backgroundColor: getBudgetStatusColor(category.spent, category.budget)
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{formatCurrency(0)}</span>
                  <span>{formatCurrency(category.budget)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBreakdown;