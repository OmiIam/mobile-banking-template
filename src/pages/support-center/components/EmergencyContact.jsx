import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContact = ({ currentLanguage }) => {
  const translations = {
    en: {
      emergencyContact: "Emergency Contact",
      urgentIssues: "For urgent issues that require immediate attention",
      phoneSupport: "Phone Support",
      available24x7: "Available 24/7",
      emailSupport: "Email Support",
      businessHours: "Business hours response",
      branchLocator: "Branch Locator",
      findNearestBranch: "Find nearest branch",
      callNow: "Call Now",
      sendEmail: "Send Email",
      findBranch: "Find Branch",
      emergencyNumber: "+1 (800) 123-4567",
      supportEmail: "support@financeflow.com"
    },
    es: {
      emergencyContact: "Contacto de Emergencia",
      urgentIssues: "Para problemas urgentes que requieren atención inmediata",
      phoneSupport: "Soporte Telefónico",
      available24x7: "Disponible 24/7",
      emailSupport: "Soporte por Email",
      businessHours: "Respuesta en horario comercial",
      branchLocator: "Localizador de Sucursales",
      findNearestBranch: "Encontrar sucursal más cercana",
      callNow: "Llamar Ahora",
      sendEmail: "Enviar Email",
      findBranch: "Encontrar Sucursal",
      emergencyNumber: "+1 (800) 123-4567",
      supportEmail: "soporte@financeflow.com"
    },
    fr: {
      emergencyContact: "Contact d\'Urgence",
      urgentIssues: "Pour les problèmes urgents nécessitant une attention immédiate",
      phoneSupport: "Support Téléphonique",
      available24x7: "Disponible 24/7",
      emailSupport: "Support Email",
      businessHours: "Réponse aux heures d\'ouverture",
      branchLocator: "Localisateur de Succursales",
      findNearestBranch: "Trouver la succursale la plus proche",
      callNow: "Appeler Maintenant",
      sendEmail: "Envoyer Email",
      findBranch: "Trouver Succursale",
      emergencyNumber: "+1 (800) 123-4567",
      supportEmail: "support@financeflow.com"
    }
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${translations[currentLanguage].emergencyNumber}`;
  };

  const handleEmailSupport = () => {
    window.location.href = `mailto:${translations[currentLanguage].supportEmail}?subject=Support Request`;
  };

  const handleBranchLocator = () => {
    // Open branch locator or map
    console.log('Opening branch locator...');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">
        {translations[currentLanguage].emergencyContact}
      </h2>
      
      <p className="text-sm text-text-secondary mb-6">
        {translations[currentLanguage].urgentIssues}
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Phone Support */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Phone" size={24} color="var(--color-success)" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">
            {translations[currentLanguage].phoneSupport}
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            {translations[currentLanguage].available24x7}
          </p>
          <p className="font-mono text-lg font-semibold text-text-primary mb-4">
            {translations[currentLanguage].emergencyNumber}
          </p>
          <Button
            variant="success"
            onClick={handlePhoneCall}
            iconName="Phone"
            iconPosition="left"
            fullWidth
          >
            {translations[currentLanguage].callNow}
          </Button>
        </div>

        {/* Email Support */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={24} color="var(--color-primary)" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">
            {translations[currentLanguage].emailSupport}
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            {translations[currentLanguage].businessHours}
          </p>
          <p className="font-mono text-sm font-medium text-text-primary mb-4 break-all">
            {translations[currentLanguage].supportEmail}
          </p>
          <Button
            variant="primary"
            onClick={handleEmailSupport}
            iconName="Mail"
            iconPosition="left"
            fullWidth
          >
            {translations[currentLanguage].sendEmail}
          </Button>
        </div>

        {/* Branch Locator */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={24} color="var(--color-accent)" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">
            {translations[currentLanguage].branchLocator}
          </h3>
          <p className="text-sm text-text-secondary mb-8">
            {translations[currentLanguage].findNearestBranch}
          </p>
          <Button
            variant="outline"
            onClick={handleBranchLocator}
            iconName="MapPin"
            iconPosition="left"
            fullWidth
          >
            {translations[currentLanguage].findBranch}
          </Button>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-error/5 border border-error/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-error mb-1">
              Emergency Notice
            </h4>
            <p className="text-sm text-text-secondary">
              If you suspect fraudulent activity on your account, call our emergency line immediately. 
              Do not delay reporting suspicious transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;