import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VerificationForm = ({ formData, onNext, onBack, currentLanguage }) => {
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const translations = {
    en: {
      verification: 'Verification',
      verifyIdentity: 'Verify Your Identity',
      emailVerification: 'Email Verification',
      smsVerification: 'SMS Verification',
      emailSent: `We've sent a 6-digit code to`,smsSent: `We've sent a 6-digit code to`,
      enterCode: 'Enter the 6-digit code',
      resendCode: 'Resend Code',
      resendIn: 'Resend in',
      seconds: 'seconds',
      verify: 'Verify',
      back: 'Back',
      verifying: 'Verifying...',
      invalidCode: 'Invalid verification code',
      codeExpired: 'Verification code has expired',
      switchToSms: 'Use SMS instead',
      switchToEmail: 'Use Email instead',
      didntReceive: "Didn\'t receive the code?",
      checkSpam: 'Check your spam folder or try SMS verification'
    },
    es: {
      verification: 'Verificación',
      verifyIdentity: 'Verificar su Identidad',
      emailVerification: 'Verificación por Email',
      smsVerification: 'Verificación por SMS',
      emailSent: 'Hemos enviado un código de 6 dígitos a',
      smsSent: 'Hemos enviado un código de 6 dígitos a',
      enterCode: 'Ingrese el código de 6 dígitos',
      resendCode: 'Reenviar Código',
      resendIn: 'Reenviar en',
      seconds: 'segundos',
      verify: 'Verificar',
      back: 'Atrás',
      verifying: 'Verificando...',
      invalidCode: 'Código de verificación inválido',
      codeExpired: 'El código de verificación ha expirado',
      switchToSms: 'Usar SMS en su lugar',
      switchToEmail: 'Usar Email en su lugar',
      didntReceive: '¿No recibió el código?',
      checkSpam: 'Revise su carpeta de spam o pruebe verificación por SMS'
    },
    fr: {
      verification: 'Vérification',
      verifyIdentity: 'Vérifiez votre Identité',
      emailVerification: 'Vérification par Email',
      smsVerification: 'Vérification par SMS',
      emailSent: 'Nous avons envoyé un code à 6 chiffres à',
      smsSent: 'Nous avons envoyé un code à 6 chiffres à',
      enterCode: 'Entrez le code à 6 chiffres',
      resendCode: 'Renvoyer le Code',
      resendIn: 'Renvoyer dans',
      seconds: 'secondes',
      verify: 'Vérifier',
      back: 'Retour',
      verifying: 'Vérification...',
      invalidCode: 'Code de vérification invalide',
      codeExpired: 'Le code de vérification a expiré',
      switchToSms: 'Utiliser SMS à la place',
      switchToEmail: 'Utiliser Email à la place',
      didntReceive: 'Vous n\'avez pas reçu le code?',
      checkSpam: 'Vérifiez votre dossier spam ou essayez la vérification SMS'
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Auto-verify when all digits are entered
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async (code = verificationCode.join('')) => {
    if (code.length !== 6) {
      setError(translations[currentLanguage].invalidCode);
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock verification - accept '123456' as valid code
    if (code === '123456') {
      onNext();
    } else {
      setError(translations[currentLanguage].invalidCode);
      setVerificationCode(['', '', '', '', '', '']);
      const firstInput = document.getElementById('code-0');
      if (firstInput) firstInput.focus();
    }

    setIsVerifying(false);
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
    // Simulate resending code
    console.log(`Resending ${verificationMethod} verification code`);
  };

  const switchVerificationMethod = () => {
    setVerificationMethod(verificationMethod === 'email' ? 'sms' : 'email');
    setVerificationCode(['', '', '', '', '', '']);
    setTimeLeft(60);
    setCanResend(false);
    setError('');
  };

  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  const maskPhone = (phone) => {
    return phone.replace(/(\d{3})\d{3}(\d{4})/, '$1***$2');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} color="var(--color-accent)" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-semibold text-text-primary mb-2">
          {translations[currentLanguage].verification}
        </h3>
        <p className="text-text-secondary">
          {translations[currentLanguage].verifyIdentity}
        </p>
      </div>

      <div className="space-y-6">
        {/* Verification Method Tabs */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setVerificationMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              verificationMethod === 'email' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Mail" size={16} className="inline mr-2" />
            {translations[currentLanguage].emailVerification}
          </button>
          <button
            onClick={() => setVerificationMethod('sms')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              verificationMethod === 'sms' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="MessageSquare" size={16} className="inline mr-2" />
            {translations[currentLanguage].smsVerification}
          </button>
        </div>

        {/* Verification Message */}
        <div className="text-center space-y-2">
          <p className="text-text-secondary">
            {verificationMethod === 'email' 
              ? translations[currentLanguage].emailSent 
              : translations[currentLanguage].smsSent
            }
          </p>
          <p className="font-mono font-semibold text-text-primary">
            {verificationMethod === 'email' 
              ? maskEmail(formData.email || 'user@example.com')
              : maskPhone(formData.phone || '+1 (555) 123-4567')
            }
          </p>
        </div>

        {/* Code Input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-text-primary text-center">
            {translations[currentLanguage].enterCode}
          </label>
          <div className="flex justify-center space-x-3">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-lg font-mono ${
                  error ? 'border-error' : ''
                }`}
                autoComplete="off"
              />
            ))}
          </div>
          {error && (
            <p className="text-error text-sm text-center flex items-center justify-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {error}
            </p>
          )}
        </div>

        {/* Resend Code */}
        <div className="text-center space-y-2">
          <p className="text-sm text-text-secondary">
            {translations[currentLanguage].didntReceive}
          </p>
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-accent hover:text-accent/80 font-medium text-sm transition-colors duration-200"
            >
              {translations[currentLanguage].resendCode}
            </button>
          ) : (
            <p className="text-sm text-text-secondary">
              {translations[currentLanguage].resendIn} {timeLeft} {translations[currentLanguage].seconds}
            </p>
          )}
        </div>

        {/* Alternative Method */}
        <div className="text-center">
          <button
            onClick={switchVerificationMethod}
            className="text-accent hover:text-accent/80 text-sm transition-colors duration-200"
          >
            {verificationMethod === 'email' 
              ? translations[currentLanguage].switchToSms
              : translations[currentLanguage].switchToEmail
            }
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1"
          >
            {translations[currentLanguage].back}
          </Button>
          <Button
            variant="primary"
            onClick={() => handleVerify()}
            loading={isVerifying}
            disabled={verificationCode.join('').length !== 6}
            iconName="ArrowRight"
            iconPosition="right"
            className="flex-1"
          >
            {isVerifying ? translations[currentLanguage].verifying : translations[currentLanguage].verify}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;