import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      home: 'Home',
      wallet: 'Wallet',
      insights: 'Insights',
      support: 'Support'
    },
    es: {
      home: 'Inicio',
      wallet: 'Billetera',
      insights: 'Análisis',
      support: 'Soporte'
    },
    fr: {
      home: 'Accueil',
      wallet: 'Portefeuille',
      insights: 'Analyses',
      support: 'Support'
    }
  };

  const navigationTabs = [
    {
      id: 'home',
      label: translations[currentLanguage].home,
      path: '/dashboard-home',
      icon: 'Home',
      badge: null,
      tooltip: 'Dashboard overview and quick actions'
    },
    {
      id: 'wallet',
      label: translations[currentLanguage].wallet,
      path: '/money-transfer',
      icon: 'Wallet',
      badge: null,
      tooltip: 'Money transfers and transactions'
    },
    {
      id: 'insights',
      label: translations[currentLanguage].insights,
      path: '/spending-insights',
      icon: 'TrendingUp',
      badge: null,
      tooltip: 'Spending analysis and budgets'
    },
    {
      id: 'support',
      label: translations[currentLanguage].support,
      path: '/support-center',
      icon: 'HelpCircle',
      badge: null,
      tooltip: 'Help center and assistance'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    
    if (currentPath === '/dashboard-home') {
      setActiveTab('home');
    } else if (currentPath === '/money-transfer' || currentPath === '/transaction-history') {
      setActiveTab('wallet');
    } else if (currentPath === '/spending-insights') {
      setActiveTab('insights');
    } else if (currentPath === '/support-center') {
      setActiveTab('support');
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  const handleKeyDown = (event, tab) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tab);
    }
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border-light shadow-elevation-2"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {navigationTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            onKeyDown={(e) => handleKeyDown(e, tab)}
            className={`
              relative flex flex-col items-center justify-center p-2 min-w-0 flex-1
              transition-all duration-200 ease-out-quart rounded-lg
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
              ${activeTab === tab.id 
                ? 'text-accent' :'text-text-secondary hover:text-text-primary'
              }
            `}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={0}
            title={tab.tooltip}
          >
            <div className="relative mb-1">
              <Icon 
                name={tab.icon} 
                size={24} 
                strokeWidth={activeTab === tab.id ? 2.5 : 2}
                className="transition-all duration-200"
              />
              {tab.badge && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`
              text-xs font-medium truncate max-w-full
              transition-all duration-200
              ${activeTab === tab.id ? 'font-semibold' : 'font-normal'}
            `}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;