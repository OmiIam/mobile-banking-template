import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeaderContext from '../../components/ui/HeaderContext';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingSupport from '../../components/ui/FloatingSupport';
import AccountBalanceCard from './components/AccountBalanceCard';
import WalletCarousel from './components/WalletCarousel';
import RecentTransactions from './components/RecentTransactions';
import QuickActions from './components/QuickActions';
import SpendingInsightsPreview from './components/SpendingInsightsPreview';

const DashboardHome = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const translations = {
    en: {
      pageTitle: 'Dashboard - FinanceFlow',
      pageDescription: 'Manage your finances with FinanceFlow dashboard. View account balances, recent transactions, and spending insights.',
      welcome: 'Welcome back',
      goodMorning: 'Good morning',
      goodAfternoon: 'Good afternoon',
      goodEvening: 'Good evening'
    },
    es: {
      pageTitle: 'Panel - FinanceFlow',
      pageDescription: 'Gestiona tus finanzas con el panel de FinanceFlow. Ve saldos de cuenta, transacciones recientes y análisis de gastos.',
      welcome: 'Bienvenido de nuevo',
      goodMorning: 'Buenos días',
      goodAfternoon: 'Buenas tardes',
      goodEvening: 'Buenas noches'
    },
    fr: {
      pageTitle: 'Tableau de bord - FinanceFlow',
      pageDescription: 'Gérez vos finances avec le tableau de bord FinanceFlow. Consultez les soldes de compte, les transactions récentes et les analyses de dépenses.',
      welcome: 'Bon retour',
      goodMorning: 'Bonjour',
      goodAfternoon: 'Bon après-midi',
      goodEvening: 'Bonsoir'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate loading data
    const loadDashboardData = async () => {
      setIsLoading(true);
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return translations[currentLanguage].goodMorning;
    if (hour < 18) return translations[currentLanguage].goodAfternoon;
    return translations[currentLanguage].goodEvening;
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Balance Card Skeleton */}
      <div className="h-48 bg-muted rounded-2xl" />
      
      {/* Wallet Carousel Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-32" />
        <div className="h-32 bg-muted rounded-xl" />
      </div>
      
      {/* Quick Actions Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-32" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
      
      {/* Transactions Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-40" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="h-4 bg-muted rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{translations[currentLanguage].pageTitle}</title>
          <meta name="description" content={translations[currentLanguage].pageDescription} />
        </Helmet>
        
        <HeaderContext />
        
        <main className="pb-20 pt-4">
          <div className="max-w-md mx-auto px-4 space-y-6">
            <LoadingSkeleton />
          </div>
        </main>
        
        <BottomTabNavigation />
        <FloatingSupport />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{translations[currentLanguage].pageTitle}</title>
        <meta name="description" content={translations[currentLanguage].pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2C3E50" />
      </Helmet>
      
      {/* Header */}
      <HeaderContext />
      
      {/* Main Content */}
      <main className="pb-20 pt-4">
        <div className="max-w-md mx-auto px-4 space-y-6 lg:max-w-4xl">
          {/* Welcome Message */}
          <div className="text-center py-2">
            <p className="text-text-secondary text-sm">
              {getGreeting()}, Alex
            </p>
          </div>

          {/* Account Balance Card */}
          <AccountBalanceCard />
          
          {/* Wallet Carousel */}
          <WalletCarousel />
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Recent Transactions */}
          <RecentTransactions />
          
          {/* Spending Insights Preview */}
          <SpendingInsightsPreview />
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomTabNavigation />
      
      {/* Floating Support */}
      <FloatingSupport />
    </div>
  );
};

export default DashboardHome;