import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomeScreen = ({ formData, currentLanguage }) => {
  const navigate = useNavigate();

  const translations = {
    en: {
      welcome: 'Welcome to FinanceFlow!',
      accountCreated: 'Your account has been successfully created',
      getStarted: 'Get Started',
      accountDetails: 'Account Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      securityEnabled: 'Security Features Enabled',
      biometricAuth: 'Biometric Authentication',
      strongPassword: 'Strong Password Protection',
      twoFactorAuth: 'Two-Factor Authentication',
      nextSteps: 'Next Steps',
      exploreFeatures: 'Explore all the amazing features',
      transferMoney: 'Transfer money instantly',
      trackSpending: 'Track your spending habits',
      setGoals: 'Set and achieve financial goals',
      getSupport: 'Get 24/7 customer support'
    },
    es: {
      welcome: '¡Bienvenido a FinanceFlow!',
      accountCreated: 'Su cuenta ha sido creada exitosamente',
      getStarted: 'Comenzar',
      accountDetails: 'Detalles de la Cuenta',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      securityEnabled: 'Funciones de Seguridad Habilitadas',
      biometricAuth: 'Autenticación Biométrica',
      strongPassword: 'Protección con Contraseña Fuerte',
      twoFactorAuth: 'Autenticación de Dos Factores',
      nextSteps: 'Próximos Pasos',
      exploreFeatures: 'Explore todas las características increíbles',
      transferMoney: 'Transfiera dinero instantáneamente',
      trackSpending: 'Rastree sus hábitos de gasto',
      setGoals: 'Establezca y logre metas financieras',
      getSupport: 'Obtenga soporte al cliente 24/7'
    },
    fr: {
      welcome: 'Bienvenue sur FinanceFlow!',
      accountCreated: 'Votre compte a été créé avec succès',
      getStarted: 'Commencer',
      accountDetails: 'Détails du Compte',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      securityEnabled: 'Fonctionnalités de Sécurité Activées',
      biometricAuth: 'Authentification Biométrique',
      strongPassword: 'Protection par Mot de Passe Fort',
      twoFactorAuth: 'Authentification à Deux Facteurs',
      nextSteps: 'Prochaines Étapes',
      exploreFeatures: 'Explorez toutes les fonctionnalités incroyables',
      transferMoney: 'Transférez de l\'argent instantanément',
      trackSpending: 'Suivez vos habitudes de dépenses',
      setGoals: 'Fixez et atteignez des objectifs financiers',
      getSupport: 'Obtenez un support client 24/7'
    }
  };

  const handleGetStarted = () => {
    navigate('/dashboard-home');
  };

  const securityFeatures = [
    {
      icon: 'Fingerprint',
      title: translations[currentLanguage].biometricAuth,
      enabled: true
    },
    {
      icon: 'Shield',
      title: translations[currentLanguage].strongPassword,
      enabled: true
    },
    {
      icon: 'Smartphone',
      title: translations[currentLanguage].twoFactorAuth,
      enabled: true
    }
  ];

  const nextSteps = [
    {
      icon: 'Explore',
      text: translations[currentLanguage].exploreFeatures
    },
    {
      icon: 'Send',
      text: translations[currentLanguage].transferMoney
    },
    {
      icon: 'TrendingUp',
      text: translations[currentLanguage].trackSpending
    },
    {
      icon: 'Target',
      text: translations[currentLanguage].setGoals
    },
    {
      icon: 'HelpCircle',
      text: translations[currentLanguage].getSupport
    }
  ];

  return (
    <div className="space-y-8">
      {/* Success Animation */}
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-success/10 rounded-full animate-ping"></div>
          <div className="absolute inset-2 bg-success/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={40} color="white" strokeWidth={2.5} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          {translations[currentLanguage].welcome}
        </h2>
        <p className="text-text-secondary text-lg">
          {translations[currentLanguage].accountCreated}
        </p>
      </div>

      {/* Account Details */}
      <div className="bg-muted rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {translations[currentLanguage].accountDetails}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">{translations[currentLanguage].name}:</span>
            <span className="font-medium text-text-primary">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">{translations[currentLanguage].email}:</span>
            <span className="font-medium text-text-primary">{formData.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">{translations[currentLanguage].phone}:</span>
            <span className="font-medium text-text-primary">{formData.phone}</span>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-success/5 border border-success/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Shield" size={20} color="var(--color-success)" className="mr-2" />
          {translations[currentLanguage].securityEnabled}
        </h3>
        
        <div className="space-y-3">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <Icon name={feature.icon} size={16} color="var(--color-text-secondary)" />
              <span className="text-text-primary">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {translations[currentLanguage].nextSteps}
        </h3>
        
        <div className="space-y-3">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name={step.icon} size={16} color="var(--color-accent)" />
              </div>
              <span className="text-text-primary">{step.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Get Started Button */}
      <div className="pt-4">
        <Button
          variant="primary"
          onClick={handleGetStarted}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          size="lg"
        >
          {translations[currentLanguage].getStarted}
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;