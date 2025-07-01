import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const TransferConfirmation = ({ 
  transferData, 
  onConfirm, 
  onCancel, 
  isProcessing, 
  currentLanguage 
}) => {
  const [authMethod, setAuthMethod] = useState('pin');
  const [pin, setPin] = useState('');
  const [biometricSupported, setBiometricSupported] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const translations = {
    en: {
      confirmTransfer: 'Confirm Transfer',
      authentication: 'Authentication Required',
      enterPin: 'Enter your 4-digit PIN',
      useBiometric: 'Use Biometric',
      usePin: 'Use PIN',
      biometricPrompt: 'Touch the fingerprint sensor to authenticate',
      processing: 'Processing Transfer...',
      success: 'Transfer Successful!',
      transferComplete: 'Your money has been sent successfully',
      transactionId: 'Transaction ID',
      downloadReceipt: 'Download Receipt',
      shareReceipt: 'Share Receipt',
      done: 'Done',
      cancel: 'Cancel',
      confirm: 'Confirm Transfer',
      invalidPin: 'Invalid PIN. Please try again.',
      biometricFailed: 'Biometric authentication failed',
      securityTip: 'Never share your PIN or biometric data with anyone'
    },
    es: {
      confirmTransfer: 'Confirmar Transferencia',
      authentication: 'Autenticación Requerida',
      enterPin: 'Ingrese su PIN de 4 dígitos',
      useBiometric: 'Usar Biométrico',
      usePin: 'Usar PIN',
      biometricPrompt: 'Toque el sensor de huella para autenticarse',
      processing: 'Procesando Transferencia...',
      success: '¡Transferencia Exitosa!',
      transferComplete: 'Su dinero ha sido enviado exitosamente',
      transactionId: 'ID de Transacción',
      downloadReceipt: 'Descargar Recibo',
      shareReceipt: 'Compartir Recibo',
      done: 'Hecho',
      cancel: 'Cancelar',
      confirm: 'Confirmar Transferencia',
      invalidPin: 'PIN inválido. Inténtelo de nuevo.',
      biometricFailed: 'Falló la autenticación biométrica',
      securityTip: 'Nunca comparta su PIN o datos biométricos con nadie'
    },
    fr: {
      confirmTransfer: 'Confirmer le transfert',
      authentication: 'Authentification requise',
      enterPin: 'Entrez votre PIN à 4 chiffres',
      useBiometric: 'Utiliser la biométrie',
      usePin: 'Utiliser le PIN',
      biometricPrompt: 'Touchez le capteur d\'empreinte pour vous authentifier',
      processing: 'Traitement du transfert...',
      success: 'Transfert réussi!',
      transferComplete: 'Votre argent a été envoyé avec succès',
      transactionId: 'ID de transaction',
      downloadReceipt: 'Télécharger le reçu',
      shareReceipt: 'Partager le reçu',
      done: 'Terminé',
      cancel: 'Annuler',
      confirm: 'Confirmer le transfert',
      invalidPin: 'PIN invalide. Veuillez réessayer.',
      biometricFailed: 'Échec de l\'authentification biométrique',
      securityTip: 'Ne partagez jamais votre PIN ou vos données biométriques'
    }
  };

  useEffect(() => {
    // Generate transaction ID when component mounts
    setTransactionId(`TXN${Date.now().toString().slice(-8)}`);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handlePinChange = (value) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
    }
  };

  const handleBiometricAuth = async () => {
    // Simulate biometric authentication
    try {
      // In a real app, this would use the Web Authentication API
      await new Promise(resolve => setTimeout(resolve, 1500));
      handleConfirm();
    } catch (error) {
      alert(translations[currentLanguage].biometricFailed);
    }
  };

  const handleConfirm = () => {
    if (authMethod === 'pin' && pin !== '1234') {
      alert(translations[currentLanguage].invalidPin);
      return;
    }
    onConfirm();
  };

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const receiptData = {
      transactionId,
      date: new Date().toISOString(),
      amount: transferData.amount,
      recipient: transferData.recipient,
      fee: transferData.transferType === 'instant' ? 2.99 : 0
    };
    
    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `receipt_${transactionId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleShareReceipt = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Transfer Receipt',
          text: `Transfer of ${formatCurrency(transferData.amount)} to ${transferData.recipient?.name} completed successfully. Transaction ID: ${transactionId}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Transfer of ${formatCurrency(transferData.amount)} to ${transferData.recipient?.name} completed successfully. Transaction ID: ${transactionId}`;
      navigator.clipboard.writeText(shareText);
      alert('Receipt details copied to clipboard!');
    }
  };

  if (showReceipt) {
    return (
      <div className="space-y-6">
        {/* Success Animation */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <Icon name="Check" size={40} color="white" strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-success mb-2">
              {translations[currentLanguage].success}
            </h2>
            <p className="text-text-secondary">
              {translations[currentLanguage].transferComplete}
            </p>
          </div>
        </div>

        {/* Receipt Card */}
        <div className="bg-gradient-to-br from-success/10 to-accent/10 rounded-2xl p-6 border border-success/20">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Image
                src={transferData.recipient?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(transferData.recipient?.name || 'User')}&background=2C3E50&color=fff`}
                alt={transferData.recipient?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <Icon name="ArrowRight" size={20} color="var(--color-success)" />
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={20} color="white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-success mb-2">
              {formatCurrency(transferData.amount)}
            </p>
            <p className="text-text-secondary">
              Sent to {transferData.recipient?.name}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">{translations[currentLanguage].transactionId}:</span>
              <span className="font-mono font-medium text-text-primary">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Date:</span>
              <span className="font-medium text-text-primary">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Recipient:</span>
              <span className="font-medium text-text-primary">{transferData.recipient?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Bank:</span>
              <span className="font-medium text-text-primary">{transferData.recipient?.bankName}</span>
            </div>
            {transferData.description && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Note:</span>
                <span className="font-medium text-text-primary">{transferData.description}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleDownloadReceipt}
              iconName="Download"
              iconPosition="left"
            >
              {translations[currentLanguage].downloadReceipt}
            </Button>
            <Button
              variant="outline"
              onClick={handleShareReceipt}
              iconName="Share"
              iconPosition="left"
            >
              {translations[currentLanguage].shareReceipt}
            </Button>
          </div>
          <Button
            variant="primary"
            onClick={onCancel}
            fullWidth
          >
            {translations[currentLanguage].done}
          </Button>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto animate-spin">
            <Icon name="Loader2" size={40} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              {translations[currentLanguage].processing}
            </h2>
            <p className="text-text-secondary">
              Please wait while we process your transfer...
            </p>
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <Icon name="Check" size={16} color="var(--color-success)" />
            <span className="text-sm text-success">Validating transfer details</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
            <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-accent">Processing payment</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-4 h-4 bg-border rounded-full"></div>
            <span className="text-sm text-text-secondary">Sending confirmation</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          {translations[currentLanguage].confirmTransfer}
        </h2>
        <p className="text-sm text-text-secondary">
          {translations[currentLanguage].authentication}
        </p>
      </div>

      {/* Transfer Summary */}
      <div className="bg-muted rounded-2xl p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={transferData.recipient?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(transferData.recipient?.name || 'User')}&background=2C3E50&color=fff`}
            alt={transferData.recipient?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-text-primary">{transferData.recipient?.name}</p>
            <p className="text-sm text-text-secondary">{transferData.recipient?.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-accent">{formatCurrency(transferData.amount)}</p>
            <p className="text-sm text-text-secondary">
              + {formatCurrency(transferData.transferType === 'instant' ? 2.99 : 0)} fee
            </p>
          </div>
        </div>
      </div>

      {/* Authentication Method Selection */}
      <div className="space-y-4">
        <div className="flex space-x-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setAuthMethod('pin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              authMethod === 'pin' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            {translations[currentLanguage].usePin}
          </button>
          {biometricSupported && (
            <button
              onClick={() => setAuthMethod('biometric')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                authMethod === 'biometric' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {translations[currentLanguage].useBiometric}
            </button>
          )}
        </div>

        {/* PIN Authentication */}
        {authMethod === 'pin' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-4">
                {translations[currentLanguage].enterPin}
              </p>
              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      pin.length > index
                        ? 'bg-accent border-accent' :'border-border'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              className="text-center text-2xl tracking-widest"
              maxLength={4}
            />
          </div>
        )}

        {/* Biometric Authentication */}
        {authMethod === 'biometric' && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Fingerprint" size={40} color="var(--color-accent)" />
            </div>
            <p className="text-sm text-text-secondary">
              {translations[currentLanguage].biometricPrompt}
            </p>
            <Button
              variant="primary"
              onClick={handleBiometricAuth}
              iconName="Fingerprint"
              iconPosition="left"
            >
              Authenticate
            </Button>
          </div>
        )}
      </div>

      {/* Security Tip */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} color="var(--color-warning)" className="mt-0.5" />
          <p className="text-xs text-text-secondary">
            {translations[currentLanguage].securityTip}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
          fullWidth
        >
          {translations[currentLanguage].cancel}
        </Button>
        <Button
          variant="primary"
          onClick={authMethod === 'pin' ? handleConfirm : handleBiometricAuth}
          disabled={authMethod === 'pin' && pin.length !== 4}
          fullWidth
        >
          {translations[currentLanguage].confirm}
        </Button>
      </div>
    </div>
  );
};

export default TransferConfirmation;