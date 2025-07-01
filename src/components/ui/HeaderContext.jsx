import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const HeaderContext = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userBalance, setUserBalance] = useState(12450.75);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const translations = {
    en: {
      dashboard: 'Dashboard',
      transfer: 'Transfer Money',
      history: 'Transaction History',
      insights: 'Spending Insights',
      support: 'Support Center',
      registration: 'Get Started',
      notifications: 'Notifications',
      profile: 'Profile',
      balance: 'Balance',
      welcome: 'Welcome back'
    },
    es: {
      dashboard: 'Panel',
      transfer: 'Transferir Dinero',
      history: 'Historial de Transacciones',
      insights: 'Análisis de Gastos',
      support: 'Centro de Soporte',
      registration: 'Comenzar',
      notifications: 'Notificaciones',
      profile: 'Perfil',
      balance: 'Saldo',
      welcome: 'Bienvenido de nuevo'
    },
    fr: {
      dashboard: 'Tableau de bord',
      transfer: 'Transférer de l\'argent',
      history: 'Historique des transactions',
      insights: 'Analyses des dépenses',
      support: 'Centre de support',
      registration: 'Commencer',
      notifications: 'Notifications',
      profile: 'Profil',
      balance: 'Solde',
      welcome: 'Bon retour'
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard-home':
        return translations[currentLanguage].dashboard;
      case '/money-transfer':
        return translations[currentLanguage].transfer;
      case '/transaction-history':
        return translations[currentLanguage].history;
      case '/spending-insights':
        return translations[currentLanguage].insights;
      case '/support-center':
        return translations[currentLanguage].support;
      case '/registration-screen':
        return translations[currentLanguage].registration;
      default:
        return translations[currentLanguage].dashboard;
    }
  };

  const getPageIcon = () => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard-home':
        return 'Home';
      case '/money-transfer':
        return 'Send';
      case '/transaction-history':
        return 'History';
      case '/spending-insights':
        return 'TrendingUp';
      case '/support-center':
        return 'HelpCircle';
      case '/registration-screen':
        return 'UserPlus';
      default:
        return 'Home';
    }
  };

  const isAuthenticatedPage = () => {
    return location.pathname !== '/registration-screen';
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
        <Icon name="DollarSign" size={20} color="white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold text-primary font-inter">
        FinanceFlow
      </span>
    </div>
  );

  return (
    <header className="sticky top-0 z-90 bg-surface border-b border-border-light shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {location.pathname === '/dashboard-home' ? (
              <Logo />
            ) : (
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getPageIcon()} 
                  size={24} 
                  color="var(--color-primary)" 
                  strokeWidth={2}
                />
                <h1 className="text-lg font-semibold text-text-primary font-inter">
                  {getPageTitle()}
                </h1>
              </div>
            )}
          </div>

          {/* Right Section */}
          {isAuthenticatedPage() ? (
            <div className="flex items-center space-x-4">
              {/* Balance Display (Dashboard only) */}
              {location.pathname === '/dashboard-home' && (
                <div className="hidden sm:flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
                  <span className="text-sm text-text-secondary font-medium">
                    {translations[currentLanguage].balance}:
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-mono font-semibold text-success">
                      {balanceVisible ? formatBalance(userBalance) : '••••••'}
                    </span>
                    <button
                      onClick={toggleBalanceVisibility}
                      className="p-1 hover:bg-border-light rounded transition-colors duration-200"
                      aria-label={balanceVisible ? 'Hide balance' : 'Show balance'}
                    >
                      <Icon 
                        name={balanceVisible ? 'EyeOff' : 'Eye'} 
                        size={16} 
                        color="var(--color-text-secondary)"
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  aria-label={translations[currentLanguage].notifications}
                >
                  <Icon 
                    name="Bell" 
                    size={20} 
                    color="var(--color-text-secondary)"
                    strokeWidth={2}
                  />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-elevation-3 z-200">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-text-primary">
                        {translations[currentLanguage].notifications}
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-4 hover:bg-muted transition-colors duration-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm text-text-primary font-medium">
                              Transfer completed
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              $250.00 sent to John Doe
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-muted transition-colors duration-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm text-text-primary font-medium">
                              Budget alert
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              You've spent 80% of your monthly budget
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 p-1 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label={translations[currentLanguage].profile}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" strokeWidth={2} />
                </div>
                <span className="hidden sm:block text-sm font-medium text-text-primary">
                  Alex Johnson
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Logo />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderContext;