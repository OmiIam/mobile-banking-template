import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountBalanceCard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [accountBalance, setAccountBalance] = useState(12450.75);
  const [accountType, setAccountType] = useState('Checking');

  const translations = {
    en: {
      totalBalance: 'Total Balance',
      accountType: 'Primary Checking',
      hideBalance: 'Hide Balance',
      showBalance: 'Show Balance',
      lastUpdated: 'Last updated',
      quickTransfer: 'Quick Transfer',
      addMoney: 'Add Money'
    },
    es: {
      totalBalance: 'Saldo Total',
      accountType: 'Cuenta Corriente Principal',
      hideBalance: 'Ocultar Saldo',
      showBalance: 'Mostrar Saldo',
      lastUpdated: 'Última actualización',
      quickTransfer: 'Transferencia Rápida',
      addMoney: 'Agregar Dinero'
    },
    fr: {
      totalBalance: 'Solde Total',
      accountType: 'Compte Courant Principal',
      hideBalance: 'Masquer le solde',
      showBalance: 'Afficher le solde',
      lastUpdated: 'Dernière mise à jour',
      quickTransfer: 'Transfert Rapide',
      addMoney: 'Ajouter de l\'argent'
    }
  };

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

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary rounded-2xl p-6 text-primary-foreground shadow-elevation-3">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-80 mb-1">
              {translations[currentLanguage].totalBalance}
            </p>
            <p className="text-xs opacity-60">
              {translations[currentLanguage].accountType}
            </p>
          </div>
          <button
            onClick={toggleBalanceVisibility}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            aria-label={balanceVisible ? translations[currentLanguage].hideBalance : translations[currentLanguage].showBalance}
          >
            <Icon 
              name={balanceVisible ? 'EyeOff' : 'Eye'} 
              size={20} 
              color="white"
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Balance Display */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl md:text-4xl font-bold font-mono tracking-tight">
              {balanceVisible ? formatCurrency(accountBalance) : '••••••'}
            </span>
            <div className="flex items-center space-x-1 text-success bg-success/20 px-2 py-1 rounded-full">
              <Icon name="TrendingUp" size={12} color="currentColor" />
              <span className="text-xs font-medium">+2.5%</span>
            </div>
          </div>
          <p className="text-xs opacity-60 mt-2">
            {translations[currentLanguage].lastUpdated}: {getCurrentTime()}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="Send"
            iconPosition="left"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 flex-1"
          >
            {translations[currentLanguage].quickTransfer}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 flex-1"
          >
            {translations[currentLanguage].addMoney}
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full" />
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full" />
    </div>
  );
};

export default AccountBalanceCard;