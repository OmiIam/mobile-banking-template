import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeaderContext from '../../components/ui/HeaderContext';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingSupport from '../../components/ui/FloatingSupport';
import PeriodSelector from './components/PeriodSelector';
import SpendingOverview from './components/SpendingOverview';
import CategoryBreakdown from './components/CategoryBreakdown';
import WeeklyTrends from './components/WeeklyTrends';
import RecurringSubscriptions from './components/RecurringSubscriptions';
import SavingsGoals from './components/SavingsGoals';
import BudgetManagement from './components/BudgetManagement';

const SpendingInsights = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);

  const translations = {
    en: {
      pageTitle: 'Spending Insights - FinanceFlow',
      pageDescription: 'Analyze your spending patterns, track budgets, and gain insights into your financial habits with comprehensive spending analytics.',
      spendingInsights: 'Spending Insights',
      loadingInsights: 'Loading insights...',
      errorLoading: 'Error loading spending data. Please try again.',
      exportData: 'Export Data',
      shareInsights: 'Share Insights'
    },
    es: {
      pageTitle: 'Análisis de Gastos - FinanceFlow',
      pageDescription: 'Analiza tus patrones de gasto, rastrea presupuestos y obtén información sobre tus hábitos financieros con análisis completos de gastos.',
      spendingInsights: 'Análisis de Gastos',
      loadingInsights: 'Cargando análisis...',
      errorLoading: 'Error al cargar datos de gastos. Inténtalo de nuevo.',
      exportData: 'Exportar Datos',
      shareInsights: 'Compartir Análisis'
    },
    fr: {
      pageTitle: 'Analyses des Dépenses - FinanceFlow',
      pageDescription: 'Analysez vos habitudes de dépenses, suivez les budgets et obtenez des informations sur vos habitudes financières avec des analyses complètes des dépenses.',
      spendingInsights: 'Analyses des Dépenses',
      loadingInsights: 'Chargement des analyses...',
      errorLoading: 'Erreur lors du chargement des données de dépenses. Veuillez réessayer.',
      exportData: 'Exporter les Données',
      shareInsights: 'Partager les Analyses'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadData();
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleExportData = () => {
    // Simulate data export
    console.log('Exporting spending data...');
  };

  const handleShareInsights = () => {
    // Simulate sharing insights
    console.log('Sharing spending insights...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{translations[currentLanguage].pageTitle}</title>
          <meta name="description" content={translations[currentLanguage].pageDescription} />
        </Helmet>
        
        <HeaderContext />
        
        <main className="pb-20 pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading Skeleton */}
            <div className="space-y-6">
              <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border animate-pulse">
                <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-80 bg-muted rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border animate-pulse">
                  <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border animate-pulse">
                  <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                  <div className="h-64 bg-muted rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-text-secondary">
                {translations[currentLanguage].loadingInsights}
              </p>
            </div>
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
        <meta name="keywords" content="spending insights, budget tracking, financial analytics, expense analysis" />
        <meta property="og:title" content={translations[currentLanguage].pageTitle} />
        <meta property="og:description" content={translations[currentLanguage].pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <HeaderContext />
      
      <main className="pb-20 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Period Selector */}
          <PeriodSelector 
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            currentLanguage={currentLanguage}
          />
          
          {/* Main Content Grid */}
          <div className="space-y-6">
            {/* Spending Overview - Full Width */}
            <SpendingOverview 
              selectedPeriod={selectedPeriod}
              currentLanguage={currentLanguage}
            />
            
            {/* Two Column Layout for Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Breakdown */}
              <CategoryBreakdown 
                selectedPeriod={selectedPeriod}
                currentLanguage={currentLanguage}
              />
              
              {/* Weekly Trends */}
              <WeeklyTrends 
                selectedPeriod={selectedPeriod}
                currentLanguage={currentLanguage}
              />
            </div>
            
            {/* Budget Management - Full Width */}
            <BudgetManagement 
              currentLanguage={currentLanguage}
            />
            
            {/* Two Column Layout for Goals and Subscriptions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Savings Goals */}
              <SavingsGoals 
                currentLanguage={currentLanguage}
              />
              
              {/* Recurring Subscriptions */}
              <RecurringSubscriptions 
                currentLanguage={currentLanguage}
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8 mb-8">
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-6 py-3 bg-muted hover:bg-border-light text-text-primary rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">{translations[currentLanguage].exportData}</span>
            </button>
            
            <button
              onClick={handleShareInsights}
              className="flex items-center space-x-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="font-medium">{translations[currentLanguage].shareInsights}</span>
            </button>
          </div>
        </div>
      </main>
      
      <BottomTabNavigation />
      <FloatingSupport />
    </div>
  );
};

export default SpendingInsights;