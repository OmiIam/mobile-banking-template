import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const SpendingInsightsPreview = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      spendingInsights: 'Spending Insights',
      thisMonth: 'This Month',
      totalSpent: 'Total Spent',
      viewDetails: 'View Details',
      topCategories: 'Top Categories',
      food: 'Food & Dining',
      transport: 'Transportation',
      shopping: 'Shopping',
      entertainment: 'Entertainment',
      utilities: 'Utilities',
      other: 'Other',
      budgetStatus: 'Budget Status',
      onTrack: 'On Track',
      overBudget: 'Over Budget',
      underBudget: 'Under Budget'
    },
    es: {
      spendingInsights: 'Análisis de Gastos',
      thisMonth: 'Este Mes',
      totalSpent: 'Total Gastado',
      viewDetails: 'Ver Detalles',
      topCategories: 'Categorías Principales',
      food: 'Comida y Restaurantes',
      transport: 'Transporte',
      shopping: 'Compras',
      entertainment: 'Entretenimiento',
      utilities: 'Servicios',
      other: 'Otros',
      budgetStatus: 'Estado del Presupuesto',
      onTrack: 'En Camino',
      overBudget: 'Sobre Presupuesto',
      underBudget: 'Bajo Presupuesto'
    },
    fr: {
      spendingInsights: 'Analyses des Dépenses',
      thisMonth: 'Ce Mois',
      totalSpent: 'Total Dépensé',
      viewDetails: 'Voir les Détails',
      topCategories: 'Catégories Principales',
      food: 'Nourriture et Restaurants',
      transport: 'Transport',
      shopping: 'Achats',
      entertainment: 'Divertissement',
      utilities: 'Services',
      other: 'Autres',
      budgetStatus: 'État du Budget',
      onTrack: 'Sur la Bonne Voie',
      overBudget: 'Dépassement de Budget',
      underBudget: 'Sous le Budget'
    }
  };

  const spendingData = [
    {
      category: translations[currentLanguage].food,
      amount: 450.25,
      percentage: 35,
      color: '#E67E22',
      icon: 'UtensilsCrossed'
    },
    {
      category: translations[currentLanguage].transport,
      amount: 280.50,
      percentage: 22,
      color: '#3498DB',
      icon: 'Car'
    },
    {
      category: translations[currentLanguage].shopping,
      amount: 320.75,
      percentage: 25,
      color: '#9B59B6',
      icon: 'ShoppingBag'
    },
    {
      category: translations[currentLanguage].entertainment,
      amount: 150.00,
      percentage: 12,
      color: '#E74C3C',
      icon: 'Film'
    },
    {
      category: translations[currentLanguage].utilities,
      amount: 80.00,
      percentage: 6,
      color: '#27AE60',
      icon: 'Zap'
    }
  ];

  const totalSpent = spendingData.reduce((sum, item) => sum + item.amount, 0);
  const monthlyBudget = 1500.00;
  const budgetUsed = (totalSpent / monthlyBudget) * 100;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getBudgetStatus = () => {
    if (budgetUsed > 100) return { status: translations[currentLanguage].overBudget, color: 'text-error' };
    if (budgetUsed > 80) return { status: translations[currentLanguage].onTrack, color: 'text-warning' };
    return { status: translations[currentLanguage].underBudget, color: 'text-success' };
  };

  const handleViewDetails = () => {
    navigate('/spending-insights');
  };

  const budgetStatus = getBudgetStatus();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          {translations[currentLanguage].spendingInsights}
        </h2>
        <button
          onClick={handleViewDetails}
          className="text-accent hover:text-accent/80 font-medium text-sm transition-colors duration-200"
        >
          {translations[currentLanguage].viewDetails}
        </button>
      </div>

      {/* Insights Card */}
      <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
        {/* Summary */}
        <div className="text-center space-y-2">
          <p className="text-sm text-text-secondary">
            {translations[currentLanguage].thisMonth}
          </p>
          <p className="text-2xl font-bold text-text-primary font-mono">
            {formatCurrency(totalSpent)}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${budgetUsed > 100 ? 'bg-error' : budgetUsed > 80 ? 'bg-warning' : 'bg-success'}`} />
            <p className={`text-sm font-medium ${budgetStatus.color}`}>
              {budgetStatus.status}
            </p>
          </div>
        </div>

        {/* Chart and Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="flex items-center justify-center">
            <div className="w-40 h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-text-secondary">
                    {translations[currentLanguage].totalSpent}
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {formatCurrency(totalSpent)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories List */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-text-primary">
              {translations[currentLanguage].topCategories}
            </h3>
            <div className="space-y-2">
              {spendingData.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-text-primary truncate">
                        {item.category}
                      </p>
                      <p className="text-sm font-mono font-medium text-text-primary">
                        {formatCurrency(item.amount)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="w-full bg-border rounded-full h-1.5 mr-2">
                        <div 
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {translations[currentLanguage].budgetStatus}
            </span>
            <span className="text-sm font-mono text-text-primary">
              {formatCurrency(totalSpent)} / {formatCurrency(monthlyBudget)}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                budgetUsed > 100 ? 'bg-error' : budgetUsed > 80 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={handleViewDetails}
          iconName="TrendingUp"
          iconPosition="left"
          fullWidth
        >
          {translations[currentLanguage].viewDetails}
        </Button>
      </div>
    </div>
  );
};

export default SpendingInsightsPreview;