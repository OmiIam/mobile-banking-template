import React from 'react';

const MonthlyGroupHeader = ({ date, totalAmount, transactionCount, currentLanguage }) => {
  const translations = {
    en: {
      transactions: 'transactions',
      spent: 'spent',
      received: 'received'
    },
    es: {
      transactions: 'transacciones',
      spent: 'gastado',
      received: 'recibido'
    },
    fr: {
      transactions: 'transactions',
      spent: 'dépensé',
      received: 'reçu'
    }
  };

  const formatMonth = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border py-3 px-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            {formatMonth(date)}
          </h2>
          <p className="text-sm text-text-secondary">
            {transactionCount} {translations[currentLanguage].transactions}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-lg font-mono font-semibold ${
            totalAmount >= 0 ? 'text-success' : 'text-text-primary'
          }`}>
            {totalAmount >= 0 ? '+' : '-'}{formatCurrency(totalAmount)}
          </p>
          <p className="text-sm text-text-secondary">
            {totalAmount >= 0 
              ? translations[currentLanguage].received 
              : translations[currentLanguage].spent
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyGroupHeader;