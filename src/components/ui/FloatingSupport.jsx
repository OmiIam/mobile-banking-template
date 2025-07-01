import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAgentAvailable, setIsAgentAvailable] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const translations = {
    en: {
      support: 'Support',
      helpCenter: 'Help Center',
      liveChat: 'Live Chat',
      faq: 'FAQ',
      contactUs: 'Contact Us',
      agentAvailable: 'Agent Available',
      agentOffline: 'Agent Offline',
      startChat: 'Start Chat',
      viewFaq: 'View FAQ',
      sendMessage: 'Send Message',
      quickHelp: 'Quick Help',
      commonQuestions: 'Common Questions',
      howToTransfer: 'How to transfer money?',
      checkBalance: 'How to check my balance?',
      resetPassword: 'How to reset password?',
      reportIssue: 'Report an issue'
    },
    es: {
      support: 'Soporte',
      helpCenter: 'Centro de Ayuda',
      liveChat: 'Chat en Vivo',
      faq: 'Preguntas Frecuentes',
      contactUs: 'Contáctanos',
      agentAvailable: 'Agente Disponible',
      agentOffline: 'Agente Desconectado',
      startChat: 'Iniciar Chat',
      viewFaq: 'Ver FAQ',
      sendMessage: 'Enviar Mensaje',
      quickHelp: 'Ayuda Rápida',
      commonQuestions: 'Preguntas Comunes',
      howToTransfer: '¿Cómo transferir dinero?',
      checkBalance: '¿Cómo verificar mi saldo?',
      resetPassword: '¿Cómo restablecer contraseña?',
      reportIssue: 'Reportar un problema'
    },
    fr: {
      support: 'Support',
      helpCenter: 'Centre d\'aide',
      liveChat: 'Chat en direct',
      faq: 'FAQ',
      contactUs: 'Nous contacter',
      agentAvailable: 'Agent disponible',
      agentOffline: 'Agent hors ligne',
      startChat: 'Démarrer le chat',
      viewFaq: 'Voir FAQ',
      sendMessage: 'Envoyer un message',
      quickHelp: 'Aide rapide',
      commonQuestions: 'Questions courantes',
      howToTransfer: 'Comment transférer de l\'argent?',
      checkBalance: 'Comment vérifier mon solde?',
      resetPassword: 'Comment réinitialiser le mot de passe?',
      reportIssue: 'Signaler un problème'
    }
  };

  const quickHelpItems = [
    {
      id: 1,
      question: translations[currentLanguage].howToTransfer,
      icon: 'Send',
      action: () => handleQuickHelp('transfer')
    },
    {
      id: 2,
      question: translations[currentLanguage].checkBalance,
      icon: 'DollarSign',
      action: () => handleQuickHelp('balance')
    },
    {
      id: 3,
      question: translations[currentLanguage].resetPassword,
      icon: 'Lock',
      action: () => handleQuickHelp('password')
    },
    {
      id: 4,
      question: translations[currentLanguage].reportIssue,
      icon: 'AlertCircle',
      action: () => handleQuickHelp('issue')
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate agent availability check
    const checkAgentAvailability = () => {
      const currentHour = new Date().getHours();
      setIsAgentAvailable(currentHour >= 9 && currentHour < 18); // 9 AM to 6 PM
    };

    checkAgentAvailability();
    const interval = setInterval(checkAgentAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      setUnreadCount(0);
    }
  };

  const handleStartChat = () => {
    // Navigate to chat or open chat interface
    console.log('Starting live chat...');
    setIsOpen(false);
  };

  const handleViewFaq = () => {
    // Navigate to FAQ page
    window.location.href = '/support-center';
    setIsOpen(false);
  };

  const handleQuickHelp = (type) => {
    console.log(`Quick help requested for: ${type}`);
    // Handle quick help actions
    setIsOpen(false);
  };

  const handleContactUs = () => {
    // Open contact form or navigate to contact page
    console.log('Opening contact form...');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-150">
      {/* Support Panel */}
      {isOpen && (
        <div className="mb-4 w-80 bg-surface border border-border rounded-2xl shadow-elevation-4 animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">
                {translations[currentLanguage].support}
              </h3>
              <button
                onClick={handleToggle}
                className="p-1 hover:bg-muted rounded-lg transition-colors duration-200"
                aria-label="Close support panel"
              >
                <Icon name="X" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${isAgentAvailable ? 'bg-success' : 'bg-error'}`} />
              <span className="text-sm text-text-secondary">
                {isAgentAvailable ? translations[currentLanguage].agentAvailable : translations[currentLanguage].agentOffline}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Live Chat */}
            <div className="space-y-2">
              <Button
                variant="primary"
                onClick={handleStartChat}
                iconName="MessageCircle"
                iconPosition="left"
                fullWidth
                disabled={!isAgentAvailable}
              >
                {translations[currentLanguage].startChat}
              </Button>
              <Button
                variant="outline"
                onClick={handleViewFaq}
                iconName="HelpCircle"
                iconPosition="left"
                fullWidth
              >
                {translations[currentLanguage].viewFaq}
              </Button>
            </div>

            {/* Quick Help */}
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">
                {translations[currentLanguage].quickHelp}
              </h4>
              <div className="space-y-2">
                {quickHelpItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200 text-left"
                  >
                    <Icon 
                      name={item.icon} 
                      size={16} 
                      color="var(--color-accent)" 
                    />
                    <span className="text-sm text-text-primary flex-1">
                      {item.question}
                    </span>
                    <Icon 
                      name="ChevronRight" 
                      size={14} 
                      color="var(--color-text-secondary)" 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Us */}
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleContactUs}
                iconName="Mail"
                iconPosition="left"
                fullWidth
              >
                {translations[currentLanguage].contactUs}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className={`
          relative w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground 
          rounded-full shadow-floating hover:shadow-floating-hover
          transition-all duration-200 ease-out-quart
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
        aria-label={translations[currentLanguage].support}
      >
        <Icon 
          name={isOpen ? "X" : "MessageCircle"} 
          size={24} 
          color="white" 
          strokeWidth={2}
        />
        
        {/* Notification Badge */}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse-subtle">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}

        {/* Availability Indicator */}
        <div className={`
          absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface
          ${isAgentAvailable ? 'bg-success' : 'bg-error'}
        `} />
      </button>
    </div>
  );
};

export default FloatingSupport;