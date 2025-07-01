import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onActionClick, currentLanguage }) => {
  const translations = {
    en: {
      quickActions: "Quick Actions",
      reportLostCard: "Report Lost Card",
      disputeTransaction: "Dispute Transaction",
      accountLocked: "Account Locked",
      technicalIssue: "Technical Issue",
      updateProfile: "Update Profile",
      changePassword: "Change Password"
    },
    es: {
      quickActions: "Acciones Rápidas",
      reportLostCard: "Reportar Tarjeta Perdida",
      disputeTransaction: "Disputar Transacción",
      accountLocked: "Cuenta Bloqueada",
      technicalIssue: "Problema Técnico",
      updateProfile: "Actualizar Perfil",
      changePassword: "Cambiar Contraseña"
    },
    fr: {
      quickActions: "Actions Rapides",
      reportLostCard: "Signaler Carte Perdue",
      disputeTransaction: "Contester Transaction",
      accountLocked: "Compte Verrouillé",
      technicalIssue: "Problème Technique",
      updateProfile: "Mettre à Jour Profil",
      changePassword: "Changer Mot de Passe"
    }
  };

  const quickActionItems = [
    {
      id: 'lost-card',
      title: translations[currentLanguage].reportLostCard,
      icon: 'CreditCard',
      color: 'error',
      urgent: true
    },
    {
      id: 'dispute-transaction',
      title: translations[currentLanguage].disputeTransaction,
      icon: 'AlertTriangle',
      color: 'warning',
      urgent: true
    },
    {
      id: 'account-locked',
      title: translations[currentLanguage].accountLocked,
      icon: 'Lock',
      color: 'error',
      urgent: true
    },
    {
      id: 'technical-issue',
      title: translations[currentLanguage].technicalIssue,
      icon: 'Settings',
      color: 'primary',
      urgent: false
    },
    {
      id: 'update-profile',
      title: translations[currentLanguage].updateProfile,
      icon: 'User',
      color: 'primary',
      urgent: false
    },
    {
      id: 'change-password',
      title: translations[currentLanguage].changePassword,
      icon: 'Key',
      color: 'primary',
      urgent: false
    }
  ];

  const getColorClasses = (color, urgent) => {
    const baseClasses = "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md";
    
    if (urgent) {
      switch (color) {
        case 'error':
          return `${baseClasses} border-error/20 bg-error/5 hover:border-error/30 hover:bg-error/10`;
        case 'warning':
          return `${baseClasses} border-warning/20 bg-warning/5 hover:border-warning/30 hover:bg-warning/10`;
        default:
          return `${baseClasses} border-border hover:border-accent/30 hover:bg-accent/5`;
      }
    }
    
    return `${baseClasses} border-border hover:border-accent/30 hover:bg-accent/5`;
  };

  const getIconColor = (color, urgent) => {
    if (urgent) {
      switch (color) {
        case 'error':
          return 'var(--color-error)';
        case 'warning':
          return 'var(--color-warning)';
        default:
          return 'var(--color-accent)';
      }
    }
    return 'var(--color-accent)';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">
        {translations[currentLanguage].quickActions}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActionItems.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            className={getColorClasses(action.color, action.urgent)}
          >
            <div className="relative mb-3">
              <Icon 
                name={action.icon} 
                size={32} 
                color={getIconColor(action.color, action.urgent)}
                strokeWidth={1.5}
              />
              {action.urgent && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse" />
              )}
            </div>
            <span className="text-sm font-medium text-text-primary text-center leading-tight">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;