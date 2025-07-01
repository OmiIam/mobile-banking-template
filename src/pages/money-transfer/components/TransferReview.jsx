import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const TransferReview = ({ 
  amount, 
  recipient, 
  transferType, 
  description, 
  onDescriptionChange, 
  onTransferTypeChange, 
  currentLanguage 
}) => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('monthly');

  const translations = {
    en: {
      reviewTransfer: 'Review Transfer',
      transferDetails: 'Transfer Details',
      recipient: 'Recipient',
      amount: 'Amount',
      transferFee: 'Transfer Fee',
      totalAmount: 'Total Amount',
      description: 'Description',
      transferType: 'Transfer Type',
      instant: 'Instant Transfer',
      standard: 'Standard Transfer',
      instantDesc: 'Arrives within minutes',
      standardDesc: 'Arrives in 1-3 business days',
      scheduleTransfer: 'Schedule Transfer',
      scheduleDate: 'Schedule Date',
      recurringTransfer: 'Make Recurring',
      frequency: 'Frequency',
      weekly: 'Weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      addNote: 'Add a note (optional)',
      securityNotice: 'Security Notice',
      securityMessage: 'This transfer will require authentication to complete.',
      editDetails: 'Edit Details',
      proceedToConfirm: 'Proceed to Confirm'
    },
    es: {
      reviewTransfer: 'Revisar Transferencia',
      transferDetails: 'Detalles de Transferencia',
      recipient: 'Destinatario',
      amount: 'Monto',
      transferFee: 'Tarifa de Transferencia',
      totalAmount: 'Monto Total',
      description: 'Descripción',
      transferType: 'Tipo de Transferencia',
      instant: 'Transferencia Instantánea',
      standard: 'Transferencia Estándar',
      instantDesc: 'Llega en minutos',
      standardDesc: 'Llega en 1-3 días hábiles',
      scheduleTransfer: 'Programar Transferencia',
      scheduleDate: 'Fecha Programada',
      recurringTransfer: 'Hacer Recurrente',
      frequency: 'Frecuencia',
      weekly: 'Semanal',
      monthly: 'Mensual',
      quarterly: 'Trimestral',
      addNote: 'Agregar nota (opcional)',
      securityNotice: 'Aviso de Seguridad',
      securityMessage: 'Esta transferencia requerirá autenticación para completarse.',
      editDetails: 'Editar Detalles',
      proceedToConfirm: 'Proceder a Confirmar'
    },
    fr: {
      reviewTransfer: 'Réviser le transfert',
      transferDetails: 'Détails du transfert',
      recipient: 'Destinataire',
      amount: 'Montant',
      transferFee: 'Frais de transfert',
      totalAmount: 'Montant total',
      description: 'Description',
      transferType: 'Type de transfert',
      instant: 'Transfert instantané',
      standard: 'Transfert standard',
      instantDesc: 'Arrive en quelques minutes',
      standardDesc: 'Arrive en 1-3 jours ouvrables',
      scheduleTransfer: 'Programmer le transfert',
      scheduleDate: 'Date programmée',
      recurringTransfer: 'Rendre récurrent',
      frequency: 'Fréquence',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      quarterly: 'Trimestriel',
      addNote: 'Ajouter une note (optionnel)',
      securityNotice: 'Avis de sécurité',
      securityMessage: 'Ce transfert nécessitera une authentification pour être complété.',
      editDetails: 'Modifier les détails',
      proceedToConfirm: 'Procéder à la confirmation'
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getTransferFee = () => {
    return transferType === 'instant' ? 2.99 : 0;
  };

  const getTotalAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    const fee = getTransferFee();
    return numAmount + fee;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatScheduleDate = () => {
    if (!scheduleDate) return '';
    return new Date(scheduleDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          {translations[currentLanguage].reviewTransfer}
        </h2>
        <p className="text-sm text-text-secondary">
          Please review your transfer details before confirming
        </p>
      </div>

      {/* Transfer Summary Card */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={recipient?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(recipient?.name || 'User')}&background=2C3E50&color=fff`}
                alt={recipient?.name || 'Recipient'}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface" />
            </div>
            <div>
              <p className="font-semibold text-text-primary">{recipient?.name}</p>
              <p className="text-sm text-text-secondary">{recipient?.email}</p>
              <p className="text-xs text-text-secondary">
                {recipient?.bankName} • {recipient?.accountNumber}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">{formatCurrency(amount)}</p>
            <p className="text-sm text-text-secondary">
              {transferType === 'instant' ? translations[currentLanguage].instant : translations[currentLanguage].standard}
            </p>
          </div>
        </div>
      </div>

      {/* Transfer Details */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-text-primary mb-4">
          {translations[currentLanguage].transferDetails}
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">{translations[currentLanguage].amount}:</span>
            <span className="font-mono font-medium text-text-primary">{formatCurrency(amount)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">{translations[currentLanguage].transferFee}:</span>
            <span className="font-mono font-medium text-text-primary">{formatCurrency(getTransferFee())}</span>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-primary">{translations[currentLanguage].totalAmount}:</span>
              <span className="font-mono font-bold text-lg text-accent">{formatCurrency(getTotalAmount())}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Options */}
      <div className="space-y-4">
        {/* Transfer Type */}
        <div className="bg-surface border border-border rounded-2xl p-4">
          <h4 className="font-medium text-text-primary mb-3">{translations[currentLanguage].transferType}</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors duration-200">
              <input
                type="radio"
                name="transferType"
                value="instant"
                checked={transferType === 'instant'}
                onChange={(e) => onTransferTypeChange(e.target.value)}
                className="text-accent focus:ring-accent"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} color="var(--color-accent)" />
                  <span className="font-medium text-text-primary">{translations[currentLanguage].instant}</span>
                </div>
                <p className="text-sm text-text-secondary">{translations[currentLanguage].instantDesc} • Fee: $2.99</p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors duration-200">
              <input
                type="radio"
                name="transferType"
                value="standard"
                checked={transferType === 'standard'}
                onChange={(e) => onTransferTypeChange(e.target.value)}
                className="text-accent focus:ring-accent"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} color="var(--color-primary)" />
                  <span className="font-medium text-text-primary">{translations[currentLanguage].standard}</span>
                </div>
                <p className="text-sm text-text-secondary">{translations[currentLanguage].standardDesc} • No fee</p>
              </div>
            </label>
          </div>
        </div>

        {/* Schedule Transfer */}
        <div className="bg-surface border border-border rounded-2xl p-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
              className="text-accent focus:ring-accent rounded"
            />
            <div className="flex-1">
              <span className="font-medium text-text-primary">{translations[currentLanguage].scheduleTransfer}</span>
              <p className="text-sm text-text-secondary">Send this transfer at a later date</p>
            </div>
          </label>
          
          {isScheduled && (
            <div className="mt-4">
              <Input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
              {scheduleDate && (
                <p className="text-sm text-accent mt-2">
                  Transfer scheduled for {formatScheduleDate()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Recurring Transfer */}
        <div className="bg-surface border border-border rounded-2xl p-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="text-accent focus:ring-accent rounded"
            />
            <div className="flex-1">
              <span className="font-medium text-text-primary">{translations[currentLanguage].recurringTransfer}</span>
              <p className="text-sm text-text-secondary">Repeat this transfer automatically</p>
            </div>
          </label>
          
          {isRecurring && (
            <div className="mt-4">
              <select
                value={recurringFrequency}
                onChange={(e) => setRecurringFrequency(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="weekly">{translations[currentLanguage].weekly}</option>
                <option value="monthly">{translations[currentLanguage].monthly}</option>
                <option value="quarterly">{translations[currentLanguage].quarterly}</option>
              </select>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-surface border border-border rounded-2xl p-4">
          <label className="block font-medium text-text-primary mb-3">
            {translations[currentLanguage].description}
          </label>
          <Input
            type="text"
            placeholder={translations[currentLanguage].addNote}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-warning/10 border border-warning/20 rounded-2xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-warning mb-1">{translations[currentLanguage].securityNotice}</h4>
            <p className="text-sm text-text-secondary">{translations[currentLanguage].securityMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferReview;