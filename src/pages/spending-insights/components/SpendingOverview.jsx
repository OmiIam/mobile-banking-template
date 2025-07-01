import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const SpendingOverview = ({ selectedPeriod, currentLanguage }) => {
  const [totalSpending, setTotalSpending] = useState(2847.65);
  const [previousPeriodSpending, setPreviousPeriodSpending] = useState(2654.32);
  const [spendingData, setSpendingData] = useState([]);

  const translations = {
    en: {
      monthlySpending: 'Monthly Spending',
      weeklySpending: 'Weekly Spending',
      yearlySpending: 'Yearly Spending',
      totalSpent: 'Total Spent',
      vsLastPeriod: 'vs last period',
      increase: 'increase',
      decrease: 'decrease',
      noChange: 'no change'
    },
    es: {
      monthlySpending: 'Gasto Mensual',
      weeklySpending: 'Gasto Semanal',
      yearlySpending: 'Gasto Anual',
      totalSpent: 'Total Gastado',
      vsLastPeriod: 'vs período anterior',
      increase: 'aumento',
      decrease: 'disminución',
      noChange: 'sin cambios'
    },
    fr: {
      monthlySpending: 'Dépenses Mensuelles',
      weeklySpending: 'Dépenses Hebdomadaires',
      yearlySpending: 'Dépenses Annuelles',
      totalSpent: 'Total Dépensé',
      vsLastPeriod: 'vs période précédente',
      increase: 'augmentation',
      decrease: 'diminution',
      noChange: 'aucun changement'
    }
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
    const mockData = [
      { name: 'Food & Dining', value: 856.43, percentage: 30.1 },
      { name: 'Transportation', value: 542.18, percentage: 19.0 },
      { name: 'Shopping', value: 483.92, percentage: 17.0 },
      { name: 'Entertainment', value: 341.52, percentage: 12.0 },
      { name: 'Bills & Utilities', value: 284.77, percentage: 10.0 },
      { name: 'Healthcare', value: 199.34, percentage: 7.0 },
      { name: 'Travel', value: 113.91, percentage: 4.0 },
      { name: 'Other', value: 25.58, percentage: 1.0 }
    ];
    setSpendingData(mockData);
  }, [selectedPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPercentageChange = () => {
    const change = ((totalSpending - previousPeriodSpending) / previousPeriodSpending) * 100;
    return Math.abs(change).toFixed(1);
  };

  const getChangeDirection = () => {
    if (totalSpending > previousPeriodSpending) return 'increase';
    if (totalSpending < previousPeriodSpending) return 'decrease';
    return 'noChange';
  };

  const getChangeIcon = () => {
    const direction = getChangeDirection();
    if (direction === 'increase') return 'TrendingUp';
    if (direction === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    const direction = getChangeDirection();
    if (direction === 'increase') return 'var(--color-error)';
    if (direction === 'decrease') return 'var(--color-success)';
    return 'var(--color-text-secondary)';
  };

  const getPeriodTitle = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return translations[currentLanguage].weeklySpending;
      case 'yearly':
        return translations[currentLanguage].yearlySpending;
      default:
        return translations[currentLanguage].monthlySpending;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-text-primary">{data.name}</p>
          <p className="text-sm text-text-secondary">
            {formatCurrency(data.value)} ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy }) => {
    return (
      <g>
        <text 
          x={cx} 
          y={cy - 10} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          className="fill-text-primary text-2xl font-bold font-mono"
        >
          {formatCurrency(totalSpending)}
        </text>
        <text 
          x={cx} 
          y={cy + 15} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          className="fill-text-secondary text-sm"
        >
          {translations[currentLanguage].totalSpent}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {getPeriodTitle()}
        </h2>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getChangeIcon()} 
            size={16} 
            color={getChangeColor()}
          />
          <span 
            className="text-sm font-medium"
            style={{ color: getChangeColor() }}
          >
            {getPercentageChange()}% {translations[currentLanguage][getChangeDirection()]}
          </span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                label={<CustomLabel />}
              >
                {spendingData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={categoryColors[entry.name] || '#95A5A6'}
                    stroke="var(--color-surface)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Period Comparison */}
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            {formatCurrency(previousPeriodSpending)} {translations[currentLanguage].vsLastPeriod}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {spendingData.slice(0, 6).map((category, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: categoryColors[category.name] || '#95A5A6' }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {category.name}
              </p>
              <p className="text-xs text-text-secondary">
                {formatCurrency(category.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingOverview;