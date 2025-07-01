import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecurringSubscriptions = ({ currentLanguage }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const translations = {
    en: {
      recurringSubscriptions: 'Recurring Subscriptions',
      manageAll: 'Manage All',
      totalMonthly: 'Total Monthly',
      nextRenewal: 'Next Renewal',
      cancel: 'Cancel',
      pause: 'Pause',
      active: 'Active',
      paused: 'Paused',
      cancelled: 'Cancelled',
      renewsIn: 'Renews in',
      days: 'days',
      today: 'today',
      cancelSubscription: 'Cancel Subscription',
      confirmCancel: 'Are you sure you want to cancel this subscription?',
      confirmCancelButton: 'Yes, Cancel',
      keepSubscription: 'Keep Subscription',
      monthly: 'Monthly',
      yearly: 'Yearly',
      weekly: 'Weekly'
    },
    es: {
      recurringSubscriptions: 'Suscripciones Recurrentes',
      manageAll: 'Gestionar Todo',
      totalMonthly: 'Total Mensual',
      nextRenewal: 'Próxima Renovación',
      cancel: 'Cancelar',
      pause: 'Pausar',
      active: 'Activo',
      paused: 'Pausado',
      cancelled: 'Cancelado',
      renewsIn: 'Se renueva en',
      days: 'días',
      today: 'hoy',
      cancelSubscription: 'Cancelar Suscripción',
      confirmCancel: '¿Estás seguro de que quieres cancelar esta suscripción?',
      confirmCancelButton: 'Sí, Cancelar',
      keepSubscription: 'Mantener Suscripción',
      monthly: 'Mensual',
      yearly: 'Anual',
      weekly: 'Semanal'
    },
    fr: {
      recurringSubscriptions: 'Abonnements Récurrents',
      manageAll: 'Gérer Tout',
      totalMonthly: 'Total Mensuel',
      nextRenewal: 'Prochain Renouvellement',
      cancel: 'Annuler',
      pause: 'Pause',
      active: 'Actif',
      paused: 'En Pause',
      cancelled: 'Annulé',
      renewsIn: 'Renouvelle dans',
      days: 'jours',
      today: 'aujourd\'hui',
      cancelSubscription: 'Annuler l\'Abonnement',
      confirmCancel: 'Êtes-vous sûr de vouloir annuler cet abonnement?',
      confirmCancelButton: 'Oui, Annuler',
      keepSubscription: 'Garder l\'Abonnement',
      monthly: 'Mensuel',
      yearly: 'Annuel',
      weekly: 'Hebdomadaire'
    }
  };

  const subscriptionIcons = {
    'Netflix': 'Play',
    'Spotify': 'Music',
    'Adobe Creative': 'Palette',
    'Microsoft 365': 'FileText',
    'Amazon Prime': 'Package',
    'Disney+': 'Star',
    'Gym Membership': 'Dumbbell',
    'Cloud Storage': 'Cloud'
  };

  useEffect(() => {
    const mockSubscriptions = [
      {
        id: 1,
        name: 'Netflix',
        amount: 15.99,
        frequency: 'monthly',
        nextRenewal: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: 'Entertainment',
        color: '#E50914'
      },
      {
        id: 2,
        name: 'Spotify',
        amount: 9.99,
        frequency: 'monthly',
        nextRenewal: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: 'Entertainment',
        color: '#1DB954'
      },
      {
        id: 3,
        name: 'Adobe Creative',
        amount: 52.99,
        frequency: 'monthly',
        nextRenewal: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: 'Software',
        color: '#FF0000'
      },
      {
        id: 4,
        name: 'Microsoft 365',
        amount: 6.99,
        frequency: 'monthly',
        nextRenewal: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: 'Software',
        color: '#0078D4'
      },
      {
        id: 5,
        name: 'Gym Membership',
        amount: 29.99,
        frequency: 'monthly',
        nextRenewal: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        status: 'paused',
        category: 'Health',
        color: '#FF6B35'
      }
    ];
    setSubscriptions(mockSubscriptions);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getDaysUntilRenewal = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTotalMonthlyAmount = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => total + sub.amount, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'var(--color-success)';
      case 'paused':
        return 'var(--color-warning)';
      case 'cancelled':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const handleCancelSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setShowCancelModal(true);
  };

  const confirmCancelSubscription = () => {
    if (selectedSubscription) {
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === selectedSubscription.id 
            ? { ...sub, status: 'cancelled' }
            : sub
        )
      );
    }
    setShowCancelModal(false);
    setSelectedSubscription(null);
  };

  const handlePauseSubscription = (subscriptionId) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: sub.status === 'paused' ? 'active' : 'paused' }
          : sub
      )
    );
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {translations[currentLanguage].recurringSubscriptions}
        </h2>
        <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200">
          {translations[currentLanguage].manageAll}
        </button>
      </div>

      {/* Total Monthly Amount */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary mb-1">
              {translations[currentLanguage].totalMonthly}
            </p>
            <p className="text-2xl font-bold text-text-primary font-mono">
              {formatCurrency(getTotalMonthlyAmount())}
            </p>
          </div>
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="CreditCard" size={24} color="var(--color-accent)" />
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {subscriptions.map((subscription) => {
          const daysUntilRenewal = getDaysUntilRenewal(subscription.nextRenewal);
          const renewalText = daysUntilRenewal === 0 
            ? translations[currentLanguage].today
            : `${daysUntilRenewal} ${translations[currentLanguage].days}`;

          return (
            <div 
              key={subscription.id}
              className="p-4 bg-muted rounded-xl hover:bg-border-light transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                {/* Subscription Info */}
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${subscription.color}20` }}
                  >
                    <Icon 
                      name={subscriptionIcons[subscription.name] || 'Circle'} 
                      size={20} 
                      color={subscription.color}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {subscription.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ 
                          backgroundColor: `${getStatusColor(subscription.status)}20`,
                          color: getStatusColor(subscription.status)
                        }}
                      >
                        {translations[currentLanguage][subscription.status]}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {translations[currentLanguage][subscription.frequency]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount and Actions */}
                <div className="text-right">
                  <p className="font-mono font-semibold text-text-primary">
                    {formatCurrency(subscription.amount)}
                  </p>
                  {subscription.status === 'active' && (
                    <p className="text-sm text-text-secondary">
                      {translations[currentLanguage].renewsIn} {renewalText}
                    </p>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 mt-2">
                    {subscription.status === 'active' && (
                      <>
                        <button
                          onClick={() => handlePauseSubscription(subscription.id)}
                          className="text-xs text-warning hover:text-warning/80 font-medium transition-colors duration-200"
                        >
                          {translations[currentLanguage].pause}
                        </button>
                        <span className="text-xs text-border">|</span>
                      </>
                    )}
                    {subscription.status === 'paused' && (
                      <>
                        <button
                          onClick={() => handlePauseSubscription(subscription.id)}
                          className="text-xs text-success hover:text-success/80 font-medium transition-colors duration-200"
                        >
                          Resume
                        </button>
                        <span className="text-xs text-border">|</span>
                      </>
                    )}
                    {subscription.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelSubscription(subscription)}
                        className="text-xs text-error hover:text-error/80 font-medium transition-colors duration-200"
                      >
                        {translations[currentLanguage].cancel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedSubscription && (
        <div className="fixed inset-0 z-200 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="relative w-full max-w-sm mx-4 bg-surface rounded-2xl shadow-elevation-4 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={32} color="var(--color-error)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {translations[currentLanguage].cancelSubscription}
              </h3>
              <p className="text-text-secondary mb-6">
                {translations[currentLanguage].confirmCancel}
              </p>
              <div className="space-y-3">
                <Button
                  variant="danger"
                  onClick={confirmCancelSubscription}
                  fullWidth
                >
                  {translations[currentLanguage].confirmCancelButton}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowCancelModal(false)}
                  fullWidth
                >
                  {translations[currentLanguage].keepSubscription}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringSubscriptions;