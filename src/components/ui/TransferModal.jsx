import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const TransferModal = ({ isOpen, onClose, onTransferComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [transferData, setTransferData] = useState({
    recipient: '',
    amount: '',
    description: '',
    transferType: 'instant'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentContacts, setRecentContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'JD' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', avatar: 'SW' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'MJ' }
  ]);

  const translations = {
    en: {
      transferMoney: 'Transfer Money',
      selectRecipient: 'Select Recipient',
      enterAmount: 'Enter Amount',
      reviewTransfer: 'Review Transfer',
      transferComplete: 'Transfer Complete',
      recentContacts: 'Recent Contacts',
      addNewRecipient: 'Add New Recipient',
      recipientEmail: 'Recipient Email',
      amount: 'Amount',
      description: 'Description (Optional)',
      transferType: 'Transfer Type',
      instant: 'Instant (Fee: $2.99)',
      standard: 'Standard (1-3 days)',
      next: 'Next',
      back: 'Back',
      confirm: 'Confirm Transfer',
      cancel: 'Cancel',
      processing: 'Processing...',
      success: 'Success!',
      transferSuccessful: 'Your transfer has been completed successfully.',
      done: 'Done',
      availableBalance: 'Available Balance',
      transferFee: 'Transfer Fee',
      totalAmount: 'Total Amount'
    },
    es: {
      transferMoney: 'Transferir Dinero',
      selectRecipient: 'Seleccionar Destinatario',
      enterAmount: 'Ingresar Monto',
      reviewTransfer: 'Revisar Transferencia',
      transferComplete: 'Transferencia Completa',
      recentContacts: 'Contactos Recientes',
      addNewRecipient: 'Agregar Nuevo Destinatario',
      recipientEmail: 'Email del Destinatario',
      amount: 'Monto',
      description: 'Descripción (Opcional)',
      transferType: 'Tipo de Transferencia',
      instant: 'Instantánea (Tarifa: $2.99)',
      standard: 'Estándar (1-3 días)',
      next: 'Siguiente',
      back: 'Atrás',
      confirm: 'Confirmar Transferencia',
      cancel: 'Cancelar',
      processing: 'Procesando...',
      success: '¡Éxito!',
      transferSuccessful: 'Su transferencia se ha completado exitosamente.',
      done: 'Hecho',
      availableBalance: 'Saldo Disponible',
      transferFee: 'Tarifa de Transferencia',
      totalAmount: 'Monto Total'
    },
    fr: {
      transferMoney: 'Transférer de l\'argent',
      selectRecipient: 'Sélectionner le destinataire',
      enterAmount: 'Entrer le montant',
      reviewTransfer: 'Réviser le transfert',
      transferComplete: 'Transfert terminé',
      recentContacts: 'Contacts récents',
      addNewRecipient: 'Ajouter un nouveau destinataire',
      recipientEmail: 'Email du destinataire',
      amount: 'Montant',
      description: 'Description (Optionnel)',
      transferType: 'Type de transfert',
      instant: 'Instantané (Frais: $2.99)',
      standard: 'Standard (1-3 jours)',
      next: 'Suivant',
      back: 'Retour',
      confirm: 'Confirmer le transfert',
      cancel: 'Annuler',
      processing: 'Traitement...',
      success: 'Succès!',
      transferSuccessful: 'Votre transfert a été complété avec succès.',
      done: 'Terminé',
      availableBalance: 'Solde disponible',
      transferFee: 'Frais de transfert',
      totalAmount: 'Montant total'
    }
  };

  const steps = [
    { id: 1, title: translations[currentLanguage].selectRecipient },
    { id: 2, title: translations[currentLanguage].enterAmount },
    { id: 3, title: translations[currentLanguage].reviewTransfer },
    { id: 4, title: translations[currentLanguage].transferComplete }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setTransferData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSelect = (contact) => {
    setTransferData(prev => ({
      ...prev,
      recipient: contact.email
    }));
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmTransfer = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setCurrentStep(4);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setTransferData({
      recipient: '',
      amount: '',
      description: '',
      transferType: 'instant'
    });
    setIsProcessing(false);
    onClose();
  };

  const handleComplete = () => {
    if (onTransferComplete) {
      onTransferComplete(transferData);
    }
    handleClose();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTransferFee = () => {
    return transferData.transferType === 'instant' ? 2.99 : 0;
  };

  const getTotalAmount = () => {
    const amount = parseFloat(transferData.amount) || 0;
    const fee = getTransferFee();
    return amount + fee;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-surface rounded-2xl shadow-elevation-4 max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {translations[currentLanguage].transferMoney}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="var(--color-text-secondary)" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-muted">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-border text-text-secondary'
                  }
                `}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 h-0.5 mx-2
                    ${currentStep > step.id ? 'bg-accent' : 'bg-border'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-text-primary">
              {steps[currentStep - 1]?.title}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Step 1: Select Recipient */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">
                  {translations[currentLanguage].recentContacts}
                </h3>
                <div className="space-y-2">
                  {recentContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleContactSelect(contact)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                        {contact.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-text-primary">{contact.name}</p>
                        <p className="text-sm text-text-secondary">{contact.email}</p>
                      </div>
                      <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium text-text-primary mb-4">
                  {translations[currentLanguage].addNewRecipient}
                </h3>
                <Input
                  type="email"
                  placeholder={translations[currentLanguage].recipientEmail}
                  value={transferData.recipient}
                  onChange={(e) => handleInputChange('recipient', e.target.value)}
                  className="mb-4"
                />
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!transferData.recipient}
                  fullWidth
                >
                  {translations[currentLanguage].next}
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Enter Amount */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].amount}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={transferData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="pl-8 text-lg font-mono"
                  />
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  {translations[currentLanguage].availableBalance}: {formatCurrency(12450.75)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].description}
                </label>
                <Input
                  type="text"
                  placeholder="What's this for?"
                  value={transferData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].transferType}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input
                      type="radio"
                      name="transferType"
                      value="instant"
                      checked={transferData.transferType === 'instant'}
                      onChange={(e) => handleInputChange('transferType', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">
                        {translations[currentLanguage].instant}
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                    <input
                      type="radio"
                      name="transferType"
                      value="standard"
                      checked={transferData.transferType === 'standard'}
                      onChange={(e) => handleInputChange('transferType', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">
                        {translations[currentLanguage].standard}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review Transfer */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">To:</span>
                  <span className="font-medium text-text-primary">{transferData.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">{translations[currentLanguage].amount}:</span>
                  <span className="font-mono font-medium text-text-primary">
                    {formatCurrency(parseFloat(transferData.amount) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">{translations[currentLanguage].transferFee}:</span>
                  <span className="font-mono font-medium text-text-primary">
                    {formatCurrency(getTransferFee())}
                  </span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-text-primary">{translations[currentLanguage].totalAmount}:</span>
                    <span className="font-mono font-semibold text-text-primary">
                      {formatCurrency(getTotalAmount())}
                    </span>
                  </div>
                </div>
                {transferData.description && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{translations[currentLanguage].description}:</span>
                    <span className="font-medium text-text-primary">{transferData.description}</span>
                  </div>
                )}
              </div>
              
              <Button
                variant="primary"
                onClick={handleConfirmTransfer}
                loading={isProcessing}
                fullWidth
              >
                {isProcessing ? translations[currentLanguage].processing : translations[currentLanguage].confirm}
              </Button>
            </div>
          )}

          {/* Step 4: Transfer Complete */}
          {currentStep === 4 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
                <Icon name="Check" size={32} color="white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {translations[currentLanguage].success}
                </h3>
                <p className="text-text-secondary">
                  {translations[currentLanguage].transferSuccessful}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono font-semibold text-lg text-success">
                  {formatCurrency(parseFloat(transferData.amount) || 0)}
                </p>
                <p className="text-sm text-text-secondary">
                  Sent to {transferData.recipient}
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleComplete}
                fullWidth
              >
                {translations[currentLanguage].done}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep > 1 && currentStep < 4 && (
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
            >
              {translations[currentLanguage].back}
            </Button>
            {currentStep < 3 && (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={
                  (currentStep === 2 && (!transferData.amount || parseFloat(transferData.amount) <= 0))
                }
              >
                {translations[currentLanguage].next}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferModal;