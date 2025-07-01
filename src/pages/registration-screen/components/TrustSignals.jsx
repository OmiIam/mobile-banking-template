import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = ({ currentLanguage }) => {
  const translations = {
    en: {
      secureEncryption: 'Bank-level 256-bit SSL encryption',
      fdicInsured: 'FDIC insured up to $250,000',
      compliance: 'SOC 2 Type II compliant',
      privacy: 'Your data is never sold or shared',
      support: '24/7 customer support available'
    },
    es: {
      secureEncryption: 'Encriptación SSL de 256 bits a nivel bancario',
      fdicInsured: 'Asegurado por FDIC hasta $250,000',
      compliance: 'Cumple con SOC 2 Tipo II',
      privacy: 'Sus datos nunca se venden o comparten',
      support: 'Soporte al cliente 24/7 disponible'
    },
    fr: {
      secureEncryption: 'Chiffrement SSL 256 bits de niveau bancaire',
      fdicInsured: 'Assuré FDIC jusqu\'à 250 000 $',
      compliance: 'Conforme SOC 2 Type II',
      privacy: 'Vos données ne sont jamais vendues ou partagées',
      support: 'Support client 24/7 disponible'
    }
  };

  const trustItems = [
    {
      icon: 'Shield',
      text: translations[currentLanguage].secureEncryption,
      color: 'var(--color-success)'
    },
    {
      icon: 'Building',
      text: translations[currentLanguage].fdicInsured,
      color: 'var(--color-accent)'
    },
    {
      icon: 'Award',
      text: translations[currentLanguage].compliance,
      color: 'var(--color-primary)'
    },
    {
      icon: 'Lock',
      text: translations[currentLanguage].privacy,
      color: 'var(--color-success)'
    },
    {
      icon: 'Headphones',
      text: translations[currentLanguage].support,
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-xl p-6 space-y-4">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Shield" size={20} color="var(--color-success)" />
          <span className="text-sm font-semibold text-success">Trusted & Secure</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {trustItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon name={item.icon} size={16} color={item.color} />
            <span className="text-sm text-text-secondary">{item.text}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-1">
          <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
          <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
          <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
          <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
          <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
        </div>
        <span className="text-xs text-text-secondary">4.9/5 from 50,000+ users</span>
      </div>
    </div>
  );
};

export default TrustSignals;