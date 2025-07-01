import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TransferModal from '../../../components/ui/TransferModal';

const QuickActions = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showTransferModal, setShowTransferModal] = useState(false);

  const translations = {
    en: {
      quickActions: 'Quick Actions',
      sendMoney: 'Send Money',
      requestMoney: 'Request Money',
      payBills: 'Pay Bills',
      topUp: 'Top Up',
      scanQr: 'Scan QR',
      moreServices: 'More Services',
      transfer: 'Transfer',
      request: 'Request',
      bills: 'Bills',
      mobile: 'Mobile',
      scan: 'Scan',
      more: 'More'
    },
    es: {
      quickActions: 'Acciones Rápidas',
      sendMoney: 'Enviar Dinero',
      requestMoney: 'Solicitar Dinero',
      payBills: 'Pagar Facturas',
      topUp: 'Recargar',
      scanQr: 'Escanear QR',
      moreServices: 'Más Servicios',
      transfer: 'Transferir',
      request: 'Solicitar',
      bills: 'Facturas',
      mobile: 'Móvil',
      scan: 'Escanear',
      more: 'Más'
    },
    fr: {
      quickActions: 'Actions Rapides',
      sendMoney: 'Envoyer de l\'argent',
      requestMoney: 'Demander de l\'argent',
      payBills: 'Payer les factures',
      topUp: 'Recharger',
      scanQr: 'Scanner QR',
      moreServices: 'Plus de services',
      transfer: 'Transférer',
      request: 'Demander',
      bills: 'Factures',
      mobile: 'Mobile',
      scan: 'Scanner',
      more: 'Plus'
    }
  };

  const quickActions = [
    {
      id: 1,
      title: translations[currentLanguage].sendMoney,
      shortTitle: translations[currentLanguage].transfer,
      icon: 'Send',
      color: 'from-accent to-warning',
      action: () => setShowTransferModal(true)
    },
    {
      id: 2,
      title: translations[currentLanguage].requestMoney,
      shortTitle: translations[currentLanguage].request,
      icon: 'ArrowDownLeft',
      color: 'from-success to-accent',
      action: () => handleRequestMoney()
    },
    {
      id: 3,
      title: translations[currentLanguage].payBills,
      shortTitle: translations[currentLanguage].bills,
      icon: 'Receipt',
      color: 'from-primary to-secondary',
      action: () => handlePayBills()
    },
    {
      id: 4,
      title: translations[currentLanguage].topUp,
      shortTitle: translations[currentLanguage].mobile,
      icon: 'Smartphone',
      color: 'from-secondary to-primary',
      action: () => handleTopUp()
    },
    {
      id: 5,
      title: translations[currentLanguage].scanQr,
      shortTitle: translations[currentLanguage].scan,
      icon: 'QrCode',
      color: 'from-warning to-success',
      action: () => handleScanQr()
    },
    {
      id: 6,
      title: translations[currentLanguage].moreServices,
      shortTitle: translations[currentLanguage].more,
      icon: 'Grid3X3',
      color: 'from-muted-foreground to-text-secondary',
      action: () => handleMoreServices()
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleRequestMoney = () => {
    console.log('Request money clicked');
    // Implement request money functionality
  };

  const handlePayBills = () => {
    console.log('Pay bills clicked');
    // Navigate to bills payment
  };

  const handleTopUp = () => {
    console.log('Top up clicked');
    // Navigate to mobile top-up
  };

  const handleScanQr = () => {
    console.log('Scan QR clicked');
    // Open QR scanner
  };

  const handleMoreServices = () => {
    console.log('More services clicked');
    // Navigate to services page
  };

  const handleTransferComplete = (transferData) => {
    console.log('Transfer completed:', transferData);
    // Handle successful transfer
  };

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <h2 className="text-lg font-semibold text-text-primary">
          {translations[currentLanguage].quickActions}
        </h2>

        {/* Actions Grid */}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="group relative overflow-hidden bg-surface border border-border rounded-xl p-4 hover:shadow-elevation-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {/* Background Gradient */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 
                group-hover:opacity-10 transition-opacity duration-200
              `} />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center space-y-3">
                {/* Icon */}
                <div className={`
                  w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl 
                  flex items-center justify-center shadow-sm
                  group-hover:scale-110 transition-transform duration-200
                `}>
                  <Icon 
                    name={action.icon} 
                    size={20} 
                    color="white" 
                    strokeWidth={2}
                  />
                </div>
                
                {/* Title */}
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-200 hidden sm:block">
                    {action.title}
                  </p>
                  <p className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors duration-200 sm:hidden">
                    {action.shortTitle}
                  </p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>

        {/* Featured Actions (Mobile) */}
        <div className="sm:hidden space-y-2">
          <Button
            variant="primary"
            onClick={() => setShowTransferModal(true)}
            iconName="Send"
            iconPosition="left"
            fullWidth
          >
            {translations[currentLanguage].sendMoney}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={handleRequestMoney}
              iconName="ArrowDownLeft"
              iconPosition="left"
              fullWidth
            >
              {translations[currentLanguage].request}
            </Button>
            <Button
              variant="outline"
              onClick={handlePayBills}
              iconName="Receipt"
              iconPosition="left"
              fullWidth
            >
              {translations[currentLanguage].bills}
            </Button>
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransferComplete={handleTransferComplete}
      />
    </>
  );
};

export default QuickActions;