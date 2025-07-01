import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TransactionCard = ({ transaction, onViewDetails, onDispute, currentLanguage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const translations = {
    en: {
      pending: 'Pending',
      completed: 'Completed',
      failed: 'Failed',
      viewDetails: 'View Details',
      dispute: 'Dispute',
      receipt: 'Receipt',
      refund: 'Refund',
      transfer: 'Transfer',
      payment: 'Payment',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal'
    },
    es: {
      pending: 'Pendiente',
      completed: 'Completado',
      failed: 'Fallido',
      viewDetails: 'Ver Detalles',
      dispute: 'Disputar',
      receipt: 'Recibo',
      refund: 'Reembolso',
      transfer: 'Transferencia',
      payment: 'Pago',
      deposit: 'Depósito',
      withdrawal: 'Retiro'
    },
    fr: {
      pending: 'En attente',
      completed: 'Terminé',
      failed: 'Échoué',
      viewDetails: 'Voir les détails',
      dispute: 'Contester',
      receipt: 'Reçu',
      refund: 'Remboursement',
      transfer: 'Transfert',
      payment: 'Paiement',
      deposit: 'Dépôt',
      withdrawal: 'Retrait'
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'transfer':
        return 'Send';
      case 'payment':
        return 'CreditCard';
      case 'deposit':
        return 'ArrowDownLeft';
      case 'withdrawal':
        return 'ArrowUpRight';
      case 'refund':
        return 'RotateCcw';
      default:
        return 'DollarSign';
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-4 hover:shadow-elevation-1 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Merchant Logo/Icon */}
          <div className="relative">
            {transaction.merchantLogo ? (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src={transaction.merchantLogo}
                  alt={transaction.merchant}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon
                  name={getTransactionIcon(transaction.type)}
                  size={20}
                  color="var(--color-primary)"
                />
              </div>
            )}
            
            {/* Payment Method Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-surface border-2 border-surface rounded-full flex items-center justify-center">
              <Icon
                name={transaction.paymentMethod === 'card' ? 'CreditCard' : 'Wallet'}
                size={12}
                color="var(--color-text-secondary)"
              />
            </div>
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary truncate">
                {transaction.merchant}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-mono font-semibold ${
                  transaction.amount > 0 ? 'text-success' : 'text-text-primary'
                }`}>
                  {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <button
                  onClick={toggleExpanded}
                  className="p-1 hover:bg-muted rounded-full transition-colors duration-200"
                  aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                >
                  <Icon
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                    size={16}
                    color="var(--color-text-secondary)"
                  />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">
                  {transaction.description}
                </span>
                {transaction.category && (
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    {transaction.category}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(transaction.status)}`}>
                  {translations[currentLanguage][transaction.status]}
                </span>
                <span className="text-xs text-text-secondary">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Transaction ID:</span>
              <p className="font-mono text-text-primary">{transaction.id}</p>
            </div>
            <div>
              <span className="text-text-secondary">Reference:</span>
              <p className="font-mono text-text-primary">{transaction.reference}</p>
            </div>
            <div>
              <span className="text-text-secondary">Account:</span>
              <p className="text-text-primary">{transaction.account}</p>
            </div>
            <div>
              <span className="text-text-secondary">Balance After:</span>
              <p className="font-mono text-text-primary">{formatCurrency(transaction.balanceAfter)}</p>
            </div>
          </div>

          {transaction.notes && (
            <div>
              <span className="text-text-secondary text-sm">Notes:</span>
              <p className="text-text-primary text-sm mt-1">{transaction.notes}</p>
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewDetails(transaction)}
            >
              {translations[currentLanguage].viewDetails}
            </Button>
            
            {transaction.hasReceipt && (
              <Button
                variant="ghost"
                size="sm"
                iconName="FileText"
                iconPosition="left"
              >
                {translations[currentLanguage].receipt}
              </Button>
            )}
            
            {transaction.status === 'completed' && transaction.amount < 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="AlertTriangle"
                iconPosition="left"
                onClick={() => onDispute(transaction)}
              >
                {translations[currentLanguage].dispute}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;