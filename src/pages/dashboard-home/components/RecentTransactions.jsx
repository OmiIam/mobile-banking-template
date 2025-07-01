import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentTransactions = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      recentTransactions: 'Recent Transactions',
      viewAll: 'View All',
      sent: 'Sent',
      received: 'Received',
      payment: 'Payment',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This week',
      noTransactions: 'No recent transactions',
      startTransacting: 'Start your first transaction'
    },
    es: {
      recentTransactions: 'Transacciones Recientes',
      viewAll: 'Ver Todo',
      sent: 'Enviado',
      received: 'Recibido',
      payment: 'Pago',
      deposit: 'Depósito',
      withdrawal: 'Retiro',
      today: 'Hoy',
      yesterday: 'Ayer',
      thisWeek: 'Esta semana',
      noTransactions: 'No hay transacciones recientes',
      startTransacting: 'Inicia tu primera transacción'
    },
    fr: {
      recentTransactions: 'Transactions Récentes',
      viewAll: 'Voir Tout',
      sent: 'Envoyé',
      received: 'Reçu',
      payment: 'Paiement',
      deposit: 'Dépôt',
      withdrawal: 'Retrait',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      thisWeek: 'Cette semaine',
      noTransactions: 'Aucune transaction récente',
      startTransacting: 'Commencez votre première transaction'
    }
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'sent',
      merchant: 'John Doe',
      description: 'Money transfer',
      amount: -250.00,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'completed',
      icon: 'Send',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'received',
      merchant: 'Sarah Wilson',
      description: 'Payment received',
      amount: 1200.00,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      status: 'completed',
      icon: 'ArrowDownLeft',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'payment',
      merchant: 'Netflix',
      description: 'Monthly subscription',
      amount: -15.99,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: 'completed',
      icon: 'CreditCard',
      avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40&h=40&fit=crop&crop=center'
    },
    {
      id: 4,
      type: 'deposit',
      merchant: 'Salary Deposit',
      description: 'Monthly salary',
      amount: 4500.00,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'completed',
      icon: 'Banknote',
      avatar: null
    },
    {
      id: 5,
      type: 'payment',
      merchant: 'Starbucks',
      description: 'Coffee purchase',
      amount: -8.75,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'completed',
      icon: 'Coffee',
      avatar: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=40&h=40&fit=crop&crop=center'
    },
    {
      id: 6,
      type: 'withdrawal',
      merchant: 'ATM Withdrawal',
      description: 'Cash withdrawal',
      amount: -200.00,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      status: 'completed',
      icon: 'Banknote',
      avatar: null
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 24) {
      return translations[currentLanguage].today;
    } else if (diffInDays === 1) {
      return translations[currentLanguage].yesterday;
    } else if (diffInDays < 7) {
      return translations[currentLanguage].thisWeek;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const getTransactionIcon = (transaction) => {
    if (transaction.type === 'sent') return 'ArrowUpRight';
    if (transaction.type === 'received') return 'ArrowDownLeft';
    return transaction.icon;
  };

  const getTransactionColor = (transaction) => {
    if (transaction.amount > 0) return 'text-success';
    return 'text-error';
  };

  const handleViewAll = () => {
    navigate('/transaction-history');
  };

  const handleTransactionClick = (transaction) => {
    // Navigate to transaction details or show modal
    console.log('Transaction clicked:', transaction);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          {translations[currentLanguage].recentTransactions}
        </h2>
        <button
          onClick={handleViewAll}
          className="text-accent hover:text-accent/80 font-medium text-sm transition-colors duration-200"
        >
          {translations[currentLanguage].viewAll}
        </button>
      </div>

      {/* Transactions List */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        {recentTransactions.length > 0 ? (
          <div className="divide-y divide-border">
            {recentTransactions.slice(0, 6).map((transaction, index) => (
              <button
                key={transaction.id}
                onClick={() => handleTransactionClick(transaction)}
                className="w-full flex items-center space-x-4 p-4 hover:bg-muted transition-colors duration-200 text-left"
              >
                {/* Transaction Icon/Avatar */}
                <div className="flex-shrink-0">
                  {transaction.avatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={transaction.avatar}
                        alt={transaction.merchant}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${transaction.amount > 0 
                        ? 'bg-success/10 text-success' :'bg-primary/10 text-primary'
                      }
                    `}>
                      <Icon 
                        name={getTransactionIcon(transaction)} 
                        size={16} 
                        strokeWidth={2}
                      />
                    </div>
                  )}
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-text-primary truncate">
                      {transaction.merchant}
                    </p>
                    <p className={`font-mono font-semibold ${getTransactionColor(transaction)}`}>
                      {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-text-secondary truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatTimestamp(transaction.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0">
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    color="var(--color-text-secondary)" 
                  />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Receipt" size={24} color="var(--color-text-secondary)" />
            </div>
            <p className="text-text-secondary mb-2">
              {translations[currentLanguage].noTransactions}
            </p>
            <p className="text-sm text-text-secondary">
              {translations[currentLanguage].startTransacting}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;