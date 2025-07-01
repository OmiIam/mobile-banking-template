import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AmountInput = ({ amount, onAmountChange, balance, currentLanguage }) => {
  const [displayAmount, setDisplayAmount] = useState(amount || '0');
  const [showKeypad, setShowKeypad] = useState(false);

  const translations = {
    en: {
      enterAmount: 'Enter Amount',
      availableBalance: 'Available Balance',
      insufficientFunds: 'Insufficient funds',
      minimumAmount: 'Minimum transfer amount is $1.00',
      maximumAmount: 'Maximum transfer amount is $10,000.00'
    },
    es: {
      enterAmount: 'Ingresar Monto',
      availableBalance: 'Saldo Disponible',
      insufficientFunds: 'Fondos insuficientes',
      minimumAmount: 'El monto mínimo de transferencia es $1.00',
      maximumAmount: 'El monto máximo de transferencia es $10,000.00'
    },
    fr: {
      enterAmount: 'Entrer le montant',
      availableBalance: 'Solde disponible',
      insufficientFunds: 'Fonds insuffisants',
      minimumAmount: 'Le montant minimum de transfert est de 1,00 $',
      maximumAmount: 'Le montant maximum de transfert est de 10 000,00 $'
    }
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace']
  ];

  useEffect(() => {
    setDisplayAmount(amount || '0');
  }, [amount]);

  const formatCurrency = (value) => {
    const numValue = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(numValue);
  };

  const handleKeypadPress = (key) => {
    let newAmount = displayAmount;

    if (key === 'backspace') {
      if (newAmount.length > 1) {
        newAmount = newAmount.slice(0, -1);
      } else {
        newAmount = '0';
      }
    } else if (key === '.') {
      if (!newAmount.includes('.')) {
        newAmount = newAmount + '.';
      }
    } else {
      if (newAmount === '0') {
        newAmount = key;
      } else {
        newAmount = newAmount + key;
      }
    }

    // Validate amount
    const numValue = parseFloat(newAmount) || 0;
    if (numValue <= 10000) {
      setDisplayAmount(newAmount);
      onAmountChange(newAmount);
    }
  };

  const handleQuickAmount = (quickAmount) => {
    setDisplayAmount(quickAmount.toString());
    onAmountChange(quickAmount.toString());
  };

  const getValidationMessage = () => {
    const numAmount = parseFloat(displayAmount) || 0;
    if (numAmount < 1) {
      return translations[currentLanguage].minimumAmount;
    }
    if (numAmount > balance) {
      return translations[currentLanguage].insufficientFunds;
    }
    if (numAmount > 10000) {
      return translations[currentLanguage].maximumAmount;
    }
    return null;
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(displayAmount) || 0;
    return numAmount >= 1 && numAmount <= balance && numAmount <= 10000;
  };

  const quickAmounts = [50, 100, 250, 500];

  return (
    <div className="space-y-6">
      {/* Amount Display */}
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">
          {translations[currentLanguage].enterAmount}
        </h2>
        
        <div className="relative">
          <div className={`
            text-4xl font-mono font-bold text-center p-6 rounded-2xl border-2 transition-all duration-200
            ${isValidAmount() 
              ? 'border-success bg-success/5 text-success' :'border-border bg-muted text-text-primary'
            }
          `}>
            {formatCurrency(displayAmount)}
          </div>
          
          <button
            onClick={() => setShowKeypad(!showKeypad)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-border rounded-lg transition-colors duration-200"
            aria-label="Toggle keypad"
          >
            <Icon 
              name={showKeypad ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              color="var(--color-text-secondary)" 
            />
          </button>
        </div>

        {/* Balance Info */}
        <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
          <Icon name="Wallet" size={16} />
          <span>{translations[currentLanguage].availableBalance}: {formatCurrency(balance)}</span>
        </div>

        {/* Validation Message */}
        {getValidationMessage() && (
          <div className="flex items-center justify-center space-x-2 text-sm text-error">
            <Icon name="AlertCircle" size={16} />
            <span>{getValidationMessage()}</span>
          </div>
        )}
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {quickAmounts.map((quickAmount) => (
          <Button
            key={quickAmount}
            variant="outline"
            onClick={() => handleQuickAmount(quickAmount)}
            className="h-12"
          >
            ${quickAmount}
          </Button>
        ))}
      </div>

      {/* Virtual Keypad */}
      {showKeypad && (
        <div className="bg-surface border border-border rounded-2xl p-4 shadow-elevation-2">
          <div className="grid grid-cols-3 gap-3">
            {keypadNumbers.flat().map((key, index) => (
              <button
                key={index}
                onClick={() => handleKeypadPress(key)}
                className={`
                  h-14 rounded-xl font-semibold text-lg transition-all duration-200
                  ${key === 'backspace' ?'bg-error/10 text-error hover:bg-error/20' :'bg-muted hover:bg-border text-text-primary'
                  }
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                `}
                disabled={key === '.' && displayAmount.includes('.')}
              >
                {key === 'backspace' ? (
                  <Icon name="Delete" size={20} />
                ) : (
                  key
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AmountInput;