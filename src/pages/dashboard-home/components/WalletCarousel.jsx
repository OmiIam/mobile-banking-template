import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WalletCarousel = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeWallet, setActiveWallet] = useState(0);

  const translations = {
    en: {
      myWallets: 'My Wallets',
      primary: 'Primary',
      savings: 'Savings',
      business: 'Business',
      investment: 'Investment',
      available: 'Available',
      pending: 'Pending',
      switchWallet: 'Switch Wallet'
    },
    es: {
      myWallets: 'Mis Billeteras',
      primary: 'Principal',
      savings: 'Ahorros',
      business: 'Negocio',
      investment: 'Inversión',
      available: 'Disponible',
      pending: 'Pendiente',
      switchWallet: 'Cambiar Billetera'
    },
    fr: {
      myWallets: 'Mes Portefeuilles',
      primary: 'Principal',
      savings: 'Épargne',
      business: 'Entreprise',
      investment: 'Investissement',
      available: 'Disponible',
      pending: 'En attente',
      switchWallet: 'Changer de portefeuille'
    }
  };

  const wallets = [
    {
      id: 1,
      name: translations[currentLanguage].primary,
      type: 'checking',
      balance: 12450.75,
      pending: 250.00,
      color: 'from-accent to-warning',
      icon: 'Wallet'
    },
    {
      id: 2,
      name: translations[currentLanguage].savings,
      type: 'savings',
      balance: 8750.25,
      pending: 0,
      color: 'from-success to-accent',
      icon: 'PiggyBank'
    },
    {
      id: 3,
      name: translations[currentLanguage].business,
      type: 'business',
      balance: 25680.50,
      pending: 1200.00,
      color: 'from-primary to-secondary',
      icon: 'Briefcase'
    },
    {
      id: 4,
      name: translations[currentLanguage].investment,
      type: 'investment',
      balance: 45230.80,
      pending: 0,
      color: 'from-secondary to-primary',
      icon: 'TrendingUp'
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
    }).format(amount);
  };

  const handleWalletSwitch = (index) => {
    setActiveWallet(index);
  };

  const handleSwipeLeft = () => {
    setActiveWallet((prev) => (prev + 1) % wallets.length);
  };

  const handleSwipeRight = () => {
    setActiveWallet((prev) => (prev - 1 + wallets.length) % wallets.length);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          {translations[currentLanguage].myWallets}
        </h2>
        <div className="flex items-center space-x-1">
          {wallets.map((_, index) => (
            <button
              key={index}
              onClick={() => handleWalletSwitch(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === activeWallet ? 'bg-accent' : 'bg-border'
              }`}
              aria-label={`Switch to wallet ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Wallet Cards Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeWallet * 100}%)` }}
        >
          {wallets.map((wallet, index) => (
            <div
              key={wallet.id}
              className="w-full flex-shrink-0 px-1"
            >
              <div className={`
                relative overflow-hidden bg-gradient-to-br ${wallet.color} 
                rounded-xl p-4 text-white shadow-elevation-2
                transform transition-all duration-200
                ${index === activeWallet ? 'scale-100' : 'scale-95 opacity-80'}
              `}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon 
                          name={wallet.icon} 
                          size={16} 
                          color="white" 
                          strokeWidth={2}
                        />
                      </div>
                      <span className="font-medium">{wallet.name}</span>
                    </div>
                    <button
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
                      aria-label="Wallet options"
                    >
                      <Icon name="MoreVertical" size={16} color="white" />
                    </button>
                  </div>

                  {/* Balance */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs opacity-80 mb-1">
                        {translations[currentLanguage].available}
                      </p>
                      <p className="text-xl font-bold font-mono">
                        {formatCurrency(wallet.balance)}
                      </p>
                    </div>
                    
                    {wallet.pending > 0 && (
                      <div>
                        <p className="text-xs opacity-80 mb-1">
                          {translations[currentLanguage].pending}
                        </p>
                        <p className="text-sm font-mono opacity-90">
                          {formatCurrency(wallet.pending)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/5 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handleSwipeRight}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
          aria-label="Previous wallet"
        >
          <Icon name="ChevronLeft" size={16} color="var(--color-text-primary)" />
        </button>
        
        <button
          onClick={handleSwipeLeft}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
          aria-label="Next wallet"
        >
          <Icon name="ChevronRight" size={16} color="var(--color-text-primary)" />
        </button>
      </div>
    </div>
  );
};

export default WalletCarousel;