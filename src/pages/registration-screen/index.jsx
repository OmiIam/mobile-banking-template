import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalInfoForm from './components/PersonalInfoForm';
import SecuritySetupForm from './components/SecuritySetupForm';
import BiometricSetupForm from './components/BiometricSetupForm';
import VerificationForm from './components/VerificationForm';
import WelcomeScreen from './components/WelcomeScreen';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    biometricEnabled: false,
    termsAccepted: false
  });

  const translations = {
    en: {
      getStarted: 'Get Started',
      personalInfo: 'Personal Information',
      securitySetup: 'Security Setup',
      biometricSetup: 'Biometric Setup',
      verification: 'Verification',
      welcome: 'Welcome',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In'
    },
    es: {
      getStarted: 'Comenzar',
      personalInfo: 'Información Personal',
      securitySetup: 'Configuración de Seguridad',
      biometricSetup: 'Configuración Biométrica',
      verification: 'Verificación',
      welcome: 'Bienvenido',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar Sesión'
    },
    fr: {
      getStarted: 'Commencer',
      personalInfo: 'Informations Personnelles',
      securitySetup: 'Configuration de Sécurité',
      biometricSetup: 'Configuration Biométrique',
      verification: 'Vérification',
      welcome: 'Bienvenue',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      signIn: 'Se Connecter'
    }
  };

  const steps = [
    { id: 1, title: translations[currentLanguage].personalInfo },
    { id: 2, title: translations[currentLanguage].securitySetup },
    { id: 3, title: translations[currentLanguage].biometricSetup },
    { id: 4, title: translations[currentLanguage].verification },
    { id: 5, title: translations[currentLanguage].welcome }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipBiometric = () => {
    setFormData(prev => ({ ...prev, biometricEnabled: false }));
    setCurrentStep(4);
  };

  const handleSignInClick = () => {
    navigate('/dashboard-home');
  };

  const Logo = () => (
    <div className="flex items-center justify-center space-x-3 mb-8">
      <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-lg">
        <Icon name="DollarSign" size={28} color="white" strokeWidth={2.5} />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary font-inter">
          FinanceFlow
        </h1>
        <p className="text-sm text-text-secondary">
          Your Financial Future Starts Here
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Logo />
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>{translations[currentLanguage].alreadyHaveAccount}</span>
              <button
                onClick={handleSignInClick}
                className="text-accent hover:text-accent/80 font-medium transition-colors duration-200"
              >
                {translations[currentLanguage].signIn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Progress Indicator */}
          {currentStep < 5 && (
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={5}
              steps={steps}
            />
          )}

          {/* Form Steps */}
          <div className="bg-surface rounded-2xl shadow-elevation-2 p-6 mb-6">
            {currentStep === 1 && (
              <PersonalInfoForm
                formData={formData}
                onInputChange={handleInputChange}
                onNext={handleNext}
                currentLanguage={currentLanguage}
              />
            )}

            {currentStep === 2 && (
              <SecuritySetupForm
                formData={formData}
                onInputChange={handleInputChange}
                onNext={handleNext}
                onBack={handleBack}
                currentLanguage={currentLanguage}
              />
            )}

            {currentStep === 3 && (
              <BiometricSetupForm
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkipBiometric}
                currentLanguage={currentLanguage}
              />
            )}

            {currentStep === 4 && (
              <VerificationForm
                formData={formData}
                onNext={handleNext}
                onBack={handleBack}
                currentLanguage={currentLanguage}
              />
            )}

            {currentStep === 5 && (
              <WelcomeScreen
                formData={formData}
                currentLanguage={currentLanguage}
              />
            )}
          </div>

          {/* Trust Signals */}
          {currentStep < 5 && (
            <TrustSignals currentLanguage={currentLanguage} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center space-y-2">
            <p className="text-xs text-text-secondary">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-xs text-text-secondary">
              © {new Date().getFullYear()} FinanceFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationScreen;