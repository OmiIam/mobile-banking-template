import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeaderContext from '../../components/ui/HeaderContext';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingSupport from '../../components/ui/FloatingSupport';

// Import components
import StepIndicator from './components/StepIndicator';
import AmountInput from './components/AmountInput';
import RecipientSelector from './components/RecipientSelector';
import TransferReview from './components/TransferReview';
import TransferConfirmation from './components/TransferConfirmation';

const MoneyTransfer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isProcessing, setIsProcessing] = useState(false);
  const [userBalance] = useState(12450.75);
  
  const [transferData, setTransferData] = useState({
    amount: '',
    recipient: null,
    transferType: 'instant',
    description: '',
    isScheduled: false,
    scheduleDate: '',
    isRecurring: false,
    recurringFrequency: 'monthly'
  });

  const [draftSaved, setDraftSaved] = useState(false);

  const translations = {
    en: {
      moneyTransfer: 'Money Transfer',
      back: 'Back',
      next: 'Next',
      cancel: 'Cancel',
      draftSaved: 'Draft saved',
      exitConfirm: 'Exit Transfer?',
      exitMessage: 'Your progress will be saved as a draft.',
      stay: 'Stay',
      exit: 'Exit',
      networkError: 'Network error. Please check your connection.',
      insufficientFunds: 'Insufficient funds for this transfer.',
      transferLimitExceeded: 'Transfer limit exceeded.',
      invalidRecipient: 'Please select a valid recipient.'
    },
    es: {
      moneyTransfer: 'Transferir Dinero',
      back: 'Atrás',
      next: 'Siguiente',
      cancel: 'Cancelar',
      draftSaved: 'Borrador guardado',
      exitConfirm: '¿Salir de la transferencia?',
      exitMessage: 'Su progreso se guardará como borrador.',
      stay: 'Quedarse',
      exit: 'Salir',
      networkError: 'Error de red. Verifique su conexión.',
      insufficientFunds: 'Fondos insuficientes para esta transferencia.',
      transferLimitExceeded: 'Límite de transferencia excedido.',
      invalidRecipient: 'Seleccione un destinatario válido.'
    },
    fr: {
      moneyTransfer: 'Transférer de l\'argent',
      back: 'Retour',
      next: 'Suivant',
      cancel: 'Annuler',
      draftSaved: 'Brouillon sauvegardé',
      exitConfirm: 'Quitter le transfert?',
      exitMessage: 'Votre progression sera sauvegardée comme brouillon.',
      stay: 'Rester',
      exit: 'Sortir',
      networkError: 'Erreur réseau. Vérifiez votre connexion.',
      insufficientFunds: 'Fonds insuffisants pour ce transfert.',
      transferLimitExceeded: 'Limite de transfert dépassée.',
      invalidRecipient: 'Veuillez sélectionner un destinataire valide.'
    }
  };

  const totalSteps = 4;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Load draft if exists
    const savedDraft = localStorage.getItem('transferDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTransferData(draft.data);
        setCurrentStep(draft.step);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }

    // Cleanup on unmount
    return () => {
      saveDraft();
    };
  }, []);

  const saveDraft = () => {
    if (transferData.amount || transferData.recipient) {
      const draft = {
        data: transferData,
        step: currentStep,
        timestamp: Date.now()
      };
      localStorage.setItem('transferDraft', JSON.stringify(draft));
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('transferDraft');
  };

  const handleAmountChange = (amount) => {
    setTransferData(prev => ({ ...prev, amount }));
  };

  const handleRecipientSelect = (recipient) => {
    setTransferData(prev => ({ ...prev, recipient }));
  };

  const handleDescriptionChange = (description) => {
    setTransferData(prev => ({ ...prev, description }));
  };

  const handleTransferTypeChange = (transferType) => {
    setTransferData(prev => ({ ...prev, transferType }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      saveDraft();
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleCancel = () => {
    if (transferData.amount || transferData.recipient) {
      if (window.confirm(`${translations[currentLanguage].exitConfirm}\n${translations[currentLanguage].exitMessage}`)) {
        saveDraft();
        navigate('/dashboard-home');
      }
    } else {
      navigate('/dashboard-home');
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Amount
        const amount = parseFloat(transferData.amount);
        if (!amount || amount < 1) {
          alert('Please enter a valid amount (minimum $1.00)');
          return false;
        }
        if (amount > userBalance) {
          alert(translations[currentLanguage].insufficientFunds);
          return false;
        }
        if (amount > 10000) {
          alert(translations[currentLanguage].transferLimitExceeded);
          return false;
        }
        return true;

      case 2: // Recipient
        if (!transferData.recipient) {
          alert(translations[currentLanguage].invalidRecipient);
          return false;
        }
        return true;

      case 3: // Review
        return true;

      default:
        return true;
    }
  };

  const handleConfirmTransfer = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear draft after successful transfer
      clearDraft();
      
      // Show success state
      setIsProcessing(false);
      
    } catch (error) {
      setIsProcessing(false);
      alert(translations[currentLanguage].networkError);
    }
  };

  const handleTransferComplete = () => {
    navigate('/transaction-history');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <AmountInput
            amount={transferData.amount}
            onAmountChange={handleAmountChange}
            balance={userBalance}
            currentLanguage={currentLanguage}
          />
        );

      case 2:
        return (
          <RecipientSelector
            selectedRecipient={transferData.recipient}
            onRecipientSelect={handleRecipientSelect}
            currentLanguage={currentLanguage}
          />
        );

      case 3:
        return (
          <TransferReview
            amount={transferData.amount}
            recipient={transferData.recipient}
            transferType={transferData.transferType}
            description={transferData.description}
            onDescriptionChange={handleDescriptionChange}
            onTransferTypeChange={handleTransferTypeChange}
            currentLanguage={currentLanguage}
          />
        );

      case 4:
        return (
          <TransferConfirmation
            transferData={transferData}
            onConfirm={handleConfirmTransfer}
            onCancel={handleTransferComplete}
            isProcessing={isProcessing}
            currentLanguage={currentLanguage}
          />
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        const amount = parseFloat(transferData.amount);
        return amount >= 1 && amount <= userBalance && amount <= 10000;
      case 2:
        return transferData.recipient !== null;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderContext />
      
      {/* Draft Saved Notification */}
      {draftSaved && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-100 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-elevation-2 animate-slide-down">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span className="text-sm font-medium">{translations[currentLanguage].draftSaved}</span>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        currentLanguage={currentLanguage} 
      />

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {renderStepContent()}
        </div>
      </div>

      {/* Navigation Controls */}
      {currentStep < 4 && (
        <div className="fixed bottom-20 left-0 right-0 bg-surface border-t border-border p-4 shadow-elevation-2">
          <div className="max-w-md mx-auto flex items-center justify-between space-x-4">
            {/* Back/Cancel Button */}
            <Button
              variant="outline"
              onClick={currentStep === 1 ? handleCancel : handleBack}
              iconName={currentStep === 1 ? "X" : "ArrowLeft"}
              iconPosition="left"
              className="flex-1"
            >
              {currentStep === 1 ? translations[currentLanguage].cancel : translations[currentLanguage].back}
            </Button>

            {/* Next Button */}
            {currentStep < 3 && (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
                iconName="ArrowRight"
                iconPosition="right"
                className="flex-1"
              >
                {translations[currentLanguage].next}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Security Notice for Review Step */}
      {currentStep === 3 && (
        <div className="fixed bottom-32 left-4 right-4 z-50">
          <div className="max-w-md mx-auto bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-warning)" />
              <p className="text-xs text-text-secondary">
                Review all details carefully. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      )}

      <BottomTabNavigation />
      <FloatingSupport />
    </div>
  );
};

export default MoneyTransfer;