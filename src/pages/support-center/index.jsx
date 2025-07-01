import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeaderContext from '../../components/ui/HeaderContext';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingSupport from '../../components/ui/FloatingSupport';
import SearchBar from './components/SearchBar';
import QuickActions from './components/QuickActions';
import LiveChatInterface from './components/LiveChatInterface';
import FAQSection from './components/FAQSection';
import EmergencyContact from './components/EmergencyContact';
import SupportTickets from './components/SupportTickets';

const SupportCenter = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('faq');

  const translations = {
    en: {
      pageTitle: 'Support Center - FinanceFlow',
      supportCenter: 'Support Center',
      howCanWeHelp: 'How can we help you today?',
      faq: 'FAQ',
      liveChat: 'Live Chat',
      tickets: 'My Tickets',
      emergency: 'Emergency'
    },
    es: {
      pageTitle: 'Centro de Soporte - FinanceFlow',
      supportCenter: 'Centro de Soporte',
      howCanWeHelp: '¿Cómo podemos ayudarte hoy?',
      faq: 'FAQ',
      liveChat: 'Chat en Vivo',
      tickets: 'Mis Tickets',
      emergency: 'Emergencia'
    },
    fr: {
      pageTitle: 'Centre de Support - FinanceFlow',
      supportCenter: 'Centre de Support',
      howCanWeHelp: 'Comment pouvons-nous vous aider aujourd\'hui?',
      faq: 'FAQ',
      liveChat: 'Chat en Direct',
      tickets: 'Mes Tickets',
      emergency: 'Urgence'
    }
  };

  const supportTabs = [
    { id: 'faq', label: translations[currentLanguage].faq, icon: 'HelpCircle' },
    { id: 'chat', label: translations[currentLanguage].liveChat, icon: 'MessageCircle' },
    { id: 'tickets', label: translations[currentLanguage].tickets, icon: 'Ticket' },
    { id: 'emergency', label: translations[currentLanguage].emergency, icon: 'AlertTriangle' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveTab('faq'); // Switch to FAQ when searching
  };

  const handleQuickAction = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Handle different quick actions
    switch (actionId) {
      case 'lost-card': case'dispute-transaction': case'account-locked': setActiveTab('emergency');
        break;
      default:
        setActiveTab('chat');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'faq':
        return (
          <FAQSection 
            searchQuery={searchQuery} 
            currentLanguage={currentLanguage} 
          />
        );
      case 'chat':
        return (
          <LiveChatInterface 
            currentLanguage={currentLanguage} 
          />
        );
      case 'tickets':
        return (
          <SupportTickets 
            currentLanguage={currentLanguage} 
          />
        );
      case 'emergency':
        return (
          <EmergencyContact 
            currentLanguage={currentLanguage} 
          />
        );
      default:
        return (
          <FAQSection 
            searchQuery={searchQuery} 
            currentLanguage={currentLanguage} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{translations[currentLanguage].pageTitle}</title>
        <meta name="description" content="Get comprehensive support for your FinanceFlow account. Access live chat, FAQ, emergency contacts, and manage support tickets." />
      </Helmet>

      <HeaderContext />

      <main className="pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-text-primary">
              {translations[currentLanguage].supportCenter}
            </h1>
            <p className="text-text-secondary">
              {translations[currentLanguage].howCanWeHelp}
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch} 
            currentLanguage={currentLanguage} 
          />

          {/* Quick Actions */}
          <QuickActions 
            onActionClick={handleQuickAction} 
            currentLanguage={currentLanguage} 
          />

          {/* Support Tabs */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-border bg-muted">
              {supportTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-accent border-b-2 border-accent bg-surface' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <span className="hidden sm:block">{tab.label}</span>
                  <span className="sm:hidden">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
      <FloatingSupport />
    </div>
  );
};

export default SupportCenter;