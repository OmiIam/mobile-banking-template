import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const WeeklyTrends = ({ selectedPeriod, currentLanguage }) => {
  const [trendData, setTrendData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('spending');

  const translations = {
    en: {
      weeklyTrends: 'Weekly Trends',
      dailySpending: 'Daily Spending',
      spending: 'Spending',
      income: 'Income',
      balance: 'Balance',
      average: 'Average',
      highest: 'Highest',
      lowest: 'Lowest',
      thisWeek: 'This Week',
      lastWeek: 'Last Week',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun'
    },
    es: {
      weeklyTrends: 'Tendencias Semanales',
      dailySpending: 'Gasto Diario',
      spending: 'Gastos',
      income: 'Ingresos',
      balance: 'Saldo',
      average: 'Promedio',
      highest: 'Más Alto',
      lowest: 'Más Bajo',
      thisWeek: 'Esta Semana',
      lastWeek: 'Semana Pasada',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Sáb',
      sun: 'Dom'
    },
    fr: {
      weeklyTrends: 'Tendances Hebdomadaires',
      dailySpending: 'Dépenses Quotidiennes',
      spending: 'Dépenses',
      income: 'Revenus',
      balance: 'Solde',
      average: 'Moyenne',
      highest: 'Le Plus Élevé',
      lowest: 'Le Plus Bas',
      thisWeek: 'Cette Semaine',
      lastWeek: 'Semaine Dernière',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Jeu',
      fri: 'Ven',
      sat: 'Sam',
      sun: 'Dim'
    }
  };

  const metrics = [
    { id: 'spending', label: translations[currentLanguage].spending, color: '#E67E22' },
    { id: 'income', label: translations[currentLanguage].income, color: '#27AE60' },
    { id: 'balance', label: translations[currentLanguage].balance, color: '#3498DB' }
  ];

  useEffect(() => {
    const mockData = [
      {
        day: translations[currentLanguage].mon,
        dayShort: 'Mon',
        spending: 145.32,
        income: 0,
        balance: 12305.43,
        date: '2024-01-15'
      },
      {
        day: translations[currentLanguage].tue,
        dayShort: 'Tue',
        spending: 89.76,
        income: 0,
        balance: 12215.67,
        date: '2024-01-16'
      },
      {
        day: translations[currentLanguage].wed,
        dayShort: 'Wed',
        spending: 234.18,
        income: 0,
        balance: 11981.49,
        date: '2024-01-17'
      },
      {
        day: translations[currentLanguage].thu,
        dayShort: 'Thu',
        spending: 67.45,
        income: 0,
        balance: 11914.04,
        date: '2024-01-18'
      },
      {
        day: translations[currentLanguage].fri,
        dayShort: 'Fri',
        spending: 198.92,
        income: 3200.00,
        balance: 14915.12,
        date: '2024-01-19'
      },
      {
        day: translations[currentLanguage].sat,
        dayShort: 'Sat',
        spending: 312.67,
        income: 0,
        balance: 14602.45,
        date: '2024-01-20'
      },
      {
        day: translations[currentLanguage].sun,
        dayShort: 'Sun',
        spending: 156.23,
        income: 0,
        balance: 14446.22,
        date: '2024-01-21'
      }
    ];
    setTrendData(mockData);
  }, [currentLanguage, selectedPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getMetricStats = () => {
    if (trendData.length === 0) return { average: 0, highest: 0, lowest: 0 };
    
    const values = trendData.map(item => item[selectedMetric]);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    const highest = Math.max(...values);
    const lowest = Math.min(...values);
    
    return { average, highest, lowest };
  };

  const stats = getMetricStats();
  const selectedMetricData = metrics.find(m => m.id === selectedMetric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-text-primary">{label}</p>
          <p className="text-sm" style={{ color: selectedMetricData?.color }}>
            {selectedMetricData?.label}: {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={selectedMetricData?.color}
        stroke="var(--color-surface)"
        strokeWidth={2}
        className="cursor-pointer hover:r-6 transition-all duration-200"
      />
    );
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {translations[currentLanguage].weeklyTrends}
        </h2>
        <div className="flex items-center space-x-2">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedMetric === metric.id
                  ? 'text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
              style={{
                backgroundColor: selectedMetric === metric.id ? metric.color : 'transparent'
              }}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-sm text-text-secondary mb-1">
            {translations[currentLanguage].average}
          </p>
          <p className="font-mono font-semibold text-text-primary">
            {formatCurrency(stats.average)}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-sm text-text-secondary mb-1">
            {translations[currentLanguage].highest}
          </p>
          <p className="font-mono font-semibold text-success">
            {formatCurrency(stats.highest)}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-sm text-text-secondary mb-1">
            {translations[currentLanguage].lowest}
          </p>
          <p className="font-mono font-semibold text-error">
            {formatCurrency(stats.lowest)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetricData?.color}
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: selectedMetricData?.color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-center mt-4 space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg hover:bg-border-light transition-colors duration-200">
          <Icon name="ChevronLeft" size={16} color="var(--color-text-secondary)" />
          <span className="text-sm text-text-secondary">
            {translations[currentLanguage].lastWeek}
          </span>
        </button>
        <span className="text-sm font-medium text-text-primary">
          {translations[currentLanguage].thisWeek}
        </span>
        <button className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg hover:bg-border-light transition-colors duration-200">
          <span className="text-sm text-text-secondary">Next Week</span>
          <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
        </button>
      </div>
    </div>
  );
};

export default WeeklyTrends;